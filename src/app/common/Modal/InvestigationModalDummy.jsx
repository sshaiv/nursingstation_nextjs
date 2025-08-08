"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { H3 } from "@/app/common/text";
import API_ENDPOINTS from "@/app/constants/api_url";
import ReusableInputField from "@/app/common/SmallInputfields";

export default function InvestigationModalDummy({
  isOpen,
  onClose,
  doctorId,
  onSelect,
  patientData,
  setSaveData,
  setRemark,
  remark,
  onInsert
}) {
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
      url = `${API_ENDPOINTS.getDoctorFavInv}?doctorid=${doctorId?.CID}&wardcatgid=${patientData.reqwardcatgid}&wardtypeid=${patientData.wardtypeid}&tariffid=${patientData.terriffid}&billgrpid=${patientData.billgrpid}&isshowservicewithhospcode=0&isshowservicewithcharges=1`;
    } else if (tab === "ALL") {
      url = `${API_ENDPOINTS.getAllInv}?visitid=${patientData.visitid}&wardcatgid=${patientData.reqwardcatgid}&wardtypeid=${patientData.wardtypeid}&tariffid=${patientData.terriffid}&billgrpid=${patientData.billgrpid}&isshowservicewithhospcode=0&isshowservicewithcharges=1`;
    }
    console.log("url", url);

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

    return startsWithTerm(sername) || startsWithTerm(cname);
  });


// const handleDoneClick = () => {
//   const selectedItems = investigations.filter((inv) =>
//     selectedIds.includes(inv.CID || inv.servid)
//   );

//   console.log("🟢 Selected IDs:", selectedIds);
//   console.log("🟢 Selected Items:", selectedItems);

//   if (onSelect) {
//     onSelect({
//       selectedItems,
//       selectedIds,
//       investigations,
//     });
//   }
// if (onInsert) onInsert(); // ✅ Insert after data passed
//   if (onClose) onClose();
// };


const handleDoneClick = () => {
  console.log("✅ Done clicked");
  console.log("selectedIds:", selectedIds);
  console.log("onInsert exists?", typeof onInsert === "function");

  const selectedItems = investigations.filter((inv) =>
    selectedIds.includes(inv.CID || inv.servid)
  );

  if (onSelect) {
    console.log("calling onSelect");
    onSelect({ selectedItems, selectedIds, investigations });
  }

  if (onInsert) {
    console.log("calling onInsert");
    onInsert();
  }

  if (onClose) {
    console.log("closing modal");
    onClose();
  }
};


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
                <span className="ml-1 text-xs text-black">
                  ALL INVESTIGATIONS
                </span>
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
            <button
              disabled
              type="button"
              className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              ◌ investigations...
            </button>
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
                    <td
                      colSpan={2}
                      className="text-center font-semibold text-red-400 py-4 text-xs"
                    >
                      ⃠ No favourite investigation found for{" "}
                      <span className="text-red-600">
                        Dr.{doctorId?.CName}.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-3">
          <ReusableInputField
            className="border-2 rounded-lg"
            id="remarks"
            label="Remarks"
            width="w-full"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
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
