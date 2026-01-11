import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ImageCard } from "@/components/ImageCard";

interface Resource {
  name: string;
  link: string;
  type: "pdf" | "colab" | "video" | "article";
}

interface ArticleData {
  title: string;
  description: string;
  image: string;
  resources: Resource[];
  content: string;
}

const CATEGORIES = [
  { id: "fundamentals", name: "Python Fundamentals" },
  { id: "data-structures", name: "Data Structures" },
  { id: "functions-modules", name: "Functions & Modules" },
  { id: "object-oriented-programming", name: "Object-Oriented Programming" },
  { id: "libraries-numpy-pandas", name: "Libraries: NumPy & Pandas" },
  { id: "web-scraping-apis", name: "Web Scraping & APIs" },
];

async function getArticle(
  category: string,
  slug: string
): Promise<ArticleData | null> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "knowledge-hub",
    "career-growth-grid",
    "data-scientist",
    "python",
    category,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data?.title || slug,
    description: data?.description || "",
    image: data?.image || "/img/python-default.png",
    resources: data?.resources || [],
    content,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = await getArticle(params.category, params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

const resourceIcons: { [key: string]: string } = {
  pdf: "📄 PDF",
  colab: "🔬 Google Colab",
  video: "🎥 Video",
  article: "📚 Article",
};

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = await getArticle(params.category, params.slug);

  if (!article) {
    return notFound();
  }

  const categoryName =
    CATEGORIES.find((c) => c.id === params.category)?.name || params.category;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Navigation */}
      <nav className="mb-6 text-sm">
        <Link
          href="/knowledge_hub/career-growth-grid/data-scientist/python"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Python Learning
        </Link>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-gray-600 dark:text-gray-400">{categoryName}</span>
      </nav>

      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {article.description}
        </p>
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="mb-8 h-96 relative rounded-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
          <ImageCard src={article.image} alt={article.title} />
        </div>
      )}

      {/* Resources Section */}
      {article.resources && article.resources.length > 0 && (
        <div className="mb-12 p-6 bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
            📚 Resources for This Lesson
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-indigo-800 rounded-lg border border-indigo-300 dark:border-indigo-600 hover:shadow-lg transition-shadow"
              >
                <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
                  {resourceIcons[resource.type] || "📎"}
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {resource.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="prose dark:prose-invert prose-indigo max-w-none mb-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                {...props}
              />
            ),
            code: ({ node, inline, children, ...props }: any) =>
              inline ? (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-red-600 dark:text-red-400 font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code
                  className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4"
                  {...props}
                >
                  {children}
                </code>
              ),
            pre: ({ node, ...props }) => <pre {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            a: ({ node, ...props }) => (
              <a
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-indigo-600 pl-4 py-2 text-gray-600 dark:text-gray-400 italic mb-4"
                {...props}
              />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      {/* Navigation Footer */}
      <div className="flex gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/knowledge_hub/career-growth-grid/data-scientist/python"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
        >
          ← Back to All Lessons
        </Link>
        <Link
          href="/knowledge_hub/career-growth-grid/data-scientist/python/live-editor"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          💻 Try Live Editor
        </Link>
      </div>
    </main>
  );
}
