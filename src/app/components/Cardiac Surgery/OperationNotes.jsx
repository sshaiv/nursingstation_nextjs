import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useRef, useState, useEffect } from "react";

export default function OperationNotes() {
  const formRef = useRef(null);

  return (
    <div className="min-h-screen  md:p-2">
      <div className="mx-auto max-w-6xl">
        {/* Sheet */}
        <form ref={formRef} className="  p-2">
          <Header />
          <PatientHeader />
          <Signatures />

          <style jsx global>{`
            .box {
              @apply inline-block h-4 w-4 rounded border border-neutral-400 align-middle;
            }
            .row {
              @apply flex items-start gap-3 py-1;
            }
            .lbl {
              @apply text-sm;
            }
            .sec {
              @apply mt-4 rounded-xl border border-neutral-300 bg-[#fafafa] p-4;
            }
            @media print {
              body {
                background: white;
              }
              .print\\:hidden {
                display: none !important;
              }
              .print\\:shadow-none {
                box-shadow: none !important;
              }
            }
          `}</style>
        </form>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-3 flex items-start justify-between">
      <div className="text-sm font-semibold  mt-4 font-serif text-gray-700">
        ● Operation Notes
      </div>
    </header>
  );
}

function LabeledInput({ label, className = "", placeholder = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-600">
        {label}
      </span>
      <input
        className="w-full rounded-sm border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </label>
  );
}

function PatientHeader() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  return (
    <section className="rounded-lg  border bg-white p-3 shadow-sm ">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <LabeledInput label="Primary Consultant" className="md:col-span-2" />
        <LabeledInput label="Date" />
        <LabeledInput label="Time in" />
        <LabeledInput label="Time out" />
        <LabeledInput label="Time  Taken" className="md:col-span-2" />
        <LabeledInput label="Pre Operative Diagnosis" />
        <LabeledInput label="Post Operative Diagnosis" />
        <LabeledInput label="Operation" />
        <LabeledInput label="Surgeon" className="md:col-span-2" />
        <LabeledInput label="Anesthetist" />
        <LabeledInput label="Assistant" />
        <LabeledInput label="Findings &  Procedure" />
        <LabeledInput label="Post Operative Treatment Orders" />
      </div>
    </section>
  );
}
function Signatures() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Main digital signature sections */}
       {/* DateTime input and signatures */}
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          time={selectedTime}
          onTimeChange={setSelectedTime}
        />
        <DigitalSignatureSection title="Surgeon" />
     
        <DigitalSignatureSection title="Team Member" />
       
      </div>
    </section>
  );
}
