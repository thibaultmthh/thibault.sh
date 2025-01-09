"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import GraphQLDemo from "./page.demo";

const FULL_CODE = `// src/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  posts: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// src/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
\`;

// src/resolvers.ts
import { User, Post } from './types';

const db = {
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', posts: ['1', '2'] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', posts: ['3'] },
  ],
  posts: [
    { id: '1', title: 'GraphQL Basics', content: 'Introduction to GraphQL...', authorId: '1' },
    { id: '2', title: 'Advanced Queries', content: 'Deep dive into GraphQL...', authorId: '1' },
    { id: '3', title: 'TypeScript Tips', content: 'Best practices for TypeScript...', authorId: '2' },
  ],
};

export const resolvers = {
  Query: {
    users: () => db.users,
    user: ({ id }: { id: string }) => db.users.find(u => u.id === id),
    posts: () => db.posts,
    post: ({ id }: { id: string }) => db.posts.find(p => p.id === id),
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
      const user = db.users.find(u => u.id === authorId);
      if (user) {
        user.posts.push(post.id);
      }
      return post;
    },
  },
  User: {
    posts: (parent: User) => parent.posts.map(id => db.posts.find(p => p.id === id)),
  },
  Post: {
    author: (parent: Post) => db.users.find(u => u.id === parent.authorId),
  },
};

// src/index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(\`🚀 Server ready at \${url}\`);
}

startServer().catch(console.error);`;

export default function DemoTabsGraphQL() {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-4 py-2 rounded ${
            activeTab === "demo" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Live Demo
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`px-4 py-2 rounded ${
            activeTab === "code" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Full Code
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "demo" ? (
          <GraphQLDemo />
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <CodeBlock language="typescript" code={FULL_CODE} />
          </div>
        )}
      </div>
    </div>
  );
}
