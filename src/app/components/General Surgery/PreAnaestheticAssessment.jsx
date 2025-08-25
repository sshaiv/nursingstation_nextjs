import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function PreAnaestheticAssessment() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [initial, setInitial] = useState("");
  const [rows, setRows] = useState([]);

  const handleInsert = () => {
    if (time && note && initial) {
      setRows([...rows, { time, note, initial }]);
      setTime("");
      setNote("");
      setInitial("");
    }
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 shadow-md">
      <h1 className="text-lg font-bold text-center text-gray-600">
        PRE ANAESTHETIC ASSESSMENT RECORD
      </h1>
      <p className="text-sm text-center mb-6">
        (To be filled by Anaesthesiologist)
      </p>

      {/* Header Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border p-4 mb-4">
        <div>
          Name:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-28"
          />
        </div>
        <div>
          Reg. No.:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-20"
          />
        </div>
        <div>
          Date of Surgery:{" "}
          <input
            type="date"
            className="border-b border-gray-400 focus:outline-none ml-1"
          />
        </div>
        <div>
          Surgery:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-28"
          />
        </div>
        <div>
          Allergies:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-28"
          />
        </div>
        <div>
          IPD No.:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-20"
          />
        </div>
        <div>
          Age:{" "}
          <input
            type="number"
            className="border-b border-gray-400 focus:outline-none ml-1 w-12"
          />{" "}
          Wt:{" "}
          <input
            type="number"
            className="border-b border-gray-400 focus:outline-none ml-1 w-12"
          />{" "}
          Ht:{" "}
          <input
            type="number"
            className="border-b border-gray-400 focus:outline-none ml-1 w-12"
          />
        </div>
        <div>
          Prev. Anaesth:{" "}
          <label className="ml-1">
            <input type="checkbox" className="mr-1" /> No
          </label>
          <label className="ml-2">
            <input type="checkbox" className="mr-1" /> Yes
          </label>{" "}
          (Type:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-20"
          />
          )
        </div>
      </div>

      {/* Diagnosis + Airway Assessment */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1 text-sm mb-4">
        <div className="border p-3">
          <h2 className="font-semibold mb-2">Diagnosis</h2>
          <textarea className="w-full border h-40 resize-none "></textarea>

          <h2 className="font-semibold mt-3 mb-2">Presenting Complaints</h2>
          <textarea className="w-full border h-40 resize-none"></textarea>

          <h2 className="font-semibold mt-3 mb-2">Past History</h2>
          <textarea className="w-full border h-40 resize-none"></textarea>

          <h2 className="font-semibold mt-3 mb-2">Addiction / Habituation</h2>
          <div className="space-y-2 flex flex-col text-sm">
            {/* Smoking / Tobacco */}
            <label className="flex items-center space-x-2">
              <span>Smoking/Tobacco:</span>
              <label className="flex items-center space-x-1">
                <input type="checkbox" className="mr-1" /> No
              </label>
              <label className="flex items-center space-x-1">
                <input type="checkbox" className="mr-1" /> Yes
              </label>
              <span>Packs/Day:</span>
              <input
                type="number"
                className="border-b border-gray-400 focus:outline-none ml-1 w-16"
              />
            </label>

            {/* Alcohol */}
            <label className="flex items-center space-x-3">
              <span>Alcohol:</span>
              <label className="flex items-center space-x-1">
                <input type="checkbox" /> Heavy
              </label>
              <label className="flex items-center space-x-1">
                <input type="checkbox" /> Social
              </label>
              <label className="flex items-center space-x-1">
                <input type="checkbox" /> None
              </label>
            </label>

            {/* Drugs */}
            <label className="flex items-center space-x-2">
              <span>Drugs:</span>
              <label className="flex items-center space-x-1">
                <input type="checkbox" /> No
              </label>
              <label className="flex items-center space-x-1">
                <input type="checkbox" /> Yes
              </label>
            </label>
          </div>

          <h2 className="font-semibold mt-3 mb-2">
            Pre Anaesthesia Medication
          </h2>
          <textarea className="w-full border h-40 resize-none"></textarea>
        </div>

        <div className="border p-3">
          <h2 className="font-semibold mb-2">Airway Assessment</h2>
          <ul className="space-y-1">
            <div>
              Neck Mobility:{" "}
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none ml-1 w-28"
              />
            </div>
            <div>
              Mouth Opening:{" "}
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none ml-1 w-28"
              />
            </div>

            <li className="flex items-center space-x-4 text-sm">
              <span>Teeth Condition:</span>

              <label className="flex items-center space-x-1">
                <input type="checkbox" className="mr-1" /> Loose
              </label>

              <label className="flex items-center space-x-1">
                <input type="checkbox" className="mr-1" /> Dentures
              </label>

              <label className="flex items-center space-x-1">
                <input type="checkbox" className="mr-1" /> Bridge/Caps/Buck
              </label>
            </li>
            <div>
              Mandible (Jaw):
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none ml-1 w-28"
              />
            </div>

            <li className="flex items-center space-x-4 text-sm">
              <span>Mallampati:</span>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="mallampati"
                  value="I"
                  className="mr-1"
                />{" "}
                I
              </label>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="mallampati"
                  value="II"
                  className="mr-1"
                />{" "}
                II
              </label>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="mallampati"
                  value="III"
                  className="mr-1"
                />{" "}
                III
              </label>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="mallampati"
                  value="IV"
                  className="mr-1"
                />{" "}
                IV
              </label>
            </li>
          </ul>

          <h2 className="font-semibold mt-3 mb-2">Physical Examination</h2>

          <div className="space-y-2 text-sm">
            {/* CNS */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <span className="w-16">CNS:</span>
                <input type="text" className="border rounded w-20 p-1" />
              </label>
              <label className="flex items-center space-x-2">
                <span>G.C:</span>
                <input type="text" className="border rounded p-1 w-20" />
              </label>
              <label className="flex items-center space-x-2">
                <span>P:</span>
                <input type="text" className="border rounded p-1 w-20" />
              </label>
            </div>

            {/* Heart */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <span className="w-16">Heart:</span>
                <input type="text" className="border rounded p-1 flex-1" />
              </label>
              <label className="flex items-center space-x-2">
                <span>B.P:</span>
                <input type="text" className="border rounded p-1 w-20" />
              </label>
            </div>

            {/* Lungs */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <span className="w-16">Lungs:</span>
                <input type="text" className="border rounded p-1 flex-1" />
              </label>
              <label className="flex items-center space-x-2">
                <span>Temp:</span>
                <input type="text" className="border rounded p-1 w-20" />
              </label>
            </div>

            {/* P.A. */}
            <div>
              <span className="w-16 inline-block">P.A.:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Pale</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Cyanosis</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Clubbing</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Edema</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="form-checkbox" />
                  <span>LN</span>
                </label>
              </div>
            </div>

            {/* Others */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <span className="w-16">Others:</span>
                <input type="text" className="border rounded p-1 flex-1" />
              </label>
            </div>
          </div>

          <h2 className="font-semibold mt-3 mb-2">
            Pertinent Lab Investigations
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            <label className="flex items-center space-x-2">
              <span>Hb:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>DLC:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>Platelet:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>ECG:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>ECHO:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>CXR:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>HIV:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>HBsAg:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>HCV:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>T3:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>T4:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>TSH:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>RBS:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>

            <label className="flex items-center space-x-2">
              <span>S. Creatinine:</span>
              <input type="text" className="border rounded p-1 w-16" />
            </label>
          </div>

          <h2 className="font-semibold mt-3 mb-2">Medications</h2>
          <textarea className="w-full border h-16 resize-none"></textarea>

          <h2 className="font-semibold mt-3 mb-2">ASA</h2>
          <input className="w-full border h-10" />

          <h2 className="font-semibold mt-3 mb-2">NPO</h2>
          <input className="w-full border h-10" />

          <h2 className="font-semibold mt-3 mb-2">Anaesthesia Plan</h2>
          <textarea className="w-full border h-16 resize-none"></textarea>
        </div>
      </div>

      {/* Signature Section */}
      <div className="grid grid-row-2 gap-4 text-sm ">
        <div>
          {" "}
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
          />{" "}
        </div>

        <DigitalSignatureSection title="Signature" />
        <div>
          Name:{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none ml-1 w-28"
          />
        </div>
      </div>

      {/*...................................Next Page....................... */}
      <h1 className="text-lg font-bold text-center text-gray-600">
        RECOVERY ROOM RECORD
      </h1>

      {/* Immediate Post-op State */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">Immediate Post-op State</h2>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Good / Fine
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Poor / Serious
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Semi - Unconscious
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
          <label className="flex items-center space-x-2">
            <span>Resp:</span>
            <input type="text" className="border rounded p-1 w-20" />
            /min
          </label>
          <label className="flex items-center space-x-2">
            <span>Pulse:</span>
            <input type="text" className="border rounded p-1 w-20" />
            /min
          </label>
          <label className="flex items-center space-x-2">
            <span>BP:</span>
            <input type="text" className="border rounded p-1 w-20" /> mmHg
          </label>
          <label className="flex items-center space-x-2">
            <span>Vomiting:</span>
            <input type="text" className="border rounded p-1 w-20 flex-1" />
          </label>
          <label className="flex items-center space-x-2">
            <span>SPO₂:</span>
            <input type="text" className="border rounded p-1 w-20" /> %
          </label>
        </div>
      </div>

      {/* Transfer Recommendation */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">
          Transfer Recommendation (Aldrete Score)
        </h2>

        <p className="font-semibold mt-2">Respiration</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label className="flex items-center">
            <input type="radio" name="resp" className="mr-2" />2 = Able to take
            deep breath and cough
          </label>
          <label className="flex items-center">
            <input type="radio" name="resp" className="mr-2" />1 = Dyspnea /
            shallow breathing
          </label>
          <label className="flex items-center">
            <input type="radio" name="resp" className="mr-2" />0 = Apnea
          </label>
        </div>

        <p className="font-semibold mt-2">Oxygen Saturation</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <label className="flex items-center">
            <input type="radio" name="o2" className="mr-2" />2 = Maintains &gt;
            90% on room air
          </label>
          <label className="flex items-center">
            <input type="radio" name="o2" className="mr-2" />1 = Needs O₂
            inhalation to maintain O₂ Sat &gt; 90%
          </label>
          <label className="flex items-center">
            <input type="radio" name="o2" className="mr-2" />0 = Saturation &lt;
            90% even with O₂
          </label>
        </div>

        <p className="font-semibold mt-2">Consciousness</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <label className="flex items-center">
            <input type="radio" name="conscious" className="mr-2" />2 = Fully
            awake
          </label>
          <label className="flex items-center">
            <input type="radio" name="conscious" className="mr-2" />1 =
            Arousable on calling
          </label>
          <label className="flex items-center">
            <input type="radio" name="conscious" className="mr-2" />0 = Not
            responding
          </label>
        </div>

        <p className="font-semibold mt-2">Circulation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <label className="flex items-center">
            <input type="radio" name="bp" className="mr-2" />2 = BP ± 20 mmHg
            pre-op
          </label>
          <label className="flex items-center">
            <input type="radio" name="bp" className="mr-2" />1 = BP ± 20–50 mmHg
            pre-op
          </label>
          <label className="flex items-center">
            <input type="radio" name="bp" className="mr-2" />0 = BP ± 50 mmHg
            pre-op
          </label>
        </div>

        <p className="font-semibold mt-2">Activity</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <label className="flex items-center">
            <input type="radio" name="activity" className="mr-2" />2 = Able to
            move 4 extremities
          </label>
          <label className="flex items-center">
            <input type="radio" name="activity" className="mr-2" />1 = Able to
            move 2 extremities
          </label>
          <label className="flex items-center">
            <input type="radio" name="activity" className="mr-2" />0 = Unable to
            move extremities
          </label>
        </div>

        <p className="mt-3">
          The total score is 10. Patients scoring 8–10 are considered fit for
          ward transfer.
        </p>
        <label className="flex items-center space-x-2 mt-2">
          <span>Aldrete Score:</span>
          <input type="text" className="border rounded p-1 w-16" />
        </label>
      </div>

      {/* Type of Anaesthesia */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">Type of Anaesthesia Given</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            IPPR - GA
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Spinal
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Epidural
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Others
          </label>
        </div>
      </div>

      {/* On Arrival */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">On Arrival</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Comfortable
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Restless
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            In pain
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Shivering
          </label>
        </div>

        <h2 className="font-semibold mb-2">Airway</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Clear
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Noisy Breathing
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Apnoea
          </label>
        </div>

        <h2 className="font-semibold mt-2">Artificial Airway</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Oral/Nasal Removed at
            <input
              type="text"
              className="border rounded p-1 w-20 ml-2"
              placeholder="Time"
            />
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Laryngeal Mask Removed at
            <input
              type="text"
              className="border rounded p-1 w-20 ml-2"
              placeholder="Time"
            />
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tracheostomy In-Situ
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Endotracheal Tube in Place
          </label>

          <label className="flex items-center flex-wrap gap-2">
            <input type="checkbox" className="mr-2" />
            <span>Extubated by Dr</span>
            <input
              type="text"
              className="border rounded p-1 w-32"
              placeholder="Doctor"
            />
            <span>at</span>
            <input
              type="text"
              className="border rounded p-1 w-20"
              placeholder="Time"
            />
          </label>
        </div>

        <h2 className="font-semibold mt-2">Position</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Propped Up
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Left Lateral
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Right Lateral
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" className="mr-2" />
            <span>Others</span>
            <input
              type="text"
              className="border rounded p-1 w-32"
              placeholder="Specify"
            />
          </label>
        </div>

        <h2 className="font-semibold mt-2">Lines in-situ</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Epidural
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Arterial
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            CVP
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Removed
          </label>
        </div>

        <h2 className="font-semibold mt-2">Acute Pain Service</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            PCA
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Epidural
          </label>
        </div>
      </div>

      {/* Sedation Score */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">Sedation Score</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center">
            <input type="radio" name="sedation" className="mr-2" />0 = Alert
          </label>

          <label className="flex items-center">
            <input type="radio" name="sedation" className="mr-2" />1 = Drowsy
            responds to voice
          </label>

          <label className="flex items-center">
            <input type="radio" name="sedation" className="mr-2" />2 = Drowsy
            responds to physical stimulation
          </label>

          <label className="flex items-center">
            <input type="radio" name="sedation" className="mr-2" />3 =
            Unrousable
          </label>
        </div>
      </div>

      {/* Progress Notes */}
      <div className="border p-4 text-sm mb-4">
        <h2 className="font-semibold mb-2">Progress Notes</h2>

        {/* Top Input Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <input
            type="text"
            placeholder="Progress Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Initial"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className="border p-2 rounded"
          />
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
          />{" "}
          {/* Insert Button */}
          <button
            onClick={handleInsert}
            className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
          >
            Insert
          </button>
        </div>

        {/* Table */}
        <table className="w-full border text-sm">
          <thead>
            <tr className="border bg-gray-100">
              <th className="border p-1">Time</th>
              <th className="border p-1">Progress Note</th>
              <th className="border p-1">Initial</th>
              <th className="border p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-1">{row.time}</td>
                <td className="border p-1">{row.note}</td>
                <td className="border p-1">{row.initial}</td>
                <td className="border p-1 text-red-600">delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discharge Section */}
      <div className="border p-4 text-sm">
        <h2 className="font-semibold mb-2">Discharged To</h2>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Ward
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> ICU
          </label>
        </div>

        <h2 className="font-semibold mt-3 mb-2">Discharge Status @ Handover</h2>
        <ul className="list-disc ml-5">
          <li>Sedation score lifts head &gt; 5 sec</li>
          <li>Vital signs stable</li>
          <li>Warm & comfortable / tolerable pain</li>
          <li>Dressing no active bleeding</li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <label className="flex items-center space-x-2">
            <span>Anaesthesiologist Signature:</span>
            <input type="text" className="border rounded p-1 flex-1" />
          </label>

          <div>
            <label className="flex items-center mb-1">
              <span className="w-16">Name:</span>
              <input type="text" className="border rounded p-1 flex-1" />
            </label>

            <label className="flex items-center">
              <span className="w-16">Time:</span>
              <DateTimeInput
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                time={selectedTime}
                onTimeChange={setSelectedTime}
              />
            </label>
          </div>
        </div>
      </div>

      {/*...................................Next Page....................... */}
      <h1 className="text-lg font-bold text-center text-gray-600">
        ANAESTHESIA RECORD
      </h1>
    </div>
  );
}
