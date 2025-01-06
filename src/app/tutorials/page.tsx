import Link from "next/link";
import { tutorials } from "@/config/tutorials";

export default function TutorialsPage() {
  return (
    <div className="relative bg-white text-gray-800 font-mono">
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Tutorials</h1>
        <div className="space-y-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              href={`/tutorials/${tutorial.id}`}
              className="block bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-orange-600">{tutorial.title}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    tutorial.difficulty === "beginner"
                      ? "bg-green-100 text-green-800"
                      : tutorial.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {tutorial.difficulty}
                </span>
              </div>
              <div className="text-gray-500 text-xs mb-3 flex gap-2">
                <span>
                  {new Date(tutorial.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{tutorial.category}</span>
              </div>
              <p className="text-gray-700 text-sm">{tutorial.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
