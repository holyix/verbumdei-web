<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import StickFigure from "$lib/components/StickFigure/StickFigure.svelte";
    import { onMount } from "svelte";
    import type { Locale } from "$lib/types";

    export let data: {
        resume: {
            eraId: string;
            eraLabel: string;
            episodeId: string;
            episodeLabel: string;
            completedQuestions: number;
            totalQuestions: number;
        } | null;
        eras: {
            id: string;
            label: string;
            episodeCount: number;
            completionPercent: number;
            isCurrentEra: boolean;
        }[];
        overall: {
            completedEpisodes: number;
            totalEpisodes: number;
            completedQuestions: number;
            totalQuestions: number;
        };
        recentEpisodes: {
            eraId: string;
            eraLabel: string;
            episodeId: string;
            episodeLabel: string;
            progressLabel: string;
        }[];
        showStartJourneyCta: boolean;
    };

    type Theme = "light" | "dark";
    let theme: Theme = "dark";
    let manualTheme: Theme = "dark";
    let automaticTheme = false;
    let menuOpen = false;
    let locale: Locale = "en";
    const labels = {
        profile: "Profile",
        guestName: "Guest pilgrim",
        score: "Level",
        account: "Account",
        login: "Login / Sign up",
        guestPref: "Prefer to stay guest",
        explore: "Explore",
        welcomeIntro: "Welcome intro",
        language: "Language",
    };
    const languages: { id: Locale; label: string; name: string }[] = [
        { id: "en", label: "EN", name: "English" },
        { id: "es", label: "ES", name: "Español" },
        { id: "pt", label: "PT", name: "Português" },
        { id: "sv", label: "SV", name: "Svenska" },
    ];
    let flags: Record<Locale, string> = {
        en: "🇬🇧",
        es: "🇪🇸",
        pt: "🇧🇷",
        sv: "🇸🇪",
    };

    $: overallEpisodePercent = Math.round(
        (data.overall.completedEpisodes / Math.max(1, data.overall.totalEpisodes)) * 100,
    );
    $: overallQuestionPercent = Math.round(
        (data.overall.completedQuestions / Math.max(1, data.overall.totalQuestions)) * 100,
    );
    $: completedEras = data.eras.filter((era) => era.completionPercent >= 100).length;
    $: overallEraPercent = Math.round(
        data.eras.reduce((sum, era) => sum + era.completionPercent, 0) /
            Math.max(1, data.eras.length),
    );
    $: heroPercent = Math.round((overallEpisodePercent + overallQuestionPercent) / 2);

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
        const currentTheme = automaticTheme ? getSystemTheme() : manualTheme;
        manualTheme = currentTheme === "dark" ? "light" : "dark";
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

    const selectLanguage = (id: Locale) => {
        locale = id;
        menuOpen = false;
    };

    onMount(() => {
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
        const storedAuto =
            typeof localStorage !== "undefined" ? localStorage.getItem("theme_auto") : null;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const system = getSystemTheme();
        manualTheme = stored === "light" || stored === "dark" ? stored : system;
        automaticTheme = storedAuto === "1";
        applyTheme(automaticTheme ? system : manualTheme);
        const handleSystemThemeChange = () => {
            if (!automaticTheme) return;
            applyTheme(getSystemTheme());
        };
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    });
</script>

