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

function oldstationContent() {
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
        alert("No patient data found.");
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
      alert("Failed to fetch patient bed info: " + error.message);
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

  return (
    <div className="p-4 space-y-4 bg-gray-50">
      <NurHeader />

      {/* PATIENT INFO ALWAYS ON TOP */}
      <div className="w-full">
        {loading ? (
          // Skeleton loader
          <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <div className="w-full">
            <VitalsTable
              title="Vitals"
              visitid={visitid}
              gssuhid={gssuhid}
              empid={empid}
              patientData={patientData}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AssessmentCard title="Chief Complaints" patientData={patientData} otherPatientData={otherPatientData} />
            <AssessmentCard title="Diagnosis" patientData={patientData} otherPatientData={otherPatientData}/>
            <AssessmentCard title="Allergies" patientData={patientData} otherPatientData={otherPatientData} />
            <AssessmentCard icons="🔍" title=" Notes"patientData={patientData} otherPatientData={otherPatientData} />
          </div>

          <MedicineTable
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        </div>

        <div>
          <ButtonGrid
            visitid={visitid}
            gssuhid={gssuhid}
            empid={empid}
            patientData={patientData}
          />
        </div>
      </div>
    </div>
  );
}

export default function oldstation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <oldstationContent />
    </Suspense>
  );
}
