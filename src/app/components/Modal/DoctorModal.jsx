

'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DateTimeInput from '@/app/common/DateTimeInput';
import API_ENDPOINTS from '@/app/constants/api_url';

export default function DoctorModal({ isOpen, onClose, onSelectDoctor, visitid, gssuhid, empid }) {
    console.log("doc pop", visitid, gssuhid, empid);

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
                const res = await fetch(`${API_ENDPOINTS.getPatCons}?visitid=${visitid}`);
                const data = await res.json();
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                setPatConsDoctors(Array.isArray(parsedData) ? parsedData : []);
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
        let doctorToSend = null;
        if (selectedDoctor) {
            const selectedDocObj = doctorList.find((doc) => doc.CID === selectedDoctor);
            if (selectedDocObj) {
                doctorToSend = {
                    CID: selectedDocObj.CID,
                    CName: selectedDocObj.CName
                };
            }
        } else if (selectedRadio) {
            const selectedDocObj = patConsDoctors.find((doc) => doc.CID === selectedRadio);
            if (selectedDocObj) {
                doctorToSend = {
                    CID: selectedDocObj.CID,
                    CName: selectedDocObj.CName
                };
            }
        }
        if (!doctorToSend) {
            alert('Please select a doctor either from dropdown or radio list.');
            return;
        }
        console.log('Selected doctor to send:', doctorToSend);
        if (onSelectDoctor) {
            onSelectDoctor(doctorToSend);
        }
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
                  🩺👩🏻‍⚕️  PATIENT'S DOCTORS
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
                            onChange={(selectedOption) => {
                                setSelectedDoctor(selectedOption?.value || '');
                                if (onSelectDoctor && selectedOption) {
                                    onSelectDoctor({
                                        CID: selectedOption.value,
                                        CName: selectedOption.label
                                    });
                                }
                            }}
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
                                    <tr key={doc.CID} className="border-t text-black">
                                        <td className="px-2 py-[2px] text-black">
                                            <input
                                                type="radio"
                                                name="doctor"
                                                checked={selectedRadio === doc.CID}
                                                onChange={() => {
                                                    setSelectedRadio(doc.CID);
                                                    if (onSelectDoctor) {
                                                        onSelectDoctor({
                                                            CID: doc.CID,
                                                            CName: doc.CName
                                                        });
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
                       ✖️ Close
                    </button>
                </div>
            </div>
        </div>
    );
}
