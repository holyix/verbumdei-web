<script lang="ts">
    import TimerBar from "./TimerBar.svelte";
    import type { Locale, Question } from "$lib/types";

    export let question: Question;
    export let locale: Locale;
    export let currentIndex: number;
    export let totalQuestions: number;
    export let selected: string | null;
    export let revealed: boolean;
    export let completed: boolean;
    export let t: (key: string) => string;
    export let answeredCorrectly: boolean;
    export let onSelect: (id: string) => void;
    export let onNext: () => void;
    export let onRestart: () => void;
    export let isLastQuestion: boolean;
    export let timeLeft: number;
    export let answerDuration: number;
    export let pauseTimer: () => void;
    export let resumeTimer: () => void;
    export let onHome: () => void;

    const openShare = async () => {
        const url = window?.location?.href ?? "/";
        const text = question.prompt[locale];
        if (navigator?.share) {
            navigator
                .share({
                    title: "Verbum Quest",
                    text,
                    url,
                })
                .catch(() => {});
            return;
        }
        if (navigator?.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(url);
            } catch (_) {
                /* ignore */
            }
        }
    };
</script>

<section class="card">
    <div class="hero-image">
        <img
            src={question.image_url ?? "/illustrations/quest-hero.svg"}
            alt={question.stage[locale]}
            loading="lazy"
        />
    </div>
    <div class="meta">
        <div class="meta-left">
            <span class="pill">{question.stage[locale]}</span>
            <span class="sub">{t("question")} {currentIndex + 1} {t("of")} {totalQuestions}</span>
        </div>
        <div class="meta-actions">
            <button class="icon-link" type="button" on:click={onHome} aria-label="Home" title="Home">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            <button class="icon-link" type="button" on:click={openShare} aria-label="Share" title="Share">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                        d="M6 14.5v4a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 18.5v-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 14.5V6m0 0-3 3m3-3 3 3"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            <a
                class="icon-link"
                href={`https://www.biblegateway.com/quicksearch/?quicksearch=${encodeURIComponent(question.source ?? question.prompt[locale] ?? "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the Bible"
                title="Open the Bible"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                        d="M12 6v12M12 6s-2-.9-4-.9H5v11.8h3c2 0 4 .6 4 .6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 6s2-.9 4-.9h3v11.8h-3c-2 0-4 .6-4 .6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </a>
        </div>
    </div>
    <h2>{question.prompt[locale]}</h2>
    {#if question.source}
        <p class="source">{t("source")}: {question.source}</p>
    {/if}

    <div class="options">
        {#each question.options as option}
            <button
                class:selected={selected === option.id}
                class:correct={revealed && option.correct && selected === option.id}
                class:incorrect={revealed && selected === option.id && !option.correct}
                on:click={() => onSelect(option.id)}
            >
                <span class="bullet">{option.id.toUpperCase()}</span>
                <span class="text">{option.text[locale]}</span>
                {#if revealed}
                    <span class="badge">{option.correct ? t("correct") : " "}</span>
                {/if}
            </button>
        {/each}
    </div>

    {#if revealed}
        <div class="explanation">
            <p class:correct={answeredCorrectly} class:incorrect={!answeredCorrectly}>
                {#if answeredCorrectly}
                    {t("correctMsg")} {question.options.find((o) => o.id === selected)?.explanation[locale]}
                {:else}
                    {t("incorrectMsg")} {question.options.find((o) => o.id === selected)?.explanation[locale]}
                {/if}
            </p>
            {#if !completed}
                <div
                    role="presentation"
                    on:mouseenter={pauseTimer}
                    on:mouseleave={resumeTimer}
                >
                    <TimerBar timeLeft={timeLeft} duration={answerDuration} />
                </div>
            {/if}
        </div>
    {/if}

    <div class="actions">
        {#if !completed}
            <button class="ghost" on:click={onRestart}>{t("restart")}</button>
            <button class="primary" disabled={!revealed} on:click={onNext}>
                {isLastQuestion ? t("finish") : t("next")}
            </button>
        {:else}
            <button class="primary" on:click={onRestart}>{t("playAgain")}</button>
        {/if}
    </div>
</section>

<style>
    .card {
        position: relative;
        z-index: 1;
        padding: 1.6rem;
        border: 1px solid var(--outline-soft);
        border-radius: 18px;
        background:
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2)),
            url("/illustrations/question-bg.svg") center/cover,
            var(--bg);
        box-shadow: 0 18px 40px var(--shadow-strong);
        overflow: hidden;
    }

    .card::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 18px;
        border: 1px solid var(--accent-soft);
        pointer-events: none;
    }

    .meta {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.35rem;
    }

    .meta-left {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    .meta-actions {
        margin-left: auto;
        display: flex;
        gap: 0.35rem;
        align-items: center;
    }

    .hero-image {
        width: 100%;
        max-height: 220px;
        overflow: hidden;
        border-radius: 14px;
        border: 1px solid var(--outline-soft);
        margin-bottom: 0.85rem;
        background: var(--surface-soft);
    }

    .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.38rem 0.85rem;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: var(--ink-strong);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.82rem;
        font-family: var(--font-sans);
    }

    .icon-link {
        all: unset;
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        cursor: pointer;
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            box-shadow 120ms ease;
    }

    .icon-link svg {
        width: 24px;
        height: 24px;
    }

    .icon-link:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        box-shadow: 0 10px 18px var(--shadow-soft);
    }

    .sub {
        color: var(--text-subtle);
        font-size: 0.95rem;
    }

    h2 {
        margin: 0.3rem 0 0.2rem;
        font-size: 1.35rem;
        color: var(--text);
        line-height: 1.4;
    }

    .source {
        margin: 0 0 1rem;
        color: var(--text-muted);
        font-size: 0.95rem;
    }

    .options {
        display: grid;
        gap: 0.75rem;
        margin: 1.15rem 0 1.35rem;
    }

    .options button {
        all: unset;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.9rem;
        padding: 0.95rem 1.05rem;
        border: 1px solid var(--outline-soft);
        border-radius: 12px;
        background: linear-gradient(135deg, var(--surface-strong), var(--surface-soft));
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            background 120ms ease,
            box-shadow 120ms ease;
    }

    .options button:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        box-shadow: 0 12px 24px var(--shadow-soft);
    }

    .options button.selected {
        border-color: var(--accent);
        box-shadow: 0 14px 26px var(--shadow-soft);
        background: linear-gradient(135deg, var(--accent-soft), var(--surface-soft));
    }

    .options button.correct {
        border-color: color-mix(in srgb, var(--success) 80%, transparent);
        background: linear-gradient(135deg, color-mix(in srgb, var(--success) 30%, transparent), var(--surface-soft));
    }

    .options button.incorrect {
        border-color: color-mix(in srgb, var(--danger) 80%, transparent);
        background: linear-gradient(135deg, color-mix(in srgb, var(--danger) 30%, transparent), var(--surface-soft));
    }

    .bullet {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: var(--surface-strong);
        display: grid;
        place-items: center;
        font-weight: 800;
        color: var(--text);
        border: 1px solid var(--outline-soft);
    }

    .text {
        color: var(--text);
        line-height: 1.4;
        font-weight: 600;
    }

    .badge {
        font-size: 0.8rem;
        color: var(--success);
        font-weight: 800;
        letter-spacing: 0.04em;
    }

    .explanation {
        padding: 0.95rem 1.05rem;
        border-radius: 12px;
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        color: var(--text);
    }

    .explanation p {
        margin: 0;
        line-height: 1.5;
    }

    .explanation p.correct {
        color: var(--success);
    }

    .explanation p.incorrect {
        color: var(--danger);
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.1rem;
    }

    .actions button {
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

    .actions .ghost {
        background: transparent;
        color: var(--text);
        border: 1px solid var(--outline-strong);
    }

    .actions .primary {
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: var(--ink-strong);
        box-shadow: 0 10px 20px var(--shadow-soft);
    }

    .actions button:hover:enabled {
        transform: translateY(-1px);
    }

    .actions button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    @media (max-width: 640px) {
        .actions {
            flex-direction: column;
            align-items: stretch;
        }

        .actions button {
            width: 100%;
            text-align: center;
        }

        .options button {
            grid-template-columns: auto 1fr;
        }
    }
</style>
