


// apiEndpoints.js
const BASE_URL = "https://doctorapi.medonext.com/API/HMS";

const API_ENDPOINTS = {

  //Get Api -
   getPresentIllness: `${BASE_URL}/getPatHistoryofPresentillness`,
  getMedicalHistory: `${BASE_URL}/getPatMedicalHistory`,
  getSurgicalHistory: `${BASE_URL}/getPatSurgicalHistory`,
  getClinicalExamination:`${BASE_URL}/getPatClinicalExamination`,
        //for dropdown Get-
         getAllHeadload :`${BASE_URL}/GetAllHeadload`,
         getAllDoctor : `${BASE_URL}/GetAllDoctor`,
         getPatCons :`${BASE_URL}/GetPatCons`,
         getAdvPatientBed :`${BASE_URL}/GetAdvPatientBed`,





  //for save 
  savePresentIllness: `${BASE_URL}/SavePatpresentillnessData`, 
  saveClinicalExamination: `${BASE_URL}/SavePatClinicalExaminationData`, 
};

export default API_ENDPOINTS;
