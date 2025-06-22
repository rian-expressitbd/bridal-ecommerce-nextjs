import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { RangeSlider } from "./range-slider";

const meta: Meta<typeof RangeSlider> = {
  title: "UI/Atoms/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    onChange: { action: "changed" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    className: { control: "text" },
  },
  args: {
    id: "default-slider",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Select a value",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Slider",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Slider with Error",
    error: "Value is out of range",
  },
};

// Example of a controlled component story
const ControlledRangeSlider = (args: React.ComponentProps<typeof RangeSlider>) => {
  const [value, setValue] = useState(args.value);
  const handleChange = (newValue: number) => {
    setValue(newValue);
    args.onChange(newValue); // Call the action logger
  };
  return <RangeSlider {...args} value={value} onChange={handleChange} />;
};

export const Controlled: Story = {
  render: ControlledRangeSlider,
  args: {
    label: "Controlled Slider",
    value: 25, // Initial value
  },
};
