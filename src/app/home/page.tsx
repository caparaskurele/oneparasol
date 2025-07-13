import Link from "next/link";

export default function Home() {
  const pages = [
    { name: "Value Investing", path: "/value_investing" },
    { name: "Business Valuation", path: "/business_valuation" },
    { name: "Financial Modelling", path: "/financial_modelling" },
    { name: "Startup Funding", path: "/startup_funding" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
        Welcome to One Parasol, Your One Stop for Investment, Finance, Law & Taxation Guidance.
      </h1>
      <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-12">
        Trusted insights, expert services, and real-world strategies—all in one place.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pages.map((page) => (
          <div
            key={page.path}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center"
          >
            <Link
              href={page.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {page.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}