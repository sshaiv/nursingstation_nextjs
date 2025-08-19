"use client";
import { useState } from "react";

export default function DailyAssessment() {
  const [form, setForm] = useState({
    feeding: "",
    diet: "",
    remarks: "",
    date: "",
  });

  return (
    <div className="p-0 max-w-5xl mx-auto">
  

      {/* Top Info */}
      <div className="grid grid-cols-2 gap-4 border p-4  shadow">
        <div>
          <label className="font-semibold">Route of Feeding:</label>
          <input
            value={form.feeding}
            onChange={(e) => setForm({ ...form, feeding: e.target.value })}
            className="border w-full p-2 rounded mt-1"
            placeholder="Oral / Enteral (RT)"
          />
        </div>
        <div>
          <label className="font-semibold">Diet:</label>
          <input
            value={form.diet}
            onChange={(e) => setForm({ ...form, diet: e.target.value })}
            className="border w-full p-2 rounded mt-1"
            placeholder="Enter diet"
          />
        </div>
        <div className="col-span-2">
          <label className="font-semibold">Remarks:</label>
          <textarea
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            className="border w-full p-2 rounded mt-1 resize-none"
            rows={2}
          />
        </div>
        <div>
          <label className="font-semibold">Date & Time:</label>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border w-full p-2 rounded mt-1"
          />
        </div>
      </div>

      {/* Braden Scale */}
      <h2 className="text-lg font-bold mt-6">A. BRADEN SCALE</h2>
      <table className="w-full border mt-2 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Criteria</th>
            <th className="border p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Skin appears healthy</td>
            <td className="border p-2 text-center">0</td>
          </tr>
          <tr>
            <td className="border p-2">Slight redness / pain</td>
            <td className="border p-2 text-center">1</td>
          </tr>
          <tr>
            <td className="border p-2">Erythema + swelling</td>
            <td className="border p-2 text-center">2</td>
          </tr>
        </tbody>
      </table>

      {/* VIP Score */}
      <h2 className="text-lg font-bold mt-6">B. V.I.P SCORE</h2>
      <table className="w-full border mt-2 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Score</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 text-center">0</td>
            <td className="border p-2">No signs of phlebitis</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">1</td>
            <td className="border p-2">Possible first signs</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">2</td>
            <td className="border p-2">Early stage</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">3</td>
            <td className="border p-2">Medium stage</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">4</td>
            <td className="border p-2">Advance stage</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">5</td>
            <td className="border p-2">Severe stage</td>
          </tr>
        </tbody>
      </table>

      {/* Glasgow Coma Scale */}
      <h2 className="text-lg font-bold mt-6">C. GLASGOW COMA SCALE</h2>
      <table className="w-full border mt-2 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Score</th>
            <th className="border p-2">Eye</th>
            <th className="border p-2">Verbal</th>
            <th className="border p-2">Motor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 text-center">6</td>
            <td className="border p-2">-</td>
            <td className="border p-2">Oriented</td>
            <td className="border p-2">Obeys commands</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">5</td>
            <td className="border p-2">Spontaneously</td>
            <td className="border p-2">Confused</td>
            <td className="border p-2">Localizes pain</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">4</td>
            <td className="border p-2">To voice</td>
            <td className="border p-2">Inappropriate words</td>
            <td className="border p-2">Withdraws from pain</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">3</td>
            <td className="border p-2">To pain</td>
            <td className="border p-2">Incomprehensible sounds</td>
            <td className="border p-2">Abnormal flexion</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">2</td>
            <td className="border p-2">No response</td>
            <td className="border p-2">No response</td>
            <td className="border p-2">Abnormal extension</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">1</td>
            <td className="border p-2">-</td>
            <td className="border p-2">-</td>
            <td className="border p-2">No response</td>
          </tr>
        </tbody>
      </table>

      
    </div>
  );
}
