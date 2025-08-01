/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EmojiDetailClient from "./page.client";

async function getEmojis() {
  const response = await fetch(
    "https://raw.githubusercontent.com/github/gemoji/refs/heads/master/db/emoji.json",
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );
  return response.json();
}

interface EmojiPageProps {
  params: Promise<{
    emoji: string;
  }>;
}

export async function generateMetadata({ params }: EmojiPageProps): Promise<Metadata> {
  const { emoji } = await params;
  const decodedEmoji = decodeURIComponent(emoji);
  const emojis = await getEmojis();

  const emojiData = emojis.find((e: any) => e.emoji === decodedEmoji);

  if (!emojiData) {
    return {
      title: "Emoji Not Found",
      description: "The requested emoji could not be found.",
    };
  }

  const title = `${emojiData.emoji} ${emojiData.description} - Emoji Details`;
  const description = `Learn about the ${emojiData.description} emoji (${emojiData.emoji}). Copy emoji, view shortcodes, Unicode information, and usage examples.`;

  return {
    title,
    description,
    keywords: [
      emojiData.description,
      emojiData.emoji,
      ...emojiData.aliases,
      ...emojiData.tags,
      "emoji copy",
      "unicode emoji",
      "emoji meaning",
    ],
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

export default async function EmojiDetailPage({ params }: EmojiPageProps) {
  const { emoji } = await params;
  const decodedEmoji = decodeURIComponent(emoji);
  const emojis = await getEmojis();

  const emojiData = emojis.find((e: any) => e.emoji === decodedEmoji);

  if (!emojiData) {
    notFound();
  }

  // Get related emojis from the same category
  const relatedEmojis = emojis
    .filter((e: any) => e.category === emojiData.category && e.emoji !== emojiData.emoji)
    .slice(0, 20);

  return <EmojiDetailClient emojiData={emojiData} relatedEmojis={relatedEmojis} />;
}
