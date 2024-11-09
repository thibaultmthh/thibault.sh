import { EmojiPicker } from "./page.client";

async function getEmojis() {
  const response = await fetch(
    "https://raw.githubusercontent.com/github/gemoji/refs/heads/master/db/emoji.json",
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );
  return response.json();
}

export default async function EmojiPage() {
  const emojis = await getEmojis();

  return <EmojiPicker initialEmojis={emojis} />;
}
