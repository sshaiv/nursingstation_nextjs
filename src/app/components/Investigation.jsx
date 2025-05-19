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

export default function Investigation({ visitid, gssuhid, empid }) {
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
    const [isEmergency, setIsEmergency] = useState(false);

    // Options for Nursing Service, Doctors, and Performed By Users
    const [nursingOptions, setNursingOptions] = useState([]);
    const [doctorOptions, setDoctorOptions] = useState([]);
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
            nursingService,
            doctorName,
            performedBy,
            issueNo,
            store,
            itemName,
            bundleName,
            barcode,
            indentQty,
            issueQty,
            remarks,
            isEmergency,
        };

        setVitals([...vitals, newEntry]);
        // Reset fields
        resetFields();
    };

    const resetFields = () => {
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
        setIsEmergency(false);
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [nursingResponse, doctorResponse, performedByResponse] = await Promise.all([
                    axios.get(API_ENDPOINTS.getAllHeadload),
                    axios.get(API_ENDPOINTS.getAllHeadload),
                    axios.get(API_ENDPOINTS.getAllHeadload),
                ]);

                const parseData = (data) => {
                    const parsedData = JSON.parse(data);
                    
                    
                    return parsedData.Table.map(item => ({
                        label: item.CNAME,
                        value: item.CID,
                    }));
                };

                setNursingOptions(parseData(nursingResponse.data));
                setDoctorOptions(parseData(doctorResponse.data));
                setPerformedByUsers(parseData(performedByResponse.data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOptions();
    }, []);

    return (
        <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
            <div className="flex items-center justify-center">
                <ModalHeading title="Doctor Visit" />
            </div>
            <hr className="border-t mt-6 mb-2 border-gray-300" />

            <div className="border border-gray-100 rounded-lg space-y-4">
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

                    <DropdownSelect
                        label="Select Nursing Service*"
                        options={nursingOptions}
                        selectedValue={nursingService}
                        onSelect={(option) => setNursingService(option.label)}
                        error={errors.nursingService}
                    />
                    <DropdownSelect
                        label="Select Doctor Name*"
                        options={doctorOptions}
                        selectedValue={doctorName}
                        onSelect={(option) => setDoctorName(option.label)}
                        error={errors.doctorName}
                    />
                    <DropdownSelect
                        label="Investigation Name*"
                        options={doctorOptions} // Assuming this is the correct source
                        selectedValue={itemName}
                        onSelect={(option) => setItemName(option.label)}
                        error={errors.itemName}
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

                <div className="flex justify-end">
                    <ActionButton label="Insert" onClick={handleInsert} className="text-xs px-4 py-1" />
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="max-h-[225px] overflow-y-auto scrollbar-hide">
                    <table className="w-full text-[11px] text-center border-collapse">
                        <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
                            <tr>
                                <TableReuse type="th">Date/Time</TableReuse>
                                <TableReuse type="th">Doctor Name</TableReuse>
                                <TableReuse type="th">Investigation Name</TableReuse>
                                <TableReuse type="th">Remarks</TableReuse>
                                <TableReuse type="th">Actions</TableReuse>
                            </tr>
                        </thead>
                        <tbody>
                            {vitals.map((v, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 border-t">
                                    <TableReuse>{v.date}</TableReuse>
                                    <TableReuse>{v.doctorName}</TableReuse>
                                    <TableReuse>{v.itemName}</TableReuse>
                                    <TableReuse>{v.remarks}</TableReuse>
                                    <TableReuse>
                                        <div className="flex justify-center space-x-2">
                                            <button className="text-blue-500 hover:underline">
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

            <div className="flex justify-center ">
                <SaveButton label="Save" />
            </div>
        </div>
    );
}
