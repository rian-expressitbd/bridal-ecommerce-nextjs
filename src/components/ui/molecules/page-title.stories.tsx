import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "../atoms/button"; // Assuming Button is needed for examples
import PageTitle from "./page-title"; // Assuming the component is exported as default

const meta: Meta<typeof PageTitle> = {
  title: "UI/Molecules/PageTitle",
  component: PageTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the page.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container.",
    },
    leftElement: {
      control: "object",
      description: "Element to display on the left side of the title.",
    },
    rightElement: {
      control: "object",
      description: "Element to display on the right side of the title.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Page Title",
  },
};

export const WithLeftElement: Story = {
  args: {
    title: "Page Title",
    leftElement: <span>Icon</span>, // Replace with an actual Icon component if available
  },
};

export const WithRightElement: Story = {
  args: {
    title: "Page Title",
    rightElement: <Button title='Action'>Action</Button>,
  },
};

export const WithBothElements: Story = {
  args: {
    title: "Page Title",
    leftElement: <span>Icon</span>, // Replace with an actual Icon component if available
    rightElement: <Button title='Action'>Action</Button>,
  },
};
