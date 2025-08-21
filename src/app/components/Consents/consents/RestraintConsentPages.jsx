
"use client";

import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useState } from "react";

const InputLine = ({ placeholder = "", className = "" }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`border-b border-dotted outline-none px-1 text-sm ${className}`}
  />
);

export default function RestraintConsentPages() {
  const [lang, setLang] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    temperature: "",
    color: "",
    integrity: "",
    remarks: "",
    signature: "",
  });

  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addRow = () => {
    if (
      formData.date &&
      formData.time &&
      formData.temperature &&
      formData.color &&
      formData.integrity
    ) {
      setRows([...rows, formData]);
      setFormData({
        date: "",
        time: "",
        temperature: "",
        color: "",
        integrity: "",
        remarks: "",
        signature: "",
      });
    } else {
      alert("Please fill required fields!");
    }
  };

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
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="flex justify-between mb-2">
            <div>
              <span className="mr-2">Date</span>
              <InputLine placeholder="Enter Date" className="inline-block w-64" />
            </div>
            <div>
              <span className="mr-2">Ward / Bed</span>
              <InputLine
                placeholder="Ward / Bed"
                className="inline-block w-64"
              />
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold underline">
            INFORMED CONSENT FOR RESTRAINT & MONITORING CHART
          </h2>

          <p>
            We have been communicated & explained in the language we understand
            that our <br />
            <p className="flex items-center gap-2">
              <span className="font-bold">Patient:</span>
              <InputLine placeholder="Enter Patient" className="flex-1" />
            </p>
            <p className="flex items-center gap-2 mt-2">
              <span>is suffering from</span>
              <InputLine
                placeholder="Enter Disease/Condition"
                className="flex-1"
              />
              .
            </p>
          </p>

          <p>
            <span className="font-bold">Dr.</span>{" "}
            <InputLine
              placeholder="Doctor Name"
              className="inline-block w-48"
            />{" "}
            (treating physician) & clinical team recommend that our patient
            undergoing treatment at DNS Hospital, Indore needs restrained.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="font-bold">Reason:</label>
              <InputLine className="flex-1" />
            </div>

            <div className="flex items-center gap-2">
              <label className="font-bold">Type of Restraint:</label>
              <InputLine className="flex-1" />
            </div>
          </div>

          <p className="text-justify">
            This recommendation is based on their professional judgement & on a
            fall risk assessment that identifies our patient as being at an
            increased risk of falling due to (history of falling, sedating
            medications, impaired mobility, coagnition or impaired sight).
          </p>

          <p className="text-justify">
            Being restrainted will cause physical deconditioning and decrease
            functional ability and independance . It may predispose the patient
            to Pneumonia and aggravate bed sores .
          </p>

          <p className="text-justify">
            Confused or frail patient's efforts to escape restraints have caused
            skin injuries, nerve damage, gangrene of the limbs, falls while
            escaping from restraints and death from positional asphyxia .
          </p>

          <p className="text-justify">
            We understand that restraints often cause the patient’s to feel
            angry, afraid, demoralized and humiliated .
          </p>

          <p className="text-justify">
            With these understandings we consent that our patient be restrained
            as recommended . This consent is valid for 3 days .
          </p>

          <div className="w-full flex ">
            <div className="space-y-2 w-[300px]">
              <span className="font-bold">Doctor's Signature :</span>
              <DigitalSignatureSection />
              <p className="flex items-center gap-2">
                <span>Name :</span>
                <InputLine className="flex-1" placeholder="Enter Name" />
              </p>
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

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Relative / Guardian’s Signature</h4>
              <DigitalSignatureSection />
              <p className="flex gap-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex gap-2">
                Relation: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full my-2">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div className="justify-end">
              <h4 className="font-semibold">Witness’s Signature</h4>
              <DigitalSignatureSection />
              <p className="flex gap-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex gap-2">
                Address: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full my-2">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <h2 className="text-center font-semibold text-xl mt-6 mb-2 underline">
            Restraint Monitoring (Minimum Twice in a day)
          </h2>

          {/* Input Form */}
          <div className="grid md:grid-cols-8 gap-2">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Temp"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Integrity"
              name="integrity"
              value={formData.integrity}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="S/N Signature"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={addRow}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
          >
            Add Entry
          </button>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Skin Temperature</th>
                  <th className="border p-2">Skin Color</th>
                  <th className="border p-2">Skin Integrity</th>
                  <th className="border p-2">Remarks</th>
                  <th className="border p-2">S/N Signature</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{row.date}</td>
                    <td className="border p-2">{row.time}</td>
                    <td className="border p-2">{row.temperature}</td>
                    <td className="border p-2">{row.color}</td>
                    <td className="border p-2">{row.integrity}</td>
                    <td className="border p-2">{row.remarks}</td>
                    <td className="border p-2">{row.signature}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-3 text-gray-500">
                      No records added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hindi Form */}
      {lang === "hi" && (
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="flex justify-between mb-2">
            <div>
              <span className="mr-2">दिनांक</span>
              <InputLine placeholder="दिनांक" className="inline-block w-64" />
            </div>
            <div>
              <span className="mr-2">वार्ड / बेड</span>
              <InputLine
                placeholder="वार्ड / बेड"
                className="inline-block w-64"
              />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold underline">
            बाँध कर रखने (Restraints) हेतु सहमति-पत्र
          </h2>

          <p>
            मुझे/हमें हमारे चिकित्सक एवं उनके सहयोगियों द्वारा यह अच्छी तरह से सरल भाषा में समझा दिया है कि मेरा <span className="font-bold">मरीज</span>
            <InputLine
              placeholder="मरीज का नाम"
              className="inline-block flex-1"
            />{" "}
          </p>
          <p className="flex items-start gap-2">
            <span>जो कि</span>
            <InputLine className="inline-block flex-1" />{" "}
          </p>

          <p>
            बीमारी से ग्रसित है, एवं जिसका इलाज डी.एन.एस. हॉस्पिटल, इन्दौर में
            चल रहा है, को बाँध कर रखने की आवश्यकता है।
          </p>

          <p className="flex items-start gap-2">
            <span className="font-bold">बाँध कर रखने का कारण</span>
            <InputLine className="inline-block flex-1" />
          </p>

          <p className="flex items-start gap-2">
            <span className="font-bold">बाँध कर रखने का तरीका</span>
            <InputLine className="inline-block flex-1" />
          </p>

          <p className="text-justify">
            यह सलाह चिकित्सक के चिकित्सकीय अनुभव एवं fall risk assessment के आधार
            पर दी गई है। इन आधारों पर हमारे मरीज की निम्न कारणों से पलंग से
            गिरने की संभावना ज्यादा है, जैसे कि हाथ पैर का काम न करना, history of falling (पूर्व में किन्हीं कारणों से गिरने की वजह से) / बीमारी की
            वजह से पहचानने में तकलीफ होना / आँखों की दृष्टि खराब होना एवं दवाओं
            के प्रभाव में अर्धबेहोशी की स्थिति इत्यादि।
          </p>
          <p className="text-justify">
            इस वजह से मरीज को बाँधकर रखने पर हो सकता है कि मरीज को शारीरिक
            परेशानी हो एवं स्वतंत्रता महसूस न हो सके।
          </p>
          <p className="text-justify">
            इससे हो सकता है मरीज को निमोनिया और आगे चलकर पीठ/पुट्ठों/पैरों की
            एड़ियों पर घाव यानि Bedsores हो।
          </p>

          <p className="text-justify">
            दिमागी गफलत एवं शारीरिक रूप से कमजोर मरीज को बाँध कर रखने पर यदि वह
            विरोध करता है तो, हो सकता है उसको त्वचा में घाव हो जाए या कोई नस दब
            कर खराब हो, हाथ या पांव का खून की नस दबने की वजह से सड़ना (Gangrene)
            या अपने आप को छुड़ाने की जबरदस्ती में गिरकर शारीरिक चोट पहुंचना या
            फिर position की वजह से दम घुटना/श्वास का रुकना भी हो सकता है।
          </p>

          <p className="text-justify">
            यदि मरीज को बाँधकर रखा जाता है तो हम यह समझ गये है कि हो सकता है
            मरीज गुस्सा हो जाए / डर जाए/मानसिक तौर पर बिगड़ जाए या अपनी बेइज्जती
            महसूस करे।
          </p>

          <p className="text-justify">
            उपरोक्त सभी बिंदुओं को ध्यान में रखते हुए हम मरीज को बाँधकर रखने के
            लिए हमारी सहमति प्रदान करते है। यह सहमति 3 दिन के लिये वैध होगी।
          </p>

  <div className="mt-6">
            <h4 className="font-semibold">चिकित्सक के हस्ताक्षर</h4>
            <DigitalSignatureSection />
            <p className="flex gap-2">
              नाम: <InputLine className="inline-block w-48" />
            </p>
            <div className="flex gap-2 w-full my-2">
              <label className="flex-shrink-0">दिनांक / समय :</label>
              <DateTimeInput
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                time={selectedTime}
                onTimeChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">परिजन के हस्ताक्षर</h4>
              <DigitalSignatureSection />
              <p className="flex gap-2">
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex gap-2">
                संबंध: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full my-2">
                <label className="flex-shrink-0">दिनांक / समय :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold">गवाह के हस्ताक्षर</h4>
              <DigitalSignatureSection />
              <p className="flex gap-2">
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex gap-2">
                पता: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full my-2">
                <label className="flex-shrink-0">दिनांक / समय :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

        
          <h2 className="text-center font-semibold text-xl mt-6 mb-2 underline">
            Restraint Monitoring (Minimum Twice in a day)
          </h2>

          {/* Input Form */}
          <div className="grid md:grid-cols-8 gap-2">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Temp"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Skin Integrity"
              name="integrity"
              value={formData.integrity}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="S/N Signature"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={addRow}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
          >
            Add Entry
          </button>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Skin Temperature</th>
                  <th className="border p-2">Skin Color</th>
                  <th className="border p-2">Skin Integrity</th>
                  <th className="border p-2">Remarks</th>
                  <th className="border p-2">S/N Signature</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{row.date}</td>
                    <td className="border p-2">{row.time}</td>
                    <td className="border p-2">{row.temperature}</td>
                    <td className="border p-2">{row.color}</td>
                    <td className="border p-2">{row.integrity}</td>
                    <td className="border p-2">{row.remarks}</td>
                    <td className="border p-2">{row.signature}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-3 text-gray-500">
                      No records added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
