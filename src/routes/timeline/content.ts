import type { Locale } from "$lib/types";

export type TimelineHeroText = {
    eyebrow: string;
    title: string;
    body: string;
    eraTag: string;
    episodeTag: string;
    startEra: string;
    startEpisode: string;
};

export const timelineHero: Record<Locale, TimelineHeroText> = {
    en: {
        eyebrow: "The path to salvation",
        title: "Walk the story, era by era",
        body: "Browse major eras with their episodes mixed in the flow. Jump into an era or start from an individual episode.",
        eraTag: "Era",
        episodeTag: "Episode",
        startEra: "Start era",
        startEpisode: "Start episode",
    },
    es: {
        eyebrow: "El camino a la salvación",
        title: "Recorre la historia, era por era",
        body: "Explora las eras principales con episodios integrados en la línea. Entra por era o inicia desde un episodio.",
        eraTag: "Era",
        episodeTag: "Episodio",
        startEra: "Iniciar era",
        startEpisode: "Iniciar episodio",
    },
    pt: {
        eyebrow: "O caminho da salvação",
        title: "Percorra a história, era por era",
        body: "Explore eras principais com episódios misturados na linha. Entre por era ou comece por um episódio.",
        eraTag: "Era",
        episodeTag: "Episódio",
        startEra: "Iniciar era",
        startEpisode: "Iniciar episódio",
    },
    sv: {
        eyebrow: "Vägen till frälsning",
        title: "Vandra berättelsen, era för era",
        body: "Utforska huvudepoker med episoder inbäddade i flödet. Börja från en epok eller en enskild episod.",
        eraTag: "Epok",
        episodeTag: "Episod",
        startEra: "Starta epok",
        startEpisode: "Starta episod",
    },
};
