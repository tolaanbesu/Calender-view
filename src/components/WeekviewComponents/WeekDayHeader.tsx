import React, { memo } from "react";
import { format, isSameDay } from "../../utils/date.utils";
import { cn } from "../../utils/class.utils";

interface WeekDayHeaderProps {
  day: Date;
  today: Date;
}

export const WeekDayHeader: React.FC<WeekDayHeaderProps> = memo(({ day, today }) => (
  <div
  aria-label={`Date: ${format(day, "EEEE, MMMM d")}`}
  className={cn("p-2 text-center border-r border-neutral-200",isSameDay(day, today)
        ? "bg-white ring-2 ring-inset ring-blue-500 rounded-lg shadow-sm -mt-1"
        : "")}
    >
    <div className="text-xs font-semibold uppercase text-neutral-600">
      {format(day, "EEE")}
    </div>
    <div className={cn("text-xl font-bold", isSameDay(day, today) ? "text-blue-600" : "text-neutral-900")}>
      {format(day, "d")}
    </div>
  </div>
));
WeekDayHeader.displayName = "WeekDayHeader";
