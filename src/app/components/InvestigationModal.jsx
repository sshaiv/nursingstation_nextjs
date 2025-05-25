"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { H3, Label } from "../common/text";

export default function InvestigationModal({isOpen, onClose, doctorData, onSelect }) {
  const [visitThrough, setVisitThrough] = useState("Visit");
  const [tab, setTab] = useState("COMMON");
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    let url = "";

    if (tab === "COMMON") {
      url =
        "https://doctorapi.medonext.com/api/HMS/GetDoctorFavInv?doctorid=26&wardcatgid=2&wardtypeid=5&tariffid=1&billgrpid=1&isshowservicewithhospcode=0&isshowservicewithcharges=1";
    } else if (tab === "ALL") {
      url =
        "https://doctorapi.medonext.com/api/HMS/GetAllInv?visitid=SNI24250000679&wardcatgid=2&wardtypeid=5&tariffid=1&billgrpid=1&isshowservicewithhospcode=0&isshowservicewithcharges=1";
    }

    axios
      .get(url)
      .then((res) => {
        let parsedData = [];

        try {
          if (typeof res.data === "string") {
            parsedData = JSON.parse(res.data);
          } else if (
            typeof res.data === "object" &&
            typeof res.data.data === "string"
          ) {
            parsedData = JSON.parse(res.data.data);
          } else {
            parsedData = res.data;
          }
        } catch (err) {
          console.error("Error parsing investigations JSON:", err);
          parsedData = [];
        }

        console.log("Parsed investigations data:", parsedData);

        if (Array.isArray(parsedData)) {
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
  }, [tab]);

  // Filter logic to match starting words
  const filteredInvestigations = investigations.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const cname = (item.CName || "").toLowerCase();
    const sername = (item.servname || "").toLowerCase();

    const startsWithTerm = (str) =>
      str.split(" ").some((word) => word.startsWith(term));

    if (tab === "COMMON") {
      return startsWithTerm(sername) || startsWithTerm(cname);
    } else if (tab === "ALL") {
      return startsWithTerm(sername) || startsWithTerm(cname);
    }

    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="w-[500px] mx-auto border rounded-md shadow p-3 bg-white text-sm">
        <div className="bg-green-100 text-center py-1 rounded">
          <h2 className="text-sm font-semibold text-green-800">
            SELECT INVESTIGATIONS
          </h2>
        </div>

        <div className="my-2 space-y-2">
          <div className="flex items-center space-x-3">
            
            <span className="font-semibold text-black">Visit Through:</span>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="Visit"
                checked={visitThrough === "Visit"}
                onChange={() => setVisitThrough("Visit")}
              />
             
              <H3>Visit</H3>
              
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="Verbal"
                checked={visitThrough === "Verbal"}
                onChange={() => setVisitThrough("Verbal")}
              />
              
              <H3>Verbal</H3>
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
                
                <span className="ml-1 text-xs text-black">COMMON</span>
              </label>
              <label className="font-semibold">
                <input
                  type="radio"
                  name="tab"
                  value="ALL"
                  checked={tab === "ALL"}
                  onChange={() => setTab("ALL")}
                />
                <span className="ml-1 text-xs text-black">ALL INVESTIGATIONS</span>
              </label>
            </div>
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
            <div className="text-center py-4 text-xs">Loading investigations...</div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-2 w-16">Select</th>
                  <th className="p-2">Investigations</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestigations.length > 0 ? (
                  filteredInvestigations.map((item, idx) => {
                    const id = item.CID || item.servid;
                    return (
                      <tr key={idx} className="border-b hover:bg-gray-100">
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(id)}
                            onChange={() => {
                              setSelectedIds((prev) =>
                                prev.includes(id)
                                  ? prev.filter((cid) => cid !== id)
                                  : [...prev, id]
                              );
                            }}
                          />
                        </td>
                        <td className="text-xs text-black">
                          {item.servname} {item.CName}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center text-red-400 py-4 text-xs">
                      No investigations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <button
            className="bg-blue-900 text-white px-6 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800"
            
             onClick={() => {
              // console.log("Selected CIDs/ServIDs:", selectedIds);
              if (onSelect) onSelect(selectedIds);  // Pass selected IDs back
              if (onClose) onClose();               // Close modal
            }}
          >
            <span>✔️</span>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
