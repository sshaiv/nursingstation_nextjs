

"use client";
import React, { useState } from "react";
import { ModalHeading } from "../../common/text";
import Adult from "./Adult";
import Pediatrics from "./Pediatrics";
import ObsMedicine from "./ObsMedicine";

// Replace these with your actual components
const AdultMedicine = () => <div>Adult Medicine Content</div>;
const PediatricMedicine = () => <div>Pediatric Medicine Content</div>;
const obsMedicine = () => <div>obs Medicine Content</div>;

const InitialAssessmentForm = ({ visitid, gssuhid, empid, patientData }) => {
  const [activeTab, setActiveTab] = useState("adult");

  const tabData = [
    { name: "adult", label: "ADULT", emoji: " " },
    { name: "pediatric", label: "PEDIATRICS", emoji: "" },
    { name: "obs", label: "OBST. & GYNAECOLOGY", emoji: " " },
  ];


    return (
    <div className="p-2 bg-purple-50 min-h-screen flex justify-center text-[10px] leading-tight overflow-hidden"
>
      <div className="w-full  max-w-3xl mx-auto space-y-4 ">
        <div className="flex h-[1px]  items-center justify-center">
          <ModalHeading
            title="Initial Assessment"
            className="text-[11px] mb-3"
          />
        </div>
        <hr className="border-t border-gray-300 mb-0" />

   {/* Tab bar */}
<div className="flex justify-center rounded-md p-2">
  <ul className="flex w-full text-sm font-semibold text-gray-700 dark:text-gray-800">
    {tabData.map(({ name, label, emoji }) => {
      const isActive = activeTab === name;
      return (
        <li key={name} className="flex-1">
          <button
            type="button"
            onClick={() => setActiveTab(name)}
            className={`w-full flex items-center justify-center gap-1 px-3 py-2 border-b-2 ${
              isActive
                ? "border-blue-800 text-blue-800 font-bold"
                : "border-transparent hover:text-blue-500"
            } transition-colors duration-150`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        </li>
      );
    })}
  </ul>
</div>




      {/* Content */}
      <div className=" p-0">
        {activeTab === "adult" && (
          <Adult
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        )}
        {activeTab === "pediatric" && (
          <Pediatrics
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        )}
        {activeTab === "obs" && (
          <ObsMedicine
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        )}
      </div>
       
      </div>
    </div>
  );
};

export default InitialAssessmentForm;
