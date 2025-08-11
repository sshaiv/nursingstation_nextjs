
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";

const SignaturePadComponent = ({ onSave, onClose }) => {
  const sigRef = useRef();

  const clearSignature = () => {
    sigRef.current.clear();
  };

  const saveSignature = () => {
    if (sigRef.current.isEmpty()) {
      toast.warning("Please provide a signature.");
     
      return;
    }
    const dataUrl = sigRef.current.toDataURL("image/png");
    onSave(dataUrl); // Send signature back
    onClose();       // Close modal
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 600,
          height: 200,
          className: "border-t border-b border-gray-200  rounded cursor-crosshair",
          style: { backgroundColor: "transparent" },
        }}
      />


         <div className="flex w-fit h-[25px] overflow-hidden border divide-x rounded-md rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 mb-2">
        {/* Clear Button */}
        <button
          onClick={clearSignature}
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
           onClick={saveSignature}
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

          </div>
    </div>
  );
};

export default SignaturePadComponent;
