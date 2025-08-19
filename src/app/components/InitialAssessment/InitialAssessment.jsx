"use client";
import React, { useState } from "react";
import { ModalHeading } from "../../common/text";
import Adult from "./Adult";
import Pediatrics from "./Pediatrics";
import ObsMedicine from "./ObsMedicine";
import Tabs from "@/app/common/TabView";
import ClinicalExamination from "../Clinical Examination/ClinicalExamination";



const InitialAssessmentForm = ({ visitid, gssuhid, empid, patientData }) => {
   const tabData = [
    {
      name: "first",
      label: "⬩ Adult",
      emoji: "",
      content: (
        <Adult
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "second",
      label: "⬩ Pediatrics",
      emoji: "",
      content: (
        <Pediatrics
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "third",
      label: "⬩ ObsMedicine",
      emoji: "",
      content: (
        <ObsMedicine
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
             title=" Initial Assessment"
             className="text-[11px] mb-3"
           />
         </div>
         <hr className="border-t border-gray-300 mb-0" />

        <Tabs tabs={tabData} initialTab="first" />
          <hr className="border-t border-gray-300 mb-0" />

         <div className="mt-6"> 
           <ClinicalExamination
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
        /></div>
      </div>
    </div>
    
  );
};

export default InitialAssessmentForm;
