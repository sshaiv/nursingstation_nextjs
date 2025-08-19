import { ActionButton } from "@/app/common/Buttons";
import TableReuse from "@/app/common/TableReuse";
import React, { useState } from "react";
// import DateTimeInput, ActionButton, TableReuse if you already have them

export default function InvasiveLinesTubes() {
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");
  const [lineName, setLineName] = useState("");
  const [insertionDate, setInsertionDate] = useState("");
  const [insertionSign, setInsertionSign] = useState("");
  const [removalDate, setRemovalDate] = useState("");
  const [removalSign, setRemovalSign] = useState("");
  const [remark, setRemark] = useState("");

  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Insert new record
  const handleInsert = () => {
    const newErrors = {};
    if (!selectedDate || !time) newErrors.dateTime = "Required";
    if (!lineName) newErrors.lineName = "Required";
    if (!insertionDate) newErrors.insertionDate = "Required";
    if (!insertionSign) newErrors.insertionSign = "Required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newEntry = {
      date: `${selectedDate} ${time}`,
      lineName,
      insertionDate,
      insertionSign,
      removalDate,
      removalSign,
      remark,
      source: "local",
    };
    setEntries((prev) => [...prev, newEntry]);

    // Clear inputs
    setLineName("");
    setInsertionDate("");
    setInsertionSign("");
    setRemovalDate("");
    setRemovalSign("");
    setRemark("");
  };

  // Delete entry
  const handleDeleteEntry = (idx) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  // Save button logic
  const savebtn = () => {
    console.log("Saving Invasive Lines & Tubes:", entries);
    alert("Saved successfully!");
  };

  const isValidToSave = entries.length > 0;

  return (
    <div className=" w-full max-w-8xl mx-auto text-[12px] space-y-6">
      {/* Input Section */}
      <div className=" text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-end">
          {/* Date & Time */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-700">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              value={selectedDate && time ? `${selectedDate}T${time}` : ""}
              onChange={(e) => {
                const [date, t] = e.target.value.split("T");
                setSelectedDate(date);
                setTime(t);
              }}
              className="py-1 px-2 text-xs border rounded"
            />
            {errors.dateTime && (
              <p className="text-red-500 mt-0.5">{errors.dateTime}</p>
            )}
          </div>

          {/* Line / Tube */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-700">
              Line / Tube *
            </label>
            <input
              type="text"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
              className={`py-1 px-2 text-xs border rounded ${
                errors.lineName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter line/tube"
            />
            {errors.lineName && (
              <p className="text-red-500 mt-0.5">{errors.lineName}</p>
            )}
          </div>

         

          {/* Insertion Sign */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-gray-700">
              Insertion Sign *
            </label>
            <input
              type="text"
              value={insertionSign}
              onChange={(e) => setInsertionSign(e.target.value)}
              className={`py-1 px-2 text-xs border rounded ${
                errors.insertionSign ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Doctor/Nurse"
            />
            {errors.insertionSign && (
              <p className="text-red-500 mt-0.5">{errors.insertionSign}</p>
            )}
          </div>
        </div>

        {/* Insert & Posted Data Buttons */}
        <div className="flex -mt-6  justify-end gap-2">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-3 py-1"
          />

          <ActionButton
            label="Invasive Lines Remove"
            className="text-xs px-3 py-1"
          />
          <ActionButton label="Posted Data" className="text-xs px-3 py-1" />
        </div>
      </div>

      {/* Table */}
     <div className="border border-gray-200 rounded-sm overflow-hidden shadow-sm">
        <div className="max-h-[125px] overflow-y-auto hide-scrollbar">
          <table className="w-full text-[10px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                 <TableReuse type="th">Date</TableReuse>
                <TableReuse type="th">Line/Tube</TableReuse>
               
                <TableReuse type="th">Insertion Sign</TableReuse>
                <TableReuse type="th">Action</TableReuse>
               
              </tr>
            </thead>

            <tbody>
              {[...entries].reverse().map((v, idx) => {
                const actualIndex = entries.length - 1 - idx;
                return (
                  <tr
                    key={"entry-" + idx}
                    className="hover:bg-gray-100 border-t"
                  >
                    <td className="px-2 py-1 border">{v.date}</td>
                    <td className="px-2 py-1 border">{v.lineName}</td>                  
                    <td className="px-2 py-1 border">{v.insertionSign}</td>                    

                    <td className="px-2 py-1 border">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteEntry(actualIndex)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {loading && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && entries.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex">
        <button
          onClick={savebtn}
          disabled={!isValidToSave}
          className={`w-full px-6 py-2 rounded text-white ${
            !isValidToSave
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
