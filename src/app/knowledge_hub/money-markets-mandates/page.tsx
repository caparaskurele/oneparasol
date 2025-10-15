import Image from "next/image";
import Link from "next/link";

export default function MoneyMarketsMandates() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">← Back to Knowledge Hub</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: full content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Money, Markets &amp; Mandates</h1>

          <p className="mb-4 text-gray-700">
            Navigate the ever-evolving world of finance, investment, and economic awareness with clarity and confidence.
            This section caters to investors, financial professionals, global citizens, and anyone curious about how wealth
            flows and grows. Whether you&apos;re managing personal assets or handling large portfolios, you&apos;ll find both
            guidance and inspiration here.
          </p>

          <section className="space-y-4">
            <article>
              <h2 className="text-xl font-semibold mb-2">Value Investing</h2>
              <p className="text-gray-700">
                Inspired by the timeless principles of Benjamin Graham and Warren Buffett, this section focuses on identifying
                undervalued stocks with long-term potential. Readers learn how to analyze financial statements, assess intrinsic value,
                and build a resilient portfolio. Articles blend theory with case studies, making investing accessible even to beginners.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Real Estate Playbook</h2>
              <p className="text-gray-700">
                Real estate continues to be a trusted asset class, and this section dives deep into property investments, REITs, rental
                yields, location intelligence, property flipping, tax implications and market cycles. It also covers emerging trends like
                co-living, green buildings, commercial real estate opportunities and agricultural investments for next generations in
                tier-2 and tier-3 cities.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Cross-Border Wealth &amp; NRIs</h2>
              <p className="text-gray-700">
                Designed especially for global earners having work location freedom. Global Indians often face unique financial and legal
                challenges. Discover international taxation, repatriation strategies, NRI banking, residency rules, property rights in India
                and investment options across borders. It&apos;s a vital bridge for Indians living abroad who want to stay connected with their
                homeland financially and emotionally.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Alternative Investments</h2>
              <p className="text-gray-700">
                Step beyond the usual stocks and bonds into a world of unconventional wealth-building. Alternative Investments explores diverse,
                high-potential assets like private equity, venture capital, hedge funds, crypto-assets, art, collectibles, and more. Whether
                you&apos;re seeking portfolio diversification, inflation protection, or access to emerging markets, this section helps you
                understand the risks, rewards, and strategies behind these non-traditional investments.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Legal Awareness</h2>
              <p className="text-gray-700">
                Ignorance of law is no excuse. Law affects us all - from contracts and compliance to rights and remedies. This sub-section
                simplifies essential legal knowledge, such as consumer rights, company law, intellectual property, succession planning, and
                regulatory updates. It empowers individuals and entrepreneurs alike to operate within legal frameworks confidently.
              </p>
            </article>
          </section>
        </div>

        {/* Right: image */}
        <aside className="w-full">
          <div className="rounded-lg overflow-hidden shadow">
            <Image
              src="/img/money-markets-mandates.png"
              alt="Money Markets & Mandates"
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