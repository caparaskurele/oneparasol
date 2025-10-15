"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <header className="w-full bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm">
      <div className="site-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.svg" alt="One Parasol" width={36} height={36} />
          <span className="font-semibold text-lg">One Parasol</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/offerings">Offerings</Link>
        </nav>
      </div>
    </header>
  );
}
