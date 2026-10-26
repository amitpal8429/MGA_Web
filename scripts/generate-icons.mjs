// Ye script aapke logo ko download karke public/icons/ me 3 PNG icon bana deti hai.
// Chalane ke liye (project root se):
//   npm i -D sharp
//   node scripts/generate-icons.mjs

import sharp from "sharp";
import fs from "fs";

const LOGO_URL = "https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png";
const BG = "#ffffff";   // icon ka background. Logo light/white ho to "#0c3a6b" kar do
const OUT = "public/icons";

fs.mkdirSync(OUT, { recursive: true });

const res = await fetch(LOGO_URL);
if (!res.ok) throw new Error("Logo download nahi hua: " + res.status);
const logo = Buffer.from(await res.arrayBuffer());

// Logo ko square canvas par beech me rakhta hai. padding = kinaare ki khali jagah (0.1 = 10%)
async function make(size, name, padding) {
  const inner = Math.round(size * (1 - padding * 2));
  const resized = await sharp(logo)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(`${OUT}/${name}`);

  console.log("Bana:", `${OUT}/${name}`);
}

await make(192, "icon-192.png", 0.10);
await make(512, "icon-512.png", 0.10);
await make(512, "icon-maskable-512.png", 0.20); // maskable me zyada padding (safe zone)