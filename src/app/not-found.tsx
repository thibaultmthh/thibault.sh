"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "404: Page not found";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-mono">
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center gap-2 mb-8 text-orange-500">
          <Terminal className="w-5 h-5" />
          <span className="text-sm">thibault.sh ~ error</span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">→ status --check</div>
            <h1 className="text-4xl font-bold text-orange-500 mb-2 flex items-center">
              {text}
              <span className="w-3 h-8 bg-orange-500/50 ml-2 animate-pulse" />
            </h1>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              The requested page could not be found. It might have been moved, deleted, or never existed.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => router.back()} variant="outline" className="text-orange-500 hover:text-orange-600">
                cd ..
                <br />
                <span className="text-[#858585]">Go back</span>
              </Button>
              <Button onClick={() => router.push("/")}>
                cd ~
                <br />
                <span>Return home</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-2 text-gray-500">
          <span>→</span>
          <div className="w-3 h-6 bg-orange-500/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
