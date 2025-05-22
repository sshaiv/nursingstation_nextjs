// "use client";

// import { useState } from "react";

// const investigations = [
//   { name: "CALCIUM", price: "200.00" },
//   { name: "CHOLESTEROL", price: "150.00" },
//   { name: "CREATININE", price: "150.00" },
//   { name: "URINE ROUTINE AND MICROSCOPIC", price: "100.00" },
//   { name: "STOOL ROUTINE AND MICROSCOPIC", price: "100.00" },
// ];

// export default function InvestigationModal() {
//   const [visitThrough, setVisitThrough] = useState("Visit");
//   const [tab, setTab] = useState("COMMON");

//   return (
//     <div className="w-[500px] mx-auto border rounded-md shadow p-3 bg-white text-sm">
//       <div className="bg-green-100 text-center py-1 rounded">
//         <h2 className="text-sm font-semibold text-green-800">SELECT INVESTIGATIONS</h2>
//       </div>

//       <div className="my-2 space-y-2">
//         <div className="flex items-center space-x-3">
//           <span className="font-semibold">Visit Through:</span>
//           <label className="flex items-center space-x-1">
//             <input
//               type="radio"
//               value="Visit"
//               checked={visitThrough === "Visit"}
//               onChange={() => setVisitThrough("Visit")}
//             />
//             <span>Visit</span>
//           </label>
//           <label className="flex items-center space-x-1">
//             <input
//               type="radio"
//               value="Verbal"
//               checked={visitThrough === "Verbal"}
//               onChange={() => setVisitThrough("Verbal")}
//             />
//             <span>Verbal</span>
//           </label>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="space-x-2">
//             <label className="font-semibold">
//               <input
//                 type="radio"
//                 name="tab"
//                 value="COMMON"
//                 checked={tab === "COMMON"}
//                 onChange={() => setTab("COMMON")}
//               />
//               <span className="ml-1 text-xs">COMMON</span>
//             </label>
//             <label className="font-semibold">
//               <input
//                 type="radio"
//                 name="tab"
//                 value="ALL"
//                 checked={tab === "ALL"}
//                 onChange={() => setTab("ALL")}
//               />
//               <span className="ml-1 text-xs">ALL INVESTIGATIONS</span>
//             </label>
//           </div>
//           <input
//             type="text"
//             placeholder="SEARCH HERE"
//             className="border border-blue-500 px-2 py-1 rounded text-blue-900 font-medium text-xs"
//           />
//         </div>
//       </div>

//       <div className="border rounded overflow-auto h-40">
//         <table className="w-full text-left border-collapse text-sm">
//           <thead>
//             <tr className="bg-blue-900 text-white">
//               <th className="p-2 w-16">Select</th>
//               <th className="p-2">Common Investigations</th>
//             </tr>
//           </thead>
//           <tbody>
//             {investigations.map((item, idx) => (
//               <tr key={idx} className="border-b hover:bg-gray-100">
//                 <td className="p-2 text-center">
//                   <input type="checkbox" />
//                 </td>
//                 <td className=" text-xs">
//                   {item.name} ({item.price})
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-3">
//         <button className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800">
//           <span>✔️</span>
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InvestigationModal() {
  const [visitThrough, setVisitThrough] = useState("Visit");
  const [tab, setTab] = useState("COMMON");
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (tab === "COMMON") {
    setLoading(true);
    axios
      .get(
        "https://doctorapi.medonext.com/api/HMS/GetDoctorFavInv?doctorid=26&wardcatgid=2&wardtypeid=5&tariffid=1&billgrpid=1&isshowservicewithhospcode=0&isshowservicewithcharges=1"
      )
      .then((res) => {
        console.log("API Response:", res.data); // 👈 check what it returns
        if (Array.isArray(res.data)) {
          setInvestigations(res.data);
        } else {
          setInvestigations([]); // fallback if not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching investigations:", err);
        setInvestigations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    setInvestigations([]);
  }
}, [tab]);


  return (
    <div className="w-[500px] mx-auto border rounded-md shadow p-3 bg-white text-sm">
      <div className="bg-green-100 text-center py-1 rounded">
        <h2 className="text-sm font-semibold text-green-800">SELECT INVESTIGATIONS</h2>
      </div>

      <div className="my-2 space-y-2">
        <div className="flex items-center space-x-3">
          <span className="font-semibold">Visit Through:</span>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="Visit"
              checked={visitThrough === "Visit"}
              onChange={() => setVisitThrough("Visit")}
            />
            <span>Visit</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="Verbal"
              checked={visitThrough === "Verbal"}
              onChange={() => setVisitThrough("Verbal")}
            />
            <span>Verbal</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <label className="font-semibold">
              <input
                type="radio"
                name="tab"
                value="COMMON"
                checked={tab === "COMMON"}
                onChange={() => setTab("COMMON")}
              />
              <span className="ml-1 text-xs">COMMON</span>
            </label>
            <label className="font-semibold">
              <input
                type="radio"
                name="tab"
                value="ALL"
                checked={tab === "ALL"}
                onChange={() => setTab("ALL")}
              />
              <span className="ml-1 text-xs">ALL INVESTIGATIONS</span>
            </label>
          </div>
          <input
            type="text"
            placeholder="SEARCH HERE"
            className="border border-blue-500 px-2 py-1 rounded text-blue-900 font-medium text-xs"
          />
        </div>
      </div>

      <div className="border rounded overflow-auto h-40">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 w-16">Select</th>
              <th className="p-2">Common Investigations</th>
            </tr>
          </thead>
          <tbody>
           {Array.isArray(investigations) && investigations.length > 0 ? (
  investigations.map((item, idx) => (
    <tr key={idx} className="border-b hover:bg-gray-100">
      <td className="p-2 text-center">
        <input type="checkbox" />
      </td>
      <td className="text-xs">
        {item.servicename} ({item.charges})
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={2} className="text-center py-4 text-xs">
      No investigations found.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-3">
        <button className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800">
          <span>✔️</span>
          Done
        </button>
      </div>
    </div>
  );
}
