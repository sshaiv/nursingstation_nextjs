


// apiEndpoints.js
const BASE_URL = "https://doctorapi.medonext.com/API/HMS";

const API_ENDPOINTS = {

  //for get
  getPresentIllness: `${BASE_URL}/getPatHistoryofPresentillness`,
  getMedicalHistory: `${BASE_URL}/getPatMedicalHistory`,
  getSurgicalHistory: `${BASE_URL}/getPatSurgicalHistory`,
  getClinicalExamination:`${BASE_URL}/getPatClinicalExamination`,
  // Add more as needed





  //for save 
  savePresentIllness: `${BASE_URL}/SavePatpresentillnessData`, 
  saveClinicalExamination: `${BASE_URL}/SavePatClinicalExaminationData`, 
};

export default API_ENDPOINTS;
