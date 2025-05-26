import { useState } from 'react';

const useSaveInvData = () => {
    const [saveData, setSaveData] = useState(
        {
    rowid: 0,
    consultantvisitid: "0",
    gssuhid: "0",
    visitid: "",
    visitdatetime: "",
    visitthrough: "",
    visittypeid: "0",
    consultantid: "0",
    wardcatgid: "0",
    bedno: "",
    remark: "",
    isverified: "0",
    verificationdatetime: "",
    verifiedbyid: "0",
    verificationremark: "",
    callbyempid: "0",
    isinactive: "0",
    entempid: "1",
    entdatetime: "",
    entwsname: "",
    modifyempid: "1",
    modifydatetime: "",
    modifywsname: "",
    locationid: "1",
    financialyear: "2526",
    uhid: "",
    orgid: "0",
    receiptno: "",
    itembelongtoid: "0",
    billinggroupid: "0",
    jsonStringsubinvreqmain: "[]",
    jsonStringsubinvreqdetail: "[]",
    jsonStringsubpatipdprovisionaldiagnose: "[]",
    jsonStringsubpatbilinginfomodel: "[]"
  }
    );

    return [saveData, setSaveData];
};

export default useSaveInvData;
