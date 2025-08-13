"use client";
import React, { useState } from "react";
import { MainHeadings, ModalHeading } from "../../common/text";

import Tabs from "@/app/common/TabView";
import MorningShift from "./MorningShift";
import EveningShift from "./EveningShift";
import NightShift from "./NightShift";



const NursingReassessment = ({ visitid, gssuhid, empid, patientData }) => {
   const tabData = [
    {
      name: "first",
      label: "Morning Shift",
      emoji: "",
      content: (
        <MorningShift
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "second",
      label: "Evening Shift",
      emoji: "",
      content: (
        <EveningShift
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "third",
      label: "Night Shift",
      emoji: "",
      content: (
        <NightShift
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
       <div className="flex h-[1px] items-center justify-center">
            <ModalHeading
              title="Nursing ReAssessment"
              className="text-[11px] mb-3"
            />
          </div>
          <hr className="border-t border-gray-300 mb-0" />

        <Tabs tabs={tabData} initialTab="first" />
      </div>
    </div>
  );
};

export default NursingReassessment;
