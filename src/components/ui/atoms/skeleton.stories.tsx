import type { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "h-4 w-32", // Example size
  },
};

export const Large: Story = {
  args: {
    className: "h-8 w-64", // Example size
  },
};

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full", // Example size and shape
  },
};

export const Card: Story = {
  args: {
    className: "h-40 w-full", // Example size for a card-like shape
  },
};
