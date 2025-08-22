// /components/CtScanConsentForm.js

import { useState } from "react";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";

const CtScanConsentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="my-2 p-6 border rounded-lg shadow-md bg-white text-sm">
      <div className="space-y-4 leading-relaxed">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">CONSENT FORM FOR C.T. SCAN</h1>
          <h2 className="text-lg font-bold">सी.टी. स्कैन के लिए सहमति-पत्र</h2>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 py-2">
          <div className="flex items-center">
            <label className="w-24">Date / Time:</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="w-24">Reg. No.</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-24">IPD / OPD No.</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 flex w-full items-center gap-x-4 mt-1">
            <label htmlFor="patientName" className="flex-shrink-0">
              Patient's Name
              <br />
              <span className="text-xs">(IN BLOCK letters)</span>
            </label>
            <input
              id="patientName"
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
            <label htmlFor="age" className="ml-4 flex-shrink-0">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="w-16 border-b border-gray-400 focus:outline-none"
            />
            Year
            <label htmlFor="years" className="ml-4 flex-shrink-0">
              Sex:
            </label>
            <label className="flex items-center ml-2 cursor-pointer">
              <input type="radio" name="sex" value="M" className="mr-1" />M
            </label>
            <label className="flex items-center ml-2 cursor-pointer">
              <input type="radio" name="sex" value="F" className="mr-1" />F
            </label>
          </div>
          <div className="md:col-span-3 flex items-center mt-1">
            <label className="w-20">Address</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 flex items-center mt-1">
            <label className="w-20">Pin code</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
            <label className="ml-4 w-20">Ph. No.</label>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Clinical Details Section */}
        <div className="space-y-1">
          <div className="flex items-start">
            <span className="w-48">
              1. Clinical Details / Relevant Medical History:
            </span>
            <textarea className="flex-grow border border-gray-400 rounded-md p-1 h-12 focus:outline-none"></textarea>
          </div>
          <div className="flex items-center">
            <span className="w-48">2. Known Allergies:</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
              placeholder="Drugs / Iodine / Others [In case of drugs (Write Medicines Name)]"
            />
          </div>
          <div className="flex items-center">
            <span className="w-48">3. Provisional Diagnosis:</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <span className="w-48">4. Examination Required:</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <span className="w-48">5. S. Creatinine Report</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="w-64">Name of Referring Doctor (Consultant):</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
            <span className="ml-4 w-20">Ph. No.</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <span className="w-64">Signature of Referring Doctor / RMO:</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Consent Section */}
        <div className="border-t-2 border-b-2 border-black border-dotted my-4 py-2">
          <h3 className="text-center font-bold">CONSENT FOR CT SCAN</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li className="text-justify">
              I have been advised by my treating doctor to undergo a CT Scan for
              diagnostic / evaluation purpose.
            </li>
            <li className="text-justify">
              I have been explained the need of intravenous / oral contrast for
              my CT Scan study which will help in better evaluation of the area
              under study. The risk with intravenous / oral contrast have been
              explained to me, which are:
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6">
                <li className="text-justify">
                  Mild Reaction include - Nausea, Vomiting, headache, fever,
                  itching, mild skin rash
                </li>
                <li className="text-justify">
                  Moderate Reaction include - Severe skin rash or urticaria,
                  wheezing, abnormal heart rhythm, high or low blood pressure,
                  shortness of breath or difficulty in breathing.
                </li>
                <li className="text-justify">
                  Severe Reaction include - Difficulty in breathing, cardiac
                  arrest, swelling in the throat or other parts of the body,
                  convulsion, profound low blood pressure.
                </li>
              </ul>
            </li>

            <li className="text-justify">
              Sedation / Anaesthesia: In case sedation/Anesthesia is required to
              perform the study, a separate consent including risk, benefits,
              complications and alternatives will be taken before administration
              of sedation / anaesthesia.
            </li>
            <li className="text-justify">
              I have had the opportunity to ask question related to procedure
              and these have being answered to my satisfaction, in the language
              I understand & I give my consent to undergo me CT Scan.
            </li>
          </ul>

          <h3 className="text-center font-bold mt-4">
            सी.टी. स्कैन के लिए सहमति
          </h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li className="text-justify">
              मुझे इलाज करने वाले चिकित्सक ने सी.टी. स्केन करवाने की सलाह दी है,
              जो कि मेरी बीमारी के निदान के लिये आवश्यक है।
            </li>
            <li>
              मेरे केस में सी.टी. स्केन में विस्तृत जानकारी के लिये कॉन्ट्रास्ट
              की यदि जरुरत पड़ती है, तो मैं उसे नस के द्वारा या मुख से पीने के
              रूप में देने की सहमति देता हूँ / देती हूँ मुझे इस कॉन्ट्रास्ट से
              होने वाले संभावित दुष्परिणाम की जानकारी दे दी गई है जो कि
              निम्नलिखित है।
              <ul className="list-disc text-justify list-inside text-sm mt-2 space-y-1 ml-6">
                <li>
                  हलके दुष्परिणाम जैसे कि उबकाई, उल्टी, सरदर्द, शरीर पर खुजली
                  एवं लाल निशान ।
                </li>
                <li>
                  मध्यम दुष्परिणाम जैसे कि पूरे शरीर पर लाल निशान / चकत्ते,
                  अस्थमा जैसी श्वास लेने में तकलीफ, असामान्य हृदयगति, रक्चाप
                  बढ़ना या कम हो जाना।
                </li>
                <li>
                  गम्भीर दुष्परिणाम जैसे कि श्वास लेने में अत्यधिक तकलीफ होना,
                  हृदयगति थमना (मृत अवस्था) गले के भीतर श्वास नली में सूजन होना
                  अथवा शरीर में किसी अन्य अंग पर सूजन होगा, मीर्गी के दौरे
                  पड़ना, रक्तचाप अत्यधिक कम हो जाना शॉक जैसी अवस्था।
                </li>
              </ul>
            </li>

            <li className="text-justify">
              यदि सी. टी. स्केन करने के लिये मुझे नींद की दवा/निश्चेतना देने की
              जरुरत पढ़ती है तो इसके लिये पृथक सहमति पत्र पर सहमति ली जायेगी
              जिसमें संभावित दुष्परिणाम, जोखिम, फायदे निहीत है।
            </li>
            <li className="text-justify">
              सी.टी. स्कैन की जाँच से जुड़े प्रश्नों को पूछने का मुझे पर्याप्त
              समय दिया गया है एवं मैं इनके जवाब से संतुष्ट हूँ जो कि मुझे सरल
              भाषा में समझा दिये गये है एवं मैं इस जाँच को करने की सहमति देता
              हूँ/देती हूँ।
            </li>
          </ul>
        </div>

        {/* Signature Section */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block">
              Signature of Guardian/Witness
              <br />
              परिजन/गवाह का नाम एवं हस्ताक्षर
            </label>
            <DigitalSignatureSection />
            <label className="block mt-1">
              Relation with Patient / मरीज से रिश्ता
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none mt-2"
            />
            <label className="block mt-1">Name / नाम</label>
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
          <div className="text-right w-full">
            <label className="block">
              Signature of Patient
              <br />
              मरीज के हस्ताक्षर
            </label>

            <div className="flex justify-end">
              <div className="inline-block">
                <DigitalSignatureSection />
              </div>
            </div>

            <label className="block mt-1">
              Time & Date
              <br />
              समय / दिनांक
            </label>
            {/* Signature aligned to right */}
            <div className="flex justify-end">
              <div className="inline-block">
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>


            <label className="block mt-6">
              Radiologist's Sign
              <br />
              रेडियोलाजिस्ट के हस्ताक्षर
            </label>
            <div className="flex justify-end">
              <DigitalSignatureSection />
            </div>

            <label className="block mt-1">
              Name of Radiologist
              <br />
              रेडियोलाजिस्ट का नाम
            </label>
            <input
              type="text"
              className="w-50 border-b border-gray-400 focus:outline-none mt-2"
            />
          </div>
        </div>

        {/* Second Page */}
        <div className="mt-8 pt-8 border-t border-dashed">
          <p>
            1. R<sub>x</sub>
          </p>
          <div className="flex items-center mt-2">
            <span className="mr-2">Please give</span>
            <input
              type="text"
              className="flex-grow border-b border-gray-400 focus:outline-none"
            />
            <span className="ml-2">
              ml of contrast intravenously (Ionic / Non Ionic)
            </span>
          </div>

         <p className="mt-2">
            2. The investigation advised by clinician is found{" "}
            <input type="radio" name="found" className="mx-1" /> not found{" "}
            <input type="radio" name="found" className="mx-1" /> appropriate
            considering clinical findings.
          </p>
          <p className="mt-2">3. Discussed with clinician.</p>

          <div className="flex flex-col items-end mt-4">
            <DigitalSignatureSection title={"Radiologist's Sign:"} />
            <div className="flex items-center mt-2">
              <label className="mr-2">Date & Time:</label>
              <DateTimeInput
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                time={selectedTime}
                onTimeChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* For Tech Use Only Table */}
        <div className="mt-4">
          <h3 className="text-center font-bold bg-gray-200 p-1 border border-black">
            FOR TECH. USE ONLY
          </h3>
          <div className="grid grid-cols-2 border-x border-b border-black">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-1 border-b border-r border-black w-1/3">
                    EXAM NO.
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-b border-r border-black w-1/3">
                    CONTRAST USED
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-b border-r border-black w-1/3">
                    NO. OF FILM(S)
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-r border-black w-1/3">TECH SIGN</td>
                  <td className="p-1">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-1 border-b border-black w-1/3">
                    RECEIPT NO.
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-b border-black w-1/3">
                    CHARGED AMOUNT
                  </td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-b border-black w-1/3">PAID</td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border-b border-black w-1/3">BALANCE</td>
                  <td className="p-1 border-b border-black">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 w-1/3">REMARKS</td>
                  <td className="p-1">
                    <input type="text" className="w-full focus:outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 border-x border-b border-black">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-1 border-b border-r border-black w-1/3">
                  PREVIOUS MRI
                </td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 border-r border-black w-1/3">
                  PREVIOUS X-RAY{" "}
                  <span className="text-xs">(if yes give date):</span>
                </td>
                <td className="p-1">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-1 border-b border-black w-1/3">
                  PREVIOUS CT{" "}
                  <span className="text-xs">(if yes give date):</span>
                </td>
                <td className="p-1 border-b border-black">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
              <tr>
                <td className="p-1 w-1/3">PREVIOUS ULTRASOUND</td>
                <td className="p-1">
                  <input type="text" className="w-full focus:outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CtScanConsentForm;
