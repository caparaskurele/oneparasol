import Link from "next/link";

const blog = {
  title: "Value Investing in Stock Markets",
  paragraphs: [
    "Value investing is a time-tested investment strategy that centers on purchasing stocks trading below their intrinsic value, as determined by careful fundamental analysis. This approach was pioneered by Benjamin Graham and later championed by Warren Buffett, who famously described his ideal holding period as “forever.” The core principle is to seek a margin of safety—buying securities at a significant discount to their true worth to minimize downside risk if the market remains irrational or the analysis proves imperfect.",
    "Value investors rely on a range of financial metrics, such as the price-to-earnings (P/E) ratio, price-to-book (P/B) ratio, EBIT, and EBITDA, to identify undervalued companies with strong fundamentals. They focus on businesses with consistent earnings, robust cash flows, and manageable debt levels. Sometimes, value investors also look for hidden assets—like patents or intellectual property—that are not fully reflected on the balance sheet but could drive future value.",
    "The advantages of value investing are substantial. By purchasing stocks at a discount, investors benefit from risk minimization and the potential for significant long-term returns as the market eventually recognizes the company’s true value. For example, if an investor buys a stock at ₹70 when its intrinsic value is ₹100, there is a built-in margin for profit as the price rises to reflect its real worth. Moreover, value investing encourages a disciplined, patient approach, often resulting in steady capital appreciation and dividend income over time.",
  ],
};

export default function Blogs() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Blogs</h1>
      <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">{blog.title}</h2>
        {blog.paragraphs.map((para, idx) => (
          <p key={idx} className="text-gray-700 dark:text-gray-300 mb-4">{para}</p>
        ))}
        <Link
          href="/blogs/full-article"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          Read full article
        </Link>
      </div>
    </div>
  );
}
