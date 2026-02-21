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
    const resume: Resume | null = {
        eraId: "creation",
        eraLabel: "Creation",
        episodeId: "themes-of-creation",
        episodeLabel: "Themes of Creation",
        completedQuestions: 3,
        totalQuestions: 10,
    };

    const eras: EraCard[] = [
        { id: "creation", label: "Creation", episodeCount: 3, completionPercent: 34, isCurrentEra: true },
        { id: "patriarchs", label: "Patriarchs", episodeCount: 4, completionPercent: 12, isCurrentEra: false },
        { id: "exodus", label: "Exodus", episodeCount: 5, completionPercent: 0, isCurrentEra: false },
        { id: "kingdom", label: "Kingdom", episodeCount: 4, completionPercent: 0, isCurrentEra: false },
        { id: "prophets", label: "Prophets", episodeCount: 6, completionPercent: 0, isCurrentEra: false },
        { id: "christ", label: "Life of Christ", episodeCount: 7, completionPercent: 0, isCurrentEra: false },
    ];

    const overall: OverallProgress = {
        completedEpisodes: 2,
        totalEpisodes: 29,
        completedQuestions: 12,
        totalQuestions: 290,
    };

    const recentEpisodes: RecentEpisode[] = [
        {
            eraId: "creation",
            eraLabel: "Creation",
            episodeId: "creation-of-humanity",
            episodeLabel: "Creation of Humanity",
            progressLabel: "Completed",
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
