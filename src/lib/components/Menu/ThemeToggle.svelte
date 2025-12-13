<script lang="ts">
    export let theme: "light" | "dark";
    export let toggle: () => void;
    export let showText = true;

    let modeText: string;
    let isLight: boolean;

    $: isLight = theme === "light";
    $: modeText = theme === "dark" ? "Dark mode" : "Light mode";
    $: ariaLabel =
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
</script>

<div class:compact={!showText} class="theme-toggle">
    {#if showText}
        <span class="label">{modeText}</span>
    {/if}
    <button
        class="toggle"
        aria-label={ariaLabel}
        title={ariaLabel}
        aria-pressed={isLight}
        on:click={toggle}
    >
        <span class="icon moon" aria-hidden="true">🌙</span>
        <span class="track" aria-hidden="true">
            <span class:light={isLight} class="thumb"></span>
        </span>
        <span class="icon sun" aria-hidden="true">☀️</span>
    </button>
    <slot />
</div>

<style>
    .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        width: 100%;
    }

    .theme-toggle.compact {
        justify-content: flex-end;
        gap: 0.4rem;
    }

    .label {
        color: var(--text-subtle);
        font-weight: 700;
        font-size: 0.9rem;
    }

    .toggle {
        border: 1px solid var(--outline-strong);
        background: var(--surface-soft);
        color: var(--text);
        border-radius: 999px;
        padding: 0.35rem 0.5rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            box-shadow 120ms ease;
    }

    .toggle:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        box-shadow: 0 8px 18px var(--shadow-soft);
    }

    .icon {
        font-size: 0.95rem;
        line-height: 1;
    }

    .track {
        position: relative;
        width: 42px;
        height: 20px;
        border-radius: 999px;
        background: var(--surface);
        border: 1px solid var(--outline-soft);
        display: inline-block;
        box-shadow: inset 0 1px 2px var(--shadow-soft);
    }

    .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--text);
        transform: translateX(0);
        transition:
            transform 140ms ease,
            background 140ms ease;
    }

    .thumb.light {
        transform: translateX(20px);
        background: var(--accent);
    }

    @media (max-width: 480px) {
        .label {
            font-size: 0.85rem;
        }
    }
</style>
