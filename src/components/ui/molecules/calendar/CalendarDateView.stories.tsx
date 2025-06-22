import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarDateView } from "./CalendarDateView";

const meta: Meta<typeof CalendarDateView> = {
  title: "UI/Molecules/Calendar/CalendarDateView",
  component: CalendarDateView,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "multi", "range"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDateView>;

type CalendarDateViewProps = {
  mode: "single" | "multi" | "range";
  selectedDates?: Date[];
  tempStartDate?: Date | null;
  hoveredDate?: Date | null;
  currentDate: Date;
  dualMonth?: boolean;
  isMobile: boolean;
  error?: string;
  disabled?: boolean;
  onDateClick?: (date: Date) => void;
  onHoverDate?: (date: Date | null) => void;
};

const CalendarDateViewWithState = (args: CalendarDateViewProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(args.selectedDates || []);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(args.tempStartDate || null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(args.hoveredDate || null);

  const handleDateClick = (date: Date) => {
    if (args.mode === "single") {
      setSelectedDates([date]);
    } else if (args.mode === "multi") {
      const isSelected = selectedDates.some((d) => d.toDateString() === date.toDateString());
      setSelectedDates(
        isSelected ? selectedDates.filter((d) => d.toDateString() !== date.toDateString()) : [...selectedDates, date]
      );
    } else if (args.mode === "range") {
      if (!tempStartDate) {
        setTempStartDate(date);
        setSelectedDates([date]);
      } else {
        const start = tempStartDate < date ? tempStartDate : date;
        const end = tempStartDate < date ? date : tempStartDate;
        setSelectedDates([start, end]);
        setTempStartDate(null);
        setHoveredDate(null);
      }
    }
    if (args.onDateClick) {
      args.onDateClick(date);
    }
  };

  const handleHoverDate = (date: Date | null) => {
    setHoveredDate(date);
    if (args.onHoverDate) {
      args.onHoverDate(date);
    }
  };

  return (
    <CalendarDateView
      {...args}
      selectedDates={selectedDates}
      tempStartDate={tempStartDate}
      hoveredDate={hoveredDate}
      onDateClick={handleDateClick}
      onHoverDate={handleHoverDate}
    />
  );
};

export const SingleMonth: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "single",
    isMobile: false,
  },
};

export const DualMonth: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "range",
    dualMonth: true,
    isMobile: false,
  },
};

export const WithSelectedDates: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "multi",
    selectedDates: [new Date(new Date().setDate(10)), new Date(new Date().setDate(15))],
    isMobile: false,
  },
};

export const WithRangeSelection: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "range",
    tempStartDate: new Date(new Date().setDate(5)),
    hoveredDate: new Date(new Date().setDate(12)),
    dualMonth: true,
    isMobile: false,
  },
};

export const WithError: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "single",
    error: "Error state",
    isMobile: false,
  },
};

export const Disabled: Story = {
  render: CalendarDateViewWithState,
  args: {
    currentDate: new Date(),
    mode: "single",
    disabled: true,
    isMobile: false,
  },
};
