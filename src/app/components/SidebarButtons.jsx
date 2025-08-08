"use client";
import React, { useState } from "react";
import {
  FiActivity,
  FiBox,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiHeart,
  FiHome,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";
import { GiScissors, GiFizzingFlask } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import InitialAssessmentForm from "./InitialAssessment/InitialAssessment";
import ClinicalExamination from "./Clinical Examination/ClinicalExamination";
import NursingServices from "./NursingServices";
import Consumables from "./Consumables";
import DoctorVisit from "./DoctorVisit";
import AdvisedSurgery from "./AdvisedSurgery";
import Implants from "./Implants";
import Investigation from "./Investigation";
import NutritionalAssessmentProfile from "./NutritionalAssesmentProfile";
import ProgressSheet from "./ProgressSheet";
import DummyInvestigation from "./DummyInvestigation";
import NutritionalInitial from "./Nursing Initial Assessment/NutritionalInitial";
import CloseButton from "../common/CrossButton";

const buttons = [
  {
    label: "INITIAL ASSESSMENT",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiFileText,
  },
  {
    label: "CLINICAL EXAMINATION",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiClipboard,
  },
  {
    label: "NUTRITIONAL ASSESSMENT",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiHeart,
  },
  {
    label: "INVESTIGATION SUMMARY",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiFileText,
  },
  {
    label: "NURSING INITIAL ASSESSMENT",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiClipboard,
  },

  {
    label: "PROGRESS SHEET",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiCheckCircle,
  },
  {
    label: "DAILY  MEDICATION SHEET",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiCheckCircle,
  },
  {
    label: "CLINICAL CHART",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiCheckCircle,
  },
  {
    label: "INTAKE OUTPUT CHART",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiCheckCircle,
  },
  {
    label: "Nursing Services",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiActivity,
  },
  { label: "Consumables", color: "#1999A1", shadow: "#14767D", icon: FiBox },
  {
    label: "Doctor Visit",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FiCalendar,
  },

  {
    label: "NurRe Assessment",
    color: "#1999A1",
    shadow: "#14767D",
    icon: FaStethoscope,
  },
  {
    label: "Advice Surgery",
    color: "#1999A1",
    shadow: "#14767D",
    icon: GiScissors,
  },
  { label: "Implant", color: "#1999A1", shadow: "#14767D", icon: FiPackage },
  // { label: "Discharge Summary", color: "#1999A1", shadow: "#14767D", icon: FiCheckCircle },
  //{ label: "BugInvestigation", color: "#1999A1", shadow: "#14767D", icon: GiFizzingFlask },
  {
    label: "Investigation",
    color: "#1999A1",
    shadow: "#14767D",
    icon: GiFizzingFlask,
  },
];

export default function ButtonGrid({ visitid, gssuhid, empid, patientData }) {
  // console.log("btn m",patientData.Age);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);

  const handleButtonClick = (label) => {
    setActiveLabel(label);
    if (label === "INITIAL ASSESSMENT") {
      setModalContent(
        <InitialAssessmentForm
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
        />
      );
      setShowModal(true);
    } else if (label === "CLINICAL EXAMINATION") {
      setModalContent(
        <ClinicalExamination
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
        />
      );
      setShowModal(true);
    } else if (label === "Nursing Services") {
      setModalContent(
        <NursingServices
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "Consumables") {
      setModalContent(
        <Consumables
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "Doctor Visit") {
      setModalContent(
        <DoctorVisit
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    }
    // else if (label === "Advice Surgery") {
    //     setModalContent(<AdvisedSurgery visitid={visitid} gssuhid={gssuhid} empid={empid} />);
    //     setShowModal(true);
    // }
    // else if (label === "Implant") {
    //     setModalContent(<Implants visitid={visitid} gssuhid={gssuhid} empid={empid} />);
    //     setShowModal(true);
    // }
    // else if (label === "InvestigationBug") {
    //     setModalContent(<Investigation visitid={visitid} gssuhid={gssuhid} empid={empid} patientData={patientData}/>);
    //     setShowModal(true);
    // }
    else if (label === "Investigation") {
      setModalContent(
        <DummyInvestigation
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "NUTRITIONAL ASSESSMENT") {
      setModalContent(
        <NutritionalAssessmentProfile
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "NURSING INITIAL ASSESSMENT") {
      setModalContent(
        <NutritionalInitial
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "PROGRESS SHEET") {
      setModalContent(
        <ProgressSheet
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "xyz") {
      setModalContent(<div>Placeholder for Doctor Visit</div>);
      setShowModal(true);
    } else {
      // handle other buttons if needed
    }
  };

  const closeModal = ({onClick}) => setShowModal(false);

  return (
    <div>
      <div className="w-full flex flex-wrap justify-center gap-3 px-2">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="rounded-md p-1 flex items-center gap-1 text-white shadow-md cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundColor: button.color,
              boxShadow: `0 4px 6px ${button.shadow}`,
            }}
            onClick={() => handleButtonClick(button.label)}
          >
            <button.icon className="text-lg" />
            <span className="text-sm">{button.label}</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop- flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative shadow-2xl border flex flex-col overflow-hidden">
<CloseButton onClick={closeModal} />


            {/* Scrollable Content Area with hidden scrollbar */}
            <div
              className={`mt-4 ${
                activeLabel !== "INITIAL ASSESSMENT" &&
                activeLabel !== "CLINICAL EXAMINATION"
                  ? "overflow-y-auto"
                  : ""
              } pr-2 flex-grow scrollbar-hide`}
            >
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
