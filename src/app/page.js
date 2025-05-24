"use client";
import { Suspense } from "react";
import PatientInfoCard from "./components/PatientInfoCard";
import VitalsTable from "./components/VitalsTable";
import AssessmentCard from "./components/AssessmentCard";
import MedicineTable from "./components/MedicineTable";
import SidebarButtons from "./components/SidebarButtons";
import NotesBox from "./components/NotesBox";
import Header from "./components/Header";


function HomeContent() {

  return (
    <div className="p-4 space-y-4">
      <Header />
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
              <VitalsTable  title="Vitals" />
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
          <SidebarButtons
          //  visitid={visitid} gssuhid={gssuhid} empid={empid}
           />
        </div>
      </div>
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



