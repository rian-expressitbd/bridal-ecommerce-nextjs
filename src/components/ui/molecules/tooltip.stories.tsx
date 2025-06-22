import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Molecules/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <span>Hover over me</span>,
  },
};

export const TopPosition: Story = {
  args: {
    content: "Tooltip at the top",
    children: <span>Hover over me (Top)</span>,
    position: "top",
  },
};

export const BottomPosition: Story = {
  args: {
    content: "Tooltip at the bottom",
    children: <span>Hover over me (Bottom)</span>,
    position: "bottom",
  },
};

export const LeftPosition: Story = {
  args: {
    content: "Tooltip on the left",
    children: <span>Hover over me (Left)</span>,
    position: "left",
  },
};

export const RightPosition: Story = {
  args: {
    content: "Tooltip on the right",
    children: <span>Hover over me (Right)</span>,
    position: "right",
  },
};
