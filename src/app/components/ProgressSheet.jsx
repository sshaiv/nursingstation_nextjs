
import React, { useEffect, useState } from "react";
import axios from "axios";
import { H3, Label, ModalHeading } from "../common/text";
import API_ENDPOINTS from "../constants/api_url";
import { SaveButton } from "../common/Buttons";

export default function ProgressSheet({ visitid, gssuhid, empid }) {
  const [progressSheetData, setProgressSheetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [rowId, setRowId] = useState(0);
  const [painHaveId, setpainHaveId] = useState(null);
  const [painHaveSpecify, setpainHaveSpecify] = useState("");
  const [yesNoOptions, setYesNoOptions] = useState([]);
  const [quality, setQuality] = useState([]);
  const [character, setCharacter] = useState([]);
  const [relievingFactors, setRelievingFactors] = useState([]);
  const [otherRelief, setOtherRelief] = useState("");
  const [affectsSleepId, setAffectsSleepId] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const data = JSON.parse(response.data);
        setYesNoOptions(data.Table3);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    const fetchProgressData = async () => {
      try {
        // const res = await axios.get(
        //   `${API_ENDPOINTS.getProgressSheetData}?visitid=${visitid}`
        // );
         const res = await axios.get(
                  `${API_ENDPOINTS.getProgressSheetData}?visitid=${visitid}`
                );
        const data = JSON.parse(res.data);
        setProgressSheetData(data);
        if (data.length > 0) {
          setCurrentIndex(0);
          loadFormFromData(data[0]);
        }
      } catch (err) {
        console.error("Error loading progress data:", err);
      }
    };

    fetchData();
    fetchProgressData();
  }, []);

  const loadFormFromData = (entry) => {
    if (!entry) return;
    setRowId(entry.rowid ?? 0);
    setpainHaveId(entry.havepainid ?? null);
    setpainHaveSpecify(entry.painlocation ?? "");
    setQuality([
      ...(entry.isqualityconstant ? ["Constant"] : []),
      ...(entry.isqualityintermittent ? ["Intermittent"] : []),
    ]);
    setCharacter([
      ...(entry.ischaracterlacerating ? ["Lacerating"] : []),
      ...(entry.ischaracterburning ? ["Burning"] : []),
      ...(entry.ischaracterradiating ? ["Radiating"] : []),
    ]);
    setRelievingFactors([
      ...(entry.isrelievingfactorrest ? ["Rest"] : []),
      ...(entry.isrelievingfactormedication ? ["Medication"] : []),
    ]);
    setOtherRelief(entry.relievingfactorother ?? "");
    setAffectsSleepId(entry.isaffectsleepid ?? null);
    setDoctorNotes(entry.doctornotes ?? "");
  };

  const handleSave = async () => {
    const payload = {
      rowid: rowId,
      progressdate: new Date().toISOString(),
      gssuhid,
      visitid,
      bedno: "", // can be taken from patientData if needed
      painscore: 0, // If implemented later
      havepainid: painHaveId,
      painlocation: painHaveSpecify,
      isqualityconstant: quality.includes("Constant") ? 1 : 0,
      isqualityintermittent: quality.includes("Intermittent") ? 1 : 0,
      ischaracterlacerating: character.includes("Lacerating") ? 1 : 0,
      ischaracterburning: character.includes("Burning") ? 1 : 0,
      ischaracterradiating: character.includes("Radiating") ? 1 : 0,
      isrelievingfactorrest: relievingFactors.includes("Rest") ? 1 : 0,
      isrelievingfactormedication: relievingFactors.includes("Medication") ? 1 : 0,
      relievingfactorother: otherRelief,
      isaffectsleepid: affectsSleepId,
      doctornotes: doctorNotes,
      entempid: empid,
      entwsname: "GSLAP2",
      modifyempid: empid,
      modifywsname: "GSLAP2",
      locationid: "1",
      financialyear: "2526",
    };
 console.log("save btn", payload);
    try {
      await axios.post(API_ENDPOINTS.saveProgressSheetData, payload);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving progress sheet:", error);
    }
  };

  return (
    <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
      <div className="flex justify-between">
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          disabled={currentIndex <= 0}
          onClick={() => {
            const newIndex = currentIndex - 1;
            if (progressSheetData[newIndex]) {
              loadFormFromData(progressSheetData[newIndex]);
              setCurrentIndex(newIndex);
            }
          }}
        >
          ⬅️ Previous
        </button>

        <ModalHeading title="Progress Sheet" />

        <button
          className="bg-gray-200 px-3 py-1 rounded"
          disabled={currentIndex >= progressSheetData.length - 1}
          onClick={() => {
            const newIndex = currentIndex + 1;
            if (progressSheetData[newIndex]) {
              loadFormFromData(progressSheetData[newIndex]);
              setCurrentIndex(newIndex);
            }
          }}
        >
          Next ➡️
        </button>
      </div>

      <hr className="border-t border-gray-300" />

      {/* Example dynamic field */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Do you have pain?</Label>
        {yesNoOptions.map((option) => (
          <label key={option.CID} className="text-xs flex items-center gap-1">
            <input
              type="radio"
              name="havePain"
              value={option.CID}
              checked={painHaveId === option.CID}
              onChange={() => setpainHaveId(option.CID)}
            />
            {option.CNAME}
          </label>
        ))}
        <input
          type="text"
          className="border w-[500] p-1 rounded text-xs"
          value={painHaveSpecify}
          onChange={(e) => setpainHaveSpecify(e.target.value)}
          placeholder="Pain location"
        />
      </div>

      {/* Quality */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Quality:</Label>
        {["Constant", "Intermittent"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={quality.includes(item)}
              onChange={() =>
                setQuality((prev) =>
                  prev.includes(item)
                    ? prev.filter((q) => q !== item)
                    : [...prev, item]
                )
              }
            />
            {item}
          </label>
        ))}
      </div>

      {/* Character */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Character:</Label>
        {["Lacerating", "Burning", "Radiating"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={character.includes(item)}
              onChange={() =>
                setCharacter((prev) =>
                  prev.includes(item)
                    ? prev.filter((q) => q !== item)
                    : [...prev, item]
                )
              }
            />
            {item}
          </label>
        ))}
      </div>

      {/* Relieving Factors */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Relieving Factor:</Label>
        {["Rest", "Medication"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={relievingFactors.includes(item)}
              onChange={() =>
                setRelievingFactors((prev) =>
                  prev.includes(item)
                    ? prev.filter((q) => q !== item)
                    : [...prev, item]
                )
              }
            />
            {item}
          </label>
        ))}
      
        <input
          type="text"
          className="border w-[500] p-1 rounded text-xs"
          value={otherRelief}
          onChange={(e) => setOtherRelief(e.target.value)}
          placeholder="Other"
        />
      </div>

      {/* Affects Sleep */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Does it affect sleep?</Label>
        {yesNoOptions.map((option) => (
          <label key={option.CID} className="text-xs flex items-center gap-1">
            <input
              type="radio"
              name="affectSleep"
              value={option.CID}
              checked={affectsSleepId === option.CID}
              onChange={() => setAffectsSleepId(option.CID)}
            />
            {option.CNAME}
          </label>
        ))}
      </div>

      {/* Doctor Notes */}
      <div className="flex flex-col">
        <Label className="text-sm font-semibold mb-1">Doctor Notes</Label>
        <textarea
          rows={4}
          className="border p-2 rounded text-xs"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <SaveButton label="Save" onClick={handleSave} />
      </div>
    </div>
  );
}