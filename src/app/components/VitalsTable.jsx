

"use client";
import { useState, useEffect } from "react";
import { ActionButton } from "../common/Buttons";
import { MainHeadings } from "../common/text";
import { format } from "date-fns";
import TableReuse from "../common/TableReuse";
import DateTimeInput from "../common/DateTimeInput";

export default function VitalsTable({ title, visitid, gssuhid, empid, patientData }) {
 
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

  // Generate time options with both value (HH:mm) and label (e.g. 8:00 AM)
  const timeOptions = Array.from({ length: 24 }, (_, index) => {
    const hour = (index + 8) % 24;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour < 12 ? "AM" : "PM";

    const value = hour.toString().padStart(2, "0") + ":00";
    const label = `${displayHour}:00 ${period}`;

    return { value, label };
  });

  useEffect(() => {
    loadVitalData();
    // No resetting selectedTime here
  }, []);

  useEffect(() => {
    if (visitid) {
      loadVitalData();
      // No resetting selectedTime here either
    }
  }, [visitid]);

  const loadVitalData = async () => {
    if (!visitid) {
      console.warn("No visitid provided, skipping loadVitalData");
      return;
    }
    try {
      const response = await fetch(
        `https://doctorapi.medonext.com/API/HMS/GetPatVitalData?visitid=${visitid}`
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
            bp: item.BP,
            pulse: item.pulse,
            temp: item.temp,
            spo2: item.spo2,
            weight: item.weight || "N/A",
            height: item.height || "N/A",
            bmi: item.bmi || "N/A",
            rr: item.RR || "N/A",
            painScore: item.painscore?.toString() || "N/A",
          }))
        );
      } else {
        setVitals([]);
      }
    } catch (error) {
      console.error("Failed to load vital data", error);
    }
  };

  const handleSave = () => {
    if (
      selectedDate ||
      selectedTime ||
      bp ||
      pulse ||
      temp ||
      spo2 ||
      weight ||
      height ||
      rr ||
      painScore
    ) {
      const dateTimeString = `${format(selectedDate, "dd-MM-yyyy")} ${selectedTime}`;

      setVitals((prev) => [
        ...prev,
        {
          date: dateTimeString,
          bp: bp || "N/A",
          pulse: pulse || "N/A",
          temp: temp || "N/A",
          spo2: spo2 || "N/A",
          weight: weight || "N/A",
         height : height || "N/A",
         bmi : bmi || "N/A",
          rr: rr || "N/A",
          painScore: painScore || "N/A",
        },
      ]);
      clearInputs();
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
    setPainScore("");
  };

  return (
    <div className="bg-gray-50 border border-gray-300 shadow rounded-2xl p-2">
      <div className="flex justify-between items-center mb-1">
        <MainHeadings title={title} icon="🩺" />
        <ActionButton label="Insert" onClick={handleSave} />
      </div>

      {/* Inputs */}
      <div className="flex items-end flex-wrap gap-2">
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          time={selectedTime}
          onTimeChange={(e) => setSelectedTime(e.target.value)}
          label=" Date & Time"
        />

        {[
          { placeholder: "BP", value: bp, setValue: setBp },
          { placeholder: "Pulse", value: pulse, setValue: setPulse },
          { placeholder: "Temp", value: temp, setValue: setTemp },
          { placeholder: "SPO2", value: spo2, setValue: setSpo2 },
          { placeholder: "Weight", value: weight, setValue: setWeight },
          { placeholder: "Height", value: height, setValue: setHeight },
           { placeholder: "BMI", value: bmi, setValue: setBmi },
          { placeholder: "R.R", value: rr, setValue: setRr },
          { placeholder: "PainScore", value: painScore, setValue: setPainScore },
         
        ].map((input, index) => (
          <div className="flex flex-col items-start" key={index}>
            <label className="text-gray-600 text-[9px] mb-[1px]">{input.placeholder}</label>
            <input
              type="text"
              value={input.value}
              onChange={(e) => input.setValue(e.target.value)}
              className={`border rounded w-[34px] text-[9px] h-[18px] px-[2px] py-[1px] focus:outline-none focus:border-blue-500 ${
                input.value ? "border-blue-500" : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="max-h-[80px] overflow-y-scroll hide-scrollbar mt-2">
        <table className="w-full table-auto text-[9px] text-center border">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <TableReuse type="th">Date/Time</TableReuse>
              <TableReuse type="th">BP</TableReuse>
              <TableReuse type="th">Pulse</TableReuse>
              <TableReuse type="th">Temp</TableReuse>
              <TableReuse type="th">SPO2</TableReuse>
              <TableReuse type="th">Weight</TableReuse>
              <TableReuse type="th">Height</TableReuse>
              <TableReuse type="th">BMI</TableReuse>
              <TableReuse type="th">R.R</TableReuse>
              <TableReuse type="th">Pain Score</TableReuse>
            </tr>
          </thead>
          <tbody>
            {vitals.map((v, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <TableReuse>{v.date}</TableReuse>
                <TableReuse>{v.bp}</TableReuse>
                <TableReuse>{v.pulse}</TableReuse>
                <TableReuse>{v.temp}</TableReuse>
                <TableReuse>{v.spo2}</TableReuse>
                <TableReuse>{v.weight}</TableReuse>
                <TableReuse>{v.height}</TableReuse>
                <TableReuse>{v.bmi}</TableReuse>
                <TableReuse>{v.rr}</TableReuse>
                <TableReuse>{v.painScore}</TableReuse>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
