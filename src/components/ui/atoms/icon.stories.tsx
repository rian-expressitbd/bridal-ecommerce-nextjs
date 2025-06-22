import type { Meta, StoryObj } from "@storybook/nextjs";
import { FiAlertCircle, FiHeart, FiSettings, FiStar } from "react-icons/fi";
import { Icon } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "UI/Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false, // Hide control for icon prop as we'll show examples
    },
    size: {
      control: { type: "number" },
    },
    color: {
      control: { type: "color" },
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: FiStar,
    size: 20,
    color: "#000000",
  },
};

export const Large: Story = {
  args: {
    icon: FiHeart,
    size: 40,
    color: "#FF0000",
  },
};

export const Colored: Story = {
  args: {
    icon: FiSettings,
    size: 24,
    color: "#007bff", // Example blue color
  },
};

export const WithClassName: Story = {
  args: {
    icon: FiAlertCircle,
    size: 30,
    color: "#ffc107", // Example yellow color
    className: "border border-gray-300 p-1 rounded",
  },
};
