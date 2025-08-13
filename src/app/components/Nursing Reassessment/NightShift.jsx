import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useFetchPatientHistory from "@/app/hooks/fetchHistoryData";
import API_ENDPOINTS from "@/app/constants/api_url";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function NightShift({ visitid, gssuhid, empid }) {
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


  useKeyboardScrollFix();

  return (
    <div className="   flex justify-center text-[10px] leading-tight">
      <div className="w-full max-w-5xl mx-auto space-y-4 overflow-auto scrollbar-hide min-h-[200px] max-h-[70vh] px-2">

      </div>
    </div>
  );
}
