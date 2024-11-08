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
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const channel = $("channel").first();
    const items = $("item")
      .map((_, item) => ({
        title: $(item).find("title").first().text(),
        link: $(item).find("link").first().text(),
        description: $(item).find("description").first().text(),
        pubDate: $(item).find("pubDate").first().text(),
        author: $(item).find("author").first().text() || undefined,
        categories: $(item)
          .find("category")
          .map((_, cat) => $(cat).text())
          .get(),
      }))
      .get();

    const feedData = {
      metadata: {
        title: channel.find("title").first().text(),
        description: channel.find("description").first().text(),
        link: channel.find("link").first().text(),
        language: channel.find("language").first().text() || undefined,
        lastBuildDate: channel.find("lastBuildDate").first().text() || undefined,
        generator: channel.find("generator").first().text() || undefined,
      },
      items,
    };

    return NextResponse.json(feedData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch or parse RSS feed" }, { status: 500 });
  }
}
