import type { APIRoute } from "astro";
import { getPosts } from "@/lib/blog";

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://thibault.sh")).toString().replace(/\/$/, "");
  const items = getPosts()
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thibault Mathian</title>
    <link>${base}/blog</link>
    <description>Notes on building companies and products.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  return new Response(rss, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
