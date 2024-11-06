declare module "rehype-wrap-all" {
  import type { Plugin } from "unified";

  interface WrapOptions {
    selector: string;
    wrapper: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapAll: Plugin<[WrapOptions], any>;
  export default wrapAll;
}
