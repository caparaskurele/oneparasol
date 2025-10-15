import Image from "next/image";
import Link from "next/link";

export default function CareerGrowthGrid() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">← Back to Knowledge Hub</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: full content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Career Growth Grid</h1>

          <p className="mb-4 text-gray-700">
            Advance your career with skills, insights, and strategic direction. Navigate your professional journey with clarity,
            purpose, and confidence. Career Growth Grid offers practical insights, strategic tools, and future-ready skills to help
            you grow, adapt, and thrive in today’s evolving workplace.
          </p>

          <section className="space-y-4">
            <article>
              <h2 className="text-xl font-semibold mb-2">FP&A</h2>
              <p className="text-gray-700">
                Master the nuances of Financial Planning & Analysis. This area is where finance meets forecasting. FP&A professionals
                and learners can delve into budgeting models, scenario analysis, performance dashboards, variance reports, and more. Case
                studies and Excel templates are frequently shared to help users understand how to build data-driven financial strategies.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Data Scientist</h2>
              <p className="text-gray-700">
                Dive into the world of data analytics, AI, and machine learning. From beginners to advanced coders, this section provides practical
                walkthroughs for data modeling, Python scripts, machine learning, and dashboarding with tools like Power BI and Tableau.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Career Growth</h2>
              <p className="text-gray-700">
                This section dives into smart strategies to elevate your professional journey - whether you&apos;re aiming for a promotion,
                considering a lateral move, or stepping into leadership. Discover how to build your personal brand, seek the right mentors,
                craft compelling resumes, and navigate transitions with confidence.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Human Skills</h2>
              <p className="text-gray-700">
                In a world driven by technology, it&apos;s human connection that sets professionals apart. Learn to communicate with impact,
                lead with empathy, master emotional intelligence, and collaborate effectively across teams and cultures.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold mb-2">Learning Lab</h2>
              <p className="text-gray-700">
                Welcome to your lifelong learning zone. Learning Lab is where curiosity meets career development through practical resources
                and inspiration. Explore book reviews, deep dives into cognitive science, top online course picks, and productivity hacks
                to sharpen your mind and skills.
              </p>
            </article>
          </section>
        </div>

        {/* Right: image */}
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
        </aside>
      </div>
    </main>
  );
}