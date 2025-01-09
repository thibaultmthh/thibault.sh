import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsExpressAPI from "./tabs";

export default function ExpressTypeScriptAPITutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Building a REST API with Express and TypeScript</h1>

      <div className="prose max-w-none">
        <h2>Why TypeScript for APIs?</h2>
        <p>
          Building APIs with Express is great, but add TypeScript and it gets even better. You get type safety, better
          IDE support, and catch errors before they hit production. Let&apos;s build a fully typed REST API with proper
          error handling and validation.
        </p>

        <h2>Interactive Demo</h2>
        <p>
          Before we dive in, try out this interactive demo. It simulates the API we&apos;ll build, letting you test
          different HTTP methods and see how they work:
        </p>

        <div className="my-8">
          <DemoTabsExpressAPI />
        </div>

        <h2>Setting Up the Project</h2>
        <p>First, let&apos;s create a new project and install our dependencies:</p>

        <CodeBlock
          language="bash"
          code={`mkdir express-ts-api
cd express-ts-api
npm init -y
npm install express zod
npm install --save-dev typescript @types/express @types/node ts-node-dev`}
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

        <h2>Project Structure</h2>
        <p>Let&apos;s organize our code properly:</p>

        <CodeBlock
          language="bash"
          code={`src/
  ├── types/       # Type definitions
  ├── middleware/  # Custom middleware
  ├── routes/      # Route handlers
  ├── validators/  # Request validation
  └── index.ts     # Main app file`}
        />

        <h2>Type Definitions</h2>
        <p>
          Create <code>src/types/user.ts</code> to define our data types:
        </p>

        <CodeBlock
          language="typescript"
          code={`export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}`}
        />

        <h2>Request Validation</h2>
        <p>
          We&apos;ll use Zod for request validation. Create <code>src/validators/user.ts</code>:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export const updateUserSchema = createUserSchema.partial();

// Type inference
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;`}
        />

        <h2>Error Handling Middleware</h2>
        <p>
          Create <code>src/middleware/error.ts</code> to handle different types of errors:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};`}
        />

        <h2>Route Handlers</h2>
        <p>
          Create <code>src/routes/users.ts</code> for our user routes:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { Router } from 'express';
import { createUserSchema, updateUserSchema } from '../validators/user';
import { User } from '../types/user';

const router = Router();

// In-memory database
let users: User[] = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const newUser: User = {
      id: nextId++,
      ...validatedData,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...validatedData,
    };
    
    res.json(users[userIndex]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users = users.filter(u => u.id !== userId);
  res.status(204).send();
});

export default router;`}
        />

        <h2>Putting It All Together</h2>
        <p>
          Finally, create <code>src/index.ts</code> to set up our Express app:
        </p>

        <CodeBlock
          language="typescript"
          code={`import express from 'express';
import userRoutes from './routes/users';
import { errorHandler } from './middleware/error';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}
        />

        <h2>Testing the API</h2>
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

        <p>Now you can test your API with curl or Postman:</p>

        <CodeBlock
          language="bash"
          code={`# Create a user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all users
curl http://localhost:3000/api/users

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Smith"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1`}
        />

        <h2>Best Practices</h2>
        <h3>1. Error Handling</h3>
        <ul>
          <li>Use custom error classes for different types of errors</li>
          <li>Always validate input data</li>
          <li>Return consistent error responses</li>
          <li>Log errors properly</li>
        </ul>

        <h3>2. Type Safety</h3>
        <ul>
          <li>Use TypeScript&apos;s strict mode</li>
          <li>Define interfaces for all data structures</li>
          <li>Use type inference where possible</li>
          <li>Validate runtime data against your types</li>
        </ul>

        <h3>3. API Design</h3>
        <ul>
          <li>Use proper HTTP methods and status codes</li>
          <li>Version your API</li>
          <li>Use meaningful route names</li>
          <li>Document your API</li>
        </ul>

        <h2>Next Steps</h2>
        <p>To make this API production-ready, consider adding:</p>
        <ul>
          <li>Authentication and authorization</li>
          <li>Rate limiting</li>
          <li>Request logging</li>
          <li>Database integration</li>
          <li>API documentation (e.g., with Swagger)</li>
          <li>Environment configuration</li>
          <li>Tests</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> Consider using a dependency injection container like <code>tsyringe</code> for
            better testability and maintainability in larger applications.
          </p>
        </div>
      </div>
    </div>
  );
}
