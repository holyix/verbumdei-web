export type Locale = "en" | "es" | "pt" | "sv";

export type Option = {
    id: string;
    correct: boolean;
    text: Record<Locale, string>;
    explanation: Record<Locale, string>;
};

export type Question = {
    id: string;
    stage: Record<Locale, string>;
    prompt: Record<Locale, string>;
    options: Option[];
    source?: string;
    image_url?: string;
    image_url_light?: string;
    image_url_dark?: string;
    eraId?: string;
    episodeId?: string;
    tags?: string[];
};

export type Level = { id: string; label: Record<Locale, string> };

export type EraEpisode = {
    id: string;
    order: number;
    name: Record<Locale, string>;
    label: Record<Locale, string>;
    referenceCount: number;
};

export type Era = {
    id: string;
    order: number;
    name: Record<Locale, string>;
    label: Record<Locale, string>;
    type?: string;
    episodeCount: number;
    books: Record<Locale, string[]>;
    episodes: EraEpisode[];
};
