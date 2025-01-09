import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsChat from "./tabs";

export default function RealtimeChatTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Building a Real-time Chat App with WebSocket and React
      </h1>

      <div className="prose max-w-none">
        <h2>Why WebSocket?</h2>
        <p>
          When building real-time applications like chat, traditional HTTP request-response isn&apos;t enough. WebSocket
          provides a persistent connection between client and server, enabling instant message delivery and better
          performance. Let&apos;s build a chat app that showcases these benefits!
        </p>

        <h2>Interactive Demo</h2>
        <p>
          Try out this interactive demo to see how the chat app works. You can send messages and see them appear in
          real-time:
        </p>

        <div className="my-8">
          <DemoTabsChat />
        </div>

        <h2>Project Setup</h2>
        <p>First, let&apos;s create a new React project and install our dependencies:</p>

        <CodeBlock
          language="bash"
          code={`npx create-react-app chat-app --template typescript
cd chat-app
npm install ws @types/ws`}
        />

        <h2>Building the WebSocket Server</h2>
        <p>
          Create a new file <code>server.ts</code> for our WebSocket server:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  id: string;
  ws: WebSocket;
}

interface Message {
  type: 'message' | 'status';
  payload: any;
}

const wss = new WebSocketServer({ port: 8080 });
const clients: Client[] = [];

wss.on('connection', (ws) => {
  const client: Client = {
    id: uuidv4(),
    ws,
  };
  clients.push(client);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'message',
    payload: {
      id: uuidv4(),
      sender: 'System',
      content: 'Welcome to the chat!',
      timestamp: new Date().toISOString(),
    },
  }));

  // Broadcast to others that someone joined
  broadcast({
    type: 'message',
    payload: {
      id: uuidv4(),
      sender: 'System',
      content: 'A new user joined the chat',
      timestamp: new Date().toISOString(),
    },
  }, client.id);

  ws.on('message', (data) => {
    try {
      const message: Message = JSON.parse(data.toString());
      broadcast(message, client.id);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });

  ws.on('close', () => {
    const index = clients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      clients.splice(index, 1);
      broadcast({
        type: 'message',
        payload: {
          id: uuidv4(),
          sender: 'System',
          content: 'A user left the chat',
          timestamp: new Date().toISOString(),
        },
      });
    }
  });
});

function broadcast(message: Message, senderId?: string) {
  const data = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.id !== senderId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  });
}

console.log('WebSocket server running on ws://localhost:8080');`}
        />

        <h2>Creating a Custom Hook</h2>
        <p>
          Let&apos;s create a custom hook to manage our WebSocket connection. Create{" "}
          <code>src/hooks/useWebSocket.ts</code>:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface WebSocketMessage {
  type: 'message' | 'status';
  payload: Message;
}

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      setStatus('connected');
    });

    ws.addEventListener('message', (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data.payload]);
      }
    });

    ws.addEventListener('close', () => {
      setStatus('disconnected');
    });

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'You',
        content,
        timestamp: new Date().toISOString(),
      };

      wsRef.current.send(JSON.stringify({
        type: 'message',
        payload: message,
      }));

      setMessages(prev => [...prev, message]);
    }
  };

  return { messages, status, sendMessage };
}`}
        />

        <h2>Building the Chat UI</h2>
        <p>
          Now let&apos;s create our chat component in <code>src/components/Chat.tsx</code>:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, status, sendMessage } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || status !== 'connected') return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      {/* Chat header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Chat</h3>
          <div className="flex items-center gap-2">
            <div className={\`w-2 h-2 rounded-full \${
              status === 'connected'
                ? 'bg-green-500'
                : status === 'connecting'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }\`} />
            <span className="text-sm text-gray-500 capitalize">{status}</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex flex-col \${
              message.sender === 'You' ? 'items-end' : 'items-start'
            }\`}
          >
            <div className={\`max-w-[80%] rounded-lg p-3 \${
              message.sender === 'You'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }\`}>
              <div className="font-medium text-sm mb-1">{message.sender}</div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs mt-1 opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 resize-none rounded-lg border p-2"
            rows={1}
            disabled={status !== 'connected'}
          />
          <button
            onClick={handleSend}
            disabled={status !== 'connected'}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg
              hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}`}
        />

        <h2>Error Handling</h2>
        <p>Let&apos;s add some error handling to our WebSocket hook:</p>

        <CodeBlock
          language="typescript"
          code={`// Add to useWebSocket.ts
ws.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
  setStatus('disconnected');
});

// Add reconnection logic
useEffect(() => {
  let reconnectTimeout: NodeJS.Timeout;

  const tryReconnect = () => {
    if (status === 'disconnected') {
      reconnectTimeout = setTimeout(() => {
        console.log('Attempting to reconnect...');
        const ws = new WebSocket(url);
        wsRef.current = ws;
        // ... setup event listeners
      }, 5000);
    }
  };

  if (status === 'disconnected') {
    tryReconnect();
  }

  return () => {
    clearTimeout(reconnectTimeout);
  };
}, [status, url]);`}
        />

        <h2>Best Practices</h2>
        <h3>1. Connection Management</h3>
        <ul>
          <li>Always clean up WebSocket connections when components unmount</li>
          <li>Implement reconnection logic for better reliability</li>
          <li>Handle connection state properly (connecting, connected, disconnected)</li>
          <li>Add heartbeat mechanism to detect stale connections</li>
        </ul>

        <h3>2. Message Handling</h3>
        <ul>
          <li>Validate message format on both client and server</li>
          <li>Implement proper error handling for malformed messages</li>
          <li>Consider message queuing for offline support</li>
          <li>Add message delivery confirmation</li>
        </ul>

        <h3>3. Performance</h3>
        <ul>
          <li>Implement message batching for bulk operations</li>
          <li>Use message compression for large payloads</li>
          <li>Implement pagination for message history</li>
          <li>Optimize re-renders with proper React patterns</li>
        </ul>

        <h2>Security Considerations</h2>
        <ul>
          <li>Implement proper authentication</li>
          <li>Use secure WebSocket connections (wss://)</li>
          <li>Validate and sanitize all messages</li>
          <li>Implement rate limiting</li>
          <li>Add CSRF protection</li>
        </ul>

        <h2>Next Steps</h2>
        <p>To make this chat app production-ready, consider adding:</p>
        <ul>
          <li>User authentication and private messages</li>
          <li>Message persistence with a database</li>
          <li>File sharing capabilities</li>
          <li>Read receipts</li>
          <li>Typing indicators</li>
          <li>Message reactions</li>
          <li>Group chat support</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> Consider using libraries like Socket.IO for more advanced features and better
            browser compatibility. It provides automatic reconnection, room support, and fallback to long polling when
            WebSocket isn&apos;t available.
          </p>
        </div>
      </div>
    </div>
  );
}
