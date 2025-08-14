import React, { useEffect, useState, useMemo } from "react";


export default function PythonPractice({ visitid, gssuhid, empid }) {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
  
    const runPython = async () => {
      setLoading(true);
      const res = await fetch("/api/run-python");
      const data = await res.json();
      setOutput(data.output || data.error);
      setLoading(false);
    };

  return (
    <div className="flex flex-col sm:flex-row gap-6 ">
      <h3
            onClick={runPython}
            className="cursor-pointer text-blue-600 underline hover:text-blue-800"
          >
            {loading ? "Running Python..." : "Connect Python Page"}
          </h3>
    
          {/* API */}
          {output && (
            <pre className="mt-4 p-2 bg-gray-200 whitespace-pre-wrap">{output}</pre>
          )}
    </div>
  );
}
