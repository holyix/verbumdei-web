<script lang="ts">
    export let className = "";
    export let overall = 70;
    export let headTop = 19;
    export let torsoTop = 39;
    export let armsTop = 47;
</script>

<div
    class={`stick-figure ${className}`.trim()}
    style={`--overall: ${overall}%; --head-top: ${headTop}px; --torso-top: ${torsoTop}px; --arms-top: ${armsTop}px;`}
    aria-hidden="true"
>
    <span class="halo-ring"></span>
    <span class="head"></span>
    <span class="torso"></span>
    <span class="arms"></span>
</div>

<style>
    .stick-figure {
        position: var(--figure-position, relative);
        width: 94px;
        height: 94px;
        display: grid;
        place-items: center;
        --figure-primary: rgba(255, 214, 138, 0.9);
        --figure-secondary: rgba(199, 164, 87, 0.9);
    }

    .halo-ring {
        position: absolute;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: conic-gradient(
            rgba(255, 214, 138, 0.75) 0%,
            rgba(255, 214, 138, 0.75) var(--overall),
            rgba(255, 255, 255, 0.08) var(--overall),
            rgba(255, 255, 255, 0.08) 100%
        );
        mask: radial-gradient(circle, transparent 68%, black 69%);
        opacity: 0.85;
    }

    :global(:root[data-theme="light"]) .stick-figure .halo-ring {
        opacity: 1;
        background: conic-gradient(
            color-mix(in srgb, var(--accent) 90%, white 10%) 0%,
            color-mix(in srgb, var(--accent) 90%, white 10%) var(--overall),
            color-mix(in srgb, var(--outline-strong) 55%, transparent) var(--overall),
            color-mix(in srgb, var(--outline-strong) 55%, transparent) 100%
        );
    }

    :global(:root[data-theme="light"]) .stick-figure {
        --figure-primary: color-mix(in srgb, var(--accent) 90%, white 10%);
        --figure-secondary: var(--accent-strong);
    }

    :global(:root[data-theme="light"]) .stick-figure .head {
        border-color: var(--accent);
        background: color-mix(in srgb, var(--bg) 85%, var(--accent) 15%);
    }

    .head {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid var(--figure-primary);
        background: var(--bg);
        position: absolute;
        top: var(--head-top);
    }

    .torso {
        width: 4px;
        height: 32px;
        background: linear-gradient(
            180deg,
            var(--figure-primary),
            var(--figure-secondary)
        );
        border-radius: 999px;
        position: absolute;
        top: var(--torso-top);
    }

    .arms {
        width: 44px;
        height: 4px;
        background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--figure-secondary) 35%, transparent),
            var(--figure-primary),
            color-mix(in srgb, var(--figure-secondary) 35%, transparent)
        );
        border-radius: 999px;
        position: absolute;
        top: var(--arms-top);
    }
</style>
