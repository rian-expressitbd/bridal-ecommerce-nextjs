import type { Meta, StoryObj } from "@storybook/nextjs";
import OTPInput from "./otp-input";

const meta: Meta<typeof OTPInput> = {
  title: "UI/Atoms/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 1, max: 10 } },
    onChange: { action: "otp changed" },
    error: { control: "text" },
    success: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {
    length: 6,
  },
};

export const WithError: Story = {
  args: {
    length: 6,
    error: "Invalid OTP",
  },
};

export const WithSuccess: Story = {
  args: {
    length: 6,
    success: true,
  },
};

export const CustomLength: Story = {
  args: {
    length: 4,
  },
};
