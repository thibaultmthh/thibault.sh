import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://thibault.sh",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/projects/all"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Native module + Scribe runtime stay external to the build bundle.
    ssr: { external: ["scribe-cms", "scribe-cms/runtime", "better-sqlite3", "sharp"] },
  },
});
