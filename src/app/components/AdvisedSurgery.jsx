import React, { useEffect, useState } from 'react';
import { ModalHeading } from '../common/text';
import { ActionButton, SaveButton } from '../common/Buttons';
import TableReuse from '../common/TableReuse';
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from '../common/DateTimeInput';
import axios from "axios";
import API_ENDPOINTS from '../constants/api_url';
import DropdownSelect from '../common/DropdownSelect';
import ReusableInputField from '../common/SmallInputfields';

export default function AdviceSurgery({ visitid, gssuhid, empid }) {
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({});

    const [nursingService, setNursingService] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [quantity, setQuantity] = useState("");

    // Options for Nursing Service
    const [proposedOptions, setProposedOptions] = useState([]);
    const [surgeryOptions, setSurgeryOptions] = useState([]);

    // Options for Doctors and Performed By Users
    const [doctors, setDoctors] = useState([]);
    const [performedByUsers, setPerformedByUsers] = useState([]);

    // State for radio button (single choice)
    const [serviceType, setServiceType] = useState(""); // "Proposed" or "Surgery"

    const validateForm = () => {
        const newErrors = {};

        if (!nursingService) newErrors.nursingService = "Nursing Service is required.";
        if (!doctorName) newErrors.doctorName = "Doctor Name is required.";
        if (!performedBy) newErrors.performedBy = "Performed By is required.";
        if (!selectedDate || !time) newErrors.dateTime = "Date & Time are required.";
        if (!serviceType) newErrors.serviceType = "Please select Proposed or Surgery.";

        return newErrors;
    };

    const handleInsert = () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const formattedDate = `${selectedDate.toLocaleDateString()} ${time}`;
        const newEntry = {
            date: formattedDate,
            nursingService: nursingService,
            doctorName: doctorName,
            performedBy: performedBy,
            quantity: quantity,
            serviceType: serviceType,
        };

        setVitals([...vitals, newEntry]);
        setNursingService("");
        setDoctorName("");
        setPerformedBy("");
        setQuantity("");
        setServiceType("");
    };

    useEffect(() => {
        const fetchNursingServices = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.getAllHeadload);
                const parsedData = JSON.parse(response.data);
                const relationData = parsedData.Table;
                if (relationData && Array.isArray(relationData)) {
                    const proposed = relationData.filter(item => item.Type === "Proposed").map(item => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                    const surgery = relationData.filter(item => item.Type === "Surgery").map(item => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                    setProposedOptions(proposed);
                    setSurgeryOptions(surgery);
                }
            } catch (error) {
                console.error("Error fetching nursing services:", error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.getAllHeadload);
                const doctorData = JSON.parse(response.data);
                if (doctorData && doctorData.Table && Array.isArray(doctorData.Table)) {
                    const formattedDoctors = doctorData.Table.map(item => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                    setDoctors(formattedDoctors);
                } else {
                    console.warn("No doctor data found or data is not in expected format.");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        const fetchPerformedByUsers = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.getAllHeadload);
                const performedByData = JSON.parse(response.data);
                if (performedByData && performedByData.Table && Array.isArray(performedByData.Table)) {
                    const formattedPerformedByUsers = performedByData.Table.map(item => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                    setPerformedByUsers(formattedPerformedByUsers);
                } else {
                    console.warn("No performed by user data found or data is not in expected format.");
                }
            } catch (error) {
                console.error("Error fetching performed by users:", error);
            }
        };

        const fetchData = async () => {
            await Promise.all([
                fetchNursingServices(),
                fetchDoctors(),
                fetchPerformedByUsers(),
            ]);
        };

        fetchData();
    }, []);

    return (
        <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
            <div className="flex items-center justify-center">
                <ModalHeading title="Advice Surgery" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />

            <div className="border border-gray-100 rounded-lg space-y-4">

                {/* Radio buttons for Service Type */}
                <div className="flex space-x-6 mb-4 text-sm font-medium text-gray-700">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="serviceType"
                            value="Proposed"
                            checked={serviceType === "Proposed"}
                            onChange={(e) => setServiceType(e.target.value)}
                            className="mr-2"
                        />
                        Proposed
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="serviceType"
                            value="Surgery"
                            checked={serviceType === "Surgery"}
                            onChange={(e) => setServiceType(e.target.value)}
                            className="mr-2"
                        />
                        Surgery
                    </label>
                </div>
                {errors.serviceType && (
                    <p className="text-red-500 text-[10px]  ml-[2px] col-span-full -mt-2">{errors.serviceType}</p>
                )}

                {/* Inputs Grid */}
               {/* Inputs Grid */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">

    <div className="flex flex-col w-full">
        <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={time}
            onTimeChange={(e) => setTime(e.target.value)}
            label="Date & Time"
        />
        {errors.dateTime && (
            <p className="text-red-500 text-[10px]  ml-[2px] col-span-full -mt-2">{errors.dateTime}</p>
        )}
    </div>

    {/* Nursing Service Dropdown */}
    {serviceType === "Proposed" && (
        <DropdownSelect
            label="Proposed Package Name"
            options={proposedOptions}
            selectedValue={nursingService}
            onSelect={(option) => {
                setNursingService(option.label);
                console.log("Nursing Service:", option.value); // Log the CID
            }}
            error={errors.nursingService}
        />
    )}
    {serviceType === "Surgery" && (
        <DropdownSelect
            label="Surgery Name"
            options={surgeryOptions}
            selectedValue={nursingService}
            onSelect={(option) => {
                setNursingService(option.label);
                console.log("Surgery:", option.value); // Log the CID
            }}
            error={errors.nursingService}
        />
    )}

    <DropdownSelect
        label="Select Doctor Name"
        options={doctors}
        selectedValue={doctorName}
        onSelect={(option) => {
            setDoctorName(option.label);
            console.log("Doctor:", option.value); // Log the CID
        }}
        error={errors.doctorName}
    />
    <DropdownSelect
        label="Performed By"
        options={performedByUsers}
        selectedValue={performedBy}
        onSelect={(option) => {
            setPerformedBy(option.label);
            console.log("Performed By:", option.value); // Log the CID
        }}
        error={errors.performedBy}
    />

    <ReusableInputField
        className="border-2 rounded-lg"
        id="quantity" 
        label="Quantity"
        width="w-full" 
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
    />
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
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <table className="w-full text-[11px] text-center border-collapse">
                        <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
                            <tr>
                                <TableReuse type="th">Date/Time</TableReuse>
                                <TableReuse type="th">Proposed Package Name</TableReuse>
                                <TableReuse type="th">Doctor Name</TableReuse>
                                <TableReuse type="th">Performed By</TableReuse>
                                <TableReuse type="th">Quantity</TableReuse>
                                <TableReuse type="th">Service Type</TableReuse>
                                <TableReuse type="th">Actions</TableReuse>
                            </tr>
                        </thead>
                        <tbody>
                            {vitals.map((v, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 border-t">
                                    <TableReuse>{v.date}</TableReuse>
                                    <TableReuse>{v.nursingService}</TableReuse>
                                    <TableReuse>{v.doctorName}</TableReuse>
                                    <TableReuse>{v.performedBy}</TableReuse>
                                    <TableReuse>{v.quantity}</TableReuse>
                                    <TableReuse>{v.serviceType}</TableReuse>
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
    );
}
