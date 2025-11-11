import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  { slug: "central-government-schemes", title: "Central Government Schemes", desc: "Overview of major central schemes and how to apply." },
  { slug: "state-government-schemes", title: "State Government Schemes", desc: "State-level programs and eligibility checks." },
  { slug: "tax-rebates-incentives", title: "Tax Rebates & Incentives", desc: "Tax benefits, rebates and incentives for citizens and small businesses." },
  { slug: "social-security-benefits", title: "Social Security Benefits", desc: "Pensions, disability benefits and safety-net programs." },
  { slug: "application-guides-eligibility", title: "Application Guides & Eligibility", desc: "Step-by-step application guides and documents required." },
];

export default function GovBenefitsLanding() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Government Benefits & Public Schemes</h1>
          <p className="mb-6 text-gray-700">
            A curator of central and state government schemes, tax rebates, social security programs and step-by-step application guides.
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/government-benefits-public-schemes/${s.slug}`}
                className="group block border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
              >
                <h3 className="text-lg font-semibold text-indigo-700 group-hover:underline">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </section>
        </div>

        <aside>
          <div className="rounded-lg overflow-hidden shadow">
            <Image src="/img/gov-benefits-section.png" alt="Government Benefits" width={1200} height={900} className="w-full h-auto object-cover" priority />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sub-sections</h3>
            <div className="flex flex-col gap-2">
              {SUBPAGES.map((s) => (
                <Link key={s.slug} href={`/knowledge_hub/government-benefits-public-schemes/${s.slug}`} className="text-sm text-indigo-600 hover:underline">
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