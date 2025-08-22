// /components/MriConsentForm.js

import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

const MriConsentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="my-2 p-6 border rounded-lg shadow-md bg-white">
      <div className="space-y-4 text-sm leading-relaxed">
        {/* Header */}

        <div className="text-center">
          <h1 className="text-2xl font-bold">CONSENT FORM FOR M.R.I.</h1>
          <h2 className="text-lg font-bold">एम.आर.आई. के लिए सहमति-पत्र</h2>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 border-black py-2">
          <div className="flex items-center">
            <label className="w-24">Date / Time:</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="w-15">Reg. No.</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="w-24">IPD / OPD No.</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>

          {/* THIS IS THE CORRECTED LINE - ADDED md:col-span-3 */}
          <div className="flex w-full items-center gap-x-4 md:col-span-3 mt-1">
            {/* Patient's Name (will expand to fill available space) */}
            <label
              htmlFor="patientName"
              className="flex-shrink-0 font-semibold"
            >
              Patient's Name{" "}
              <span className="text-xs font-normal">(IN BLOCK letters)</span>
            </label>
            <input
              id="patientName"
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />

            {/* Age (fixed width) */}
            <label htmlFor="age" className="ml-4 flex-shrink-0 font-semibold">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="w-16 border-b border-gray-400 focus:outline-none"
            />

            {/* Sex (fixed width) */}
            <div className="flex items-center flex-shrink-0">
              <span className="mr-2 font-semibold">Sex:</span>
              <label className="flex items-center mr-2 cursor-pointer">
                <input type="radio" name="sex" value="M" className="mr-1" />M
              </label>
              <span>/</span>
              <label className="flex items-center ml-2 cursor-pointer">
                <input type="radio" name="sex" value="F" className="mr-1" />F
              </label>
            </div>
          </div>

          <div className="col-span-3 flex items-center mt-1">
            <label className="w-15">Address</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label className="w-15">Pin code</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label className="w-15">Ph. No.</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
        </div>

        {/* Clinical Details */}
        <div className="">
          <div className="flex items-center">
            <label className="w-48">Clinical Details:</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label className="w-48">Provisional Diagnosis:</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label className="w-48">Examination required:</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label>
              Is sedation required?{" "}
              <input type="radio" name="sedationRequired" className="mx-1" />{" "}
              Yes{" "}
              <input type="radio" name="sedationRequired" className="mx-1" /> No
            </label>
          </div>
          <div className="flex items-center mt-1">
            <label className="w-64">
              Name of Referring Doctor (Consultant):
            </label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
            <label className="w-24 ml-4">Ph. No.</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-1">
            <label className="w-64">Signature of Referring Doctor / RMO:</label>
            <input
              type="text"
              className="border-b border-gray-400 flex-grow focus:outline-none"
            />
          </div>
        </div>

        {/* Consent Section */}
        <div className="border-t-2 border-b-2 border-black border-dotted my-4 py-2">
          <h3 className="text-center font-bold">CONSENT FOR M.R.I.</h3>
          <ul className="list-disc list-inside text-sm">
            <li>
              I / We do here by certify that the information given by me/us is
              correct to the best of my/our knowledge.
            </li>
            <li>
              I / We have read the enclosed list carefully and after
              understanding have given my / our consent.
            </li>
            <li>
              I / We give my / our consent for MRI and I / we am getting it done
              at my / our own risk.
            </li>
            <li>
              I / We have received the information on MRI in the language I / we
              understand.
            </li>
            <li>
              I / We give my / our consent to administer gadolinium injection or
              any sedative, if required so, to perform MRI.
            </li>
            <li>
              I / We have been explained the possible side effect and
              complication of gadolinium and / or sedative agent to be
              administered and I / We willingly give my / our consent to
              administer these.
            </li>
          </ul>
          <h3 className="text-center font-bold mt-2">एम.आर.आई. के लिए सहमति</h3>
          <p className="text-sm text-justify mt-1">
            मैं / हम प्रमाणित करता हूँ करते है कि उपरोक्त सूचनाएं सही है। मैंने
            / हमने इस प्रपत्र के पृष्ठ में दी गई समूची सूची को पूरी तरह से पढ़
            एवं समझ लिया है। मैं अपने मरीज की एम. आर. आय. जाँच अपनी जिम्मेदारी
            पर करा रहा हूँ। एम. आर. आय. से सम्बन्धित सभी जानकारी मुझे मेरी भाषा
            में प्राप्त हो गई है, तथा जरुरत होने पर गेडोलीनियम (Gadolinium)
            इंजेक्शन अथवा नींद का इंजेक्शन लगाने की जरुरत पड़ सकती है, साथ ही
            संभावित दुष्परिणाम की जानकारी भी मुझे दी गई है, यह समझते हुए मैं यह
            इंजेक्शन लगाने की सहमति देता हूँ
          </p>
        </div>

        {/* Signature Section */}
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <label className="block">Signature of Guardian/Witness</label>
            <label className="block">परिजन/गवाह का नाम एवं हस्ताक्षर</label>
            {/* <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            /> */}
            <DigitalSignatureSection />

            <label className="block mt-1">Name / नाम</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            />
            <label className="block mt-1">
              Relation with Patient / मरीज से रिश्ता
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            />
            <label className="block mt-1">Time & Date / समय एवं दिनांक</label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block">
              Signature of Patient / मरीज के हस्ताक्षर
            </label>
            <DigitalSignatureSection />

            {/* <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            /> */}
            <label className="block mt-1">Time & Date / समय / दिनांक</label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setSelectedTime(e.target.value)}
            />
            <label className="block mt-1">
              Doctor's Sign (Radiologist) / डाक्टर के हस्ताक्षर
            </label>
            <DigitalSignatureSection />
            <label className="block mt-1">Name of Doctor / डाक्टर का नाम</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            />
          </div>
        </div>

        {/* Doctors Use Only Tables */}
        <div className="grid grid-cols-2 gap-0 mt-2 border border-black">
          {/* Left Table */}
          <div className="border-r border-black">
            <h4 className="text-center font-bold bg-gray-200 p-1">
              FOR DOCTORS / TECH. USE ONLY
            </h4>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">EXAM NO.</td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">
                    CONTRAST USED
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">
                    NO. OF FILM(S)
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">
                    SEDATION/ANAESTHESIA
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1" colSpan="2">
                    DR. SIGN{" "}
                    <input
                      type="text"
                      className="w-1/3 border-b border-gray-400"
                    />{" "}
                    TECH SIGN{" "}
                    <input
                      type="text"
                      className="w-1/3 border-b border-gray-400"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Right Table */}
          <div>
            <h4 className="text-center font-bold bg-gray-200 p-1">
              FOR DOCTORS / TECH. USE ONLY
            </h4>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">
                    RECEIPT NO.
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">
                    CHARGED AMOUNT
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">PAID</td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3 border-b border-black">BALANCE</td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1">REMARKS</td>
                  <td className="p-1">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0 border-x border-b border-black">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="p-1 w-1/3 border-r border-b border-black">
                  PREVIOUS MRI
                </td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 w-1/3 border-r border-b border-black">
                  PREVIOUS X-RAY
                </td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 w-1/3 border-r border-black">
                  ALLERGIES/ASTHMA
                </td>
                <td className="p-1">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="p-1 w-1/3 border-b border-black">PREVIOUS CT</td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 w-1/3 border-b border-black">
                  PREVIOUS ULTRASOUND
                </td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 w-1/3">PREGNANCY</td>
                <td className="p-1">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <p>
            1. Please give{" "}
            <input type="text" className="w-16 border-b border-gray-400 mx-1" />{" "}
            ml of contrast intravenously (Ionic / Non Ionic)
          </p>
          <p className="mt-2">
            2. The investigation advised by clinician is found{" "}
            <input type="radio" name="found" className="mx-1" /> not found{" "}
            <input type="radio" name="found" className="mx-1" /> appropriate
            considering clinical findings.
          </p>
          <p className="mt-2">3. Discussed with clinician.</p>
          <div className="mt-4 space-y-2">
            {/* Radiologist's Sign Row */}
            <div className="flex flex-row justify-end items-center">
              {/* <label htmlFor="radiologistSign" className="mr-2">
      Radiologist's Sign:
    </label> */}
              <div id="radiologistSign">
                <DigitalSignatureSection title={"Radiologist's Sign:"} />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="flex justify-end items-center">
              <label htmlFor="dateTime" className="mr-2">
                Date & Time:
              </label>
              <DateTimeInput
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                time={selectedTime}
                onTimeChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="border-2 border-black mt-4 p-2">
          <h3 className="text-center font-bold">Check List / जाँच सूची</h3>
          <p className="font-semibold">कृपया इसे पढ़कर सही जवाब दें -</p>
          <div className="space-y-2 mt-2 text-sm">
            <div className="flex justify-between items-center">
              <span>
                1. क्या आपको किसी भी प्रकार की शल्य चिकित्सा हुई है? यदि हाँ तो
                कृपया ब्यौरा दें। Have you undergone surgery in past? If yes
                give details.
              </span>
              <span>
                <input type="radio" name="checklist-surgery" className="mx-1" />{" "}
                हाँ/Yes
                <input
                  type="radio"
                  name="checklist-surgery"
                  className="mx-1"
                />{" "}
                नहीं/No
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                2. क्या आप गर्भवती हैं? अथवा माहवारी की पिछ्ली तारीख से गर्भ की
                संभावना है? Are you pregnant or have suspicion of pregnancy
                based on LMP?
              </span>
              <span>
                <input
                  type="radio"
                  name="checklist-pregnancy"
                  className="mx-1"
                />{" "}
                हाँ/Yes
                <input
                  type="radio"
                  name="checklist-pregnancy"
                  className="mx-1"
                />{" "}
                नहीं/No
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                3. क्या आप किसी धातु से घायल (जख्मी) हुए हैं? Have you been
                injured with metal object?
              </span>
              <span>
                <input type="radio" name="checklist-metal" className="mx-1" />{" "}
                हाँ/Yes
                <input
                  type="radio"
                  name="checklist-metal"
                  className="mx-1"
                />{" "}
                नहीं/No
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                4. क्या आपको किसी दवा से एलर्जी है? Are you allergic to any
                medicine?
              </span>
              <span>
                <input type="radio" name="checklist-allergy" className="mx-1" />{" "}
                हाँ/Yes
                <input
                  type="radio"
                  name="checklist-allergy"
                  className="mx-1"
                />{" "}
                नहीं/No
              </span>
            </div>
          </div>
          <p className="mt-4 font-semibold">
            निम्नलिखित वस्तुएँ एम.आर.आई. परीक्षण एवं परिणाम में विपरीत प्रभाव दे
            सकती है, कृपया ब्यौरा दें - Following items may be potentially
            hazardous or interfere with the study and results of MRI
            examination, please give details -
          </p>
        </div>

        {/* Detailed Hazard Table */}
        <table className="w-full border-collapse border border-black mt-0 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-1">DETAIL</th>
              <th className="border border-black p-1 w-12">YES</th>
              <th className="border border-black p-1 w-12">NO</th>
              <th className="border border-black p-1">DETAIL</th>
              <th className="border border-black p-1 w-12">YES</th>
              <th className="border border-black p-1 w-12">NO</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cardiac Pacemaker", "हृदय का पेसमेकर / पेसिंग वायर"],
              ["Aneurysm Clip", "सर्जिकल क्लिप / एन्यूरिज्म क्लिप"],
              [
                // This is the combined cell you requested
                <>
                  Any type of internal electrode(s) including:
                  <br /> Pacing wires,
                  <br /> Internal Hearing aid,
                  <br /> Cochlear implant,
                  <br /> Intravascular coil / filter / stent
                </>,
                // I have also combined the corresponding Hindi text
                <>
                  किसी प्रकार के शरीर के अंदर स्थापित किए जाने वाले इलेक्ट्रोड:
                  <br /> पेसिंग वायर,
                  <br /> सुनने की मशीन,
                  <br /> कोकलियर इम्प्लांट,
                  <br /> रक्त धमनियों में लगने वाले कॉयल / फिल्टर / स्टेंट
                </>,
              ],
              // The rest of the items remain separate as per the form
              [
                "Vascular Haemostatic / Surgical Clips",
                "ऑपरेशन में इस्तेमाल की जाने वाली क्लिप",
              ],
              ["Orbital / Eye Prosthesis", "आँखों में लगने वाले कृत्रिम अंग"],
              ["Implanted Insulin Pump", "शरीर में लगने वाले इंसुलिन पंप"],
              ["Heart Valve Prosthesis", "हृदय के कृत्रिम वाल्व"],
              [
                "Ear Implant / Lens Implant",
                "कान में लगने वाले सुनने की मशीन/लेंस",
              ],
              ["Diaphragm / IUD", "डायफ्राम / आई.यू.डी."],
              [
                <>
                  Orthopedic device (pins, rods,
                  <br />
                  screws, plates, prosthesis)
                </>,
                <>
                  हड्डी में लगने वाले स्क्रू, प्लेट, रॉड
                  <br />
                  अन्य कृत्रिम जोड
                </>,
              ],
              ["Dentures / Dental braces", "नकली दाँत या ब्रेस्"],
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-1">{item[0]}</td>
                {/* English Radio Group: only one can be selected per row */}
                <td className="border border-black p-1 text-center">
                  <input type="radio" name={`hazard-en-${index}`} value="yes" />
                </td>
                <td className="border border-black p-1 text-center">
                  <input type="radio" name={`hazard-en-${index}`} value="no" />
                </td>

                <td className="border border-black p-1">{item[1]}</td>
                {/* Hindi Radio Group: only one can be selected per row */}
                <td className="border border-black p-1 text-center">
                  <input type="radio" name={`hazard-hi-${index}`} value="yes" />
                </td>
                <td className="border border-black p-1 text-center">
                  <input type="radio" name={`hazard-hi-${index}`} value="no" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Final Signature */}
        <div className="flex flex-col items-end mt-4">
          <label className="font-semibold">
            Signature (Patient/Guardian) <br /> हस्ताक्षर (मरीज/परिजन)
          </label>
          <div className="mt-1">
            <DigitalSignatureSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MriConsentForm;