<main class="progress-page">
    <Hero
        eyebrow="Progress"
        title="Your Study Progress"
        subtitle="Track completed episodes, continue your current episode, and return to recent study moments."
        progressLabel={`${data.overall.completedEpisodes} of ${data.overall.totalEpisodes} episodes`}
        progressStage={`${heroPercent}% overall`}
        progressPercent={heroPercent}
        {theme}
    >
        <MenuPanel
            slot="panel"
            title={labels.profile}
            username={labels.guestName}
            levelLabel={labels.score}
            levelValue={`E${data.overall.completedEpisodes}`}
            accountLabel={labels.account}
            loginLabel={labels.login}
            guestPrefLabel={labels.guestPref}
            styleLabel="Theme"
            exploreLabel={labels.explore}
            welcomeIntroLabel={labels.welcomeIntro}
            languageLabel={labels.language}
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

    {#if data.resume}
        <section class="resume" aria-label="Continue">
            <div>
                <p class="heading">Continue</p>
                <h1>{data.resume.episodeLabel}</h1>
                <p>{data.resume.eraLabel}</p>
            </div>
            <p class="metric">
                {data.resume.completedQuestions}/{data.resume.totalQuestions} questions
            </p>
            <a href={`/eras/${data.resume.eraId}/episodes/${data.resume.episodeId}`}>Continue</a>
        </section>
    {:else if data.showStartJourneyCta}
        <section class="resume" aria-label="Start">
            <div>
                <p class="heading">Start</p>
                <h1>Start your journey</h1>
                <p>Begin with an era and enter an episode to start the quiz path.</p>
            </div>
            <a href="/eras">Browse Eras</a>
        </section>
    {/if}

    <section class="overall" aria-label="Overall progress">
        <aside class="overall-figure" aria-label="Overall completion figure">
            <StickFigure overall={heroPercent} headTop={28} torsoTop={50} armsTop={60} />
            <p class="figure-label">Overall</p>
            <strong>{heroPercent}%</strong>
        </aside>
        <div class="overall-circles">
            <article class="circle-card">
                <div
                    class="circle-meter"
                    style={`--progress:${overallEraPercent}%;`}
                    aria-label={`Eras progress ${overallEraPercent}%`}
                >
                    <div class="circle-inner">
                        <strong>{overallEraPercent}%</strong>
                    </div>
                </div>
                <p>Eras</p>
                <span>{completedEras}/{data.eras.length}</span>
            </article>
            <article class="circle-card">
                <div
                    class="circle-meter"
                    style={`--progress:${overallEpisodePercent}%;`}
                    aria-label={`Episodes progress ${overallEpisodePercent}%`}
                >
                    <div class="circle-inner">
                        <strong>{overallEpisodePercent}%</strong>
                    </div>
                </div>
                <p>Episodes</p>
                <span>{data.overall.completedEpisodes}/{data.overall.totalEpisodes}</span>
            </article>
            <article class="circle-card">
                <div
                    class="circle-meter"
                    style={`--progress:${overallQuestionPercent}%;`}
                    aria-label={`Questions progress ${overallQuestionPercent}%`}
                >
                    <div class="circle-inner">
                        <strong>{overallQuestionPercent}%</strong>
                    </div>
                </div>
                <p>Questions</p>
                <span>{data.overall.completedQuestions}/{data.overall.totalQuestions}</span>
            </article>
        </div>
    </section>

    <section class="eras" aria-label="Eras">
        <div class="section-top">
            <h2>Eras</h2>
            <p>Primary navigation remains era-based.</p>
        </div>
        <div class="matrix">
            {#each data.eras as era}
                <a class:active={era.isCurrentEra} class="cell" href={`/eras/${era.id}`}>
                    <div>
                        <p class="name">{era.label}</p>
                        <p class="meta">{era.episodeCount} episodes</p>
                    </div>
                    <p class="percent">{era.completionPercent}%</p>
                </a>
            {/each}
        </div>
    </section>

    <section class="recent" aria-label="Recently studied episodes">
        <h2>Recently Studied Episodes</h2>
        <div class="row">
            {#each data.recentEpisodes as item}
                <a class="recent-card" href={`/eras/${item.eraId}/episodes/${item.episodeId}`}>
                    <p class="recent-era">{item.eraLabel}</p>
                    <p class="recent-name">{item.episodeLabel}</p>
                    <p class="recent-progress">{item.progressLabel}</p>
                </a>
            {/each}
        </div>
    </section>
</main>

<style>
    .progress-page {
        display: grid;
        gap: 1rem;
    }

    .resume {
        border: 1px solid var(--outline-soft);
        border-radius: 16px;
        padding: 1rem;
        background: linear-gradient(145deg, var(--surface), var(--panel-veil-2));
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 1rem;
    }

    .heading,
    .metric,
    .resume h1,
    .resume p {
        margin: 0;
    }

    .heading {
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-size: 0.72rem;
        color: var(--text-muted);
        margin-bottom: 0.4rem;
    }

    .resume h1 {
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
    }

    .resume p {
        color: var(--text-subtle);
    }

    .metric {
        color: var(--text-muted);
        white-space: nowrap;
    }

    .resume a {
        text-decoration: none;
        border-radius: 10px;
        background: var(--accent-soft);
        border: 1px solid var(--outline-soft);
        color: var(--text);
        padding: 0.5rem 0.75rem;
        white-space: nowrap;
    }

    .overall {
        border: 1px solid var(--outline-soft);
        border-radius: 16px;
        padding: 1rem;
        background: var(--surface-soft);
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 0.9rem;
        align-items: center;
    }

    .overall-circles {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.9rem;
        align-items: stretch;
        grid-auto-rows: 1fr;
    }

    .circle-card {
        display: grid;
        grid-template-rows: auto auto auto;
        justify-items: center;
        gap: 0.4rem;
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        padding: 0.75rem;
        min-height: 172px;
        height: 100%;
        box-sizing: border-box;
        background: color-mix(in srgb, var(--surface-soft) 80%, transparent);
    }

    .circle-card p,
    .circle-card strong,
    .circle-card span {
        margin: 0;
    }

    .circle-card p {
        font-size: 0.85rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .circle-card span {
        font-size: 0.88rem;
        color: var(--text-subtle);
    }

    .circle-meter {
        --size: 92px;
        width: var(--size);
        height: var(--size);
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: conic-gradient(
            color-mix(in srgb, var(--accent) 82%, white 8%) 0%,
            color-mix(in srgb, var(--accent) 82%, white 8%) var(--progress),
            color-mix(in srgb, var(--outline-soft) 70%, transparent) var(--progress),
            color-mix(in srgb, var(--outline-soft) 70%, transparent) 100%
        );
    }

    .circle-inner {
        width: calc(var(--size) - 16px);
        height: calc(var(--size) - 16px);
        border-radius: 999px;
        background: color-mix(in srgb, var(--surface) 90%, transparent);
        display: grid;
        place-items: center;
        border: 1px solid var(--outline-soft);
    }

    .circle-inner strong {
        font-size: 0.98rem;
    }

    .overall-figure {
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        padding: 0.85rem 0.95rem;
        min-width: 160px;
        min-height: 172px;
        height: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: auto auto auto;
        align-content: center;
        justify-items: center;
        gap: 0.4rem;
        background: color-mix(in srgb, var(--surface-soft) 80%, transparent);
    }

    .overall-figure :global(.stick-figure) {
        width: 96px;
        height: 96px;
    }

    .overall-figure :global(.stick-figure .halo-ring) {
        width: 90px;
        height: 90px;
    }

    .figure-label {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
        color: var(--text-muted);
    }

    .overall-figure strong {
        font-size: 1.15rem;
    }

    .eras {
        border: 1px solid var(--outline-soft);
        border-radius: 16px;
        padding: 1rem;
        background: var(--card-veil-1);
    }

    .section-top {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: baseline;
        margin-bottom: 0.75rem;
    }

    .section-top h2,
    .section-top p {
        margin: 0;
    }

    .section-top p {
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .matrix {
        display: grid;
        gap: 0.55rem;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    }

    .cell {
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        padding: 0.8rem;
        display: flex;
        justify-content: space-between;
        gap: 0.7rem;
        align-items: center;
        background: var(--surface-soft);
    }

    .cell.active {
        border-color: var(--accent);
    }

    .name,
    .meta,
    .percent {
        margin: 0;
    }

    .name {
        font-weight: 700;
    }

    .meta {
        color: var(--text-muted);
        font-size: 0.86rem;
        margin-top: 0.2rem;
    }

    .percent {
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .recent {
        border: 1px solid var(--outline-soft);
        border-radius: 16px;
        padding: 1rem;
        background: var(--surface-soft);
    }

    .recent h2 {
        margin: 0 0 0.7rem;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
    }

    .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.55rem;
    }

    .recent-card {
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        padding: 0.7rem 0.75rem;
        background: var(--card-veil-1);
    }

    .recent-era,
    .recent-name,
    .recent-progress {
        margin: 0;
    }

    .recent-era {
        color: var(--text-muted);
        text-transform: uppercase;
        font-size: 0.7rem;
        letter-spacing: 0.09em;
    }

    .recent-name {
        margin-top: 0.25rem;
        font-weight: 650;
    }

    .recent-progress {
        margin-top: 0.25rem;
        color: var(--text-muted);
        font-size: 0.85rem;
    }

    @media (max-width: 760px) {
        .resume {
            grid-template-columns: 1fr;
            align-items: start;
        }

        .overall {
            grid-template-columns: 1fr;
        }

        .overall-circles {
            grid-template-columns: 1fr;
        }

        .overall-figure {
            justify-self: stretch;
        }

        .section-top {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
