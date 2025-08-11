"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";

export default function NursingServiceModal({
  isOpen,
  onClose,
  doctorId,
  onSelect,
  patientData,
  setSaveData,
}) {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "";
    url = `${API_ENDPOINTS.getServices}?visitid=${patientData?.visitid}&wardcatgid=${patientData?.reqwardcatgid}&wardtypeid=${patientData?.wardtypeid}&tariffid=${patientData?.terriffid}&billgrpid=${patientData?.billgrpid}&isshowservicewithhospcode=0&isshowservicewithcharges=1`;

    console.log("url", url);

    axios
      .get(url)
      .then((res) => {
        let parsedData = [];
        try {
          if (typeof res.data === "string") {
            parsedData = JSON.parse(res.data);
            console.log("1", parsedData);
          } else if (
            typeof res.data === "object" &&
            typeof res.data.data === "string"
          ) {
            parsedData = JSON.parse(res.data.data);
            console.log("2", parsedData);
          } else {
            parsedData = res.data;
            console.log("3", parsedData);
          }
        } catch (err) {
          console.error("Error parsing investigations JSON:", err);
          parsedData = [];
        }

        if (Array.isArray(parsedData?.Table)) {
          setInvestigations(parsedData.Table);
        } else if (Array.isArray(parsedData)) {
          setInvestigations(parsedData);
        } else {
          setInvestigations([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching investigations:", err);
        setInvestigations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter logic to match starting words
  const filteredInvestigations = investigations.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const cname = (item.CNAME || "").toLowerCase();

    const startsWithTerm = (str) =>
      str.split(" ").some((word) => word.startsWith(term));

    return startsWithTerm(cname);
  });

  const handleDoneClick = () => {
    if (onSelect && selectedService) {
      onSelect({
        CID: selectedService.CID,
        CNAME: selectedService.CNAME,
      });
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="w-[500px] mx-auto border rounded-md shadow p-3 bg-white text-sm">
        <div className="bg-blue-100 text-center py-1 rounded">
          <h2 className="text-sm font-semibold text-blue-800">
            SELECT Nursing Services
          </h2>
        </div>

        <div className="my-2 space-y-2">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="SEARCH HERE"
              className="border border-blue-500 px-2 py-1 rounded text-blue-900 font-medium text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded overflow-auto h-40">
          {loading ? (
            <button
              disabled
              type="button"
              className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
                  fill="#1C64F2"
                />
              </svg>
              Loading Nursing Services...
            </button>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-2 w-16">Select</th>
                  <th className="p-2">Nursing Services</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestigations.length > 0 ? (
                  filteredInvestigations.map((item, idx) => {
                    const id = item.CID;
                    return (
                      <tr key={idx} className="border-b hover:bg-gray-100">
                        <td className="p-2 text-center">
                          
                          <input
                            type="checkbox"
                            checked={selectedService?.CID === id}
                            onChange={() => setSelectedService(item)}
                          />
                        </td>
                        <td className="text-xs text-black">{item.CNAME}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center font-semibold text-red-400 py-4 text-xs"
                    >
                      ⃠ No favourite investigation found for{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-3">
          <button
            className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800"
            onClick={handleDoneClick}
          >
            <span>✔️</span>
            Done
          </button>
          <button
            onClick={onClose}
            className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800"
          >
            <span>✖️</span>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
