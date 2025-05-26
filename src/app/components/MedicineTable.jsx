// "use client";
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPrescriptionBottleAlt, faClipboardList, faVial, faExclamationCircle, faSyringe } from '@fortawesome/free-solid-svg-icons';
// import CurrentMedicines from './CurrentMedicines';
// import PrescribedMedicine from './PrescribedMedicine';

// const MedicineTable = () => {
//   const [activeTab, setActiveTab] = useState('prescribed');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const tabData = [
//     { name: 'prescribed', label: 'Prescribed Medicines', icon: faPrescriptionBottleAlt },
//     { name: 'current', label: 'Current Medicines', icon: faClipboardList },
//     { name: 'iv', label: 'IV Fluids', icon: faVial },
//     { name: 'sos', label: 'SOS/State Medicines', icon: faExclamationCircle },
//     { name: 'invasive', label: 'Invasive Lines/Tubes', icon: faSyringe },
//   ];

//   return (
//     <div className="max-w-full mx-auto">
//       <div className="flex border-b border-gray-300">
//         {tabData.map(({ name, label, icon }) => (
//           <div
//             key={name}
//             className={`flex-1 text-center py-3 cursor-pointer transition-colors duration-300 
//               ${activeTab === name ? 'bg-white border-b-2 border-blue-500 font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
//             onClick={() => handleTabClick(name)}
//           >
//             <FontAwesomeIcon icon={icon} className="h-5 w-5 inline-block mr-1" />
//             {label}
//           </div>
//         ))}
//       </div>

//       <div className="p-4 border border-gray-300 bg-white">
//         {activeTab === 'prescribed' && (
//          <PrescribedMedicine/>
//         )}
//         {activeTab === 'current' && (
//         < CurrentMedicines/>
//         )}
//         {activeTab === 'iv' && (
//          <PrescribedMedicine/>
//         )}
//         {activeTab === 'sos' && (
//          <PrescribedMedicine/>
//         )}
//         {activeTab === 'invasive' && (
//         <PrescribedMedicine/>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MedicineTable;



"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescriptionBottleAlt,
  faClipboardList,
  faVial,
  faExclamationCircle,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import CurrentMedicines from "./CurrentMedicines";
import PrescribedMedicine from "./PrescribedMedicine";

const MedicineTable = () => {
  const [activeTab, setActiveTab] = useState("prescribed");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabData = [
    { name: "prescribed", label: "Prescribed Medicines", icon: faPrescriptionBottleAlt },
    { name: "current", label: "Current Medicines", icon: faClipboardList },
    { name: "iv", label: "IV Fluids", icon: faVial },
    { name: "sos", label: "SOS/State Medicines", icon: faExclamationCircle },
    { name: "invasive", label: "Invasive Lines/Tubes", icon: faSyringe },
  ];

  return (
    <div className="max-w-full mx-auto">
      {/* Tabs container with wrap and scroll on small screens */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-gray-300 overflow-x-auto no-scrollbar">
        {tabData.map(({ name, label, icon }) => (
          <button
            key={name}
            onClick={() => handleTabClick(name)}
            className={`flex items-center justify-center whitespace-nowrap px-3 py-2 md:py-3 text-sm md:text-base cursor-pointer transition-colors duration-300
              ${
                activeTab === name
                  ? "bg-white border-b-2 border-blue-500 font-semibold text-blue-600"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }
              md:flex-1 rounded-t-md`}
            style={{ minWidth: "130px" }} // prevent tabs from shrinking too much
            type="button"
          >
            <FontAwesomeIcon icon={icon} className="h-4 w-4 md:h-5 md:w-5 mr-1" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="p-4 border border-gray-300 bg-white rounded-b-md">
        {activeTab === "prescribed" && <PrescribedMedicine />}
        {activeTab === "current" && <CurrentMedicines />}
        {activeTab === "iv" && <PrescribedMedicine />}
        {activeTab === "sos" && <PrescribedMedicine />}
        {activeTab === "invasive" && <PrescribedMedicine />}
      </div>
    </div>
  );
};

export default MedicineTable;
