import { useState } from "react";

const useSaveConData = () => {
  const [saveData, setSaveData] = useState({
    rowid: 0,
    outtransactionid: 0,
    transactiondate: "",
    invoiceno: "",
    uhid: "",
    upid: 0,
    hospvisitid: "",
    doctorid: "",
    totamount: 0,
    flatdiscamount: 0,
    discper: 0,
    totaldiscper: 0,
    paidamt: 0,
    isprint: 0,
    remark: "",
    totcgstamt: 0,
    totigstamt: 0,
    totsgstamt: 0,
    isremove: 0,
    entempid: 1,
    entdatetime: "",
    entwsname: "",
    modifyempid: 1,
    modifydatetime: "",
    modifywsname: "",
    locationid: 1,
    financialyear: "2526",
    transtypeid: "",
    isEdit: 0,
    jsonStringitemstockoutmain:
      '[]',

    jsonStringsubipdconsumablemodels:
      '[]',

    jsonStringsubitemstockoutdetl:
      '[]',

    jsonStringsubpatbilinginfomodel:
      '[]',
  });

  return [saveData, setSaveData];
};

export default useSaveConData;
