import type { PageLoad } from "./$types";
import { fetchEraSummaries } from "$lib/api/quest";

export const load: PageLoad = async ({ fetch }) => {
    let eras = [];
    try {
        eras = await fetchEraSummaries(fetch);
    } catch (err) {
        console.error("Failed to fetch era summaries", err);
    }
    return { eras };
};
