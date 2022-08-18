import classNames from "classnames";
import Contener from "components/Contener";
import Keyword from "components/Keyword";
import PageTitle from "components/PageTitle";
import Project, { IProject } from "components/Project";
import { sanityGraphql } from "lib/sanity";
import { useState } from "react";
import FlipMove from "react-flip-move";

interface Props {
  projects: IProject[];
}

export default function Projects({ projects }: Props) {
  const [keywordSelected, setKeywordSelected] = useState<string[]>(["Electron"]);

  const handleClick = (keyword: string) => {
    if (keywordSelected.includes(keyword)) {
      setKeywordSelected(keywordSelected.filter((k) => k !== keyword));
    } else {
      setKeywordSelected([...keywordSelected, keyword]);
    }
  };

  const keywords = ["Typescript", "Electron", "R"];

  const a = keywordSelected.includes("Typescript");

  const projectsDisplayed = projects.filter((p) => keywordSelected.some((k) => p.tags.map((t) => t.tag).includes(k)));

  console.log(projectsDisplayed);

  return (
    <Contener title="Projects" description="Projects">
      <PageTitle title="Projects" description="Find all my projects here. Every projects is documented 📖" />
      <div className="mb-16">
        <h2 className="font-bold text-2xl text-white mb-3">Sort project by keyword : </h2>
        {keywords.map((keyword) => (
          <Keyword key={keyword} keyword={keyword} strong={keywordSelected.includes(keyword)} onClick={handleClick} />
        ))}
        {
          // @ts-ignore (waiting for new verstion to be pushed on npm)
          <FlipMove>
            {projectsDisplayed.map((project) => (
              <div key={project.title}>
                <Project project={project} />
              </div>
            ))}
          </FlipMove>
        }
      </div>
    </Contener>
  );
}

export async function getStaticProps() {
  const projectsR = await sanityGraphql.post("/", {
    query: `{
      allProject {
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
