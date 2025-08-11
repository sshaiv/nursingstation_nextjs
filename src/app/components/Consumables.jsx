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
import DoctorModal from "../common/Modal/DoctorModal";
import MedicineIndentModal from "../common/Modal/MedicineIndentModal";
import GetIndentDetail from "../common/Modal/GetIndentDetail";
import SelectBatchModal from "../common/Modal/SelectBatchModal";
import useSaveConData from "../hooks/useSaveConData";
import { getCurrentDateTime } from "../utils/dateUtils";
import MedicineHistoryModal from "../common/Modal/MedicineHistoryModal";
import { toast } from "react-toastify";

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
  const [charge, setCharge] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [performedByUsers, setPerformedByUsers] = useState([]);
  const [isDoctorModalOpen, setDoctorModalOpen] = useState(true);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [storeOptions, setStoreOptions] = useState([]);

  const [saveData, setSaveData] = useSaveConData();
  console.log("Updated Consumable", saveData);

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
    if (!store) newErrors.store = "Store is required.";
    if (!selectedItem) newErrors.itemName = "Item Name is required.";
    return newErrors;
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

  const [selectedStore, setSelectedStore] = useState(null);

  const handleStoreSelect = (option) => {
    setStore(option.label);
    setSelectedStore(option.value);
    console.log("Selected Store:", option.label, option.value);

    fetchItemNames(option.value);
  };

  // const handleItemSelect = (item) => {
  //   setSelectedItem(item);
  //  // console.log("ygsy", item);

  //   console.log("Selected Item Name: ID", item.label, " ", item.value);
  // };

  // item select from dropdown
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log("Selected Item Name: ID", item.label, " ", item.value);

    // Open the SelectBatchModal with the selected item ID and store ID
    if (selectedStore) {
      setSelectBatchModalOpen(true);
      setSelectedRowData({ itemid: item.value, storeid: selectedStore });
    } else {
      console.warn("Store ID is not selected.");
    }
  };

  const fetchItemNames = async (storeId) => {
    if (!storeId) {
      // console.error("Store ID is undefined. Cannot fetch item names.");
      return;
    }
    try {
      const response = await axios.get(
        `https://doctorapi.medonext.com/api/HMS/GetItemOnConsumable?storeid=${storeId}`
      );
      let rawData = response.data;

      if (typeof rawData === "string") {
        rawData = rawData.replace(/,(\s*])/, "$1");
        rawData = JSON.parse(rawData);
      }

      if (Array.isArray(rawData)) {
        const formattedItems = rawData.map((item) => ({
          label: item.itemname,
          value: item.itemid,
          itemtypeid: item.itemtypeid,
          itemcatgid: item.itemcatgid,
          entwsname: item.entwsname,
          entempid: item.entempid,
          modifywsname: item.modifywsname,
        }));
        // console.log("formattedItems", formattedItems);

        setItemOptions(formattedItems);
      }
    } catch (error) {
      console.error("Error fetching item names:", error);
    }
  };

  const [isMedicineIndentModalOpen, setMedicineIndentModalOpen] =
    useState(false);

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
      setIsStoreSelected(false);
    } else {
      setIsStoreSelected(true);
      setMedicineIndentModalOpen(true);
    }
  };

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isSelectBatchModalOpen, setSelectBatchModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const handleRowSelect = (row) => {
    setSelectedRowData(row);
    setIndentQty(row.qty);
    setSelectedUnitId(row.unitid);
    setSelectedItem({ label: row.itemname, value: row.itemid });

    // Open the modal after setting state
    setSelectBatchModalOpen(true);
  };

  const [serviceEntries, setServiceEntries] = useState([]);
  const [batch, setBatch] = useState();
  const [storeid, setStoreid] = useState();
  const [cgstper, setCgstper] = useState();
  const [igstper, setIgstper] = useState();
  const [sgstper, setSgstper] = useState();
  const [itemid, setItemid] = useState();
  const [itembelongtoid, setItembelongtoid] = useState();
  const [expirydate, setExpirydate] = useState();
  const [PurchaseRate, setPurchaseRate] = useState();
  const [gstid, setGstid] = useState();
  const [convfact, setConvfact] = useState();
  const [isreusable, setIsreusable] = useState();
  const [mfgdate, setMfgdate] = useState();
  const [netRate, setNetRate] = useState();
  const [itempakgid, setItempakgid] = useState();
  const [hsncode, setHsncode] = useState();
  const [itemcatgid, setItemcatgid] = useState();
  const [salerate, setSalerate] = useState();

  const handleSelectedData = (data) => {
    setItemcatgid(data.itemcatgid);
    setSalerate(data.salerate);
    setHsncode(data.hsncode);
    setBarcode(data.barcode);
    setNetRate(data.netRate);
    setItempakgid(data.itempakgid);
    setMfgdate(data.mfgdate);
    setIsreusable(data.isreusable);
    setConvfact(data.convfact);
    setItemid(data.itemid);
    setGstid(data.gstid);
    setPurchaseRate(data.PurchaseRate);
    setItembelongtoid(data.itembelongtoid);
    setExpirydate(data.expirydate);
    setCgstper(data.cgstper);
    setSgstper(data.sgstper);
    setIgstper(data.igstper);
    setStoreid(data.storeid);
    setBatch(data.batchserialno);
    setExpiryDate(data.expirydate);
    setMrp(data.mRP);
    setAvailQty(data.availqty);
    setSelectBatchModalOpen(false);
  };

  const [expiryDate, setExpiryDate] = useState("");
  const [mrp, setMrp] = useState("");
  const [availQty, setAvailQty] = useState("");

  // const handleIssueQtyChange = (e) => {
  //   const value = e.target.value;
  //   setIssueQty(value);
  //   if (mrp) {
  //     const finalCharge = parseFloat(mrp) * parseFloat(value);
  //     setCharge(finalCharge.toFixed(2));
  //   } else {
  //     setCharge("");
  //   }
  // };

  const handleIssueQtyChange = (e) => {
    const value = e.target.value;
    setIssueQty(value);

    if (mrp && convfact && parseFloat(convfact) !== 0) {
      const unitPrice = parseFloat(mrp) / parseFloat(convfact);
      const finalCharge = unitPrice * parseFloat(value);
      setCharge(finalCharge.toFixed(2));
    } else {
      setCharge("");
    }
  };

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const handleInsert = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    // fields empty 
    if (!selectedItem || !selectedItem.value || !issueQty) {
      toast.warn("Please fill all required fields before saving.");
   
      return;
    }

    const currentDateTime = getCurrentDateTime();

    // Find the selected item details based on the selectedItem
    const selectedItemDetails = itemOptions.find(
      (item) => item.value === selectedItem.value
    );
    // If the selected item is not found, handle the error
    if (!selectedItemDetails) {
      // console.error("Selected item details not found.");
      return;
    }

    const newEntry = {
      date: currentDateTime,
      doctorName: doctorData.label || doctorData.CName || "  ",
      issueNo: issueNo || "  ",
      store: store || "  ",
      itemName: selectedItem ? selectedItem.label : "  ",
      bundleName: bundleName || " ",
      barcode: barcode || " ",
      indentQty: indentQty || 0,
      issueQty: issueQty || 0,
      remarks: remarks || " ",
      mrp: mrp || " ",
      charge: charge || " ",
      batch: batch || "  ",
      // Add any other fields you need
    };
    console.log("New Entry:", newEntry);

    const newServiceEntry = {
      count: " ",
      rowid: 0,
      visitid: patientData.visitid,
      gssuhid: patientData.gssuhid,
      consultantvisitid: 0,
      issueNo: issueNo || " ",
      consultantid: doctorData.CID || " ",
      DoctorName: doctorData.CName || " ",
      consumabledatetime: currentDateTime,
      DateTime: currentDateTime,
      bedno: patientData.bedno,
      itemid: itemid || " ",
      // itemtypeid: selectedItemDetails ? selectedItemDetails.itemtypeid : "  ",
      itemtypeid: selectedItemDetails
        ? selectedItemDetails.itemtypeid != null
          ? selectedItemDetails.itemtypeid
          : 0
        : 0,
      itembelongstoid: itembelongtoid,
      ItemName: selectedItem ? selectedItem.label : " ",
      BatchNo: batch || "",
      qty: issueQty || 0,
      Qty: issueQty || 0,
      unitid: selectedUnitId || 0,
      patientcharge: charge || " ",
      Charge: charge || " ",
      TotalAmount: charge || " ",
      Remove: " ",
      isremove: 0,
      removedbyempid: 0,
      RemoveRemark: " ",
      removeremark: " ",
      isinactive: 0,
      entempid: selectedItemDetails ? selectedItemDetails.entempid : "  ",
      entdatetime: " ",
      entwsname: selectedItemDetails ? selectedItemDetails.entwsname : "  ",
      modifyempid: patientData.modifyempid,
      modifydatetime: patientData.modifydatetime,
      // modifywsname: selectedItemDetails
      //   ? selectedItemDetails.modifywsname
      //   : "  ",
      modifywsname:
        selectedItemDetails && selectedItemDetails.modifywsname != null
          ? selectedItemDetails.modifywsname
          : "",
      locationid: patientData.locationid,
      financialyear: patientData.financialyear,
      isedit: 0,
      outtransactiondetlid: 0,
      outtransactionid: 0,
      itemcatgid: itemcatgid || " ",
      hsncode: hsncode || "",
      batchserialno: batch || " ",
      expirydate: expirydate || " ",
      qtycharge: charge || " ",
      purchrate: PurchaseRate || " ",
      netrate: netRate || "",
      mrp: mrp || " ",
      salerate: salerate || " ",
      totalqty: issueQty || " ",
      barcode: barcode || " ",
      storeid: storeid || " ",
      surgeryid: 0,
      remark: remarks || " ",
      cgstper: cgstper || "",
      cgstamt: cgstper || "",
      sgstper: sgstper || "",
      sgstamt: sgstper || "",
      igstper: igstper || "",
      igstamt: igstper || "",
      isreuseable: isreusable || 0,
      applicableqty: 0,
      transactiontypeid: patientData.transactionid,
      gstid: gstid || "",
      convfact: convfact || "",
      ReturnQty: 0,
      TobeRetQty: 0,
      intranactiondetlid: 0,
      intranscationid: 0,
      itemcategoryid: 0,
      mfgdate: mfgdate || " ",
      Qtycharge: charge || " ",
      freeQty: 0,
      PurchaseRate: 0,
      cgsTAmount: 0,
      sgsTAmount: 0,
      igsTAmount: 0,
      totalamount: charge || " ",
      netRate: netRate || " ",
      itempakgid: itempakgid || " ",
      invoiceno: 0,
    };

    const updatedEntries = [...serviceEntries, newServiceEntry];

    const jsonStringsubpatbilinginfomodel = [
      {
        visitid: patientData?.visitid,
        gssuhid: patientData?.gssuhid,
        reqwardcatgid: patientData?.reqwardcatgid,
        allotedcatg: patientData?.wardcatgid,
        bedno: patientData?.bedno,
        admissiontypeid: patientData?.admissiontypeid,
        corporateid: patientData.corporateid,
        billinggroupid: patientData.billgrpid,
        terriffid: patientData.terriffid,
      },
    ];

    const jsonStringitemstockoutmain = [
      {
        rowid: 0,
        outtransactionid: 0,
        transactiondate: currentDateTime,
        hospvisitid: patientData.visitid,
        doctorid: doctorData.CID || " ",
        storeid: storeid || " ",
        invoiceno: 0,
        entempid: selectedItemDetails ? selectedItemDetails.entempid : "  ",
        entdatetime: " ",
        entwsname: selectedItemDetails ? selectedItemDetails.entwsname : "  ",
        modifyempid: patientData.modifyempid,
        modifydatetime: patientData.modifydatetime,
        modifywsname: selectedItemDetails
          ? selectedItemDetails.modifywsname
          : "  ",
        locationid: patientData.locationid,
        financialyear: patientData.financialyear,
        uhid: patientData.uhid,
        upid: 0,
        isEdit: 0,
        totcgstamt: cgstper || " ",
        totsgstamt: sgstper || " ",
        totigstamt: igstper || " ",
        totamount: charge || " ",
        remark: remarks || " ",
      },
    ];

    setSaveData((prevData) => ({
      ...prevData,

      jsonStringsubipdconsumablemodels: JSON.stringify(updatedEntries),
      jsonStringsubitemstockoutdetl: JSON.stringify(updatedEntries),
      jsonStringsubpatbilinginfomodel: JSON.stringify(
        jsonStringsubpatbilinginfomodel
      ),
      jsonStringitemstockoutmain: JSON.stringify(jsonStringitemstockoutmain),
    }));

    console.log("jsonStringsubipdconsumablemodels:", updatedEntries);
    console.log("jsonStringsubitemstockoutdetl:", updatedEntries);
    console.log("Billing Info:", jsonStringsubpatbilinginfomodel);
    console.log("jsonStringitemstockoutmain:", jsonStringitemstockoutmain);

    setServiceEntries(updatedEntries);
    // setServiceEntries((prev) => [...prev, newServiceEntry]);

    // setVitals((prev) => [...prev, newEntry]);

    // Update the vitals state to include the new entry
    setVitals((prev) => [...prev, newEntry]);

    // Resetting fields after insertion
    setIssueNo("");
    // setStore("");
    setSelectedItem(null);
    setBundleName("");
    setBarcode("");
    setIndentQty("");
    setIssueQty("");
    setRemarks("");
    setCharge("");
    setAvailQty("");
    setMrp("");
    setExpiryDate("");
    // setDoctorName("");
    // setDoctorData(null);

    // Close all modals
    setDoctorModalOpen(false);
    setMedicineIndentModalOpen(false);
    setGetIndentDetailModalOpen(false);
    setSelectBatchModalOpen(false);
    setHistoryModalOpen(false);

    // Step 2: Enable the Save button after Insert
    setIsSaveButtonDisabled(false);
  };

  const savebtn = async () => {
    console.log("savebtn ", saveData);
    try {
      const response = await fetch(
        API_ENDPOINTS.saveIPDConsumable,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveData),
        }
      );

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        toast.success("Data saved successfully!");

        // Reset JSON strings to empty arrays after saving
        setSaveData((prevData) => ({
          ...prevData,
          jsonStringsubipdconsumablemodels: [],
          jsonStringsubitemstockoutdetl: [],
          jsonStringsubpatbilinginfomodel: [],
          jsonStringitemstockoutmain: [],
        }));

        // Reset service entries to clear old entries
        setServiceEntries([]);
        setVitals([]);
      } else {
        toast.error("Failed to save data: " + result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data: " + error.message);
    }
    // Step 3: Disable the Save button after saving
    setIsSaveButtonDisabled(true);
  };

  const handleHistoryOpen = () => {
    setHistoryModalOpen(true);
  };
  const handleHistoryClose = () => {
    setHistoryModalOpen(false);
  };
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);

  const [entries, setEntries] = useState([]);

  const handleDeleteEntry = (indexToDelete) => {
    console.log("🗑️ Deleting Entry at Index:", indexToDelete);
    console.log("📦 Entry Being Deleted:", serviceEntries[indexToDelete]);

    // Filter out the deleted entry from all arrays
    const updatedVitals = vitals.filter((_, i) => i !== indexToDelete);
    const updatedEntries = entries.filter((_, i) => i !== indexToDelete);
    const updatedServiceEntries = serviceEntries.filter(
      (_, i) => i !== indexToDelete
    );

    // Update state
    setVitals(updatedVitals);
    setEntries(updatedEntries);
    setServiceEntries(updatedServiceEntries);

    // Also update the JSON strings in saveData
    setSaveData((prevData) => ({
      ...prevData,
      jsonStringsubipdconsumablemodels: JSON.stringify(updatedServiceEntries),
      jsonStringsubitemstockoutdetl: JSON.stringify(updatedServiceEntries),
    }));

    // Step 3: Disable Save button if nothing to save
    if (updatedServiceEntries.length === 0) {
      setIsSaveButtonDisabled(true);
    }

    console.log("✅ Updated JSON Strings After Deletion:");
    console.log(" - Remaining Entries:", updatedServiceEntries);
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
      {isSelectBatchModalOpen && (
        <SelectBatchModal
          isOpen={isSelectBatchModalOpen}
          onClose={() => setSelectBatchModalOpen(false)}
          selectedData={selectedRowData}
          selectedStore={selectedStore}
          itemId={selectedRowData?.itemid}
          onSelect={handleSelectedData}
        />
      )}
      {isHistoryModalOpen && (
        <MedicineHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleHistoryClose}
          patientData={patientData}
        />
      )}
      <div className="flex items-center justify-center">
        <ModalHeading title="Consumables" />
      </div>
      <hr className="border-t mt-6 mb-2 border-gray-300" />
      <div className="border border-gray-100 rounded-lg space-y-4">
        {/* Inputs Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 items-start">
          {/* Date & Time */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Date & Time
            </label>
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={time}
              onTimeChange={(e) => setTime(e.target.value)}
            />
            {errors.dateTime && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.dateTime}
              </p>
            )}
          </div>

          {/* Issue No */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Issue No
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 rounded-md"
              id="issueNo"
              width="w-full"
              value={issueNo}
              onChange={(e) => setIssueNo(e.target.value)}
            />
          </div>

          {/* Doctor */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Doctor *
            </label>
            <input
              type="text"
              readOnly
              value={doctorName}
              onClick={() => setDoctorModalOpen(true)}
              className={`text-sm px-2 py-1 border text-black rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer focus:outline-none ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Select doctor"
            />
            {errors.doctorName && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.doctorName}
              </p>
            )}
          </div>

          {/* Store Dropdown */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Store *
            </label>
            <DropdownSelect
              label="Select Store"
              options={storeOptions}
              selectedValue={store}
              onSelect={handleStoreSelect}
              error={errors.store}
              className="bg-gray-100 text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
          </div>

          {/* Item Name Dropdown */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Item Name *
            </label>
            <DropdownSelect
              label=" Select Item "
              options={itemOptions}
              selectedValue={selectedItem ? selectedItem.label : ""}
              onSelect={handleItemSelect}
              error={errors.item}
              className="bg-gray-100  text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
            {errors.selectedItemDetails && (
              <p className="text-red-500 text-[10px] mt-[2px] ml-[2px]">
                {errors.selectedItemDetails}
              </p>
            )}
          </div>

          {/* Indent Qty */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Indent Qty
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 bg-gray-100 rounded-md "
              id="indentQty"
              width="w-full"
              value={indentQty}
              onChange={(e) => setIndentQty(e.target.value)}
              readOnly
            />
          </div>

          {/* Expiry Date (Read-only) */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Expiry Date
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 bg-gray-100 rounded-md"
              id="expiryDate"
              width="w-full"
              value={expiryDate}
              readOnly
            />
          </div>

          {/* Available Qty (Read-only) */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Available Qty
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 bg-gray-100 rounded-md"
              id="availQty"
              width="w-full"
              value={availQty}
              readOnly
            />
          </div>

          {/* MRP (Read-only) */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              MRP
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 bg-gray-100 rounded-md"
              id="mrp"
              width="w-full"
              value={mrp}
              readOnly
            />
          </div>

          {/* Issue Qty */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Issue Qty
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 rounded-md"
              id="issueQty"
              width="w-full"
              value={issueQty}
              onChange={handleIssueQtyChange}
            />
          </div>

          {/* Final Charge */}
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-700 font-medium mb-1">
              Final Charge
            </label>
            <ReusableInputField
              className="text-sm px-2 py-1 border border-gray-300 rounded-md"
              id="charge"
              width="w-full"
              value={charge}
              readOnly
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap w-full items-end gap-2">
            {/* Remarks */}
            <div className="flex flex-col flex-1">
              <label className="text-xs text-gray-700 font-medium mb-1">
                Remarks
              </label>
              <ReusableInputField
                className="text-sm px-2 py-1 border border-gray-300 rounded-md"
                id="remarks"
                width=" lg:w-[200px] w-full md:w-full"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4 self-end shrink-0">
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
                onClick={handleHistoryOpen}
                className="text-xs px-4 py-1"
              />
            </div>
          </div>
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
                <TableReuse type="th">Doctor Name</TableReuse>
                <TableReuse type="th">Date/Time</TableReuse>
                <TableReuse type="th">Item Name</TableReuse>
                <TableReuse type="th">Batch No</TableReuse>
                <TableReuse type="th">Qty.</TableReuse>
                <TableReuse type="th">MRP</TableReuse>
                <TableReuse type="th">Total Amount</TableReuse>
                <TableReuse type="th">Remove</TableReuse>
              </tr>
            </thead>
            {/* <tbody>
              {vitals.map((v, idx) => (
                <tr key={idx} className="hover:bg-gray-100 border-t">
                  <TableReuse>{v.doctorName}</TableReuse>
                  <TableReuse>{v.date}</TableReuse>
                  <TableReuse>{v.itemName}</TableReuse>
                  <TableReuse>{v.batch || "  "}</TableReuse>
                  <TableReuse>{v.issueQty}</TableReuse>
                  <TableReuse>{v.mrp}</TableReuse>
                  <TableReuse>{v.charge}</TableReuse>
                  <TableReuse>
                    
                    <div className="flex justify-center space-x-2">
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
            </tbody> */}
            <tbody>
              {vitals.map((entry, actualIndex) => (
                <tr key={actualIndex} className="hover:bg-gray-100 border-t">
                  <TableReuse>{entry.doctorName}</TableReuse>
                  <TableReuse>{entry.date}</TableReuse>
                  <TableReuse>{entry.itemName}</TableReuse>
                  <TableReuse>{entry.batch || "  "}</TableReuse>
                  <TableReuse>{entry.issueQty}</TableReuse>
                  <TableReuse>{entry.mrp}</TableReuse>
                  <TableReuse>{entry.charge}</TableReuse>
                  <TableReuse>
                    <div className="flex justify-center space-x-2">
                      {entry.source !== "api" && (
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDeleteEntry(actualIndex)} // Call the delete function with the actual index
                        >
                          🗑 Delete
                        </button>
                      )}
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
      {/* <div className="flex justify-center ">
        <SaveButton label="Save" onClick={savebtn} />
      </div> */}
      <div className="flex justify-center ">
        <button
          onClick={savebtn}
          disabled={isSaveButtonDisabled} // Use the state to control the button
          className={`w-full px-6 py-2 rounded text-white ${
            isSaveButtonDisabled
              ? "bg-gray-400 cursor-not-allowed" // Disabled state
              : "bg-blue-500 hover:bg-blue-600" // Enabled state
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
