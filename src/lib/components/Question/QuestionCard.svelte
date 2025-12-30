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
    export let retakeDisabled: boolean = false;
    export let theme: "light" | "dark";
    export let t: (key: string) => string;
    export let answeredCorrectly: boolean;
    export let onSelect: (id: string) => void;
    export let onNext: () => void;
    export let onRetake: () => void;
    export let onRestart: () => void;
    export let isLastQuestion: boolean;
    export let timeLeft: number;
    export let answerDuration: number;
    export let pauseTimer: () => void;
    export let resumeTimer: () => void;
    export let onHome: () => void;

    const lightBackground =
        question.image_url_light ??
        (question.image_url?.includes("quest-hero")
            ? "/illustrations/quest-hero-light.svg"
            : question.image_url);

    const darkBackground =
        question.image_url_dark ??
        question.image_url ??
        "/illustrations/quest-hero.svg";

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

<section
    class={`card ${theme === "light" ? "light-mode" : "dark-mode"}`}
    style={`--card-img: url('${
        theme === "light"
            ? (lightBackground ?? "/illustrations/quest-hero-light.svg")
            : darkBackground
    }');`}
>
    <div class="meta">
        <div class="meta-left">
            <span class="pill">{question.stage[locale]}</span>
            <span class="sub"
                >{t("question")}
                {currentIndex + 1}
                {t("of")}
                {totalQuestions}</span
            >
        </div>
        <div class="meta-actions">
            <button
                class="icon-link"
                type="button"
                on:click={onHome}
                aria-label="Home"
                title="Home"
            >
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
            <button
                class="icon-link"
                type="button"
                on:click={openShare}
                aria-label="Share"
                title="Share"
            >
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

    <div class="interactive">
        <div class="options">
            {#each question.options as option}
                <button
                    class:selected={selected === option.id}
                    class:correct={revealed &&
                        option.correct &&
                        selected === option.id}
                    class:incorrect={revealed &&
                        selected === option.id &&
                        !option.correct}
                    on:click={() => onSelect(option.id)}
                >
                    <span class="bullet">{option.id.toUpperCase()}</span>
                    <span class="text">{option.text[locale]}</span>
                    {#if revealed && selected === option.id && option.correct}
                        <span class="badge correct-badge" aria-label={t("correct")}>
                            ✓
                        </span>
                    {:else if revealed && selected === option.id && !option.correct}
                        <span class="badge incorrect-badge" aria-label={t("incorrect")}>
                            ✕
                        </span>
                    {:else}
                        <span class="badge placeholder"></span>
                    {/if}
                </button>
            {/each}
        </div>

        <div class={`explanation ${revealed ? "visible" : "placeholder"}`}>
            {#if revealed}
                <p
                    class:correct={answeredCorrectly}
                    class:incorrect={!answeredCorrectly}
                >
                    {#if answeredCorrectly}
                        {t("correctMsg")}
                        {question.options.find((o) => o.id === selected)
                            ?.explanation[locale]}
                    {:else}
                        {t("incorrectMsg")}
                        {question.options.find((o) => o.id === selected)
                            ?.explanation[locale]}
                    {/if}
                </p>
                {#if !completed}
                    <div
                        role="presentation"
                        on:mouseenter={pauseTimer}
                        on:mouseleave={resumeTimer}
                    >
                        <TimerBar {timeLeft} duration={answerDuration} />
                    </div>
                {/if}
            {/if}
        </div>
    </div>

    <div class="actions">
        {#if !completed}
            <button class="ghost" on:click={onRetake} disabled={retakeDisabled}
                >Retake</button
            >
            <button class="primary" disabled={!revealed} on:click={onNext}>
                {isLastQuestion ? t("finish") : t("next")}
            </button>
        {:else}
            <button class="primary" on:click={onRestart}
                >{t("playAgain")}</button
            >
        {/if}
    </div>
</section>

<style>
    .card {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        padding: 1.6rem;
        border: 1px solid var(--outline-soft);
        border-radius: 18px;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)),
            var(--card-img) center/cover,
            var(--bg);
        background-size: cover, cover, auto;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0 18px 40px var(--shadow-strong);
        overflow: hidden;
        color: var(--ink-strong);
        min-height: 720px;
    }

    .card.dark-mode {
        color: #d3d7e4;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.78)),
            var(--card-img) center/cover,
            var(--bg);
    }

    .card.light-mode {
        background:
            linear-gradient(
                185deg,
                rgba(246, 236, 210, 0.78),
                rgba(226, 206, 176, 0.68)
            ),
            var(--card-img) center/cover,
            var(--bg);
        background-blend-mode: soft-light, normal, normal;
        color: var(--text);
    }

    .card.dark-mode h2,
    .card.dark-mode .source {
        color: #d3d7e4;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
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

    .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.38rem 0.85rem;
        border-radius: 999px;
        background: linear-gradient(
            135deg,
            var(--accent),
            var(--accent-strong)
        );
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
        color: var(--ink-strong);
        line-height: 1.4;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
    }

    .source {
        margin: 0 0 1rem;
        color: var(--ink-strong);
        font-size: 0.95rem;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    }

    .interactive {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        padding-bottom: 0.35rem;
        justify-content: space-between;
        position: relative;
    }

    .options {
        display: grid;
        gap: 0.75rem;
        margin: 1.15rem 0 0.25rem;
    }

    .options button {
        all: unset;
        cursor: pointer;
        display: grid;
        grid-template-columns: 28px 1fr 64px;
        align-items: center;
        gap: 0.5rem;
        padding: 0.65rem 0.1rem;
        color: var(--ink-strong);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        background: transparent;
        min-height: 52px;
        border: none;
        border-bottom: 1px solid transparent;
        transition:
            transform 120ms ease,
            background 120ms ease,
            box-shadow 120ms ease,
            opacity 120ms ease;
    }

    .card.light-mode .options button {
        color: var(--text);
        text-shadow: none;
        border-bottom-color: rgba(214, 184, 130, 0.35);
    }

    .card.dark-mode .options button {
        color: #c8cede;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
        border-bottom-color: rgba(255, 255, 255, 0.12);
    }

    .options button:hover {
        transform: translateY(-1px);
        border-bottom-color: var(--outline-soft);
    }

    .options button.selected {
        border-bottom-color: var(--outline-strong);
        box-shadow: none;
    }

    .options button.correct {
        border-bottom: 2px solid
            color-mix(in srgb, var(--success) 85%, transparent);
        background: color-mix(in srgb, var(--success) 12%, transparent);
        box-shadow: 0 10px 18px color-mix(in srgb, var(--success) 16%, transparent);
        border-radius: 12px;
    }

    .options button.incorrect {
        border-bottom: 2px solid
            color-mix(in srgb, var(--danger) 85%, transparent);
        background: color-mix(in srgb, var(--danger) 12%, transparent);
        box-shadow: none;
    }

    .bullet {
        width: 26px;
        height: 26px;
        border-radius: 9px;
        background: rgba(0, 0, 0, 0.18);
        display: grid;
        place-items: center;
        font-weight: 800;
        color: var(--ink-strong);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card.dark-mode .bullet {
        background: rgba(255, 255, 255, 0.12);
        color: #c8cede;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .text {
        color: var(--ink-strong);
        line-height: 1.4;
        font-weight: 700;
    }

    .card.dark-mode .text {
        color: #c8cede;
    }

    .badge {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 0.8rem;
        color: var(--text-subtle);
        font-weight: 800;
        letter-spacing: 0.04em;
        text-align: center;
        min-height: 1.6em;
        padding: 0.18rem 0.4rem;
        background: transparent;
        border-radius: 6px;
    }

    .badge.placeholder {
        visibility: hidden;
        background: transparent;
    }

    .badge.correct-badge {
        color: var(--success);
        background: transparent;
        font-size: 1.3rem;
        font-weight: 900;
    }

    .badge.incorrect-badge {
        color: var(--danger);
        background: transparent;
        font-size: 1.3rem;
        font-weight: 900;
    }

    .explanation {
        padding: 0.65rem 0.8rem;
        border-radius: 12px;
        border: 1px solid var(--outline-soft);
        background: var(--surface-soft);
        color: var(--text);
        min-height: 110px;
        transition: opacity 150ms ease;
        opacity: 1;
        display: grid;
        gap: 0.35rem;
    }

    .explanation.placeholder {
        opacity: 0;
        pointer-events: none;
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
        margin-top: 1rem;
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
        background: linear-gradient(
            135deg,
            var(--accent),
            var(--accent-strong)
        );
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
        .card {
            min-height: 820px;
        }
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
