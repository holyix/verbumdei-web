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
</script>

<section class="card">
    <div class="meta">
        <span class="pill">{question.stage[locale]}</span>
        <span class="sub">{t("question")} {currentIndex + 1} {t("of")} {totalQuestions}</span>
    </div>
    <h2>{question.prompt[locale]}</h2>
    {#if question.source}
        <p class="source">{t("source")}: {question.source}</p>
    {/if}

    <div class="options">
        {#each question.options as option}
            <button
                class:selected={selected === option.id}
                class:correct={revealed && option.correct}
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
            linear-gradient(160deg, rgba(11, 17, 35, 0.88), rgba(12, 20, 40, 0.92)),
            url("/illustrations/question-bg.svg") center/cover,
            var(--bg);
        box-shadow: 0 18px 40px rgba(6, 10, 25, 0.5);
        overflow: hidden;
    }

    .card::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 18px;
        border: 1px solid rgba(199, 164, 87, 0.06);
        pointer-events: none;
    }

    .meta {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.35rem;
    }

    .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.38rem 0.85rem;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: #0d0f1d;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.82rem;
        font-family: var(--font-sans);
    }

    .sub {
        color: #c8d0e3;
        font-size: 0.95rem;
    }

    h2 {
        margin: 0.3rem 0 0.2rem;
        font-size: 1.35rem;
        color: #f5f7ff;
        line-height: 1.4;
    }

    .source {
        margin: 0 0 1rem;
        color: #b0bad6;
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
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01)
        );
        transition:
            transform 120ms ease,
            border-color 120ms ease,
            background 120ms ease,
            box-shadow 120ms ease;
    }

    .options button:hover {
        transform: translateY(-1px);
        border-color: rgba(242, 210, 141, 0.6);
        box-shadow: 0 12px 24px rgba(15, 20, 45, 0.5);
    }

    .options button.selected {
        border-color: rgba(199, 164, 87, 0.85);
        box-shadow: 0 14px 26px rgba(12, 18, 36, 0.45);
        background: linear-gradient(
            135deg,
            rgba(199, 164, 87, 0.14),
            rgba(104, 132, 170, 0.1)
        );
    }

    .options button.correct {
        border-color: rgba(58, 206, 133, 0.75);
        background: linear-gradient(
            135deg,
            rgba(58, 206, 133, 0.14),
            rgba(255, 255, 255, 0.02)
        );
    }

    .options button.incorrect {
        border-color: rgba(233, 93, 93, 0.75);
        background: linear-gradient(
            135deg,
            rgba(233, 93, 93, 0.14),
            rgba(255, 255, 255, 0.02)
        );
    }

    .bullet {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        display: grid;
        place-items: center;
        font-weight: 800;
        color: #f7f8ff;
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .text {
        color: #e8edf6;
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
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        color: #e8edf6;
    }

    .explanation p {
        margin: 0;
        line-height: 1.5;
    }

    .explanation p.correct {
        color: var(--success);
    }

    .explanation p.incorrect {
        color: #f28c8c;
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
        color: #d5ddf0;
        border: 1px solid rgba(255, 255, 255, 0.16);
    }

    .actions .primary {
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        color: #0d0f1d;
        box-shadow: 0 10px 20px rgba(12, 18, 36, 0.4);
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
