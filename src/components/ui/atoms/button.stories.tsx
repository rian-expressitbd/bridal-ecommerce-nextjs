import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ghost", "flat", "edge", "outline", "outline-flat", "outline-edge", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "none"],
    },
    title: {
      control: "text",
    },
    children: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
    title: "Default Button",
    variant: "default",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    title: "Ghost Button",
    variant: "ghost",
    size: "md",
  },
};

export const Flat: Story = {
  args: {
    children: "Flat Button",
    title: "Flat Button",
    variant: "flat",
    size: "md",
  },
};

export const Edge: Story = {
  args: {
    children: "Edge Button",
    title: "Edge Button",
    variant: "edge",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    title: "Outline Button",
    variant: "outline",
    size: "md",
  },
};

export const OutlineFlat: Story = {
  args: {
    children: "Outline Flat Button",
    title: "Outline Flat Button",
    variant: "outline-flat",
    size: "md",
  },
};

export const OutlineEdge: Story = {
  args: {
    children: "Outline Edge Button",
    title: "Outline Edge Button",
    variant: "outline-edge",
    size: "md",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    title: "Link Button",
    variant: "link",
    size: "none",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    title: "Small Button",
    variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    title: "Large Button",
    variant: "default",
    size: "lg",
  },
};
