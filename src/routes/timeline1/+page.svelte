<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import StickFigure from "$lib/components/StickFigure/StickFigure.svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import type { Era, EraEpisode, Locale } from "$lib/types";
    import { timelineHero } from "./content";

    export let data: { eras: Era[] };

    let isMobile = false;
    let mobileQuery: MediaQueryList | null = null;
    type Theme = "light" | "dark";
    let theme: Theme = "dark";
    let locale: Locale = "en";
    let eras: Era[] = data.eras ?? [];
    const allowedLocales = new Set<Locale>(["en", "es", "pt", "sv"]);

    if (browser) {
        const storedLocale = localStorage.getItem("vd_locale");
        if (storedLocale && allowedLocales.has(storedLocale as Locale)) {
            locale = storedLocale as Locale;
        }
    }

    const startEra = (id: string) => {
        goto(`/quiz?category=${id}`);
    };

    const startEpisode = (eraId: string, episodeId: string) => {
        goto(`/quiz?category=${eraId}&episode=${episodeId}`);
    };

    const goHome = () => {
        goto("/home");
    };

    const updateMobile = () => {
        isMobile = mobileQuery ? mobileQuery.matches : false;
    };

    const setLocaleFromStorage = () => {
        const storedLocale =
            typeof localStorage !== "undefined" ? localStorage.getItem("vd_locale") : null;
        if (storedLocale && allowedLocales.has(storedLocale as Locale)) {
            locale = storedLocale as Locale;
        } else {
            locale = "en";
        }
    };

    type TimelineEntry =
        | { kind: "era"; era: Era; side: "left" | "right" }
        | { kind: "episode"; era: Era; episode: EraEpisode; side: "left" | "right" };

    const buildTimelineEntries = (items: Era[]): TimelineEntry[] => {
        const entries: Omit<TimelineEntry, "side">[] = [];
        for (const era of items) {
            entries.push({ kind: "era", era });
            for (const episode of era.episodes) {
                entries.push({ kind: "episode", era, episode });
            }
        }

        return entries.map((entry, index) => ({
            ...entry,
            side: index % 2 === 0 ? "left" : "right",
        }));
    };

    $: entries = buildTimelineEntries(eras);
    $: overallProgress = entries.length > 1 ? (entries.length - 1) / entries.length : 0;
    $: hasEntries = entries.length > 0;
    const pickLocale = (value: Record<Locale, string>) => value[locale] ?? value.en;
    $: heroCopy = timelineHero[locale] ?? timelineHero.en;
    $: heroProgressLabel = `${entries.length} timeline items`;
    $: heroProgressStage = `${Math.round(overallProgress * 100)}% complete`;

    onMount(() => {
        if (typeof window === "undefined") return;
        setLocaleFromStorage();
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
        const prefersDark =
            typeof matchMedia !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next =
            stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
        theme = next as Theme;
        document.documentElement.dataset.theme = theme;
        document.body.dataset.theme = theme;
        mobileQuery = window.matchMedia("(max-width: 900px)");
        mobileQuery.addEventListener("change", updateMobile);
        updateMobile();
        window.addEventListener("storage", setLocaleFromStorage);
    });

    onDestroy(() => {
        mobileQuery?.removeEventListener("change", updateMobile);
        if (typeof window !== "undefined") {
            window.removeEventListener("storage", setLocaleFromStorage);
        }
    });
</script>

