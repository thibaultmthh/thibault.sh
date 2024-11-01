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
        seo: {
          title: "Text Analysis Tool - Count Characters, Words, and More",
          description:
            "Free online text analysis tool. Count characters, words, sentences, and get detailed statistics about your text. Perfect for writers and content creators.",
          keywords: "text analysis, word count, character count, sentence count, text statistics",
        },
      },
      {
        id: "formatter",
        name: "Text Formatter",
        description: "Format and beautify text",
        path: "/tools/text/formatter",
        seo: {
          title: "Text Formatter - Clean and Beautify Text Online",
          description:
            "Format and beautify your text with this free online tool. Remove extra spaces, fix line breaks, and make your text look clean and professional.",
          keywords: "text formatter, text beautifier, clean text, format text, remove extra spaces",
        },
      },
      {
        id: "diff-checker",
        name: "Diff Checker",
        description: "Compare text differences",
        path: "/tools/text/diff-checker",
        seo: {
          title: "Diff Checker - Compare Text Differences Online",
          description:
            "Compare text differences online with this free tool. Find out how your text has changed over time. Perfect for writers and content creators.",
          keywords: "diff checker, text comparison, text differences, online tool, content creation",
        },
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text case (upper, lower, title)",
        path: "/tools/text/case-converter",
        seo: {
          title: "Case Converter - Convert Text Case Online",
          description:
            "Convert text case online with this free tool. Convert text to upper case, lower case, or title case. Perfect for writers and content creators.",
          keywords: "case converter, text case, upper case, lower case, title case",
        },
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
        seo: {
          title: "JSON Formatter - Format and Validate JSON Online",
          description:
            "Format and validate JSON online with this free tool. Convert JSON to a readable format and check its syntax. Perfect for developers and content creators.",
          keywords: "json formatter, json validator, format json, validate json, online tool",
        },
      },
      {
        id: "base64",
        name: "Base64",
        description: "Encode and decode Base64 strings",
        path: "/tools/dev/base64",
        seo: {
          title: "Base64 Encoder/Decoder - Encode and Decode Base64 Strings Online",
          description:
            "Encode and decode Base64 strings online with this free tool. Convert Base64 encoded strings to their original format and vice versa. Perfect for developers and content creators.",
          keywords: "base64 encoder, base64 decoder, encode base64, decode base64, online tool",
        },
      },
      {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate various hash values",
        path: "/tools/dev/hash-generator",
        seo: {
          title: "Hash Generator - Generate Various Hash Values Online",
          description:
            "Generate various hash values online with this free tool. Create secure hash values for your data. Perfect for developers and content creators.",
          keywords: "hash generator, hash values, secure hash, online tool, content creation",
        },
      },
      {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode and decode URLs",
        path: "/tools/dev/url-encoder",
        seo: {
          title: "URL Encoder/Decoder - Encode and Decode URLs Online",
          description:
            "Encode and decode URLs online with this free tool. Convert URLs to their encoded format and vice versa. Perfect for developers and content creators.",
          keywords: "url encoder, url decoder, encode url, decode url, online tool",
        },
      },
      {
        id: "jwt-viewer",
        name: "JWT Viewer",
        description: "Decode and inspect JWT tokens",
        path: "/tools/dev/jwt-viewer",
        seo: {
          title: "JWT Viewer - Decode and Inspect JWT Tokens Online",
          description:
            "Decode and inspect JWT tokens online with this free tool. Analyze JWT tokens and inspect their contents. Perfect for developers and content creators.",
          keywords: "jwt viewer, jwt decoder, inspect jwt, decode jwt, online tool",
        },
      },
      {
        id: "cron-debugger",
        name: "Cron Debugger",
        description: "Debug and test cron expressions",
        path: "/tools/dev/cron-debugger",
        seo: {
          title: "Cron Debugger - Debug and Test Cron Expressions Online",
          description:
            "Debug and test cron expressions online with this free tool. Create and test cron expressions to automate tasks. Perfect for developers and content creators.",
          keywords: "cron debugger, cron expressions, cron automation, online tool, content creation",
        },
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
        seo: {
          title: "Pattern Generator - Create Custom SVG Patterns Online",
          description:
            "Create custom SVG patterns online with this free tool. Design unique patterns and use them in your designs. Perfect for designers and content creators.",
          keywords: "pattern generator, svg patterns, custom patterns, online tool, design",
        },
      },
      {
        id: "color-palette",
        name: "Color Palette Generator",
        description: "Extract color palettes from images",
        path: "/tools/design/color-palette",
        seo: {
          title: "Color Palette Generator - Extract Color Palettes from Images Online",
          description:
            "Extract color palettes from images online with this free tool. Create beautiful color palettes for your designs. Perfect for designers and content creators.",
          keywords: "color palette generator, extract color palettes, color palettes, online tool, design",
        },
      },
      {
        id: "unit-converter",
        name: "CSS Unit Converter",
        description: "Convert between px, rem, and em",
        path: "/tools/design/unit-converter",
        seo: {
          title: "CSS Unit Converter - Convert Between px, rem, and em Online",
          description:
            "Convert between px, rem, and em online with this free tool. Convert CSS units to fit your design needs. Perfect for designers and content creators.",
          keywords: "css unit converter, convert px, convert rem, convert em, online tool, design",
        },
      },
      {
        id: "favicon-generator",
        name: "Favicon Generator",
        description: "Generate multi-platform favicons",
        path: "/tools/design/favicon-generator",
        seo: {
          title: "Favicon Generator - Generate Multi-Platform Favicons Online",
          description:
            "Generate multi-platform favicons online with this free tool. Create favicons for your website and use them across different platforms. Perfect for designers and content creators.",
          keywords: "favicon generator, multi-platform favicons, favicons, online tool, design",
        },
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
        seo: {
          title: "Unit Converter - Convert Between Different Units Online",
          description:
            "Convert between different units online with this free tool. Convert units to fit your needs. Perfect for content creators and marketers.",
          keywords: "unit converter, convert units, different units, online tool, content creation",
        },
      },
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords",
        path: "/tools/utilities/password-generator",
        seo: {
          title: "Password Generator - Generate Secure Passwords Online",
          description:
            "Generate secure passwords online with this free tool. Create strong and unique passwords for your accounts. Perfect for content creators and marketers.",
          keywords: "password generator, secure passwords, unique passwords, online tool, content creation",
        },
      },
    ],
  },
};
