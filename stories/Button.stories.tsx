import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "components/Button";

const main = {
  title: "Main/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default main;

export const Primary = () => <Button>Click me</Button>;
