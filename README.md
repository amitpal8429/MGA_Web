# Medical Global Academy — Course Catalog Website

A React (Vite) site for **Medical Global Academy**, built on top of the three
live APIs you provided:

- `GET /api/course-list` — all programs, used on Home and the catalog page
- `GET /api/course-details/{slug}` — full detail for one program, loaded on
  `/course/:slug` — clicking any course card navigates here and the URL slug
  changes to match the course (real client-side routing, shareable/bookmarkable
  links, works with browser back/forward)
- `GET /api/faculty-list` — the faculty directory page

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # to sanity-check the production build locally
```

The static output lands in `dist/` — deploy that folder to any static host
(Netlify, Vercel, S3 + CloudFront, GitHub Pages, your own Nginx, etc).

## Pages

| Route             | Description                                              |
|--------------------|-----------------------------------------------------------|
| `/`                | Hero, live stats, featured programs, specialities, faculty teaser |
| `/courses`         | Full catalog — search, filter by program type / speciality, grouped by category. Supports `?q=`, `?type=`, `?category=` query params |
| `/course/:slug`    | Dynamic program detail — description, highlights, what you'll learn, curriculum accordion, workshop, sticky "apply" sidebar with fee/duration/intake |
| `/faculty`         | Faculty directory grouped by department, with search        |

## Notes on the data

- The course images only ship as bare filenames from the API (no full URL),
  so `src/components/CourseImage.jsx` tries a handful of likely storage paths
  on your domain and falls back to a generated colour tile with the course's
  initials if none resolve. Once you confirm the real asset host/path, update
  the `candidatesFor()` list in that file (or just put the correct one first).
- Descriptions in the API contain raw `\r\n` and double-spaces; `cleanText()`
  in `src/lib/format.js` normalises that before rendering.
- If the browser ever blocks the API with a CORS error, either enable CORS
  for your frontend's origin on the API, or run through the dev proxy already
  wired up in `vite.config.js` (point `BASE_URL` in `src/lib/api.js` at `/api`
  while running `npm run dev`).

## Design

Styled to match the layout language of doctyn.com — top announcement bar,
rounded course cards with duration/type pills, a feature-icon grid, testimonial
cards and an FAQ accordion — while keeping Medical Global Academy's own colour
palette (navy/blue/teal with a coral CTA) and content, all driven live by the
three APIs above instead of hard-coded copy.

## Structure

```
src/
  lib/api.js          fetch helpers for the three endpoints
  lib/format.js        currency/date/text formatting helpers
  components/           Navbar, Footer, CourseRow, CourseImage, skeletons, error state
  pages/                Home, Courses, CourseDetail, Faculty, NotFound
  index.css             design tokens + base styles
  site.css              component styles
```
