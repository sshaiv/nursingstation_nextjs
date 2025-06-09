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
      {/* Header is always active and outside the block */}
      <Header />

      {/* Content below is blocked until scanned */}
      <BlockUntilScanned scanned={scanned} onBlockedClick={showScanWarning}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="md:w-5/12 w-full">
                <PatientInfoCard
                  name="demo"
                  age="123"
                  gender="{gender}"
                  bedNo="{bed}"
                  doctor="Dr. xyz"
                  billingGroup="Premium"
                  phone="123-456-7890"
                />
              </div>
              <div className="md:w-7/12 w-full">
                <VitalsTable title="Vitals" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <AssessmentCard title="Chief Complaints" />
              <AssessmentCard title="Diagnosis" />
              <AssessmentCard title="Allergies" />
              <NotesBox />
            </div>
            <MedicineTable />
          </div>
          <SidebarButtons />
        </div>
      </BlockUntilScanned>

      {/* Small warning popup shown only when needed */}
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
