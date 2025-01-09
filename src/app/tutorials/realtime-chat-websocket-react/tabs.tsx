"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import ChatDemo from "./page.demo";

const FULL_CODE = `import { useState, useEffect, useRef } from 'react';
import { WebSocket } from 'ws';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface WebSocketMessage {
  type: 'message' | 'status';
  payload: any;
}

function useWebSocket(url: string) {
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
}

export default function ChatApp() {
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
}`;

export default function DemoTabsChat() {
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
        {activeTab === "demo" ? <ChatDemo /> : <CodeBlock language="typescript" code={FULL_CODE} />}
      </div>
    </div>
  );
}
