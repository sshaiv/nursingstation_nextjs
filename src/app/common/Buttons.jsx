"use client"; 
import { FaSave } from 'react-icons/fa'; 

export function ActionButton({ label, onClick }) {
  return (
    <button
      className="
        text-xs 
        sm:text-xs md:text-xs  
        text-white 
        px-1.5 py-0.5 
        rounded-sm 
        bg-blue-600 
        hover:bg-blue-400 
        transition-colors 
        duration-200
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
};





export function SaveButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full                 
        max-w-[800px]          
        md:w-[400px]           
        text-white 
        text-lg 
        font-medium 
        bg-blue-600 
        hover:bg-blue-500 
        px-6 
        py-2 
        rounded-xl 
        shadow-md 
        transition-all 
        duration-200
        flex 
        items-center 
        justify-center
        mx-auto                 /* Center horizontally */
      "
    >
      <FaSave className="mr-2" /> 
      {label}
    </button>
  );
}



