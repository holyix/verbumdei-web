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

    $: currentEra = data.eras.find((era) => era.isCurrentEra);
</script>

<main class="home2">
    <section class="atlas" aria-label="Narrative board">
        <header>
            <p class="eyebrow">Option B</p>
            <h1>Narrative Atlas</h1>
            <p>Eras lead the page, so the story structure is always the first decision.</p>
        </header>
        <div class="board">
            {#each data.eras as era}
                <a class:current={era.isCurrentEra} class="chapter" href={`/eras/${era.id}`}>
                    <p class="chapter-index">{era.episodeCount} episodes</p>
                    <h2>{era.label}</h2>
                    <p>{era.completionPercent}% completed</p>
                </a>
            {/each}
        </div>
    </section>

    <section class="continue-rail" aria-label="Continue">
        {#if data.resume}
            <p class="rail-label">Continue from your current episode</p>
            <div class="rail-body">
                <div>
                    <p class="episode">{data.resume.episodeLabel}</p>
                    <p class="era">{data.resume.eraLabel}</p>
                </div>
                <a href={`/eras/${data.resume.eraId}/episodes/${data.resume.episodeId}`}>Continue</a>
            </div>
        {:else if data.showStartJourneyCta}
            <p class="rail-label">No active episode in progress</p>
            <div class="rail-body">
                <p>Begin from the current era or browse all eras.</p>
                <a href="/eras">Start your journey</a>
            </div>
        {/if}
    </section>

    <section class="spotlight" aria-label="Current era spotlight">
        <h2>Current Era Spotlight</h2>
        {#if currentEra}
            <p>
                You are currently studying <strong>{currentEra.label}</strong>. Continue through
                the episode list in this era to maintain chronological flow.
            </p>
            <a href={`/eras/${currentEra.id}`}>Open {currentEra.label}</a>
        {:else}
            <p>Pick an era to begin your study path.</p>
        {/if}
    </section>
</main>

<style>
    .home2 {
        display: grid;
        gap: 1.25rem;
    }

    .atlas {
        border: 1px solid var(--outline-soft);
        border-radius: 24px;
        padding: 1.4rem;
        background: linear-gradient(165deg, var(--panel-veil-1), var(--surface));
    }

    header p,
    header h1 {
        margin: 0;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: var(--text-muted);
        font-size: 0.72rem;
        margin-bottom: 0.6rem;
    }

    h1 {
        font-family: var(--font-display);
        margin: 0 0 0.5rem;
    }

    header p {
        color: var(--text-subtle);
        max-width: 66ch;
    }

    .board {
        margin-top: 1.15rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
    }

    .chapter {
        text-decoration: none;
        color: inherit;
        border: 1px solid var(--outline-soft);
        border-radius: 18px;
        padding: 1rem;
        min-height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--card-veil-2);
    }

    .chapter.current {
        border-color: var(--accent);
        box-shadow: 0 12px 24px var(--shadow-soft);
    }

    .chapter-index,
    .chapter p,
    .chapter h2 {
        margin: 0;
    }

    .chapter-index {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-muted);
        font-size: 0.72rem;
    }

    .chapter h2 {
        font-size: 1.1rem;
    }

    .chapter p {
        color: var(--text-subtle);
        font-size: 0.9rem;
    }

    .continue-rail {
        border: 1px solid var(--outline-soft);
        border-radius: 14px;
        padding: 1rem 1.1rem;
        background: var(--surface-soft);
    }

    .rail-label,
    .rail-body p,
    .episode,
    .era {
        margin: 0;
    }

    .rail-label {
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--text-muted);
        margin-bottom: 0.6rem;
    }

    .rail-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.9rem;
    }

    .episode {
        font-weight: 700;
    }

    .era {
        margin-top: 0.2rem;
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .rail-body p {
        color: var(--text-subtle);
        font-size: 0.95rem;
    }

    .rail-body a,
    .spotlight a {
        text-decoration: none;
        border: 1px solid var(--outline-soft);
        border-radius: 999px;
        padding: 0.5rem 0.85rem;
        color: var(--text);
        white-space: nowrap;
    }

    .spotlight {
        border-left: 3px solid var(--accent);
        padding: 0.2rem 0 0.2rem 1rem;
        display: grid;
        gap: 0.5rem;
    }

    .spotlight h2,
    .spotlight p {
        margin: 0;
    }

    .spotlight h2 {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--text-muted);
    }

    .spotlight p {
        color: var(--text-subtle);
        max-width: 70ch;
    }

    .spotlight strong {
        color: var(--text);
    }

    .spotlight a {
        width: fit-content;
    }

    @media (max-width: 720px) {
        .atlas {
            padding: 1rem;
            border-radius: 18px;
        }

        .rail-body {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
