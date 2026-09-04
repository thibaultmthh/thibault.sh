import { scribe } from "./scribe";
import { DEFAULT_LOCALE, t } from "./i18n";

type ProjectDoc = ReturnType<typeof scribe.project.list>[number];
export type Project = ProjectDoc["frontmatter"] & { slug: string };

/** Listed projects, in `order`, with translated descriptions when available. Entries with `hidden: true` are left out unless asked for. */
export function getProjects(locale = DEFAULT_LOCALE, { includeHidden = false } = {}): Project[] {
  return scribe.project
    .list(DEFAULT_LOCALE)
    .map((d) => (locale === DEFAULT_LOCALE ? d : (scribe.project.translation(d, locale) ?? d)))
    .map((d) => ({ ...d.frontmatter, slug: d.slug }))
    .filter((p) => includeHidden || !p.hidden);
}

export function linkLabel(href: string, locale = DEFAULT_LOCALE) {
  const s = t(locale).projects;
  if (href.startsWith("/blog")) return s.blogPost;
  if (href.includes("github.com")) return s.code;
  return s.visit;
}

export const isExternal = (h: string) => h.startsWith("http") || h.endsWith(".mp4");
