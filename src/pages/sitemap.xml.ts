import type { APIRoute } from "astro";
import { scribe } from "@/lib/scribe";
import { LOCALES, allAlternates } from "@/lib/i18n";

// Pages that exist in every locale (UI strings are translated in src/lib/i18n.ts).
const STATIC_PATHS = ["/", "/blog", "/projects", "/contact"];

type Entry = { url: string; lastModified?: string; alternates: Record<string, string> };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://thibault.sh")).toString().replace(/\/$/, "");
  const abs = (p: string) => base + p;
  const entries: Entry[] = [];

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(Object.entries(allAlternates(path)).map(([l, p]) => [l, abs(p)]));
    for (const l of LOCALES) entries.push({ url: alternates[l], alternates });
  }

  // Scribe emits one entry per English post whose hreflang set only lists
  // locales that are really translated. Expand it so each translated URL is
  // its own <url>, sharing the same alternates cluster.
  for (const e of await scribe.sitemap({ baseUrl: base })) {
    const languages = e.alternates?.languages ?? {};
    const alternates = Object.fromEntries(Object.entries(languages).filter(([l]) => l !== "x-default"));
    const urls = Object.keys(alternates).length ? Object.values(alternates) : [e.url];
    for (const url of urls) entries.push({ url, lastModified: e.lastModified, alternates });
  }

  const body = entries
    .map((e) => {
      const links = Object.entries(e.alternates).map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(href)}"/>`);
      const xDefault = e.alternates[LOCALES[0]];
      if (xDefault) links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(xDefault)}"/>`);
      return `  <url>
    <loc>${esc(e.url)}</loc>${e.lastModified ? `\n    <lastmod>${e.lastModified}</lastmod>` : ""}
${links.join("\n")}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
