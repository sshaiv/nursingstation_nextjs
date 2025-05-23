

'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DateTimeInput from '../common/DateTimeInput';
import API_ENDPOINTS from '../constants/api_url';

export default function DoctorModal({ isOpen, onClose, onSelectDoctor ,visitid,gssuhid,empid}) {
    console.log("doc pop",visitid,gssuhid,empid);
    
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctorList, setDoctorList] = useState([]);
    const [patConsDoctors, setPatConsDoctors] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.getAllDoctor);
                const json = await res.json();
                const parsed = JSON.parse(json); 
                setDoctorList(parsed.Table || []);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        const fetchPatConsDoctors = async () => {
            try {
                const visitId = visitid;
                const res = await fetch(`${API_ENDPOINTS.getPatCons}?visitid=${visitId}`);
                const data = await res.json();
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

                if (Array.isArray(parsedData)) {
                    setPatConsDoctors(parsedData);
                } else {
                    setPatConsDoctors([]);
                    console.warn('Parsed data is not an array:', parsedData);
                }
            } catch (error) {
                console.error('Error fetching patient consultation doctors:', error);
                setPatConsDoctors([]);
            }
        };

        if (isOpen) {
            fetchDoctors();
            fetchPatConsDoctors();
        }
    }, [isOpen]);

    const handleOkClick = () => {
        // If dropdown doctor selected, prioritize that
        const doctorToSend = selectedDoctor || selectedRadio;


        if (!doctorToSend) {
            alert('Please select a doctor either from dropdown or radio list.');
            return;
        }

        console.log('Selected doctor to send:', doctorToSend);

        // Pass selected doctor to parent or handler
        if (onSelectDoctor) {
            onSelectDoctor(doctorToSend);
        }

        // Optionally close modal here or let parent control it
        onClose();
    };

    if (!isOpen) return null;

    const options = doctorList.map((doc) => ({
        value: doc.CID,
        label: doc.CName,
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
            <div className="w-[320px] rounded-md border shadow-lg bg-white p-3 text-xs font-sans">
                <div className="bg-green-100 text-green-800 text-center font-semibold py-2 rounded-t-md text-[13px]">
                    PATIENT'S DOCTORS
                </div>

                <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={time}
                    onTimeChange={(e) => setTime(e.target.value)}
                    label=" Date & Time"
                />

                <div className="mt-3">
                    <label className="text-gray-700 text-[11px] mb-1 block">Other Doctor</label>
                    <div className="flex gap-1">
                        <Select
                            options={options}
                            onChange={(selectedOption) => setSelectedDoctor(selectedOption?.value || '')}
                            placeholder="Select Doctor"
                            className="w-full text-[7px]"
                            styles={{
                                control: (base) => ({ ...base, fontSize: 12 }),
                                menu: (base) => ({ ...base, fontSize: 12 }),
                                option: (base, { isFocused, isSelected }) => ({
                                    ...base,
                                    fontSize: 10,
                                    padding: '2px 5px',
                                    minHeight: '24px',
                                    backgroundColor: isFocused ? '#e2e8f0' : 'white',
                                    color: isSelected ? '#1d4ed8' : '#374151',
                                    cursor: 'pointer',
                                }),
                                menuList: (base) => ({
                                    ...base,
                                    maxHeight: '120px',
                                    overflowY: 'auto',
                                }),
                            }}
                        />
                        <button onClick={handleOkClick} className="bg-blue-600 text-white text-[8px] px-2 rounded">
                            ✔ OK
                        </button>
                    </div>
                </div>

                {/* Table now uses patConsDoctors from API */}
                <div className="mt-3 overflow-x-auto text-[11px]">
                    <table className="min-w-full border text-left">
                        <thead className="bg-blue-800 text-white text-[11px]">
                            <tr>
                                <th className="py-1 px-2">Select</th>
                                <th className="py-1 px-2">Doctor Name</th>
                            </tr>
                        </thead>


                        <tbody>
                            {Array.isArray(patConsDoctors) && patConsDoctors.length > 0 ? (
                                patConsDoctors.map((doc) => (
                                    <tr key={doc.CID} className="border-t">
                                        <td className="px-2 py-[2px]">
                                            <input
                                                type="radio"
                                                name="doctor"
                                                checked={selectedRadio === doc.CID}
                                                onChange={() => {
                                                    setSelectedRadio(doc.CID);
                                                    console.log('Selected CID from radio:', doc.CID);

                                                    // Directly send selected doctor on radio select
                                                    if (onSelectDoctor) {
                                                        onSelectDoctor(doc.CID);
                                                    }

                                                  
                                                }}
                                            />
                                        </td>
                                        <td className="px-2 py-[2px]">{doc.CName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="text-center py-2">
                                        No doctors found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                <div className="mt-3 text-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-800 text-white text-[11px] py-[4px] px-5 rounded flex items-center justify-center gap-1 mx-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M10 17l5-5-5-5v10z" />
                            <path d="M0 24V0h24v24H0z" fill="none" />
                        </svg>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
