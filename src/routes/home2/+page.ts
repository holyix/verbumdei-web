import type { PageLoad } from "./$types";

type Resume = {
    eraId: string;
    eraLabel: string;
    episodeId: string;
    episodeLabel: string;
    completedQuestions: number;
    totalQuestions: number;
};

type EraCard = {
    id: string;
    label: string;
    episodeCount: number;
    completionPercent: number;
    isCurrentEra: boolean;
};

type OverallProgress = {
    completedEpisodes: number;
    totalEpisodes: number;
    completedQuestions: number;
    totalQuestions: number;
};

type RecentEpisode = {
    eraId: string;
    eraLabel: string;
    episodeId: string;
    episodeLabel: string;
    progressLabel: string;
};

export const load: PageLoad = async () => {
    const resume: Resume | null = null;

    const eras: EraCard[] = [
        { id: "creation", label: "Creation", episodeCount: 3, completionPercent: 100, isCurrentEra: false },
        { id: "patriarchs", label: "Patriarchs", episodeCount: 4, completionPercent: 61, isCurrentEra: true },
        { id: "exodus", label: "Exodus", episodeCount: 5, completionPercent: 8, isCurrentEra: false },
        { id: "kingdom", label: "Kingdom", episodeCount: 4, completionPercent: 0, isCurrentEra: false },
        { id: "exile", label: "Exile", episodeCount: 3, completionPercent: 0, isCurrentEra: false },
        { id: "christ", label: "Life of Christ", episodeCount: 7, completionPercent: 0, isCurrentEra: false },
    ];

    const overall: OverallProgress = {
        completedEpisodes: 6,
        totalEpisodes: 26,
        completedQuestions: 53,
        totalQuestions: 260,
    };

    const recentEpisodes: RecentEpisode[] = [
        {
            eraId: "patriarchs",
            eraLabel: "Patriarchs",
            episodeId: "abraham",
            episodeLabel: "Call of Abraham",
            progressLabel: "7/10 questions",
        },
    ];

    return {
        resume,
        eras,
        overall,
        recentEpisodes,
        showStartJourneyCta: resume === null,
    };
};
