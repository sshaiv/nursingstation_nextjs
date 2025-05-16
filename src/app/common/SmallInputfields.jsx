


import { useState, useEffect } from 'react';

const ReusableInputField = ({ id, label, width = 'w-24', value, onChange , className = '', }) => {
  const [focusedOrFilled, setFocusedOrFilled] = useState(false);

  useEffect(() => {
    setFocusedOrFilled(value !== '');
  }, [value]);

  return (
    <div className={`relative ${width}`}>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedOrFilled(true)}
        onBlur={(e) => setFocusedOrFilled(e.target.value !== '')}
        className={`peer mb-2 h-8 w-full border-b-2  border-gray-500 rounded-2xl  text-sm  text-center font-semibold text-gray-500 placeholder-transparent focus:outline-none focus:border-black ${className}`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`
    absolute left-8 transition-all bg-white px-1  
    ${focusedOrFilled || value ? '-top-2 text-[7px] text-gray-600' : 'top-2 text-[6px] text-gray-600'}
    sm:text-[6px] md:text-[7px] lg:text-[8px]
  `}
      >
        {label}
      </label>
    </div>
  );
};

export default ReusableInputField;

