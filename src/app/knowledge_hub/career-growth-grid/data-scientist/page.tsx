import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PlatformContent {
  name: string;
  path: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
  icon: string;
  categories: Array<{
    name: string;
    articles: string[];
  }>;
}

async function getPlatformContent(platformPath: string): Promise<PlatformContent> {
  const platforms: { [key: string]: PlatformContent } = {
    python: {
      name: "Python",
      path: "python",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-900",
      borderColor: "border-violet-200 dark:border-violet-700",
      hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-800",
      icon: "🐍",
      categories: [],
    },
    sql: {
      name: "SQL",
      path: "sql",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900",
      borderColor: "border-blue-200 dark:border-blue-700",
      hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-800",
      icon: "🗄️",
      categories: [],
    },
    excel: {
      name: "Excel",
      path: "excel",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900",
      borderColor: "border-green-200 dark:border-green-700",
      hoverBg: "hover:bg-green-100 dark:hover:bg-green-800",
      icon: "📊",
      categories: [],
    },
    "power-bi": {
      name: "Power BI",
      path: "power-bi",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900",
      borderColor: "border-amber-200 dark:border-amber-700",
      hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-800",
      icon: "📈",
      categories: [],
    },
  };

  const platform = platforms[platformPath];
  if (!platform) return platform;

  const baseDir = path.join(
    process.cwd(),
    "content",
    "knowledge-hub",
    "career-growth-grid",
    "data-scientist",
    platformPath
  );

  if (!fs.existsSync(baseDir)) {
    return platform;
  }

  const categoryDirs = fs.readdirSync(baseDir).filter((f) => {
    const stat = fs.statSync(path.join(baseDir, f));
    return stat.isDirectory();
  });

  platform.categories = categoryDirs
    .map((cat) => {
      const catPath = path.join(baseDir, cat);
      const articleFiles = fs.readdirSync(catPath).filter((f) => /\.(md|mdx)$/.test(f));
      return {
        name: cat
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        articles: articleFiles.map((f) => f.replace(/\.(md|mdx)$/, "")),
      };
    });

  return platform;
}

export default async function DataScientistHub() {
  const pythonContent = await getPlatformContent("python");
  const sqlContent = await getPlatformContent("sql");
  const excelContent = await getPlatformContent("excel");
  const powerBiContent = await getPlatformContent("power-bi");

  const platforms = [pythonContent, sqlContent, excelContent, powerBiContent];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <nav className="mb-8">
        <Link href="/knowledge_hub/career-growth-grid" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to Career Growth Grid
        </Link>
      </nav>

      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Data Scientist Learning Hub</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          Master data science fundamentals with our comprehensive learning platform. Choose from Python, SQL, Excel, and Power BI to build your data analytics skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {platforms.map((platform) => (
          <Link
            key={platform.path}
            href={`/knowledge_hub/career-growth-grid/data-scientist/${platform.path}`}
            className={`group block p-6 rounded-xl border-2 transition-all ${platform.bgColor} ${platform.borderColor} ${platform.hoverBg} cursor-pointer`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{platform.icon}</span>
              <h2 className={`text-3xl font-bold ${platform.color}`}>{platform.name}</h2>
            </div>

            {/* Content Overview */}
            {platform.categories.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Learning Paths ({platform.categories.length})
                </h3>

                <div className="space-y-3">
                  {platform.categories.map((category, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.articles.length > 0 ? (
                          category.articles.map((article, aIdx) => (
                            <span
                              key={aIdx}
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${platform.bgColor} ${platform.color}`}
                            >
                              {article
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-gray-400">No articles yet</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      <strong className={platform.color}>
                        {platform.categories.reduce((sum, cat) => sum + cat.articles.length, 0)}
                      </strong>{" "}
                      Articles
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Content coming soon...</p>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Your Learning Journey</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900 dark:to-purple-900 p-6 rounded-lg border border-violet-200 dark:border-violet-700">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
              {pythonContent.categories.reduce((sum, cat) => sum + cat.articles.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Python Lessons</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {sqlContent.categories.reduce((sum, cat) => sum + cat.articles.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">SQL Lessons</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-6 rounded-lg border border-green-200 dark:border-green-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {excelContent.categories.reduce((sum, cat) => sum + cat.articles.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Excel Lessons</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 p-6 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {powerBiContent.categories.reduce((sum, cat) => sum + cat.articles.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Power BI Lessons</p>
          </div>
        </div>
      </div>
    </main>
  );
}