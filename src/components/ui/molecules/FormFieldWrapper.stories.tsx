import type { Meta, StoryObj } from "@storybook/nextjs";
import { InputField } from "../atoms/input-field"; // Assuming InputField is available
import { FormFieldWrapper } from "./FormFieldWrapper";

const meta: Meta<typeof FormFieldWrapper> = {
  title: "UI/Molecules/FormFieldWrapper",
  component: FormFieldWrapper,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    warning: { control: "text" },
    required: { control: "boolean" },
    showError: { control: "boolean" },
    labelRightElement: { control: false }, // Hide control for ReactNode
    preserveErrorSpace: { control: "boolean" },
    children: { control: "text" }, // Represent children as text for simplicity in args
    className: { control: "text" },
  },
  args: {
    id: "example-field",
    label: "Example Field",
    required: false,
    showError: true,
    preserveErrorSpace: true,
    children: '<div><input type="text" class="border p-2 rounded w-full" placeholder="Enter text" /></div>', // Default child content
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldWrapper>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    error: "This field has an error.",
  },
};

export const WithWarning: Story = {
  args: {
    warning: "This field has a warning.",
  },
};

export const WithErrorAndWarning: Story = {
  args: {
    error: "This field has an error.",
    warning: "This field also has a warning.",
  },
};

export const RequiredField: Story = {
  args: {
    required: true,
  },
};

export const WithLabelRightElement: Story = {
  args: {
    labelRightElement: <span className='text-xs text-gray-500'>Optional</span>,
  },
};

export const WithoutErrorSpacePreserved: Story = {
  args: {
    error: "This error will collapse space.",
    preserveErrorSpace: false,
  },
};

export const WithoutErrorDisplay: Story = {
  args: {
    error: "This error will not be shown.",
    showError: false,
  },
};

// Story with an actual InputField component as a child
export const WithInputFieldChild: Story = {
  args: {
    label: "Input Field Example",
    id: "input-field-example",
    children: <InputField id='input-field-example' placeholder='Enter text here' />,
  },
};

export const WithInputFieldChildAndError: Story = {
  args: {
    label: "Input Field Example with Error",
    id: "input-field-example-error",
    error: "This is an input error.",
    children: <InputField id='input-field-example-error' placeholder='Enter text here' />,
  },
};
