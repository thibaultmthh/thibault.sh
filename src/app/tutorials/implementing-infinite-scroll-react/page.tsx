import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsInfinitScroll from "./tabs";

export default function InfiniteScrollTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Simple Infinite Scroll in React - A Beginner&apos;s Guide
      </h1>

      <div className="prose max-w-none">
        <h2>What is Infinite Scroll?</h2>
        <p>
          Infinite scroll is a web design technique where content is continuously loaded as the user scrolls down the
          page. It&apos;s commonly used in social media feeds, search results, and product listings.
        </p>

        <h2>Interactive Demo & Code</h2>
        <p>
          Below you&apos;ll find a working demo of infinite scroll. Toggle between the demo and the complete source code
          to see how it works. Try scrolling to the bottom in the demo to see more items load automatically:
        </p>
      </div>

      <div className="my-8">
        <DemoTabsInfinitScroll />
      </div>

      <div className="prose max-w-none">
        <h2>How It Works</h2>
        <p>Let&apos;s break down the key parts of the implementation:</p>

        <h3>1. Setting Up the State</h3>
        <p>First, we need to set up our component&apos;s state to manage our items and loading state:</p>

        <CodeBlock
          language="typescript"
          code={`const [items, setItems] = useState(() => generateItems(0, 10));
const [loading, setLoading] = useState(false);
const loaderRef = useRef<HTMLDivElement>(null);`}
        />

        <h3>2. Creating the Intersection Observer</h3>
        <p>
          The Intersection Observer API helps us detect when the user has scrolled to the bottom. We set it up in a
          useEffect hook:
        </p>

        <CodeBlock
          language="typescript"
          code={`useEffect(() => {
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
}, [loading]);`}
        />

        <h2>Key Concepts</h2>
        <ul>
          <li>
            <strong>Intersection Observer:</strong> A browser API that tells us when an element becomes visible in the
            viewport
          </li>
          <li>
            <strong>useRef:</strong> Used to maintain a reference to the loader element
          </li>
          <li>
            <strong>useState:</strong> Manages our list of items and loading state
          </li>
          <li>
            <strong>useEffect:</strong> Sets up and cleans up the observer
          </li>
        </ul>

        <h2>Making It Production-Ready</h2>
        <p>To make this implementation production-ready, consider adding:</p>
        <ul>
          <li>Error handling for failed API requests</li>
          <li>A loading skeleton or placeholder while items load</li>
          <li>Debouncing to prevent too many API calls</li>
          <li>Virtual scrolling for very large lists</li>
          <li>End of content detection</li>
        </ul>

        <h2>Example with Error Handling</h2>
        <p>Here&apos;s how you might add error handling to the implementation:</p>

        <CodeBlock
          language="typescript"
          code={`const [error, setError] = useState<Error | null>(null);

const loadMore = async () => {
  if (loading) return;
  
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(\`/api/items?page=\${page}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    
    const newItems = await response.json();
    setItems(prev => [...prev, ...newItems]);
  } catch (err) {
    setError(err instanceof Error ? err : new Error('Failed to load items'));
  } finally {
    setLoading(false);
  }
};`}
        />

        <h2>Conclusion</h2>
        <p>You now have a basic understanding of how to implement infinite scroll in React! This implementation is:</p>
        <ul>
          <li>Easy to understand and modify</li>
          <li>Performant using Intersection Observer</li>
          <li>Suitable for most basic use cases</li>
        </ul>
        <p>
          Remember to adapt the code based on your specific needs and add appropriate error handling and loading states
          for a better user experience.
        </p>
      </div>
    </div>
  );
}
