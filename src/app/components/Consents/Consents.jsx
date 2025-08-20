// import React, { useState } from "react";
// import Select from "react-select";

// const consentOptions = [
//   { value: "procedure", label: "Procedure" },
//   { value: "blood", label: "Blood Transfusion consent and monitoring Record" },
//   { value: "mri", label: "MRI" },
//   { value: "ct", label: "CT SCAN" },
//   { value: "hiv", label: "HIV Antibody Screening Test" },
//   { value: "anesthesia", label: "Anesthesia Services" },
//   { value: "restraint", label: "Restraint And Monitoring Chart" },
//   { value: "lama", label: "LAMA / DOR" },
//   { value: "cathlab", label: "Cathlab" },
//   { value: "cbgs", label: "CBGS" },
// ];

// const Consents = ({ visitid, gssuhid, empid, patientData }) => {
//   const [selectedConsent, setSelectedConsent] = useState(null);
//   const [confirmedConsent, setConfirmedConsent] = useState(null);

//   const handleOkClick = () => {
//     setConfirmedConsent(selectedConsent);
//   };

//   const renderConsentForm = () => {
//     if (!confirmedConsent) return null;

//     switch (confirmedConsent.value) {
//       case "procedure":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">Procedure Consent</h3>
//             <p className="text-xs text-gray-600">This is the form for Procedure consent...</p>
//           </div>
//         );
//       case "blood":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">Blood Transfusion Consent</h3>
//             <p className="text-xs text-gray-600">Form for blood transfusion and monitoring...</p>
//           </div>
//         );
//       case "mri":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">MRI Consent</h3>
//             <p className="text-xs text-gray-600">Form for MRI procedure...</p>
//           </div>
//         );
//       case "ct":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">CT Scan Consent</h3>
//             <p className="text-xs text-gray-600">Form for CT Scan procedure...</p>
//           </div>
//         );
//       case "hiv":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">HIV Antibody Screening Test Consent</h3>
//             <p className="text-xs text-gray-600">Form for HIV Antibody screening...</p>
//           </div>
//         );
//       case "anesthesia":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">Anesthesia Services Consent</h3>
//             <p className="text-xs text-gray-600">Form for anesthesia services...</p>
//           </div>
//         );
//       case "restraint":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">Restraint And Monitoring Chart</h3>
//             <p className="text-xs text-gray-600">Form for patient restraint & monitoring...</p>
//           </div>
//         );
//       case "lama":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">LAMA / DOR Consent</h3>
//             <p className="text-xs text-gray-600">Form for LAMA/DOR discharge...</p>
//           </div>
//         );
//       case "cathlab":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">Cathlab Consent</h3>
//             <p className="text-xs text-gray-600">Form for cathlab procedure...</p>
//           </div>
//         );
//       case "cbgs":
//         return (
//           <div className="p-3 mt-3 border rounded bg-gray-50">
//             <h3 className="text-sm font-semibold">CBGS Consent</h3>
//             <p className="text-xs text-gray-600">Form for CBGS procedure...</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div className="mt-3">
//         <label className="text-gray-700 text-[11px] mb-1 block">Consent Type</label>
//         <div className="flex gap-1">
//           <Select
//             options={consentOptions}
//             onChange={(option) => setSelectedConsent(option)}
//             placeholder="Select Consent"
//             className="w-full text-[7px]"
//             styles={{
//               control: (base) => ({ ...base, fontSize: 12 }),
//               menu: (base) => ({ ...base, fontSize: 12 }),
//               option: (base, { isFocused, isSelected }) => ({
//                 ...base,
//                 fontSize: 10,
//                 padding: "2px 5px",
//                 minHeight: "24px",
//                 backgroundColor: isFocused ? "#e2e8f0" : "white",
//                 color: isSelected ? "#1d4ed8" : "#374151",
//                 cursor: "pointer",
//               }),
//               menuList: (base) => ({
//                 ...base,
//                 maxHeight: "120px",
//                 overflowY: "auto",
//               }),
//             }}
//           />
//           <button
//             onClick={handleOkClick}
//             className="bg-blue-600 text-white text-[8px] px-2 rounded"
//             disabled={!selectedConsent}
//           >
//             ✔ OK
//           </button>
//         </div>
//       </div>

//       {/* Render Consent Form Below */}
//       {renderConsentForm()}
//     </>
//   );
// };

// export default Consents;


import React, { useState } from "react";
import Select from "react-select";

// Import all individual consent components
import ProcedureConsentForm from "./consents/ProcedureConsent";
// import BloodConsent from "./consents/BloodConsent";
// import MriConsent from "./consents/MriConsent";
// import CtConsent from "./consents/CtConsent";
// import HivConsent from "./consents/HivConsent";
// import AnesthesiaConsent from "./consents/AnesthesiaConsent";
// import RestraintConsent from "./consents/RestraintConsent";
import LamaDorConsentForm from "./consents/LamaDorConsentForm";
// import CathlabConsent from "./consents/CathlabConsent";
// import CbgsConsent from "./consents/CbgsConsent";

const consentOptions = [
  { value: "procedure", label: "Procedure" },
  { value: "blood", label: "Blood Transfusion consent and monitoring Record" },
  { value: "mri", label: "MRI" },
  { value: "ct", label: "CT SCAN" },
  { value: "hiv", label: "HIV Antibody Screening Test" },
  { value: "anesthesia", label: "Anesthesia Services" },
  { value: "restraint", label: "Restraint And Monitoring Chart" },
  { value: "lama", label: "LAMA / DOR" },
  { value: "cathlab", label: "Cathlab" },
  { value: "cbgs", label: "CBGS" },
];

const Consents = ({ visitid, gssuhid, empid, patientData }) => {
  const [selectedConsent, setSelectedConsent] = useState(null);

  const renderConsentForm = () => {
    switch (selectedConsent?.value) {
      case "procedure":
        return <ProcedureConsentForm />;
    //   case "blood":
    //     return <BloodConsent />;
    //   case "mri":
    //     return <MriConsent />;
    //   case "ct":
    //     return <CtConsent />;
    //   case "hiv":
    //     return <HivConsent />;
    //   case "anesthesia":
    //     return <AnesthesiaConsent />;
    //   case "restraint":
    //     return <RestraintConsent />;
      case "lama":
        return <LamaDorConsentForm />;
    //   case "cathlab":
    //     return <CathlabConsent />;
    //   case "cbgs":
    //     return <CbgsConsent />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mt-4">
      <label className="text-gray-700 text-lg font-semibold mb-3 block">
        Consent Type
      </label>
      <Select
        options={consentOptions}
        onChange={(option) => setSelectedConsent(option)}
        placeholder="Select Consent"
        className="w-full text-sm"
        styles={{
          control: (base) => ({
            ...base,
            fontSize: 14,
            borderRadius: "0.75rem",
            borderColor: "#d1d5db",
            boxShadow: "none",
            minHeight: "42px",
            "&:hover": { borderColor: "#6366f1" },
          }),
          menu: (base) => ({ ...base, fontSize: 14, zIndex: 50 }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            fontSize: 14,
            padding: "8px 12px",
            backgroundColor: isSelected
              ? "#4f46e5"
              : isFocused
              ? "#e0e7ff"
              : "white",
            color: isSelected ? "white" : "#374151",
            cursor: "pointer",
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: "200px",
            overflowY: "auto",
          }),
        }}
      />

      {/* Render Consent Form Below */}
      {renderConsentForm()}
    </div>
  );
};

export default Consents;
