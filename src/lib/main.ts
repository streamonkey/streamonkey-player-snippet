import type { Options } from "streamonkey-player";
import StreamPlayerComponent from "./components/StreamPlayerComponent.svelte";

export interface SnippetOptions extends Options {
  covers: {
    URL: string;
    fallback: string;
  };
  aggregator: string;
  placeholders?: {
    title?: string;
    artist?: string;
  };
}

export const initStreamonkeyPlayer = (
  target: string | Element,
  streamUrl: string,
  options: SnippetOptions
) => {
  let targetElement: Element;
  if (typeof target === "string") {
    targetElement = document.querySelector(target)!;
  } else {
    targetElement = target;
  }

  new StreamPlayerComponent({
    target: targetElement,
    props: { streamUrl, options },
  });
};
// @ts-ignore
window.initStreamonkeyPlayer = initStreamonkeyPlayer;
