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
import ReusableInputField from "../common/SmallInputfields";
import PerformedByModal from "./PerformedByModal";

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
  const [performedByData, setPerformedByData] = useState(null);
  const [showPerformedByModal, setShowPerformedByModal] = useState(false);

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
    setPerformedBy(selected.label || selected.CName || "");
    setShowPerformedByModal(false); // Close the correct modal
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
        newErrors.services = " nursing services is required";
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


      const newEntry = {
      date: currentDateTime,
      bedno: patientData?.bedno || "N/A",
      doctorName: doctorData.label || doctorData.CName || "N/A",
        nursingservice: selectedServices.label || selectedServices.CNAME || "N/A",
     performedBy  :performedByData.label||performedByData.CName|| "",
    
           qty:quantity ||" ",
    
      source: "local",
       
    };
   

   const jsonStringsubpatipdservice =[
        {
            rowid:0,
            gssuhid:patientData.gssuhid,
            visitid:patientData.visitid,
            consltantvisitid:0,
            DateTime:currentDateTime,
            servdatetime:currentDateTime,
            BedNo:patientData.bedno,
            bedno:patientData.bedno,
            Service:selectedServices.CNAME,
            servid:selectedServices.CID,
            consultantid:doctorData.CID,
            Consultant:doctorData.CName,
            PerformedBy:performedByData.CName,
            performbyid:performedByData.CID,
            unitid:0,
            Qty:quantity,
            qty:quantity,
            Charge:0,
            charge:0,
            Remark:" ",
            remark:" ",
            isinactive:0,
            entempid:21,
            entdatetime:patientData.bedno,
            entwsname:"GSLAP2",
            modifyempid:21,
            modifydatetime:patientData.bedno,
            modifywsname:"GSLAP2",
            locationid:patientData.locationid,
            financialyear:"2526",
            Remove:" ",
            isremove:0,
            RemoveRemark:" ",
            removeremark: " ",
            isedit:0,
            count:2,
            wardcatgid:patientData.reqwardcatgid,
            },
            ];


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

    // Save all data
    setSaveData((prevData) => ({
      ...prevData,
     jsonStringsubpatipdservice: JSON.stringify(jsonStringsubpatipdservice),
       jsonStringsubpatbilinginfomodel: JSON.stringify(
         jsonStringsubpatbilinginfomodel
       ),
    }));

    console.log(
      "jsonStringdoctorvisit:",
      jsonStringsubpatipdservice,
      jsonStringsubpatbilinginfomodel
    );
  
    setVitals((prev) => [...prev, newEntry]); 

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
      .get(`${API_ENDPOINTS.getServiceDetail}/?visitid=${visitid}&gssuhid=${gssuhid}`)
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
             <label  className="text-sm text-black font-medium mb-1">
              Doctor *
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
          <div className="flex flex-col w-full">
             <label  className="text-sm text-black font-medium mb-1">
              Nursing service *
            </label>
            <input
              type="text"
              readOnly
              value={investigationName}
              onClick={() => setShowSecondModal(false)}
              className={`cursor-pointer text-black border px-2 py-1  rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none ${
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

          {/*  Performed By */}

          <div className="flex flex-col w-full">
            <label className="text-sm text-black font-medium mb-1">
              PerformedBy
            </label>
            <input
              id="performedBy"
              type="text"
              value={performedBy}
              readOnly
              onClick={() => setShowPerformedByModal(true)} // Correct modal trigger
              className="px-2 py-1 text-sm border-2 rounded-lg border-gray-300 cursor-pointer bg-gray-100 hover:bg-gray-200 focus:outline-none"
              placeholder="Select PerformedBy"
            />
          </div>

          <ReusableInputField
            className="border-2 text-black rounded-lg"
            id="qty"
            label="Quantity*"
            width="w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center w-full gap-4">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-4 py-1"
          />
          <ActionButton label="Posted Data" className="text-xs px-4 py-1" />
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
              {/* Render newly inserted vitals at the top */}
               {[...vitals].reverse().map((v, idx) => (
                <tr key={"vital-" + idx} className="hover:bg-gray-100 border-t">
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
        <SaveButton label="Save" onClick={savebtn} />
      </div>
    </div>
  );
}
