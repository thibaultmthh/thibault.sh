import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tempo Tap - Online BPM Counter & Music Tempo Finder",
  description:
    "Free online tool to find the tempo (BPM) of any song by tapping along. Perfect for musicians, DJs, dancers, and music producers. Features a visual rhythm indicator and accurate BPM counter.",
  keywords: [
    "bpm counter",
    "tempo finder",
    "music tempo",
    "rhythm calculator",
    "beats per minute",
    "tempo detector",
    "music bpm",
    "tap tempo",
    "metronome",
    "song tempo",
    "music speed",
    "dj tools",
    "music production",
    "dance tempo",
    "rhythm finder",
  ].join(", "),
  openGraph: {
    title: "Tempo Tap - Online BPM Counter & Music Tempo Finder",
    description:
      "Find the exact tempo of any song instantly. Free online BPM counter with visual feedback - perfect for musicians, DJs, and dancers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo Tap - Online BPM Counter",
    description: "Find any song's tempo instantly with this free online BPM counter",
  },
  alternates: {
    canonical: "https://thibault.sh/apps/tempo-tap",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
