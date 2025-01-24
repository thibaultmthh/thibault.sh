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
    <Card className="p-4 sm:p-8 mt-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 space-y-4 md:space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-orange-800">Need a Fullstack Developer?</h3>
            </div>
            <p className="text-sm sm:text-base text-orange-700/80">
              I&apos;m available for freelance projects. Specialized in React, Next.js, and Node.js. Let&apos;s build
              something amazing together!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button asChild variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
              <Link href="mailto:dev@thibault.sh">
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                Hire me
              </Link>
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-orange-200 hover:bg-orange-100 flex-1 sm:flex-initial"
              >
                <Link href="https://github.com/thibaultmthh" target="_blank">
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-orange-200 hover:bg-orange-100 flex-1 sm:flex-initial"
              >
                <Link href="https://www.linkedin.com/in/thibault-mathian/" target="_blank">
                  <LinkedInLogoIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 md:space-y-4 border-t md:border-t-0 md:border-l border-orange-200/50 pt-4 md:pt-0 md:pl-8">
          <div>
            <h4 className="font-semibold text-orange-800 mb-1">Stay Updated</h4>
            <p className="text-sm text-orange-700/80">
              Get notified about new tools, tutorials, and freelance availability.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full flex-1 px-3 py-2 text-sm rounded-md border border-orange-200 bg-white/80 placeholder:text-orange-300 focus:border-orange-300 focus:ring-orange-300"
                required
                disabled={status === "loading" || status === "success"}
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
                size="sm"
              >
                {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
              </Button>
            </div>
            {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            {status === "success" && <p className="text-sm text-orange-600">Thanks for subscribing! 🎉</p>}
          </form>
        </div>
      </div>
    </Card>
  );
}
