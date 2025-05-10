
import PatientInfoCard from "./components/PatientInfoCard";
import VitalsTable from "./components/VitalsTable";
import AssessmentCard from "./components/AssessmentCard";
import MedicineTable from "./components/MedicineTable";
import SidebarButtons from "./components/SidebarButtons";
import NotesBox from "./components/NotesBox";
import Header from "./components/Header";


export default function Home() {
  const vitals = [
    { date: "15-11-2024 02:35 AM", bp: "80/70", pulse: "98", temp: "98", spo2: "99.8", weight: "78" },
    { date: "15-11-2024 02:35 AM", bp: "100/90", pulse: "89", temp: "89", spo2: "99", weight: "80" },
  ];

  return (
    <div className="p-4 space-y-4">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-5/12">
              <PatientInfoCard
                name="Shraddha Shaiv"
                age="23"
                gender="Female"
                bedNo="A101"
                doctor="Dr. xyz"
                billingGroup="Premium"
                phone="123-456-7890"
              />
            </div>
            <div className="md:w-7/12">
              <VitalsTable vitals={vitals}  title="Vitals"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AssessmentCard title=" Chief Complaints"></AssessmentCard>
            <AssessmentCard title="Diagnosis" />
            <AssessmentCard title="Allergies" />
            <NotesBox />
          </div>

       
          <MedicineTable />
        </div>

        <div>
          <SidebarButtons />
        </div>
      </div>
    </div>
  );
}
