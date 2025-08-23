// app/page.js (or pages/index.js if using pages router)
export default function CardiacAnaesthesiaForm() {
  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className=" p-8 w-full max-w-6xl">
        <form className="space-y-6">
          {/* Timings */}
          <div className=" grid grid-cols-3 gap-4">
            <label className="flex flex-col">
              Arrival at (Hrs)
              <input type="time" className="border rounded-md p-2" />
            </label>
            <label className="flex flex-col">
              Induction (Hrs)
              <input type="time" className="border rounded-md p-2" />
            </label>
            <label className="flex flex-col">
              Finish Time (Hrs)
              <input type="time" className="border rounded-md p-2" />
            </label>
          </div>

          {/* Catheters and Lines */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Catheters & Lines</legend>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Peripheral Venous</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Central Venous</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>PAC</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Arterial</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>NG Tube</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Urinary Catheter</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Fluid Warmer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Air Warmer</span>
              </label>
            </div>
          </fieldset>

          {/* Airway */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Airway</legend>
            <label className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Mask Ventilation Easy</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Mask Ventilation Difficult</span>
            </label>

            <div className="mt-2">
              <label className="block mb-1">Laryngoscope Grade</label>
              <select className="border rounded-md p-2 w-full">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            <label className="block mt-3">
              ET Tube (Oral/Nasal) Size
              <input type="text" className="border rounded-md p-2 w-full" />
            </label>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <label className="flex flex-col">
                Fixed at (cm)
                <input type="text" className="border rounded-md p-2" />
              </label>
              <label className="flex flex-col">
                MV Rate
                <input type="text" className="border rounded-md p-2" />
              </label>
            </div>
          </fieldset>

          {/* Incision */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Incision</legend>
            <label className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Sternotomy</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Thoracotomy</span>
            </label>
          </fieldset>

          {/* CPB */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">CPB</legend>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                On (Time)
                <input type="time" className="border rounded-md p-2" />
              </label>
              <label className="flex flex-col">
                Off (Time)
                <input type="time" className="border rounded-md p-2" />
              </label>
            </div>
          </fieldset>

          {/* Drugs */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Drugs</legend>
            <div className="flex gap-4 mb-2">
              <label className="flex flex-col flex-1">
                Heparin (mg & time)
                <input type="text" className="border rounded-md p-2 w-full" />
              </label>

              <label className="flex flex-col flex-1">
                Protamine (mg & time)
                <input type="text" className="border rounded-md p-2 w-full" />
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" /> <span>Reaction Yes</span>
              <input type="checkbox" /> <span>Reaction No</span>
            </div>
          </fieldset>

          {/* Urine Output */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Urine Output</legend>
            <div className="flex flex-wrap gap-4 mb-2">
              <label className="flex items-center">
                Pre Bypass:
                <input type="text" className="border rounded-md p-2 ml-2 w-28 " />
              </label>

              <label className="flex items-center">
                On Bypass:
                <input type="text" className="border rounded-md p-2 ml-2 w-28" />
              </label>

              <label className="flex items-center">
                Post Bypass:
                <input type="text" className="border rounded-md p-2 ml-2 w-28" />
              </label>

              <label className="flex items-center">
                Total:
                <input type="text" className="border rounded-md p-2 ml-2 w-28" />
              </label>
            </div>
          </fieldset>

          {/* Events */}
          <fieldset className="border rounded-md p-4">
            <legend className="font-semibold">Events Code</legend>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Pre Induction</li>
              <li>Post Induction</li>
              <li>Post Sternotomy</li>
              <li>
                <input type="text" className="border rounded-md p-1 w-full" />
              </li>
              <li>
                <input type="text" className="border rounded-md p-1 w-full" />
              </li>
              <li>
                <input type="text" className="border rounded-md p-1 w-full" />
              </li>
            </ol>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
