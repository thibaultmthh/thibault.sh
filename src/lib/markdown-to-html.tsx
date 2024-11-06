import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import rehypeWrap from "rehype-wrap-all";
import rehypeVideo from "rehype-video";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeVideo, {
    test: /https?:\/\/.*\.(mp4|m4v|mov|webm|ogv)$/,
  })
  .use(rehypeShiki, {
    theme: "dark-plus",
  })
  .use(rehypeWrap, {
    selector: "pre",
    wrapper: "div.code-block",
  })
  .use(rehypeStringify);

export async function markdownToHtml(markdown: string) {
  const result = await processor.process(markdown);
  return result.toString();
}
