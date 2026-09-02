import { scribe, LOCALE } from "./scribe";

type ProjectDoc = ReturnType<typeof scribe.project.list>[number];
export type Project = ProjectDoc["frontmatter"] & { slug: string };

/** Listed projects, in `order`. Entries with `hidden: true` are left out unless asked for. */
export function getProjects({ includeHidden = false } = {}): Project[] {
  return scribe.project
    .list(LOCALE)
    .map((d) => ({ ...d.frontmatter, slug: d.slug }))
    .filter((p) => includeHidden || !p.hidden);
}

export function linkLabel(href: string) {
  if (href.startsWith("/blog")) return "blog post";
  if (href.includes("github.com")) return "code";
  return "visit";
}

export const isExternal = (h: string) => h.startsWith("http") || h.endsWith(".mp4");
