/**
 * Creates content/knowledge-hub/<main>/<sub>/article-1.md and article-2.md
 * for all 20 subtopics. Safe to run multiple times (won't overwrite existing files).
 *
 * Usage:
 *   node ./scripts/scaffold-knowledge-hub.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CONTENT_ROOT = path.join(ROOT, "content", "knowledge-hub");

const HUB = [
  {
    main: "strategic-business-solutions",
    title: "Strategic Business Solutions",
    subs: [
      { slug: "mergers-acquisitions", title: "Mergers & Acquisitions" },
      { slug: "business-valuation", title: "Business Valuation" },
      { slug: "startup-sparks", title: "Startup Sparks" },
      { slug: "global-growth-exports", title: "Global Growth & Exports" },
      { slug: "business-strategies", title: "Business Strategies" },
    ],
  },
  {
    main: "money-markets-mandates",
    title: "Investments, NRIs & Legal",
    subs: [
      { slug: "value-investing", title: "Value Investing" },
      { slug: "real-estate-playbook", title: "Real Estate Playbook" },
      { slug: "cross-border-wealth-nris", title: "Cross-Border Wealth & NRIs" },
      { slug: "alternative-investments", title: "Alternative Investments" },
      { slug: "legal-awareness", title: "Legal Awareness" },
    ],
  },
  {
    main: "career-growth-grid",
    title: "Career Growth Grid",
    subs: [
      { slug: "fp-and-a", title: "FP&A" },
      { slug: "data-scientist", title: "Data Scientist" },
      { slug: "career-growth", title: "Career Growth" },
      { slug: "human-skills", title: "Human Skills" },
      { slug: "learning-lab", title: "Learning Lab" },
    ],
  },
  {
    main: "soul-and-stories",
    title: "Soul & Stories",
    subs: [
      { slug: "travel-and-food", title: "Travel & Food" },
      { slug: "poetry-world", title: "Poetry World" },
      { slug: "mythological-stories", title: "Mythological Stories" },
      { slug: "soulful-living", title: "Soulful Living" },
      { slug: "tales-unbound", title: "Tales Unbound" },
    ],
  },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeIfNotExists(file, content) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content, "utf8");
    console.log("Created:", path.relative(ROOT, file));
  } else {
    console.log("Exists:", path.relative(ROOT, file));
  }
}

ensureDir(CONTENT_ROOT);

HUB.forEach((cat) => {
  const mainDir = path.join(CONTENT_ROOT, cat.main);
  ensureDir(mainDir);
  cat.subs.forEach((s) => {
    const subDir = path.join(mainDir, s.slug);
    ensureDir(subDir);

    // create index.md (summary) if not exists
    const indexMd = path.join(subDir, "index.md");
    const indexContent = `---
title: "${s.title}"
description: "Overview of ${s.title}"
image: "/img/${cat.main}.png"
---
# ${s.title}

(Replace this paragraph with the full sub-topic overview.)

`;
    writeIfNotExists(indexMd, indexContent);

    // create two placeholder article files
    for (let i = 1; i <= 2; i++) {
      const articleFile = path.join(subDir, `article-${i}.md`);
      const articleContent = `---
title: "${s.title} — Article ${i}"
date: "${new Date().toISOString()}"
slug: "article-${i}"
---
# ${s.title} — Article ${i}

Write the ${i === 1 ? "first" : "second"} 2000-word article here. This is a placeholder.
`;
      writeIfNotExists(articleFile, articleContent);
    }
  });
});

console.log("\nScaffolding complete. Review content/knowledge-hub to edit files.");
