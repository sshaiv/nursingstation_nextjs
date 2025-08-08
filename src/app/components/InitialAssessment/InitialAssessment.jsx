"use client";
import React, { useState } from "react";
import { ModalHeading } from "../../common/text";
import Adult from "./Adult";
import Pediatrics from "./Pediatrics";
import ObsMedicine from "./ObsMedicine";
import Tabs from "@/app/common/TabView";



const InitialAssessmentForm = ({ visitid, gssuhid, empid, patientData }) => {
   const tabData = [
    {
      name: "first",
      label: "Adult",
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
      label: "Pediatrics",
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
      label: "ObsMedicine",
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
 <div className="p-2 min-h-screen flex flex-col items-center text-[10px] leading-tight overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-4">
 

        <Tabs tabs={tabData} initialTab="first" />
      </div>
    </div>
  );
};

export default InitialAssessmentForm;
