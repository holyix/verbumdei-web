<script lang="ts">
    export let data: {
        eras: {
            id: string;
            label: string;
            mainBooks: string[];
            completionPercent: number;
            episodes: {
                id: string;
                label: string;
                progressPercent: number;
                playHref: string;
                bibleHref: string;
                questions: {
                    id: string;
                    prompt: string;
                }[];
            }[];
        }[];
    };

    let expanded = new Set<string>(data.eras.slice(0, 1).map((era) => era.id));
    let expandedEpisodes = new Set<string>(
        data.eras.length && data.eras[0].episodes.length
            ? [`${data.eras[0].id}:${data.eras[0].episodes[0].id}`]
            : [],
    );

    const isExpanded = (eraId: string) => expanded.has(eraId);
    const episodeKey = (eraId: string, episodeId: string) => `${eraId}:${episodeId}`;
    const isEpisodeExpanded = (eraId: string, episodeId: string) =>
        expandedEpisodes.has(episodeKey(eraId, episodeId));

    const toggleEra = (eraId: string) => {
        const next = new Set(expanded);
        if (next.has(eraId)) {
            next.delete(eraId);
        } else {
            next.add(eraId);
        }
        expanded = next;
    };

    const toggleEpisode = (eraId: string, episodeId: string) => {
        const key = episodeKey(eraId, episodeId);
        const next = new Set(expandedEpisodes);
        if (next.has(key)) {
            next.delete(key);
        } else {
            next.add(key);
        }
        expandedEpisodes = next;
    };
</script>

