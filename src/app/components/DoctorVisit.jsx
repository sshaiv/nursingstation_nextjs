import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import ReusableInputField from "../common/SmallInputfields";
import DVDoctorModal from "./DVDoctorModal";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import useSaveDVData from "../hooks/useSaveDVData";
import DoctorModal from "./DoctorModal";

export default function DoctorVisit({ visitid, gssuhid, empid, patientData }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDoctorModalOpen, setDoctorModalOpen] = useState(true);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [vitals, setVitals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const [doctorName, setDoctorName] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isInsertClicked, setIsInsertClicked] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [isValidToSave, setIsValidToSave] = useState(false);

  const [saveData, setSaveData] = useSaveDVData();
  console.log("Updated DV", saveData);

  const handleSelectDoctor = (doctor) => {
    console.log("Doctor in inv:", doctor);

    let selectedDoc = doctor;
    if (typeof doctor === "string") {
      selectedDoc = doctorOptions.find((doc) => doc.value === doctor);
    }
    if (selectedDoc) {
      setDoctorData(selectedDoc);
      setDoctorName(selectedDoc.label || selectedDoc.CName);
    }
    setSelectedDoctorId(selectedDoc?.value || doctor);
    setDoctorModalOpen(false);
  };

  const handleInsert = () => {
    setIsInsertClicked(true);

    setErrors({});
    if (!selectedDate || !doctorData) {
      const newErrors = {};
      if (!selectedDate) newErrors.dateTime = "Date and time are required.";
      if (!doctorData) newErrors.doctorName = "Please select a doctor.";
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
      doctorName: doctorData.label || doctorData.CName || "N/A",
      remarks: remark || "",
      bedno: patientData?.bedno || "N/A",
      emergency: isEmergency ? 1 : 0,
      qty: 1,
      investigation: "",
      source: "local",
    };
    const newErrors = {};
    if (!selectedDate) newErrors.dateTime = "Date and time are required.";
    if (!doctorData) newErrors.doctorName = "Please select a doctor.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsValidToSave(false); // ❌ not valid to save
      return;
    }

    setIsValidToSave(true); // ✅ all good, enable save

    // Single main request info (outside loop)
    const jsonStringdoctorvisit = [
      {
        rowid: 0,
        consultantvisitid: 0,
        gssuhid: patientData?.gssuhid,
        visitid: patientData?.visitid,
        SNo: 1,
        visitdate: currentDateTime,
        Date: currentDateTime,
        visittime: currentDateTime,
        Time: currentDateTime,
        visitdatetime: currentDateTime,
        visitthrough: "VISIT",
        visittypeid: 0,
        Bedno: patientData?.bedno,
        BedNo: patientData?.bedno,
        consultantid: doctorData.CID,
        DoctorName: doctorData.CName,
        qty: 1,
        Quantity: 1,
        wardcatgid: patientData.reqwardcatgid,
        isemergency: isEmergency ? 1 : 0,
        Emergency: isEmergency ? 1 : 0,
        remark: remark,
        Remark: remark,
        Remove: 0,
        isremove: 0,
        removedatetime: currentDateTime,
        isverified: 0,
        verificationdatetime: currentDateTime,
        verifiedbyid: 0,
        verificationremark: " ",
        callbyempid: 0,
        isinactive: 0,
        entempid: 21,
        entdatetime: currentDateTime,
        entwsname: "GSLAP2",
        modifyempid: 21,
        modifydatetime: currentDateTime,
        modifywsname: "GSLAP2",
        locationid: 1,
        financialyear: "2526",
        IsEdit: 0,
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
      jsonStringdoctorvisit: JSON.stringify(jsonStringdoctorvisit),
      jsonStringsubpatbilinginfomodel: JSON.stringify(
        jsonStringsubpatbilinginfomodel
      ),
    }));

    console.log(
      "jsonStringdoctorvisit:",
      jsonStringdoctorvisit,
      jsonStringsubpatbilinginfomodel
    );
    // console.log("jsonStringsubpatbilinginfomodel:", jsonStringsubpatbilinginfomodel);

    setVitals((prev) => [...prev, newEntry]);

    setRemark("");
    setIsEmergency(false);
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(API_ENDPOINTS.savePatDoctorVisit, {
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
        setRefreshData((prev) => !prev);
        // 🔁 Reset entries and form fields
        setVitals([]);
        setSaveData({});
        setRemark("");
        setIsEmergency(false);
        setDoctorData(null);
        setSelectedDate(null);
        setErrors({});
        setIsInsertClicked(false);
        setDoctorName("");
        setIsValidToSave(false)

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
      .get(`${API_ENDPOINTS.getPatDoctorHistory}/?visitid=${visitid}`)
      .then((res) => {
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

        if (Array.isArray(parsedData)) {
          // The response is already an array, use it directly
          setTable(parsedData);
        } else if (parsedData && Array.isArray(parsedData.Table)) {
          // If there is a Table property, use that
          setTable(parsedData.Table);
        } else {
          console.warn("Parsed data format unexpected:", parsedData);
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
        <ModalHeading title="Doctor Visit" />
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

      <div className="border border-gray-100 rounded-lg space-y-4">
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-5 items-end">
          {/* Date & Time */}
          <div className="flex flex-col w-full">
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
              label="Date & Time"
            />
            {errors.dateTime && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px] col-span-full">
                {errors.dateTime}
              </p>
            )}
          </div>

          {/* Doctor Selection */}
          <div className="flex flex-col w-full">
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`cursor-pointer border px-2 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none ${
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

          {/* Remarks */}
          <ReusableInputField
            className="border-2 rounded-lg"
            id="remarks"
            label="Remarks"
            width="w-full"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          {/* Bed No */}
          <ReusableInputField
            className="border-2 rounded-lg read-only:"
            id="bedNo"
            label="Bed no"
            width="w-full"
            value={patientData?.bedno}
            onChange={(e) => setBedNo(e.target.value)}
          />

          {/* Emergency Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="emergency"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="emergency" className="text-sm">
              Emergency
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 col-span-full">
            <ActionButton
              label="Insert"
              onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
            <ActionButton label="Posted Data" className="text-xs px-4 py-1" />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="max-h-[225px] overflow-y-auto scrollbar-hide">
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                <TableReuse type="th">Visit Date/Time</TableReuse>
                <TableReuse type="th">Bed No</TableReuse>
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Qty.</TableReuse>
                <TableReuse type="th">Emergency</TableReuse>
                <TableReuse type="th">Remark</TableReuse>
                <TableReuse type="th">Remove</TableReuse>
              </tr>
            </thead>

            <tbody>
              {/* Render newly inserted vitals at the top */}
              {[...vitals].reverse().map((v, idx) => (
                <tr key={"vital-" + idx} className="hover:bg-gray-100 border-t">
                  <TableReuse>{v.date}</TableReuse>
                  <TableReuse>{v.bedno}</TableReuse>
                  <TableReuse>{v.doctorName}</TableReuse>
                  <TableReuse>{v.qty}</TableReuse>
                  <TableReuse>{v.emergency}</TableReuse>
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

              {/* API fetched data */}
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : table && table.length > 0 ? (
                [...table].reverse().map((row, idx) => (
                  <tr key={"api-" + idx} className="hover:bg-gray-50 border-t">
                    <TableReuse>{row.visitdatetime || "-"}</TableReuse>
                    <TableReuse>{row.bedno || "-"}</TableReuse>
                    <TableReuse>{row.consultantname || "-"}</TableReuse>
                    <TableReuse>{row.qty || "-"}</TableReuse>
                    <TableReuse>
                      {row.isemergency != null
                        ? String(row.isemergency ? 1 : 0)
                        : "-"}
                    </TableReuse>

                    <TableReuse>{row.remark || "-"}</TableReuse>
                    <TableReuse>-</TableReuse>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={savebtn}
          disabled={!isValidToSave}
          className={`w-full  px-6 py-2 rounded text-white ${
            !isValidToSave
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
