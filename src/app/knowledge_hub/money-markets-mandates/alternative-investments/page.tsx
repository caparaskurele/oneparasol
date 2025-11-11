import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  { slug: "value-investing", title: "Value Investing", desc: "Long-term equity investing frameworks and valuation discipline." },
  { slug: "real-estate-playbook", title: "Real Estate Playbook", desc: "Practical guidance on commercial & residential real estate investing." },
  { slug: "cross-border-wealth-nris", title: "Cross-Border Wealth & NRIs", desc: "Wealth planning, repatriation and NRI considerations." },
  { slug: "alternative-investments", title: "Alternative Investments", desc: "Private equity, hedge funds, commodities and alternatives." },
  { slug: "legal-awareness", title: "Legal Awareness", desc: "Key legal fundamentals for investors and wealth managers." },
];

export default function MoneyMarketsMandates() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Money, Markets &amp; Mandates</h1>
          <p className="mb-6 text-gray-700">
            Deep, practical guides on investing, wealth management and the legal/operational mandates that matter.
            Select a sub-section to explore articles and practical playbooks.
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/money-markets-mandates/${s.slug}`}
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
              src="/img/money-markets-mandates.png"
              alt="Investments, NRIs & Legal"
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
                  href={`/knowledge_hub/money-markets-mandates/${s.slug}`}
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
