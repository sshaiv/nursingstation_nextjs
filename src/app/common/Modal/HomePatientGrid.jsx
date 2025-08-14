import API_ENDPOINTS from "@/app/constants/api_url";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePatientGrid = ({ onPatientSelect }) => {
  const router = useRouter();
  //   const [floor, setFloor] = useState("");
  //   const [ward, setWard] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (!Array.isArray(historyData)) return;

    const lowerTerm = searchTerm.toLowerCase();
    const results = historyData.filter(
      (item) =>
        item.patname?.toLowerCase().includes(lowerTerm) ||
        item.doctorname?.toLowerCase().includes(lowerTerm)
    );
    setPatients(results);
  }, [searchTerm, historyData]);

  const [patients, setPatients] = useState([
  
  ]);

  // Call API on component mount
  useEffect(() => {
    fetchHistoryData();
    setSearchTerm("");
  }, []);

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
      setPatients(parsedData);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setHistoryData([]);
      setPatients([]);
    }
  };

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
          `/?visitid=${encodeURIComponent(
            patient.visitid
          )}&gssuhid=${encodeURIComponent(
            patient.gssuhid
          )}&empid=${encodeURIComponent(patient.empid)}`
        );
        // router.push(
        //   `/nursingstation?visitid=${encodeURIComponent(
        //     patient.visitid
        //   )}&gssuhid=${encodeURIComponent(
        //     patient.gssuhid
        //   )}&empid=${encodeURIComponent(patient.empid)}`
        // );
        // Notify parent
        if (onPatientSelect) {
          onPatientSelect(patient); // <-- send the patient data to parent
        }
      } else {
        console.warn("⚠️ No patient data found in table.");
        toast.error("No patient data found.");
      }
    } catch (error) {
      console.error("❌ Error fetching patient bed info:", error);
      toast.error("Failed to fetch patient bed info: ");
    } finally {
      setLoading(false);
    }
  };

  const [floor, setFloor] = useState("");
  const floorOptions = [
    { cid: 1, cname: "Ground" },
    { cid: 2, cname: "First" },
    { cid: 3, cname: "Second" },
  ];

  const [ward, setWard] = useState("");
  const wardOptions = [
    { cid: 1, cname: "Ward A" },
    { cid: 2, cname: "Ward B" },
    { cid: 3, cname: "Ward C" },
  ];

  return (
    <div className="p-2 border border-gray-300 shadow -md overflow-auto scrollbar-hide">
      {/* Top search bar */}
      <div className="flex gap-4 mb-1  flex-wrap text-xs font-semibold text-gray-700 ">
        <select
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className="border p-1 focus:outline-none shadow-md"
        >
          <option value="">Select Floor</option>
          {floorOptions.map((f) => (
            <option key={f.cid} value={f.cname}>
              {f.cname}
            </option>
          ))}
        </select>

        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="border p-1 focus:outline-none shadow-md"
        >
          <option value="">Select Ward</option>
          {wardOptions.map((w) => (
            <option key={w.cid} value={w.cname}>
              {w.cname}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="🔍 Search by Patient  Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border mt-2 flex-grow px-3 py-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-800"
        />
      </div>

      {/* Scrollable patient grid */}
      <fieldset className="border border-gray-300 -md p-2">
        <legend className="font-bold text-sm px-2 text-blue-900">
          Admit Patient
        </legend>

        <div className="max-h-[35vh] overflow-auto scrollbar-hide">
          {/* Horizontal scroll wrapper */}
          <div className="max-h-[50vh] overflow-auto scrollbar-hide">
            <table className="min-w-full border-collapse  table-auto text-left text-gray-700">
              <thead className="bg-gray-300 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-2 text-xs font-semibold">Select </th>
                  <th className="px-4 py-2 text-xs font-semibold">IPD No</th>
                  <th className="px-4 py-2 text-xs font-semibold">Name</th>
                  <th className="px-4 py-2 text-xs font-semibold">
                    Age/Gender
                  </th>
                  <th className="px-4 py-2 text-xs font-semibold">DOB </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                    Primary Dr
                  </th>
                  <th className="px-4 py-2 text-xs font-semibold">Medicine</th>
                  <th className="px-4 py-2 text-xs font-semibold">
                    Vital Schedule
                  </th>
                  <th className="px-4 py-2 text-xs font-semibold">
                    Appointed Nurse
                  </th>
                </tr>
              </thead>

              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 ${
                        selectedRowIndex === index
                          ? "bg-blue-200 "
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }`}
                      onDoubleClick={() =>
                        handleRowDoubleClick(patient.visitid, index)
                      }
                    >
                      <td className="font-semibold text-xs p-2 ">
                        <input
                          type="radio"
                          checked={!!selectedPatient === patient.visitid}
                          onChange={() => setSelectedPatient(patient.visitid)}
                          onClick={() =>
                            handleRowDoubleClick(patient.visitid, index)
                          }
                          className="accent-blue-500 focus:border-blue-700 focus:border-2"
                        />
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.visitid}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.patname}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.ageGender}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.dob}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.primaryDr}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.medicine}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.vitalSchedule}
                      </td>
                      <td className="font-semibold text-xs p-2">
                        {patient.appointedNurse}
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
      </fieldset>
    </div>
  );
};

export default HomePatientGrid;
