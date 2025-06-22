import useTheme from "@/hooks/useTheme"; // Import the hook

import type { Meta, StoryObj } from "@storybook/nextjs";
import ThemeColorPicker from "./theme-picker"; // Assuming the component is exported as default


import { Mock, vi } from "vitest"; // Added import from vitest

// Mock the useTheme hook for Storybook
vi.mock("@/hooks/useTheme", () => ({
  // Changed jest.mock to vi.mock
  __esModule: true, // This is important for default exports
  default: vi.fn(), // Changed jest.fn() to vi.fn()
}));

// Helper function to mock the useTheme hook return value
const mockUseTheme = (color: string) => ({
  mode: "light", // Added mode property
  color,
  toggleMode: () => console.log("toggleMode called"), // Added toggleMode function
  changeColor: (color: string) => console.log(`Theme color changed to: ${color}`),
});

const meta: Meta<typeof ThemeColorPicker> = {
  title: "UI/Molecules/ThemeColorPicker",
  component: ThemeColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // No specific argTypes needed as the component relies on a hook
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    // Mock the hook return value for this story
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("red")); // Corrected type assertion
    return <ThemeColorPicker {...args} />;
  },
  args: {
    // No args needed
  },
};

export const GreenTheme: Story = {
  render: (args) => {
    // Mock the hook return value for this story
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("green")); // Corrected type assertion
    return <ThemeColorPicker {...args} />;
  },
  args: {
    // No args needed
  },
};

export const BlueTheme: Story = {
  render: (args) => {
    // Mock the hook return value for this story
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("blue")); // Corrected type assertion
    return <ThemeColorPicker {...args} />;
  },
  args: {
    // No args needed
  },
};

export const SageTheme: Story = {
  render: (args) => {
    // Mock the hook return value for this story
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("sage")); // Corrected type assertion
    return <ThemeColorPicker {...args} />;
  },
  args: {
    // No args needed
  },
};
