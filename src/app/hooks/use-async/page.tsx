"use client";

import HookDocRenderer from "@/components/HookDocRenderer";
import useAsyncDoc from "@/docs/hooks/use-async.doc";

export default function UseAsyncDocNew() {
  return <HookDocRenderer doc={useAsyncDoc} />;
}
