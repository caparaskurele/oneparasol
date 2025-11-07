import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function TravelFoodIndex() {
  const dir = path.join(process.cwd(), "content", "knowledge-hub", "soul-and-stories", "travel-food");
  if (!fs.existsSync(dir)) return notFound();

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));
  const articles = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data?.title || slug,
      image: data?.image || "/img/travel-food.png",
      desc: data?.description || "",
    };
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub/soul-and-stories" className="text-sm text-indigo-600 hover:underline">
          ← Back to Soul & Stories
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Travel &amp; Food</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((a) => (
          <Link key={a.slug} href={`/knowledge_hub/soul-and-stories/travel-food/${a.slug}`} className="group block border rounded-lg overflow-hidden bg-white">
            <div className="h-48 relative">
              <Image src={a.image} alt={a.title} fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-indigo-700 group-hover:underline">{a.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}