/**
 * Vite configuration
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  /**
   * GitHub Pages repository base path
   */
  base: "/github-portfolio/",

  plugins: [react()],

  server: {
    port: 4173,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});