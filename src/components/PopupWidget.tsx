"use client";

import React from "react";
import { Analytics } from "@vercel/analytics/react";

export function PopupWidget(): JSX.Element {
  // Minimal placeholder widget. Replace with your real implementation.
  return (
    <div aria-hidden style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
      <button
        type="button"
        style={{
          background: "#0ea5a4",
          color: "#fff",
          border: "none",
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
        onClick={() => {
          // placeholder action
          alert("Popup widget placeholder");
        }}
      >
        Help
      </button>
      <Analytics />
    </div>
  );
}