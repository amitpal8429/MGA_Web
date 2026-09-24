/*const BASE_URL = "https://24x7.medicalglobalacademy.com/api";

async function getJSON(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}*/

/** GET /course-list — all published programs */
/*export function fetchCourseList() {
  return getJSON(`${BASE_URL}/course-list`);
}*/

/** GET /course-details/{slug} — full detail for a single program */
/*export function fetchCourseDetails(slug) {
  return getJSON(`${BASE_URL}/course-details/${encodeURIComponent(slug)}`);
}*/

/** GET /faculty-list — teaching faculty roster */
/*export function fetchFacultyList() {
  return getJSON(`${BASE_URL}/faculty-list`);
}

export { BASE_URL };
*/
const BASE_URL = "https://medicalglobalacademy.com/wp-json/mga/v1";
const WP_BASE = "https://medicalglobalacademy.com/wp-json/wp/v2";

async function getJSON(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function fetchCourseList() {
  return getJSON("https://24x7.medicalglobalacademy.com/api/course-list");
}

export function fetchCourseDetails(slug) {
  return getJSON(`https://24x7.medicalglobalacademy.com/api/course-details/${encodeURIComponent(slug)}`);
}

export function fetchFacultyList() {
  return getJSON("https://24x7.medicalglobalacademy.com/api/faculty-list");
}

async function getJSONWithMeta(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || 1);
  const total = Number(res.headers.get("X-WP-Total") || 0);
  return { data: await res.json(), totalPages, total };
}

export function fetchPosts({ page = 1, perPage = 9, search = "" } = {}) {
  const params = new URLSearchParams({
    _embed: "1",
    per_page: String(perPage),
    page: String(page),
  });
  if (search) params.set("search", search);
  return getJSONWithMeta(`${WP_BASE}/posts?${params.toString()}`);
}

export async function fetchPostBySlug(slug) {
  const { data } = await getJSONWithMeta(
    `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  return data[0] || null;
}

export { BASE_URL, WP_BASE };