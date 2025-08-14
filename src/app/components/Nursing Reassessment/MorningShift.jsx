import React from "react";

export default function MorningShift() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h3 className="text-center  text-sm font-bold text-blue-900">
          Morning Shift
        </h3>
        <section className="avoid-break mt-2  border border-neutral-400  p-4">
          <div className="grid grid-cols-12 text-sm">
            <div className="col-span-3 border-r border-neutral-300 pr-2">
              <Block label="Situation">
                <Field label="Diagnosis" />
                <Field label="Present Complaint" />
              </Block>

              <Block label="Background">
                <Field label="Investigation" rows={2} />
                <Field label="Medication / IV Fluid" rows={2} />
              </Block>

              <div className="mt-3">
                <textarea
                  rows={4}
                  placeholder="Additional notes"
                  className="w-full resize-none rounded-lg border border-neutral-300 bg-white p-2 outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>
            </div>

            <div className="col-span-9 pl-3">
              <div className="rounded-lg border border-neutral-300 p-3">
                <div className="mb-2 font-medium">Assessment-Vital</div>
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* Left side vitals */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 flex-1">
                    <Tiny label="T" />
                    <Tiny label="P" />
                    <Tiny label="R" />
                    <Tiny label="BP" className="col-span-2 sm:col-span-2" />
                    <Mini label="SpO₂" />
                    <Mini label="Pain" />
                  </div>

                  {/* Right side scores */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <LabeledInput small label="MEWS" />
                    <LabeledInput small label="GCS" />
                    <LabeledInput small label="Braden Score" />
                    <LabeledInput small label="Morse Score" />
                  </div>
                </div>
              </div>

              <Block label="Recommendation">
                <Field label="Pending Investigation" />
                <Field label="Pending Report" />
                <Field label="Referral" />
                <Field label="Remark" rows={2} />
              </Block>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <LabeledInput label="Handover Given By" />
                <LabeledInput label="Hand over Received By" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// functions
function Block({ label, children }) {
  return (
    <div className="mb-4  border border-neutral-300 bg-white">
      <div className="border-b border-neutral-300 bg-neutral-100 px-2 py-1 text-xs font-semibold">
        {label}
      </div>
      <div className="space-y-2 p-2">{children}</div>
    </div>
  );
}

function Field({ label, rows = 1 }) {
  const isText = rows > 1;
  return (
    <label className="block text-xs">
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      {isText ? (
        <textarea
          rows={rows}
          className="w-full resize-none rounded-md border border-neutral-300 p-2 focus:ring-2 focus:ring-neutral-400"
        />
      ) : (
        <input
          className="w-full rounded-md border border-neutral-300 p-2 focus:ring-2 focus:ring-neutral-400"
          type="text"
        />
      )}
    </label>
  );
}

function LabeledInput({ label, placeholder = "", small = false }) {
  return (
    <label className={`block ${small ? "text-xs" : "text-sm"}`}>
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-md border border-neutral-300 bg-white p-2 text-sm focus:ring-2 focus:ring-neutral-400"
        type="text"
      />
    </label>
  );
}

function Tiny({ label, className = "" }) {
  return (
    <label className={`col-span-2 flex items-center gap-2 ${className}`}>
      <span className="min-w-[2rem] text-xs font-medium text-neutral-700">
        {label}:
      </span>
      <input
        type="text"
        className="w-full rounded-sm border border-neutral-300 bg-white p-2 text-sm focus:ring-2 focus:ring-neutral-400"
      />
    </label>
  );
}

function Mini({ label }) {
  return (
    <label className="col-span-2 flex items-center gap-2">
      <span className="min-w-[2.5rem] text-xs font-medium text-neutral-700">
        {label}:
      </span>
      <input
        type="text"
        className="w-full rounded-sm border border-neutral-300 bg-white p-2 text-sm focus:ring-2 focus:ring-neutral-400"
      />
    </label>
  );
}
