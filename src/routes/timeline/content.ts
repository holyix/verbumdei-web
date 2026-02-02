import type { Locale } from "$lib/types";
import { erasById, type EraId } from "$lib/common/eras";

export type LocalizedStage = {
    id: EraId;
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

const stageLayout: Record<
    EraId,
    { progress: number; offset: number; side: "left" | "right" }
> = {
    creation: { progress: 0.0, offset: 0, side: "left" },
    exodus: { progress: 0.35, offset: 0, side: "right" },
    kings: { progress: 0.75, offset: 0, side: "right" },
    christ: { progress: 0.0, offset: 0, side: "left" },
    church: { progress: 1.0, offset: 0, side: "left" },
};

const stageOrder: EraId[] = [
    "creation",
    "exodus",
    "kings",
    "christ",
    "church",
];

export const stages: LocalizedStage[] = stageOrder.map((id) => ({
    id,
    title: erasById[id].title,
    era: erasById[id].era,
    summary: erasById[id].body,
    progress: stageLayout[id].progress,
    offset: stageLayout[id].offset,
    side: stageLayout[id].side,
}));
