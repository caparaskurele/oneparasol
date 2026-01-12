"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";

export function Navbar(): JSX.Element {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hubMenu = [
    {
      title: "Strategic Business Solutions",
      slug: "/knowledge_hub/strategic-business-solutions",
      items: ["Mergers & Acquisitions", "Business Valuation", "Startup Sparks", "Global Growth & Exports", "Business Strategies"],
    },
    {
      title: "Investments, NRIs & Legal",
      slug: "/knowledge_hub/money-markets-mandates",
      items: ["Value Investing", "Real Estate Playbook", "Cross-Border Wealth & NRIs", "Alternative Investments", "Legal Awareness"],
    },
    {
      title: "Career Growth Grid",
      slug: "/knowledge_hub/career-growth-grid",
      items: ["FP&A", "Data Scientist", "Career Growth", "Human Skills", "Learning Lab"],
    },
    {
      title: "Soul & Stories",
      slug: "/knowledge_hub/soul-and-stories",
      items: ["Travel & Food", "Poetry World", "Mythological Stories", "Soulful Living", "Tales Unbound"],
    },
  ];

  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
        {/* Left: logo + name */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.png" alt="One Parasol" width={40} height={40} priority />
          <span className="font-semibold text-lg text-gray-900 dark:text-white">One Parasol</span>
        </Link>

        {/* Right: navigation */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:underline">Home</Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:underline">About</Link>
            <Link href="/python" className="text-gray-800 dark:text-gray-200 hover:underline">Python</Link>
            <Link href="/share-learning" className="text-gray-800 dark:text-gray-200 hover:underline">Share Learning</Link>

            {/* Knowledge Hub with hover dropdown */}
            <div className="relative group">
              <Link href="/knowledge_hub" className="text-gray-800 dark:text-gray-200 hover:underline">Knowledge Hub</Link>

              {/* Dropdown: hidden by default, shown on hover via group-hover */}
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <div className="p-4 grid grid-cols-1 gap-3">
                  {hubMenu.map((m) => (
                    <div key={m.title} className="border-b border-gray-100 dark:border-gray-700 pb-3">
                      <Link href={m.slug} className="block font-semibold hover:text-indigo-600">{m.title}</Link>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {m.items.slice(0, 5).join(" • ")}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">View all Knowledge Hub content →</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/offerings" className="text-gray-800 dark:text-gray-200 hover:underline">Offerings</Link>

            {/* Auth Links */}
            {mounted && (
              <>
                {session?.user ? (
                  <Link href="/my-profile" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                    My Profile
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" className="text-gray-800 dark:text-gray-200 hover:underline">Sign In</Link>
                    <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Theme toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

