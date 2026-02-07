import type { Locale } from "$lib/types";
import { commonUiText, mergeUiText } from "$lib/content/common";

const homeSpecificUiText: Record<Locale, Record<string, string>> = {
    en: {},
    es: {},
    pt: {},
    sv: {},
};

export const homeUiText = mergeUiText(commonUiText, homeSpecificUiText);

export type LandingText = {
    eyebrow: string;
    title: string;
    body: string;
    sectionLabel: string;
    timelineTitle: string;
    timelineBody: string;
    startTimeline: string;
    viewTimeline: string;
    startPrefix: string;
    guidedLabel: string;
    episodeCountLabel: string;
    startEpisode: string;
};

export const homeLandingText: Record<Locale, LandingText> = {
    en: {
        eyebrow: "New journey",
        title: "Pick your path through Scripture",
        body: "Choose the full timeline for a guided story, or dive into a focused category.",
        sectionLabel: "Timeline or era",
        timelineTitle: "Full timeline",
        timelineBody:
            "Journey from Creation to the early Church with a curated sequence of questions.",
        startTimeline: "Start timeline",
        viewTimeline: "View timeline",
        startPrefix: "Start",
        guidedLabel: "Guided",
        episodeCountLabel: "episodes",
        startEpisode: "Start episode",
    },
    es: {
        eyebrow: "Nuevo viaje",
        title: "Elige tu camino por la Escritura",
        body: "Elige la línea del tiempo completa para una historia guiada, o entra en una categoría.",
        sectionLabel: "Línea del tiempo o era",
        timelineTitle: "Línea del tiempo",
        timelineBody:
            "Viaja desde la Creación hasta la Iglesia primitiva con una secuencia guiada.",
        startTimeline: "Iniciar línea",
        viewTimeline: "Ver línea del tiempo",
        startPrefix: "Iniciar",
        guidedLabel: "Guiada",
        episodeCountLabel: "episodios",
        startEpisode: "Iniciar episodio",
    },
    pt: {
        eyebrow: "Nova jornada",
        title: "Escolha seu caminho pelas Escrituras",
        body: "Escolha a linha do tempo completa para uma história guiada, ou foque em uma categoria.",
        sectionLabel: "Linha do tempo ou era",
        timelineTitle: "Linha do tempo",
        timelineBody: "Siga da Criação à Igreja primitiva com uma sequência guiada de perguntas.",
        startTimeline: "Iniciar linha",
        viewTimeline: "Ver linha do tempo",
        startPrefix: "Iniciar",
        guidedLabel: "Guiada",
        episodeCountLabel: "episódios",
        startEpisode: "Iniciar episódio",
    },
    sv: {
        eyebrow: "Ny resa",
        title: "Välj din väg genom Skriften",
        body: "Välj hela tidslinjen för en guidad berättelse, eller fördjupa dig i en kategori.",
        sectionLabel: "Tidslinje eller era",
        timelineTitle: "Hela tidslinjen",
        timelineBody: "Färdas från Skapelsen till den tidiga kyrkan med en guidad följd av frågor.",
        startTimeline: "Starta tidslinje",
        viewTimeline: "Visa tidslinjen",
        startPrefix: "Starta",
        guidedLabel: "Guidad",
        episodeCountLabel: "episoder",
        startEpisode: "Starta episod",
    },
};
