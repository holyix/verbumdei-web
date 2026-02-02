import type { Locale } from "$lib/types";

export type LocalizedStage = {
    id: string;
    title: Record<Locale, string>;
    era: Record<Locale, string>;
    summary: Record<Locale, string>;
    progress: number;
    offset: number;
    side: "left" | "right";
};

export const timelineHero: Record<
    Locale,
    { eyebrow: string; title: string; body: string }
> = {
    en: {
        eyebrow: "The path to salvation",
        title: "Walk the story, step by step",
        body: "Follow the unfolding story from Genesis to the early Church. Each era is a doorway, and every answer moves you forward.",
    },
    es: {
        eyebrow: "El camino a la salvación",
        title: "Recorre la historia, paso a paso",
        body: "Sigue la historia desde Génesis hasta la Iglesia primitiva. Cada era es una puerta, y cada respuesta te impulsa hacia adelante.",
    },
    pt: {
        eyebrow: "O caminho da salvação",
        title: "Percorra a história, passo a passo",
        body: "Siga a história de Gênesis até a Igreja primitiva. Cada era é uma porta, e cada resposta leva você adiante.",
    },
    sv: {
        eyebrow: "Vägen till frälsning",
        title: "Vandra berättelsen, steg för steg",
        body: "Följ berättelsen från Första Mosebok till den tidiga kyrkan. Varje era är en dörr, och varje svar för dig framåt.",
    },
};

export const stages: LocalizedStage[] = [
    {
        id: "creation",
        title: {
            en: "Creation",
            es: "Creación",
            pt: "Criação",
            sv: "Skapelsen",
        },
        era: {
            en: "Genesis",
            es: "Génesis",
            pt: "Gênesis",
            sv: "Första Mosebok",
        },
        summary: {
            en: "Origins, covenant beginnings, and the first promises.",
            es: "Orígenes, inicios del pacto y las primeras promesas.",
            pt: "Origens, início da aliança e as primeiras promessas.",
            sv: "Ursprung, förbundets början och de första löftena.",
        },
        progress: 0.0,
        offset: 0,
        side: "left",
    },
    {
        id: "exodus",
        title: {
            en: "Exodus",
            es: "Éxodo",
            pt: "Êxodo",
            sv: "Uttåget",
        },
        era: {
            en: "Deliverance",
            es: "Liberación",
            pt: "Libertação",
            sv: "Befrielse",
        },
        summary: {
            en: "Liberation, wilderness faith, and a people formed by God.",
            es: "Liberación, fe en el desierto y un pueblo formado por Dios.",
            pt: "Libertação, fé no deserto e um povo formado por Deus.",
            sv: "Befrielse, tro i öknen och ett folk format av Gud.",
        },
        progress: 0.35,
        offset: 0,
        side: "right",
    },
    {
        id: "kings",
        title: {
            en: "Kings",
            es: "Reyes",
            pt: "Reis",
            sv: "Kungarna",
        },
        era: {
            en: "Kingdom",
            es: "Reino",
            pt: "Reino",
            sv: "Riket",
        },
        summary: {
            en: "Rise and fall of Israel’s kingdom and its leaders.",
            es: "Ascenso y caída del reino de Israel y sus líderes.",
            pt: "Ascensão e queda do reino de Israel e seus líderes.",
            sv: "Israels rikes uppgång och fall och dess ledare.",
        },
        progress: 0.75,
        offset: 0,
        side: "right",
    },
    {
        id: "christ",
        title: {
            en: "Christ",
            es: "Cristo",
            pt: "Cristo",
            sv: "Kristus",
        },
        era: {
            en: "Gospels",
            es: "Evangelios",
            pt: "Evangelhos",
            sv: "Evangelierna",
        },
        summary: {
            en: "Life, teachings, and redemption through Jesus.",
            es: "Vida, enseñanzas y redención por medio de Jesús.",
            pt: "Vida, ensinamentos e redenção por meio de Jesus.",
            sv: "Jesu liv, undervisning och frälsning.",
        },
        progress: 0.0,
        offset: 0,
        side: "left",
    },
    {
        id: "church",
        title: {
            en: "Church",
            es: "Iglesia",
            pt: "Igreja",
            sv: "Kyrkan",
        },
        era: {
            en: "Acts & Letters",
            es: "Hechos y Cartas",
            pt: "Atos e Cartas",
            sv: "Apostlagärningarna och breven",
        },
        summary: {
            en: "The early church, apostles, and mission.",
            es: "La iglesia primitiva, los apóstoles y la misión.",
            pt: "A igreja primitiva, os apóstolos e a missão.",
            sv: "Den tidiga kyrkan, apostlarna och missionen.",
        },
        progress: 1.0,
        offset: 0,
        side: "left",
    },
];
