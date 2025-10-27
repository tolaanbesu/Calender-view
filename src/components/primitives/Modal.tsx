import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-4 backdrop-blur-sm z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-2xl font-bold mb-6 text-neutral-800">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
};
