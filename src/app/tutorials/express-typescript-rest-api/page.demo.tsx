/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestState = "idle" | "loading" | "success" | "error";

interface RequestConfig {
  method: RequestMethod;
  endpoint: string;
  body?: string;
}

interface ResponseData {
  id?: number;
  name?: string;
  email?: string;
  error?: string;
}

interface Response {
  status: number;
  data: ResponseData | ResponseData[];
}

// Simulated API responses
const mockAPI = async (config: RequestConfig): Promise<Response> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  const endpoints: Record<string, any> = {
    "/api/users": {
      GET: {
        status: 200,
        data: [
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
        ],
      },
      POST: { status: 201, data: { id: 3, name: JSON.parse(config.body || "{}").name } },
    },
    "/api/users/1": {
      GET: { status: 200, data: { id: 1, name: "John", email: "john@example.com" } },
      PUT: { status: 200, data: { id: 1, name: JSON.parse(config.body || "{}").name } },
      DELETE: { status: 204, data: null },
    },
  };

  const response = endpoints[config.endpoint]?.[config.method];
  if (!response) {
    return { status: 404, data: { error: "Not found" } };
  }

  return response;
};

export default function APITesterDemo() {
  const [method, setMethod] = useState<RequestMethod>("GET");
  const [endpoint, setEndpoint] = useState("/api/users");
  const [requestBody, setRequestBody] = useState('{\n  "name": "Alice"\n}');
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [response, setResponse] = useState<Response | null>(null);

  const handleRequest = async () => {
    setRequestState("loading");
    try {
      const config: RequestConfig = {
        method,
        endpoint,
        body: ["POST", "PUT"].includes(method) ? requestBody : undefined,
      };
      const result = await mockAPI(config);
      setResponse(result);
      setRequestState("success");
    } catch {
      setResponse({ status: 500, data: { error: "Internal server error" } });
      setRequestState("error");
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">API Tester</h3>
          <p className="text-sm text-gray-600 mb-4">
            Try different HTTP methods and endpoints to see how a REST API works. This is a simulated API for
            demonstration.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as RequestMethod)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="/api/users">/api/users</option>
                <option value="/api/users/1">/api/users/1</option>
              </select>
            </div>
          </div>

          {["POST", "PUT"].includes(method) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Body (JSON)</label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-32 px-3 py-2 border rounded-md font-mono text-sm"
                placeholder="Enter JSON request body"
              />
            </div>
          )}

          <button
            onClick={handleRequest}
            disabled={requestState === "loading"}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              requestState === "loading"
                ? "bg-gray-400"
                : requestState === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-orange-600 hover:bg-orange-700"
            } transition-colors`}
          >
            {requestState === "loading" ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Request...
              </div>
            ) : (
              "Send Request"
            )}
          </button>
        </div>

        {response && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  response.status >= 200 && response.status < 300
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {response.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
