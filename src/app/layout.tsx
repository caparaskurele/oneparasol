import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One Parasol",
  description: "One Parasol — Investment, finance, legal & taxation guidance",
  icons: {
    icon: "/img/logo.png",       // uses the image in public/img/logo.png
    apple: "/img/logo.png",      // apple touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
