<script lang="ts">
    import Hero from "$lib/components/Hero/Hero.svelte";
    import MenuPanel from "$lib/components/Menu/MenuPanel.svelte";
    import MobileMenu from "$lib/components/Menu/MobileMenu.svelte";
    import QuestionCard from "$lib/components/Question/QuestionCard.svelte";
    import SceneBanner from "$lib/components/SceneBanner/SceneBanner.svelte";
    import VictoryOverlay from "$lib/components/VictoryOverlay/VictoryOverlay.svelte";
    import type { Level, Locale, Question } from "$lib/types";
    import { onDestroy } from "svelte";

    const uiText: Record<Locale, Record<string, string>> = {
        en: {
            eyebrow: "Verbum Quest · Mock Quiz",
            title: "Journey through the Word",
            subtitle: "Prototype a catechetical quiz across Salvation History.",
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
                "Prototipo de cuestionario catequético sobre la Historia de la Salvación.",
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
            subtitle: "Protótipo catequético sobre a História da Salvação.",
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

    const questions: Question[] = [
        {
            id: "creation-1",
            stage: { en: "Creation", es: "Creación", pt: "Criação" },
            prompt: {
                en: "In Genesis 1, what is humanity given over creation?",
                es: "En Génesis 1, ¿qué se le confía a la humanidad sobre la creación?",
                pt: "Em Gênesis 1, o que é confiado à humanidade sobre a criação?",
            },
            options: [
                {
                    id: "a",
                    correct: true,
                    text: {
                        en: "To rule, steward, and care for it",
                        es: "Gobernarla, administrarla y cuidarla",
                        pt: "Governar, administrar e cuidar",
                    },
                    explanation: {
                        en: "Genesis 1:26-28 gives humanity dominion and stewardship over creation.",
                        es: "Génesis 1:26-28 entrega a la humanidad dominio y mayordomía sobre la creación.",
                        pt: "Gênesis 1:26-28 concede ao ser humano domínio e cuidado sobre a criação.",
                    },
                },
                {
                    id: "b",
                    correct: false,
                    text: {
                        en: "Unlimited domination for profit",
                        es: "Dominio ilimitado para lucro",
                        pt: "Domínio ilimitado para lucro",
                    },
                    explanation: {
                        en: "Scripture frames this as care, not exploitation.",
                        es: "La Escritura lo presenta como cuidado, no explotación.",
                        pt: "A Escritura apresenta como cuidado, não exploração.",
                    },
                },
                {
                    id: "c",
                    correct: false,
                    text: {
                        en: "No responsibility at all",
                        es: "Ninguna responsabilidad",
                        pt: "Nenhuma responsabilidade",
                    },
                    explanation: {
                        en: "Humanity is explicitly commissioned to cultivate and keep.",
                        es: "La humanidad es enviada a cultivar y guardar.",
                        pt: "A humanidade é chamada a cultivar e guardar.",
                    },
                },
                {
                    id: "d",
                    correct: false,
                    text: {
                        en: "Only angels steward creation",
                        es: "Solo los ángeles administran la creación",
                        pt: "Apenas os anjos cuidam da criação",
                    },
                    explanation: {
                        en: "The command is given to mankind, male and female.",
                        es: "El mandato es dado a la humanidad, varón y mujer.",
                        pt: "O mandato é dado à humanidade, homem e mulher.",
                    },
                },
            ],
            source: "Genesis 1:26-28",
        },
        {
            id: "covenant-1",
            stage: { en: "Covenant", es: "Alianza", pt: "Aliança" },
            prompt: {
                en: "What sign sealed the covenant with Noah after the flood?",
                es: "¿Qué signo selló la alianza con Noé después del diluvio?",
                pt: "Qual sinal selou a aliança com Noé após o dilúvio?",
            },
            options: [
                {
                    id: "a",
                    correct: false,
                    text: {
                        en: "A burning bush",
                        es: "Una zarza ardiente",
                        pt: "Uma sarça ardente",
                    },
                    explanation: {
                        en: "That was Moses' call, not Noah's covenant sign.",
                        es: "Esa fue la llamada de Moisés, no el signo para Noé.",
                        pt: "Foi o chamado de Moisés, não o sinal para Noé.",
                    },
                },
                {
                    id: "b",
                    correct: true,
                    text: {
                        en: "The rainbow in the clouds",
                        es: "El arcoíris en las nubes",
                        pt: "O arco-íris nas nuvens",
                    },
                    explanation: {
                        en: "Genesis 9:12-17: God sets a bow in the clouds as a sign of His promise.",
                        es: "Génesis 9:12-17: Dios pone un arco en las nubes como signo de su promesa.",
                        pt: "Gênesis 9:12-17: Deus coloca um arco nas nuvens como sinal da promessa.",
                    },
                },
                {
                    id: "c",
                    correct: false,
                    text: {
                        en: "Tablets of stone",
                        es: "Tablas de piedra",
                        pt: "Tábuas de pedra",
                    },
                    explanation: {
                        en: "The tablets come later with Moses at Sinai.",
                        es: "Las tablas llegan después, con Moisés en el Sinaí.",
                        pt: "As tábuas vêm depois, com Moisés no Sinai.",
                    },
                },
                {
                    id: "d",
                    correct: false,
                    text: {
                        en: "A pillar of fire",
                        es: "Una columna de fuego",
                        pt: "Uma coluna de fogo",
                    },
                    explanation: {
                        en: "Pillar of fire guided Israel in the Exodus.",
                        es: "La columna de fuego guió a Israel en el Éxodo.",
                        pt: "A coluna de fogo guiou Israel no Êxodo.",
                    },
                },
            ],
            source: "Genesis 9:12-17",
        },
        {
            id: "church-1",
            stage: { en: "Church", es: "Iglesia", pt: "Igreja" },
            prompt: {
                en: "According to Acts 2, what marked the Church’s birth at Pentecost?",
                es: "Según Hechos 2, ¿qué marcó el nacimiento de la Iglesia en Pentecostés?",
                pt: "Segundo Atos 2, o que marcou o nascimento da Igreja em Pentecostes?",
            },
            options: [
                {
                    id: "a",
                    correct: false,
                    text: {
                        en: "The casting of lots for Matthias",
                        es: "Echar suertes por Matías",
                        pt: "Lançar sortes para Matias",
                    },
                    explanation: {
                        en: "That happened before Pentecost.",
                        es: "Eso ocurrió antes de Pentecostés.",
                        pt: "Isso ocorreu antes de Pentecostes.",
                    },
                },
                {
                    id: "b",
                    correct: true,
                    text: {
                        en: "Tongues as of fire and the Holy Spirit’s outpouring",
                        es: "Lenguas como de fuego y la efusión del Espíritu Santo",
                        pt: "Línguas como de fogo e a efusão do Espírito Santo",
                    },
                    explanation: {
                        en: "Acts 2:1-4 describes the Spirit descending with wind and fire.",
                        es: "Hechos 2:1-4 describe al Espíritu descendiendo con viento y fuego.",
                        pt: "Atos 2:1-4 descreve o Espírito descendo com vento e fogo.",
                    },
                },
                {
                    id: "c",
                    correct: false,
                    text: {
                        en: "Building a stone temple",
                        es: "Construir un templo de piedra",
                        pt: "Construir um templo de pedra",
                    },
                    explanation: {
                        en: "The early Church met in homes and the temple courts; no new temple was built.",
                        es: "La Iglesia primitiva se reunía en casas y en el Templo; no se construyó uno nuevo.",
                        pt: "A Igreja primitiva se reunia em casas e no Templo; não foi construído um novo.",
                    },
                },
                {
                    id: "d",
                    correct: false,
                    text: {
                        en: "A council at Jerusalem",
                        es: "Un concilio en Jerusalén",
                        pt: "Um concílio em Jerusalém",
                    },
                    explanation: {
                        en: "The Jerusalem Council in Acts 15 happened later.",
                        es: "El Concilio de Jerusalén en Hechos 15 fue después.",
                        pt: "O Concílio de Jerusalém em Atos 15 aconteceu depois.",
                    },
                },
            ],
            source: "Acts 2:1-4",
        },
        {
            id: "david-1",
            stage: { en: "Kingdom", es: "Reino", pt: "Reino" },
            prompt: {
                en: "What key promise did God make to King David in 2 Samuel 7?",
                es: "¿Qué promesa clave hizo Dios al rey David en 2 Samuel 7?",
                pt: "Que promessa central Deus fez ao rei Davi em 2 Samuel 7?",
            },
            options: [
                {
                    id: "a",
                    correct: true,
                    text: {
                        en: "An everlasting throne through his descendant",
                        es: "Un trono eterno por medio de su descendiente",
                        pt: "Um trono eterno por meio de seu descendente",
                    },
                    explanation: {
                        en: "God covenants that David’s dynasty will endure through an heir, fulfilled in Christ (2 Sam 7:12-16).",
                        es: "Dios promete que la dinastía de David perdurará en un heredero, cumplido en Cristo (2 Sam 7:12-16).",
                        pt: "Deus promete que a dinastia de Davi permanecerá por um herdeiro, cumprida em Cristo (2 Sm 7:12-16).",
                    },
                },
                {
                    id: "b",
                    correct: false,
                    text: {
                        en: "Immediate victory over Rome",
                        es: "Victoria inmediata sobre Roma",
                        pt: "Vitória imediata sobre Roma",
                    },
                    explanation: {
                        en: "Rome is centuries later; the promise was a lasting house, not political timing.",
                        es: "Roma es siglos después; la promesa era una casa duradera, no un plazo político.",
                        pt: "Roma é séculos depois; a promessa era uma casa duradoura, não um prazo político.",
                    },
                },
                {
                    id: "c",
                    correct: false,
                    text: {
                        en: "That David would build the first temple himself",
                        es: "Que David construiría él mismo el primer templo",
                        pt: "Que Davi construiria ele mesmo o primeiro templo",
                    },
                    explanation: {
                        en: "God says his son will build it; Solomon fulfills that, not David.",
                        es: "Dios dice que su hijo lo construirá; Salomón lo cumple, no David.",
                        pt: "Deus diz que seu filho o construirá; Salomão cumpre, não Davi.",
                    },
                },
                {
                    id: "d",
                    correct: false,
                    text: {
                        en: "To end prophecy after David’s reign",
                        es: "Terminar la profecía tras el reinado de David",
                        pt: "Encerrar a profecia após o reinado de Davi",
                    },
                    explanation: {
                        en: "Prophecy continues; the promise is about a perpetual throne.",
                        es: "La profecía continúa; la promesa trata de un trono perpetuo.",
                        pt: "A profecia continua; a promessa é sobre um trono perpétuo.",
                    },
                },
            ],
            source: "2 Samuel 7:12-16",
        },
        {
            id: "jesus-1",
            stage: { en: "Christ", es: "Cristo", pt: "Cristo" },
            prompt: {
                en: "Why is the Resurrection central to Christian faith?",
                es: "¿Por qué la Resurrección es central para la fe cristiana?",
                pt: "Por que a Ressurreição é central para a fé cristã?",
            },
            options: [
                {
                    id: "a",
                    correct: true,
                    text: {
                        en: "It confirms Jesus as Son of God and conquers death",
                        es: "Confirma a Jesús como Hijo de Dios y vence la muerte",
                        pt: "Confirma Jesus como Filho de Deus e vence a morte",
                    },
                    explanation: {
                        en: "Paul says without the Resurrection our faith is in vain (1 Cor 15:14); it vindicates Christ and defeats death.",
                        es: "Pablo dice que sin la Resurrección nuestra fe es vana (1 Co 15:14); vindica a Cristo y vence la muerte.",
                        pt: "Paulo diz que sem a Ressurreição a fé é vã (1 Cor 15:14); ela confirma Cristo e vence a morte.",
                    },
                },
                {
                    id: "b",
                    correct: false,
                    text: {
                        en: "It removes any need for faith or discipleship",
                        es: "Elimina toda necesidad de fe o discipulado",
                        pt: "Remove qualquer necessidade de fé ou discipulado",
                    },
                    explanation: {
                        en: "The Resurrection invites faith and discipleship; it doesn’t make them unnecessary.",
                        es: "La Resurrección invita a la fe y al discipulado; no los vuelve innecesarios.",
                        pt: "A Ressurreição convida à fé e ao discipulado; não os torna desnecessários.",
                    },
                },
                {
                    id: "c",
                    correct: false,
                    text: {
                        en: "It replaces all of Jesus’ teachings",
                        es: "Reemplaza todas las enseñanzas de Jesús",
                        pt: "Substitui todos os ensinamentos de Jesus",
                    },
                    explanation: {
                        en: "It fulfills and confirms His teachings, not replaces them.",
                        es: "Las cumple y confirma, no las reemplaza.",
                        pt: "Ela confirma e cumpre os ensinamentos, não os substitui.",
                    },
                },
                {
                    id: "d",
                    correct: false,
                    text: {
                        en: "It only symbolizes good ideas, not a real event",
                        es: "Solo simboliza buenas ideas, no un hecho real",
                        pt: "Apenas simboliza boas ideias, não um fato real",
                    },
                    explanation: {
                        en: "The New Testament proclaims a real, bodily Resurrection witnessed by many.",
                        es: "El Nuevo Testamento proclama una Resurrección real y corporal, vista por muchos.",
                        pt: "O Novo Testamento proclama uma Ressurreição real e corporal, testemunhada por muitos.",
                    },
                },
            ],
            source: "1 Corinthians 15:14",
        },
    ];

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
    let menuOpen = false;
    let timeLeft = ANSWER_TIMER_MS;
    let answerTimer: ReturnType<typeof setTimeout> | null = null;
    let answerInterval: ReturnType<typeof setInterval> | null = null;

    const currentQuestion = () => questions[currentIndex];

    const selectAnswer = (id: string) => {
        if (revealed) return;
        selected = id;
        revealed = true;
        const choice = currentQuestion().options.find((o) => o.id === id);
        if (choice?.correct) {
            score += 1;
        }
        clearAnswerTimer();
        startAnswerTimer();
    };

    const nextQuestion = () => {
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

    const answeredCorrectly = () => {
        const choice = currentQuestion().options.find((o) => o.id === selected);
        return choice?.correct;
    };

    const progressPercent = () =>
        Math.round(((currentIndex + 1) / questions.length) * 100);

    const levelIndex = () =>
        Math.min(
            levels.length - 1,
            Math.floor((score / questions.length) * levels.length),
        );
    const currentLevel = () => levels[levelIndex()].label[locale];
    const perfected = () => completed && score === questions.length;

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

    const t = (key: string) => uiText[locale][key] ?? key;
    const selectLanguage = (id: Locale) => {
        locale = id;
        menuOpen = false;
    };
    const toggleMenu = () => (menuOpen = !menuOpen);

    onDestroy(() => clearAnswerTimer());
</script>

<main class="page">
    <div class="glow gold" aria-hidden="true"></div>
    <div class="glow purple" aria-hidden="true"></div>
    <div class="glow crimson" aria-hidden="true"></div>

    <MobileMenu
        {menuOpen}
        toggleMenu={toggleMenu}
        title={t("profile")}
        username={t("guestName")}
        levelLabel={t("score")}
        levelValue={currentLevel()}
        accountLabel={t("account")}
        loginLabel={t("login")}
        guestPrefLabel={t("guestPref")}
        languageLabel={t("language")}
        {languages}
        {locale}
        {flags}
        selectLanguage={selectLanguage}
    />

    <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        progressLabel={`${t("question")} ${currentIndex + 1} ${t("of")} ${questions.length}`}
        progressStage={currentQuestion().stage[locale]}
        progressPercent={progressPercent()}
    >
        <MenuPanel
            slot="panel"
            title={t("profile")}
            username={t("guestName")}
            levelLabel={t("score")}
            levelValue={currentLevel()}
            accountLabel={t("account")}
            loginLabel={t("login")}
            guestPrefLabel={t("guestPref")}
            languageLabel={t("language")}
            {languages}
            {locale}
            {flags}
            {menuOpen}
            toggleMenu={toggleMenu}
            selectLanguage={selectLanguage}
        />
    </Hero>

    <SceneBanner />

    <QuestionCard
        question={currentQuestion()}
        {locale}
        {selected}
        {revealed}
        {completed}
        {timeLeft}
        answerDuration={ANSWER_TIMER_MS}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        {t}
        answeredCorrectly={!!answeredCorrectly()}
        onSelect={selectAnswer}
        onNext={nextQuestion}
        onRestart={restart}
        isLastQuestion={currentIndex === questions.length - 1}
        pauseTimer={pauseAnswerTimer}
        resumeTimer={resumeAnswerTimer}
    />

    {#if perfected()}
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
        background: rgba(198, 167, 96, 0.35);
        top: -140px;
        left: -120px;
    }

    .glow.purple {
        background: rgba(77, 94, 136, 0.26);
        top: 120px;
        right: -160px;
    }

    .glow.crimson {
        background: rgba(127, 83, 74, 0.22);
        bottom: -160px;
        left: 28%;
    }
</style>
