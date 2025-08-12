import TableReuse from "@/app/common/TableReuse";
import React, { useEffect, useState } from "react";
import CloseButton from "../CrossButton";

const MedicineHistoryModal = ({ isOpen, onClose, patientData }) => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchHistoryData();
      setSearchTerm("");
    }
  }, [isOpen]);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        `https://doctorapi.medonext.com/api/HMS/GetConsumHistData?visitid=${patientData.visitid}`
      );
      const data = await response.json();

      // The API might return a JSON string inside a string, so parse if needed
      let parsedData = data;
      if (typeof data === "string") {
        try {
          parsedData = JSON.parse(data);
        } catch {
          parsedData = [];
        }
      }
      if (!Array.isArray(parsedData)) {
        parsedData = [];
      }
      setHistoryData(parsedData);
      setFilteredData(parsedData);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setHistoryData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    if (!Array.isArray(historyData)) return; 

    const lowerTerm = searchTerm.toLowerCase();
    const results = historyData.filter(
      (item) =>
        item.itemname?.toLowerCase().includes(lowerTerm) ||
        item.consultantname?.toLowerCase().includes(lowerTerm)
    );
    setFilteredData(results);
  }, [searchTerm, historyData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30">
      <div className="bg-white rounded-xl shadow-lg max-w-[95vw] max-h-[90vh] w-full overflow-auto p-6">
        <div className="flex items-center justify-between bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-t-md">
          <span className="text-sm">Medicine History</span>
        </div>

        {/* Search Input */}
        <div className="flex items-center mb-2 font-semibold px-2 py-2 rounded-t-md space-x-2">
          <input
            type="text"
            placeholder="🔍 Search by Service or Consultant Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mt-2 flex-grow px-3 py-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          />
          <CloseButton onClick={onClose} />
        </div>

        <div className="overflow-auto max-h-[50vh]">
          <div className="min-w-[1000px] ">
            <table className="w-full border-collapse border border-gray-100  text-gray-700 text-left">
              <thead className="bg-gray-300 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-xs font-semibold">
                    Date/Time
                    </th>
                  {/* <th className="px-4 py-2 text-xs font-semibold">
                    Bed No 
                    </th> */}
                  <th className="px-4 py-2 text-xs font-semibold">
                   Consumable 
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                   Doctor Name
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                   Issue No 
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                 Batch No
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                 Qty
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                MRP
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                   Expiry
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                  Total Amt.
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                  Store
                    </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                  Issued By
                    </th>              
             
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData
                    .slice() // make a shallow copy
                    .reverse() // reverse the order
                    .map((item, index) => (
                      <tr
                        key={index}
                          className={`hover:bg-amber-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-blue-50"
                        }`}
                      >
                         <td className=" font-semibold text-xs p-2">
                          {item.consumabledatetime|| "N/A"}
                        </td>
                         {/* <td className=" font-semibold text-xs p-2">
                          {item.bedno|| "N/A"}
                        </td> */}
                         <td className=" font-semibold text-xs p-2">
                          {item.itemname|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.consultantname|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.outtransactionid|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.batchno|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.qty|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.salerate?.toFixed(2)|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.expirydate|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.totalamt?.toFixed(2)|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.storename|| "N/A"}
                        </td>
                         <td className=" font-semibold text-xs p-2">
                          {item.issuedby|| "N/A"}
                        </td>
                        
                      </tr>
                    ))
                ) : (
                  <tr>
                    <TableReuse colSpan={12}>No records found.</TableReuse>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineHistoryModal;
