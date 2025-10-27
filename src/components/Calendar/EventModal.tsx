import React, { useState, useEffect } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { Trash2 } from "lucide-react";
import { Button } from "../primitives/Button";
import { Modal } from "../primitives/Modal";

interface EventModalProps {
  open: boolean;
  event?: CalendarEvent;
  isEditing?: boolean;
  onClose: () => void;
  onSave: (e: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  open,
  event,
  isEditing: editingProp,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState(event?.title || "");
  const [startDate, setStartDate] = useState(event?.startDate || new Date());
  const [endDate, setEndDate] = useState(event?.endDate || new Date());
  const [color, setColor] = useState(event?.color || "#3b82f6");

  const isEditing = editingProp ?? !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
      setColor(event.color);
    } else {
      setTitle("");
      setStartDate(new Date());
      setEndDate(new Date());
      setColor("#3b82f6");
    }
  }, [event]);

  const formatDateForInput = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id: event?.id || crypto.randomUUID(),
      title,
      startDate,
      endDate,
      color,
    });
    onClose();
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit Event" : "New Event"}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., Meeting with Team"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-600 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formatDateForInput(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-600 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={formatDateForInput(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Event Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {["#1D4ED8", "#059669", "#F59E0B", "#EF4444", "#8B5CF6"].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-4 transition-transform ${
                  color === c ? "scale-110 ring-2 ring-offset-2" : ""
                }`}
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? c : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-neutral-200">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {isEditing && (
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-1 inline-block" />
              Delete
            </Button>
          )}
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Create Event"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
