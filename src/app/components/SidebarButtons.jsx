"use client";
import { useState } from "react";
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

import DoctorVisit from "./DoctorVisit";
import AdvisedSurgery from "./AdvisedSurgery";
import Implants from "./Implants";
import Investigation from "./Investigation";

import ProgressSheet from "./ProgressSheet";

import NutritionalInitial from "./Nursing Initial Assessment/NutritionalInitial";
import CloseButton from "../common/CrossButton";
import NutritionalAssessmentProfile from "./Nutritional Assesment Profile/NutritionalAssesmentProfile";
import Consumables from "./Consumables/Consumables";
import DummyInvestigation from "./Investigation/DummyInvestigation";
import NursingReassessment from "./Nursing Reassessment/NursingReassessment";
import PythonPractice from "./pythonpractice";

const buttons = [
  {
    label: "INITIAL ASSESSMENT",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiFileText,
  },
  {
    label: "CLINICAL EXAMINATION",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiClipboard,
  },
  {
    label: "NUTRITIONAL ASSESSMENT  PROFILE",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiHeart,
  },
  {
    label: "INVESTIGATION SUMMARY",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiFileText,
  },
  {
    label: "NURSING INITIAL ASSESSMENT",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiClipboard,
  },

  {
    label: "PROGRESS SHEET",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiCheckCircle,
  },
  {
    label: "DAILY  MEDICATION SHEET",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiCheckCircle,
  },
  {
    label: "CLINICAL CHART",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiCheckCircle,
  },
  {
    label: "INTAKE OUTPUT CHART",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiCheckCircle,
  },
  {
    label: "NURSING SERVICES",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiActivity,
  },
  {
     label: "CONSUMABLES", 
    color: "#00809D", 
    shadow: "#89A8B2", 
    icon: FiBox 
  },
  {
    label: "DOCTOR VISIT",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FiCalendar,
  },

  {
    label: "NURSING REASSESSMENT",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: FaStethoscope,
  },
  {
    label: "ADVICE SURGERY",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: GiScissors,
  },
  { label: "IMPLANT", color: "#00809D", shadow: "#89A8B2", icon: FiPackage },
  // { label: "Discharge Summary", color: "#1999A1", shadow: "#14767D", icon: FiCheckCircle },
  //{ label: "BugInvestigation", color: "#1999A1", shadow: "#14767D", icon: GiFizzingFlask },
  {
    label: "INVESTIGATION",
    color: "#00809D",
    shadow: "#89A8B2",
    icon: GiFizzingFlask,
  },
  {
    label: "-",
    color: "#00809D",
    shadow: "#89A8B2",
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
    }
     else if (label === "CLINICAL EXAMINATION") {
      setModalContent(
        <ClinicalExamination
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
        />
      );
      setShowModal(true);
    } 
    else if (label === "NURSING SERVICES") {
      setModalContent(
        <NursingServices
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } 
    else if (label === "CONSUMABLES") {
      setModalContent(
        <Consumables
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    }
     else if (label === "DOCTOR VISIT") {
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
    // else if (label === "ADVICE SURGERY") {
    //     setModalContent(<AdvisedSurgery visitid={visitid} gssuhid={gssuhid} empid={empid} />);
    //     setShowModal(true);
    // }
    // else if (label === "IMPLANT") {
    //     setModalContent(<Implants visitid={visitid} gssuhid={gssuhid} empid={empid} />);
    //     setShowModal(true);
    // }
    // else if (label === "InvestigationBug") {
    //     setModalContent(<Investigation visitid={visitid} gssuhid={gssuhid} empid={empid} patientData={patientData}/>);
    //     setShowModal(true);
    // }
    else if (label === "INVESTIGATION") {
      setModalContent(
        <DummyInvestigation
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } else if (label === "NUTRITIONAL ASSESSMENT  PROFILE") {
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
    } 
    else if (label === "PROGRESS SHEET") {
      setModalContent(
        <ProgressSheet
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);}
    else if (label === "NURSING REASSESSMENT") {
      setModalContent(
        <NursingReassessment
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } 
    else if (label === "-") {
      setModalContent(
        <PythonPractice
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      );
      setShowModal(true);
    } 
    else if (label === "xyz") {
      setModalContent(<div>Placeholder for Doctor Visit</div>);
      setShowModal(true);
    } else {
      // handle other buttons if needed
    }
  };

  const closeModal = ({ onClick }) => setShowModal(false);

  return (
    <div>
      {/* BUTTON GRID STYLE */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 px-2">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="rounded-md p-1 flex flex-col items-center justify-center 
                 h-10 text-white shadow-md cursor-pointer 
                 transition-transform hover:scale-105 "
            style={{
              backgroundColor: button.color,
              boxShadow: `0 4px 6px ${button.shadow} `,
            }}
            onClick={() => handleButtonClick(button.label)}
          >
            {/* <button.icon className="text-lg" /> */}
            <span className="text-xs  font-semibold">{button.label}</span>
          </div>
        ))}
      </div>

      {/* OPEN MODAL WITH CONTENT */}
      {showModal && (
        <div className="fixed inset-0 backdrop- flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative shadow-2xl border flex flex-col overflow-hidden">
            <CloseButton
              onClick={closeModal}
              className="absolute top-3 right-3"
            />

            {/* Scrollable Content Area */}
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
