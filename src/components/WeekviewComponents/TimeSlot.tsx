import React from "react";
import { setTime, format } from "../../utils/date.utils";
import { CalendarEvent } from "../Calendar/CalendarView.types";

interface TimeSlotProps {
  day: Date;
  hour: Date;
  openModal: (event: CalendarEvent) => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ day, hour, openModal }) => {
  const handleClick = () => {
    const newEventDate = setTime(day, hour.getHours(), hour.getMinutes());
    openModal({
      id: "",
      title: "",
      startDate: newEventDate,
      endDate: setTime(newEventDate, newEventDate.getHours() + 1, newEventDate.getMinutes()),
      color: "#1D4ED8",
    });
  };

  return (
    <div
      className="h-[60px] border-b border-neutral-100"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Create event on ${format(day, "MMM d")} at ${format(hour, "h a")}`}
    />
  );
};
