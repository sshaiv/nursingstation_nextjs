// hooks/useVisitParams.js
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function useVisitParams() {
  const searchParams = useSearchParams();

  const [visitid, setVisitId] = useState(null);
  const [gssuhid, setGssuhId] = useState(null);
  const [empid, setEmpid] = useState(null);

  useEffect(() => {
    const visitId = searchParams.get("visitid");
    const gssuhId = searchParams.get("gssuhid");
    const empId = searchParams.get("empid");

    // console.log("visitid:", visitId);
    // console.log("gssuhid:", gssuhId);
    // console.log("empid:", empId);

    setVisitId(visitId);
    setGssuhId(gssuhId);
    setEmpid(empId);
  }, [searchParams]);

  return { visitid, gssuhid, empid };
}


