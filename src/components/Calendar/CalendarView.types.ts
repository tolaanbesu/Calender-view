export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    category?: string;
}

export interface CalendarViewProps {
    events: CalendarEvent[];
    onEventAdd: (event: CalendarEvent) =>void;
    onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
    onEventDelete: (id:string) => void;
    initialView?: 'month' | 'week';
    initialDate?: Date;
}

export interface EventModalProps {
  open: boolean;
  event?: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  selectedDate?: Date| null;
}