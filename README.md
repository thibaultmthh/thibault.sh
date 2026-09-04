# thibault.sh

Personal site: blog, projects, contact. Fully static; the only client-side JavaScript is a one-liner that remembers the chosen language in a cookie.

- **Stack**: Astro 5, Tailwind v4, Geist Sans/Mono (self-hosted).
- **Content**: blog posts live in `content/blog/*.md` and are read through [Scribe](https://scribe.genlook.app) (`scribe.config.ts`). Frontmatter: `title`, `description`, `publishedAt`. Files starting with `_` are drafts and ignored.
- **Projects** are frontmatter-only Scribe entries in `content/project/*.md` (`order` controls the listing, `hidden: true` keeps an entry off the default list).
- **Locales**: declared once in `scribe.config.ts` (`locales` / `defaultLocale`) and reused by Astro's `i18n` config. English is served at the root, every other locale under `/<locale>/…` (`/fr/blog/parakeet`). Pages live in `src/pages/[...locale]/` and are built once per locale; UI strings are in `src/lib/i18n.ts`, content translations come from Scribe.
- **Untranslated content**: a locale without a translation still gets a page (Scribe falls back to English) but it is `noindex`, canonicals to the English URL, and is left out of `sitemap.xml`. Run `scribe translate` to fill the store, commit `.scribe/`, and rebuild.
- **Auto routing**: `vercel.json` redirects `/` (only `/`) to `/<locale>` from `Accept-Language`, unless a `locale` cookie exists. The footer language switcher sets that cookie, so an explicit choice always wins.

```bash
pnpm install
pnpm dev
pnpm scribe validate   # checks content before build
pnpm scribe status     # translation coverage per locale
GEMINI_API_KEY=… pnpm scribe translate --locale fr   # translate missing/stale docs into the SQLite store
pnpm build             # -> dist/
```

On Vercel the framework preset must be **Astro** (output directory `dist`).
