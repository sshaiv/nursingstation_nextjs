// components/common/SearchableSelect.js
import React from 'react';
import Select from 'react-select';

const SearchableSelect = ({ label, options, value, onChange, className = "" }) => {
  return (
    <div className={`flex flex-col items-start w-[150px] ${className}`}>
      <label className="text-gray-600 text-[9px] mb-[1px]">{label}</label>
      <Select
        options={options}
        value={options.find(opt => opt.value === value)}
        onChange={(selected) => onChange(selected?.value || '')}
        placeholder=""
        className="text-[9px] w-full"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '18px',
            height: '18px',
            fontSize: '9px',
            padding: '0px',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: 2,
          }),
          indicatorSeparator: () => null,
          menu: (base) => ({
            ...base,
            zIndex: 9999,
            maxHeight: 100,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 100,
            overflowY: 'auto',
          }),
        }}
        filterOption={(option, inputValue) =>
          option.label.toLowerCase().startsWith(inputValue.toLowerCase())
        }
      />
    </div>
  );
};

export default SearchableSelect;
