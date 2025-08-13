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
import { useKeyboardScrollFix } from "./common/useKeyboardScrollFix";
import API_ENDPOINTS from "./constants/api_url";

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
  // ✅ Track if a patient is selected
  const [patientSelected, setPatientSelected] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otherPatientData, setOtherPatientData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const showScanWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000);
  };
  useKeyboardScrollFix();
  // ✅ Fetch patient data from API
  const fetchPatientBed = async (visitId) => {
    if (!visitId) return;

    const cleanedVisitId = visitId.trim();
    setLoading(true);

    try {
      const apiUrl = `${
        API_ENDPOINTS.getAdvPatientBed
      }/?visitid=${encodeURIComponent(cleanedVisitId)}`;
      const response = await fetch(apiUrl);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const rawText = await response.text();
      const data = JSON.parse(JSON.parse(rawText));

      const tableData = Array.isArray(data.Table) ? data.Table : [];
      const table1Data = Array.isArray(data.Table1) ? data.Table1 : [];

      if (tableData.length > 0) {
        const patient = tableData[0];
        setPatientData(patient);
        setPatientSelected(true);
      } else {
        toast.error("No patient data found.");
        setPatientData(null);
        setPatientSelected(false);
      }

      setOtherPatientData(table1Data.length > 0 ? table1Data : null);
    } catch (error) {
      console.error("❌ Error fetching patient bed info:", error);
      toast.error("Failed to fetch patient bed info: " + error.message);
      setPatientData(null);
      setPatientSelected(false);
      setOtherPatientData(null);
    } finally {
      setLoading(false);
      setShowScanner(false);
    }
  };

  // ✅ On mount, check URL params and auto-fetch patient
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const visitid = params.get("visitid");

    if (visitid) {
      fetchPatientBed(visitid);
    }
  }, []);

  return (
    <div className="p-4 min-h-screen space-y-2 bg-gray-50">
      {/* Header always visible */}
      <Header />
      {/* <NurHeader /> */}

      {patientSelected && (
        <PatientInfoCard
          name={patientData.patname || "N/A"}
          age={patientData.Age || "N/A"}
          gender={patientData.gendername || "N/A"}
          bedNo={patientData.bedno || "N/A"}
          doctor={patientData.primconsultant || "N/A"}
          billingGroup={patientData.billgrpname || "N/A"}
          phone={patientData.mobileno || "N/A"}
        />
      )}

      {/* Pass setter functions as props */}
      <HomePatientGrid
        onPatientSelect={(patient) => {
          setPatientData(patient);
          setPatientSelected(true);
        }}
      />

      {/* Patient Info Section */}
      {patientSelected ? (
        <div className="w-full">
          <ButtonGrid
            visitid={patientData.visitid}
            gssuhid={patientData.gssuhid}
            empid={patientData.empid}
            patientData={patientData}
          />
        </div>
      ) : (
        <BlockUntilScanned scanned={scanned} onBlockedClick={showScanWarning}>
          {/* Blocked ButtonGrid only shows if no patient is selected */}
          <ButtonGrid />
        </BlockUntilScanned>
      )}

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
