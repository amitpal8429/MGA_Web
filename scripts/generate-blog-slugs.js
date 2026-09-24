// scripts/generate-blog-slugs.js
// Build se PEHLE chalta hai: WordPress REST API se SAARE blog posts ke slugs
// fetch karta hai (pagination handle karta hai, chahe 1000+ posts ho) aur
// src/lib/blogSlugs.generated.json me save kar deta hai.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ⚠️ CONFIRM KARO: ye tumhara asli WordPress REST API base hai ya nahi.
// Standard WordPress pattern: https://yoursite.com/wp-json/wp/v2/posts
const WP_API_BASE = "https://medicalglobalacademy.com/wp-json/wp/v2/posts";
const PER_PAGE = 100; // WordPress ka max allowed per_page

async function fetchAllBlogSlugs() {
  console.log("Fetching ALL blog post slugs (WordPress REST API)...");

  let allSlugs = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const res = await fetch(
        `${WP_API_BASE}?per_page=${PER_PAGE}&page=${page}&_fields=slug`
      );

      if (!res.ok) {
        // Agar page range se bahar chala gaya, WP 400 deta hai — loop khatam karo
        if (res.status === 400 && page > 1) break;
        throw new Error(`API returned ${res.status} on page ${page}`);
      }

      const posts = await res.json();
      const slugs = posts.map((p) => p.slug).filter(Boolean);
      allSlugs.push(...slugs);

      // WordPress response headers se total pages milta hai
      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : page;

      console.log(`  Page ${page}/${totalPages} — ${slugs.length} posts mile`);
      page++;
    } while (page <= totalPages);
  } catch (err) {
    console.error("⚠️  Could not fetch blog posts:", err.message);
    console.error("   WP_API_BASE URL sahi hai ya check karo:", WP_API_BASE);
  }

  allSlugs = [...new Set(allSlugs)]; // duplicates hatao

  const outDir = path.resolve(__dirname, "../src/lib");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, "blogSlugs.generated.json");
  fs.writeFileSync(outPath, JSON.stringify(allSlugs, null, 2) + "\n");

  console.log(`✅ ${allSlugs.length} blog slugs save kiye → src/lib/blogSlugs.generated.json`);
  return allSlugs;
}

fetchAllBlogSlugs();