import type { PageLoad } from "./$types";
import { fetchEpisodeDetail, fetchEraDetail } from "$lib/api/quest";

export const load: PageLoad = async ({ fetch, params }) => {
    const { eraId, episodeId } = params;
    let episode = null;
    let era = null;

    try {
        episode = await fetchEpisodeDetail(fetch, eraId, episodeId);
    } catch (err) {
        console.error("Failed to fetch episode", err);
    }

    try {
        era = await fetchEraDetail(fetch, eraId);
    } catch (err) {
        console.error("Failed to fetch era", err);
    }

    return { eraId, episodeId, era, episode };
};
