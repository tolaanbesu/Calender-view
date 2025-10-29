import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { CalendarEvent } from "../Calendar/CalendarView.types";
import { format } from "../../utils/date.utils";
import { Trash2 } from "lucide-react";
import { Button } from "../primitives/Button";
import { Modal } from "../primitives/Modal";

import {EventModalProps} from "./CalendarView.types"

// Default event for new creation
const defaultEvent: CalendarEvent = {
  id: "", 
  title: "",
  startDate: new Date(),
  endDate: new Date(),
  color: "#1D4ED8", 
};

// Converts Date object to datetime-local string (YYYY-MM-DDThh:mm)
const formatDateForInput = (date: Date): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
};

// Memoized and accessible Event Modal
export const EventModal: React.FC<EventModalProps> = memo(({
  open,
  event,
  onClose,
  onSave,
  onDelete,
  isLoading,
}) => {
  const [formData, setFormData] = useState<Omit<CalendarEvent, 'id' | 'startDate' | 'endDate'> & {
    startDateInput: string;
    endDateInput: string;
    id: string;
  }>(() => ({
    ...defaultEvent,
    id: event?.id || "",
    startDateInput: formatDateForInput(event?.startDate || new Date()),
    endDateInput: formatDateForInput(event?.endDate || new Date()),
  }));

  const isEditing = useMemo(() => !!event?.id, [event]);

  // Sync internal state with external prop (when modal opens/event changes)
  useEffect(() => {
    if (event) {
      setFormData({
        id: event?.id || "",
        title: event?.title || "",
        color: event?.color || "#1D4ED8",
        description: event?.description || "",
        startDateInput: formatDateForInput(event?.startDate || new Date()),
        endDateInput: formatDateForInput(event?.endDate || new Date()),
      });
    } else {
      setFormData({
        ...defaultEvent,
        id: "",
        startDateInput: formatDateForInput(new Date()),
        endDateInput: formatDateForInput(new Date()),
      });
    }
  }, [event]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  }, []);

  const resetForm = useCallback(() => {
  setFormData({
    ...defaultEvent,
    id: "",
    startDateInput: formatDateForInput(new Date()),
    endDateInput: formatDateForInput(new Date()),
  });
}, []);


  const handleSave = useCallback(() => {
    // validation
    if (!formData.title.trim() || !formData.startDateInput || !formData.endDateInput) {
      alert("Title and dates are required.");
      return;
    }

    const start = new Date(formData.startDateInput);
    const end = new Date(formData.endDateInput);

    const startHour = start.getHours();
    const startMinute = start.getMinutes();

    const endHour = end.getHours();
    const endMinute = end.getMinutes();

    if (startHour * 60 + startMinute >= endHour * 60 + endMinute) {
      alert("End time must be after start time.");
      return;
    }

    const eventToSave: CalendarEvent = {
        id: formData.id || crypto.randomUUID(),
        title: formData.title,
        startDate: start,
        endDate: end,
        color: formData.color,
        description: formData.description,
    };
    onSave(eventToSave);
    resetForm();
  }, [formData, onSave, resetForm]);

  const handleDelete = useCallback(() => {
    if (event?.id) {
        onDelete(event.id);
    }
  }, [event, onDelete]);

  const colorOptions = useMemo(() => [
    { hex: "#1D4ED8", name: "Blue" }, 
    { hex: "#059669", name: "Green" }, 
    { hex: "#F59E0B", name: "Amber" }, 
    { hex: "#EF4444", name: "Red" }, 
    { hex: "#8B5CF6", name: "Violet" },
  ], []);

  const titleText = isEditing ? "Edit Event" : "Create New Event";

  return (
    <Modal open={open} onClose={onClose} title={titleText}>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Team Sync-up"
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDateInput" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Date/Time <span className="text-red-500">*</span>
              </label>
              <input
                id="startDateInput"
                name="startDateInput"
                type="datetime-local"
                value={formData.startDateInput}
                onChange={handleChange}
                required
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="endDateInput" className="block text-sm font-medium text-neutral-700 mb-1">
                End Date/Time <span className="text-red-500">*</span>
              </label>
              <input
                id="endDateInput"
                name="endDateInput"
                type="datetime-local"
                value={formData.endDateInput}
                onChange={handleChange}
                required
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Detailed notes for the meeting..."
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Event Color
            </label>
            <div className="flex gap-3 flex-wrap" role="radiogroup" aria-label="Event Color">
              {colorOptions.map((c) => (
                <button
                  key={c.hex}
                  type="button" // Important to prevent form submission
                  onClick={() => handleColorChange(c.hex)}
                  className={`w-8 h-8 rounded-full border-4 transition-transform ring-offset-2 focus:outline-none focus:ring-2 focus:ring-opacity-75`}
                  style={{
                    backgroundColor: c.hex,
                    borderColor: formData.color === c.hex ? c.hex : "transparent",
                  }}
                  aria-checked={formData.color === c.hex}
                  role="radio"
                  aria-label={`Select color ${c.name}`}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-6 border-t border-neutral-100 mt-6">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          {isEditing && (
            <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
              <Trash2 className="w-4 h-4 mr-1 inline-block" />
              Delete
            </Button>
          )}
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : (isEditing ? "Save Changes" : "Create Event")}
          </Button>
        </div>
      </form>
    </Modal>
  );
});

EventModal.displayName = "EventModal";