"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("loading");

      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) throw new Error();
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    },
    [email]
  );

  return (
    <div className="mt-8 space-y-4">
      {/* Hire Me Section */}
      <Card className="p-6 border-2 border-dashed border-orange-200 bg-gradient-to-r from-orange-50/50 to-amber-50/50 hover:border-orange-300 transition-colors">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">Available for Freelance</h3>
            <Sparkles className="w-5 h-5 text-orange-500" />
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Fullstack developer specializing in <strong>React</strong>, <strong>Next.js</strong>, and{" "}
            <strong>Node.js</strong>. Let's build something amazing together!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 shadow-md">
              <Link href="mailto:dev@thibault.sh">
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                Contact me
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="hover:bg-gray-50">
                <Link href="https://github.com/thibaultmthh" target="_blank">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="hover:bg-gray-50">
                <Link href="https://www.linkedin.com/in/thibault-mathian/" target="_blank">
                  <LinkedInLogoIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Newsletter Section */}
      <Card className="p-6 bg-gray-50 border-gray-200">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Stay in the loop</h4>
            <p className="text-sm text-gray-600">Get notified about new tools and updates</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 focus:outline-none transition-colors"
                required
                disabled={status === "loading" || status === "success"}
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                variant="outline"
                className="px-4 hover:bg-gray-100"
                size="sm"
              >
                {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
              </Button>
            </div>

            {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            {status === "success" && <p className="text-sm text-green-600 font-medium">Thanks for subscribing! 🎉</p>}
          </form>
        </div>
      </Card>
    </div>
  );
}
