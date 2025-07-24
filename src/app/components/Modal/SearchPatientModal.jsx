import TableReuse from "@/app/common/TableReuse";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import API_ENDPOINTS from "@/app/constants/api_url";

const SearchPatientModal = ({ isOpen, onClose, patientData }) => {
  const router = useRouter(); // Initialize the router
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistoryData();
      setSearchTerm("");
    }
  }, [isOpen]);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        `https://doctorapi.medonext.com/api/HMS/GetPatientBedNum`
      );
      const data = await response.json();

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
        item.patname?.toLowerCase().includes(lowerTerm) ||
        item.doctorname?.toLowerCase().includes(lowerTerm)
    );
    setFilteredData(results);
  }, [searchTerm, historyData]);

 
  const handleRowDoubleClick = async (visitId, index) => {
    console.log("🆔 Visit ID:", visitId);
    setSelectedRowIndex(index);

    const cleanedVisitId = visitId.trim();
    console.log("🧼 Cleaned visitId:", `"${cleanedVisitId}"`);

    setLoading(true);

    try {
      const apiUrl = `${
        API_ENDPOINTS.getAdvPatientBed
      }/?visitid=${encodeURIComponent(cleanedVisitId)}`;
      console.log("🔗 Fetching from:", apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log("📦 Raw API response text:", rawText);

      let data;
      try {
        data = JSON.parse(JSON.parse(rawText));
      } catch (jsonError) {
        throw new Error("Failed to parse JSON: " + jsonError.message);
      }

      console.log("✅ Parsed data:", data);

      const tableData = Array.isArray(data.Table) ? data.Table : [];

      console.log("📏 tableData length:", tableData.length);

      if (tableData.length > 0) {
        const patient = tableData[0];
        console.log("✅ Patient found:", patient);

        router.push(
          `/nursingstation?visitid=${encodeURIComponent(
            patient.visitid
          )}&gssuhid=${encodeURIComponent(
            patient.gssuhid
          )}&empid=${encodeURIComponent(patient.empid)}`
        );
      } else {
        console.warn("⚠️ No patient data found in table.");
        alert("No patient data found.");
      }
    } catch (error) {
      console.error("❌ Error fetching patient bed info:", error);
      alert("Failed to fetch patient bed info: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30">
      <div className="bg-white rounded-xl shadow-lg max-w-[95vw] max-h-[90vh] w-full overflow-auto p-6">
        <div className="flex items-center mb-2 justify-between bg-green-100 text-green-800 font-semibold px-2 py-2 rounded-t-md">
          <input
            type="text"
            placeholder="🔍 Search by Patient or Doctor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 ml-2 mr-2 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto max-h-[50vh]">
          <div className="min-w-[1000px] overflow-x-auto">
            <table className="min-w-full border-collapse table-auto text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <TableReuse type="th" >Bed No</TableReuse>
                  <TableReuse type="th">Visit</TableReuse>
                  <TableReuse type="th">Patient Name</TableReuse>
                  <TableReuse type="th">Doctor Name</TableReuse>
                  <TableReuse type="th">Room No</TableReuse>
                  <TableReuse type="th">Ward</TableReuse>
                  <TableReuse type="th">Corporate Name</TableReuse>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        selectedRowIndex === index
                          ? "bg-blue-200"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }`}
                      onClick={() =>
                        handleRowDoubleClick(item.visitid, index)
                      }
                    >
                      <TableReuse className="font-semibold text-lg p-2">{item.bedno}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.visitid}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.patname}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.doctorname}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.roomno}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.servname}</TableReuse>
                      <TableReuse className="font-semibold text-lg p-2">{item.corporatename}</TableReuse>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <TableReuse colSpan={7}>No records found.</TableReuse>
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

export default SearchPatientModal;
