import { useState, useCallback } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { v4 as uuidv4 } from "uuid"; 

const generateId = (): string => {
  try {
    return uuidv4();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn("Failed to generate UUID:", error.message);
      } else {
        console.warn("Failed to generate UUID:", String(error));
      }
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }
};

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const openModal = useCallback((eventToEdit?: CalendarEvent) => {
    setSelectedEvent(eventToEdit || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleSave = useCallback((event: CalendarEvent) => {
    setIsLoading(true);
    setEvents((prev) => {
      const isEditing = !!prev.find((e) => e.id === event.id);

      if (isEditing) {
        return prev.map((e) => (e.id === event.id ? event : e));
      } else {
        const newEvent = { ...event, id: generateId() };
        return [...prev, newEvent];
      }
    });
    setTimeout(() => {
        setIsLoading(false);
        closeModal();
    }, 50);
  }, [closeModal]);

  const handleDelete = useCallback((id: string) => {
    setIsLoading(true);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setTimeout(() => {
        setIsLoading(false);
        closeModal();
    }, 50); // Small delay
  }, [closeModal]);

  return {
    events,
    selectedEvent,
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    handleSave,
    handleDelete,
  };
};