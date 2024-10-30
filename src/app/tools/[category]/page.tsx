import { Card } from "@/components/ui/card";
import { tools } from "@/config/tools";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the category data based on the path parameter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryEntry = Object.entries(tools).find(([_, data]) => data.path === params.category);

  // If category doesn't exist, show 404
  if (!categoryEntry) {
    notFound();
  }

  const [categoryName, categoryData] = categoryEntry;

  return (
    <div className="p">
      <div className="flex items-center gap-2 mb-4">
        <categoryData.icon className="h-6 w-6" />
        <h1 className="text-3xl font-bold">{categoryName}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoryData.items.map((tool) => (
          <Card key={tool.id} className="p-4 hover:shadow-md transition-shadow">
            <Link href={tool.path} className="block h-full">
              <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-muted-foreground">{tool.description}</p>
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