<main class={`page ${theme === "light" ? "light-theme" : "dark-theme"}`}>
    <Hero
        eyebrow={heroCopy.eyebrow}
        title={heroCopy.title}
        subtitle={heroCopy.body}
        progressLabel={heroProgressLabel}
        progressStage={heroProgressStage}
        progressPercent={overallProgress * 100}
        {theme}
    >
        <div slot="panel" class="hero-panel">
            <button class="icon-link" type="button" on:click={goHome} aria-label="Home" title="Home">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </Hero>

    <section class="timeline" aria-label="Salvation timeline">
        <div class="spine" aria-hidden="true"></div>
        <StickFigure
            className="spine-figure"
            overall={overallProgress * 100}
            headTop={16}
            torsoTop={36}
            armsTop={44}
        />
        {#each entries as entry}
            {@const side = isMobile ? "right" : entry.side}
            <div class={`timeline-row ${side}`}>
                <div class={`card-slot ${side === "left" ? "has-card left" : ""}`}>
                    {#if side === "left"}
                        {#if entry.kind === "era"}
                            <article class="story-card era-card">
                                <p class="card-tag">{heroCopy.eraTag}</p>
                                <h3>{pickLocale(entry.era.label)}</h3>
                                <p class="summary">{pickLocale(entry.era.name)}</p>
                                {#if entry.era.episodes.length}
                                    <div class="episode-list">
                                        {#each entry.era.episodes.slice(0, 3) as episode}
                                            <span>{pickLocale(episode.label)}</span>
                                        {/each}
                                    </div>
                                {/if}
                                <button
                                    class="ghost"
                                    type="button"
                                    aria-label={`${heroCopy.startEra}: ${pickLocale(entry.era.label)}`}
                                    on:click={() => startEra(entry.era.id)}
                                >
                                    {heroCopy.startEra}
                                </button>
                            </article>
                        {:else}
                            <article class="story-card episode-card">
                                <p class="card-tag">{heroCopy.episodeTag}</p>
                                <h3>{pickLocale(entry.episode.label)}</h3>
                                <p class="summary">{pickLocale(entry.era.label)}</p>
                                <button
                                    class="ghost ghost-episode"
                                    type="button"
                                    aria-label={`${heroCopy.startEpisode}: ${pickLocale(entry.episode.label)}`}
                                    on:click={() => startEpisode(entry.era.id, entry.episode.id)}
                                >
                                    {heroCopy.startEpisode}
                                </button>
                            </article>
                        {/if}
                    {/if}
                </div>
                <div class="marker-wrap" aria-hidden="true">
                    <div class={`marker ${entry.kind === "era" ? "active" : "idle"}`}>
                        <span class="marker-core"></span>
                    </div>
                </div>
                <div class={`card-slot ${side === "right" ? "has-card right" : ""}`}>
                    {#if side === "right"}
                        {#if entry.kind === "era"}
                            <article class="story-card era-card">
                                <p class="card-tag">{heroCopy.eraTag}</p>
                                <h3>{pickLocale(entry.era.label)}</h3>
                                <p class="summary">{pickLocale(entry.era.name)}</p>
                                {#if entry.era.episodes.length}
                                    <div class="episode-list">
                                        {#each entry.era.episodes.slice(0, 3) as episode}
                                            <span>{pickLocale(episode.label)}</span>
                                        {/each}
                                    </div>
                                {/if}
                                <button
                                    class="ghost"
                                    type="button"
                                    aria-label={`${heroCopy.startEra}: ${pickLocale(entry.era.label)}`}
                                    on:click={() => startEra(entry.era.id)}
                                >
                                    {heroCopy.startEra}
                                </button>
                            </article>
                        {:else}
                            <article class="story-card episode-card">
                                <p class="card-tag">{heroCopy.episodeTag}</p>
                                <h3>{pickLocale(entry.episode.label)}</h3>
                                <p class="summary">{pickLocale(entry.era.label)}</p>
                                <button
                                    class="ghost ghost-episode"
                                    type="button"
                                    aria-label={`${heroCopy.startEpisode}: ${pickLocale(entry.episode.label)}`}
                                    on:click={() => startEpisode(entry.era.id, entry.episode.id)}
                                >
                                    {heroCopy.startEpisode}
                                </button>
                            </article>
                        {/if}
                    {/if}
                </div>
            </div>
        {/each}
        {#if !hasEntries}
            <article class="story-card era-card empty-card">
                <p class="card-tag">{heroCopy.eraTag}</p>
                <h3>{heroCopy.title}</h3>
                <p class="summary">{heroCopy.body}</p>
            </article>
        {/if}
    </section>
</main>

<style>
    .page {
        display: grid;
        gap: 2.4rem;
        padding: 1.2rem;
        position: relative;
    }

    .hero-panel {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .hero .icon-link {
        width: 44px;
        height: 36px;
        display: inline-grid;
        place-items: center;
        border-radius: 12px;
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        cursor: pointer;
        transition:
            transform 120ms ease,
            box-shadow 120ms ease,
            border-color 120ms ease;
        color: var(--text);
    }

    .hero .icon-link:hover {
        transform: translateY(-1px);
        border-color: var(--outline-strong);
        box-shadow: 0 10px 18px var(--shadow-soft);
    }

    .hero .icon-link:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .hero .icon-link svg {
        width: 20px;
        height: 20px;
    }

    .timeline {
        position: relative;
        display: grid;
        gap: 1.5rem;
        padding-top: 4.5rem;
    }

    .spine {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 3px;
        transform: translateX(-50%);
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--accent) 18%, transparent),
            color-mix(in srgb, var(--accent) 68%, transparent),
            color-mix(in srgb, var(--accent) 22%, transparent)
        );
        border-radius: 999px;
    }

    :global(.spine-figure) {
        --figure-position: absolute;
        top: -26px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        pointer-events: none;
    }

    .timeline-row {
        --spine-gap: 124px;
        --marker-size: 28px;
        --connector: calc((var(--spine-gap) - var(--marker-size)) / 2 + 26px);
        display: grid;
        grid-template-columns: minmax(0, 460px) var(--spine-gap) minmax(0, 460px);
        align-items: center;
        position: relative;
        max-width: calc(920px + var(--spine-gap));
        margin: 0 auto;
    }

    .card-slot {
        width: 100%;
        display: flex;
        position: relative;
    }

    .timeline-row.left .card-slot {
        justify-content: flex-end;
    }

    .timeline-row.right .card-slot {
        justify-content: flex-start;
    }

    .story-card {
        width: 100%;
        max-width: 420px;
        border-radius: 18px;
        border: 1px solid var(--outline-soft);
        padding: 1.15rem 1.2rem;
        background: linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2));
        box-shadow: 0 14px 26px var(--shadow-soft);
        display: grid;
        gap: 0.75rem;
    }

    .empty-card {
        margin: 0 auto;
    }

    .era-card {
        padding: 1.35rem 1.35rem 1.25rem;
        border-color: color-mix(in srgb, var(--accent) 36%, transparent);
        background:
            radial-gradient(circle at 14% 12%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 52%),
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2));
        box-shadow: 0 18px 28px var(--shadow-soft);
    }

    .era-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 22px 34px var(--shadow-strong);
    }

    .card-tag {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.62rem;
        font-weight: 800;
        color: var(--text-muted);
    }

    .story-card h3 {
        margin: 0;
        font-family: var(--font-display);
        line-height: 1.25;
    }

    .era-card h3 {
        font-size: 1.38rem;
        line-height: 1.18;
    }

    .summary {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.94rem;
    }

    .episode-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
    }

    .episode-list span {
        font-size: 0.7rem;
        border-radius: 999px;
        border: 1px solid var(--outline-soft);
        padding: 0.15rem 0.5rem;
        color: var(--text-muted);
    }

    .episode-card {
        grid-template-columns: 1fr auto;
        align-items: center;
        column-gap: 0.8rem;
        row-gap: 0.45rem;
        padding: 0.85rem 1rem 0.85rem 1.05rem;
        border-radius: 13px;
        border-left: 4px solid color-mix(in srgb, var(--accent) 54%, transparent);
        background: linear-gradient(
            165deg,
            color-mix(in srgb, var(--card-veil-1) 82%, transparent),
            color-mix(in srgb, var(--card-veil-2) 72%, transparent)
        );
        box-shadow: 0 8px 14px var(--shadow-soft);
    }

    .episode-card:hover {
        transform: translateY(-1px);
        border-color: color-mix(in srgb, var(--accent) 58%, transparent);
        box-shadow: 0 11px 16px var(--shadow-soft);
    }

    .episode-card h3 {
        font-size: 0.97rem;
        font-weight: 650;
    }

    .episode-card .summary {
        font-size: 0.82rem;
    }

    .episode-card .ghost {
        grid-column: 2;
        grid-row: 1 / span 3;
        align-self: center;
        padding: 0.5rem 0.68rem;
        font-size: 0.78rem;
    }

    .ghost-episode {
        background: color-mix(in srgb, var(--accent) 16%, transparent);
        border-color: color-mix(in srgb, var(--accent) 35%, var(--outline-soft));
    }

    .ghost-episode:hover {
        background: color-mix(in srgb, var(--accent) 26%, transparent);
    }

    .ghost {
        border: 1px solid var(--outline-soft);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.35);
        color: var(--text);
        padding: 0.56rem 0.85rem;
        font-weight: 700;
        cursor: pointer;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            background 120ms ease;
        justify-self: start;
    }

    .ghost:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        background: rgba(255, 214, 138, 0.18);
    }

    .ghost:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .marker-wrap {
        grid-column: 2;
        display: grid;
        place-items: center;
    }

    .marker {
        position: relative;
        width: var(--marker-size);
        height: var(--marker-size);
        border-radius: 50%;
        border: 2px solid var(--outline-strong);
        display: grid;
        place-items: center;
        background: var(--panel-veil-1);
        box-shadow: 0 10px 20px var(--shadow-soft);
        --connector-color: var(--outline-strong);
    }

    .timeline-row.left .marker::before,
    .timeline-row.right .marker::after {
        content: "";
        position: absolute;
        top: 50%;
        width: var(--connector);
        height: 1px;
        background: var(--connector-color);
        transform: translateY(-50%);
        z-index: 0;
    }

    .timeline-row.left .marker::before {
        right: 100%;
        margin-right: 0;
    }

    .timeline-row.right .marker::after {
        left: 100%;
        margin-left: 0;
    }

    .marker-core {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--outline-strong);
    }

    .marker.active {
        border-color: color-mix(in srgb, var(--accent) 70%, transparent);
        --connector-color: color-mix(in srgb, var(--accent) 70%, transparent);
    }

    .marker.active .marker-core {
        background: color-mix(in srgb, var(--accent) 95%, transparent);
    }

    @media (max-width: 900px) {
        .timeline {
            --spine-gap: 56px;
        }

        .timeline-row {
            --spine-gap: 40px;
            --connector: 16px;
            grid-template-columns: 40px 1fr;
            column-gap: 12px;
            max-width: 100%;
            margin: 0;
        }

        .card-slot {
            grid-column: 2;
            justify-content: flex-start;
        }

        .marker-wrap {
            grid-column: 1;
            justify-self: center;
        }

        .marker::before {
            display: none;
        }

        .marker::after {
            content: "";
            position: absolute;
            top: 50%;
            width: var(--connector);
            height: 1px;
            background: var(--connector-color);
            transform: translateY(-50%);
            left: 100%;
            margin-left: 0;
            z-index: 0;
        }

        .spine {
            left: 32px;
        }

        :global(.spine-figure) {
            left: 32px;
            transform: translateX(-50%);
        }

        .timeline {
            padding-left: 0.8rem;
            padding-right: 0.8rem;
        }

        .episode-card {
            grid-template-columns: 1fr;
        }

        .episode-card .ghost {
            grid-column: auto;
            grid-row: auto;
            justify-self: start;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .icon-link,
        .ghost,
        .era-card,
        .episode-card {
            transition: none;
        }

        .icon-link:hover,
        .ghost:hover,
        .era-card:hover,
        .episode-card:hover {
            transform: none;
        }
    }
</style>
