

import React, { useState } from 'react';
import { ModalHeading } from '../common/text';
import { ActionButton, SaveButton } from '../common/Buttons';
import TableReuse from '../common/TableReuse';
import "react-datepicker/dist/react-datepicker.css";
import SearchableSelect from '../common/SearchableSelect';
import DateTimeInput from '../common/DateTimeInput';
import axios from "axios";


export default function NursingServices({ visitid, gssuhid, empid }) {
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({});


    const [nursingService, setNursingService] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [quantity, setQuantity] = useState("");

    const validateForm = () => {
        const newErrors = {};

        if (!nursingService) newErrors.nursingService = "Nursing Service is required.";
        if (!doctorName) newErrors.doctorName = "Doctor Name is required.";
        if (!performedBy) newErrors.performedBy = "Performed By is required.";
        if (!selectedDate || !time) newErrors.dateTime = "Date & Time are required.";

        return newErrors;
    };

    const handleInsert = () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear previous errors

        const formattedDate = `${selectedDate.toLocaleDateString()} ${time}`;
        const newEntry = {
            date: formattedDate,
            bp: nursingService,
            pulse: doctorName,
            temp: performedBy,
            spo2: quantity,
            weight: '-',
            height: '-',
            rr: '-',
            painScore: '-',
        };

        setVitals([...vitals, newEntry]);
        setNursingService("");
        setDoctorName("");
        setPerformedBy("");
        setQuantity("");
    };


    const options = [
        { label: 'Nursing Service One', value: 'Nursing Service One' },
        { label: 'Nursing Service Two', value: 'Nursing Service Two' },
        { label: 'Nursing Service Three', value: 'Nursing Service Three' },
        { label: 'Nursing Service Four', value: 'Nursing Service Four' },
        { label: 'Another Service', value: 'Another Service' },
    ];


    
    return (
        <div className="p-2 rounded-xl  w-full max-w-5xl mx-auto text-[12px] space-y-6">
            <div className="flex items-center justify-center">
                <ModalHeading title="Nursing Services" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />

            <div className="border border-gray-100 rounded-lg  space-y-4">


                {/* Inputs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">

                    <div className="flex flex-col w-full">
                        <DateTimeInput
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            time={time}
                            onTimeChange={(e) => setTime(e.target.value)}
                            label="Date & Time"
                        />{errors.dateTime && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px] col-span-full -mt-2">{errors.dateTime}</p>
                        )}</div>

                    <div className="flex flex-col w-full">
                        <SearchableSelect
                            label="Nursing Service *"
                            options={options}
                            value={nursingService}
                            onChange={setNursingService}
                        />{errors.nursingService && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">{errors.nursingService}</p>
                        )}</div>

                    <div className="flex flex-col w-full">
                        <SearchableSelect
                            label="Doctor Name *"
                            options={options}
                            value={doctorName}
                            onChange={setDoctorName}
                        />{errors.doctorName && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">{errors.doctorName}</p>
                        )}</div>

                    <div className="flex flex-col w-full">
                        <SearchableSelect
                            label="Performed By*"
                            options={options}
                            value={performedBy}
                            onChange={setPerformedBy}
                        />
                        {errors.performedBy && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">{errors.performedBy}</p>
                        )}
                    </div>



                    <div className="flex flex-col w-full">
                        <label className="text-gray-700 text-[8px] mb-1 font-medium">Quantity</label>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border border-gray-500 rounded-md text-[9px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Insert Button */}
                <div className="flex justify-end">
                    <ActionButton label="Insert" onClick={handleInsert} className="text-xs px-4 py-1" />
                </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div
                    className="max-h-[225px] overflow-y-auto scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none',  // IE 10+
                    }}
                >
                    <table className="w-full text-[11px] text-center border-collapse">
                        <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
                            <tr>
                                <TableReuse type="th">Date/Time</TableReuse>
                                <TableReuse type="th">Nursing Service</TableReuse>
                                <TableReuse type="th">Doctor Name</TableReuse>
                                <TableReuse type="th">Performed By</TableReuse>
                                <TableReuse type="th">Quantity</TableReuse>
                                <TableReuse type="th">Actions</TableReuse>
                            </tr>
                        </thead>
                        <tbody>
                            {vitals.map((v, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 border-t">
                                    <TableReuse>{v.date}</TableReuse>
                                    <TableReuse>{v.bp}</TableReuse>
                                    <TableReuse>{v.pulse}</TableReuse>
                                    <TableReuse>{v.temp}</TableReuse>
                                    <TableReuse>{v.spo2}</TableReuse>
                                    <TableReuse>
                                        <div className="flex justify-center space-x-2">
                                         <button
            className="text-blue-500 hover:underline"
            // onClick={() => handleEdit(idx)}
        >
            Edit
        </button>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => setVitals(vitals.filter((_, i) => i !== idx))}
                                        >
                                            Delete
                                        </button></div>
                                    </TableReuse>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <hr className="border-t mt-6 mb-2 border-gray-300" />
            {/* Save Button */}
            <div className="flex justify-center ">
                <SaveButton label="Save" />
            </div>
        </div>
    );
}
