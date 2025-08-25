import { useState } from "react";

export default function Investigations() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Put all labels + field names in one place
  const fields = [
    {
      name: "cbc",
      label: "CBC",
    },
    { name: "hb", label: "Hb" },
    { name: "td", label: " T & D" },
    { name: "esr", label: "ESR" },
    { name: "platelets", label: "Platelets" },
    { name: "bloodGroup", label: "Blood Group" },
    { name: "bloodUrea", label: "Blood Urea" },
    { name: "serumCreatinine", label: "Serum Creatinine" },
    { name: "serumBilirubin", label: "Serum Bilirubin" },
    { name: "sgot", label: "SGOT" },
    { name: "sgpt", label: "SGPT" },
    { name: "serumProteins", label: "Serum Proteins" },
    { name: "serumElectrolytes", label: "Serum Electrolytes" },
    { name: "rbs", label: "RBS" },
    { name: "hiv", label: "HIV" },
    { name: "hbsag", label: "HBsAg" },
    { name: "btCtPtInr", label: "BT / CT / PT, INR" },
    { name: "chestXray", label: "Chest X-Ray P/A View" },
    { name: "ecg", label: "ECG" },
    { name: "urineRm", label: "Urine R/M" },
    { name: "bloodUnits", label: "No. of Blood Units Ready" },
    { name: "others", label: "Others" },
  ];

  return (
    <div className="">
      <div className="max-w-6xl mx-auto  p-8">
        {/* Heading */}
        <div className="text-sm font-semibold mt-2 font-serif text-gray-700">
          ● Investigations (Mention Date, when done)
        </div>

        {/*  */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col border rounded-md p-2 bg-white shadow-sm"
            >
              <label className="text-xs font-medium text-neutral-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                onChange={handleChange}
                className="rounded-md border border-neutral-300 p-2 text-sm focus:ring-2 focus:ring-neutral-400"
                placeholder={field.placeholder || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
