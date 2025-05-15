
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import { H3, Label, ModalHeading } from '../common/text';
import useFetchPatientHistory from '../hooks/fetchHistoryData';
import { ActionButton, SaveButton } from '../common/Buttons';
import API_ENDPOINTS from '../constants/api_url';
import ReusableTextareaField from '../common/ReusableTextareaField';
import Select from 'react-select';


const allergyOptions = ["Peanuts", "Pollen", "Dust", "Milk", "Shellfish", "Eggs"];
const pastHistoryOptions = ["Medical", "Surgical", "Others",];

export default function InitialAssessmentForm({ visitid, gssuhid, empid,
  // reldropdowndata 
}) {
  const { historyData } = useFetchPatientHistory(visitid, gssuhid, empid);

  const [allergyYes, setAllergyYes] = useState(false);
  const [allergyQuery, setAllergyQuery] = useState("");
  const [showAllergyDropdown, setShowAllergyDropdown] = useState(false);
  const [historyGivenBy, setHistoryGivenBy] = useState("");
  const [relation, setRelation] = useState("");
  const [presentingComplaint, setPresentingComplaint] = useState("");
  const [isDM, setIsDM] = useState(false);
  const [isHypertension, setIsHypertension] = useState(false);
  const [isCAD, setIsCAD] = useState(false);
  const [familyOther, setFamilyOther] = useState("");
  const [pastHistoryQuery, setPastHistoryQuery] = useState("");
  const [pastDetails, setPastDetails] = useState("");

  const [medicalhistory, setMedicalHistory] = useState("");
  const [surgicalhistory, setSurgicalHistory] = useState("");

  // const [showPastDropdown, setShowPastDropdown] = useState(false);
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [isTobacco, setIsTobacco] = useState(false);
  const [personalOther, setPersonalOther] = useState("");
  const sigCanvasRef = useRef(null);
  const [rowId, setRowId] = useState(" ");
  const [bedNo, setBedNo] = useState(" ");
  const [uhId, setUhId] = useState(" ");
  const [reldrop, setRelDrop] = useState(" ");


  const clearSignature = () => sigCanvasRef.current?.clear();

  // Prefill data
  useEffect(() => {
    const data = historyData.presentIllness?.Table?.[0];
    if (data) {
      setAllergyYes(!!data.isallergies);
      setAllergyQuery(data.allergies || "");
      setHistoryGivenBy(data.historygivenby || "");
      // setRelation(data.relationid ? String(data.relationid) : "");
      setRelation(data?.relationid || '');
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
      setSurgicalHistory(data.surgicalhistory || "")

      // ✅ New addition
      setRowId(data.rowid || " ");
      setBedNo(data.bedno || " ");
    }
  }, [historyData]);

  console.log("history of presentillness", historyData.presentIllness);


  const filteredAllergyOptions = allergyOptions.filter((option) =>
    option.toLowerCase().includes(allergyQuery.toLowerCase())
  );

  const filteredPastOptions = pastHistoryOptions.filter((option) =>
    option.toLowerCase().includes(pastHistoryQuery.toLowerCase())
  );

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
    surgicalhistory: surgicalhistory

  };


  useEffect(() => {
    console.log("🧾 Current JSON payload:", derivedJson);
  }, [
    allergyYes, allergyQuery, historyGivenBy, relation, presentingComplaint,
    isDM, isHypertension, isCAD, familyOther, isAlcohol, isTobacco, personalOther, pastDetails
  ]);


  const handleSave = async () => {
    console.log("🚀 Saving payload:", derivedJson);
    try {
      const response = await axios.post(API_ENDPOINTS.savePresentIllness, derivedJson);
      console.log("api", response);

      alert("Data saved successfully!");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };



  const [relationData, setRelationData] = useState([]);
  useEffect(() => {
    const fetchRelationData = async () => {
      try {
        const response = await axios.get('https://doctorapi.medonext.com/Api/HMS/GetAllHeadload');

        const parsedData = JSON.parse(response.data); // Parse the data

        const data = parsedData.Table; // Access the Table property


        if (data && Array.isArray(data)) {
          setRelationData(data);
        } else {
          console.error("Table is undefined or not an array in the response");
        }
      } catch (error) {
        console.error("Error fetching relation data:", error);
      }
    };
    fetchRelationData();
  }, []);

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: '100px', // Limit dropdown height
      overflowY: 'auto',
      
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '30px', // Compact control
      fontSize: '12px',
    }),
  };

  const relationOptions = relationData.map(item => ({
    value: item.CID,
    label: item.CNAME,
  }));

  const startsWithFilter = (option, inputValue) =>
  option.label.toLowerCase().startsWith(inputValue.toLowerCase());

  return (
    <div className="p-4 bg-purple-50 min-h-screen">
      <ModalHeading title="Initial Assessment" />
      <hr className="border-t mt-6 mb-2 border-gray-300" />
      {/* Allergy Section */}
      <div className="mt-2 p-2 flex flex-wrap items-center gap-6">
        <H3>📋 Allergy</H3>
        <div className="flex items-center gap-4">
          <Label><input type="radio" name="allergy" checked={allergyYes} onChange={() => setAllergyYes(true)} /> Yes</Label>
          <Label><input type="radio" name="allergy" checked={!allergyYes} onChange={() => setAllergyYes(false)} /> No</Label>
        </div>
        <div className="relative w-[900px] ">
          <ReusableTextareaField id="allergies" label="🔍 " className='border-1 rounded-xs max-h-[50px] ' value={allergyQuery} onChange={(e) => setAllergyQuery(e.target.value)} />

        </div>
      </div>

      {/* History of Present Illness */}
      <div className="mt-4 p-2">
        <H3>✅ History of Present Illness</H3>
        <div className="flex gap-6 mt-2 items-start">
          <div className="flex flex-col gap-4 w-1/3">
            <div className="flex items-center">
              <label className="text-gray-700 mr-2">History Given By:</label> {/* Add margin to the right for spacing */}
              <input
                type="text"
                value={historyGivenBy}
                onChange={(e) => setHistoryGivenBy(e.target.value)}
                placeholder="History given by"
                className="border border-gray-400 rounded px-3 py-2 w-full"
              />
            </div>

            <div className="flex items-center ">
              <label className="text-gray-700 mr-6">Relation:</label>

              <Select
              className='w-full'
                styles={customStyles}
                options={relationOptions}
                value={relationOptions.find(opt => opt.value === relation)}
                onChange={(selectedOption) => setRelation(selectedOption.value)}
                placeholder=" "
                isSearchable={true}
                // menuIsOpen={true} // Optional: for always open (for testing)
                 filterOption={startsWithFilter} // ✅ Prefix match only
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={clearSignature} className="bg-purple-100 text-purple-800 px-4 py-1 rounded">Clear</button>
              <button className="bg-purple-100 text-purple-800 px-4 py-1 rounded">Show</button>
            </div>
          </div>
          <div className="border border-gray-800 w-1/3" style={{ height: '150px' }}>
            <SignatureCanvas ref={sigCanvasRef} penColor="black" canvasProps={{ className: 'w-full h-full' }} />
          </div>
        </div>
      </div>

      {/* Presenting Complaint */}
      <div className="mt-4 p-2">
        <H3>📋 Presenting Complaint</H3>
        <div className="flex items-center mt-2">
          <ReusableTextareaField className='border-1 rounded-xs max-h-[150px]' id="presentingcomplaints" label=" " value={presentingComplaint} onChange={(e) => setPresentingComplaint(e.target.value)} />

          {/* <ActionButton label="Insert" /> */}
        </div>
      </div>

      {/* Family History */}
      <div className="mt-3 p-2">
        <H3>📋 Family History</H3>
        <div className="flex gap-6 mt-2 flex-wrap items-center">
          <Label><input type="checkbox" checked={isDM} onChange={() => setIsDM(!isDM)} /> DM</Label>
          <Label><input type="checkbox" checked={isHypertension} onChange={() => setIsHypertension(!isHypertension)} /> Hypertension</Label>
          <Label><input type="checkbox" checked={isCAD} onChange={() => setIsCAD(!isCAD)} /> CAD</Label>
          <input type="text" placeholder="Other" className="border border-gray-400 rounded px-3 py-2" value={familyOther} onChange={(e) => setFamilyOther(e.target.value)} />
        </div>
      </div>

      {/* Past History */}
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <H3>📝 Past History</H3>
        {/* <div className="relative w-[200px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">🔍</div>
          {showPastDropdown && (
            <button className="absolute inset-y-0 right-0 pr-3 text-gray-500" onClick={() => { setShowPastDropdown(false); setPastHistoryQuery(""); }}>×</button>
          )}
          <input
            type="text"
            placeholder="Select condition..."
            className="border border-gray-600 rounded-lg px-10 py-2 w-full"
            value={pastHistoryQuery}
            onFocus={() => setShowPastDropdown(true)}
            onChange={(e) => setPastHistoryQuery(e.target.value)}
          />
          {showPastDropdown && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow-md max-h-30 overflow-auto">
              {filteredPastOptions.map((item, idx) => (
                <li key={idx} onClick={() => { setPastHistoryQuery(item); setShowPastDropdown(false); }} className="px-4 py-2 hover:bg-purple-100 cursor-pointer">{item}</li>
              ))}
            </ul>
          )}
        </div> */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <Label>Medical</Label>
            <input
              type="text"
              placeholder="medicalhistory"
              className="border rounded-md px-3 py-2 w-[200px]"
              value={medicalhistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label>Surgical</Label>
            <input
              type="text"
              placeholder="surgicalhistory"
              className="border rounded-md px-3 py-2 w-[200px]"
              value={surgicalhistory}
              onChange={(e) => setSurgicalHistory(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label>Other</Label>
            <input
              type="text"
              placeholder="other"
              className="border rounded-md px-3 py-2 w-[200px]"
              value={pastDetails}
              onChange={(e) => setPastDetails(e.target.value)}
            />
          </div>
        </div>

        {/* <ActionButton label="Insert" /> */}
      </div>

      {/* Personal History */}
      <div className="flex items-center gap-4 mt-6 flex-wrap">
        <H3>📋 Personal History</H3>
        <Label><input type="checkbox" checked={isAlcohol} onChange={() => setIsAlcohol(!isAlcohol)} /> Alcohol</Label>
        <Label><input type="checkbox" checked={isTobacco} onChange={() => setIsTobacco(!isTobacco)} /> Tobacco</Label>
        <input type="text" placeholder="Other" className="border rounded-md px-3 py-2" value={personalOther} onChange={(e) => setPersonalOther(e.target.value)} />
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="flex justify-center mt-6">
        <SaveButton label="Save" onClick={handleSave} />
      </div>
    </div>
  );
}

