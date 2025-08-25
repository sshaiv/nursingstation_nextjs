import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useRef, useState, useEffect } from "react";

export default function SafetyChecklist() {

  return (
    <div className="min-h-screen  md:p-2">
      <div className="mx-auto max-w-6xl">
        {/* Sheet */}
        <div className="  p-2">
          <Header />
          <PatientHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-white p-4 rounded shadow">
              <CheckpointA />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <CheckpointB />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <CheckpointC />
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-3 flex items-start justify-between">
      <div className="text-sm font-semibold  mt-4 font-serif text-gray-700">
        ● Surgical Procedure Safety Checklist
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
        <LabeledInput label="Name" className="md:col-span-2" />
        <LabeledInput label="Age" />
        <LabeledInput label="Sex" />
        <LabeledInput label="Date of Admission" />
        <LabeledInput label="Surgeon's Name" className="md:col-span-2" />
        <LabeledInput label="Reg  No." />
        <LabeledInput label="OPD / IPD No." />
        <LabeledInput label="Ward /bed no" />
        <LabeledInput label="Diagnosis" className="md:col-span-2" />
        <LabeledInput label="Date of Admission" />
        <LabeledInput label="Date of Surgery" />
        <LabeledInput label="Surgery/Procedure" />
      </div>

      {/* --- Phase Timeline Box --- */}
      <section className="border  mt-2">
        <div className="flex flex-col  gap-3 md:flex-row md:items-stretch">
          {/* Phase 1 */}
          <div className="flex-1 p-3">
            <div className="text-xs font-medium text-neutral-600 mb-1">
              Before Induction of Anaesthesia
            </div>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Arrow (mobile: down) */}
          <div className="flex items-center justify-center text-neutral-400 md:hidden">
            <span className="text-lg">↓</span>
          </div>
          {/* Arrow (tablet/desktop: right) */}
          <div className="hidden items-center justify-center px-1 text-neutral-400 md:flex">
            <span className="text-xl">→</span>
          </div>

          {/* Phase 2 */}
          <div className="flex-1  p-3">
            <div className="text-xs font-medium text-neutral-600 mb-1">
              Before Skin Incision
            </div>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Arrow (mobile: down) */}
          <div className="flex items-center justify-center text-neutral-400 md:hidden">
            <span className="text-lg">↓</span>
          </div>
          {/* Arrow (tablet/desktop: right) */}
          <div className="hidden items-center justify-center px-1 text-neutral-400 md:flex">
            <span className="text-xl">→</span>
          </div>

          {/* Phase 3 */}
          <div className="flex-1   p-3">
            <div className="text-xs font-medium text-neutral-600 mb-1">
              Before Patient Leaves Operating Room
            </div>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </div>
        </div>
        <div className="text-xs font-normal text-neutral-600 mb-1 flex justify-between p-1">
          <span className="flex-1 text-center">
            (with at least Nurse and Anaesthetist)
          </span>
          <span className="flex-1 text-center">
            (with Nurse, Anaesthetist and Surgeon)
          </span>
          <span className="flex-1 text-center">
            (with Nurse, Anaesthetist and Surgeon)
          </span>
        </div>
      </section>
    </section>
  );
}

function Check({ label }) {
  return (
    <label className="row text-xs font-semibold text-gray-600 ">
      <input type="checkbox" className="box" />
      <span className="lbl">{label}</span>
    </label>
  );
}

function CheckpointA() {
  return (
    <section className="sec">
      <div className="grid grid-cols-1 gap-y-2">
        <Check label="Has the patient confirmed identity, site, procedure and consent?" />
        <Check label="Is the surgical site marked?" />
        <Check label="Is the anaesthesia machine and medication check complete?" />
        <Check label="Is the pulse oximeter on the patient and functioning?" />
        <Check label="Does the patient have a known allergy?" />
        <Check label="Difficult airway or aspiration risk?" />
        <Check label=">=500 ml blood loss (7 ml/kg in children) anticipated?" />
        <div className="ml-7 text-sm text-neutral-600">
          If yes to any, equipment and assistance available?
        </div>
      </div>
    </section>
  );
}

function CheckpointB() {
  return (
    <section className="sec">
      <div className="grid grid-cols-1 gap-y-2">
        <Check label="Confirm all team members have introduced themselves by name and role." />
        <Check label="Confirm the patient's name, procedure and where the incision will be made." />
        <Check label="Has antibiotic prophylaxis been given within the last 60 minutes?" />
        <Check label="Anticipated Critical Events" />
        <Check label="To Surgeon: What are the critical or non-routine steps?" />
        <Check label="To Surgeon: How long will the case take?" />
        <Check label="To Surgeon: What is the anticipated blood loss?" />
        <Check label="To Anaesthetist: Are there any patient-specific concerns?" />
        <Check label="To Nursing Team: Has sterility (including indicator results) been confirmed?" />
        <Check label="To Nursing Team: Are there equipment issues or any concerns?" />
        <Check label="Is essential imaging displayed?" />
      </div>
    </section>
  );
}

function CheckpointC() {
  return (
    <section className="sec">
      <div className="grid grid-cols-1 gap-y-2">
        <Check label=" The name of the procedure." />
        <Check label="Completion of instrument, sponge and needle counts." />
        <Check label="Specimen labeling (read specimen labels aloud, including patient name) confirmed." />
        <Check label="Any equipment problems to be addressed?" />
        <Check label="To Surgeon, Anaesthetist and Nurse: What are the key concerns for recovery and management of this patient?" />
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
        <DigitalSignatureSection title="Anaesthetist" />
        <DigitalSignatureSection title="Surgeon" />
        <DigitalSignatureSection title="Scrub Nurse" />
        <DigitalSignatureSection title="OT/Cath Lab Technician" />

        <DigitalSignatureSection title="Sign of Anaesthetist" />
        <DigitalSignatureSection title="Sign of Surgeon" />
        {/* DateTime input and signatures */}
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          time={selectedTime}
          onTimeChange={setSelectedTime}
        />
      </div>
    </section>
  );
}

function Sig({ label }) {
  return (
    <div className="rounded-lg border border-neutral-300 p-2">
      <div className="text-xs font-medium text-neutral-700">{label}</div>
      <div className="mt-10 border-t border-dashed border-neutral-400" />
      <div className="mt-1 text-[11px] text-neutral-500">Sign</div>
    </div>
  );
}
