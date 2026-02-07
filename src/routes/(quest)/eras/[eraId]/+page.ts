import type { PageLoad } from "./$types";
import { fetchEraDetail, fetchEpisodesForEra } from "$lib/api/quest";

export const load: PageLoad = async ({ fetch, params }) => {
    const eraId = params.eraId;
    let era = null;
    let episodes = [];

    try {
        era = await fetchEraDetail(fetch, eraId);
    } catch (err) {
        console.error("Failed to fetch era", err);
    }

    try {
        episodes = await fetchEpisodesForEra(fetch, eraId);
    } catch (err) {
        console.error("Failed to fetch episodes", err);
    }

    return { eraId, era, episodes };
};
