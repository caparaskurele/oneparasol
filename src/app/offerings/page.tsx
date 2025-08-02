"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Thanks, we shall get back to you ASAP
        </h1>
      </div>
    );
  }

  const requirementText = watch("requirement", "");

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        To book a consultation, fill the form below.
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 space-y-6">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            {...register("name", { required: true })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="block mb-1">Email ID:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your email"
          />
          {typeof errors.email?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Field:</label>
          <select
            {...register("field", { required: true })}
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
            <option>Data Scientist</option>
            <option>NRI Services</option>
            <option>Company/Firm Incorporation</option>
            <option>Import/Export</option>
            <option>Mentorship</option>
          </select>
          {errors.field && <p className="text-red-500 text-sm">Field is required</p>}
        </div>

        <div>
          <label className="block mb-1">Requirement:</label>
          <textarea
            {...register("requirement", { required: true, maxLength: 1000 })}
            rows={10}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder="Describe your requirement (up to 1000 characters)"
          />
          <div className="text-right text-xs text-gray-500">
            {requirementText?.length}/1000 characters
          </div>
          {errors.requirement && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
