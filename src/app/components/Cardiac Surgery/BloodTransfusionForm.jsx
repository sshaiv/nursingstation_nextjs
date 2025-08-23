import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useState } from "react";

export default function BloodTransfusionForm() {
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
    diagnosis: "",
    patientABO: "",
    donorABO: "",
    consent: false,
    patientName: "",
    patientRelation: "",
    consultantName: "",
    dateTime: "",
    records: [
      {
        date: "",
        component: "",
        qty: "",
        bagNo: "",
        expDate: "",
        startTime: "",
        stopTime: "",
      },
    ],
  });

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
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl border">
          <h2 className="text-center text-lg font-bold underline mb-4">
            Blood Transfusion Consent & Monitoring Record
          </h2>

          {/* Patient & Donor Info in same row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="font-semibold">Diagnosis</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.diagnosis}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosis: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">Patient’s ABO Rh Group</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientABO}
                onChange={(e) =>
                  setFormData({ ...formData, patientABO: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">Donor’s ABO Rh Group</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.donorABO}
                onChange={(e) =>
                  setFormData({ ...formData, donorABO: e.target.value })
                }
              />
            </div>
          </div>

          {/* Consent Text */}
          <div className="mb-6">
            <p className="mb-2 text-justify">
              I <input className="border-b border-dotted w-96 outline-none" />{" "}
              hereby give my consent for whole blood transfusion / blood
              components as part of treatment to myself / my patient while being
              admitted as DNS Hospitals.I Have been explained all the known
              risks of transfusion reactions.I have also been explained that the
              donor blood has been screened for HIV antibodies.Hepatitis B
              surface antigen.Hepatitis C surface antigen.Malaria and Syphilis.I
              have also been explained that transfusion transmitted reactions
              can rarely occur even with screened blood , especially if it is in
              the "windiw period" and also due to various other infections which
              cannot be screened for .I also understand that any blood component
              transfusions carry risk of transfusion associated reactions.
            </p>
            <p className="mb-2 text-justify">
              All the above-mentioned risks have been explained to me by the
              doctor treating me /my patient in the language that i fully
              understand and I accept the same an give my consent for the whole
              blood /component transfusion to me / my patient.This consent is
              valid for 24 hrs.
            </p>
            <p className="mb-2 text-justify">
              I have received a copy of "INFORMATION ON BLOOD TRANSFUSION FOR
              PATIENTS".
            </p>
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-semibold">Patient / Attendant Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">Relationship with Patient</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientRelation}
                onChange={(e) =>
                  setFormData({ ...formData, patientRelation: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">Consultant / RMO</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.consultantName}
                onChange={(e) =>
                  setFormData({ ...formData, consultantName: e.target.value })
                }
              />
            </div>
            {/* Date & Time Input */}
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setTime(e.target.value)}
              className="col-span-full"
            />
          </div>
        </div>
      )}

      {lang == "hi" && (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl border">
          <h2 className="text-center text-lg font-bold underline mb-4">
            रक्त चढ़ाने हेतु सहमति-पत्र एवं मॉनिटरिंग रिकार्ड
          </h2>

          {/* Patient & Donor Info in same row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="font-semibold">Diagnosis</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.diagnosis}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosis: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">मरीज का रक्त समूह</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientABO}
                onChange={(e) =>
                  setFormData({ ...formData, patientABO: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">
                रक्त दान करने वाले का रक्त समूह
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.donorABO}
                onChange={(e) =>
                  setFormData({ ...formData, donorABO: e.target.value })
                }
              />
            </div>
          </div>

          {/* Consent Text */}
          <div className="mb-6">
            <p className="mb-2 text-justify">
              मैं <input className="border-b border-dotted w-96 outline-none" />{" "}
              इस सहमति-पत्र के द्वारा मेरे मरीज / मेरे ईलाज हेतु डी.एन.एस.
              हॉस्पिटल्स में ईलाज के दौरान आवश्यकता पड़ने पर खून चढ़ाने हेतु
              सहमति प्रदान करता हूँ। खून चढ़ाने के दौरान / बाद में इससे होने
              वाले दुष्प्रभावों के बारे में मुझे भली भाँति समझ दिया गया है मुझे
              यह भी बता दिया गया है कि देने वाला खून किसी भी प्रकार से जैसे
              एच.आई.वी./ हैपेटाईटिस बी / हैपेटाइटिस सी से ग्रसित नहीं है (सभी
              प्रकार की जाँच की जा चुकी है) किंतु विशेष परिस्थिति "विन्डो
              पिरियड" और किसी अन्य कारणों से ग्रसित हो सकता है जिसकी स्क्रीनिंग
              संभव संभव नहीं है। मुझे रक्त व किसी भी प्रकार के रक्त उत्पादों की
              जटिलताओं या चढ़ाने के बाद होने वाले दुष्प्रभावों के बारे में अवगत
              करा दिया गया है एवं इस हेतु सहमति प्रदान करता हूँ। उपरोक्त सभी
              संभव जटिलताओं / दुष्प्रभावों के बारे में मेरे चिकित्सक ने मुझे /
              मेरे मरीज को सरलतम भाषा में समझा दिया है और मैं / मेरे मरीज इस
              पत्र के द्वारा चढ़ाने हेतु सहमति प्रदान करते है। इस सहमति की वैधता
              24 घण्टे है।
            </p>
            <p className="mb-2 text-justify">
              "मरीजों के लिये ट्रांसफ्यूजन संबंधित जानकारी" की एक प्रति मुझे
              प्राप्त हो गयी है।
            </p>
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-semibold">
                मरीज / परिजन के हस्ताक्षर :
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">
                चिकित्सक/आर.एम.ओ. का नाम / हस्ताक्षर
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.patientRelation}
                onChange={(e) =>
                  setFormData({ ...formData, patientRelation: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-semibold">मरीज के साथ संबंध </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData.consultantName}
                onChange={(e) =>
                  setFormData({ ...formData, consultantName: e.target.value })
                }
              />
            </div>
            {/* Date & Time Input */}
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setTime(e.target.value)}
              className="col-span-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
