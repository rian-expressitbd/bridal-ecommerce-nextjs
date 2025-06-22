import type { Meta, StoryObj } from "@storybook/nextjs";
import { CalendarMonthView } from "./CalendarMonthView";

const meta: Meta<typeof CalendarMonthView> = {
  title: "UI/Molecules/Calendar/CalendarMonthView",
  component: CalendarMonthView,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarMonthView>;

const mockOnViewModeChange = (mode: "date" | "month" | "year") => {
  console.log("View mode changed to:", mode);
};

export const Default: Story = {
  args: {
    currentDate: new Date(),
    onViewModeChange: mockOnViewModeChange,
  },
};

export const WithError: Story = {
  args: {
    currentDate: new Date(),
    onViewModeChange: mockOnViewModeChange,
    error: "Error state",
  },
};

export const Disabled: Story = {
  args: {
    currentDate: new Date(),
    onViewModeChange: mockOnViewModeChange,
    disabled: true,
  },
};
