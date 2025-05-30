import { useState } from "react";

const useSaveVitalData = () => {
  const [saveData, setSaveData] = useState({
    rowid: 0,
    visitid: "",
    gssuhid: "",
    bedno: "",
    takenbyid: 0,
    isopd: 0,
    height: "",
    weight: "",
    bmi: "",
    temp: "",
    BP: "",
    pulse: "",
    RR: "",
    Headcircumference: "",
    spo2: "",
    entempid: 1,
    entdatetime: "",
    entwsname: "",
    modifyempid: 1,
    modifydatetime: "",
    modifywsname: "",
    isremove: 0,
    locationid: 1,
    isprintonds: 0,
    vitaldatetime: "",
    painscore: 0,
    bsl: "",
    cvs: "",
    cns: "",
    rs: "",
    pa: "",
    le: "",
    uhid: "",
    bpdia: "",
    jsonStringsubvitaldataentry:
      '[]',
  });

  return [saveData, setSaveData];
};

export default useSaveVitalData;
