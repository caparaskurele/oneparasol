import Image from "next/image";
import Link from "next/link";

export default function SoulAndStories() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">← Back to Knowledge Hub</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: full content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Soul &amp; Stories</h1>

          <p className="mb-4 text-gray-700">
            A home for the heart and imagination where depth meets delight. Soul &amp; Stories is a sanctuary for the reflective, the imaginative,
            and the culturally curious. It blends rich narratives with soulful reflections. From the sensory adventures of Travel &amp; Food to the
            lyrical beauty of Poetry World, this space invites you to slow down and savor.
          </p>

          <section className="space-y-4">
            <article>
              <h2 className="text-xl font-semibold mb-2">Travel &amp; Food</h2>
              <p className="text-gray-700">
                Knowledge isn&apos;t just numbers and strategy – it&apos;s also culture and flavor. This section offers travelogues, hidden gem reviews,
                street food discoveries, and curated guides. It&apos;s about exploring the world with curiosity, whether you&apos;re backpacking solo or indulging
                in culinary heritage with family.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Poetry World</h2>
              <p className="text-gray-700">
                A celebration of verse and voice. Words have the power to heal, inspire, and express the unspoken. In this creative haven, you&apos;ll find famous
                and moving poetry across genres – motivational, nature-inspired, awakening, romantic, philosophical and more.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Mythological Stories</h2>
              <p className="text-gray-700">
                Step into the mythic past to understand the present. Mythological Stories brings ancient epics, folk tales, and sacred narratives to life –
                exploring their symbolic meanings, cultural layers, and modern-day relevance.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Soulful Living</h2>
              <p className="text-gray-700">
                Mindful routines, rituals, and reflections for modern living. Reclaim depth and presence in a fast-moving world. Soulful Living is a gentle
                invitation to live with intention, awareness, and grace.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Tales Unbound</h2>
              <p className="text-gray-700">
                Welcome to the boundless world of storytelling. Tales Unbound is a literary playground where fiction, memoir, fantasy, and sensuality meet without
                rules or restrictions.
              </p>
            </article>
          </section>
        </div>

        {/* Right: image */}
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
        </aside>
      </div>
    </main>
  );
}