import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";

import DoctorModal from "./DoctorModal";

import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import NursingServiceModal from "./NursingServiceModal";
import useSaveNSData from "../hooks/useSaveNSData";

export default function NursingServices({
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
  const [investigationName, setInvestigationName] = useState("");
  const [investigationID, setInvestigationID] = useState("");
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [performedBy, setPerformedBy] = useState("");
  const [quantity, setQuantity] = useState("");

  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [saveData, setSaveData] = useSaveNSData();
  console.log("Updated Nur service", saveData);

  const handleSelectServices = (selectedIds) => {
    console.log("Nur service  in Nur service", selectedIds);

    setSelectedServices(selectedIds);

    setInvestigationName(selectedIds.label || selectedIds.CNAME);

    setInvestigationID(selectedIds.label || selectedIds.CID);

    setShowSecondModal(false);
  };

  const handleSelectDoctor = (doctor) => {
    console.log("Doctor in Nur service:", doctor);
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
      if (selectedServices.length === 0)
        newErrors.services = "Please select at least one investigation.";
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
      investigation:
        service.InvestigationName ||
        service.servname ||
        service.CNAME ||
        "Unknown",
      performedBy: performedBy || "N/A",
      quantity: quantity || "1",
    }));

    setVitals((prev) => [...prev, ...newEntries]);
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(
        API_ENDPOINTS.savePatNursingINVData,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveData),
        }
      );

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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINTS.getInvDetail}/?visitid=${visitid}`)
      .then((res) => {
        //console.log("🚀 Full API response (res.data):", res.data);

        let parsedData = [];
        try {
          if (typeof res.data === "string") {
            parsedData = JSON.parse(res.data);
          } else if (
            typeof res.data === "object" &&
            typeof res.data.data === "string"
          ) {
            parsedData = JSON.parse(res.data.data);
          } else {
            parsedData = res.data;
          }
        } catch (err) {
          console.error("Error parsing investigations JSON:", err);
          parsedData = [];
        }

        // console.log("✅ Parsed Data:", parsedData);

        if (parsedData && Array.isArray(parsedData.Table)) {
          parsedData.Table.forEach((item, index) => {
            // console.log(
            //   `Item ${index} => servname: ${
            //     item.servname || "N/A"
            //   },
            //   consultantname: ${item.consultantname || "N/A"},
            //   datetime: ${item.orddate || "N/A"},
            //    remarks: ${
            //     item.remarks || "N/A"
            //   }`
            // );
          });
          setTable(parsedData.Table);
        } else {
          console.warn("Parsed data me Table array nahi mila:", parsedData);
          setTable([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching investigations:", err);
        setTable([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [visitid]);

  return (
    <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
      <div className="flex items-center justify-center">
        <ModalHeading title="Nursing Services" />
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
        <NursingServiceModal
          isOpen={showSecondModal}
          onSelect={handleSelectServices}
          onClose={() => setShowSecondModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
        />
      )}

      <div className="border border-gray-100 rounded-lg space-y-4">
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-5 items-end">
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
          <input
            type="text"
            readOnly
            value={investigationName}
            onClick={() => setShowSecondModal(true)}
            className={`cursor-pointer border px-2 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none ${
              errors.services ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Select services"
          />
          {/* ➕ New Input: Performed By */}
          <input
            type="text"
            value={performedBy}
            onChange={(e) => setPerformedBy(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md text-sm"
            placeholder="Performed By"
          />

          {/* ➕ New Input: Quantity */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md text-sm"
            placeholder="Quantity"
          />

          <div className="flex justify-center gap-4">
            <ActionButton
              label="Insert"
              onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
            <ActionButton
              label="Posted Data"
              // onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="max-h-[225px] overflow-y-auto scrollbar-hide">
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                <TableReuse type="th">Date/Time</TableReuse>
                <TableReuse type="th">BedNo</TableReuse>
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Investigation</TableReuse>
                <TableReuse type="th">Performed By</TableReuse>
                <TableReuse type="th">Quantity</TableReuse>

                <TableReuse type="th">Actions</TableReuse>
              </tr>
            </thead>
           <tbody>
  {/* Render newly inserted vitals at the top */}
  {[...vitals].reverse().map((v, idx) => (
    <tr key={"vital-" + idx} className="hover:bg-gray-100 border-t">
      <TableReuse>{v.date || "N/A"}</TableReuse>
      <TableReuse>{v.bedNo || "N/A"}</TableReuse>
      <TableReuse>{v.service || "N/A"}</TableReuse>
      <TableReuse>{v.doctorName || "N/A"}</TableReuse>
      <TableReuse>{v.performedBy || "N/A"}</TableReuse>
      <TableReuse>{v.quantity || "N/A"}</TableReuse>
     
      <TableReuse>
        <div className="flex justify-center space-x-2">
          {v.source !== "api" && (
            <button
              className="text-red-500 hover:underline"
              onClick={() =>
                setVitals(vitals.filter((_, i) => i !== idx))
              }
            >
              Delete
            </button>
          )}
        </div>
      </TableReuse>
    </tr>
  ))}

  {/* Conditional rendering for loading */}
  {loading ? (
    <tr>
      <td colSpan={8} className="text-center py-2 text-gray-500">
        ⟳ Loading investigations...
      </td>
    </tr>
  ) : (
    <>
      {/* Render API fetched data below */}
      {table.map((item, idx) => (
        <tr key={"api-" + idx} className="hover:bg-gray-100 border-t">
          <TableReuse>{item.orddate || "N/A"}</TableReuse>
          <TableReuse>{item.bedno || "N/A"}</TableReuse>
          <TableReuse>{item.servname || "N/A"}</TableReuse>
          <TableReuse>{item.consultantname || "N/A"}</TableReuse>
          <TableReuse>{item.performedBy || "N/A"}</TableReuse>
          <TableReuse>{item.quantity || "N/A"}</TableReuse>
         
          <TableReuse>
            {/* No remove button for API data */}
          </TableReuse>
        </tr>
      ))}
    </>
  )}
</tbody>

          </table>
        </div>
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="flex justify-center ">
        <SaveButton label="Save" onClick={savebtn} />
      </div>
    </div>
  );
}
