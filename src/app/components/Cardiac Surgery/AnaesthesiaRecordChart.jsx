"use client";
import { useState, useEffect, use } from "react";
import { ActionButton } from "../../common/Buttons";
import { format } from "date-fns";
import DateTimeInput from "../../common/DateTimeInput";
import useSaveVitalData from "../../hooks/useSaveVitalData";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function AnaesthesiaRecordChart({
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
  // 🔹 Define state for each field
  const [event, setEvent] = useState("");
  const [hrRythm, setHrRythm] = useState("");
  const [abpS, setAbpS] = useState("");
  const [abpD, setAbpD] = useState("");
  const [abpM, setAbpM] = useState("");
  const [papS, setPapS] = useState("");
  const [papD, setPapD] = useState("");
  const [papM, setPapM] = useState("");
  const [cvp, setCvp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [etco2, setEtco2] = useState("");
  const [temperature, setTemperature] = useState("");
  const [co, setCo] = useState("");
  const [ci, setCi] = useState("");
  const [sv, setSv] = useState("");
  const [pvr, setPvr] = useState("");
  const [svr, setSvr] = useState("");
  const [type, setType] = useState("");
  const [fio2, setFio2] = useState("");
  const [ph, setPh] = useState("");
  const [paco2, setPaco2] = useState("");
  const [pao2, setPao2] = useState("");
  const [sbe, setSbe] = useState("");
  const [hb, setHb] = useState("");
  const [so2, setSo2] = useState("");
  const [lac, setLac] = useState("");
  const [bloodGlucose, setBloodGlucose] = useState("");
  const [insulin, setInsulin] = useState("");
  const [act, setAct] = useState("");
  const [iv1, setIv1] = useState("");
  const [iv2, setIv2] = useState("");
  const [cellSaver, setCellSaver] = useState("");
  const [prbc, setPrbc] = useState("");
  const [ffp, setFfp] = useState("");
  const [platelet, setPlatelet] = useState("");
  const [epinepherine, setEpinepherine] = useState("");
  const [norepinepherine, setNorepinepherine] = useState("");
  const [dobutamine, setDobutamine] = useState("");
  const [drugs, setDrugs] = useState("");
  const [midazolam, setMidazolam] = useState("");
  const [fentanyl, setFentanyl] = useState("");
  const [etomidate, setEtomidate] = useState("");
  const [relaxant, setRelaxant] = useState("");
  const [antibiotic, setAntibiotic] = useState("");
  const [others, setOthers] = useState("");
  const [pcwpLap, setPcwpLap] = useState("");
  const [hco2Std, setHco2Std] = useState("");
  const [ntg, setNtg] = useState("");
  const [propofol, setPropofol] = useState("");
  const [o2, setO2] = useState("");
  const [anesthetic, setAnesthetic] = useState("");

  const [saveData, setSaveData] = useSaveVitalData();

  // console.log("update vital", saveData);

  // Array to keep inserted entries only
  const [insertedVitals, setInsertedVitals] = useState([]);

  const handleInsert = () => {
    const newEntry = {
      vitaldatetime: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
      ...fields.reduce((acc, f) => {
        acc[f.label] = f.value || "";
        return acc;
      }, {}),
    };

    setInsertedVitals((prev) => [...prev, newEntry]);

    // Save JSON also
    setSaveData((prev) => ({
      ...prev,
      jsonStringsubvitaldataentry: JSON.stringify([
        ...insertedVitals,
        newEntry,
      ]),
    }));

    // Clear fields after insert (optional)
    fields.forEach((f) => f.setValue(""));
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
  };

  const handleDeleteEntry = (indexToDelete) => {
    // Log the entry being deleted
    console.log("Deleting entry at index:", indexToDelete);
    console.log("Deleted entry:", insertedVitals[indexToDelete]);

    // Filter out the deleted entry
    const updatedEntries = insertedVitals.filter((_, i) => i !== indexToDelete);

    // Log the updated entries after deletion
    console.log("Updated entries after deletion:", updatedEntries);

    // Update state
    setInsertedVitals(updatedEntries);

    // Update JSON string
    setSaveData((prevData) => {
      const newSaveData = {
        ...prevData,
        jsonStringsubvitaldataentry: JSON.stringify(updatedEntries),
      };

      console.log("Updated saveData:", newSaveData);

      return newSaveData;
    });
  };

  useEffect(() => {
    if (selectedDate || selectedTime) {
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);
    }
  }, [selectedDate, selectedTime]);

  useKeyboardScrollFix();

  const fields = [
    { label: "Event", value: event, setValue: setEvent },
    { label: "HR/Rythm", value: hrRythm, setValue: setHrRythm },
    { label: "ABP S", value: abpS, setValue: setAbpS },
    { label: "ABP D", value: abpD, setValue: setAbpD },
    { label: "ABP M", value: abpM, setValue: setAbpM },
    { label: "PAP S", value: papS, setValue: setPapS },
    { label: "PAP D", value: papD, setValue: setPapD },
    { label: "PAP M", value: papM, setValue: setPapM },
    { label: "PCWP/LAP", value: pcwpLap, setValue: setPcwpLap },
    { label: "CVP", value: cvp, setValue: setCvp },
    { label: "SPO2", value: spo2, setValue: setSpo2 },
    { label: "ETCO2", value: etco2, setValue: setEtco2 },
    { label: "TEMPERATURE", value: temperature, setValue: setTemperature },
    { label: "CO", value: co, setValue: setCo },
    { label: "CI", value: ci, setValue: setCi },
    { label: "SV", value: sv, setValue: setSv },
    { label: "PVR", value: pvr, setValue: setPvr },
    { label: "SVR", value: svr, setValue: setSvr },
    { label: "TYPE", value: type, setValue: setType },
    { label: "FIO2", value: fio2, setValue: setFio2 },
    { label: "PH", value: ph, setValue: setPh },
    { label: "PACO2", value: paco2, setValue: setPaco2 },
    { label: "PAO2", value: pao2, setValue: setPao2 },
    { label: "HCO2 (STD)", value: hco2Std, setValue: setHco2Std },
    { label: "SBE", value: sbe, setValue: setSbe },
    { label: "HB", value: hb, setValue: setHb },
    { label: "SO2", value: so2, setValue: setSo2 },
    { label: "LAC", value: lac, setValue: setLac },
    { label: "BLOOD GLUCOSE", value: bloodGlucose, setValue: setBloodGlucose },
    { label: "INSULIN", value: insulin, setValue: setInsulin },
    { label: "ACT", value: act, setValue: setAct },
    { label: "IV1", value: iv1, setValue: setIv1 },
    { label: "IV2", value: iv2, setValue: setIv2 },
    { label: "CELL SAVER", value: cellSaver, setValue: setCellSaver },
    { label: "PRBC", value: prbc, setValue: setPrbc },
    { label: "FFP", value: ffp, setValue: setFfp },
    { label: "PLATELET", value: platelet, setValue: setPlatelet },
    { label: "EPINEPHERINE", value: epinepherine, setValue: setEpinepherine },
    {
      label: "NOREPINEPHERINE",
      value: norepinepherine,
      setValue: setNorepinepherine,
    },
    { label: "DOBUTAMINE", value: dobutamine, setValue: setDobutamine },
    { label: "NTG/SNP", value: ntg, setValue: setNtg },
    { label: "DRUGS", value: drugs, setValue: setDrugs },
    { label: "MIDAZOLAM (MG)", value: midazolam, setValue: setMidazolam },
    { label: "FENTANYL (UG)", value: fentanyl, setValue: setFentanyl },
    { label: "THIC/PROPOFOL", value: propofol, setValue: setPropofol },
    { label: "ETOMINDATE (MG)", value: etomidate, setValue: setEtomidate },
    { label: "RELAXANT (MG)", value: relaxant, setValue: setRelaxant },
    { label: "ANTIBIOTIC (MG/GM)", value: antibiotic, setValue: setAntibiotic },
    { label: "O2/N2O/AIR", value: o2, setValue: setO2 },
    {
      label: "INHALATIONAL ANESTHETIC",
      value: anesthetic,
      setValue: setAnesthetic,
    },
    { label: "OTHERS", value: others, setValue: setOthers },
  ];
  const [preOpState, setPreOpState] = useState("");
  const [preAnesthesiaPlan, setPreAnesthesiaPlan] = useState("");

  return (
    <div className=" border border-gray-300 shadow p-2">
      <div className="flex justify-between items-center mb-1">
        <div className="justify-end gap-2 flex">
          <ActionButton label="Insert" onClick={handleInsert} />

          <button
            onClick={savebtn}
            disabled={insertedVitals.length === 0}
            className={`text-xs p-2 rounded text-white ${
              insertedVitals.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-400"
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-wrap gap-4 mb-2 items-center">
        {/* Change in Pre Operative State */}
        <div className="flex items-center gap-6">
          <label className="text-gray-700 text-xs font-medium whitespace-nowrap">
            Change in Pre Operative State
          </label>
          <div className="flex gap-2 text-xs">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="preOpState"
                value="yes"
                checked={preOpState === "yes"}
                onChange={() => setPreOpState("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="preOpState"
                value="no"
                checked={preOpState === "no"}
                onChange={() => setPreOpState("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Change in Pre Anesthesia Plan */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 text-xs font-medium whitespace-nowrap">
            Change in Pre Anesthesia Plan
          </label>
          <div className="flex gap-2 text-xs">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="preAnesthesiaPlan"
                value="yes"
                checked={preAnesthesiaPlan === "yes"}
                onChange={() => setPreAnesthesiaPlan("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="preAnesthesiaPlan"
                value="no"
                checked={preAnesthesiaPlan === "no"}
                onChange={() => setPreAnesthesiaPlan("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Date & Time Input */}
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          time={selectedTime}
          onTimeChange={(e) => setTime(e.target.value)}
          className="col-span-full"
        />
      </div>

      {/* Rest of fields */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2">
        {fields.map((field, index) => (
          <div className="flex flex-col items-start" key={index}>
            <label className="text-gray-500 font-semibold text-[10px] mb-[1px]">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              className={`border text-black rounded w-[75px] text-[9px] h-[25px] px-[2px] py-[1px] 
          focus:outline-none focus:border-blue-500 
          ${field.value ? "border-blue-500" : "border-gray-300"}`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="max-h-[180px] border-gray-400 border-1 overflow-y-auto hide-scrollbar mt-1">
        <table className="w-full table-auto text-start border border-collapse text-2xl">
          <thead>
            <tr className="bg-white sticky top-0 z-10 text-gray-800">
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Actions
              </th>
              <th className="min-w-[120px] font-semibold text-xs border p-1 bg-gray-300">
                Date/Time
              </th>
              {fields.map((f, idx) => (
                <th
                  key={idx}
                  className="min-w-[50px] font-semibold text-xs border p-1 bg-gray-300"
                >
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...insertedVitals].reverse().map((entry, idx) => {
              const actualIndex = insertedVitals.length - 1 - idx;
              return (
                <tr key={idx} className="hover:bg-gray-50 text-xs text-black">
                  <td className="p-1 bg-blue-100">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteEntry(actualIndex)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-1 ">{entry.vitaldatetime}</td>
                  {fields.map((f, i) => (
                    <td key={i} className="p-1 border">
                      {entry[f.label]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
