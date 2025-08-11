import DateTimeInput from "@/app/common/DateTimeInput";
import { useState } from "react";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function ClinicalConsent() {
  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [selectedDate, setSelectedDate] = useState(new Date()); // ← this must be above any usage

  const handleSignatureSave = (signatureImage) => {
    console.log("parent saved:", signatureImage);
  };

  useKeyboardScrollFix(); 

  return (
    <div className="max-w-full bg-gray-100 mx-auto p-4 shadow-lg shadow-gray-800 rounded-md  text-black space-y-6 text-sm leading-relaxed">
      <p>
        I/we <input type="text" className="border-b border-black w-48 mx-1" />{" "}
        have been explained (by my treating doctor) about my disease condition,
        proposed care, treatment and its complications, risk, benefit and the
        expected cost of treatment by the responsible person / section.
      </p>

      <p className="font-hindi">
        मुझे / हमें{" "}
        <input type="text" className="border-b border-black w-48 mx-1" /> को
        बीमारी, इलाज एवं उससे होने वाले जोखिम एवं फायदे के बारे में चिकित्सक ने
        विस्तार से बता दिया है एवं इलाज पर होने वाले खर्च के बारे में संबंधित
        विभाग / व्यक्ति ने जानकारी दे दी है।
      </p>

      <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4">
        <div className="flex-1  ">
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
            label="Date & Time"
          />
        </div>

        <div className="flex-1">
          <DigitalSignatureSection
            onSignatureSave={handleSignatureSave}
            title="Name & Signature of the Patient / Relative:"
          />
        </div>
      </div>

      <div>
        <p>
          I Dr.{" "}
          <input type="text" className="border-b border-black w-60 mx-1" /> have
          explained the patient about the proposed care & treatment & its
          complications, risk, benefit and approximate cost in the language they
          understand.
        </p>
      </div>

      <div>
       <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4">
        <div className="flex-1  ">
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
            label="Date & Time"
          />
        </div>

        <div className="flex-1">
          <DigitalSignatureSection
            onSignatureSave={handleSignatureSave}
              title=" Signature of the Treating Doctor:"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
