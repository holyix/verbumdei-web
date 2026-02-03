<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    onMount(() => {
        if (!browser) return;
        const showWelcomeAlways = localStorage.getItem("vd_show_welcome_always") === "1";
        const hasVisited = !!localStorage.getItem("vd_has_visited");

        if (!hasVisited || showWelcomeAlways) {
            goto("/welcome");
        } else {
            goto("/home");
        }
    });
</script>

<main class="redirect">
    <p>Redirecting...</p>
</main>

<style>
    .redirect {
        min-height: 40vh;
        display: grid;
        place-items: center;
        color: var(--text-muted);
    }
</style>
