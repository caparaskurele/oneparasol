"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { Analytics } from "@vercel/analytics/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Navbar />
      {children}
      <Analytics />
      <Footer />
      <PopupWidget />
    </ThemeProvider>
  );
}