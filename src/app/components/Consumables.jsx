
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

export default function Consumables({ visitid, gssuhid, empid }) {
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({});

    const [nursingService, setNursingService] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [issueNo, setIssueNo] = useState("");
    const [store, setStore] = useState("");
    const [itemName, setItemName] = useState("");
    const [bundleName, setBundleName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [indentQty, setIndentQty] = useState("");
    const [issueQty, setIssueQty] = useState("");
    const [remarks, setRemarks] = useState("");

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

        const formattedDate = `${selectedDate.toLocaleDateString()} ${time}`;
        const newEntry = {
            date: formattedDate,
            nursingService: nursingService,
            doctorName: doctorName,
            performedBy: performedBy,
            issueNo: issueNo,
            store: store,
            itemName: itemName,
            bundleName: bundleName,
            barcode: barcode,
            indentQty: indentQty,
            issueQty: issueQty,
            remarks: remarks,
        };

        setVitals([...vitals, newEntry]);
        // Reset fields
        setNursingService("");
        setDoctorName("");
        setPerformedBy("");
        setIssueNo("");
        setStore("");
        setItemName("");
        setBundleName("");
        setBarcode("");
        setIndentQty("");
        setIssueQty("");
        setRemarks("");
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
                <ModalHeading title="Consumables" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />

            <div className="border border-gray-100 rounded-lg space-y-4">

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
                            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px] col-span-full -mt-2">{errors.dateTime}</p>
                        )}
                    </div>

                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="issueNo"
                        label="Issue No"
                        width="w-full"
                        value={issueNo}
                        onChange={(e) => setIssueNo(e.target.value)}
                    />

                    {/* Doctor Name Dropdown */}
                    <DropdownSelect
                        label="Select Doctor Name"
                        options={doctors}
                        selectedValue={doctorName}
                        onSelect={(option) => {
                            setDoctorName(option.label);
                            console.log("Doctor :", option.value); // Log the CID
                        }}
                        error={errors.doctorName}
                    />

                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="store"
                        label="Store"
                        width="w-full"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="itemName"
                        label="Item Name"
                        width="w-full"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="bundleName"
                        label="Bundle Name"
                        width="w-full"
                        value={bundleName}
                        onChange={(e) => setBundleName(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="barcode"
                        label="Barcode"
                        width="w-full"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="indentQty"
                        label="Indent Qty"
                        width="w-full"
                        value={indentQty}
                        onChange={(e) => setIndentQty(e.target.value)}
                    />
                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="issueQty"
                        label="Issue Qty"
                        width="w-full"
                        value={issueQty}
                        onChange={(e) => setIssueQty(e.target.value)}
                    />

                    <ReusableInputField
                        className="border-2 rounded-lg"
                        id="remarks"
                        label="Remarks"
                        width="w-full"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
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
                                <TableReuse type="th">Doctor Name</TableReuse>
                                <TableReuse type="th">Performed By</TableReuse>
                                <TableReuse type="th">Issue No</TableReuse>
                                <TableReuse type="th">Store</TableReuse>
                                <TableReuse type="th">Item Name</TableReuse>
                                <TableReuse type="th">Bundle Name</TableReuse>
                                <TableReuse type="th">Barcode</TableReuse>
                                <TableReuse type="th">Indent Qty</TableReuse>
                                <TableReuse type="th">Issue Qty</TableReuse>
                                <TableReuse type="th">Remarks</TableReuse>
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
                                    <TableReuse>{v.issueNo}</TableReuse>
                                    <TableReuse>{v.store}</TableReuse>
                                    <TableReuse>{v.itemName}</TableReuse>
                                    <TableReuse>{v.bundleName}</TableReuse>
                                    <TableReuse>{v.barcode}</TableReuse>
                                    <TableReuse>{v.indentQty}</TableReuse>
                                    <TableReuse>{v.issueQty}</TableReuse>
                                    <TableReuse>{v.remarks}</TableReuse>
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
