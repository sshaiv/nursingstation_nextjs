import React, { useState } from 'react';
const DropdownSelect = ({ label, options, selectedValue, onSelect, error, onFocus }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSelect = (option) => {
        onSelect(option);
        setShowModal(false);
    };
      return (
        <div className=" text-black relative inline-block w-full">
            <input
                type="text"
                value={selectedValue}
                onFocus={() => {
                    setSearchTerm("");
                    setShowModal(true);
                    if (onFocus) onFocus();
                }}
                readOnly
                placeholder={label}
                className=" text-black border border-gray-300 bg-gray-100 rounded-md text-[12px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer w-full"
            />
            {error && (
                <p className=" text-red-500 text-[10px] mt-[2px] ml-[2px]">{error}</p>
            )}
              {showModal && (
                <div className=" text-black absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg text-[11px]">
                    <div className=" text-black p-2">
                        <input
                            type="text"
                            placeholder={`Search ${label.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className=" text-black w-full border border-gray-300 rounded px-2 py-1 text-[11px] focus:ring-2 focus:ring-blue-400"
                            autoFocus
                        />
                    </div>  <div className=" text-black max-h-40 overflow-y-auto">
                        {options
                            .filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option)}
                                    className=" text-black w-full text-left px-3 py-2 hover:bg-blue-100 text-[11px] border-t border-gray-100"
                                >
                                    {option.label}
                                </button>
                            ))}
                        {options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                            <div className=" text-black px-3 py-2  text-[10px]">No matches found.</div>
                        )}
                    </div>     <div className=" text-black border-t border-gray-200 px-3 py-2 flex justify-between">
                        {/* <button
                            onClick={() => {
                                // Handle adding new item if needed
                            }}
                            className=" text-black text-blue-600 hover:underline text-[11px]"
                        >
                            + Add “{searchTerm}”
                        </button> */}
                        <button
                            onClick={() => setShowModal(false)}
                            className=" text-black text-red-500 hover:underline text-[11px]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};export default DropdownSelect;

