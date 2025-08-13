"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import PatientInfoCard from "./components/PatientInfoCard";
import VitalsTable from "./components/Vitals/VitalsTable";
import Header from "./components/Header";
import ButtonGrid from "./components/SidebarButtons";
import { toast } from "react-toastify";
import HomePatientGrid from "./common/Modal/HomePatientGrid";
import NurHeader from "./components/NursingHeader";

const WarningPopup = ({ visible }) => {
  useEffect(() => {
    if (visible) {
      toast.warning("Please scan patient first to proceed.");
    }
  }, [visible]);

  return null;
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
      <div className={scanned ? "" : "pointer-events-none "}>{children}</div>

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
    <div className="p-4 min-h-screen space-y-2 bg-gray-50">
      {/* Header always visible */}
      <Header />
        {/* <NurHeader /> */}
      <HomePatientGrid />

      <BlockUntilScanned scanned={scanned} onBlockedClick={showScanWarning}>
        {/* ✅ Block rest until scanned */}

        <div className="flex flex-col gap-2">
          {/* <VitalsTable
            title="Vitals"
            //  visitid={visitid}
            //  gssuhid={gssuhid}
            //  empid={empid}
            //  patientData={patientData}
          /> */}

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
