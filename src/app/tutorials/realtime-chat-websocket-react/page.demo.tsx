/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

// Simulated WebSocket connection
class MockWebSocket {
  private callbacks: { [key: string]: (data: any) => void } = {};
  private autoReplyTimeout: NodeJS.Timeout | null = null;

  constructor() {
    // Simulate some initial delay
    setTimeout(() => {
      this.trigger("open", {});
    }, 1000);
  }

  send(message: string) {
    const data = JSON.parse(message);
    // Echo the message back with a slight delay
    setTimeout(() => {
      this.trigger("message", {
        data: JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          sender: "Bot",
          content: `Reply to: ${data.content}`,
          timestamp: new Date().toISOString(),
        }),
      });
    }, 500);

    // Simulate auto-replies
    if (this.autoReplyTimeout) {
      clearTimeout(this.autoReplyTimeout);
    }
    this.autoReplyTimeout = setTimeout(() => {
      this.trigger("message", {
        data: JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          sender: "Bot",
          content: "Would you like to know more?",
          timestamp: new Date().toISOString(),
        }),
      });
    }, 3000);
  }

  addEventListener(event: string, callback: (data: any) => void) {
    this.callbacks[event] = callback;
  }

  removeEventListener(event: string) {
    delete this.callbacks[event];
  }

  private trigger(event: string, data: any) {
    if (this.callbacks[event]) {
      this.callbacks[event](data);
    }
  }

  close() {
    if (this.autoReplyTimeout) {
      clearTimeout(this.autoReplyTimeout);
    }
    this.trigger("close", {});
  }
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const wsRef = useRef<MockWebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new MockWebSocket();
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setStatus("connected");
      // Send welcome message
      ws.send(
        JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          sender: "Bot",
          content: "Welcome to the chat! Try sending a message.",
          timestamp: new Date().toISOString(),
        })
      );
    });

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    });

    ws.addEventListener("close", () => {
      setStatus("disconnected");
    });

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || status !== "connected") return;

    const message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    wsRef.current?.send(JSON.stringify(message));
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full">
      <div className="flex flex-col h-[500px]">
        {/* Chat header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Chat Demo</h3>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "connected" ? "bg-green-500" : status === "connecting" ? "bg-yellow-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-500 capitalize">{status}</span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex flex-col ${message.sender === "You" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "You" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="font-medium text-sm mb-1">{message.sender}</div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs mt-1 opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</div>
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
              className="flex-1 resize-none rounded-lg border p-2 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              rows={1}
              disabled={status !== "connected"}
            />
            <button
              onClick={handleSend}
              disabled={status !== "connected"}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
