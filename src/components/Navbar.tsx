"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";

export function Navbar(): JSX.Element {
  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
        {/* Left: logo + site name */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.png" alt="One Parasol" width={40} height={40} priority />
          <span className="font-semibold text-lg text-gray-900 dark:text-white">One Parasol</span>
        </Link>

        {/* Right: nav links then theme toggle */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:underline">Home</Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:underline">About</Link>
            <Link href="/blogs" className="text-gray-800 dark:text-gray-200 hover:underline">Blogs</Link>
            <Link href="/knowledge_hub" className="text-gray-800 dark:text-gray-200 hover:underline">Knowledge Hub</Link>
            <Link href="/curated_insights" className="text-gray-800 dark:text-gray-200 hover:underline">Curated Insights</Link>
            <Link href="/offerings" className="text-gray-800 dark:text-gray-200 hover:underline">Offerings</Link>
            <Link href="/useful_links" className="text-gray-800 dark:text-gray-200 hover:underline">Useful Links</Link>
          </nav>

          {/* Theme toggle aligned with nav */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
