<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import { goto } from "$app/navigation";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import type { Era, EraEpisode, Level, Locale, Question } from "$lib/types";
    import { onMount } from "svelte";
    import { homeLandingText, homeUiText } from "./content";

    export let data: {
        questions: Question[];
        locales: { id: Locale; label: string; name: string; flag?: string }[];
        levels: Level[];
        eras: Era[];
    };

    let questions: Question[] = data.questions ?? [];
    let uiText: Record<Locale, Record<string, string>> = homeUiText;
    let locales = (data.locales ?? []) as {
        id: Locale;
        label: string;
        name: string;
        flag?: string;
    }[];
    const fallbackLocales: {
        id: Locale;
        label: string;
        name: string;
        flag?: string;
    }[] = [
        { id: "en", label: "EN", name: "English", flag: "🇬🇧" },
        { id: "es", label: "ES", name: "Español", flag: "🇪🇸" },
        { id: "pt", label: "PT", name: "Português", flag: "🇧🇷" },
        { id: "sv", label: "SV", name: "Svenska", flag: "🇸🇪" },
    ];
    if (!locales.length) {
        locales = [...fallbackLocales];
    } else if (!locales.some((l) => l.id === "sv")) {
        locales = [...locales, fallbackLocales.find((l) => l.id === "sv")!];
    }
    let flags: Record<Locale, string> = Object.fromEntries(
        locales.map((l) => [l.id, l.flag ?? ""]),
    ) as Record<Locale, string>;
    const languages: { id: Locale; label: string; name: string }[] = locales.map((l) => ({
        id: l.id,
        label: l.label,
        name: l.name,
    }));
    let levels: Level[] = data.levels ?? [];
    let eras: Era[] = data.eras ?? [];

    type Theme = "light" | "dark";

    let locale: Locale = "en";
    let menuOpen = false;
    let theme: Theme = "dark";
    let isMobile = false;

    $: totalQuestions = questions.length;
    $: progressPercent = 0;
    $: progressStage = questions[0]?.stage?.[locale] ?? "";
    $: levelValue = levels.length ? levels[0].label[locale] : "";

    $: currentTexts = uiText[locale] ?? uiText.en ?? {};
    let t = (key: string) => currentTexts[key] ?? key;
    $: t = (key: string) => currentTexts[key] ?? key;
    $: landing = homeLandingText[locale] ?? homeLandingText.en;

    const markVisited = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("vd_has_visited", "1");
        }
    };

    const selectLanguage = (id: Locale) => {
        locale = id;
        menuOpen = false;
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("vd_locale", id);
        }
    };
    const toggleMenu = () => (menuOpen = !menuOpen);

    const applyTheme = (value: Theme) => {
        theme = value;
        if (typeof document !== "undefined") {
            document.documentElement.dataset.theme = value;
            document.body.dataset.theme = value;
        }
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", value);
        }
    };

    const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

    const startTimeline = () => {
        markVisited();
        goto("/quiz?category=timeline");
    };

    const startCategory = (id: string) => {
        markVisited();
        goto(`/quiz?category=${id}`);
    };

    const startEpisode = (eraId: string, episodeId: string) => {
        markVisited();
        goto(`/quiz?category=${eraId}&episode=${episodeId}`);
    };

    type MixedCard =
        | { kind: "era"; era: Era }
        | { kind: "episode"; era: Era; episode: EraEpisode };

    const buildMixedCards = (items: Era[]): MixedCard[] => {
        const mixed: MixedCard[] = [];
        const leftovers: { era: Era; episode: EraEpisode }[] = [];

        for (const era of items) {
            mixed.push({ kind: "era", era });
            const [first, ...rest] = era.episodes;
            if (first) {
                mixed.push({ kind: "episode", era, episode: first });
            }
            for (const episode of rest) {
                leftovers.push({ era, episode });
            }
        }

        for (const item of leftovers) {
            mixed.push({ kind: "episode", era: item.era, episode: item.episode });
        }

        return mixed;
    };

    $: mixedCards = buildMixedCards(eras);
    $: hasCards = mixedCards.length > 0;

    onMount(() => {
        const updateIsMobile = () => {
            isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
        };
        updateIsMobile();
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
        const storedLocale =
            typeof localStorage !== "undefined" ? localStorage.getItem("vd_locale") : null;
        const prefersDark =
            typeof matchMedia !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next =
            stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
        applyTheme(next as Theme);
        if (storedLocale && languages.some((item) => item.id === storedLocale)) {
            locale = storedLocale as Locale;
        }
        markVisited();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    });
</script>

