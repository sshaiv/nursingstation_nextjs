import React, { useState } from "react";

import { ActionButton } from "@/app/common/Buttons";
import TableReuse from "@/app/common/TableReuse";
import DateTimeInput from "@/app/common/DateTimeInput";
import MedicineModal from "@/app/common/Modal/MedicineModal";
import { getCurrentDate, getCurrentDateTime } from "@/app/utils/dateUtils";

export default function OtherMedication() {
  // States
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [patientData, setPatientData] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");
  const [dose, setDose] = useState("");
  const [rateFreq, setRateFreq] = useState("");
  const [route, setRoute] = useState("");

  const [errors, setErrors] = useState({});
  const [vitals, setVitals] = useState([]); // Local entries
  const [table, setTable] = useState([]); // API fetched data
  const [loading, setLoading] = useState(false);
  const [saveData, setSaveData] = useState([]);
  const [isValidToSave, setIsValidToSave] = useState(false);
  const [showMedicineNameModal, setShowMedicineNameModal] = useState(false);

  const [medicineName, setMedicineName] = useState("");
  const [medicineData, setMedicineData] = useState(null);

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  // Handlers
  const handleSelectMedicineName = (selected) => {
    console.log("Medicine selected:", selected);
    setMedicineData(selected);
    setMedicineName(selected.CName);
    setShowMedicineNameModal(false);
  };

  const CurrentDate = getCurrentDate();
  const fullDateTime = getCurrentDateTime();

  const handleInsert = () => {
    let newErrors = {};
    if (!selectedDate || !selectedTime)
      newErrors.dateTime = "Date & Time required";
    if (!medicineName) newErrors.medicineName = "Medicine is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newEntry = {
      date: fullDateTime,

      medicineId: medicineData.CID,
      medicineName: medicineData.CName,
      dose,
      rateFreq,
      route,
      source: "local",
    };
    console.log("new entries: ", newEntry);

    setVitals((prev) => [...prev, newEntry]);
    setSaveData((prev) => [...prev, newEntry]);

    // Reset
    setMedicineName("");
    setDose("");
    setRateFreq("");
    setRoute("");
    setSelectedDate("");
    setSelectedTime(getCurrentTimeHHMM()); // reset to current time
    setIsValidToSave(false);
  };

  const handleDeleteEntry = (index) => {
    setVitals((prev) => prev.filter((_, i) => i !== index));
  };

  const savebtn = () => {
    // Here you can integrate API call
    setSaveData([...vitals]);
    alert("Data saved successfully!");
    setIsValidToSave(false);
  };

  return (
    <div className="p-2 rounded-xl w-full max-w-8xl mx-auto text-[12px] space-y-6">
      {/* Medicine Modal */}
      {showMedicineNameModal && (
        <MedicineModal
          isOpen={showMedicineNameModal}
          onSelect={handleSelectMedicineName}
          onClose={() => setShowMedicineNameModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
        />
      )}

      {/* Input Section */}
      <div className="border border-gray-100 rounded-lg p-2 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 items-end">
          {/* Date & Time */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Date & Time
            </label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          {/* Medicine Name */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">
              Medicine *
            </label>
            <input
              type="text"
              value={medicineName}
              readOnly
              onClick={() => setShowMedicineNameModal(true)}
              className={`cursor-pointer text-black border rounded text-xs bg-gray-100 hover:bg-gray-200 focus:outline-none py-1 px-2 ${
                errors.medicineName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select Medicine"
            />
            {errors.medicineName && (
              <p className="text-red-500 mt-0.5">{errors.medicineName}</p>
            )}
          </div>

          {/* Dose */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Dose</label>
            <input
              type="text"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="border-gray-200 text-black border rounded py-1 px-2 text-xs w-full"
              placeholder="Dose"
            />
          </div>

          {/* Rate / Freq */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">
              Rate / Freq
            </label>
            <input
              type="text"
              value={rateFreq}
              onChange={(e) => setRateFreq(e.target.value)}
              className="border-gray-200 text-black border rounded py-1 px-2 text-xs w-full"
              placeholder="Rate / Freq"
            />
          </div>

          {/* Route */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Route</label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="border-gray-200 text-black border rounded py-1 px-2 text-xs w-full"
              placeholder="Route"
            />
          </div>
        </div>

        {/* Insert & Posted Data Buttons */}
        <div className="flex mt-2 justify-end gap-2">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
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

                <TableReuse type="th">Medicine</TableReuse>
                <TableReuse type="th">Dose</TableReuse>
                <TableReuse type="th">Rate Freq</TableReuse>
                <TableReuse type="th">Route</TableReuse>
                <TableReuse type="th">Action</TableReuse>
              </tr>
            </thead>

            <tbody>
              {/* New vitals */}
              {[...vitals].reverse().map((v, idx) => {
                const actualIndex = vitals.length - 1 - idx;
                return (
                  <tr
                    key={"vital-" + idx}
                    className="hover:bg-gray-100 border-t"
                  >
                    <TableReuse>{v.date}</TableReuse>

                    <TableReuse>{v.medicineName}</TableReuse>
                    <TableReuse>{v.dose}</TableReuse>
                    <TableReuse>{v.rateFreq}</TableReuse>
                    <TableReuse>{v.route}</TableReuse>
                    <TableReuse>
                      <div className="flex justify-center space-x-2">
                        {v.source !== "api" && (
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteEntry(actualIndex)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </TableReuse>
                  </tr>
                );
              })}

              {/* API fetched data */}
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : table && table.length > 0 ? (
                table.map((row, idx) => (
                  <tr key={"api-" + idx} className="hover:bg-gray-50 border-t">
                    <TableReuse>{row.entdatetime || "-"}</TableReuse>
                    <TableReuse>{row.consultant || "-"}</TableReuse>
                    <TableReuse>{row.itemname || "-"}</TableReuse>
                    <TableReuse>{row.dose || "-"}</TableReuse>
                    <TableReuse>{row.ratefreq || "-"}</TableReuse>
                    <TableReuse>{row.route || "-"}</TableReuse>
                    <TableReuse>-</TableReuse>
                  </tr>
                ))
              ) : (
                <tr></tr>
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
