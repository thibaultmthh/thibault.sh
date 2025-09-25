import { HookCategory, HookSEO } from "@/config/hook-categories";

export interface HookDocumentation {
  // Basic information
  name: string;
  description: string;
  category: HookCategory;
  seo: HookSEO;

  // Installation
  installation?: {
    package: string;
    command?: string;
  };

  // Usage examples
  usage: {
    import: string;
  };

  // API definition
  api: {
    signature: string;
    parameters?: Array<{
      name: string;
      type: string;
      description: string;
      optional?: boolean;
      default?: string;
    }>;
    returns: {
      type: string;
      description: string;
      properties?: Array<{
        name: string;
        type: string;
        description: string;
      }>;
    };
  };

  // Examples file (optional)
  examplesFile?: string; // Path to the examples file (e.g., "use-async.example")
}
