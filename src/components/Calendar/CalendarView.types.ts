//data type for event
export interface CalendarEvent{
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    category?: string;
}

export type ViewMode = "month" | "week";

//expected props(properties) for calendarView component
export interface CalendarViewProps{
    events: CalendarEvent[];
    onEventAdd: (event: CalendarEvent) =>void;
    onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
    onEventDelete: (id:string) => void;
    initialView?: ViewMode;
    initialDate?: Date;
}

//expected props for EventModal component
export interface EventModalProps{
  open: boolean;
  event?: CalendarEvent;
  onClose: () => void;
  onSave: (e: CalendarEvent) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick: (date: Date) => void;
  openModal?: (event?: CalendarEvent) => void; // optional: opens modal for event or date
}

export interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  openModal: (event?: CalendarEvent) => void;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  openModal: (event?: CalendarEvent) => void;
}


