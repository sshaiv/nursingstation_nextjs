// components/ClientToast.jsx
"use client";
import { ToastContainer } from "react-toastify";

export default function ClientToast() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}
