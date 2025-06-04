


// import { useState, useEffect } from "react";
// import TableReuse from "@/app/common/TableReuse";
// import React from "react";
// import axios from "axios";

// export default function GetIndentDetail({ onClose, indentId, patientData }) {
//     console.log("Fetching data for Indent ID:", indentId);

//     const [data, setData] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchIndentData = async () => {
//             if (!indentId) {
//                 console.error("Indent ID is null or undefined");
//                 return; 
//             }

//             try {
//                 const response = await axios.get(
//                     `https://doctorapi.medonext.com/api/HMS/getrptIndentDetaildata?visitid=${patientData.visitid}&indentid=${indentId}`
//                 );

//                 const indentData =
//                     typeof response.data === "string"
//                         ? JSON.parse(response.data)
//                         : response.data;

//                 if (Array.isArray(indentData)) {
//                     setData(indentData); 
//                 } else if (indentData && Array.isArray(indentData.Table1)) {
//                     setData(indentData.Table1); 
//                 } else {
//                     console.warn("Parsed data format unexpected:", indentData);
//                     setData([]); 
//                 }
//             } catch (err) {
//                 console.error("Error fetching indent data:", err);
//                 setError("Failed to load indent data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchIndentData();
//     }, [indentId]); 

//     const onSelectIndent = (row) => {
//         console.log("Row ID:", row.rowid);
//         console.log("Item Name:", row.itemname);
//         console.log("Quantity:", row.qty);
//     };

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md overflow-auto">
//             <div className="overflow-x-auto">
//                 <div className="max-h-32 overflow-y-auto">
//                     <table className="min-w-full table-auto border border-gray-300">
//                         <thead className="sticky top-0 bg-blue-900 text-black text-sm z-10">
//                             <tr>
//                                 <TableReuse type="th">SNo.</TableReuse>
//                                 <TableReuse type="th">Item Name</TableReuse>
//                                 <TableReuse type="th">qty</TableReuse>
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm text-black text-center">
//                             {data.map((row, index) => (
//                                 <tr key={row.rowid || index} onClick={() => onSelectIndent(row)}>
//                                     <TableReuse>{index + 1}</TableReuse>
//                                     <TableReuse>{row.itemname}</TableReuse>
//                                     <TableReuse>{row.qty}</TableReuse>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }






import React, { useEffect, useState } from "react";
import TableReuse from "@/app/common/TableReuse";
import axios from "axios";

export default function GetIndentDetail({ onClose, indentId, patientData, onRowSelect }) {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndentData = async () => {
            if (!indentId) {
                console.error("Indent ID is null or undefined");
                return; 
            }

            try {
                const response = await axios.get(
                    `https://doctorapi.medonext.com/api/HMS/getrptIndentDetaildata?visitid=${patientData.visitid}&indentid=${indentId}`
                );

                const indentData = typeof response.data === "string"
                    ? JSON.parse(response.data)
                    : response.data;

                if (Array.isArray(indentData)) {
                    setData(indentData); 
                } else if (indentData && Array.isArray(indentData.Table1)) {
                    setData(indentData.Table1); 
                } else {
                    console.warn("Parsed data format unexpected:", indentData);
                    setData([]); 
                }
            } catch (err) {
                console.error("Error fetching indent data:", err);
                setError("Failed to load indent data.");
            } finally {
                setLoading(false);
            }
        };

        fetchIndentData();
    }, [indentId]); 

    const onSelectIndent = (row) => {
        console.log("Row ID:", row.rowid);
        console.log("Item Name:", row.itemname);
        console.log("Quantity:", row.qty);
        onRowSelect(row); // Call the callback with the selected row data
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-auto">
            <div className="overflow-x-auto">
                <div className="max-h-32 overflow-y-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="sticky top-0 bg-blue-900 text-black text-sm z-10">
                            <tr>
                                <TableReuse type="th">SNo.</TableReuse>
                                <TableReuse type="th">Item Name</TableReuse>
                                <TableReuse type="th">qty</TableReuse>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-black text-center">
                            {data.map((row, index) => (
                                <tr key={row.rowid || index} onClick={() => onSelectIndent(row)}>
                                    <TableReuse>{index + 1}</TableReuse>
                                    <TableReuse>{row.itemname}</TableReuse>
                                    <TableReuse>{row.qty}</TableReuse>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
