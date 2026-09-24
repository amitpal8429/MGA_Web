// src/lib/courseMeta.js
// Har course slug ke liye manual SEO title & description.
// Yahan entry na ho to component apne aap course.name/description se bana lega (fallback).
//
// Title: ~55-60 characters ke andar rakhna best hai (Google truncate kar deta hai zyada lamba).
// Description: ~120-160 characters ideal.

const COURSE_META = {
  "fellowship-in-embryology": {
    title: "Fellowship in Embryology | Medical Global Academy",
    description:
      "training in IVF lab techniques, embryo grading & handling. 12-month fellowship for MBBS/MD doctors and embryologists.",
  },
  "certificate-in-diabetes-mellitus-management": {
    title: "Certificate in Diabetes Management | MGA",
    description:
      "Master modern insulin regimens, GLP-1 analogues, SGLT-2 inhibitors & CGM technology in this 3-month certificate program.",
  },
  // 👇 Yahan naya course add karna ho to isi pattern me daal do:
  // "course-slug-yahan": {
  //   title: "Custom title yahan",
  //   description: "Custom description yahan",
  // },
};

export function getCourseMeta(slug) {
  return COURSE_META[slug] || null;
}

export default COURSE_META;