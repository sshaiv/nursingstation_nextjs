"use client";
import { useState } from "react";
import { Suspense } from "react";
import PatientInfoCard from "./components/PatientInfoCard";
import VitalsTable from "./components/VitalsTable";
import AssessmentCard from "./components/AssessmentCard";
import MedicineTable from "./components/MedicineTable";
import SidebarButtons from "./components/SidebarButtons";
import NotesBox from "./components/NotesBox";
 import Header from "./components/Header";
import ButtonGrid from "./components/SidebarButtons";

const WarningPopup = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-yellow-50 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg shadow-md flex items-center gap-3 z-50">
     
      <span className="text-base font-medium">⚠️ Please scan the patient first to proceed.</span>
    </div>
  );
};



const BlockUntilScanned = ({ children, scanned, onBlockedClick }) => {
  const handleBlockedClick = (e) => {
    if (!scanned) {
      e.stopPropagation();
      e.preventDefault();
      onBlockedClick();
    }
  };

  return (
    <div className={scanned ? "" : "relative"}>
      {/* Child components are unclickable and faded if not scanned */}
      <div className={scanned ? "" : "pointer-events-none "}>
        {children}
      </div>

      {/* Invisible overlay to intercept clicks and show warning */}
      {!scanned && (
        <div
          className="absolute inset-0 z-10 cursor-not-allowed"
          onClick={handleBlockedClick}
        />
      )}
    </div>
  );
};

function HomeContent() {
  const [scanned, setScanned] = useState(false); 
  const [showWarning, setShowWarning] = useState(false);

  const showScanWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50">
      {/* Header always visible */}
      <Header />

      {/* ✅ Patient Card - full width, just below header */}
      <div className="w-full">
        <PatientInfoCard
          name="demo"
          age="123"
          gender="Male"
          bedNo="12B"
          doctor="Dr. xyz"
          billingGroup="Premium"
          phone="123-456-7890"
        />
      </div>

      {/* ✅ Block rest until scanned */}
      <BlockUntilScanned scanned={scanned} onBlockedClick={showScanWarning}>
        <div className="flex flex-col gap-4">
               <VitalsTable
                 title="Vitals"
                //  visitid={visitid}
                //  gssuhid={gssuhid}
                //  empid={empid}
                //  patientData={patientData}
               />
       
               <ButtonGrid
                //  visitid={visitid}
                //  gssuhid={gssuhid}
                //  empid={empid}
                //  patientData={patientData}
               />
             </div>
      </BlockUntilScanned>

      <WarningPopup visible={showWarning} />
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
