<script lang="ts">
    import { onMount } from "svelte";
    import "$lib/styles/theme.css";

    onMount(() => {
        // Only register SW in production builds; dev server doesn't emit it.
        if (import.meta.env.DEV || !("serviceWorker" in navigator)) return;

        navigator.serviceWorker
            .register("/service-worker.js", { type: "module" })
            .catch((error) => console.error("Service worker registration failed", error));
    });
</script>

<main class="shell">
    <slot />
</main>

<style>
    .shell {
        max-width: 1100px;
        margin: 2.5rem auto;
        padding: 1.25rem;
    }
</style>
