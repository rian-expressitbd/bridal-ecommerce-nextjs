import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarHeader } from "./calendarHeader";

const meta: Meta<typeof CalendarHeader> = {
  title: "UI/Molecules/Calendar/CalendarHeader",
  component: CalendarHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    viewMode: {
      control: { type: "select" },
      options: ["date", "month", "year"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarHeader>;

const CalendarHeaderWithState = (args: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"date" | "month" | "year">(args.viewMode || "date");

  const handleNavigatePrevious = () => {
    if (viewMode === "date") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    } else if (viewMode === "year") {
      setCurrentDate(new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), 1));
    }
  };

  const handleNavigateNext = () => {
    if (viewMode === "date") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    } else if (viewMode === "year") {
      setCurrentDate(new Date(currentDate.getFullYear() + 12, currentDate.getMonth(), 1));
    }
  };

  const handleViewModeChange = (mode: "date" | "month" | "year") => {
    setViewMode(mode);
  };

  return (
    <CalendarHeader
      {...args}
      currentDate={currentDate}
      viewMode={viewMode}
      onNavigatePrevious={handleNavigatePrevious}
      onNavigateNext={handleNavigateNext}
      onViewModeChange={handleViewModeChange}
    />
  );
};

export const DateView: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "date",
    showMonthYearSelection: true,
    dualMonth: false,
  },
};

export const MonthView: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "month",
    showMonthYearSelection: true,
    dualMonth: false,
  },
};

export const YearView: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "year",
    showMonthYearSelection: true,
    dualMonth: false,
  },
};

export const DualMonthDateView: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "date",
    showMonthYearSelection: true,
    dualMonth: true,
  },
};

export const NoMonthYearSelection: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "date",
    showMonthYearSelection: false,
    dualMonth: false,
  },
};

export const WithError: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "date",
    showMonthYearSelection: true,
    dualMonth: false,
    error: "Error state",
  },
};

export const Disabled: Story = {
  render: CalendarHeaderWithState,
  args: {
    viewMode: "date",
    showMonthYearSelection: true,
    dualMonth: false,
    disabled: true,
  },
};
