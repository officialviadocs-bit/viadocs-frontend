import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ TailwindCSS global styles
import { Toaster } from "react-hot-toast"; // ✅ Notification system

// ✅ Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* Global Suspense fallback for lazy-loaded components */}
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-600 bg-gradient-to-r from-[#1EC6D7]/10 via-[#4066E0]/10 to-[#6A3FD7]/10">
          <div className="animate-pulse text-lg font-semibold">
            Loading Viadocs...
          </div>
        </div>
      }
    >
      <App />
    </Suspense>

    {/* ✅ Global Toast notification system */}
    <Toaster
      position="top-right"
      toastOptions={{
        className: "font-semibold tracking-wide",
        style: {
          borderRadius: "10px",
          padding: "10px 16px",
        },
        success: {
          style: {
            background: "#22c55e", // Tailwind green-500
            color: "white",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "white",
            secondary: "#22c55e",
          },
        },
        error: {
          style: {
            background: "#ef4444", // Tailwind red-500
            color: "white",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "white",
            secondary: "#ef4444",
          },
        },
      }}
    />
  </StrictMode>
);
