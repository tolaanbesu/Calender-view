"use client";
import React, { memo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, Loader2, CalendarIcon } from "lucide-react";

import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import { CalendarEvent, ViewMode } from "../../components/Calendar/CalendarView.types";
import { Button } from "../primitives/Button";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager } from "../../hooks/useEventManager";

interface CalendarViewProps {
  initialEvents?: CalendarEvent[];
  initialViewMode?: ViewMode;
}

const CalendarView: React.FC<CalendarViewProps> = memo(({ initialEvents = [], initialViewMode = "week" }) => {
  // Calendar state and navigation
  const { currentDate, viewMode, headerTitle, goToNext, goToPrev, goToToday, setViewMode } =
    useCalendar(new Date());

  React.useEffect(() => {
  setViewMode(initialViewMode);
}, [initialViewMode, setViewMode]);


  // Event management
  const { events, selectedEvent, isModalOpen, isLoading, openModal, closeModal, handleSave, handleDelete } =
    useEventManager(initialEvents);

  // Open modal when clicking a date in month view
  const handleMonthDateClick = useCallback(
    (date: Date) => {
      openModal({
        id: "",
        title: "",
        startDate: new Date(date.setHours(9, 0, 0, 0)),
        endDate: new Date(date.setHours(10, 0, 0, 0)),
        color: "#1D4ED8",
      } as CalendarEvent);
    },
    [openModal]
  );

  return (
    <div className="flex flex-col w-full h-full p-2 sm:p-4 bg-neutral-50 font-sans min-h-[80vh]">
  {/* Title */}
  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-8 bg-white shadow-md z-10">
    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 flex items-center gap-2 sm:gap-3">
      <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
      Scheduler Pro
    </h1>
  </header>

  {/* Navigation & Controls */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 mb-4 bg-white rounded-xl shadow-lg border border-neutral-100 gap-2 sm:gap-4">
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <Button variant="secondary" size="sm" onClick={goToToday} aria-label="Jump to today">
        Today
      </Button>

      <div className="flex rounded-lg border border-neutral-300 shadow-inner overflow-hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrev}
          aria-label={`Go to previous ${viewMode}`}
          className="rounded-r-none border-r-0"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          aria-label={`Go to next ${viewMode}`}
          className="rounded-l-none"
        >
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </Button>
      </div>

      <h2 className="text-lg sm:text-2xl font-extrabold text-neutral-800 tracking-tight ml-0 sm:ml-2">{headerTitle}</h2>
    </div>

    {/* View Mode Switch & New Event */}
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
      <div className="flex rounded-lg border border-neutral-300 shadow-inner" role="tablist">
        <Button
          variant={viewMode === "month" ? "primary" : "outline"}
          size="sm"
          onClick={() => setViewMode("month")}
          className="rounded-r-none border-r-0"
          role="tab"
          aria-selected={viewMode === "month"}
          aria-controls="month-view-panel"
        >
          Month
        </Button>
        <Button
          variant={viewMode === "week" ? "primary" : "outline"}
          size="sm"
          onClick={() => setViewMode("week")}
          className="rounded-l-none"
          role="tab"
          aria-selected={viewMode === "week"}
          aria-controls="week-view-panel"
        >
          Week
        </Button>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={() => openModal()}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 sm:gap-2 shadow-md"
        aria-label="Create a new event"
      >
        <Plus className="w-4 sm:w-5 h-4 sm:h-5" /> New Event
      </Button>
    </div>
  </div>

  {/* Calendar Grid */}
  <div className="flex-1 w-full overflow-auto">
    {isLoading ? (
      <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-lg">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 animate-spin text-blue-500" role="status" aria-label="Loading content" />
        <p className="text-sm sm:text-base text-neutral-600">Loading events...</p>
      </div>
    ) : viewMode === "month" ? (
      <div id="month-view-panel" role="tabpanel" aria-labelledby="month-tab">
        <MonthView currentDate={currentDate} events={events} onDateClick={handleMonthDateClick} openModal={openModal} />
      </div>
    ) : (
      <div id="week-view-panel" role="tabpanel" aria-labelledby="week-tab">
        <WeekView currentDate={currentDate} events={events} openModal={openModal} />
      </div>
    )}
  </div>

  {/* Event Modal */}
  <EventModal
    open={isModalOpen}
    event={selectedEvent || undefined}
    onClose={closeModal}
    onSave={handleSave}
    onDelete={handleDelete}
    isLoading={isLoading}
  />
</div>

  );
});

CalendarView.displayName = "CalendarView";

export default CalendarView;
