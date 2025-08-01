import { notFound } from "next/navigation";
import { Metadata } from "next";
import ConversionClient from "./page.client";

type Unit = "bit" | "byte" | "kb" | "mb" | "gb" | "tb" | "pb" | "eb" | "zb" | "yb";

interface UnitInfo {
  name: string;
  symbol: string;
  binaryMultiplier: number;
  decimalMultiplier: number;
  description: string;
}

const UNITS: Record<Unit, UnitInfo> = {
  bit: {
    name: "Bit",
    symbol: "bit",
    binaryMultiplier: 1 / 8,
    decimalMultiplier: 1 / 8,
    description: "Smallest unit of data",
  },
  byte: {
    name: "Byte",
    symbol: "B",
    binaryMultiplier: 1,
    decimalMultiplier: 1,
    description: "8 bits",
  },
  kb: {
    name: "Kilobyte",
    symbol: "KB",
    binaryMultiplier: 1024,
    decimalMultiplier: 1000,
    description: "1024 bytes (binary) / 1000 bytes (decimal)",
  },
  mb: {
    name: "Megabyte",
    symbol: "MB",
    binaryMultiplier: 1024 ** 2,
    decimalMultiplier: 1000 ** 2,
    description: "1024² bytes (binary) / 1000² bytes (decimal)",
  },
  gb: {
    name: "Gigabyte",
    symbol: "GB",
    binaryMultiplier: 1024 ** 3,
    decimalMultiplier: 1000 ** 3,
    description: "1024³ bytes (binary) / 1000³ bytes (decimal)",
  },
  tb: {
    name: "Terabyte",
    symbol: "TB",
    binaryMultiplier: 1024 ** 4,
    decimalMultiplier: 1000 ** 4,
    description: "1024⁴ bytes (binary) / 1000⁴ bytes (decimal)",
  },
  pb: {
    name: "Petabyte",
    symbol: "PB",
    binaryMultiplier: 1024 ** 5,
    decimalMultiplier: 1000 ** 5,
    description: "1024⁵ bytes (binary) / 1000⁵ bytes (decimal)",
  },
  eb: {
    name: "Exabyte",
    symbol: "EB",
    binaryMultiplier: 1024 ** 6,
    decimalMultiplier: 1000 ** 6,
    description: "1024⁶ bytes (binary) / 1000⁶ bytes (decimal)",
  },
  zb: {
    name: "Zettabyte",
    symbol: "ZB",
    binaryMultiplier: 1024 ** 7,
    decimalMultiplier: 1000 ** 7,
    description: "1024⁷ bytes (binary) / 1000⁷ bytes (decimal)",
  },
  yb: {
    name: "Yottabyte",
    symbol: "YB",
    binaryMultiplier: 1024 ** 8,
    decimalMultiplier: 1000 ** 8,
    description: "1024⁸ bytes (binary) / 1000⁸ bytes (decimal)",
  },
};

interface ConversionPageProps {
  params: Promise<{
    conversion: string;
  }>;
}

function parseConversionUrl(conversion: string): { from: Unit; to: Unit } | null {
  const match = conversion.match(/^([a-z]+)-to-([a-z]+)$/);
  if (!match) return null;

  const [, from, to] = match;
  const validUnits = Object.keys(UNITS) as Unit[];

  if (!validUnits.includes(from as Unit) || !validUnits.includes(to as Unit)) {
    return null;
  }

  return { from: from as Unit, to: to as Unit };
}

export async function generateMetadata({ params }: ConversionPageProps): Promise<Metadata> {
  const { conversion } = await params;
  const parsedConversion = parseConversionUrl(conversion);

  if (!parsedConversion) {
    return {
      title: "Invalid Conversion",
      description: "The requested conversion is not valid.",
    };
  }

  const { from, to } = parsedConversion;
  const fromUnit = UNITS[from];
  const toUnit = UNITS[to];

  const title = `Convert ${fromUnit.name} to ${toUnit.name} - Data Size Converter`;
  const description = `Convert ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}) with precision. Fast and accurate data size conversion tool with binary and decimal calculations.`;

  return {
    title,
    description,
    keywords: [
      `${fromUnit.name} to ${toUnit.name}`,
      `${fromUnit.symbol} to ${toUnit.symbol}`,
      "data size converter",
      "storage converter",
      "byte converter",
      "binary conversion",
      "decimal conversion",
      from,
      to,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ConversionPage({ params }: ConversionPageProps) {
  const { conversion } = await params;
  const parsedConversion = parseConversionUrl(conversion);

  if (!parsedConversion) {
    notFound();
  }

  const { from, to } = parsedConversion;

  return <ConversionClient from={from} to={to} />;
}
