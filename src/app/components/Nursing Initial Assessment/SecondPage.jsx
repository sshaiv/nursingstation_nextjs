"use client";
import { useState } from "react";
import { useKeyboardScrollFix } from "@/app/common/useKeyboardScrollFix";

export default function SecondPage(visitid, gssuhid, empid, patientData) {
  const [scores, setScores] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
  });

  const handleChange = (question, value) => {
    setScores((prev) => ({
      ...prev,
      [question]: Number(value),
    }));
  };

  const totalScore = Object.values(scores).reduce(
    (sum, val) => sum + Number(val),
    0
  );

  // Braden Risk Assessment state & handler
  const [bradenScores, setBradenScores] = useState({
    sensory: 0,
    moisture: 0,
    activity: 0,
    mobility: 0,
    nutrition: 0,
    friction: 0,
  });

  const handleBradenChange = (field, value) => {
    setBradenScores((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const bradenTotal = Object.values(bradenScores).reduce(
    (sum, val) => sum + val,
    0
  );

  const getBradenRiskLevel = () => {
    if (bradenTotal >= 16) return "('Low risk')";
    if (bradenTotal >= 10) return "('Medium risk')";
    return "('High risk')";
  };

  useKeyboardScrollFix();
  return (
    <div className="p-0">
      <div className="flex flex-col md:flex-row gap-4">
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

        {/* Braden Risk Assessment */}
        <div className="flex-1 max-w-full text-black p-2 shadow-lg rounded-lg  shadow-gray-400 overflow-x-auto">
          <h1 className="text-sm font-bold mb-2">
            BRADEN RISK ASSESSMENT SCALE (abridged version)
          </h1>

          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 text-left">
                  Category
                </th>
                <th className="border border-gray-200 p-2 text-center">1</th>
                <th className="border border-gray-200 p-2 text-center">2</th>
                <th className="border border-gray-200 p-2 text-center">3</th>
                <th className="border border-gray-200 p-2 text-center">4</th>
                <th className="border border-gray-200 p-2 text-center">
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Sensory Perception */}
              <tr>
                <td className="border border-gray-200 p-2">
                  Sensory Perception
                </td>
                {[
                  "Completely limited",
                  "Very limited",
                  "Slightly limited",
                  "No impairment",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    <label className="flex flex-col items-center justify-center gap-1">

                      <input
                        type="radio"
                        name="sensory"
                        value={i + 1}
                        checked={bradenScores.sensory === i + 1}
                        onChange={(e) =>
                          handleBradenChange("sensory", e.target.value)
                        }
                      />
                      {label}
                    </label>
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.sensory}
                </td>
              </tr>

              {/* Moisture */}
              <tr>
                <td className="border border-gray-200 p-2">Moisture</td>
                {[
                  "Constantly moist",
                  "Very moist",
                  "Occasionally moist",
                  "Rarely moist",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    <label className="flex flex-col items-center justify-center gap-1">

                      <input
                        type="radio"
                        name="moisture"
                        value={i + 1}
                        checked={bradenScores.moisture === i + 1}
                        onChange={(e) =>
                          handleBradenChange("moisture", e.target.value)
                        }
                      />
                      {label}
                    </label>
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.moisture}
                </td>
              </tr>

              {/* Activity */}
              <tr>
                <td className="border border-gray-200 p-2">Activity</td>
                {[
                  "Bedfast",
                  "Chairfast",
                  "Walks occasionally",
                  "Walks frequently",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    <label className="flex flex-col items-center justify-center gap-1">

                      <input
                        type="radio"
                        name="activity"
                        value={i + 1}
                        checked={bradenScores.activity === i + 1}
                        onChange={(e) =>
                          handleBradenChange("activity", e.target.value)
                        }
                      />
                      {label}
                    </label>
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.activity}
                </td>
              </tr>

              {/* Mobility */}
              <tr>
                <td className="border border-gray-200 p-2">Mobility</td>
                {[
                  "Completely immobile",
                  "Very limited",
                  "Slightly limited",
                  "No limitation",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    <label className="flex flex-col items-center justify-center gap-1">

                      <input
                        type="radio"
                        name="mobility"
                        value={i + 1}
                        checked={bradenScores.mobility === i + 1}
                        onChange={(e) =>
                          handleBradenChange("mobility", e.target.value)
                        }
                      />
                      {label}
                    </label>
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.mobility}
                </td>
              </tr>

              {/* Nutrition */}
              <tr>
                <td className="border border-gray-200 p-2">Nutrition</td>
                {[
                  "Very poor",
                  "Probably inadequate",
                  "Adequate",
                  "Excellent",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    <label className="flex flex-col items-center justify-center gap-1">

                      <input
                        type="radio"
                        name="nutrition"
                        value={i + 1}
                        checked={bradenScores.nutrition === i + 1}
                        onChange={(e) =>
                          handleBradenChange("nutrition", e.target.value)
                        }
                      />
                      {label}
                    </label>
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.nutrition}
                </td>
              </tr>

              {/* Friction & Shear */}
              <tr>
                <td className="border border-gray-200 p-2">Friction & Shear</td>
                {[
                  "Problem",
                  "Potential problem",
                  "No apparent problem",
                  "",
                ].map((label, i) => (
                  <td
                    key={i}
                    className="border border-gray-200 p-2 text-center"
                  >
                    {label && (
                      <label className="flex flex-col items-center justify-center gap-1">

                        <input
                          type="radio"
                          name="friction"
                          value={i + 1}
                          checked={bradenScores.friction === i + 1}
                          onChange={(e) =>
                            handleBradenChange("friction", e.target.value)
                          }
                        />
                        {label}
                      </label>
                    )}
                  </td>
                ))}
                <td className="border border-gray-200 p-2 text-center">
                  {bradenScores.friction}
                </td>
              </tr>

              {/* Total */}
              <tr className="bg-gray-100 font-semibold">
                <td>.</td>
                <td
                  colSpan={4}
                  className="border text-[12px] text-red-400 border-gray-200 p-2 text-center"
                >
            <span className="text-black font-semibold "> TOTAL SCORE - </span>     {getBradenRiskLevel()}
                </td>
                <td className="border border-gray-200 p-2 text-center ">
                 {bradenTotal} 
                </td>
              </tr>
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex mt-4 gap-2 text-[12px]">
            <p className="font-semibold">Interpretation - </p>
            <p>16 & above = Low risk ,</p>
            <p>10 - 16 = Medium risk ,</p>
            <p>6 - 10 = High risk</p>
          </div>

          {/* Action Plan */}
          <div className="mt-4 flex  gap-2">
            <p className="font-semibold">Action Plan:</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Physical Restraints
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Chemical Restraints
            </label>
          </div>

          {/* Patient Mobility */}
          <div className="mt-2 flex gap-2">
            <p className="font-semibold">Patient Has:</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Sufficient Mobility
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Bed ridden
            </label>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-4" />

      <h3 className="text-black">Incomplete</h3>
    </div>
  );
}
