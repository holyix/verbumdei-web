<script lang="ts">
    export let open = false;
    export let title = "";
    export let body = "";
    export let confirmLabel = "Confirm";
    export let cancelLabel = "Cancel";
    export let onConfirm: () => void;
    export let onCancel: () => void;
</script>

{#if open}
    <div class="backdrop" role="presentation" on:click={onCancel}></div>
    <div class="dialog" role="alertdialog" aria-modal="true" aria-label={title}>
        {#if title}<h3>{title}</h3>{/if}
        {#if body}<p>{body}</p>{/if}
        <div class="actions">
            <button class="ghost" type="button" on:click={onCancel}>
                {cancelLabel}
            </button>
            <button class="primary" type="button" on:click={onConfirm}>
                {confirmLabel}
            </button>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        z-index: 50;
    }

    .dialog {
        position: fixed;
        top: 20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        max-width: 280px;
        width: min(280px, 88vw);
        max-height: 240px;
        background: var(--surface-soft);
        color: var(--text);
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        padding: 0.75rem 0.9rem;
        box-shadow: 0 10px 20px var(--shadow-soft);
        z-index: 51;
        display: grid;
        gap: 0.45rem;
        text-align: center;
        overflow: hidden;
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        color: var(--text);
    }

    p {
        margin: 0;
        color: var(--text-subtle);
        line-height: 1.3;
        font-size: 0.9rem;
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 0.45rem;
        margin-top: 0.25rem;
    }

    .actions .ghost {
        border: 1px solid var(--outline-strong);
        background: transparent;
        color: var(--text);
        border-radius: 10px;
        padding: 0.45rem 0.85rem;
        cursor: pointer;
        text-transform: capitalize;
    }

    .actions .primary {
        border: none;
        border-radius: 10px;
        padding: 0.45rem 0.95rem;
        font-weight: 800;
        cursor: pointer;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: var(--ink-strong);
        box-shadow: 0 8px 16px var(--shadow-soft);
        text-transform: capitalize;
    }

    .actions button:hover {
        transform: translateY(-1px);
    }
</style>
