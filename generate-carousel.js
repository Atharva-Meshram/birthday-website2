// Scans Assets/carousel/ and writes carousel-images.json.
// Run locally: node generate-carousel.js
// Netlify build command: node generate-carousel.js
const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "Assets", "carousel");
const output = path.join(__dirname, "carousel-images.json");
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
const images = fs.readdirSync(folder, { withFileTypes: true })
  .filter((item) => item.isFile())
  .map((item) => item.name)
  .filter((name) => extensions.has(path.extname(name).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
fs.writeFileSync(output, JSON.stringify(images, null, 2) + "\n", "utf8");
console.log(`Generated carousel-images.json with ${images.length} image(s).`);
