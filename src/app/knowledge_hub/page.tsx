"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
	{
		slug: "smart-money-modern-lifestyle",
		title: "Smart Money & Modern Lifestyle",
		img: "/img/smart-money-modern-lifestyle.png",
		sub: [
			"Budgeting & Money Hacks",
			"Money Mindset & Mental Wellness",
			"AI & Fintech Tools",
			"Automated Trading",
			"Remote Work & Geo-Arbitrage",
		],
	},
	{
		slug: "government-benefits-public-schemes",
		title: "Government Benefits & Public Schemes",
		// changed to use the uploaded image filename
		img: "/img/government-benefits-public-schemes.png",
		sub: [
			"Central Government Schemes",
			"State Government Schemes",
			"Tax Rebates & Incentives",
			"Social Security Benefits",
			"Application Guides & Eligibility",
		],
	},
	{
		slug: "strategic-business-solutions",
		title: "Strategic Business Solutions",
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
		slug: "investments-nris-legal",
		title: "Investments, NRIs & Legal",
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
		slug: "career-growth-grid",
		title: "Career Growth Grid",
		img: "/img/career-growth-grid.png",
		sub: ["FP&A", "Data Scientist", "Career Growth", "Human Skills", "Learning Lab"],
	},
	{
		slug: "soul-and-stories",
		title: "Soul & Stories",
		img: "/img/soul-and-stories.png",
		sub: ["Travel & Food", "Poetry World", "Mythological Stories", "Soulful Living", "Tales Unbound"],
	},
];

export default function KnowledgeHubLanding(): JSX.Element {
	return (
		<main className="max-w-6xl mx-auto px-6 py-12">
			{/* HERO: two-column on large screens */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
				<section className="lg:col-span-2">
					<h1 className="text-4xl font-bold mb-4">Welcome to the Knowledge Hub</h1>
					<p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
						We believe that knowledge is the catalyst for transformation — in business, career and life.
						The Knowledge Hub is a curated ecosystem of insights, ideas, strategies and stories designed
						to empower individuals and organisations. Explore practical frameworks, expert perspectives
						and stories that spark new thinking.
					</p>

					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Why Explore the Knowledge Hub?</h2>
						<ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
							<li>Curated, not crowded: Handpicked content for clarity and relevance.</li>
							<li>Cross-disciplinary perspective: Business, finance, law, and stories in one place.</li>
							<li>Actionable wisdom: Frameworks and checklists you can use today.</li>
						</ul>
					</div>
				</section>

				<aside className="lg:col-span-1 flex justify-start">
					{/* image reduced by ~6% (from 860x640 → 808x602) and constrained via max-w */}
					<div className="rounded-lg overflow-hidden shadow-lg w-full max-w-[808px]">
						<Image
							src="/img/knowledge-hub-landing.png"
							alt="Knowledge Hub"
							width={808}
							height={602}
							className="object-cover w-full h-auto"
							priority
						/>
					</div>
				</aside>
			</div>

			{/* QUICK JUMP: full-width below hero, 3 columns on large screens */}
			<section>
				<h2 className="text-2xl font-semibold mb-4">Quick jump to categories</h2>

				<div className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.map((c) => (
							<article
								key={c.slug}
								className="flex gap-4 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
							>
								<div className="flex-shrink-0 w-20 h-28 overflow-hidden rounded border">
									<Link href={`/knowledge_hub/${c.slug}`} aria-label={c.title}>
										<Image src={c.img} alt={c.title} width={160} height={220} className="object-cover w-full h-full" />
									</Link>
								</div>

								<div className="flex-1">
									<Link href={`/knowledge_hub/${c.slug}`} className="text-lg font-semibold text-gray-900 hover:underline block">
										{c.title}
									</Link>

									<ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-inside list-disc space-y-1">
										{c.sub.map((s) => (
											<li key={s}>
												<Link href={`/knowledge_hub/${c.slug}`} className="hover:underline">
													{s}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
