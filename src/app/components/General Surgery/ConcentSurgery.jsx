import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useState } from "react";

export default function InformedConsentForSurgery() {
  const [lang, setLang] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="p-6 text-sm leading-relaxed my-2 border rounded-lg shadow-md bg-white">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 text-sm border rounded-lg shadow hover:bg-gray-100"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
        >
          {lang === "en" ? "Switch to Hindi" : "Switch to English"}
        </button>
      </div>
      {/* Header */}

      {lang === "en" && (
        <div className="min-h-screen print:p-0">
          {/* A4-ish canvas */}
          <div className="mx-auto ">
            <div className="col-span-2 font-semibold text-center text-lg mb-2">
              INFORMED CONSENT FOR SURGERY
            </div>

            {/* Section 1 */}
            <div className="px-4 space-y-4 text-sm leading-6">
              <div className="flex gap-2">
                <span>1.</span>
                <div className="flex-1">
                  I, hereby authorize Dr.{" "}
                  <span className="inline-block min-w-[300px] border-b" /> of
                  DNS Hospitals and those whom he / she may designate as
                  associates or assistants to perform upon (Name of Patient){" "}
                  <span className="inline-block min-w-[260px] border-b" /> the
                  following surgical operation / diagnostic / therapeutic
                  procedures{" "}
                  <span className="inline-block min-w-[280px] border-b" />.
                </div>
              </div>

              <div className="text-sm">
                It has been explained to me that during the course of the
                operation / procedure unforeseen conditions may be revealed or
                encountered which may necessitate surgical or other procedures
                in addition to or different from those contemplated. I,
                therefore, authorize the performance of such additional surgical
                / other procedures also as deemed necessary / desirable, except{" "}
                <span className="inline-block min-w-[300px] border-b" />.
              </div>

              {/* Section 2 */}
              <div className="flex gap-2">
                <span>2.</span>
                <div className="flex-1">
                  I consent to the administration of such drugs, IV infusions,
                  blood transfusions or any other treatment / procedures as
                  deemed necessary in the best judgment of the treating doctors.
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex gap-2">
                <span>3.</span>
                <div className="flex-1">
                  The nature and purpose of operation / procedure, the necessity
                  thereof, possible alternate options, risks involved,
                  possibility of complications and the prognosis, have been
                  explained to me in the language that I understand.
                </div>
              </div>

              {/* Benefits / Risks / Complications / Alternatives */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="font-semibold">Benefits</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
                <div className="space-y-4">
                  <div className="font-semibold">Risks</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="font-semibold">Complications</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
                <div className="space-y-4">
                  <div className="font-semibold">Alternatives</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
              </div>

              {/* Section 4 */}
              <div className="flex gap-2">
                <span>4.</span>
                <div className="flex-1">
                  It has been explained to me that the risk of operation in my
                  case is high because of{" "}
                  <span className="inline-block min-w-[300px] border-b" />. I am
                  prepared to accept the risk involved and authorize the
                  operation / procedure to be carried out and I have been
                  explained the possible complications, which can occur during
                  and after the surgery and I understand that and give my
                  consent to do the surgery.
                </div>
              </div>

              {/* Section 5 */}
              <div className="flex gap-2">
                <span>5.</span>
                <div className="flex-1">
                  Any tissues or parts removed from my body during the course of
                  operation may be sent for (Histopathology examination) or
                  disposed off by the hospital authorities as per the rules.
                </div>
              </div>

              <div className="text-sm">
                I certify that the statements made above have been read over and
                explained to me in the language I understand and I have fully
                understood the implications of the above consent. I further
                state that all insertions / deletions in the above paragraphs
                were made there I signed / affixed my thumb impression on this
                consent form.
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <div className="font-semibold">Additional Information :</div>
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
              </div>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-2 gap-6 px-4 py-6 text-sm">
              <div className="space-y-3">
                <div className="font-semibold">
                  Signature / Thumb Impression of Patient :
                </div>
                <div className="flex items-center gap-3">
                  <span>Date and Time :</span>{" "}
                  <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={selectedTime}
                    onTimeChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <DigitalSignatureSection title="Signature of Relative :" />
                <div className="flex items-center gap-3">
                  <span>Name :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Relation with the Patient :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Address :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Mobile :</span>
                  <div className="flex-1 border-b" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 px-4 pb-8 text-sm">
              <div className="space-y-3">
                <DigitalSignatureSection title="Signature of Witness :" />
                <div className="flex items-center gap-3">
                  <span>Name :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Address :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Mobile :</span>
                  <div className="flex-1 border-b" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-semibold">Name of Surgeon</div>
                    <div className="h-6 border-b" />
                  </div>
                  <DigitalSignatureSection title="Signature  :" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Date & Time :</span>
                  <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={selectedTime}
                    onTimeChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-4 pb-8 text-[13px]">
              <div className="border p-3">
                When a Patient is a minor or unable to give consent due to
                mental / physical disability / unconsciousness — Signature of
                person authorized to consent to affix his/her signature.
              </div>
            </div>
          </div>
        </div>
      )}

      {lang == "hi" && (
        <div className="min-h-screen print:p-0">
          {/* A4-ish canvas */}
          <div className="mx-auto ">
            <div className="col-span-2 font-semibold text-center text-lg mb-2">
              शल्य चिकित्सा हेतु सूचित सहमति पत्र
            </div>

            {/* Section 1 */}
            <div className="px-4 space-y-4 text-sm leading-6">
              <div className="flex gap-2">
                <span>1.</span>
                <div className="flex-1">
                  मैं (मरीज का नाम){" "}
                  <span className="inline-block min-w-[300px] border-b" />
                  डॉ. <span className="inline-block min-w-[300px] border-b" />
                  जो कि डी.एन.एस. हॉस्पिटल्स के विशेषज्ञ है, को एवं उनके
                  सहयोगियों को, मेरे / मरीज के उपचार/हेतु जरुरी शल्य चिकित्सा /
                  चिकित्सा निदान शल्य चिकित्सा{" "}
                  <span className="inline-block min-w-[260px] border-b" />
                  करने हेतु स्वीकृति प्रदान करता/करती है। शल्यक्रिया के दौरान
                  कुछ अनपेक्षित परिस्थितियाँ सामने आ सकती है, जिसके लिए कोई और
                  ऑपरेशन या प्रक्रिया (जो कि निर्धारित की है उसके अलावा)
                  <span className="inline-block min-w-[280px] border-b" />.
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex gap-2">
                <div className="flex-1">
                  की जरूरत पड़ सकती है अतः मैं सब समझते हुए उस अतिरिक्त
                  प्रक्रिया / शल्य चिकित्सा के लिए, जो जरुरी है, की सहमति
                  देता/देती हूँ।
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex gap-2">
                <div className="flex-1">
                  मेरे मरीज के इलाज / शल्य चिकित्सा की प्रक्रिया और उसकी
                  आवश्यकता, संभावित विकल्प, संभावित जोखिम आदि के बारे में मुझे
                  सरल भाषा में समझा दिया गया है और मैं निम्नांकित बिंदुओं पर
                  अपनी सहमति प्रदान करती/करता हूँ।
                </div>
              </div>

              {/* लाभ / जोखिम / जटिलताएँ / विकल्प */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="font-semibold">शल्यक्रिया पश्चात फायदा</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
                <div className="space-y-4">
                  <div className="font-semibold">
                    शल्यक्रिया के दौरान /पश्चात होने वाले नुकसान (जोखिम)
                  </div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="font-semibold">संभावित वैकल्पिक विकल्प</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
                <div className="space-y-4">
                  <div className="font-semibold">चिकित्सकीय जटिलताएँ</div>
                  <div className="h-8 border-b" />
                  <div className="h-8 border-b" />
                </div>
              </div>

              {/* Section 4 */}
              <div className="flex gap-2">
                <div className="flex-1">
                  मेरे मरीज कि शल्य चिकित्सा के दौरान इन बिमारियों{" "}
                  <span className="inline-block min-w-[300px] border-b" />
                  .के कारण से जोखिम की संभावना ज्यादा है। जिसके लिए मैं पूर्ण
                  रूप से सहमत हूँ एवं अनुमति प्रदान करता हूँ।मैं शल्य चिकित्सा
                  के दौरान जरुरी दवाइयों एवं खून देने की स्वीकृति प्रदान
                  करता/करती हूँ।मैं शल्य चिकित्सा के दौरान अनुपयोगी या खराब
                  उत्तको या अंगों को निकालने तथा निर्धारित/अधिकृत नियमानुसार
                  उनको नष्ट करने हेतु या जाँच हेतु अस्पताल के अधिकारियों को
                  स्वीकृति प्रदान करता/करती हूँ।
                </div>
              </div>

              {/* Section 5 */}
              <div className="flex gap-2">
                <div className="flex-1">
                  मैं शल्य चिकित्सा के दौरान अनुपयोगी या खराब उत्तको या अंगों को
                  निकालने तथा निर्धारित/अधिकृत नियमानुसार उनको नष्ट करने हेतु या
                  जाँच हेतु अस्पताल के अधिकारियों को स्वीकृति प्रदान करता/करती
                  हूँ।
                </div>
              </div>

              <div className="text-sm">
                मैं शल्य चिकित्सा के दौरान अनुपयोगी या खराब उत्तको या अंगों को
                निकालने तथा निर्धारित/अधिकृत नियमानुसार उनको नष्ट करने हेतु या
                जाँच हेतु अस्पताल के अधिकारियों को स्वीकृति प्रदान करता/करती
                हूँ।
              </div>

              {/* अतिरिक्त जानकारी */}
              <div className="space-y-2">
                <div className="font-semibold">अतिरिक्त जानकारी :</div>
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
              </div>
            </div>

            {/* हस्ताक्षर सेक्शन */}
            <div className="grid grid-cols-2 gap-6 px-4 py-6 text-sm">
              <div className="space-y-3">
                <div className="font-semibold">
                  मरीज के हस्ताक्षर /अंगूठे के निशान
                </div>
                <div className="flex items-center gap-3">
                  <span>दिनांक एवं समय:..</span>{" "}
                  <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={selectedTime}
                    onTimeChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <DigitalSignatureSection title="पालक के हस्ताक्षर :  " />
                <div className="flex items-center gap-3">
                  <span>नाम :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>मरीज के साथ रिश्ता :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>पता :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>मोबाइल :</span>
                  <div className="flex-1 border-b" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 px-4 pb-8 text-sm">
              <div className="space-y-3">
                <DigitalSignatureSection title="गवाह का हस्ताक्षर :" />
                <div className="flex items-center gap-3">
                  <span>नाम :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>पता :</span>
                  <div className="flex-1 border-b" />
                </div>
                <div className="flex items-center gap-3">
                  <span>मोबाइल :</span>
                  <div className="flex-1 border-b" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-semibold">शल्य चिकिलाक का नाम</div>
                    <div className="h-6 border-b" />
                  </div>
                  <DigitalSignatureSection title="हस्ताक्षर :" />
                </div>
                <div className="flex items-center gap-3">
                  <span>दिनांक एवं समय:..</span>
                  <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={selectedTime}
                    onTimeChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-4 pb-8 text-[13px]">
              <div className="border p-3">
                रोगी की मानसिक / शारीरिक अक्षमता / बेहोशी / नावालिग होने की
                स्थिति में यदि हस्ताक्षर करने में असक्षम हो तो अधिकृत किये गये
                व्यक्ति का विवरण
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
