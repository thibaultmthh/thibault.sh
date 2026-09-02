import fs from "node:fs";
import path from "node:path";
import { Marked, Renderer, type Tokens } from "marked";
import sharp from "sharp";

const followDomains = ["apps.shopify.com/genlook-virtual-try-on", "genlook.app", "emmabortot.fr", "thibault.sh"];

function shouldFollow(href: string) {
  if (href.startsWith("/")) return true;
  try {
    const url = new URL(href);
    return followDomains.some((d) => url.hostname === d || url.href.includes(d));
  } catch {
    return true;
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const dimCache = new Map<string, string>();
async function dimensionAttrs(src: string) {
  if (dimCache.has(src)) return dimCache.get(src)!;
  let attrs = "";
  if (src.startsWith("/")) {
    const file = path.join(process.cwd(), "public", src);
    if (fs.existsSync(file)) {
      const m = await sharp(file).metadata();
      if (m.width && m.height) attrs = ` width="${m.width}" height="${m.height}"`;
    }
  }
  dimCache.set(src, attrs);
  return attrs;
}

/** Markdown -> HTML at build time. Images become figures with intrinsic size; external links get rel/target. */
export async function renderMarkdown(md: string): Promise<string> {
  for (const m of md.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) await dimensionAttrs(m[1]);

  const renderer = new Renderer();
  renderer.image = function ({ href, text }: Tokens.Image) {
    const dims = dimCache.get(href) ?? "";
    const cap = text ? `<figcaption>${esc(text)}</figcaption>` : "";
    return `<figure><a href="${esc(href)}" target="_blank" rel="noopener"><img src="${esc(href)}" alt="${esc(text)}" loading="lazy" decoding="async"${dims}></a>${cap}</figure>`;
  };
  renderer.paragraph = function ({ tokens }: Tokens.Paragraph) {
    if (tokens.length === 1 && tokens[0].type === "image") return this.parser.parseInline(tokens) + "\n";
    return `<p>${this.parser.parseInline(tokens)}</p>\n`;
  };
  renderer.link = function ({ href, title, tokens }: Tokens.Link) {
    const inner = this.parser.parseInline(tokens);
    const external = !href.startsWith("/") && !href.startsWith("#");
    const rel = external ? (shouldFollow(href) ? ' rel="noopener" target="_blank"' : ' rel="nofollow noopener" target="_blank"') : "";
    const t = title ? ` title="${esc(title)}"` : "";
    return `<a href="${esc(href)}"${t}${rel}>${inner}</a>`;
  };

  const marked = new Marked({ gfm: true, renderer });
  return marked.parse(md) as string;
}
