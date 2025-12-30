import type { PageLoad } from "./$types";
import type { Level, Locale, Question } from "$lib/types";

const REQUIRED_LOCALES: Locale[] = ["en", "es", "pt"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8080";

const ensureLocales = (value: Record<string, string> | null | undefined) => {
    const out: Record<Locale, string> = { en: "", es: "", pt: "" };
    for (const locale of REQUIRED_LOCALES) {
        const v = value?.[locale];
        out[locale] = typeof v === "string" ? v : "";
    }
    return out;
};

const mapQuestion = (raw: any, idx: number): Question => {
    const image_url = typeof raw?.image_url === "string" ? raw.image_url : undefined;

    const options = Array.isArray(raw.options)
        ? raw.options.map((opt: any, i: number) => ({
              id: opt?.id ?? LETTERS[i] ?? `${i}`,
              correct: !!opt?.correct,
              text: ensureLocales(opt?.text),
              explanation: ensureLocales(opt?.explanation),
          }))
        : [];

    const stageLabel =
        raw?.stage_label ??
        REQUIRED_LOCALES.reduce(
            (acc, locale) => ({ ...acc, [locale]: raw?.stage?.toString?.() ?? "" }),
            {} as Record<Locale, string>,
        );

    return {
        id: raw?.id ?? `q-${idx}`,
        stage: ensureLocales(stageLabel),
        prompt: ensureLocales(raw?.prompt),
        options,
        source: raw?.source,
        image_url: image_url ?? "/illustrations/quest-hero.svg",
    };
};

export const load: PageLoad = async ({ fetch }) => {
    let questions: Question[] = [];
    let uiText: Record<Locale, Record<string, string>> | null = null;
    let locales: { id: Locale; label: string; name: string; flag?: string }[] =
        [];
    let levels: Level[] = [];

    try {
        const res = await fetch(`${API_BASE}/v1/questions`);
        if (res.ok) {
            const body = await res.json();
            const items = Array.isArray(body?.items) ? body.items : Array.isArray(body) ? body : [];
            questions = items.map(mapQuestion);
        }
    } catch (err) {
        console.error("Failed to fetch questions", err);
    }

    // fetch UI elements
    try {
        const res = await fetch(`${API_BASE}/v1/ui/elements`);
        if (res.ok) {
            const body = await res.json();
            if (body?.ui_text) uiText = body.ui_text;
        }
    } catch (err) {
        console.error("Failed to fetch ui elements", err);
    }

    // fetch locales
    try {
        const res = await fetch(`${API_BASE}/v1/ui/locales`);
        if (res.ok) {
            const body = await res.json();
            if (Array.isArray(body?.languages)) {
                locales = body.languages as typeof locales;
            }
        }
    } catch (err) {
        console.error("Failed to fetch locales", err);
    }

    // fetch levels
    try {
        const res = await fetch(`${API_BASE}/v1/ui/levels`);
        if (res.ok) {
            const body = await res.json();
            if (Array.isArray(body?.levels)) {
                levels = body.levels as Level[];
            }
        }
    } catch (err) {
        console.error("Failed to fetch levels", err);
    }

    // fallbacks if API missing
    if (!uiText) {
        uiText = {
            en: {},
            es: {},
            pt: {},
        };
    }
    if (!locales.length) {
        locales = [
            { id: "en", label: "EN", name: "English", flag: "🇬🇧" },
            { id: "es", label: "ES", name: "Español", flag: "🇪🇸" },
            { id: "pt", label: "PT", name: "Português", flag: "🇧🇷" },
        ];
    }
    if (!levels.length) {
        levels = [];
    }

    return { questions, uiText, locales, levels };
};
