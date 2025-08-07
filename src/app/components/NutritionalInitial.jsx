import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { H3, Label, ModalHeading } from "../common/text";
import { SaveButton } from "../common/Buttons";
import PainScoreEmogy from "../common/PainScoreEmogy";

export default function NutritionalInitial({
  visitid,
  gssuhid,
  empid,
  patientData,
}) {
  const [dropdowns, setDropdowns] = useState([]);
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [resp, setResp] = useState("");
  const [painscore, setPainscore] = useState("");
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [allergy, setAllergy] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");
  const [rowid, setRowid] = useState("");

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "24px",
      height: "24px",
      fontSize: "10px",
      backgroundColor: "#f3f4f6",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "2px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "2px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 4px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "10px",
    }),
  };

  const checkboxGroups = {
    "GYN/OBS": [
      { label: "LMP", key: "isgynlmp" },
      { label: "Menarche", key: "isgynmenarche" },
      { label: "Vaginal Discharge", key: "isgynvaginaldischarge" },
      { label: "Immunization", key: "isgynimmunization" },
      { label: "None", key: "isgynnone" },
    ],
    CARDIAC: [
      { label: "Chest discomfort", key: "iscardiacchestdiscomfort" },
      { label: "Odema", key: "iscardiacodema" },
      { label: "Pacemaker", key: "iscardiacpacemaker" },
      { label: "None", key: "iscardiacnone" },
    ],
    MUSCULOSKELETAL: [
      { label: "Joint Pain", key: "ismusculoskeletaljointpain" },
      { label: "Stiffness", key: "ismusculoskeletalstiffness" },
      { label: "Tenderness", key: "ismusculoskeletaltenderness" },
      { label: "Contractures", key: "ismusculoskeletalcontractures" },
      { label: "None", key: "ismusculoskeletalnone" },
    ],
    "LEARNING LIMITATION": [
      { label: "Anxiety", key: "islearninglimitanxiety" },
      { label: "Hearing", key: "islearninglimithearing" },
      { label: "Vision", key: "islearninglimitvision" },
      { label: "Physical deficit", key: "islearninglimitphysicaldeficit" },
      { label: "Not able to Read", key: "islearninglimitnotabletoread" },
      { label: "None", key: "islearninglimitnone" },
    ],
  };

  const initialCheckboxState = Object.values(checkboxGroups)
    .flat()
    .reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {});
  const [checkboxValues, setCheckboxValues] = useState(initialCheckboxState);

  const allergyOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
    { label: "Not Known", value: 2 },
  ];

  const languageOptions = [
    { label: "Hindi", value: 1 },
    { label: "English", value: 2 },
    { label: "Other", value: 3 },
  ];

  const labelMap = {
    "GENERAL APPEARANCE": "generalappearanceid",
    "ADL (Activities of daily living)": "adlid",
    "LEVEL OF CONSCIOUSNESS": "levelofconsciousnessid",
    "SENSORY PERCEPTION": "sensoryperceptionid",
    VISION: "visionid",
    SPEECH: "speechid",
    "ORAL CAVITY": "oralcavityid",
    URINATION: "urinationid",
    "URINE APPEARANCE": "urineappearanceid",
    GASTRO: "gastroid",
    SKIN: "skinid",
    "SLEEP PATTERN": "sleeppatternid",
    RESPIRATION: "respirationid",
    "NUTRITION STATUS": "nutritionstatusid",
    VALUABLES: "valuablesid",
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await axios.get(
          "https://doctorapi.medonext.com/Api/HMS/GetAllHeadload"
        );
        const parsedData = JSON.parse(response.data);
        const labels = Object.keys(labelMap);

        const dropdownList = [];
        for (let i = 7; i <= 21; i++) {
          const table = parsedData[`Table${i}`];
          if (table && Array.isArray(table)) {
            dropdownList.push({
              label: labels[dropdownList.length],
              options: table.map((item) => ({
                label: item.CNAME,
                value: item.CID,
              })),
            });
          }
        }

        const defaultSelections = {};
        dropdownList.forEach((item) => {
          defaultSelections[item.label] = null;
        });

        setDropdowns(dropdownList);
        setSelections(defaultSelections);
      } catch (err) {
        console.error("Dropdown Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (!visitid || dropdowns.length === 0) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://doctorapi.medonext.com/Api/HMS/GetNursingInitialAssessmentData?visitid=${visitid}`
        );
        const parsed =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
        const tableData = parsed.Table?.[0] || {};
        const vitals = parsed.Table1?.[0] || {};

        setRowid(tableData.rowid || "");
        setBp(vitals.bp || "");
        setPulse(vitals.pulse || "");
        setResp(vitals.resp || "");
        setTemp(vitals.temp || "");
        setWeight(vitals.weight || "");
        setHeight(vitals.height || "");
        setPainscore(tableData.painscore || "");
        setAllergy(tableData.alleryid);
        setPrimaryLanguage(tableData.languageid);

        const newSelections = {};
        Object.entries(labelMap).forEach(([label, key]) => {
          newSelections[label] = tableData[key] || null;
        });
        setSelections(newSelections);

        const checkboxState = {};
        Object.values(checkboxGroups)
          .flat()
          .forEach(({ key }) => {
            checkboxState[key] = tableData[key] === 1 ? 1 : 0;
          });
        setCheckboxValues(checkboxState);
      } catch (error) {
        console.error("Assessment Fetch Error:", error);
      }
    };

    fetchData();
  }, [visitid, dropdowns]);

  const handleChange = (label, cid) => {
    setSelections((prev) => ({ ...prev, [label]: cid }));
  };

  const handleSave = async () => {
    const savePayload = {
      rowid: rowid || "",
      gssuhid,
      visitid,
      temp,
      pulse,
      resp,
      bp,
      height,
      weight,
      painscore,
      alleryid: allergy,
      languageid: primaryLanguage,
      ...Object.entries(labelMap).reduce((acc, [label, key]) => {
        acc[key] = selections[label] || "";
        return acc;
      }, {}),
      ...checkboxValues,
      fallscalescore: "",
      bradenriskinterpretation: "",
      isactionplanphysical: "",
      isactionplanchemical: "",
      ispatienthassufficientmobility: "",
      ispatienthasbedridden: "",
      nursingdiagnosis: "",
      nursingcareplan: "",
      signpath: "",
      entempid: patientData.empid,
      entdatetime: patientData.entdatetime,
      entwsname: patientData.wsname,
      modifyempid: patientData.modifyempid,
      modifydatetime: patientData.modifydatetime,
      modifywsname: patientData.wsname,
      locationid: patientData.locationid,
      financialyear: patientData.financialyear,
    };

    try {
      const response = await axios.post(
        "https://doctorapi.medonext.com/API/HMS/SaveNursingInitialAssessmentData",
        savePayload
      );
      alert("Data saved successfully!");
    } catch (error) {
      alert("Failed to save data.");
      console.error(error);
    }
  };

  return (
    <div className="p-2 bg-gray-50 text-xs text-gray-700 max-w-[1200px] mx-auto">
      <div className="flex h-[1px]  items-center justify-center">
        <ModalHeading title=" Nursing Initial Assessment " />
      </div>

      <hr className="border-t mb-3 mt-3 border-gray-300" />

      {/* VITAL INPUTS */}
      <div className="flex flex-wrap items-end gap-8 mb-4">
        {[
          { label: "Temp", value: temp, set: setTemp },
          { label: "Pulse", value: pulse, set: setPulse },
          { label: "Respiration", value: resp, set: setResp },
          { label: "BP", value: bp, set: setBp },
          { label: "Ht", value: height, set: setHeight },
          { label: "Wt", value: weight, set: setWeight },
          { label: "Pain Score", value: painscore, set: setPainscore },
        ].map((field) => (
          <div className="flex flex-col" key={field.label}>
            <label className="text-[11px] font-semibold mb-[2px]">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="border rounded text-black w-[70px] text-[11px] h-[24px] px-[4px] py-[1px]"
            />
          </div>
        ))}
      </div>

      {/* RADIO BUTTONS */}
      <div className="flex justify-start mb-4">
        <div className="grid grid-cols-2 gap-6">
          {/* Allergy Section */}
          <div className="flex items-center">
            <label className="text-[11px] font-semibold min-w-[80px]">
              Allergy
            </label>
            <div className="flex gap-x-2">
              {allergyOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-1 text-[11px]"
                >
                  <input
                    type="radio"
                    name="allergy"
                    value={opt.value}
                    checked={allergy === opt.value}
                    onChange={() => setAllergy(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Primary Language Section */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-semibold min-w-[100px]">
              Primary Language
            </label>
            <div className="flex gap-x-2">
              {languageOptions.map((lang) => (
                <label
                  key={lang.value}
                  className="flex items-center gap-1 text-[11px]"
                >
                  <input
                    type="radio"
                    name="language"
                    value={lang.value}
                    checked={primaryLanguage === lang.value}
                    onChange={() => setPrimaryLanguage(lang.value)}
                  />
                  {lang.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t mb-3 border-gray-300" />

     <PainScoreEmogy/>

      {/* DROPDOWNS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        {loading ? (
          <div>Loading dropdowns...</div>
        ) : (
          dropdowns.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-[11px] font-semibold  mb-[2px]">
                {item.label}
              </label>
              <Select
                styles={customSelectStyles}
                options={item.options}
                value={
                  item.options.find(
                    (opt) => opt.value === selections[item.label]
                  ) || null
                }
                onChange={(selected) =>
                  handleChange(item.label, selected?.value)
                }
                isClearable
              />
            </div>
          ))
        )}
      </div>

      {/* CHECKBOXES */}
      <div className="mb-4 ">
        {Object.entries(checkboxGroups).map(([groupLabel, checkboxes]) => (
          <div
            key={groupLabel}
            className="flex flex-wrap items-center gap-2 mb-2"
          >
            <span className="text-[11px] font-semibold min-w-[140px]">
              {groupLabel}
            </span>
            {checkboxes.map(({ label, key }) => (
              <label
                key={key}
                className="flex items-center gap-1 text-[11px] whitespace-nowrap"
              >
                <input
                  type="checkbox"
                  checked={checkboxValues[key] === 1}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCheckboxValues((prev) => {
                      const updated = { ...prev, [key]: isChecked ? 1 : 0 };
                      if (label === "None" && isChecked) {
                        checkboxes.forEach(
                          ({ key: otherKey, label: otherLabel }) => {
                            if (otherLabel !== "None") updated[otherKey] = 0;
                          }
                        );
                      } else if (label !== "None" && isChecked) {
                        const noneItem = checkboxes.find(
                          (item) => item.label === "None"
                        );
                        if (noneItem) updated[noneItem.key] = 0;
                      }
                      return updated;
                    });
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        ))}
      </div>

   <div className="flex justify-center">
        <button
          onClick={handleSave}       
          className={"w-full  px-6 py-2 rounded text-white  bg-blue-500 hover:bg-blue-600"}
        >
          Save
        </button>
      </div>
    </div>
  );
}
