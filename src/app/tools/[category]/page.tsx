import { tools } from "@/config/tools";
import { notFound } from "next/navigation";
import { CategoryPageClient } from "./page.client";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryEntry = Object.entries(tools).find(([_, data]) => data.path === params.category);

  if (!categoryEntry) {
    notFound();
  }

  const [categoryName, categoryData] = categoryEntry;

  return <CategoryPageClient categoryName={categoryName} categoryPath={categoryData.path} />;
}

// Generate static params for all categories
export function generateStaticParams() {
  return Object.values(tools).map(({ path }) => ({
    category: path,
  }));
}
