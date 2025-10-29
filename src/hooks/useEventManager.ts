import { useState, useCallback } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { v4 as uuidv4 } from "uuid"; // Recommended for generating unique IDs

// Shim for UUID if not available in the environment
const generateId = (): string => {
  try {
    return uuidv4();
  } catch (error:unknown) {
    // Fallback for environments where UUID might not be natively supported
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }
};

/**
 * useEventManager Hook
 * Handles all event state (CRUD) and modal logic.
 * This centralizes event data management and manipulation.
 */
export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added for potential future async ops

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
      // Check if the event exists (editing) or needs a new ID (creating)
      const isEditing = !!prev.find((e) => e.id === event.id);

      if (isEditing) {
        // Editing: Replace the existing event
        return prev.map((e) => (e.id === event.id ? event : e));
      } else {
        // Creating: Assign a new ID and add
        const newEvent = { ...event, id: generateId() };
        return [...prev, newEvent];
      }
    });
    // Simulate API delay before closing (best practice for real apps)
    setTimeout(() => {
        setIsLoading(false);
        closeModal();
    }, 50); // Small delay
  }, [closeModal]);

  const handleDelete = useCallback((id: string) => {
    setIsLoading(true);
    // Use a custom modal/dialog for confirmation instead of forbidden `confirm()`
    // For now, we'll just delete, but we'd add confirmation UI in a real app.
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