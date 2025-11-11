import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function CentralSchemesIndex() {
  const dir = path.join(process.cwd(), "content", "knowledge-hub", "government-benefits-public-schemes", "central-government-schemes");
  if (!fs.existsSync(dir)) return notFound();

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));
  const articles = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data?.title || slug,
      image: data?.image || "/img/central-government-schemes.png",
      desc: data?.description || "",
    };
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href="/knowledge_hub/government-benefits-public-schemes" className="text-sm text-indigo-600 hover:underline">
          ← Back to Government Benefits
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Central Government Schemes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((a) => (
          <Link key={a.slug} href={`/knowledge_hub/government-benefits-public-schemes/central-government-schemes/${a.slug}`} className="group block border rounded-lg overflow-hidden bg-white">
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