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
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);

// Helper factory function for concise event creation
const createEvent = (
  id: string,
  title: string,
  startHour: number,
  endHour: number,
  day: Date,
  color: string,
  description?: string
): CalendarEvent => {
  const startDate = new Date(day);
  startDate.setHours(startHour, 0, 0, 0);
  const endDate = new Date(day);
  endDate.setHours(endHour, 0, 0, 0);

  return {
    id,
    title,
    startDate,
    endDate,
    color,
    description:
      description ||
      `Event description for ${title} on ${format(day, "PPPP")}`,
  };
};

export const ORIGINAL_EVENTS: CalendarEvent[] = [
  createEvent("1", "Team Standup", 9, 10, today, "#1D4ED8", "Daily sync meeting with the dev team."),
  createEvent("2", "Deep Focus Time", 10, 12, today, "#059669", "Uninterrupted work block."),
  createEvent("3", "Client Demo Prep", 12, 13, today, "#F59E0B", "Finalize slides for Q4 presentation."),
  createEvent("4", "Late Meeting (Today)", 14, 15, today, "#EF4444", "Catch-up with project leads."),
  createEvent("5", "Design Review", 11, 12, tomorrow, "#8B5CF6", "Review UX flows with design team."),
  createEvent("6", "Onboarding Session", 15, 17, tomorrow, "#1D4ED8", "New hires training session."),
  createEvent("7", "Project Kickoff", 10, 11, yesterday, "#059669", "New project introduction."),
  createEvent("8", "Sprint Planning", 9, 12, nextWeek, "#EF4444", "Define tasks for the upcoming sprint."),
  createEvent("9", "Code Freeze", 13, 13.5, nextWeek, "#F59E0B", "Final code submission before release."),
];

export const ADDITIONAL_EVENTS: CalendarEvent[] = [
  createEvent("10", "Morning Jog", 6, 7, today, "#F59E0B", "Start the day with a refreshing jog."),
  createEvent("11", "Lunch with Alex", 13, 14, today, "#F59E0B", "Discuss marketing ideas."),
  createEvent("12", "Client Call", 15, 16, today, "#059669", "Follow up with enterprise partner."),
  createEvent("13", "Evening Gym", 18, 19, today, "#EF4444", "Workout session."),

  createEvent("14", "Planning Session", 9, 11, tomorrow, "#1D4ED8"),
  createEvent("15", "HR Policy Update", 11, 12, tomorrow, "#8B5CF6"),
  createEvent("16", "Code Review", 13, 14, tomorrow, "#F59E0B"),
  createEvent("17", "Marketing Sync", 15, 16, tomorrow, "#059669"),
  createEvent("18", "Dinner with Family", 19, 21, tomorrow, "#EF4444"),

  createEvent("19", "Doctor Appointment", 10, 11, yesterday, "#EF4444"),
  createEvent("20", "Team Retrospective", 12, 13, yesterday, "#059669"),
  createEvent("21", "UX Testing", 14, 15, yesterday, "#8B5CF6"),

  createEvent("22", "Sprint Review", 9, 11, nextWeek, "#1D4ED8"),
  createEvent("23", "Architecture Review", 13, 15, nextWeek, "#1D4ED8"),
  createEvent("24", "Happy Hour", 17, 18, nextWeek, "#F59E0B"),

  createEvent("25", "Workshop", 10, 13, nextMonth, "#059669"),
  createEvent("26", "Networking Event", 14, 17, nextMonth, "#8B5CF6"),
  createEvent("27", "Budget Review", 9, 10, nextMonth, "#EF4444"),
  createEvent("28", "Content Strategy", 11, 12, nextMonth, "#F59E0B"),
  createEvent("29", "Lunch & Learn", 13, 14, nextMonth, "#1D4ED8"),
  createEvent("30", "Team Dinner", 18, 20, nextMonth, "#059669"),
];

export const MOCK_EVENTS: CalendarEvent[] = [
  ...ORIGINAL_EVENTS,
  ...ADDITIONAL_EVENTS,
];

export const initialMockEvents: CalendarEvent[] = MOCK_EVENTS.slice(0, 15);


export const EMPTY_EVENTS: CalendarEvent[] = [];
