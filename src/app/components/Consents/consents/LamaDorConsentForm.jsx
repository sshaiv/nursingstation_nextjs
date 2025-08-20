// "use client";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function LamaDorConsentForm() {
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
      className={`border-b border-dotted outline-none w-full px-1 text-sm ${className}`}
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
        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-center text-3xl font-bold underline">
            CONSENT FOR LAMA / DOR
          </h2>
          <p className="text-center text-lg">
            ( Consent for patient’s leaving / discharge against medical advice
            or discharge on request )
          </p>

          <p>
            This is to certify that I / my (Patient’s Name{" "}
            <InputLine
              placeholder="Enter Patient's Name"
              className="inline-block w-64"
            />{" "}
            ) at my / our own insistence & without the authority of and against
            the advice of <b>attending physician(s)</b>{" "}
            <InputLine
              placeholder="Enter Attending Physician(s)"
              className=""
            />
            request to leave / want discharge from DNS Hospital, Indore.
          </p>

          <p>
            I / We understand that patient is suffering from{" "}
            <InputLine
              placeholder="Disease / Condition"
              className="inline-block w-72"
            />
            & needs to continue treatment in the hospital.
          </p>

          <p>
            I / We have been informed about the risks of leaving the hospital
            against the medical advice & with this understanding, I / We request
            to relieve / discharge the patient from the hospital.
          </p>

          <p>
            I / We hereby release DNS Hospital, Indore, it’s administration,
            personnel, attending physician(s) & his or her team member from any
            responsibility for the consequences arising out of patient leaving
            hospital under these circumstances.
          </p>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Signature of Relative</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2">
                Relation: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex gap-2">
                Tel.No.: <InputLine className="inline-block w-48" />
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Signature of Patient or Thumb Impression
              </h4>
              <DigitalSignatureSection />
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

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Signature of Witness</h4>
              <DigitalSignatureSection />

              <p className="flex w-full gap-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2">
                Address: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2">
                Tel.No.: <InputLine className="inline-block w-48" />
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Signature of Doctor</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full my-2">
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

          <p className="text-xs mt-6">
            <b>* Note:</b> Legal guardian must sign for the patient in following
            cases:
            <br /> a) If patient is under 16 yrs of age.
            <br /> b) If patient is unable to give consent because of infirmity.
          </p>
        </div>
      )}

      {/* Hindi Form */}
      {lang === "hi" && (
        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-center text-3xl font-bold underline">
            लामा / डी.ओ.आर. हेतु सहमति-पत्र
          </h2>
          <p className="text-center text-lg">
            ( चिकित्सकीय सलाह / मना करने के बावजूद मरीज की चिकित्सालय से छुट्टी
            करवाने हेतु निवेदन )
          </p>

          <p>
            मैं / परिजन (मरीज का नाम{" "}
            <InputLine
              placeholder="मरीज का नाम"
              className="inline-block w-64"
            />{" "}
            ) अपनी स्वयं की इच्छा या मर्ज़ी से इलाज करने वाले चिकित्सक के परामर्श /
            मना करने के बावजूद मरीज को डी.एन.एस. हॉस्पिटल से छुट्टी लेना /
            करवाना चाहते हैं / हैं।
          </p>

          <p>
            मुझे / मेरे परिजन को, चिकित्सक द्वारा बताया गया है कि मैं / मेरे
            मरीज को कि (Diagnosis{" "}
            <InputLine placeholder="Diagnosis" className="inline-block w-64" />{" "}
            ) बीमारी गंभीर है, उसका इलाज डी.एन.एस. हॉस्पिटल में ही जारी रहना
            चाहिए।
          </p>

          <p>
            मुझे / मेरे परिजन को मेरे चिकित्सक द्वारा अस्पताल छोड़ने की स्थिति
            में होने वाले नुकसान के बारे में बताया गया है, फिर भी मैं / मेरे
            परिजन को अपनी इच्छा अनुसार अस्पताल से ले जाना चाहते हैं। मैं / मेरे
            परिजन डी.एन.एस. हॉस्पिटल, प्रशासन एवं इंटर्नल स्टाफ को किसी भी
            प्रकार की चिकित्सकीय / प्रशासनिक जिम्मेदारियों / कारणों के कारण होने
            वाले नुकसान के लिए किसी भी प्रकार से जिम्मेदार नहीं ठहराऊँगा /
            ठहराऊँगी।
          </p>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">रिश्तेदार के हस्ताक्षर</h4>
              <p>
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p>
                रिश्ता: <InputLine className="inline-block w-48" />
              </p>
              <p>
                दूरभाष क्रमांक: <InputLine className="inline-block w-48" />
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                मरीज के हस्ताक्षर (अथवा अंगूठे का निशान)
              </h4>
              <p>
                दिनांक व समय: <InputLine className="inline-block w-48" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">गवाह के हस्ताक्षर</h4>
              <p>
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p>
                पता: <InputLine className="inline-block w-48" />
              </p>
              <p>
                दूरभाष क्रमांक: <InputLine className="inline-block w-48" />
              </p>
            </div>

            <div>
              <h4 className="font-semibold">चिकित्सक के हस्ताक्षर</h4>
              <p>
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p>
                दिनांक व समय: <InputLine className="inline-block w-48" />
              </p>
            </div>
          </div>

          <p className="text-xs mt-6">
            <b>* विशेष:</b> कृपया निम्न परिस्थितियों होने पर निजी सहायक / परिजन
            आवश्यक रूप से हस्ताक्षर करें
            <br /> a) यदि मरीज की आयु 16 वर्ष से कम है।
            <br /> b) यदि मरीज मानसिक / शारीरिक रूप से सहमति देने में सक्षम नहीं
            है।
          </p>
        </div>
      )}
    </div>
  );
}
