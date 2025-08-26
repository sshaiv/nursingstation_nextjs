"use client";
import { useState } from "react";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";

export default function CathlabConsent() {
  const [lang, setLang] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

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
        <div className="">
          <div className="max-w-6xl mx-auto bg-white p-8 shadow-md border">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-center flex-1">
                <h1 className="font-bold text-lg underline">CONSENT FORM</h1>
              </div>
            </div>

            {/* Dept Row */}
            <div className="mb-4 text-sm">
              <span className="mr-4">Dept. :</span>
              <label className="mr-4">
                <input type="checkbox" className="mr-1" />
                CARDIOLOGY
              </label>
              <label className="mr-4">
                <input type="checkbox" className="mr-1" />
                RADIOLOGY
              </label>
              <span className="ml-6">
                CATH No.: <input className="border-b" />
              </span>
              <span className="ml-6">
                Date: <input className="border-b" />
              </span>
            </div>

            {/* Informed Consent For */}
            <div className="text-sm mb-4">
              <p className="font-semibold">Informed Consent For</p>
              <div className="grid grid-cols-2 gap-2 ml-4 mt-1">
                <label>
                  <input type="checkbox" className="mr-1" />
                  1. ANGIOPLASTY / STENTING
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  4. PPI / TEMPORARY PACING
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  2. VALVULOPLASTY
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  5. DEVICE CLOSURE (ASD, VSD, PDA, PFO)
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  3. EMBOLISATION
                </label>
              </div>
            </div>

            {/* Patient Info */}
            <div className="text-sm mb-4">
              <p>
                I, <input className="border-b" /> , I.P. No.{" "}
                <input className="border-b" /> Age{" "}
                <input className="border-b" />
                years, Son / Daughter / Wife of <input className="border-b" />
              </p>
            </div>

            {/* Consent Text */}
            <div className="text-sm mb-4 leading-relaxed">
              <p>
                have been explained in detail the benefits, risk and the
                possible complications of Percutaneous Transluminal (above said)
                procedure in my own language. Some possible complications that
                can occur during & after the above-said procedure include -
                infection, increased duration of stay in ICU, fistula,
                pseudoaneurysm, haematoma. I have also been informed that some
                of the patients who undergo this procedure may need an emergency
                surgery. It has also been explained to me about the possibility
                of recurrence of disease & successful Angioplasty /
                Valvuloplasty or a procedure, including rare possibility of
                mortality.
              </p>
              <p className="mt-2">
                I now hereby give my consent to undergo Percutaneous
                Transluminal procedure under any type of anaesthesia or any
                other emergency procedure found necessary.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <DigitalSignatureSection title="Signature of Relative" />

                <p>
                  Name <input className="border-b" />{" "}
                </p>
                <p>
                  Relation <input className="border-b" />
                </p>
                <p>
                  Address
                  <input className="border-b" />
                </p>
                <p>
                  Tel. No. <input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <div>
                <DigitalSignatureSection title="Signature of Patient" />

                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <DigitalSignatureSection title="Signature of Witness" />

                <p>
                  Name <input className="border-b" />
                </p>
                <p>
                  Address
                  <input className="border-b" />
                </p>
                <p>
                  Tel. No.
                  <input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <div>
                <DigitalSignatureSection title="Signature of Doctor" />

                <p>
                  Name :<input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="text-xs border-t pt-2">
              <p className="font-semibold">* Note :</p>
              <p>
                a) If patient is under 16 yrs of age, Legal guardian must sign
                for the patient.
              </p>
              <p>
                b) If patient is unable to give consent because of infirmity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hindi Form */}
      {lang === "hi" && (
        <div className="">
          <div className="max-w-6xl mx-auto bg-white p-8 shadow-md border">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-center flex-1">
                <h1 className="font-bold text-lg underline">सहमति पत्र</h1>
              </div>
            </div>

            {/* Dept Row */}
            <div className="mb-4 text-sm">
              <span className="mr-4">विभाग. :</span>
              <label className="mr-4">
                <input type="checkbox" className="mr-1" />
                कार्डियोलॉजी
              </label>
              <label className="mr-4">
                <input type="checkbox" className="mr-1" />
                रेडियोलॉजी
              </label>
              <span className="ml-6">
                केथ नम्बर:.: <input className="border-b" />
              </span>
              <span className="ml-6">
                दिनांक: <input className="border-b" />
              </span>
            </div>

            {/* Informed Consent For */}
            <div className="text-sm mb-4">
              <div className="grid grid-cols-2 gap-2 ml-4 mt-1">
                <label>
                  <input type="checkbox" className="mr-1" />
                  1. ऐन्जियोप्लास्टी/स्टेन्टींग
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  4. पीपीआई/टेम्पोररी पेसिंग
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  2. वाल्योप्लास्टी
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  5. डिवाईस क्लोजर () (ASD, VSD, PDA, PFO)
                </label>
                <label>
                  <input type="checkbox" className="mr-1" />
                  3. एम्बोलाईजेशन
                </label>
              </div>
            </div>

            {/* Patient Info */}
            <div className="text-sm mb-4">
              <p>
                मैं, <input className="border-b" /> , आई.पी. नम्बर{" "}
                <input className="border-b" /> उम्र वर्ष{" "}
                <input className="border-b" />
                उम्र वर्ष, पुत्र/पुत्री/पत्नि <input className="border-b" />
              </p>
            </div>

            {/* Consent Text */}
            <div className="text-sm mb-4 leading-relaxed">
              <p>
                को Percutaneous Transluminal प्रक्रिया (above said) से संबन्धित
                आवश्यक जानकारी एवं उससे होने वाले नुकसान एवं फायदे के बारे में
                चिकित्सक द्वारा मुझे मेरी भाषा में/ हमें पूर्ण जानकारी दे दी गई
                है। इस प्रक्रिया के दौरान एवं बाद में होने वाली सम्भवतः
                जटिलतायें जैसे- Infection होना, लम्बे समय तक आई.सी. यू. में रखने
                की जरूरत पड़ना, Fistula बनना, Pseudoaneurysm बनना, Haematoma
                (अत्याधिक रक्तस्त्राव होकर एकत्रित होना) के बारे में बता दिया
                गया है। मुझे यह भी बता दिया गया है कि इस प्रक्रिया के दौरान कुछ
                मरीजों को आकस्मिक शल्य चिकित्सा की भी आवश्यकता पड़ सकती है। मुझे
                यह भी बताया गया है कि सफलतापूर्वक एंजियोप्लास्टी /
                वाल्वोप्लास्टी / शल्य प्रक्रिया के पश्चात् भी पुनः यह तकलीफ /
                बीमारी हो सकती है और किन्ही परिस्थितियों में मरीज की मृत्यु भी
                संभव है।
              </p>
              <p className="mt-2">
                इन सभी जानकारियों को जानने के बाद, मैं / मेरे मरीज की
                Percutaneous Transluminal प्रक्रिया के दौरान किसी भी प्रकार के
                एनेस्थेशिया या किसी भी प्रकार की आवश्यक आकस्मिक प्रक्रिया हेतु
                अपनी पूर्ण रूप से स्वीकृती एवं अनुमती प्रदान करता /करती हूँ।
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <DigitalSignatureSection title="रिश्तेदार के हस्ताक्षर" />

                <p>
                  नामः <input className="border-b" />{" "}
                </p>
                <p>
                  रिश्ता <input className="border-b" />
                </p>
                <p>
                  पता
                  <input className="border-b" />
                </p>
                <p>
                  दूरभाष क्रमांक <input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <div>
                <DigitalSignatureSection title="मरीज के हस्ताक्षर" />

                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <DigitalSignatureSection title="गवाह के हस्ताक्षर" />

                <p>
                  नाम <input className="border-b" />
                </p>
                <p>
                  पता
                  <input className="border-b" />
                </p>
                <p>
                  दूरभाष क्रमांक
                  <input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <div>
                <DigitalSignatureSection title="चिकित्सक के हस्ताक्षर" />

                <p>
                  नाम :<input className="border-b" />
                </p>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="text-xs border-t pt-2">
              <p className="font-semibold">* विशेषः :</p>
              <p>
                कृपया निम्न परिस्थितियाँ होने पर निजी सहायक // परिजन आवश्यक रूप
                से हस्ताक्षर करें अ) यदि मरीज की उम्र 16 वर्ष से कम है।
              </p>
              <p>
                ब) यदि मरीज मानसिक / शरीरिक रूप से सहमति देने में सक्षम नहीं है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
