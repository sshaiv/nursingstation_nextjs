import React, { useEffect, useState } from "react";

import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import ReusableInputField from "../common/SmallInputfields";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";

import DoctorModal from "../common/Modal/DoctorModal";
import Select from "react-select";
import useSaveMIData from "../hooks/useSaveMIData";

import MedicineModal from "../common/Modal/MedicineModal";
import { getCurrentDate, getCurrentDateTime } from "../utils/dateUtils";

export default function MedicineIndent({
  onSelectDoctor,
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
  const CurrentDate = getCurrentDate();
  const fullDateTime = getCurrentDateTime();

  const [isSaved, setIsSaved] = useState(false);
  const [isDoctorModalOpen, setDoctorModalOpen] = useState(true);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [vitals, setVitals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const [doctorName, setDoctorName] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [isReturn, setIsReturn] = useState(false);
  const [isInsertClicked, setIsInsertClicked] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [isValidToSave, setIsValidToSave] = useState(false);
  const [serviceEntries, setServiceEntries] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showMedicineNameModal, setShowMedicineNameModal] = useState(false);

  const [medicineName, setMedicineName] = useState(""); 
  const [medicineData, setMedicineData] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

  const handleSelectMedicineName = (selected) => {
    console.log("Medicine selected:", selected);
    setMedicineData(selected);
    setMedicineName(selected.CName);
    setShowMedicineNameModal(false);
  };

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

  const [saveData, setSaveData] = useState({
    rowid: 0,
    indentid: 0,
    indentdatetime: fullDateTime,
    indentstoreid: 0,
    visitid: patientData?.visitid,
    gssuhid: patientData?.gssuhid,
    bedno: patientData?.bedno,
    isremove: 0,
    removedbyempid: 0,
    removeremark: " ",
    isunabletoprocess: 0,
    isinactive: 0,
    entempid: patientData?.empid,
    entdatetime: fullDateTime,
    entwsname:  patientData?.wsname,
    modifyempid: patientData?.modifyempid,
    modifydatetime: patientData?.modifydatetime,
     modifywsname: patientData?.wsname,
    locationid: patientData?.locationid,
    financialyear: patientData?.financialyear,
    priorityid: 0,
    indenttypeid: 0,
    isreturnindent: isReturn ? 1 : 0,
    isclose: 0,
    closedbyid: 0,
    jsonStringnursingpatipdmedicineindentmainmodel: null,
    jsonStringsubnursingpatipdmedicineindentdetailmodel: [],
    jsonStringsubpatbilinginfomodel: [],
  });
 // console.log("update indent", saveData);

  const handleInsert = () => {
    setIsInsertClicked(true);
    setErrors({});
    if (!selectedDate || !doctorData || !medicineData) {
      const newErrors = {};
      if (!selectedDate) newErrors.dateTime = "Date and time are required.";
      if (!doctorData) newErrors.doctorName = "Please select a doctor.";
      if (!medicineData) newErrors.medicineName = "Please select a medicine.";
      setErrors(newErrors);
      return;
    }

    const currentDateTime = getCurrentDateTime();

    const newEntry = {
      date: currentDateTime,
      doctorName: doctorData.label || doctorData.CName || "N/A",
      medicineName: medicineData.CName || "N/A",
      qty: qty || 1,
      return: isReturn ? 1 : 0,
      source: "local",
      indentid: selectedIndentType?.value || 0,
    };
   // console.log("new", newEntry);

    const newServiceEntry = {
      rowid: 0,
      indentid: selectedIndentType?.value || 0,
      visitid: patientData?.visitid,
      gssuhid: patientData?.gssuhid,
      consultantid: doctorData.CID,
      consultantvisitid: 0,
      MedicineName: medicineData.CName || "N/A",
      itemid: medicineData.CID || "N/A",
      Dose: 0,
      Frequency: 0,
      Route: 0,
      Quantity: " ",
      qty: qty||0,
      Remove: " ",
      isremove: 0,
      removedbyempid: 0,
      Remark: " ",
      removeremark: " ",
      isunabletoprocess: 0,
      isinactive: 0,
      entempid: patientData?.empid,
      entdatetime: patientData?.entdatetime,
      entwsname: patientData?.wsname,
      modifyempid: patientData?.modifyempid,
      modifydatetime: patientData?.modifydatetime,
      modifywsname: patientData?.wsname,
      locationid: patientData?.locationid,
      financialyear: patientData?.financialyear,
      isEdit: 1,
      Delete: 0,
    };
    const updatedEntries = [...serviceEntries, newServiceEntry];

    const jsonStringsubpatbilinginfomodel = [
      {
        visitid: patientData?.visitid,
        gssuhid: patientData?.gssuhid,
        reqwardcatgid: patientData?.reqwardcatgid,
        allotedcatg: patientData?.wardcatgid,
        bedno: patientData?.bedno,
        admissiontypeid: patientData?.admissiontypeid,
      },
    ];
    setSaveData((prevData) => ({
      ...prevData,
      isreturnindent: isReturn ? 1 : 0,
      // indenttypeid: selectedIndentType?.value || 0,     
      
      jsonStringsubnursingpatipdmedicineindentdetailmodel:
        JSON.stringify(updatedEntries),
      jsonStringsubpatbilinginfomodel: JSON.stringify(
        jsonStringsubpatbilinginfomodel
      ),
    }));

    console.log(
      "jsonStringsubnursingpatipdmedicineindentdetailmodel:",
      updatedEntries
    );
    console.log("Billing Info:", jsonStringsubpatbilinginfomodel);

    setServiceEntries(updatedEntries);
    setVitals((prev) => [...prev, newEntry]);

    // Set isValidToSave to true after a successful insert
    setIsValidToSave(true);

    // Resetting fields
    setQty(1);
  //  setDoctorName("");
  //  setDoctorData(null);
    setMedicineName(""); // Reset medicineName
    setMedicineData(null); // Reset medicineData
    setIsReturn(false);
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(
        API_ENDPOINTS.savePatNursingMedicineIndentData,
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
          setToastMessage("✅ Data saved successfully!");
      setTimeout(() => setToastMessage(""), 2000);
       // alert("Data saved successfully!");
        setRefreshData((prev) => !prev);
        setVitals([]);
        // setSaveData({});
        setQty(1);
        setIsReturn(false);
        setDoctorData(null);
        setMedicineName(""); // Reset medicineName
        setSelectedDate(null);
        setErrors({});
        setIsInsertClicked(false);
        setDoctorName("");
        setIsValidToSave(false);

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
      .get(`${API_ENDPOINTS.getPrescriptionDetail}/?visitid=${visitid}`)
      .then((res) => {
        let parsedData = [];
        try {
          if (typeof res.data === "string") {
            parsedData = JSON.parse(res.data);
            // console.log("1",parsedData);
          } else if (
            typeof res.data === "object" &&
            typeof res.data.data === "string"
          ) {
            parsedData = JSON.parse(res.data.data);
            // console.log("2",parsedData);
          } else {
            parsedData = res.data;
            //  console.log("3",parsedData);
          }
        } catch (err) {
          console.error("Error parsing investigations JSON:", err);
          parsedData = [];
        }

        if (Array.isArray(parsedData)) {
          setTable(parsedData);
        } else if (parsedData && Array.isArray(parsedData.Table1)) {
          setTable(parsedData.Table1);
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

  const handleDeleteEntry = (indexToDelete) => {
    // console.log("🗑️ Deleting Entry at Index:", indexToDelete);
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
      jsonStringsubnursingpatipdmedicineindentdetailmodel: newJSONString,
    }));

    if (updatedServiceEntries.length === 0) {
      setIsSaveEnabled(false);
    }

    // console.log("✅ Updated Vitals:", updatedVitals);
    // console.log("✅ Updated Entries:", updatedEntries);
    console.log("✅ Updated Service Entries:", updatedServiceEntries);
    // console.log("🧾 Updated JSON String:", newJSONString);
  };

  useEffect(() => {
    const fetchIndentTypeData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const parsedData = JSON.parse(response.data); // Assuming it's a JSON string
        const data = parsedData.Table1; // Table1 contains the CID and CNAME
        if (data && Array.isArray(data)) setIndentTypeData(data);
      } catch (error) {
        console.error("Error fetching indent type data:", error);
      }
    };
    fetchIndentTypeData();
  }, []);

  const [indentTypeData, setIndentTypeData] = useState([]);
  const [selectedIndentType, setSelectedIndentType] = useState(null);


  const indentTypeOptions = indentTypeData.map((item) => ({
    value: item.CID,
    label: item.CNAME,
  }));

  return (
    <div className="p-2 rounded-xl w-full max-w-8xl mx-auto text-[12px] space-y-6">
       {toastMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-6 py-3 rounded-md shadow-lg z-50 animate-slide-fade">
          {toastMessage}
        </div>
      )}
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

      {showMedicineNameModal && (
        <MedicineModal
          isOpen={showMedicineNameModal}
          onSelect={handleSelectMedicineName}
          onClose={() => setShowMedicineNameModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
        />
      )}

      <div className="border border-gray-100 rounded-lg p-2  text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 items-end">
          {/* Date & Time */}
          <div className="flex flex-col w-full">
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
              label="Date & Time"
              inputClassName="py-1 px-2 text-xs"
              labelClassName="text-xs font-semibold mb-1"
            />
            {errors.dateTime && (
              <p className="text-red-500 mt-0.5">{errors.dateTime}</p>
            )}
          </div>

          {/* Doctor Selection */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Doctor *</label>
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`cursor-pointer text-black border rounded text-xs bg-gray-100 hover:bg-gray-200 focus:outline-none py-1 px-2 ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select doctor"
            />
            {errors.doctorName && (
              <p className="text-red-500 mt-0.5">{errors.doctorName}</p>
            )}
          </div>

          {/* Indent Type */}
           <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Indent Type *</label>
          <Select
            options={indentTypeOptions}
            onChange={(selectedOption) => {
              setSelectedIndentType(selectedOption); 
              if (onSelectDoctor && selectedOption) {
                onSelectDoctor({
                  CID: selectedOption.value,
                  CName: selectedOption.label,
                });
              }
            }}
            placeholder="Select Indent Type"
            className="text-xs"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 24,
                height: 24,
                padding: 0,
                fontSize: 11,
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 6px",
                height: 24,
                fontSize: 11,
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: 24,
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
                fontSize: 11,
              }),
              placeholder: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
                fontSize: 11,
                lineHeight: "24px",
              }),
              singleValue: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
                fontSize: 11,
                lineHeight: "24px",
              }),
              menu: (base) => ({
                ...base,
                fontSize: 11,
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                fontSize: 10,
                padding: "2px 6px",
                backgroundColor: isFocused ? "#e2e8f0" : "white",
                color: isSelected ? "#1d4ed8" : "#374151",
                cursor: "pointer",
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "100px",
                overflowY: "auto",
              }),
            }}
            value={selectedIndentType}
          /></div>

          {/* Medicine Name */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">
              Medicine *
            </label>
            <input
              type="text"
              value={medicineName}
              readOnly
              onClick={() => setShowMedicineNameModal(true)}
              className={`cursor-pointer text-black  border rounded text-xs bg-gray-100 hover:bg-gray-200 focus:outline-none py-1 px-2 ${
                errors.medicineName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select Medicine"
            />
            {errors.medicineName && (
              <p className="text-red-500 mt-0.5">{errors.medicineName}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full">
            <div className="flex flex-col w-1/2">
              <label className="text-xs font-serif text-gray-700">Qty</label>
              <input
                id="qty"
                type="text"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border-gray-200 text-black  border rounded py-1 px-2 text-xs w-full"
                placeholder="Qty"
              />
            </div>
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                id="return"
                checked={isReturn}
                onChange={(e) => setIsReturn(e.target.checked)}
                className="w-4 h-4"
              />

              <label className="text-xs font-serif text-gray-700">Return</label>
            </div>
          </div>
        </div>

        <div className="flex mt-1 justify-end gap-2 ">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-3 py-1"
          />
          <ActionButton label="Posted Data" className="text-xs px-3 py-1" />
        </div>
      </div>

      <div className="border border-gray-200  rounded-sm overflow-hidden shadow-sm">
        <div className="max-h-[125px] overflow-y-auto hide-scrollbar">
          <table className="w-full text-[6px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                <TableReuse type="th">Date</TableReuse>
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Medicine Name</TableReuse>
                <TableReuse type="th">Qty.</TableReuse>
                <TableReuse type="th">Return</TableReuse>
                <TableReuse type="th">Remove</TableReuse>
              </tr>
            </thead>

            <tbody>
              {/* New vitals */}
              {[...vitals].reverse().map((v, idx) => {
                const actualIndex = vitals.length - 1 - idx;

                return (
                  <tr
                    key={"vital-" + idx}
                    className="hover:bg-gray-100 border-t"
                  >
                    <TableReuse>{v.date}</TableReuse>
                    <TableReuse>{v.doctorName}</TableReuse>
                    <TableReuse>{v.medicineName}</TableReuse>
                    <TableReuse>{v.qty}</TableReuse>
                    <TableReuse>{v.return}</TableReuse>
                    <TableReuse>
                      <div className="flex justify-center space-x-2">
                        {v.source !== "api" && (
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteEntry(actualIndex)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </TableReuse>
                  </tr>
                );
              })}

              {/* API fetched data */}
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : table && table.length > 0 ? (
                [...table].map((row, idx) => (
                  <tr key={"api-" + idx} className="hover:bg-gray-50 border-t">
                    <TableReuse>{row.entdatetime || "-"}</TableReuse>
                    <TableReuse>{row.consultant || "-"}</TableReuse>
                    <TableReuse>{row.itemname || "-"}</TableReuse>
                    <TableReuse>{row.qty || "-"}</TableReuse>
                    <TableReuse>
                      {row.isreturnindent != null
                        ? String(row.isreturnindent ? 1 : 0)
                        : "-"}
                    </TableReuse>
                    <TableReuse>-</TableReuse>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex ">
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
