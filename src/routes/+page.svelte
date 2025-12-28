<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import QuestionCard from "$lib/components/Question/QuestionCard.svelte";
    import VictoryOverlay from "$lib/components/VictoryOverlay/VictoryOverlay.svelte";
    import type { Level, Locale, Question } from "$lib/types";
    import { onDestroy, onMount } from "svelte";
    export let data: { questions: Question[] };
    let questions: Question[] = data.questions ?? [];

    const uiText: Record<Locale, Record<string, string>> = {
        en: {
            eyebrow: "Verbum Quest · Mock Quiz",
            title: "Journey through the Word",
            subtitle:
                "Learn God’s Word by playing a quiz through the History of Salvation.",
            score: "Level",
            question: "Question",
            of: "of",
            source: "Source",
            correct: "Correct",
            correctMsg: "You chose wisely.",
            incorrectMsg: "Not quite.",
            restart: "Restart",
            next: "Next",
            finish: "Finish",
            playAgain: "Play again",
            start: "Start",
            welcomeTitle: "Welcome to Verbum Quest",
            welcomeBody:
                "Journey through the key moments of Salvation History — from Creation and the Covenants, through the Exodus and the Kingdom, to Christ and the life of the Church. This is a short demo you can play immediately. Create an account to unlock the full journey and save your progress as you advance.",
            loginCta: "Login / Sign up",
            profile: "Profile",
            account: "Account",
            login: "Login / Sign up",
            guestPref: "Prefer to stay guest",
            language: "Language",
            guestName: "Guest pilgrim",
            perfectTitle: "Perfect pilgrimage!",
            perfectBody:
                "You answered every question. A moment of grace awaits.",
            perfectCTA: "Spread the Good News!",
        },
        es: {
            eyebrow: "Verbum Quest · Quiz de prueba",
            title: "Peregrina por la Palabra",
            subtitle:
                "Aprende la Palabra de Dios jugando un quiz a través de la Historia de la Salvación.",
            score: "Nivel",
            question: "Pregunta",
            of: "de",
            source: "Fuente",
            correct: "Correcta",
            correctMsg: "Elegiste bien.",
            incorrectMsg: "No del todo.",
            restart: "Reiniciar",
            next: "Siguiente",
            finish: "Terminar",
            playAgain: "Jugar de nuevo",
            start: "Comenzar",
            welcomeTitle: "Bienvenido a Verbum Quest",
            welcomeBody:
                "Recorre los momentos clave de la Historia de la Salvación — desde la Creación y las Alianzas, pasando por el Éxodo y el Reino, hasta Cristo y la vida de la Iglesia. Esta es una demo breve que puedes jugar de inmediato. Crea una cuenta para desbloquear la experiencia completa y guardar tu progreso.",
            loginCta: "Iniciar sesión / Registrarse",
            profile: "Perfil",
            account: "Cuenta",
            login: "Iniciar sesión / Registrarse",
            guestPref: "Prefiero seguir como invitado",
            language: "Idioma",
            guestName: "Peregrino invitado",
            perfectTitle: "Peregrinación perfecta",
            perfectBody:
                "Respondiste todo correcto. Te aguarda un momento de gracia.",
            perfectCTA: "¡Anuncia la Buena Nueva!",
        },
        pt: {
            eyebrow: "Verbum Quest · Quiz de teste",
            title: "Caminho pela Palavra",
            subtitle:
                "Aprenda a Palavra de Deus jogando um quiz através da História da Salvação.",
            score: "Nível",
            question: "Pergunta",
            of: "de",
            source: "Fonte",
            correct: "Correta",
            correctMsg: "Você escolheu bem.",
            incorrectMsg: "Quase lá.",
            restart: "Reiniciar",
            next: "Próxima",
            finish: "Finalizar",
            playAgain: "Jogar novamente",
            start: "Começar",
            welcomeTitle: "Bem-vindo ao Verbum Quest",
            welcomeBody:
                "Percorra os momentos centrais da História da Salvação — da Criação e das Alianças, passando pelo Êxodo e pelo Reino, até Cristo e a vida da Igreja. Esta é uma demonstração breve que você pode jogar imediatamente. Crie uma conta para desbloquear a jornada completa e salvar seu progresso.",
            loginCta: "Entrar / Registrar",
            profile: "Perfil",
            account: "Conta",
            login: "Entrar / Registrar",
            guestPref: "Prefiro continuar como convidado",
            language: "Idioma",
            guestName: "Peregrino convidado",
            perfectTitle: "Peregrinação perfeita",
            perfectBody: "Você acertou tudo. Um momento de graça o aguarda.",
            perfectCTA: "Anuncie a Boa Nova!",
        },
    };

    const emptyQuestion: Question = {
        id: "",
        stage: { en: "", es: "", pt: "" },
        prompt: { en: "", es: "", pt: "" },
        options: [],
    };

    const languages: { id: Locale; label: string; name: string }[] = [
        { id: "en", label: "EN", name: "English" },
        { id: "es", label: "ES", name: "Español" },
        { id: "pt", label: "PT", name: "Português" },
    ];

    const flags: Record<Locale, string> = {
        en: "🇬🇧",
        es: "🇪🇸",
        pt: "🇧🇷",
    };

    type Theme = "light" | "dark";

    const levels: Level[] = [
        {
            id: "lay",
            label: { en: "Lay Faithful", es: "Laico", pt: "Leigo" },
        },
        {
            id: "convert",
            label: { en: "Convert", es: "Converso", pt: "Convertido" },
        },
        {
            id: "religious",
            label: { en: "Religious", es: "Religioso", pt: "Religioso" },
        },
        {
            id: "brother",
            label: { en: "Brother", es: "Hermano", pt: "Irmão" },
        },
        {
            id: "sister",
            label: { en: "Sister", es: "Hermana", pt: "Irmã" },
        },
        {
            id: "monk",
            label: { en: "Monk", es: "Monje", pt: "Monge" },
        },
        {
            id: "priest",
            label: { en: "Priest", es: "Sacerdote", pt: "Sacerdote" },
        },
        {
            id: "teacher",
            label: { en: "Teacher", es: "Maestro", pt: "Mestre" },
        },
        {
            id: "pastor",
            label: { en: "Pastor", es: "Pastor", pt: "Pastor" },
        },
        {
            id: "philosopher",
            label: { en: "Philosopher", es: "Filósofo", pt: "Filósofo" },
        },
        {
            id: "doctor",
            label: {
                en: "Doctor of the Church",
                es: "Doctor de la Iglesia",
                pt: "Doutor da Igreja",
            },
        },
        {
            id: "saint",
            label: { en: "Saint", es: "Santo", pt: "Santo" },
        },
    ];

    const ANSWER_TIMER_MS = 12000;
    let locale: Locale = "en";
    let currentIndex = 0;
    let selected: string | null = null;
    let revealed = false;
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

    $: {
        if (questions.length && currentIndex > questions.length - 1) {
            currentIndex = questions.length - 1;
        }
    }

    $: currentQuestion =
        questions.length > 0
            ? questions[Math.min(currentIndex, questions.length - 1)]
            : emptyQuestion;

    $: selectedOption = currentQuestion.options.find((o) => o.id === selected);
    $: isCorrect = !!selectedOption?.correct;

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

    $: totalQuestions = questions.length;
    $: progressPercent =
        started && totalQuestions > 0
            ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
            : 0;

    $: levelIndex = Math.min(
        levels.length - 1,
        totalQuestions > 0
            ? Math.floor((score / totalQuestions) * levels.length)
            : 0,
    );
    $: levelValue = levels[levelIndex].label[locale];
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

    let t = (key: string) => uiText[locale][key] ?? key;
    $: t = (key: string) => uiText[locale][key] ?? key;
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

    onMount(() => {
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
    });

    onDestroy(() => clearAnswerTimer());
