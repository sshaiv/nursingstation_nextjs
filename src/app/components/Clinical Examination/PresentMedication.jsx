"use client";
import React, { useState } from "react";
import MedicineModal from "../Modal/MedicineModal";
import { ActionButton } from "@/app/common/Buttons";
import TableReuse from "@/app/common/TableReuse";
import { H3 } from "@/app/common/text";
import ReusableTextareaField from "@/app/common/ReusableTextareaField";
import SignaturePadComponent from "@/app/common/SignaturePadComponent";

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

  return (
    <div className=" bg-purple-50 min-h-screen flex justify-center text-[10px] leading-tight overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-4">
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
              onClick={" "}
              //   onClick={handleInsert}
              className="text-xs px-4 py-1"
            />
          </div>
          <div className=" mb-2">
            <ActionButton
              label="Save"
              onClick={" "}
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

        {/* Signature Section */}
        <div className="mt-4 space-y-1">
      <label className="text-xs font-semibold text-gray-700">
        Digital Signature
      </label>

      <div
        className="w-[125px] max-w-sm h-[75px] border border-dashed rounded-md flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50"
        onClick={() => setShowSignatureModal(true)}
      >
        {signatureDataUrl ? (
          <img src={signatureDataUrl} alt="Signature Preview" className="max-h-[90px]" />
        ) : (
          <span className="text-xs text-gray-500">Click to sign</span>
        )}
      </div>

      {/* Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full">
            <div className="flex justify-end items-end  ">
           
              <button
                onClick={() => setShowSignatureModal(false)}
                className="text-red-500  hover:text-gray-700 text-sm"
              >
                ✖ Close
              </button>
            </div>
            <SignaturePadComponent
              onSave={(dataUrl) => setSignatureDataUrl(dataUrl)}
              onClose={() => setShowSignatureModal(false)}
            />
          </div>
        </div>
      )}
    </div>

        <hr className="border-t border-gray-300 mb-0" />
      </div>
    </div>
  );
};

export default PresentMedication;
