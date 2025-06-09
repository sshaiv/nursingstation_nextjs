import TableReuse from "@/app/common/TableReuse";
import React, { useEffect, useState } from "react";

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
    if (!Array.isArray(historyData)) return; // safeguard

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
        <div className="flex items-center justify-between bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-t-md">
          <span className="text-sm">Medicine History</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Consumable or Doctor Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          autoFocus
        />

        <div className="overflow-auto max-h-[50vh]">
          <div className="min-w-[1000px] overflow-x-auto">
            <table className="min-w-full border-collapse table-auto text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <TableReuse type="th">Date/Time </TableReuse>
                  <TableReuse type="th">Bed No </TableReuse>
                  <TableReuse type="th">Consumable </TableReuse>
                  <TableReuse type="th">Doctor Name </TableReuse>
                  <TableReuse type="th">Issue No </TableReuse>
                  <TableReuse type="th">Batch No </TableReuse>
                  <TableReuse type="th">Qty </TableReuse>
                  <TableReuse type="th">MRP </TableReuse>
                  <TableReuse type="th">Expiry </TableReuse>
                  <TableReuse type="th">Total Amt. </TableReuse>
                  <TableReuse type="th">Store </TableReuse>
                  <TableReuse type="th">Issued By </TableReuse>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <TableReuse>{item.consumabledatetime}</TableReuse>
                      <TableReuse>{item.bedno}</TableReuse>
                      <TableReuse>{item.itemname}</TableReuse>
                      <TableReuse>{item.consultantname}</TableReuse>
                      <TableReuse>{item.outtransactionid}</TableReuse>
                      <TableReuse>{item.batchno}</TableReuse>
                      <TableReuse>{item.qty}</TableReuse>
                      <TableReuse>{item.salerate?.toFixed(2)}</TableReuse>
                      <TableReuse>{item.expirydate}</TableReuse>
                      <TableReuse>{item.totalamt?.toFixed(2)}</TableReuse>
                      <TableReuse>{item.storename}</TableReuse>
                      <TableReuse>{item.issuedby}</TableReuse>
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
