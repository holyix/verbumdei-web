export type Locale = "en" | "es" | "pt";

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
};

export type Level = { id: string; label: Record<Locale, string> };
