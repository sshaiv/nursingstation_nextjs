import { useState } from "react";

const useSaveNSData = () => {
  const [saveData, setSaveData] = useState({
    rowid: 0,
    consultantvisitid: 0,
    gssuhid: "",
    visitid: "",
    visitdatetime: "",
    visitthrough: "",
    visittypeid: "",
    consultantid: "",
    wardcatgid: 0,
    bedno: "",
    remark: "",
    isverified: "",
    verificationdatetime: "",
    verifiedbyid: "",
    verificationremark: "",
    callbyempid: "",
    isinactive: "",
    entempid: "1",
    entdatetime: "",
    entwsname: "",
    modifyempid: "",
    modifydatetime: "",
    modifywsname: "",
    locationid: "",
    financialyear: "",
    uhid: "",
    orgid: "",
    receiptno: "",
    itembelongtoid: 0,
    billinggroupid: 0,
    jsonStringsubpatipdservice:
      '[]',
    jsonStringsubpatbilinginfomodel:
      '[ ]',
  });

  return [saveData, setSaveData];
};

export default useSaveNSData;
