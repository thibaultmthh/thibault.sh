import { notFound } from "next/navigation";
import HookDocRenderer from "@/components/HookDocRenderer";
import { getHookDoc, getAllHookSlugs } from "@/config/hook-registry";

interface HookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HookPage({ params }: HookPageProps) {
  const hookDoc = getHookDoc((await params).slug);

  if (!hookDoc) {
    notFound();
  }

  return <HookDocRenderer doc={hookDoc} />;
}

// Generate static params for all hooks
export function generateStaticParams() {
  return getAllHookSlugs().map((slug) => ({
    slug,
  }));
}
