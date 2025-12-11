<script lang="ts">
    type Locale = "en" | "es" | "pt";

    type Option = {
        id: string;
        correct: boolean;
        text: Record<Locale, string>;
        explanation: Record<Locale, string>;
    };

    type Question = {
        id: string;
        stage: Record<Locale, string>;
        prompt: Record<Locale, string>;
        options: Option[];
        source?: string;
    };

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

    type Level = { id: string; label: Record<Locale, string> };

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

    let locale: Locale = "en";
    let currentIndex = 0;
    let selected: string | null = null;
    let revealed = false;
    let score = 0;
    let completed = false;
    let menuOpen = false;
    const ANSWER_TIMER_MS = 12000;
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
</script>

<main class="page">
    <div class="glow gold" aria-hidden="true"></div>
    <div class="glow purple" aria-hidden="true"></div>
    <div class="glow crimson" aria-hidden="true"></div>

    <div class="mobile-menu" aria-label="User menu">
        <div class="menu-wrapper">
            <button
                class="menu-toggle"
                aria-expanded={menuOpen}
                aria-controls="user-menu"
                on:click={() => (menuOpen = !menuOpen)}
            >
                <span class="hamburger" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>
            {#if menuOpen}
                <div class="menu-dropdown mobile" id="user-menu">
                    <div class="mobile-profile stacked">
                        <div class="panel-title">{t("profile")}</div>
                        <div class="panel-username">{t("guestName")}</div>
                        <div class="stat-label">{t("score")}</div>
                        <div class="panel-username">{currentLevel()}</div>
                    </div>
                    <div class="menu-section">
                        <div class="menu-label">{t("account")}</div>
                        <button class="menu-item">{t("login")}</button>
                        <button class="menu-item muted">{t("guestPref")}</button
                        >
                    </div>
                    <div class="menu-section">
                        <div class="menu-label">{t("language")}</div>
                        <div class="lang-grid" aria-label="Language selector">
                            {#each languages as lang}
                                <button
                                    class:active={locale === lang.id}
                                    on:click={() => selectLanguage(lang.id)}
                                >
                                    <span class="flag" aria-hidden="true"
                                        >{flags[lang.id]}</span
                                    >
                                    <span>{lang.name}</span>
                                    <span class="lang-code">{lang.label}</span>
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <header class="hero">
        <div class="hero-text">
            <p class="eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p class="lede">{t("subtitle")}</p>

            <div class="progress" aria-label="Quiz progress">
                <div class="progress-top">
                    <span
                        >{t("question")}
                        {currentIndex + 1}
                        {t("of")}
                        {questions.length}</span
                    >
                    <span class="progress-stage"
                        >{currentQuestion().stage[locale]}</span
                    >
                </div>
                <div class="progress-track">
                    <div
                        class="progress-fill"
                        style={`width: ${progressPercent()}%`}
                    ></div>
                </div>
            </div>
        </div>

        <div class="hero-panel">
            <div class="panel-head">
                <div>
                    <div class="panel-title">{t("profile")}</div>
                    <div class="panel-username">{t("guestName")}</div>
                </div>
                <div class="menu-wrapper">
                    <button
                        class="menu-toggle"
                        aria-expanded={menuOpen}
                        aria-controls="user-menu"
                        on:click={() => (menuOpen = !menuOpen)}
                    >
                        <span class="hamburger" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                    {#if menuOpen}
                        <div class="menu-dropdown" id="user-menu">
                            <div class="menu-section">
                                <div class="menu-label">{t("account")}</div>
                                <button class="menu-item">{t("login")}</button>
                                <button class="menu-item muted"
                                    >{t("guestPref")}</button
                                >
                            </div>
                            <div class="menu-section">
                                <div class="menu-label">{t("language")}</div>
                                <div
                                    class="lang-grid"
                                    aria-label="Language selector"
                                >
                                    {#each languages as lang}
                                        <button
                                            class:active={locale === lang.id}
                                            on:click={() =>
                                                selectLanguage(lang.id)}
                                        >
                                            <span
                                                class="flag"
                                                aria-hidden="true"
                                                >{flags[lang.id]}</span
                                            >
                                            <span>{lang.name}</span>
                                            <span class="lang-code"
                                                >{lang.label}</span
                                            >
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="stats">
                <div class="stat-label">{t("score")}</div>
                <div class="panel-username">{currentLevel()}</div>
            </div>
        </div>
    </header>

    <section
        class="scene"
        aria-label="Illustration placeholder for Biblical action-cartoon art"
    >
        <div class="scene-overlay">
            <p class="scene-kicker">Visual placeholder</p>
            <h2 class="scene-title">Biblical action-cartoon vignette</h2>
            <p class="scene-note">
                Reserve this space for the illustrated panel (e.g., Creation
                crossing to Covenant). Replace the SVG at
                <code>static/illustrations/quest-hero.svg</code> with the real artwork.
            </p>
        </div>
    </section>

    <section class="card">
        <div class="meta">
            <span class="pill">{currentQuestion().stage[locale]}</span>
            <span class="sub"
                >{t("question")}
                {currentIndex + 1}
                {t("of")}
                {questions.length}</span
            >
        </div>
        <h2>{currentQuestion().prompt[locale]}</h2>
        {#if currentQuestion().source}
            <p class="source">{t("source")}: {currentQuestion().source}</p>
        {/if}

        <div class="options">
            {#each currentQuestion().options as option}
                <button
                    class:selected={selected === option.id}
                    class:correct={revealed && option.correct}
                    class:incorrect={revealed &&
                        selected === option.id &&
                        !option.correct}
                    on:click={() => selectAnswer(option.id)}
                >
                    <span class="bullet">{option.id.toUpperCase()}</span>
                    <span class="text">{option.text[locale]}</span>
                    {#if revealed}
                        <span class="badge"
                            >{option.correct ? t("correct") : " "}</span
                        >
                    {/if}
                </button>
            {/each}
        </div>

        {#if revealed}
            <div class="explanation">
                <p
                    class:correct={answeredCorrectly()}
                    class:incorrect={!answeredCorrectly()}
                >
                    {#if answeredCorrectly()}
                        {t("correctMsg")}
                        {currentQuestion().options.find(
                            (o) => o.id === selected,
                        )?.explanation[locale]}
                    {:else}
                        {t("incorrectMsg")}
                        {currentQuestion().options.find(
                            (o) => o.id === selected,
                        )?.explanation[locale]}
                    {/if}
                </p>
                {#if !completed}
                    <div
                        class="answer-timer"
                        aria-label="Progress to next question"
                        on:mouseenter={pauseAnswerTimer}
                        on:mouseleave={resumeAnswerTimer}
                    >
                        <div
                            class="answer-timer-bar"
                            style={`width: ${(timeLeft / ANSWER_TIMER_MS) * 100}%`}
                        ></div>
                    </div>
                {/if}
            </div>
        {/if}

        <div class="actions">
            {#if !completed}
                <button class="ghost" on:click={restart}>{t("restart")}</button>
                <button
                    class="primary"
                    disabled={!revealed}
                    on:click={nextQuestion}
                >
                    {currentIndex === questions.length - 1
                        ? t("finish")
                        : t("next")}
                </button>
            {:else}
                <button class="primary" on:click={restart}
                    >{t("playAgain")}</button
                >
            {/if}
        </div>
    </section>

    {#if perfected()}
        <div class="victory-overlay" role="dialog" aria-modal="true">
            <div class="victory-card">
                <div class="victory-art">
                    <img
                        src="/illustrations/divine-mercy.png"
                        alt="Christ of Divine Mercy"
                        loading="lazy"
                    />
                    <div class="cherub cherub-left">😇</div>
                    <div class="cherub cherub-right">😇</div>
                </div>
                <div class="victory-copy">
                    <p class="eyebrow">{t("perfectTitle")}</p>
                    <h3>{t("perfectBody")}</h3>
                    <button class="primary" on:click={restart}
                        >{t("perfectCTA")}</button
                    >
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap");

    :global(body) {
        margin: 0;
        background: radial-gradient(
                circle at 18% 18%,
                rgba(198, 167, 96, 0.18),
                transparent 32%
            ),
            radial-gradient(
                circle at 82% 12%,
                rgba(104, 132, 170, 0.2),
                transparent 35%
            ),
            radial-gradient(
                circle at 42% 78%,
                rgba(127, 83, 74, 0.16),
                transparent 34%
            ),
            #0c1224;
        color: #e9edf4;
        font-family: "DM Sans", "Segoe UI", system-ui, sans-serif;
        min-height: 100vh;
    }

    .page {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        overflow: hidden;
    }

    .scene {
        position: relative;
        z-index: 1;
        height: 320px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
            linear-gradient(
                180deg,
                rgba(12, 18, 36, 0.5),
                rgba(12, 18, 36, 0.75)
            ),
            url("/illustrations/quest-hero.svg") center/cover,
            radial-gradient(
                circle at 15% 20%,
                rgba(198, 167, 96, 0.16),
                transparent 32%
            ),
            #0c1224;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.45);
        display: grid;
        align-items: flex-end;
    }

    .scene-overlay {
        backdrop-filter: blur(4px);
        background: linear-gradient(
            180deg,
            rgba(12, 18, 36, 0.85),
            rgba(12, 18, 36, 0.92)
        );
        padding: 1rem 1.4rem;
    }

    .scene-kicker {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        color: #c7a457;
    }

    .scene-title {
        margin: 0.2rem 0;
        font-size: 1.35rem;
        color: #f5f7ff;
        font-family: "Playfair Display", "DM Sans", serif;
        letter-spacing: -0.01em;
    }

    .scene-note {
        margin: 0;
        color: #d1d8e6;
        max-width: 640px;
        font-size: 0.95rem;
    }

    .scene-note code {
        background: rgba(255, 255, 255, 0.08);
        padding: 0.1rem 0.35rem;
        border-radius: 6px;
        color: #f5f7ff;
    }

    .mobile-menu {
        display: none;
    }

    .mobile-profile {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.75rem 0.85rem;
        margin-bottom: 0.5rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        box-shadow: 0 12px 24px rgba(12, 18, 36, 0.45);
    }

    .mobile-profile.stacked {
        margin: 0 0 0.6rem 0;
        max-width: none;
        width: 100%;
        padding: 0.75rem 0.85rem;
    }

    .mobile-profile.stacked .panel-username {
        margin: 0.2rem 0 0.4rem;
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

    .hero {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.25rem;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: linear-gradient(
            135deg,
            rgba(18, 26, 52, 0.95),
            rgba(18, 24, 41, 0.9)
        );
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.45);
    }

    .hero-text h1 {
        margin: 0.15rem 0;
        font-family: "Playfair Display", "DM Sans", serif;
        font-size: clamp(1.8rem, 2.4vw, 2.6rem);
        letter-spacing: -0.02em;
        color: #f5f7ff;
    }

    .hero-text .lede {
        margin: 0 0 0.6rem;
        color: #cbd3e6;
        max-width: 680px;
        line-height: 1.5;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.78rem;
        margin: 0;
        color: #f2d28d;
    }

    .progress {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .progress-top {
        display: flex;
        justify-content: space-between;
        color: #d7deee;
        font-size: 0.95rem;
    }

    .progress-stage {
        background: rgba(242, 210, 141, 0.12);
        border: 1px solid rgba(242, 210, 141, 0.35);
        color: #f9e8c4;
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.04em;
    }

    .progress-track {
        height: 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .progress-fill {
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, #c7a457, #9b7a38);
        box-shadow: 0 0 12px rgba(199, 164, 87, 0.5);
    }

    .hero-panel {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        position: relative;
        z-index: 3;
        overflow: visible;
    }

    .panel-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .panel-username {
        color: #f7f8ff;
        font-weight: 800;
        letter-spacing: 0.02em;
    }

    .menu-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    }

    .panel-title {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.8rem;
        color: #d3ddf2;
    }

    .stats {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .stat-label {
        color: #d3ddf2;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
    }

    .stat-value {
        color: #f7f8ff;
        font-weight: 800;
        font-size: 1.05rem;
        margin-top: 0.15rem;
    }

    .menu-toggle {
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 12px;
        padding: 0.5rem 0.6rem;
        cursor: pointer;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            box-shadow 120ms ease;
    }

    .menu-toggle:hover {
        transform: translateY(-1px);
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 8px 18px rgba(15, 20, 45, 0.5);
    }

    .hamburger {
        display: grid;
        gap: 5px;
    }

    .hamburger span {
        display: block;
        width: 20px;
        height: 2px;
        background: #f7f8ff;
    }

    .menu-dropdown {
        position: absolute;
        top: calc(100% + 0.6rem);
        right: 0;
        min-width: 250px;
        background: rgba(10, 14, 31, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.7);
        padding: 0.75rem;
        display: grid;
        gap: 0.6rem;
        z-index: 6;
    }

    .menu-dropdown.mobile {
        position: absolute;
        top: 46px;
        left: 0;
        right: auto;
        width: min(320px, calc(100vw - 24px));
    }

    .menu-section {
        display: grid;
        gap: 0.35rem;
    }

    .menu-label {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.75rem;
        color: #d3ddf2;
    }

    .menu-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.04);
        color: #f7f8ff;
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
        text-align: left;
        font-weight: 700;
        cursor: pointer;
        transition: all 120ms ease;
    }

    .menu-item:hover {
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 12px 22px rgba(15, 20, 45, 0.55);
    }

    .menu-item.muted {
        color: #c8d0e3;
        font-weight: 600;
        border-style: dashed;
    }

    .lang-grid {
        display: grid;
        gap: 0.35rem;
    }

    .lang-grid button {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        color: #f7f8ff;
        border-radius: 10px;
        padding: 0.55rem 0.65rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 120ms ease;
        text-align: left;
    }

    .lang-grid button:hover {
        border-color: rgba(242, 210, 141, 0.6);
    }

    .lang-grid button.active {
        border-color: rgba(199, 164, 87, 0.9);
        background: linear-gradient(
            135deg,
            rgba(199, 164, 87, 0.12),
            rgba(84, 104, 146, 0.1)
        );
        box-shadow: 0 10px 20px rgba(12, 18, 36, 0.45);
    }

    .flag {
        font-size: 1.05rem;
    }

    .lang-code {
        color: #d3ddf2;
        font-weight: 800;
        letter-spacing: 0.08em;
    }

    .card {
        position: relative;
        z-index: 1;
        padding: 1.6rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background:
            linear-gradient(
                160deg,
                rgba(11, 17, 35, 0.88),
                rgba(12, 20, 40, 0.92)
            ),
            url("/illustrations/question-bg.svg") center/cover,
            #0c1224;
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.5);
        overflow: hidden;
    }

    .card::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 18px;
        border: 1px solid rgba(199, 164, 87, 0.06);
        pointer-events: none;
    }

    .meta {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.35rem;
    }

    .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.38rem 0.85rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #c7a457, #9b7a38);
        color: #0d0f1d;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.82rem;
        font-family: "DM Sans", "Segoe UI", system-ui, sans-serif;
    }

    .sub {
        color: #c8d0e3;
        font-size: 0.95rem;
    }

    h2 {
        margin: 0.3rem 0 0.2rem;
        font-size: 1.35rem;
        color: #f5f7ff;
        line-height: 1.4;
    }

    .source {
        margin: 0 0 1rem;
        color: #b0bad6;
        font-size: 0.95rem;
    }

    .options {
        display: grid;
        gap: 0.75rem;
        margin: 1.15rem 0 1.35rem;
    }

    .options button {
        all: unset;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.9rem;
        padding: 0.95rem 1.05rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01)
        );
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            background 120ms ease,
            box-shadow 120ms ease;
    }

    .options button:hover {
        transform: translateY(-1px);
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 12px 24px rgba(15, 20, 45, 0.5);
    }

    .options button.selected {
        border-color: rgba(199, 164, 87, 0.85);
        box-shadow: 0 14px 26px rgba(12, 18, 36, 0.45);
        background: linear-gradient(
            135deg,
            rgba(199, 164, 87, 0.14),
            rgba(104, 132, 170, 0.1)
        );
    }

    .options button.correct {
        border-color: rgba(58, 206, 133, 0.75);
        background: linear-gradient(
            135deg,
            rgba(58, 206, 133, 0.14),
            rgba(255, 255, 255, 0.02)
        );
    }

    .options button.incorrect {
        border-color: rgba(233, 93, 93, 0.75);
        background: linear-gradient(
            135deg,
            rgba(233, 93, 93, 0.14),
            rgba(255, 255, 255, 0.02)
        );
    }

    .bullet {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        display: grid;
        place-items: center;
        font-weight: 800;
        color: #f7f8ff;
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .text {
        color: #e8edf6;
        line-height: 1.4;
        font-weight: 600;
    }

    .badge {
        font-size: 0.8rem;
        color: #35d69d;
        font-weight: 800;
        letter-spacing: 0.04em;
    }

    .explanation {
        padding: 0.95rem 1.05rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        color: #e8edf6;
    }

    .explanation p {
        margin: 0;
        line-height: 1.5;
    }

    .explanation p.correct {
        color: #35d69d;
    }

    .explanation p.incorrect {
        color: #f28c8c;
    }

    .answer-timer {
        margin-top: 0.6rem;
        height: 3px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .answer-timer-bar {
        height: 100%;
        background: linear-gradient(90deg, #c7a457, #9b7a38);
        transition: width 50ms linear;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.1rem;
    }

    .actions button {
        border: none;
        border-radius: 10px;
        padding: 0.78rem 1.2rem;
        font-weight: 800;
        cursor: pointer;
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            box-shadow 120ms ease;
    }

    .actions .ghost {
        background: transparent;
        color: #d5ddf0;
        border: 1px solid rgba(255, 255, 255, 0.16);
    }

    .actions .primary {
        background: linear-gradient(135deg, #c7a457, #9b7a38);
        color: #0d0f1d;
        box-shadow: 0 10px 20px rgba(12, 18, 36, 0.4);
    }

    .victory-overlay {
        position: fixed;
        inset: 0;
        background: radial-gradient(
                circle at 40% 20%,
                rgba(199, 164, 87, 0.12),
                rgba(12, 18, 36, 0.48)
            ),
            rgba(8, 12, 26, 0.38);
        backdrop-filter: blur(6px);
        display: grid;
        place-items: center;
        z-index: 20;
        padding: 0.75rem;
        animation: overlayFade 3000ms ease;
    }

    .victory-card {
        display: grid;
        gap: 1rem;
        max-width: 640px;
        width: min(92vw, 640px);
        background: rgba(14, 20, 40, 0.92);
        border: 1px solid rgba(199, 164, 87, 0.25);
        border-radius: 16px;
        padding: 1.2rem;
        box-shadow: 0 24px 50px rgba(6, 10, 25, 0.55);
        animation: cardFloat 680ms ease 120ms both;
        box-sizing: border-box;
    }

    .victory-art {
        position: relative;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.02)
        );
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 0.75rem;
        display: grid;
        place-items: center;
        overflow: hidden;
    }

    .victory-art img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
    }

    .cherub {
        position: absolute;
        font-size: 1.6rem;
        animation: float 4s ease-in-out infinite;
    }

    .cherub-left {
        left: 12%;
        top: 20%;
        animation-delay: 0.4s;
    }

    .cherub-right {
        right: 12%;
        top: 16%;
        animation-delay: 1s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    .victory-copy {
        display: grid;
        gap: 0.35rem;
        text-align: center;
    }

    .victory-copy h3 {
        margin: 0;
        color: #f7f8ff;
        font-size: 1.3rem;
        line-height: 1.4;
    }

    .victory-copy .primary {
        margin: 0.25rem auto 0;
        background: linear-gradient(135deg, #c7a457, #9b7a38);
        color: #0d0f1d;
        box-shadow: 0 10px 20px rgba(12, 18, 36, 0.4);
        border: none;
        border-radius: 10px;
        padding: 0.78rem 1.2rem;
        font-weight: 800;
        cursor: pointer;
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            box-shadow 120ms ease;
    }

    .victory-copy .primary:hover {
        transform: translateY(-1px);
    }

    @keyframes overlayFade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes cardFloat {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media (max-width: 640px) {
        .victory-overlay {
            padding: 0.25rem;
        }

        .victory-card {
            width: 90vw;
            max-width: none;
            gap: 0.75rem;
            padding: 1rem;
            box-sizing: border-box;
        }

        .victory-art {
            padding: 0.5rem;
        }

        .cherub {
            display: none;
        }
    }

    .actions button:hover:enabled {
        transform: translateY(-1px);
    }

    .actions button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 960px) {
        .hero {
            grid-template-columns: 1fr;
        }

        .menu-dropdown {
            position: static;
            margin-top: 0.5rem;
            width: 100%;
        }

        .stats {
            grid-template-columns: 1fr 1fr;
        }

        .menu-dropdown {
            right: 0;
        }

        .scene {
            height: 260px;
        }
    }

    @media (max-width: 900px) {
        .mobile-menu {
            display: block;
            position: fixed;
            top: 12px;
            left: 12px;
            z-index: 12;
        }

        .stats {
            display: none;
        }

        .hero-panel {
            display: none;
        }
    }

    @media (max-width: 640px) {
        .hero {
            padding: 1.1rem;
            gap: 0.75rem;
        }

        .hero-panel {
            padding: 0.85rem;
        }

        .actions {
            flex-direction: column;
            align-items: stretch;
        }

        .actions button {
            width: 100%;
            text-align: center;
        }

        .options button {
            grid-template-columns: auto 1fr;
        }

        .progress-top {
            flex-direction: column;
            gap: 0.25rem;
        }

        .scene {
            height: 220px;
        }
    }
</style>
