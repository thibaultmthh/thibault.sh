import fs from "fs";
import path from "path";

export function readHookFiles(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "components", "hooks", filename);
    const content = fs.readFileSync(filePath, "utf8");

    // Remove import statements
    const contentWithoutImports = content.replace(/^import.*[\r\n]+/gm, "");

    return contentWithoutImports.trim();
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return "";
  }
}
