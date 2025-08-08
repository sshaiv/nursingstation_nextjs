// components/CloseButton.jsx
import React from "react";

export default function CloseButton({
  onClick,
  className = "",
  ariaLabel = "Close modal",
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        absolute top-3 right-3
        w-8 h-8
        flex items-center justify-center
        rounded-md
        border border-gray-200
        text-red-600
        shadow-sm shadow-red-200
        font-semibold
        hover:border-red-200
        hover:text-red-400
        hover:shadow-red-400
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        select-none
        ${className}
      `}
    >
      <span className="text-2xl leading-none">&times;</span>
    </button>
  );
}
