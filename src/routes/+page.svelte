<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import { browser } from "$app/environment";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import QuestionCard from "$lib/components/Question/QuestionCard.svelte";
    import VictoryOverlay from "$lib/components/VictoryOverlay/VictoryOverlay.svelte";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import type { Level, Locale, Option, Question } from "$lib/types";
    import { onDestroy, onMount } from "svelte";
    export let data: {
        questions: Question[];
        uiText: Record<Locale, Record<string, string>>;
        locales: { id: Locale; label: string; name: string; flag?: string }[];
        levels: Level[];
    };
    let questions: Question[] = data.questions ?? [];
    let uiText: Record<Locale, Record<string, string>> = data.uiText ?? { en: {}, es: {}, pt: {} };
    let locales = (data.locales ?? []) as { id: Locale; label: string; name: string; flag?: string }[];
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
    const languages: { id: Locale; label: string; name: string }[] = locales.map((l) => ({
        id: l.id,
        label: l.label,
        name: l.name,
    }));
    let levels: Level[] = data.levels ?? [];

    const emptyQuestion: Question = {
        id: "",
        stage: { en: "", es: "", pt: "" },
        prompt: { en: "", es: "", pt: "" },
        options: [],
    };

    type Theme = "light" | "dark";

    const ANSWER_TIMER_MS = 12000;
    let locale: Locale = "en";
    let currentIndex = 0;
    let selected: string | null = null;
    let revealed = false;
    let retakes: Record<string, number> = {};
    let retakeCount = 0;
    let score = 0;
    let completed = false;
    let started = false;
    $: showVictory =
        started &&
        completed &&
        questions.length > 0 &&
        score >= questions.length;
    let menuOpen = false;
    let timeLeft = ANSWER_TIMER_MS;
    let answerTimer: ReturnType<typeof setTimeout> | null = null;
    let answerInterval: ReturnType<typeof setInterval> | null = null;
    let theme: Theme = "dark";
    let showHomeConfirm = false;

    $: {
        if (questions.length && currentIndex > questions.length - 1) {
            currentIndex = questions.length - 1;
        }
    }

    $: currentQuestion =
        questions.length > 0
            ? questions[Math.min(currentIndex, questions.length - 1)]
            : emptyQuestion;

    let selectedOption: Option | undefined;
    $: selectedOption = currentQuestion.options.find((o) => o.id === selected);
    $: isCorrect = !!selectedOption?.correct;
    $: retakeCount = retakes[currentQuestion.id] ?? 0;
    $: retakeAvailable = revealed && !isCorrect && retakeCount < 1 && !completed;

    const selectAnswer = (id: string) => {
        if (revealed) return;
        selected = id;
        revealed = true;
        const choice = currentQuestion.options.find((o) => o.id === id);
        if (choice?.correct) {
            score += 1;
        }
        clearAnswerTimer();
        if (currentIndex >= questions.length - 1) {
            completed = true;
        }
    };

    const nextQuestion = () => {
        if (completed) return;
        if (currentIndex < questions.length - 1) {
            currentIndex += 1;
            selected = null;
            revealed = false;
            retakeCount = retakes[currentQuestion.id] ?? 0;
            clearAnswerTimer();
        } else {
            completed = true;
            clearAnswerTimer();
        }
    };

    const restart = () => {
        currentIndex = 0;
        selected = null;
        revealed = false;
        completed = false;
        score = 0;
        retakes = {};
        clearAnswerTimer();
    };

    const startQuiz = () => {
        restart();
        started = true;
    };

    const goHome = () => {
        restart();
        started = false;
    };

    const confirmHome = () => {
        if (!browser) return;
        showHomeConfirm = true;
    };

    const confirmHomeYes = () => {
        showHomeConfirm = false;
        goHome();
    };

    const confirmHomeNo = () => {
        showHomeConfirm = false;
    };

    const retakeQuestion = () => {
        if (!retakeAvailable) return;
        const id = currentQuestion.id;
        retakes = { ...retakes, [id]: (retakes[id] ?? 0) + 1 };
        selected = null;
        revealed = false;
        clearAnswerTimer();
        timeLeft = ANSWER_TIMER_MS;
    };

    $: totalQuestions = questions.length;
    $: progressPercent =
        started && totalQuestions > 0
            ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
            : 0;

    $: levelIndex = levels.length
        ? Math.min(
              levels.length - 1,
              totalQuestions > 0
                  ? Math.floor((score / totalQuestions) * levels.length)
                  : 0,
          )
        : 0;
    $: levelValue = levels.length ? levels[levelIndex].label[locale] : "";
    const clearAnswerTimer = (reset: boolean = true) => {
        if (answerTimer) {
            clearTimeout(answerTimer);
            answerTimer = null;
        }
        if (answerInterval) {
            clearInterval(answerInterval);
            answerInterval = null;
        }
        if (reset) {
            timeLeft = ANSWER_TIMER_MS;
        }
    };

    const startAnswerTimer = (duration: number = ANSWER_TIMER_MS) => {
        if (completed) return;
        clearAnswerTimer(false);
        timeLeft = duration;
        answerInterval = setInterval(() => {
            timeLeft = Math.max(0, timeLeft - 50);
        }, 50);
        answerTimer = setTimeout(() => {
            clearAnswerTimer();
            if (!completed) {
                nextQuestion();
            }
        }, duration);
    };

    const pauseAnswerTimer = () => {
        clearAnswerTimer(false);
    };

    const resumeAnswerTimer = () => {
        if (!revealed || completed || timeLeft <= 0) return;
        startAnswerTimer(timeLeft);
    };

    $: currentTexts = uiText[locale] ?? uiText.en ?? {};
    let t = (key: string) => currentTexts[key] ?? key;
    $: t = (key: string) => currentTexts[key] ?? key;
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

    let isMobile = false;

    onMount(() => {
        const updateIsMobile = () => {
            isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
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
        applyTheme(next);
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    });

    onDestroy(() => clearAnswerTimer());
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

    {#if !(started && isMobile)}
        <Hero
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            progressLabel={`${t("question")} ${started ? currentIndex + 1 : 0} ${t("of")} ${questions.length}`}
            progressStage={started
                ? currentQuestion.stage[locale]
                : questions[0]?.stage?.[locale] ?? ""}
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

    {#if started}
        {#key currentQuestion.id}
            <QuestionCard
                question={currentQuestion}
                {locale}
                {selected}
                {revealed}
                {completed}
                retakeDisabled={!retakeAvailable}
                {timeLeft}
                answerDuration={ANSWER_TIMER_MS}
                {currentIndex}
                totalQuestions={questions.length}
                {t}
                answeredCorrectly={isCorrect}
                onSelect={selectAnswer}
                onNext={nextQuestion}
                onRetake={retakeQuestion}
                onRestart={restart}
                isLastQuestion={currentIndex === questions.length - 1}
                pauseTimer={pauseAnswerTimer}
                resumeTimer={resumeAnswerTimer}
                onHome={confirmHome}
                {theme}
            />
        {/key}
    {:else}
        <section class="intro-card">
            <p class="intro-eyebrow">{t("welcomeTitle")}</p>
            <h2>{t("subtitle")}</h2>
            <p class="intro-body">{t("welcomeBody")}</p>
            <button class="primary" on:click={startQuiz}>{t("start")}</button>
            <p class="intro-note">
                <span class="link disabled" data-tooltip="Coming soon">
                    {t("loginCta")}
                </span>
            </p>
        </section>
    {/if}

    {#if showVictory}
        <VictoryOverlay
            title={t("perfectTitle")}
            body={t("perfectBody")}
            cta={t("perfectCTA")}
            onRestart={restart}
            {theme}
        />
    {/if}

    <ConfirmDialog
        open={showHomeConfirm}
        title="Reset your progress?"
        body="Going home will reset your answers and score. Do you want to continue?"
        confirmLabel="Yes, reset"
        cancelLabel="Stay here"
        onConfirm={confirmHomeYes}
        onCancel={confirmHomeNo}
    />
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

    .intro-card {
        position: relative;
        z-index: 1;
        padding: 2.2rem;
        border: 1px solid var(--outline-soft);
        border-radius: 18px;
        background:
            linear-gradient(180deg, rgba(248, 243, 231, 0.9), rgba(234, 215, 188, 0.85)),
            url("/illustrations/quest-hero-light.svg") center/cover,
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2)),
            var(--bg);
        box-shadow: 0 18px 40px var(--shadow-strong);
        display: grid;
        gap: 1rem;
        min-height: 720px;
        align-content: space-between;
        justify-items: center;
    }

    .page.dark-theme .intro-card {
        background:
            linear-gradient(160deg, rgba(18, 26, 52, 0.9), rgba(18, 24, 41, 0.9)),
            linear-gradient(160deg, rgba(12, 14, 24, 0.6), rgba(18, 20, 32, 0.6)),
            url("/illustrations/quest-hero.svg") center/cover,
            var(--bg);
        color: var(--text);
    }

    .page.dark-theme .intro-eyebrow {
        color: var(--accent);
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    .page.dark-theme .intro-body {
        color: var(--text-muted);
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    .page.dark-theme .intro-card h2 {
        color: var(--text);
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.65);
    }

    .page.dark-theme .intro-note .link.disabled {
        color: var(--text);
    }

    .intro-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
    }

    .intro-body {
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
    }

    .intro-card .primary {
        justify-self: center;
        border: none;
        border-radius: 10px;
        padding: 0.9rem 1.2rem;
        font-weight: 800;
        color: var(--ink-strong);
        background: linear-gradient(
            135deg,
            var(--accent),
            var(--accent-strong)
        );
        box-shadow: 0 10px 20px var(--shadow-soft);
        cursor: pointer;
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            box-shadow 120ms ease;
    }

    .intro-card .primary:hover {
        transform: translateY(-1px);
    }

    .intro-note {
        margin: 0;
    }

    @media (max-width: 640px) {
        .intro-card {
            min-height: 820px;
            padding: 1.8rem;
        }
    }

    .intro-note .link {
        color: var(--accent);
        font-weight: 700;
        text-decoration: none;
    }

    .intro-note .link:hover {
        text-decoration: underline;
    }

    .intro-note .link.disabled {
        cursor: not-allowed;
        text-decoration: none;
        opacity: 0.75;
        position: relative;
    }

    .intro-note .link.disabled::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 0;
        bottom: 120%;
        background: var(--surface-strong);
        color: var(--text);
        border: 1px solid var(--outline-soft);
        border-radius: 8px;
        padding: 0.4rem 0.6rem;
        font-size: 0.8rem;
        white-space: nowrap;
        box-shadow: 0 10px 20px var(--shadow-soft);
        opacity: 0;
        transform: translateY(6px);
        transition:
            opacity 120ms ease,
            transform 120ms ease;
        pointer-events: none;
    }

    .intro-note .link.disabled:hover::after {
        opacity: 1;
        transform: translateY(0);
    }

</style>
