import Image from "next/image";
import Link from "next/link";

export default function StrategicBusinessSolutions() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">← Back to Knowledge Hub</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: full content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Strategic Business Solutions</h1>

          <p className="mb-4 text-gray-700">
            Sharpen your edge in an ever-evolving business landscape. This category is crafted for founders,
            executives, consultants, and anyone navigating the complex world of enterprise growth. From
            billion-dollar mergers to nimble startup pivots, each sub-category offers actionable insights,
            practical frameworks, and in-depth analysis.
          </p>

          <section className="space-y-4">
            <article>
              <h2 className="text-xl font-semibold mb-2">Mergers &amp; Acquisitions</h2>
              <p className="text-gray-700">
                M&amp;As are not just transactions, they are transformative moments in the lifecycle of companies.
                Explore the dynamics of corporate unions - due diligence, deal structuring, integration planning,
                valuations, cultural synergy, and post-merger challenges. Ideal for business decision-makers,
                analysts, and advisors.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Business Valuation</h2>
              <p className="text-gray-700">
                Understanding how to value a business is crucial whether you&apos;re an investor, a founder, or a stakeholder.
                Here, you&apos;ll find breakdowns of valuation models like DCF, comparables, and asset-based approaches,
                explained with clarity and context. You’ll also learn how market trends, intellectual property, and even
                human capital contribute to enterprise worth. We also cover the valuation strategies for startups, SMEs,
                and large enterprises.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Startup Sparks</h2>
              <p className="text-gray-700">
                For early-stage entrepreneurs, this is where ideas take flight. The section explores ideation, market validation,
                funding options, pitch crafting, and sustainable growth strategies. It also features success stories, startup
                checklists, and interviews with founders who’ve turned sparks into raging fires of innovation. From MVP
                development to product-market fit, funding pitches to growth hacking, raising debt to equity, this sub-category
                is brimming with ideas and energy.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Global Growth &amp; Exports</h2>
              <p className="text-gray-700">
                A resource for businesses expanding beyond borders. Learn about international trade, export regulations, market
                entry strategies, global supply chains, and cross-cultural business practices. India’s export ecosystem is booming,
                and this section is tailored to help businesses tap into international markets. Topics include export compliance,
                trade financing, documentation processes, market selection, and government incentives. It’s especially useful for
                MSMEs and D2C brands looking to expand their footprint globally.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Business Strategies</h2>
              <p className="text-gray-700">
                This is your strategic war room. Competitive positioning, business model innovation, risk mitigation, customer retention,
                corporate governance, operational efficiency and digital transformation insights await here. You’ll find frameworks like
                SWOT, PESTLE, Porter’s Five Forces, and Blue Ocean Strategy - made simple, applicable, and impactful.
              </p>
            </article>
          </section>
        </div>

        {/* Right: image */}
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
        </aside>
      </div>
    </main>
  );
}