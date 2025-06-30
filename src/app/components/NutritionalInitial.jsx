// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { H3, Label, ModalHeading } from "../common/text";
// import { SaveButton } from "../common/Buttons";

// export default function NutritionalInitial({
//   visitid,
//   gssuhid,
//   empid,
//   patientData,
// }) {
//   const [dropdowns, setDropdowns] = useState([]);
//   const [selections, setSelections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});
// const [bp, setBp] = useState("");
// const [pulse, setPulse] = useState("");
// const [resp, setResp] = useState("");
// const [painscore, setPainscore] = useState("");
// const [temp, setTemp] = useState("");
// const [weight, setWeight] = useState("");
// const [height, setHeight] = useState("");



//   useEffect(() => {
//     const fetchAssessmentDropdowns = async () => {
//       try {
//         const response = await axios.get(
//           "https://doctorapi.medonext.com/Api/HMS/GetAllHeadload"
//         );
//         const parsedData = JSON.parse(response.data);

//         const labels = [
//           "GENERAL APPEARANCE",
//           "ADL (Activities of daily living)",
//           "LEVEL OF CONSCIOUSNESS",
//           "SENSORY PERCEPTION",
//           "VISION",
//           "SPEECH",
//           "ORAL CAVITY",
//           "URINATION",
//           "URINE APPEARANCE",
//           "GASTRO",
//           "SKIN",
//           "SLEEP PATTERN",
//           "RESPIRATION",
//           "NUTRITION STATUS",
//           "VALUABLES",
//         ];

//         const dropdownList = [];
//         for (let i = 7; i <= 21; i++) {
//           const table = parsedData[`Table${i}`];
//           if (table && Array.isArray(table)) {
//             dropdownList.push({
//               label: labels[dropdownList.length],
//               options: table.map((item) => item.CNAME),
//             });
//           }
//         }

//         setDropdowns(dropdownList);

//         // Set default selection state
//         const defaultSelections = {};
//         dropdownList.forEach((item) => {
//           defaultSelections[item.label] = "";
//         });
//         setSelections(defaultSelections);
//       } catch (err) {
//         console.error("Error loading assessment dropdowns:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssessmentDropdowns();
//   }, []);

//   const handleChange = (label, value) => {
//     setSelections((prev) => ({
//       ...prev,
//       [label]: value,
//     }));

//     // Clear error when user selects a value
//     setErrors((prev) => ({
//       ...prev,
//       [label]: "",
//     }));
//   };
//   const [allergy, setAllergy] = useState("");
// const [primaryLanguage, setPrimaryLanguage] = useState("");

// useEffect(() => {
//   if (!visitid || dropdowns.length === 0) return;

//   const fetchInitialAssessment = async () => {
//     try {
//       const response = await axios.get(
//         `https://doctorapi.medonext.com/Api/HMS/GetNursingInitialAssessmentData?visitid=${visitid}`
//       );
//       const parsedData = JSON.parse(response.data);

//       const data = parsedData.Table?.[0] || {};
//       const vitals = parsedData.Table1?.[0] || {};

//       // Vitals
//       setBp(data.bp || vitals.bp || "");
//       setPulse(data.pulse || vitals.pulse || "");
//       setResp(data.resp || vitals.resp || "");
//       setTemp(data.temp || vitals.temp || "");
//       setWeight(data.height || vitals.height || "");
//       setHeight(data.weight || vitals.weight || "");
//       setPainscore(data.painscore?.toString() || "");

//       // Allergy
//       if (data.alleryid === 1) setAllergy("Yes");
//       else if (data.alleryid === 2) setAllergy("No");
//       else if (data.alleryid === 3) setAllergy("Not Known");

//       // Primary language
//       if (data.languageid === 1) setPrimaryLanguage("Hindi");
//       else if (data.languageid === 2) setPrimaryLanguage("English");
//       else if (data.languageid === 3) setPrimaryLanguage("Other");

//       // Prefill dropdowns
//       const newSelections = { ...selections };
//       dropdowns.forEach((dropdown) => {
//         const key = dropdown.label
//           .toLowerCase()
//           .replace(/\s|\(|\)/g, ""); // e.g., "GENERAL APPEARANCE" -> "generalappearance"
//         if (data[key]) {
//           newSelections[dropdown.label] = data[key];
//         }
//       });
//       setSelections(newSelections);
//     } catch (err) {
//       console.error("Error loading initial assessment data:", err);
//     }
//   };

//   fetchInitialAssessment();
// }, [visitid, dropdowns]);


