import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { main: string; sub: string; article: string } };

export default async function ArticlePage({ params }: Props) {
  const { main, sub, article } = params;
  const dir = path.join(process.cwd(), "content", "knowledge-hub", main, sub);
  const filePath = path.join(dir, `${article}.md`);

  // Ensure file exists
  if (!fs.existsSync(filePath)) return notFound();

  // Read file asynchronously
  const raw = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const title = (data?.title as string) || article;
  const description = (data?.description as string) || "";
  let image = (data?.image as string) || "/img/default-article.png";
  if (image && !image.startsWith("/")) image = `/${image.replace(/^\.?\//, "")}`;

  // Convert markdown -> HTML on server (no client renderer dependency)
  const html = marked.parse(content || "");

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="mb-4">
        <Link href={`/knowledge_hub/${main}/${sub}`} className="text-sm text-indigo-600 hover:underline">
          ← Back
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {description && <p className="text-gray-700 mb-6">{description}</p>}

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="rounded-lg overflow-hidden shadow">
              <Image src={image} alt={title} width={800} height={600} className="w-full h-auto object-cover" />
            </div>

            {description && (
              <div className="mt-4 text-sm text-gray-600">
                <strong>About this article</strong>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}