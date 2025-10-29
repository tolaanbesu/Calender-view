import { useState, useCallback, useMemo } from "react";
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format,
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
    const start = subWeeks(currentDate, 0);
    const end = addWeeks(start, 1);
    const startOfWeek = format(start, "MMM d");
    const endOfWeek = format(end, "MMM d, yyyy");
    return `${startOfWeek} - ${endOfWeek}`;
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