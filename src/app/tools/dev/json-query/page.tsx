"use client";

import dynamic from "next/dynamic";

const JSONQueryToolComponent = dynamic(() => import("./page.client"), {
  ssr: false,
});

export default function Page() {
  return <JSONQueryToolComponent />;
}
