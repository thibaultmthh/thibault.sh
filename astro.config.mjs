import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import scribe from "./scribe.config";

export default defineConfig({
  site: "https://thibault.sh",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  // Locales are owned by scribe.config.ts. The default locale is served at the
  // root, the others under /<locale>/… (Scribe's default "path-prefix" routing).
  i18n: {
    defaultLocale: scribe.defaultLocale ?? "en",
    locales: [...scribe.locales],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
    // Native module + Scribe runtime stay external to the build bundle.
    ssr: { external: ["scribe-cms", "scribe-cms/runtime", "better-sqlite3", "sharp"] },
  },
});