<main class="collections-page">
    <header class="intro">
        <p class="eyebrow">Option E</p>
        <h1>Flat Era Outline</h1>
        <p>Each era stays flat and textual; expand an era to open its episode stack.</p>
    </header>

    <section class="era-list" aria-label="Eras and episodes">
        {#each data.eras as era}
            <article class="era-item">
                <div class="era-header">
                    <div class="era-meta">
                        <h2>{era.label}</h2>
                        <p>{era.mainBooks.join(" • ")}</p>
                    </div>
                    <div class="era-right">
                        <p>{era.completionPercent}%</p>
                        <button
                            type="button"
                            class="toggle"
                            on:click={() => toggleEra(era.id)}
                            aria-expanded={isExpanded(era.id)}
                            aria-controls={`episodes-${era.id}`}
                        >
                            {isExpanded(era.id) ? "Fold" : "Unfold"}
                        </button>
                    </div>
                </div>

                <div class="era-line" aria-hidden="true">
                    <span style={`width:${era.completionPercent}%`}></span>
                </div>

                {#if isExpanded(era.id)}
                    <ul id={`episodes-${era.id}`} class="episode-stack">
                        {#each era.episodes as episode}
                            <li>
                                <div class="episode-row">
                                    <div class="episode-main">
                                        <p class="episode-label">{episode.label}</p>
                                        <p class="episode-progress">{episode.progressPercent}% complete</p>
                                    </div>
                                    <div class="episode-actions">
                                        <button
                                            type="button"
                                            class="toggle-questions"
                                            on:click={() => toggleEpisode(era.id, episode.id)}
                                            aria-expanded={isEpisodeExpanded(era.id, episode.id)}
                                            aria-controls={`questions-${era.id}-${episode.id}`}
                                        >
                                            {isEpisodeExpanded(era.id, episode.id)
                                                ? "Fold questions"
                                                : "Unfold questions"}
                                        </button>
                                        <a
                                            class="play"
                                            href={episode.playHref}
                                            aria-label={`Play ${episode.label}`}
                                        >
                                            Play
                                        </a>
                                        <a
                                            class="bible"
                                            href={episode.bibleHref}
                                            aria-label={`Open Bible references for ${episode.label}`}
                                            title="Bible references"
                                        >
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path
                                                    d="M6 3h8a4 4 0 0 1 4 4v13.5a.5.5 0 0 1-.76.43A6.9 6.9 0 0 0 14 20H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8c.7 0 1.38.1 2 .3V7a2 2 0 0 0-2-2H6Zm2 3h6v2H8V8Zm0 4h6v2H8v-2Z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                {#if isEpisodeExpanded(era.id, episode.id)}
                                    <ul
                                        id={`questions-${era.id}-${episode.id}`}
                                        class="question-list"
                                        aria-label={`Questions for ${episode.label}`}
                                    >
                                        {#each episode.questions as question, index}
                                            <li>
                                                <p class="question-index">Q{index + 1}</p>
                                                <p class="question-text">{question.prompt}</p>
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </article>
        {/each}
    </section>
</main>

<style>
    .collections-page {
        display: grid;
        gap: 1rem;
    }

    .intro p,
    .intro h1 {
        margin: 0;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--text-muted);
        font-size: 0.72rem;
        margin-bottom: 0.55rem;
    }

    .intro h1 {
        margin-bottom: 0.55rem;
        font-family: var(--font-display);
    }

    .intro p {
        color: var(--text-subtle);
        max-width: 65ch;
    }

    .era-list {
        display: grid;
        gap: 1rem;
    }

    .era-item {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid var(--outline-soft);
        display: grid;
        gap: 0.65rem;
    }

    .era-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
    }

    .era-meta h2,
    .era-meta p,
    .era-right p {
        margin: 0;
    }

    .era-meta h2 {
        font-size: clamp(1.24rem, 1.2vw + 0.95rem, 1.55rem);
        line-height: 1.15;
        letter-spacing: 0.01em;
    }

    .era-meta p {
        margin-top: 0.2rem;
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .era-right {
        display: flex;
        gap: 0.55rem;
        align-items: center;
    }

    .era-right p {
        color: var(--text-muted);
        font-size: 0.84rem;
    }

    .toggle {
        border: 1px solid var(--outline-soft);
        color: var(--text);
        background: transparent;
        border-radius: 999px;
        padding: 0.24rem 0.65rem;
        font-size: 0.78rem;
        cursor: pointer;
    }

    .era-line {
        height: 2px;
        border-radius: 999px;
        background: var(--surface-strong);
        overflow: hidden;
    }

    .era-line span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    }

    .episode-stack {
        list-style: none;
        margin: 0;
        padding: 0 0 0 1rem;
        display: grid;
        gap: 0.45rem;
        border-left: 1px solid var(--outline-soft);
    }

    .episode-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
        padding: 0.48rem 0;
    }

    .episode-main p {
        margin: 0;
    }

    .episode-label {
        font-weight: 600;
        font-size: 0.95rem;
    }

    .episode-progress {
        margin-top: 0.2rem;
        font-size: 0.83rem;
        color: var(--text-muted);
    }

    .episode-actions {
        display: flex;
        gap: 0.45rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .episode-actions a {
        text-decoration: none;
        color: var(--text);
        border: 1px solid var(--outline-soft);
    }

    .play {
        border-radius: 999px;
        padding: 0.34rem 0.7rem;
        font-size: 0.84rem;
        background: var(--accent-soft);
    }

    .bible {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        background: var(--surface);
    }

    .bible svg {
        width: 16px;
        height: 16px;
        fill: var(--text);
    }

    .toggle-questions {
        border: 1px solid var(--outline-soft);
        color: var(--text);
        background: transparent;
        border-radius: 999px;
        padding: 0.34rem 0.7rem;
        font-size: 0.78rem;
        cursor: pointer;
    }

    .question-list {
        list-style: none;
        margin: 0.2rem 0 0 0;
        padding: 0.2rem 0 0.1rem 0.9rem;
        display: grid;
        gap: 0.35rem;
        border-left: 1px solid var(--outline-soft);
    }

    .question-list li {
        display: grid;
        gap: 0.15rem;
    }

    .question-index,
    .question-text {
        margin: 0;
    }

    .question-index {
        font-size: 0.72rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .question-text {
        font-size: 0.87rem;
        color: var(--text-subtle);
        line-height: 1.35;
    }

    @media (max-width: 640px) {
        .era-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .episode-row {
            flex-direction: column;
            align-items: flex-start;
        }

        .episode-stack {
            padding-left: 0.75rem;
        }
    }
</style>
