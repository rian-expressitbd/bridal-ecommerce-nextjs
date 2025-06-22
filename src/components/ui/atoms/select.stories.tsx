import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import Select from "./select"; // Assuming default export

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4 (Disabled)", value: "option4", disabled: true },
  { label: "Option 5", value: "option5" },
];

const meta: Meta<typeof Select> = {
  title: "UI/Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
    mode: { control: "radio", options: ["single", "multi"] },
    value: { control: "object" },
    className: { control: "text" },
    disabled: { control: "boolean" },
    searchable: { control: "boolean" },
    searchPosition: { control: "radio", options: ["trigger", "dropdown"] },
    menuPlacement: { control: "radio", options: ["bottom", "top", "right", "left", "auto"] },
    dropdownSize: { control: "radio", options: ["sm", "md", "lg"] },
    dropdownWidth: { control: "text" },
    id: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
    warning: { control: "text" },
    preserveErrorSpace: { control: "boolean" },
    showError: { control: "boolean" },
    clearAllConfirmation: { control: "text" },
    noOptionsMessage: { control: "text" },
    searchPlaceholder: { control: "text" },
    showSelectAll: { control: "boolean" },
    selectAllLabel: { control: "text" },
    animation: { control: "boolean" },
  },
  args: {
    options: options,
    placeholder: "Select an option",
    mode: "single",
    value: [],
    disabled: false,
    searchable: false,
    searchPosition: "dropdown",
    menuPlacement: "auto",
    dropdownSize: "md",
    dropdownWidth: "full",
    required: false,
    preserveErrorSpace: true,
    showError: true,
    showSelectAll: false,
    animation: true,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Helper component to manage state for controlled stories
const ControlledSelect = (args: React.ComponentProps<typeof Select>) => {
  const [selectedOptions, setSelectedOptions] = useState(args.value || []);
  const handleChange = (newOptions: typeof args.value) => {
    setSelectedOptions(newOptions);
    args.onChange(newOptions); // Call the action logger
  };
  return <Select {...args} value={selectedOptions} onChange={handleChange} />;
};

export const SingleSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Single Select",
    value: [],
  },
};

export const MultiSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Multi Select",
    mode: "multi",
    value: [],
    showSelectAll: true,
  },
};

export const SingleSelectWithValue: Story = {
  render: ControlledSelect,
  args: {
    label: "Single Select with Value",
    value: [options[0]],
  },
};

export const MultiSelectWithValues: Story = {
  render: ControlledSelect,
  args: {
    label: "Multi Select with Values",
    mode: "multi",
    value: [options[0], options[2]],
    showSelectAll: true,
  },
};

export const DisabledSingleSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Disabled Single Select",
    disabled: true,
    value: [options[0]],
  },
};

export const DisabledMultiSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Disabled Multi Select",
    mode: "multi",
    disabled: true,
    value: [options[0], options[2]],
    showSelectAll: true,
  },
};

export const SingleSelectWithError: Story = {
  render: ControlledSelect,
  args: {
    label: "Single Select with Error",
    error: "This field is required",
  },
};

export const MultiSelectWithError: Story = {
  render: ControlledSelect,
  args: {
    label: "Multi Select with Error",
    mode: "multi",
    error: "Please select at least two options",
    showSelectAll: true,
  },
};

export const SearchableSingleSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Searchable Single Select",
    searchable: true,
  },
};

export const SearchableMultiSelect: Story = {
  render: ControlledSelect,
  args: {
    label: "Searchable Multi Select",
    mode: "multi",
    searchable: true,
    showSelectAll: true,
  },
};

export const SearchableTriggerPosition: Story = {
  render: ControlledSelect,
  args: {
    label: "Searchable (Trigger Position)",
    searchable: true,
    searchPosition: "trigger",
    mode: "multi",
    value: [options[0], options[2]],
    showSelectAll: true,
  },
};

export const DropdownSizeSmall: Story = {
  render: ControlledSelect,
  args: {
    label: "Dropdown Size Small",
    dropdownSize: "sm",
  },
};

export const DropdownSizeLarge: Story = {
  render: ControlledSelect,
  args: {
    label: "Dropdown Size Large",
    dropdownSize: "lg",
  },
};

export const DropdownWidthCustom: Story = {
  render: ControlledSelect,
  args: {
    label: "Dropdown Width Custom (200px)",
    dropdownWidth: "200px",
  },
};
