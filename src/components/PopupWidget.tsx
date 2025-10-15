"use client";

import React from "react";

export function PopupWidget(): JSX.Element {
  return (
    <div className="no-scale fixed right-4 bottom-4 z-50">
      <button
        type="button"
        className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={() => alert("Help")}
      >
        Help
      </button>
    </div>
  );
}