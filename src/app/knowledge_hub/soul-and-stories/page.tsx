import Link from "next/link";
import Image from "next/image";

const SUBPAGES = [
  { slug: "travel-food", title: "Travel & Food", desc: "Tales from the road and flavors that linger." },
  { slug: "poetry-world", title: "Poetry World", desc: "Short poems and craft notes for readers and writers." },
  { slug: "mythological-stories", title: "Mythological Stories", desc: "Retold myths and their modern echoes." },
  { slug: "soulful-living", title: "Soulful Living", desc: "Practical habits for presence, calm and meaning." },
  { slug: "tales-unbound", title: "Tales Unbound", desc: "Fictional short stories across moods and genres." },
];

export default function SoulAndStories() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">
          ← Back to Knowledge Hub
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Soul &amp; Stories</h1>
          <p className="mb-6 text-gray-700">
            Curated narratives, practical reflections and short fiction to nourish curiosity and calm. Choose a sub-section to read articles and stories.
          </p>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBPAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge_hub/soul-and-stories/${s.slug}`}
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
              src="/img/soul-and-stories.png"
              alt="Soul & Stories"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sub-sections</h3>
            <div className="flex flex-col gap-2">
              {SUBPAGES.map((s) => (
                <Link key={s.slug} href={`/knowledge_hub/soul-and-stories/${s.slug}`} className="text-sm text-indigo-600 hover:underline">
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