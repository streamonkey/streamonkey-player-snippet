<script lang="ts">
  import { StreamPlayer } from "streamonkey-player";
  import type { Meta } from "streamonkey-player";
  import { onDestroy, onMount } from "svelte";
  import Play from "../icons/play-solid.svelte";
  import Pause from "../icons/pause-solid.svelte";
  import type { SnippetOptions } from "../main";

  export let streamUrl: string;
  export let options: SnippetOptions;

  let streamPlayer = new StreamPlayer(streamUrl, options);

  let playing = false;

  let currentMeta: Meta | undefined = undefined;

  let volume = 1;

  $: streamPlayer.volume = volume;

  onMount(() => {});

  streamPlayer.addEventListener("currentchange", (e) => {
    currentMeta = e.detail;
  });

  onDestroy(() => {
    streamPlayer.stop();
  });

  function togglePlay() {
    if (!streamPlayer) return;
    playing ? streamPlayer.stop() : streamPlayer.play();
    playing = !playing;
  }
</script>

<div class="streamonkey-player-container">
  <div class="streamonkey-player">
    <div class="cover">
      <img src={currentMeta?.cover ?? options.covers?.fallback} alt="cover" />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      id="play"
      class="toggle"
      on:click={() => {
        togglePlay();
      }}
    >
      {#if playing}
        <Pause
          mainColor="var(--brand-color)"
          secondaryColor="var(--brand-color-2)"
        />
      {:else}
        <Play
          mainColor="var(--brand-color)"
          secondaryColor="var(--brand-color-2)"
        />
      {/if}
    </div>

    <span class="current-title">
      {currentMeta?.title ?? options.placeholders?.title ?? "title"}
    </span>
    <span class="current-artist">
      {currentMeta?.artist != undefined
        ? `${currentMeta?.artist}`
        : options.placeholders?.artist ?? "artist"}
    </span>
    <input
      class="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      bind:value={volume}
    />
  </div>
</div>

<style lang="scss">
  .streamonkey-player-container {
    container-type: inline-size;
    width: 100%;
    height: 100%;
  }

  .streamonkey-player {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 10fr 2fr 2fr 1fr;
    grid-template-areas:
      "cover toggle"
      "current-title current-title"
      "current-artist current-artist"
      "volume volume";
    font-family: inherit;
    padding: 0.5rem;
    background-color: var(--background-color, lightblue);

    & .toggle {
      grid-area: toggle;
      width: 50%;
      height: 50%;
      display: flex;
      align-self: center;
      justify-self: center;
      margin-right: 0.5rem;
      cursor: pointer;
    }

    & .cover {
      grid-area: cover;
      border-radius: 10%;
      overflow: hidden;
      margin-right: 0.5rem;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & .current-title {
      grid-area: current-title;
      align-self: end;
      max-lines: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    & .current-artist {
      grid-area: current-artist;
      align-self: start;
      max-lines: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    & .volume {
      grid-area: volume;
      & {
        -webkit-appearance: none;
        height: 0.5rem;
        width: 90%;
        border-radius: 0.25rem;
        background-color: var(--brand-color, blue);
        outline: none;
        opacity: 0.7;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: var(--brand-color-2, blue);
          cursor: pointer;
        }
      }
    }
  }

  @container (min-width: 100vw) {
    .streamonkey-player {
      border-radius: 0.25rem;
      padding: 0;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 19fr 2fr 10fr 10fr;
      grid-template-areas:
        "cover current-title toggle . volume"
        "cover current-artist toggle . volume";
      align-items: center;
      justify-items: start;

      & .cover {
        width: 4em;
      }

      & .current-title {
        justify-self: start;
        align-self: end;
      }
      & .current-artist {
        justify-self: start;
        align-self: center;
      }

      & .toggle {
        width: 90%;
        height: 90%;
      }

      & .volume {
        transform: rotate(0deg);
      }
    }
  }

  @container (max-inline-size: 200px) {
    .streamonkey-player {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 1fr 1fr;
      grid-template-areas:
        "toggle"
        "current-title "
        "current-artist";
      font-family: var(--font-family, sans-serif);
      padding: 0.5rem;
      background-color: var(--background-color, lightblue);

      & .toggle {
        margin: 0;
        grid-area: toggle;
        width: 80%;
        height: 80%;
        align-self: center;
        justify-self: center;
        cursor: pointer;
      }

      & .cover {
        display: none;
      }

      & .current-title {
        grid-area: current-title;
        align-self: center;
        justify-self: center;

        max-lines: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      & .current-artist {
        grid-area: current-artist;
        align-self: center;
        justify-self: center;
        max-lines: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      & .volume {
        display: none;
      }
    }
  }

  @container (max-inline-size: 100px) {
    .streamonkey-player {
      padding: 0;
      border-radius: 0.25rem;
      align-items: center;
      justify-items: center;

      & .cover {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        & img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      & .volume {
        display: none;
      }

      & .current-title {
        display: none;
      }
      & .current-artist {
        display: none;
      }

      & .toggle {
        width: 50%;
        height: 50%;
        background-color: transparent;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
