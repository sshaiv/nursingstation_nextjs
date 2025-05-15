
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
        rows={3}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedOrFilled(true)}
        onBlur={(e) => setFocusedOrFilled(e.target.value !== '')}
        className={`peer w-full border-b-2 rounded-2xl border-gray-500 text-sm  placeholder-transparent p-2 resize-none focus:outline-none focus:border-black overflow-y-auto max-h-[50px]  ${className}`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-2 transition-all bg-white px-1
          ${focusedOrFilled || value ? '-top-2 text-xs text-gray-600' : 'top-2 text-sm text-gray-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default ReusableTextareaField;
