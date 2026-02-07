import type { PageLoad } from "./$types";
import type { Era } from "$lib/types";
import { fetchErasWithEpisodes } from "$lib/api/eras";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8080";

export const load: PageLoad = async ({ fetch }) => {
    let eras: Era[] = [];

    try {
        eras = await fetchErasWithEpisodes(fetch, API_BASE);
    } catch (err) {
        console.error("Failed to fetch eras for timeline", err);
    }

    return { eras };
};
