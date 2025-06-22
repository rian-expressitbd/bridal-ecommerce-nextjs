import type { Meta, StoryObj } from "@storybook/nextjs";
import { RadioButton } from "./radio-btn";

const meta: Meta<typeof RadioButton> = {
  title: "UI/Atoms/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    inputClassName: { control: "text" },
    labelClassName: { control: "text" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    id: "default-radio",
    name: "radio-group",
    value: "default",
    label: "Default Radio Button",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: "checked-radio",
    name: "radio-group",
    value: "checked",
    label: "Checked Radio Button",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-radio",
    name: "radio-group",
    value: "disabled",
    label: "Disabled Radio Button",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    id: "error-radio",
    name: "radio-group",
    value: "error",
    label: "Error Radio Button",
    error: true,
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    id: "checked-disabled-radio",
    name: "radio-group",
    value: "checked-disabled",
    label: "Checked and Disabled",
    checked: true,
    disabled: true,
  },
};
