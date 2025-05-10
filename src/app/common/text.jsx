// Text.js
import React from 'react';

export function H3({ children }) {
  return (
    <h3 className="text-xl font-semibold font-serif text-gray-700 flex items-center gap-2">
      {children}
    </h3>
  );
}

export function Label({ children, htmlFor, ...props }) {
  return (
    <label htmlFor={htmlFor} className="flex text-sm items-center text-gray-800 gap-2" {...props}>
      {children}
    </label>
  );
}



// modal heading
export  function ModalHeading({ title, icon = '📋' }) {
    return (
      <h4 className="font-semibold text-2xl text-purple-900 font-serif flex items-center justify-center gap-2">
        {icon} {title}
      </h4>
    );
  }


//   main heading
  export  function MainHeadings({ title, icon = '📋' }) {
    return (
      <h4 className="font-semibold text-lg text-purple-900 font-mono flex items-center gap-2">
        {icon} {title}
      </h4>
    );
  }
  
  