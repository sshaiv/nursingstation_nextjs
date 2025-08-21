import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

// Reusable Input component
function FormField({ label, type = "text", className = "", textarea = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-neutral-600">
        {label}
      </label>
      {textarea ? (
        <textarea
          className={`w-full border rounded-md px-2 py-1 h-24 resize-none ${className}`}
        ></textarea>
      ) : (
        <input
          type={type}
          className={`w-full border rounded-md px-2 py-1 ${className}`}
        />
      )}
    </div>
  );
}

export default function ProcedureNotes() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  return (
    <div className="min-h-screen flex justify-center">
      <div className="space-y-4 mt-3 w-6xl rounded-2xl border bg-white p-3 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="text-sm font-semibold mt-4 font-serif text-gray-700">
            ● PROCEDURE NOTES
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> OP
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> IP
            </label>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
          <FormField label="Name of the Patient" />
          <FormField label="S/O, W/O, D/O" />
          <FormField label="Age / Sex" />
          <FormField label="Registration No." />
          <FormField label="Primary Consultant" />
          <FormField label="IPD/OPD No." />
          <FormField label="Ward / Bed" />
        </div>

        {/* Procedure Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* DateTime input and signatures */}

          <label className="mb-1 block text-xs font-medium text-neutral-600">
            Date
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </label>
          <label className="mb-1 block text-xs font-medium text-neutral-600">
            Time in
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </label>
          <label className="mb-1 block text-xs font-medium text-neutral-600">
            Time out
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </label>
          <label className="mb-1 block text-xs font-medium text-neutral-600">
            Time taken
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
          </label>
        </div>

        {/* Diagnosis & Procedure */}
        <FormField label="Diagnosis" />
        <FormField label="Procedure" />

        {/* Doctor & Team */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FormField label="Doctor" />
          <FormField label="Anesthesia" />
          <FormField label="Anaesthetist" />
          <FormField label="Assistant" />
        </div>

        {/* Findings */}
        <FormField label="Findings / Details of Procedure Done" textarea />

        {/* Post Care Plan */}
        <FormField label="Post Procedure Care Plan" textarea />

        {/* Post Treatment Orders */}
        <FormField label="Post Procedure Treatment Orders" textarea />

        {/* Clinical Monitoring */}
        <div className="text-sm font-semibold mt-4 font-serif text-gray-700">
          ● Clinical Monitoring
        </div>

        <div className="space-y-4 mt-3 rounded-2xl border bg-white p-3 shadow-sm">
          {/* Intra Procedure */}
          <div>
            <div className="mt-2 flex items-start space-x-4">
              {/* Label */}
              <label className="text-xs text-gray-600 font-medium flex-shrink-0">
                1. Pre Procedure
              </label>

              {/* Pulse, BP, SpO2 inputs */}
              <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">Pulse</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">BP</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">SpO₂</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            </div>

            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>

          {/* Intra Procedure */}
          <div>
            <div className="mt-2 flex items-start space-x-4">
              {/* Label */}
              <label className="text-xs text-gray-600 font-medium flex-shrink-0">
                2. Intra Procedure
              </label>

              {/* Pulse, BP, SpO2 inputs */}
              <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">Pulse</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">BP</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">SpO₂</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            </div>

            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>

          {/* Post Procedure */}
          <div>
            <div className="mt-2 flex items-start space-x-4">
              {/* Label */}
              <label className="text-xs text-gray-600 font-medium flex-shrink-0">
                3. Post Procedure
              </label>

              {/* Pulse, BP, SpO2 inputs */}
              <div className="flex flex-wrap gap-2">
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">Pulse</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">BP</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex-1 min-w-[100px] max-w-[150px] flex flex-col">
                  <label className="text-xs text-gray-500">SpO₂</label>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            </div>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
        </div>

         {/* Signatures Section */}
       <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
       <div>
          <DigitalSignatureSection title="Signature of Doctor" />
          <div className="flex gap-2 w-full">
            <label className="flex-shrink-0">Name :</label>
            <input type="text" className="border-b w-full outline-none" />
          </div>
          <div className="flex gap-2 w-full mt-2">
            <label className="flex-shrink-0"> Time :</label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={(e) => setTime(e.target.value)}
            />
          </div>
      
        </div>
      </div>
      </div>
    </div>
  );
}
