<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import { goto } from "$app/navigation";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import type { Era, Level, Locale, Question } from "$lib/types";
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
    let manualTheme: Theme = "dark";
    let automaticTheme = false;
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

    const setAutomaticTheme = (enabled: boolean) => {
        automaticTheme = enabled;
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme_auto", enabled ? "1" : "0");
        }
        if (enabled) {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(manualTheme);
        }
    };

    const toggleTheme = () => {
        manualTheme = manualTheme === "dark" ? "light" : "dark";
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", manualTheme);
        }
        if (automaticTheme) {
            automaticTheme = false;
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("theme_auto", "0");
            }
        }
        applyTheme(manualTheme);
    };

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

    const scrollToSection = (id: string) => {
        if (typeof document === "undefined" || typeof window === "undefined") return;
        const target = document.getElementById(id);
        if (target) {
            const top = window.scrollY + target.getBoundingClientRect().top - 12;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
    };

    const episodeStatus = (episodeId: string) => {
        const value = episodeId.length % 3;
        if (value === 0) return "completed";
        if (value === 1) return "started";
        return "not_started";
    };

    const primeEras: Era[] = [
        {
            id: "old-testament",
            label: {
                en: "Old Testament",
                es: "Antiguo Testamento",
                pt: "Antigo Testamento",
                sv: "Gamla testamentet",
            },
            name: {
                en: "From creation to the prophets.",
                es: "De la creación a los profetas.",
                pt: "Da criação aos profetas.",
                sv: "Från skapelsen till profeterna.",
            },
            episodeCount: 3,
            books: { en: [], es: [], pt: [], sv: [] },
            episodes: [
                {
                    id: "creation",
                    label: {
                        en: "Creation",
                        es: "Creación",
                        pt: "Criação",
                        sv: "Skapelsen",
                    },
                    name: {
                        en: "Creation",
                        es: "Creación",
                        pt: "Criação",
                        sv: "Skapelsen",
                    },
                    referenceCount: 0,
                },
                {
                    id: "patriarchs",
                    label: {
                        en: "Patriarchs",
                        es: "Patriarcas",
                        pt: "Patriarcas",
                        sv: "Patriarkerna",
                    },
                    name: {
                        en: "Patriarchs",
                        es: "Patriarcas",
                        pt: "Patriarcas",
                        sv: "Patriarkerna",
                    },
                    referenceCount: 0,
                },
                {
                    id: "prophets",
                    label: {
                        en: "Prophets",
                        es: "Profetas",
                        pt: "Profetas",
                        sv: "Profeterna",
                    },
                    name: {
                        en: "Prophets",
                        es: "Profetas",
                        pt: "Profetas",
                        sv: "Profeterna",
                    },
                    referenceCount: 0,
                },
            ],
        },
        {
            id: "new-testament",
            label: {
                en: "New Testament",
                es: "Nuevo Testamento",
                pt: "Novo Testamento",
                sv: "Nya testamentet",
            },
            name: {
                en: "From the Gospels to the early church.",
                es: "De los evangelios a la iglesia primitiva.",
                pt: "Dos evangelhos à igreja primitiva.",
                sv: "Från evangelierna till den tidiga kyrkan.",
            },
            episodeCount: 3,
            books: { en: [], es: [], pt: [], sv: [] },
            episodes: [
                {
                    id: "gospels",
                    label: {
                        en: "Gospels",
                        es: "Evangelios",
                        pt: "Evangelhos",
                        sv: "Evangelierna",
                    },
                    name: {
                        en: "Gospels",
                        es: "Evangelios",
                        pt: "Evangelhos",
                        sv: "Evangelierna",
                    },
                    referenceCount: 0,
                },
                {
                    id: "acts",
                    label: {
                        en: "Acts",
                        es: "Hechos",
                        pt: "Atos",
                        sv: "Apostlagärningarna",
                    },
                    name: {
                        en: "Acts",
                        es: "Hechos",
                        pt: "Atos",
                        sv: "Apostlagärningarna",
                    },
                    referenceCount: 0,
                },
                {
                    id: "letters",
                    label: {
                        en: "Letters",
                        es: "Cartas",
                        pt: "Cartas",
                        sv: "Breverna",
                    },
                    name: {
                        en: "Letters",
                        es: "Cartas",
                        pt: "Cartas",
                        sv: "Breverna",
                    },
                    referenceCount: 0,
                },
            ],
        },
    ];

    $: timelineEpisodeCount = primeEras.reduce((sum, era) => sum + era.episodes.length, 0);
    $: timelinePreviewEpisodes = primeEras
        .flatMap((era) => era.episodes)
        .slice(0, 3);
    $: timelineQuestionCount = timelineEpisodeCount;

    onMount(() => {
        const updateIsMobile = () => {
            isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
        };
        updateIsMobile();
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
        const storedAuto =
            typeof localStorage !== "undefined" ? localStorage.getItem("theme_auto") : null;
        const storedLocale =
            typeof localStorage !== "undefined" ? localStorage.getItem("vd_locale") : null;
        const system = getSystemTheme();
        manualTheme = stored === "light" || stored === "dark" ? stored : system;
        automaticTheme = storedAuto === "1";
        applyTheme(automaticTheme ? system : manualTheme);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (!automaticTheme) return;
            applyTheme(getSystemTheme());
        };
        if (storedLocale && languages.some((item) => item.id === storedLocale)) {
            locale = storedLocale as Locale;
        }
        markVisited();
        window.addEventListener("resize", updateIsMobile);
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => {
            window.removeEventListener("resize", updateIsMobile);
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
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
        {automaticTheme}
        {setAutomaticTheme}
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
                {automaticTheme}
                {setAutomaticTheme}
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
            <nav class="quick-links" aria-label="Home navigation">
                <a class="timeline-link" href="/timeline">Timeline</a>
                <button
                    type="button"
                    class="timeline-link link-button"
                    on:click={() => scrollToSection("eras-anchor")}
                >
                    Eras
                </button>
                <button
                    type="button"
                    class="timeline-link link-button disabled-link"
                    disabled
                    aria-disabled="true"
                    title="Teachers only (coming soon)"
                >
                    Collections
                </button>
                <a class="timeline-link" href="/progress">My progress</a>
            </nav>
        </header>

        <p id="collections-section" class="section-label">{landing.sectionLabel}</p>
        <div class="eras-grid prime-grid">
            <article class="era-card timeline">
                <div class="era-top">
                    <p class="era-title">
                        {landing.timelineTitle}
                        <span class="pill">{landing.guidedLabel}</span>
                    </p>
                    <p class="era-meta">
                        {timelineEpisodeCount} {landing.episodeCountLabel}
                    </p>
                </div>
                <div>
                    <p class="era-body">
                        {landing.timelineBody}
                    </p>
                </div>
                <div class="episode-chips">
                    {#each timelinePreviewEpisodes as episode}
                        <span>{episode.label[locale] ?? episode.label.en}</span>
                    {/each}
                    <span>...</span>
                </div>
                <div class="collection-footer">
                    <p class="collection-questions">{timelineQuestionCount} questions</p>
                    <button
                        class="ghost collection-play"
                        type="button"
                        aria-label={landing.startTimeline}
                        on:click={startTimeline}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 6.5v11l9-5.5z" />
                        </svg>
                    </button>
                </div>
            </article>
            {#each primeEras as era}
                <article class="era-card">
                    <div class="era-top">
                        <p class="era-title">
                            {era.label[locale] ?? era.label.en}
                        </p>
                        <p class="era-meta">
                            {era.episodeCount} {landing.episodeCountLabel}
                        </p>
                    </div>
                    <p class="era-body">
                        {era.name[locale] ?? era.name.en}
                    </p>
                    {#if era.episodes.length}
                        <div class="episode-chips">
                            {#each era.episodes.slice(0, 3) as episode}
                                <span>{episode.label[locale] ?? episode.label.en}</span>
                            {/each}
                        </div>
                    {/if}
                    <div class="collection-footer">
                        <p class="collection-questions">{era.episodeCount} questions</p>
                        <button
                            class="ghost collection-play"
                            type="button"
                            aria-label={`${landing.startPrefix} ${era.label[locale] ?? era.label.en}`}
                            on:click={() => startCategory(era.id)}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 6.5v11l9-5.5z" />
                            </svg>
                        </button>
                    </div>
                </article>
            {/each}
        </div>
        <p id="eras-anchor" class="section-label">ERAS</p>
        <section id="eras-section" class="era-stream" aria-label="Era episodes">
            {#if eras.length === 0}
                <article class="era-card empty-card">
                    <p class="era-title">{landing.sectionLabel}</p>
                    <p class="era-body">{landing.timelineBody}</p>
                </article>
            {:else}
                {#each eras as era}
                    <article class="era-row">
                        <header class="era-line-header">
                            <p class="era-line-title">{era.name[locale] ?? era.name.en}</p>
                            <div class="era-line-right">
                                <div class="era-line-symbol" aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            d="M6 3h8a4 4 0 0 1 4 4v13.5a.5.5 0 0 1-.76.43A6.9 6.9 0 0 0 14 20H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8c.7 0 1.38.1 2 .3V7a2 2 0 0 0-2-2H6Zm2 3h6v2H8V8Zm0 4h6v2H8v-2Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p class="era-line-books">
                                {era.label[locale] ?? era.label.en}
                            </p>
                            <p class="era-line-count">{era.episodes.length} {landing.episodeCountLabel}</p>
                        </header>
                        <div class="era-line-progress" aria-hidden="true">
                            <span
                                style={`width:${Math.min(
                                    100,
                                    Math.round((era.episodes.length / Math.max(1, era.episodeCount || era.episodes.length)) * 100),
                                )}%`}
                            ></span>
                        </div>
                        <div class="episode-track" role="list" aria-label={`${era.label[locale] ?? era.label.en} episodes`}>
                            {#each era.episodes as episode}
                                {@const status = episodeStatus(episode.id)}
                                <article class="episode-compact-card" role="listitem">
                                    {#if status !== "not_started"}
                                        <span
                                            class={`episode-state ${status === "completed" ? "completed" : "started"}`}
                                            aria-label={status === "completed"
                                                ? "Episode completed"
                                                : "Episode started"}
                                            title={status === "completed" ? "Completed" : "Started"}
                                        >
                                            {#if status === "completed"}
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path
                                                        d="m20.3 6.7-11 11a1 1 0 0 1-1.4 0l-4.2-4.2 1.4-1.4 3.5 3.5L18.9 5.3l1.4 1.4z"
                                                    />
                                                </svg>
                                            {:else}
                                                <span></span>
                                            {/if}
                                        </span>
                                    {/if}
                                    <p class="episode-compact-title">{episode.label[locale] ?? episode.label.en}</p>
                                    <p class="episode-book-ref">
                                        {#if era.books[locale]?.length}
                                            {era.books[locale][0]}
                                        {:else if era.books.en?.length}
                                            {era.books.en[0]}
                                        {:else}
                                            Scripture
                                        {/if}
                                    </p>
                                    <div class="episode-compact-actions">
                                        <p class="episode-question-count">
                                            {Math.max(1, episode.referenceCount || 0)} questions
                                        </p>
                                        <div class="episode-action-icons">
                                            <button
                                                class="play-chip"
                                                type="button"
                                                aria-label={`${landing.startEpisode}: ${episode.label[locale] ?? episode.label.en}`}
                                                on:click={() => startEpisode(era.id, episode.id)}
                                            >
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M8 6.5v11l9-5.5z" />
                                                </svg>
                                            </button>
                                            <a
                                                class="bible-chip"
                                                href={`/eras/${era.id}/episodes/${episode.id}`}
                                                aria-label={`Open references for ${episode.label[locale] ?? episode.label.en}`}
                                                title="Bible references"
                                            >
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path
                                                        d="M6 3h8a4 4 0 0 1 4 4v13.5a.5.5 0 0 1-.76.43A6.9 6.9 0 0 0 14 20H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8c.7 0 1.38.1 2 .3V7a2 2 0 0 0-2-2H6Zm2 3h6v2H8V8Zm0 4h6v2H8v-2Z"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            {/each}
                        </div>
                    </article>
                {/each}
            {/if}
        </section>
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

    .quick-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
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

    .link-button {
        appearance: none;
        cursor: pointer;
        font: inherit;
    }

    .disabled-link {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
        border-color: color-mix(in srgb, var(--outline-soft) 80%, transparent);
        box-shadow: none;
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

    .prime-grid {
        margin-bottom: 1.2rem;
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

        .prime-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
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

    .era-stream {
        display: grid;
        gap: 1rem;
        position: relative;
        z-index: 1;
        min-height: 72vh;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        padding-right: 0.35rem;
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb, var(--accent) 55%, var(--outline-soft))
            color-mix(in srgb, var(--surface-soft) 75%, transparent);
    }

    .era-stream::-webkit-scrollbar {
        width: 10px;
    }

    .era-stream::-webkit-scrollbar-track {
        background: color-mix(in srgb, var(--surface-soft) 75%, transparent);
        border-radius: 999px;
    }

    .era-stream::-webkit-scrollbar-thumb {
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--accent) 78%, var(--outline-soft)),
            color-mix(in srgb, var(--accent-strong) 74%, var(--outline-soft))
        );
        border-radius: 999px;
        border: 2px solid color-mix(in srgb, var(--surface-soft) 75%, transparent);
    }

    .era-stream::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--accent) 92%, var(--outline-soft)),
            color-mix(in srgb, var(--accent-strong) 88%, var(--outline-soft))
        );
    }

    .era-row {
        border: 1px solid rgba(130, 106, 60, 0.2);
        border-radius: 14px;
        padding: 0.95rem;
        background: linear-gradient(155deg, rgba(255, 255, 255, 0.92), rgba(244, 234, 215, 0.9));
        display: grid;
        gap: 0.65rem;
        box-shadow: 0 10px 20px var(--shadow-soft);
    }

    .page.dark-theme .era-row {
        background: linear-gradient(155deg, rgba(16, 19, 32, 0.96), rgba(23, 28, 44, 0.92));
        border-color: rgba(200, 160, 95, 0.2);
    }

    .era-line-header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas:
            "title right"
            "books count";
        gap: 0.35rem 0.65rem;
        align-items: end;
        padding: 0.05rem 0 0.08rem;
    }

    .era-line-right {
        grid-area: right;
        display: flex;
        align-items: center;
        gap: 0.34rem;
        align-self: start;
        justify-self: end;
    }

    .era-line-title,
    .era-line-books,
    .era-line-count {
        margin: 0;
    }

    .era-line-title {
        grid-area: title;
        font-weight: 760;
        font-size: 1.12rem;
        line-height: 1.1;
    }

    .era-line-books {
        grid-area: books;
        font-size: 0.84rem;
        color: var(--text-muted);
        line-height: 1.2;
    }

    .era-line-count {
        grid-area: count;
        align-self: end;
        justify-self: end;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        white-space: nowrap;
    }

    .era-line-symbol {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        border: 1px solid var(--outline-soft);
        background: color-mix(in srgb, var(--accent) 10%, transparent);
        color: color-mix(in srgb, var(--accent) 78%, var(--text));
    }

    .era-line-symbol svg {
        width: 12px;
        height: 12px;
        fill: currentColor;
    }

    .era-line-progress {
        height: 2px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent-strong) 14%, transparent);
        overflow: hidden;
    }

    .era-line-progress span {
        display: block;
        height: 100%;
        background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--accent-strong) 48%, transparent),
            color-mix(in srgb, var(--accent) 34%, transparent)
        );
        opacity: 0.72;
    }

    .episode-track {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.55rem;
    }

    .episode-compact-card {
        min-height: 96px;
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        background: var(--surface-soft);
        padding: 0.68rem;
        display: grid;
        grid-template-rows: auto auto 1fr;
        gap: 0.28rem;
        position: relative;
    }

    .episode-state {
        position: absolute;
        top: 0.52rem;
        right: 0.52rem;
        width: 14px;
        height: 14px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        border: 1px solid var(--outline-soft);
        opacity: 0.75;
    }

    .episode-state svg {
        width: 10px;
        height: 10px;
        fill: currentColor;
    }

    .episode-state.completed {
        color: color-mix(in srgb, var(--success) 58%, var(--text-muted));
        background: color-mix(in srgb, var(--success) 10%, transparent);
        border-color: color-mix(in srgb, var(--success) 24%, var(--outline-soft));
    }

    .episode-state.started {
        color: color-mix(in srgb, var(--accent) 54%, var(--text-muted));
        background: color-mix(in srgb, var(--accent) 10%, transparent);
        border-color: color-mix(in srgb, var(--accent) 24%, var(--outline-soft));
    }

    .episode-state.started span {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: currentColor;
        display: block;
    }

    .episode-compact-title {
        margin: 0;
        font-size: 0.89rem;
        line-height: 1.3;
        font-weight: 650;
        min-height: 0;
    }

    .episode-book-ref {
        margin: 0;
        font-size: 0.72rem;
        color: var(--text-muted);
        justify-self: start;
        align-self: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .episode-question-count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--text-muted);
    }

    .episode-compact-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        align-self: end;
    }

    .episode-action-icons {
        display: flex;
        align-items: center;
        gap: 0.42rem;
    }

    .play-chip {
        border: 1px solid var(--outline-soft);
        color: var(--accent);
        border-radius: 8px;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        padding: 0;
        background: var(--surface-soft);
        cursor: pointer;
    }

    .play-chip svg {
        width: 15px;
        height: 15px;
        fill: currentColor;
    }

    .bible-chip {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 8px;
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        color: var(--text);
    }

    .bible-chip svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
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

    .collection-play {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        padding: 0;
        display: grid;
        place-items: center;
        justify-self: start;
        background: var(--surface-soft);
    }

    .collection-play svg {
        width: 15px;
        height: 15px;
        fill: var(--accent);
    }

    .collection-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        margin-top: auto;
    }

    .collection-questions {
        margin: 0;
        font-size: 0.78rem;
        color: var(--text-muted);
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

        .era-line-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .era-stream {
            min-height: 66vh;
            max-height: calc(100vh - 110px);
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
