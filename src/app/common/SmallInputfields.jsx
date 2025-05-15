


import { useState, useEffect } from 'react';

const ReusableInputField = ({ id, label, width = 'w-24', value, onChange }) => {
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
        className="peer mb-2 h-8 w-full border-b-2  border-gray-500 rounded-2xl  text-sm  text-center font-semibold text-gray-500 placeholder-transparent focus:outline-none focus:border-black"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all
          ${focusedOrFilled ? '-top-3.5 text-xs text-blue-900' : 'top-2 text-sm text-gray-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default ReusableInputField;
