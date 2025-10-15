import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = { params: { main: string; sub: string } };

export default async function SubPage({ params }: Props) {
  const ROOT = path.join(process.cwd(), "content", "knowledge-hub");
  const subDir = path.join(ROOT, params.main, params.sub);

  // Read index.md (overview) and list articles
  const indexPath = path.join(subDir, "index.md");
  let indexContent = "";
  try { indexContent = fs.readFileSync(indexPath, "utf8"); } catch { indexContent = "# Overview"; }
  const indexData = matter(indexContent);

  // list markdown files except index.md
  const files = fs.readdirSync(subDir).filter((f) => f.endsWith(".md") && f !== "index.md");
  const articles = files.map((f) => {
    const content = fs.readFileSync(path.join(subDir, f), "utf8");
    const data = matter(content);
    return { file: f.replace(".md", ""), title: data.data.title || data.content.split("\n")[0], excerpt: data.content.slice(0, 300) };
  });

  const imagePath = indexData.data.image || `/img/${params.main}.png`;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4"><Link href="/knowledge_hub" className="text-sm text-indigo-600 hover:underline">← Back to Knowledge Hub</Link></nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section>
          <h1 className="text-3xl font-bold mb-4">{indexData.data.title || params.sub}</h1>
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{indexData.content}</ReactMarkdown>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Articles</h2>
            <ul className="space-y-3">
              {articles.map((a) => (
                <li key={a.file}>
                  <Link href={`/knowledge_hub/${params.main}/${params.sub}/${a.file}`} className="text-indigo-600 hover:underline">
                    {a.title}
                  </Link>
                  <p className="text-sm text-gray-600">{a.excerpt.slice(0, 150)}...</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside>
          <div className="rounded-lg overflow-hidden shadow">
            <Image src={imagePath} alt={indexData.data.title || params.sub} width={1200} height={900} className="w-full h-auto object-cover" />
          </div>
        </aside>
      </div>
    </main>
  );
}