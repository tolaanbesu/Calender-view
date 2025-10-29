import { useState, useCallback } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import {useEventManager} from "./useEventManager";
export function useKeyboardDrag() {
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [announceMsg, setAnnounceMsg] = useState<string>("");
  const {handleSave} = useEventManager()

  // helper to move event by X days or Y minutes
  const moveEvent = useCallback(
    (event: CalendarEvent, dayDelta: number, minuteDelta: number) => {
      const newStart = new Date(event.startDate);
      const newEnd = new Date(event.endDate);
      newStart.setDate(newStart.getDate() + dayDelta);
      newEnd.setDate(newEnd.getDate() + dayDelta);
      newStart.setMinutes(newStart.getMinutes() + minuteDelta);
      newEnd.setMinutes(newEnd.getMinutes() + minuteDelta);
      return { ...event, startDate: newStart, endDate: newEnd };
    },
    []
  );

  const EventHandlers =(e: React.KeyboardEvent<HTMLDivElement>)=>{
    if (!activeEvent) return;
    switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          handleSave(moveEvent(activeEvent, 0, -30));
          setAnnounceMsg(`Moved ${activeEvent.title} up 30 minutes`);
          break;
        case "ArrowDown":
          e.preventDefault();
          handleSave(moveEvent(activeEvent, 0, 30));
          setAnnounceMsg(`Moved ${activeEvent.title} down 30 minutes`);
          break;
        case "ArrowLeft":
          e.preventDefault();
           // move 1 day earlier
          handleSave(moveEvent(activeEvent, -1, 0));
          setAnnounceMsg(`Moved ${activeEvent.title} one day earlier`);
          break;
        case "ArrowRight":
          e.preventDefault();
            // move 1 day later
          handleSave(moveEvent(activeEvent, 1, 0));
          setAnnounceMsg(`Moved ${activeEvent.title} one day later`);
          break;
        case "Escape":
          setActiveEvent(null);
          setAnnounceMsg("Cancelled movement");
          break;
        default:
          break;
      }
  }


  return {
    activeEvent,
    setActiveEvent,
    announceMsg,
    setAnnounceMsg,
    moveEvent,
    EventHandlers
  };
}
