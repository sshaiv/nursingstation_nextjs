import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";

import Select from "react-select";
import { SaveButton } from "@/app/common/Buttons";
import ReusableTextareaField from "@/app/common/ReusableTextareaField";
import { H3, Label, ModalHeading } from "@/app/common/text";
import useFetchPatientHistory from "@/app/hooks/fetchHistoryData";
import API_ENDPOINTS from "@/app/constants/api_url";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { toast } from "react-toastify";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function Adult({ visitid, gssuhid, empid }) {
  const { historyData } = useFetchPatientHistory(visitid, gssuhid, empid);

  const [allergyYes, setAllergyYes] = useState(false);
  const [allergyQuery, setAllergyQuery] = useState("");
  const [historyGivenBy, setHistoryGivenBy] = useState("");
  const [relation, setRelation] = useState("");
  const [presentingComplaint, setPresentingComplaint] = useState("");
  const [isDM, setIsDM] = useState(false);
  const [isHypertension, setIsHypertension] = useState(false);
  const [isCAD, setIsCAD] = useState(false);
  const [familyOther, setFamilyOther] = useState("");
  const [pastDetails, setPastDetails] = useState("");
  const [medicalhistory, setMedicalHistory] = useState("");
  const [surgicalhistory, setSurgicalHistory] = useState("");
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [isTobacco, setIsTobacco] = useState(false);
  const [personalOther, setPersonalOther] = useState("");
  const sigCanvasRef = useRef(null);
  const [rowId, setRowId] = useState(" ");
  const [bedNo, setBedNo] = useState(" ");
  const [uhId, setUhId] = useState(" ");
  const [relationData, setRelationData] = useState([]);

  useEffect(() => {
    const data = historyData.presentIllness?.Table?.[0];
    if (data) {
      setAllergyYes(!!data.isallergies);
      setAllergyQuery(data.allergies || "");
      setHistoryGivenBy(data.historygivenby || "");
      setRelation(data?.relationid || "");
      setPresentingComplaint(data.presentingcomplaint || "");
      setIsDM(!!data.isdm);
      setIsHypertension(!!data.ishypertension);
      setIsCAD(!!data.iscad);
      setFamilyOther(data.familyhistoryother || "");
      setIsAlcohol(!!data.isalcohal);
      setIsTobacco(!!data.istobacoo);
      setPersonalOther(data.personalhistoryother || "");
      setPastDetails(data.pasthistoryother || "");
      setMedicalHistory(data.medicalhistory || "");
      setSurgicalHistory(data.surgicalhistory || "");
      setRowId(data.rowid || " ");
      setBedNo(data.bedno || " ");
    }
  }, [historyData]);

  useEffect(() => {
    const fetchRelationData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const parsedData = JSON.parse(response.data);
        const data = parsedData.Table;
        if (data && Array.isArray(data)) setRelationData(data);
      } catch (error) {
        console.error("Error fetching relation data:", error);
      }
    };
    fetchRelationData();
  }, []);

  const handleSave = async () => {
    const derivedJson = {
      rowid: rowId,
      uhid: uhId,
      gssuhid: gssuhid,
      visitid: visitid,
      bedno: bedNo,
      isallergies: allergyYes ? 1 : 0,
      allergies: allergyQuery,
      historygivenby: historyGivenBy,
      relationid: relation,
      presentingcomplaint: presentingComplaint,
      isdm: isDM ? 1 : 0,
      ishypertension: isHypertension ? 1 : 0,
      iscad: isCAD ? 1 : 0,
      familyhistoryother: familyOther,
      isalcohal: isAlcohol ? 1 : 0,
      istobacoo: isTobacco ? 1 : 0,
      personalhistoryother: personalOther,
      pasthistoryother: pastDetails,
      medicalhistory: medicalhistory,
      surgicalhistory: surgicalhistory,
    };

    try {
      await axios.post(API_ENDPOINTS.savePresentIllness, derivedJson);
   
    toast.success("Data saved successfully!");
    } catch (error) {
      console.error("❌ Error saving data:", error);

     toast.error("Failed to save data. Please try again.");
    }
  };

  const relationOptions = relationData.map((item) => ({
    value: item.CID,
    label: item.CNAME,
  }));

  const handleSignatureSave = (signatureImage) => {
    console.log("parent saved:", signatureImage);
  };

  useKeyboardScrollFix();

  return (
    <div className="   flex justify-center text-[10px] leading-tight">
      <div className="w-full max-w-5xl mx-auto space-y-4 overflow-auto scrollbar-hide min-h-[200px] max-h-[70vh] px-2">

 {/* Allergy Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 mb-3">
            <H3>📋 Allergy</H3>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="radio"
                name="allergy"
                checked={allergyYes}
                onChange={() => setAllergyYes(true)}
              />
              Yes
            </Label>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="radio"
                name="allergy"
                checked={!allergyYes}
                onChange={() => setAllergyYes(false)}
              />
              No
            </Label>
          </div>
          <div className="w-full ">
            <ReusableTextareaField
              id="allergies"
              label="🔍 "
              className="border text-black rounded text-[10px]"
              rows={1}
              style={{ minHeight: "28px", padding: "6px 8px" }}
              value={allergyQuery}
              onChange={(e) => setAllergyQuery(e.target.value)}
            />
          </div>
        </div>

        {/* History of Present Illness */}
        <div className="flex flex-col md:flex-row gap-10 items-start ">

          {/* Left: History of Present Illness */}
          <div className="w-full md:w-1/2 space-y-2">
            <H3>✅ History of Present Illness</H3>
            <ReusableTextareaField
              className="border-2 text-black text-[10px]"
              id="historygiven"
              label="History Given By:"
              rows={1}
              style={{ minHeight: "28px", padding: "6px 8px" }}
              value={historyGivenBy}
              onChange={(e) => setHistoryGivenBy(e.target.value)}
            />
            <Select
              className="w-full text-[8px]"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  fontSize: "10px",
                  color: "#000",
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: "80px",
                  overflowY: "auto",
                  fontSize: "10px",
                }),
                control: (provided) => ({
                  ...provided,
                  minHeight: "32px",
                  fontSize: "10px",
                  padding: "0 6px",
                  backgroundColor: "transparent",
                  border: "#6B7280  solid 2px",
                }),
              }}
              options={relationOptions}
              value={relationOptions.find((opt) => opt.value === relation)}
              onChange={(selectedOption) => setRelation(selectedOption.value)}
              placeholder="Relation"
              isSearchable
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().startsWith(inputValue.toLowerCase())
              }
            />
          </div>

          {/* Right: Digital Signature */}
          <div className="w-full md:w-1/2  ">
            <DigitalSignatureSection onSignatureSave={handleSignatureSave} title="Signature" />
          </div>
        </div>

        {/* Presenting Complaint */}
        <div className="space-y-3">
          <H3>📋 Presenting Complaint</H3>
          <ReusableTextareaField
            className="border text-black w-full  text-[10px]"
            id="presentingcomplaints"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label=" "
            value={presentingComplaint}
            onChange={(e) => setPresentingComplaint(e.target.value)}
          />
        </div>

        {/* Family History */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <H3>📋 Family History</H3>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="checkbox"
                checked={isDM}
                onChange={() => setIsDM(!isDM)}
              />
              DM
            </Label>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="checkbox"
                checked={isHypertension}
                onChange={() => setIsHypertension(!isHypertension)}
              />
              Hypertension
            </Label>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="checkbox"
                checked={isCAD}
                onChange={() => setIsCAD(!isCAD)}
              />
              CAD
            </Label>
          </div>
          <ReusableTextareaField
            className="border text-black w-full  text-[10px]"
            id="familyother"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label="Family History Other"
            value={familyOther}
            onChange={(e) => setFamilyOther(e.target.value)}
          />
        </div>

        {/* Past History */}
        <div className="space-y-3">
          <H3>📝 Past History</H3>
          <ReusableTextareaField
            className="border text-black text-[10px]"
            id="medical"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label="Medical"
            value={medicalhistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
          <ReusableTextareaField
            className="border text-black text-[10px]"
            id="surgical"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label="Surgical"
            value={surgicalhistory}
            onChange={(e) => setSurgicalHistory(e.target.value)}
          />
          <ReusableTextareaField
            className="border text-black text-[10px]"
            id="pastother"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label="Other"
            value={pastDetails}
            onChange={(e) => setPastDetails(e.target.value)}
          />
        </div>

        {/* Personal History */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <H3>📋 Personal History</H3>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="checkbox"
                checked={isAlcohol}
                onChange={() => setIsAlcohol(!isAlcohol)}
              />
              Alcohol
            </Label>
            <Label className="text-[10px] text-black flex items-center gap-1">
              <input
                type="checkbox"
                checked={isTobacco}
                onChange={() => setIsTobacco(!isTobacco)}
              />
              Tobacco
            </Label>
          </div>
          <ReusableTextareaField
            className="border w-full text-black text-[10px]"
            id="personalother"
            rows={1}
            style={{ minHeight: "28px", padding: "6px 8px" }}
            label="Other"
            value={personalOther}
            onChange={(e) => setPersonalOther(e.target.value)}
          />
        </div>

        <hr className="border-t border-gray-300 mb-2" />

        <div className="flex justify-center">
          <button
          onClick={handleSave}       
          className={"w-full text-sm font-semibold rounded-b-full  rounded-lg p-2 text-white  bg-blue-500 hover:bg-blue-600"}
        >
          Save
        </button>
        </div>
      </div>
    </div>
  );
}
