import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";

import DoctorModal from "./Modal/DoctorModal";

import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import NursingServiceModal from "./NursingServiceModal";
import useSaveNSData from "../hooks/useSaveNSData";
import ReusableInputField from "../common/SmallInputfields";
import PerformedByModal from "./Modal/PerformedByModal";

import {
  getCurrentDate,
  getCurrentDateTime,
  getgetCurrentDateTime,
} from "../utils/dateUtils";

export default function NursingServices({
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
  const [investigationName, setInvestigationName] = useState("");
  const [investigationID, setInvestigationID] = useState("");
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [performedBy, setPerformedBy] = useState("");
  const [quantity, setQuantity] = useState("");
  const [performedByData, setPerformedByData] = useState(null);
  const [showPerformedByModal, setShowPerformedByModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  // This is the key state to hold multiple service entries
  const [serviceEntries, setServiceEntries] = useState([]);
  const [entries, setEntries] = useState([]); // Grid data
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

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

  const handleSelectPerformedBy = (selected) => {
    console.log("PerformedBy selected:", selected);
    setPerformedByData(selected);
    setPerformedBy(selected.CName);
    // console.log("spb",performedBy.CName);

    setShowPerformedByModal(false);
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

    if (
      !selectedDate ||
      !doctorData ||
      selectedServices.length === 0 ||
      !performedByData ||
      !quantity
    ) {
      const newErrors = {};

      if (!selectedDate) newErrors.dateTime = "Date and time are required.";
      if (!doctorData) newErrors.doctorName = "Please select a doctor.";
      if (selectedServices.length === 0)
        newErrors.services = "Nursing services is required.";
      if (!performedByData) newErrors.performedBy = "Performed By is required.";
      if (!quantity) newErrors.qty = "Quantity is required.";

      setErrors(newErrors);
      return;
    }

    const newEntry = {
      date: fullDateTime,

      bedno: patientData?.bedno || "N/A",
      doctorName: doctorData?.label || doctorData?.CName || "N/A",
      nursingservice:
        selectedServices?.label || selectedServices?.CNAME || "N/A",
      performedBy: performedByData?.label || performedByData?.CName || "",
      qty: quantity || " ",
      source: "local",
    };

    console.log("aai", newEntry.date);

    const newServiceEntry = {
      rowid: 0,
      gssuhid: patientData.gssuhid,
      visitid: patientData.visitid,
      consltantvisitid: 0,
      DateTime: fullDateTime,
      servdatetime: CurrentDate,
      BedNo: patientData.bedno,
      bedno: patientData.bedno,
      Service: selectedServices.CNAME,
      servid: selectedServices.CID,
      consultantid: doctorData.CID,
      Consultant: doctorData.CName,
      PerformedBy: performedByData.CName,
      performbyid: performedByData.CID,
      unitid: 0,
      Qty: quantity,
      qty: quantity,
      Charge: 0,
      charge: 0,
      Remark: " ",
      remark: " ",
      isinactive: 0,
      entempid: 21,
      entdatetime: patientData.bedno,
      entwsname: "GSLAP2",
      modifyempid: 21,
      modifydatetime: patientData.bedno,
      modifywsname: "GSLAP2",
      locationid: patientData.locationid,
      financialyear: "2526",
      Remove: " ",
      isremove: 0,
      RemoveRemark: " ",
      removeremark: " ",
      isedit: 0,
      count: 2,
      wardcatgid: patientData.reqwardcatgid,
    };

    // Add new entry to the list
    setServiceEntries((prev) => [...prev, newServiceEntry]);

    const jsonStringsubpatbilinginfomodel = [
      {
        visitid: patientData.visitid,
        gssuhid: patientData.gssuhid,
        reqwardcatgid: patientData.reqwardcatgid,
        allotedcatg: patientData.wardcatgid,
        bedno: patientData.bedno,
        admissiontypeid: patientData.admissiontypeid,
        corporateid: patientData.corporateid,
        billinggroupid: patientData.billgrpid,
        terriffid: patientData.terriffid,
      },
    ];

    const updatedEntries = [...serviceEntries, newServiceEntry];
    setServiceEntries(updatedEntries);

    // Save all data
    setSaveData((prevData) => ({
      ...prevData,
      jsonStringsubpatipdservice: JSON.stringify(updatedEntries),
      jsonStringsubpatbilinginfomodel: JSON.stringify(
        jsonStringsubpatbilinginfomodel
      ),
    }));

    console.log(
      "jsonStringdoctorvisit:",
      updatedEntries,
      jsonStringsubpatbilinginfomodel
    );

    setVitals((prev) => [...prev, newEntry]);
    setEntries((prev) => [...prev, newEntry]);

    // ✅ Enable Save button
    setIsSaveEnabled(true);

    setSelectedDate(null);
    setDoctorData(null);
    setDoctorName(""); // clear doctor name string
    setSelectedServices([]); // assuming this is the array holding services info
    setInvestigationName(""); // clear nursing service name string
    setPerformedByData(null);
    setPerformedBy(""); // clear performedBy string
    setQuantity(""); // clear quantity
    setTime(""); // clear time if you are managing time separately
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(
        API_ENDPOINTS.savePatNursingService,

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
        // Clear local new entries (already saved)
        // Clear the new entries so UI updates and doesn't show them anymore
        setEntries([]);
        setVitals([]);

        // Clear form input fields here if needed
        setSelectedDate(null);
        setTime("");
        setDoctorData(null);
        setDoctorName("");
        setSelectedServices([]);
        setInvestigationName("");
        setPerformedByData(null);
        setPerformedBy("");
        setQuantity("");

        // Trigger refresh to fetch updated data from backend
        setRefreshData((prev) => !prev);

        setIsSaved(true);
        setIsSaveEnabled(false);
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
      .get(
        `${API_ENDPOINTS.getServiceDetail}/?visitid=${visitid}&gssuhid=${gssuhid}`
      )
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
            //     item.servname || "-"
            //   },
            //   consultantname: ${item.consultantname || "-"},
            //   datetime: ${item.orddate || "-"},
            //    remarks: ${
            //     item.remarks || "-"
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

  const handleDeleteEntry = (indexToDelete) => {
    console.log("🗑️ Deleting Entry at Index:", indexToDelete);
    console.log("📦 Entry Being Deleted:", serviceEntries[indexToDelete]);

    const updatedVitals = vitals.filter((_, i) => i !== indexToDelete);
    const updatedEntries = entries.filter((_, i) => i !== indexToDelete);

    setVitals(updatedVitals);
    setEntries(updatedEntries);

    const updatedServiceEntries = serviceEntries.filter(
      (_, i) => i !== indexToDelete
    );
    setServiceEntries(updatedServiceEntries);

    const newJSONString = JSON.stringify(updatedServiceEntries);
    setSaveData((prevData) => ({
      ...prevData,
      jsonStringsubpatipdservice: newJSONString,
    }));

    if (updatedServiceEntries.length === 0) {
      setIsSaveEnabled(false);
    }

    console.log("✅ Updated Vitals:", updatedVitals);
    console.log("✅ Updated Entries:", updatedEntries);
    console.log("✅ Updated Service Entries:", updatedServiceEntries);
    console.log("🧾 Updated JSON String:", newJSONString);
  };

  return (
    <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
      <div className="flex h-[1px] items-center justify-center">
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

      {showPerformedByModal && (
        <PerformedByModal
          isOpen={showPerformedByModal}
          onSelect={handleSelectPerformedBy}
          onClose={() => setShowPerformedByModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
        />
      )}

      <div className="border border-gray-100 rounded-lg space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 items-start">
         
          {/* Date & Time */}
          <div className="flex flex-col  w-full ">
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
          <div className="flex flex-col  w-full">
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

          {/* Nursing Service */}
          <div className="flex flex-col  w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Nursing service *
            </label>
            <input
              type="text"
              readOnly
              value={investigationName}
              onClick={() => setShowSecondModal(false)}
              className={`text-sm text-black px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none cursor-pointer ${
                errors.services ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select services"
            />
            {errors.services && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.services}
              </p>
            )}
          </div>

          {/* Performed By */}
          <div className="flex flex-col  w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Performed By
            </label>
            <input
              id="performedBy"
              type="text"
              value={performedBy}
              readOnly
              onClick={() => setShowPerformedByModal(true)}
              className={`text-sm text-black px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none cursor-pointer ${
                errors.performedBy ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select PerformedBy"
            />
            {errors.performedBy && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.performedBy}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col  ">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Quantity *
            </label>
            <ReusableInputField
              className={`text-xs  text-black px-2 py-1 border rounded-md focus:outline-none ${
                errors.qty ? "border-red-500" : "border-gray-300"
              }`}
              id="qty"
              label=""
              width="w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.qty && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.qty}
              </p>
            )}
          </div>
          <div className="flex items-center w-full mt-5">
            <ActionButton
              label="Insert"
              onClick={handleInsert}
              className="text-xs px-4 py-1 w-fit "
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
                <TableReuse type="th">Nursing Service</TableReuse>
                <TableReuse type="th">Performed By</TableReuse>
                <TableReuse type="th">Quantity</TableReuse>

                <TableReuse type="th">Actions</TableReuse>
              </tr>
            </thead>
            <tbody>
              {[...vitals].reverse().map((v, idx) => {
                const actualIndex = vitals.length - 1 - idx;

                return (
                  <tr
                    key={"vital-" + idx}
                    className="hover:bg-gray-100 border-t"
                  >
                    <TableReuse>{v.date}</TableReuse>
                    <TableReuse>{v.bedno}</TableReuse>
                    <TableReuse>{v.doctorName}</TableReuse>
                    <TableReuse>{v.nursingservice}</TableReuse>
                    <TableReuse>{v.performedBy}</TableReuse>
                    <TableReuse>{v.qty}</TableReuse>

                    <TableReuse>
                      <div className="flex justify-center space-x-2">
                        {v.source !== "api" && (
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteEntry(actualIndex)}
                          >
                            🗑 Delete
                          </button>

                          // Or if you prefer the icon version:
                          // <ActionButton
                          //   icon="delete"
                          //   onClick={() => handleDeleteEntry(actualIndex)}
                          //   tooltip="Delete"
                          // />
                        )}
                      </div>
                    </TableReuse>
                  </tr>
                );
              })}

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
                  {[...table].reverse().map((item, idx) => (
                    <tr
                      key={"api-" + idx}
                      className="hover:bg-gray-100 border-t"
                    >
                      <TableReuse>{item.servdatetime || "-"}</TableReuse>
                      <TableReuse>{item.bedno || "-"}</TableReuse>
                      <TableReuse>{item.proposedby || "-"}</TableReuse>
                      <TableReuse>{item.servname || "-"}</TableReuse>
                      <TableReuse>{item.performby || "-"}</TableReuse>
                      <TableReuse>{item.qty || "-"}</TableReuse>

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
        {/* <SaveButton label="Save" onClick={savebtn} /> */}

        <button
          onClick={savebtn}
          disabled={!isSaveEnabled}
          className={`w-full  px-6 py-2 rounded text-white ${
            !isSaveEnabled
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
