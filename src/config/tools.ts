import { FileText, Code, Calculator, Palette, Wallet, Network } from "lucide-react";

export const tools = {
  "Text Tools": {
    icon: FileText,
    path: "text",
    name: "Text Tools",
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
      {
        id: "list-randomizer",
        name: "List Randomizer",
        description: "Randomize and shuffle lists",
        path: "/tools/text/list-randomizer",
        seo: {
          title: "List Randomizer - Shuffle and Randomize Lists Online",
          description:
            "Free online tool to randomize and shuffle lists. Remove duplicates, number lines, and select random items from your list.",
          keywords: "list randomizer, list shuffler, random selection, remove duplicates, online tool",
        },
      },
      {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text for designs",
        path: "/tools/text/lorem-ipsum",
        seo: {
          title: "Lorem Ipsum Generator - Generate Placeholder Text Online",
          description:
            "Generate Lorem Ipsum placeholder text for your designs. Customize length and format of the generated text. Perfect for designers and developers.",
          keywords: "lorem ipsum generator, placeholder text, dummy text, latin text, design placeholder",
        },
      },
      {
        id: "string-manipulation",
        name: "String Manipulation",
        description: "Transform and manipulate strings with various operations",
        path: "/tools/text/string-manipulation",
        seo: {
          title: "String Manipulation Tool - Transform Text Online",
          description:
            "Transform and manipulate strings with various operations like reverse, camelCase, snake_case, and more. Perfect for developers and content creators.",
          keywords:
            "string manipulation, text transform, camelCase, snake_case, kebab-case, reverse string, online tool",
        },
      },
    ],
  },
  "Developer Tools": {
    icon: Code,
    path: "dev",
    name: "Developer Tools",
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
            "Generate various hash values online with this free tool. Create secure hash values for your data. Perfect for developers.",
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
      {
        id: "hash-analyzer",
        name: "Hash Analyzer",
        description: "Identify and analyze hash types",
        path: "/tools/dev/hash-analyzer",
        seo: {
          title: "Hash Analyzer - Identify and Analyze Hash Types Online",
          description:
            "Analyze and identify different types of hashes online with this free tool. Detect MD5, SHA-1, SHA-256, bcrypt, and more hash types. Perfect for developers and security professionals.",
          keywords: "hash analyzer, hash identifier, hash type detector, md5, sha1, sha256, bcrypt, online tool",
        },
      },
      {
        id: "package-analyzer",
        name: "Package.json Analyzer",
        description: "Analyze and validate package.json files",
        path: "/tools/dev/package-analyzer",
        seo: {
          title: "Package.json Analyzer - Analyze and Validate Package.json Files Online",
          description:
            "Analyze package.json files online with this free tool. Check dependencies, validate structure, and get insights about your Node.js projects.",
          keywords: "package.json analyzer, npm dependencies, node.js, package validator, dependency checker",
        },
      },
      {
        id: "requirements-analyzer",
        name: "Requirements.txt Analyzer",
        description: "Analyze and validate Python requirements.txt files",
        path: "/tools/dev/requirements-analyzer",
        seo: {
          title: "Requirements.txt Analyzer - Analyze Python Dependencies Online",
          description:
            "Analyze requirements.txt files online with this free tool. Check dependencies, validate versions, and get insights about your Python projects.",
          keywords: "requirements.txt analyzer, python dependencies, pip requirements, dependency checker",
        },
      },
      {
        id: "og-preview",
        name: "OG Preview",
        description: "Preview and validate Open Graph meta tags",
        path: "/tools/dev/og-preview",
        seo: {
          title: "Open Graph Preview - Test and Validate OG Meta Tags",
          description:
            "Preview how your website appears when shared on social media. Test and validate Open Graph meta tags for Facebook, Twitter, LinkedIn, and more.",
          keywords: "og preview, open graph, meta tags, social media preview, seo tools, facebook preview",
        },
      },
      {
        id: "rss-viewer",
        name: "RSS Feed Viewer",
        description: "Parse and preview RSS feeds",
        path: "/tools/dev/rss-viewer",
        seo: {
          title: "RSS Feed Viewer - Parse and Preview RSS Feeds Online",
          description:
            "Parse and preview RSS feeds online with this free tool. View feed content, validate RSS structure, and extract feed information.",
          keywords: "rss viewer, rss parser, feed viewer, rss feed, xml parser, online tool",
        },
      },
      {
        id: "git-command",
        name: "Git Command Generator",
        description: "Visual builder for complex git commands",
        path: "/tools/dev/git-command",
        seo: {
          title: "Git Command Generator - Visual Git Command Builder",
          description:
            "Build complex git commands visually with this interactive tool. Perfect for developers learning git or needing help with advanced git operations.",
          keywords: "git command generator, git commands, git help, visual git builder, git tutorial",
        },
      },
      {
        id: "regex-playground",
        name: "RegEx Playground",
        description: "Test and debug regular expressions",
        path: "/tools/dev/regex-playground",
        seo: {
          title: "RegEx Playground - Test and Debug Regular Expressions Online",
          description:
            "Test and debug regular expressions with real-time matching, explanation, and common patterns. Perfect for developers working with text patterns and validation.",
          keywords:
            "regex playground, regular expressions, regex tester, regex debugger, pattern matching, online tool",
        },
      },
      {
        id: "security-headers",
        name: "Security Headers Analyzer",
        description: "Analyze website security headers",
        path: "/tools/dev/security-headers",
        seo: {
          title: "Security Headers Analyzer - Check Website Security Headers",
          description:
            "Analyze and validate website security headers. Check for HSTS, CSP, X-Frame-Options, and other security headers to improve your website's security.",
          keywords: "security headers, security analyzer, hsts, csp, x-frame-options, web security, security testing",
        },
      },
      {
        id: "slug-generator",
        name: "Slug Generator",
        description: "Convert text to URL-friendly slugs",
        path: "/tools/dev/slug-generator",
        seo: {
          title: "Slug Generator - Create URL-Friendly Slugs Online",
          description:
            "Convert text to clean, URL-friendly slugs. Generate SEO-optimized slugs for your web content with support for multiple languages and custom separators.",
          keywords: "slug generator, url slugs, seo friendly urls, permalink generator, url converter",
        },
      },
      {
        id: "timestamp",
        name: "Timestamp Converter",
        description: "Convert between timestamps and human dates",
        path: "/tools/dev/timestamp",
        seo: {
          title: "Timestamp Converter - Unix Timestamp to Date Converter",
          description:
            "Convert between Unix timestamps and human-readable dates. Support for milliseconds, seconds, and ISO 8601 formats. Perfect for developers working with time data.",
          keywords: "timestamp converter, unix timestamp, epoch converter, datetime converter, iso 8601, utc converter",
        },
      },
      {
        id: "image-to-base64",
        name: "Image to Base64",
        description: "Convert images to base64 strings",
        path: "/tools/dev/image-to-base64",
        seo: {
          title: "Image to Base64 Converter - Convert Images Online",
          description:
            "Convert images to base64 encoded strings online. Support for multiple image formats including PNG, JPEG, and SVG. Perfect for embedding images in CSS or HTML.",
          keywords: "image to base64, base64 encoder, image converter, data uri, image embedding",
        },
      },
      {
        id: "json-query",
        name: "JSON Query",
        description: "Query JSON data using JsonPath",
        path: "/tools/dev/json-query",
        seo: {
          title: "JSON Query Tool - Query JSON Data with JsonPath",
          description: "Query JSON data using JsonPath expressions. Extract specific data from JSON documents easily.",
          keywords: "json query, jsonpath, query json, json data extraction, online tool",
        },
      },
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate and validate UUIDs",
        path: "/tools/dev/uuid-generator",
        seo: {
          title: "UUID Generator - Generate and Validate UUIDs Online",
          description:
            "Generate random UUIDs (v4) and validate existing UUIDs. Learn about UUID formats and use cases in software development.",
          keywords: "uuid generator, guid generator, uuid validator, uuid v4, unique identifiers, online tool",
        },
      },
      {
        id: "html-encoder",
        name: "HTML Encoder",
        description: "Encode and decode HTML entities",
        path: "/tools/dev/html-encoder",
        seo: {
          title: "HTML Entity Encoder/Decoder - Convert Special Characters Online",
          description:
            "Convert text to HTML entities and decode HTML entities back to text. Handle special characters and symbols in HTML content safely.",
          keywords: "html encoder, html entities, html decoder, special characters, html converter",
        },
      },
      {
        id: "json-minifier",
        name: "JSON Minifier",
        description: "Minify JSON data",
        path: "/tools/dev/json-minifier",
        seo: {
          title: "JSON Minifier - Minify JSON Data Online",
          description:
            "Minify JSON data online with this free tool. Remove unnecessary whitespace and make your JSON compact. Perfect for developers.",
          keywords: "json minifier, minify json, compact json, online tool",
        },
      },
      {
        id: "csv-viewer",
        name: "CSV Viewer",
        description: "View and edit CSV data with table preview",
        path: "/tools/dev/csv-viewer",
        seo: {
          title: "CSV Viewer and Editor - Parse and Preview CSV Files Online",
          description:
            "View, edit, and analyze CSV files online. Parse CSV data with custom delimiters and export to different formats.",
          keywords: "csv viewer, csv editor, csv parser, csv to json, data viewer, online tool",
        },
      },
      {
        id: "code-minifier",
        name: "Code Minifier",
        description: "Minify JavaScript, CSS, and HTML code",
        path: "/tools/dev/code-minifier",
        seo: {
          title: "Code Minifier - Minify JavaScript, CSS, and HTML Online",
          description:
            "Free online tool to minify JavaScript, CSS, and HTML code. Reduce file size and improve loading speed.",
          keywords: "code minifier, javascript minifier, css minifier, html minifier, code optimization",
        },
      },
      {
        id: "http-codes",
        name: "HTTP Status Codes",
        description: "Browse and search HTTP status codes",
        path: "/tools/dev/http-codes",
        seo: {
          title: "HTTP Status Codes Reference - Complete List with Descriptions",
          description:
            "Complete list of HTTP status codes with detailed information, descriptions, and examples. Search and browse through all HTTP response codes.",
          keywords: "http status codes, http codes, status codes, http reference, web development, http protocol",
        },
      },
      {
        id: "sql-formatter",
        name: "SQL Formatter",
        description: "Format and beautify SQL queries",
        path: "/tools/dev/sql-formatter",
        seo: {
          title: "SQL Formatter - Format and Beautify SQL Queries Online",
          description:
            "Format and beautify SQL queries online with this free tool. Make your SQL code readable and properly indented. Perfect for developers and database administrators.",
          keywords: "sql formatter, sql beautifier, format sql, sql query formatter, database tools, sql indenter",
        },
      },
      {
        id: "yaml-json-converter",
        name: "YAML ⇄ JSON Converter",
        description: "Convert between YAML and JSON formats",
        path: "/tools/dev/yaml-json-converter",
        seo: {
          title: "YAML to JSON Converter - Convert Between YAML and JSON Online",
          description:
            "Free online tool to convert between YAML and JSON formats. Perfect for configuration files, CI/CD pipelines, and data transformation. Supports validation and formatting.",
          keywords:
            "yaml to json, json to yaml, yaml converter, json converter, configuration files, docker compose, kubernetes",
        },
      },
    ],
  },
  "Design Tools": {
    icon: Palette,
    path: "design",
    name: "Design Tools",
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
        name: "Color Palette from Image Generator",
        description: "Extract color palettes from images",
        path: "/tools/design/color-palette",
        seo: {
          title: "Color Palette from Image Generator - Extract Color Palettes from Images Online",
          description:
            "Extract color palettes from images online with this free tool. Create beautiful color palettes for your designs. Perfect for designers and content creators.",
          keywords: "color palette generator, extract color palettes, color palettes, online tool, design",
        },
      },
      {
        id: "css-unit-converter",
        name: "CSS Unit Converter",
        description: "Convert between px, rem, and em",
        path: "/tools/design/css-unit-converter",
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
      {
        id: "gradient-generator",
        name: "Gradient Generator",
        description: "Create beautiful CSS gradients",
        path: "/tools/design/gradient-generator",
        seo: {
          title: "CSS Gradient Generator - Create Beautiful Gradients Online",
          description:
            "Create and customize beautiful CSS gradients with this free online tool. Generate linear and radial gradients for your web projects.",
          keywords: "css gradient generator, gradient maker, linear gradient, radial gradient, web design tools",
        },
      },
    ],
  },
  "Web3 Tools": {
    icon: Wallet,
    path: "web3",
    name: "Web3 Tools",
    items: [
      {
        id: "ens-lookup",
        name: "ENS Lookup",
        description: "Resolve ENS names to addresses and vice versa",
        path: "/tools/web3/ens-lookup",
        seo: {
          title: "ENS Lookup - Ethereum Name Service Resolution Tool",
          description:
            "Free ENS lookup tool to resolve Ethereum Name Service domains to addresses and reverse lookup addresses to ENS names. Perfect for Web3 developers and users.",
          keywords: "ens lookup, ethereum name service, ens resolver, eth domains, web3 tools, blockchain",
        },
      },
      {
        id: "gas-calculator",
        name: "Gas Calculator",
        description: "Calculate Ethereum transaction costs in different currencies",
        path: "/tools/web3/gas-calculator",
        seo: {
          title: "Ethereum Gas Calculator - Calculate Transaction Costs",
          description:
            "Calculate Ethereum transaction gas costs in real-time. Convert gas prices to different currencies and estimate transaction fees.",
          keywords: "ethereum gas calculator, gas fees, wei calculator, gwei calculator, eth calculator, web3 tools",
        },
      },
      {
        id: "transaction-decoder",
        name: "Transaction Decoder",
        description: "Decode Ethereum transaction data and function calls",
        path: "/tools/web3/transaction-decoder",
        seo: {
          title: "Ethereum Transaction Decoder - Decode Transaction Data Online",
          description:
            "Decode Ethereum transaction data and smart contract function calls. Analyze transaction input data and understand contract interactions.",
          keywords: "ethereum transaction decoder, smart contract decoder, transaction data, web3 tools, blockchain",
        },
      },
      {
        id: "signature-verifier",
        name: "Signature Verifier",
        description: "Verify Ethereum signatures and recover signing addresses",
        path: "/tools/web3/signature-verifier",
        seo: {
          title: "Ethereum Signature Verifier - Verify Messages and Recover Addresses",
          description:
            "Verify Ethereum signatures and recover signing addresses from signed messages. Validate signed messages and personal signatures.",
          keywords: "ethereum signature verifier, message signing, signature verification, web3 tools, blockchain",
        },
      },
    ],
  },
  "DNS Tools": {
    icon: Network,
    path: "dns",
    name: "DNS Tools",
    items: [
      {
        id: "dns-lookup",
        name: "DNS Lookup",
        description: "Perform DNS lookups and view records",
        path: "/tools/dns/dns-lookup",
        seo: {
          title: "DNS Lookup Tool - Query DNS Records Online",
          description:
            "Free online DNS lookup tool. Query A, AAAA, MX, TXT, NS, and other DNS records. Perfect for network administrators and developers.",
          keywords: "dns lookup, dns query, mx records, dns tools, a records, nameserver lookup",
        },
      },
      {
        id: "whois",
        name: "WHOIS Lookup",
        description: "Look up domain registration information",
        path: "/tools/dns/whois",
        seo: {
          title: "WHOIS Lookup - Domain Registration Information",
          description:
            "Free WHOIS lookup tool. Find domain registration details, nameservers, and registration dates for any domain name.",
          keywords: "whois lookup, domain info, domain registration, whois search, domain details",
        },
      },
      // {
      //   id: "ptr-lookup",
      //   name: "Reverse DNS Lookup",
      //   description: "Convert IP addresses to hostnames",
      //   path: "/tools/dns/ptr-lookup",
      //   seo: {
      //     title: "Reverse DNS Lookup - IP to Hostname Converter",
      //     description:
      //       "Convert IP addresses to hostnames with this reverse DNS lookup tool. Find the domain names associated with IP addresses.",
      //     keywords: "reverse dns, ptr lookup, ip to hostname, reverse ip lookup, dns tools",
      //   },
      // },
      // {
      //   id: "propagation-checker",
      //   name: "DNS Propagation Checker",
      //   description: "Check DNS propagation across global servers",
      //   path: "/tools/dns/propagation-checker",
      //   seo: {
      //     title: "DNS Propagation Checker - Global DNS Propagation Tool",
      //     description:
      //       "Check DNS propagation status across multiple global locations. Monitor DNS changes and verify DNS updates.",
      //     keywords: "dns propagation, dns checker, global dns, propagation status, dns monitoring",
      //   },
      // },
    ],
  },
  Utilities: {
    icon: Calculator,
    path: "utilities",
    name: "Utilities",
    items: [
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between length, weight, temperature, area, and volume units",
        path: "/tools/utilities/unit-converter",
        seo: {
          title: "Unit Converter - Convert Length, Weight, Temperature, Area & Volume Units",
          description:
            "Free online unit converter with instant results. Convert between metric and imperial units for length, weight, temperature, area, and volume. Supports dedicated conversion pages for SEO.",
          keywords:
            "unit converter, metric imperial conversion, length weight temperature converter, measurement conversion, online calculator",
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
      {
        id: "emoji-picker",
        name: "Emoji Picker",
        description: "Search and copy emojis easily",
        path: "/tools/utilities/emoji-picker",
        seo: {
          title: "Emoji Picker - Search and Copy Emojis Online",
          description:
            "Search through emojis by category or keyword. Copy emojis with a single click for use anywhere.",
          keywords: "emoji picker, emoji search, copy emojis, emoji categories, emoji tool",
        },
      },
      {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Generate customizable QR codes",
        path: "/tools/utilities/qr-generator",
        seo: {
          title: "QR Code Generator - Create Custom QR Codes Online",
          description:
            "Generate customizable QR codes for URLs, text, and more. Adjust size, colors, and error correction levels. Free online QR code generator.",
          keywords: "qr code generator, qr codes, qr creator, custom qr codes, online tool",
        },
      },
      {
        id: "image-dimension-checker",
        name: "Image Dimension Checker",
        description: "Check image dimensions and file size",
        path: "/tools/utilities/image-dimension-checker",
        seo: {
          title: "Image Dimension Checker - Check Image Dimensions and File Size",
          description:
            "Check the dimensions and file size of your images online. Perfect for designers and content creators.",
          keywords: "image dimension checker, image size, image dimensions, online tool",
        },
      },
      {
        id: "dice-generator",
        name: "Dice Generator",
        description: "Roll virtual dice with different sides",
        path: "/tools/utilities/dice-generator",
        seo: {
          title: "Dice Generator - Roll Virtual Dice Online",
          description:
            "Roll virtual dice online with customizable sides and multiple dice. Perfect for games, random number generation, and decision making.",
          keywords: "dice generator, virtual dice, dice roller, random number generator, online dice",
        },
      },
      {
        id: "screen-size-checker",
        name: "Screen Resolution Checker",
        description: "Check screen resolution and display properties",
        path: "/tools/utilities/screen-size-checker",
        seo: {
          title: "Screen Resolution Checker - Display Information Tool",
          description:
            "Check your screen resolution, viewport size, and display properties. Perfect for developers and designers testing responsive layouts.",
          keywords: "screen resolution checker, display properties, viewport size, screen dimensions, dpi checker",
        },
      },
      {
        id: "timezone-converter",
        name: "Timezone Converter",
        description: "Compare time across multiple timezones and cities",
        path: "/tools/utilities/timezone-converter",
        seo: {
          title: "Timezone Converter - Compare Time Across Multiple Timezones",
          description:
            "Visual timezone converter to compare current time across multiple cities and timezones worldwide. Perfect for scheduling meetings and coordinating across time zones.",
          keywords: "timezone converter, world clock, time zones, utc converter, meeting scheduler, time comparison",
        },
      },
      {
        id: "data-size-converter",
        name: "Data Size Converter",
        description: "Convert between bytes, KB, MB, GB, TB and more",
        path: "/tools/utilities/data-size-converter",
        seo: {
          title: "Data Size Converter - Convert Between Bytes, KB, MB, GB, TB",
          description:
            "Free online tool to convert between different data size units: bytes, kilobytes, megabytes, gigabytes, terabytes. Supports both binary and decimal calculations.",
          keywords:
            "data size converter, bytes converter, mb to gb, file size calculator, storage converter, binary decimal",
        },
      },
    ],
  },
};
