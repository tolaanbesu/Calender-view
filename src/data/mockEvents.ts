import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { format } from "date-fns";

// Helper to create dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const createEvent = (id: string,title: string,startHour: number,endHour: number,day: Date,color: string,description?: string
): CalendarEvent => {
  const startDate = new Date(day);
  startDate.setHours(startHour, 0, 0, 0);
  const endDate = new Date(day);
  endDate.setHours(endHour, 0, 0, 0);

  return {
    id: id,
    title: title,
    startDate,
    endDate,
    color,
    description: description || `Event description for ${title} on ${format(day, "PPPP")}`,
  };
};

export const MOCK_EVENTS: CalendarEvent[] = [
  createEvent("1", "Team Standup", 9, 10, today, "#1D4ED8", "Daily sync meeting with the development team."),
  createEvent("2", "Deep Focus Time", 10, 12, today, "#059669"),
  createEvent("3", "Client Demo Prep", 12, 13, today, "#F59E0B", "Review and finalize slides for the Q4 demo."),
  createEvent("4", "Late Meeting (Today)", 14, 15, today, "#EF4444"),

  
  createEvent("5", "Design Review", 11, 12, tomorrow, "#8B5CF6", "Review UX flows with the design team."),
  createEvent("6", "Onboarding Session", 15, 17, tomorrow, "#1D4ED8"),

  createEvent("7", "Project Kickoff", 10, 11, yesterday, "#059669"),

  createEvent("8", "Sprint Planning", 9, 12, nextWeek, "#EF4444"),
  createEvent("9", "Code Freeze", 13, 13.5, nextWeek, "#F59E0B"),
];

export const initialMockEvents: CalendarEvent[] = [
  { id: "1", title: "Project Kickoff", startDate: new Date(2025, 9, 29, 10, 0), endDate: new Date(2025, 9, 29, 11, 30), color: "#1D4ED8" },
  { id: "2", title: "Review Meeting", startDate: new Date(2025, 10, 5, 14, 0), endDate: new Date(2025, 10, 5, 15, 0), color: "#059669" },
  { id: "3", title: "Doctor Appointment", startDate: new Date(2025, 10, 10, 8, 0), endDate: new Date(2025, 10, 10, 9, 0), color: "#EF4444" },
  { id: "4", title: "Full Day Seminar", startDate: new Date(2025, 9, 27, 9, 0), endDate: new Date(2025, 9, 27, 17, 0), color: "#F59E0B" },
];

export const EMPTY_EVENTS: CalendarEvent[] = [];
