import React, { useState } from "react";
import Select from "react-select";

// Import all individual consent components
import ProcedureConsentForm from "./consents/ProcedureConsent";
// import BloodConsent from "./consents/BloodConsent";
// import MriConsent from "./consents/MriConsent";
// import CtConsent from "./consents/CtConsent";
import HIVConsentForm from "./consents/HIVConsentForm";
import AnesthesiaConsentForm from "./consents/AnesthesiaConsentForm";
import RestraintConsentPages from "./consents/RestraintConsentPages";
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
      case "hiv":
        return <HIVConsentForm />;
      case "anesthesia":
        return <AnesthesiaConsentForm />;
      case "restraint":
        return <RestraintConsentPages />;
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