//   return (
//     <div className="p-4 bg-purple-50 min-h-screen text-sm text-gray-700">
//       <div className="flex h-[1px] items-center justify-center">
//         <ModalHeading
//           title="Nutritional Assessment Profile"
//           className="text-[11px] mb-3"
//         />
//       </div>
//       <hr className="border-t mt-6 mb-2 border-gray-300" />
//         <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-4">
//   {[
//     { placeholder: "Temp", value: temp, setValue: setTemp },
//     { placeholder: "Pulse", value: pulse, setValue: setPulse },
//     { placeholder: "Respiration", value: resp, setValue: setResp },
//     { placeholder: "BP", value: bp, setValue: setBp },
//     { placeholder: "Ht", value: height, setValue: setHeight },
//     { placeholder: "Wt", value: weight, setValue: setWeight },
//     { placeholder: "Pain Score", value: painscore, setValue: setPainscore },
//   ].map((input, index) => (
//     <div className="flex flex-col" key={index}>
//       <label className="text-gray-600 font-bold text-[12px] mb-[2px]">
//         {input.placeholder}
//       </label>
//       <input
//         type="text"
//         value={input.value}
//         onChange={(e) => input.setValue(e.target.value || "")}
//         className={`border text-black rounded w-[80px] text-[10px] h-[25px] px-[4px] py-[1px] focus:outline-none focus:border-blue-500 ${
//           input.value ? "border-blue-500" : "border-gray-300"
//         }`}
//       />
//     </div>
//   ))}
// </div>
// <div className="flex flex-col lg:flex-row justify-evenly gap-10 mt-4">
//   {/* Allergy */}
//   <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//     <label className="text-gray-600 font-bold text-[12px] mb-[2px]">Allergy</label>
//     <div className="flex gap-4">
//       {["Yes", "No", "Not Known"].map((option) => (
//         <label key={option} className="flex items-center gap-1 text-sm text-gray-700">
//           <input
//             type="radio"
//             name="allergy"
//             value={option}
//             checked={allergy === option}
//             onChange={(e) => setAllergy(e.target.value)}
//             className="accent-purple-600"
//           />
//           {option}
//         </label>
//       ))}
//     </div>
//   </div>

//   {/* Primary Language */}
//   <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//     <label className=" text-gray-600 font-bold text-[12px] mb-[2px]">Primary Language</label>
//     <div className="flex gap-4">
//       {["Hindi", "English", "Other"].map((lang) => (
//         <label key={lang} className="flex items-center gap-1 text-sm text-gray-700">
//           <input
//             type="radio"
//             name="primaryLanguage"
//             value={lang}
//             checked={primaryLanguage === lang}
//             onChange={(e) => setPrimaryLanguage(e.target.value)}
//             className="accent-purple-600"
//           />
//           {lang}
//         </label>
//       ))}
//     </div>
//   </div>
// </div>


//  <div className="flex flex-col items-center gap-2 mb-6 mt-6">
//         <H3>Pain Assessment Scale</H3>
//         <div className="overflow-x-auto w-full">
//           <div className="flex justify-between gap-4 px-2 min-w-[800px]">
//             {[
//               { score: 0, emoji: "😄", Label: "No Pain" },
//               { score: 1, emoji: "😀", Label: "Just Noticeable" },
//               { score: 2, emoji: "🙂", Label: "Mild Pain" },
//               { score: 3, emoji: "😐", Label: "Uncomfortable Pain" },
//               { score: 4, emoji: "😑", Label: "Annoying Pain" },
//               { score: 5, emoji: "😣", Label: "Moderate Pain" },
//               { score: 6, emoji: "😖", Label: "Just Bearable" },
//               { score: 7, emoji: "😫", Label: "Strong Pain" },
//               { score: 8, emoji: "😩", Label: "Severe Pain" },
//               { score: 9, emoji: "😠", Label: "Horrible Pain" },
//               { score: 10, emoji: "😵", Label: "Worst Pain" },
//             ].map((item) => (
//               <div
//                 key={item.score}
//                 className="flex flex-col items-center w-20 text-center"
//               >
//                 <Label>{item.score}</Label>
//                 <Label className="text-2xl">{item.emoji}</Label>
//                 <Label>{item.Label}</Label>
//               </div>
//             ))}
//           </div>

        
//         </div>
//       </div>
//       {loading ? (
//         <div className="space-y-4">
//           {Array.from({ length: 15 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col sm:flex-row sm:items-center gap-2 animate-pulse"
//             >
//               <label className="sm:w-64 font-semibold text-gray-400 bg-gray-200 h-4 rounded w-40" />
//               <select
//                 className="flex-1 border p-2 rounded-md bg-gray-100 text-gray-400"
//                 disabled
//               >
//                 <option>Loading...</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       ) : (
      
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

//   {dropdowns.map((item, idx) => (
//     <div key={idx} className="flex flex-col">
//       <label className="text-[13px] font-medium text-gray-700 mb-1">
//         {item.label}
//       </label>
//       <select
//         value={selections[item.label] || ""}
//         onChange={(e) => handleChange(item.label, e.target.value)}
//         className={`text-sm text-black px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none cursor-pointer ${
//           errors?.[item.label] ? "border-red-500" : "border-gray-300"
//         }`}
//       >
//         <option value="">Select...</option>
//         {item.options.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   ))}
// </div>

//       )}

      
//             <div className="w-full mt-6">
//        <SaveButton
//         label="Save"
//         // onClick={handleSave}
//         className="lg:w-full md:w-full bg-blue-600"
//       />
      
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { H3, Label, ModalHeading } from "../common/text";
import { SaveButton } from "../common/Buttons";

