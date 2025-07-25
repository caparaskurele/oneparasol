"use client";
import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    field: "",
    requirement: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thanks, we shall get back to you ASAP:)</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-4xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        To book a consultation, fill the form below and we will get back to you ASAP
      </h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 space-y-6">
        <div>
          <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-200">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-200">Email ID: </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your email (for reply from our side)"
          />
        </div>
        <div>
          <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-200">Field:</label>
          <select
            name="field"
            value={form.field}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select relevant area</option>
            <option>Value Investing</option>
            <option>Business Valuation</option>
            <option>Financial Modeling</option>
            <option>Startup Funding</option>
            <option>Investor Presentation</option>
            <option>ITR Filing</option>
            <option>Tax Audit</option>
            <option>FP&A Domain</option>
            <option>NRI Services</option>
            <option>Company/Firm Incorporation</option>
            <option>Import/Export</option>
            <option>Mentorship</option>
          </select>
        </div>
        <div>
          <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-200">Requirement:</label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            required
            maxLength={1000}
            rows={10}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Describe your requirement (up to 1000 words)"
          />
          <div className="text-right text-xs text-gray-500 dark:text-gray-400">
            {form.requirement.length}/5000 characters
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <h2 className="text-xl md:text-xl font-medium text-gray-600 dark:text-gray-300 text-center mb-8">
        We value your time and money
      </h2>
    </div>
  );
}
