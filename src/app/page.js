

"use client";
import { useState, useEffect } from "react";
import PatientInfoCard from "./components/PatientInfoCard";
import VitalsTable from "./components/VitalsTable";
import AssessmentCard from "./components/AssessmentCard";
import MedicineTable from "./components/MedicineTable";
import SidebarButtons from "./components/SidebarButtons";
import NotesBox from "./components/NotesBox";
import Header from "./components/Header";
import useVisitParams from "./hooks/useVisitParams";
import useFetchPatientHistory from "./hooks/fetchHistoryData";
import fetchHeadloadData from "./hooks/fetchHeadloadData";


export default function Home() {
  const { visitid, gssuhid, empid } = useVisitParams(); //search parameter
  const { historyData } = useFetchPatientHistory(visitid, gssuhid, empid); //fetchData

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bed, setBed] = useState("");



  useEffect(() => {   
    if (historyData.presentIllness && historyData.presentIllness.Table && historyData.presentIllness.Table.length > 0) {
      const patientData = historyData.presentIllness.Table[0];
      setName(patientData.patientname || "Unknown");
      setAge(patientData.age || "N/A");
      setGender(patientData.gendername || "N/A");
      setBed(patientData.bedno|| "N/A")
    } else {
      console.warn("No patient data found in historyData:", historyData);
    }
  }, [historyData]);

// Grouping dropdown states into a single object
    // const [dropdowns, setDropdowns] = useState({
    //     relativesDropdownData: [],
      
    // });

    // useEffect(() => {
    //     const loadHeadloadData = async () => {
            
    //         try {
    //             const result = await fetchHeadloadData();
    //             setDropdowns({
    //                 relativesDropdownData: result.relativesDropdownData,
                   
    //             });
    //         } catch (error) {
    //             console.error('Error loading headload data:', error);
    //         } 
    //     };

    //     loadHeadloadData();
    // }, []);



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

                name={name}
                age={age}
                gender={gender}
                bedNo={bed}
                doctor="Dr. xyz"
                billingGroup="Premium"
                phone="123-456-7890"
              />
            </div>

            <div className="md:w-7/12">
              <VitalsTable vitals={vitals} title="Vitals" />
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
          <SidebarButtons visitid={visitid} gssuhid={gssuhid} empid={empid} 
          //  reldropdowndata={dropdowns.relativesDropdownData}
           />
        </div>
      </div>
    </div>
  );
}

