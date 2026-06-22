import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const baseUrl = "https://abdotaher.me";
const today = new Date().toISOString().slice(0, 10);

const blogSource = readFileSync(join(root, "src/data/blogs.ts"), "utf8");
const articleMatches = blogSource.matchAll(
  /\{\s*id:\s*"([^"]+)"[\s\S]*?dateEn:\s*"([^"]+)"/g,
);

const articles = [...articleMatches].map((match) => ({
  id: match[1],
  lastmod: new Date(match[2]).toISOString().slice(0, 10),
}));

const staticPages = [
  ["", "weekly", "1.0"],
  ["en", "weekly", "0.95"],
  ["about", "monthly", "0.85"],
  ["en/about", "monthly", "0.8"],
  ["services", "monthly", "0.95"],
  ["en/services", "monthly", "0.9"],
  ["projects", "monthly", "0.9"],
  ["en/projects", "monthly", "0.85"],
  ["blogs", "weekly", "0.9"],
  ["en/blogs", "weekly", "0.85"],
  ["contact", "monthly", "0.75"],
  ["en/contact", "monthly", "0.7"],
];

const urls = [
  ...staticPages.map(([path, changefreq, priority]) => ({
    loc: path ? `${baseUrl}/${path}` : `${baseUrl}/`,
    lastmod: today,
    changefreq,
    priority,
  })),
  ...articles.flatMap((article) => [
    {
      loc: `${baseUrl}/blogs/${article.id}`,
      lastmod: article.lastmod,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/en/blogs/${article.id}`,
      lastmod: article.lastmod,
      changefreq: "monthly",
      priority: "0.75",
    },
  ]),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap);
writeFileSync(join(publicDir, "robots.txt"), robots);
