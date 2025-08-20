import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useState } from "react";
import { FaArrowDown, FaLevelDownAlt } from "react-icons/fa";

const ProcedureConsentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-2 border">
      <h2 className="text-3xl font-bold text-center mb-6 underline">
        INFORMED CONSENT FOR PROCEDURE
      </h2>

      {/* Patient Info */}
      <div className="grid grid-cols-2 gap-4 text-sm font-semibold mb-4">
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Name of the patient :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">S/O, W/O, D/O :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Age / Sex :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Registration No :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">IPD/OPD No :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Ward / Bed :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
      </div>

      {/* Consultant */}
      <div className="flex gap-2 w-full mb-4 font-semibold">
        <label className="flex-shrink-0">Primary Consultant :</label>
        <input type="text" className="border-b w-full outline-none" />
      </div>

      <div className="border border-b-1 border-black mb-2" />
      {/* Consent Statement */}
      <p className="text-sm mb-4 leading-relaxed">
        I / My patient do hereby give consent to undergo the following
        procedure, as deemed necessary by my treating consultant, under local /
        spinal / general anesthesia. The details of the procedure, its benefit,
        risks, alternatives, complications and related issues have been
        explained to me / us in my / our own language and I / we, after
        understanding these details give my / our consent for the same.
      </p>

      {/* Procedure Details */}
      <div className="space-y-3 text-sm">
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Provisional Diagnosis :</label>
          <input type="text" className="flex-1 border-b outline-none" />
        </div>

        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">
            Date & Time of the procedure :
          </label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">
            (In O.T. / Ward / Department) :
          </label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Name of the procedure :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap">
            Name of the Doctor performing procedure :
          </label>
          <input type="text" className="border-b flex-1 outline-none" />
          <span className="flex items-center gap-1 whitespace-nowrap">
            (<FaArrowDown className="inline-block" /> LA/Mode. Sed )
          </span>
        </div>

        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">Benefits of the procedure :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">
            Risks involved in the procedure :
          </label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full">
          <label className="flex-shrink-0">
            Alternatives to the procedure :
          </label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
      </div>

      {/* Signatures Section */}
      <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
        <div>
          <label className="font-bold">Signature of Patient :</label>
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
        <div>
          <label className="font-bold">Signature of Doctor :</label>
          <DigitalSignatureSection />
          <div className="flex gap-2 w-full">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mt-2">
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

      <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
        <div>
          <label className="font-bold">Signature of Parent / Guardian :</label>
          <DigitalSignatureSection />
          <div className="flex gap-2 w-full mb-1">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mb-1">
            <label className="flex-shrink-0">Relationship :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mb-2">
            <label className="flex-shrink-0">Phone No :</label>
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
          <label className="font-bold">Signature of Witness :</label>
          <DigitalSignatureSection />
          <div className="flex gap-2 w-full mb-1">
            <label className="flex-shrink-0">Name of Witness :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>

          <div className="flex gap-2 w-full mb-1">
            <label className="flex-shrink-0">Phone No :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-xs font-bold mt-4 text-gray-600">
        In case patient is unable to sign, due to medical condition or is minor,
        the consent needs to be signed by parent / guardian along with one
        witness.
      </p>

      <hr className="my-3" />

      <h3 className="text-base font-semibold mb-2 underline">
        CLINICAL MONITORING
      </h3>
      {/* <div className="space-y-2 text-sm">
        <div>
          <label>1. Intra Procedure :</label>
          <input
            type="text"
            className="border-b w-full outline-none"
            placeholder="Pulse, BP, SPO₂"
          />
        </div>
        <div>
          <label>2. Post Procedure :</label>
          <input
            type="text"
            className="border-b w-full outline-none"
            placeholder="Pulse, BP, SPO₂"
          />
        </div>
      </div> */}
      <div className="space-y-4 text-sm">
        {/* Intra Procedure */}
        <div className="flex items-start gap-4">
          {/* Left side */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">
              1. Intra Procedure :
            </label>
            <textarea
              rows={3}
              className="w-full border p-2 rounded outline-none resize-none"
              placeholder="Enter details..."
            />
          </div>

          {/* Right side */}
          <div className="flex gap-2 items-center">
            <label>Pulse:</label>
            <input type="number" className="border-b outline-none w-16" />

            <label>BP:</label>
            <input type="number" className="border-b outline-none w-16" />

            <label>SPO₂:</label>
            <input type="number" className="border-b outline-none w-16" />
          </div>
        </div>

        {/* Post Procedure */}
        <div className="flex items-start gap-4">
          {/* Left side */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">
              2. Post Procedure :
            </label>
            <textarea
              rows={3}
              className="w-full border p-2 rounded outline-none resize-none"
              placeholder="Enter details..."
            />
          </div>

          {/* Right side */}
          <div className="flex gap-2 items-center">
            <label>Pulse:</label>
            <input type="number" className="border-b outline-none w-16" />

            <label>BP:</label>
            <input type="number" className="border-b outline-none w-16" />

            <label>SPO₂:</label>
            <input type="number" className="border-b outline-none w-16" />
          </div>
        </div>
      </div>

      <h3 className="text-base font-semibold mt-6 mb-2 underline">
        PROCEDURE NOTES
      </h3>
      <div className="space-y-3 text-sm">
        {/* Date + Time In/Out/Taken in one line */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Date :</label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              className="border-b outline-none w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Time In :</label>
            <input
              type="text"
              placeholder="HH:MM"
              className="border-b outline-none w-20"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Time Out :</label>
            <input
              type="text"
              placeholder="HH:MM"
              className="border-b outline-none w-20"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Time Taken :</label>
            <input
              type="text"
              placeholder="Duration"
              className="border-b outline-none w-24"
            />
          </div>
        </div>

        {/* Procedure */}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Procedure :</label>
            <textarea
              className="border w-full rounded-md p-2 text-sm"
              placeholder="Enter procedure details"
            />
          </div>

          {/* Anesthesia */}
          <div>
            <label>Anesthesia :</label>
            <textarea
              className="border w-full rounded-md p-2 text-sm"
              placeholder="Enter anesthesia details"
            />
          </div>
        </div>

        {/* Findings */}
        <div>
          <label>Findings / Details of Procedure Done :</label>
          <textarea
            className="border w-full rounded-md p-2 text-sm"
            placeholder="Enter findings..."
          />
        </div>

        {/* Post Procedure Care */}
        <div>
          <label>Post Procedure Care Plan / Treatment Orders :</label>
          <textarea
            className="border w-full rounded-md p-2 text-sm"
            placeholder="Enter care plan..."
          />
        </div>
      </div>

      <div className="mt-6 text-sm ">
        <div className="flex gap-2 w-full mt-1">
          <label className="flex-shrink-0">Name :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <div className="flex gap-2 w-full mt-1">
          <label className="flex-shrink-0">Time :</label>
          <input type="text" className="border-b w-full outline-none" />
        </div>
        <label>Doctor’s Sign :</label>
        <DigitalSignatureSection />
      </div>
    </div>
  );
};

export default ProcedureConsentForm;
