


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
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [newServiceName, setNewServiceName] = useState("");

    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [doctorSearch, setDoctorSearch] = useState("");

    const [showPerformedByModal, setShowPerformedByModal] = useState(false);
    const [performedBySearch, setPerformedBySearch] = useState("");

    const options = [
        { label: 'Nursing Service One', value: 'Nursing Service One' },
        { label: 'Nursing Service Two', value: 'Nursing Service Two' },
        { label: 'Nursing Service Three', value: 'Nursing Service Three' },
        { label: 'Nursing Service Four', value: 'Nursing Service Four' },
        { label: 'Another Service', value: 'Another Service' },
    ];

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

    const handleServiceSelect = (service) => {
        setNursingService(service);
        setShowServiceModal(false);
    };

    const handleAddNewService = async () => {
        try {
            const response = await axios.post('/api/nursing-services', { name: newServiceName });
            const newService = response.data;
            setNursingService(newService.name);
            setShowServiceModal(false);
            setNewServiceName(""); // Clear the input
        } catch (error) {
            console.error("Error adding new service:", error);
        }
    };

    return (
        <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
            <div className="flex items-center justify-center">
                <ModalHeading title="Nursing Services" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />
            <div className="border border-gray-100 rounded-lg space-y-4">
                {/* Inputs Grid */}
                <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-end">
                    <div className="flex flex-col w-full">
                        <DateTimeInput
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            time={time}
                            onTimeChange={(e) => setTime(e.target.value)}
                            label="Date & Time"
                        />
                        {errors.dateTime && (
                            <p className="text-red-500 text-[10px]  ml-[2px] col-span-full ">{errors.dateTime}</p>
                        )}
                    </div>


                    <div className="relative inline-block w-full">
                        {/* Input field */}
                        <input
                            type="text"
                            value={nursingService}
                            onFocus={() => {
                                setNewServiceName(""); // reset search
                                setShowServiceModal(true);
                            }}
                            readOnly
                            placeholder="Select Nursing Service"
                            className="border border-gray-500 ml-8 rounded-md text-[9px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer w-full"
                        />

                        {/* Dropdown modal styled like a dropdown, positioned below input */}
                        {showServiceModal && (
                            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg text-[11px]">
                                {/* Search input */}
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search service..."
                                        value={newServiceName}
                                        onChange={(e) => setNewServiceName(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[11px] focus:ring-2 focus:ring-blue-400"
                                        autoFocus
                                    />
                                </div>

                                {/* Options list */}
                                <div className="max-h-40 overflow-y-auto">
                                    {options
                                        .filter((opt) =>
                                            opt.label.toLowerCase().includes(newServiceName.toLowerCase())
                                        )
                                        .map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleServiceSelect(option.value)}
                                                className="w-full text-left px-3 py-2 hover:bg-blue-100 text-[11px] border-t border-gray-100"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    {options.filter((opt) =>
                                        opt.label.toLowerCase().includes(newServiceName.toLowerCase())
                                    ).length === 0 && (
                                            <div className="px-3 py-2 text-gray-500 text-[10px]">No matches found.</div>
                                        )}
                                </div>

                                {/* Add / Close buttons */}
                                <div className="border-t border-gray-200 px-3 py-2 flex justify-between">
                                    <button
                                        onClick={handleAddNewService}
                                        className="text-blue-600 hover:underline text-[11px]"
                                    >
                                        + Add “{newServiceName}”
                                    </button>
                                    <button
                                        onClick={() => setShowServiceModal(false)}
                                        className="text-red-500 hover:underline text-[11px]"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block w-full">
                        <input
                            type="text"
                            value={doctorName}
                            onFocus={() => {
                                setDoctorSearch("");
                                setShowDoctorModal(true);
                            }}
                            readOnly
                            placeholder="Select Doctor Name"
                            className="border border-gray-500 rounded-md text-[9px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer w-full"
                        />
                        
                        {errors.doctorName && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">{errors.doctorName}</p>
                        )}

                        {showDoctorModal && (
                            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg text-[11px]">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search doctor..."
                                        value={doctorSearch}
                                        onChange={(e) => setDoctorSearch(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[11px] focus:ring-2 focus:ring-blue-400"
                                        autoFocus
                                    />
                                </div>
                                <div className="max-h-40 overflow-y-auto">
                                    {options
                                        .filter(opt => opt.label.toLowerCase().includes(doctorSearch.toLowerCase()))
                                        .map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setDoctorName(opt.value);
                                                    setShowDoctorModal(false);
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-blue-100 text-[11px] border-t border-gray-100"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    {options.filter(opt => opt.label.toLowerCase().includes(doctorSearch.toLowerCase())).length === 0 && (
                                        <div className="px-3 py-2 text-gray-500 text-[10px]">No matches found.</div>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 px-3 py-2 flex justify-between">
                                    <button
                                        onClick={() => {
                                            setDoctorName(doctorSearch);
                                            setShowDoctorModal(false);
                                        }}
                                        className="text-blue-600 hover:underline text-[11px]"
                                    >
                                        + Add “{doctorSearch}”
                                    </button>
                                    <button
                                        onClick={() => setShowDoctorModal(false)}
                                        className="text-red-500 hover:underline text-[11px]"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                       
                    </div>

                    {/* Performed By Field */}
                    <div className="relative inline-block w-full">
                        <input
                            type="text"
                            value={performedBy}
                            onFocus={() => {
                                setPerformedBySearch("");
                                setShowPerformedByModal(true);
                            }}
                            readOnly
                            placeholder="Select Performed By"
                            className="border border-gray-500 rounded-md text-[9px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer w-full"
                        />
                        {errors.performedBy && (
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">{errors.performedBy}</p>
                        )}

                        {showPerformedByModal && (
                            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg text-[11px]">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search name..."
                                        value={performedBySearch}
                                        onChange={(e) => setPerformedBySearch(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[11px] focus:ring-2 focus:ring-blue-400"
                                        autoFocus
                                    />
                                </div>
                                <div className="max-h-40 overflow-y-auto">
                                    {options
                                        .filter(opt => opt.label.toLowerCase().includes(performedBySearch.toLowerCase()))
                                        .map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setPerformedBy(opt.value);
                                                    setShowPerformedByModal(false);
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-blue-100 text-[11px] border-t border-gray-100"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    {options.filter(opt => opt.label.toLowerCase().includes(performedBySearch.toLowerCase())).length === 0 && (
                                        <div className="px-3 py-2 text-gray-500 text-[10px]">No matches found.</div>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 px-3 py-2 flex justify-between">
                                    <button
                                        onClick={() => {
                                            setPerformedBy(performedBySearch);
                                            setShowPerformedByModal(false);
                                        }}
                                        className="text-blue-600 hover:underline text-[11px]"
                                    >
                                        + Add “{performedBySearch}”
                                    </button>
                                    <button
                                        onClick={() => setShowPerformedByModal(false)}
                                        className="text-red-500 hover:underline text-[11px]"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quantity Input */}
                    <div className="flex flex-col w-full">
                        <label className="text-gray-700 text-[8px] mb-1 font-medium">Quantity</label>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border border-gray-500 rounded-md text-[9px] px-2 py-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


 {/* Insert Button */}
                        <div className="flex justify-end">
                            <ActionButton label="Insert" onClick={handleInsert} className="text-xs px-4 py-1" />
                        </div>
</div></div>




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
                                                    <button className="text-blue-500 hover:underline">Edit</button>
                                                    <button
                                                        className="text-red-500 hover:underline"
                                                        onClick={() => setVitals(vitals.filter((_, i) => i !== idx))}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
        </div>
    );
}
