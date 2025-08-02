"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "fixed w-full top-0 z-50 transition-shadow duration-300",
        scrolled ? "shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur" : "bg-white dark:bg-gray-900"
      )}
    >
      {({ open }) => (
        <>
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/">
              <span className="flex items-center space-x-2 text-xl font-medium text-indigo-500 dark:text-gray-100">
                <Image src="/img/logo.png" alt="One Parasol" width={32} height={32} className="w-8 h-8" />
                <span>One Parasol</span>
              </span>
            </Link>
            <div className="hidden xl:flex items-center space-x-5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-lg font-normal text-gray-800 no-underline dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800 px-2 py-1 rounded-md transition"
                >
                  {label}
                </Link>
              ))}
              <ThemeChanger />
            </div>
            <div className="flex items-center gap-3 ml-2 xl:hidden">
              <Disclosure.Button className="p-2 rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none dark:text-gray-300">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </Disclosure.Button>
              <ThemeChanger />
            </div>
          </div>
          <Disclosure.Panel
            static
            className={clsx(
              "xl:hidden overflow-hidden transition-all duration-300 ease-in-out",
              open ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            )}
          >
            <div className=" container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 rounded-md px-2 py-2"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
