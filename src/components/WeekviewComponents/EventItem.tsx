import React from "react";
import { CalendarEvent } from "../Calendar/CalendarView.types";
import { format } from "../../utils/date.utils";

interface EventItemProps {
  event: CalendarEvent;
  openModal: (event: CalendarEvent) => void;
  getEventStyle: (event: CalendarEvent) => React.CSSProperties;
  setActiveEvent: (event: CalendarEvent) => void;
  EventHandlers?: React.KeyboardEventHandler<HTMLDivElement>;
}

export const EventItem: React.FC<EventItemProps> = ({ event, openModal, getEventStyle, setActiveEvent, EventHandlers }) => (
  <div className="absolute group" style={getEventStyle(event)}>
    <div
      className="text-xs rounded-lg text-white p-1 cursor-pointer overflow-hidden shadow-md border-2 border-white transition-transform hover:scale-[1.01]"
      onClick={(e) => { e.stopPropagation(); openModal(event); }}
      role="button"
      tabIndex={0}
      aria-label={`Event: ${event.title}, ${format(event.startDate, 'p')} to ${format(event.endDate, 'p')}`}
      onFocus={() => setActiveEvent(event)}
      onKeyDown={() => EventHandlers}
    >
      <div className="font-semibold truncate text-[12px]">{event.title || "(No title)"}</div>
      <div className="text-[10px] opacity-90">
        {format(event.startDate, "h:mm a")} - {format(event.endDate, "h:mm a")}
      </div>
    </div>

    {event.description && (
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 
            bg-gray-800 text-white 
            text-sm p-3 
            shadow-2xl shadow-indigo-500/50 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            pointer-events-none z-[500] 
            max-w-xs whitespace-normal break-words rounded-lg border border-indigo-400">
    <strong className="block mb-1 text-indigo-300">Event Highlight:</strong>
    {event.description}
    
</div>

    )}
  </div>
);
