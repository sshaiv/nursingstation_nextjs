import { useState } from "react";

const useSaveDVData = () => {
  const [saveData, setSaveData] = useState({
    rowid: 0,
    consultantvisitid: 0,
    gssuhid: 0,
    visitid: " ",
    visitdatetime: "",
    visitthrough: "",
    visittypeid: 0,
    consultantid: 0,
    wardcatgid: 0,
    bedno: "",
    isemergency: 0,
    remark: "",
    isverified: 0,
    verificationdatetime: "",
    verifiedbyid: 0,
    verificationremark: "",
    callbyempid: 0,
    isinactive: 0,
    entempid:1,
    entdatetime: "",
    entwsname: "",
    modifyempid:1,
    modifydatetime: "",
    modifywsname: "",
    locationid:1,
    financialyear: "2526",
    qty: "",
    jsonStringdoctorvisit:
      '[]',
    jsonStringsubpatbilinginfomodel:
      '[]',
  });

  return [saveData, setSaveData];
};

export default useSaveDVData;
