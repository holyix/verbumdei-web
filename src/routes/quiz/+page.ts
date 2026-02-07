import type { PageLoad } from "./$types";
import type { Level, Locale, Question } from "$lib/types";

const REQUIRED_LOCALES: Locale[] = ["en", "es", "pt", "sv"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8080";

const ensureLocales = (value: Record<string, string> | null | undefined) => {
    const out: Record<Locale, string> = { en: "", es: "", pt: "", sv: "" };
    for (const locale of REQUIRED_LOCALES) {
        const v = value?.[locale];
        out[locale] = typeof v === "string" ? v : "";
    }
    return out;
};

const mapQuestion = (raw: any, idx: number): Question => {
    const image_url = typeof raw?.image_url === "string" ? raw.image_url : undefined;
    const image_url_light =
        typeof raw?.image_url_light === "string" ? raw.image_url_light : undefined;
    const image_url_dark = typeof raw?.image_url_dark === "string" ? raw.image_url_dark : undefined;

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

    const baseImage = image_url ?? "/illustrations/quest-hero.svg";
    const lightImage =
        image_url_light ??
        (baseImage.includes("quest-hero") ? "/illustrations/quest-hero-light.svg" : baseImage);
    const darkImage = image_url_dark ?? baseImage;

    return {
        id: raw?.id ?? `q-${idx}`,
        stage: ensureLocales(stageLabel),
        prompt: ensureLocales(raw?.prompt),
        options,
        source: raw?.source,
        image_url: baseImage,
        image_url_light: lightImage,
        image_url_dark: darkImage,
        eraId: typeof raw?.era_id === "string" ? raw.era_id : undefined,
        episodeId:
            typeof raw?.episode_id === "string"
                ? raw.episode_id
                : typeof raw?.episode === "string"
                  ? raw.episode
                  : undefined,
        tags: Array.isArray(raw?.tags)
            ? raw.tags.filter((tag: unknown): tag is string => typeof tag === "string")
            : undefined,
    };
};

const normalizeKey = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const toCategory = (label: string) => {
    const normalized = label.toLowerCase().trim();
    if (normalized.includes("creation")) return "creation";
    if (normalized.includes("covenant") || normalized.includes("exodus")) return "exodus";
    if (normalized.includes("kingdom") || normalized.includes("kings")) return "kings";
    if (normalized.includes("christ")) return "christ";
    if (normalized.includes("church")) return "church";
    return null;
};

const matchesCategory = (question: Question, category: string) => {
    const normalizedCategory = normalizeKey(category);
    if (!normalizedCategory) return true;
    if (normalizeKey(question.eraId ?? "") === normalizedCategory) return true;

    const label = question.stage.en ?? "";
    const fallback = toCategory(label);
    if (fallback === normalizedCategory) return true;
    return normalizeKey(label).includes(normalizedCategory);
};

const matchesEpisode = (question: Question, episode: string) => {
    const normalizedEpisode = normalizeKey(episode);
    if (!normalizedEpisode) return true;
    if (normalizeKey(question.episodeId ?? "") === normalizedEpisode) return true;
    return (question.tags ?? []).some((tag) => normalizeKey(tag) === normalizedEpisode);
};

export const load: PageLoad = async ({ fetch, url }) => {
    let questions: Question[] = [];
    let locales: { id: Locale; label: string; name: string; flag?: string }[] = [];
    let levels: Level[] = [];
    const activeCategory = url.searchParams.get("category");
    const activeEpisode = url.searchParams.get("episode");

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
    if (!locales.length) {
        locales = [
            { id: "en", label: "EN", name: "English", flag: "🇬🇧" },
            { id: "es", label: "ES", name: "Español", flag: "🇪🇸" },
            { id: "pt", label: "PT", name: "Português", flag: "🇧🇷" },
            { id: "sv", label: "SV", name: "Svenska", flag: "🇸🇪" },
        ];
    }
    if (!levels.length) {
        levels = [];
    }

    if (activeCategory) {
        const filtered = questions.filter((question) => matchesCategory(question, activeCategory));
        questions = filtered.length ? filtered : questions;
    }

    if (activeEpisode) {
        const filtered = questions.filter((question) => matchesEpisode(question, activeEpisode));
        questions = filtered.length ? filtered : questions;
    }

    return { questions, locales, levels };
};
