// hooks/useFetchInvDetail.js
import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";


const useFetchInvDetail = (visitid, refreshData) => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visitid) return;

    setLoading(true);

    axios
      .get(`${API_ENDPOINTS.getInvDetail}/?visitid=${visitid}`)
      .then((res) => {
        let parsedData = [];

        try {
          if (typeof res.data === "string") {
            parsedData = JSON.parse(res.data);
          } else if (
            typeof res.data === "object" &&
            typeof res.data.data === "string"
          ) {
            parsedData = JSON.parse(res.data.data);
          } else {
            parsedData = res.data;
          }
        } catch (err) {
          console.error("Error parsing investigations JSON:", err);
          parsedData = [];
        }

        if (parsedData && Array.isArray(parsedData.Table)) {
          setTable(parsedData.Table);
        } else {
          console.warn("Parsed data me Table array nahi mila:", parsedData);
          setTable([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching investigations:", err);
        setTable([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [visitid, refreshData]);

  return { table, loading };
};

export default useFetchInvDetail;
