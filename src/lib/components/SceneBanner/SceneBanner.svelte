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
        border: 1px solid var(--outline-soft);
        background:
            linear-gradient(180deg, var(--scene-veil-1), var(--scene-veil-2)),
            url("/illustrations/quest-hero.svg") center/cover,
            radial-gradient(
                circle at 15% 20%,
                var(--bg-spot-1),
                transparent 32%
            ),
            var(--bg);
        overflow: hidden;
        box-shadow: 0 18px 40px var(--shadow-soft);
        display: grid;
        align-items: flex-end;
    }

    .scene-overlay {
        backdrop-filter: blur(4px);
        background: linear-gradient(
            180deg,
            var(--scene-overlay-1),
            var(--scene-overlay-2)
        );
        padding: 1rem 1.4rem;
    }

    .scene-kicker {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        color: var(--accent);
    }

    .scene-title {
        margin: 0.2rem 0;
        font-size: 1.35rem;
        color: var(--text);
        font-family: var(--font-display);
        letter-spacing: -0.01em;
    }

    .scene-note {
        margin: 0;
        color: var(--text-subtle);
        max-width: 640px;
        font-size: 0.95rem;
    }

    .scene-note code {
        background: var(--surface-strong);
        padding: 0.1rem 0.35rem;
        border-radius: 6px;
        color: var(--text);
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
