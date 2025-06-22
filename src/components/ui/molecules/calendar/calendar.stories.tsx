import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import Calendar from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "UI/Molecules/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "multi", "range"],
    },
    position: {
      control: { type: "select" },
      options: ["auto", "top", "bottom"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const CalendarWithState = (args: React.ComponentProps<typeof Calendar>) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  return <Calendar {...args} selectedDates={selectedDates} onDateChange={setSelectedDates} />;
};

export const SingleSelect: Story = {
  render: CalendarWithState,
  args: {
    id: "single-calendar",
    label: "Select a Date",
    mode: "single",
  },
};

export const MultiSelect: Story = {
  render: CalendarWithState,
  args: {
    id: "multi-calendar",
    label: "Select Multiple Dates",
    mode: "multi",
  },
};

export const RangeSelect: Story = {
  render: CalendarWithState,
  args: {
    id: "range-calendar",
    label: "Select a Date Range",
    mode: "range",
  },
};

export const WithError: Story = {
  render: CalendarWithState,
  args: {
    id: "calendar-with-error",
    label: "Select a Date",
    mode: "single",
    error: "This field is required",
    required: true,
  },
};

export const Disabled: Story = {
  render: CalendarWithState,
  args: {
    id: "disabled-calendar",
    label: "Select a Date",
    mode: "single",
    disabled: true,
  },
};
