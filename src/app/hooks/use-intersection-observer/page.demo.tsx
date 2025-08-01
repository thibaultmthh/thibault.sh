/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";
import { useRef, useState } from "react";

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(imageRef as React.RefObject<HTMLElement>, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });
  const isVisible = entry?.isIntersecting;

  return (
    <div ref={imageRef} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
      {isVisible ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}

function AnimatedCard({ index }: { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(cardRef as React.RefObject<HTMLElement>, { threshold: 0.2 });
  const isVisible = entry?.isIntersecting;

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-lg border bg-linear-to-br from-orange-50 to-orange-100"
      style={{
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        opacity: isVisible ? 1 : 0,
        transition: "all 0.5s ease-out",
      }}
    >
      <h3 className="text-lg font-semibold text-orange-600 mb-2">Card {index}</h3>
      <p className="text-muted-foreground">
        This card animates when it enters the viewport. Try scrolling up and down to see the effect.
      </p>
    </div>
  );
}

export function IntersectionObserverDemo() {
  const [loadMore, setLoadMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(loaderRef as React.RefObject<HTMLElement>, { threshold: 0.5 });

  // Trigger load more when loader is visible
  if (entry?.isIntersecting && !loadMore) {
    setLoadMore(true);
  }

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Lazy Loading Images</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <LazyImage src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba" alt="Example image 1" />
            <LazyImage src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba" alt="Example image 2" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Scroll Animations</h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <AnimatedCard key={i} index={i + 1} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">3. Infinite Scroll</h3>
          <div className="space-y-4">
            {Array.from({ length: loadMore ? 6 : 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded border bg-orange-50/50">
                <div className="font-medium">Item {i + 1}</div>
                <div className="text-sm text-muted-foreground">Scroll down to load more items automatically.</div>
              </div>
            ))}

            <div ref={loaderRef} className="py-8 text-center text-sm text-muted-foreground">
              {loadMore ? (
                "All items loaded"
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";
import { useRef, useState } from "react";

// Example 1: Lazy Loading Images
function LazyImage({ src, alt }) {
  const imageRef = useRef(null);
  const entry = useIntersectionObserver(imageRef, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <div ref={imageRef}>
      {entry?.isIntersecting && (
        <img src={src} alt={alt} loading="lazy" />
      )}
    </div>
  );
}

// Example 2: Scroll Animations
function AnimatedCard() {
  const cardRef = useRef(null);
  const entry = useIntersectionObserver(cardRef, {
    threshold: 0.2,
  });

  return (
    <div
      ref={cardRef}
      style={{
        transform: \`translateY(\${entry?.isIntersecting ? 0 : 20}px)\`,
        opacity: entry?.isIntersecting ? 1 : 0,
        transition: "all 0.5s ease-out",
      }}
    >
      Card content
    </div>
  );
}

// Example 3: Infinite Scroll
function InfiniteList() {
  const [loadMore, setLoadMore] = useState(false);
  const loaderRef = useRef(null);
  const entry = useIntersectionObserver(loaderRef, {
    threshold: 0.5,
  });

  if (entry?.isIntersecting && !loadMore) {
    setLoadMore(true);
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
      <div ref={loaderRef}>
        {loadMore ? "All items loaded" : "Loading..."}
      </div>
    </div>
  );
}`;
