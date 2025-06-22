// In your Storybook file (e.g., sidebar.stories.tsx)
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from "./sidebar";

// Define the props type for your Sidebar component
interface SidebarProps {
  isDesktop?: boolean;
  isSidebarOpen?: boolean;
}

// Specify SidebarProps in Meta
const meta: Meta<SidebarProps> = {
  title: "UI/Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => <Sidebar {...args} />, // Simplified render function
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDesktop: true,
    isSidebarOpen: true,
  },
};

export const MobileView: Story = {
  args: {
    isDesktop: false,
    isSidebarOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};