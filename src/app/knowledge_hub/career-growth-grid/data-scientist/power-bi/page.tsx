import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCard } from "@/components/ImageCard";

interface Resource {
  name: string;
  link: string;
  type: "pdf" | "colab" | "video" | "article";
}

interface Article {
  slug: string;
  title: string;
  image: string;
  desc: string;
  resources: Resource[];
}

interface CategoryData {
  id: string;
  name: string;
  articles: Article[];
}

const CATEGORIES = [
  { id: "fundamentals", name: "Power BI Fundamentals" },
  { id: "data-modeling", name: "Data Modeling" },
  { id: "dax-formulas", name: "DAX Formulas" },
  { id: "dashboards-reports", name: "Dashboards & Reports" },
];

async function getArticlesForCategory(categoryId: string): Promise<Article[]> {
  const dir = path.join(
    process.cwd(),
    "content",
    "knowledge-hub",
    "career-growth-grid",
    "data-scientist",
    "power-bi",
    categoryId
  );

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));

  return files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data?.title || slug,
      image: data?.image || "/img/powerbi-default.png",
      desc: data?.description || "",
      resources: data?.resources || [],
    };
  });
}

export default async function PowerBIPage() {
  const powerbiBiDir = path.join(
    process.cwd(),
    "content",
    "knowledge-hub",
    "career-growth-grid",
    "data-scientist",
    "power-bi"
  );

  if (!fs.existsSync(powerbiBiDir)) {
    return notFound();
  }

  const categoriesData: CategoryData[] = await Promise.all(
    CATEGORIES.map(async (category) => ({
      id: category.id,
      name: category.name,
      articles: await getArticlesForCategory(category.id),
    }))
  );

  const resourceIcons: { [key: string]: string } = {
    pdf: "📄",
    colab: "🔬",
    video: "🎥",
    article: "📚",
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Navigation */}
      <nav className="mb-6">
        <Link
          href="/knowledge_hub/career-growth-grid"
          className="text-sm text-amber-600 hover:underline"
        >
          ← Back to Career Growth Grid
        </Link>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ⚡ Master Power BI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Build professional business intelligence dashboards and reports.
          Learn data modeling, DAX calculations, and interactive visualizations for enterprise analytics.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="space-y-12">
        {categoriesData.map((category) => (
          <section key={category.id} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {category.name}
            </h2>

            {category.articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <div
                    key={article.slug}
                    className="group block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
                  >
                    {/* Article Image */}
                    <div className="h-48 relative bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900">
                      <ImageCard src={article.image} alt={article.title} />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 group-hover:underline mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {article.desc}
                      </p>

                      {/* Resources Available */}
                      {article.resources && article.resources.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                            Resources:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {article.resources.map((resource, ridx) => (
                              <a
                                key={ridx}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={resource.name}
                                className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                              >
                                {resourceIcons[resource.type] || "📎"}{" "}
                                {resource.type}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Read Full Article Link */}
                      <Link
                        href={`/knowledge_hub/career-growth-grid/data-scientist/power-bi/${category.id}/${article.slug}`}
                        className="inline-block mt-4 text-amber-600 dark:text-amber-400 hover:underline text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No articles available in this category yet.
              </p>
            )}
          </section>
        ))}
      </div>

      {/* Download Section */}
      <section className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📥 Download Sample Files
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Download sample Power BI files, datasets, and pre-built dashboard templates to learn from real examples.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://example.com/sample-report.pbix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            📊 Sample Report
          </a>
          <a
            href="https://example.com/sample-dataset.xlsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
          >
            📈 Sample Dataset
          </a>
        </div>
      </section>
    </main>
  );
}
