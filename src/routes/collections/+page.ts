import type { PageLoad } from "./$types";

type EpisodeItem = {
    id: string;
    label: string;
    progressPercent: number;
    playHref: string;
    bibleHref: string;
    questions: {
        id: string;
        prompt: string;
    }[];
};

type EraSection = {
    id: string;
    label: string;
    mainBooks: string[];
    completionPercent: number;
    episodes: EpisodeItem[];
};

export const load: PageLoad = async () => {
    const eras: EraSection[] = [
        {
            id: "creation",
            label: "Creation",
            mainBooks: ["Genesis 1-11"],
            completionPercent: 66,
            episodes: [
                {
                    id: "creation-of-the-world",
                    label: "Creation of the World",
                    progressPercent: 100,
                    playHref: "/eras/creation/episodes/creation-of-the-world",
                    bibleHref: "/eras/creation/episodes/creation-of-the-world#references",
                    questions: [
                        {
                            id: "q-cw-1",
                            prompt: "What did God create on the first day?",
                        },
                        {
                            id: "q-cw-2",
                            prompt: "What is the theological meaning of Sabbath rest?",
                        },
                    ],
                },
                {
                    id: "creation-of-humanity",
                    label: "Creation of Humanity",
                    progressPercent: 60,
                    playHref: "/eras/creation/episodes/creation-of-humanity",
                    bibleHref: "/eras/creation/episodes/creation-of-humanity#references",
                    questions: [
                        {
                            id: "q-ch-1",
                            prompt: "What does it mean that humanity is made in God's image?",
                        },
                        {
                            id: "q-ch-2",
                            prompt: "How are man and woman described in Genesis 2?",
                        },
                    ],
                },
                {
                    id: "themes-of-creation",
                    label: "Themes of Creation",
                    progressPercent: 0,
                    playHref: "/eras/creation/episodes/themes-of-creation",
                    bibleHref: "/eras/creation/episodes/themes-of-creation#references",
                    questions: [
                        {
                            id: "q-tc-1",
                            prompt: "How does creation reveal divine wisdom and order?",
                        },
                        {
                            id: "q-tc-2",
                            prompt: "Why is creation called fundamentally good?",
                        },
                    ],
                },
            ],
        },
        {
            id: "patriarchs",
            label: "Patriarchs",
            mainBooks: ["Genesis 12-50"],
            completionPercent: 30,
            episodes: [
                {
                    id: "call-of-abraham",
                    label: "Call of Abraham",
                    progressPercent: 70,
                    playHref: "/eras/patriarchs/episodes/call-of-abraham",
                    bibleHref: "/eras/patriarchs/episodes/call-of-abraham#references",
                    questions: [
                        {
                            id: "q-ca-1",
                            prompt: "What promise does God give Abraham in Genesis 12?",
                        },
                        {
                            id: "q-ca-2",
                            prompt: "How does Abraham's departure model faith?",
                        },
                    ],
                },
                {
                    id: "covenant-promises",
                    label: "Covenant Promises",
                    progressPercent: 20,
                    playHref: "/eras/patriarchs/episodes/covenant-promises",
                    bibleHref: "/eras/patriarchs/episodes/covenant-promises#references",
                    questions: [
                        {
                            id: "q-cp-1",
                            prompt: "What signs accompany God's covenant with Abraham?",
                        },
                        {
                            id: "q-cp-2",
                            prompt: "How is the promise carried through Isaac and Jacob?",
                        },
                    ],
                },
                {
                    id: "themes-of-patriarchs",
                    label: "Themes of Patriarchs",
                    progressPercent: 0,
                    playHref: "/eras/patriarchs/episodes/themes-of-patriarchs",
                    bibleHref: "/eras/patriarchs/episodes/themes-of-patriarchs#references",
                    questions: [
                        {
                            id: "q-tp-1",
                            prompt: "How do covenant and election shape this era?",
                        },
                        {
                            id: "q-tp-2",
                            prompt: "How is God's fidelity shown despite human weakness?",
                        },
                    ],
                },
            ],
        },
        {
            id: "life-of-christ",
            label: "Life of Christ",
            mainBooks: ["Matthew", "Mark", "Luke", "John"],
            completionPercent: 12,
            episodes: [
                {
                    id: "nativity",
                    label: "Nativity",
                    progressPercent: 30,
                    playHref: "/eras/life-of-christ/episodes/nativity",
                    bibleHref: "/eras/life-of-christ/episodes/nativity#references",
                    questions: [
                        {
                            id: "q-n-1",
                            prompt: "Which prophecies are fulfilled in Jesus' birth narratives?",
                        },
                        {
                            id: "q-n-2",
                            prompt: "What is emphasized by the title Emmanuel?",
                        },
                    ],
                },
                {
                    id: "sermon-on-the-mount",
                    label: "Sermon on the Mount",
                    progressPercent: 10,
                    playHref: "/eras/life-of-christ/episodes/sermon-on-the-mount",
                    bibleHref: "/eras/life-of-christ/episodes/sermon-on-the-mount#references",
                    questions: [
                        {
                            id: "q-sm-1",
                            prompt: "How do the Beatitudes redefine blessedness?",
                        },
                        {
                            id: "q-sm-2",
                            prompt: "How does Jesus deepen the understanding of the Law?",
                        },
                    ],
                },
                {
                    id: "themes-of-life-of-christ",
                    label: "Themes of Life of Christ",
                    progressPercent: 0,
                    playHref: "/eras/life-of-christ/episodes/themes-of-life-of-christ",
                    bibleHref: "/eras/life-of-christ/episodes/themes-of-life-of-christ#references",
                    questions: [
                        {
                            id: "q-tlc-1",
                            prompt: "How do kingdom, mercy, and discipleship converge in Christ?",
                        },
                        {
                            id: "q-tlc-2",
                            prompt: "Why is Christ the center of salvation history?",
                        },
                    ],
                },
            ],
        },
    ];

    return { eras };
};
