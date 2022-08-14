import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Home from "../pages";
import Header from "components/Header";

const main = {
  title: "Main/Home",
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default main;

export const Primary = () => <Header />;
