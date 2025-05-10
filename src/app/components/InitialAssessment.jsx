import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
// import ModalHeading from '../common/ModalHeading';
import {ActionButton ,SaveButton}from '../common/Buttons';
import { H3, Label,ModalHeading } from '../common/text';


const allergyOptions = ["Peanuts", "Pollen", "Dust", "Milk", "Shellfish", "Eggs"];
const pastHistoryOptions = ["Hypertension", "Diabetes", "Asthma", "Thyroid", "Heart Disease"];


export default function InitialAssessmentForm() {

    const [pastHistoryQuery, setPastHistoryQuery] = useState("");
const [showPastDropdown, setShowPastDropdown] = useState(false);

const filteredPastOptions = pastHistoryOptions.filter((option) =>
  option.toLowerCase().includes(pastHistoryQuery.toLowerCase())
);


  const sigCanvasRef = useRef(null);

  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = allergyOptions.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 bg-purple-50 min-h-screen">
      <ModalHeading title={"Initial Assessment"} />

      {/* Allergy Section */}
      <div className="mt-2 p-2 flex flex-wrap items-center gap-6">
        <H3>
          <span role="img" aria-label="document">📋</span> Allergy
        </H3>

        <div className="flex items-center gap-4">
          <Label>
            <input type="radio" name="allergy" /> Yes
          </Label>
          <Label>
            <input type="radio" name="allergy" /> No
          </Label>
        </div>

        <div className="relative w-[200px]">
          {/* Search Icon (Left) */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          {/* Cross Icon (Right) */}
          {showDropdown && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowDropdown(false);
                setQuery(""); // Optional: Clear the input as well
              }}
            >
              &#10005;
            </button>
          )}

          {/* Input */}
          <input
            type="text"
            placeholder="Search for allergy..."
            className="border border-gray-600 rounded-lg px-10 py-2 w-full"
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          {/* Dropdown */}
          {showDropdown && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md max-h-30 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* History of Present Illness */}
      <div className="mt-4 p-2">
        <H3>
          <span role="img" aria-label="history">✅</span> History of Present Illness
        </H3>

        <div className="flex gap-6 mt-2 items-start">
          {/* Text fields in the same row */}
          <div className="flex flex-col gap-4 w-1/3">
            <input
              type="text"
              placeholder="History given by"
              className="border border-gray-400 rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Relation"
              className="border border-gray-400 rounded px-3 py-2 w-full"
            />

            {/* Buttons in a separate row */}
            <div className="flex gap-4 mt-4">
              <button onClick={clearSignature} className="bg-purple-100 text-purple-800 px-4 py-1 rounded">Clear</button>
              <button className="bg-purple-100 text-purple-800 px-4 py-1 rounded">Show</button>
            </div>
          </div>

          {/* Signature Canvas */}
          <div className="border border-gray-800 w-1/3" style={{ height: '150px' }}>
            <SignatureCanvas ref={sigCanvasRef} penColor="black" canvasProps={{ className: 'w-full h-full' }} />
          </div>
        </div>
      </div>

      {/* Presenting Complaint */}
      <div className="mt-4 p-2">
        <H3>
          <span role="img" aria-label="complaint">📋</span> Presenting Complaint
        </H3>
        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Enter complaint..."
            className="border border-gray-400 rounded-lg mr-2 px-3 py-2 w-full"
          />
          <ActionButton label="Insert" />
        </div>
      </div>

      {/* Family History */}
      <div className="mt-3 p-2">
        <div className="flex items-center gap-6 mt-2">
          <H3>
            <span role="img" aria-label="family">📋</span> Family History
          </H3>

          <div className="flex gap-6 mt-2 flex-wrap items-center">
            <Label>
              <input type="checkbox" />
              DM
            </Label>
            <Label>
              <input type="checkbox" />
              Hypertension
            </Label>
            <Label>
              <input type="checkbox" />
              CAD
            </Label>

            {/* Input for "Other" */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Other"
                className="border border-gray-400 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

   
{/* Past History - With Searchable Dropdown */}
<div className="flex items-center gap-4 mt-4 flex-wrap">
  <H3 className="min-w-max flex items-center gap-2">
    <span role="img" aria-label="past">📝</span> Past History
  </H3>

  {/* Searchable Dropdown */}
  <div className="relative w-[200px]">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>
    </div>

    {/* Clear Button */}
    {showPastDropdown && (
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setShowPastDropdown(false);
          setPastHistoryQuery("");
        }}
      >
        &#10005;
      </button>
    )}

    <input
      type="text"
      placeholder="Select condition..."
      className="border border-gray-600 rounded-lg px-10 py-2 w-full"
      onFocus={() => setShowPastDropdown(true)}
      onChange={(e) => setPastHistoryQuery(e.target.value)}
      value={pastHistoryQuery}
    />

    {showPastDropdown && (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md max-h-30 overflow-auto">
        {filteredPastOptions.length > 0 ? (
          filteredPastOptions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setPastHistoryQuery(item);
                setShowPastDropdown(false);
              }}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
            >
              {item}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">No results</li>
        )}
      </ul>
    )}
  </div>

  {/* Details input */}
  <input
    type="text"
    placeholder="Details"
    className="border rounded-md px-3 py-2 w-[200px]"
  />

  <ActionButton label="Insert" />
</div>

   

     {/* Personal History - Single Row */}
<div className="flex items-center gap-4 mt-6 flex-wrap">
  <H3 className="min-w-max flex items-center gap-2">
    <span role="img" aria-label="personal">📋</span> Personal History
  </H3>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Alcohol
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Tobacco
  </label>

  <label className="flex items-center gap-2 border px-3 py-2 rounded-md">
    <span className="text-gray-600">ℹ️</span>
    <input
      type="text"
      placeholder="Other"
      className="outline-none border-none bg-transparent w-[150px]"
    />
  </label>
</div>

 <hr className="border-t mt-6 mb-2  border-gray-300" />

<div className="flex justify-center mt-6">
      <SaveButton label="Save" onClick={() => alert("Button clicked!")} />
    </div>

    </div>
  );
}
