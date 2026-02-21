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
        eraId: "christ",
        eraLabel: "Life of Christ",
        episodeId: "sermon-on-the-mount",
        episodeLabel: "Sermon on the Mount",
        completedQuestions: 4,
        totalQuestions: 10,
    };

    const eras: EraCard[] = [
        { id: "creation", label: "Creation", episodeCount: 3, completionPercent: 100, isCurrentEra: false },
        { id: "patriarchs", label: "Patriarchs", episodeCount: 4, completionPercent: 100, isCurrentEra: false },
        { id: "exodus", label: "Exodus", episodeCount: 5, completionPercent: 80, isCurrentEra: false },
        { id: "kingdom", label: "Kingdom", episodeCount: 4, completionPercent: 25, isCurrentEra: false },
        { id: "prophets", label: "Prophets", episodeCount: 6, completionPercent: 13, isCurrentEra: false },
        { id: "christ", label: "Life of Christ", episodeCount: 7, completionPercent: 42, isCurrentEra: true },
        { id: "church", label: "Early Church", episodeCount: 5, completionPercent: 0, isCurrentEra: false },
    ];

    const overall: OverallProgress = {
        completedEpisodes: 13,
        totalEpisodes: 34,
        completedQuestions: 119,
        totalQuestions: 340,
    };

    const recentEpisodes: RecentEpisode[] = [
        {
            eraId: "christ",
            eraLabel: "Life of Christ",
            episodeId: "beatitudes",
            episodeLabel: "Beatitudes",
            progressLabel: "Completed",
        },
        {
            eraId: "christ",
            eraLabel: "Life of Christ",
            episodeId: "miracles-in-galilee",
            episodeLabel: "Miracles in Galilee",
            progressLabel: "8/10 questions",
        },
        {
            eraId: "prophets",
            eraLabel: "Prophets",
            episodeId: "themes-of-prophets",
            episodeLabel: "Themes of Prophets",
            progressLabel: "6/10 questions",
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
