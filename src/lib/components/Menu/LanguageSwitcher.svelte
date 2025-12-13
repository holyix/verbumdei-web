<script lang="ts">
    import type { Locale } from "$lib/types";

    export let languages: { id: Locale; label: string; name: string }[] = [];
    export let locale: Locale;
    export let flags: Record<Locale, string> = { en: "🇬🇧", es: "🇪🇸", pt: "🇧🇷" };
    export let selectLanguage: (id: Locale) => void;
</script>

<div class="lang-grid" aria-label="Language selector">
    {#each languages as lang}
        <button
            class:active={locale === lang.id}
            on:click={() => selectLanguage(lang.id)}
        >
            <span class="flag" aria-hidden="true">{flags[lang.id]}</span>
            <span>{lang.name}</span>
            <span class="lang-code">{lang.label}</span>
        </button>
    {/each}
</div>

<style>
    .lang-grid {
        display: grid;
        gap: 0.35rem;
    }

    button {
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        color: var(--text);
        border-radius: 10px;
        padding: 0.55rem 0.65rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 120ms ease;
        text-align: left;
    }

    button:hover {
        border-color: var(--accent);
    }

    button.active {
        border-color: var(--accent);
        background: linear-gradient(135deg, var(--accent-soft), var(--surface-soft));
        box-shadow: 0 10px 20px var(--shadow-soft);
    }

    .flag {
        font-size: 1.05rem;
    }

    .lang-code {
        color: var(--text-subtle);
        font-weight: 800;
        letter-spacing: 0.08em;
    }
</style>
