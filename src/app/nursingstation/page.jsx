"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PatientInfoCard from "../components/PatientInfoCard";
import Header from "../components/Header";
import VitalsTable from "../components/VitalsTable";
import AssessmentCard from "../components/AssessmentCard";
import NotesBox from "../components/NotesBox";
import MedicineTable from "../components/MedicineTable";
import ButtonGrid from "../components/SidebarButtons";

function NursingStationContent() {
  const searchParams = useSearchParams();
  const [visitid, setVisitid] = useState(null);
  const [gssuhid, setGssuhid] = useState(null);
  const [empid, setEmpid] = useState(null);

  useEffect(() => {
    const v = searchParams.get("visitid");
    const g = searchParams.get("gssuhid");
    const e = searchParams.get("empid");

    console.log("visitid yhn:", v);
    console.log("gssuhid yhn:", g);
    console.log("empid yhn:", e);

    setVisitid(v);
    setGssuhid(g);
    setEmpid(e);
  }, [searchParams]);

  return (
    <div className="p-4 space-y-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="md:w-5/12 w-full">
              <PatientInfoCard
                name="xyz"
                age="21"
                gender="abcdefghijklmnop"
                bedNo="asdfghjk"
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
        <div>
          <ButtonGrid />
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
