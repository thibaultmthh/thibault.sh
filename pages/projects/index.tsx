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
  tags: string[];
}

export default function Projects({ projects, tags }: Props) {
  const keywords = tags
    .map((tag) => ({
      tag,
      count: projects.filter((project) => project.tags.map((t) => t.tag).includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count);

  const [keywordSelected, setKeywordSelected] = useState<string[]>(keywords.map((keyword) => keyword.tag));

  const handleClick = (keyword: string) => {
    if (keywordSelected.includes(keyword)) {
      setKeywordSelected(keywordSelected.filter((k) => k !== keyword));
    } else {
      setKeywordSelected([...keywordSelected, keyword]);
    }
  };

  const projectsDisplayed = projects.filter((p) => keywordSelected.some((k) => p.tags.map((t) => t.tag).includes(k)));

  return (
    <Contener title="Projects" description="Find all my projects here. Every projects is documented 📖">
      <PageTitle
        title="Projects"
        description="Find all my projects here. Every projects is documented 📖 Sadly some project must remain private for now ;)"
      />
      <div className="mb-16">
        <h2 className="font-bold text-2xl text-white mb-3">Sort project by keyword : </h2>
        {keywords.map((keyword) => (
          <Keyword
            key={keyword.tag}
            keyword={`${keyword.tag} (${keyword.count})`}
            strong={!keywordSelected.includes(keyword.tag)}
            onClick={() => handleClick(keyword.tag)}
          />
        ))}
        <Keyword keyword="All" onClick={() => setKeywordSelected(keywords.map((keyword) => keyword.tag))} />
        <Keyword keyword="Clear" onClick={() => setKeywordSelected([])} />
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

  const tagsR = await sanityGraphql.post("/", {
    query: `{
        tags: allTag {tag}
      }`,
  });

  const projects = projectsR.data.errors ? [] : projectsR.data.data.allProject;
  const tags = tagsR.data.errors ? [] : tagsR.data.data.tags.map((t: { tag: string }) => t.tag);
  return {
    props: {
      projects,
      tags,
    },
    revalidate: 60, // In seconds
  };
}
