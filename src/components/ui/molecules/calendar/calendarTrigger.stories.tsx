import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarTrigger } from "./calendarTrigger";

const meta: Meta<typeof CalendarTrigger> = {
  title: "UI/Molecules/Calendar/CalendarTrigger",
  component: CalendarTrigger,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarTrigger>;

const mockFormatSelectedDates = (dates: Date[]) => {
  if (dates.length === 0) return "";
  if (dates.length === 1) return dates[0].toLocaleDateString();
  return `${dates.length} dates selected`;
};

const CalendarTriggerWithState = (args: any) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(args.selectedDates || []);
  const [isCalendarOpen, setIsCalendarOpen] = useState(args.isCalendarOpen || false);

  const handleToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDates([]);
  };

  return (
    <CalendarTrigger
      {...args}
      selectedDates={selectedDates}
      isCalendarOpen={isCalendarOpen}
      onToggleCalendar={handleToggleCalendar}
      onClearAll={handleClearAll}
      formatSelectedDates={() => mockFormatSelectedDates(selectedDates)}
    />
  );
};

export const Default: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-default",
    placeholder: "Select a date",
  },
};

export const WithSelectedDates: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-selected",
    placeholder: "Select a date",
    selectedDates: [new Date()],
  },
};

export const WithMultipleSelectedDates: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-multiple-selected",
    placeholder: "Select a date",
    selectedDates: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
  },
};

export const WithError: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-error",
    placeholder: "Select a date",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-disabled",
    placeholder: "Select a date",
    disabled: true,
  },
};

export const CalendarOpen: Story = {
  render: CalendarTriggerWithState,
  args: {
    id: "calendar-trigger-open",
    placeholder: "Select a date",
    isCalendarOpen: true,
  },
};
