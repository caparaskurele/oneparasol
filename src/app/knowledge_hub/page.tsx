"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Strategic Business Solutions",
    slug: "strategic-business-solutions",
    img: "/img/strategic-business-solutions.png",
    sub: [
      "Mergers & Acquisitions",
      "Business Valuation",
      "Startup Sparks",
      "Global Growth & Exports",
      "Business Strategies",
    ],
  },
  {
    title: "Money, Markets & Mandates",
    slug: "money-markets-mandates",
    img: "/img/money-markets-mandates.png",
    sub: [
      "Value Investing",
      "Real Estate Playbook",
      "Cross-Border Wealth & NRIs",
      "Alternative Investments",
      "Legal Awareness",
    ],
  },
  {
    title: "Career Growth Grid",
    slug: "career-growth-grid",
    img: "/img/career-growth-grid.png",
    sub: ["FP&A", "Data Scientist", "Career Growth", "Human Skills", "Learning Lab"],
  },
  {
    title: "Soul & Stories",
    slug: "soul-and-stories",
    img: "/img/soul-and-stories.png",
    sub: ["Travel & Food", "Poetry World", "Mythological Stories", "Soulful Living", "Tales Unbound"],
  },
];

export default function KnowledgeHubLanding() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: long intro text */}
        <section>
          <h1 className="text-4xl font-bold mb-4">Welcome to the Knowledge Hub</h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            We believe that knowledge is the catalyst for transformation - in business, in
            career, and in life. The Knowledge Hub is more than just a content platform; it’s a
            curated ecosystem of insights, ideas, strategies, and stories designed to empower
            individuals and organizations alike. Whether you’re an entrepreneur, investor,
            career climber, spiritual seeker, or curious wanderer, this is your space to explore
            and grow.
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Why Explore the Knowledge Hub?</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Curated, not crowded: Every piece is handpicked for clarity, depth, and relevance.</li>
              <li>Cross-disciplinary appeal: Where business meets poetry, and finance meets food.</li>
              <li>Actionable wisdom: Frameworks, checklists and practical ideas you can use today.</li>
              <li>Human-centered: We speak to the person behind the role and the story behind the strategy.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">What you can do here</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Discover insights tailored to your interests</li>
              <li>Learn from industry experts and storytellers</li>
              <li>Use ideas from one field to innovate in another</li>
              <li>Recharge your career, business, and inner world</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Quick jump to categories</h2>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/knowledge_hub/${c.slug}`} className="block">
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{c.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {c.sub.join(" · ")}
                          </p>
                        </div>
                        <div className="w-20 h-12 relative">
                          <Image src={c.img} alt={c.title} fill className="object-cover rounded" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right: landing image + small note */}
        <aside>
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/img/knowledge-hub-landing.png"
              alt="Knowledge Hub landing"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>Tip:</strong> Hover the Knowledge Hub link in the top navigation to see a quick list of topics.
          </div>
        </aside>
      </div>
    </main>
  );
}
