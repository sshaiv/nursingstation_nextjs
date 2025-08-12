import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { H3, Label, ModalHeading } from "../common/text";
import API_ENDPOINTS from "../constants/api_url";
import { SaveButton } from "../common/Buttons";
import { getCurrentDateTime } from "../utils/dateUtils";
import ReusableInputField from "../common/SmallInputfields";
import { toast } from "react-toastify";

export default function ProgressSheet({ visitid, gssuhid, empid }) {
  const [progressSheetData, setProgressSheetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressDate, setProgressDate] = useState("");
  const [yesNoOptions, setYesNoOptions] = useState([]);
  const [reload, setReload] = useState(false);

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
    if (entry.isrelievingfactormedication === 1)
      relievingFactors.push("Medication");

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
        const res = await axios.get(
          `${API_ENDPOINTS.getProgressSheetData}?visitid=${visitid}`
        );
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
  }, [visitid, reload]);

  // const loadFormFromData = (entry) => {
  //   if (!entry) return;
  //   setProgressDate(
  //     entry.progressdate
  //       ? new Date(entry.progressdate).toLocaleDateString("en-GB")
  //       : ""
  //   );
  // };
  const loadFormFromData = (entry) => {
    if (!entry) return;
    if (entry.progressdate) {
      const dateObj = new Date(entry.progressdate);
      const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY
      const formattedTime = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }); // HH:mm
      setProgressDate(`${formattedDate} ${formattedTime}`);
    } else {
      setProgressDate("");
    }
  };

  const current = progressSheetData[currentIndex] || normalizeProgressEntry();

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
      isrelievingfactormedication: current.relievingFactors?.includes(
        "Medication"
      )
        ? 1
        : 0,
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
      toast.success("Data saved successfully!");
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error saving progress sheet:", error);
      toast.error("Failed to save data: " + error.message);
    }
  };
  //  const handleChange = (key, value) => {
  //     const updated = [...progressSheetData];
  //     updated[currentIndex] = {
  //       ...updated[currentIndex],
  //       [key]: value,
  //     };
  //     setProgressSheetData(updated);
  //   };

  const handleChange = (key, value) => {
    if (key === "painscore") {
      const num = Number(value);
      if (value === "" || (num >= 0 && num <= 10)) {
        const updated = [...progressSheetData];
        updated[currentIndex] = {
          ...updated[currentIndex],
          [key]: value,
        };
        setProgressSheetData(updated);
      } else {
        toast.warning("Pain score must be between 0 and 10.");
      }
    } else {
      const updated = [...progressSheetData];
      updated[currentIndex] = {
        ...updated[currentIndex],
        [key]: value,
      };
      setProgressSheetData(updated);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 ">
      {/* PART 1 */}
      <div
        className="p-4 flex flex-col gap-2 justify-between
                md:flex-col 
                md:w-48
                 w-full
                overflow-x-auto
                scrollbar-hide
                "
      >
        {/* Container for horizontal scroll on small screen */}
        <div
          className="flex md:flex-col gap-2
                  w-full
                  md:w-40 md:h-96
                  border border-gray-300 rounded-xs shadow-lg shadow-gray-600 text-xs bg-white
                  overflow-x-auto md:overflow-y-auto
                  scrollbar-hide 
                  "
        >
          {/* Title */}
          <div
            className="bg-gray-100 text-blue-900 text-center font-semibold text-[14px] py-1 border-b border-gray-200
                    md:block
                    w-40
                    flex-shrink-0
                    "
          >
            📅 Select Date
          </div>

          {[...progressSheetData]
            .filter((entry) => entry.progressdate)
            .sort((a, b) => new Date(b.progressdate) - new Date(a.progressdate))
            .map((entry, idx) => {
              const dateObj = new Date(entry.progressdate);
              const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY
              const formattedTime = dateObj.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              }); // HH:mm

              return (
                <div
                  key={idx}
                  onClick={() => {
                    const selectedIndex = progressSheetData.findIndex(
                      (p) => p.progressdate === entry.progressdate
                    );
                    if (selectedIndex !== -1) {
                      setCurrentIndex(selectedIndex);
                      loadFormFromData(progressSheetData[selectedIndex]);
                    }
                  }}
                  className={`px-2 py-1 cursor-pointer hover:bg-amber-50
              ${
                current.progressdate === entry.progressdate
                  ? "bg-blue-100 text-sm font-semibold"
                  : ""
              }
              w-40 flex-shrink-0
            `}
                >
                  <div>{formattedDate}</div>
                  <div className="text-[10px] text-gray-500">
                    {formattedTime}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* PART 2*/}
      <div className="p-2  rounded-xl w-9/10 max-w-5xl mx-auto text-[12px] space-y-5">
        {/* 📋 Left Side: Title + Status */}
        <div className="flex h-[1px]  items-center justify-center">
          <ModalHeading title="Progress Sheet" />
        </div>

        <hr className="border-t border-gray-300 " />

        <div className="flex justify-center gap-2">
          {progressDate && (
            <div className="text-[13px] cursor-not-allowed px-2 py-[2px] bg-gray-100 text-blue-800 rounded font-medium inline-block shadow-sm border border-gray-50  shadow-gray-400">
              📅 History: {progressDate}
            </div>
          )}
          {progressDate && (
            <button
              onClick={() => {
                const newEntry = normalizeProgressEntry(); // blank entry
                setProgressSheetData((prev) => [...prev, newEntry]);
                setCurrentIndex(progressSheetData.length); // new last index
                loadFormFromData(newEntry);
              }}
              className="text-[13px] px-2 py-[2px] bg-gray-100 text-blue-800 rounded font-medium inline-block shadow-sm border border-gray-50 shadow-gray-400 cursor-pointer hover:shadow-gray-900 hover:"
              type="button"
            >
              ➕ ADD NEW
            </button>
          )}

          {currentIndex === progressSheetData.length - 1 && (
            <div className="text-[12px] px-2 py-[2px] bg-blue-100 text-blue-800 rounded font-medium inline-block shadow-sm border border-gray-50  shadow-gray-400">
              🆕 New Entry
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left Column: Pain Assessment Scale */}
          <div className="w-full sm:w-1/2 flex flex-col items-center gap-1">
            <H3>Pain Assessment Scale</H3>
            <div className="w-full px-2">
              <div className="flex flex-wrap justify-start gap-x-2 gap-y-1">
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
                    className="flex flex-col items-center text-center w-16"
                  >
                    <Label className="text-[10px] text-gray-600">
                      {item.score}
                    </Label>
                    <Label className="text-xl">{item.emoji}</Label>
                    <Label className="text-[9px] text-gray-600">
                      {item.Label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-col items-center text-gray-700">
                <label className="text-xs font-semibold mb-1">
                  Enter Pain Score (0–10)
                </label>
                <input
                  id="painscore"
                  type="number"
                  min={0}
                  max={10}
                  value={current.painscore}
                  onChange={(e) => handleChange("painscore", e.target.value)}
                  className="w-16 text-center border border-gray-400 rounded-md px-2 py-[2px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form + Save Button */}
          <div className="w-full sm:w-1/2 flex flex-col gap-1 justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <Label className="text-[11px] font-semibold text-gray-800 mb-[2px]">
                Do you have pain?
              </Label>
              {yesNoOptions.map((option) => (
                <label
                  key={option.CID}
                  className="text-xs text-gray-800 flex items-center gap-1"
                >
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
                className="border  text-gray-800w-[500px] p-1 rounded text-xs"
                value={current.painlocation}
                onChange={(e) => handleChange("painlocation", e.target.value)}
                placeholder="Pain location"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Label className="text-[11px] font-semibold text-gray-800 mb-[2px]">
                Quality:
              </Label>
              {["Constant", "Intermittent"].map((item) => (
                <label
                  key={item}
                  className="text-xs text-gray-800 flex items-center gap-1"
                >
                  <input
                    type="checkbox"
                    checked={current.quality.includes(item)}
                    onChange={(e) =>
                      handleArrayChange("quality", item, e.target.checked)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Label className="text-[11px] font-semibold text-gray-800  mb-[2px]">
                Character:
              </Label>
              {["Lacerating", "Burning", "Radiating"].map((item) => (
                <label
                  key={item}
                  className="text-xs flex text-gray-800 items-center gap-1"
                >
                  <input
                    type="checkbox"
                    checked={current.character.includes(item)}
                    onChange={(e) =>
                      handleArrayChange("character", item, e.target.checked)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Label className="text-[11px] text-gray-800 font-semibold  mb-[2px]">
                Relieving Factor:
              </Label>
              {["Rest", "Medication"].map((item) => (
                <label
                  key={item}
                  className="text-xs text-gray-800 flex items-center gap-1"
                >
                  <input
                    type="checkbox"
                    checked={current.relievingFactors.includes(item)}
                    onChange={(e) =>
                      handleArrayChange(
                        "relievingFactors",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              ))}
              <input
                type="text"
                className="border text-gray-800 w-[500px] p-1 rounded text-xs"
                value={current.relievingfactorother}
                onChange={(e) =>
                  handleChange("relievingfactorother", e.target.value)
                }
                placeholder="Other"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Label className="text-[11px] text-gray-800 font-semibold  mb-[2px]">
                Does it affect sleep?
              </Label>
              {yesNoOptions.map((option) => (
                <label
                  key={option.CID}
                  className="text-xs text-gray-800 flex items-center gap-1"
                >
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
              <Label className="text-[11px] font-semibold text-gray-800  mb-[2px] ">
                Doctor Notes
              </Label>
              <textarea
                rows={4}
                className="border text-gray-800 p-2 rounded text-xs resize-none"
                value={current.doctornotes}
                onChange={(e) => handleChange("doctornotes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className={
              "w-full text-sm font-semibold rounded-b-full  rounded-lg p-2 text-white  bg-blue-500 hover:bg-blue-600"
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
