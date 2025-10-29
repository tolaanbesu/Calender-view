import { Meta, StoryObj } from "@storybook/react";
import { WeekView } from "./WeekView";
import { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof WeekView> = {
  title: "Calendar/WeekView",
  component: WeekView,
};
export default meta;

type Story = StoryObj<typeof WeekView>;

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Meeting",
    startDate: new Date(2025, 9, 1, 10, 0), 
    endDate: new Date(2025, 9, 1, 11, 0),   
    color: "#0ea5e9",
  },
  {
    id: "2",
    title: "Lunch",
    startDate: new Date(2025, 9, 1, 12, 0), 
    endDate: new Date(2025, 9, 1, 13, 0),  
    color: "#f97316",
  },
  {
    id: "3",
    title: "Conference",
    startDate: new Date(2025, 9, 2, 9, 0),  
    endDate: new Date(2025, 9, 2, 10, 0),    
    color: "#34d399",
  },
];

export const Default: Story = {
  render: () => (
    <WeekView
      currentDate={new Date(2025, 9, 1)} 
      events={mockEvents}
      openModal={(event) => console.log("Modal opened for event:", event)}
    />
  ),
};