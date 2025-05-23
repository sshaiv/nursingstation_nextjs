


"use client";

import { useState, useEffect, useRef } from "react";
import API_ENDPOINTS from "../constants/api_url";

export default function Header({ onVisitIdScanned }) {
  const [showScanner, setShowScanner] = useState(false);
  const html5QrCodeRef = useRef(null);
  const [loading, setLoading] = useState(false);


const fetchPatientBed = async (visitId) => {
  const cleanedVisitId = visitId.trim(); // ✅ REMOVE extra whitespace or newline
  console.log(cleanedVisitId);
  
  setLoading(true);
  try {
    const response = await fetch
    // (
    //   `https://doctorapi.medonext.com/api/HMS/GetAdvPatientBed?visitid=${encodeURIComponent(cleanedVisitId)}`
    // );
    (`${API_ENDPOINTS.getAdvPatientBed}?visitid=${encodeURIComponent(cleanedVisitId)}`)
    const data = await response.json();

    if (response.ok) {
      console.log("QR Code - Data:", data);
      if (onVisitIdScanned) onVisitIdScanned(data);
    } else {
      alert(`API Error: ${data.message || "Unknown error"}`);
    }
  } catch (error) {
    alert("Failed to fetch patient bed info: " + error.message);
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
          // Call your API with the scanned visitId
          fetchPatientBed(decodedText);

          // Stop the scanner after a successful scan
          html5QrCodeRef.current
            .stop()
            .then(() => {
              console.log("QR code scanner stopped");
              setShowScanner(false);
            })
            .catch((err) => {
              console.error("Failed to stop scanner:", err);
            });
        },
        (errorMessage) => {
          // Optional: console.log("Scan error:", errorMessage);
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

    // Cleanup on unmount
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [showScanner]);

  return (
    <div className="flex items-center border-2 border-cyan-500 h-14 justify-between bg-gradient-to-r from-cyan-700 via-cyan-800 to-cyan-900 shadow-xl rounded-lg">
      <img
        src="/scan.png"
        alt="Scan"
        className="w-8 h-8 cursor-pointer"
        onClick={() => setShowScanner(true)}
      />
      <div className="flex items-center gap-2">
        <img
          src="/nurse.jpeg"
          alt="Nurse"
          className="w-10 h-10 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-white text-xl font-semibold">Nursing Station</h1>
      </div>
      <img src="/login.png" alt="Profile" className="w-8 h-8 rounded-full" />

      {/* Scanner Modal */}
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
    </div>
  );
}
