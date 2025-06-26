"use client";
import { useEffect, useState } from "react";

const useVitalsData = (visitid) => {
  const [vitals, setVitals] = useState([]);
  const [latestVitals, setLatestVitals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVitalData = async () => {
      if (!visitid) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://doctorapi.medonext.com/API/HMS/GetPatVitalData?visitid=${visitid}`
        );
        let data = await response.json();

        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            date: item.vitaldatetime,
            takenby: item.takenby,
            bp: item.BP,
            pulse: item.pulse || "",
            temp: item.temp || "",
            spo2: item.spo2 || "",
            weight: item.weight || "",
            height: item.height || "",
            bmi: item.bmi || "",
            rr: item.RR || "",
            painScore: item.painscore?.toString() || "",
            Headcircumference: item.Headcircumference || "",
            bsl: item.bsl || "",
            cvs: item.cvs || "",
            cns: item.cns || "",
            rs: item.rs || "",
            pa: item.pa || "",
            logicalExam: item.le || "",
          }));

          setVitals(formatted);
          setLatestVitals(formatted[formatted.length - 1]); // last one = latest
        } else {
          setVitals([]);
          setLatestVitals(null);
        }
      } catch (err) {
        console.error("Failed to load vital data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadVitalData();
  }, [visitid]);

  return { vitals, latestVitals, loading, error };
};

export default useVitalsData;
