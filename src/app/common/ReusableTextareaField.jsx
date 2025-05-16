


import { useState } from 'react';

const ReusableTextareaField = ({
  id,
  label,
  width = 'w-full',
  value,
  onChange,
  className = '',
}) => {
  const [focusedOrFilled, setFocusedOrFilled] = useState(false);

  return (
    <div className={`relative ${width}`}>
      <textarea
        id={id}
        rows={1} // smaller default height
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedOrFilled(true)}
        onBlur={(e) => setFocusedOrFilled(e.target.value !== '')}
        className={`
          peer w-full border-b-2 rounded-lg border-gray-500 text-xs
          placeholder-transparent p-1 resize-none
          focus:outline-none focus:border-black
          overflow-y-auto
          h-10 md:h-8 sm:h-6
          max-h-12
          ${className}
        `}
        placeholder={label}
      />

      <label
        htmlFor={id}
        className={`
    absolute left-2 transition-all bg-white px-1 
    ${focusedOrFilled || value ? '-top-2 text-[8px] text-gray-600' : 'top-2 text-[7px] text-gray-400'}
    sm:text-[7px] md:text-[8px] lg:text-[9px]
  `}
      >
        {label}
      </label>

    </div>
  );
};

export default ReusableTextareaField;
