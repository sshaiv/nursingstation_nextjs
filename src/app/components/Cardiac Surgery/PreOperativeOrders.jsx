"use client";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function PreOperativeOrders() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [formData, setFormData] = useState({
    patientPostedFor: "",
    caseNo: "",
    nbmSince: "",
    consent: false,
    prepParts: false,
    soapBathEvening: "",
    soapBathMorning: "",
    betadineScrub: false,
    height: "",
    weight: "",
    preAnaestheticCheck: false,
    antibiotics: ["", "", ""],
    shiftToOT: "",
    siteMarked: false,
    surgeonName: "",
    sign: "",
    dateTime: "",
  });

  // ✅ Reusable field renderers
  const renderTextInput = (label, name, placeholder = "") => (
    <div className="flex items-center ">
      <label className="w-40 text-xs font-medium text-neutral-700">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={formData[name]}
        className="flex-1 border rounded-md p-2 text-sm"
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      />
    </div>
  );

  const renderCheckbox = (label, name) => (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.checked })}
      />
      <label className="text-xs font-medium text-neutral-700 mb-1">
        {label}
      </label>
    </div>
  );

  const renderAntibiotics = () => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      {/* Label */}
      <label className="w-full sm:w-60 text-xs font-medium text-neutral-700 mt-1 sm:mt-2">
        9. Pre operative Antibiotics to be given
      </label>

      {/* Inputs in a responsive grid */}
      <div className="grid flex-1 gap-2 grid-cols-1 sm:grid-cols-2 lg:flex">
        {formData.antibiotics.map((antibiotic, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Antibiotic ${idx + 1}`}
            value={antibiotic}
            className="border rounded-md p-2 text-sm w-full"
            onChange={(e) => {
              const updated = [...formData.antibiotics];
              updated[idx] = e.target.value;
              setFormData({ ...formData, antibiotics: updated });
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <div className="text-sm font-semibold mt-2 font-serif text-gray-700">
        ● Department of CTVS | Pre-Operative Orders
      </div>

      <div className="space-y-4 p-4">
        {/* Patient Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
          {renderTextInput("Patient Posted for", "patientPostedFor")}
          {renderTextInput("Case No.", "caseNo")}
        </div>

        {/* Orders */}
        <div className="space-y-3">
          {renderTextInput("1. NBM since", "nbmSince")}
          {renderCheckbox("2. Written Informed Consent", "consent")}
          {renderCheckbox("3. Prepare parts from chin to toes", "prepParts")}
          {renderTextInput("4. Soap bath (Evening)", "soapBathEvening")}
          {renderTextInput("5. Soap bath (Morning)", "soapBathMorning")}
          {renderCheckbox(
            "6. Apply Betadine Scrub over chest & neck before shifting to OT",
            "betadineScrub"
          )}

          {/* Height & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderTextInput("Height", "height")}
            {renderTextInput("Weight", "weight")}
          </div>

          {renderCheckbox("8. Pre Anaesthetic Checkup", "preAnaestheticCheck")}
          {renderAntibiotics()}
          {renderTextInput(
            "10. Shift the Patient to OT on call/at",
            "shiftToOT"
          )}
          {renderCheckbox("11. Site marked (Where applicable)", "siteMarked")}
        </div>

        {/* Surgeon Details */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Surgeon / Registrar</h3>
          
          <DigitalSignatureSection title="Signature" />
             <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
          />
          {renderTextInput("Name", "surgeonName")}
       
        </div>
      </div>
    </div>
  );
}
