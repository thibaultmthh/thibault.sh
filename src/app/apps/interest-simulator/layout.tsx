import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Interest Simulator",
  description:
    "Visualize compound interest and investment growth over time with interactive charts and customizable parameters.",
  keywords: "investment calculator, compound interest, financial planning, investment simulator",
  openGraph: {
    title: "Investment Interest Simulator",
    description: "Plan your investments and visualize compound interest growth",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
