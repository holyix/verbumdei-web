<script lang="ts">
    import { goto } from "$app/navigation";
    import type { EraDetail, EpisodeListItem } from "$lib/api/quest";

    export let data: {
        eraId: string;
        era: EraDetail | null;
        episodes: EpisodeListItem[];
    };

    const openEpisode = (episodeId: string) => {
        if (!episodeId) return;
        goto(`/eras/${data.eraId}/episodes/${episodeId}`);
    };
</script>

<section class="era-header">
    <div>
        <p class="eyebrow">Era Overview</p>
        <h1>{data.era?.label || "Era label unavailable"}</h1>
        <p class="meta">
            Episodes are the only quiz entry points. Select an episode below to begin.
        </p>
    </div>
    <div class="summary-card">
        <p class="summary-label">Episode Count</p>
        <p class="summary-value">{data.episodes.length}</p>
    </div>
</section>

<section class="episodes">
    <div class="section-title">
        <h2>Episodes</h2>
        <p>Episode labels are loaded from this Era only.</p>
    </div>

    {#if data.episodes.length === 0}
        <div class="empty-state">
            <h3>No episodes listed</h3>
            <p>When episodes are available for this era, they will appear here.</p>
        </div>
    {:else}
        <ul class="episode-list">
            {#each data.episodes as episode}
                <li>
                    <button
                        class="episode-item"
                        type="button"
                        on:click={() => openEpisode(episode.id)}
                    >
                        <span>{episode.label || "Episode label unavailable"}</span>
                        <span class="episode-action">Start Episode</span>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</section>

<style>
    .era-header {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.8rem;
        align-items: center;
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
        font-size: clamp(2rem, 3.4vw, 2.9rem);
        margin: 0 0 0.8rem;
    }

    .meta {
        color: var(--text-subtle);
        margin: 0;
        max-width: 40ch;
    }

    .summary-card {
        padding: 1.3rem 1.5rem;
        border-radius: 18px;
        background: linear-gradient(150deg, rgba(15, 23, 42, 0.88), rgba(12, 18, 36, 0.94));
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 14px 30px rgba(6, 10, 25, 0.45);
    }

    .summary-label {
        margin: 0 0 0.3rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .summary-value {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }

    .episodes {
        display: grid;
        gap: 1.2rem;
    }

    .section-title h2 {
        margin: 0 0 0.4rem;
        font-size: 1.4rem;
    }

    .section-title p {
        margin: 0;
        color: var(--text-muted);
    }

    .episode-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.75rem;
    }

    .episode-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.2rem;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(12, 18, 36, 0.9);
        color: inherit;
        cursor: pointer;
        text-align: left;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .episode-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 26px rgba(6, 10, 25, 0.4);
    }

    .episode-action {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: var(--accent);
    }

    .empty-state {
        padding: 1.8rem;
        border-radius: 18px;
        border: 1px dashed rgba(255, 255, 255, 0.16);
        text-align: center;
        color: var(--text-muted);
    }

    :global([data-theme="light"]) .episode-item {
        background: rgba(255, 255, 255, 0.95);
        border-color: rgba(15, 23, 42, 0.1);
    }

    :global([data-theme="light"]) .summary-card {
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.95), rgba(245, 247, 252, 0.98));
        border-color: rgba(15, 23, 42, 0.08);
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
    }
</style>