export default function NutritionalInitial({ visitid }) {
  const [dropdowns, setDropdowns] = useState([]);
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [resp, setResp] = useState("");
  const [painscore, setPainscore] = useState("");
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [allergy, setAllergy] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");

  useEffect(() => {
    const fetchAssessmentDropdowns = async () => {
      try {
        const response = await axios.get(
          "https://doctorapi.medonext.com/Api/HMS/GetAllHeadload"
        );
        const parsedData = JSON.parse(response.data);
        const labels = [
          "GENERAL APPEARANCE",
          "ADL (Activities of daily living)",
          "LEVEL OF CONSCIOUSNESS",
          "SENSORY PERCEPTION",
          "VISION",
          "SPEECH",
          "ORAL CAVITY",
          "URINATION",
          "URINE APPEARANCE",
          "GASTRO",
          "SKIN",
          "SLEEP PATTERN",
          "RESPIRATION",
          "NUTRITION STATUS",
          "VALUABLES",
        ];

        const dropdownList = [];
        for (let i = 7; i <= 21; i++) {
          const table = parsedData[`Table${i}`];
          if (table && Array.isArray(table)) {
            dropdownList.push({
              label: labels[dropdownList.length],
              options: table.map((item) => item.CNAME),
            });
          }
        }

        setDropdowns(dropdownList);

        // Set default selections
        const defaultSelections = {};
        dropdownList.forEach((item) => {
          defaultSelections[item.label] = "";
        });
        setSelections(defaultSelections);

        console.log("Dropdowns loaded:", dropdownList);
      } catch (err) {
        console.error("Error loading assessment dropdowns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentDropdowns();
  }, []);

  const handleChange = (label, value) => {
    setSelections((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  };

    useEffect(() => {
    const fetchNutritionalData = async () => {
      try {
        const response = await axios.get(
        `https://doctorapi.medonext.com/Api/HMS/GetNursingInitialAssessmentData?visitid=${visitid}`
      );
        const data = JSON.parse(response.data);
        if (data?.Table?.length > 0) {
          const d = data.Table[0];

          setSelectedDate(new Date(d.date));
          if (d.date) {
            const dt = new Date(d.date);
            setTime(dt.toTimeString().slice(0, 5));
          }

          setAllergy(d.allergy || "");
          
         
        }
      } catch (error) {
        console.error("Error fetching nutritional data:", error);
      }
    };
    fetchNutritionalData();
  }, [visitid]);

useEffect(() => {
  if (!visitid || dropdowns.length === 0) return;

  const fetchInitialAssessment = async () => {
    try {
      const response = await axios.get(
        `https://doctorapi.medonext.com/Api/HMS/GetNursingInitialAssessmentData?visitid=${visitid}`
      );

      const parsedData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("Full API response", parsedData);

      const vitals = parsedData.Table1?.[0] || {};

      setBp(vitals.bp || "");
      setPulse(vitals.pulse || "");
      setResp(vitals.resp || "");
      setTemp(vitals.temp || "");
      setWeight(vitals.height || "");
      setHeight(vitals.weight || "");
      setPainscore(""); // No pain score in Table1, so leave blank or add fallback if needed
    } catch (err) {
      console.error("Error loading initial assessment data:", err);
    }
  };

  fetchInitialAssessment();
}, [visitid, dropdowns]);


  return (
    <div className="p-4 bg-purple-50 min-h-screen text-sm text-gray-700">
      <ModalHeading
        title="Nutritional Assessment Profile"
        className="text-[11px] mb-3"
      />
      <hr className="border-t mt-6 mb-4 border-gray-300" />

      {/* VITAL INPUTS */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-4">
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
            <label className="text-[12px] mb-[2px] font-bold text-gray-600">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="border rounded text-black w-[80px] text-[10px] h-[25px] px-[4px] py-[1px] focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      {/* RADIO BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-evenly gap-10 mt-4">
        <div>
          <label className="text-[12px] font-bold text-gray-600">Allergy</label>
          <div className="flex gap-4 mt-1">
            {["Yes", "No", "Not Known"].map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="allergy"
                  value={opt}
                  checked={allergy === opt}
                  onChange={() => setAllergy(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[12px] font-bold text-gray-600">
            Primary Language
          </label>
          <div className="flex gap-4 mt-1">
            {["Hindi", "English", "Other"].map((lang) => (
              <label key={lang} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={primaryLanguage === lang}
                  onChange={() => setPrimaryLanguage(lang)}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* DROPDOWNS */}
      <div className="mt-6">
        {loading ? (
          <div>Loading dropdowns...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dropdowns.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-[13px] font-medium text-gray-700 mb-1">
                  {item.label}
                </label>
                <select
                  value={selections[item.label] || ""}
                  onChange={(e) => handleChange(item.label, e.target.value)}
                  className="text-sm text-black px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  <option value="">Select...</option>
                  {item.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <SaveButton label="Save" className="bg-blue-600 w-full" />
      </div>
    </div>
  );
}
