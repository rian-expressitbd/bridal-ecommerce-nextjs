import { useSidebar } from "@/hooks/useSidebar"; // Import the hook
import type { Meta, StoryObj } from "@storybook/nextjs";
import { SidebarToggler } from "./sidebarToggler"; // Assuming the component is exported as SidebarToggler

import { Mock, vi } from "vitest";

// Mock the useSidebar hook for Storybook
vi.mock("@/hooks/useSidebar", () => ({
  useSidebar: vi.fn(),
}));

const meta: Meta<typeof SidebarToggler> = {
  title: "UI/Molecules/SidebarToggler",
  component: SidebarToggler,
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
    (useSidebar as Mock<typeof useSidebar>).mockReturnValue({
      isSidebarOpen: false,
      isDesktop: true, // Added isDesktop property
      open: () => console.log("open called"), // Added open function
      close: () => console.log("close called"), // Added close function
      toggle: () => console.log("Sidebar toggled"),
    });
    return <SidebarToggler {...args} />;
  },
  args: {
    // No args needed
  },
};

export const SidebarOpen: Story = {
  render: (args) => {
    // Mock the hook return value for this story
    (useSidebar as Mock<typeof useSidebar>).mockReturnValue({
      isSidebarOpen: true,
      isDesktop: true, // Added isDesktop property
      open: () => console.log("open called"), // Added open function
      close: () => console.log("close called"), // Added close function
      toggle: () => console.log("Sidebar toggled"),
    });
    return <SidebarToggler {...args} />;
  },
  args: {
    // No args needed
  },
};
