"use client";

import { useState, useEffect, useRef } from "react";

// Mock data generator for the demo
const generateItems = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, index) => ({
    id: start + index,
    title: `Demo Item ${start + index}`,
    description: `This is a demo item ${start + index} for the infinite scroll tutorial`,
  }));
};

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState(() => generateItems(0, 10));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const loadMore = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const newItems = generateItems(items.length, items.length + 5);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Interactive Demo</h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow-xs hover:shadow-md transition-shadow">
            <h4 className="font-medium text-orange-600">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
        <div ref={loaderRef} className="py-4 text-center text-sm text-gray-500">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              Loading more items...
            </div>
          ) : (
            "Scroll down for more items"
          )}
        </div>
      </div>
    </div>
  );
}
