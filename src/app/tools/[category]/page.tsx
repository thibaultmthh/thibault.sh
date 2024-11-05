import { Card } from "@/components/ui/card";
import { tools } from "@/config/tools";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const categoryEntry = Object.entries(tools).find(([_, data]) => data.path === params.category);

  if (!categoryEntry) {
    notFound();
  }

  const [categoryName, categoryData] = categoryEntry;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-md bg-orange-50">
            <categoryData.icon className="h-5 w-5 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold">{categoryName}</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          {categoryName} tools for developers. Fast, secure, and processed entirely in your browser.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoryData.items.map((tool) => (
          <Card
            key={tool.id}
            className="p-6 border shadow-sm hover:shadow-md transition-all hover:border-orange-500/50"
          >
            <Link href={tool.path} className="block h-full">
              <h2 className="text-xl font-semibold mb-3">{tool.name}</h2>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  return Object.values(tools).map(({ path }) => ({
    category: path,
  }));
}
