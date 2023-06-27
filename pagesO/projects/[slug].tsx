import Contener from "components/Contener";
import PageTitle from "components/PageTitle";
import { sanityGraphql, SanityImage } from "lib/sanity";
import { PortableText } from "@portabletext/react";
import PostBody from "components/PostBody";
import useVueConter from "components/hooks/useVueConter";

interface Props {
  project: {
    title: string;
    slug: { current: string };
    shortDescription: string;
    tags: { tag: string }[];
    image: SanityImage;
    dateStarted: string;
    dateFinished: string;
    descriptionRaw: any[];
  };
}

export default function ProjectDetails({ project }: Props) {
  const view = useVueConter({ slug: project.slug.current });
  return (
    <Contener title={`${project.title} - Thibault Mathian`} description={project.shortDescription}>
      <div>
        <PageTitle
          title={project.title}
          description={`${project?.dateStarted?.split("-")?.[0]} - ${
            project?.dateFinished?.split("-")?.[0]
          }  |  ${view} views`}
        />
      </div>
      <PostBody content={project.descriptionRaw} />
    </Contener>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const r = await sanityGraphql.post("/", {
    query: `
      {
        allProject (where: {slug: {current: {eq: "${params.slug}"}}}){
          title,
          tags {tag},
          slug{current},
          image {asset {metadata {dimensions {height width}} url}},
          dateStarted,
          dateFinished,
          descriptionRaw,
          shortDescription
        }
      }
    `,
  });

  const project = r.data.errors ? [] : r.data.data.allProject[0];

  return {
    props: {
      project,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const r = await sanityGraphql.post("/", {
    query: `
      {
        allProject {
          slug{current}
        }
      }
    `,
  });

  const slugs = r.data.errors
    ? []
    : (r.data.data.allProject.map((p: { slug: { current: string } }) => p.slug.current) as string[]);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
