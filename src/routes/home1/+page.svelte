<script lang="ts">
    export let data: {
        resume: {
            eraId: string;
            eraLabel: string;
            episodeId: string;
            episodeLabel: string;
            completedQuestions: number;
            totalQuestions: number;
        } | null;
        eras: {
            id: string;
            label: string;
            episodeCount: number;
            completionPercent: number;
            isCurrentEra: boolean;
        }[];
        overall: {
            completedEpisodes: number;
            totalEpisodes: number;
            completedQuestions: number;
            totalQuestions: number;
        };
        recentEpisodes: {
            eraId: string;
            eraLabel: string;
            episodeId: string;
            episodeLabel: string;
            progressLabel: string;
        }[];
        showStartJourneyCta: boolean;
    };
</script>

<main class="home1">
    <header class="intro">
        <p class="eyebrow">Option A</p>
        <h1>Resume-First Monolith</h1>
        <p>Return to your last episode first, then continue the journey era by era.</p>
    </header>

    {#if data.resume}
        <section class="resume" aria-label="Continue">
            <div>
                <p class="label">Continue</p>
                <h2>{data.resume.episodeLabel}</h2>
                <p class="meta">{data.resume.eraLabel}</p>
            </div>
            <p class="progress">
                {data.resume.completedQuestions} of {data.resume.totalQuestions} questions
            </p>
            <a class="continue" href={`/eras/${data.resume.eraId}/episodes/${data.resume.episodeId}`}>
                Continue
            </a>
        </section>
    {:else if data.showStartJourneyCta}
        <section class="start" aria-label="Start your journey">
            <p>No episode in progress.</p>
            <a href="/eras">Start your journey</a>
        </section>
    {/if}

    <section class="eras" aria-label="Eras">
        <h2>Eras</h2>
        <div class="grid">
            {#each data.eras as era}
                <a class:current={era.isCurrentEra} class="era-card" href={`/eras/${era.id}`}>
                    <p class="era-name">{era.label}</p>
                    <p class="era-meta">{era.episodeCount} episodes</p>
                    <p class="era-progress">{era.completionPercent}% completed</p>
                </a>
            {/each}
        </div>
    </section>

    <footer class="note">
        <p>
            Episode quizzes remain the only entry point. Era cards are navigation into episode lists.
        </p>
        <p>
            Overall progress: {data.overall.completedEpisodes}/{data.overall.totalEpisodes} episodes,
            {data.overall.completedQuestions}/{data.overall.totalQuestions} questions.
        </p>
    </footer>
</main>

<style>
    .home1 {
        display: grid;
        gap: 1.4rem;
    }

    .intro p,
    .intro h1 {
        margin: 0;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: var(--text-muted);
        font-size: 0.72rem;
        margin-bottom: 0.6rem;
    }

    .intro h1 {
        font-family: var(--font-display);
        margin-bottom: 0.6rem;
    }

    .intro p {
        color: var(--text-subtle);
        max-width: 58ch;
    }

    .resume {
        border: 1px solid var(--outline-strong);
        background: linear-gradient(150deg, var(--surface), var(--panel-veil-2));
        border-radius: 24px;
        padding: 1.6rem;
        display: grid;
        gap: 0.8rem;
        box-shadow: 0 18px 30px var(--shadow-soft);
    }

    .label {
        margin: 0 0 0.35rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.7rem;
        color: var(--text-muted);
    }

    .resume h2 {
        margin: 0;
        font-size: clamp(1.4rem, 2vw, 1.9rem);
    }

    .meta {
        margin: 0.35rem 0 0;
        color: var(--text-subtle);
    }

    .progress {
        margin: 0;
        color: var(--text-muted);
    }

    .continue {
        width: fit-content;
        text-decoration: none;
        color: var(--ink-strong);
        background: linear-gradient(120deg, var(--accent), var(--accent-strong));
        border-radius: 999px;
        padding: 0.7rem 1.2rem;
        font-weight: 700;
    }

    .start {
        border: 1px dashed var(--outline-strong);
        border-radius: 18px;
        padding: 1.1rem 1.2rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        background: var(--surface-soft);
    }

    .start p {
        margin: 0;
        color: var(--text-subtle);
    }

    .start a {
        text-decoration: none;
        color: var(--text);
        border: 1px solid var(--outline-soft);
        border-radius: 10px;
        padding: 0.55rem 0.8rem;
    }

    .eras h2 {
        margin: 0 0 0.9rem;
    }

    .grid {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    }

    .era-card {
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--outline-soft);
        border-radius: 14px;
        padding: 0.95rem;
        background: var(--card-veil-1);
        display: grid;
        gap: 0.35rem;
    }

    .era-card.current {
        border-color: var(--accent);
        box-shadow: 0 12px 24px var(--shadow-soft);
    }

    .era-name,
    .era-meta,
    .era-progress {
        margin: 0;
    }

    .era-name {
        font-weight: 700;
    }

    .era-meta,
    .era-progress {
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .note {
        border-top: 1px solid var(--outline-soft);
        padding-top: 0.9rem;
        display: grid;
        gap: 0.45rem;
    }

    .note p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    @media (max-width: 700px) {
        .resume {
            padding: 1.25rem;
        }
    }
</style>
