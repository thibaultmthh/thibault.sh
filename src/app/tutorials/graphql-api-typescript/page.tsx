import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsGraphQL from "./tabs";

export default function GraphQLAPITutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Building a GraphQL API with Node.js and TypeScript</h1>

      <div className="prose max-w-none">
        <h2>Why GraphQL?</h2>
        <p>
          REST APIs are great, but GraphQL takes API development to the next level. It lets clients request exactly the
          data they need, reduces over-fetching, and provides a strongly-typed schema. Combined with TypeScript, you get
          end-to-end type safety and amazing developer experience.
        </p>

        <h2>Interactive Demo</h2>
        <p>
          Try out this interactive demo to see how GraphQL queries work. You can execute different queries and see the
          responses:
        </p>

        <div className="my-8">
          <DemoTabsGraphQL />
        </div>

        <h2>Project Setup</h2>
        <p>First, let&apos;s create a new project and install our dependencies:</p>

        <CodeBlock
          language="bash"
          code={`mkdir graphql-api
cd graphql-api
npm init -y
npm install @apollo/server graphql graphql-tag
npm install --save-dev typescript @types/node ts-node-dev`}
        />

        <p>
          Configure TypeScript by creating a <code>tsconfig.json</code>:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}`}
        />

        <h2>Type Definitions</h2>
        <p>
          Create <code>src/types.ts</code> to define our data types:
        </p>

        <CodeBlock
          language="typescript"
          code={`export interface User {
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
}`}
        />

        <h2>Schema Definition</h2>
        <p>
          Create <code>src/schema.ts</code> to define our GraphQL schema:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { gql } from 'graphql-tag';

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
\`;`}
        />

        <h2>Resolvers</h2>
        <p>
          Create <code>src/resolvers.ts</code> to implement our resolver functions:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { User, Post } from './types';

// Mock database
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
    user: (_: never, { id }: { id: string }) => 
      db.users.find(u => u.id === id),
    posts: () => db.posts,
    post: (_: never, { id }: { id: string }) => 
      db.posts.find(p => p.id === id),
  },
  Mutation: {
    createUser: (_: never, { name, email }: { name: string, email: string }) => {
      const user: User = {
        id: String(db.users.length + 1),
        name,
        email,
        posts: [],
      };
      db.users.push(user);
      return user;
    },
    createPost: (_: never, { title, content, authorId }: { title: string, content: string, authorId: string }) => {
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
    posts: (parent: User) => 
      parent.posts.map(id => db.posts.find(p => p.id === id)),
  },
  Post: {
    author: (parent: Post) => 
      db.users.find(u => u.id === parent.authorId),
  },
};`}
        />

        <h2>Server Setup</h2>
        <p>
          Create <code>src/index.ts</code> to set up our Apollo Server:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { ApolloServer } from '@apollo/server';
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

startServer().catch(console.error);`}
        />

        <h2>Running the Server</h2>
        <p>
          Add these scripts to your <code>package.json</code>:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}`}
        />

        <p>Now you can test your API with these example queries:</p>

        <CodeBlock
          language="graphql"
          code={`# Get all users with their posts
query {
  users {
    id
    name
    email
    posts {
      id
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
}

# Create a post
mutation {
  createPost(
    title: "GraphQL is Awesome"
    content: "Here's why..."
    authorId: "1"
  ) {
    id
    title
    author {
      name
    }
  }
}`}
        />

        <h2>Best Practices</h2>
        <h3>1. Schema Design</h3>
        <ul>
          <li>Use clear, descriptive type and field names</li>
          <li>Keep mutations focused and atomic</li>
          <li>Use input types for complex mutations</li>
          <li>Consider pagination for lists</li>
        </ul>

        <h3>2. Type Safety</h3>
        <ul>
          <li>Use TypeScript interfaces that match your GraphQL types</li>
          <li>Generate TypeScript types from your schema</li>
          <li>Use nullability carefully</li>
          <li>Validate input data</li>
        </ul>

        <h3>3. Performance</h3>
        <ul>
          <li>Implement DataLoader for batching and caching</li>
          <li>Use field-level resolvers wisely</li>
          <li>Consider query complexity analysis</li>
          <li>Implement proper error handling</li>
        </ul>

        <h2>Error Handling</h2>
        <p>Add proper error handling to your resolvers:</p>

        <CodeBlock
          language="typescript"
          code={`import { GraphQLError } from 'graphql';

// In your resolver
user: async (_, { id }) => {
  try {
    const user = await db.users.find(u => u.id === id);
    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return user;
  } catch (error) {
    throw new GraphQLError('Failed to fetch user', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }
}`}
        />

        <h2>Authentication</h2>
        <p>Add authentication using context:</p>

        <CodeBlock
          language="typescript"
          code={`// Add to your server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await validateToken(token);
    return { user };
  },
});

// In your resolvers
createPost: async (_, args, context) => {
  if (!context.user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  // Create post...
}`}
        />

        <h2>Next Steps</h2>
        <p>To make your GraphQL API production-ready, consider adding:</p>
        <ul>
          <li>Database integration (e.g., Prisma)</li>
          <li>Authentication and authorization</li>
          <li>Input validation</li>
          <li>Rate limiting</li>
          <li>Monitoring and logging</li>
          <li>API documentation</li>
          <li>Testing</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> Consider using code-generation tools like GraphQL Code Generator to automatically
            generate TypeScript types from your schema. This ensures perfect type safety between your schema and
            resolvers.
          </p>
        </div>
      </div>
    </div>
  );
}
