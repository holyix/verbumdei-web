import type { Era, EraEpisode, Locale } from "$lib/types";

const REQUIRED_LOCALES: Locale[] = ["en", "es", "pt", "sv"];
const MAX_ORDER = Number.MAX_SAFE_INTEGER;

const DEFAULT_ERA_ORDER: Record<string, number> = {
    creation: 10,
    origins: 20,
    patriarchs: 30,
    exodus: 40,
    settlement: 50,
    kings: 60,
    psalms: 70,
    wisdom: 80,
    prophets: 90,
    exile: 100,
    gospel: 110,
    church: 120,
    messianics: 130,
};

const DEFAULT_EPISODE_ORDER: Record<string, Record<string, number>> = {
    creation: { world: 10, humanity: 20 },
    origins: { "the-fall": 10, "cain-abel": 20, noah: 30, babel: 40 },
    patriarchs: { abraham: 10, isaac: 20, jacob: 30, joseph: 40 },
    exodus: { moses: 10, "exodus-event": 20, sinai: 30, wilderness: 40 },
    settlement: { joshua: 10, judges: 20 },
    kings: { saul: 10, david: 20, solomon: 30 },
    psalms: { lament: 10, praise: 20, kingship: 30 },
    wisdom: { suffering: 10, virtue: 20, meaning: 30 },
    prophets: { division: 10, commission: 20, repentance: 30 },
    exile: { exile: 10, daniel: 20, esther: 30, return: 40, maccabees: 50 },
    gospel: { incarnation: 10, mary: 20, ministry: 30, passion: 40, resurrection: 50 },
    church: { pentecost: 10, apostles: 20, paul: 30, letters: 40, revelation: 50 },
    messianics: {},
};

type RawEraListItem = {
    id?: string;
    name?: string;
    label?: string;
    order?: number;
    type?: string;
    episode_count?: number;
};

type RawEpisodeListItem = {
    id?: string;
    name?: string;
    label?: string;
    order?: number;
    reference_count?: number;
};

const emptyLocales = (): Record<Locale, string> => ({ en: "", es: "", pt: "", sv: "" });
const emptyBooks = (): Record<Locale, string[]> => ({ en: [], es: [], pt: [], sv: [] });

const mergeLocalized = (
    target: Record<Locale, string>,
    locale: Locale,
    value: string | undefined,
) => {
    if (typeof value === "string") {
        target[locale] = value;
    }
};

const fetchJson = async (fetchFn: typeof fetch, url: string) => {
    const res = await fetchFn(url);
    if (!res.ok) return null;
    return res.json();
};

const resolveEraOrder = (eraId: string, rawOrder?: number) =>
    typeof rawOrder === "number" ? rawOrder : (DEFAULT_ERA_ORDER[eraId] ?? MAX_ORDER);

const resolveEpisodeOrder = (eraId: string, episodeId: string, rawOrder?: number) =>
    typeof rawOrder === "number"
        ? rawOrder
        : (DEFAULT_EPISODE_ORDER[eraId]?.[episodeId] ?? MAX_ORDER);

const eraComparator = (a: Era, b: Era) => {
    const aIsMeta = a.type === "meta";
    const bIsMeta = b.type === "meta";
    if (aIsMeta !== bIsMeta) {
        return aIsMeta ? 1 : -1;
    }
    return a.order - b.order || a.id.localeCompare(b.id);
};

const episodeComparator = (a: EraEpisode, b: EraEpisode) =>
    a.order - b.order || a.id.localeCompare(b.id);

export const fetchErasWithEpisodes = async (
    fetchFn: typeof fetch,
    apiBase: string,
): Promise<Era[]> => {
    const listByLocale = await Promise.all(
        REQUIRED_LOCALES.map(async (locale) => {
            try {
                const body = await fetchJson(fetchFn, `${apiBase}/v1/eras?lang=${locale}`);
                const items = Array.isArray(body) ? (body as RawEraListItem[]) : [];
                return { locale, items };
            } catch {
                return { locale, items: [] as RawEraListItem[] };
            }
        }),
    );

    const orderedEraIds: string[] = [];
    const erasMap = new Map<string, Era>();

    for (const { locale, items } of listByLocale) {
        for (const item of items) {
            const eraId = typeof item.id === "string" ? item.id : "";
            if (!eraId) continue;
            if (!erasMap.has(eraId)) {
                erasMap.set(eraId, {
                    id: eraId,
                    order: resolveEraOrder(eraId, item.order),
                    name: emptyLocales(),
                    label: emptyLocales(),
                    type: item.type,
                    episodeCount: typeof item.episode_count === "number" ? item.episode_count : 0,
                    books: emptyBooks(),
                    episodes: [],
                });
                orderedEraIds.push(eraId);
            }
            const era = erasMap.get(eraId)!;
            mergeLocalized(era.name, locale, item.name);
            mergeLocalized(era.label, locale, item.label);
            if (!era.type && typeof item.type === "string") {
                era.type = item.type;
            }
            era.order = resolveEraOrder(eraId, item.order);
            if (typeof item.episode_count === "number") {
                era.episodeCount = Math.max(era.episodeCount, item.episode_count);
            }
        }
    }

    const episodeResponses = await Promise.all(
        orderedEraIds.flatMap((eraId) =>
            REQUIRED_LOCALES.map(async (locale) => {
                try {
                    const body = await fetchJson(
                        fetchFn,
                        `${apiBase}/v1/eras/${encodeURIComponent(eraId)}/episodes?lang=${locale}`,
                    );
                    const items = Array.isArray(body) ? (body as RawEpisodeListItem[]) : [];
                    return { eraId, locale, items };
                } catch {
                    return { eraId, locale, items: [] as RawEpisodeListItem[] };
                }
            }),
        ),
    );

    for (const { eraId, locale, items } of episodeResponses) {
        const era = erasMap.get(eraId);
        if (!era) continue;

        const episodesMap = new Map<string, EraEpisode>(era.episodes.map((item) => [item.id, item]));

        for (const item of items) {
            const episodeId = typeof item.id === "string" ? item.id : "";
            if (!episodeId) continue;

            if (!episodesMap.has(episodeId)) {
                episodesMap.set(episodeId, {
                    id: episodeId,
                    order: resolveEpisodeOrder(eraId, episodeId, item.order),
                    name: emptyLocales(),
                    label: emptyLocales(),
                    referenceCount:
                        typeof item.reference_count === "number" ? item.reference_count : 0,
                });
            }

            const episode = episodesMap.get(episodeId)!;
            mergeLocalized(episode.name, locale, item.name);
            mergeLocalized(episode.label, locale, item.label);
            episode.order = resolveEpisodeOrder(eraId, episodeId, item.order);
            if (typeof item.reference_count === "number") {
                episode.referenceCount = Math.max(episode.referenceCount, item.reference_count);
            }
        }

        era.episodes = Array.from(episodesMap.values()).sort(episodeComparator);
        era.episodeCount = Math.max(era.episodeCount, era.episodes.length);
    }

    return orderedEraIds
        .map((id) => erasMap.get(id))
        .filter((item): item is Era => !!item)
        .sort(eraComparator);
};
