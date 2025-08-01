import { notFound } from "next/navigation";
import { Metadata } from "next";
import ConversionClient from "./page.client";

const unitTypes = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeters", rate: 1 },
      cm: { name: "Centimeters", rate: 10 },
      m: { name: "Meters", rate: 1000 },
      km: { name: "Kilometers", rate: 1000000 },
      in: { name: "Inches", rate: 25.4 },
      ft: { name: "Feet", rate: 304.8 },
      yd: { name: "Yards", rate: 914.4 },
      mi: { name: "Miles", rate: 1609344 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      mg: { name: "Milligrams", rate: 1 },
      g: { name: "Grams", rate: 1000 },
      kg: { name: "Kilograms", rate: 1000000 },
      oz: { name: "Ounces", rate: 28349.523125 },
      lb: { name: "Pounds", rate: 453592.37 },
      t: { name: "Metric Tons", rate: 1000000000 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", rate: 1 },
      f: { name: "Fahrenheit", rate: 1 },
      k: { name: "Kelvin", rate: 1 },
    },
  },
  area: {
    name: "Area",
    units: {
      mm2: { name: "Square Millimeters", rate: 1 },
      cm2: { name: "Square Centimeters", rate: 100 },
      m2: { name: "Square Meters", rate: 1000000 },
      km2: { name: "Square Kilometers", rate: 1000000000000 },
      in2: { name: "Square Inches", rate: 645.16 },
      ft2: { name: "Square Feet", rate: 92903.04 },
      ac: { name: "Acres", rate: 4046856422.4 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliters", rate: 1 },
      l: { name: "Liters", rate: 1000 },
      m3: { name: "Cubic Meters", rate: 1000000 },
      gal: { name: "Gallons (US)", rate: 3785.411784 },
      qt: { name: "Quarts (US)", rate: 946.352946 },
      pt: { name: "Pints (US)", rate: 473.176473 },
      fl_oz: { name: "Fluid Ounces (US)", rate: 29.5735295625 },
    },
  },
};

interface ConversionPageProps {
  params: Promise<{
    type: string;
    conversion: string;
  }>;
}

function parseConversionUrl(type: string, conversion: string): { from: string; to: string } | null {
  const match = conversion.match(/^([a-z0-9_]+)-to-([a-z0-9_]+)$/);
  if (!match) return null;

  const [, from, to] = match;

  if (!unitTypes[type as keyof typeof unitTypes]) return null;

  const typeUnits = unitTypes[type as keyof typeof unitTypes].units;
  // @ts-expect-error --ok
  if (!typeUnits[from] || !typeUnits[to]) return null;

  return { from, to };
}

export async function generateMetadata({ params }: ConversionPageProps): Promise<Metadata> {
  const { type, conversion } = await params;
  const parsedConversion = parseConversionUrl(type, conversion);

  if (!parsedConversion || !unitTypes[type as keyof typeof unitTypes]) {
    return {
      title: "Invalid Conversion",
      description: "The requested conversion is not valid.",
    };
  }

  const { from, to } = parsedConversion;
  const typeInfo = unitTypes[type as keyof typeof unitTypes];

  const units = typeInfo.units as Record<string, { name: string; rate: number }>;
  const fromUnit = units[from];
  const toUnit = units[to];

  const title = `Convert ${fromUnit.name} to ${toUnit.name} - ${typeInfo.name} Converter`;
  const description = `Convert ${fromUnit.name} to ${toUnit.name} with precision. Fast and accurate ${typeInfo.name.toLowerCase()} conversion tool with instant results.`;

  return {
    title,
    description,
    keywords: [
      `${fromUnit.name} to ${toUnit.name}`,
      `${from} to ${to}`,
      `${typeInfo.name.toLowerCase()} converter`,
      "unit converter",
      "measurement conversion",
      from,
      to,
      type,
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
  const { type, conversion } = await params;
  const parsedConversion = parseConversionUrl(type, conversion);

  if (!parsedConversion || !unitTypes[type as keyof typeof unitTypes]) {
    notFound();
  }

  const { from, to } = parsedConversion;
  const typeInfo = unitTypes[type as keyof typeof unitTypes];

  return <ConversionClient type={type} from={from} to={to} typeInfo={typeInfo} />;
}
