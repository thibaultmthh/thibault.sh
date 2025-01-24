import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send to Discord webhook
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🔔 New Newsletter Subscription",
            description: `Email: ${email}`,
            color: 0xffa500, // Orange color
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send to Discord");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 });
  }
}
