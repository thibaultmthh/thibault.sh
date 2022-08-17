import classNames from "classnames";
import Contener from "components/Contener";
import Keyword from "components/Keyword";
import PageTitle from "components/PageTitle";
import Project from "components/Project";
import { useState } from "react";
import FlipMove from "react-flip-move";

export default function Projects() {
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

  const projects = ["Typescript", "Electron", "R", "RR"];

  const projectsDisplayed = projects.filter((p) => keywordSelected.includes(p));

  console.log(projectsDisplayed);

  return (
    <Contener title="Projects" description="Projects">
      <PageTitle title="Projects" description="Find all my projects here. Every projects is documented 📖" />
      <div className="mb-16">
        <h2 className="font-bold text-2xl text-white mb-3">Sort project by keyword : </h2>
        {keywords.map((keyword) => (
          <Keyword key={keyword} keyword={keyword} strong={keywordSelected.includes(keyword)} onClick={handleClick} />
        ))}

        <FlipMove>
          {projectsDisplayed.map((project) => (
            <div key={project}>
              <Project name={project} />
            </div>
          ))}
        </FlipMove>
      </div>
    </Contener>
  );
}
