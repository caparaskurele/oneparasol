"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const KNOWLEDGE_SECTIONS = [
  {
    title: "Smart Money & Modern Lifestyle",
    base: "/knowledge_hub/smart-money-modern-lifestyle",
    subs: [
      { slug: "budgeting-money-hacks", title: "Budgeting & Money Hacks" },
      { slug: "money-mindset-mental-wellness", title: "Money Mindset & Mental Wellness" },
      { slug: "ai-fintech-tools", title: "AI & Fintech Tools" },
      { slug: "automated-trading", title: "Automated Trading" },
      { slug: "remote-work-geo-arbitrage", title: "Remote Work & Geo-Arbitrage" },
    ],
  },
  {
    title: "Government Benefits & Public Schemes",
    base: "/knowledge_hub/government-benefits-public-schemes",
    subs: [
      { slug: "central-government-schemes", title: "Central Government Schemes" },
      { slug: "state-government-schemes", title: "State Government Schemes" },
      { slug: "tax-rebates-incentives", title: "Tax Rebates & Incentives" },
      { slug: "social-security-benefits", title: "Social Security Benefits" },
      { slug: "application-guides-eligibility", title: "Application Guides & Eligibility" },
    ],
  },

  // existing items (keep in same order)
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
    title: "Investments, NRIs & Legal",
    base: "/knowledge_hub/investments-nris-legal",
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
      { slug: "fp&a", title: "FP&A" },
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

export default function KnowledgeHubDropdown(): JSX.Element {
  const router = useRouter();
  const navigate = (href: string) => router.push(href);

  return (
    <div className="w-96 bg-white rounded shadow-md p-4" style={{ zIndex: 9999, pointerEvents: "auto" }} role="menu">
      {KNOWLEDGE_SECTIONS.map((section) => (
        <div key={section.title} className="mb-4">
          <h4 className="font-semibold text-sm">{section.title}</h4>
          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-700">
            {section.subs.map((sub, idx) => {
              const href = `${section.base}/${sub.slug}`;
              return (
                <span key={sub.slug} className="flex items-center mr-2 mb-1">
                  <button
                    type="button"
                    onMouseDown={() => navigate(href)}
                    className="bg-transparent border-0 p-0 m-0 text-left text-gray-700 hover:underline cursor-pointer text-sm"
                    aria-label={sub.title}
                    style={{ lineHeight: 1 }}
                  >
                    {sub.title}
                  </button>
                  {idx < section.subs.length - 1 && <span className="mx-2 text-gray-400">•</span>}
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