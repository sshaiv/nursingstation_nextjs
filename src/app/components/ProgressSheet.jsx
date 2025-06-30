

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Label, ModalHeading } from "../common/text";
import API_ENDPOINTS from "../constants/api_url";
import { SaveButton } from "../common/Buttons";
import { getCurrentDateTime } from "../utils/dateUtils";

export default function ProgressSheet({ visitid, gssuhid, empid }) {
  const [progressSheetData, setProgressSheetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressDate, setProgressDate] = useState("");
  const [yesNoOptions, setYesNoOptions] = useState([]);

  // ✅ Normalize every progress entry
 const normalizeProgressEntry = (entry = {}) => {
  const quality = [];
  if (entry.isqualityconstant === 1) quality.push("Constant");
  if (entry.isqualityintermittent === 1) quality.push("Intermittent");

  const character = [];
  if (entry.ischaracterlacerating === 1) character.push("Lacerating");
  if (entry.ischaracterburning === 1) character.push("Burning");
  if (entry.ischaracterradiating === 1) character.push("Radiating");

  const relievingFactors = [];
  if (entry.isrelievingfactorrest === 1) relievingFactors.push("Rest");
  if (entry.isrelievingfactormedication === 1) relievingFactors.push("Medication");

  return {
    rowid: entry.rowid ?? 0,
    painlocation: entry.painlocation ?? "",
    quality,
    character,
    relievingFactors,
    relievingfactorother: entry.relievingfactorother ?? "",
    doctornotes: entry.doctornotes ?? "",
    havepainid: entry.havepainid ?? "",
    isaffectsleepid: entry.isaffectsleepid ?? "",
    painscore: entry.painscore ?? 0,
    bedno: entry.bedno ?? "",
    progressdate: entry.progressdate ?? "",
  };
};


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
        const res = await axios.get(`${API_ENDPOINTS.getProgressSheetData}?visitid=${visitid}`);
        const data = JSON.parse(res.data);
        const normalizedData = (data || []).map(normalizeProgressEntry);
        const newBlankEntry = normalizeProgressEntry();
        const allData = [...normalizedData, newBlankEntry];
        const latestIndex = allData.length - 2;
        setProgressSheetData(allData);
        setCurrentIndex(latestIndex >= 0 ? latestIndex : 0);
        loadFormFromData(allData[latestIndex >= 0 ? latestIndex : 0]);
      } catch (err) {
        console.error("Error loading progress data:", err);
        const fallback = normalizeProgressEntry();
        setProgressSheetData([fallback]);
        setCurrentIndex(0);
        loadFormFromData(fallback);
      }
    };

    fetchData();
    fetchProgressData();
  }, [visitid]);

  const loadFormFromData = (entry) => {
    if (!entry) return;
    setProgressDate(
      entry.progressdate ? new Date(entry.progressdate).toLocaleDateString("en-GB") : ""
    );
  };

  // const current = useMemo(() => {
  //   return normalizeProgressEntry(progressSheetData[currentIndex] || {});
  // }, [progressSheetData, currentIndex]);

  const current = progressSheetData[currentIndex] || normalizeProgressEntry();


  const handleChange = (key, value) => {
    const updated = [...progressSheetData];
    updated[currentIndex] = {
      ...updated[currentIndex],
      [key]: value,
    };
    setProgressSheetData(updated);
  };

  const handleArrayChange = (key, item, isChecked) => {
    const current = progressSheetData[currentIndex];
    const existing = current[key] || [];
    const updatedArray = isChecked
      ? [...existing, item]
      : existing.filter((i) => i !== item);
    handleChange(key, updatedArray);
  };

  const handleSave = async () => {
    const current = progressSheetData[currentIndex];
    const payload = {
      rowid: current.rowid ?? 0,
      progressdate: getCurrentDateTime(),
      gssuhid,
      visitid,
      bedno: current.bedno || "",
      painscore: current.painscore || 0,
      havepainid: current.havepainid,
      painlocation: current.painlocation,
      isqualityconstant: current.quality?.includes("Constant") ? 1 : 0,
      isqualityintermittent: current.quality?.includes("Intermittent") ? 1 : 0,
      ischaracterlacerating: current.character?.includes("Lacerating") ? 1 : 0,
      ischaracterburning: current.character?.includes("Burning") ? 1 : 0,
      ischaracterradiating: current.character?.includes("Radiating") ? 1 : 0,
      isrelievingfactorrest: current.relievingFactors?.includes("Rest") ? 1 : 0,
      isrelievingfactormedication: current.relievingFactors?.includes("Medication") ? 1 : 0,
      relievingfactorother: current.relievingfactorother,
      isaffectsleepid: current.isaffectsleepid,
      doctornotes: current.doctornotes,
      entempid: empid,
      entwsname: "GSLAP2",
      modifyempid: empid,
      modifywsname: "GSLAP2",
      locationid: "1",
      financialyear: "2526",
    };

     console.log("📝 Save Payload:", JSON.stringify(payload, null, 2));
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
              setCurrentIndex(newIndex);
              loadFormFromData(progressSheetData[newIndex]);
            }
          }}
        >
          ⬅️ Previous
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <ModalHeading title="Progress Sheet" />
          {progressDate && (
            <div className="text-[11px] px-2 py-[2px] bg-yellow-100 text-yellow-800 rounded font-medium inline-block shadow-sm border border-yellow-300">
              📅 Date: {progressDate}
            </div>
          )}
          {currentIndex === progressSheetData.length - 1 && (
            <div className="text-[11px] px-2 py-[2px] bg-green-100 text-green-800 rounded font-medium inline-block shadow-sm border border-green-300">
              🆕 New Entry
            </div>
          )}
        </div>

        <button
          className="bg-gray-200 px-3 py-1 rounded"
          disabled={currentIndex >= progressSheetData.length - 1}
          onClick={() => {
            const newIndex = currentIndex + 1;
            if (progressSheetData[newIndex]) {
              setCurrentIndex(newIndex);
              loadFormFromData(progressSheetData[newIndex]);
            }
          }}
        >
          Next ➡️
        </button>
      </div>

      <hr className="border-t border-gray-300" />

      {/* FORM START */}
      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Do you have pain?</Label>
        {yesNoOptions.map((option) => (
          <label key={option.CID} className="text-xs flex items-center gap-1">
            <input
              type="radio"
              name="havePain"
              value={option.CID}
              checked={current.havepainid === option.CID}
              onChange={() => handleChange("havepainid", option.CID)}
            />
            {option.CNAME}
          </label>
        ))}
        <input
          type="text"
          className="border w-[500px] p-1 rounded text-xs"
          value={current.painlocation}
          onChange={(e) => handleChange("painlocation", e.target.value)}
          placeholder="Pain location"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Quality:</Label>
        {["Constant", "Intermittent"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={current.quality.includes(item)}
              onChange={(e) => handleArrayChange("quality", item, e.target.checked)}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Character:</Label>
        {["Lacerating", "Burning", "Radiating"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={current.character.includes(item)}
              onChange={(e) => handleArrayChange("character", item, e.target.checked)}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Relieving Factor:</Label>
        {["Rest", "Medication"].map((item) => (
          <label key={item} className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={current.relievingFactors.includes(item)}
              onChange={(e) => handleArrayChange("relievingFactors", item, e.target.checked)}
            />
            {item}
          </label>
        ))}
        <input
          type="text"
          className="border w-[500px] p-1 rounded text-xs"
          value={current.relievingfactorother}
          onChange={(e) => handleChange("relievingfactorother", e.target.value)}
          placeholder="Other"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Label className="text-sm font-semibold">Does it affect sleep?</Label>
        {yesNoOptions.map((option) => (
          <label key={option.CID} className="text-xs flex items-center gap-1">
            <input
              type="radio"
              name="affectSleep"
              value={option.CID}
              checked={current.isaffectsleepid === option.CID}
              onChange={() => handleChange("isaffectsleepid", option.CID)}
            />
            {option.CNAME}
          </label>
        ))}
      </div>

      <div className="flex flex-col">
        <Label className="text-sm font-semibold mb-1">Doctor Notes</Label>
        <textarea
          rows={4}
          className="border p-2 rounded text-xs"
          value={current.doctornotes}
          onChange={(e) => handleChange("doctornotes", e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <SaveButton label="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
