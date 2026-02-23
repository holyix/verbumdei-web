<script lang="ts">
    import TimelineCard from "$lib/components/Timeline/TimelineCard.svelte";
    import StickFigure from "$lib/components/StickFigure/StickFigure.svelte";
    import { browser } from "$app/environment";
    import { afterNavigate, goto } from "$app/navigation";
    import { onDestroy, onMount, tick } from "svelte";
    import type { Era, Locale } from "$lib/types";
    import { timelineHero } from "./content";

    export let data: { eras: Era[] };

    type Stage = {
        id: string;
        title: string;
        era: string;
        summary: string;
        progress: number;
        offset: number;
        side: "left" | "right";
        bgImage: string;
    };

    let isMobile = false;
    let mobileQuery: MediaQueryList | null = null;
    type Theme = "light" | "dark";
    let theme: Theme = "dark";
    let manualTheme: Theme = "dark";
    let automaticTheme = false;
    let locale: Locale = "en";
    let eras: Era[] = data.eras ?? [];
    let hasAutoScrolled = false;
    let autoScrollAttempts = 0;
    let autoScrollTimer: ReturnType<typeof setTimeout> | null = null;
    const allowedLocales = new Set<Locale>(["en", "es", "pt", "sv"]);
    const MAX_ORDER = Number.MAX_SAFE_INTEGER;
    const MAX_AUTO_SCROLL_ATTEMPTS = 3;
    const SCROLL_TARGET_TOLERANCE = 6;

    if (browser) {
        const storedLocale = localStorage.getItem("vd_locale");
        if (storedLocale && allowedLocales.has(storedLocale as Locale)) {
            locale = storedLocale as Locale;
        }
    }

    const startStage = (id: string) => {
        goto(`/quiz?category=${id}`);
    };

    const scrollToTop = () => {
        if (typeof window === "undefined") return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    };

    const goHome = () => {
        goto("/home");
    };

    const updateMobile = () => {
        isMobile = mobileQuery ? mobileQuery.matches : false;
    };

    const getSystemTheme = (): Theme => {
        if (typeof window === "undefined" || typeof matchMedia === "undefined") return "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const applyTheme = (value: Theme) => {
        theme = value;
        if (typeof document !== "undefined") {
            document.documentElement.dataset.theme = value;
            document.body.dataset.theme = value;
        }
    };

    const syncPreferencesFromStorage = () => {
        const storedLocale =
            typeof localStorage !== "undefined" ? localStorage.getItem("vd_locale") : null;
        if (storedLocale && allowedLocales.has(storedLocale as Locale)) {
            locale = storedLocale as Locale;
        } else {
            locale = "en";
        }

        const storedTheme =
            typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
        const storedAuto =
            typeof localStorage !== "undefined" ? localStorage.getItem("theme_auto") : null;
        const system = getSystemTheme();
        manualTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : system;
        automaticTheme = storedAuto === "1";
        applyTheme(automaticTheme ? system : manualTheme);
    };

    const eraComparator = (a: Era, b: Era) => {
        const aIsMeta = a.type === "meta";
        const bIsMeta = b.type === "meta";
        if (aIsMeta !== bIsMeta) return aIsMeta ? 1 : -1;
        const ao = Number.isFinite(a.order) ? a.order : MAX_ORDER;
        const bo = Number.isFinite(b.order) ? b.order : MAX_ORDER;
        return ao - bo || a.id.localeCompare(b.id);
    };

    const pickLocale = (value: Record<Locale, string>) => value[locale] ?? value.en;

    const resolveStageBackground = (imagePath: string) => {
        if (theme === "light" && imagePath.includes("quest-hero")) {
            return "/illustrations/quest-hero-light.svg";
        }
        return imagePath;
    };

    const resolveEraBackground = (era: Era) => era.imagePath ?? "/illustrations/quest-hero.svg";

    const buildStages = (items: Era[], _theme: Theme): Stage[] => {
        const sorted = [...items].sort(eraComparator);
        const denominator = Math.max(sorted.length - 1, 1);

        return sorted.map((era, index) => ({
            id: era.id,
            title: pickLocale(era.label),
            era: pickLocale(era.name),
            summary: `${era.episodeCount} ${era.episodeCount === 1 ? "episode" : "episodes"}`,
            progress: sorted.length === 1 ? 1 : index / denominator,
            offset: 0,
            side: index % 2 === 0 ? "left" : "right",
            bgImage: resolveStageBackground(resolveEraBackground(era)),
        }));
    };

    $: stages = buildStages(eras, theme);
    $: timelineStages = [...stages].reverse();
    $: overallProgress = stages.length
        ? stages.reduce((total, stage) => total + stage.progress, 0) / stages.length
        : 0;
    $: heroCopy = timelineHero[locale] ?? timelineHero.en;

    const autoScrollToFirstIncomplete = async () => {
        if (hasAutoScrolled || !timelineStages.length || typeof window === "undefined") return;
        await tick();
        let targetIndex = -1;
        for (let index = timelineStages.length - 1; index >= 0; index -= 1) {
            if (timelineStages[index].progress < 1) {
                targetIndex = index;
                break;
            }
        }
        if (targetIndex === -1) {
            targetIndex = timelineStages.length - 1;
        }
        const target = document.querySelector<HTMLElement>(
            `[data-timeline-index="${targetIndex}"]`,
        );
        if (!target) {
            if (autoScrollAttempts < MAX_AUTO_SCROLL_ATTEMPTS) {
                autoScrollAttempts += 1;
                requestAnimationFrame(() => {
                    void autoScrollToFirstIncomplete();
                });
            }
            return;
        }
        const rect = target.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const desiredTop = Math.max(0, absoluteTop - window.innerHeight / 2 + rect.height / 2);
        if (Math.abs(window.scrollY - desiredTop) <= SCROLL_TARGET_TOLERANCE) {
            hasAutoScrolled = true;
            return;
        }
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: desiredTop,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        hasAutoScrolled = true;
    };

    const scheduleAutoScroll = () => {
        if (typeof window === "undefined") return;
        if (autoScrollTimer) {
            clearTimeout(autoScrollTimer);
        }
        autoScrollAttempts = 0;
        autoScrollTimer = setTimeout(() => {
            void autoScrollToFirstIncomplete();
        }, 120);
    };

    onMount(() => {
        if (typeof window === "undefined") return;
        syncPreferencesFromStorage();
        mobileQuery = window.matchMedia("(max-width: 900px)");
        const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (!automaticTheme) return;
            applyTheme(getSystemTheme());
        };
        mobileQuery.addEventListener("change", updateMobile);
        themeMediaQuery.addEventListener("change", handleSystemThemeChange);
        updateMobile();
        window.addEventListener("storage", syncPreferencesFromStorage);
        scheduleAutoScroll();

        afterNavigate(() => {
            scheduleAutoScroll();
        });

        return () => {
            mobileQuery?.removeEventListener("change", updateMobile);
            themeMediaQuery.removeEventListener("change", handleSystemThemeChange);
            window.removeEventListener("storage", syncPreferencesFromStorage);
            if (autoScrollTimer) {
                clearTimeout(autoScrollTimer);
            }
        };
    });

    onDestroy(() => {
        mobileQuery?.removeEventListener("change", updateMobile);
    });
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
        {#each timelineStages as stage, index}
            {@const side = isMobile ? "right" : stage.side}
            {@const tone = stage.progress <= 0 ? "idle" : stage.progress >= 1 ? "done" : "active"}
            <div class={`timeline-row ${side}`} data-timeline-index={index}>
                <div class={`card-slot ${side === "left" ? "has-card left" : ""}`}>
                    {#if side === "left"}
                        <TimelineCard
                            stageId={stage.id}
                            title={stage.title}
                            era={stage.era}
                            summary={stage.summary}
                            progress={stage.progress}
                            offset={stage.offset}
                            bgImage={stage.bgImage}
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
                            title={stage.title}
                            era={stage.era}
                            summary={stage.summary}
                            progress={stage.progress}
                            offset={stage.offset}
                            bgImage={stage.bgImage}
                            on:click={() => startStage(stage.id)}
                        />
                    {/if}
                </div>
            </div>
        {/each}
        <div class="timeline-end">
            <button
                type="button"
                class="end-marker-button"
                on:click={scrollToTop}
                aria-label="To the top"
            >
                <span class="end-marker" aria-hidden="true">
                    <span class="end-marker-arrow"></span>
                </span>
                <span class="to-top-tooltip" role="tooltip">To the top</span>
            </button>
        </div>
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
        --spine-end-gap: 38px;
        position: relative;
        display: grid;
        gap: 2.2rem;
        padding-top: 4.5rem;
    }

    .spine {
        position: absolute;
        top: 0;
        bottom: var(--spine-end-gap);
        left: 50%;
        width: 3px;
        transform: translateX(-50%);
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--accent) 18%, transparent),
            color-mix(in srgb, var(--accent) 68%, transparent),
            color-mix(in srgb, var(--accent) 34%, transparent) 92%,
            transparent 100%
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

    .timeline-end {
        --spine-x: 50%;
        position: relative;
        min-height: 72px;
        margin-top: 0.2rem;
    }

    .end-marker-button {
        position: absolute;
        left: var(--spine-x);
        top: 0;
        transform: translateX(-50%);
        width: 34px;
        height: 34px;
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        display: grid;
        place-items: center;
    }

    .end-marker {
        position: absolute;
        inset: 4px;
        width: 26px;
        height: 26px;
        border-radius: 9px;
        border: 2px solid color-mix(in srgb, var(--accent) 72%, transparent);
        display: grid;
        place-items: center;
        background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--panel-veil-1) 90%, transparent),
            color-mix(in srgb, var(--panel-veil-2) 88%, transparent)
        );
        box-shadow:
            0 8px 16px var(--shadow-soft),
            inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
    }

    .end-marker-arrow {
        width: 8px;
        height: 8px;
        border-left: 2px solid color-mix(in srgb, var(--accent) 92%, transparent);
        border-top: 2px solid color-mix(in srgb, var(--accent) 92%, transparent);
        transform: rotate(45deg) translate(1px, 1px);
    }

    .to-top-tooltip {
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        background: color-mix(in srgb, var(--bg) 88%, transparent);
        border: 1px solid var(--outline-soft);
        border-radius: 999px;
        color: var(--text-subtle);
        padding: 0.2rem 0.55rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition:
            color 120ms ease,
            opacity 120ms ease,
            transform 120ms ease;
    }

    .end-marker-button:hover .to-top-tooltip,
    .end-marker-button:focus-visible .to-top-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(-2px);
    }

    .end-marker-button:hover .end-marker {
        border-color: color-mix(in srgb, var(--accent) 86%, transparent);
        box-shadow:
            0 10px 18px var(--shadow-soft),
            inset 0 0 0 1px color-mix(in srgb, var(--accent) 24%, transparent);
    }

    .end-marker-button:focus-visible {
        outline: none;
    }

    .end-marker-button:focus-visible .end-marker {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
    }

    .end-marker-button:hover .to-top-tooltip {
        color: var(--text);
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

        .timeline-end {
            --spine-x: 32px;
        }
    }

    @media (max-width: 640px) {
        .hero {
            padding: 1.6rem;
        }
    }
</style>
