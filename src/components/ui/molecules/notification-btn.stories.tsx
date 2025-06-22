import type { Meta, StoryObj } from "@storybook/nextjs";
import NotificationsDropdown from "./notification-btn"; // Assuming the component is exported as default

const meta: Meta<typeof NotificationsDropdown> = {
  title: "UI/Molecules/NotificationsDropdown",
  component: NotificationsDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    notifications: {
      control: "object",
      description: "Array of notification objects.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notifications: [
      {
        id: 1,
        date: "2023-10-26",
        time: "10:00 AM",
        name: "John Doe",
        message: 'New message from John Doe: "Hey, are you free?"',
      },
      { id: 2, date: "2023-10-26", time: "10:05 AM", name: "Jane Smith", message: "You have a new order #12345." },
      { id: 3, date: "2023-10-26", time: "10:15 AM", name: "System", message: "Your profile has been updated." },
    ],
  },
};

export const NoNotifications: Story = {
  args: {
    notifications: [],
  },
};

export const ManyNotifications: Story = {
  args: {
    notifications: Array.from({ length: 15 }).map((_, i) => ({
      id: i + 1,
      date: "2023-10-26",
      time: `10:${10 + i} AM`,
      name: `User ${i + 1}`,
      message: `This is notification number ${i + 1}.`,
    })),
  },
};
