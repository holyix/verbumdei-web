export const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8080";

export type EraSummary = {
    id: string;
    name: string;
    label: string;
    type?: string;
    episode_count: number;
};

export type EraDetail = {
    id: string;
    name: string;
    label: string;
    type?: string;
    books?: string[];
};

export type EpisodeListItem = {
    id: string;
    name: string;
    label: string;
    reference_count: number;
};

export type EpisodeReference = {
    book_id: string;
    book: string;
    chapters: number[];
};

export type EpisodeDetail = {
    id: string;
    name: string;
    label: string;
    references?: EpisodeReference[];
};

const safeJson = async (res: Response) => {
    if (!res.ok) return null;
    try {
        return await res.json();
    } catch {
        return null;
    }
};

export const fetchEraSummaries = async (fetchFn: typeof fetch): Promise<EraSummary[]> => {
    const res = await fetchFn(`${API_BASE}/v1/eras`);
    const body = await safeJson(res);
    return Array.isArray(body) ? (body as EraSummary[]) : [];
};

export const fetchEraDetail = async (
    fetchFn: typeof fetch,
    eraId: string,
): Promise<EraDetail | null> => {
    const res = await fetchFn(`${API_BASE}/v1/eras/${encodeURIComponent(eraId)}`);
    const body = await safeJson(res);
    return body && typeof body === "object" ? (body as EraDetail) : null;
};

export const fetchEpisodesForEra = async (
    fetchFn: typeof fetch,
    eraId: string,
): Promise<EpisodeListItem[]> => {
    const res = await fetchFn(`${API_BASE}/v1/eras/${encodeURIComponent(eraId)}/episodes`);
    const body = await safeJson(res);
    return Array.isArray(body) ? (body as EpisodeListItem[]) : [];
};

export const fetchEpisodeDetail = async (
    fetchFn: typeof fetch,
    eraId: string,
    episodeId: string,
): Promise<EpisodeDetail | null> => {
    const res = await fetchFn(
        `${API_BASE}/v1/eras/${encodeURIComponent(eraId)}/episodes/${encodeURIComponent(episodeId)}`,
    );
    const body = await safeJson(res);
    return body && typeof body === "object" ? (body as EpisodeDetail) : null;
};
