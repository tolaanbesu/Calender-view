"use client";
import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  List,
  Loader2,
} from "lucide-react";

import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import { CalendarEvent } from "./CalendarView.types";
import { Button } from "../primitives/Button";

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [isLoading, setIsLoading] = useState(false);

  // --- CRUD HANDLERS ---
  const handleSave = (event: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) return prev.map((e) => (e.id === event.id ? event : e));
      return [...prev, event];
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setIsModalOpen(false);
  };

  const openModal = (event?: CalendarEvent) => {
    setSelectedEvent(event || null);
    setIsModalOpen(true);
  };

  // --- NAVIGATION ---
  const goPrev = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const goNext = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  const handleMonthDateClick = (d: Date) => {
    setCurrentDate(d);
    setViewMode("week");
  };

  const periodLabel = useMemo(() => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString([], {
        month: "long",
        year: "numeric",
      });
    }
    return currentDate.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [currentDate, viewMode]);

  return (
    <div className="flex flex-col w-screen h-screen bg-neutral-50 font-[Inter]">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-8 bg-white shadow-md z-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-blue-600" />
          Scheduler Pro
        </h1>
      </header>

      {/* CONTROL BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white border-b border-neutral-200 shadow-sm z-10">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            className="rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <h2 className="text-lg font-bold text-neutral-800">{periodLabel}</h2>

          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            className="rounded-full p-2"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={goToday}
            className="ml-3 font-semibold"
          >
            Today
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border border-neutral-300 overflow-hidden">
            <Button
              variant={viewMode === "month" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
              className="rounded-none"
            >
              Month
            </Button>
            <Button
              variant={viewMode === "week" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("week")}
              className="rounded-none border-l border-neutral-300"
            >
              Week
            </Button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => openModal()}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 shadow-md"
          >
            <List className="w-5 h-5" /> New Event
          </Button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex-1 w-full overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-lg">
            <Loader2 className="w-8 h-8 mr-2 animate-spin text-blue-500" />
            <p className="text-neutral-600">Loading events...</p>
          </div>
        ) : viewMode === "month" ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={handleMonthDateClick}
            openModal={openModal}
          />
        ) : (
          <WeekView currentDate={currentDate} events={events} openModal={openModal} />
        )}
      </div>

      {/* EVENT MODAL */}
      <EventModal
        open={isModalOpen}
        event={selectedEvent || undefined}
        isEditing={!!selectedEvent}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CalendarView;
