import { useState } from "react";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { FaArrowDown, FaLevelDownAlt } from "react-icons/fa";

const BloodConsent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lang, setLang] = useState("en");

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [rows, setRows] = useState([]);
  const [inputs, setInputs] = useState({
    date: "",
    component: "",
    quantity: "",
    bagNo: "",
    expDate: "",
    nurse: "",
    dr: "",
    startTime: "",
    stopTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = () => {
    setRows((prev) => [...prev, inputs]);
    // Clear inputs
    setInputs({
      date: "",
      component: "",
      quantity: "",
      bagNo: "",
      expDate: "",
      nurse: "",
      dr: "",
      startTime: "",
      stopTime: "",
    });
  };

  const handleDelete = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };
  const timeOptions = [
    "B. Transfusion",
    "Post Transfusion",
    "15 Min",
    "30 Min",
    "1 Hr",
    "2 Hr",
    "4 Hr",
  ];

  const vitalsLabels = [
    "Temp.",
    "Pulse",
    "Resp",
    "BP",
    "Rashes",
    "SOB",
    "Chills / Rigor",
    "SNDT",
  ];

  const initialVitalsState = vitalsLabels.reduce((acc, label) => {
    acc[label] = "";
    return acc;
  }, {});

  const [currentTime, setCurrentTime] = useState(timeOptions[0]);
  const [currentVitals, setCurrentVitals] = useState(initialVitalsState);
  const [vitalsTable, setVitalsTable] = useState([]);

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setCurrentVitals((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVitalsRow = () => {
    setVitalsTable((prev) => [
      ...prev,
      { time: currentTime, ...currentVitals },
    ]);
    setCurrentVitals(initialVitalsState);
  };

  const handleRemoveVitalsRow = (index) => {
    setVitalsTable((prev) => prev.filter((_, i) => i !== index));
  };
  const InputLine = ({ placeholder = "", className = "" }) => (
    <input
      type="text"
      placeholder={placeholder}
      className={`border-b border-dotted outline-none px-1 text-sm ${className}`}
    />
  );
  return (
    <div className="my-2 p-6 border rounded-lg shadow-md bg-white">
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 text-sm border rounded-lg shadow hover:bg-gray-100"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
        >
          {lang === "en" ? "Switch to Hindi" : "Switch to English"}
        </button>
      </div>

      {/* English Form */}
      {lang === "en" && (
        <div className="p-4 bg-white rounded-2xl shadow-md mt-2 border">
          <h2 className="text-3xl font-bold text-center mb-6 underline">
            Blood Transfusion Concent & Monitoring Record
          </h2>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 text-sm font-semibold mb-4">
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">Diagnosis :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">Ward/Bed No :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">Patient's ABO Rh. Group :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">Donor ABO Rh. Group :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
          </div>

          <div className="border border-b-1 border-black mb-2" />
          {/* Consent Statement */}
          <p className="text-sm mb-4 leading-relaxed">
            I <input className="border-b" /> hereby give consent for whole blood
            transfusion/blood components as part of treatment to myself/ my
            patient while being admitted at ONS Hospitals. I have been explained
            all the known risks of transfusion reactions. I have also been
            explained that the donor blood has been screened for HIV antibodies.
            Hepatitis B surface antigen. Hepatitis C antibodies. Malaria and
            Syphilis, I have also been explained that transfusion transmitted
            reactions can rarely occur even with screened blood, especially if
            it is in the "window period and also due to various other infections
            which cannot be screened for. I also understand that any blood
            component transfusions carry risk of transfusion associated
            reactions.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            All the above-mentioned risks have been explained to me by the
            doctor treating me/my patient in the language that i fully
            understand and I accept the same and give my consent for the whole
            blood / components transfusion to me/my patient.This consent is
            valid for 24 hrs.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            I have received a copy of "INFORMATION ON BLOOD TRANSFUSION FOR
            PATIENTS".
          </p>

          {/* Signatures Section */}

          <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
            <div>
              <DigitalSignatureSection title="Signature & Name of Patient/Attendant :" />

              <div className="flex gap-2 w-full mb-1">
                <label className="flex-shrink-0">
                  Relationship with Patient:
                </label>
                <input type="text" className="border-b w-full outline-none" />
              </div>

              <div className="flex gap-2 w-full">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="font-bold"></label>
              <DigitalSignatureSection title="Signature / Name of Consultant /RMO :" />

              <div className="flex gap-2 w-full">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr className="my-3" />

          <div className="">
            <div className="max-w-6xl mx-auto bg-white shadow-md p-6 print:p-0">
              <div className="overflow-x-auto mb-6">
                {/* Table headers + inputs */}
                <table className="w-full border-collapse table-auto">
                  <thead>
                    {/* Input row with Insert button */}
                    <tr className="text-xs">
                      <th className="border p-2 table-border">
                        <input
                          type="date"
                          name="date"
                          value={inputs.date}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="component"
                          value={inputs.component}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="number"
                          name="quantity"
                          value={inputs.quantity}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="bagNo"
                          value={inputs.bagNo}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="date"
                          name="expDate"
                          value={inputs.expDate}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="nurse"
                          value={inputs.nurse}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="dr"
                          value={inputs.dr}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="time"
                          name="startTime"
                          value={inputs.startTime}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="time"
                          name="stopTime"
                          value={inputs.stopTime}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <button
                          onClick={handleInsert}
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                        >
                          Insert
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>

                {/* Scrollable tbody */}
                <div className="max-h-30 overflow-y-auto">
                  <table className="w-full border-collapse table-auto">
                    <tbody>
                      {/* Column headers */}
                      <tr className="bg-gray-200 text-xs">
                        <th className="border p-2 table-border">Date</th>
                        <th className="border p-2 table-border">
                          Blood Components
                        </th>
                        <th className="border p-2 table-border">Quantity</th>
                        <th className="border p-2 table-border">Bag No.</th>
                        <th className="border p-2 table-border">
                          Date of Exp.
                        </th>
                        <th className="border p-2 table-border">
                          Recd. & Checked by Nurse
                        </th>
                        <th className="border p-2 table-border">
                          Checked by Dr.
                        </th>
                        <th className="border p-2 table-border">Start Time</th>
                        <th className="border p-2 table-border">Stop Time</th>
                        <th className="border p-2 table-border">Action</th>
                      </tr>
                      {rows.map((row, idx) => (
                        <tr key={idx} className="text-xs">
                          <td className="border p-2">{row.date}</td>
                          <td className="border p-2">{row.component}</td>
                          <td className="border p-2">{row.quantity}</td>
                          <td className="border p-2">{row.bagNo}</td>
                          <td className="border p-2">{row.expDate}</td>
                          <td className="border p-2">{row.nurse}</td>
                          <td className="border p-2">{row.dr}</td>
                          <td className="border p-2">{row.startTime}</td>
                          <td className="border p-2">{row.stopTime}</td>
                          <td className="border p-2">
                            <button
                              onClick={() => handleDelete(idx)}
                              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-sm border table-border">
                {/* Dropdown + inputs */}
                <div className="border-b p-2">
                  {/* Vitals inputs grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {/* Time dropdown */}
                    <select
                      className="border p-1 text-xs mb-2"
                      value={currentTime}
                      onChange={(e) => setCurrentTime(e.target.value)}
                    >
                      {timeOptions.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {vitalsLabels.map((label, i) => (
                      <input
                        key={i}
                        type="text"
                        name={label}
                        value={currentVitals[label]}
                        onChange={handleVitalsChange}
                        placeholder={label}
                        className="border text-xs p-1"
                      />
                    ))}{" "}
                    {/* Insert button */}
                    <div className="mt-2">
                      <button
                        onClick={handleAddVitalsRow}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-32 overflow-y-auto border rounded">
                  <table className="min-w-full border-collapse text-xs">
                    {/* Table Head */}
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="border px-2 py-1">Time</th>
                        <th className="border px-2 py-1">Temp</th>
                        <th className="border px-2 py-1">Pulse</th>
                        <th className="border px-2 py-1">Resp</th>
                        <th className="border px-2 py-1">BP</th>
                        <th className="border px-2 py-1">Rashes</th>
                        <th className="border px-2 py-1">SOB</th>
                        <th className="border px-2 py-1">Chills / Rigor</th>
                        <th className="border px-2 py-1">SNDT</th>
                        <th className="border px-2 py-1">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {vitalsTable.map((row, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="border px-2 py-1">{row.time}</td>
                          <td className="border px-2 py-1">{row.Temp}</td>
                          <td className="border px-2 py-1">{row.Pulse}</td>
                          <td className="border px-2 py-1">{row.Resp}</td>
                          <td className="border px-2 py-1">{row.BP}</td>
                          <td className="border px-2 py-1">{row.Rashes}</td>
                          <td className="border px-2 py-1">{row.SOB}</td>
                          <td className="border px-2 py-1">
                            {row["Chills / Rigor"]}
                          </td>
                          <td className="border px-2 py-1">{row.SNDT}</td>
                          <td className="border px-2 py-1">
                            <button
                              onClick={() => handleRemoveVitalsRow(idx)}
                              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* legend */}
          <div className="mt-6 text-sm grid grid-cols-3 gap-2">
            <div>
              <strong>COMPONENTS :</strong>
              <ul className="mt-2 list-disc ml-5">
                <li>WB - Whole Blood</li>
                <li>PRBC - Packed Red Blood Cell</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc ">
                <li>FFP - Fresh Frozen Plasma</li>
                <li>PLASMA - Plasma</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc ">
                <li>PLT - Platelet</li>
                <li>CRYO - Cryoprecipitate</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Hindi Form */}
      {lang === "hi" && (
        <div className="p-4 bg-white rounded-2xl shadow-md mt-2 border">
          <h2 className="text-3xl font-bold text-center mb-6 underline">
            रक्त चढ़ाने हेतु सहमति-पत्र एवं मॉनिटरिंग रिकार्ड
          </h2>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 text-sm font-semibold mb-4">
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">निदान :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">कमरा नं./विस्तर :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">मरीज का रक्त समूह :</label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
            <div className="flex gap-2 w-full">
              <label className="flex-shrink-0">
                रक्त दान करने वाले का रक्त समूह :
              </label>
              <input type="text" className="border-b w-full outline-none" />
            </div>
          </div>

          <div className="border border-b-1 border-black mb-2" />
          {/* Consent Statement */}
          <p className="text-sm mb-4 leading-relaxed">
            I <input className="border-b" /> इस सहमति-पत्र के द्वारा मेरे मरीज /
            मेरे ईलाज हेतु डी. एन. एस. हॉस्पिटल्स में ईलाज के दौरान आवश्यकता
            पड़ने पर खून चढ़ाने हेतु सहमति प्रदा करता हूँ। खून चढ़ाने के दौरान /
            बाद में इससे होने वाले दुष्प्रभावों के बारे में मुझे भली भाँति समझ
            दिया गया है मुझे यह भी बता दिया गया है कि देने वाल खून किसी भी
            प्रकार से जैसे एच.आई.वी. / हैपेटाइटिस बी / हैपेटाइटिस सी से ग्रसित
            नहीं है (सभी प्रकार की जाँच की जा चुकी है) किंतु विक परिस्थिति
            "विन्डो पिरियड" और किसी अन्य कारणों से ग्रसित हो सकता है जिसकी
            स्क्रीनिंग संभव नहीं है। मुझे रक्त व किसी भी प्रकार के उत्पादों की
            जटिलताओं या चढ़ाने के बाद होने वाले दुष्प्रभावों के बारे में अवगत
            करा दिया गया है एवं इस हेतु सहमति प्रदान करता हूँ।
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            उपरोक्त सभी संभव जटिलताओं / दुष्प्रभावों के बारे में मेरे चिकित्सक
            ने मुझे / मेरे मरीज को सरलतम भाषा में समझा दिया है और मैं / मेरे
            मरीज इरस के द्वारा चढ़ाने हेतु सहमति प्रदान करते है। इस सहमति की
            वैधता 24 घण्टे है।
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            "मरीजों के लिये ट्रांसफ्यूजन संबंधित जानकारी" की एक प्रति मुझे
            प्राप्त हो गयी है।
          </p>

          {/* Signatures Section */}

          <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
            <div>
              <DigitalSignatureSection title="मरीज/परिजन के हस्ताक्षर :" />

              <div className="flex gap-2 w-full mb-1">
                <label className="flex-shrink-0">मरीज के साथ संबंध</label>
                <input type="text" className="border-b w-full outline-none" />
              </div>

              <div className="flex gap-2 w-full">
                <label className="flex-shrink-0">दिनांक/समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="font-bold"></label>
              <DigitalSignatureSection
                title="चिकित्सक/आर.एन.ओ. का नाम / हस्ताक्षर
 :"
              />

              <div className="flex gap-2 w-full">
                <label className="flex-shrink-0">दिनांक/समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr className="my-3" />

          <div className="">
            <div className="max-w-6xl mx-auto bg-white shadow-md p-6 print:p-0">
              <div className="overflow-x-auto mb-6">
                {/* Table headers + inputs */}
                <table className="w-full border-collapse table-auto">
                  <thead>
                    {/* Input row with Insert button */}
                    <tr className="text-xs">
                      <th className="border p-2 table-border">
                        <input
                          type="date"
                          name="date"
                          value={inputs.date}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="component"
                          value={inputs.component}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="number"
                          name="quantity"
                          value={inputs.quantity}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="bagNo"
                          value={inputs.bagNo}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="date"
                          name="expDate"
                          value={inputs.expDate}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="nurse"
                          value={inputs.nurse}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="text"
                          name="dr"
                          value={inputs.dr}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="time"
                          name="startTime"
                          value={inputs.startTime}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <input
                          type="time"
                          name="stopTime"
                          value={inputs.stopTime}
                          onChange={handleInputChange}
                          className="w-full text-xs p-1 border"
                        />
                      </th>
                      <th className="border p-2 table-border">
                        <button
                          onClick={handleInsert}
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                        >
                          Insert
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>

                {/* Scrollable tbody */}
                <div className="max-h-30 overflow-y-auto">
                  <table className="w-full border-collapse table-auto">
                    <tbody>
                      {/* Column headers */}
                      <tr className="bg-gray-200 text-xs">
                        <th className="border p-2 table-border">दिनांक</th>
                        <th className="border p-2 table-border">
                        रक्त अवयव
                        </th>
                        <th className="border p-2 table-border">मात्रा</th>
                        <th className="border p-2 table-border">बैग न</th>
                        <th className="border p-2 table-border">
                          निष्क्रियता दिनांक
                        </th>
                        <th className="border p-2 table-border">
                        प्राप्तकर्ता व जाँचकर्ता नर्स द्वारा
                        </th>
                        <th className="border p-2 table-border">
                         जाँचकर्ता चिकित्सक द्वारा
                        </th>
                        <th className="border p-2 table-border">शुरु करने का समय</th>
                        <th className="border p-2 table-border">बंद क का</th>
                        <th className="border p-2 table-border">Action</th>
                      </tr>
                      {rows.map((row, idx) => (
                        <tr key={idx} className="text-xs">
                          <td className="border p-2">{row.date}</td>
                          <td className="border p-2">{row.component}</td>
                          <td className="border p-2">{row.quantity}</td>
                          <td className="border p-2">{row.bagNo}</td>
                          <td className="border p-2">{row.expDate}</td>
                          <td className="border p-2">{row.nurse}</td>
                          <td className="border p-2">{row.dr}</td>
                          <td className="border p-2">{row.startTime}</td>
                          <td className="border p-2">{row.stopTime}</td>
                          <td className="border p-2">
                            <button
                              onClick={() => handleDelete(idx)}
                              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-sm border table-border">
                {/* Dropdown + inputs */}
                <div className="border-b p-2">
                  {/* Vitals inputs grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {/* Time dropdown */}
                    <select
                      className="border p-1 text-xs mb-2"
                      value={currentTime}
                      onChange={(e) => setCurrentTime(e.target.value)}
                    >
                      {timeOptions.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {vitalsLabels.map((label, i) => (
                      <input
                        key={i}
                        type="text"
                        name={label}
                        value={currentVitals[label]}
                        onChange={handleVitalsChange}
                        placeholder={label}
                        className="border text-xs p-1"
                      />
                    ))}{" "}
                    {/* Insert button */}
                    <div className="mt-2">
                      <button
                        onClick={handleAddVitalsRow}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-32 overflow-y-auto border rounded">
                  <table className="min-w-full border-collapse text-xs">
                    {/* Table Head */}
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="border px-2 py-1">Time</th>
                        <th className="border px-2 py-1">Temp</th>
                        <th className="border px-2 py-1">Pulse</th>
                        <th className="border px-2 py-1">Resp</th>
                        <th className="border px-2 py-1">BP</th>
                        <th className="border px-2 py-1">Rashes</th>
                        <th className="border px-2 py-1">SOB</th>
                        <th className="border px-2 py-1">Chills / Rigor</th>
                        <th className="border px-2 py-1">SNDT</th>
                        <th className="border px-2 py-1">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {vitalsTable.map((row, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="border px-2 py-1">{row.time}</td>
                          <td className="border px-2 py-1">{row.Temp}</td>
                          <td className="border px-2 py-1">{row.Pulse}</td>
                          <td className="border px-2 py-1">{row.Resp}</td>
                          <td className="border px-2 py-1">{row.BP}</td>
                          <td className="border px-2 py-1">{row.Rashes}</td>
                          <td className="border px-2 py-1">{row.SOB}</td>
                          <td className="border px-2 py-1">
                            {row["Chills / Rigor"]}
                          </td>
                          <td className="border px-2 py-1">{row.SNDT}</td>
                          <td className="border px-2 py-1">
                            <button
                              onClick={() => handleRemoveVitalsRow(idx)}
                              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* legend */}
          <div className="mt-6 text-sm grid grid-cols-3 gap-2">
            <div>
              <strong>कम्पोनेन्टस् (रक्त के प्रकार) :</strong>
              <ul className="mt-2 list-disc ml-5">
                <li>डब्ल्यू बी. - सम्पूर्ण रक्त</li>
                <li>पी.आर.बी.सी. पैक्ड लाल रक्तसेल (कोशिका)</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc ">
                <li>एफ.एफ.पी. फ्रेश फ्रोजन प्लाज्मा</li>
                <li>प्लाज्मा प्लाज्मा (रक्तस्स)</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc ">
                <li>पी.एल.टी. प्लेट</li>
                <li>क्रायो क्रायोप्रेसि</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodConsent;
