"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import APITesterDemo from "./page.demo";

const FULL_CODE = `import express from 'express';
import { z } from 'zod';

// Define types
interface User {
  id: number;
  name: string;
  email: string;
}

// Validation schemas
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Error handling middleware
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }
  
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

// Setup Express app
const app = express();
app.use(express.json());

// In-memory database
let users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com' },
];
let nextId = 2;

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users', async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
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

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
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

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users = users.filter(u => u.id !== userId);
  res.status(204).send();
});

// Add error handler
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`;

export default function DemoTabsExpressAPI() {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("demo")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "demo"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          Live Demo
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "code"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          Full Code
        </button>
      </div>
      <div className="p-4">
        {activeTab === "demo" ? <APITesterDemo /> : <CodeBlock language="typescript" code={FULL_CODE} />}
      </div>
    </div>
  );
}
