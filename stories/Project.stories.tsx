import React from "react";

import Header from "components/Header";
import Project from "components/Project";

const main = {
  title: "Main/Project",
  component: Project,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default main;

// export const Primary = () => <Project name="parakeet" />;
