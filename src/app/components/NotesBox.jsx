import { ActionButton } from "../common/Buttons";
import ReusableTextareaField from "../common/ReusableTextareaField";

export default function NotesBox() {
    return (
      <div className="shadow rounded-2xl relative p-1">
      
         <ReusableTextareaField
                      // id="allergies"
                      label="🔍 Notes "
                     className="border rounded text-[10px] min-h-[60px] p-2"
                      rows={4}
                      style={{ minHeight: '28px', padding: '6px 8px' }}
                      // value={allergyQuery}
                      // onChange={(e) => setAllergyQuery(e.target.value)}
                    />
      <div className="flex justify-end">
        <ActionButton label="Save" />
      </div>
      </div>
    );
  }
  