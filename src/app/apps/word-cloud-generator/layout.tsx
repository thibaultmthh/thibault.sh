import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Cloud Generator",
  description:
    "Create beautiful word clouds from any text. Customize colors, shapes, and layouts for unique visualizations.",
  keywords: "word cloud maker, tag cloud generator, text visualization, word cloud generator",
  openGraph: {
    title: "Word Cloud Generator",
    description: "Create beautiful and customizable word clouds from any text",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
