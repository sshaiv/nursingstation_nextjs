import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useFetchPatientHistory from "@/app/hooks/fetchHistoryData";
import API_ENDPOINTS from "@/app/constants/api_url";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function MorningShift({ visitid, gssuhid, empid }) {



  useKeyboardScrollFix();

  return (
    <div className="   flex justify-center text-[10px] leading-tight">
      <div className="w-full max-w-5xl mx-auto space-y-4 overflow-auto scrollbar-hide min-h-[200px] max-h-[70vh] px-2">


    {/* Morse Fall Scale */}
        <div className="flex-1 max-w-full text-black p-2 shadow-lg rounded-lg  shadow-gray-400 overflow-x-auto">
          <h1 className="text-sm   font-bold mb-2">MORSE FALL SCALE</h1>
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-black ">
                <th className="border border-gray-200 p-2 text-left">Item</th>
                <th className="border border-gray-200 p-2 text-left">Scale</th>
                <th className="border border-gray-200 p-2 text-center">
                  Scoring
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Q1 */}
              <tr>
                <td className="border border-gray-200 p-2">
                  1. History of falling; immediate or within 3 months
                </td>
                <td className=" flex  gap-2 border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q1"
                      value={0}
                      checked={scores.q1 === 0}
                      onChange={() => handleChange("q1", 0)}
                    />
                    No (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q1"
                      value={25}
                      checked={scores.q1 === 25}
                      onChange={() => handleChange("q1", 25)}
                    />
                    Yes (25)
                  </label>
                </td>
                <td className="border border-gray-200 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q1}
                    onChange={(e) => handleChange("q1", e.target.value)}
                  />
                </td>
              </tr>

              {/* Q2 */}
              <tr>
                <td className="border border-gray-200 p-2">
                  2. Secondary diagnosis
                </td>
                <td className="flex  gap-2 border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q2"
                      value={0}
                      checked={scores.q2 === 0}
                      onChange={() => handleChange("q2", 0)}
                    />
                    No (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q2"
                      value={15}
                      checked={scores.q2 === 15}
                      onChange={() => handleChange("q2", 15)}
                    />
                    Yes (15)
                  </label>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q2}
                    onChange={(e) => handleChange("q2", e.target.value)}
                  />
                </td>
              </tr>

              {/* Q3 */}
              <tr>
                <td className="border border-gray-200 p-2">
                  3. Ambulatory aid
                </td>
                <td className="border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q3"
                      value={0}
                      checked={scores.q3 === 0}
                      onChange={() => handleChange("q3", 0)}
                    />
                    Bed rest / nurse assist (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q3"
                      value={15}
                      checked={scores.q3 === 15}
                      onChange={() => handleChange("q3", 15)}
                    />
                    Crutches / cane / walker (15)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q3"
                      value={20}
                      checked={scores.q3 === 20}
                      onChange={() => handleChange("q3", 20)}
                    />
                    Furniture (20)
                  </label>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q3}
                    onChange={(e) => handleChange("q3", e.target.value)}
                  />
                </td>
              </tr>

              {/* Q4 */}
              <tr>
                <td className="border border-gray-200 p-2">
                  4. IV / Heparin Lock
                </td>
                <td className="flex  gap-2 border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q4"
                      value={0}
                      checked={scores.q4 === 0}
                      onChange={() => handleChange("q4", 0)}
                    />
                    No (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q4"
                      value={20}
                      checked={scores.q4 === 20}
                      onChange={() => handleChange("q4", 20)}
                    />
                    Yes (20)
                  </label>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q4}
                    onChange={(e) => handleChange("q4", e.target.value)}
                  />
                </td>
              </tr>

              {/* Q5 */}
              <tr>
                <td className="border border-gray-200 p-2">
                  5. Gait / Transferring
                </td>
                <td className="border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q5"
                      value={0}
                      checked={scores.q5 === 0}
                      onChange={() => handleChange("q5", 0)}
                    />
                    Normal / bedrest / immobile (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q5"
                      value={10}
                      checked={scores.q5 === 10}
                      onChange={() => handleChange("q5", 10)}
                    />
                    Weak (10)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q5"
                      value={20}
                      checked={scores.q5 === 20}
                      onChange={() => handleChange("q5", 20)}
                    />
                    Impaired (20)
                  </label>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q5}
                    onChange={(e) => handleChange("q5", e.target.value)}
                  />
                </td>
              </tr>

              {/* Q6 */}
              <tr>
                <td className="border border-gray-200 p-2">6. Mental status</td>
                <td className="border border-gray-200 p-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q6"
                      value={0}
                      checked={scores.q6 === 0}
                      onChange={() => handleChange("q6", 0)}
                    />
                    Oriented to own ability (0)
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="q6"
                      value={15}
                      checked={scores.q6 === 15}
                      onChange={() => handleChange("q6", 15)}
                    />
                    Forgets limitations (15)
                  </label>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <input
                    type="number"
                    className="w-16 border p-1 text-center"
                    value={scores.q6}
                    onChange={(e) => handleChange("q6", e.target.value)}
                  />
                </td>
              </tr>

              {/* Total */}
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-200 p-2">TOTAL SCORE :</td>
                <td className="border border-gray-200 p-2"></td>
                <td className="border border-gray-200 p-2 text-center">
                  {totalScore}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 text-sm">
            <p>0 - 24 : No Risk — Basic Nursing Care</p>
            <p>25 - 50 : Low Risk — Implement Standard Fall Prevention</p>
            <p>
              &gt; 50 : High Risk — Implement High Risk Fall Prevention
              Intervention
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
