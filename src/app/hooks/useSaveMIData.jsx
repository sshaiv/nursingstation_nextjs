import { useState } from "react";

const useSaveMIData = () => {
  const [saveData, setSaveData] = useState({
    rowid: 0,
    indentid: 0,
    indentdatetime: "00/00/0000 00:00 AM",
    indentstoreid: 0,
    visitid: "SNI24250000679",
    gssuhid: 4561,
    bedno: "MGW-11",
    isremove: 0,
    removedbyempid: 0,
    removeremark: "remove remark",
    isunabletoprocess: 0,
    isinactive: 0,
    entempid: "21",
    entdatetime: "00/00/0000 00:00 AM",
    entwsname: "GSLAP2",
    modifyempid: "21",
    modifydatetime: "00/00/0000 00:00 AM",
    modifywsname: "GSLAP2",
    locationid: 1,
    financialyear: "2526",
    priorityid: 0,
    indenttypeid: 1,
    isreturnindent: 0,
    isclose: 0,
    closedbyid: 0,
    jsonStringnursingpatipdmedicineindentmainmodel: null,
    jsonStringsubnursingpatipdmedicineindentdetailmodel:
      '[]',
    jsonStringsubpatbilinginfomodel:
      '[]',
  });

  return [saveData, setSaveData];
};

export default useSaveMIData;
