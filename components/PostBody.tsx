import { PortableText } from "@portabletext/react";
import markdownStyles from "styles/PostBody.module.scss";

import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { sanityClient } from "lib/sanity";

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  console.log(value, isInline);

  return (
    <Image
      src={urlBuilder(sanityClient)
        .image(value.asset)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      width={width}
      height={height}
    />
  );
};

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};

export default function PostBody({ content }: { content: any[] }) {
  return (
    <div className="markdown">
      <PortableText value={content} components={components} />
    </div>
  );
}
