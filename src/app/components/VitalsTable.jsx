"use client";
import { useState, useEffect } from "react";
import { ActionButton } from "../common/Buttons";
import { MainHeadings } from "../common/text";
import { format } from "date-fns";
import TableReuse from "../common/TableReuse";
import DateTimeInput from "../common/DateTimeInput";
import useSaveVitalData from "../hooks/useSaveVitalData";
import API_ENDPOINTS from "../constants/api_url";
import NursingServiceModal from "./NursingServiceModal";
import PerformedByModal from "./Modal/PerformedByModal";

export default function VitalsTable({
  title,
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
  const [vitals, setVitals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Initialize selectedTime to current time in HH:mm format
  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  const [errors, setErrors] = useState({});

  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [temp, setTemp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [rr, setRr] = useState("");
  const [painScore, setPainScore] = useState("");
  const [bmi, setBmi] = useState("");
  const [loading, setLoading] = useState(false);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [Headcircumference, setHeadcircumference] = useState("");
  const [bsl, setBsl] = useState("");
  const [cvs, setCvs] = useState("");
  const [cns, setCns] = useState("");
  const [rs, setRs] = useState("");
  const [pa, setPa] = useState("");
  const [logicalExam, setLogicalExam] = useState("");
  const [showPerformedByModal, setShowPerformedByModal] = useState(false);

  const [performedBy, setPerformedBy] = useState("");

  const [performedByData, setPerformedByData] = useState(null);

  const [saveData, setSaveData] = useSaveVitalData();

  console.log("update vital", saveData);

  // Array to keep inserted entries only
  const [insertedVitals, setInsertedVitals] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  // When user selects from modal:
  const handleSelectPerformedBy = (selected) => {
    console.log("PerformedBy selected:", selected);
    setPerformedByData(selected);
    setPerformedBy(selected.CName);
    // console.log("spb",performedBy.CName);

    setShowPerformedByModal(false);
  };

  useEffect(() => {
    loadVitalData();
  }, []);

  useEffect(() => {
    if (visitid) {
      loadVitalData();
    }
  }, [visitid]);
  useEffect(() => {
    if (height && weight) {
      const h = parseFloat(height);
      const w = parseFloat(weight);

      if (!isNaN(h) && !isNaN(w) && h > 0) {
        const bmiValue = w / ((h / 100) * (h / 100));
        setBmi(bmiValue.toFixed(2)); 
      } else {
        setBmi("");
      }
    } else {
      setBmi("");
    }
  }, [height, weight]);

  const loadVitalData = async () => {
    if (!visitid) {
      // console.warn("No visitid provided, skipping loadVitalData");
      // return;
      // setToastMessage("⚠️ Missing patient data or empty field");
      // setTimeout(() => setToastMessage(""), 2000);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
      `${API_ENDPOINTS.getPatVitalData}/?visitid=${visitid}`
      );
      
      let data = await response.json();

      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      console.log("Parsed Vital Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        setVitals(
          data.map((item) => ({
            date: item.vitaldatetime,
            takenby: item.takenby,
            bp: item.BP,
            // systolic: item.systolic || "",
            // diastolic: item.diastolic || "",
            pulse: item.pulse || "",
            temp: item.temp || "",
            spo2: item.spo2 || "",
            weight: item.weight || "",
            height: item.height || "",
            bmi: item.bmi || "",
            rr: item.RR || "",
            painScore: item.painscore?.toString() || "",
            Headcircumference: item.Headcircumference || "",
            bsl: item.bsl || "",
            cvs: item.cvs || "",
            cns: item.cns || "",
            rs: item.rs || "",
            pa: item.pa || "",
            logicalExam: item.le || "",
          }))
        );
      } else {
        setVitals([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to load vital data", error);
      setLoading(false);
    }
  };

  const handleInsert = () => {
    setErrors({});

    const hasVitalsData =
      bp ||
      pulse ||
      temp ||
      spo2 ||
      weight ||
      Headcircumference ||
      height ||
      rr ||
      painScore;

    if (
      !performedByData ||
      !hasVitalsData // Add this condition to check vital signs
    ) {
      const newErrors = {};

      if (!performedByData) newErrors.performedBy = "Performed By is required.";

      setErrors(newErrors);
      return;
    }

    if (selectedDate && selectedTime && hasVitalsData) {
      const dateTimeString = `${format(
        selectedDate,
        "dd-MM-yyyy"
      )} ${selectedTime}`;

      const getCurrentDateTime = (includeTime = true) => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        if (!includeTime) {
          return `${day}/${month}/${year}`;
        }

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const paddedHours = String(hours).padStart(2, "0");

        return `${day}/${month}/${year} ${paddedHours}:${minutes} ${ampm}`;
      };

      // const dateOnly = getCurrentDateTime(false);
      // console.log("Sirf date:", dateOnly);

      const currentDateTime = getCurrentDateTime(true);
      console.log("Date + Time:", currentDateTime);

      const newEntry = {
        performedBy: performedByData?.label || performedByData?.CName || "",
        performedByID: performedByData?.label || performedByData?.CID || "",
      };

      const newVitalEntry = {
        Sno: 0,
        rowid: 0,
        visitid: patientData.visitid,
        gssuhid: patientData.gssuhid,
        bedno: patientData.bedno,
        takenbyid: performedByData.CID,
        height: height || "",
        Height_1: " ",
        weight: weight || "",
        Weight_1: " ",
        bmi: bmi || "",
        BMI_1: " ",
        temp: temp || "",
        Temperature: " ",
        bp: bp || "",
        BloodPressure: " ",
        pulse: pulse || "",
        Pulse_1: "",
        rr: rr || "",
        RR_1: " ",

        Headcircumference: Headcircumference || "",

        spo2: spo2 || "",
        SpPO2: " ",
        entempid: patientData.empid,
        entdatetime: patientData.entdatetime,
        entwsname: "GSLAP2",
        modifyempid: patientData.modifyempid,
        modifydatetime: patientData.modifydatetime,
        modifywsname: "GSLAP2",
        locationid: patientData.locationid,
        IsEdit: 0,
        isopd: 0,
        Remove: " ",
        vitaldatetime: currentDateTime,
        bsl: bsl || "",
        BSL: "",
        cvs: cvs || "",
        CVS_1: " ",
        cns: cns || "",
        CNS_1: " ",
        rs: rs || "",
        RS_1: " ",
        pa: pa || "",
        PA_1: " ",
        painScore: painScore || 0,
        logicalExam: logicalExam || "",
        LE_1: " ",
        isprintonds: 0,
        PrintOnDischSumm: " ",
      };

      // Add new entry to insertedVitals
      setInsertedVitals((prev) => [...prev, newVitalEntry]);
      const updatedEntries = [...insertedVitals, newVitalEntry];
      setInsertedVitals(updatedEntries);

      // Save all data
      setSaveData((prevData) => ({
        ...prevData,
        jsonStringsubvitaldataentry: JSON.stringify(updatedEntries),
      }));

      console.log("jsonStringsubvitaldataentry:", updatedEntries);

      clearInputs();
    } else {
      alert("Please fill at least one vital ");
    }
  };

  const clearInputs = () => {
    setSelectedDate(new Date());
    setSelectedTime(getCurrentTimeHHMM());
    setBp("");
    setPulse("");
    setTemp("");
    setSpo2("");
    setWeight("");
    setHeight("");
    setRr("");
    setBmi("");
    setPainScore("");
    setHeadcircumference("");
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(
        API_ENDPOINTS.savePatVitalEntry,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveData),
        }
      );

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        setToastMessage("✅ Data saved successfully!");
        setTimeout(() => setToastMessage(""), 2000);
        // alert("Data saved successfully!");
        // Clear inserted vitals
        setInsertedVitals([]);
        setPerformedByData(null);
        setPerformedBy("");
        // Reload fresh data from API
        loadVitalData();
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    }
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

  return (
    <div className="bg-gray-50 border border-gray-300 shadow rounded-2xl p-2">
       {toastMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-6 py-3 rounded-md shadow-lg z-50 animate-slide-fade">
          {toastMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-1">
        <MainHeadings title={title} icon="🩺" />
        <div className="justify-end gap-2 flex">
          <ActionButton label="Insert" onClick={handleInsert} />
          <button
            onClick={savebtn}
            disabled={insertedVitals.length === 0}
            className={`text-xs p-2 rounded text-white ${
              insertedVitals.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Save
          </button>
        </div>
      </div>
      {showPerformedByModal && (
        <PerformedByModal
          isOpen={showPerformedByModal}
          onSelect={handleSelectPerformedBy}
          onClose={() => setShowPerformedByModal(false)}
          patientData={patientData}
          setSaveData={setSaveData}
        />
      )}

      {/* Inputs */}
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Date & Time Input */}
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          time={selectedTime}
          onTimeChange={(e) => setSelectedTime(e.target.value)}
          label="Date & Time"
        />

        {/* Performed By Input */}
        <div className="flex flex-col w-40">
          <label className="text-gray-600 text-[10px] mb-[1px]">
            Performed by *
          </label>
          <input
            id="performedBy"
            type="text"
            value={performedBy}
            readOnly
            onClick={() => setShowPerformedByModal(true)}
            className={`px-2 py-1 text-black text-xs border rounded-sm cursor-pointer bg-gray-100 hover:bg-gray-200 focus:outline-none ${
              errors.performedBy ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Select PerformedBy"
          />
          {errors.performedBy && (
            <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
              {errors.performedBy}
            </p>
          )}
        </div>

        {/* Vital Fields */}
        {[
          { placeholder: "BP", value: bp, setValue: setBp },
          { placeholder: "Pulse", value: pulse, setValue: setPulse },
          { placeholder: "Temp", value: temp, setValue: setTemp },
          { placeholder: "SPO2", value: spo2, setValue: setSpo2 },
          { placeholder: "Weight", value: weight, setValue: setWeight },
          { placeholder: "Height", value: height, setValue: setHeight },
          { placeholder: "BMI", value: bmi, setValue: setBmi },
          { placeholder: "R.R", value: rr, setValue: setRr },
          {
            placeholder: "PainScore",
            value: painScore,
            setValue: setPainScore,
          },
          {
            placeholder: "Head Circum.",
            value: Headcircumference,
            setValue: setHeadcircumference,
          },
          { placeholder: "BSL (R)", value: bsl, setValue: setBsl },
          { placeholder: "CVS", value: cvs, setValue: setCvs },
          { placeholder: "CNS", value: cns, setValue: setCns },
          { placeholder: "RS", value: rs, setValue: setRs },
          { placeholder: "P/A", value: pa, setValue: setPa },
          {
            placeholder: "Logical Exam",
            value: logicalExam,
            setValue: setLogicalExam,
          },
        ].map((input, index) => (
          <div className="flex flex-col items-start" key={index}>
            <label className="text-gray-600 text-[9px] mb-[1px]">
              {input.placeholder}
            </label>
            <input
              type="text"
              value={input.value}
              onChange={(e) => input.setValue(e.target.value || "")}
              className={`border text-black rounded w-[60px] text-[9px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500 ${
                input.value ? "border-blue-500" : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="max-h-[80px] overflow-y-auto hide-scrollbar mt-1">
        <table className="w-full table-auto text-[5px] text-start border border-collapse">
          <thead>
            <tr className="bg-white sticky top-0 z-10 text-gray-800">
              <TableReuse type="th" className="min-w-[90px]">
                Date/Time
              </TableReuse>
              <TableReuse type="th" className="min-w-[100px]">
                Nur.Services
              </TableReuse>
              <TableReuse type="th">BP</TableReuse>
              <TableReuse type="th">Pulse</TableReuse>
              <TableReuse type="th">Temp</TableReuse>
              <TableReuse type="th">SPO2</TableReuse>
              <TableReuse type="th">Weight</TableReuse>
              <TableReuse type="th">Height</TableReuse>
              <TableReuse type="th">BMI</TableReuse>
              <TableReuse type="th">R.R</TableReuse>
              <TableReuse type="th">Pain</TableReuse>
              <TableReuse type="th">Head Circum.</TableReuse>
              <TableReuse type="th">BSL (R)</TableReuse>
              <TableReuse type="th">CVS</TableReuse>
              <TableReuse type="th">CNS</TableReuse>
              <TableReuse type="th">RS</TableReuse>
              <TableReuse type="th">P/A</TableReuse>
              <TableReuse type="th">L/E</TableReuse>
              <TableReuse type="th">Action</TableReuse>
            </tr>
          </thead>
          <tbody>
            {[...insertedVitals].reverse().map((entry, idx) => {
              const actualIndex = insertedVitals.length - 1 - idx;
              return (
                <tr key={"inserted-" + idx} className="hover:bg-gray-50 ">
                  <TableReuse className="text-[8px] font-semibold">
                    {entry.vitaldatetime}
                  </TableReuse>
                  <TableReuse className="text-[8px] font-semibold">
                    {performedBy}
                  </TableReuse>
                  <TableReuse>{entry.bp}</TableReuse>
                  <TableReuse>{entry.pulse}</TableReuse>
                  <TableReuse>{entry.temp}</TableReuse>
                  <TableReuse>{entry.spo2}</TableReuse>
                  <TableReuse>{entry.weight}</TableReuse>
                  <TableReuse>{entry.height}</TableReuse>
                  <TableReuse>{entry.bmi}</TableReuse>
                  <TableReuse>{entry.rr}</TableReuse>
                  <TableReuse>{entry.painScore}</TableReuse>
                  <TableReuse>{entry.Headcircumference}</TableReuse>
                  <TableReuse>{entry.bsl}</TableReuse>
                  <TableReuse>{entry.cvs}</TableReuse>
                  <TableReuse>{entry.cns}</TableReuse>
                  <TableReuse>{entry.rs}</TableReuse>
                  <TableReuse>{entry.pa}</TableReuse>
                  <TableReuse>{entry.logicalExam}</TableReuse>
                  <TableReuse>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteEntry(actualIndex)}
                    >
                      🗑 Delete
                    </button>
                  </TableReuse>
                </tr>
              );
            })}

            {[...vitals].reverse().map((v, idx) => (
              <tr key={"api-" + idx} className="hover:bg-gray-50 ">
                <TableReuse className="text-[8px] font-semibold">
                  {v.date}
                </TableReuse>
                <TableReuse className="text-[8px] font-semibold">
                  {v.takenby}
                </TableReuse>
                <TableReuse>{v.bp}</TableReuse>
                <TableReuse>{v.pulse}</TableReuse>
                <TableReuse>{v.temp}</TableReuse>
                <TableReuse>{v.spo2}</TableReuse>
                <TableReuse>{v.weight}</TableReuse>
                <TableReuse>{v.height}</TableReuse>
                <TableReuse>{v.bmi}</TableReuse>
                <TableReuse>{v.rr}</TableReuse>
                <TableReuse>{v.painScore}</TableReuse>
                <TableReuse>{v.Headcircumference}</TableReuse>
                <TableReuse>{v.bsl}</TableReuse>
                <TableReuse>{v.cvs}</TableReuse>
                <TableReuse>{v.cns}</TableReuse>
                <TableReuse>{v.rs}</TableReuse>
                <TableReuse>{v.pa}</TableReuse>
                <TableReuse>{v.logicalExam}</TableReuse>
                <TableReuse>
                  <button></button>
                </TableReuse>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
