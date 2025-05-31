"use client";
import React, { useState } from "react";
import CurrentMedicines from "./CurrentMedicines";
import PrescribedMedicine from "./PrescribedMedicine";
import MedicineIndent from "./MedicineIndent";

const MedicineTable = ({ visitid, gssuhid, empid ,patientData}) => {
  const [activeTab, setActiveTab] = useState("prescribed");

  const tabData = [
    { name: "prescribed", label: "Prescribed", emoji: "💊" },
    { name: "current", label: "Current", emoji: "📋" },
    { name: "medicineindent", label: "MedicineIndent", emoji: "💉" },
    { name: "iv", label: "IV Fluids", emoji: "🧪" },
    { name: "sos", label: "SOS", emoji: "❗" },
    { name: "invasive", label: "Invasive", emoji: "💉" },
  ];

  return (
    <div className="max-w-full mx-auto">
      {/* Fancy tab bar */}
      <div className="     bg-gray-100 justify-between shadow-xl rounded-lg">
        <ul className="flex text-xs font-medium text-gray-800 dark:text-gray-400 space-x-1 overflow-x-auto no-scrollbar py-1">
          {tabData.map(({ name, label, emoji }) => {
            const isActive = activeTab === name;
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setActiveTab(name)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
                    isActive
                      ? "bg-white dark:bg-gray-800 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "bg-gray-300 dark:bg-gray-700 border-transparent hover:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                  } transition-all duration-200 whitespace-nowrap`}
                >
                  <span className="text-sm">{emoji}</span>
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Content area */}
      <div className=" border border-gray-300 bg-white rounded-b-md dark:border-gray-300 dark:bg-gray-300 text-sm">
        {activeTab === "prescribed" && <PrescribedMedicine />}
        {activeTab === "current" && <CurrentMedicines />}
        {activeTab === "medicineindent" && 
        <MedicineIndent
         visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
             />}
        {["iv", "sos", "invasive"].includes(activeTab) && <PrescribedMedicine />}
      </div>
    </div>
  );
};

export default MedicineTable;
