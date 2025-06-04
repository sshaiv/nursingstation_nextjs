import React, { useEffect, useState } from "react";
import { ModalHeading } from "../common/text";
import { ActionButton, SaveButton } from "../common/Buttons";
import TableReuse from "../common/TableReuse";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeInput from "../common/DateTimeInput";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";
import DropdownSelect from "../common/DropdownSelect";
import ReusableInputField from "../common/SmallInputfields";
import DoctorModal from "./Modal/DoctorModal";
import MedicineIndent from "./MedicineIndent";
import MedicineIndentModal from "./Modal/MedicineIndentModal";
import GetIndentDetail from "./Modal/GetIndentDetail";

export default function Consumables({ visitid, gssuhid, empid, patientData }) {
  const [vitals, setVitals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const [nursingService, setNursingService] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [performedBy, setPerformedBy] = useState("");
  const [issueNo, setIssueNo] = useState("");
  const [store, setStore] = useState("");
  const [itemName, setItemName] = useState("");
  const [bundleName, setBundleName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [indentQty, setIndentQty] = useState("");
  const [issueQty, setIssueQty] = useState("");
  const [remarks, setRemarks] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Options for Nursing Service
  const [options, setOptions] = useState([]);

  // Options for Doctors and Performed By Users
  const [doctors, setDoctors] = useState([]);
  const [performedByUsers, setPerformedByUsers] = useState([]);
  const [isDoctorModalOpen, setDoctorModalOpen] = useState(true);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [storeOptions, setStoreOptions] = useState([]);

  const handleSelectDoctor = (doctor) => {
    console.log("Doctor in inv:", doctor);
    let selectedDoc = doctor;
    if (typeof doctor === "string") {
      selectedDoc = doctorOptions.find((doc) => doc.value === doctor);
    }
    if (selectedDoc) {
      setDoctorData(selectedDoc);
      setDoctorName(selectedDoc.label || selectedDoc.CName);
    }
    setSelectedDoctorId(selectedDoc?.value || doctor);
    setDoctorModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!nursingService)
      newErrors.nursingService = "Nursing Service is required.";
    if (!doctorName) newErrors.doctorName = "Doctor Name is required.";
    if (!performedBy) newErrors.performedBy = "Performed By is required.";
    if (!selectedDate || !time)
      newErrors.dateTime = "Date & Time are required.";

    return newErrors;
  };

  const handleInsert = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formattedDate = `${selectedDate.toLocaleDateString()} ${time}`;
    const newEntry = {
      date: formattedDate,
      nursingService: nursingService,
      doctorName: doctorName,
      performedBy: performedBy,
      issueNo: issueNo,
      store: store,
      itemName: itemName,
      bundleName: bundleName,
      barcode: barcode,
      indentQty: indentQty,
      issueQty: issueQty,
      remarks: remarks,
    };

    setVitals([...vitals, newEntry]);
    // Reset fields
    setNursingService("");
    setDoctorName("");
    setPerformedBy("");
    setIssueNo("");
    setStore("");
    setItemName("");
    setBundleName("");
    setBarcode("");
    setIndentQty("");
    setIssueQty("");
    setRemarks("");
  };

  useEffect(() => {
    const fetchNursingServices = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const parsedData = JSON.parse(response.data);
        const relationData = parsedData.Table;
        if (relationData && Array.isArray(relationData)) {
          const formattedOptions = relationData.map((item) => ({
            label: item.CNAME,
            value: item.CID,
          }));
          setOptions(formattedOptions);
        }
      } catch (error) {
        console.error("Error fetching nursing services:", error);
      }
    };

    const fetchPerformedByUsers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getAllHeadload);
        const performedByData = JSON.parse(response.data);
        if (
          performedByData &&
          performedByData.Table &&
          Array.isArray(performedByData.Table)
        ) {
          const formattedPerformedByUsers = performedByData.Table.map(
            (item) => ({
              label: item.CNAME,
              value: item.CID,
            })
          );
          setPerformedByUsers(formattedPerformedByUsers);
        } else {
          console.warn(
            "No performed by user data found or data is not in expected format."
          );
        }
      } catch (error) {
        console.error("Error fetching performed by users:", error);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axios.get(
          `https://doctorapi.medonext.com/api/HMS/getStoreEmpAndLocationWise?locationid=${patientData.locationid}&entempid=21`
        );

        const storeData = JSON.parse(response.data);
        if (storeData && Array.isArray(storeData)) {
          const formattedStores = storeData.map((item) => ({
            label: item.CName,
            value: item.CID,
          }));
          setStoreOptions(formattedStores);
        } else {
          console.warn(
            "No store data found or data is not in expected format."
          );
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchNursingServices(),
        fetchItemNames(),
        fetchStores(),
        fetchPerformedByUsers(),
      ]);
    };

    fetchData();
  }, []);

  // Inside your component
  const handleStoreSelect = (option) => {
    setStore(option.label);
    console.log("aaya store", option.label, option.value);

    fetchItemNames(option.value);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log("Selected Item Name: ID", item.label, " ", item.value);
  };

  // fetchItemNames yaha define karo
  const fetchItemNames = async (storeId) => {
    try {
      const response = await axios.get(
        `https://doctorapi.medonext.com/api/HMS/GetItemOnConsumable?storeid=${storeId}`
      );
      let rawData = response.data;

      // agar response string hai toh clean karo
      if (typeof rawData === "string") {
        rawData = rawData.replace(/,(\s*])/, "$1");
        rawData = JSON.parse(rawData);
      }

      if (Array.isArray(rawData)) {
        const formattedItems = rawData.map((item) => ({
          label: item.itemname,
          value: item.itemid,
        }));
        setItemOptions(formattedItems);
      }
    } catch (error) {
      console.error("Error fetching item names:", error);
    }
  };

  const [isMedicineIndentModalOpen, setMedicineIndentModalOpen] =
    useState(false);

  // const handleIndentDetail = () => {
  //   setMedicineIndentModalOpen(true);
  // };

  const [isGetIndentDetailModalOpen, setGetIndentDetailModalOpen] =
    useState(false);
  const [selectedIndentId, setSelectedIndentId] = useState(null);

  const handleIndentSelect = (indentId) => {
    console.log("Selected Indent ID:", indentId);
    setSelectedIndentId(indentId);
    setMedicineIndentModalOpen(false);
    setGetIndentDetailModalOpen(true);
  };

  const [isStoreSelected, setIsStoreSelected] = useState(true);

  const handleIndentDetail = () => {
    if (!store) {
      setMedicineIndentModalOpen(true);
      setIsStoreSelected(false); // Set flag to false if store is not selected
    } else {
      setIsStoreSelected(true); // Set flag to true if store is selected
      setMedicineIndentModalOpen(true); // Open the modal if store is selected
    }
  };

    const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data
    // Other state variables...

   const handleRowSelect = (row) => {
    setSelectedRowData(row); // Store the selected row data
    console.log("Selected Row Data:", row); // Log the selected row data

    // Set the indent quantity and selected item based on the row data
    setIndentQty(row.qty); // Set the indent quantity
    setSelectedItem({ label: row.itemname, value: row.itemid }); // Set the selected item
};


  return (
    <div className="p-2 rounded-xl w-full max-w-5xl mx-auto text-[12px] space-y-6">
      {isDoctorModalOpen && (
        <DoctorModal
          isOpen={isDoctorModalOpen}
          onClose={() => setDoctorModalOpen(false)}
          onSelectDoctor={handleSelectDoctor}
          visitid={visitid}
          gssuhid={gssuhid}
          empid={empid}
        />
      )}
      {/* {isMedicineIndentModalOpen && (
        <MedicineIndentModal
          isOpen={isMedicineIndentModalOpen}
          onClose={() => setMedicineIndentModalOpen(false)}
          onSelectIndent={handleIndentSelect}
          patientData={patientData}
        />
      )} */}
      {isMedicineIndentModalOpen && (
        <MedicineIndentModal
          isOpen={isMedicineIndentModalOpen}
          onClose={() => setMedicineIndentModalOpen(false)}
          onSelectIndent={handleIndentSelect}
          patientData={patientData}
          isStoreSelected={isStoreSelected} 
        />
      )}

      {isGetIndentDetailModalOpen && (
        <GetIndentDetail
          isOpen={isGetIndentDetailModalOpen}
          onClose={() => setGetIndentDetailModalOpen(false)}
          indentId={selectedIndentId}
          patientData={patientData}
           onRowSelect={handleRowSelect}
        />
      )}

      <div className="flex items-center justify-center">
        <ModalHeading title="Consumables" />
      </div>
      <hr className="border-t mt-6 mb-2 border-gray-300" />

      <div className="border border-gray-100 rounded-lg space-y-4">
        {/* Inputs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="flex flex-col w-full">
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
              label="Date & Time"
            />
            {errors.dateTime && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px] col-span-full ">
                {errors.dateTime}
              </p>
            )}
          </div>
          <ReusableInputField
            className="border-2 rounded-lg"
            id="issueNo"
            label="Issue No"
            width="w-full"
            value={issueNo}
            onChange={(e) => setIssueNo(e.target.value)}
          />

          {/* Doctor Selection */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Doctor *</label>
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`cursor-pointer text-black border rounded text-xs bg-gray-100 hover:bg-gray-200 focus:outline-none py-1 px-2 ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select doctor"
            />
            {errors.doctorName && (
              <p className="text-red-500 mt-0.5">{errors.doctorName}</p>
            )}
          </div>

          {/* */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">Store *</label>
            <DropdownSelect
              label="Store"
              options={storeOptions}
              selectedValue={store}
              onSelect={handleStoreSelect}
              error={errors.store}
            />
          </div>


{/* itemname */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-serif text-gray-700">
              Item Name *
            </label>
            <DropdownSelect
              label="Item Name"
              options={itemOptions}
              selectedValue={selectedItem ? selectedItem.label : ""}
              onSelect={handleItemSelect}
              error={errors.item}
            />
          </div>

          <ReusableInputField
            className="border-2 rounded-lg"
            id="bundleName"
            label="Bundle Name"
            width="w-full"
            value={bundleName}
            onChange={(e) => setBundleName(e.target.value)}
          />
          <ReusableInputField
            className="border-2 rounded-lg"
            id="barcode"
            label="Barcode"
            width="w-full"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />

          {/* qty */}
          <ReusableInputField
            className="border-2 rounded-lg"
            id="indentQty"
            label="Indent Qty"
            width="w-full"
            value={indentQty}
            onChange={(e) => setIndentQty(e.target.value)}
          />
          <ReusableInputField
            className="border-2 rounded-lg"
            id="issueQty"
            label="Issue Qty"
            width="w-full"
            value={issueQty}
            onChange={(e) => setIssueQty(e.target.value)}
          />

          <ReusableInputField
            className="border-2 rounded-lg"
            id="remarks"
            label="Remarks"
            width="w-full"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* Insert Button */}
        <div className="flex justify-end gap-2">
          <ActionButton
            label="Insert"
            onClick={handleInsert}
            className="text-xs px-4 py-1"
          />
          <ActionButton
            label="Indent Detail"
            onClick={handleIndentDetail}
            className="text-xs px-4 py-1"
          />
          <ActionButton
            label="History"
            // onClick={handleIndentDetail}
            className="text-xs px-4 py-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div
          className="max-h-[225px] overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <table className="w-full text-[11px] text-center border-collapse">
            <thead className="bg-blue-50 text-gray-800 font-semibold sticky top-0 z-10">
              <tr>
                <TableReuse type="th">Date/Time</TableReuse>
                <TableReuse type="th">Nursing Service</TableReuse>
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Performed By</TableReuse>
                <TableReuse type="th">Issue No</TableReuse>
                <TableReuse type="th">Store</TableReuse>
                <TableReuse type="th">Item Name</TableReuse>
                <TableReuse type="th">Bundle Name</TableReuse>
                <TableReuse type="th">Barcode</TableReuse>
                <TableReuse type="th">Indent Qty</TableReuse>
                <TableReuse type="th">Issue Qty</TableReuse>
                <TableReuse type="th">Remarks</TableReuse>
                <TableReuse type="th">Actions</TableReuse>
              </tr>
            </thead>
            <tbody>
              {vitals.map((v, idx) => (
                <tr key={idx} className="hover:bg-gray-100 border-t">
                  <TableReuse>{v.date}</TableReuse>
                  <TableReuse>{v.nursingService}</TableReuse>
                  <TableReuse>{v.doctorName}</TableReuse>
                  <TableReuse>{v.performedBy}</TableReuse>
                  <TableReuse>{v.issueNo}</TableReuse>
                  <TableReuse>{v.store}</TableReuse>
                  <TableReuse>{v.itemName}</TableReuse>
                  <TableReuse>{v.bundleName}</TableReuse>
                  <TableReuse>{v.barcode}</TableReuse>
                  <TableReuse>{v.indentQty}</TableReuse>
                  <TableReuse>{v.issueQty}</TableReuse>
                  <TableReuse>{v.remarks}</TableReuse>
                  <TableReuse>
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:underline"
                        // onClick={() => handleEdit(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setVitals(vitals.filter((_, i) => i !== idx))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </TableReuse>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-t mt-6 mb-2 border-gray-300" />

      {/* Save Button */}
      <div className="flex justify-center ">
        <SaveButton label="Save" />
      </div>
    </div>
  );
}
