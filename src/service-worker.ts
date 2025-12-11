/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, version } from "$service-worker";

const CACHE = `verbumquest-cache-${version}`;
const OFFLINE_URL = "/offline.html";
const ASSETS = [...new Set([...build, ...files, OFFLINE_URL])];
const sw = self as unknown as ServiceWorkerGlobalScope;

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE);
                await cache.addAll(ASSETS);
            } catch (error) {
                console.error("SW install cache error", error);
            } finally {
                // Ensure the new SW activates even if caching partially failed
                await sw.skipWaiting();
            }
        })()
    );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.map((key) => key !== CACHE && caches.delete(key))))
            .then(() => sw.clients.claim())
    );
});

self.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent): Promise<Response> {
    const request = event.request;

    if (request.method !== "GET") {
        return fetch(request);
    }

    const url = new URL(request.url);
    const isHTML = request.headers.get("accept")?.includes("text/html");

    // Handle navigations/HTML: network-first with offline fallback
    if (event.request.mode === "navigate" || isHTML) {
        try {
            return await fetch(request);
        } catch {
            const offline = await caches.match(OFFLINE_URL);
            if (offline) return offline;
            return new Response("Offline", { status: 503, statusText: "Offline" });
        }
    }

    // Only cache same-origin asset/content requests
    if (url.origin !== self.location.origin) {
        return fetch(request);
    }

    const cached = await caches.match(request);
    try {
        const response = await fetch(request);
        if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
    } catch {
        if (cached) return cached;
        throw new Error("Network error and no cache available");
    }
}
