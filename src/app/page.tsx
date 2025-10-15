import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import Image from "next/image";
import Link from "next/link";

import { benefitOne, benefitTwo } from "@/components/data";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white">
            One place for knowledge and services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
            One Parasol is a website for Finance, Law and Taxation where blogs regarding
            these shall be published regularly apart from the relevant services.
          </p>

          <div className="flex gap-4 items-center mt-4">
            <Link
              href="/offerings"
              className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              View Offerings
            </Link>
            <Link
              href="/knowledge_hub"
              className="text-indigo-600 dark:text-indigo-300 hover:underline"
            >
              Knowledge Hub
            </Link>
          </div>
        </div>

        {/* Right: hero image from public/img/hero.png */}
        <div className="w-full flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-lg">
            <Image
              src="/img/hero.png"
              alt="One Parasol hero"
              width={900}
              height={900}
              className="w-full h-auto rounded-lg object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
