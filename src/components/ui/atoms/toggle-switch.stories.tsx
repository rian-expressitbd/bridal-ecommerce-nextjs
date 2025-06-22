import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";
import { ToggleSwitch } from "./toggle-switch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "UI/Atoms/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "toggled" },
    className: { control: "text" },
    labelPosition: { control: "radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
    error: { control: "text" },
    preserveErrorSpace: { control: "boolean" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    labelClassName: { control: "text" },
    showStateText: { control: "boolean" },
  },
  args: {
    id: "default-toggle",
    checked: false,
    labelPosition: "right",
    disabled: false,
    preserveErrorSpace: false,
    size: "md",
    loading: false,
    showStateText: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

// Helper component to manage state for controlled stories
const ControlledToggleSwitch = (args: React.ComponentProps<typeof ToggleSwitch>) => {
  const [isChecked, setIsChecked] = useState(args.checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    args.onChange(e); // Call the action logger
  };
  return <ToggleSwitch {...args} checked={isChecked} onChange={handleChange} />;
};

export const Default: Story = {
  render: ControlledToggleSwitch,
  args: {},
};

export const Checked: Story = {
  render: ControlledToggleSwitch,
  args: {
    checked: true,
  },
};

export const WithLabel: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Enable Feature",
  },
};

export const WithLabelLeft: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Enable Feature",
    labelPosition: "left",
  },
};

export const Disabled: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Disabled Toggle",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Disabled and Checked",
    checked: true,
    disabled: true,
  },
};

export const SmallSize: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Small Toggle",
    size: "sm",
  },
};

export const LargeSize: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Large Toggle",
    size: "lg",
  },
};

export const WithError: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Toggle with Error",
    error: "Setting failed",
  },
};

export const Loading: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Loading Toggle",
    loading: true,
  },
};

export const LoadingChecked: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Loading and Checked",
    checked: true,
    loading: true,
  },
};

export const ShowStateText: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Show State Text",
    showStateText: true,
  },
};

export const ShowStateTextChecked: Story = {
  render: ControlledToggleSwitch,
  args: {
    label: "Show State Text (Checked)",
    checked: true,
    showStateText: true,
  },
};
