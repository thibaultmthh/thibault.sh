import { notFound } from "next/navigation";
import { Metadata } from "next";
import EmojiCategoryClient from "./page.client";

async function getEmojis() {
  const response = await fetch(
    "https://raw.githubusercontent.com/github/gemoji/refs/heads/master/db/emoji.json",
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );
  return response.json();
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const title = `${decodedCategory} Emojis - Emoji Picker`;
  const description = `Browse and copy ${decodedCategory} emojis. Find the perfect emoji for your messages, social media posts, and content.`;

  return {
    title,
    description,
    keywords: [`${decodedCategory} emojis`, "emoji picker", "emoji copy", "unicode emojis", decodedCategory],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function EmojiCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const emojis = await getEmojis();

  const categoryEmojis = emojis.filter((emoji: any) => emoji.category === decodedCategory);

  if (categoryEmojis.length === 0) {
    notFound();
  }

  return <EmojiCategoryClient category={decodedCategory} emojis={categoryEmojis} allEmojis={emojis} />;
}
