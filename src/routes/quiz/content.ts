import type { Locale } from "$lib/types";
import { commonUiText, mergeUiText } from "$lib/content/common";

export type QuizText = {
    welcomeTitle: string;
    welcomeBody: string;
    start: string;
    source: string;
    correct: string;
    correctMsg: string;
    incorrectMsg: string;
    restart: string;
    next: string;
    finish: string;
    playAgain: string;
    loginCta: string;
    perfectTitle: string;
    perfectBody: string;
    perfectCTA: string;
};

const uiTextOverrides: Record<Locale, QuizText> = {
    en: {
        welcomeTitle: "Welcome to Verbum Quest",
        welcomeBody:
            "Journey through Salvation History—Creation, Covenant, Exodus, Kingdom, the Church, Christ. This is a reduced demo you can play right away; create an account to unlock the full path and save your progress.",
        start: "Start",
        source: "Source",
        correct: "Correct",
        correctMsg: "You chose wisely.",
        incorrectMsg: "Not quite.",
        restart: "Restart",
        next: "Next",
        finish: "Finish",
        playAgain: "Play again",
        loginCta: "Login / Sign up",
        perfectTitle: "Perfect pilgrimage!",
        perfectBody: "You answered every question. A moment of grace awaits.",
        perfectCTA: "Spread the Good News!",
    },
    es: {
        welcomeTitle: "Bienvenido a Verbum Quest",
        welcomeBody:
            "Recorre la Historia de la Salvación — Creación, Alianza, Éxodo, Reino, Iglesia, Cristo. Es una demo reducida que puedes jugar ya; crea una cuenta para desbloquear todo el camino y guardar tu progreso.",
        start: "Comenzar",
        source: "Fuente",
        correct: "Correcta",
        correctMsg: "Elegiste bien.",
        incorrectMsg: "No del todo.",
        restart: "Reiniciar",
        next: "Siguiente",
        finish: "Terminar",
        playAgain: "Jugar de nuevo",
        loginCta: "Iniciar sesión / Registrarse",
        perfectTitle: "Peregrinación perfecta",
        perfectBody: "Respondiste todo correcto. Te aguarda un momento de gracia.",
        perfectCTA: "¡Anuncia la Buena Nueva!",
    },
    pt: {
        welcomeTitle: "Bem-vindo ao Verbum Quest",
        welcomeBody:
            "Percorra a História da Salvação — Criação, Aliança, Êxodo, Reino, Igreja, Cristo. Esta é uma demo reduzida para jogar já; crie uma conta para destravar tudo e salvar seu progresso.",
        start: "Começar",
        source: "Fonte",
        correct: "Correta",
        correctMsg: "Você escolheu bem.",
        incorrectMsg: "Quase lá.",
        restart: "Reiniciar",
        next: "Próxima",
        finish: "Finalizar",
        playAgain: "Jogar novamente",
        loginCta: "Entrar / Registrar",
        perfectTitle: "Peregrinação perfeita",
        perfectBody: "Você acertou tudo. Um momento de graça o aguarda.",
        perfectCTA: "Anuncie a Boa Nova!",
    },
    sv: {
        welcomeTitle: "Välkommen till Verbum Quest",
        welcomeBody:
            "Vandra genom Frälsningshistorien—Skapelsen, Förbundet, Uttåget, Riket, Kyrkan, Kristus. Detta är en kort demo du kan spela direkt; skapa ett konto för att låsa upp hela vägen och spara dina framsteg.",
        start: "Starta",
        source: "Källa",
        correct: "Rätt",
        correctMsg: "Du valde klokt.",
        incorrectMsg: "Inte riktigt.",
        restart: "Starta om",
        next: "Nästa",
        finish: "Avsluta",
        playAgain: "Spela igen",
        loginCta: "Logga in / Skapa konto",
        perfectTitle: "Perfekt pilgrimsfärd!",
        perfectBody: "Du svarade rätt på alla frågor. Ett ögonblick av nåd väntar.",
        perfectCTA: "Sprid de goda nyheterna!",
    },
};

export const quizUiText = mergeUiText(commonUiText, uiTextOverrides);
