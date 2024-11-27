/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
  }

  try {
    // Using the RDAP (Registration Data Access Protocol) service
    // This is a standardized protocol that replaces WHOIS
    const response = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`);

    if (!response.ok) {
      throw new Error("Domain not found or RDAP service unavailable");
    }

    const data = await response.json();

    // Transform RDAP data into our WhoisData format
    const whoisData = {
      domainName: data.ldhName,
      registrar:
        data.entities?.find((e: { roles: string | string[] }) => e.roles?.includes("registrar"))
          ?.vcardArray?.[1]?.[3]?.[3] || "N/A",
      createdDate: data.events?.find((e: { eventAction: string }) => e.eventAction === "registration")?.eventDate,
      updatedDate: data.events?.find((e: { eventAction: string }) => e.eventAction === "last changed")?.eventDate,
      expiryDate: data.events?.find((e: { eventAction: string }) => e.eventAction === "expiration")?.eventDate,
      nameServers: data.nameservers?.map((ns: { ldhName: any }) => ns.ldhName) || [],
      status: data.status || [],
      rawText: JSON.stringify(data, null, 2),
    };

    return NextResponse.json(whoisData);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch WHOIS data" },
      { status: 500 }
    );
  }
}
