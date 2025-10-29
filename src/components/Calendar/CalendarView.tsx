"use client";
import React, { memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Loader2,
  CalendarIcon
} from "lucide-react";

import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import { CalendarEvent  } from "../../components/Calendar/CalendarView.types";
import { Button } from "../primitives/Button";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager } from "../../hooks/useEventManager";
import {initialMockEvents} from "../../data/mockEvents"

// Initial set of mock events for testing features


const CalendarView: React.FC = memo(() => {
  // Use custom hooks for all logic and state management
  const { currentDate, viewMode, headerTitle, goToNext, goToPrev, goToToday, setViewMode } = useCalendar(new Date());
  const { events, selectedEvent, isModalOpen, isLoading, openModal, closeModal, handleSave, handleDelete } = useEventManager(initialMockEvents);

  // Function passed to MonthView to create a new event on a specific date
  const handleMonthDateClick = React.useCallback((date: Date) => {
    // Open modal with pre-set date for convenience
    openModal({
      id: "", 
      title: "", 
      startDate: new Date(date.setHours(9, 0, 0, 0)), 
      endDate: new Date(date.setHours(10, 0, 0, 0)), 
      color: "#1D4ED8"
    } as CalendarEvent);
  }, [openModal]);


  return (
    <div className="flex flex-col w-full h-full p-4 bg-neutral-50 font-sans min-h-[80vh]">
         {/* title */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-8 bg-white shadow-md z-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-blue-600" />
          Scheduler Pro
        </h1>
      </header>
      {/* HEADER & NAVIGATION */}
      <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-xl shadow-lg border border-neutral-100">
        
        {/* Date and Navigation Controls */}
        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={goToToday} 
            aria-label="Jump to today"
          >
            Today
          </Button>
          
          <div className="flex rounded-lg border border-neutral-300 shadow-inner">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              aria-label={`Go to previous ${viewMode}`}
              className="rounded-r-none border-r-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              aria-label={`Go to next ${viewMode}`}
              className="rounded-l-none"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <h2 className="text-2xl font-extrabold text-neutral-800 tracking-tight ml-2">
            {headerTitle}
          </h2>
        </div>

        {/* View Mode and New Event Button */}
        <div className="flex items-center gap-4">
          
          {/* View Mode Switch (A11y using a toggle pattern) */}
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
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md"
            aria-label="Create a new event"
          >
            <Plus className="w-5 h-5" /> New Event
          </Button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex-1 w-full overflow-hidden ">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-lg">
            <Loader2 className="w-8 h-8 mr-2 animate-spin text-blue-500" role="status" aria-label="Loading content" />
            <p className="text-neutral-600">Loading events...</p>
          </div>
        ) : viewMode === "month" ? (
          <div id="month-view-panel" role="tabpanel" aria-labelledby="month-tab">
              <MonthView
                currentDate={currentDate}
                events={events}
                onDateClick={handleMonthDateClick}
                openModal={openModal}
              />
          </div>
        ) : (
          <div id="week-view-panel" role="tabpanel" aria-labelledby="week-tab">
              <WeekView 
                  currentDate={currentDate} 
                  events={events} 
                  openModal={openModal} 
              />
          </div>
        )}
      </div>

      {/* EVENT MODAL */}
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