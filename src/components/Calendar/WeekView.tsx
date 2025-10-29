import React, { memo, useMemo, useCallback, useState, useEffect } from "react";
import { WeekViewProps, CalendarEvent } from "../Calendar/CalendarView.types";
import { startOfWeek, setTime, eachHour, format, isSameDay, isWithin } from "../../utils/date.utils";
import { cn } from "../../utils/class.utils";
import { useKeyboardDrag } from "../../hooks/useKeyboardDrag";
import { WeekDayHeader } from "../WeekviewComponents/WeekDayHeader";
import { TimeSlot } from "../WeekviewComponents/TimeSlot";
import { EventItem } from "../WeekviewComponents/EventItem";
import { NowLine } from "../WeekviewComponents/NowLine";

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const ROW_HEIGHT = 60;

export const WeekView: React.FC<WeekViewProps> = memo(({ currentDate, events, openModal }) => {
  const getNowOffset = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * MINUTES_IN_HOUR + now.getMinutes();
    return (currentMinutes / MINUTES_IN_HOUR) * ROW_HEIGHT;
  }, []);

  const [nowOffset, setNowOffset] = useState(getNowOffset());
  const today = useMemo(() => new Date(), []);
  const weekStart = useMemo(() => startOfWeek(currentDate), [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => setNowOffset(getNowOffset()), 60000);
    return () => clearInterval(interval);
  }, [getNowOffset]);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  }), [weekStart]);

  const hours = useMemo(() => {
    const startHour = setTime(today, 0, 0);
    const endHour = setTime(today, HOURS_IN_DAY - 1, 0);
    return eachHour(startHour, endHour);
  }, [today]);

  const getEventStyle = useCallback((event: CalendarEvent) => {
    const startTimeInMinutes = event.startDate.getHours() * 60 + event.startDate.getMinutes();
    const durationInMinutes = Math.max(15, (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60));
    const top = (startTimeInMinutes / MINUTES_IN_HOUR) * ROW_HEIGHT;
    const height = (durationInMinutes / MINUTES_IN_HOUR) * ROW_HEIGHT;
    return { top: `${top}px`, height: `${height}px`, backgroundColor: event.color, zIndex: 10 };
  }, []);

  const getEventsForDay = useCallback((day: Date) => {
    return events
      .filter(e => isWithin(day, e.startDate, e.endDate) || isSameDay(day, e.startDate) || isSameDay(day, e.endDate))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [events]);

  const { setActiveEvent, EventHandlers, announceMsg } = useKeyboardDrag();

  return (
    <div className="flex flex-col border border-neutral-300 shadow-2xl rounded-xl overflow-hidden bg-white h-full max-h-[calc(100vh-120px)]">
      <div className="grid grid-cols-[50px_repeat(7,minmax(0,1fr))] border-b border-neutral-300 bg-neutral-50/70 sticky top-0 z-20">
        <div className="p-2 border-r border-neutral-200" />
        {days.map(day => <WeekDayHeader key={format(day, "d")} day={day} today={today} />)}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[50px_repeat(7,minmax(0,1fr))]">
          <div className="sticky left-0 bg-white z-20">
            {hours.map(hour => (
              <div key={format(hour, "HH")} className="h-[60px] pr-2 text-right text-xs text-neutral-500 pt-[-6px]" aria-hidden="true">
                {format(hour, "h a")}
              </div>
            ))}
          </div>

          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isTodayColumn = isSameDay(day, today);

            return (
              <div key={format(day, "yyyy-MM-dd")} className={cn("relative border-l border-neutral-200 min-h-[1440px]", "border-r border-neutral-200")}>
                {hours.map(hour => <TimeSlot key={format(hour, "HH")} day={day} hour={hour} openModal={openModal} />)}
                {isTodayColumn && <NowLine nowOffset={nowOffset} />}
                {dayEvents.map(ev => (
                  <EventItem key={ev.id} event={ev} openModal={openModal} getEventStyle={getEventStyle} setActiveEvent={setActiveEvent} EventHandlers={EventHandlers} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">{announceMsg}</div>
    </div>
  );
});

WeekView.displayName = "WeekView";
