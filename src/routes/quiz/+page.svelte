<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import QuestionCard from "$lib/components/Question/QuestionCard.svelte";
    import VictoryOverlay from "$lib/components/VictoryOverlay/VictoryOverlay.svelte";
    import type { Level, Locale, Option, Question } from "$lib/types";
    import { onDestroy, onMount } from "svelte";

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
    $: showVictory = completed && questions.length > 0 && score >= questions.length;
    let menuOpen = false;
    let timeLeft = ANSWER_TIMER_MS;
    let answerTimer: ReturnType<typeof setTimeout> | null = null;
    let answerInterval: ReturnType<typeof setInterval> | null = null;
    let theme: Theme = "dark";

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
    $: retakeAvailable =
        revealed && !isCorrect && retakeCount < 1 && !completed;

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
        } else {
            startAnswerTimer();
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

    const markVisited = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("vd_has_visited", "1");
        }
    };

    const confirmHome = () => {
        if (!browser) return;
        goto("/home");
    };

    const retakeQuestion = () => {
        if (!retakeAvailable) return;
        const id = currentQuestion.id;
        retakes = { ...retakes, [id]: (retakes[id] ?? 0) + 1 };
        selected = null;
        revealed = false;
        clearAnswerTimer();
        timeLeft = ANSWER_TIMER_MS;
        startAnswerTimer();
    };

    $: totalQuestions = questions.length;
    $: progressPercent =
        totalQuestions > 0
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

    {#if !isMobile}
        <Hero
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            progressLabel={`${t("question")} ${currentIndex + 1} ${t("of")} ${questions.length}`}
            progressStage={currentQuestion.stage[locale]}
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

    {#if showVictory}
        <VictoryOverlay
            title={t("perfectTitle")}
            body={t("perfectBody")}
            cta={t("perfectCTA")}
            onRestart={restart}
            {theme}
        />
    {/if}

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
</style>
