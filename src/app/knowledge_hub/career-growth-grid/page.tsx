import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  { slug: "fp-a", title: "FP&A", desc: "Financial planning & analysis frameworks and career guide." },
  { slug: "data-scientist", title: "Data Scientist", desc: "Data science career paths, tools and project playbooks." },
  { slug: "career-growth", title: "Career Growth", desc: "Career frameworks, promotion playbooks and growth rhythms." },
  { slug: "human-skills", title: "Human Skills", desc: "Communication, leadership and teaming skills for professionals." },
  { slug: "learning-lab", title: "Learning Lab", desc: "Micro-courses, learning routes and upskilling tactics." },
];

export default function CareerGrowthGrid() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Career Growth Grid</h1>
          <p className="mb-6 text-gray-700">
            Practical guides and playbooks to accelerate careers in finance, data and more. Choose a sub-section to explore short
            articles, frameworks and tools tailored for working professionals.
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/career-growth-grid/${s.slug}`}
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
              src="/img/career-growth-grid.png"
              alt="Career Growth Grid"
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
                <Link key={s.slug} href={`/knowledge_hub/career-growth-grid/${s.slug}`} className="text-sm text-indigo-600 hover:underline">
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