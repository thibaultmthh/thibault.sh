import Button from "components/Button";
import Contener from "components/Contener";
import Project, { IProject } from "components/Project";
import { sanityGraphql } from "lib/sanity";
import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";
import me from "public/images/me.jpg";

interface Props {
  projects: IProject[];
}

export default function Home({ projects }: Props) {
  return (
    <Contener
      title="Thibault Mathian"
      description="I am a fullstack developper living in Grenoble. I love to code and I love to create. I am a self-taught developer and I am always looking for new challenges."
    >
      <div className="flex flex-col-reverse  sm:flex-row sm:justify-between mb-32">
        <div>
          <h1 className="font-bold text-5xl text-white">Thibault Mathian</h1>
          <h2 className="text-base mt-1 text-neutral-300">Freelance Fullstack developper 🧑‍💻</h2>
        </div>
        <div className="w-24 h-24 mb-6 sm:mb-0 sm:w-40 sm:h-40">
          <Image className="rounded-full mx-auto" src={me} alt="me" width={150} height={150} />
        </div>
      </div>
      <div className="mb-32">
        <h1 className="font-bold text-2xl text-white">Who am I ?</h1>
        <p className="text-base text-neutral-300">
          I am a fullstack developper living in Grenoble. I love to code and I love to create. I am a self-taught
          developer and I am always looking for new challenges.
          <div className="my-3 sm:float-right sm:my-2	">
            <Link href={"/about"}>
              <Button>More</Button>
            </Link>
          </div>
        </p>
      </div>
      <div className="mb-20">
        <h1 className="font-bold text-2xl text-white mb-5">Some of my Projects</h1>
        <ul>
          {projects.map((project) => (
            <Project project={project} key={project.title} />
          ))}
        </ul>
        <div className="mt-10 flex justify-around">
          <Link href={"/projects"}>
            <Button>See all projects</Button>
          </Link>
        </div>
      </div>
    </Contener>
  );
}

export async function getStaticProps() {
  const projectsR = await sanityGraphql.post("/", {
    query: `{
      allProject (where: {pinned: {eq: true}}) {
        title,
        slug{current},
        shortDescription,
        tags {
          tag
        }
        image {asset {url,metadata{dimensions{height, width}}}},
        dateStarted,
        dateFinished
      }
    }`,
  });
  const projects = projectsR.data.errors ? [] : projectsR.data.data.allProject;
  return {
    props: {
      projects: projects,
    },
    revalidate: 60, // In seconds
  };
}
