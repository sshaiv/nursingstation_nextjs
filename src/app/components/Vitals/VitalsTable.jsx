"use client";
import { useState, useEffect, use } from "react";
import { ActionButton } from "../../common/Buttons";
import { MainHeadings } from "../../common/text";
import { format } from "date-fns";
import TableReuse from "../../common/TableReuse";
import DateTimeInput from "../../common/DateTimeInput";
import useSaveVitalData from "../../hooks/useSaveVitalData";
import API_ENDPOINTS from "../../constants/api_url";
import NursingServiceModal from "../NursingServiceModal";
import PerformedByModal from "../../common/Modal/PerformedByModal";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";
import { toast } from "react-toastify";

export default function VitalsTable({
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

  // console.log("update vital", saveData);

  // Array to keep inserted entries only
  const [insertedVitals, setInsertedVitals] = useState([]);

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
      console.warn("No visitid provided, cannot load vital data.");
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

      // console.log("Parsed Vital Data:", data);

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

    if (!performedByData && !hasVitalsData) {
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

      const currentDateTime = getCurrentDateTime(true);
     

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
      toast.warning("Please fill at least one vital");
    }
  };

  const clearInputs = () => {
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
    // No resetting date/time here!
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
        toast.success(" Data saved successfully!");

        // Clear inserted vitals
        setInsertedVitals([]);
        setPerformedByData(null);
        setPerformedBy("");
        // Reload fresh data from API
        loadVitalData();
      } else {
        toast.error("❌ Failed to save data: ");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("❌ An error occurred while saving data: ");
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

  useEffect(() => {
    if (selectedDate || selectedTime) {
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);
    }
  }, [selectedDate, selectedTime]);

  useKeyboardScrollFix();

  return (
    <div className=" border border-gray-300 shadow p-2">
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
                : "bg-blue-600 hover:bg-blue-400"
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

        {/* Performed By Input */}
        <div className="flex flex-col w-40">
          <label className="text-gray-500 font-semibold text-[12px] mb-[1px]">
            Performed by *
          </label>
          <input
            id="performedBy"
            type="text"
            value={performedBy}
            readOnly
            onClick={() => setShowPerformedByModal(true)}
            className={`px-2 py-1 text-black text-xs border rounded-sm cursor-pointer bg-gray-100 hover:bg-gray-300 focus:outline-none ${
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
            <label className="text-gray-500 font-semibold text-[11px] mb-[1px]">
              {input.placeholder}
            </label>
            <input
              type={input.placeholder === "BP" ? "text" : "number"}
              value={input.value}
              onChange={(e) => input.setValue(e.target.value || "")}
              className={`border text-black rounded w-[75px] text-[9px] h-[25px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500 ${
                input.value ? "border-blue-500" : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="max-h-[100px] border-gray-400 border-1 overflow-y-auto hide-scrollbar mt-1">
        <table className="w-full table-auto text-start border border-collapse text-2xl">
          <thead>
            <tr className="bg-white sticky top-0 z-10 text-gray-800">
              <th className="min-w-[90px] font-semibold text-xs border p-1 bg-gray-300">
                Date/Time
              </th>
              <th className="min-w-[100px] font-semibold text-xs border p-1 bg-gray-300">
                Nur.Services
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                BP
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Pulse
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Temp
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                SPO2
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Weight
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Height
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                BMI
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                R.R
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Pain
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Head Circum.
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                BSL (R)
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                CVS
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                CNS
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                RS
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                P/A
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                L/E
              </th>
              <th className="font-semibold text-xs border p-1 bg-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {[...insertedVitals].reverse().map((entry, idx) => {
              const actualIndex = insertedVitals.length - 1 - idx;
              return (
                <tr
                  key={"inserted-" + idx}
                  className="hover:bg-gray-50 text-xs text-black"
                >
                  <td className="p-1  bg-blue-100 ">{entry.vitaldatetime}</td>
                  <td className="p-1 bg-blue-100">{performedBy}</td>
                  <td className="p-1 bg-blue-100">{entry.bp}</td>
                  <td className="p-1 bg-blue-100">{entry.pulse}</td>
                  <td className="p-1 bg-blue-100">{entry.temp}</td>
                  <td className="p-1 bg-blue-100">{entry.spo2}</td>
                  <td className="p-1 bg-blue-100">{entry.weight}</td>
                  <td className="p-1 bg-blue-100">{entry.height}</td>
                  <td className="p-1 bg-blue-100">{entry.bmi}</td>
                  <td className="p-1 bg-blue-100">{entry.rr}</td>
                  <td className="p-1 bg-blue-100">{entry.painScore}</td>
                  <td className="p-1 bg-blue-100">{entry.Headcircumference}</td>
                  <td className="p-1 bg-blue-100">{entry.bsl}</td>
                  <td className="p-1 bg-blue-100">{entry.cvs}</td>
                  <td className="p-1 bg-blue-100">{entry.cns}</td>
                  <td className="p-1 bg-blue-100">{entry.rs}</td>
                  <td className="p-1 bg-blue-100">{entry.pa}</td>
                  <td className="p-1 bg-blue-100">{entry.logicalExam}</td>
                  <td className="p-1 bg-blue-100">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteEntry(actualIndex)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {[...vitals].reverse().map((v, idx) => (
              <tr
                key={"api-" + idx}
                className="hover:bg-gray-100 text-black text-xs border"
              >
                <td className="p-1  border ">{v.date}</td>
                <td className="p-1 border">{v.takenby}</td>
                <td className="p-1 border">{v.bp}</td>
                <td className="p-1 border">{v.pulse}</td>
                <td className="p-1 border">{v.temp}</td>
                <td className="p-1 border">{v.spo2}</td>
                <td className="p-1 border">{v.weight}</td>
                <td className="p-1 border">{v.height}</td>
                <td className="p-1 border">{v.bmi}</td>
                <td className="p-1 border">{v.rr}</td>
                <td className="p-1 border">{v.painScore}</td>
                <td className="p-1 border">{v.Headcircumference}</td>
                <td className="p-1 border">{v.bsl}</td>
                <td className="p-1 border">{v.cvs}</td>
                <td className="p-1 border">{v.cns}</td>
                <td className="p-1 border">{v.rs}</td>
                <td className="p-1 border">{v.pa}</td>
                <td className="p-1 border">{v.logicalExam}</td>
                <td className="p-1 border">
                  <button></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
