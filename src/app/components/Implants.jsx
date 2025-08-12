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

export default function Implants({ visitid, gssuhid, empid }) {
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({});

    const [nursingService, setNursingService] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [quantity, setQuantity] = useState("");
    const [batchSeries, setBatchSeries] = useState("");
    const [charges, setCharges] = useState("");
    const [totalAmt, setTotalAmt] = useState("");
    const [finalAmt, setFinalAmt] = useState("");
    const [remark, setRemark] = useState("");

    // Options for Nursing Service
    const [options, setOptions] = useState([]);

    // Options for Doctors and Performed By Users
    const [doctors, setDoctors] = useState([]);
    const [performedByUsers, setPerformedByUsers] = useState([]);

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

        setErrors({});

        // const formattedDate = `${selectedDate.toLocaleDateString()} ${time}`;
        const newEntry = {
            date: formattedDate,
            nursingService,
            doctorName,
            performedBy,
            quantity,
            batchSeries,
            charges,
            totalAmt,
            finalAmt,
            remark,
        };

        setVitals([...vitals, newEntry]);
        setNursingService("");
        setDoctorName("");
        setPerformedBy("");
        setQuantity("");
        setBatchSeries("");
        setCharges("");
        setTotalAmt("");
        setFinalAmt("");
        setRemark("");
    };

    useEffect(() => {
        const fetchNursingServices = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.getAllHeadload);
                const parsedData = JSON.parse(response.data);
                const relationData = parsedData.Table;
                if (relationData && Array.isArray(relationData)) {
                    const formattedOptions = relationData.map((item) => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                    setOptions(formattedOptions);
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
                <ModalHeading title="Implants" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />

            <div className="border border-gray-100 rounded-lg space-y-4">
                {/* Inputs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
                    {/* Nursing Service Dropdown */}
                    <DropdownSelect
                        label="Item Name:*"
                        options={options}
                        selectedValue={nursingService}
                        onSelect={(option) => {
                            setNursingService(option.label);
                        }}
                        error={errors.nursingService}
                    />
                    {/* Doctor Name Dropdown */}
                    <DropdownSelect
                        label="Vendor Name*"
                        options={doctors}
                        selectedValue={doctorName}
                        onSelect={(option) => {
                            setDoctorName(option.label);
                        }}
                        error={errors.doctorName}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="quantity"
                        label="Vendor Payment"
                        width="w-full"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="batchSeries"
                        label="Batch Series"
                        width="w-full"
                        value={batchSeries}
                        onChange={(e) => setBatchSeries(e.target.value)}
                    />
                    <div className="flex flex-col w-full">
                        <DateTimeInput
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            time={time}
                            onTimeChange={(e) => setTime(e.target.value)}
                            label="Expiry Date"
                        />
                        {errors.dateTime && (
                            <p className="text-red-500 text-[10px]  ml-[2px] col-span-full -mt-2">{errors.dateTime}</p>
                        )}
                    </div>
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="charges"
                        label="Charges"
                        width="w-full"
                        value={charges}
                        onChange={(e) => setCharges(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="totalAmt"
                        label="Total Amt"
                        width="w-full"
                        value={totalAmt}
                        onChange={(e) => setTotalAmt(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="finalAmt"
                        label="Final Amt"
                        width="w-full"
                        value={finalAmt}
                        onChange={(e) => setFinalAmt(e.target.value)}
                    />
                    {/* Performed By Dropdown */}
                    <DropdownSelect
                        label="Performed By*"
                        options={performedByUsers}
                        selectedValue={performedBy}
                        onSelect={(option) => {
                            setPerformedBy(option.label);
                        }}
                        error={errors.performedBy}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="remark"
                        label="Remark"
                        width="w-full"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
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
                                <TableReuse type="th">Nursing Service</TableReuse>
                                <TableReuse type="th">Vendor Name</TableReuse>
                                <TableReuse type="th">Performed By</TableReuse>
                                <TableReuse type="th">Vendor Payment</TableReuse>
                                <TableReuse type="th">Batch Series</TableReuse>
                                <TableReuse type="th">Charges</TableReuse>
                                <TableReuse type="th">Total Amt</TableReuse>
                                <TableReuse type="th">Final Amt</TableReuse>
                                <TableReuse type="th">Remark</TableReuse>
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
                                    <TableReuse>{v.batchSeries}</TableReuse>
                                    <TableReuse>{v.charges}</TableReuse>
                                    <TableReuse>{v.totalAmt}</TableReuse>
                                    <TableReuse>{v.finalAmt}</TableReuse>
                                    <TableReuse>{v.remark}</TableReuse>
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
