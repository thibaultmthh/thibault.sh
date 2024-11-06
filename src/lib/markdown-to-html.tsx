import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import rehypeWrap from "rehype-wrap-all";
import rehypeVideo from "rehype-video";

// Move processor initialization outside the function and make it async
const getProcessor = async () => {
  return (
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeVideo, {
        test: /https?:\/\/.*\.(mp4|m4v|mov|webm|ogv)$/,
      })
      .use(rehypeShiki, {
        theme: "dark-plus",
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .use(rehypeWrap as any, {
        selector: "pre",
        wrapper: "div.code-block",
      })
      .use(rehypeStringify)
  );
};

// Add proper type for processor instance
let processorInstance: Awaited<ReturnType<typeof getProcessor>> | null = null;

export async function markdownToHtml(markdown: string) {
  if (!processorInstance) {
    processorInstance = await getProcessor();
  }
  const result = await processorInstance.process(markdown);
  return result.toString();
}
