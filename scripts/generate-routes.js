// scripts/generate-routes.js
// Build se PEHLE chalta hai: API se saare course slugs laata hai aur
// package.json ke andar "reactSnap.include" list bana deta hai,
// taaki react-snap ko pata ho konse konse routes crawl/prerender karne hain.

const fs = require("fs");
const path = require("path");

// 👇 Apna asli courses-list API endpoint
const API_URL = "https://24x7.medicalglobalacademy.com/api/course-list";

async function generateRoutes() {
  console.log("Fetching course list for prerender routes...");

  let courses = [];
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const json = await res.json();

    // API response ka format alag ho sakta hai — dono common cases handle kiye:
    // 1) seedha array: [ {...}, {...} ]
    // 2) wrapped: { data: [ {...}, {...} ] }  ya  { courses: [ {...} ] }
    if (Array.isArray(json)) {
      courses = json;
    } else if (Array.isArray(json.data)) {
      courses = json.data;
    } else if (Array.isArray(json.courses)) {
      courses = json.courses;
    } else {
      console.warn("⚠️  Course list ka format pehchana nahi gaya. Response:", JSON.stringify(json).slice(0, 300));
    }
  } catch (err) {
    console.error("⚠️  Could not fetch courses list:", err.message);
    console.error("   Static routes ke sath hi build hoga (courses list skip).");
  }

  // Static/known routes — apne app ke hisaab se yahan add/remove karo
  const staticRoutes = ["/", "/courses"];

  // API se mile courses ke slug se route banao
  // ⚠️ "c.slug" field ka naam confirm kar lena — agar API me field ka naam
  //    "slug" ki jagah kuch aur hai (jaise "url_slug", "course_slug"), yahan badal dena.
  const courseRoutes = (courses || [])
    .map((c) => c.slug)
    .filter(Boolean)
    .map((slug) => `/${slug}`);

  const allRoutes = [...new Set([...staticRoutes, ...courseRoutes])];

  const pkgPath = path.resolve(__dirname, "../package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  pkg.reactSnap = {
    ...(pkg.reactSnap || {}),
    source: "dist", // Vite ke liye "dist"; agar CRA hai to "build" karo
    include: allRoutes,
  };

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`✅ ${allRoutes.length} routes package.json me likh diye gaye.`);
}

generateRoutes();