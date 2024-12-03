import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixel Art Creator",
  description: "Create pixel art with a simple grid-based drawing tool. Export your creations as PNG images.",
  keywords: "pixel art maker online, pixel drawing tool, pixel art creator, pixel editor",
  openGraph: {
    title: "Pixel Art Creator",
    description: "Create your own pixel art masterpieces",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 