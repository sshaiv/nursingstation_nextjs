// app/components/AnaesthesiaForm.js
"use client";

import DateTimeInput from "@/app/common/DateTimeInput";
import { useState } from "react";
import TeePreOperative from "./TeePreOperative";
import TeePostOperative from "./TeePostOperative";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";

export default function AnaesthesiaForm() {
  const [formData, setFormData] = useState({
    operationPlanned: "",
    operationPerformed: "",
    date: "",
    reExploration: "",
    checklist: {
      eyes: false,
      earPlugs: false,
      antibiotic: false,
      blanket: false,
    },
    monitoring: {
      ecg: "",
      lap: "",
      act: "",
      nibp: "",
      spo2: "",
      ["inv bp"]: "",
      ["fio2"]: "",
      co: "",
      tee: "",
      abg: "",
      ["urinary output"]: "",
      ["bis"]: "",
      ["pap"]: "",
      ["etco2"]: "",
      ["others"]: "",
      cvp: "",

      ["ventAlarm"]: "",
      ["inhalayionAgent"]: "",
      ["Temp(nasal /blood/other)"]: "",
    },
    cpbmanagement: {
      additives: "",
      ["normo/hypothermia/drift :"]: "",

      ["cardioplegia (retrograde/ante grade / cold warm )"]: "",
      ["return of activity (spontaneous /dc shock)"]: "",
      drugs: "",
      pacemaker: "",

      ["weaning off cpb"]: "",
    },

    bloodProducts: {
      prbc: false,
      ffp: false,
      platelets: false,
      others: "",
    },
    support: {
      ["support"]: "",
      ["iabp/lv assist device"]: "",
      ["post cpb note"]: "",
    },
    fluidbalanceinput: {
      ["crystalloid"]: "",
      ["colloid"]: "",
      ["blood products"]: "",
      ["cpb balance"]: "",
      ["total"]: "",
    },
    fluidbalanceoutput: {
      ["urine output "]: "",
      ["blood loss"]: "",

      ["total"]: "",
    },
    shiftingnotes: {
      ["vitals"]: "",
      ["hr"]: "",
      ["abp"]: "",
      ["pa/cvp"]: "",
      ["fio2"]: "",
      ["eto2"]: "",

      ["spo2"]: "",
      ["temperature"]: "",
    },
    instructions: {
      ["npo"]: "",
      ["vitals/hourly"]: "",
      ["i/o hourly"]: "",
      ["analgesia"]: "",
      ["antibiotic"]: "",
      ["ionotropes/vasopressors:"]: "",
    },
    receivingnotes: {
      ["vitals"]: "",
      ["hr"]: "",
      ["abp"]: "",
      ["pa/cvp"]: "",
      ["fio2"]: "",
      ["eto2:"]: "",
      ["spo2:"]: "",
      ["temperature:"]: "",
    },
    ivfluids: {
      ["shifted to"]: false,
      icu: false,
      ["Post op recovery"]: false,
      ward: false,
    },
    surgeons: ["", "", ""],
    anesthesiologists: ["", "", ""],
    perfusionist: "",
    technician: "",
    remarks: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <div className="flex gap-4 w-full">
        {/* Operation Planned */}
        <div className="flex flex-col w-1/2">
          <label className="text-xs font-medium text-neutral-700 mb-1">
            Operation Planned :
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 text-sm"
            value={formData.operationPlanned}
            onChange={(e) =>
              setFormData({ ...formData, operationPlanned: e.target.value })
            }
          />
        </div>

        {/* Operation Performed */}
        <div className="flex flex-col w-1/2">
          <label className="text-xs font-medium text-neutral-700 mb-1">
            Operation Performed :
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 text-sm"
            value={formData.operationPerformed}
            onChange={(e) =>
              setFormData({ ...formData, operationPerformed: e.target.value })
            }
          />
        </div>
      </div>

      {/* Date + Re-exploration */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="mt-4">
          {/* Date & Time Input */}
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={(e) => setTime(e.target.value)}
            className="col-span-full"
          />
        </div>
        <div className="flex mt-4 gap-2">
          <label className="text-xs  font-medium text-neutral-700 mb-1">
            Re-exploration :
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="reExploration"
                value="Yes"
                checked={formData.reExploration === "Yes"}
                onChange={(e) =>
                  setFormData({ ...formData, reExploration: e.target.value })
                }
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="reExploration"
                value="No"
                checked={formData.reExploration === "No"}
                onChange={(e) =>
                  setFormData({ ...formData, reExploration: e.target.value })
                }
              />
              No
            </label>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="mb-4 ">
        <label className="text-xs font-medium text-neutral-700 mb-1 block ">
          Post-Induction Check List
        </label>
        {[
          { key: "eyes", label: "Eyes lubricated and taped" },
          { key: "earPlugs", label: "Ear Plugs" },
          {
            key: "antibiotic",
            label: "Antibiotic given within 1 hr of incision",
          },
          { key: ",blanket", label: "Warming Blanket working" },
        ].map((item) => (
          <label
            key={item.key}
            className="flex items-center gap-2 text-xs font-medium text-neutral-700 mb-1"
          >
            <input
              type="checkbox"
              checked={formData.checklist[item.key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checklist: {
                    ...formData.checklist,
                    [item.key]: e.target.checked,
                  },
                })
              }
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* monitoring */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">monitoring</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-4 
                  grid-cols-3   /* mobile: 3 per row */
                  sm:grid-cols-4 /* small tablets: 4 per row */
                  md:grid-cols-5 /* tablets: 5 per row */
                  lg:grid-cols-7 /* desktop: 6 per row */"
        >
          {Object.keys(formData.monitoring).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.monitoring[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monitoring: {
                      ...formData.monitoring,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Blood Products */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1 block ">
          Blood Products
        </label>
        <div className="flex gap-6">
          {["prbc", "ffp", "platelets"].map((bp) => (
            <label key={bp} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={formData.bloodProducts[bp]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bloodProducts: {
                      ...formData.bloodProducts,
                      [bp]: e.target.checked,
                    },
                  })
                }
              />
              {bp.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Surgeons */}
      <div className="mb-4">
        <label className=" text-xs font-medium text-neutral-700 mb-1  ">
          Surgeons
        </label>
        {formData.surgeons.map((s, i) => (
          <input
            key={i}
            type="text"
            className="w-full border rounded p-2 mb-2 flex "
            placeholder={`Surgeon ${i + 1}`}
            value={s}
            onChange={(e) => {
              const newS = [...formData.surgeons];
              newS[i] = e.target.value;
              setFormData({ ...formData, surgeons: newS });
            }}
          />
        ))}
      </div>

      {/* Anesthesiologists */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1 block ">
          Anesthesiologists
        </label>
        {formData.anesthesiologists.map((a, i) => (
          <input
            key={i}
            type="text"
            className="w-full border rounded p-2 mb-2"
            placeholder={`Anesthesiologist ${i + 1}`}
            value={a}
            onChange={(e) => {
              const newA = [...formData.anesthesiologists];
              newA[i] = e.target.value;
              setFormData({ ...formData, anesthesiologists: newA });
            }}
          />
        ))}
      </div>

      {/* Perfusionist */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1">
          Perfusionist :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={formData.perfusionist}
          onChange={(e) =>
            setFormData({ ...formData, perfusionist: e.target.value })
          }
        />
      </div>

      {/* Technician */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1">
          Technician :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={formData.technician}
          onChange={(e) =>
            setFormData({ ...formData, technician: e.target.value })
          }
        />
      </div>

      {/* Remarks */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1">
          Remarks :
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows="3"
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        />
      </div>

      {/* Induction Notes */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1">
          Induction Notes :
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows="3"
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        />
      </div>
      {/* Post Induction Notes */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1">
          Post Induction Notes :
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows="3"
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        />
      </div>

      {/* cpbmanagement */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">CPB Management</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.cpbmanagement).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.cpbmanagement[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cpbmanagement: {
                      ...formData.cpbmanagement,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* support */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Support</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.support).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.support[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    support: {
                      ...formData.support,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fluid Balance Input */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Fluid Balance Input</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.fluidbalanceinput).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.fluidbalanceinput[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fluidbalanceinput: {
                      ...formData.fluidbalanceinput,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Output</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.fluidbalanceoutput).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.fluidbalanceoutput[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fluidbalanceoutput: {
                      ...formData.fluidbalanceoutput,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <TeePreOperative />
      <TeePostOperative />

      {/* Shifting Notes */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Shifting Notes </h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.shiftingnotes).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.shiftingnotes[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shiftingnotes: {
                      ...formData.shiftingnotes,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* instructions */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Instructions </h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.instructions).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.instructions[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructions: {
                      ...formData.instructions,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Receiving Notes  */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Receiving Notes </h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-2 
                  grid-cols-2   /* mobile: 3 per row */
                  sm:grid-cols-2 /* small tablets: 4 per row */
                  md:grid-cols-3 /* tablets: 5 per row */
                  lg:grid-cols-3 /* desktop: 6 per row */"
        >
          {Object.keys(formData.receivingnotes).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.receivingnotes[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    receivingnotes: {
                      ...formData.receivingnotes,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* ivfluids  */}
      <div className="mb-4">
        <label className="text-xs font-medium text-neutral-700 mb-1 block ">
          I.V Fluids
        </label>
        <div className="flex gap-6">
          {["SHIFTED TO", "icu", "Post of recovery", "ward"].map((bp) => (
            <label key={bp} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={formData.ivfluids[bp]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ivfluids: {
                      ...formData.ivfluids,
                      [bp]: e.target.checked,
                    },
                  })
                }
              />
              {bp.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      <DigitalSignatureSection title="sign" />
    </div>
  );
}
