import React, { useEffect, useState } from "react";
import { H3, Label, ModalHeading } from "../common/text";
import ReusableInputField from "../common/SmallInputfields";
import ReusableTextareaField from "../common/ReusableTextareaField";
import { SaveButton } from "../common/Buttons";
import useFetchPatientHistory from "../hooks/fetchHistoryData";
import API_ENDPOINTS from "../constants/api_url";
import axios from "axios";

export default function ClinicalExamination({ visitid, gssuhid, empid }) {
  const { historyData } = useFetchPatientHistory(visitid, gssuhid, empid);

  const [rowId, setRowId] = useState(" ");
  const [uhId, setUhId] = useState("");
  const [bedno, setBedno] = useState("");
  const [patientname, setPatientname] = useState("");
  const [age, setAge] = useState("");
  const [gendername, setGendername] = useState("");
  const [ismlc, setIsmlc] = useState(false);
  const [mlcno, setMlcno] = useState("");

  const [painscore, setPainscore] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [pallor, setPallor] = useState("");
  const [cyanosis, setCyanosis] = useState("");
  const [clubbing, setClubbing] = useState("");
  const [oedemafeet, setOedemafeet] = useState("");
  const [icterus, setIcterus] = useState("");
  const [lymphnodes, setLymphnodes] = useState("");
  const [temperture, setTemperture] = useState("");
  const [pulse, setPulse] = useState("");
  const [bp, setBp] = useState("");
  const [respiratory, setRespiratory] = useState("");
  const [spo2, setSpo2] = useState("");

  // CVS
  const [iscvss1, setIscvss1] = useState(false);
  const [iscvss2, setIscvss2] = useState(false);
  const [iscvsaddedsound, setIscvsaddedsound] = useState(false);
  const [iscvsmurmur, setIscvsmurmur] = useState(false);
  const [cvsResponse, setCvsResponse] = useState(null); 

  // RS
  const [isrsnormalbreath, setIsrsnormalbreath] = useState(false);
  const [isrscrepts, setIsrscrepts] = useState(false);
  const [isrsronchi, setIsrsronchi] = useState(false);
  const [rsResponse, setRsResponse] = useState(null); 

  // Abdomen
  const [issoft_tense, setIssoft_tense] = useState(false);
  const [isdistended_bowel, setIsdistended_bowel] = useState(false);
  const [isabsent, setIsabsent] = useState(false);
  const [ispresent, setIspresent] = useState(false);
  const [isliverp_np, setIsliverp_np] = useState(false);
  const [isspleen, setIsspleen] = useState(false);
  const [organomegaly, setOrganomegaly] = useState("");

  // CNS unified state for conscious status
  const [cnsState, setCnsState] = useState(null); 
  const [motorDeficit, setMotorDeficit] = useState(null); 
  const [cnsanyother, setCnsanyother] = useState("");

  // Others
  const [localexamnation, setLocalexamnation] = useState("");
  const [others, setOthers] = useState("");
  const [provisionaldiagnosis, setProvisionaldiagnosis] = useState("");

  // Nutritional  
  const [nutState, setNutState] = useState(null); 
  const [nutritionalstatusother, setNutritionalstatusother] = useState("");

  // Plans
  const [physiotherapyneeds, setPhysiotherapyneeds] = useState("");
  const [investigationdone, setInvestigationdone] = useState("");
  const [proposedccplan, setProposedccplan] = useState("");
  const [desiredoutcome, setDesiredoutcome] = useState("");

  useEffect(() => {
    const data = historyData.clinicalExamination?.Table?.[0];
    if (data) {
      setRowId(data.rowid || " ");
      setUhId(data.uhid || "");
      setBedno(data.bedno || "");
      setPatientname(data.patientname || "");
      setAge(data.age || "");
      setGendername(data.gendername || "");
      setIsmlc(!!data.ismlc);
      setMlcno(data.mlcno || "");
      setPainscore(data.painscore || "");
      setWeight(data.weight || "");
      setHeight(data.height || "");
      setBmi(data.bmi || "");
      setPallor(data.pallor || "");
      setCyanosis(data.cyanosis || "");
      setClubbing(data.clubbing || "");
      setOedemafeet(data.oedemafeet || "");
      setIcterus(data.icterus || "");
      setLymphnodes(data.lymphnodes || "");
      setTemperture(data.temperture || "");
      setPulse(data.pulse || "");
      setBp(data.bp || "");
      setRespiratory(data.respiratory || "");
      setSpo2(data.spo2 || "");

      setIscvss1(!!data.iscvss1);
      setIscvss2(!!data.iscvss2);
      setIscvsaddedsound(!!data.iscvsaddedsound);
      setIscvsmurmur(!!data.iscvsmurmur);
      if (data.iscvsyes) setCvsResponse(true);
      else if (data.iscvsno) setCvsResponse(false);
      else setCvsResponse(null);

      setIsrsnormalbreath(!!data.isrsnormalbreath);
      setIsrscrepts(!!data.isrscrepts);
      setIsrsronchi(!!data.isrsronchi);
      if (data.isrsyes) setRsResponse(true);
      else if (data.isrsno) setRsResponse(false);
      else setRsResponse(null);

      setIssoft_tense(!!data.issoft_tense);
      setIsdistended_bowel(!!data.isdistended_bowel);
      setIsabsent(!!data.isabsent);
      setIspresent(!!data.ispresent);
      setIsliverp_np(!!data.isliverp_np);
      setIsspleen(!!data.isspleen);
      setOrganomegaly(data.organomegaly || "");

      if (data.iscnsconscious) setCnsState("conscious");
      else if (data.iscnssensorium) setCnsState("altered");
      else if (data.iscnscomatose) setCnsState("comatose");
      else setCnsState(null);

      if (data.ismotordeflcltyes) setMotorDeficit(true);
      else if (data.ismotordeflcltno) setMotorDeficit(false);
      else setMotorDeficit(null);

      setCnsanyother(data.cnsanyother || "");
      setLocalexamnation(data.localexamnation || "");
      setOthers(data.others || "");
      setProvisionaldiagnosis(data.provisionaldiagnosis || "");

      if (data.isnutritionalconscious) setNutState("nutconscious");
      else if (data.isnutritionalsensorium) setNutState("nutaltered");
      else if (data.isnutritionalcomatose) setNutState("nutcomatose");
      else setNutState(null);

      setNutritionalstatusother(data.nutritionalstatusother || "");

      setPhysiotherapyneeds(data.physiotherapyneeds || "");
      setInvestigationdone(data.investigationdone || "");
      setProposedccplan(data.proposedccplan || "");
      setDesiredoutcome(data.desiredoutcome || "");
    }
  }, [historyData]);

  const fields = [
    { id: "weight", Label: "Weight (Kg)", onChange: setWeight, value: weight },
    { id: "height", Label: "Height (cm)", onChange: setHeight, value: height },
    { id: "bmi", Label: "BMI", onChange: setBmi, value: bmi },
    { id: "pallor", Label: "Pallor", onChange: setPallor, value: pallor },
    {
      id: "cyanosis",
      Label: "Cyanosis",
      onChange: setCyanosis,
      value: cyanosis,
    },
    {
      id: "clubbing",
      Label: "Clubbing",
      onChange: setClubbing,
      value: clubbing,
    },
    {
      id: "oedemaFeet",
      Label: "Oedema Feet",
      onChange: setOedemafeet,
      value: oedemafeet,
    },
    { id: "icterus", Label: "Icterus", onChange: setIcterus, value: icterus },
    {
      id: "lymphNodes",
      Label: "Lymph Nodes",
      onChange: setLymphnodes,
      value: lymphnodes,
    },
    {
      id: "temperature",
      Label: "Temperature",
      onChange: setTemperture,
      value: temperture,
    },
    { id: "pulse", Label: "Pulse (min)", onChange: setPulse, value: pulse },
    { id: "bp", Label: "BP (mmHg)", onChange: setBp, value: bp },
    {
      id: "respiratoryRate",
      Label: "RR/min",
      onChange: setRespiratory,
      value: respiratory,
    },
    { id: "spo2", Label: "SPO2 (%)", onChange: setSpo2, value: spo2 },
  ];

  const derivedJson = {
    rowid: rowId,
    uhid: uhId,
    gssuhid: gssuhid,
    visitid: visitid,
    bedno: bedno,
    painscore: painscore,
    weight: weight,
    height: height,
    bmi: bmi,
    pallor: pallor,
    cyanosis: cyanosis,
    clubbing: clubbing,
    oedemafeet: oedemafeet,
    icterus: icterus,
    lymphnodes: lymphnodes,
    temperture: temperture,
    pulse: pulse,
    bp: bp,
    respiratory: respiratory,
    spo2: spo2,
    iscvss1: iscvss1 ? 1 : 0,
    iscvss2: iscvss2 ? 1 : 0,
    iscvsaddedsound: iscvsaddedsound ? 1 : 0,
    iscvsmurmur: iscvsmurmur ? 1 : 0,
    iscvsyes: cvsResponse === true ? 1 : 0,
    iscvsno: cvsResponse === false ? 1 : 0,
    isrsnormalbreath: isrsnormalbreath ? 1 : 0,
    isrscrepts: isrscrepts ? 1 : 0,
    isrsronchi: isrsronchi ? 1 : 0,
    isrsyes: rsResponse === true ? 1 : 0,
    isrsno: rsResponse === false ? 1 : 0,
    issoft_tense: issoft_tense ? 1 : 0,
    isdistended_bowel: isdistended_bowel ? 1 : 0,
    isabsent: isabsent ? 1 : 0,
    ispresent: ispresent ? 1 : 0,
    isliverp_np: isliverp_np ? 1 : 0,
    isspleen: isspleen ? 1 : 0,
    organomegaly: organomegaly,
    iscnsconscious: cnsState === "conscious" ? 1 : 0,
    iscnssensorium: cnsState === "altered" ? 1 : 0,
    iscnscomatose: cnsState === "comatose" ? 1 : 0,
    ismotordeflcltyes: motorDeficit === true ? 1 : 0,
    ismotordeflcltno: motorDeficit === false ? 1 : 0,
    cnsanyother: cnsanyother,
    localexamnation: localexamnation,
    others: others,
    provisionaldiagnosis: provisionaldiagnosis,
    isnutritionalconscious: nutState === "nutconscious" ? 1 : 0,
    isnutritionalsensorium: nutState === "nutaltered" ? 1 : 0,
    isnutritionalcomatose: nutState === "nutcomatose" ? 1 : 0,
    nutritionalstatusother: nutritionalstatusother,
    physiotherapyneeds: physiotherapyneeds,
    investigationdone: investigationdone,
    proposedccplan: proposedccplan,
    desiredoutcome: desiredoutcome,
  };

  useEffect(() => {
    console.log("🧾 Current JSON payload:", derivedJson);
  }, [derivedJson]);

  const handleSave = async () => {
    console.log("🚀 Saving payload:", derivedJson);
    try {
      const response = await axios.post(
        API_ENDPOINTS.saveClinicalExamination,
        derivedJson
      );
      console.log("api", response);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-purple-50 min-h-screen text-sm text-gray-700">
      <div className="flex h-[1px]  items-center justify-center"><ModalHeading title="Clinical Examination" /></div>
      
      <hr className="border-t mt-6 mb-2 border-gray-300" />

      {/* Pain Assessment */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <H3>Pain Assessment Scale</H3>
        <div className="overflow-x-auto w-full">
          <div className="flex justify-between gap-4 px-2 min-w-[800px]">
            {[
              { score: 0, emoji: "😄", Label: "No Pain" },
              { score: 1, emoji: "😀", Label: "Just Noticeable" },
              { score: 2, emoji: "🙂", Label: "Mild Pain" },
              { score: 3, emoji: "😐", Label: "Uncomfortable Pain" },
              { score: 4, emoji: "😑", Label: "Annoying Pain" },
              { score: 5, emoji: "😣", Label: "Moderate Pain" },
              { score: 6, emoji: "😖", Label: "Just Bearable" },
              { score: 7, emoji: "😫", Label: "Strong Pain" },
              { score: 8, emoji: "😩", Label: "Severe Pain" },
              { score: 9, emoji: "😠", Label: "Horrible Pain" },
              { score: 10, emoji: "😵", Label: "Worst Pain" },
            ].map((item) => (
              <div
                key={item.score}
                className="flex flex-col items-center w-20 text-center"
              >
                <Label>{item.score}</Label>
                <Label className="text-2xl">{item.emoji}</Label>
                <Label>{item.Label}</Label>
              </div>
            ))}
          </div>

          <div className="text-sm flex justify-center items-center text-gray-600 mt-2 text-center space-x-2">
            <H3>Pain Score</H3>
            <ReusableInputField
              id="painscore"
              value={painscore}
              label="pain score"
              className="rounded-lg border-2  "
              onChange={(e) => setPainscore(e.target.value)}
              width="w-20"
            />
          </div>
        </div>
      </div>

      {/* Vitals Section */}
      <div className="grid grid-cols-2 md:grid-cols-8 gap-2 mt-4 ">
        {fields.map((field) => (
          <ReusableInputField
            key={field.id}
            className="border-2 rounded-lg "
            id={field.id}
            label={field.Label}
            width="w-full"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        ))}
      </div>

      {/* CVS, RS, GIT, CNS */}
      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <H3>CVS</H3>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={iscvss1}
              onChange={() => setIscvss1(!iscvss1)}
            />{" "}
            S1
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={iscvss2}
              onChange={() => setIscvss2(!iscvss2)}
            />{" "}
            S2
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={iscvsaddedsound}
              onChange={() => setIscvsaddedsound(!iscvsaddedsound)}
            />{" "}
            Added Sound
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={iscvsmurmur}
              onChange={() => setIscvsmurmur(!iscvsmurmur)}
            />{" "}
            Murmur / Click
          </Label>
          <Label className="ml-4">
            Yes
            <input
              name="cvs"
              type="radio"
              className="ml-1"
              checked={cvsResponse === true}
              onChange={() => setCvsResponse(true)}
            />
          </Label>
          <Label>
            No
            <input
              name="cvs"
              type="radio"
              className="ml-1"
              checked={cvsResponse === false}
              onChange={() => setCvsResponse(false)}
            />
          </Label>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <H3>RS</H3>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isrsnormalbreath}
              onChange={() => setIsrsnormalbreath(!isrsnormalbreath)}
            />{" "}
            Normal Vesicular Breathing
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isrscrepts}
              onChange={() => setIsrscrepts(!isrscrepts)}
            />{" "}
            Crepts
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isrsronchi}
              onChange={() => setIsrsronchi(!isrsronchi)}
            />{" "}
            Ronchi / Wheeze
          </Label>
          <Label className="ml-4">
            Yes
            <input
              name="rs"
              type="radio"
              className="ml-1"
              checked={rsResponse === true}
              onChange={() => setRsResponse(true)}
            />
          </Label>
          <Label>
            No
            <input
              name="rs"
              type="radio"
              className="ml-1"
              checked={rsResponse === false}
              onChange={() => setRsResponse(false)}
            />
          </Label>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <H3>GIT : P/A</H3>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={issoft_tense}
              onChange={() => setIssoft_tense(!issoft_tense)}
            />{" "}
            Soft/Tense
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isdistended_bowel}
              onChange={() => setIsdistended_bowel(!isdistended_bowel)}
            />{" "}
            Distended/Bowel Sounds
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isabsent}
              onChange={() => setIsabsent(!isabsent)}
            />{" "}
            Absent
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={ispresent}
              onChange={() => setIspresent(!ispresent)}
            />{" "}
            Present
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isliverp_np}
              onChange={() => setIsliverp_np(!isliverp_np)}
            />{" "}
            Liver P/NP
          </Label>
          <Label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isspleen}
              onChange={() => setIsspleen(!isspleen)}
            />{" "}
            Spleen
          </Label>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <H3>CNS</H3>
          <Label>
            <input
              type="radio"
              name="cns"
              className="mr-1"
              checked={cnsState === "conscious"}
              onChange={() => setCnsState("conscious")}
            />{" "}
            Conscious
          </Label>
          <Label>
            <input
              type="radio"
              name="cns"
              className="mr-1"
              checked={cnsState === "altered"}
              onChange={() => setCnsState("altered")}
            />{" "}
            Altered Sensorium
          </Label>
          <Label>
            <input
              type="radio"
              name="cns"
              className="mr-1"
              checked={cnsState === "comatose"}
              onChange={() => setCnsState("comatose")}
            />{" "}
            Comatose
          </Label>
          <span className="ml-4 font-bold">Motor Deficit</span>
          <Label>
            Yes
            <input
              type="radio"
              name="motor"
              className="ml-1"
              checked={motorDeficit === true}
              onChange={() => setMotorDeficit(true)}
            />
          </Label>
          <Label>
            No
            <input
              type="radio"
              name="motor"
              className="ml-1"
              checked={motorDeficit === false}
              onChange={() => setMotorDeficit(false)}
            />
          </Label>
        </div>
      </div>

      {/* Textareas */}
      <div className="mt-4 space-y-4 text-xs">
        <ReusableTextareaField
          id="organomegaly"
          className="border-2"
          label="Any other Organomegaly"
          value={organomegaly}
          onChange={(e) => setOrganomegaly(e.target.value)}
        />
        <ReusableTextareaField
          id="anyOther"
          className="border-2"
          label="Any Other"
          value={cnsanyother}
          onChange={(e) => setCnsanyother(e.target.value)}
        />
        <ReusableTextareaField
          id="localExam"
          className="border-2"
          label="Local Examination"
          value={localexamnation}
          onChange={(e) => setLocalexamnation(e.target.value)}
        />
        <ReusableTextareaField
          id="others"
          className="border-2"
          label="Others"
          value={others}
          onChange={(e) => setOthers(e.target.value)}
        />
      </div>

      {/* Provisional Diagnosis */}
      <div className="mt-4 flex items-start gap-4">
        <H3>Provisional Diagnosis</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="provisionaldiagnosis"
            label=""
            value={provisionaldiagnosis}
            onChange={(e) => setProvisionaldiagnosis(e.target.value)}
          />
        </div>
      </div>

      {/* Nutritional Status */}
      <div className="mt-4">
        <H3>Nutritional Status</H3>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 text-xs mb-2">
            <Label>
              <input
                type="radio"
                name="nutri"
                className="mr-1"
                checked={nutState === "nutconscious"}
                onChange={() => setNutState("nutconscious")}
              />{" "}
              Conscious
            </Label>
            <Label>
              <input
                type="radio"
                name="nutri"
                className="mr-1"
                checked={nutState === "nutaltered"}
                onChange={() => setNutState("nutaltered")}
              />{" "}
              Altered Sensorium
            </Label>
            <Label>
              <input
                type="radio"
                name="nutri"
                className="mr-1"
                checked={nutState === "nutcomatose"}
                onChange={() => setNutState("nutcomatose")}
              />{" "}
              Comatose
            </Label>
          </div>

          <div className="flex-1">
            <ReusableTextareaField
              id="nutritionalstatusother"
              label=""
              value={nutritionalstatusother}
              onChange={(e) => setNutritionalstatusother(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Physiotherapy Needs */}
      <div className="mt-4 flex items-start gap-4">
        <H3>Physiotherapy Needs</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="physiotherapy"
            label=""
            value={physiotherapyneeds}
            onChange={(e) => setPhysiotherapyneeds(e.target.value)}
          />
        </div>
      </div>

      {/* Investigation done prior to Admission (if any) */}
      <div className="mt-4 flex items-start gap-4">
        <H3>Investigation done prior to Admission (if any)</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="prioradmi"
            label=""
            value={investigationdone}
            onChange={(e) => setInvestigationdone(e.target.value)}
          />
        </div>
      </div>

      {/* Proposed Clinical Care Plan */}
      <div className="mt-4 flex items-start gap-4">
        <H3 className="pt-2">Proposed Clinical Care Plan</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="ProposedClinicalCarePlan"
            label=""
            value={proposedccplan}
            onChange={(e) => setProposedccplan(e.target.value)}
          />
        </div>
      </div>

      {/* Desired Outcomes */}
      <div className="mt-4 flex items-start gap-4">
        <H3 className="pt-2">Desired Outcomes</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="DesiredOutcome"
            label=""
            value={desiredoutcome}
            onChange={(e) => setDesiredoutcome(e.target.value)}
          />
        </div>
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="flex justify-center mt-6">
        <SaveButton label="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
