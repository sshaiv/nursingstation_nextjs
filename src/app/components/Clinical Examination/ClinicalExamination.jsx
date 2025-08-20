"use client";
import React from "react";
import { ModalHeading } from "../../common/text";
import StartPage from "./StartPage";
import PresentMedication from "./PresentMedication";
import Tabs from "@/app/common/TabView";


const ClinicalExamination = ({ visitid, gssuhid, empid, patientData }) => {
  const tabData = [
    {
      name: "first",
      label: "⬩ Clinical Examination",
      emoji: "🩺",
      content: (
        <StartPage
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "second",
      label: "⬩ Present Ongoing Medication",
      emoji: "💊",
      content: (
        <PresentMedication
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
  ];

  return (
     <div className="p-2 min-h-screen flex flex-col items-center text-[10px] leading-tight overflow-y-auto">

    {/* <div className="p-2 min-h-screen flex flex-col items-center text-[10px] leading-tight overflow-hidden"> */}
      <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex h-[1px] items-center justify-center">
           <ModalHeading
             title="Clinical Examination"
             className="text-[11px] mb-3"
           />
         </div>
         <hr className="border-t border-gray-300 mb-0" />

        <Tabs tabs={tabData} initialTab="first" />
      </div>
    </div>
  );
};

export default ClinicalExamination;
