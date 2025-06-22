import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./checkbox";
// Import FormFieldWrapper from the molecules directory

const meta: Meta<typeof Checkbox> = {
  title: "UI/Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "checked changed" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    className: { control: "text" },
  },
  // Add decorators if needed, e.g., to wrap with FormFieldWrapper if not handled internally
  // decorators: [(Story) => <FormFieldWrapper label="Example Label"><Story /></FormFieldWrapper>],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: "default-checkbox",
    label: "Default Checkbox",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: "checked-checkbox",
    label: "Checked Checkbox",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-checkbox",
    label: "Disabled Checkbox",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: "disabled-checked-checkbox",
    label: "Disabled Checked Checkbox",
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    id: "error-checkbox",
    label: "Checkbox with Error",
    checked: false,
    error: "This is an error message",
  },
};

export const WithErrorChecked: Story = {
  args: {
    id: "error-checked-checkbox",
    label: "Checkbox with Error (Checked)",
    checked: true,
    error: "This is an error message",
  },
};

export const NoLabel: Story = {
  args: {
    id: "no-label-checkbox",
    checked: false,
  },
};
