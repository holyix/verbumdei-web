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
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        color: #f7f8ff;
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
        border-color: rgba(242, 210, 141, 0.6);
    }

    button.active {
        border-color: rgba(199, 164, 87, 0.9);
        background: linear-gradient(
            135deg,
            rgba(199, 164, 87, 0.12),
            rgba(84, 104, 146, 0.1)
        );
        box-shadow: 0 10px 20px rgba(12, 18, 36, 0.45);
    }

    .flag {
        font-size: 1.05rem;
    }

    .lang-code {
        color: #d3ddf2;
        font-weight: 800;
        letter-spacing: 0.08em;
    }
</style>
