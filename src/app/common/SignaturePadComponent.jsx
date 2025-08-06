
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePadComponent = ({ onSave, onClose }) => {
  const sigRef = useRef();

  const clearSignature = () => {
    sigRef.current.clear();
  };

  const saveSignature = () => {
    if (sigRef.current.isEmpty()) {
      alert("Please provide a signature.");
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
          className: "border-t border-b border-gray-200 rounded cursor-crosshair",
          style: { backgroundColor: "transparent" },
        }}
      />

      <div className="flex gap-2 ">
        <button
          onClick={clearSignature}
          className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          className="text-xs text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignaturePadComponent;
