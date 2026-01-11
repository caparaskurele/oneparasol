const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Ensure public/img directory exists
const imgDir = path.join(__dirname, "..", "public", "img");
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function createGradientImage(filename, color1, color2, text) {
  // Create SVG with gradient and text - escape special characters
  const escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = Buffer.from(`
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(${color1[0]},${color1[1]},${color1[2]});stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(${color2[0]},${color2[1]},${color2[2]});stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#grad1)"/>
  <text x="400" y="200" font-family="Arial" font-size="52" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${escapedText}
  </text>
</svg>`);

  await sharp(svg).png().toFile(path.join(imgDir, filename));
  console.log(`✓ ${filename} created`);
}

async function generateAllImages() {
  try {
    // Python images (Violet theme - RGB: 139,92,246 to 196,181,253)
    await createGradientImage("python-basics.png", [139, 92, 246], [196, 181, 253], "🐍 Python Basics");
    await createGradientImage("python-control-flow.png", [139, 92, 246], [196, 181, 253], "⚡ Control Flow");
    await createGradientImage("python-collections.png", [139, 92, 246], [196, 181, 253], "📦 Collections");
    await createGradientImage("python-dict-sets.png", [139, 92, 246], [196, 181, 253], "🔑 Dicts & Sets");
    await createGradientImage("python-functions.png", [139, 92, 246], [196, 181, 253], "🔧 Functions");
    await createGradientImage("python-oop.png", [139, 92, 246], [196, 181, 253], "🏗️ OOP");
    await createGradientImage("python-numpy.png", [139, 92, 246], [196, 181, 253], "📊 NumPy");
    await createGradientImage("python-pandas.png", [139, 92, 246], [196, 181, 253], "🐼 Pandas");
    await createGradientImage("python-requests.png", [139, 92, 246], [196, 181, 253], "🌐 API Requests");

    // SQL images (Blue theme - RGB: 37,99,235 to 147,197,253)
    await createGradientImage("sql-basics.png", [37, 99, 235], [147, 197, 253], "🗄️ SQL Basics");
    await createGradientImage("sql-functions.png", [37, 99, 235], [147, 197, 253], "📈 Aggregate");
    await createGradientImage("sql-joins.png", [37, 99, 235], [147, 197, 253], "🔗 JOIN Ops");
    await createGradientImage("sql-subqueries.png", [37, 99, 235], [147, 197, 253], "🎯 Subqueries");
    await createGradientImage("sql-design.png", [37, 99, 235], [147, 197, 253], "🏛️ Schema");
    await createGradientImage("sql-advanced.png", [37, 99, 235], [147, 197, 253], "🚀 Advanced");

    // Excel images (Green theme - RGB: 34,197,94 to 134,239,172)
    await createGradientImage("excel-basics.png", [34, 197, 94], [134, 239, 172], "📊 Excel Basics");
    await createGradientImage("excel-formulas.png", [34, 197, 94], [134, 239, 172], "✏️ Formulas");
    await createGradientImage("excel-analysis.png", [34, 197, 94], [134, 239, 172], "🔬 Analysis");
    await createGradientImage("excel-charts.png", [34, 197, 94], [134, 239, 172], "📈 Charts");

    // Power BI images (Amber theme - RGB: 217,119,6 to 252,191,73)
    await createGradientImage("powerbi-basics.png", [217, 119, 6], [252, 191, 73], "📊 Power BI");
    await createGradientImage("powerbi-modeling.png", [217, 119, 6], [252, 191, 73], "🔗 Modeling");
    await createGradientImage("powerbi-dax.png", [217, 119, 6], [252, 191, 73], "📐 DAX");
    await createGradientImage("powerbi-dashboards.png", [217, 119, 6], [252, 191, 73], "🎯 Dashboards");

    // Data Scientist main image
    await createGradientImage("data-scientist.png", [99, 102, 241], [139, 92, 246], "👨‍💻 Data Science");

    console.log("\n✅ All 23 images generated successfully!");
    console.log(`📁 Location: ${imgDir}`);
  } catch (error) {
    console.error("❌ Error generating images:", error);
    process.exit(1);
  }
}

generateAllImages();
