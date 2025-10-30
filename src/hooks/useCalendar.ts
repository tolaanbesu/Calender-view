import { useState, useCallback, useMemo } from "react";
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format,
  startOfWeek, 
  endOfWeek
} from "../utils/date.utils";
import { ViewMode } from "../components/Calendar/CalendarView.types";

/**
Handles all core calendar state: current date, view mode, and navigation.
 */
export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const goToNext = useCallback(() => {
    setCurrentDate((prev) =>
      viewMode === "month"
        ? addMonths(prev, 1)
        : addWeeks(prev, 1)
    );
  }, [viewMode]);

  const goToPrev = useCallback(() => {
    setCurrentDate((prev) =>
      viewMode === "month"
        ? subMonths(prev, 1)
        : subWeeks(prev, 1)
    );
  }, [viewMode]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const setViewModeCallback = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const headerTitle = useMemo(() => {
    if (viewMode === "month") {
      return format(currentDate, "MMMM yyyy");
    }
    const start = startOfWeek(currentDate); 
    const end = endOfWeek(currentDate);

  const startOfWeekStr = format(start, "MMM d");
  const endOfWeekStr = format(end, "MMM d, yyyy");

    return `${startOfWeekStr} - ${endOfWeekStr}`;
  }, [currentDate, viewMode]);

  return {
    currentDate,
    viewMode,
    headerTitle,
    goToNext,
    goToPrev,
    goToToday,
    setViewMode: setViewModeCallback,
  };
};