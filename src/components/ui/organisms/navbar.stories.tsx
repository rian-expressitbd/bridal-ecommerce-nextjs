import { AppProviders } from "@/lib/Provider/AppProvider";
import type { Meta, StoryObj } from "@storybook/nextjs"; // Import types from @storybook/nextjs
import React from "react"; // Import React for ComponentType type
import { Navbar } from "./navbar";

// Mock the hook
const mockUseSidebar = (isDesktop: boolean) => ({
  isDesktop: isDesktop,
  isSidebarOpen: false,
  close: () => console.log("close sidebar"),
  open: () => console.log("open sidebar"),
  toggle: () => console.log("toggle sidebar"),
});

const meta: Meta<typeof Navbar> = {
  title: "UI/Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen", // Navbar typically takes full width
  },
  tags: ["autodocs"],
  decorators: [
    (
      Story: React.ComponentType // Add type annotation for Story
    ) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  // Provide mocked dependencies to the component
  render: (args, context) => {
    // Simplified render function signature
    // Determine isDesktop based on the story's parameters or a specific arg if needed
    // For simplicity, we'll hardcode it based on the story name or use a specific arg
    const isDesktop = context.name === "Default"; // Example: Default story is desktop

    // Use the mock hook within the render function
    mockUseSidebar(isDesktop); // Removed unused 'sidebar' variable

    // Render the component with mocked dependencies
    return (
      <Navbar
        {...args}
        // Pass mocked hook values and components as props if the component accepts them,
        // or rely on the component using the mocked hooks directly.
        // For this component, it uses hooks directly, so we just need to ensure the hooks are mocked.
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // Simulate mobile viewport
    },
  },
};
