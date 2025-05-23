import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";

const useFetchPatientHistory = (visitid, gssuhid, empid) => {
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState({
        presentIllness: null,
        clinicalExamination: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (visitid && gssuhid && empid) {
                try {
                    const query = `?visitid=${visitid}&gssuhid=${gssuhid}&empid=${empid}`;

                    // const url = `${API_ENDPOINTS.getPresentIllness}${query}`;
                    // console.log("Fetching URL:", url);

                    const [presentIllnessRes, clinicalExaminationRes, medicalHistoryRes, surgicalHistoryRes] = await Promise.all([
                        axios.get(`${API_ENDPOINTS.getPresentIllness}${query}`),
                        axios.get(`${API_ENDPOINTS.getClinicalExamination}${query}`),
                        // axios.get(`${API_ENDPOINTS.getSurgicalHistory}${query}`),
                    ]);


                    // Log the raw data..  console.log("Raw API response:", presentIllnessRes.data);



                    setHistoryData({
                        presentIllness: JSON.parse(presentIllnessRes.data),
                        clinicalExamination: JSON.parse(clinicalExaminationRes.data),
                        // surgicalHistory: JSON.parse(surgicalHistoryRes.data),
                    });
                } catch (err) {
                    console.error("Error fetching patient history:", err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                console.warn("Missing visitid, gssuhid, or empid");
                setLoading(false);
            }
        };

        fetchData();
    }, [visitid, gssuhid, empid]);

    return { loading, historyData, error };
};

export default useFetchPatientHistory;



