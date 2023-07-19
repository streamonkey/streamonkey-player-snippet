import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: "injected" }, emitCss: false })],
  build: {
    lib: {
      entry: "src/lib/main.ts",
      name: "streamonkey-player.js",
      fileName: (format) => `streamonkey-player.${format}.js`,
      formats: ["iife"],
    },
  },
});
