import { Meta, StoryObj } from "@storybook/react";
import { WeekView } from "./WeekView";
import { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof WeekView> = {
  title: "Calendar/WeekView",
  component: WeekView,
};
export default meta;

type Story = StoryObj<typeof WeekView>;

// Mock events
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Meeting",
    startDate: new Date(2025, 9, 1, 10, 0), // October 1, 2025, 10:00 AM
    endDate: new Date(2025, 9, 1, 11, 0),   // October 1, 2025, 11:00 AM
    color: "#0ea5e9",
  },
  {
    id: "2",
    title: "Lunch",
    startDate: new Date(2025, 9, 1, 12, 0), // October 1, 2025, 12:00 PM
    endDate: new Date(2025, 9, 1, 13, 0),   // October 1, 2025, 1:00 PM
    color: "#f97316",
  },
  {
    id: "3",
    title: "Conference",
    startDate: new Date(2025, 9, 2, 9, 0),  // October 2, 2025, 9:00 AM
    endDate: new Date(2025, 9, 2, 10, 0),    // October 2, 2025, 10:00 AM
    color: "#34d399",
  },
];

export const Default: Story = {
  render: () => (
    <WeekView
      currentDate={new Date(2025, 9, 1)} // Set to October 1, 2025
      events={mockEvents}
      openModal={(event) => console.log("Modal opened for event:", event)}
    />
  ),
};