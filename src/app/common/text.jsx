
  
  // Text.js
import React from 'react';

export function H3({ children }) {
  return (
  
    <h3 className="text-sm md:text-xs font-semibold font-serif text-gray-700 flex items-center gap-2">
  {children}
</h3>

  );
}


export function Label({ children, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex text-xs md:text-[10px] items-center text-gray-800 gap-2"
      {...props}
    >
      {children}
    </label>
  );
}

// modal heading
export function ModalHeading({ title, icon = '📋' }) {
  return (
    <h4 className="font-semibold text-lg md:text-base text-purple-900 font-serif flex items-center justify-center gap-2">
      {typeof icon === 'string' ? <span>{icon}</span> : icon}
      {title}
    </h4>
  );
}



// common/text.jsx
export function MainHeadings({ title, icons = '📋' }) {
  return (
    <h4 className="font-semibold text-LG text-purple-900 font-mono flex items-center gap-2">
      {typeof icons === 'string' ? <span>{icons}</span> : icons}
      {title}
    </h4>
  );
}

