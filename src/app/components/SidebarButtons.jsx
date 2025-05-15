"use client";
import React, { useState } from 'react';
import { FiActivity, FiBox, FiCalendar, FiClipboard, FiFileText, FiHeart, FiHome, FiPackage, FiCheckCircle } from 'react-icons/fi';
import { GiScissors, GiFizzingFlask } from 'react-icons/gi';
import { FaStethoscope } from 'react-icons/fa';
import InitialAssessmentForm from './InitialAssessment';
import ClinicalExamination from './ClinicalExamination';

const buttons = [
    { label: "Nursing Services", color: "#1999A1", shadow: "#14767D", icon: FiActivity },
    { label: "Consumables", color: "#48BCD1", shadow: "#359EB0", icon: FiBox },
    { label: "Doctor Visit", color: "#1999A1", shadow: "#14767D", icon: FiCalendar },
    { label: "Clinical Examination", color: "#48BCD1", shadow: "#359EB0", icon: FiClipboard },
    { label: "Initial Assessment", color: "#1999A1", shadow: "#14767D", icon: FiFileText },
    { label: "Nutritional Assessment", color: "#48BCD1", shadow: "#359EB0", icon: FiHeart },
    { label: "Nur.InitialAssessment", color: "#1999A1", shadow: "#14767D", icon: FiHome },
    { label: "Nur.ReAssessment", color: "#48BCD1", shadow: "#359EB0", icon: FaStethoscope },
    { label: "Advice Surgery", color: "#1999A1", shadow: "#14767D", icon: GiScissors },
    { label: "Implant", color: "#48BCD1", shadow: "#359EB0", icon: FiPackage },
    { label: "Discharge Summary", color: "#1999A1", shadow: "#14767D", icon: FiCheckCircle },
    { label: "Investigation", color: "#48BCD1", shadow: "#359EB0", icon: GiFizzingFlask },
];

export default function ButtonGrid( { visitid, gssuhid, empid,
    // reldropdowndata
 } ) {
   
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

 
    const handleButtonClick = (label) => {
        if (label === "Initial Assessment") {
            setModalContent(<InitialAssessmentForm visitid={visitid} gssuhid={gssuhid} empid={empid} 
                // reldropdowndata={reldropdowndata} 
                />);  // Replace with the actual component when ready
            setShowModal(true);
        } else if (label === "Clinical Examination") {
            setModalContent(<ClinicalExamination visitid={visitid} gssuhid={gssuhid} empid={empid} />);  // Replace with the actual component when ready
            setShowModal(true);
        } else if (label === "Doctor Visit") {
            setModalContent(<div>Placeholder for Doctor Visit</div>);  // Replace with the actual component when ready
            setShowModal(true);
        } else {
            // Handle other buttons similarly, replace with actual components when needed
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
                {buttons.map((button, index) => (
                    <div
                        key={index}
                        className="rounded-lg p-2 flex items-center gap-2 text-white shadow-lg cursor-pointer transition-transform hover:scale-105"
                        style={{
                            backgroundColor: button.color,
                            boxShadow: `0 4px 6px ${button.shadow}`,
                        }}
                        onClick={() => handleButtonClick(button.label)}
                    >
                        <button.icon className="text-xl" />
                        <span>{button.label}</span>
                    </div>
                ))}
            </div>

            
{showModal && (
  <div className="fixed inset-0 backdrop-blur- flex items-center justify-center z-50">
   <div className="bg-purple-50 rounded-xl w-[90vw] h-[80vh] max-w-[1500px] relative shadow-2xl border flex flex-col overflow-hidden">

      <button
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={closeModal}
      >
        &times;
      </button>

      {/* Scrollable Content Area */}
      <div className="mt-8 overflow-y-auto pr-2" style={{ height: '100%' }}>
        {modalContent}
      </div>
    </div>
  </div>
)}



            
        </div>
    );
}
