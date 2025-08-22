// app/components/CardiacAnaesthesiaRecord.jsx
"use client";
import { useState } from "react";

export default function CardiacAnaesthesiaRecord() {
  const [formData, setFormData] = useState({
    diagnosis: "",
    lvef: "",
    bloodReport: {
      bloodGroup: "",
      ["hbs ag"]: "",
      hcv: "",
      hiv: "",
    },
    labReports: {
      ["Hb/Pcv"]: "",
      Tlc: "",
      dlc: "",
      platelets: "",
      pt: "",
      inr: "",
      pttk: "",
      t: "",
      t: "",
      tsh: "",
      ["blood urea"]: "",
      ["s. creatinine"]: "",
      ["Na/k"]: "",
      ["f/pp/rbs"]: "",
      ["glyco hb"]: "",
      ["s.bil (d/i)"]: "",
      albumin: "",
      globulin: "",
      ["sgot/pt"]: "",
      ["alk phos"]: "",
      ["(r/m)"]: "",
      pft: "",
      evc: "",
      febi: "",
      pefr: "",
      ["fev1/fvc%"]: "",
      abg: "",
      ["Chest x-ray"]: "",
      ["CT Scan/MRI"]: "",
      Allergy: "",
    },
    cardiovascularSytem: {
      ["Unstable Angina"]: "",
      Angina: "",
      MI: "",
      ["Nervous System"]: "",
      cva: "",
      seizure: "",
      tla: "",
    },
    conditions: {
      niddm: false,
      iddm: false,
      jaundice: false,
      apd: false,
      thyroidHypo: false,
      thyroidHyper: false,
      smoking: false,
      asthma: false,
      alcohol: false,
      Prosthesis: "",
      prevSurgery: "",
      anyOther: "",
    },
    physicalExam: {
      temperature: "",
      bp: "",
      pulse: "",
      spine: "",
      chest: "",
      bht: "",
      ["peripheral pulse"]: "",
      ["radial/femoral/d.pedis"]: "",
      ["allens test:right "]: "",
      ["left "]: "",
      ["other systems "]: "",
      ["Cath data "]: "",
      ["left main disesase "]: "",
      ["echo/tee "]: "",
      ["ecg "]: "",
      ["carotid doppler "]: "",
      ["peripheral doppler "]: "",
    },
    instructions: "",
    premedication: "",
    weight: {
      ["weight /kg"]: "",
      ["height/kg"]: "",
      ["bsa/m2"]: "",
      ["bmi kg/m2"]: "",
      ["ASA:i/ii/iii/iv/e"]: "",
      ["nyha"]: "",
      ["euro score"]: "",
      ["anesthesia plan:ga/ra/la/mac"]: "",
      ["analgesia technique"]: "",
      ["oral/im/iv/pca"]: "",
      ["regional"]: "",
    },
    airway: {
      ["mouth opening"]: "",
      ["neck movement"]: "",
      ["mallampati grade"]: "",
      ["dentures"]: "",
    },
    medications: {
      anticoagulant: "",
      cardiac: "",
      antibiotic: "",
      miscellaneous: "",
    },
    name: "",
    dateTime: "",
    sign: "",
    id: "",
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl border">
      <div className="text-sm font-semibold mt-2 font-serif text-gray-700 mb-2">
        ● Cardiac Anaesthesia Record
      </div>

      {/* Diagnosis + LVEF */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Diagnosis
          </label>
          <input
            type="text"
            className="w-full h-8 border rounded-md p-2"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            LVEF
          </label>
          <input
            type="text"
            className="w-full h-8 border rounded-md p-2"
            value={formData.lvef}
            onChange={(e) => setFormData({ ...formData, lvef: e.target.value })}
          />
        </div>
      </div>

      {/* Blood Report */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.keys(formData.bloodReport).map((field, idx) => (
            <div key={idx} className="flex">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.bloodReport[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bloodReport: {
                      ...formData.bloodReport,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lab Reports */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Lab Reports</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-4 
                  grid-cols-3   /* mobile: 3 per row */
                  sm:grid-cols-4 /* small tablets: 4 per row */
                  md:grid-cols-5 /* tablets: 5 per row */
                  lg:grid-cols-7 /* desktop: 6 per row */"
        >
          {Object.keys(formData.labReports).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.labReports[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    labReports: {
                      ...formData.labReports,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cardiovascular Sytem */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Cardiovascular Sytem</h3>

        {/* ✅ Responsive grid */}
        <div
          className="grid gap-4 
                  grid-cols-3   /* mobile: 3 per row */
                  sm:grid-cols-4 /* small tablets: 4 per row */
                  md:grid-cols-5 /* tablets: 5 per row */
                  lg:grid-cols-7 /* desktop: 6 per row */"
        >
          {Object.keys(formData.cardiovascularSytem).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={formData.cardiovascularSytem[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cardiovascularSytem: {
                      ...formData.cardiovascularSytem,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/*   */}
      <div className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {Object.entries(formData.conditions).map(([key, value], idx) =>
            typeof value === "boolean" ? (
              <label key={idx} className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      conditions: {
                        ...formData.conditions,
                        [key]: e.target.checked,
                      },
                    })
                  }
                />
                {key.toUpperCase()}
              </label>
            ) : (
              <div key={idx}>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  {key.toUpperCase()}
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 h-8"
                  value={value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      conditions: {
                        ...formData.conditions,
                        [key]: e.target.value,
                      },
                    })
                  }
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Physical Examination */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Physical Examination</h3>

        {/* ✅ Responsive Grid */}
        <div
          className="grid gap-4 
                  grid-cols-3   /* mobile: 3 per row */
                  md:grid-cols-6 /* tablet: 5 per row */
                  lg:grid-cols-6 /* desktop also 5 */"
        >
          {Object.keys(formData.physicalExam).map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2 h-8"
                value={formData.physicalExam[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    physicalExam: {
                      ...formData.physicalExam,
                      [field]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <h3 className="font-semibold underline">Instructions</h3>
        <textarea
          className="w-full border rounded p-2 resize-none"
          rows={3}
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
        />
      </div>

      {/* weight height */}
      <div className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(formData.weight).map(([key, value], idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {key.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: {
                      ...formData.weight,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
      {/* Airway */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Airway</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(formData.airway).map(([key, value], idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {key.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    airway: {
                      ...formData.airway,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="mb-4">
        <h3 className="font-semibold underline mb-2">Medications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(formData.medications).map(([key, value], idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {key.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full border rounded-md h-8 p-2"
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medications: {
                      ...formData.medications,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Premedication */}
      <div className="mb-4">
        <h3 className="font-semibold underline">Premedication:nil orally</h3>
        <textarea
          className="w-full border rounded p-2 resize-none"
          rows={3}
          value={formData.premedication}
          onChange={(e) =>
            setFormData({ ...formData, premedication: e.target.value })
          }
        />
      </div>

      {/* Signatures */}
      <div className="border-t pt-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {["Name", "Date/Time", "Sign", "ID"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {field}
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={formData[field.toLowerCase()] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.toLowerCase()]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
