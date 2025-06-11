"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PatientInfoCard from "../components/PatientInfoCard";
import VitalsTable from "../components/VitalsTable";
import AssessmentCard from "../components/AssessmentCard";
import NotesBox from "../components/NotesBox";
import MedicineTable from "../components/MedicineTable";
import ButtonGrid from "../components/SidebarButtons";
import NurHeader from "../components/NursingHeader";
import API_ENDPOINTS from "../constants/api_url";

function NursingStationContent() {
  const searchParams = useSearchParams();
  const [visitid, setVisitid] = useState(null);
  const [gssuhid, setGssuhid] = useState(null);
  const [empid, setEmpid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [patientData, setPatientData] = useState(null);

  const fetchPatientBed = async (visitid) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.getAdvPatientBed}/?visitid=${visitid}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      // console.log("API response data:", data);

      if (Array.isArray(data) && data.length > 0) {
        const patient = data[0];
        setPatientData(patient);
      } else {
        alert("No patient data found.");
        setPatientData(null);
      }
    } catch (error) {
      console.error("Error fetching patient bed info:", error);
      alert("Failed to fetch patient bed info: " + error.message);
      setPatientData(null);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* <div className="md:w-5/12 w-full"> */}
            <div className="md:w-5/12 w-full">
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
              ) : (
                // Styled "No data" box
                <div className="mx-auto w-full max-w-lg rounded-md border border-blue-300 p-4">
                  <div className="flex animate-pulse space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 rounded bg-gray-200">
                        Loading patient{" "}
                      </div>
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
              )}
            </div>

            {/* <div className="md:w-7/12 w-full"> */}
            <div className="md:w-8/12 w-full">
              <VitalsTable
                title="Vitals"
                visitid={visitid}
                gssuhid={gssuhid}
                empid={empid}
                patientData={patientData}
              />
              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AssessmentCard title="Chief Complaints" />
            <AssessmentCard title="Diagnosis" />
            <AssessmentCard title="Allergies" />
            <AssessmentCard icons="🔍" title=" Notes"  />
           
    
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

export default function nursingstation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NursingStationContent />
    </Suspense>
  );
}
