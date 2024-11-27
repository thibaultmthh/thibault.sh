import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
  priority?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { domain, recordType } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    let records: DNSRecord[] = [];

    switch (recordType) {
      case "A":
        const aRecords = await dns.resolve4(domain);
        records = aRecords.map((ip) => ({ type: "A", value: ip }));
        break;

      case "AAAA":
        const aaaaRecords = await dns.resolve6(domain);
        records = aaaaRecords.map((ip) => ({ type: "AAAA", value: ip }));
        break;

      case "MX":
        const mxRecords = await dns.resolveMx(domain);
        records = mxRecords.map((record) => ({
          type: "MX",
          value: record.exchange,
          priority: record.priority,
        }));
        break;

      case "TXT":
        const txtRecords = await dns.resolveTxt(domain);
        records = txtRecords.map((txt) => ({
          type: "TXT",
          value: txt.join(" "),
        }));
        break;

      case "NS":
        const nsRecords = await dns.resolveNs(domain);
        records = nsRecords.map((ns) => ({ type: "NS", value: ns }));
        break;

      case "CNAME":
        const cnameRecords = await dns.resolveCname(domain);
        records = cnameRecords.map((cname) => ({
          type: "CNAME",
          value: cname,
        }));
        break;

      case "SOA":
        const soaRecord = await dns.resolveSoa(domain);
        records = [
          {
            type: "SOA",
            value: `${soaRecord.nsname} ${soaRecord.hostmaster}`,
            ttl: soaRecord.refresh,
          },
        ];
        break;

      default:
        return NextResponse.json({ error: "Unsupported record type" }, { status: 400 });
    }

    return NextResponse.json({ records });
  } catch (error) {
    console.error("DNS lookup error:", error);

    // Handle specific DNS errors
    if (error instanceof Error) {
      if (error.message.includes("ENOTFOUND")) {
        return NextResponse.json({ error: "Domain not found" }, { status: 404 });
      }
      if (error.message.includes("SERVFAIL")) {
        return NextResponse.json({ error: "DNS server failed to respond" }, { status: 502 });
      }
    }

    return NextResponse.json({ error: "Failed to perform DNS lookup" }, { status: 500 });
  }
}
