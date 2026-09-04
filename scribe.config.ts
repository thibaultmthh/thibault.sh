import { z } from "zod";
import { defineConfig, defineContentType, field } from "scribe-cms";

// `publishedAt`, `updatedAt`, `noindex` and `canonicalPath` are built-ins:
// never declare them here.
const blogSchema = z.object({
  title: field.translatable(z.string().min(1)),
  description: field.translatable(z.string().min(1)),
});

// Frontmatter-only entries, no page of their own (listed on / and /projects).
const projectSchema = z.object({
  name: field.structural(z.string().min(1)),
  year: field.structural(z.string().min(1)),
  status: field.structural(z.enum(["active", "done", "discontinued"])),
  kind: field.structural(z.enum(["personal", "client"])),
  order: field.structural(z.number().int()).describe("Display order, lowest first"),
  hidden: field.structural(z.boolean().default(false)).describe("Left out of the listings unless ?all=1"),
  description: field.translatable(z.string().min(1)),
  role: field.translatable(z.string().optional()).describe("What I did, for client work"),
  href: field.structural(z.string().optional()).describe("Main link"),
  links: field.structural(z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).optional()),
  stack: field.structural(z.array(z.string()).optional()),
});

const byOrder = (a: { frontmatter: { order: number } }, b: { frontmatter: { order: number } }) =>
  a.frontmatter.order - b.frontmatter.order;

export default defineConfig({
  rootDir: ".",
  locales: ["en", "fr", "es", "pt", "zh-CN", "zh-TW"],
  defaultLocale: "en",
  types: [
    defineContentType({
      id: "blog",
      path: "/blog/{slug}",
      schema: blogSchema,
      orderBy: "-publishedAt",
    }),
    defineContentType({
      id: "project",
      schema: projectSchema,
      orderBy: byOrder,
      body: false,
    }),
  ],
});
