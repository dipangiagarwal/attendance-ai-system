"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#0d0d1a",
          color: "#e2e8f0",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "16px 20px",
          borderRadius: "16px",
          fontSize: "15px",
          minWidth: "200px",
          maxWidth: "300px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#6366f1",
            secondary: "#fff",
          },
          style: {
            background: "#0d0d1a",
            border: "1px solid rgba(99,102,241,0.3)",
          },
          duration: 4000,
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            background: "#0d0d1a",
            border: "1px solid rgba(239,68,68,0.3)",
          },
          duration: 5000,
        },
        loading: {
          iconTheme: {
            primary: "#8b5cf6",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}