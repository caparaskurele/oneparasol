"use client";
import { useState } from "react";

const sections = [
  { name: "Mergers & Acquisitions", path: "/knowledge_hub/mergers_acquisitions" },
  { name: "Exports from India", path: "/knowledge_hub/exports_from_india" },
  { name: "Spiritual Connections", path: "/knowledge_hub/spiritual_connections" },
];

export default function KnowledgeHub() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        Knowledge Hub
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Explore our curated sections for in-depth knowledge.
      </p>
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <a
            key={section.path}
            href={section.path}
            className="w-full max-w-md px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors text-lg font-medium text-indigo-700 dark:text-indigo-300 text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            {section.name}
          </a>
        ))}
      </div>
    </div>
  );
}
