<section class="scene" aria-label="Illustration placeholder for Biblical action-cartoon art">
    <div class="scene-overlay">
        <p class="scene-kicker">Visual placeholder</p>
        <h2 class="scene-title">Biblical action-cartoon vignette</h2>
        <p class="scene-note">
            Reserve this space for the illustrated panel (e.g., Creation crossing to Covenant). Replace
            the SVG at <code>static/illustrations/quest-hero.svg</code> with the real artwork.
        </p>
    </div>
</section>

<style>
    .scene {
        position: relative;
        z-index: 1;
        height: 320px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
            linear-gradient(180deg, rgba(12, 18, 36, 0.5), rgba(12, 18, 36, 0.75)),
            url("/illustrations/quest-hero.svg") center/cover,
            radial-gradient(
                circle at 15% 20%,
                rgba(198, 167, 96, 0.16),
                transparent 32%
            ),
            var(--bg);
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.45);
        display: grid;
        align-items: flex-end;
    }

    .scene-overlay {
        backdrop-filter: blur(4px);
        background: linear-gradient(
            180deg,
            rgba(12, 18, 36, 0.85),
            rgba(12, 18, 36, 0.92)
        );
        padding: 1rem 1.4rem;
    }

    .scene-kicker {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        color: #c7a457;
    }

    .scene-title {
        margin: 0.2rem 0;
        font-size: 1.35rem;
        color: #f5f7ff;
        font-family: var(--font-display);
        letter-spacing: -0.01em;
    }

    .scene-note {
        margin: 0;
        color: #d1d8e6;
        max-width: 640px;
        font-size: 0.95rem;
    }

    .scene-note code {
        background: rgba(255, 255, 255, 0.08);
        padding: 0.1rem 0.35rem;
        border-radius: 6px;
        color: #f5f7ff;
    }

    @media (max-width: 960px) {
        .scene {
            height: 260px;
        }
    }

    @media (max-width: 640px) {
        .scene {
            height: 220px;
        }
    }
</style>
