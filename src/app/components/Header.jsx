

"use client";
import { useState, useEffect, useRef } from "react";
import API_ENDPOINTS from "../constants/api_url";
import { useRouter } from "next/navigation";
import SearchPatientModal from "../common/Modal/SearchPatientModal";
import { toast } from "react-toastify";

export default function Header() {
  const [showScanner, setShowScanner] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const html5QrCodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 

const fetchPatientBed = async (visitId) => {
  const cleanedVisitId = visitId.trim();
  console.log("🆔 Cleaned visitId:", `"${cleanedVisitId}"`);

  setLoading(true);

  try {
    const apiUrl = `${API_ENDPOINTS.getAdvPatientBed}/?visitid=${encodeURIComponent(cleanedVisitId)}`;
    // console.log("🔗 Fetching Patient Bed Info from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get raw response for debugging in case structure is unexpected
    const rawText = await response.text();
    // console.log("📦 Raw API response text:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (jsonError) {
      throw new Error("Failed to parse JSON: " + jsonError.message);
    }

    // console.log("✅ Parsed API response:", data);
    // console.log("📦 data.Table:", data?.Table);
    // console.log("📏 Length of data.Table:", Array.isArray(data?.Table) ? data.Table.length : "Not an array");

    if (Array.isArray(data?.Table) && data.Table.length > 0) {
      const patient = data.Table[0];
      console.log("✅ Patient found:", patient);

      // router.push(
      //   `/nursingstation?visitid=${patient.visitid}&gssuhid=${patient.gssuhid}&empid=${patient.empid}`
      // );
      router.push(
        `/?visitid=${patient.visitid}&gssuhid=${patient.gssuhid}&empid=${patient.empid}`
      );
    } else {
      console.warn("⚠️ No data in Table array.");
      toast.error("No patient data found.");
  
    }

  } catch (error) {
    console.error("❌ Error fetching patient bed info:", error);
    toast.error("Failed to fetch patient bed info: " + error.message);

  } finally {
    setLoading(false);
    setShowScanner(false);
  }
};



  useEffect(() => {
    const startScanner = async () => {
      const { Html5Qrcode } = await import("html5-qrcode");

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }

      html5QrCodeRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          console.log("Scanned QR Code:", decodedText);
          fetchPatientBed(decodedText);

          html5QrCodeRef.current.stop().then(() => {
            console.log("QR code scanner stopped");
            setShowScanner(false);
          }).catch((err) => {
            console.error("Failed to stop scanner:", err);
          });
        },
        (errorMessage) => {
          // console.log("Scan error:", errorMessage);
        }
      );
    };

    if (showScanner) {
      startScanner();
    } else {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    }

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [showScanner]);

  const handleSearchModalClose = () => setShowSearchModal(false);


  return (
    <div className="flex items-center border-2 border-cyan-500 h-14 justify-between bg-gradient-to-r from-cyan-700 via-cyan-800 to-cyan-900 shadow-xl rounded-lg px-4">

     
<div className="flex items-center gap-x-2">
  {/* QR SCANNER ICON */}
  <div className="relative flex items-center cursor-pointer" onClick={() => setShowScanner(true)}>
    <img
      src="/scan.png"
      alt="Scan"
      className="w-8 h-8 hover:scale-110 transition-transform duration-300"
    />
   
  </div>

  {/* MAGNIFYING GLASS */}
  <div
    className="cursor-pointer text-white text-2xl"
    title="Search Patient"
   // onClick={() => setShowSearchModal(true)}
  >
    🔍
  </div>
</div>


      {/* TITLE + AVATAR */}
      <div className="flex items-center gap-2">
        <img
          src="/nurse.jpeg"
          alt="Nurse"
          className="w-10 h-10 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-white text-xl font-semibold">Nursing Station</h1>
      </div>

      <img src="/login.png" alt="Profile" className="w-8 h-8 rounded-full" />

      {/* SCANNER MODAL */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <div id="reader" style={{ width: 300, height: 300 }}></div>
            <button
              onClick={() => setShowScanner(false)}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
            >
              {loading ? "Loading..." : "Cancel"}
            </button>
          </div>
        </div>
      )}

    

     {showSearchModal && (
  <SearchPatientModal
    isOpen={showSearchModal}
    onClose={() => setShowSearchModal(false)}
   
  />
)}

    </div>
  );
}
