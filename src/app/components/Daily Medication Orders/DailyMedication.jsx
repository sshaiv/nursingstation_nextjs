"use client";
import React, { useState } from "react";
import { ModalHeading } from "../../common/text";

import Tabs from "@/app/common/TabView";
import MedicineIndent from "../MedicineIndent";
import IvFluids from "./IvFluids";
import OtherMedication from "./OtherMedication";
import SOSMedication from "./SOSMedication";
import InvasiveLinesTubes from "./InvasiveLinesTubes";
import DailyAssessment from "./DailyNutritional";


const DailyMedication = ({ visitid, gssuhid, empid, patientData }) => {
  const tabData = [
    {
      name: "first",
      label: "IV Fluids , IV Antibiotics , SC INJ. etc",
      emoji: "",
      content: (
        <IvFluids
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      ),
    },
    {
      name: "second",
      label:
        "Other Medication (Oral , S/L , Nebulization , Rectal , Patches ,etc)",
      emoji: "",
        content: (
          <OtherMedication
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        ),
    },
    {
      name: "third",
      label: "SOS & STAT Medication",
      emoji: "",
        content: (
          <SOSMedication
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        ),
    },
    {
      name: "fourth",
      label: "Investigations & Advice",
      emoji: "",
        content: (
          <InvasiveLinesTubes
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        ),
    },
    {
      name: "fifth",
      label: "Daily Nutritional Assessment",
      emoji: "",
        content: (
          <DailyAssessment
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
            title=" Daily  Medication Ordes (ward)"
            className="text-[11px] mb-3"
          />
        </div>
        <hr className="border-t border-gray-300 mb-0" />

        <Tabs tabs={tabData} initialTab="first" />
      </div>
    </div>
  );
};

export default DailyMedication;
