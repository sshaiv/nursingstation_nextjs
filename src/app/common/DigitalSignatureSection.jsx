"use client";
import React, { useState } from "react";
import SignaturePadComponent from "./SignaturePadComponent";

const DigitalSignatureSection = ({onSignatureSave,title} ) => {
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showFullSignature, setShowFullSignature] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

   const handleSave = () => {
    if (!signatureDataUrl) {
      setToastMessage("⚠️ please upload signature");
      setTimeout(() => setToastMessage(""), 2000);
      return;
    }

    localStorage.setItem("signatureImage", signatureDataUrl);
    console.log("child:", signatureDataUrl);

    if (typeof onSignatureSave === "function") {
      onSignatureSave(signatureDataUrl); 
    }

    setShowSignatureModal(false);
  };

  const handleFullView = () => {
    if (!signatureDataUrl) {
      setToastMessage("⚠️ please upload signature");
      setTimeout(() => setToastMessage(""), 2000);
      return;
    }

    setShowFullSignature(true);
  };

  return (
    <div className="mt-0 space-y-1">
      {toastMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-6 py-3 rounded-md shadow-lg z-50 animate-slide-fade">
          {toastMessage}
        </div>
      )}
      <label className="text-xs font-medium font-sans text-gray-700">
          {title}
      </label>

      <div
        className="w-[170px]  max-w-sm h-[70px] border-1 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer  hover:bg-blue-50 relative"
        onClick={() => !signatureDataUrl && setShowSignatureModal(true)}
      >
        {signatureDataUrl ? (
          <img
            src={signatureDataUrl}
            alt="Signature"
            className="h-16 w-auto object-contain mt-2 "
    />
        ) : (
          <span className="text-xs text-gray-500 bg-">Click to sign</span>
        )}
      </div>

      <div className="flex w-fit h-[25px] overflow-hidden border divide-x rounded-md rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 mb-2">
        {/* Clear Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSignatureDataUrl(null);
            localStorage.removeItem("signatureImage");
            console.log("Signature cleared");
          }}
          className="px-2 py-1 text-gray-600 text-xs hover:bg-gray-100"
          title="Clear"
        >
          <svg
            className="w-4 h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-2 py-1 text-gray-600 text-xs hover:bg-gray-100"
          title="Save"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4zM16 21v-6H8v6M8 3v4h8"
            />
          </svg>
        </button>

        {/* View Full Button */}
        <button
          onClick={handleFullView}
          className="px-2 py-1 text-gray-600 text-xs hover:bg-gray-100"
          title="View Full"
        >
          <svg
            className="w-4 h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Download Button */}

        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = signatureDataUrl;
            link.download = "signature.png";
            link.click();
          }}
          className="px-2 py-1 text-gray-600 text-xs hover:bg-gray-100"
          title="Download"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"
            />
          </svg>
        </button>

        {/* Upload Button */}
        <label
          htmlFor="upload-signature"
          className="px-2 py-1 cursor-pointer text-gray-600 transition-colors duration-200 text-xs dark:hover:bg-gray-200 dark:text-gray-800 hover:bg-gray-100"
          title="Upload"
        >
          <input
            type="file"
            accept="image/*"
            id="upload-signature"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (e) => {
                const dataUrl = e.target?.result;
                setSignatureDataUrl(dataUrl);
                console.log("Signature uploaded:", dataUrl);
              };
              reader.readAsDataURL(file);
            }}
          />
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 16v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1M12 12V6m0 0l-3 3m3-3l3 3"
            />
          </svg>
        </label>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50  bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="text-red-500 hover:text-gray-700 text-sm"
              >
                ✖ Close
              </button>
            </div>
            <SignaturePadComponent
              onSave={(dataUrl) => {
                setSignatureDataUrl(dataUrl);
                setShowSignatureModal(false);
              }}
              onClose={() => setShowSignatureModal(false)}
            />
          </div>
        </div>
      )}

      {/* Full Signature View */}
      {showFullSignature && (
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 max-w-[90%] max-h-[90%] overflow-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowFullSignature(false)}
                className="text-red-500 hover:text-gray-700 text-sm"
              >
                ✖ Close
              </button>
            </div>
            <img
              src={signatureDataUrl}
              alt="Full Signature"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalSignatureSection;