</script>

<main class="page">
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

    <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        progressLabel={`${t("question")} ${started ? currentIndex + 1 : 0} ${t("of")} ${questions.length}`}
        progressStage={started ? currentQuestion.stage[locale] : ""}
        {progressPercent}
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

    {#if started}
        {#key currentQuestion.id}
            <QuestionCard
                question={currentQuestion}
                {locale}
                {selected}
                {revealed}
                {completed}
                {timeLeft}
                answerDuration={ANSWER_TIMER_MS}
                {currentIndex}
                totalQuestions={questions.length}
                {t}
                answeredCorrectly={isCorrect}
                onSelect={selectAnswer}
                onNext={nextQuestion}
                onRestart={restart}
                isLastQuestion={currentIndex === questions.length - 1}
                pauseTimer={pauseAnswerTimer}
                resumeTimer={resumeAnswerTimer}
                onHome={goHome}
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
            linear-gradient(
                180deg,
                var(--scene-overlay-1),
                var(--scene-overlay-2)
            ),
            url("/illustrations/quest-hero.svg") center/cover,
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2)),
            var(--bg);
        box-shadow: 0 18px 40px var(--shadow-strong);
        display: grid;
        gap: 1rem;
        min-height: 360px;
        align-content: space-between;
        justify-items: center;
    }

    .intro-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
        color: var(--text-subtle);
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
