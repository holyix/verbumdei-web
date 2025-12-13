<script lang="ts">
    import LanguageSwitcher from "./LanguageSwitcher.svelte";
    import type { Locale } from "$lib/types";

    export let title: string;
    export let username: string;
    export let levelLabel: string;
    export let levelValue: string;
    export let accountLabel: string;
    export let loginLabel: string;
    export let guestPrefLabel: string;
    export let languageLabel: string;
    export let menuOpen = false;
    export let toggleMenu: () => void;
    export let languages: { id: Locale; label: string; name: string }[] = [];
    export let locale: Locale;
    export let flags: Record<Locale, string> = { en: "🇬🇧", es: "🇪🇸", pt: "🇧🇷" };
    export let selectLanguage: (id: Locale) => void;
</script>

<div class="hero-panel">
    <div class="panel-head">
        <div>
            <div class="panel-title">{title}</div>
            <div class="panel-username">{username}</div>
        </div>
        <div class="menu-wrapper">
            <button
                class="menu-toggle"
                aria-expanded={menuOpen}
                aria-controls="user-menu"
                aria-label={menuOpen ? "Close user menu" : "Open user menu"}
                on:click={toggleMenu}
            >
                <span class="hamburger" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>
            {#if menuOpen}
                <div class="menu-dropdown" id="user-menu">
                    <div class="menu-section">
                        <div class="menu-label">{accountLabel}</div>
                        <button class="menu-item">{loginLabel}</button>
                        <button class="menu-item muted">{guestPrefLabel}</button>
                    </div>
                    <div class="menu-section">
                        <div class="menu-label">{languageLabel}</div>
                        <LanguageSwitcher
                            {languages}
                            {locale}
                            {flags}
                            {selectLanguage}
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div class="stats">
        <div class="stat-label">{levelLabel}</div>
        <div class="panel-username">{levelValue}</div>
    </div>
</div>

<style>
    .hero-panel {
        background: var(--surface-soft);
        border: 1px solid var(--outline-soft);
        border-radius: 16px;
        padding: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        position: relative;
        z-index: 3;
        overflow: visible;
    }

    .panel-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .panel-username {
        color: #f7f8ff;
        font-weight: 800;
        letter-spacing: 0.02em;
    }

    .menu-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    }

    .panel-title {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.8rem;
        color: #d3ddf2;
    }

    .stats {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .stat-label {
        color: #d3ddf2;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
    }

    .menu-toggle {
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 12px;
        padding: 0.5rem 0.6rem;
        cursor: pointer;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            box-shadow 120ms ease;
    }

    .menu-toggle:hover {
        transform: translateY(-1px);
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 8px 18px rgba(15, 20, 45, 0.5);
    }

    .hamburger {
        display: grid;
        gap: 5px;
    }

    .hamburger span {
        display: block;
        width: 20px;
        height: 2px;
        background: #f7f8ff;
    }

    .menu-dropdown {
        position: absolute;
        top: calc(100% + 0.6rem);
        right: 0;
        min-width: 250px;
        background: rgba(10, 14, 31, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.7);
        padding: 0.75rem;
        display: grid;
        gap: 0.6rem;
        z-index: 6;
    }

    .menu-section {
        display: grid;
        gap: 0.35rem;
    }

    .menu-label {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.75rem;
        color: #d3ddf2;
    }

    .menu-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.04);
        color: #f7f8ff;
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
        text-align: left;
        font-weight: 700;
        cursor: pointer;
        transition: all 120ms ease;
    }

    .menu-item:hover {
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 12px 22px rgba(15, 20, 45, 0.55);
    }

    .menu-item.muted {
        color: #c8d0e3;
        font-weight: 600;
        border-style: dashed;
    }

    @media (max-width: 960px) {
        .menu-dropdown {
            position: static;
            margin-top: 0.5rem;
            width: 100%;
        }
    }

    @media (max-width: 900px) {
        .hero-panel {
            display: none;
        }

        .stats {
            display: none;
        }
    }
</style>
