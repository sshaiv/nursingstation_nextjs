import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import ReusableInputField from "../common/SmallInputfields";
import DoctorModal from "./DoctorModal";
import InvestigationModal from "./InvestigationModal";
import useSaveInvData from "../hooks/useSaveInvData";

export default function Investigation({
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
    const [isSaved, setIsSaved] = useState(false);
  const [isDoctorModalOpen, setDoctorModalOpen] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [vitals, setVitals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const [doctorName, setDoctorName] = useState(""); 
  const [doctorOptions, setDoctorOptions] = useState([]);
const [remark, setRemark] = useState("");
 const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectServices = (selectedIds) => {
    console.log("inv in inv", selectedIds);
   
    setSelectedServices(selectedIds);
    setShowSecondModal(false);
  };

  const [saveData, setSaveData] = useSaveInvData();
  console.log("Updated INV", saveData);

  const handleSelectDoctor = (doctor) => {
    console.log("Doctor in inv:", doctor);
    let selectedDoc = doctor;
    // If only ID was passed (e.g., from radio selection), find the full doctor object
    if (typeof doctor === "string") {
      selectedDoc = doctorOptions.find((doc) => doc.value === doctor);
    }
     //console.log("cvbnm", selectedDoc);
    if (selectedDoc) {
      setDoctorData(selectedDoc);
      setDoctorName(selectedDoc.label || selectedDoc.CName);
    }

    setSelectedDoctorId(selectedDoc?.value || doctor);
    setShowSecondModal(true);
    setDoctorModalOpen(false);
  };

 
 const handleInsert = () => {
  setErrors({});

  if (!selectedDate || !doctorData || selectedServices.length === 0) {
    const newErrors = {};
    if (!selectedDate) newErrors.dateTime = "Date and time are required.";
    if (!doctorData) newErrors.doctorName = "Please select a doctor.";
    if (selectedServices.length === 0) newErrors.services = "Please select at least one investigation.";
    setErrors(newErrors);
    return;
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  const currentDateTime = getCurrentDateTime();

  const newEntries = selectedServices.map((service) => ({
    date: currentDateTime,
    doctorName: doctorData.label || doctorData.CName || "N/A",
    investigation: service.InvestigationName || service.servname || service.CName || "Unknown",
    remarks: remark || "",
  }));

  setVitals((prev) => [...prev, ...newEntries]);
  
  // Optional: reset remark after inserting
  setRemark("");
};


 
const savebtn = async () => {
        console.log("savebtn ", saveData);
        try {
            const response = await fetch("https://doctorapi.medonext.com/API/HMS/SavePatNursingINVData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saveData),
            });

            const result = await response.json();
            console.log("Response:", result);

            if (response.ok) {
                alert("Data saved successfully!");
                setIsSaved(true); 
            } else {
                alert("Failed to save data.");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("An error occurred while saving data.");
        }
    };

  return (
    <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
      <div className="flex items-center justify-center">
        <ModalHeading title="Investigation" />
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />

      {/* Modals */}
      {isDoctorModalOpen && (
        <DoctorModal
          isOpen={isDoctorModalOpen}
          onClose={() => setDoctorModalOpen(false)}
          onSelectDoctor={handleSelectDoctor}
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}

        />
      )}

      {showSecondModal && (
        <InvestigationModal
          isOpen={showSecondModal}
          onSelect={handleSelectServices}
          onClose={() => setShowSecondModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
          setRemark={setRemark}
          remark={remark}
        />
      )}

      <div className="border border-gray-100 rounded-lg space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="flex flex-col w-full">
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
              label="Date & Time"
            />
            {errors.dateTime && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px] col-span-full ">
                {errors.dateTime}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs font-medium mb-1">
              Select Doctor Name*
            </label>
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`cursor-pointer border px-2 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" select doctor"
            />
            {errors.doctorName && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.doctorName}
              </p>
            )}
          </div>

          <ReusableInputField
            className="border-2 rounded-lg"
            id="remarks"
            label="Remarks"
            width="w-full"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-4 py-1"
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="max-h-[225px] overflow-y-auto scrollbar-hide">
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                <TableReuse type="th">Date/Time</TableReuse>
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Investigation</TableReuse>

                <TableReuse type="th">Remarks</TableReuse>
                <TableReuse type="th">Actions</TableReuse>
              </tr>
            </thead>
            <tbody>
              {vitals.map((v, idx) => (
                <tr key={idx} className="hover:bg-gray-100 border-t">
                  <TableReuse>{v.date}</TableReuse>
                  <TableReuse>{v.doctorName}</TableReuse>
                  <TableReuse>{v.investigation}</TableReuse>

                  <TableReuse>{v.remarks}</TableReuse>
                  <TableReuse>
                    <div className="flex justify-center space-x-2">
                      {/* <button className="text-blue-500 hover:underline">
                        Edit
                      </button> */}
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setVitals(vitals.filter((_, i) => i !== idx))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </TableReuse>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="flex justify-center ">
        <SaveButton label="Save"  onClick={savebtn} />
      </div>
    </div>
  );
}
