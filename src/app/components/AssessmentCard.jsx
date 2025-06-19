

 "use client";

import { useState, useEffect } from "react";
import { MainHeadings } from "../common/text";
import { ActionButton } from "../common/Buttons";
import { getCurrentDateTime } from "../utils/dateUtils"; // Assume it returns "dd/mm/yyyy hh:mm:ss"
import ReusableTextareaField from "../common/ReusableTextareaField";

export default function AssessmentCard({
  title,
  icons,
  patientData,
  otherPatientData,
}) {
  const [inputValue, setInputValue] = useState("");


  
  useEffect(() => {
  const data = Array.isArray(otherPatientData) ? otherPatientData[0] : otherPatientData;

  if (title === "Chief Complaints" && data?.chiefcomplaint) {
    setInputValue(data.chiefcomplaint);
  } else if (title === "Diagnosis" && data?.diagnosis) {
    setInputValue(data.diagnosis);
  }
}, [title, otherPatientData]);


  const saveData = async () => {
    if (!patientData || !inputValue.trim()) {
      alert("Missing patient data or empty field");
      return;
    }

    let apiUrl;
    let payload;

    const currentDateTime = getCurrentDateTime(); // call the function, not just reference it

    if (title === "Chief Complaints") {
      apiUrl = "https://doctorapi.medonext.com/API/HMS/SaveClinicalData";
      payload = {
        dissummryid: 0,
        visitid: patientData.visitid,
        chiefcomplaint: inputValue,
        entempid: patientData.empid,
        entdatetime: currentDateTime,
        entwsname: patientData.wsname,
        modifyempid: patientData.modifyempid,
        modifydatetime: currentDateTime,
        modifywsname: patientData.wsname,
        locationid: patientData.locationid,
        financialyear: patientData.financialyear,
      };
    } else if (title === "Diagnosis") {
      apiUrl = "https://doctorapi.medonext.com/API/HMS/SaveDiagnosisData";
      payload = {
        dissummryid: 0,
        visitid: patientData.visitid, 
        diagnosis: inputValue,
        entempid: patientData.empid,
        entdatetime: currentDateTime,
        entwsname: patientData.wsname,
        modifyempid: patientData.modifyempid,
        modifydatetime: currentDateTime,
        modifywsname: patientData.wsname,
        locationid: patientData.locationid,
        financialyear: patientData.financialyear,
      };
    } else {
      console.warn("No matching API for this title.");
      return;
    }
    console.log("save btn",payload);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("✅ Data saved successfully:", result);
      alert("Data saved successfully.");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Error while saving data.");
    }
  };
  
  

  return (
    <div className="bg-gray-50 border border-gray-300 shadow rounded-lg p-1 flex flex-col gap-2 max-h-25">
      <div className="flex items-center justify-between">
        <MainHeadings title={title} icons={icons} />
        <ActionButton label="Save" onClick={saveData} />
      </div>
      <ReusableTextareaField
        label=" "
        className="border rounded text-black text-[10px] min-h-[50px] p-1"
        rows={4}
        style={{ minHeight: "28px", padding: "3px 4px" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
