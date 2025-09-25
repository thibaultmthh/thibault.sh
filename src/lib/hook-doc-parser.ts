import { HookDocumentation } from "@/types/hook-doc";

/**
 * Parse hook documentation from various formats
 */
export function parseHookDoc(content: string, format: "json" | "yaml" = "json"): HookDocumentation {
  try {
    if (format === "json") {
      return JSON.parse(content) as HookDocumentation;
    } else {
      // For YAML parsing, we'd need a YAML parser library
      // For now, we'll just support JSON
      throw new Error("YAML parsing not implemented yet. Use JSON format.");
    }
  } catch (error) {
    throw new Error(`Failed to parse hook documentation: ${error}`);
  }
}

/**
 * Load hook documentation from a file path
 */
export async function loadHookDoc(hookName: string): Promise<HookDocumentation | null> {
  try {
    // Try to import the JSON documentation file
    const docModule = await import(`@/docs/hooks/${hookName}.json`);
    return docModule.default as HookDocumentation;
  } catch {
    try {
      // Fallback: try to import from a JS/TS file that exports the doc
      const docModule = await import(`@/docs/hooks/${hookName}.doc.ts`);
      return docModule.default as HookDocumentation;
    } catch {
      return null;
    }
  }
}

/**
 * Validate hook documentation structure
 */
export function validateHookDoc(doc: any): doc is HookDocumentation {
  return (
    typeof doc === "object" &&
    typeof doc.name === "string" &&
    typeof doc.description === "string" &&
    typeof doc.category === "string" &&
    typeof doc.usage === "object" &&
    typeof doc.usage.import === "string" &&
    typeof doc.usage.basic === "string" &&
    typeof doc.api === "object" &&
    typeof doc.api.signature === "string" &&
    typeof doc.api.returns === "object"
  );
}
