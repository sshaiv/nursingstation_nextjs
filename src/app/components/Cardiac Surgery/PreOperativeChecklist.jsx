import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { ModalHeading } from "@/app/common/text";
import React, { useRef, useState } from "react";

export default function PreOperativeChecklist() {
  const formRef = useRef(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ModalHeading title="Cardiac Surgery" className="text-[11px]" />
      <div className="mx-auto max-w-6xl">
        {/* Sheet */}
        <div
          ref={formRef}
          className="rounded-2xl bg-white p-4 shadow-lg print:shadow-none md:p-6"
        >
          <Header />
          <PatientBlock />
          <MarkSection />
          <Checklist />
          <ShiftSection />
          <Notes />
          <Signatures />

          <style jsx global>{`
            .box {
              @apply h-4 w-4 rounded border border-neutral-400 align-middle;
            }
            .row {
              @apply grid grid-cols-[20px_1fr_120px] items-start gap-3 py-1;
            }
            .lbl {
              @apply text-sm;
            }
            .sec {
              @apply mt-4 rounded-xl border border-neutral-300 bg-[#fafafa] p-4;
            }
            .dotline {
              @apply mt-1 w-full border-b border-dashed border-neutral-400;
            }
            @media print {
              body {
                background: white;
              }
              .print\\:hidden {
                display: none !important;
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
    <header className="mb-4 flex items-start justify-between">
      <div className="text-sm font-semibold  mt-2 font-serif text-gray-700">
        ● Pre-Operative CheckList
      </div>
    </header>
  );
}

function LabeledInput({ label, placeholder = "", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-neutral-700">
        {label}
      </span>
      <input
        className="w-full rounded-md border border-neutral-300 p-2 text-sm focus:ring-2 focus:ring-neutral-400"
        placeholder={placeholder}
      />
    </label>
  );
}

function PatientBlock() {
  return (
    <section className="mt-3 rounded-2xl border bg-white p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        <LabeledInput label="Name" className="lg:col-span-2" />
        <LabeledInput label="Age / Sex" />
        <LabeledInput label="IPD No." />
        <LabeledInput label="Ward No." />
        <LabeledInput label="Surgeon" className="lg:col-span-2" />
        <LabeledInput label="Diagnosis" className="lg:col-span-2" />
        <LabeledInput label="Date" />
        <LabeledInput label="Time" />
        <LabeledInput label="Anaesthesia" />
      </div>
    </section>
  );
}

function MarkSection() {
  return (
    <section className="sec">
      <div className="text-sm font-light text-center mt-2">
        (Mark ☑️ where applicable)
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2">
        <Check label="Nil by Mouth since" withField />
        <Check
          label="Written Informed Consent (For Surgery/Anaesthesia)"
          withField
        />
        <Check
          label="Preparation / Shaving (mention body part to be shaved)"
          withField
        />
      </div>
    </section>
  );
}

function Check({ label, withField = false }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {/* Checkbox */}
      <input type="checkbox" className="w-4 h-4" />

      {/* Label */}
      <div className="text-sm">{label}</div>

      {/* Optional Input Field */}
      {withField && (
        <input
          className="ml-2 flex-1 rounded-md border border-neutral-300 p-1 text-sm"
          placeholder="Enter value"
        />
      )}
    </div>
  );
}

function Checklist() {
  const items = [
    { label: "Side Marking Done" },
    { label: "Site Marking Done" },
    { label: "Identification tag in place." },
    { label: "Removal of Denture, Ornaments, Nail Polish, Undergarment." },
    { label: "Drug Allergies" },
    { label: "If Yes, mention the name of the drug", field: true },
    { label: "Check cross match & number of blood bags arranged." },
    {
      label: "Pre medication (30 mins before surgery / at specified time)",
      field: true,
    },
    { label: "Operation Section Clearance." },
    { label: "Pre anaesthesia checkup" },
    { label: "Pre OP medication" },
  ];

  return (
    <section className="sec">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-center gap-2 mb-2" // flex makes checkbox, label, and field in one row
        >
          <input type="checkbox" className="w-4 h-4" />
          <div className="lbl">{it.label}</div>
          {it.field && (
            <input className="ml-2 rounded-md border border-neutral-300 p-1 text-sm" />
          )}
        </div>
      ))}
    </section>
  );
}

function ShiftSection() {
  return (
    <section className="sec">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <LabeledInput
          label="Shift patient to OT on call at"
          placeholder="Time"
        />
        <LabeledInput label="Pre-op room" placeholder="Room / Bay" />
      </div>
    </section>
  );
}

function Notes() {
  return (
    <section className="sec">
      <h4 className="mb-2 text-sm font-semibold">Note:</h4>
      <ol className="list-decimal space-y-2 pl-6 text-sm">
        <li>
          Send the patient to O.T. 15 minutes before surgery / on call with
          file, all investigation reports (Blood, X-ray, CT, MRI, ECG, ECHO,
          Angio.).
        </li>
        <li>
          If patient is suffering from Diabetes, check FBS / RBS one hour prior
          to surgery and inform Consultant / Anaesthetist.
        </li>
      </ol>
    </section>
  );
}

function Signatures() {
  return (
    <section className="mt-4 rounded-xl border border-neutral-300 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-1">
        <div>
          <div className="text-sm font-semibold">Surgeon / Registrar</div>
          <GridSig />
        </div>

        <div>
          <div className="text-sm font-semibold">Over given by Ward Nurse</div>
          <GridSig />
        </div>
        <div>
          <div className="text-sm font-semibold">Over taken by O.T. Nurse</div>
          <GridSig />
        </div>
      </div>
    </section>
  );
}

function GridSig() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  return (
    <div className="mt-2 flex flex-col gap-3">
      <LabeledInput label="Name" />
      <DigitalSignatureSection title="signature" />
      <DateTimeInput
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        time={selectedTime}
        onTimeChange={setSelectedTime}
      />
    </div>
  );
}
