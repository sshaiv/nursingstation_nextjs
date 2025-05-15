import React, { useState, useEffect, useRef } from 'react';
import TableReuse from '../common/TableReuse';
import { ActionButton } from '../common/Buttons';
import { H3, Label } from '../common/text';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CurrentMedicines = () => {
    const [medicine, setMedicine] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medicineOptions, setMedicineOptions] = useState(['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Metformin']);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Set the current time as default
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new entry to vitals
        setVitals([...vitals, { medicine, date: format(selectedDate, 'dd-MM-yyyy'), time }]);
        console.log('Submitted:', { medicine, date: format(selectedDate, 'dd-MM-yyyy'), time });
        // Reset the form fields
        setMedicine('');
        setSelectedDate(new Date());
        setTime('');
    };

    const handleMedicineChange = (e) => {
        const value = e.target.value;
        setMedicine(value);
        setIsDropdownOpen(true);
        setFilteredOptions(medicineOptions.filter(option => option.toLowerCase().includes(value.toLowerCase())));
    };

    const handleOptionClick = (option) => {
        setMedicine(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className='h-52'>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-x-4">
                <H3>Current Medicine</H3>
                <div className="flex-1">
                    <Label htmlFor="medicine">Medicine</Label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={medicine}
                            onChange={handleMedicineChange}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-1 pr-8 text-sm"
                            placeholder="Enter medicine name"
                            required
                        />
                        {medicine && (
                            <button
                                type="button"
                                onClick={() => {
                                    setMedicine('');
                                    setIsDropdownOpen(false);
                                }}
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                ×
                            </button>
                        )}
                        {isDropdownOpen && filteredOptions.length > 0 && (
                            <div ref={dropdownRef} className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full">
                                {filteredOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        className="p-2 hover:bg-gray-200 cursor -pointer"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <Label htmlFor="date">Date</Label>
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="peer border rounded w-full text-[12px] h-10 mr-2 pl-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="time">Time</Label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-sm"
                        required
                    />
                </div>
                <ActionButton label="Insert" />
            </form>

            <div className="mt-2 max-h-[100px] md:max-h-[120px] lg:max-h-[130px] overflow-y-scroll hide-scrollbar">
                <table className="w-full table-auto text-xs text-center border">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <TableReuse type="th">Select</TableReuse>
                            <TableReuse type="th">Date/Time</TableReuse>
                            <TableReuse type="th">Medicine</TableReuse>
                        </tr>
                    </thead>
                    <tbody>
                        {vitals.map((v, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <TableReuse><input type="checkbox" /></TableReuse>
                                <TableReuse>{`${v.date} ${v.time}`}</TableReuse>
                                <TableReuse>{v.medicine}</TableReuse>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurrentMedicines;


