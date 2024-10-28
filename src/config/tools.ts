import { FileText, Code, Calculator, Palette } from "lucide-react";

export const tools = {
  "Text Tools": {
    icon: FileText,
    path: "text",
    items: [
      {
        id: "text-analysis",
        name: "Text Analysis",
        description: "Character count, word count, and more",
        path: "/tools/text/text-analysis",
      },
      {
        id: "formatter",
        name: "Text Formatter",
        description: "Format and beautify text",
        path: "/tools/text/formatter",
      },
      {
        id: "diff-checker",
        name: "Diff Checker",
        description: "Compare text differences",
        path: "/tools/text/diff-checker",
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text case (upper, lower, title)",
        path: "/tools/text/case-converter",
      },
    ],
  },
  "Developer Tools": {
    icon: Code,
    path: "dev",
    items: [
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON",
        path: "/tools/dev/json-formatter",
      },
      {
        id: "base64",
        name: "Base64",
        description: "Encode and decode Base64 strings",
        path: "/tools/dev/base64",
      },
      {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate various hash values",
        path: "/tools/dev/hash-generator",
      },
      {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode and decode URLs",
        path: "/tools/dev/url-encoder",
      },
    ],
  },
  "Design Tools": {
    icon: Palette,
    path: "design",
    items: [
      {
        id: "pattern-generator",
        name: "Pattern Generator",
        description: "Create custom SVG patterns",
        path: "/tools/design/pattern-generator",
      },
      {
        id: "color-palette",
        name: "Color Palette Generator",
        description: "Extract color palettes from images",
        path: "/tools/design/color-palette",
      },
      {
        id: "unit-converter",
        name: "CSS Unit Converter",
        description: "Convert between px, rem, and em",
        path: "/tools/design/unit-converter",
      },
      {
        id: "favicon-generator",
        name: "Favicon Generator",
        description: "Generate multi-platform favicons",
        path: "/tools/design/favicon-generator",
      },
    ],
  },
  Utilities: {
    icon: Calculator,
    path: "utilities",
    items: [
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units",
        path: "/tools/utilities/unit-converter",
      },
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords",
        path: "/tools/utilities/password-generator",
      },
    ],
  },
};
