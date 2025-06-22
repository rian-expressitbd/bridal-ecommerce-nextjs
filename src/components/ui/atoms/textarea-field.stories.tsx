import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi"; // Example icon
import { TextareaField } from "./textarea-field";

const meta: Meta<typeof TextareaField> = {
  title: "UI/Atoms/TextareaField",
  component: TextareaField,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
    icon: { control: false }, // Hide icon control as it's a component
    rightElement: { control: false }, // Hide rightElement control
    labelRightElement: { control: false }, // Hide labelRightElement control
    className: { control: "text" },
    inputClassName: { control: "text" },
    preserveErrorSpace: { control: "boolean" },
    error: { control: "text" },
    warning: { control: "text" },
    showCharacterCount: { control: "boolean" },
    maxLength: { control: "number" },
  },
  args: {
    id: "default-textarea",
    placeholder: "Enter text here...",
    showCharacterCount: true,
  },
};

export default meta;
type Story = StoryObj<typeof TextareaField>;

// Helper component to manage state for controlled stories
const ControlledTextareaField = (args: React.ComponentProps<typeof TextareaField>) => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    args.onChange?.(e); // Call the action logger
  };
  return <TextareaField {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = {
  render: ControlledTextareaField,
  args: {},
};

export const WithLabel: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Description",
  },
};

export const WithPlaceholder: Story = {
  render: ControlledTextareaField,
  args: {
    placeholder: "Write your message...",
  },
};

export const WithValue: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Pre-filled Textarea",
    value: "This is some pre-filled text.",
  },
};

export const WithError: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea with Error",
    error: "This field is required.",
  },
};

export const WithWarning: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea with Warning",
    warning: "This might be too short.",
  },
};

export const Disabled: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Disabled Textarea",
    value: "This is disabled text.",
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea with Icon",
    icon: FiMessageSquare,
  },
};

export const WithRightElement: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea with Right Element",
    rightElement: <span className='text-xs text-gray-500'>Optional</span>,
  },
};

export const WithMaxLength: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea with Max Length (50)",
    maxLength: 50,
  },
};

export const WithoutCharacterCount: Story = {
  render: ControlledTextareaField,
  args: {
    label: "Textarea without Character Count",
    showCharacterCount: false,
    maxLength: 100, // MaxLength still works, just count is hidden
  },
};
