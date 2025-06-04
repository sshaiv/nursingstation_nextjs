"use client";
import { useState, useEffect } from "react";
import TableReuse from "@/app/common/TableReuse";
import React from "react";
import axios from "axios";

export default function MedicineIndentModal({ onClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndentData = async () => {
      try {
        const response = await axios.get(
          "https://doctorapi.medonext.com/api/HMS/GetPendingIndent?visitid=SNI24250000679&indentid=0"
        );

        console.log("API Response:", response.data); // <-- This will log the raw response data

        // If API returns a JSON string, parse it, else use it directly
        const indentData =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;

        if (Array.isArray(indentData)) {
          setData(indentData);
        } else {
          setData([]);
          console.warn("API data is not an array:", indentData);
        }
      } catch (err) {
        console.error("Error fetching indent data:", err);
        setError("Failed to load indent data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndentData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-auto">
      <div className="flex items-center justify-end gap-64 bg-green-100 py-2 px-4 rounded-t-lg">
        <div className="text-xl  font-semibold text-green-700">
          INDENT DETAIL
        </div>
        <button
          onClick={onClose}
          className="text-2xl hover:text-red-600"
          aria-label="Close Modal"
        >
          ❌
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 mb-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Return Indent
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-32 overflow-y-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="sticky top-0 bg-blue-900 text-black text-sm z-10">
              <tr>
                <TableReuse type="th">SNo.</TableReuse>
                <TableReuse type="th">Indent No</TableReuse>
                <TableReuse type="th">Date/Time</TableReuse>
                <TableReuse type="th">Bed No</TableReuse>
                <TableReuse type="th">Prepared By</TableReuse>
                <TableReuse type="th">Priority</TableReuse>
                <TableReuse type="th">Indent Type</TableReuse>
                <TableReuse type="th">Return Indent</TableReuse>
                <TableReuse type="th">Close</TableReuse>
              </tr>
            </thead>
            <tbody className="text-sm text-black text-center">
              {data.map((row, index) => (
                <tr key={row.rowid || index}>
                  <TableReuse>{index + 1}</TableReuse>
                  <TableReuse>{row.indentid}</TableReuse>
                  <TableReuse>{row.indentdatetime}</TableReuse>
                  <TableReuse>{row.bedno}</TableReuse>
                  <TableReuse>{row.indentby}</TableReuse>
                  <TableReuse>{row.priority || "-"}</TableReuse>
                  <TableReuse>{row.invoicetype}</TableReuse>
                  <TableReuse>
                    <input
                      type="checkbox"
                      checked={row.isreturnindent === 1}
                      readOnly
                    />
                  </TableReuse>
                  <TableReuse>
                    <input type="checkbox" />
                  </TableReuse>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-start mt-4">
        <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded flex items-center gap-2">
          Close Indent
        </button>
      </div>
    </div>
  );
}
