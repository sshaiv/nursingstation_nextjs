"use client";
import { useState } from "react";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";

export default function HIVConsentForm() {
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
        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-center text-3xl my-3 font-bold underline">
            INFORMED CONSENT FOR HIV ANTIBODY SCREENING TEST
          </h2>

          <div className=" grid grid-cols-3 gap-2 mt-4">
            <p >
              <span className="font-bold">Patient’s Name:</span> {" "}
              <InputLine placeholder="Enter Patient's Name" className="w-55" />
            </p>
            <p>
                 <span className="font-bold">S/o W/o D/o: </span> 
              <InputLine placeholder="Relation" className="w-48" />
            </p>
            <p>
                 <span className="font-bold">Age / Sex : </span> 
              <InputLine placeholder="Age / Sex" className="w-30" />
            </p>
            <p>
                 <span className="font-bold">Registration No:</span> {" "}
              <InputLine placeholder="Reg. No." className="w-48" />
            </p>
            <p>
                 <span className="font-bold">IPD / OPD No:</span> {" "}
              <InputLine placeholder="IPD/OPD No." className="w-48" />
            </p>
            <p>
                 <span className="font-bold">Ward / Bed No:</span> {" "}
              <InputLine placeholder="Ward/Bed No." className="w-48" />
            </p>
            <p className="col-span-2">
              <span className="font-bold">Address:</span>  <InputLine placeholder="Address" className="w-[80%]" />
            </p>
            <p className="col-span-1">
              <span className="font-bold">Contact No:</span>  <InputLine placeholder="Contact No" className="" />
            </p>
            <p className="col-span-2">
              <span className="font-bold">Primary Consultant / Ref. by:</span>{" "}
              <InputLine placeholder="Consultant" className="w-[68%]" />
            </p>
            <p>
              <span className="font-bold">Date: </span> <InputLine placeholder="Date" className="w-48" />
            </p>
          </div>

          <hr className="my-2 border border-black"/>

          <p className="text-justify">
            This is to state that I have been counselled about the need of HIV
            test to be conducted on me and explained the interpretation of test
            results - positive, negative or indeterminate. All the details of
            HIV, its transmission and testing procedure have been explained to
            me . Its Limitations and interpretation of results have been
            explained to me in a language that I can understand.
          </p>
          <p>
            I, hereby, give my consent for the test to be conducted on me in
            order to ascertain my HIV sero-status.
          </p>
          <p>
            I shall allow the laboratory to take my blood sample if required.
          </p>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">
                Signature / Thumb Impression of Patient
              </h4>
              <DigitalSignatureSection />
              <div className="flex gap-2 w-full mt-2">
                <label>Time:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Signature of Doctor</h4>
              <DigitalSignatureSection />
              <div className="flex gap-2 w-full mt-2">
                <label>Time:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Signature of Witness</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2 mt-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                Phone No.: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full mt-2">
                <label>Time:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Signature of Legal Guardian</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2 mt-2">
                Name: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                Relation: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                Phone No.: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full mt-2">
                <label>Time:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <p className="text-xs mt-6 font-semibold">
            In case patient is unable to sign due to medical condition, legal
            guardian to sign.
          </p>
          <p className="text-xs font-semibold">
            * Note : In case you have been tested for HIV antibody before , please submit a copy of the report.
          </p>
        </div>
      )}

      {/* Hindi Form */}
      {lang === "hi" && (
        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-center text-3xl my-3 font-bold underline">
            एच.आय.वी. परीक्षण हेतु सूचित सहमति-पत्र
          </h2>
        
                  <div className=" grid grid-cols-3 gap-2 mt-4">
            <p >
              <span className="font-bold"> मरीज का नाम :</span> {" "}
              <InputLine placeholder=" मरीज का नाम" className="w-55" />
            </p>
            <p>
                 <span className="font-bold">पिता/पति: </span> 
              <InputLine placeholder="पिता/पति" className="w-48" />
            </p>
            <p>
                 <span className="font-bold">उम्र / लिंग : </span> 
              <InputLine placeholder="उम्र / लिंग" className="w-30" />
            </p>
            <p>
                 <span className="font-bold">रजिस्ट्रेशन क्र.:</span> {" "}
              <InputLine placeholder="रजिस्ट्रेशन" className="w-48" />
            </p>
            <p>
                 <span className="font-bold">आय.पी.डी / ओ.पी.डी क्र.:</span> {" "}
              <InputLine placeholder=" आय.पी.डी / ओ.पी.डी क्र." className="w-48" />
            </p>
            <p>
                 <span className="font-bold">वार्ड / बेड क्र.:</span> {" "}
              <InputLine placeholder="वार्ड / बेड क्र" className="w-48" />
            </p>
            <p className="col-span-2">
              <span className="font-bold">पता:</span>  <InputLine placeholder="पता" className="w-[80%]" />
            </p>
            <p className="col-span-1">
              <span className="font-bold">फ़ोन / मोबाइल :</span>  <InputLine placeholder="फ़ोन / मोबाइल " className="" />
            </p>
            <p className="col-span-2">
              <span className="font-bold">प्राथमिक विशेषज्ञ / भेजने वाले डॉक्टर :</span>{" "}
              <InputLine placeholder="प्राथमिक विशेषज्ञ / भेजने वाले डॉक्टर" className="w-[60%]" />
            </p>
            <p>
              <span className="font-bold">दिनांक : </span> <InputLine placeholder="दिनांक" className="w-48" />
            </p>
          </div>

          <hr className="my-2 border border-black"/>

          <p className="text-justify">
          मैं घोषणा करता हूँ कि मुझे एच.आय.वी. परीक्षण (जो कि मेरी की जानी है) की जरुरत के बारे में समझा दिया गया है। मुझे उसके परिणाम के बारे में भी जानकारी दी गई है कि यह परीक्षण सकारात्मक, नकारात्मक या अनिश्चित भी हो सकता है।  
          </p>

          <p className="text-justify">
            एच.आय.वी. से सम्बंधित सभी विवरण, इसके प्रसारण एवं परीक्षण प्रक्रिया के बारे में भी मुझे समझा दिया गया है। चिकित्सक ने सभी जानकारी, सरलतम भाषा में जानने योग्य मुझे समझा दी है जिससे मैं संतुष्ट हूँ।
          </p>
          <p className="text-justify">
           मैं इस सहमति-पत्र द्वारा मेरे खून में एच. आय. वी. स्थिति का परीक्षण करने की अनुमति देता हूँ साथ ही प्रयोगशाला द्वारा आवश्यकता होने पर मेरे शरीर से पुनः खून का नमूना लेने की अनुमति प्रदान करता हूँ।
          </p>
        

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">
                मरीज के हस्ताक्षर / अंगूठे का निशान
              </h4>
              <DigitalSignatureSection />
              <div className="flex gap-2 w-full mt-2">
                <label>समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold">चिकित्सक के हस्ताक्षर</h4>
              <DigitalSignatureSection />
              <div className="flex gap-2 w-full mt-2">
                <label>समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">गवाह के हस्ताक्षर</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2 mt-2">
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                फोन न.: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full mt-2">
                <label>समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold">अभिभावक के हस्ताक्षर</h4>
              <DigitalSignatureSection />
              <p className="flex w-full gap-2 mt-2">
                नाम: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                संबंध: <InputLine className="inline-block w-48" />
              </p>
              <p className="flex w-full gap-2 mt-2">
                फोन न.: <InputLine className="inline-block w-48" />
              </p>
              <div className="flex gap-2 w-full mt-2">
                <label>समय:</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <p className="text-xs mt-6 font-semibold">
            रोगी की मानसिक / शारीरिक अक्षमता / बेहोशी / नाबालिग होने की स्थिति में यदि हस्ताक्षर करने में असक्षम हो तो अधिकृत व्यक्ति का विवरण, हस्ताक्षर सहित।
          </p>
          <p className="font-semibold">*नोट : यदि मरीज का एच.आय.वी. परीक्षण पूर्व में भी किया जा चुका है तो रिपोर्ट (जाँच) की कॉपी प्रस्तुत करें।</p>
        </div>
      )}
    </div>
  );
}
