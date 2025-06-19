"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NurHeader() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [confirmAction, setConfirmAction] = useState(null);

  const router = useRouter();

  const handleScanClick = () => {
    setToastMessage("⚠️ Sign out first for another scan");
    setToastType("warning");
    setConfirmAction(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSignOutClick = () => {
    setToastMessage("⚠️Are you sure, want to signout patient?");
    setToastType("danger");
    setConfirmAction(() => () => router.push("/"));
    setShowToast(true);
  };

  return (
    <div className="flex items-center border-2 border-cyan-500 h-14 justify-between bg-gradient-to-r from-cyan-700 via-cyan-800 to-cyan-900 shadow-xl rounded-lg">
      {/* Scan image (no animation or scanner functionality) */}
      <div
        className="relative flex items-center cursor-pointer"
        onClick={handleScanClick}
      >
        <img
          src="/scan.png"
          alt="Scan"
          className="w-8 h-8 hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Center content */}
      <div className="flex items-center gap-2">
        <img
          src="/nurse.jpeg"
          alt="Nurse"
          className="w-10 h-10 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-white text-xl font-semibold">Nursing Station</h1>
      </div>

      {/* Sign-out image */}
      <img
        src="/login.png"
        alt="Sign Out"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={handleSignOutClick}
      />

      {/* Toast Popup */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[60%] max-w-sm px-6 py-4 rounded-lg shadow-md z-50 border bg-gray-50 border-black text-black">
          <span className="block text-base font-semibold text-blue-900 mb-3">
            {toastMessage}
          </span>

          {confirmAction && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowToast(false);
                  setConfirmAction(null);
                }}
                className="px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-400 transition"
              >
                ✖️ Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                👍 Sign-Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
