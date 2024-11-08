import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent": "Security-Headers-Analyzer/1.0",
      },
    });

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    return NextResponse.json(headers);
  } catch {
    return NextResponse.json({ error: "Failed to fetch headers" }, { status: 500 });
  }
}
