import type { Meta, StoryObj } from "@storybook/nextjs";
import { InputField } from "./input-field";
// Import FormFieldWrapper from the molecules directory
import { FiMail, FiSearch } from "react-icons/fi";

const meta: Meta<typeof InputField> = {
  title: "UI/Atoms/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "value changed" },
    icon: { control: false }, // Hide control for icon prop
    rightElement: { control: false }, // Hide control for rightElement prop
    labelRightElement: { control: false }, // Hide control for labelRightElement prop
    className: { control: "text" },
    inputClassName: { control: "text" },
    preserveErrorSpace: { control: "boolean" },
    showError: { control: "boolean" },
    error: { control: "text" },
    warning: { control: "text" },
    helperText: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url", "search"] },
  },
  // InputField uses FormFieldWrapper internally, so no decorator needed unless customizing wrapper
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    id: "default-input",
    label: "Default Input",
    placeholder: "Enter text here",
  },
};

export const WithValue: Story = {
  args: {
    id: "value-input",
    label: "Input with Value",
    value: "Initial value",
  },
};

export const WithIcon: Story = {
  args: {
    id: "icon-input",
    label: "Input with Icon",
    placeholder: "Enter email",
    icon: FiMail,
    type: "email",
  },
};

export const WithRightElement: Story = {
  args: {
    id: "right-element-input",
    label: "Input with Right Element",
    placeholder: "Search...",
    rightElement: <FiSearch className='text-gray-400' />,
  },
};

export const WithError: Story = {
  args: {
    id: "error-input",
    label: "Input with Error",
    placeholder: "Enter text",
    error: "This field is required",
  },
};

export const WithWarning: Story = {
  args: {
    id: "warning-input",
    label: "Input with Warning",
    placeholder: "Enter text",
    warning: "This might be incorrect",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "Disabled Input",
    placeholder: "Cannot type here",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    id: "required-input",
    label: "Required Input",
    placeholder: "This field is required",
    required: true,
  },
};

export const WithLabelRightElement: Story = {
  args: {
    id: "label-right-element-input",
    label: "Input with Label Element",
    placeholder: "Enter text",
    labelRightElement: <span>Optional</span>,
  },
};
