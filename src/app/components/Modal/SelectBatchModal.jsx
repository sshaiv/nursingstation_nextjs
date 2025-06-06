import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableReuse from '@/app/common/TableReuse';

export default function SelectBatchModal({ onClose, selectedStore, selectedData, itemId, onSelect }) {
  const [itemCharge, setItemCharge] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchData = async () => {
      if (!itemId || !selectedStore) {
        console.warn("Missing itemId or selectedStore");
        return;
      }

      try {
        const response = await axios.get(
          `https://doctorapi.medonext.com/api/HMS/getItemCharge?itemid=${itemId}&storeid=${selectedStore}`
        );

        const parsedData = typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;

        if (parsedData && Array.isArray(parsedData.Table)) {
          const validBatches = parsedData.Table.filter(batch => batch.availqty > 0);
          setItemCharge(validBatches);
        } else {
          console.warn("Unexpected API structure:", parsedData);
          setItemCharge([]);
        }
      } catch (error) {
        console.error("Failed to fetch batch data:", error);
        setItemCharge([]);
        setError("Error loading batch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchData();
  }, [itemId, selectedStore]);

 
const handleCheckboxChange = (index) => {
  setSelectedRows(prev => {
    const updated = { ...prev, [index]: !prev[index] };
    if (updated[index]) {
      // Use setTimeout to defer the state update
      setTimeout(() => {
        console.log('Selected row data:', itemCharge[index]);
        onSelect(itemCharge[index]); // Send data to parent
      }, 0);
    }
    return updated;
  });
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="w-[95vw] max-w-6xl rounded-md border shadow-lg bg-white p-3 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-t-md">
          <span className="text-sm">Batch Series</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-x-auto p-3">
          {loading ? (
            <div className="text-center text-gray-600 py-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">Error: {error}</div>
          ) : itemCharge.length === 0 ? (
            <div className="text-center text-gray-600 py-4">
              No data available for store ID <strong>{selectedStore}</strong> and item ID <strong>{itemId}</strong>.
            </div>
          ) : (
            <div className="border border-gray-300">
              <table className="table w-full table-fixed text-sm text-center">
                <thead className="table w-full table-fixed bg-blue-900 text-black">
                  <tr>
                    <TableReuse type="th">S.No</TableReuse>
                    <TableReuse type="th">Batch No</TableReuse>
                    <TableReuse type="th">Sale Rate</TableReuse>
                    <TableReuse type="th">Expiry Date</TableReuse>
                    <TableReuse type="th">Select</TableReuse>
                    <TableReuse type="th">Avail. Qty</TableReuse>
                    <TableReuse type="th">CGST%</TableReuse>
                    <TableReuse type="th">SGST%</TableReuse>
                    <TableReuse type="th">IGST%</TableReuse>
                  </tr>
                </thead>
              </table>

              {/* Scrollable Body */}
              <div className="max-h-40 overflow-y-auto">
                <table className="table w-full table-fixed text-sm text-center">
                  <tbody className="bg-gray-50">
                    {itemCharge.map((row, index) => (
                      <tr key={index} className="table w-full table-fixed">
                        <TableReuse>{index + 1}</TableReuse>
                        <TableReuse>{row.batchserialno}</TableReuse>
                        <TableReuse>{row.salerate}</TableReuse>
                        <TableReuse>{row.expirydate}</TableReuse>
                        <TableReuse>
                          <input
                            type="checkbox"
                            checked={!!selectedRows[index]}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </TableReuse>
                        <TableReuse>{row.availqty}</TableReuse>
                        <TableReuse>{row.cgstper}</TableReuse>
                        <TableReuse>{row.sgstper}</TableReuse>
                        <TableReuse>{row.igstper}</TableReuse>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-6 py-1.5 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
