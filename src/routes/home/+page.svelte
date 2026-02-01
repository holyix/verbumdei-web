<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import { goto } from "$app/navigation";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import type { Level, Locale, Question } from "$lib/types";
    import { onMount } from "svelte";

    export let data: {
        questions: Question[];
        uiText: Record<Locale, Record<string, string>>;
        locales: { id: Locale; label: string; name: string; flag?: string }[];
        levels: Level[];
    };

    let questions: Question[] = data.questions ?? [];
    let uiText: Record<Locale, Record<string, string>> = data.uiText ?? {
        en: {},
        es: {},
        pt: {},
    };
    let locales = (data.locales ?? []) as {
        id: Locale;
        label: string;
        name: string;
        flag?: string;
    }[];
    if (!locales.length) {
        locales = [
            { id: "en", label: "EN", name: "English", flag: "🇬🇧" },
            { id: "es", label: "ES", name: "Español", flag: "🇪🇸" },
            { id: "pt", label: "PT", name: "Português", flag: "🇧🇷" },
        ];
    }
    let flags: Record<Locale, string> = Object.fromEntries(
        locales.map((l) => [l.id, l.flag ?? ""]),
    ) as Record<Locale, string>;
    const languages: { id: Locale; label: string; name: string }[] =
        locales.map((l) => ({
            id: l.id,
            label: l.label,
            name: l.name,
        }));
    let levels: Level[] = data.levels ?? [];

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
    $: landing = landingText[locale] ?? landingText.en;

    const markVisited = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("vd_has_visited", "1");
        }
    };

    const selectLanguage = (id: Locale) => {
        locale = id;
        menuOpen = false;
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

    const categories = [
        {
            id: "creation",
            title: {
                en: "Creation",
                es: "Creación",
                pt: "Criação",
            },
            body: {
                en: "Origins, covenant beginnings, and the first promises.",
                es: "Orígenes, inicios del pacto y las primeras promesas.",
                pt: "Origens, início da aliança e as primeiras promessas.",
            },
        },
        {
            id: "exodus",
            title: {
                en: "Exodus",
                es: "Éxodo",
                pt: "Êxodo",
            },
            body: {
                en: "Liberation, wilderness faith, and God’s covenant.",
                es: "Liberación, fe en el desierto y el pacto de Dios.",
                pt: "Libertação, fé no deserto e a aliança de Deus.",
            },
        },
        {
            id: "kings",
            title: {
                en: "Kings",
                es: "Reyes",
                pt: "Reis",
            },
            body: {
                en: "Rise and fall of Israel’s kingdom and its leaders.",
                es: "Ascenso y caída del reino de Israel y sus líderes.",
                pt: "Ascensão e queda do reino de Israel e seus líderes.",
            },
        },
        {
            id: "christ",
            title: {
                en: "Christ",
                es: "Cristo",
                pt: "Cristo",
            },
            body: {
                en: "Life, teachings, and redemption through Jesus.",
                es: "Vida, enseñanzas y redención en Jesús.",
                pt: "Vida, ensinamentos e redenção em Jesus.",
            },
        },
        {
            id: "church",
            title: {
                en: "Church",
                es: "Iglesia",
                pt: "Igreja",
            },
            body: {
                en: "The early church, apostles, and mission.",
                es: "La iglesia primitiva, los apóstoles y la misión.",
                pt: "A igreja primitiva, os apóstolos e a missão.",
            },
        },
    ];

    const landingText = {
        en: {
            eyebrow: "New journey",
            title: "Pick your path through Scripture",
            body: "Choose the full timeline for a guided story, or dive into a focused category.",
            sectionLabel: "Timeline or era",
            timelineTitle: "Full timeline",
            timelineBody:
                "Journey from Creation to the early Church with a curated sequence of questions.",
            startTimeline: "Start timeline",
            startPrefix: "Start",
            guidedLabel: "Guided",
        },
        es: {
            eyebrow: "Nuevo viaje",
            title: "Elige tu camino por la Escritura",
            body: "Elige la línea del tiempo completa para una historia guiada, o entra en una categoría.",
            sectionLabel: "Línea del tiempo o era",
            timelineTitle: "Línea del tiempo",
            timelineBody:
                "Viaja desde la Creación hasta la Iglesia primitiva con una secuencia guiada.",
            startTimeline: "Iniciar línea",
            startPrefix: "Iniciar",
            guidedLabel: "Guiada",
        },
        pt: {
            eyebrow: "Nova jornada",
            title: "Escolha seu caminho pelas Escrituras",
            body: "Escolha a linha do tempo completa para uma história guiada, ou foque em uma categoria.",
            sectionLabel: "Linha do tempo ou era",
            timelineTitle: "Linha do tempo",
            timelineBody:
                "Siga da Criação à Igreja primitiva com uma sequência guiada de perguntas.",
            startTimeline: "Iniciar linha",
            startPrefix: "Iniciar",
            guidedLabel: "Guiada",
        },
    } as const;

    onMount(() => {
        const updateIsMobile = () => {
            isMobile =
                typeof window !== "undefined"
                    ? window.innerWidth <= 768
                    : false;
        };
        updateIsMobile();
        const stored =
            typeof localStorage !== "undefined"
                ? localStorage.getItem("theme")
                : null;
        const prefersDark =
            typeof matchMedia !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next =
            stored === "light" || stored === "dark"
                ? stored
                : prefersDark
                  ? "dark"
                  : "light";
        applyTheme(next as Theme);
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
            progressStage={progressStage}
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
            <a class="timeline-link" href="/timeline">View timeline</a>
        </header>

        <p class="section-label">{landing.sectionLabel}</p>
        <div class="categories-grid">
            <article class="category-card timeline">
                <div>
                    <p class="category-title">
                        {landing.timelineTitle}
                        <span class="pill">{landing.guidedLabel}</span>
                    </p>
                    <p class="category-body">
                        {landing.timelineBody}
                    </p>
                </div>
                <button class="ghost" on:click={startTimeline}>
                    {landing.startTimeline}
                </button>
            </article>
            {#each categories as category}
                <article class="category-card">
                    <div>
                        <p class="category-title">
                            {category.title[locale] ?? category.title.en}
                        </p>
                        <p class="category-body">
                            {category.body[locale] ?? category.body.en}
                        </p>
                    </div>
                    <button
                        class="ghost"
                        on:click={() => startCategory(category.id)}
                    >
                        {landing.startPrefix}
                        {category.title[locale] ?? category.title.en}
                    </button>
                </article>
            {/each}
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
        background: radial-gradient(
                circle at 12% 12%,
                rgba(255, 221, 160, 0.25),
                transparent 48%
            ),
            radial-gradient(
                circle at 90% 18%,
                rgba(118, 146, 186, 0.16),
                transparent 55%
            ),
            linear-gradient(
                155deg,
                rgba(255, 251, 242, 0.98),
                rgba(238, 225, 202, 0.92)
            );
        box-shadow: 0 18px 40px var(--shadow-strong);
        overflow: hidden;
    }

    .page.dark-theme .landing {
        background: radial-gradient(
                circle at 12% 12%,
                rgba(255, 206, 133, 0.16),
                transparent 48%
            ),
            radial-gradient(
                circle at 88% 16%,
                rgba(120, 152, 196, 0.14),
                transparent 55%
            ),
            linear-gradient(
                150deg,
                rgba(12, 16, 28, 0.98),
                rgba(18, 24, 40, 0.94)
            );
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

    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.1rem;
        position: relative;
        z-index: 1;
    }

    @media (min-width: 900px) and (max-width: 1199px) {
        .categories-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (min-width: 1200px) {
        .categories-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    .category-card {
        display: grid;
        gap: 1rem;
        padding: 1.35rem 1.4rem;
        border-radius: 18px;
        border: 1px solid rgba(130, 106, 60, 0.18);
        background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.95),
            rgba(246, 237, 219, 0.92)
        );
        box-shadow: 0 14px 30px var(--shadow-soft);
        min-height: 190px;
    }

    .page.dark-theme .category-card {
        background: linear-gradient(
            150deg,
            rgba(13, 17, 29, 0.96),
            rgba(22, 26, 42, 0.92)
        );
        border-color: rgba(200, 160, 95, 0.18);
    }

    .category-card.timeline {
        background: radial-gradient(
                circle at 18% 18%,
                rgba(255, 214, 138, 0.2),
                transparent 55%
            ),
            linear-gradient(
                160deg,
                rgba(255, 252, 245, 0.97),
                rgba(243, 232, 212, 0.92)
            );
        border-color: rgba(213, 170, 94, 0.45);
    }

    .page.dark-theme .category-card.timeline {
        background: radial-gradient(
                circle at 18% 18%,
                rgba(255, 197, 117, 0.18),
                transparent 55%
            ),
            linear-gradient(
                150deg,
                rgba(16, 20, 32, 0.96),
                rgba(20, 26, 42, 0.92)
            );
        border-color: rgba(233, 178, 86, 0.35);
    }

    .category-title {
        margin: 0 0 0.35rem;
        font-weight: 700;
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.05rem;
    }

    .category-body {
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

        .category-title {
            flex-wrap: wrap;
        }
    }
</style>
