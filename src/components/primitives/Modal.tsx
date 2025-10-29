import React, { useRef, useEffect, useCallback, memo } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = memo(({ open, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus(); 
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-4 backdrop-blur-sm z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1} // Makes the modal container focusable
      >
        <div className="flex justify-between items-start mb-6 border-b pb-3">
          {title && (
            <h3 id="modal-title" className="text-2xl font-bold mb-6 text-neutral-800">
              {title}
            </h3>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full !p-1.5 ml-4"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";
