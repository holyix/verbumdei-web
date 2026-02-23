import type { Locale } from "$lib/types";

export type TimelineHeroText = {
    eyebrow: string;
    title: string;
    body: string;
};

export const timelineHero: Record<Locale, TimelineHeroText> = {
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
