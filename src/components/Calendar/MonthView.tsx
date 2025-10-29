import React, { useMemo, memo } from "react";
import {startOfWeek,startOfMonth,isSameMonth,isToday,format, isSameDay } from "../../utils/date.utils";
import { cn } from "../../utils/class.utils";
import { CalendarCell } from "./CalendarCell"; 
import { MonthViewProps } from "../Calendar/CalendarView.types";



// Wrapped in memo for performance
export const MonthView: React.FC<MonthViewProps> = memo(({currentDate,events,onDateClick,openModal,})=>{
  
  // Memoize the 42-cell grid generation for performance
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = startOfMonth(currentDate);
    const startGrid = startOfWeek(firstDayOfMonth); // Start from Sunday of the first week

    // Generate 42 days (6 weeks * 7 days)
    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startGrid);
      date.setDate(startGrid.getDate() + i);
      date.setHours(0, 0, 0, 0);

      // Find events for that specific day
      const dayEvents = events.filter(e => isSameDay(e.startDate, date) || isSameDay(e.endDate, date) ||
          (e.startDate < date && e.endDate > date)).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      return {
        date,
        isCurrentMonth: isSameMonth(date, currentDate),
        isToday: isToday(date),
        dayEvents,
        key: format(date, "yyyy-MM-dd")
      };
    });
  }, [currentDate, events]);

  const dayNames = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  const handleCellClick = (date: Date) => {
    onDateClick(date);
    openModal();
  };

  return (
    <div className="flex flex-col border border-neutral-300 shadow-2xl rounded-xl overflow-hidden bg-white h-full max-h-[calc(100vh-120px)]">
      {/* Day names header */}
      <div className="grid grid-cols-7 border-b border-neutral-300 bg-neutral-50/70 sticky top-0 z-20">
        {
        dayNames.map((name, index) => (
          <div
            key={name}
            className={cn(
              "p-2 text-center text-sm font-semibold text-neutral-600",
              index === 0 && "border-l-0",
              index > 0 && "border-l border-neutral-200"
            )}
            aria-label={`Day of the week: ${name}`}
          >
            {name}
          </div>
        ))
        }
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 grid-rows-6 flex-1 h-full">
          {calendarGrid.map(({ date, isCurrentMonth, isToday, dayEvents, key }) => (
            <CalendarCell
              key={key}
              date={date}
              events={dayEvents}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
              onClick={handleCellClick}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

MonthView.displayName = "MonthView";
