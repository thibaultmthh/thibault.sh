import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const ogData = {
      title: $('meta[property="og:title"]').attr("content") || $("title").text() || "",
      description:
        $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || "",
      image: $('meta[property="og:image"]').attr("content") || "",
      url: $('meta[property="og:url"]').attr("content") || url,
      siteName: $('meta[property="og:site_name"]').attr("content") || "",
      type: $('meta[property="og:type"]').attr("content") || "website",
    };

    return NextResponse.json(ogData);
  } catch {
    return NextResponse.json({ error: "Failed to fetch OG data" }, { status: 500 });
  }
}
