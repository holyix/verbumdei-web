<script lang="ts">
    export let timeLeft: number;
    export let duration: number;
</script>

<div class="answer-timer" aria-label="Progress to next question">
    <div
        class="answer-timer-bar"
        style={`width: ${(timeLeft / duration) * 100}%`}
    ></div>
    <slot />
</div>

<style>
    .answer-timer {
        margin-top: 0.6rem;
        height: 3px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .answer-timer-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
        transition: width 50ms linear;
    }
</style>
