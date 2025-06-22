import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarDropdown } from "./calendarDropdown";

const meta: Meta<typeof CalendarDropdown> = {
  title: "UI/Molecules/Calendar/CalendarDropdown",
  component: CalendarDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    viewMode: {
      control: { type: "select" },
      options: ["date", "month", "year"],
    },
    mode: {
      control: { type: "select" },
      options: ["single", "multi", "range"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDropdown>;

const mockDropdownPosition = {
  top: 100,
  left: 100,
  width: 300,
  isAbove: false,
};

type CalendarDropdownProps = React.ComponentProps<typeof CalendarDropdown>;

const CalendarDropdownWithState = (args: CalendarDropdownProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"date" | "month" | "year">(args.viewMode || "date");
  const [selectedDates, setSelectedDates] = useState<Date[]>(args.selectedDates || []);
  const tempStartDate = args.tempStartDate || null;
  const [hoveredDate, setHoveredDate] = useState<Date | null>(args.hoveredDate || null);

  const handleDateClick = (date: Date) => {
    console.log("Date clicked:", date);
    if (args.mode === "single") {
      setSelectedDates([date]);
    } else if (args.mode === "multi") {
      setSelectedDates([...selectedDates, date]);
    } else if (args.mode === "range") {
      setSelectedDates(selectedDates.length === 1 ? [...selectedDates, date] : [date]);
    }
  };

  const handleHoverDate = (date: Date | null) => {
    setHoveredDate(date);
  };

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

  const handleClose = () => {
    console.log("Calendar closed");
  };

  return (
    <CalendarDropdown
      {...args}
      dropdownPosition={mockDropdownPosition}
      currentDate={currentDate}
      viewMode={viewMode}
      selectedDates={selectedDates}
      tempStartDate={tempStartDate}
      hoveredDate={hoveredDate}
      onDateClick={handleDateClick}
      onHoverDate={handleHoverDate}
      onNavigatePrevious={handleNavigatePrevious}
      onNavigateNext={handleNavigateNext}
      onViewModeChange={handleViewModeChange}
      onClose={handleClose}
    />
  );
};

export const DateView: Story = {
  render: CalendarDropdownWithState,
  args: {
    viewMode: "date",
    isMobile: false,
    dualMonth: false,
    showMonthYearSelection: true,
    mode: "single",
  },
};

export const MonthView: Story = {
  render: CalendarDropdownWithState,
  args: {
    viewMode: "month",
    isMobile: false,
    dualMonth: false,
    showMonthYearSelection: true,
    mode: "single",
  },
};

export const YearView: Story = {
  render: CalendarDropdownWithState,
  args: {
    viewMode: "year",
    isMobile: false,
    dualMonth: false,
    showMonthYearSelection: true,
    mode: "single",
  },
};

export const DualMonthView: Story = {
  render: CalendarDropdownWithState,
  args: {
    viewMode: "date",
    isMobile: false,
    dualMonth: true,
    showMonthYearSelection: true,
    mode: "range",
  },
};

export const MobileView: Story = {
  render: CalendarDropdownWithState,
  args: {
    viewMode: "date",
    isMobile: true,
    dualMonth: false,
    showMonthYearSelection: true,
    mode: "single",
  },
};
