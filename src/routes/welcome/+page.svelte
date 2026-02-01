<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import StickFigure from "$lib/components/StickFigure/StickFigure.svelte";

    type Theme = "light" | "dark";
    let theme: Theme = "dark";
    let showWelcomeAlways = false;

    const applyTheme = (value: Theme) => {
        theme = value;
        if (browser) {
            document.documentElement.dataset.theme = value;
            document.body.dataset.theme = value;
            localStorage.setItem("theme", value);
        }
    };

    const markVisited = () => {
        if (browser) {
            localStorage.setItem("vd_has_visited", "1");
        }
    };

    const handleStart = () => {
        markVisited();
        if (browser) {
            localStorage.setItem(
                "vd_show_welcome_always",
                showWelcomeAlways ? "1" : "",
            );
        }
        goto("/home"); // home/landing
    };

    const handleToggle = () => {
        if (browser) {
            localStorage.setItem(
                "vd_show_welcome_always",
                showWelcomeAlways ? "1" : "",
            );
        }
    };

    onMount(() => {
        if (!browser) return;
        const stored = localStorage.getItem("theme");
        const prefersDark =
            typeof matchMedia !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next: Theme =
            stored === "light" || stored === "dark"
                ? (stored as Theme)
                : prefersDark
                  ? "dark"
                  : "light";
        applyTheme(next);

        showWelcomeAlways =
            localStorage.getItem("vd_show_welcome_always") === "1";
    });
</script>

<main
    class={`page ${theme === "light" ? "light-theme" : "dark-theme"} welcome-only`}
>
    <div class="glow gold" aria-hidden="true"></div>
    <div class="glow purple" aria-hidden="true"></div>
    <div class="glow crimson" aria-hidden="true"></div>

    <section class="intro-card">
        <p class="intro-eyebrow">Welcome</p>
        <h2>Welcome to Verbum Quest</h2>
        <StickFigure
            className="welcome-figure"
            overall={100}
            headTop={19}
            torsoTop={39}
            armsTop={47}
        />
        <p class="intro-body">
            We crafted this path with care—take your time, explore, and let each
            question guide you gently forward. We hope you enjoy learning as
            much as we enjoyed building it for you.
        </p>
        <p class="intro-body">
            When you're ready, step into the main experience. Your progress and
            choices will feel at home here.
        </p>
        <button class="primary soft" on:click={handleStart}
            >Start your journey!</button
        >
        <div class="footer-space"></div>
        <label class="welcome-toggle">
            <input
                type="checkbox"
                bind:checked={showWelcomeAlways}
                on:change={handleToggle}
            />
            <span>Always show this welcome page</span>
        </label>
    </section>
</main>

<style>
    .page {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 12px;
    }

    .page.light-theme {
        background: linear-gradient(180deg, #f8f3e7 0%, #f2eadb 100%);
    }

    .page.dark-theme {
        background: linear-gradient(180deg, #0f1119 0%, #131827 100%);
    }

    .glow {
        position: absolute;
        width: 380px;
        height: 380px;
        border-radius: 50%;
        filter: blur(140px);
        opacity: 0.9;
        z-index: 0;
    }

    .glow.gold {
        background: var(--glow-gold);
        top: -140px;
        left: -120px;
    }

    .glow.purple {
        background: var(--glow-purple);
        top: 120px;
        right: -160px;
    }

    .glow.crimson {
        background: var(--glow-crimson);
        bottom: -160px;
        left: 28%;
    }

    .intro-card {
        position: relative;
        z-index: 1;
        padding: 2.6rem 2.4rem 2.2rem;
        border: 1px solid var(--outline-soft);
        border-radius: 20px;
        background:
            linear-gradient(
                180deg,
                rgba(248, 243, 231, 0.9),
                rgba(234, 215, 188, 0.85)
            ),
            url("/illustrations/quest-hero-light.svg") center/cover,
            linear-gradient(160deg, var(--card-veil-1), var(--card-veil-2)),
            var(--bg);
        box-shadow: 0 18px 40px var(--shadow-strong);
        display: grid;
        gap: 1.2rem;
        min-height: 70vh;
        max-width: 860px;
        align-content: center;
        justify-items: center;
        margin: 0 auto;
        text-align: center;
    }

    .page.dark-theme .intro-card {
        background:
            linear-gradient(
                160deg,
                rgba(18, 26, 52, 0.9),
                rgba(18, 24, 41, 0.9)
            ),
            linear-gradient(
                160deg,
                rgba(12, 14, 24, 0.6),
                rgba(18, 20, 32, 0.6)
            ),
            url("/illustrations/quest-hero.svg") center/cover,
            var(--bg);
        color: var(--text);
    }

    .page.dark-theme .intro-eyebrow {
        color: var(--accent);
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    .page.dark-theme .intro-body {
        color: var(--text-muted);
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    .page.dark-theme .intro-card h2 {
        color: var(--text);
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.65);
    }

    .intro-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
        text-align: center;
    }

    .intro-body {
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
        text-align: center;
    }

    .intro-card h2 {
        text-align: center;
        margin: 0;
    }

    .intro-card .primary {
        justify-self: center;
        margin-top: 1.6rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 999px;
        padding: 1.05rem 1.8rem;
        font-weight: 800;
        color: var(--ink-strong);
        background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.25),
                rgba(255, 255, 255, 0.1)
            ),
            linear-gradient(135deg, var(--accent), var(--accent-strong));
        box-shadow:
            0 12px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition:
            transform 140ms ease,
            opacity 140ms ease,
            box-shadow 140ms ease,
            border-color 140ms ease;
    }

    .intro-card .primary:hover {
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.55);
        box-shadow: 0 14px 28px var(--shadow-soft);
    }


    .welcome-toggle {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 600;
        color: var(--text-muted);
        margin-top: auto;
        justify-self: center;
        opacity: 0.7;
        font-size: 0.9rem;
    }

    .welcome-toggle input {
        width: 18px;
        height: 18px;
        accent-color: var(--accent);
    }

    :global(.welcome-figure) {
        margin: 0.4rem auto 0.4rem;
    }
</style>
