"use client"; 
import { FaSave } from 'react-icons/fa'; // import the save icon from react-icons


// insert
export  function ActionButton ({ label, onClick }) {
  return (
    <button
      className={`btn-xs  text-sm text-white px-2 py-1 rounded-lg bg-blue-700 hover:bg-blue-300`} // Default background for the "Add" button
      onClick={onClick}
    >
      {label}
    </button>
  );
};


// save
export function SaveButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        text-white 
        text-lg 
        font-medium 
        bg-blue-600 
        hover:bg-blue-500 
        px-8 
        py-2 
        rounded-xl 
        min-w-[800px] 
        shadow-md 
        transition-all 
        duration-200
        flex 
        items-center 
        justify-center
      "
    >
      <FaSave className="mr-2" /> 
      {label}
    </button>
  );
}


