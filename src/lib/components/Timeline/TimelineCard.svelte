<script lang="ts">
    export let title: string;
    export let era: string;
    export let summary: string;
    export let progress = 0;
    export let offset = 0;
    export let bgImage: string | null = null;
    export let stageId: string | null = null;

    const progressLabel = (value: number) => {
        if (value <= 0) return "Not started";
        if (value >= 1) return "Completed";
        return `${Math.round(value * 100)}% in progress`;
    };

    const progressTone = (value: number) => {
        if (value <= 0) return "idle";
        if (value >= 1) return "done";
        return "active";
    };

    $: tone = progressTone(progress);
</script>

<article
    class={`stage-card ${tone} ${stageId ? `stage-${stageId}` : ""}`}
    style={`--progress: ${progress * 100}%; --offset: ${offset}px; --bg-image: ${bgImage ? `url('${bgImage}')` : "none"};`}
>
    <div class="card-top">
        <p class="era">{era}</p>
        <div class={`status-bar ${tone}`}>
            <span class="status-text">{progressLabel(progress)}</span>
            <span class="status-fill"></span>
        </div>
    </div>
    <h3>{title}</h3>
    <p class="summary">{summary}</p>
    <div class="play-row">
        <div class="play-lite" aria-hidden="true">
            <span class="play-icon"></span>
        </div>
    </div>
</article>

<style>
    .stage-card {
        cursor: pointer;
        width: 100%;
        padding: 1.5rem 1.6rem;
        border-radius: 20px;
        border: 1px solid var(--outline-soft);
        --card-overlay: linear-gradient(
            150deg,
            var(--card-veil-1),
            var(--card-veil-2)
        );
        --card-base: var(--bg);
        --card-blend: normal;
        background:
            var(--card-overlay),
            var(--bg-image) center/cover,
            var(--card-base);
        background-size: cover, cover, auto;
        background-position: center, center, center;
        background-repeat: no-repeat;
        background-blend-mode: var(--card-blend), normal, normal;
        box-shadow: 0 18px 32px var(--shadow-soft);
        display: grid;
        gap: 0.85rem;
        position: relative;
        overflow: hidden;
        transform: translateX(var(--offset, 0px));
        min-height: 120px;
        z-index: 1;
        transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
        pointer-events: auto;
    }

    .stage-card:hover {
        transform: translateX(var(--offset, 0px)) translateY(-2px);
        box-shadow: 0 22px 32px var(--shadow-strong);
        border-color: var(--accent-soft);
    }

    .stage-card::after {
        content: "";
        position: absolute;
        inset: 0;
        opacity: 0.2;
        background: radial-gradient(
            circle at 20% 20%,
            var(--glow-gold),
            transparent 45%
        );
        pointer-events: none;
    }

    .stage-card.done::after {
        opacity: 0.35;
        background: radial-gradient(
            circle at 20% 20%,
            color-mix(in srgb, var(--success) 55%, transparent),
            transparent 50%
        );
    }

    .stage-card.idle {
        --card-overlay: linear-gradient(
            150deg,
            var(--panel-veil-1),
            var(--panel-veil-2)
        );
    }

    :global(:root[data-theme="dark"]) .stage-card {
        --card-overlay: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.78)
        );
    }

    :global(:root[data-theme="dark"]) .stage-card.stage-kings {
        --card-overlay: linear-gradient(
            150deg,
            var(--panel-veil-1),
            var(--panel-veil-2)
        );
    }

    :global(:root[data-theme="light"]) .stage-card {
        --card-overlay: linear-gradient(
            185deg,
            rgba(246, 236, 210, 0.78),
            rgba(226, 206, 176, 0.68)
        );
        --card-blend: soft-light;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        position: relative;
        z-index: 1;
    }

    .top-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .era {
        margin: 0;
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--text-muted);
        font-weight: 700;
    }

    .status-bar {
        position: relative;
        min-width: 160px;
        height: 22px;
        border-radius: 999px;
        background: var(--surface-soft);
        border: 1px solid var(--outline-soft);
        box-shadow: inset 0 0 0 1px var(--surface-soft);
        overflow: hidden;
    }

    .status-bar .status-text {
        position: relative;
        z-index: 1;
        font-size: 0.65rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-subtle);
        display: inline-flex;
        align-items: center;
        height: 100%;
        padding: 0 0.55rem;
    }

    .status-bar .status-fill {
        position: absolute;
        inset: 0;
        width: var(--progress);
        background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--accent) 45%, transparent),
            color-mix(in srgb, var(--accent) 85%, transparent)
        );
    }

    .status-bar.done .status-fill {
        background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--success) 45%, transparent),
            color-mix(in srgb, var(--success) 85%, transparent)
        );
    }

    .stage-card h3 {
        margin: 0;
        font-size: 1.4rem;
        font-family: var(--font-display);
        position: relative;
        z-index: 1;
    }

    .summary {
        margin: 0;
        color: var(--text-muted);
        line-height: 1.5;
        position: relative;
        z-index: 1;
    }

    .play-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4rem;
        margin-top: 0;
        text-align: left;
    }

    .play-lite {
        display: inline-block;
        width: 22px;
        height: 22px;
        flex-shrink: 0;
    }

    .play-icon {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 9px solid var(--accent);
        margin-left: 1px;
    }


    @media (max-width: 900px) {
        .stage-card {
            transform: none;
        }
    }

    @media (max-width: 640px) {
        .stage-card {
            padding: 1.25rem 1.3rem;
        }
    }
</style>
