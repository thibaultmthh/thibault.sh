import SocialLink from "components/SocialLink";
import Image from "next/image";
import me from "public/images/me.jpg";
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconLink } from "@tabler/icons";
import CardSpotlight from "components/ProjectCard";
import Link from "next/link";
import ButtonAnimatedGradient from "components/ButtonAnimatedGradient";
import { sanityGraphql, sanityGraphqlBaseURL } from "lib/sanity";

export default async function Page() {
  // sanityGraphqlBaseURL
  const query = `{
      allProject {
        title,
        slug{current},
        shortDescription,
        website,

        tags {
          tag
        }
        image {asset {url,metadata{dimensions{height, width}}}},
        dateStarted,
        dateFinished
      }
    }`;

  const projectsR = await fetch(`${sanityGraphqlBaseURL}`, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());

  console.log(projectsR);

  const projects = projectsR.error || projectsR.errors ? [] : (projectsR.data?.allProject as any[]); // TODO: Fix type

  projects.sort((a, b) => {
    if (a.dateFinished === null) return -1;
    if (b.dateFinished === null) return 1;
    return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
  });

  console.log(projects);

  return (
    <div>
      <div className="mx-auto">
        <Image className="rounded-full mx-auto" src={me} alt="me" width={150} height={150} />
        <div className="absolute right-0 -top-2 -z-10 flex w-full justify-center">
          <div className="h-[280px] w-[310px] max-w-full animate-pulse-slow  rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
        </div>
        <div className="text-center mt-6 bg-gradient-to-t from-[#848484] to-[#f4f4f4] bg-clip-text text-4xl text-transparent">
          <h1 className="font-bold text-5xl ">Thibault Mathian</h1>
          <h2 className="inline-flex animate-background-shine-slow bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent">
            Freelance Fullstack developper <span className="text-white ml-1">🧑‍💻</span>
          </h2>
        </div>

        <div className="flex justify-center mt-5 space-x-2">
          <SocialLink href="https://twitter.com/thibault_mthh" Icon={IconBrandTwitter} />
          <SocialLink href="https://www.linkedin.com/in/thibault-mathian/" Icon={IconBrandLinkedin} />
          <SocialLink href="https://github.com/thibaultmthh" Icon={IconBrandGithub} />
        </div>

        <div className="mt-10 relative">
          <div className="mx-auto h-[1px] animate-separator-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-[#AAAAAA] to-[rgba(17,17,17,0)] " />

          <br />

          {projects?.map((project) => (
            <CardSpotlight key={project.title}>
              <h3 className="text-white text-xl font-bold">{project.title}</h3>
              <Link href={project.website || "#"} className="text-[#939393]">
                {project.website?.replace("https://", "")?.replace("http://", "")}
                <IconLink className="inline-block" size={14} />
              </Link>
              <p className="text-white text-sm mt-2 md:w-[calc(100%-150px)]">{project.shortDescription}</p>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
}
