<script lang="ts">
    import "$lib/styles/theme.css";
    import { page } from "$app/stores";

    const tabs = [
        { href: "/eras", label: "Eras" },
        { href: "/episodes", label: "Episodes" },
    ];

    const isActive = (path: string, current: string) => {
        if (path === "/eras") {
            return current === "/eras" || current.startsWith("/eras/");
        }
        return current === path;
    };
</script>

<div class="quest-shell">
    <main class="quest-content">
        <slot />
    </main>
    <nav class="quest-tabs" aria-label="Primary">
        {#each tabs as tab}
            <a
                class:active={isActive(tab.href, $page.url.pathname)}
                href={tab.href}
                aria-current={isActive(tab.href, $page.url.pathname) ? "page" : undefined}
            >
                <span>{tab.label}</span>
            </a>
        {/each}
    </nav>
</div>

<style>
    :global(body) {
        margin: 0;
    }

    .quest-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: radial-gradient(circle at 16% 14%, rgba(199, 164, 87, 0.16), transparent 42%),
            radial-gradient(circle at 86% 18%, rgba(103, 126, 173, 0.2), transparent 45%),
            linear-gradient(170deg, rgba(12, 18, 36, 0.98), rgba(15, 22, 40, 0.96));
        color: var(--text);
    }

    .quest-content {
        flex: 1 1 auto;
        padding: 2.5rem 1.5rem 6.5rem;
        max-width: 1080px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .quest-tabs {
        position: sticky;
        bottom: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
        padding: 0.9rem 1.4rem 1.4rem;
        background: linear-gradient(180deg, rgba(12, 18, 36, 0.1), rgba(12, 18, 36, 0.95));
        backdrop-filter: blur(16px);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .quest-tabs a {
        text-decoration: none;
        color: var(--text-muted);
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-size: 0.78rem;
        padding: 0.85rem 1rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(15, 23, 42, 0.65);
        display: grid;
        place-items: center;
        transition: all 0.2s ease;
    }

    .quest-tabs a.active {
        color: var(--ink-strong);
        background: linear-gradient(120deg, rgba(242, 210, 141, 0.9), rgba(199, 164, 87, 0.9));
        border-color: rgba(255, 255, 255, 0.22);
        box-shadow: 0 12px 30px rgba(199, 164, 87, 0.25);
    }

    @media (max-width: 700px) {
        .quest-content {
            padding: 2rem 1.1rem 6.2rem;
        }

        .quest-tabs {
            padding: 0.8rem 1rem 1.1rem;
        }
    }

    :global([data-theme="light"]) .quest-shell {
        background: radial-gradient(circle at 16% 14%, rgba(199, 164, 87, 0.2), transparent 45%),
            radial-gradient(circle at 82% 20%, rgba(103, 126, 173, 0.2), transparent 44%),
            linear-gradient(170deg, rgba(245, 246, 252, 0.98), rgba(233, 237, 246, 0.96));
    }

    :global([data-theme="light"]) .quest-tabs {
        background: linear-gradient(180deg, rgba(245, 246, 252, 0.12), rgba(245, 246, 252, 0.98));
        border-top: 1px solid rgba(15, 23, 42, 0.08);
    }

    :global([data-theme="light"]) .quest-tabs a {
        background: rgba(255, 255, 255, 0.9);
        color: var(--text-subtle);
        border-color: rgba(15, 23, 42, 0.08);
    }

    :global([data-theme="light"]) .quest-tabs a.active {
        color: var(--ink-strong);
        box-shadow: 0 12px 30px rgba(156, 112, 37, 0.22);
    }
</style>
