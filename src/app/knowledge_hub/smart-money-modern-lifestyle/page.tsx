import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  { slug: "budgeting-money-hacks", title: "Budgeting & Money Hacks", desc: "Simple routines and hacks to stretch your income and save smarter." },
  { slug: "money-mindset-mental-wellness", title: "Money Mindset & Mental Wellness", desc: "Money psychology, anxiety reduction and healthier financial habits." },
  { slug: "ai-fintech-tools", title: "AI & Fintech Tools", desc: "Tools, workflows and practical AI use-cases to manage money better." },
  { slug: "automated-trading", title: "Automated Trading", desc: "Basics of automation, risk controls and practical strategy building." },
  { slug: "remote-work-geo-arbitrage", title: "Remote Work & Geo-Arbitrage", desc: "How to combine remote work with cost-of-living optimisation." },
];

export default function SmartMoneyLanding() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Smart Money, Modern Lifestyle</h1>
          <p className="mb-6 text-gray-700">
            Practical guides connecting personal finance with modern living—better budgets, healthier money psychology, helpful AI tools, automated strategies and geo-arbitrage ideas.
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/smart-money-modern-lifestyle/${s.slug}`}
                className="group block border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
              >
                <h3 className="text-lg font-semibold text-indigo-700 group-hover:underline">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </section>
        </div>

        <aside className="w-full">
          <div className="rounded-lg overflow-hidden shadow">
            <Image
              src="/img/smart-money-modern-lifestyle.png"
              alt="Smart Money, Modern Lifestyle"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Clickable sub-section links below the photo */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sub-sections</h3>
            <div className="flex flex-col gap-2">
              {SUBPAGES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/knowledge_hub/smart-money-modern-lifestyle/${s.slug}`}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}