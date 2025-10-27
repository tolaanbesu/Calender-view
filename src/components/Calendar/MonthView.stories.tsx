import type { Meta, StoryObj } from "@storybook/react";
import { MonthView } from "./MonthView";
import { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof MonthView> = {
  title: "Calendar/MonthView",
  component: MonthView,
};
export default meta;

type Story = StoryObj<typeof MonthView>;

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Event 1",
    startDate: new Date(2025, 9, 1, 10, 0), // October 1, 2025, 10:00 AM
    endDate: new Date(2025, 9, 1, 11, 0),   // October 1, 2025, 11:00 AM
    color: "#0ea5e9",
  },
  {
    id: "2",
    title: "Event 2",
    startDate: new Date(2025, 9, 1, 12, 0), // October 1, 2025, 12:00 PM
    endDate: new Date(2025, 9, 1, 13, 0),   // October 1, 2025, 1:00 PM
    color: "#f97316",
  },
  {
    id: "3",
    title: "Event 3",
    startDate: new Date(2025, 9, 5, 9, 0),  // October 5, 2025, 9:00 AM
    endDate: new Date(2025, 9, 5, 10, 0),    // October 5, 2025, 10:00 AM
    color: "#34d399",
  },
];

export const Default: Story = {
  render: () => (
    <MonthView
      currentDate={new Date(2025, 9, 1)} // Set to October 1, 2025
      events={mockEvents}
      onDateClick={(date) => console.log("Date clicked:", date)}
      openModal={(event) => console.log("Modal opened for event:", event)}
    />
  ),
};