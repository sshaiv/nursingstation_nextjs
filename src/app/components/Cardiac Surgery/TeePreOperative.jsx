"use client";
import { useState } from "react";
import { format } from "date-fns";

export default function TeePreOperative() {
  const [insertedData, setInsertedData] = useState([]);

  // Date + Time default
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getCurrentTimeHHMM = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  // 4 fields only
  const [aorta, setAorta] = useState("");
  const [rwma, setRwma] = useState("");
  const [valves, setValves] = useState("");
  const [others, setOthers] = useState("");

  const handleInsert = () => {
    const newEntry = {
      datetime: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
      aorta,
      rwma,
      valves,
      others,
    };

    setInsertedData((prev) => [...prev, newEntry]);

    // Clear inputs
    setAorta("");
    setRwma("");
    setValves("");
    setOthers("");
  };

  const handleDelete = (index) => {
    setInsertedData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-300 shadow p-4 rounded">
       

      {/* Input Row */}
      <div className="flex flex-wrap gap-4 mb-4">
         <label className="text-xs font-semibold mb-1">TEE: Pre Operative</label>
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1">Aorta</label>
          <input
            type="text"
            value={aorta}
            onChange={(e) => setAorta(e.target.value)}
            className="border rounded px-2 h-8 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1">RWMA / EF</label>
          <input
            type="text"
            value={rwma}
            onChange={(e) => setRwma(e.target.value)}
            className="border rounded px-2 h-8 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1">Valves</label>
          <input
            type="text"
            value={valves}
            onChange={(e) => setValves(e.target.value)}
            className="border rounded px-2 h-8 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1">Others</label>
          <input
            type="text"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            className="border rounded px-2 h-8 text-xs"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleInsert}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded"
          >
            Insert
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[150px] scrollbar-hide">
        <table className="w-full border text-xs ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1">Action</th>
              <th className="border p-1">Date/Time</th>
              <th className="border p-1">Aorta</th>
              <th className="border p-1">RWMA / EF</th>
              <th className="border p-1">Valves</th>
              <th className="border p-1">Others</th>
            </tr>
          </thead>
          <tbody >
            {insertedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-1 text-red-500 text-center">
                  <button onClick={() => handleDelete(idx)}>Delete</button>
                </td>
                <td className="border p-1 max-h-[100px] overflow-y-auto">
                  {row.datetime}
                </td>
                <td className="border p-1 max-h-[100px] overflow-y-auto">
                  {row.aorta}
                </td>
                <td className="border p-1 max-h-[100px] overflow-y-auto">
                  {row.rwma}
                </td>
                <td className="border p-1 max-h-[100px] overflow-y-auto">
                  {row.valves}
                </td>
                <td className="border p-1 max-h-[100px] overflow-y-auto">
                  {row.others}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
