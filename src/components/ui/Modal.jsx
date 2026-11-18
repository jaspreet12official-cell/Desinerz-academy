
import React, { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  onDiscard,
  saveText = "Save",
  discardText = "Discard",
  isSaving = false,
  disableSave = false,
  size = "max-w-xl",
  bodyClassName = "",
}) => {

  // Close modal using Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle discard
  const handleDiscard = () => {
    onDiscard?.();
    onClose?.();
  };

  // Handle save
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(e);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/40 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`
          w-full ${size} max-h-[90vh]
          bg-white rounded-lg shadow-xl
          flex flex-col overflow-hidden
        `}
      >

        {/* HEADER - FIXED */}
        <div className="flex items-center justify-between
                        px-4 sm:px-6 py-4
                        border-b border-gray-200 shrink-0">

          <h2
            id="modal-title"
            className="text-base sm:text-lg font-semibold text-gray-800"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-md text-gray-500
                       hover:bg-gray-100 hover:text-gray-800
                       transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* BODY - DYNAMIC */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div
            className={`
              px-4 sm:px-6 py-5
              overflow-y-auto flex-1
              ${bodyClassName}
            `}
          >
            {children}
          </div>

          {/* FOOTER - FIXED */}
          <div className="flex items-center justify-end
                          gap-3 px-4 sm:px-6 py-4
                          border-t border-gray-200
                          bg-white shrink-0">

            <button
              type="button"
              onClick={handleDiscard}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium
                         text-gray-700 bg-white
                         border border-gray-300 rounded-md
                         hover:bg-gray-50
                         disabled:opacity-50"
            >
              {discardText}
            </button>

            <button
              type="submit"
              disabled={isSaving || disableSave}
              className="px-5 py-2 text-sm font-medium
                         text-white bg-purple-700 rounded-md
                         hover:bg-purple-800
                         disabled:opacity-50
                         disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : saveText}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
