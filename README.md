# thibault.sh

Personal site: blog, projects, contact. Fully static, no client-side JavaScript.

- **Stack**: Astro 5, Tailwind v4, Geist Sans/Mono (self-hosted).
- **Content**: blog posts live in `content/blog/*.md` and are read through [Scribe](https://scribe.genlook.app) (`scribe.config.ts`). Frontmatter: `title`, `description`, `publishedAt`. Files starting with `_` are drafts and ignored.
- **Projects** are frontmatter-only Scribe entries in `content/project/*.md` (`order` controls the listing, `hidden: true` keeps an entry off the default list).

```bash
pnpm install
pnpm dev
pnpm scribe validate   # checks content before build
pnpm build             # -> dist/
```

On Vercel the framework preset must be **Astro** (output directory `dist`).
