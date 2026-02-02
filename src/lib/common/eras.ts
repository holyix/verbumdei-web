import type { Locale } from "$lib/types";

export type EraId = "creation" | "exodus" | "kings" | "christ" | "church";

export type EraContent = {
    id: EraId;
    title: Record<Locale, string>;
    body: Record<Locale, string>;
    era: Record<Locale, string>;
};

export const eras: EraContent[] = [
    {
        id: "creation",
        title: {
            en: "Creation",
            es: "Creación",
            pt: "Criação",
            sv: "Skapelsen",
        },
        body: {
            en: "Origins, covenant beginnings, and the first promises.",
            es: "Orígenes, inicios del pacto y las primeras promesas.",
            pt: "Origens, início da aliança e as primeiras promessas.",
            sv: "Ursprung, förbundets början och de första löftena.",
        },
        era: {
            en: "Genesis",
            es: "Génesis",
            pt: "Gênesis",
            sv: "Första Mosebok",
        },
    },
    {
        id: "exodus",
        title: {
            en: "Exodus",
            es: "Éxodo",
            pt: "Êxodo",
            sv: "Uttåget",
        },
        body: {
            en: "Liberation, wilderness faith, and God’s covenant.",
            es: "Liberación, fe en el desierto y el pacto de Dios.",
            pt: "Libertação, fé no deserto e a aliança de Deus.",
            sv: "Befrielse, tro i öknen och Guds förbund.",
        },
        era: {
            en: "Deliverance",
            es: "Liberación",
            pt: "Libertação",
            sv: "Befrielse",
        },
    },
    {
        id: "kings",
        title: {
            en: "Kings",
            es: "Reyes",
            pt: "Reis",
            sv: "Kungarna",
        },
        body: {
            en: "Rise and fall of Israel’s kingdom and its leaders.",
            es: "Ascenso y caída del reino de Israel y sus líderes.",
            pt: "Ascensão e queda do reino de Israel e seus líderes.",
            sv: "Israels rikes uppgång och fall och dess ledare.",
        },
        era: {
            en: "Kingdom",
            es: "Reino",
            pt: "Reino",
            sv: "Riket",
        },
    },
    {
        id: "christ",
        title: {
            en: "Christ",
            es: "Cristo",
            pt: "Cristo",
            sv: "Kristus",
        },
        body: {
            en: "Life, teachings, and redemption through Jesus.",
            es: "Vida, enseñanzas y redención en Jesús.",
            pt: "Vida, ensinamentos e redenção em Jesus.",
            sv: "Jesu liv, undervisning och frälsning.",
        },
        era: {
            en: "Gospels",
            es: "Evangelios",
            pt: "Evangelhos",
            sv: "Evangelierna",
        },
    },
    {
        id: "church",
        title: {
            en: "Church",
            es: "Iglesia",
            pt: "Igreja",
            sv: "Kyrkan",
        },
        body: {
            en: "The early church, apostles, and mission.",
            es: "La iglesia primitiva, los apóstoles y la misión.",
            pt: "A igreja primitiva, os apóstolos e a missão.",
            sv: "Den tidiga kyrkan, apostlarna och missionen.",
        },
        era: {
            en: "Acts & Letters",
            es: "Hechos y Cartas",
            pt: "Atos e Cartas",
            sv: "Apostlagärningarna och breven",
        },
    },
];

export const erasById: Record<EraId, EraContent> = Object
    .fromEntries(eras.map((item) => [item.id, item])) as Record<
    EraId,
    EraContent
>;
