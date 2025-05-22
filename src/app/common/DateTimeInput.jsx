import React, { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeInput({ selectedDate, onDateChange, time, onTimeChange, label }) {
    useEffect(() => {
        if (!selectedDate) {
            onDateChange(new Date());
        }

        if (!time) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            onTimeChange({ target: { value: `${hours}:${minutes}` } });
        }
    }, [selectedDate, time, onDateChange, onTimeChange]);

    return (
        <div className="flex flex-col items-start">
            {label && <label className="text-gray-600 text-[9px] mb-[1px]">{label}</label>}
          <div className="flex items-center border rounded overflow-hidden h-[18px] text-[9px]">
    <ReactDatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="dd-MM-yyyy"
        className="w-[52px] border-none px-[3px] py-[1px] focus:outline-none"
    />
    <span className="px-[4px] text-gray-400">|</span>
    <input
        type="time"
        value={time}
        onChange={onTimeChange}
        className="w-[75px] border-none px-[4px] py-[1px] focus:outline-none"
        required
    />
</div>

        </div>
    );
}





