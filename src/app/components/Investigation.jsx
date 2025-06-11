import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import ReusableInputField from "../common/SmallInputfields";
import DoctorModal from "./Modal/DoctorModal";
import InvestigationModal from "./Modal/InvestigationModal";
import useSaveInvData from "../hooks/useSaveInvData";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import { getCurrentDateTime, getCurrentDate } from "../utils/dateUtils";

export default function Investigation({
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
  const CurrentDate = getCurrentDate();
  const fullDateTime = getCurrentDateTime();

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
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [canSave, setCanSave] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

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
      if (selectedServices.length === 0)
        newErrors.services = "Please select at least one investigation.";
      setErrors(newErrors);
      return;
    }

    const newEntries = selectedServices.map((service) => ({
      date: fullDateTime,
      doctorName: doctorData.label || doctorData.CName || "N/A",
      investigation:
        service.InvestigationName ||
        service.servname ||
        service.CName ||
        "Unknown",
      remarks: remark || "",
    }));

    setVitals((prev) => [...prev, ...newEntries]);
    setCanSave(true); // Enable Save button after insert

    // *** Clear form fields here after insertion ***
    setSelectedDate(new Date());
    setDoctorData(null);
    setDoctorName("");
    setSelectedServices([]);
    setRemark("");
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
        setRefreshData((prev) => !prev);
        // Reset vitals and form data
        setVitals([]);
        setSaveData({});
        setSelectedDate(null);
        setDoctorData(null);
        setDoctorName("");
        setSelectedServices([]);
        setRemark("");
        setErrors({});
        // Reload data from GET API
        setCanSave(false);
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
  }, [visitid, refreshData]);

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
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {/* Date & Time */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Date & Time
            </label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
            />
            {errors.dateTime && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.dateTime}
              </p>
            )}
          </div>

          {/* Doctor */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Doctor *
            </label>
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`text-sm text-black px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none cursor-pointer ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select doctor"
            />
            {errors.doctorName && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.doctorName}
              </p>
            )}
          </div>

          {/* Remark */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Remark 
            </label>
            <ReusableInputField
              className={`text-sm text-black px-2 py-1 border rounded-md focus:outline-none ${
                errors.remark ? "border-red-500" : "border-gray-300"
              }`}
              id="remarks"
              label=""
              width="w-full"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            {errors.remark && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.remark}
              </p>
            )}
          </div>

          <div className="flex gap-3 items-end mt-5 w-full col-span-full lg:col-span-2">
            <ActionButton
              label="Insert"
              onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
            {/* <ActionButton
      label="Posted Data"
      onClick={() => console.log("Posted Data Clicked")}
      className="text-xs px-4 py-1"
    /> */}
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="max-h-[250px] overflow-y-auto scrollbar-hide">
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
              {/* Render newly inserted vitals at the top */}
              {[...vitals].reverse().map((v, idx) => (
                <tr key={"vital-" + idx} className="hover:bg-gray-100 border-t">
                  <TableReuse>{v.date}</TableReuse>
                  <TableReuse>{v.doctorName}</TableReuse>
                  <TableReuse>{v.investigation}</TableReuse>
                  <TableReuse>{v.remarks}</TableReuse>
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
                  <td colSpan={5} className="text-center py-2 text-gray-500">
                    ⟳ Loading investigations...
                  </td>
                </tr>
              ) : (
                <>
                  {/* Render API fetched data below */}
                  {table.map((item, idx) => (
                    <tr
                      key={"api-" + idx}
                      className="hover:bg-gray-100 border-t"
                    >
                      <TableReuse>{item.orddate || "N/A"}</TableReuse>
                      <TableReuse>{item.consultantname || "N/A"}</TableReuse>
                      <TableReuse>{item.servname || "N/A"}</TableReuse>
                      <TableReuse>{item.remarks || "-"}</TableReuse>
                      <TableReuse>
                        <div className="flex justify-center space-x-2">
                          {/* Actions if needed */}
                        </div>
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

      <div className="flex justify-center">
        <button
          onClick={savebtn}
          disabled={!canSave}
          className={`w-full  px-6 py-2 rounded text-white ${
            !canSave
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
