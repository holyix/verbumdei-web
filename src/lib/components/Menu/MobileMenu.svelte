<script lang="ts">
    import LanguageSwitcher from "./LanguageSwitcher.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import type { Locale } from "$lib/types";

    export let menuOpen = false;
    export let toggleMenu: () => void;
    export let title: string;
    export let username: string;
    export let levelLabel: string;
    export let levelValue: string;
    export let accountLabel: string;
    export let loginLabel: string;
    export let guestPrefLabel: string;
    export let languageLabel: string;
    export let styleLabel: string;
    export let languages: { id: Locale; label: string; name: string }[] = [];
    export let locale: Locale;
    export let flags: Record<Locale, string> = { en: "🇬🇧", es: "🇪🇸", pt: "🇧🇷" };
    export let selectLanguage: (id: Locale) => void;
    export let theme: "light" | "dark";
    export let toggleTheme: () => void;
</script>

<div class="mobile-menu" aria-label="User menu">
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
        <ThemeToggle {theme} toggle={toggleTheme} showText={false} />
        {#if menuOpen}
            <div class="menu-dropdown mobile" id="user-menu">
                <div class="mobile-profile stacked">
                    <div class="panel-title">{title}</div>
                    <div class="panel-username">{username}</div>
                    <div class="stat-label">{levelLabel}</div>
                    <div class="panel-username">{levelValue}</div>
                </div>
                <div class="menu-section">
                    <div class="menu-label">{accountLabel}</div>
                    <button class="menu-item">{loginLabel}</button>
                    <button class="menu-item muted">{guestPrefLabel}</button>
                </div>
                <div class="menu-section">
                    <div class="menu-label">{styleLabel}</div>
                    <ThemeToggle {theme} toggle={toggleTheme} />
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

<style>
    .mobile-menu {
        display: none;
    }

    .menu-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        width: 100%;
    }

    .menu-toggle {
        border: 1px solid var(--outline-strong);
        background: var(--surface-soft);
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
        border-color: var(--accent);
        box-shadow: 0 8px 18px var(--shadow-soft);
    }

    .hamburger {
        display: grid;
        gap: 5px;
    }

    .hamburger span {
        display: block;
        width: 20px;
        height: 2px;
        background: var(--text);
    }

    .menu-dropdown {
        position: absolute;
        top: calc(100% + 0.6rem);
        right: 0;
        min-width: 250px;
        background: var(--menu-surface);
        border: 1px solid var(--outline-strong);
        border-radius: 14px;
        box-shadow: 0 18px 40px var(--menu-shadow);
        padding: 0.75rem;
        display: grid;
        gap: 0.6rem;
        z-index: 12;
    }

    .menu-dropdown.mobile {
        position: absolute;
        top: 46px;
        left: 0;
        right: auto;
        width: min(320px, calc(100vw - 24px));
    }

    .mobile-profile {
        background: var(--surface-soft);
        border: 1px solid var(--outline-strong);
        border-radius: 12px;
        padding: 0.75rem 0.85rem;
        margin-bottom: 0.5rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        box-shadow: 0 12px 24px var(--shadow-soft);
    }

    .mobile-profile.stacked {
        margin: 0 0 0.6rem 0;
        max-width: none;
        width: 100%;
        padding: 0.75rem 0.85rem;
    }

    .panel-username {
        color: var(--text);
        font-weight: 800;
        letter-spacing: 0.02em;
    }

    .panel-title {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.8rem;
        color: var(--text-subtle);
    }

    .stat-label {
        color: var(--text-subtle);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
    }

    .menu-section {
        display: grid;
        gap: 0.35rem;
    }

    .menu-label {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.75rem;
        color: var(--text-subtle);
    }

    .menu-item {
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        color: var(--text);
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
        text-align: left;
        font-weight: 700;
        cursor: pointer;
        transition: all 120ms ease;
    }

    .menu-item.muted {
        color: var(--text-subtle);
        font-weight: 600;
        border-style: dashed;
    }

    @media (max-width: 900px) {
        .mobile-menu {
            display: block;
            position: fixed;
            top: 12px;
            left: 12px;
            z-index: 12;
            width: calc(100vw - 24px);
        }
    }
</style>
