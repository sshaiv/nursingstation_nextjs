"use client";
import { useState } from "react";
import { ActionButton } from "../../common/Buttons";
import { format } from "date-fns";
import DateTimeInput from "../../common/DateTimeInput";
import useSaveVitalData from "../../hooks/useSaveVitalData";
import PerformedByModal from "../../common/Modal/PerformedByModal";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";
import { toast } from "react-toastify";
import { ModalHeading } from "@/app/common/text";

export default function ClinicalChart({
  title,
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
  const [vitals, setVitals] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [temp, setTemp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [news, setNews] = useState("");
  const [pulse, setPulse] = useState("");
  const [rr, setRr] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [painScore, setPainScore] = useState("");
  const [fhs, setFhs] = useState("");
  const [babyWeight, setBabyWeight] = useState("");

  // Intake / Output states
  const [intakeType, setIntakeType] = useState("");
  const [intakeValue, setIntakeValue] = useState("");
  const [totalIntake, setTotalIntake] = useState("");
  const [urineOutput, setUrineOutput] = useState("");
  const [drain, setDrain] = useState("");

  // console.log("update vital", saveData);

  // Array to keep inserted entries only
  const [insertedVitals, setInsertedVitals] = useState([]);

  useKeyboardScrollFix();

 const handleInsert = () => {
  // Collect all input values
  const allFields = [
    temp,
    spo2,
    news,
    pulse,
    rr,
    bpSystolic,
    bpDiastolic,
    painScore,
    fhs,
    babyWeight,
    intakeType,
    intakeValue,
    totalIntake,
    urineOutput,
    drain,
  ];

  // Check if all fields are blank
  const allBlank = allFields.every((field) => field === "" || field === null || field === undefined);

  if (allBlank) {
    toast.error("Please fill at least one field");
    return;
  }

  // Insert new entry
  const newEntry = {
    vitaldatetime: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
    temp,
    spo2,
    news,
    pulse,
    rr,
    bpSystolic,
    bpDiastolic,
    painScore,
    fhs,
    babyWeight,
    intakeType,
    intakeValue,
    totalIntake,
    urineOutput,
    drain,
  };

  setInsertedVitals((prev) => [...prev, newEntry]);

  // Clear inputs
  setTemp("");
  setSpo2("");
  setNews("");
  setPulse("");
  setRr("");
  setBpSystolic("");
  setBpDiastolic("");
  setPainScore("");
  setFhs("");
  setBabyWeight("");
  setIntakeType("");
  setIntakeValue("");
  setTotalIntake("");
  setUrineOutput("");
  setDrain("");
};


  return (
    <div className="p-2">
      <ModalHeading title=" Clinical Chart" className="text-[11px] mb-3" />

      {/* Inputs */}
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Date & Time Input */}

        <div className="flex flex-col">
          <label className="text-xs text-gray-700 font-medium mb-1">
            Date & Time
          </label>
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Vital Fields */}
        {[
          {
            label: "Temperature",
            value: temp,
            setValue: setTemp,
            type: "number",
          },
          { label: "SPO2", value: spo2, setValue: setSpo2, type: "number" },
          { label: "NEWS", value: news, setValue: setNews, type: "number" },
          { label: "Pulse", value: pulse, setValue: setPulse, type: "number" },
          { label: "R.R", value: rr, setValue: setRr, type: "number" },
          {
            label: "BP Systolic",
            value: bpSystolic,
            setValue: setBpSystolic,
            type: "number",
          },
          {
            label: "BP Diastolic",
            value: bpDiastolic,
            setValue: setBpDiastolic,
            type: "number",
          },
          {
            label: "Pain Score",
            value: painScore,
            setValue: setPainScore,
            type: "number",
          },
          { label: "FHS", value: fhs, setValue: setFhs, type: "number" },
          {
            label: "Baby's Daily WT",
            value: babyWeight,
            setValue: setBabyWeight,
            type: "number",
          },
        ].map((input, index) => (
          <div className="flex flex-col items-start" key={index}>
            <label className="text-gray-500 font-semibold text-[11px] mb-[1px]">
              {input.label}
            </label>
            <input
              type={input.type}
              value={input.value}
              onChange={(e) => input.setValue(e.target.value || "")}
              className="border text-black rounded w-[90px] text-[10px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        {/* Intake (OR condition: Oral/RT OR IV) */}
        <div className="flex flex-col items-start">
          <label className="text-gray-500 font-semibold text-[11px] mb-[1px]">
            Intake (Oral/RT or IV)
          </label>
          <div className="flex space-x-2 items-center">
            <select
              value={intakeType}
              onChange={(e) => setIntakeType(e.target.value)}
              className="border text-black rounded w-[120px] text-[10px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="oralRT">Oral / RT</option>
              <option value="iv">IV</option>
            </select>
            <input
              type="number"
              value={intakeValue}
              onChange={(e) => setIntakeValue(e.target.value || "")}
              placeholder="ml"
              className="border text-black rounded w-[90px] text-[10px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Remaining Inputs */}
        {[
          {
            label: "Total Intake",
            value: totalIntake,
            setValue: setTotalIntake,
          },
          {
            label: "Total Urine Output",
            value: urineOutput,
            setValue: setUrineOutput,
          },
          { label: "Drain", value: drain, setValue: setDrain },
        ].map((input, index) => (
          <div className="flex flex-col items-start" key={"extra-" + index}>
            <label className="text-gray-500 font-semibold text-[11px] mb-[1px]">
              {input.label}
            </label>
            <input
              type="number"
              value={input.value}
              onChange={(e) => input.setValue(e.target.value || "")}
              className="border text-black rounded w-[100px] text-[10px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        <div className="flex  justify-end gap-2">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-3 py-1"
          />

          <ActionButton label="Save" className="text-xs px-3 py-1" />
        </div>
      </div>

      {/* Replace your static table with this dynamic one */}
      <div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded mt-2 hide-scrollbar">
        <table className="w-full table-auto text-xs border-collapse text-black">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                "Date / Time",
                "Temperature",
                "SPO2",
                "NEWS",
                "Pulse",
                "R.R",
                "BP Systolic",
                "BP Diastolic",
                "Pain Score",
                "FHS",
                "Baby's Daily WT",
                "Intake Type",
                "Intake Value (ml)",
                "Total Intake",
                "Total Urine Output",
                "Drain",
                "Action",
              ].map((label, idx) => (
                <th
                  key={idx}
                  className="border p-1 font-semibold text-[10px] text-center"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {insertedVitals.map((entry, idx) => (
              <tr key={idx} className="text-center hover:bg-gray-50">
                <td className="border p-1">{entry.vitaldatetime}</td>
                <td className="border p-1">{entry.temp}</td>
                <td className="border p-1">{entry.spo2}</td>
                <td className="border p-1">{entry.news}</td>
                <td className="border p-1">{entry.pulse}</td>
                <td className="border p-1">{entry.rr}</td>
                <td className="border p-1">{entry.bpSystolic}</td>
                <td className="border p-1">{entry.bpDiastolic}</td>
                <td className="border p-1">{entry.painScore}</td>
                <td className="border p-1">{entry.fhs}</td>
                <td className="border p-1">{entry.babyWeight}</td>
                <td className="border p-1">{entry.intakeType}</td>
                <td className="border p-1">{entry.intakeValue}</td>
                <td className="border p-1">{entry.totalIntake}</td>
                <td className="border p-1">{entry.urineOutput}</td>
                <td className="border p-1">{entry.drain}</td>
                <td className="border p-1">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() =>
                      setInsertedVitals((prev) =>
                        prev.filter((_, i) => i !== idx)
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
