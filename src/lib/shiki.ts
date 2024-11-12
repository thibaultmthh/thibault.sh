import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
// @ts-expect-error -- untyped
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/web";

export async function highlight(code: string, lang: string = "typescript") {
  const out = await codeToHast(code, {
    lang,
    theme: "github-dark",
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  });
}
