
import React, { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeInput({ selectedDate, onDateChange, time, onTimeChange, label }) {
    useEffect(() => {
        if (!selectedDate) {
            onDateChange(new Date());
        }

        if (!time) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
          onTimeChange({ target: { value: `${hours}:${minutes}` } });
          // onTimeChange(`${hours}:${minutes}`); // use prop function only
        }
    }, [selectedDate, time, onDateChange, onTimeChange]);

    return (                                             
        <div className="flex flex-col items-start">
            {label && <label className="text-gray-600 text-[10px] mb-[2px]">{label}</label>}
            <div className="flex items-center border border-gray-300 rounded h-[24px] text-[10px]">
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={onDateChange}
                    dateFormat="dd-MM-yyyy"
                    className="w-[62px] text-black border-none px-[5px] py-[2px] focus:outline-none"
                />
                <span className="px-[4px] text-gray-400">|</span>
                <input
                    type="time"
                    value={time}
                    onChange={onTimeChange}
                    className="w-[85px] text-black border-none px-[5px] py-[2px] focus:outline-none"
                    required
                />
            </div>
        </div>
    );
}



// import React, { useEffect } from "react";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function DateTimeInput({ selectedDate, onDateChange, time, onTimeChange, label }) {
// useEffect(() => {
//   if (selectedDate === undefined && time === undefined) {
//     const now = new Date();
//     onDateChange(now);

//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");
//     onTimeChange(`${hours}:${minutes}`);
//   }
// }, [selectedDate, time, onDateChange, onTimeChange]);

//   return (
//     <div className="flex flex-col items-start">
//       {label && <label className="text-gray-600 font-semibold text-[11px] mb-[2px]">{label}</label>}
//       <div className="flex items-center border border-gray-300 rounded h-[24px] text-[10px]">
//         <ReactDatePicker
//           selected={selectedDate}
//           onChange={onDateChange}
//           dateFormat="dd-MM-yyyy"
//           className="w-[62px] text-black border-none px-[5px] py-[2px] focus:outline-none"
//         />
//         <span className="px-[4px] text-gray-400">|</span>
//         <input
//           type="time"
//           value={time || ""}
//           onChange={(e) => onTimeChange(e.target.value)} // ✅ Send string
//           className="w-[85px] text-black border-none px-[5px] py-[2px] focus:outline-none"
//           required
//         />
//       </div>
//     </div>
//   );
// }
