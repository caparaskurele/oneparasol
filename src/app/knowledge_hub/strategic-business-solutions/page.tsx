import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  {
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    desc: "Practical guidance on M&A strategy, valuation and integration.",
  },
  {
    slug: "business-valuation",
    title: "Business Valuation",
    desc: "Methods and frameworks to value companies across stages.",
  },
  {
    slug: "startup-sparks",
    title: "Startup Sparks",
    desc: "Early-stage tactics: product-market fit, growth, and funding.",
  },
  {
    slug: "global-growth-exports",
    title: "Global Growth & Exports",
    desc: "Market entry, compliance and scaling internationally.",
  },
  {
    slug: "business-strategies",
    title: "Business Strategies",
    desc: "Strategy design, operationalization and sustaining advantage.",
  },
];

export default function StrategicBusinessSolutions() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Strategic Business Solutions</h1>

          <p className="mb-6 text-gray-700">
            Sharpen your edge in an ever-evolving business landscape. This category is crafted for founders,
            executives, consultants, and anyone navigating the complex world of enterprise growth. From
            billion-dollar mergers to nimble startup pivots, each sub-category offers actionable insights,
            practical frameworks, and in-depth analysis.
          </p>

          {/* Subpage cards with clickable headings */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/strategic-business-solutions/${s.slug}`}
                className="group block border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
              >
                <h3 className="text-lg font-semibold text-indigo-700 group-hover:underline">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </section>
        </div>

        {/* Right: image / visual */}
        <aside className="w-full">
          <div className="rounded-lg overflow-hidden shadow">
            <Image
              src="/img/strategic-business-solutions.png"
              alt="Strategic Business Solutions"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Also show headings as clickable list for accessibility */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sub-sections</h3>
            <div className="flex flex-col gap-2">
              {SUBPAGES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/knowledge_hub/strategic-business-solutions/${s.slug}`}
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