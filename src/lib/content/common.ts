import type { Locale } from "$lib/types";

export type UiTextByLocale = Record<Locale, Record<string, string>>;

export const commonUiText: UiTextByLocale = {
    en: {
        eyebrow: "Verbum Quest · Mock Quiz",
        title: "Journey through the Word",
        subtitle:
            "Learn the Good News in a playful way—journey through Salvation History.",
        score: "Level",
        question: "Question",
        of: "of",
        profile: "Profile",
        account: "Account",
        login: "Login / Sign up",
        guestPref: "Prefer to stay guest",
        language: "Language",
        guestName: "Guest pilgrim",
        explore: "Explore",
        welcomeIntro: "Welcome intro",
    },
    es: {
        eyebrow: "Verbum Quest · Quiz de prueba",
        title: "Peregrina por la Palabra",
        subtitle:
            "Aprende la Buena Nueva de forma lúdica—recorre la Historia de la Salvación.",
        score: "Nivel",
        question: "Pregunta",
        of: "de",
        profile: "Perfil",
        account: "Cuenta",
        login: "Iniciar sesión / Registrarse",
        guestPref: "Prefiero seguir como invitado",
        language: "Idioma",
        guestName: "Peregrino invitado",
        explore: "Explorar",
        welcomeIntro: "Introducción de bienvenida",
    },
    pt: {
        eyebrow: "Verbum Quest · Quiz de teste",
        title: "Caminho pela Palavra",
        subtitle:
            "Aprenda a Boa Nova de forma lúdica—caminhe pela História da Salvação.",
        score: "Nível",
        question: "Pergunta",
        of: "de",
        profile: "Perfil",
        account: "Conta",
        login: "Entrar / Registrar",
        guestPref: "Prefiro continuar como convidado",
        language: "Idioma",
        guestName: "Peregrino convidado",
        explore: "Explorar",
        welcomeIntro: "Introdução de boas-vindas",
    },
    sv: {
        eyebrow: "Verbum Quest · Testquiz",
        title: "En resa genom Ordet",
        subtitle:
            "Lär dig de goda nyheterna på ett lekfullt sätt—vandra genom Frälsningshistorien.",
        score: "Nivå",
        question: "Fråga",
        of: "av",
        profile: "Profil",
        account: "Konto",
        login: "Logga in / Skapa konto",
        guestPref: "Jag föredrar att fortsätta som gäst",
        language: "Språk",
        guestName: "Gästpilgrim",
        explore: "Utforska",
        welcomeIntro: "Välkomstintroduktion",
    },
};

export const mergeUiText = (
    base: UiTextByLocale,
    specific: UiTextByLocale,
): UiTextByLocale => ({
    en: { ...base.en, ...specific.en },
    es: { ...base.es, ...specific.es },
    pt: { ...base.pt, ...specific.pt },
    sv: { ...base.sv, ...specific.sv },
});
