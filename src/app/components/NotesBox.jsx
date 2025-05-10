import { ActionButton } from "../common/Buttons";

export default function NotesBox() {
    return (
      <div className="bg-gray-50 shadow rounded-2xl relative p-1">
        <textarea
          className="w-full border rounded p-2 pr-16  resize-none"
          placeholder="Write your remarks here..."
          rows={3}
        />
       <ActionButton label="Save" />
      </div>
    );
  }
  