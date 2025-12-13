<script lang="ts">
    export let eyebrow: string;
    export let title: string;
    export let subtitle: string;
    export let progressLabel: string;
    export let progressStage: string;
    export let progressPercent: number;
</script>

<header class="hero">
    <div class="hero-text">
        <p class="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p class="lede">{subtitle}</p>

        <div class="progress" aria-label="Quiz progress">
            <div class="progress-top">
                <span>{progressLabel}</span>
                <span class="progress-stage">{progressStage}</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style={`width: ${progressPercent}%`}></div>
            </div>
        </div>
    </div>

    <slot name="panel" />
</header>

<style>
    .hero {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.25rem;
        padding: 1.5rem;
        border: 1px solid var(--outline-soft);
        border-radius: 18px;
        background: linear-gradient(135deg, var(--panel-veil-1), var(--panel-veil-2));
        box-shadow: 0 18px 40px var(--shadow-soft);
    }

    .hero-text h1 {
        margin: 0.15rem 0;
        font-family: var(--font-display);
        font-size: clamp(1.8rem, 2.4vw, 2.6rem);
        letter-spacing: -0.02em;
        color: var(--text);
    }

    .hero-text .lede {
        margin: 0 0 0.6rem;
        color: var(--text-subtle);
        max-width: 680px;
        line-height: 1.5;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.78rem;
        margin: 0;
        color: var(--accent);
    }

    .progress {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .progress-top {
        display: flex;
        justify-content: space-between;
        color: var(--text-subtle);
        font-size: 0.95rem;
    }

    .progress-stage {
        background: var(--accent-soft);
        border: 1px solid var(--outline-soft);
        color: var(--accent);
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.04em;
    }

    .progress-track {
        height: 10px;
        border-radius: 999px;
        background: var(--surface-strong);
        overflow: hidden;
        border: 1px solid var(--outline-soft);
    }

    .progress-fill {
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
        box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 50%, transparent);
    }

    @media (max-width: 960px) {
        .hero {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 640px) {
        .hero {
            padding: 1.1rem;
            gap: 0.75rem;
        }
    }
</style>
