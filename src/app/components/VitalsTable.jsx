
"use client";
import { useState, useEffect } from "react";
import {ActionButton} from "../common/Buttons";
import { MainHeadings } from '../common/text';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TableReuse from "../common/TableReuse";

export default function VitalsTable({ title }) {
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [selectedTime, setSelectedTime] = useState("");
    const [bp, setBp] = useState("");
    const [pulse, setPulse] = useState("");
    const [temp, setTemp] = useState("");
    const [spo2, setSpo2] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [rr, setRr] = useState("");
    const [painScore, setPainScore] = useState("");

    const timeOptions = Array.from({ length: 24 }, (_, index) => {
        const hour = (index + 8) % 24; // Start from 8 AM
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:00 ${period}`;
    });

    useEffect(() => {
        loadVitalData();
        setSelectedTime(timeOptions[0]); // default time
    }, []);

    const loadVitalData = async () => {
        try {
            const response = await fetch('https://doctorapi.medonext.com/api/DoctorAPI/GetData?JsonAppInbox={"doctorid":"24","fromdate":"","todate":"","datafor":"VITAL","visitid":"GNI24250001379","gCookieSessionOrgID":"48","gCookieSessionDBId":"gdnew"}');
            const data = await response.json();

            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

            if (Array.isArray(parsedData)) {
                setVitals(parsedData.map(item => ({
                    date: item.vitaldatetime,
                    bp: item.BP,
                    pulse: item.pulse,
                    temp: item.temp,
                    spo2: item.spo2,
                    weight: item.weight || 'N/A',
                    height: item.height || 'N/A',
                    rr: item.RR || 'N/A',
                    painScore: item.painscore?.toString() || 'N/A',
                })));
            } else {
                console.error('Parsed data is not an array', parsedData);
            }
        } catch (error) {
            console.error('Failed to load vital data', error);
        }
    };

    const handleSave = () => {
        if (selectedDate || selectedTime || bp || pulse || temp || spo2 || weight || height || rr || painScore) {
            setVitals(prev => [
                ...prev,
                {
                    date: `${format(selectedDate, 'dd-MM-yyyy')} ${selectedTime}` || 'N/A',
                    bp: bp || 'N/A',
                    pulse: pulse || 'N/A',
                    temp: temp || 'N/A',
                    spo2: spo2 || 'N/A',
                    weight: weight || 'N/A',
                    height: height || 'N/A',
                    rr: rr || 'N/A',
                    painScore: painScore || 'N/A',
                }
            ]);
            clearInputs();
        }
    };

    const clearInputs = () => {
        setSelectedDate(new Date()); // Reset to today's date
        setSelectedTime(timeOptions[0]);
        setBp("");
        setPulse("");
        setTemp("");
        setSpo2("");
        setWeight("");
        setHeight("");
        setRr("");
        setPainScore("");
    };

    return (
        <div className="bg-gray-50 border h-48 border-gray-300 shadow rounded-2xl p-2">
            <div className="flex justify-between items-center mb-2">
                <MainHeadings title={title} />
                <ActionButton label="Insert" onClick={handleSave} />
            </div>


            {/* Input fields - always visible */}
            <div className="mb-1 flex scrollable">
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="peer border rounded w-[85px] text-[12px] h-10 mr-2 pl-2  focus:outline-none focus:border-blue-500 ${input.value ? 'border-blue-500' : 'border-gray-300"
                />

                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="peer border rounded w-[70px] text-[12px] h-10   focus:outline-none focus:border-blue-500 ${input.value ? 'border-blue-500' : 'border-gray-300">
                    {timeOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>

                {[
                    { placeholder: "BP", value: bp, setValue: setBp },
                    { placeholder: "Pulse", value: pulse, setValue: setPulse },
                    { placeholder: "Temp", value: temp, setValue: setTemp },
                    { placeholder: "SPO2", value: spo2, setValue: setSpo2 },
                    { placeholder: "Weight", value: weight, setValue: setWeight },
                    { placeholder: "Height", value: height, setValue: setHeight },
                    { placeholder: "R.R", value: rr, setValue: setRr },
                    { placeholder: "Pain Score", value: painScore, setValue: setPainScore },
                ].map((input, index) => (
                    <div className="relative mx-1" key={index}>
                        <label className="block text-gray-600 text-xs mb-1">{input.placeholder}</label>
                        <input
                            type="text"
                            value={input.value}
                            onChange={(e) => input.setValue(e.target.value)}
                            className={`peer border rounded w-[50px] text-[10px] h-6 px-1 pt-3 pb-0.5 focus:outline-none focus:border-blue-500 ${input.value ? 'border-blue-500' : 'border-gray-300'}`}
                        />
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="max-h-[100px] md:max-h-[120px] lg:max-h-[90px] overflow-y-scroll hide-scrollbar">
                <table className="w-full table-auto text-xs text-center border">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <TableReuse type="th">Date/Time</TableReuse>
                            <TableReuse type="th">BP</TableReuse>
                            <TableReuse type="th">Pulse</TableReuse>
                            <TableReuse type="th">Temp</TableReuse>
                            <TableReuse type="th">SPO2</TableReuse>
                            <TableReuse type="th">Weight</TableReuse>
                            <TableReuse type="th">Height</TableReuse>
                            <TableReuse type="th">R.R</TableReuse>
                            <TableReuse type="th">Pain Score</TableReuse>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {vitals.map((v, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {/* <td className="border p-1 text-xs">{v.date}</td> */}
                               <TableReuse>{v.date}</TableReuse>
                               <TableReuse>{v.bp}</TableReuse>
                               <TableReuse>{v.pulse}</TableReuse>
                               <TableReuse>{v.temp}</TableReuse>
                               <TableReuse>{v.spo2}</TableReuse>
                               <TableReuse>{v.weight}</TableReuse>
                               <TableReuse>{v.height}</TableReuse>
                               <TableReuse>{v.rr}</TableReuse>
                               <TableReuse>{v.painscore}</TableReuse>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}