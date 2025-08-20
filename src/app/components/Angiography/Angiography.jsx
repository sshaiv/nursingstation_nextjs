import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { ModalHeading } from "@/app/common/text";
import { useState } from "react";
import Select from "react-select";
import CoronaryAngiography from "./CoronaryAngiography";

export default function Angiography() {
  const [form, setForm] = useState({
    procedure: "",
    date: "",
    time: "",
    consultant: "",
    investigations: {
      bloodGroup: "",
      cbc: "",
      bloodSugar: "",
      sCreatinine: "",
      ecg: "",
      echo: "",
      serumK: "",
      hbsag: "",
      hiv: "",
      xrayChest: "",
    },
  });

  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const consultants = [
    "— Select —",
    "Dr. A Sharma",
    "Dr. B Singh",
    "Dr. C Patel",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.investigations) {
      setForm((p) => ({
        ...p,
        investigations: { ...p.investigations, [name]: value },
      }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ModalHeading title="Angiography" className="text-[11px]" />
      <div className="text-sm font-semibold  mt-2 font-serif text-gray-700">
        ● Pre-Catheterisation Checklist &amp; Orders
      </div>
      {/* rectangle box: procedure/date/time/consultant */}
      <div className="mt-3 rounded-2xl border bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Procedure */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-gray-600">Procedure</label>
            <input
              type="text"
              name="procedure"
              value={form.procedure}
              onChange={handleChange}
              placeholder="e.g., Coronary Angiography"
              className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* On Date */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-gray-600">On Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* At Time */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-gray-600">At Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Consultant */}
          <div className="-mt-2">
            <label className="text-[11px] text-gray-600">Consultant</label>
            <Select
              options={consultants.map((c) => ({
                value: c === "— Select —" ? "" : c,
                label: c,
              }))}
              onChange={(option) => setSelectedConsultant(option)}
              placeholder="Select Consultant"
              className="w-full text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  fontSize: 14,
                  borderRadius: "0.50rem",
                  borderColor: "#d1d5db",
                  boxShadow: "none",
                  minHeight: "30px",
                  "&:hover": { borderColor: "#6366f1" },
                }),
                menu: (base) => ({ ...base, fontSize: 14, zIndex: 50 }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  fontSize: 14,
                  padding: "8px 12px",
                  backgroundColor: isSelected
                    ? "#4f46e5"
                    : isFocused
                    ? "#e0e7ff"
                    : "white",
                  color: isSelected ? "white" : "#374151",
                  cursor: "pointer",
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: "200px",
                  overflowY: "auto",
                }),
              }}
            />
          </div>
        </div>
      </div>

      {/* investigations fieldset */}
      <div className="text-sm font-semibold  mt-4 font-serif text-gray-700">
        ● Investigations
      </div>
      <div className="mt-3 rounded-2xl border bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            { label: "Blood Group", name: "bloodGroup" },
            { label: "CBC", name: "cbc" },
            { label: "Blood Sugar", name: "bloodSugar" },
            { label: "S. Creatinine", name: "sCreatinine" },
            { label: "ECG", name: "ecg" },
            { label: "ECHO", name: "echo" },
            { label: "Serum K+", name: "serumK" },
            { label: "HBsAg", name: "hbsag" },
            { label: "HIV", name: "hiv" },
            { label: "X-Ray Chest", name: "xrayChest" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-600">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={form.investigations[field.name]}
                onChange={handleChange}
                className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Cath Orders */}
      <div className="text-sm font-semibold  mt-4 font-serif text-gray-700">
        ● Pre Cath Orders
      </div>
      <div className="mt-3 rounded-2xl border bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "NBM From",
            "Prepare both groins and axillae",
            "Consent",
            "IV line (with heparin lock) in Rt. hand",
            "Antibiotic (Inj.)",
            "IV Inj. Hydrocortisone (100mg) At",
            "Xylocaine Sensitivity done in ® or Ⓛ Forearm",
            "Others",
          ].map((label, idx) => (
            <div key={idx}>
              <label className="text-[11px] text-gray-600">{label}</label>
              <input
                type="text"
                className="w-full border rounded-md p-1 text-xs h-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Signatures Section */}
      <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
        <div>
          <DigitalSignatureSection title="Signature of Nurse :" />
          <div className="flex gap-2 w-full">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
        </div>
        <div>
          <DigitalSignatureSection title="Signature of R.M.O." />
          <div className="flex gap-2 w-full">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mt-2">
            <label className="flex-shrink-0"> Time :</label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Clinical Monitoring */}
      <div className="text-sm font-semibold mt-4 font-serif text-gray-700">
        ● Clinical Monitoring
      </div>

      <div className="space-y-4 mt-3 rounded-2xl border bg-white p-3 shadow-sm">
        {/* Intra Procedure */}
        <div>
          <div className="mt-2 flex items-start space-x-4">
            {/* Label */}
            <label className="text-xs text-gray-600 font-medium flex-shrink-0">
              1. Intra Procedure
            </label>

            {/* Pulse, BP, SpO2 inputs */}
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">Pulse</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">BP</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">SpO₂</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>

          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>

        {/* Post Procedure */}
        <div>
          <div className="mt-2 flex items-start space-x-4">
            {/* Label */}
            <label className="text-xs text-gray-600 font-medium flex-shrink-0">
              2. Post Procedure
            </label>

            {/* Pulse, BP, SpO2 inputs */}
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">Pulse</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">BP</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                <label className="text-xs text-gray-500">SpO₂</label>
                <input
                  type="text"
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Clinical Monitoring */}
      <div className="text-sm font-semibold mt-4 font-serif text-gray-700">
        ● Post Cath Instructions
      </div>
      <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1">
        <li>
          Check distal Pulse, B.P. and Bleeding at local site every ½ hour.
        </li>
        <li>Bed rest. Do not move the Right / Left lower limb for 6 hours.</li>
        <li>Plenty of oral fluids.</li>
        <li>In case of abnormality, inform duty doctor immediately.</li>
      </ol>

      <div className="mt-2">
      <div className="text-sm font-semibold mt-4 font-serif text-gray-700">
        ●  Post Cath Treatment (Drugs)
      </div>
        <textarea
          className="w-full h-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>


       {/* Signatures Section */}
       <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
       <div>
          <DigitalSignatureSection title="Signature of Interventional Cardiologist" />
          <div className="flex gap-2 w-full">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mt-2">
            <label className="flex-shrink-0"> Time :</label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setTime(e.target.value)}
            />
          </div>
      
        </div>
      </div>


<CoronaryAngiography />
    </div>
  );
}
