import type { Meta, StoryObj } from "@storybook/nextjs";
import { CalendarYearView } from "./CalendarYearView";

const meta: Meta<typeof CalendarYearView> = {
  title: "UI/Molecules/Calendar/CalendarYearView",
  component: CalendarYearView,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarYearView>;

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
