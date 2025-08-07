"use client";
import React, { useState, useEffect } from "react";
import MedicineModal from "../Modal/MedicineModal";
import { ActionButton } from "@/app/common/Buttons";
import TableReuse from "@/app/common/TableReuse";
import { H3 } from "@/app/common/text";
import ReusableTextareaField from "@/app/common/ReusableTextareaField";
import SignaturePadComponent from "@/app/common/SignaturePadComponent";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import ClinicalConsent from "./ClinicalConsent";

const PresentMedication = ({
  onSelectDoctor,
  visitid,
  gssuhid,
  empid,
  patientData,
}) => {
  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [route, setRoute] = useState("");
  const [frequency, setFrequency] = useState("");
  const [errors, setErrors] = useState({});
  const [showMedicineNameModal, setShowMedicineNameModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [medicineData, setMedicineData] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [showFullSignature, setShowFullSignature] = useState(false);
  const [informedDr, setInformedDr] = useState("");
  const [rmoName, setRmoName] = useState("");
  const [signatureTime, setSignatureTime] = useState("");

  const handleMedicineSelect = (selected) => {
    console.log("Medicine selected:", selected);
    setMedicineData(selected);
    setMedicineName(selected.CName);
    setShowMedicineNameModal(false);
  };

  const [saveData, setSaveData] = useState({
    //   rowid: 0,
    //   indentid: 0,
    //   indentdatetime: fullDateTime,
    //   indentstoreid: 0,
    //   visitid: patientData?.visitid,
    //   gssuhid: patientData?.gssuhid,
    //   bedno: patientData?.bedno,
    //   isremove: 0,
    //   removedbyempid: 0,
    //   removeremark: " ",
    //   isunabletoprocess: 0,
    //   isinactive: 0,
    //   entempid: patientData?.empid,
    //   entdatetime: fullDateTime,
    //   entwsname:  patientData?.wsname,
    //   modifyempid: patientData?.modifyempid,
    //   modifydatetime: patientData?.modifydatetime,
    //    modifywsname: patientData?.wsname,
    //   locationid: patientData?.locationid,
    //   financialyear: patientData?.financialyear,
    //   priorityid: 0,
    //   indenttypeid: 0,
    //   isreturnindent: isReturn ? 1 : 0,
    //   isclose: 0,
    //   closedbyid: 0,
    //   jsonStringnursingpatipdmedicineindentmainmodel: null,
    //   jsonStringsubnursingpatipdmedicineindentdetailmodel: [],
    //   jsonStringsubpatbilinginfomodel: [],
  });

  useEffect(() => {
    const storedSignature = localStorage.getItem("signatureImage");
    if (storedSignature) {
      setSignatureDataUrl(storedSignature);
    }
  }, []);

  const handleSignatureSave = (signatureImage) => {
    console.log("parent saved:", signatureImage);
  };

  const handleInsert = () => {
    console.log("Insert button clicked");
    g
  }
  return (
    <div className=" bg-gray-50 min-h-screen flex justify-center text-[10px] leading-tight">
      <div className="w-full max-w-5xl mx-auto space-y-4 overflow-auto scrollbar-hide max-h-[400px] px-2">
        <label className="text-xs font-semibold text-gray-700 ">
          Present Ongoing Medication (s)
        </label>

        {/* All Fields in a Single Row */}
        <div className="flex flex-nowrap gap-2 items-end  mt-2">
          {showMedicineNameModal && (
            <MedicineModal
              isOpen={showMedicineNameModal}
              onSelect={handleMedicineSelect}
              onClose={() => setShowMedicineNameModal(false)}
              doctorId={selectedDoctorId}
              patientData={patientData}
              setSaveData={setSaveData}
            />
          )}

          {/* Medicine Name */}
          <div className="flex flex-col min-w-[150px]">
            <label className="text-xs font-serif text-gray-700">
              Medicine *
            </label>
            <input
              type="text"
              value={medicineName}
              readOnly
              onClick={() => setShowMedicineNameModal(true)}
              className={`cursor-pointer text-black border rounded text-xs bg-gray-100 hover:bg-gray-200 focus:outline-none py-1 px-2 ${
                errors.medicineName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select Medicine"
            />
            {errors.medicineName && (
              <p className="text-red-500 mt-0.5">{errors.medicineName}</p>
            )}
          </div>

          {/* Dose, Route, Frequency */}
          {[
            { label: "Dose", value: dose, set: setDose },
            { label: "Route", value: route, set: setRoute },
            { label: "Frequency", value: frequency, set: setFrequency },
          ].map((field) => (
            <div className="flex flex-col min-w-[100px]" key={field.label}>
              <label className="text-xs font-serif text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="border rounded text-black text-[11px] h-[24px] px-[4px] py-[1px]"
              />
            </div>
          ))}

          {/* Yes/No Radio Buttons */}
          <div className="flex flex-col min-w-[120px] mb-2">
            <label className="text-xs font-serif text-gray-700">Continue</label>
            <div className="flex items-center gap-2 text-[11px] text-black">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="ongoing"
                  value="yes"
                  className="accent-purple-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="ongoing"
                  value="no"
                  className="accent-purple-600"
                />
                No
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-2">
            <ActionButton
              label="Insert"
              onClick={handleInsert}
              //   onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
          </div>
          <div className=" mb-2">
            <ActionButton
              label="Save"
              onClick={handleInsert}
              //   onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="max-h-[225px] overflow-y-auto scrollbar-hide">
            <table className="w-full text-[11px] text-center border-collapse">
              <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
                <tr>
                  <TableReuse type="th">Medication Name</TableReuse>
                  <TableReuse type="th">Dose</TableReuse>
                  <TableReuse type="th">Route </TableReuse>
                  <TableReuse type="th">Frequency</TableReuse>
                  <TableReuse type="th">Continue</TableReuse>

                  <TableReuse type="th">Remove</TableReuse>
                </tr>
              </thead>

              <tbody></tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <H3>
            📋 Treatment (To Be Added) At The Time Of Admission / Pre OP
            Instructions
          </H3>
          <ReusableTextareaField
            className="border text-black w-full  text-[10px]"
            id="opinstructions"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label=" "
            value={""}
            onChange={(e) => setPresentingComplaint(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
          {/* Left Side - Inputs */}
          <div className="flex flex-row gap-6 text-[10px]">
            {/* Informed Dr. */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-xs font-sans font-medium mb-1">
                Informed Dr.
              </label>
              <input
                type="text"
                className="border text-black border-gray-600 rounded px-4 py-[4px] w-full"
                value={informedDr}
                onChange={(e) => setInformedDr(e.target.value)}
              />
            </div>

            {/* RMO Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-xs font-sans  font-medium mb-1">
                RMO Name
              </label>
              <input
                type="text"
                className="border text-black border-gray-600 rounded px-4 py-[4px] w-full"
                value={rmoName}
                onChange={(e) => setRmoName(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-xs font-sans  font-medium mb-1">
                Time
              </label>
              <input
                type="time"
                className="border text-black border-gray-600 rounded px-4 py-[4px] w-full"
                value={signatureTime}
                onChange={(e) => setSignatureTime(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side - Signature Box */}
          <div className="mt-0">
            <DigitalSignatureSection onSignatureSave={handleSignatureSave} title="Signature"/>
          </div>
        </div>

        <hr className="border-t border-gray-300 " />
        <ClinicalConsent />
      </div>
    </div>
  );
};

export default PresentMedication;
