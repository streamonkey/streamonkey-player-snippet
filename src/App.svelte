<script lang="ts">
  import type { Options } from "streamonkey-player";
  import { onMount } from "svelte";
  import { initStreamonkeyPlayer, type SnippetOptions } from "./lib/main";

  onMount(() => {
    const options: SnippetOptions = {
      aggregator: "streamonkey-miniplayer",
      covers: {
        URL: "/cover",
        fallback:
          "https://www.xing.com/imagecache/public/scaled_original_image/eyJ1dWlkIjoiMDBmYjQ5MTktMTNmMC00ODQ5LWFkOTAtODdmNDdjMWQ4ZTViIiwiYXBwX2NvbnRleHQiOiJlbnRpdHktcGFnZXMiLCJtYXhfd2lkdGgiOjMyMCwibWF4X2hlaWdodCI6MzIwfQ?signature=cd54040bfab7c1be7a65601c20769a177c2eb16c025c1ccd1a699a0b6ebeca95",
      },
      placeholders: {
        title: "Test-Radio",
        artist: "Das beste von vorgestern und übermorgen",
      },
    };

    let containerSmall =
      document.querySelector<HTMLDivElement>(".audio-small")!;
    initStreamonkeyPlayer(containerSmall, "femotion-radio", options);

    let containerResize =
      document.querySelector<HTMLDivElement>(".audio-resize")!;
    initStreamonkeyPlayer(containerResize, "femotion-radio", options);

    let containerBottom =
      document.querySelector<HTMLDivElement>(".audio-bottom")!;
    initStreamonkeyPlayer(containerBottom, "femotion-radio", options);
  });
</script>

<div class="audio-small" />
<div class="audio-resize" />
<div class="audio-bottom" />

<style>
  .audio-small {
    width: 100px;
    height: 100px;
    --background-color: #e9f4f0;
    --brand-color: #24b591;
    --brand-color-2: #083a44;
  }

  .audio-resize {
    width: 21vw;
    height: 21vh;
    --background-color: #e9f4f0;
    --brand-color: #24b591;
    --brand-color-2: #083a44;
  }

  .audio-bottom {
    font-family: Arial, Helvetica, sans-serif;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    --background-color: #e9f4f0;
    --brand-color: #24b591;
    --brand-color-2: #083a44;
  }
</style>
