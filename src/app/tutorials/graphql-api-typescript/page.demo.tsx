"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

interface Message {
  type: "query" | "mutation";
  payload: {
    query: string;
    variables?: Record<string, unknown>;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  posts: string[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// Mock database
const db = {
  users: [
    { id: "1", name: "John Doe", email: "john@example.com", posts: ["1", "2"] },
    { id: "2", name: "Jane Smith", email: "jane@example.com", posts: ["3"] },
  ],
  posts: [
    { id: "1", title: "GraphQL Basics", content: "Introduction to GraphQL...", authorId: "1" },
    { id: "2", title: "Advanced Queries", content: "Deep dive into GraphQL...", authorId: "1" },
    { id: "3", title: "TypeScript Tips", content: "Best practices for TypeScript...", authorId: "2" },
  ],
};

// Mock GraphQL resolver functions
const resolvers = {
  Query: {
    users: () => db.users,
    user: ({ id }: { id: string }) => db.users.find((u) => u.id === id),
    posts: () => db.posts,
    post: ({ id }: { id: string }) => db.posts.find((p) => p.id === id),
  },
  Mutation: {
    createUser: ({ name, email }: { name: string; email: string }) => {
      const user: User = {
        id: String(db.users.length + 1),
        name,
        email,
        posts: [],
      };
      db.users.push(user);
      return user;
    },
    createPost: ({ title, content, authorId }: { title: string; content: string; authorId: string }) => {
      const post: Post = {
        id: String(db.posts.length + 1),
        title,
        content,
        authorId,
      };
      db.posts.push(post);
      const user = db.users.find((u) => u.id === authorId);
      if (user) {
        user.posts.push(post.id);
      }
      return post;
    },
  },
};

export default function GraphQLDemo() {
  const [query, setQuery] = useState(`# Try these example queries:

# Get all users
query {
  users {
    id
    name
    email
  }
}

# Get a specific user with their posts
query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}

# Create a new user
mutation {
  createUser(name: "Alice", email: "alice@example.com") {
    id
    name
    email
  }
}`);
  const [response, setResponse] = useState("# Response will appear here");

  const handleExecute = () => {
    try {
      // Simple query parser (for demo purposes)
      const trimmedQuery = query.trim();
      const isQuery = trimmedQuery.startsWith("query");
      const isMutation = trimmedQuery.startsWith("mutation");

      if (!isQuery && !isMutation) {
        throw new Error("Invalid query format");
      }

      const message: Message = {
        type: isQuery ? "query" : "mutation",
        payload: {
          query: trimmedQuery,
        },
      };

      // Mock response based on the query type
      let result;
      if (message.type === "query") {
        if (trimmedQuery.includes("users")) {
          result = { data: { users: resolvers.Query.users() } };
        } else if (trimmedQuery.includes("user(id:")) {
          const id = "1"; // Hardcoded for demo
          result = { data: { user: resolvers.Query.user({ id }) } };
        }
      } else {
        if (trimmedQuery.includes("createUser")) {
          result = {
            data: {
              createUser: resolvers.Mutation.createUser({
                name: "Alice",
                email: "alice@example.com",
              }),
            },
          };
        }
      }

      setResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-2">Query</h3>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-64 p-2 font-mono text-sm bg-white border rounded"
        />
        <button onClick={handleExecute} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Execute Query
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Response</h3>
        <CodeBlock language="json" code={response} />
      </div>
    </div>
  );
}
