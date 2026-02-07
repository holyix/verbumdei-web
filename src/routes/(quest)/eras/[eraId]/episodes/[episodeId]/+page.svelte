<script lang="ts">
    import { goto } from "$app/navigation";
    import type { EpisodeDetail, EraDetail, EpisodeReference } from "$lib/api/quest";

    export let data: {
        eraId: string;
        episodeId: string;
        era: EraDetail | null;
        episode: EpisodeDetail | null;
    };

    const startEpisode = () => {
        if (!data.eraId || !data.episodeId) return;
        goto(`/quiz?category=${data.eraId}&episode=${data.episodeId}`);
    };

    const formatReference = (reference: EpisodeReference) => {
        const chapters = Array.isArray(reference.chapters)
            ? reference.chapters.filter((c) => Number.isFinite(c))
            : [];
        const chapterLabel = chapters.length ? ` ${chapters.join(", ")}` : "";
        return `${reference.book}${chapterLabel}`;
    };
</script>

<section class="episode-hero">
    <div>
        <p class="eyebrow">Episode Start</p>
        <h1>{data.episode?.label || "Episode label unavailable"}</h1>
        <p class="meta">Era: {data.era?.label || "Era label unavailable"}</p>
    </div>
    <button class="start-button" type="button" on:click={startEpisode}>
        Start Episode Questions
    </button>
</section>

<section class="references">
    <div class="section-title">
        <h2>Scripture References</h2>
        <p>Shown only when provided by the episode endpoint.</p>
    </div>

    {#if data.episode?.references && data.episode.references.length > 0}
        <ul class="reference-list">
            {#each data.episode.references as reference}
                <li>{formatReference(reference)}</li>
            {/each}
        </ul>
    {:else}
        <div class="empty-state">
            <p>No references available for this episode.</p>
        </div>
    {/if}
</section>

<style>
    .episode-hero {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.6rem;
        align-items: center;
        padding: 2rem;
        border-radius: 24px;
        background: linear-gradient(150deg, rgba(15, 23, 42, 0.88), rgba(12, 18, 36, 0.98));
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.5);
    }

    .eyebrow {
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.22em;
        color: var(--text-muted);
        margin: 0 0 0.7rem;
    }

    h1 {
        font-family: var(--font-display);
        font-size: clamp(2rem, 3.4vw, 3rem);
        margin: 0 0 0.6rem;
    }

    .meta {
        margin: 0;
        color: var(--text-subtle);
    }

    .start-button {
        border: none;
        border-radius: 999px;
        padding: 0.9rem 1.6rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background: linear-gradient(120deg, #f1d48b, #c79a45);
        color: var(--ink-strong);
        cursor: pointer;
        box-shadow: 0 16px 30px rgba(199, 154, 69, 0.35);
    }

    .references {
        display: grid;
        gap: 1.1rem;
    }

    .section-title h2 {
        margin: 0 0 0.4rem;
        font-size: 1.4rem;
    }

    .section-title p {
        margin: 0;
        color: var(--text-muted);
    }

    .reference-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.6rem;
        color: var(--text-subtle);
    }

    .reference-list li {
        padding: 0.65rem 0.9rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(12, 18, 36, 0.9);
    }

    .empty-state {
        padding: 1.4rem;
        border-radius: 16px;
        border: 1px dashed rgba(255, 255, 255, 0.16);
        color: var(--text-muted);
    }

    :global([data-theme="light"]) .episode-hero {
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.96), rgba(245, 247, 252, 0.98));
        border-color: rgba(15, 23, 42, 0.08);
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    }

    :global([data-theme="light"]) .reference-list li {
        background: rgba(255, 255, 255, 0.95);
        border-color: rgba(15, 23, 42, 0.08);
    }
</style>
