import { useState } from 'react';

const useSaveInvData = () => {
    const [saveData, setSaveData] = useState(
        {
    rowid: 0,
    consultantvisitid: 0,
    gssuhid: 0,
    visitid: "",
    visitdatetime: "",
    visitthrough: "",
    visittypeid: 0,
    consultantid: 0,
    wardcatgid: 0,
    bedno: "",
    remark: "",
    isverified: 0,
    verificationdatetime: "",
    verifiedbyid: 0,
    verificationremark: "",
    callbyempid: 0,
    isinactive: 0,
    entempid: 1,
    entdatetime: "",
    entwsname: "",
    modifyempid: 1,
    modifydatetime: "",
    modifywsname: "",
    locationid: 1,
    financialyear: "2526",
    uhid: "",
    orgid: 0,
    receiptno: "",
    itembelongtoid: 0,
    billinggroupid: 0,
    jsonStringsubinvreqmain: "[]",
    jsonStringsubinvreqdetail: "[]",
    jsonStringsubpatipdprovisionaldiagnose: "[]",
    jsonStringsubpatbilinginfomodel: "[]"
  }
    );

    return [saveData, setSaveData];
};

export default useSaveInvData;





// import { useState } from 'react';


// const useSaveInvData = () => {

  
//   const getCurrentDateTime = () => {
//       const now = new Date();

//       const day = String(now.getDate()).padStart(2, "0");
//       const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//       const year = now.getFullYear();

//       let hours = now.getHours();
//       const minutes = String(now.getMinutes()).padStart(2, "0");
//       const ampm = hours >= 12 ? "PM" : "AM";
//       hours = hours % 12;
//       hours = hours ? hours : 12; // the hour '0' should be '12'

//       const formattedTime = `${hours}:${minutes} ${ampm}`;
//       return `${day}/${month}/${year} ${formattedTime}`;
//     };

//     const currentDateTime = getCurrentDateTime();
//     const [saveData, setSaveData] = useState(
//         {
//     rowid: 0,
//     consultantvisitid: 0,
//     gssuhid: 0,
//     visitid: "",
//     visitdatetime: "",
//     visitthrough: "",
//     visittypeid: 0,
//     consultantid: 0,
//     wardcatgid: 0,
//     bedno: "",
//     remark: "",
//     isverified: 0,
//     verificationdatetime: "",
//     verifiedbyid: 0,
//     verificationremark: "",
//     callbyempid: 0,
//     isinactive: 0,
//     entempid: 1,
//     entdatetime: "",
//     entwsname: "",
//     modifyempid: 1,
//     modifydatetime: "",
//     modifywsname: "",
//     locationid: 1,
//     financialyear: "2526",
//     uhid: "",
//     orgid: 0,
//     receiptno: "",
//     itembelongtoid: 0,
//     billinggroupid: 0,
//       jsonStringsubinvreqdetail: "[]",
//       jsonStringsubpatipdprovisionaldiagnose: "[]",
   
//      jsonStringsubpatbilinginfomodel :
//       [ {     
//       visitid:"patientData.visitid",
//         gssuhid:"patientData.gssuhid",
//         reqwardcatgid:"patientData.reqwardcatgid",
//         allotedcatg:"patientData.wardcatgid",
//         bedno:"patientData.bedno",
//         admissiontypeid:"patientData.admissiontypeid",
//         corporateid:"patientData.corporateid",
//         billinggroupid:"patientData.billgrpid",
//         terriffid:"patientData.terriffid"
//     }
//   ],
//    jsonStringsubinvreqmain : [
//       {     
//       rowid:0,
//       reqid:0 ,
//       gssuhid:"patientData.gssuhid",
//       visitid:"patientData.visitid",
//       visittype:"I",
//       orddate:currentDateTime,
//       isallresultready:0,
//       bedno:"patientData.bedno",
//       consultantvisitid:0,
//       isremove:0,
//       visitthrough:"VISIT",
//       removedatetime:0,
//       isinactive:0,
//       //entempid: selectedInvestigation?.entempid || " ",
//       entdatetime:currentDateTime,
//       entwsname:"GSLAP2",
//      // modifyempid: selectedInvestigation?.modifyempid || " ",
//       modifydatetime:currentDateTime,
//       modifywsname:"GSLAP2",
//       // locationid: selectedInvestigation?.locationid || " ",
//       financialyear:" ",
//       isprint:0,
//       removeremark:"",
//       // secondconsultantid:doctorId?.CID,
//     }
//    ]
     
//   }
//     );

//     return [saveData, setSaveData];
// };

// export default useSaveInvData;
