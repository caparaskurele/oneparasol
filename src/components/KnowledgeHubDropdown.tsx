"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const KNOWLEDGE_SECTIONS = [
  {
    title: "Strategic Business Solutions",
    base: "/knowledge_hub/strategic-business-solutions",
    subs: [
      { slug: "mergers-acquisitions", title: "Mergers & Acquisitions" },
      { slug: "business-valuation", title: "Business Valuation" },
      { slug: "startup-sparks", title: "Startup Sparks" },
      { slug: "global-growth-exports", title: "Global Growth & Exports" },
      { slug: "business-strategies", title: "Business Strategies" },
    ],
  },
  {
    title: "Money, Markets & Mandates",
    base: "/knowledge_hub/money-markets-mandates",
    subs: [
      { slug: "value-investing", title: "Value Investing" },
      { slug: "real-estate-playbook", title: "Real Estate Playbook" },
      { slug: "cross-border-wealth-nris", title: "Cross-Border Wealth & NRIs" },
      { slug: "alternative-investments", title: "Alternative Investments" },
      { slug: "legal-awareness", title: "Legal Awareness" },
    ],
  },
  {
    title: "Career Growth Grid",
    base: "/knowledge_hub/career-growth-grid",
    subs: [
      { slug: "fp-a", title: "FP&A" },
      { slug: "data-scientist", title: "Data Scientist" },
      { slug: "career-growth", title: "Career Growth" },
      { slug: "human-skills", title: "Human Skills" },
      { slug: "learning-lab", title: "Learning Lab" },
    ],
  },
  {
    title: "Soul & Stories",
    base: "/knowledge_hub/soul-and-stories",
    subs: [
      { slug: "travel-food", title: "Travel & Food" },
      { slug: "poetry-world", title: "Poetry World" },
      { slug: "mythological-stories", title: "Mythological Stories" },
      { slug: "soulful-living", title: "Soulful Living" },
      { slug: "tales-unbound", title: "Tales Unbound" },
    ],
  },
];

export default function KnowledgeHubDropdown() {
  const router = useRouter();

  function navigate(url: string) {
    // use router.push on mouseDown/key to avoid hover-close race
    router.push(url);
  }

  return (
    <div
      className="w-96 bg-white rounded shadow-md p-4"
      style={{ zIndex: 9999, pointerEvents: "auto" }} // ensure clicks reach links
      role="menu"
    >
      {KNOWLEDGE_SECTIONS.map((section) => (
        <div key={section.title} className="mb-4">
          <h4 className="font-semibold text-sm">{section.title}</h4>

          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-700">
            {section.subs.map((sub, idx) => {
              const href = `${section.base}/${sub.slug}`;
              return (
                <span key={sub.slug} className="flex items-center">
                  {/* primary clickable element uses onMouseDown to avoid hover menu race */}
                  <button
                    type="button"
                    onMouseDown={() => navigate(href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") navigate(href);
                    }}
                    className="bg-transparent border-0 p-0 m-0 text-left text-gray-700 hover:underline cursor-pointer"
                    aria-label={sub.title}
                    style={{ lineHeight: 1 }}
                  >
                    {sub.title}
                  </button>

                  {/* keep an actual Link for semantics/SEO as fallback */}
                  <span style={{ display: "none" }}>
                    <Link href={href}>{sub.title}</Link>
                  </span>

                  {idx < section.subs.length - 1 && (
                    <span className="mx-2 text-gray-400" aria-hidden>
                      •
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-2 border-t mt-2">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          View all Knowledge Hub content →
        </Link>
      </div>
    </div>
  );
}