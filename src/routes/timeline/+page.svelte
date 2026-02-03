<script lang="ts">
    import TimelineCard from "$lib/components/Timeline/TimelineCard.svelte";
    import StickFigure from "$lib/components/StickFigure/StickFigure.svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onMount, onDestroy } from "svelte";
    import type { Locale } from "$lib/types";
    import { stages, timelineHero } from "./content";

    const timelineStages = [...stages].reverse();
    let isMobile = false;
    let mobileQuery: MediaQueryList | null = null;
    type Theme = "light" | "dark";
    let theme: Theme = "dark";
    let locale: Locale = "en";
    const allowedLocales = new Set<Locale>(["en", "es", "pt", "sv"]);
    if (browser) {
        const storedLocale = localStorage.getItem("vd_locale");
        if (storedLocale && allowedLocales.has(storedLocale as Locale)) {
            locale = storedLocale as Locale;
        }
    }

    const startStage = (id: string) => {
        goto(`/quiz?category=${id}`);
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

    const stageBackgrounds: Record<string, string> = {
        creation: "/illustrations/question-creation.svg",
        christ: "/illustrations/question-christ.svg",
        church: "/illustrations/question-church.svg",
        exodus: "/illustrations/question-covenant.svg",
        kings: "/illustrations/quest-hero.svg",
    };

    const overallProgress =
        stages.reduce((total, stage) => total + stage.progress, 0) / stages.length;

    const pickLocale = (value: Record<Locale, string>) => value[locale] ?? value.en;
    $: heroCopy = timelineHero[locale] ?? timelineHero.en;

    const resolveStageBackground = (id: string) => {
        const base = stageBackgrounds[id] ?? "/illustrations/quest-hero.svg";
        if (theme === "light" && base.includes("quest-hero")) {
            return "/illustrations/quest-hero-light.svg";
        }
        return base;
    };
</script>

<main class={`page ${theme === "light" ? "light-theme" : "dark-theme"}`}>
    <section class="hero">
        <div class="hero-left">
            <p class="eyebrow">{heroCopy.eyebrow}</p>
            <h1>{heroCopy.title}</h1>
            <p class="lede">{heroCopy.body}</p>
        </div>
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
    </section>

    <section class="timeline" aria-label="Salvation timeline">
        <div class="spine" aria-hidden="true"></div>
        <StickFigure
            className="spine-figure"
            overall={overallProgress * 100}
            headTop={16}
            torsoTop={36}
            armsTop={44}
        />
        {#each timelineStages as stage}
            {@const side = isMobile ? "right" : stage.side}
            {@const tone = stage.progress <= 0 ? "idle" : stage.progress >= 1 ? "done" : "active"}
            <div class={`timeline-row ${side}`}>
                <div class={`card-slot ${side === "left" ? "has-card left" : ""}`}>
                    {#if side === "left"}
                        <TimelineCard
                            stageId={stage.id}
                            title={pickLocale(stage.title)}
                            era={pickLocale(stage.era)}
                            summary={pickLocale(stage.summary)}
                            progress={stage.progress}
                            offset={stage.offset}
                            bgImage={resolveStageBackground(stage.id)}
                            on:click={() => startStage(stage.id)}
                        />
                    {/if}
                </div>
                <div class="marker-wrap" aria-hidden="true">
                    <div class={`marker ${tone}`}>
                        <span class="marker-core"></span>
                    </div>
                </div>
                <div class={`card-slot ${side === "right" ? "has-card right" : ""}`}>
                    {#if side === "right"}
                        <TimelineCard
                            stageId={stage.id}
                            title={pickLocale(stage.title)}
                            era={pickLocale(stage.era)}
                            summary={pickLocale(stage.summary)}
                            progress={stage.progress}
                            offset={stage.offset}
                            bgImage={resolveStageBackground(stage.id)}
                            on:click={() => startStage(stage.id)}
                        />
                    {/if}
                </div>
            </div>
        {/each}
    </section>
</main>

<style>
    .page {
        display: grid;
        gap: 2.4rem;
        padding: 1.2rem;
        position: relative;
    }

    .hero {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: start;
        gap: 0.7rem;
        padding: 2rem 2.2rem;
        border-radius: 24px;
        background:
            radial-gradient(circle at 12% 20%, var(--glow-gold), transparent 55%),
            radial-gradient(circle at 82% 16%, var(--glow-purple), transparent 50%),
            linear-gradient(150deg, var(--panel-veil-1), var(--panel-veil-2));
        border: 1px solid var(--outline-strong);
        box-shadow: 0 24px 50px var(--shadow-strong);
    }

    .hero-left {
        display: grid;
        gap: 0.7rem;
        align-content: start;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.72rem;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
    }

    .hero h1 {
        font-family: var(--font-display);
        font-size: clamp(2rem, 2.8vw + 1.2rem, 3.2rem);
        margin: 0;
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

    .hero .icon-link svg {
        width: 20px;
        height: 20px;
    }

    .lede {
        margin: 0;
        max-width: 520px;
        color: var(--text-muted);
        line-height: 1.6;
    }

    .timeline {
        position: relative;
        display: grid;
        gap: 2.2rem;
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

    .card-slot :global(.stage-card) {
        max-width: 420px;
        width: 100%;
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

    .marker.done {
        border-color: color-mix(in srgb, var(--success) 80%, transparent);
        --connector-color: color-mix(in srgb, var(--success) 75%, transparent);
    }

    .marker.done .marker-core {
        background: color-mix(in srgb, var(--success) 95%, transparent);
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
    }

    @media (max-width: 640px) {
        .hero {
            padding: 1.6rem;
        }
    }
</style>
