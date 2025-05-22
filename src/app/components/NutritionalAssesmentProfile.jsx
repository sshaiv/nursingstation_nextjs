import React, { useEffect, useState, useRef } from 'react';
import { H3, Label, ModalHeading } from '../common/text';
import ReusableInputField from '../common/SmallInputfields';
import ReusableTextareaField from '../common/ReusableTextareaField';
import { SaveButton } from '../common/Buttons';
import useFetchPatientHistory from '../hooks/fetchHistoryData';
import API_ENDPOINTS from '../constants/api_url';
import axios from 'axios';
import Select from 'react-select';
import DateTimeInput from '../common/DateTimeInput';

export default function NutritionalAssessmentProfile({ visitid, gssuhid, empid }) {
   
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState("");
   


    const [isDM, setIsDM] = useState(false);
    const [isHypertension, setIsHypertension] = useState(false);
    const [isRenal, setIsRenal] = useState(false);
    const [isCardiac, setIsCardiac] = useState(false);
    const [isRespiratory, setIsRespiratory] = useState(false);
    const [isLiver, setIsLiver] = useState(false);
    const [isOtherDisease, setIsOtherDisease] = useState(false);


   
    const [cvsResponse, setCvsResponse] = useState(null); // null, true for yes, false for no
    
    const [relationData, setRelationData] = useState([]);
    const [relation, setRelation] = useState("");
    const [historyGivenBy, setHistoryGivenBy] = useState("");
    const clearSignature = () => sigCanvasRef.current?.clear();
    const sigCanvasRef = useRef(null);

  

    const handleSave = async () => {
        console.log("🚀 Saving payload:", derivedJson);
        try {
            const response = await axios.post(API_ENDPOINTS.saveClinicalExamination, derivedJson);
            console.log("api", response);
            alert("Data saved successfully!");
        } catch (error) {
            console.error("❌ Error saving data:", error);
            alert("Failed to save data. Please try again.");
        }
    };


    const relationOptions = relationData.map(item => ({
        value: item.CID,
        label: item.CNAME,
    }));
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

    return (
        <div className="p-4 bg-purple-50 min-h-screen text-sm text-gray-700">
            <ModalHeading title="Nutritional Assessment Profile" />
            <hr className="border-t mt-6 mb-2 border-gray-300" />
            {/* Personal History */}
            <div className="space-y-3">
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <H3>📋 Personal History</H3>
                    <Label >
                        <input type="checkbox"
                        // checked={isAlcohol} 
                        // onChange={() => setIsAlcohol(!isAlcohol)}
                        />
                        Alcohol
                    </Label>
                    <Label >
                        <input type="checkbox"
                        // checked={isTobacco} 
                        // onChange={() => setIsTobacco(!isTobacco)}
                        />
                        Tobacco
                    </Label>
                    <Label >
                        <input type="checkbox"
                        // checked={isTobacco} 
                        // onChange={() => setIsTobacco(!isTobacco)}
                        />
                        Smoking
                    </Label>
                    <Label >
                        <input type="checkbox"
                        // checked={isTobacco} 
                        // onChange={() => setIsTobacco(!isTobacco)}
                        />
                        None
                    </Label>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    {/* Food Habit */}
                    <div className="flex items-center gap-2">
                        <Label >Food Habit</Label>
                        <Label >Veg
                            <input
                                name="foodHabit"
                                type="radio"
                                className="ml-1"
                                checked={cvsResponse === true}
                                onChange={() => setCvsResponse(true)}
                            />
                        </Label>
                        <Label >Non-Veg
                            <input
                                name="foodHabit"
                                type="radio"
                                className="ml-1"
                                checked={cvsResponse === false}
                                onChange={() => setCvsResponse(false)}
                            />
                        </Label>
                    </div>

                    {/* Clinical Data & Other Habits - moved here */}
                    <div className="flex items-center gap-2 w-full">
                        {/* Clinical Data */}
                        <div className="flex items-center gap-2 w-1/2">
                            <Label >Clinical Data</Label>
                            <Select
                                className="w-full text-sm"
                                styles={{
                                    menu: (base) => ({ ...base, fontSize: '12px' }),
                                    menuList: (base) => ({ ...base, maxHeight: '80px', overflowY: 'auto' }),
                                    control: (base) => ({ ...base, minHeight: '30px', fontSize: '12px' }),
                                    indicatorsContainer: (base) => ({ ...base, height: '30px' }),
                                    dropdownIndicator: (base) => ({ ...base, padding: '4px' }),
                                }}
                                options={relationOptions}
                                value={relationOptions.find(opt => opt.value === relation)}
                                onChange={(selected) => setRelation(selected.value)}
                                placeholder="Relation"
                                isSearchable
                                filterOption={(option, inputValue) =>
                                    option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* Other Habits */}
                        <div className="flex items-center gap-2 w-1/2">
                            <Label >Other Habits</Label>
                            <Select
                                className="w-full text-sm"
                                styles={{
                                    menu: (base) => ({ ...base, fontSize: '12px' }),
                                    menuList: (base) => ({ ...base, maxHeight: '80px', overflowY: 'auto' }),
                                    control: (base) => ({ ...base, minHeight: '30px', fontSize: '12px' }),
                                    indicatorsContainer: (base) => ({ ...base, height: '30px' }),
                                    dropdownIndicator: (base) => ({ ...base, padding: '4px' }),
                                }}
                                options={relationOptions}
                                value={relationOptions.find(opt => opt.value === relation)}
                                onChange={(selected) => setRelation(selected.value)}
                                placeholder="Relation"
                                isSearchable
                                filterOption={(option, inputValue) =>
                                    option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                                }
                            />
                        </div>




                    </div>
                    {/* Body Mass Index */}
                    <div className="flex items-center gap-2">
                        <Label >Body Mass Index</Label>

                        <ReusableTextareaField
                            id="organomegaly"
                            className='border-1 w-full'
                            label="kg/m2"
                        // value={organomegaly} 
                        // onChange={(e) => setOrganomegaly(e.target.value)}
                        />
                    </div>



                    {/* Food Allergy */}
                    <div className="flex items-center gap-4 w-full mb-2">
                        <div className="flex items-center gap-2">
                            <Label >Food Allergy</Label>
                            <Label >
                                Yes
                                <input
                                    name="foodAllergy"
                                    type="radio"
                                    className="ml-1"
                                    checked={cvsResponse === true}
                                    onChange={() => setCvsResponse(true)}
                                />
                            </Label>
                            <Label >
                                No
                                <input
                                    name="foodAllergy"
                                    type="radio"
                                    className="ml-1"
                                    checked={cvsResponse === false}
                                    onChange={() => setCvsResponse(false)}
                                />
                            </Label>
                        </div>

                        <ReusableTextareaField
                            id="organomegaly"
                            className='border-1 w-full'
                            label="if yes then specify"
                        // value={organomegaly} 
                        // onChange={(e) => setOrganomegaly(e.target.value)}
                        />
                    </div>
                </div>



            </div>


            <div className="mt-4 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                    <H3>📋 Past History</H3>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isDM} onChange={() => setIsDM(!isDM)} /> DM
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isHypertension} onChange={() => setIsHypertension(!isHypertension)} /> Hypertension
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isRenal} onChange={() => setIsRenal(!isRenal)} /> Renal
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isCardiac} onChange={() => setIsCardiac(!isCardiac)} /> Cardiac
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isRespiratory} onChange={() => setIsRespiratory(!isRespiratory)} /> Respiratory Disease
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isLiver} onChange={() => setIsLiver(!isLiver)} /> Liver Disease
                    </Label>
                    <Label>
                        <input type="checkbox" className="mr-1" checked={isOtherDisease} onChange={() => setIsOtherDisease(!isOtherDisease)} /> Other Disease
                    </Label>
                </div>


            </div>


            {/* Present Medical illness */}
            <div className="mt-4 flex items-start gap-4">
                <H3>Present Medical illness</H3>
                <div className="flex-1">
                    <ReusableTextareaField
                        id="provisionaldiagnosis"
                        className='border-1'
                        label="🖊️"

                    //   value={provisionaldiagnosis} onChange={(e) => setProvisionaldiagnosis(e.target.value)} 
                    />
                </div>
            </div>
 <hr className="border-t mt-6 mb-2 border-gray-300" />

            {/* Daily Nutritional Assessment */}
      <div className="space-y-4">
  <H3>✅ Daily Nutritional Assessment</H3>

  <div className="flex flex-col md:flex-row gap-4">
    {/* Left Column */}
    <div className="flex flex-col gap-3 w-full md:w-1/2">
      {/* Route of Feeding */}
      <div className="flex flex-col gap-1">
        <Label>Route of Feeding</Label>
        <div className="flex items-center gap-4">
          <Label className="flex items-center gap-1">
            Oral
            <input
              name="foodAllergy"
              type="radio"
              checked={cvsResponse === true}
              onChange={() => setCvsResponse(true)}
            />
          </Label>
          <Label className="flex items-center gap-1">
            Enteral (RT)
            <input
              name="foodAllergy"
              type="radio"
              checked={cvsResponse === false}
              onChange={() => setCvsResponse(false)}
            />
          </Label>
        </div>
      </div>

      {/* Diet */}
      <ReusableTextareaField
        className="border-2 text-[10px]"
        id="diet"
        label="Diet"
        rows={1}
        style={{ minHeight: '28px', padding: '6px 8px' }}
        value={historyGivenBy}
        onChange={(e) => setHistoryGivenBy(e.target.value)}
      />

      {/* Remark */}
      <ReusableTextareaField
        className="border-2 text-[10px]"
        id="remark"
        label="Remark"
        rows={1}
        style={{ minHeight: '28px', padding: '6px 8px' }}
        value={historyGivenBy}
        onChange={(e) => setHistoryGivenBy(e.target.value)}
      />
    </div>

    {/* Right Column - Signature Box */}
    <div className="border border-gray-800 w-full md:w-1/2 h-[90px] mt-10" />
  </div>

  {/* Date & Time and Buttons - Positioned Below Both Columns */}
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="w-full md:w-1/2">
      <DateTimeInput
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        time={time}
        onTimeChange={(e) => setTime(e.target.value)}
        label="Date & Time"
      />
    </div>
    <div className="flex gap-2">
      <button
        onClick={clearSignature}
        className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-[10px]"
      >
        Clear
      </button>
      <button className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-[10px]">
        Show
      </button>
    </div>
  </div>
