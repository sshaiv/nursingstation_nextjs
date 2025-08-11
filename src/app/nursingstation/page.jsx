"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PatientInfoCard from "../components/PatientInfoCard";
import VitalsTable from "../components/Vitals/VitalsTable";
import AssessmentCard from "../components/AssessmentCard";
import NotesBox from "../components/NotesBox";
import MedicineTable from "../components/MedicineTable";
import ButtonGrid from "../components/SidebarButtons";
import NurHeader from "../components/NursingHeader";
import API_ENDPOINTS from "../constants/api_url";
import { useKeyboardScrollFix } from "../common/useKeyboardScrollFix";
import { toast } from "react-toastify";

function NursingStationContent() {
  const searchParams = useSearchParams();
  const [visitid, setVisitid] = useState(null);
  const [gssuhid, setGssuhid] = useState(null);
  const [empid, setEmpid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [otherPatientData, setOtherPatientData] = useState(null);

  const fetchPatientBed = async (visitId) => {
    const cleanedVisitId = visitId.trim();
    setLoading(true);

    try {
      const apiUrl = `${
        API_ENDPOINTS.getAdvPatientBed
      }/?visitid=${encodeURIComponent(cleanedVisitId)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let rawText = await response.text();
      // console.log("📦 Raw API response text:", rawText);

      let data;
      try {
        data = JSON.parse(JSON.parse(rawText));
      } catch (jsonError) {
        throw new Error("Failed to parse JSON: " + jsonError.message);
      }

      // console.log("✅ Parsed data:", data);

      const tableData = Array.isArray(data.Table) ? data.Table : [];
      const otherPatientData = Array.isArray(data.Table1) ? data.Table1 : [];

      // console.log("📏 tableData length:", tableData.length);
      //   console.log("📏 otherPatientData length:", otherPatientData.length);

      if (tableData.length > 0) {
        const patient = tableData[0];
        setPatientData(patient);
      } else {
        toast.error("No patient data found.");
       
        setPatientData(null);
      }

      // If you want to set otherPatientData as well
      if (otherPatientData.length > 0) {
        // Assuming you have a state to hold other patient data
        setOtherPatientData(otherPatientData);
      } else {
        console.log("No other patient data found.");
        setOtherPatientData(null);
      }
    } catch (error) {
      console.error("❌ Error fetching patient bed info:", error);
      toast.error("Failed to fetch patient bed info: " + error.message);

      setPatientData(null);
      setOtherPatientData(null);
    } finally {
      setLoading(false);
      setShowScanner(false);
    }
  };

  useEffect(() => {
    const v = searchParams.get("visitid");
    const g = searchParams.get("gssuhid");
    const e = searchParams.get("empid");

    setVisitid(v);
    setGssuhid(g);
    setEmpid(e);

    if (v) {
      fetchPatientBed(v);
    }
  }, [searchParams]);

 useKeyboardScrollFix();

  return (
   <div className="flex flex-col min-h-screen p-2 space-y-2 bg-gray-50">
      <NurHeader />

      {/* PATIENT INFO ALWAYS ON TOP */}
      <div className="w-full">
        {loading ? (
          // Skeleton loader
          <div className="w-full border border-gray-200 bg-white rounded-md shadow-sm p-2 md:p-3 animate-pulse space-y-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
              {/* Avatar */}
              <div className="w-6 h-6 rounded-full bg-gray-200"></div>

              {/* Name & Age */}
              <div className="flex items-center gap-1">
                <div className="h-3 w-20 rounded bg-gray-200"></div>
                <div className="h-3 w-24 rounded bg-gray-100"></div>
              </div>

              {/* Line Items */}
              <div className="flex items-center gap-1">
                <div className="h-3 w-16 rounded bg-gray-100"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-24 rounded bg-gray-100"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-28 rounded bg-gray-100"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-20 rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        ) : patientData ? (
          <PatientInfoCard
            name={patientData.patname || "N/A"}
            age={patientData.Age || "N/A"}
            gender={patientData.gendername || "N/A"}
            bedNo={patientData.bedno || "N/A"}
            doctor={patientData.primconsultant || "N/A"}
            billingGroup={patientData.billgrpname || "N/A"}
            phone={patientData.mobileno || "N/A"}
          />
        ) : null}
      </div>

      {/* GRID BELOW */}
      <div className="flex flex-col gap-2">
        <VitalsTable
          title="Vitals"
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />

        <ButtonGrid
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
          patientData={patientData}
        />
      </div>
    </div>

 

  );
}

export default function nursingstation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NursingStationContent />
    </Suspense>
  );
}
