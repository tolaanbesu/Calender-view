//src/components/Calendar/WeekView.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { startOfWeek, isSameDay } from "../../utils/date.utils";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  openModal: (event?: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  openModal,
}) => {
  const getNowOffset = useCallback(() => {
    const now = new Date();
    const currentHours = now.getHours()+now.getMinutes()/60;
    return (currentHours)*4;
  }, []);

  const [nowOffset, setNowOffset] = useState(getNowOffset());
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const interval = setInterval(() => setNowOffset(getNowOffset()), 60000);
    return () => clearInterval(interval);
  }, [getNowOffset]);

  const start = startOfWeek(currentDate);
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });
  }, [start]);

  const getEventStyle = (ev: CalendarEvent) => {
    const startH = ev.startDate.getHours() + ev.startDate.getMinutes() / 60;
    const endH = ev.endDate.getHours() + ev.endDate.getMinutes() / 60;
    const height = Math.max((endH - startH) * 4, 0.5);

    return {
      top: `${startH * 4}rem`,
      height: `${height}rem`,
      backgroundColor: ev.color || "#0ea5e9",
      left: "4px",
      right: "4px",
      width: "calc(100% - 8px)",
    } as React.CSSProperties;
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col border border-neutral-300 rounded-xl shadow-xl overflow-hidden bg-white max-h-[calc(100vh-160px)]">
      {/* Headers */}
      <div className="grid grid-cols-7 border-b border-neutral-300 bg-neutral-50 sticky top-0 z-20 ml-16">
        {days.map((day, i) => {
          const isToday = isSameDay(day, today);
          return (
            <div
              key={i}
              className={`p-2 text-center border-r border-neutral-200 ${
                isToday ? "bg-red-50" : "hover:bg-neutral-100"
              }`}
            >
              <span className="text-sm font-semibold text-neutral-700 block">
                {day.toLocaleDateString([], { weekday: "short" })}
              </span>
              <span
                className={`block text-xl font-bold ${
                  isToday ? "text-red-600" : "text-neutral-900"
                }`}
              >
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex overflow-y-auto flex-grow">
        <div className="w-16 flex-shrink-0 border-r border-neutral-300 text-xs text-neutral-500 bg-neutral-50 sticky left-0 z-30">
          {hours.map((h) => (
            <div
              key={h}
              className="h-16 border-b border-neutral-200 text-right pr-2 text-[11px] font-medium relative"
            >
              <span className="absolute bottom-[-8px] right-2">
                {new Date(0, 0, 0, h).toLocaleTimeString([], {
                  hour: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Day Columns */}
        <div className="flex-1 grid grid-cols-7 relative">
          {days.map((day) => {
            const isToday = isSameDay(day, today);
            const dayEvents = events.filter((e) =>
              isSameDay(e.startDate, day)
            );

            return (
              <div
                key={day.toISOString()}
                className={`border-r border-neutral-200 relative min-h-[96rem] ${
                  isToday ? "bg-red-50/10" : "bg-white"
                }`}
                onClick={() =>
                  openModal()
                }
              >
                {hours.map((h) => (
                  <div
                    key={h}
                    className="h-16 border-b border-dashed border-neutral-100"
                  />
                ))}

                {/* Now Line */}
                {isToday && (
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-red-600 z-50"
                    style={{ top: `${nowOffset}rem` }}
                  >
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-red-600" />
                    <span className="absolute -top-2 left-4 text-[10px] text-red-600 font-semibold bg-white px-1 rounded shadow-md">
                      Now
                    </span>
                  </div>
                )}

                {/* Events */}
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="absolute text-xs rounded-md text-white p-1 cursor-pointer overflow-hidden shadow-sm"
                    style={getEventStyle(ev)}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(ev);
                    }}
                  >
                    <div className="font-semibold truncate text-[12px]">
                      {ev.title || "(No title)"}
                    </div>
                    <div className="text-[10px] opacity-90">
                      {ev.startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      -{" "}
                      {ev.endDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
