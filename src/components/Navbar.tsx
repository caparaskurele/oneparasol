"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/knowledge_hub", label: "Knowledge Hub" },
  { href: "/curated_insights", label: "Curated Insights" },
  { href: "/offerings", label: "Offerings" },
  { href: "/useful_links", label: "Useful Links" },
];

export function Navbar() {
  return (
    <header className="w-full bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm">
      <div className="site-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.svg" alt="One Parasol" width={36} height={36} />
          <span className="font-semibold text-lg">One Parasol</span>
        </Link>

        {/* nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
