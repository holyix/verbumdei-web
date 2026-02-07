<script lang="ts">
    import { goto } from "$app/navigation";
    import type { EraSummary } from "$lib/api/quest";

    export let data: { eras: EraSummary[] };

    const openEra = (eraId: string) => {
        if (!eraId) return;
        goto(`/eras/${eraId}`);
    };
</script>

<section class="quest-hero">
    <div>
        <p class="eyebrow">Episode Access</p>
        <h1>Choose an Era to Reach Episodes</h1>
        <p class="lead">
            Episode labels and references are only available inside each Era. Select an Era to continue.
        </p>
    </div>
    <div class="hero-card">
        <p class="hero-label">Reduced Scope</p>
        <p class="hero-body">
            This shortcut lists Eras only, keeping quiz entry points inside their parent Era.
        </p>
    </div>
</section>

<section class="card-grid">
    {#if data.eras.length === 0}
        <div class="empty-state">
            <h2>No eras yet</h2>
            <p>Once eras are available, they will appear here for quick access.</p>
        </div>
    {:else}
        {#each data.eras as era}
            <button class="era-card" type="button" on:click={() => openEra(era.id)}>
                <div>
                    <p class="era-label">{era.label || "Era label unavailable"}</p>
                    <p class="era-meta">{era.episode_count ?? 0} episodes</p>
                </div>
                <span class="era-action">Enter Era</span>
            </button>
        {/each}
    {/if}
</section>

<style>
    .quest-hero {
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
        margin: 0 0 0.75rem;
    }

    .lead {
        font-size: 1.05rem;
        color: var(--text-subtle);
        margin: 0;
        max-width: 38ch;
    }

    .hero-card {
        padding: 1.4rem 1.6rem;
        border-radius: 20px;
        background: linear-gradient(140deg, rgba(15, 23, 42, 0.88), rgba(12, 18, 36, 0.94));
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 14px 30px rgba(6, 10, 25, 0.45);
    }

    .hero-label {
        margin: 0 0 0.4rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--text-muted);
    }

    .hero-body {
        margin: 0;
        font-size: 0.98rem;
        color: var(--text-subtle);
    }

    .card-grid {
        display: grid;
        gap: 1.2rem;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }

    .era-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        padding: 1.4rem 1.5rem;
        background: linear-gradient(160deg, rgba(12, 18, 36, 0.92), rgba(15, 23, 42, 0.98));
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        gap: 1rem;
        color: inherit;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .era-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 36px rgba(6, 10, 25, 0.45);
    }

    .era-label {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 0.4rem;
    }

    .era-meta {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.95rem;
    }

    .era-action {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: var(--accent);
    }

    .empty-state {
        padding: 2rem;
        border-radius: 18px;
        border: 1px dashed rgba(255, 255, 255, 0.18);
        text-align: center;
        color: var(--text-muted);
    }

    :global([data-theme="light"]) .era-card {
        background: linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(245, 247, 252, 0.95));
        border-color: rgba(15, 23, 42, 0.1);
    }

    :global([data-theme="light"]) .hero-card {
        background: linear-gradient(140deg, rgba(255, 255, 255, 0.95), rgba(245, 247, 252, 0.98));
        border-color: rgba(15, 23, 42, 0.08);
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
    }
</style>
