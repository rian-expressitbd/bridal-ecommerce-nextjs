import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  LoadingSpinner,
  LoadingSpinnerBounce,
  LoadingSpinnerDualColor,
  LoadingSpinnerPulse,
  LoadingSpinnerTyping,
} from "./loading-spinner";

const metaSpinner: Meta<typeof LoadingSpinner> = {
  title: "UI/Atoms/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "accent", "white", "blue", "red", "green", "gray"],
    },
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
};

export const Spinner: StoryObj<typeof LoadingSpinner> = {
  ...metaSpinner,
  args: {
    size: "md",
    color: "primary",
  },
};

export const SpinnerWhite: StoryObj<typeof LoadingSpinner> = {
  ...metaSpinner,
  args: {
    size: "md",
    color: "white",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

const metaDualColor: Meta<typeof LoadingSpinnerDualColor> = {
  title: "UI/Atoms/LoadingSpinnerDualColor",
  component: LoadingSpinnerDualColor,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    primaryColor: { control: "text" }, // Can be Tailwind class or hex/rgb if supported
    secondaryColor: { control: "text" }, // Can be Tailwind class or hex/rgb if supported
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
};

export const DualColorSpinner: StoryObj<typeof LoadingSpinnerDualColor> = {
  ...metaDualColor,
  args: {
    size: "md",
    primaryColor: "primary",
    secondaryColor: "red-500",
  },
};

const metaBounce: Meta<typeof LoadingSpinnerBounce> = {
  title: "UI/Atoms/LoadingSpinnerBounce",
  component: LoadingSpinnerBounce,
  tags: ["autodocs"],
  argTypes: {
    dotColor: { control: "text" }, // Can be Tailwind class
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
};

export const BounceSpinner: StoryObj<typeof LoadingSpinnerBounce> = {
  ...metaBounce,
  args: {
    dotColor: "bg-primary",
  },
};

const metaPulse: Meta<typeof LoadingSpinnerPulse> = {
  title: "UI/Atoms/LoadingSpinnerPulse",
  component: LoadingSpinnerPulse,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
};

export const PulseSpinner: StoryObj<typeof LoadingSpinnerPulse> = {
  ...metaPulse,
  args: {
    size: "md",
  },
};

const metaTyping: Meta<typeof LoadingSpinnerTyping> = {
  title: "UI/Atoms/LoadingSpinnerTyping",
  component: LoadingSpinnerTyping,
  tags: ["autodocs"],
  argTypes: {
    dotColor: { control: "text" }, // Can be Tailwind class
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
};

export const TypingSpinner: StoryObj<typeof LoadingSpinnerTyping> = {
  ...metaTyping,
  args: {
    dotColor: "gray-900",
  },
};

export default metaSpinner;