</div>


 <hr className="border-t mt-6 mb-2 border-gray-300" />
            {/* Personal History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nutritional Assessment */}
                <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center gap-2 w-1/2">
                        <Label>Nutritional Assessment</Label>
                        <Select
                            className="w-full text-sm"
                            styles={{
                                menu: (base) => ({ ...base, fontSize: '12px' }),
                                menuList: (base) => ({ ...base, maxHeight: '80px', overflowY: 'auto' }),
                                control: (base) => ({ ...base, minHeight: '30px', fontSize: '12px' }),
                                indicatorsContainer: (base) => ({ ...base, height: '30px' }),
                                dropdownIndicator: (base) => ({ ...base, padding: '4px' }),
                            }}
                            options={relationOptions}
                            value={relationOptions.find((opt) => opt.value === relation)}
                            onChange={(selected) => setRelation(selected.value)}
                            placeholder="Relation"
                            isSearchable
                            filterOption={(option, inputValue) =>
                                option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                            }
                        />
                    </div>
                </div>

                {/* Food Intake */}
                <div className="flex items-center gap-4 w-full mb-2">
                    <div className="flex items-center gap-2">
                        <Label>Food Intake --</Label>
                        {['Normal', 'Decreased', 'Increased'].map((label) => (
                            <Label key={label}>
                                <input
                                    name="foodIntake"
                                    type="radio"
                                    className="ml-1"
                                    checked={cvsResponse === label}
                                    onChange={() => setCvsResponse(label)}
                                /> {label}
                            </Label>
                        ))}
                    </div>
                </div>

                {/* Overall Weight Change */}
                <div className="flex flex-col items-start gap-2 w-full mb-2">
                    <Label>Overall weight change (over past 3 months) --</Label>
                    {['No Change', 'Decreased', 'Increased'].map((label) => (
                        <Label key={label}>
                            <input
                                name="weightChange"
                                type="radio"
                                className="ml-1"
                                checked={cvsResponse === label}
                                onChange={() => setCvsResponse(label)}
                            /> {label}
                        </Label>
                    ))}
                </div>

                {/* Nutritional Status */}
                <div className="flex flex-col items-start gap-2 w-full mb-2">
                    <Label>Overall Nutritional status (physical signs) --</Label>
                    {['well nourished', 'moderately malnourished', 'severely malnourished'].map((label) => (
                        <Label key={label}>
                            <input
                                name="nutritionStatus"
                                type="radio"
                                className="ml-1"
                                checked={cvsResponse === label}
                                onChange={() => setCvsResponse(label)}
                            /> {label}
                        </Label>
                    ))}
                </div>


                {/* Nutritional Signs/Symptoms */}
                <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center gap-2 w-1/2">
                        <Label>Nutritional Signs/Symptoms</Label>
                        <Select
                            className="w-full text-sm"
                            styles={{
                                menu: (base) => ({ ...base, fontSize: '12px' }),
                                menuList: (base) => ({ ...base, maxHeight: '80px', overflowY: 'auto' }),
                                control: (base) => ({ ...base, minHeight: '30px', fontSize: '12px' }),
                                indicatorsContainer: (base) => ({ ...base, height: '30px' }),
                                dropdownIndicator: (base) => ({ ...base, padding: '4px' }),
                            }}
                            options={relationOptions}
                            value={relationOptions.find((opt) => opt.value === relation)}
                            onChange={(selected) => setRelation(selected.value)}
                            placeholder="Relation"
                            isSearchable
                            filterOption={(option, inputValue) =>
                                option.label.toLowerCase().startsWith(inputValue.toLowerCase())
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Symptoms Checkboxes */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
                {[
                    ['Hyperacidity', isDM, setIsDM],
                    ['Constipation', isHypertension, setIsHypertension],
                    ['Nausea', isRenal, setIsRenal],
                    ['Diarrhoea', isCardiac, setIsCardiac],
                    ['Vomiting', isRespiratory, setIsRespiratory],
                    ['Anorexia', isLiver, setIsLiver],
                    ['Flatulence', isOtherDisease, setIsOtherDisease],
                    ['Oral ulcer', isOtherDisease, setIsOtherDisease],
                    ['None', isOtherDisease, setIsOtherDisease],
                    ['Other Complaint', isOtherDisease, setIsOtherDisease],
                ].map(([label, value, setValue]) => (
                    <Label key={label}>
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={value}
                            onChange={() => setValue(!value)}
                        />{' '}
                        {label}
                    </Label>
                ))}
            </div>

            {/* Nutritional Risk Assessment */}
            <div className="flex items-center gap-4 w-full mb-2">
                <div className="flex items-center gap-2">
                    <Label>Based on the above, total scores of the patients is at --</Label>
                    {[
                        '1 to 3 - Mild nutritional risk',
                        '4 to 7 - Moderate nutritional risk',
                        '< 7 - Severe nutritional risk',
                    ].map((label) => (
                        <Label key={label}>
                            <input
                                name="nutritionalRisk"
                                type="radio"
                                className="ml-1"
                                checked={cvsResponse === label}
                                onChange={() => setCvsResponse(label)}
                            />{' '}
                            {label}
                        </Label>
                    ))}
                </div>
            </div>

            {/* Diet Plan */}
            <div className="mt-4 flex items-start gap-4">
                <H3>Diet Plan</H3>
                <div className="flex-1">
                    <ReusableTextareaField id="provisionaldiagnosis" className="border-1" label="🖊️" />
                </div>
            </div>



            {/* ......................................................................................... */}
            <hr className="border-t mt-6 mb-2 border-gray-300" />
            <div className="flex justify-center mt-6">
                <SaveButton label="Save" onClick={handleSave} />
            </div>
        </div>
    );
}

