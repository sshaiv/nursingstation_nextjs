import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import ReusableInputField from "../common/SmallInputfields";
import DoctorModal from "../common/Modal/DoctorModal";
import InvestigationModal from "../common/Modal/InvestigationModal";
import useSaveInvData from "../hooks/useSaveInvData";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import { getCurrentDateTime, getCurrentDate } from "../utils/dateUtils";
import InvestigationModalDummy from "../common/Modal/InvestigationModalDummy";
import { toast } from "react-toastify";

export default function DummyInvestigation({
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


  const [investigations, setInvestigations] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectServices = ({
    selectedItems,
    selectedIds,
    investigations,
  }) => {
    console.log("SelectedItems:", selectedItems);

    setSelectedServices(selectedItems);
    setSelectedIds(selectedIds);
    setInvestigations(investigations);

    // ✅ Pass selectedItems directly
    handleInsert(selectedItems);

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

  const handleInsert = (services = selectedServices) => {
    setErrors({});

    if (!selectedDate || !doctorData || services.length === 0) {
      const newErrors = {};
      if (!selectedDate) newErrors.dateTime = "Date and time are required.";
      if (!doctorData) newErrors.doctorName = "Please select a doctor.";
      if (services.length === 0)
        newErrors.services = "Please select at least one investigation.";
      setErrors(newErrors);
      return;
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    const currentDateTime = `${day}/${month}/${year} ${formattedTime}`;

    // ✅ Investigation Details
    const jsonStringsubinvreqdetail = services.map((inv, index) => ({
      rowid: 0,
      SNo: index + 1,
      servid: inv.servid || inv.CID || "",
      InvestigationName: inv.servname || inv.CName || "",
      consultantid: doctorData?.CID,
      DoctorName: doctorData?.CName,
      isurgent: 0,
      Urgent: "",
      consenttypeid: 0,
      ConsentType: "",
      isconsenttaken: 0,
      ConsentTaken: "",
      Remove: "",
      reqid: 0,
      invdate: "",
      remarks: remark,
      issampled: 0,
      isresult: 0,
      isverified: 0,
      isunabletoprocess: 0,
      isemg: 0,
      preparationstatusid: 0,
      preparationremarkid: 0,
      reasonfornotpreparation: " ",
      isconsentreq: 0,
      isremove: 0,
      removedatetime: " ",
      isprofile: 0,
      profileservid: 0,
      charge: inv.charge || 0,
      isinactive: 0,
      entempid: inv.entempid || "",
      entdatetime: currentDateTime,
      entwsname: inv.entwsname || "",
      modifyempid: inv.modifyempid || "",
      modifydatetime: currentDateTime,
      modifywsname: inv.modifywsname || "",
      locationid: inv.locationid || "",
      isEdit: 0,
      financialyear: " ",
      servcatgid: inv.servcatgid || "",
      servsubcatgid: inv.servsubcatgid || "",
      deptid: inv.deptid || "",
      subdeptid: inv.subdeptid || "",
      statusid: 0,
      Consultant: " ",
      reqwardcatgid: patientData.reqwardcatgid,
      ispaid: 0,
      Paid: "",
      isrepeat: 0,
      Repeat: "",
      repeatremark: "",
      RepeatRemark: "",
      itemlineid: 1,
      performedbyempid: 0,
      callbyempid: 0,
      callbyremark: "",
      CallByRemark: "",
      postinfinalbill: 0,
      otherConsultantId: doctorData?.CID,
    }));

    // ✅ Billing Info
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

    // ✅ Main Request Info
    const jsonStringsubinvreqmain = [
      {
        rowid: 0,
        reqid: 0,
        gssuhid: patientData.gssuhid,
        visitid: patientData.visitid,
        visittype: "I",
        orddate: currentDateTime,
        isallresultready: 0,
        bedno: patientData.bedno,
        consultantvisitid: 0,
        isremove: 0,
        visitthrough: "VISIT",
        removedatetime: 0,
        isinactive: 0,
        entempid: services[0]?.entempid || " ",
        entdatetime: currentDateTime,
        entwsname: patientData.wsname,
        modifyempid: services[0]?.modifyempid || " ",
        modifydatetime: currentDateTime,
        modifywsname: patientData.wsname,
        locationid: services[0]?.locationid || " ",
        financialyear: " ",
        isprint: 0,
        removeremark: "",
        secondconsultantid: doctorData?.CID,
      },
    ];

    // ✅ Set all to saveData hook
    setSaveData((prevData) => ({
      ...prevData,
      jsonStringsubinvreqdetail: JSON.stringify(jsonStringsubinvreqdetail),
      jsonStringsubpatbilinginfomodel: JSON.stringify(
        jsonStringsubpatbilinginfomodel
      ),
      jsonStringsubinvreqmain: JSON.stringify(jsonStringsubinvreqmain),
    }));

    console.log("📝 Detail JSON:", jsonStringsubinvreqdetail);
    console.log("💳 Billing Info:", jsonStringsubpatbilinginfomodel);
    console.log("📄 Main Info:", jsonStringsubinvreqmain);

    // ✅ Update table and clear form
    const newEntries = services.map((service) => ({
      date: currentDateTime,
      doctorName: doctorData.label || doctorData.CName || "N/A",
      investigation:
        service.InvestigationName ||
        service.servname ||
        service.CName ||
        "Unknown",
      remarks: remark || "",
    }));

    setVitals((prev) => [...prev, ...newEntries]);
    setCanSave(true);
    setSelectedDate(new Date());
    setDoctorData(null);
    setDoctorName("");
    setSelectedServices([]);
    setRemark("");
    //  setInsertedServices((prev) => [...prev, ...services]);
    setInsertedServices((prev) => [
      ...prev,
      ...services.map((s) => ({
        ...s,
        consultantid: doctorData?.CID || "",
        DoctorName: doctorData?.CName || "",
        remarks: remark || "",
        otherConsultantId: doctorData?.CID || "",
      })),
    ]);
  };

  const [insertedServices, setInsertedServices] = useState([]); 

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
       toast.success("Data saved successfully!");

        setIsSaved(true);
        setRefreshData((prev) => !prev);
        // Reset vitals and form data
        setVitals([]);
        // setSaveData({});
        setSelectedDate(null);
        setDoctorData(null);
        setDoctorName("");
        setSelectedServices([]);
        setRemark("");
        setErrors({});
        // Reload data from GET API
        setCanSave(false);
      } else {
        toast.error("Failed to save data: " + result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data: " + error.message);
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

  const handleDeleteEntry = (indexToDelete) => {
    console.log("🗑️ Deleting manual entry at index:", indexToDelete);

    // Log the item being deleted from vitals and insertedServices
    console.log("📦 Entry to delete from vitals:", vitals[indexToDelete]);
    console.log(
      "📦 Entry to delete from insertedServices:",
      insertedServices[indexToDelete]
    );

    // Filter out the deleted entry
    const updatedVitals = vitals.filter((_, i) => i !== indexToDelete);
    const updatedInsertedServices = insertedServices.filter(
      (_, i) => i !== indexToDelete
    );

    // Log updated states
    console.log("✅ Updated vitals (after delete):", updatedVitals);
    console.log(
      "✅ Updated inserted services (after delete):",
      updatedInsertedServices
    );

    // Update the state with filtered data
    setVitals(updatedVitals);
    setInsertedServices(updatedInsertedServices);

    // Format current date and time
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDateTime = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${formattedTime}`;

    // Re-map only remaining inserted services for updated JSON
    const updatedJsonDetail = updatedInsertedServices.map((inv, index) => {
      const detail = {
        rowid: 0,
        SNo: index + 1,
        servid: inv.servid || inv.CID || "",
        InvestigationName: inv.servname || inv.CName || "",
        consultantid: doctorData?.CID,
        DoctorName: doctorData?.CName,
        isurgent: 0,
        Urgent: "",
        consenttypeid: 0,
        ConsentType: "",
        isconsenttaken: 0,
        ConsentTaken: "",
        Remove: "",
        reqid: 0,
        invdate: "",
        remarks: remark,
        issampled: 0,
        isresult: 0,
        isverified: 0,
        isunabletoprocess: 0,
        isemg: 0,
        preparationstatusid: 0,
        preparationremarkid: 0,
        reasonfornotpreparation: " ",
        isconsentreq: 0,
        isremove: 0,
        removedatetime: " ",
        isprofile: 0,
        profileservid: 0,
        charge: inv.charge || 0,
        isinactive: 0,
        entempid: inv.entempid || "",
        entdatetime: currentDateTime,
        entwsname: inv.entwsname || "",
        modifyempid: inv.modifyempid || "",
        modifydatetime: currentDateTime,
        modifywsname: inv.modifywsname || "",
        locationid: inv.locationid || "",
        isEdit: 0,
        financialyear: " ",
        servcatgid: inv.servcatgid || "",
        servsubcatgid: inv.servsubcatgid || "",
        deptid: inv.deptid || "",
        subdeptid: inv.subdeptid || "",
        statusid: 0,
        Consultant: " ",
        reqwardcatgid: patientData.reqwardcatgid,
        ispaid: 0,
        Paid: "",
        isrepeat: 0,
        Repeat: "",
        repeatremark: "",
        RepeatRemark: "",
        itemlineid: 1,
        performedbyempid: 0,
        callbyempid: 0,
        callbyremark: "",
        CallByRemark: "",
        postinfinalbill: 0,
        otherConsultantId: doctorData?.CID,

        consultantid: inv.consultantid || doctorData?.CID || "",
        DoctorName: inv.DoctorName || doctorData?.CName || "",
        remarks: inv.remarks || "",
        otherConsultantId: inv.otherConsultantId || doctorData?.CID || "",
      };

      console.log(`📄 Mapped JSON for item #${index + 1}:`, detail);
      return detail;
    });

    // Update save data with ONLY new entries
    setSaveData((prev) => {
      const newData = {
        ...prev,
        jsonStringsubinvreqdetail: JSON.stringify(updatedJsonDetail),
      };
      console.log(
        "🧾 Updated JSON string being saved:",
        newData.jsonStringsubinvreqdetail
      );
      return newData;
    });

    // Disable Save button if no entries left
    if (updatedInsertedServices.length === 0) {
      console.log("🚫 No remaining manual entries. Disabling Save.");
      setCanSave(false);
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
        <InvestigationModalDummy
          isOpen={showSecondModal}
          onSelect={handleSelectServices}
          onClose={() => setShowSecondModal(false)}
          doctorId={selectedDoctorId}
          patientData={patientData}
          setSaveData={setSaveData}
          setRemark={setRemark}
          remark={remark}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onInsert={handleInsert}
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
        <div className="max-h-[150px] overflow-y-auto scrollbar-hide">
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
             

              {vitals
                .map((v, realIdx) => ({ ...v, originalIndex: realIdx }))
                .reverse()
                .map((v, idx) => (
                  <tr key={"vital-" + idx}>
                    <TableReuse>{v.date}</TableReuse>
                    <TableReuse>{v.doctorName}</TableReuse>
                    <TableReuse>{v.investigation}</TableReuse>
                    <TableReuse>{v.remarks}</TableReuse>
                    <TableReuse>
                      <div className="flex justify-center space-x-2">
                        {v.source !== "api" && (
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteEntry(v.originalIndex)}
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
