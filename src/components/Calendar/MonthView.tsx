// src/components/Calendar/MonthView.tsx
import React, { useMemo } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { startOfWeek, isSameDay } from "../../utils/date.utils";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  openModal: (event?: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  openModal,
}) => {
  const today = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startGrid = startOfWeek(firstDay);

  const dates = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(startGrid);
      d.setDate(startGrid.getDate() + i);
      return d;
    });
  }, [startGrid]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col border border-neutral-300 shadow-xl rounded-xl overflow-hidden bg-white h-full max-h-[75vh]">
      <div className="grid grid-cols-7 border-b border-neutral-300 bg-neutral-50">
        {dayNames.map((d) => (
          <div
            key={d}
            className="p-2 text-center text-sm font-semibold text-neutral-700"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-grow overflow-y-auto">
        {dates.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(date, today);
          const dayEvents = events.filter(
            (e) => isSameDay(e.startDate, date) || isSameDay(e.endDate, date)
          );

          return (
            <div
              key={idx}
              className={`h-28 p-2 border-r border-b border-neutral-200 cursor-pointer transition ${
                isCurrentMonth
                  ? "bg-white hover:bg-neutral-50"
                  : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
              } ${isToday ? "ring-2 ring-red-500 ring-offset-1 z-10" : ""}`}
              onClick={() => onDateClick(date)}
            >
              <span
                className={`text-sm font-bold block mb-1 ${
                  isToday ? "text-red-600" : "text-neutral-900"
                }`}
              >
                {date.getDate()}
              </span>

              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className="text-[10px] font-medium truncate px-1 py-0.5 rounded-sm text-white shadow-sm"
                    style={{ backgroundColor: e.color }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openModal(e);
                    }}
                  >
                    {e.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-blue-600 font-medium mt-1">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
