<script lang="ts">
    export let title: string;
    export let body: string;
    export let cta: string;
    export let onRestart: () => void;
    export let theme: "light" | "dark" = "dark";
    export let imageSrc = "/illustrations/divine-mercy.png";
</script>

<div class={`victory-overlay ${theme}`} role="dialog" aria-modal="true">
    <div class={`victory-card ${theme}`}>
        <div class="victory-art">
            <img src={imageSrc} alt="Christ of Divine Mercy" loading="lazy" />
            <div class="cherub cherub-left">😇</div>
            <div class="cherub cherub-right">😇</div>
        </div>
        <div class="victory-copy">
            <p class="eyebrow">{title}</p>
            <h3>{body}</h3>
            <button class="primary" on:click={onRestart}>{cta}</button>
        </div>
    </div>
</div>

<style>
    .victory-overlay {
        position: fixed;
        inset: 0;
        background: radial-gradient(
                circle at 40% 20%,
                var(--overlay-spot),
                color-mix(in srgb, var(--bg) 50%, transparent)
            ),
            var(--overlay-backdrop);
        backdrop-filter: blur(6px);
        display: grid;
        place-items: center;
        z-index: 20;
        padding: 0.75rem;
        animation: overlayFade 3000ms ease;
    }

    .victory-overlay.light {
        background:
            radial-gradient(
                circle at 40% 20%,
                color-mix(in srgb, #f7ecd5 70%, var(--overlay-spot)),
                color-mix(in srgb, #f0e2c8 70%, transparent)
            ),
            linear-gradient(180deg, rgba(248, 243, 231, 0.9), rgba(234, 215, 188, 0.85)),
            var(--overlay-backdrop);
    }

    .victory-card {
        display: grid;
        gap: 1rem;
        max-width: 640px;
        width: min(92vw, 640px);
        background: var(--surface);
        border: 1px solid var(--accent-soft);
        border-radius: 16px;
        padding: 1.2rem;
        box-shadow: 0 24px 50px var(--shadow-strong);
        animation: cardFloat 680ms ease 120ms both;
        box-sizing: border-box;
    }

    .victory-card.light {
        background:
            linear-gradient(180deg, rgba(248, 243, 231, 0.92), rgba(234, 215, 188, 0.9)),
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2)),
            var(--surface);
        border-color: color-mix(in srgb, var(--accent-soft) 75%, #d9c9a5);
        box-shadow: 0 20px 38px color-mix(in srgb, rgba(0, 0, 0, 0.3) 80%, transparent);
    }

    .victory-card.dark {
        background: color-mix(in srgb, var(--surface) 90%, #0f1119);
        border-color: var(--accent-soft);
    }

    .victory-art {
        position: relative;
        background: linear-gradient(180deg, var(--surface-strong), var(--surface-soft));
        border-radius: 12px;
        border: 1px solid var(--outline-soft);
        padding: 0.75rem;
        display: grid;
        place-items: center;
        overflow: hidden;
    }

    .victory-art img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
    }

    .cherub {
        position: absolute;
        font-size: 1.6rem;
        animation: float 4s ease-in-out infinite;
    }

    .cherub-left {
        left: 12%;
        top: 20%;
        animation-delay: 0.4s;
    }

    .cherub-right {
        right: 12%;
        top: 16%;
        animation-delay: 1s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    .victory-copy {
        display: grid;
        gap: 0.35rem;
        text-align: center;
    }

    .victory-copy h3 {
        margin: 0;
        color: var(--text);
        font-size: 1.3rem;
        line-height: 1.4;
    }

    .primary {
        margin: 0.25rem auto 0;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: var(--ink-strong);
        box-shadow: 0 10px 20px var(--shadow-soft);
        border: none;
        border-radius: 10px;
        padding: 0.78rem 1.2rem;
        font-weight: 800;
        cursor: pointer;
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            box-shadow 120ms ease;
    }

    .primary:hover {
        transform: translateY(-1px);
    }

    @keyframes overlayFade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes cardFloat {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media (max-width: 640px) {
        .victory-overlay {
            padding: 0.25rem;
        }

        .victory-card {
            width: 90vw;
            max-width: none;
            gap: 0.75rem;
            padding: 1rem;
            box-sizing: border-box;
        }

        .victory-art {
            padding: 0.5rem;
        }

        .cherub {
            display: none;
        }
    }
</style>
