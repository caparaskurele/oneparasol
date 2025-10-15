import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { main: string; sub: string; article: string };
};

export default async function ArticlePage({ params }: Props) {
  const root = path.join(process.cwd(), "content", "knowledge-hub");
  const articlePath = path.join(root, params.main, params.sub, `${params.article}.md`);

  if (!fs.existsSync(articlePath)) {
    notFound();
  }

  const file = fs.readFileSync(articlePath, "utf8");
  const { data, content } = matter(file);

  const title = (data?.title || data?.name || params.article) as string;
  const date = (data?.date || null) as string | null;
  const imagePath =
    typeof data?.image === "string" && data.image.length > 0 ? (data.image as string) : `/img/${params.main}.png`;
  const description = (data?.description || "") as string;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href={`/knowledge_hub/${params.main}/${params.sub}`} className="text-sm text-indigo-600 hover:underline">
          ← Back
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <article>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {date && <p className="text-sm text-gray-500 mb-4">{date}</p>}
          {description && <p className="text-gray-700 mb-6">{description}</p>}

          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>

        <aside>
          <div className="rounded-lg overflow-hidden shadow">
            <Image
              src={imagePath}
              alt={title}
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