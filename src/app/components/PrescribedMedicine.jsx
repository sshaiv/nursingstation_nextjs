
import React, { useState } from 'react';
import TableReuse from '../common/TableReuse';
import { ActionButton } from '../common/Buttons';
import { H3, Label } from '../common/text';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const PrescribedMedicine = () => {
    const [medicine, setMedicine] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // Example vitals data
    const [vitals, setVitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new entry to vitals
        setVitals([...vitals, { medicine, date, time }]);
        console.log('Submitted:', { medicine, date, time });
        // Reset the form fields
        setMedicine('');
        setDate('');
        setTime('');
    };

    return (
        <div className='h-52'>

            <form onSubmit={handleSubmit} className=" flex items-center space-x-4">
                <H3>Prescribed Medicine</H3>
                <div className="flex-1">
                   <Label htmlFor="medicine">Medicine</Label>
                   
                    <input
                        type="text"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        className="mt-1 block w-[500px] border border-gray-300 rounded-md p-1 text-sm"
                        placeholder="Enter medicine name"
                        required
                    />
                </div>
                <div className="flex-1">
                     <Label htmlFor="date">Date</Label>
                   
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="peer border rounded w-[250px] text-[12px] h-10 mr-2 pl-2  focus:outline-none focus:border-blue-500 ${input.value ? 'border-blue-500' : 'border-gray-300"
                    />
                </div>
                <div className="flex-1">
                     <Label htmlFor="time">Time</Label>
                   
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-sm"
                        required
                    />
                </div>
                <ActionButton label="Insert" />
            </form>

            {/* Table */}
            <div className="mt-2 max-h-[100px] md:max-h-[120px] lg:max-h-[90px] overflow-y-scroll hide-scrollbar">
                <table className="w-full table-auto text-xs text-center border">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <TableReuse type="th">Select</TableReuse>
                            <TableReuse type="th">Date/Time</TableReuse>
                            <TableReuse type="th">Medicine</TableReuse>



                        </tr>
                    </thead>
                    <tbody>
                        {vitals.map((v, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrescribedMedicine;
