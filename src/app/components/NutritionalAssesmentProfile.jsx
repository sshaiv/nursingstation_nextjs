import React, { useEffect, useState, useRef } from "react";
import { H3, Label, ModalHeading } from "../common/text";
import ReusableInputField from "../common/SmallInputfields";
import ReusableTextareaField from "../common/ReusableTextareaField";
import { SaveButton } from "../common/Buttons";
import useFetchPatientHistory from "../hooks/fetchHistoryData";
import API_ENDPOINTS from "../constants/api_url";
import axios from "axios";
import Select from "react-select";
import DateTimeInput from "../common/DateTimeInput";
import { getCurrentDateTime } from "../utils/dateUtils";

export default function NutritionalAssessmentProfile({
  visitid,
  gssuhid,
  empid,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");

  const [isDM, setIsDM] = useState(false);
  const [isHypertension, setIsHypertension] = useState(false);
  const [isRenal, setIsRenal] = useState(false);
  const [isCardiac, setIsCardiac] = useState(false);
  const [isRespiratory, setIsRespiratory] = useState(false);
  const [isLiver, setIsLiver] = useState(false);
  const [isOtherDisease, setIsOtherDisease] = useState(false);

  const [foodHabit, setFoodHabit] = useState("");
  const [cvsResponse, setCvsResponse] = useState(null);

  const [relationData, setRelationData] = useState([]);
  const [relation, setRelation] = useState("");
  const [relation1, setRelation1] = useState("");
  const [relation2, setRelation2] = useState("");
  const [relation3, setRelation3] = useState("");
  const [historyGivenBy, setHistoryGivenBy] = useState("");
  const clearSignature = () => sigCanvasRef.current?.clear();
  const sigCanvasRef = useRef(null);
  const [dietPlan, setDietPlan] = useState("");

  const [foodAllergy, setFoodAllergy] = useState("");
  const [foodAllergySpecify, setFoodAllergySpecify] = useState("");
  const [pastHistory, setPastHistory] = useState("");
  const [presentMedicalIllness, setPresentMedicalIllness] = useState("");
  const [foodIntake, setFoodIntake] = useState("");
  const [overallWeightChange, setOverallWeightChange] = useState("");
  const [nutritionalStatus, setNutritionalStatus] = useState("");
  const [isHyperacidity, setIsHyperacidity] = useState(false);
  const [isConstipation, setIsConstipation] = useState(false);
  const [isNausea, setIsNausea] = useState(false);
  const [isDiarrhoea, setIsDiarrhoea] = useState(false);
  const [isVomiting, setIsVomiting] = useState(false);
  const [isAnorexia, setIsAnorexia] = useState(false);
  const [isFlatulence, setIsFlatulence] = useState(false);
  const [isOralUlcer, setIsOralUlcer] = useState(false);
  const [isSignsNone, setIsSignsNone] = useState(false);
  const [isOtherComplaint, setIsOtherComplaint] = useState(false);

  const [relationOptions, setRelationOptions] = useState([]);

  useEffect(() => {
    const fetchRelationData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const parsedData = JSON.parse(response.data);
        const data = parsedData.Table;
        if (data && Array.isArray(data)) {
          setRelationOptions(
            data.map((item) => ({
              value: item.CID,
              label: item.CNAME,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching relation data:", error);
      }
    };
    fetchRelationData();
  }, []);

  useEffect(() => {
    const fetchNutritionalData = async () => {
      try {
        const response = await axios.get(
          `https://doctorapi.medonext.com/api/HMS/getPatIpdNutritionalAssessmentProfile?visitid=${visitid}&gssuhid=${gssuhid}&empid=${empid}`
        );
        const data = JSON.parse(response.data);
        if (data?.Table?.length > 0) {
          const d = data.Table[0];

          setSelectedDate(new Date(d.date));
          if (d.date) {
            const dt = new Date(d.date);
            setTime(dt.toTimeString().slice(0, 5));
          }

          setFoodHabit(d.foodhabit || "");
          setFoodAllergy(d.foodallergy || "");
          setFoodAllergySpecify(d.foodallergyspecify || "");
          setPastHistory(d.pasthistory || "");
          setPresentMedicalIllness(d.presentmedicalillness || "");
          setFoodIntake(d.foodintake || "");
          setOverallWeightChange(d.weight || "");
          setNutritionalStatus(d.foodnutritional || "");

          setIsDM(!!d.isdm);
          setIsHypertension(!!d.ishypertension);
          setIsRenal(!!d.isrenal);
          setIsCardiac(!!d.iscardiac);
          setIsRespiratory(!!d.isrespiratorydisease);
          setIsLiver(!!d.isliverdisease);
          setIsOtherDisease(!!d.isotherdisease);

          setIsHyperacidity(!!d.ishyperacidity);
          setIsConstipation(!!d.isconstipation);
          setIsNausea(!!d.isnausea);
          setIsDiarrhoea(!!d.isdiarrhoea);
          setIsVomiting(!!d.isvomiting);
          setIsAnorexia(!!d.isanorexia);
          setIsFlatulence(!!d.isflatulence);
          setIsOralUlcer(!!d.isoralulcer);
          setIsSignsNone(!!d.issignsnone);
          setIsOtherComplaint(!!d.isothercomplaint);

          setDietPlan(d.dietplan || "");
        }
      } catch (error) {
        console.error("Error fetching nutritional data:", error);
      }
    };
    fetchNutritionalData();
  }, [visitid, gssuhid, empid]);

  const [weightChangeOptions, setWeightChangeOptions] = useState([]);
  const [yesNoOptions, setYesNoOptions] = useState([]);
  const [nutritionalStatusOptions, setNutritionalStatusOptions] = useState([]);
  const [foodIntakeOptions, setFoodIntakeOptions] = useState([]);
  const [foodHabitOptions, setFoodHabitOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://doctorapi.medonext.com/Api/HMS/GetAllHeadload"
        );
        const data = JSON.parse(response.data);
        setWeightChangeOptions(data.Table2);
        setYesNoOptions(data.Table3);
        setNutritionalStatusOptions(data.Table4);
        setFoodIntakeOptions(data.Table5);
        setFoodHabitOptions(data.Table6);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (name, { CID, CNAME }) => {
    console.log(`${name} selected: CID = ${CID}, CNAME = ${CNAME}`);
    switch (name) {
      case "foodHabit":
        setFoodHabit(CNAME);
        break;
      case "foodIntake":
        setFoodIntake(CNAME);
        break;
      case "weightChange":
        setOverallWeightChange(CNAME);
        break;
      case "nutritionalStatus":
        setNutritionalStatus(CNAME);
        break;
      case "nutritionalRisk":
        setCvsResponse(CNAME);
        break;
      default:
        break;
    }
  };

  const derivedJson = {
    visitid,
    gssuhid,
    empid,
    date: getCurrentDateTime(),
    foodhabit: foodHabit,
    foodallergy: foodAllergy,
    foodallergyspecify: foodAllergySpecify,
    pasthistory: pastHistory,
    presentmedicalillness: presentMedicalIllness,
    foodintake: foodIntake,
    weight: overallWeightChange,
    foodnutritional: nutritionalStatus,
    isdm: isDM ? 1 : 0,
    ishypertension: isHypertension ? 1 : 0,
    isrenal: isRenal ? 1 : 0,
    iscardiac: isCardiac ? 1 : 0,
    isrespiratorydisease: isRespiratory ? 1 : 0,
    isliverdisease: isLiver ? 1 : 0,
    isotherdisease: isOtherDisease ? 1 : 0,
    ishyperacidity: isHyperacidity ? 1 : 0,
    isconstipation: isConstipation ? 1 : 0,
    isnausea: isNausea ? 1 : 0,
    isdiarrhoea: isDiarrhoea ? 1 : 0,
    isvomiting: isVomiting ? 1 : 0,
    isanorexia: isAnorexia ? 1 : 0,
    isflatulence: isFlatulence ? 1 : 0,
    isoralulcer: isOralUlcer ? 1 : 0,
    issignsnone: isSignsNone ? 1 : 0,
    isothercomplaint: isOtherComplaint ? 1 : 0,
    dietplan: dietPlan,
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://doctorapi.medonext.com/API/HMS/SavePatIpdNutritionalAssessmentProfile",
        derivedJson
      );
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving nutritional assessment:", error);
      alert("Failed to save data. Please try again.");
    }
  };
  const [isNone, setIsNone] = useState(false);

  return (
    <div className="p-4 bg-purple-50 min-h-screen text-sm text-gray-700">
      <ModalHeading title="Nutritional Assessment Profile" />
      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="space-y-4 text-[10px] text-gray-700">
        {/* Personal Details */}
        <H3 className="text-xs">📋 Personal Details</H3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Label className="w-24 text-[10px]">Height</Label>
            <input
              type="number"
              placeholder="cms"
              className="border p-1 rounded w-full text-[10px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-24 text-[10px]">Weight</Label>
            <input
              type="number"
              placeholder="kgs"
              className="border p-1 rounded w-full text-[10px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-40 text-[10px]">Body Mass Index</Label>
            <input
              type="text"
              placeholder="Kg/M2"
              className="border p-1 rounded w-full text-[10px]"
            />
          </div>
        </div>

        {/* Food Habits */}
        <div className="flex items-center gap-4 flex-wrap">
          <Label className="w-28 text-[10px]">Food Habits</Label>
          <div className="flex gap-4">
            {foodHabitOptions.map((option) => (
              <label
                key={option.CID}
                className="flex items-center gap-1 cursor-pointer text-[10px]"
              >
                <input
                  type="radio"
                  name="foodHabit"
                  value={option.CNAME}
                  onChange={() => handleSelect("foodHabit", option)}
                />
                <span className="text-[10px]">{option.CNAME}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Food Allergy */}
        <div className="flex items-center gap-4 flex-wrap">
          <Label className="w-28 text-[10px]">Food Allergy</Label>
          <div className="flex gap-4">
            {yesNoOptions.map((option) => (
              <label
                key={option.CID}
                className="flex items-center gap-1 cursor-pointer text-[10px]"
              >
                <input
                  type="radio"
                  name="foodAllergy"
                  value={option.CNAME}
                  onChange={() => handleSelect("foodAllergy", option)}
                />
                <span className="text-[10px]">{option.CNAME}</span>
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="If yes, specify"
            className="border p-1 rounded w-64 text-[10px]"
          />
        </div>

        {/* Other Habits */}
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            <Label className="whitespace-nowrap text-[10px] flex items-center gap-1">
              <H3 className="text-[10px] font-semibold m-0 inline">
                Other Habits
              </H3>
              <span>
                (Any 1 = score 1, 2–3 = score 2, {">"}3 = score 3, None = score
                0)
              </span>
            </Label>

            <input
              type="text"
              placeholder=""
              className="border p-1 rounded w-64 text-[10px]"
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap mt-1">
            {["Alcohol", "Smoking", "Tobacco Chewing", "None"].map((habit) => (
              <Label
                key={habit}
                className="flex items-center gap-1 text-[10px]"
              >
                <input type="checkbox" />
                {habit}
              </Label>
            ))}
          </div>
        </div>

        {/* Clinical Data */}
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            <Label className="whitespace-nowrap text-[10px] flex items-center gap-1">
              <H3 className="text-[10px] font-semibold m-0 inline">
                Clinical Data
              </H3>
              <span>
                (Any 1 = score 1, 2–3 = score 2, {">"}3 = score 3, None = score
                0)
              </span>
            </Label>

            <input
              type="text"
              placeholder=""
              className="border p-1 rounded w-64 text-[10px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-[10px] text-gray-700">
        <div className="flex flex-wrap items-center gap-3">
          <H3 className="text-xs">📋 Past History</H3>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isDM}
              onChange={() => setIsDM(!isDM)}
            />
            DM
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isHypertension}
              onChange={() => setIsHypertension(!isHypertension)}
            />
            Hypertension
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isRenal}
              onChange={() => setIsRenal(!isRenal)}
            />
            Renal
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isCardiac}
              onChange={() => setIsCardiac(!isCardiac)}
            />
            Cardiac
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isRespiratory}
              onChange={() => setIsRespiratory(!isRespiratory)}
            />
            Respiratory Disease
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isLiver}
              onChange={() => setIsLiver(!isLiver)}
            />
            Liver Disease
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="text-[10px]"
              checked={isOtherDisease}
              onChange={() => setIsOtherDisease(!isOtherDisease)}
            />
            Other Disease
          </Label>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <H3>Present Medical illness</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="provisionaldiagnosis"
            className="border-1"
            label="🖊️"
          />
        </div>
      </div>

      {/* <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="space-y-4">
        <H3>✅ Daily Nutritional Assessment</H3>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <div className="flex items-center gap-2">
              <Label>Route of Feeding</Label>
              <Label>
                Oral
                <input
                  name="routeOfFeeding"
                  type="radio"
                  className="ml-1"
                  value="Oral"
                  onChange={() =>
                    handleSelect("routeOfFeeding", { CID: 1, CNAME: "Oral" })
                  } 
                />
              </Label>{" "}
              <Label>
                Enteral (RT)
                <input
                  name="routeOfFeeding"
                  type="radio"
                  className="ml-1"
                  value="Enteral"
                  onChange={() =>
                    handleSelect("routeOfFeeding", { CID: 2, CNAME: "Enteral" })
                  } 
                />
              </Label>
            </div>

            <ReusableTextareaField
              className="border-2 text-[10px]"
              id="diet"
              label="Diet"
              rows={1}
              style={{ minHeight: "28px", padding: "6px 8px" }}
              value={historyGivenBy}
              onChange={(e) => setHistoryGivenBy(e.target.value)}
            />

            <ReusableTextareaField
              className="border-2 text-[10px]"
              id="remark"
              label="Remark"
              rows={1}
              style={{ minHeight: "28px", padding: "6px 8px" }}
              value={historyGivenBy}
              onChange={(e) => setHistoryGivenBy(e.target.value)}
            />
          </div>
        </div>

      
      </div> 
      <hr className="border-t mt-6 mb-2 border-gray-300" />*/}

      <div className="rounded-md space-y-4 text-[10px] text-gray-700">
        <H3 className="text-xs">📋 Nutritional Assessment</H3>

        {/* Food Intake */}
        <div>
          <Label className="block mb-1">Food Intake</Label>
          <div className="flex flex-wrap gap-4">
            {foodIntakeOptions.map((option) => (
              <label
                key={option.CID}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="foodIntake"
                  value={option.CNAME}
                  onChange={() => handleSelect("foodIntake", option)}
                  className="text-[10px]"
                />
                <span>{option.CNAME}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Weight Change */}
        <div>
          <Label className="block mb-1">
            Overall weight change (over past 3 months)
          </Label>
          <div className="flex flex-wrap gap-4">
            {weightChangeOptions.map((option) => (
              <label
                key={option.CID}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="weightChange"
                  value={option.CNAME}
                  onChange={() => handleSelect("weightChange", option)}
                  className="text-[10px]"
                />
                <span>{option.CNAME}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nutritional Status */}
        <div>
          <Label className="block mb-1">
            Overall nutritional status (physical signs)
          </Label>
          <div className="flex flex-wrap gap-4">
            {nutritionalStatusOptions.map((option) => (
              <label
                key={option.CID}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="nutritionalStatus"
                  value={option.CNAME}
                  onChange={() => handleSelect("nutritionalStatus", option)}
                  className="text-[10px]"
                />
                <span>{option.CNAME}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nutritional Signs / Symptoms */}
        <div>
          <Label className="block mb-1">Nutritional Signs / Symptoms</Label>
          <div className="flex flex-wrap items-center gap-4">
            {[
              ["Hyperacidity", isHyperacidity, setIsHyperacidity],
              ["Constipation", isConstipation, setIsConstipation],
              ["Nausea", isNausea, setIsNausea],
              ["Diarrhoea", isDiarrhoea, setIsDiarrhoea],
              ["Vomiting", isVomiting, setIsVomiting],
              ["Anorexia", isAnorexia, setIsAnorexia],
              ["Flatulence", isFlatulence, setIsFlatulence],
              ["Oral ulcer", isOralUlcer, setIsOralUlcer],
              ["Other Complaint", isOtherComplaint, setIsOtherComplaint],
              ["None", isNone, setIsNone],
            ].map(([label, value, setValue]) => (
              <Label key={label} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="mr-1 text-[10px]"
                  checked={value}
                  onChange={() => setValue(!value)}
                />
                {label}
              </Label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full mt-4 mb-2">
        <div className="flex items-center gap-2">
          <Label>
            Based on the above, total scores of the patients is at --
          </Label>
          {[
            "1 to 3 - Mild nutritional risk",
            "4 to 7 - Moderate nutritional risk",
            "< 7 - Severe nutritional risk",
          ].map((label) => (
            <Label key={label}>
              <input
                name="nutritionalRisk"
                type="radio"
                className="ml-1"
                checked={cvsResponse === label}
                onChange={() => handleSelect("nutritionalRisk", label)}
              />{" "}
              {label}
            </Label>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <H3>Diet Plan</H3>
        <div className="flex-1">
          <ReusableTextareaField
            id="dietPlan"
            className="border-1"
            label="🖊️"
            value={dietPlan}
            onChange={(e) => setDietPlan(e.target.value)}
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
