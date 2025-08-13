import TableReuse from "@/app/common/TableReuse";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API_ENDPOINTS from "@/app/constants/api_url";
import { toast } from "react-toastify";
import CloseButton from "../CrossButton";

const SearchPatientModal = ({ isOpen, onClose, patientData }) => {
  const router = useRouter();
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
      // console.log("📦 Raw API response text:", rawText);

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
        toast.error("No patient data found.");
      }
    } catch (error) {
      console.error("❌ Error fetching patient bed info:", error);
      toast.error("Failed to fetch patient bed info: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30">
      <div className="bg-white rounded-xl shadow-lg max-w-[95vw] max-h-[90vh] w-full overflow-auto p-6">
     
        <div className="flex items-center mb-2 font-semibold px-2 py-2 rounded-t-md space-x-2">
          <input
            type="text"
            placeholder="🔍 Search by Patient or Doctor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mt-2 flex-grow px-3 py-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          />
          <CloseButton onClick={onClose} />
        </div>

        <div className="max-h-[50vh] overflow-auto">
          <table className="min-w-full border-collapse table-auto text-left text-gray-700">
            <thead className="bg-gray-300 sticky top-0 z-20">
              <tr>
                <th className="px-4 py-2 text-xs font-semibold">Bed No</th>
                <th className="px-4 py-2 text-xs font-semibold">Visit</th>
                <th className="px-4 py-2 text-xs font-semibold">
                  Patient Name
                </th>
                <th className="px-4 py-2 text-xs font-semibold">Doctor Name</th>
                <th className="px-4 py-2 text-xs font-semibold">Room No</th>
                <th className="px-4 py-2 text-xs font-semibold">Ward</th>
                <th className="px-4 py-2 text-xs font-semibold">
                  Corporate Name
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-amber-50 ${
                      selectedRowIndex === index
                        ? "bg-blue-200"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-blue-50"
                    }`}
                    onClick={() => handleRowDoubleClick(item.visitid, index)}
                  >
                    <td className="font-semibold text-xs p-2">{item.bedno}</td>
                    <td className="font-semibold text-xs p-2">
                      {item.visitid}
                    </td>
                    <td className="font-semibold text-xs p-2">
                      {item.patname}
                    </td>
                    <td className="font-semibold text-xs p-2">
                      {item.doctorname}
                    </td>
                    <td className="font-semibold text-xs p-2">{item.roomno}</td>
                    <td className="font-semibold text-xs p-2">
                      {item.servname}
                    </td>
                    <td className="font-semibold text-xs p-2">
                      {item.corporatename}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center font-semibold text-xs p-2"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchPatientModal;
