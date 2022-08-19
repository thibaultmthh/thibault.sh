import { SanityImage } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Keyword from "./Keyword";

export interface IProject {
  title: string;
  slug: { current: string };
  shortDescription: string;
  tags: { tag: string }[];
  image: SanityImage;
  dateStarted: string;
  dateFinished: string;
}

export default function Project({ project }: { project: IProject }) {
  return (
    <div className=" py-8 max-w-lg  lg:max-w-4xl ">
      <div className="mb-3">
        <span className="font-medium text-xl text-white mr-5 ">{project.title}</span>
        <span className="text-neutral-300 text-sm">
          {project.dateStarted.split("-")[0]} - {project.dateFinished.split("-")[0]}
        </span>
      </div>

      <div className="block lg:flex ">
        <div className="w-lg  md:max-w-xl">
          <Image
            src={project.image.asset.url}
            height={project.image.asset.metadata.dimensions.height}
            width={project.image.asset.metadata.dimensions.width}
            alt="parakeet"
          />
        </div>
        <div className="mt-2 lg:ml-5">
          <div className=" hidden lg:block ">
            <h2 className="text-white font-medium">Description: </h2>
            <p className="text-white">{project.shortDescription}</p>
          </div>
          <div className=" mt-2 sm:mt-0">
            <ul>
              {project.tags.map((tag) => (
                <Keyword keyword={tag.tag} key={tag.tag} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-around mt-2 sm:block sm:mt-0 sm:float-right">
        <Button>
          <Link href={`/projects/${project.slug.current}`}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
