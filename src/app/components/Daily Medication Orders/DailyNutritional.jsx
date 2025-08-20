"use client";
import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function DailyAssessment() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  const [assessments, setAssessments] = useState([
    {
      date: "",
      feeding: "",
      diet: "",
      remarks: "",
      vip: {},
      glasgow: {},
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...assessments];
    updated[index][field] = value;
    setAssessments(updated);
  };

  const handleScoreChange = (index, type, key, score) => {
    const updated = [...assessments];
    updated[index][type] = { ...updated[index][type], [key]: score };
    setAssessments(updated);
  };

  const addNewAssessment = () => {
    const newForm = {
      date: "",
      feeding: "",
      diet: "",
      remarks: "",
      vip: {},
      glasgow: {},
    };
    // 👇 Naya form upar add hoga
    setAssessments([newForm, ...assessments]);
  };

  return (
    <div className="p-0 max-w-5xl mx-auto">
      {/* Button ko upar le aaye */}
      <div className="flex justify-end mb-4">
        <button
          onClick={addNewAssessment}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Another Assessment
        </button>
      </div>

      {assessments.map((form, idx) => (
        <div key={idx} className="border p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-red-300 font-semibold">
              Assessment (
              {form.date ? new Date(form.date).toLocaleString() : "Not Set"})
            </h2>
          </div>

          {/* Row 1: Feeding, Diet, Date */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="font-semibold">Route of Feeding:</label>
              <input
                type="text"
                value={form.feeding}
                onChange={(e) => handleChange(idx, "feeding", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Diet:</label>
              <input
                type="text"
                value={form.diet}
                onChange={(e) => handleChange(idx, "diet", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 font-medium mb-1">
                Date & Time
              </label>
              <DateTimeInput
                selectedDate={form.date ? new Date(form.date) : new Date()}
                onDateChange={(date) => {
                  const formatted = `${date.toISOString().split("T")[0]} ${
                    form.date?.split(" ")[1] || "00:00"
                  }`;
                  handleChange(idx, "date", formatted);
                }}
                time={form.date ? form.date.split(" ")[1] : ""}
                onTimeChange={(e) => {
                  const time = e.target.value;
                  const datePart = form.date
                    ? form.date.split(" ")[0]
                    : new Date().toISOString().split("T")[0];
                  handleChange(idx, "date", `${datePart} ${time}`);
                }}
              />
            </div>
          </div>

          {/* Remarks + Signature */}
          <div className="flex justify-between gap-6 w-full mt-4">
            <div className="flex-1">
              <label className="font-semibold">Remarks:</label>
              <textarea
                value={form.remarks}
                onChange={(e) => handleChange(idx, "remarks", e.target.value)}
                className="border w-full p-2 rounded mt-1 resize-none h-24"
              />
            </div>
            <div className="flex-1">
              <DigitalSignatureSection title="Signature" />
            </div>
          </div>

          {/* BRADEN SCALE  */}
          <h2 className="text-sm font-bold mt-6">A. BRADEN SCALE</h2>
          <div className="flex-1">
            <textarea
              value={form.braden}
              onChange={(e) => handleChange(idx, "braden", e.target.value)}
              className="border w-full p-2 rounded mt-1 resize-none h-24"
            />
          </div>

          {/* VIP Score */}
          <h2 className="text-sm font-bold mt-6">B. V.I.P SCORE</h2>
          <table className="w-full border mt-2 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Score</th>
                <th className="border p-2">Description</th>
                <th className="border p-2 w-16">M</th>
                <th className="border p-2 w-16">E</th>
                <th className="border p-2 w-16">N</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  score: 0,
                  desc: "No signs of phlebitis [ I.V site appears healthy ]",
                },
                {
                  score: 1,
                  desc: "Possible first signs [ One of the following evident: * Slight pain near I.V site or Slight redness ]",
                },
                {
                  score: 2,
                  desc: "Early stage [ Two of the following evident: *  pain near I.V site *Erythem *Swelling]",
                },
                {
                  score: 3,
                  desc: "Medium stage [ All of the following evident: *  pain along path of cannula *Erythem *Induration]",
                },
                {
                  score: 4,
                  desc: "Advance stage [ All of the following evident & extensive: *pain along path of cannula *Erythem *Induration *Palpable venous cord]",
                },
                {
                  score: 5,
                  desc: "Severe stage [ All of the following evident & extensive: *pain along path of cannula *Erythem *Induration *Palpable venous cord *Pyrexia]",
                },
              ].map((row) => (
                <tr key={row.score}>
                  <td className="border p-2 text-center">{row.score}</td>
                  <td className="border p-2">{formatDescription(row.desc)}</td>
                  {["M", "E", "N"].map((key) => (
                    <td className="border p-2 text-center" key={key}>
                      <input
                        type="radio"
                        name={`vip-${idx}-${key}`}
                        value={row.score}
                        checked={form.vip[key] === row.score}
                        onChange={(e) =>
                          handleScoreChange(
                            idx,
                            "vip",
                            key,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* GLASGOW COMA SCALE */}
          <h2 className="text-sm font-bold mt-6">C. GLASGOW COMA SCALE</h2>
          <table className="w-full border mt-2 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 w-16">Score</th>
                <th className="border p-2">Eye (E)</th>
                <th className="border p-2">Verbal (V)</th>
                <th className="border p-2">Motor (M)</th>
                <th className="border p-2 w-16">M</th>
                <th className="border p-2 w-16">E</th>
                <th className="border p-2 w-16">N</th>
              </tr>
            </thead>
            <tbody>
              {[
                { score: 6, eye: "", verbal: "", motor: "Obeys commands" },
                {
                  score: 5,
                  eye: "",
                  verbal: "Oriented to Time , place & person",
                  motor: "Localizes pain",
                },
                {
                  score: 4,
                  eye: "Spontaneously",
                  verbal: "Confused",
                  motor: "Withdraws from pain",
                },
                {
                  score: 3,
                  eye: "To voice",
                  verbal: "Inappropriate words",
                  motor: "Abnormal flexion (decorticate)",
                },
                {
                  score: 2,
                  eye: "To pain",
                  verbal: "Incomprehensible sounds",
                  motor: "Abnormal extension (decerebrate)",
                },
                {
                  score: 1,
                  eye: "No response",
                  verbal: "No response",
                  motor: "No  response",
                },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="border p-2 text-center">{row.score}</td>
                  <td className="border p-2">{row.eye}</td>
                  <td className="border p-2">{row.verbal}</td>
                  <td className="border p-2">{row.motor}</td>
                  {["M", "E", "N"].map((key) => (
                    <td className="border p-2 text-center" key={key}>
                      <input
                        type="radio"
                        name={`vip-${idx}-${key}`}
                        value={row.score}
                        checked={form.vip[key] === row.score}
                        onChange={(e) =>
                          handleScoreChange(
                            idx,
                            "vip",
                            key,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

const formatDescription = (desc) => {
  const parts = desc.split(/(\[.*?\])/g); // [] ke andar ka part alag karega
  return parts.map((part, i) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span key={i} className="font-light text-gray-600">
          {part}
        </span>
      );
    }
    return (
      <span key={i} className="font-semibold">
        {part}
      </span>
    );
  });
};
