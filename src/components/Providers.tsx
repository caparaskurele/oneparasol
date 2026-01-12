"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { Analytics } from "@vercel/analytics/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Navbar />
        {children}
        <Analytics />
        <Footer />
        <PopupWidget />
      </ThemeProvider>
    </SessionProvider>
  );
}