<main class={`page ${theme === "light" ? "light-theme" : "dark-theme"}`}>
    <div class="glow gold" aria-hidden="true"></div>
    <div class="glow purple" aria-hidden="true"></div>
    <div class="glow crimson" aria-hidden="true"></div>

    <MobileMenu
        {menuOpen}
        {toggleMenu}
        {theme}
        {toggleTheme}
        title={t("profile")}
        username={t("guestName")}
        levelLabel={t("score")}
        {levelValue}
        accountLabel={t("account")}
        loginLabel={t("login")}
        guestPrefLabel={t("guestPref")}
        styleLabel="Theme"
        exploreLabel={t("explore")}
        welcomeIntroLabel={t("welcomeIntro")}
        languageLabel={t("language")}
        {languages}
        {locale}
        {flags}
        {selectLanguage}
    />

    {#if !isMobile}
        <Hero
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            progressLabel={`${t("question")} 0 ${t("of")} ${totalQuestions}`}
            {progressStage}
            {progressPercent}
            {theme}
        >
            <MenuPanel
                slot="panel"
                title={t("profile")}
                username={t("guestName")}
                levelLabel={t("score")}
                {levelValue}
                accountLabel={t("account")}
                loginLabel={t("login")}
                guestPrefLabel={t("guestPref")}
                styleLabel="Theme"
                exploreLabel={t("explore")}
                welcomeIntroLabel={t("welcomeIntro")}
                languageLabel={t("language")}
                {languages}
                {locale}
                {flags}
                {menuOpen}
                {toggleMenu}
                {theme}
                {toggleTheme}
                {selectLanguage}
            />
        </Hero>
    {/if}

    <section class="landing">
        <header class="landing-header">
            <p class="landing-eyebrow">{landing.eyebrow}</p>
            <h2>{landing.title}</h2>
            <p class="landing-body">
                {landing.body}
            </p>
            <a class="timeline-link" href="/timeline">{landing.viewTimeline}</a>
        </header>

        <p class="section-label">{landing.sectionLabel}</p>
        <div class="eras-grid">
            <article class="era-card timeline">
                <div>
                    <p class="era-title">
                        {landing.timelineTitle}
                        <span class="pill">{landing.guidedLabel}</span>
                    </p>
                    <p class="era-body">
                        {landing.timelineBody}
                    </p>
                </div>
                <button
                    class="ghost"
                    type="button"
                    aria-label={landing.startTimeline}
                    on:click={startTimeline}
                >
                    {landing.startTimeline}
                </button>
            </article>
            {#each mixedCards as card}
                {#if card.kind === "era"}
                    <article class="era-card era-wide">
                        <div class="era-top">
                            <p class="era-title">
                                {card.era.label[locale] ?? card.era.label.en}
                            </p>
                            <p class="era-meta">
                                {card.era.episodeCount} {landing.episodeCountLabel}
                            </p>
                        </div>
                        <p class="era-body">
                            {card.era.name[locale] ?? card.era.name.en}
                        </p>
                        {#if card.era.episodes.length}
                            <div class="episode-chips">
                                {#each card.era.episodes.slice(0, 3) as episode}
                                    <span>{episode.label[locale] ?? episode.label.en}</span>
                                {/each}
                            </div>
                        {/if}
                        <button
                            class="ghost"
                            type="button"
                            aria-label={`${landing.startPrefix} ${card.era.label[locale] ?? card.era.label.en}`}
                            on:click={() => startCategory(card.era.id)}
                        >
                            {`${landing.startPrefix} ${card.era.label[locale] ?? card.era.label.en}`}
                        </button>
                    </article>
                {:else}
                    <article class="episode-card">
                        <div>
                            <p class="episode-kicker">{card.era.label[locale] ?? card.era.label.en}</p>
                            <p class="episode-title">
                                {card.episode.label[locale] ?? card.episode.label.en}
                            </p>
                        </div>
                        <button
                            class="ghost ghost-episode"
                            type="button"
                            aria-label={`${landing.startEpisode}: ${card.episode.label[locale] ?? card.episode.label.en}`}
                            on:click={() => startEpisode(card.era.id, card.episode.id)}
                        >
                            {landing.startEpisode}
                        </button>
                    </article>
                {/if}
            {/each}
            {#if !hasCards}
                <article class="era-card empty-card">
                    <p class="era-title">{landing.sectionLabel}</p>
                    <p class="era-body">{landing.timelineBody}</p>
                </article>
            {/if}
        </div>
    </section>
</main>

<style>
    .page {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        overflow: hidden;
        padding: 12px;
    }

    .page.light-theme {
        background: linear-gradient(180deg, #f8f3e7 0%, #f2eadb 100%);
    }

    .page.dark-theme {
        background: linear-gradient(180deg, #0f1119 0%, #131827 100%);
    }

    .glow {
        position: absolute;
        width: 380px;
        height: 380px;
        border-radius: 50%;
        filter: blur(140px);
        opacity: 0.9;
        z-index: 0;
    }

    .glow.gold {
        background: var(--glow-gold);
        top: -140px;
        left: -120px;
    }

    .glow.purple {
        background: var(--glow-purple);
        top: 120px;
        right: -160px;
    }

    .glow.crimson {
        background: var(--glow-crimson);
        bottom: -160px;
        left: 28%;
    }

    .landing {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 1.6rem;
        padding: 2.1rem;
        border-radius: 26px;
        border: 1px solid rgba(205, 162, 92, 0.24);
        background:
            radial-gradient(circle at 12% 12%, rgba(255, 221, 160, 0.25), transparent 48%),
            radial-gradient(circle at 90% 18%, rgba(118, 146, 186, 0.16), transparent 55%),
            linear-gradient(155deg, rgba(255, 251, 242, 0.98), rgba(238, 225, 202, 0.92));
        box-shadow: 0 18px 40px var(--shadow-strong);
        overflow: hidden;
    }

    .page.dark-theme .landing {
        background:
            radial-gradient(circle at 12% 12%, rgba(255, 206, 133, 0.16), transparent 48%),
            radial-gradient(circle at 88% 16%, rgba(120, 152, 196, 0.14), transparent 55%),
            linear-gradient(150deg, rgba(12, 16, 28, 0.98), rgba(18, 24, 40, 0.94));
        border-color: rgba(201, 157, 86, 0.22);
    }

    .landing::before,
    .landing::after {
        content: "";
        position: absolute;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        background: conic-gradient(
            from 120deg,
            rgba(255, 214, 138, 0.24),
            transparent 40%,
            rgba(103, 126, 173, 0.18)
        );
        opacity: 0.55;
        z-index: 0;
        filter: blur(2px);
    }

    .landing::before {
        top: -120px;
        right: -80px;
    }

    .landing::after {
        bottom: -140px;
        left: -90px;
    }

    .landing-header {
        display: grid;
        gap: 0.7rem;
        position: relative;
        z-index: 1;
    }

    .timeline-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.55rem 0.9rem;
        border-radius: 999px;
        border: 1px solid var(--outline-soft);
        background: rgba(255, 255, 255, 0.12);
        color: var(--text);
        text-decoration: none;
        font-weight: 700;
        width: fit-content;
        box-shadow: 0 10px 20px var(--shadow-soft);
        transition:
            transform 120ms ease,
            box-shadow 120ms ease,
            border-color 120ms ease;
    }

    .timeline-link:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        box-shadow: 0 14px 24px var(--shadow-soft);
    }

    .timeline-link:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .landing-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
    }

    .landing-header h2 {
        font-family: var(--font-display);
        font-size: clamp(1.7rem, 2vw + 1.3rem, 2.6rem);
        margin: 0;
    }

    .landing-body {
        margin: 0;
        color: var(--text-muted);
        max-width: 560px;
    }

    .section-label {
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.72rem;
        color: var(--text-muted);
        margin: 0;
        position: relative;
        z-index: 1;
    }

    .eras-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.1rem;
        position: relative;
        z-index: 1;
    }

    @media (min-width: 900px) and (max-width: 1199px) {
        .eras-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (min-width: 1200px) {
        .eras-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    .era-card {
        display: grid;
        gap: 1rem;
        padding: 1.35rem 1.4rem;
        border-radius: 18px;
        border: 1px solid rgba(130, 106, 60, 0.18);
        background: linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(246, 237, 219, 0.92));
        box-shadow: 0 14px 30px var(--shadow-soft);
        min-height: 190px;
    }

    .era-wide {
        grid-column: span 2;
        min-height: 236px;
        padding: 1.65rem 1.7rem;
        border-color: rgba(212, 166, 95, 0.34);
        background:
            radial-gradient(circle at 14% 14%, rgba(255, 220, 153, 0.26), transparent 50%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.97), rgba(245, 233, 210, 0.94));
        box-shadow: 0 22px 36px var(--shadow-soft);
    }

    .era-wide:hover {
        transform: translateY(-2px);
        box-shadow: 0 26px 40px var(--shadow-strong);
    }

    .page.dark-theme .era-wide {
        background:
            radial-gradient(circle at 14% 14%, rgba(255, 200, 112, 0.18), transparent 50%),
            linear-gradient(152deg, rgba(15, 20, 34, 0.98), rgba(25, 31, 49, 0.94));
        border-color: rgba(228, 176, 92, 0.35);
    }

    .era-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.8rem;
    }

    .era-meta {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.68rem;
        color: var(--text-muted);
        border: 1px solid var(--outline-soft);
        border-radius: 999px;
        padding: 0.18rem 0.5rem;
        white-space: nowrap;
    }

    .episode-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    .episode-chips span {
        font-size: 0.72rem;
        border-radius: 999px;
        padding: 0.2rem 0.55rem;
        border: 1px solid var(--outline-soft);
        color: var(--text-muted);
        background: var(--surface-soft);
    }

    .episode-card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.75rem;
        align-items: center;
        padding: 0.85rem 0.95rem 0.85rem 1.05rem;
        border-radius: 12px;
        border: 1px solid rgba(130, 106, 60, 0.18);
        border-left: 4px solid color-mix(in srgb, var(--accent) 55%, transparent);
        background: linear-gradient(165deg, rgba(255, 255, 255, 0.9), rgba(243, 233, 214, 0.88));
        box-shadow: 0 8px 16px var(--shadow-soft);
        min-height: 108px;
    }

    .episode-card:hover {
        transform: translateY(-1px);
        border-color: color-mix(in srgb, var(--accent) 55%, transparent);
        box-shadow: 0 12px 18px var(--shadow-soft);
    }

    .empty-card {
        grid-column: 1 / -1;
    }

    .page.dark-theme .episode-card {
        background: linear-gradient(155deg, rgba(16, 19, 32, 0.94), rgba(23, 28, 44, 0.9));
        border-color: rgba(200, 160, 95, 0.18);
    }

    .episode-kicker {
        margin: 0 0 0.18rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        font-size: 0.63rem;
        color: var(--text-muted);
    }

    .episode-title {
        margin: 0;
        font-weight: 650;
        line-height: 1.28;
        font-size: 0.89rem;
    }

    .episode-card .ghost {
        padding: 0.5rem 0.65rem;
        font-size: 0.78rem;
        white-space: nowrap;
    }

    .ghost-episode {
        background: color-mix(in srgb, var(--accent) 16%, transparent);
        border-color: color-mix(in srgb, var(--accent) 35%, var(--outline-soft));
    }

    .ghost-episode:hover {
        background: color-mix(in srgb, var(--accent) 26%, transparent);
    }

    .page.dark-theme .era-card {
        background: linear-gradient(150deg, rgba(13, 17, 29, 0.96), rgba(22, 26, 42, 0.92));
        border-color: rgba(200, 160, 95, 0.18);
    }

    .era-card.timeline {
        background:
            radial-gradient(circle at 18% 18%, rgba(255, 214, 138, 0.2), transparent 55%),
            linear-gradient(160deg, rgba(255, 252, 245, 0.97), rgba(243, 232, 212, 0.92));
        border-color: rgba(213, 170, 94, 0.45);
    }

    .page.dark-theme .era-card.timeline {
        background:
            radial-gradient(circle at 18% 18%, rgba(255, 197, 117, 0.18), transparent 55%),
            linear-gradient(150deg, rgba(16, 20, 32, 0.96), rgba(20, 26, 42, 0.92));
        border-color: rgba(233, 178, 86, 0.35);
    }

    .era-title {
        margin: 0 0 0.35rem;
        font-weight: 800;
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.14rem;
    }

    .era-wide .era-title {
        font-size: 1.34rem;
        line-height: 1.2;
    }

    .era-body {
        margin: 0;
        color: var(--text-muted);
        line-height: 1.45;
    }

    .ghost {
        border: 1px solid var(--outline-soft);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);
        color: var(--text);
        padding: 0.7rem 1rem;
        font-weight: 700;
        cursor: pointer;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            background 120ms ease;
    }

    .ghost:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        background: rgba(255, 214, 138, 0.22);
    }

    .ghost:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .page.dark-theme .ghost:hover {
        background: rgba(255, 214, 138, 0.14);
    }

    .page.dark-theme .ghost {
        background: rgba(9, 12, 22, 0.6);
    }

    .pill {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.65rem;
        font-weight: 800;
        color: var(--accent);
        border: 1px solid rgba(233, 178, 86, 0.5);
        border-radius: 999px;
        padding: 0.15rem 0.45rem;
        background: rgba(255, 214, 138, 0.18);
    }

    @media (max-width: 720px) {
        .landing {
            padding: 1.6rem;
        }

        .era-title {
            flex-wrap: wrap;
        }

        .era-wide {
            grid-column: span 1;
        }

        .episode-card {
            grid-template-columns: 1fr;
            gap: 0.65rem;
            min-height: 0;
        }

        .episode-card .ghost {
            justify-self: start;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .ghost,
        .timeline-link,
        .era-card,
        .episode-card {
            transition: none;
        }

        .ghost:hover,
        .timeline-link:hover,
        .era-wide:hover,
        .episode-card:hover {
            transform: none;
        }
    }
</style>
