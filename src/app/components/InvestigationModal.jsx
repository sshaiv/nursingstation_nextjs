"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { H3 } from "../common/text";
import API_ENDPOINTS from "../constants/api_url";
import ReusableInputField from "../common/SmallInputfields";

export default function InvestigationModal({
  isOpen,
  onClose,
  doctorId,
  onSelect,
  patientData,
  setSaveData,
  setRemark,
  remark
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
console.log("url",url);

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

 
  const handleDoneClick = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${day}/${month}/${year} ${formattedTime}`;
  };

  const currentDateTime = getCurrentDateTime();

  // Multiple investigations
  const jsonStringsubinvreqdetail = selectedIds.map((id, index) => {
    const selectedInvestigation = investigations.find(
      (item) => item.CID === id || item.servid === id
    );

    return {
      rowid: 0,
      SNo: index + 1,
      servid: selectedInvestigation?.servid || selectedInvestigation?.CID || "",
      InvestigationName:
        selectedInvestigation?.servname || selectedInvestigation?.CName || "",
      consultantid: doctorId?.CID,
      DoctorName: doctorId?.CName,
      isurgent: 0,
      Urgent: "",
      consenttypeid: 0,
      ConsentType: "",
      isconsenttaken: 0,
      ConsentTaken: "",
      Remove: "",
      reqid: 0,
      invdate: "",
      remarks: remark,
      issampled: 0,
      isresult: 0,
      isverified: 0,
      isunabletoprocess: 0,
      isemg: 0,
      preparationstatusid: 0,
      preparationremarkid: 0,
      reasonfornotpreparation: " ",
      isconsentreq: 0,
      isremove: 0,
      removedatetime: " ",
      isprofile: 0,
      profileservid: 0,
      charge: selectedInvestigation?.charge || " ",
      isinactive: 0,
      entempid: selectedInvestigation?.entempid || " ",
      entdatetime: currentDateTime,
      entwsname: "GSLAP2",
      modifyempid: selectedInvestigation?.modifyempid || " ",
      modifydatetime: currentDateTime,
      modifywsname: "GSLAP2",
      locationid: selectedInvestigation?.locationid || " ",
      IsEdit: 0,
      financialyear: "",
      servcatgid: selectedInvestigation?.servid || selectedInvestigation?.CID || "",
      servsubcatgid: selectedInvestigation?.servsubcatgid || " ",
      deptid: selectedInvestigation?.deptid || " ",
      subdeptid: selectedInvestigation?.subdeptid || " ",
      statusid: 0,
      Consultant: " ",
      reqwardcatgid: patientData.reqwardcatgid,
      ispaid: 0,
      Paid: "",
      isrepeat: 0,
      Repeat: "",
      repeatremark: "",
      RepeatRemark: "",
      itemlineid: 1,
      performedbyempid: 0,
      callbyempid: 0,
      callbyremark: "",
      CallByRemark: "",
      postinfinalbill: 0,
      otherconsultantid: doctorId?.CID,
    };
  });

  // Single billing info (outside loop)
  const jsonStringsubpatbilinginfomodel = [
    {
      visitid: patientData.visitid,
      gssuhid: patientData.gssuhid,
      reqwardcatgid: patientData.reqwardcatgid,
      allotedcatg: patientData.wardcatgid,
      bedno: patientData.bedno,
      admissiontypeid: patientData.admissiontypeid,
      corporateid: patientData.corporateid,
      billinggroupid: patientData.billgrpid,
      terriffid: patientData.terriffid,
    },
  ];

  // Single main request info (outside loop)
  const jsonStringsubinvreqmain = [
    {
      rowid: 0,
      reqid: 0,
      gssuhid: patientData.gssuhid,
      visitid: patientData.visitid,
      visittype: "I",
      orddate: currentDateTime,
      isallresultready: 0,
      bedno: patientData.bedno,
      consultantvisitid: 0,
      isremove: 0,
      visitthrough: "VISIT",
      removedatetime: 0,
      isinactive: 0,
      entempid: investigations[0]?.entempid || " ",
      entdatetime: currentDateTime,
      entwsname: "GSLAP2",
      modifyempid: investigations[0]?.modifyempid || " ",
      modifydatetime: currentDateTime,
      modifywsname: "GSLAP2",
      locationid: investigations[0]?.locationid || " ",
      financialyear: " ",
      isprint: 0,
      removeremark: "",
      secondconsultantid: doctorId?.CID,
    },
  ];

  // Save all data
  setSaveData((prevData) => ({
    ...prevData,
    jsonStringsubinvreqdetail: JSON.stringify(jsonStringsubinvreqdetail),
    jsonStringsubpatbilinginfomodel: JSON.stringify(jsonStringsubpatbilinginfomodel),
    jsonStringsubinvreqmain: JSON.stringify(jsonStringsubinvreqmain),
  }));

  console.log("Details:", jsonStringsubinvreqdetail);
  console.log("Billing Info:", jsonStringsubpatbilinginfomodel);
  console.log("Main Info:", jsonStringsubinvreqmain);

  if (onSelect) onSelect(jsonStringsubinvreqdetail);
  if (onClose) onClose();
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
              Loading investigations...
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


