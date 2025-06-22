import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { RadioGroup } from "./radio-group"; // Assuming the component is exported as RadioGroup

const meta: Meta<typeof RadioGroup> = {
  title: "UI/Molecules/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the radio group.",
    },
    options: {
      control: "object",
      description: "Array of radio options (value, label, disabled).",
    },
    value: {
      control: "text",
      description: "The currently selected radio button value.",
    },
    onChange: {
      action: "valueChanged",
      description: "Callback function when a radio button is selected.",
    },
    label: {
      control: "text",
      description: "Label for the radio group.",
    },
    error: {
      control: "text",
      description: "Error message to display.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container.",
    },
    radioButtonProps: {
      control: "object",
      description: "Props to pass to individual RadioButton components.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
];

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value || options[0].value);
    return <RadioGroup {...args} value={selectedValue} onChange={setSelectedValue} options={options} />;
  },
  args: {
    id: "default-radio-group",
    label: "Select an Option",
    options: options,
    value: options[0].value,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value || options[0].value);
    return <RadioGroup {...args} value={selectedValue} onChange={setSelectedValue} options={options} />;
  },
  args: {
    id: "error-radio-group",
    label: "Select an Option",
    options: options,
    value: options[0].value,
    error: "Please select an option.",
  },
};

export const DisabledOptions: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value || options[0].value);
    return <RadioGroup {...args} value={selectedValue} onChange={setSelectedValue} options={options} />;
  },
  args: {
    id: "disabled-radio-group",
    label: "Select an Option",
    options: [
      { value: "optionA", label: "Option A" },
      { value: "optionB", label: "Option B", disabled: true },
      { value: "optionC", label: "Option C" },
    ],
    value: "optionA",
  },
};
