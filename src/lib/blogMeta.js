// AUTO-GENERATED blog metadata map — keyed by blog slug (last URL segment).
// Each blog post's H1, keywords, meta title, canonical URL, meta description,
// featured image and tags come from this map, driven by the SEO spreadsheet.
//
// Usage: import { getBlogMeta } from "../lib/blogMeta";
//        const meta = getBlogMeta(slug);

// ---------------------------------------------------------------------------
// Helper: strip "MGA" / "Medical Global Academy" from a title string.
// Handles brand at start, end, or middle, with any common separator.
// ---------------------------------------------------------------------------
export function cleanTitle(title) {
  if (!title) return title;

  const BRAND = "(?:MGA|Medical\\s*Global\\s*Academy)";

  return title
    // Remove "| MGA", "- MGA", "– MGA", "— MGA", ": MGA", "• MGA" from end
    .replace(new RegExp(`[\\|\\-–—:•]\\s*${BRAND}\\s*$`, "gi"), "")
    // Remove "MGA |", "MGA -", "MGA –", "MGA —", "MGA :", "MGA •" from start
    .replace(new RegExp(`^\\s*${BRAND}\\s*[\\|\\-–—:•]\\s*`, "gi"), "")
    // Remove brand in middle surrounded by separators on both sides
    .replace(
      new RegExp(`\\s*[\\|\\-–—:•]\\s*${BRAND}\\s*[\\|\\-–—:•]\\s*`, "gi"),
      " | "
    )
    // Remove any leftover standalone brand word (fallback)
    .replace(new RegExp(BRAND, "gi"), "")
    // Clean up extra spaces and dangling separators
    .replace(/\s{2,}/g, " ")
    .replace(/^[\|\-–—:•\s]+|[\|\-–—:•\s]+$/g, "")
    .trim();
}
const RAW_BLOG_META = {
  "types-of-genetic-testing": {
    "h1": "Types of Genetic Testing Explained: A Guide for Doctors",
    "keywords": "types of genetic testing",
    "title": "Types of Genetic Testing Explained for Doctors",
    "canonical": "types-of-genetic-testing",
    "description": "Types of genetic testing explained — single gene testing, gene panels, exome and genome sequencing, and specialties that rely on them.",
    "image": null,
    "tags": [
      "chromosome testing chromosome testing",
      "exome sequencing explained",
      "gene panel testing",
      "genetic counselling vs clinical genetics",
      "genome sequencing",
      "single gene testing",
      "types of genetic testing"
    ]
  },
  "congenital-heart-disease": {
    "h1": "Congenital Heart Disease: Types, Causes, Symptoms & Treatment",
    "keywords": "congenital heart disease",
    "title": "Congenital Heart Disease: Types, Causes & Treatment",
    "canonical": "congenital-heart-disease",
    "description": "Congenital heart disease: types, causes, symptoms, diagnosis, treatment & prevention. Cyanotic vs acyanotic classification explained.",
    "image": null,
    "tags": [
      "chd full form",
      "congenital heart defects in babies",
      "Congenital Heart Disease",
      "congenital heart disease causes",
      "congenital heart disease prevention",
      "congenital heart disease symptoms",
      "congenital heart disease treatment",
      "cyanotic vs acyanotic heart disease",
      "pediatric congenital heart defects pediatric congenital heart defects",
      "types of congenital heart disease"
    ]
  },
  "cancer-screening-guidelines-india": {
    "h1": "Cancer Screening Guidelines in India 2027: A Practical Guide for Doctors",
    "keywords": "cancer screening guidelines india",
    "title": "Cancer Screening Guidelines India 2027: A Doctor's Guide",
    "canonical": "congenital-heart-disease",
    "description": "Cancer screening guidelines india — NP-NCD, NCG, and ICMR protocols for oral, breast, and cervical cancer, and why coverage still lags.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-16-at-4.24.45-PM.jpeg",
    "tags": [
      "breast cervical oral cancer screening",
      "cancer screening guidelines india",
      "cancer screening protocol doctors",
      "early cancer detection india",
      "national cancer grid guidelines",
      "np-ncd screening programme india",
      "oncology prevention guidelines"
    ]
  },
  "how-to-become-an-orthopedic-surgeon-after-mbbs": {
    "h1": "How to Become an Orthopedic Surgeon After MBBS: Complete Career Roadmap",
    "keywords": "how to become an orthopedic surgeon after mbbs",
    "title": "How to Become an Orthopedic Surgeon After MBBS: Roadmap",
    "canonical": "how-to-become-an-orthopedic-surgeon-after-mbbs",
    "description": "How to become an orthopedic surgeon after MBBS — the complete roadmap from MS/DNB Orthopedics to sub-specialty fellowship training in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-16-at-1.55.38-PM.jpeg",
    "tags": [
      "dnb orthopedics vs ms orthopedics",
      "how to become an orthopedic surgeon after mbbs",
      "joint replacement fellowship india joint replacement fellowship india",
      "Remove term: ms orthopedics eligibility ms orthopedics eligibility",
      "orthopedic sub specialty fellowship",
      "orthopedic surgeon career path india",
      "orthopedic surgery training timeline"
    ]
  },
  "medical-writing-career-after-mbbs": {
    "h1": "Medical Writing Career After MBBS: Where Medicine Meets the Written Word",
    "keywords": "medical writing career after mbbs",
    "title": "Medical Writing Career After MBBS: How to Get Started",
    "canonical": "medical-writing-career-after-mbbs",
    "description": "Medical writing career after MBBS — a practical guide to regulatory, scientific, and healthcare content writing roles for doctors in 2027.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-14-at-5.33.17-PM-1.jpeg",
    "tags": [
      "freelance medical writing india freelance medical writing india",
      "healthcare content writing for doctors healthcare content writing for doctors",
      "how to become a medical writer india",
      "medical writer jobs india",
      "medical writing career after mbbs medical writing career after mbbs",
      "regulatory writing career",
      "scientific publication writing doctors"
    ]
  },
  "clinical-research-pharma-careers-after-mbbs": {
    "h1": "Clinical Research Jobs After MBBS: What CRA, MSL & Pharmacovigilance Roles Actually Involve",
    "keywords": "clinical research jobs after mbbs",
    "title": "Clinical Research Jobs After MBBS: 2027 Guide",
    "canonical": "clinical-research-pharma-careers-after-mbbs",
    "description": "Clinical research jobs after MBBS span CRA, medical affairs, MSL, and pharmacovigilance roles — here's what they involve and how doctors break in.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-14-at-5.33.17-PM.jpeg",
    "tags": [
      "clinical research associate mbbs",
      "clinical research jobs after mbbs",
      "drug safety physician career",
      "medical affairs career india",
      "medical science liaison india",
      "pharma industry jobs for doctors",
      "pharmacovigilance jobs for doctors"
    ]
  },
  "hospital-administration-career-after-mbbs": {
    "h1": "Hospital Administration & Healthcare Management Careers After MBBS",
    "keywords": "Hospital Administration Career After MBBS",
    "title": "Hospital Administration Career After MBBS: Complete Guide",
    "canonical": "hospital-administration-career-after-mbbs",
    "description": "A hospital administration career after MBBS lets you move beyond clinical practice into healthcare management and leadership roles in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM-2.jpeg",
    "tags": [
      "career after mbbs career after mbbs",
      "healthcare consulting india",
      "healthcare leadership doctors",
      "Healthcare Management After MBBS",
      "hospital administration career",
      "hospital administrator jobs",
      "mba healthcare management",
      "medical career guidance",
      "non clinical careers doctors"
    ]
  },
  "precision-oncology-fellowship": {
    "h1": "Precision Oncology & Immunotherapy: Why Every Oncology Fellow Needs This in 2026",
    "keywords": "precision oncology fellowship",
    "title": "Precision Oncology Fellowship: Why It Matters in 2026",
    "canonical": "precision-oncology-fellowship",
    "description": "Precision oncology fellowship training closes a real gap — most oncologists know genomic-guided treatment matters, but few use it routinely. Here's why.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-12-at-2.20.42-PM-1.jpeg",
    "tags": [
      "cancer treatment precision medicine",
      "genomic testing cancer treatment",
      "immunotherapy training oncology",
      "molecular oncology training india",
      "oncology fellow skill gap",
      "precision oncology fellowship",
      "targeted therapy oncology 2026"
    ]
  },
  "dermatologist-salary-in-india": {
    "h1": "Dermatologist Salary in India 2026: What the Data Actually Shows",
    "keywords": "dermatologist salary in india",
    "title": "Dermatologist Salary in India 2026: The Real Data",
    "canonical": "dermatologist-salary-in-india",
    "description": "Dermatologist salary in India 2026: real MD dermatology salary bands, cosmetic practice income factors, and why one national figure doesn't exist.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.38-PM.jpeg",
    "tags": [
      "cosmetic dermatology earning potential",
      "dermatologist income india",
      "dermatologist salary in india",
      "dermatology doctor salary india",
      "dermatology md consultant salary",
      "md dermatology salary range",
      "private practice dermatology income"
    ]
  },
  "cosmetic-vs-clinical-dermatology-career": {
    "h1": "Cosmetic Dermatology vs Clinical Dermatology: Which Career Path Fits You?",
    "keywords": "cosmetic dermatology vs clinical dermatology",
    "title": "Cosmetic Dermatology vs Clinical Dermatology Career",
    "canonical": "cosmetic-vs-clinical-dermatology-career",
    "description": "Cosmetic dermatology vs clinical dermatology — compare daily work, training requirements, and which career path fits your interests best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.37-PM.jpeg",
    "tags": [
      "aesthetic dermatology career india",
      "clinical dermatology day to day",
      "cosmetic dermatology training india",
      "cosmetic dermatology vs clinical dermatology",
      "dermatology career path comparison",
      "medical dermatology vs cosmetology",
      "which dermatology branch to choose"
    ]
  },
  "medical-vs-surgical-vs-radiation-oncology-fellowship": {
    "h1": "Medical vs Surgical vs Radiation Oncology: Which Fellowship Fits You?",
    "keywords": "medical vs surgical vs radiation oncology fellowship",
    "title": "Medical vs Surgical vs Radiation Oncology Fellowship",
    "canonical": "medical-vs-surgical-vs-radiation-oncology-fellowship",
    "description": "Medical vs surgical vs radiation oncology fellowship — compare the three paths, their eligibility routes, and which fits your clinical interests best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.37-PM-1.jpeg",
    "tags": [
      "dm medical oncology vs fellowship",
      "mch surgical oncology eligibility",
      "medical vs surgical vs radiation oncology fellowship",
      "neet ss surgical oncology",
      "oncology career path doctors",
      "radiation oncology md pathway",
      "surgical oncology fellowship indi"
    ]
  },
  "fellowship-in-oncology-vs-dm-medical-oncology": {
    "h1": "Fellowship in Oncology vs DM Medical Oncology: Which Path Should You Choose?",
    "keywords": "fellowship in oncology vs dm medical oncology",
    "title": "Fellowship in Oncology vs DM Medical Oncology",
    "canonical": "fellowship-in-oncology-vs-dm-medical-oncology",
    "description": "Fellowship in oncology vs DM Medical Oncology — understand the real difference in eligibility, recognition, and career path before you decide.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-09-at-4.42.36-PM.jpeg",
    "tags": [
      "dm medical oncology eligibility neet ss",
      "dm oncology admission process",
      "fellowship in oncology vs dm medical oncology",
      "medical oncologist career path india",
      "oncology fellowship india doctors",
      "pmjay oncologist empanelment rules",
      "statutory vs fellowship oncology"
    ]
  },
  "easiest-medical-specialization-to-get-india": {
    "h1": "Easiest Medical Specialization to Get India (And the Hardest Ones to Crack)",
    "keywords": "Easiest Medical Specialization to Get India",
    "title": "Easiest Medical Specialization to Get India (2026)",
    "canonical": "easiest-medical-specialization-to-get-india",
    "description": "Wondering which is the easiest medical specialization to get india vs the hardest? Compare NEET PG competition, seat availability, and career value here.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-08-at-2.23.26-PM.jpeg",
    "tags": [
      "community medicine vs dermatology competition",
      "easiest medical specialization to get india",
      "easy to get md ms branches india",
      "hardest neet pg specialization to get",
      "high demand neet pg branches india",
      "low competition mbbs specialties",
      "neet pg seat availability by branch"
    ]
  },
  "dermoscopy-for-general-physicians": {
    "h1": "Dermoscopy for General Physicians: Skin Diagnosis, Differential Diagnosis & When to Refer",
    "keywords": "dermoscopy for general physicians",
    "title": "Dermoscopy for General Physicians: Skin Diagnosis Guide (2026)",
    "canonical": "dermoscopy-for-general-physicians",
    "description": "Dermoscopy for general physicians improves skin diagnosis without specialist training. Learn how it helps distinguish fungal rash, eczema, psoriasis & when to refer.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-08-at-2.23.26-PM-1.jpeg",
    "tags": [
      "cpd skill gap general physicians",
      "dermoscopy basics for doctors india",
      "dermoscopy for skin cancer screening",
      "dermoscopy tinea eczema psoriasis differential",
      "dermoscopy training for general physicians",
      "learn dermoscopy india",
      "non invasive skin diagnosis tool"
    ]
  },
  "heart-failure-and-cardiomyopathies": {
    "h1": "Heart Failure and Cardiomyopathies: Understanding the Heart's Struggle to Keep Up",
    "keywords": "heart failure and cardiomyopathies",
    "title": "Heart Failure & Cardiomyopathies: Pathophysiology & Management",
    "canonical": "heart-failure-and-cardiomyopathies",
    "description": "A clear guide to heart failure and cardiomyopathies — pathophysiology, neurohormonal remodeling, genetics, and modern management from medication to transplant.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-04-at-4.50.44-PM.jpeg",
    "tags": [
      "cardiac resynchronization therapy vs ICD",
      "genetic testing and counselling for cardiomyopathy",
      "heart failure and cardiomyopathies pathophysiology",
      "hypertrophic vs dilated vs restrictive cardiomyopathy",
      "neurohormonal regulation and cardiac remodeling",
      "RAAS inhibitors and beta-blockers for heart failure",
      "systolic vs diastolic dysfunction explained"
    ]
  },
  "dermoscopy-training-general-physicians": {
    "h1": "Why Every General Physician Should Learn Basic Dermoscopy",
    "keywords": "Dermoscopy Training for General Physicians",
    "title": "Dermoscopy Training for General Physicians (2026)",
    "canonical": "dermoscopy-training-general-physicians",
    "description": "Dermoscopy is a skill most GPs never learn in MBBS. See how it helps diagnose skin conditions and where structured training begins.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-04-at-4.03.34-PM.jpeg",
    "tags": [
      "basic dermoscopy pattern recognition doctors",
      "cpd skill gap general physicians",
      "dermatoscope training general physicians",
      "dermoscopy basics for doctors india",
      "dermoscopy differential diagnosis skin conditions",
      "dermoscopy for skin cancer screening",
      "dermoscopy tinea eczema psoriasis",
      "dermoscopy training for general physicians",
      "learn dermoscopy india",
      "non invasive skin diagnosis tool"
    ]
  },
  "doctor-specialization-salary-comparison": {
    "h1": "Doctor Specialization Salary Comparison: MBBS to Super Specialist (2026 India Guide",
    "keywords": "Doctor Specialization Salary Comparison",
    "title": "Doctor Specialization Salary Comparison India (2026)",
    "canonical": "doctor-specialization-salary-comparison",
    "description": "This doctor specialization salary comparison tracks pay from MBBS to super specialist — MD, MS and DM/MCh stages, 2026 India data.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-04-at-4.03.33-PM.jpeg",
    "tags": [
      "dm mch super specialist earnings india",
      "doctor salary progression by qualification",
      "doctor specialization salary comparison india",
      "mbbs fresher to consultant salary",
      "mbbs to super specialist salary table",
      "md ms dm salary india 2026",
      "medical specialist income comparison",
      "specialist doctor salary by field india"
    ]
  },
  "medical-vs-surgical-specialization": {
    "h1": "Medical vs Surgical Specialization After MBBS: A Clear Comparison (2026)",
    "keywords": "Medical vs Surgical Specialization After MBBS",
    "title": "Medical vs Surgical Specialization After MBBS (2026)",
    "canonical": "medical-vs-surgical-specialization",
    "description": "Confused about medical vs surgical specialization after MBBS? Compare training, lifestyle, career scope, and who each path suits best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM.jpeg",
    "tags": [
      "choosing specialty after mbbs",
      "clinical vs surgical doctor",
      "md branches list",
      "md vs ms after mbbs",
      "medical career philosophy",
      "medical vs surgical specialization",
      "ms branches list",
      "physician branch career",
      "specialization decision mbbs",
      "surgical branch career"
    ]
  },
  "pediatric-skin-conditions-physician-guide": {
    "h1": "Recognising Pediatric Skin Conditions: A Quick-Reference Guide for MBBS & Family Physicians",
    "keywords": "pediatric skin conditions",
    "title": "Pediatric Skin Conditions: Guide for MBBS Doctors",
    "canonical": "pediatric-skin-conditions-physician-guide",
    "description": "A quick-reference guide to pediatric skin conditions in Indian children — atopic dermatitis, infections, nutritional signs, and red flags for referral.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-6.04.03-PM.jpeg",
    "tags": [
      "atopic dermatitis children",
      "child skin rash guide",
      "clinical dermatology education",
      "diaper dermatitis",
      "family physician dermatology",
      "infant skin conditions",
      "mbbs doctor guide",
      "pediatric dermatology",
      "pediatric dermatoses india"
    ]
  },
  "future-scope-medical-specialization-india": {
    "h1": "Future Scope of Medical Specialization in India: What the Next Decade Looks Like",
    "keywords": "future scope of medical specialization",
    "title": "Future Scope of Medical Specialization in India (2026)",
    "canonical": "future-scope-medical-specialization-india",
    "description": "The future scope of medical specialization in India spans Critical Care, Radiology, Oncology & more — see the demand drivers for the next decade.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-5.29.19-PM.jpeg",
    "tags": [
      "critical care medicine india",
      "diabetology india",
      "emergency medicine india",
      "emerging medical fields india",
      "fetal medicine india",
      "future scope medical specialization",
      "medical career trends india",
      "oncology career india",
      "radiology career india",
      "specialization after mbbs"
    ]
  },
  "rmo-vs-duty-doctor-vs-junior-resident": {
    "h1": "RMO vs Duty Doctor vs Junior Resident: Which Builds a Better Career After MBBS?",
    "keywords": "rmo vs duty doctor vs junior resident",
    "title": "RMO vs Duty Doctor vs Junior Resident: Best First Job?",
    "canonical": "rmo-vs-duty-doctor-vs-junior-resident",
    "description": "RMO, Duty Doctor, or Junior Resident — which private hospital role after MBBS builds the strongest clinical career? A practical 2026 comparison.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-5.29.19-PM-2.jpeg",
    "tags": [
      "clinical career after mbbs",
      "duty doctor role",
      "entry level doctor jobs india",
      "jobs after mbbs",
      "junior resident career",
      "medical career guidance",
      "neet pg preparation",
      "private hospital doctor jobs",
      "resident medical officer",
      "rmo vs duty doctor"
    ]
  },
  "trichology-vs-dermatology-hair-loss-india": {
    "h1": "Hair Loss & Alopecia in India: When to Treat, When to Refer, and the Rise of Trichology",
    "keywords": "Hair Loss & Trichology in India",
    "title": "Hair Loss & Trichology in India: A Doctor's Guide",
    "canonical": "trichology-vs-dermatology-hair-loss-india",
    "description": "Hair loss and trichology in India: alopecia types, general management principles, and whether trichology is a credible career path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM-1.jpeg",
    "tags": [
      "alopecia areata",
      "alopecia types",
      "androgenetic alopecia",
      "dermatology hair disorders",
      "general physician referral",
      "hair loss doctor guide",
      "hair loss treatment india",
      "scalp health india",
      "telogen effluvium",
      "trichology vs dermatology"
    ]
  },
  "medical-officer-vs-junior-resident-after-mbbs": {
    "h1": "Medical Officer vs Junior Resident: Which Clinical Job First After MBBS?",
    "keywords": "medical officer vs junior resident",
    "title": "Medical Officer vs Junior Resident: Which Job After MBBS?",
    "canonical": "medical-officer-vs-junior-resident-after-mbbs",
    "description": "Medical Officer vs Junior Resident after MBBS: compare eligibility, duties, clinical exposure, salary, career growth and PG preparation to choose the right job.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.19-PM.jpeg",
    "tags": [
      "clinical experience",
      "clinical jobs after mbbs",
      "doctor jobs in india",
      "junior resident",
      "junior resident jobs",
      "mbbs career options",
      "mbbs jobs",
      "medical career after mbbs",
      "medical career guidance",
      "medical officer",
      "medical officer jobs",
      "medical residency",
      "pg medical career",
      "post mbbs career"
    ]
  },
  "pigmentation-disorders-indian-skin": {
    "h1": "Pigmentation Disorders in Indian Skin: Melasma, Vitiligo & Post-Inflammatory Hyperpigmentation",
    "keywords": "pigmentation disorders indian skin",
    "title": "Pigmentation Disorders in Indian Skin: Doctor's Guide",
    "canonical": "pigmentation-disorders-indian-skin",
    "description": "Pigmentation Disorders in Indian Skin: understand melasma, vitiligo, PIH, treatment considerations, and referral guidance for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.20-PM.jpeg",
    "tags": [
      "clinical dermatology",
      "dermatology education",
      "fitzpatrick skin type",
      "hyperpigmentation india",
      "indian skin treatment",
      "melasma treatment",
      "pigmentation disorders",
      "post inflammatory hyperpigmentation",
      "skin of color dermatology",
      "vitiligo management"
    ]
  },
  "medical-specialization-work-life-balance": {
    "h1": "Medical Specializations With the Best Work-Life Balance After MBBS",
    "keywords": "medical specialties for work life balance",
    "title": "Medical Specialties for Work Life Balance After MBBS",
    "canonical": "medical-specialization-work-life-balance",
    "description": "Explore medical specialties for work life balance, with insights into work hours, emergencies, call duties, and lifestyle after MBBS.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.20-PM-1.jpeg",
    "tags": [
      "career planning mbbs",
      "dermatology lifestyle",
      "doctor schedule india",
      "emergency medicine lifestyle",
      "low stress medical career",
      "medical specialization after mbbs",
      "on call doctor india",
      "radiology career",
      "specialty selection guide",
      "work life balance doctors"
    ]
  },
  "md-vs-ms-vs-dnb-complete-guide": {
    "h1": "MD vs MS vs DNB: Which Postgraduate Path Should You Choose?",
    "keywords": "md vs ms vs dnb",
    "title": "MD vs MS vs DNB in India: Complete PG Guide",
    "canonical": "md-vs-ms-vs-dnb-complete-guide",
    "description": "MD vs MS vs DNB in India: real differences in training, institutions, and career pathways — plus a clear decision framework for choosing your path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-29-at-4.34.22-PM.jpeg",
    "tags": [
      "career after mbbs",
      "clinical training",
      "dnb eligibility",
      "dnb vs md",
      "international medical recognition",
      "md ms comparison",
      "md vs ms vs dnb",
      "medical college admission",
      "medical education india",
      "medical specialization after mbbs",
      "neet-pg",
      "nmc recognition",
      "postgraduate medical specialization",
      "postgraduate pathway",
      "teaching career doctors"
    ]
  },
  "eczema-vs-psoriasis-vs-fungal-rash-diagnosis-2": {
    "h1": "Eczema vs Psoriasis vs Fungal Rash: A Differential Diagnosis Guide for General Physicians",
    "keywords": "eczema vs psoriasis vs fungal rash",
    "title": "Eczema vs Psoriasis vs Fungal Rash: Diagnosis Guide",
    "canonical": "eczema-vs-psoriasis-vs-fungal-rash-diagnosis-2",
    "description": "Comparing eczema vs psoriasis vs fungal rash? This differential diagnosis guide for general physicians covers key features, a comparison table, and red flags.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-29-at-4.58.50-PM.jpeg",
    "tags": [
      "atopic dermatitis",
      "clinical dermatology",
      "dermatology education",
      "diagnosis guide",
      "differential diagnosis",
      "eczema vs psoriasis",
      "fungal rash diagnosis",
      "general physician",
      "KOH test",
      "medical education india",
      "OPD clinical guide",
      "steroid modified tinea"
    ]
  },
  "steroid-modified-tinea-india": {
    "h1": "Steroid-Modified Tinea in India: The Silent Epidemic Every Doctor Should Understand",
    "keywords": "steroid modified tinea",
    "title": "Steroid-Modified Tinea in India: What Doctors Must Know",
    "canonical": "steroid-modified-tinea-india",
    "description": "Understand tinea incognito and India's steroid-modified tinea epidemic — clinical recognition, causes and the doctor's role in reversing it.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-28-2026-04_31_23-PM.webp",
    "tags": [
      "steroid modified tinea in india",
      "tinea incognito clinical diagnosis",
      "steroid modified fungal infection",
      "topical steroid misuse in tinea",
      "recurrent tinea infection management",
      "tinea incognito treatment for doctors",
      "dermatophyte infection diagnosis india"
    ]
  },
  "cpd-accreditation-for-doctors-india": {
    "h1": "CPD Accreditation for Doctors in India: What It Means, Why It Matters and How to Choose a Program",
    "keywords": "CPD Accreditation for Doctors in India: What It Means, Why It Matters and How to Choose a Program",
    "title": "CPD Accreditation for Doctors in India (2026 Guide)",
    "canonical": "cpd-accreditation-for-doctors-india",
    "description": "What CPD accreditation means for Indian doctors, how it differs from CME and PG qualifications, and how to choose a credible program.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-28-2026-04_22_40-PM.webp",
    "tags": [
      "continuing professional development doctors",
      "cpd accreditation for doctors india",
      "cpd certificate for doctors",
      "cpd credits for doctors india",
      "cpd vs cme india",
      "fellowship cpd accreditation"
    ]
  },
  "recurrent-fungal-infection-treatment-india": {
    "h1": "Fungal Skin Infections (Tinea) in India: Why They Keep Coming Back",
    "keywords": "recurrent fungal infection",
    "title": "Recurrent Fungal Infection in India: Doctor's Guide (2026)",
    "canonical": "recurrent-fungal-infection-treatment-india",
    "description": "Why fungal skin infections keep recurring in Indian patients, common tinea types, and general management principles every doctor should know.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-27-at-4.18.00-PM.jpeg",
    "tags": [
      "antifungal resistance india",
      "chronic tinea corporis treatment",
      "dermatophytosis management",
      "recurrent fungal infection treatment india",
      "tinea corporis india",
      "tinea treatment guidelines india",
      "trichophyton indotineae",
      "why fungal infection keeps returning"
    ]
  },
  "acne-management-general-physicians-india": {
    "h1": "Acne in Indian Patients: Causes, Types and a GP's First-Line Approach",
    "keywords": "acne in indian patients",
    "title": "Acne in Indian Patients: GP's Management Guide (2026)",
    "canonical": "acne-management-general-physicians-india",
    "description": "Acne in Indian patients causes persistent PIH even with mild lesions. A clinical grading and first-line management guide for MBBS doctors in OPD.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-27-at-4.18.00-PM-1.jpeg",
    "tags": [
      "acne grading general practice",
      "acne in indian skin",
      "acne management for general physicians india",
      "acne treatment guidelines gp",
      "acne vulgaris indian skin",
      "comedonal acne treatment",
      "nodulocystic acne referral",
      "post inflammatory hyperpigmentation acne",
      "types of acne india",
      "when to refer acne to dermatologist"
    ]
  },
  "best-specialization-for-female-doctors": {
    "h1": "Best Medical Specialization for Female Doctors After MBBS (2026 Guide)",
    "keywords": "Medical Specialization Female Doctors",
    "title": "Best Medical Specialization for Female Doctors (2026)",
    "canonical": "best-specialization-for-female-doctors",
    "description": "Which medical specialization suits female doctors best? Compare lifestyle, flexibility, growth & demand across top specialties for women MBBS graduates.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-26-at-3.57.57-PM.jpeg",
    "tags": [
      "female doctors medical specialization options",
      "best specialization for female doctors after mbbs",
      "medical specialties for women doctors",
      "flexible medical specialties for female doctors",
      "work life balance specialties for women doctors",
      "career options for female mbbs doctors",
      "medical specialization lifestyle for women doctors"
    ]
  },
  "infertility-evaluation-structured-workup-general-practice": {
    "h1": "Evaluating the Infertile Couple: A Structured First-Visit Workup for General Practice",
    "keywords": "Infertility Evaluation",
    "title": "Infertility Evaluation: First-Visit Workup for Doctors",
    "canonical": "infertility-evaluation-structured-workup-general-practice",
    "description": "Structured Infertility Evaluation for both partners — ovulation, ovarian reserve, semen analysis, tubal assessment and referral criteria.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-21-at-5.45.21-PM.jpeg",
    "tags": [
      "infertility evaluation for doctors",
      "infertility first visit workup",
      "structured infertility assessment",
      "female and male infertility evaluation",
      "ovulation and ovarian reserve assessment",
      "semen analysis evaluation",
      "tubal patency assessment",
      "infertility referral criteria",
      "infertility workup in general practice",
      "reproductive medicine evaluation"
    ]
  },
  "fellowship-in-infertility-management-curriculum-eligibility": {
    "h1": "Fellowship in Infertility Management: Eligibility, Curriculum and Practice Scope",
    "keywords": "Fellowship in Infertility Management",
    "title": "Fellowship in Infertility Management: Curriculum & Scope",
    "canonical": "fellowship-in-infertility-management-curriculum-eligibility",
    "description": "Description MGA's Fellowship in Infertility Management: eligibility, ART curriculum, IVF scope and how it differs from the Restorative Reproductive Medicine fellowship",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-21-at-5.42.23-PM-1.jpeg",
    "tags": [
      "art course for doctors",
      "fellowship in infertility management",
      "infertility fellowship india",
      "infertility specialist training",
      "ivf training for doctors",
      "reproductive medicine fellowship eligibility"
    ]
  },
  "first-trimester-screening-timing-protocol-counselling": {
    "h1": "First-Trimester Screening: Timing, Protocol and Counselling Considerations in Indian Practice",
    "keywords": "First-Trimester Screening",
    "title": "First-Trimester Screening: Timing, Protocol & Counselling",
    "canonical": "first-trimester-screening-timing-protocol-counselling",
    "description": "Learn first-trimester screening in Indian practice, including NT scans, dual markers, timing, and counselling.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-4.18.34-PM.jpeg",
    "tags": [
      "first trimester screening timing",
      "first trimester screening protocol",
      "first trimester screening india",
      "nuchal translucency scan timing",
      "dual marker test pregnancy",
      "first trimester prenatal screening",
      "prenatal screening counselling doctors",
      "first trimester screening guidelines india",
      "fetal medicine screening protocol",
      "antenatal screening first trimester"
    ]
  },
  "fetal-medicine-fellowship-curriculum-eligibility-competencies": {
    "h1": "Fetal Medicine Fellowship: Curriculum, Eligibility and the Competencies It Develops",
    "keywords": "Fetal Medicine Fellowship",
    "title": "Fetal Medicine Fellowship: Curriculum & Eligibility",
    "canonical": "fetal-medicine-fellowship-curriculum-eligibility-competencies",
    "description": "Explore MGA's 12-month online Fetal Medicine Fellowship with a 17-module curriculum, OBGYN eligibility, and core clinical competencies.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-4.18.35-PM.jpeg",
    "tags": [
      "fellowship in fetal medicine",
      "fetal anomaly scan training",
      "fetal echocardiography",
      "fetal medicine course india",
      "fetal medicine fellowship",
      "invasive fetal procedures",
      "maternal fetal medicine training"
    ]
  },
  "ecg-interpretation-mistakes-systematic-reading": {
    "h1": "Commonly Missed ECG Findings in Primary Care and How to Systematise Your Reading",
    "keywords": "ecg interpretation mistakes",
    "title": "ECG Interpretation Mistakes: Systematic Reading Guide",
    "canonical": "ecg-interpretation-mistakes-systematic-reading",
    "description": "ECG interpretation mistakes happen even when doctors know the patterns. Learn the 7-step systematic method and 8 missed findings that hide in plain sight.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-4.36.12-PM-1.jpeg",
    "tags": [
      "arrhythmia recognition",
      "ecg interpretation mistakes",
      "ecg interpretation primary care",
      "ecg pitfalls",
      "ecg reading approach",
      "ecg systematic method",
      "missed stemi patterns"
    ]
  },
  "certificate-ecg-interpretation-vs-echocardiography": {
    "h1": "Certificate in ECG Interpretation vs Certificate in Echocardiography: Which Cardiac Skill First?",
    "keywords": "certificate in ecg interpretation",
    "title": "ECG vs Echocardiography Certificate: Which First?",
    "canonical": "certificate-ecg-interpretation-vs-echocardiography",
    "description": "Deciding between MGA's ECG Interpretation and Echocardiography certificates? Compare scope, learning curve and clinical fit to sequence your skills.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-4.36.12-PM.jpeg",
    "tags": [
      "2d echo training",
      "cardiac skills training india",
      "certificate in ecg interpretation",
      "certificate in echocardiography",
      "ecg course for doctors",
      "ecg vs echo certificate",
      "echocardiography certificate course"
    ]
  },
  "fellowship-molecular-pathology-vs-cytopathology": {
    "h1": "Fellowship in Molecular Pathology vs Cytopathology: Choosing a Diagnostic Subspecialty",
    "keywords": "fellowship in molecular pathology",
    "title": "Molecular Pathology vs Cytopathology Fellowship",
    "canonical": "fellowship-molecular-pathology-vs-cytopathology",
    "description": "Comparing a Fellowship in Molecular Pathology vs Cytopathology? Explore daily practice, clinical scope & career fit to choose your subspecialty.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-18-at-3.21.18-PM.jpeg",
    "tags": [
      "cytopathology fellowship india",
      "diagnostic pathology fellowship",
      "fellowship in cytopathology",
      "fellowship in molecular pathology",
      "fnac training",
      "histopathology subspecialty",
      "molecular diagnostics training",
      "molecular pathology vs cytopathology"
    ]
  },
  "digital-pathology-ai-diagnostics-india": {
    "h1": "Digital Pathology and AI-Assisted Diagnostics: What Changes in the Indian Laboratory",
    "keywords": "digital pathology india",
    "title": "Digital Pathology in India: What Actually Changes",
    "canonical": "digital-pathology-ai-diagnostics-india",
    "description": "Whole slide imaging and AI-assisted diagnostics are entering Indian labs. A grounded look at what changes in reporting, quality assurance and turnaround",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-18-at-3.21.18-PM-1.jpeg",
    "tags": [
      "AI assisted diagnostics",
      "AI in pathology",
      "computational pathology",
      "digital pathology",
      "digital pathology india",
      "laboratory automation",
      "telepathology india",
      "whole slide imaging"
    ]
  },
  "point-of-care-ultrasound-pocus-clinical-decisions": {
    "h1": "Point-of-Care Ultrasound in Everyday Practice: Where POCUS Changes Clinical Decisions",
    "keywords": "point of care ultrasound",
    "title": "Point-of-Care Ultrasound: Where POCUS Changes Decisions",
    "canonical": "point-of-care-ultrasound-pocus-clinical-decisions",
    "description": "Master point of care ultrasound. Learn how bedside POCUS, FAST, and lung ultrasound change immediate clinical decisions in emergency and rural care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-14-at-2.54.37-PM.jpeg",
    "tags": [
      "bedside ultrasound",
      "BLUE protocol",
      "cardiac POCUS",
      "eFAST exam",
      "FAST scan",
      "lung ultrasound",
      "POCUS clinical decisions",
      "POCUS in emergency",
      "POCUS india",
      "point of care ultrasound",
      "RUSH protocol",
      "ultrasound for doctors india",
      "ultrasound in critical care",
      "ultrasound in primary care"
    ]
  },
  "pg-diploma-ultrasonography-vs-certificate-advanced-ultrasound": {
    "h1": "PG Diploma in Ultrasonography vs Certificate in Advanced Ultrasound: Choosing the Right Depth",
    "keywords": "pg diploma in ultrasonography",
    "title": "PG Diploma vs Certificate in Ultrasound: Which to Choose",
    "canonical": "pg-diploma-ultrasonography-vs-certificate-advanced-ultrasound",
    "description": "Compare the PG Diploma in Ultrasonography with the Certificate in Advanced Ultrasound. Find the right imaging course for your medical practice.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-14-at-2.54.47-PM.jpeg",
    "tags": [
      "advanced ultrasound obstetrics gynecology",
      "certificate in advanced ultrasound",
      "obstetric ultrasound certificate",
      "pg diploma in ultrasonography",
      "pg diploma in ultrasonography vs certificate",
      "sonography qualification for physicians",
      "ultrasonography diploma india",
      "ultrasound course eligibility",
      "ultrasound course for doctors india"
    ]
  },
  "diagnostic-vs-therapeutic-endoscopy": {
    "h1": "Diagnostic vs Therapeutic Endoscopy: Indications, Skill Requirements and Referral Thresholds",
    "keywords": "diagnostic vs therapeutic endoscopy",
    "title": "Diagnostic vs Therapeutic Endoscopy: Key Differences",
    "canonical": "diagnostic-vs-therapeutic-endoscopy",
    "description": "What separates diagnostic from therapeutic endoscopy? Learn the clinical indications, skill requirements and referral thresholds every doctor should know.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-12-at-5.16.18-PM-1.jpeg",
    "tags": [
      "diagnostic vs therapeutic endoscopy",
      "endoscopic haemostasis",
      "endoscopy indications",
      "ercp indications",
      "gi endoscopy india",
      "polypectomy",
      "upper gi bleed management",
      "when to refer for endoscopy"
    ]
  },
  "fellowship-in-gi-endoscopy-eligibility-curriculum-scope": {
    "h1": "Fellowship in GI Endoscopy: Eligibility, Curriculum and Clinical Scope in India",
    "keywords": "fellowship in GI endoscopy",
    "title": "Fellowship in GI Endoscopy: Eligibility & Scope",
    "canonical": "fellowship-in-gi-endoscopyfellowship-in-gi-endoscopy-eligibility-curriculum-scope",
    "description": "Who can apply for a GI Endoscopy Fellowship in India? Learn the eligibility, curriculum, procedural competencies and how it compares to DM Gastroenterology.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-12-at-5.16.18-PM.jpeg",
    "tags": [
      "colonoscopy training",
      "endoscopy course for doctors",
      "fellowship in gi endoscopy",
      "gastrointestinal endoscopy training",
      "gi endoscopy fellowship india",
      "therapeutic endoscopy fellowship",
      "upper gi endoscopy"
    ]
  },
  "top-medical-pg-branches-in-india": {
    "h1": "How to Choose the Best Medical PG Branch in India: Complete Guide",
    "keywords": "top medical PG branches in India",
    "title": "Top Medical PG Branches in India: Scope, Demand & Salary",
    "canonical": "top-medical-pg-branches-in-india",
    "description": "Confused about which medical PG branch to choose? Compare India's top medical specialties by market demand, scope, and earning potential",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-11-at-5.04.30-PM-1-1.jpeg",
    "tags": [
      "doctor career guide",
      "highest paying doctors",
      "md in india",
      "medical career scope",
      "medical pg branches",
      "medical specialization",
      "ms in india",
      "pg medical admission",
      "top pg courses after mbbs"
    ]
  },
  "most-in-demand-medical-courses-after-mbbs": {
    "h1": "Most In-Demand Medical Courses After MBBS: What Hospitals Are Actually Hiring For",
    "keywords": "most in demand medical courses after mbbs",
    "title": "Most In-Demand Medical Courses After MBBS 2026",
    "canonical": "most-in-demand-medical-courses-after-mbbs",
    "description": "Discover the most in demand medical courses after MBBS that hospitals are actually hiring for in 2026, including Emergency Medicine and Critical Care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-3.53.18-PM-1.jpeg",
    "tags": [
      "clinical cardiology",
      "critical care training",
      "diabetology certificate",
      "diagnostic imaging courses",
      "doctors career guide",
      "emergency medicine",
      "healthcare careers india",
      "hospital hiring trends",
      "hospital management",
      "medical courses after mbbs",
      "most in demand medical courses",
      "pg diploma after mbbs",
      "post mbbs fellowships",
      "robotic surgery fellowship",
      "short term medical courses"
    ]
  },
  "highest-paying-medical-courses-after-mbbs": {
    "h1": "Highest Paying Medical Courses After MBBS in India (2026): Which Course Gives the Best ROI?",
    "keywords": "highest paying medical courses after mbbs",
    "title": "Highest Paying Medical Courses After MBBS 2026",
    "canonical": "highest-paying-medical-courses-after-mbbs",
    "description": "Fellowship vs PG diploma vs certificate — which course format gives the best ROI after MBBS? Compare duration, salary impact, and payback period.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-08-at-3.59.39-PM.jpeg",
    "tags": [
      "highest paying medical courses after mbbs",
      "high roi medical courses after mbbs",
      "best medical courses after mbbs india",
      "fellowship courses after mbbs",
      "pg diploma courses after mbbs",
      "certificate courses for doctors",
      "medical courses salary impact",
      "short term medical courses after mbbs",
      "career oriented medical courses india",
      "post mbbs course options",
      "highest roi medical courses 2026",
      "medical specialization courses after mbbs",
      "advanced medical courses for doctors",
      "best fellowship courses for doctors",
      "medical course payback period"
    ]
  },
  "best-pg-diploma-courses-after-mbbs": {
    "h1": "Best PG Diploma Courses After MBBS in India (2026): Full List, Duration & Career Scope",
    "keywords": "best pg diploma courses after mbbs",
    "title": "Best PG Diploma Courses After MBBS 2026",
    "canonical": "best-pg-diploma-courses-after-mbbs",
    "description": "Complete list of PG diploma courses after MBBS in India — duration, eligibility, and career scope. University-awarded programs for working doctors, no NEET PG required.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-08-at-3.59.38-PM.jpeg",
    "tags": [
      "best pg diploma courses after mbbs",
      "pg diploma courses after mbbs india",
      "pg diploma critical care",
      "pg diploma emergency medicine",
      "pg diploma general medicine",
      "pg diploma vs fellowship",
      "pg diploma without neet pg",
      "university pg diploma for doctors"
    ]
  },
  "online-fellowship-courses-after-mbbs": {
    "h1": "Online Fellowship Courses After MBBS: Are They Worth It in 2026?",
    "keywords": "online fellowship courses after mbbs",
    "title": "Online Fellowship Courses After MBBS 2026",
    "canonical": "online-fellowship-courses-after-mbbs",
    "description": "Discover how online fellowship courses after MBBS work, which specialties suit them best, and how to evaluate programs. Guide for working doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-07-at-4.13.22-PM.jpeg",
    "tags": [
      "best online fellowship after mbbs 2026",
      "cpd accredited fellowship india",
      "evening fellowship classes mbbs doctors",
      "fellowship courses after mbbs online",
      "fellowship without neet pg online",
      "online fellowship courses after mbbs",
      "online medical courses for doctors india",
      "working doctors medical courses online"
    ]
  },
  "higher-studies-after-mbbs": {
    "h1": "Higher Studies After MBBS: MD, MS, DNB, PG Diploma, Fellowship and Non-Clinical Options Compared (2026)",
    "keywords": "higher studies after mbbs",
    "title": "Higher Studies After MBBS: Which Path Is Right for You?",
    "canonical": "higher-studies-after-mbbs",
    "description": "Not sure which higher studies after MBBS suit you? Compare MD, DNB, fellowship and PG Diploma by entry, duration and recognition. Clear 2026 guide.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-07-at-4.02.31-PM.jpeg",
    "tags": [
      "higher studies after mbbs for doctors",
      "md ms dnb pg diploma fellowship comparison after mbbs",
      "fellowship courses after mbbs without neet pg",
      "best higher study option after mbbs in india",
      "pg diploma after mbbs without neet pg",
      "how to choose higher studies after mbbs",
      "neet pg alternatives for mbbs doctors",
      "career options after mbbs india 2026"
    ]
  },
  "best-medical-courses-after-mbbs-2026": {
    "h1": "Best Medical Courses After MBBS in 2026: Fellowship, PG Diploma, Certificate, Online & CME Guide",
    "keywords": "Best Medical Courses After MBBS",
    "title": "Best Medical Courses After MBBS in 2026: Complete Guide",
    "canonical": "best-medical-courses-after-mbbs-2026",
    "description": "Compare the best fellowship, PG diploma, certificate, online & CME courses after MBBS in2026. Duration, fees, NEET PG rules & how to choose",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-04-at-5.29.15-PM.jpeg",
    "tags": [
      "certificate courses",
      "cme education",
      "fellowship after mbbs",
      "mbbs courses",
      "medical training india",
      "online medical courses",
      "pg diploma medical"
    ]
  },
  "higher-studies-after-mbbs-2": {
    "h1": "Higher Studies After MBBS: Which Path Is Right for You?",
    "keywords": "Higher studies after MBBS",
    "title": "Higher Studies After MBBS: Which Path Is Right for You?",
    "canonical": "higher-studies-after-mbbs-2",
    "description": "MD/MS, DNB, PG Diploma or Fellowship after MBBS? Compare entrance requirements, duration, recognition and career scope to pick the right path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-31-at-3.57.14-PM.jpeg",
    "tags": [
      "career path",
      "cpd courses",
      "dnb",
      "fellowship",
      "higher studies",
      "india medical courses",
      "mbbs",
      "md ms",
      "medical global academy",
      "medical specialization",
      "neet-pg",
      "pg diploma",
      "postgraduate medical education",
      "postgraduate qualification"
    ]
  },
  "pg-diploma-in-ultrasonography-after-mbbs-guide": {
    "h1": "PG Diploma in Ultrasonography After MBBS: Eligibility, Duration, Fees, Syllabus & Career Guide (2026)",
    "keywords": "PG Diploma Ultrasonography",
    "title": "PG Diploma in Ultrasonography After MBBS: Guide 2026",
    "canonical": "pg-diploma-in-ultrasonography-after-mbbs-guide",
    "description": "Complete 2026 guide to the PG Diploma in Ultrasonography after MBBS: eligibility, duration, fees, syllabus, career scope and FAQs.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-30-at-4.29.33-PM.jpeg",
    "tags": [
      "abdominal ultrasound",
      "cardiac ultrasound",
      "career after mbbs",
      "clinical training",
      "diagnostic ultrasound",
      "doctor career path",
      "doctor upskilling",
      "emi available",
      "healthcare education",
      "hybrid learning",
      "india healthcare",
      "mbbs after graduation",
      "medical certification",
      "medical degree programs"
    ]
  },
  "private-doctor-salary-in-india": {
    "h1": "Private Doctor Salary in India: Complete Guide 2026",
    "keywords": "Private doctor salary in India",
    "title": "Private Doctor Salary in India 2026: ₹40K–₹5L/Month Guide",
    "canonical": "private-doctor-salary-in-india",
    "description": "Private doctor salary in India: ₹40K–₹5L/month by experience, specialization & city tier. Complete 2026 income guide with real numbers.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-29-at-5.00.37-PM.jpeg",
    "tags": [
      "doctor-consulting",
      "healthcare",
      "hero-image",
      "india",
      "medical-professional",
      "patient-care",
      "private-clinic",
      "private-doctor-salary"
    ]
  },
  "cardiology-courses-after-mbbs-india-types-duration": {
    "h1": "Cardiology Course Duration After MBBS: Complete Comparison",
    "keywords": "Cardiology Courses After MBBS",
    "title": "Cardiology Course Duration: DM, Diploma & Fellowship Compared",
    "canonical": "cardiology-courses-after-mbbs-india-types-duration",
    "description": "Compare cardiology course duration after MBBS — DM (3 yrs), PG Diploma (2 yrs) & Fellowship (1 yr). Full eligibility & career path breakdown for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-28-at-3.14.45-PM.jpeg",
    "tags": [
      "7th pay commission doctor salary",
      "8th pay commission doctor salary",
      "afms doctor salary",
      "aiims doctor salary",
      "central government doctor salary",
      "doctor salary in india",
      "esic doctor salary",
      "government doctor allowances",
      "government doctor pay scale",
      "government doctor salary",
      "government doctor salary in india",
      "government doctor salary per month",
      "government hospital doctor salary"
    ]
  },
  "fellowship-in-cardiology-in-india": {
    "h1": "Fellowship in Cardiology in India: Eligibility, Duration, Curriculum, and Career Scope",
    "keywords": "Fellowship in Cardiology in India",
    "title": "Fellowship in Cardiology in India 2026: Eligibility & Scope",
    "canonical": "fellowship-in-cardiology-in-india",
    "description": "MBBS & MD doctors can join this 6–12 month Fellowship in Cardiology in India — no full-time DM needed. Check eligibility, curriculum & career scope inside.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-27-at-3.27.21-PM.jpeg",
    "tags": [
      "cardiology career scope",
      "cardiology fellowship curriculum",
      "cardiology fellowship duration",
      "cardiology fellowship india",
      "cardiology specialization india",
      "cpd accredited cardiology fellowship",
      "fellowship after mbbs",
      "fellowship in cardiology",
      "fellowship in cardiology eligibility",
      "fellowship programs for doctors"
    ]
  },
  "government-doctor-salary-in-india": {
    "h1": "Government Doctor Salary in India: What Can You Earn in Public Healthcare?",
    "keywords": "government doctor salary in India",
    "title": "Government Doctor Salary in India 2026: Complete Pay Guide",
    "canonical": "government-doctor-salary-in-india",
    "description": "Explore government doctor salary in India, including MBBS, AIIMS, AFMS, pay scales, allowances, career growth, and 8th Pay Commission.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-98.jpg",
    "tags": [
      "7th pay commission doctor salary",
      "8th pay commission doctor salary",
      "aiims doctor salary",
      "cghs doctor salary",
      "doctor salary in india",
      "esic doctor salary",
      "government doctor pay scale",
      "government doctor salary",
      "government doctor salary after mbbs",
      "government doctor salary in india",
      "government doctor salary per month",
      "government hospital doctor salary",
      "government medical jobs"
    ]
  },
  "mbbs-doctor-salary-in-india": {
    "h1": "MBBS Doctor Starting Salary in India:  City, State & Hospital-Type Guide (2026)",
    "keywords": "mbbs doctor salary in india",
    "title": "MBBS Doctor Starting Salary — City & State Breakdown 2026",
    "canonical": "mbbs-doctor-salary-in-india",
    "description": "MBBS doctor starting salary ranges from ₹40,000 in UP to ₹95,000/month in Delhi. Compare pay by city, state, hospital type & years of experience.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-22-at-4.44.31-PM.webp",
    "tags": [
      "doctor salary after mbbs",
      "government doctor salary india",
      "govt mbbs doctor salary",
      "mbbs doctor career growth",
      "mbbs doctor salary in india per month",
      "mbbs doctor salary in private hospital",
      "starting salary of mbbs doctor"
    ]
  },
  "medical-officer-jobs-after-mbbs": {
    "h1": "Medical Officer Jobs After MBBS: Eligibility, Exams, Salary & Career Path (2026)",
    "keywords": "Medical Officer Jobs After MBBS",
    "title": "Medical Officer Jobs After MBBS: Salary & Exams 2026",
    "canonical": "medical-officer-jobs-after-mbbs",
    "description": "Medical Officer jobs after MBBS: eligibility, UPSC CMS, State PSC, AFMS & ESIC recruitment routes, exam pattern, salary ₹50K–₹1.77L/month, and career path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-21-at-5.44.50-PM.webp",
    "tags": [
      "government doctor jobs",
      "government jobs after mbbs",
      "government medical careers",
      "government medical officer jobs",
      "junior medical officer",
      "mbbs career options",
      "mbbs doctor jobs",
      "mbbs government jobs",
      "medical global academy",
      "medical officer after mbbs",
      "medical officer career",
      "medical officer career path",
      "medical officer eligibility",
      "medical officer exam",
      "medical officer jobs after mbbs",
      "medical officer recruitment",
      "medical officer recruitment exams"
    ]
  },
  "non-clinical-jobs-after-mbbs": {
    "h1": "Non-Clinical Jobs After MBBS: Explore Careers Beyond Clinical Practice",
    "keywords": "Non-Clinical Jobs After MBBS",
    "title": "Non-Clinical Jobs After MBBS: Is This the Right Career for You?",
    "canonical": "non-clinical-jobs-after-mbbs",
    "description": "Explore non-clinical jobs after MBBS, discover careers beyond patient care, and find the right medical path based on your skills, interests, and goals.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-20-at-3.44.13-PM.jpeg",
    "tags": [
      "career options after mbbs",
      "clinical research careers",
      "digital health careers",
      "health informatics",
      "healthcare management after mbbs",
      "hospital administration careers",
      "mbbs career options",
      "medical affairs careers",
      "medical careers beyond clinical practice",
      "medical education careers",
      "medical writing after mbbs",
      "non-clinical career after mbbs",
      "non-clinical jobs after mbbs",
      "pharmacovigilance jobs",
      "public health careers"
    ]
  },
  "clinical-career-after-mbbs": {
    "h1": "Clinical Jobs After MBBS: Build a Successful Clinical Career",
    "keywords": "Clinical Career After MBBS",
    "title": "Clinical Jobs After MBBS: Start Your Medical Career",
    "canonical": "clinical-career-after-mbbs",
    "description": "Explore the best clinical jobs after MBBS, career opportunities, growth, and practical guidance to build a successful clinical medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/mbbs-clinical-career-guide.webp",
    "tags": [
      "clinical career after mbbs",
      "clinical career guide",
      "clinical jobs after mbbs",
      "clinical practice after mbbs",
      "emergency medicine jobs",
      "fellowship after mbbs",
      "general physician career",
      "hospital jobs after mbbs",
      "icu doctor",
      "junior resident jobs",
      "mbbs career options",
      "medical careers after mbbs",
      "medical global academy",
      "pg diploma after mbbs",
      "resident medical officer"
    ]
  },
  "government-jobs-after-mbbs": {
    "h1": "Government Jobs After MBBS in India: Full List & Guide (2026)",
    "keywords": "Government Jobs After MBBS",
    "title": "Government Jobs After MBBS 2026: Full List & How to Apply",
    "canonical": "government-jobs-after-mbbs",
    "description": "Explore permanent government jobs after MBBS in India — central, state & PSU posts. Learn how to become a government doctor with exams, salary & apply process.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-96.webp",
    "tags": [
      "afms medical officer",
      "aiims recruitment",
      "career after mbbs",
      "esic medical officer",
      "government doctor jobs india",
      "government jobs after mbbs",
      "government medical careers",
      "mbbs government jobs",
      "medical officer career",
      "medical officer jobs",
      "nhm jobs",
      "public healthcare careers",
      "railway medical officer"
    ]
  },
  "doctor-salary-india": {
    "h1": "Doctor Salary in India: Understanding How Doctors Build Long-Term Income",
    "keywords": "Doctor Salary in India",
    "title": "Doctor Salary in India: What Shapes a Doctor's Income?",
    "canonical": "doctor-salary-india",
    "description": "Understand what influences doctor salary in India, from career choices and experience to specialization, skills, and long-term professional growth.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-95.jpg",
    "tags": [
      "average doctor salary in india",
      "career after mbbs",
      "doctor career growth",
      "doctor income in india",
      "doctor salary in india",
      "doctor salary per month",
      "government doctor salary in india",
      "mbbs doctor salary in india",
      "mbbs salary",
      "md doctor salary",
      "medical career in india",
      "medical doctor salary",
      "medical salary guide"
    ]
  },
  "best-jobs-after-mbbs": {
    "h1": "Jobs After MBBS: A Complete Career Guide for MBBS Doctors in India (2026 Guide)",
    "keywords": "Jobs After MBBS",
    "title": "Jobs After MBBS: Best Career Opportunities in India (2026)",
    "canonical": "best-jobs-after-mbbs",
    "description": "Explore the best jobs after MBBS in India, including government, private, clinical, and non-clinical careers. Find the right path for your medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/jobs-after-mbbs-career-opportunities-guide.webp",
    "tags": [
      "career opportunities after mbbs",
      "clinical jobs after mbbs",
      "doctor jobs in india",
      "government jobs after mbbs",
      "jobs after mbbs",
      "mbbs career guide",
      "mbbs jobs",
      "medical careers after mbbs",
      "medical global academy",
      "medical officer jobs",
      "non-clinical jobs after mbbs"
    ]
  },
  "most-in-demand-medical-specialties": {
    "h1": "Most In-Demand Medical Specialties in India: Complete 2026 Demand Guide",
    "keywords": "most in demand medical specialties in india",
    "title": "Most In-Demand Medical Specialties in India (2026 Guide)",
    "canonical": "most-in-demand-medical-specialties",
    "description": "Which doctor is most in demand in India? Cardiology, Emergency Medicine & Radiology top the list. Full demand analysis & growth drivers explained for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/most-in-demand-medical-specialties-in-india-scaled.webp",
    "tags": [
      "best medical specializations",
      "cardiology",
      "critical care medicine",
      "emergency medicine",
      "fellowship programs",
      "future medical specialties",
      "healthcare careers",
      "medical career after mbbs",
      "medical career guide",
      "medical education",
      "medical global academy",
      "medical specialties in india",
      "mga",
      "most in-demand medical specialties",
      "pg diploma programs",
      "radiology"
    ]
  },
  "highest-paying-medical-specializations": {
    "h1": "Highest Paying Medical Specializations in India:  Salary Guide for Doctors (2026)",
    "keywords": "highest paying medical specializations in india",
    "title": "Highest Paying Medical Specializations in India: 2026 Salary Guide",
    "canonical": "highest-paying-medical-specializations",
    "description": "Neurosurgery ₹1Cr+, Cardiology ₹80L+, Radiology ₹60L+ compare salary across 10 highest paying specializations in India. 2026 data, by experience & hospital type.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-91.webp",
    "tags": [
      "career after mbbs",
      "doctor salary in india",
      "fellowship programs",
      "healthcare careers",
      "highest paying doctors",
      "highest paying medical careers",
      "highest paying medical specializations",
      "medical career after mbbs",
      "medical career guide",
      "medical education",
      "medical global academy",
      "medical specializations in india",
      "medical specialties",
      "pg diploma programs",
      "specialist doctor salary"
    ]
  },
  "how-to-choose-medical-specialization": {
    "h1": "How to Choose the Right Medical Specialization? A Practical Guide for MBBS Doctors",
    "keywords": "Medical Specialization",
    "title": "How to Choose the Right Medical Specialization After MBBS",
    "canonical": "how-to-choose-medical-specialization",
    "description": "Learn how to choose the right medical specialization after MBBS with practical tips, self-assessment, internship insights, and career guidance.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-90.webp",
    "tags": [
      "career guide for mbbs doctors",
      "choosing a medical specialization",
      "how to choose a medical specialty",
      "internship career guide",
      "mbbs career guide",
      "medical career planning",
      "medical education",
      "medical global academy",
      "medical specialization after mbbs"
    ]
  },
  "which-medical-specialization-is-best-after-mbbs": {
    "h1": "Medical Specialization After MBBS: Which Specialty Is Right for You? (2026)",
    "keywords": "medical specialization after MBBS",
    "title": "Medical Specialization After MBBS: Complete Guide for Doctors",
    "canonical": "which-medical-specialization-is-best-after-mbbs",
    "description": "Compare 15+ medical specializations after MBBS — salary, scope, demand & career path. The only specialization guide you need in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-85.jpg",
    "tags": [
      "advanced medical research",
      "best medical specialization after mbbs",
      "cardiology",
      "career after mbbs",
      "critical care",
      "dermatology",
      "diabetology",
      "emergency medicine",
      "fetal medicine",
      "mbbs career",
      "medical courses",
      "medical education",
      "medical global academy",
      "medical specialization",
      "medical specialization after mbbs",
      "pathology",
      "radiology",
      "urology"
    ]
  },
  "best-specialization-after-mbbs": {
    "h1": "MD vs MS vs DNB After MBBS: Which PG Path Should You Choose? (2026)",
    "keywords": "md vs ms after mbbs",
    "title": "MD vs MS vs DNB After MBBS: Which PG Path to Choose?",
    "canonical": "best-specialization-after-mbbs",
    "description": "MD, MS, or DNB — which postgraduate path fits your specialty goal? Compare training, recognition & career scope. 2026 guide for MBBS doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-84.jpg",
    "tags": [
      "best specialization after mbbs",
      "best specialization after mbbs in india",
      "career after mbbs",
      "mbbs career",
      "medical courses",
      "medical education",
      "medical global academy",
      "medical specialization",
      "postgraduate medical courses"
    ]
  },
  "best-gynecology-courses-after-mbbs": {
    "h1": "gynecology courses after mbbs",
    "keywords": "gynecology courses after mbbs",
    "title": "Best Gynecology Courses After MBBS in India (2026)",
    "canonical": "best-gynecology-courses-after-mbbs",
    "description": "Explore the best Gynecology courses after MBBS in India. Compare fellowships, choose the right specialization, and advance your medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-83.jpg",
    "tags": [
      "best gynecology courses after mbbs",
      "fellowship in gyne pathology",
      "fellowship in obstetrics & gynaecology",
      "gynecology courses after mbbs",
      "medical global academy"
    ]
  },
  "courses-after-mbbs-without-neet-pg": {
    "h1": "Best Courses After MBBS Without NEET PG in 2026: Salary, Scope, Eligibility & Career Opportunities",
    "keywords": "courses after mbbs without neet pg",
    "title": "Best Courses After MBBS Without NEET PG (2026)",
    "canonical": "courses-after-mbbs-without-neet-pg",
    "description": "Explore the best courses after MBBS without NEET PG, including MRCP, MRCOG, MRCEM, career scope, eligibility, and fellowships.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/best-courses-after-mbbs-with-out-neet-pg.webp",
    "tags": [
      "courses after mbbs without neet pg",
      "mbbs career",
      "medical fellowship",
      "medical specialization",
      "mrcem",
      "mrcog",
      "mrcp"
    ]
  },
  "how-to-become-a-cardiologist-india": {
    "h1": "How to Become a Cardiologist in India: Complete Guide 2026",
    "keywords": "how to become a cardiologist in India",
    "title": "How to Become a Cardiologist in India: Years & DM Roadmap",
    "canonical": "how-to-become-a-cardiologist-india",
    "description": "How to become a cardiologist in India? MBBS → MD → DM takes 11–13 years. Explore eligibility, entrance exams, salary & complete cardiologist career roadmap.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/how-to-become-cardiologist-after-mbbs-career-roadmap.jpeg",
    "tags": [
      "cardiologist course duration",
      "cardiology career",
      "cardiology course after mbbs in india",
      "cardiology training for doctors",
      "clinical cardiology course",
      "dm cardiology",
      "fellowship in cardiology",
      "how to become a cardiologist"
    ]
  },
  "cardiology-courses-after-mbbs": {
    "h1": "Cardiology Courses After MBBS in India: Complete Guide 2026",
    "keywords": "cardiology courses after mbbs",
    "title": "Cardiology Courses After MBBS: Duration, Fees & Eligibility 2026",
    "canonical": "cardiology-courses-after-mbbs",
    "description": "Cardiology courses after MBBS: eligibility, duration & fees explained. Learn how to become a cardiologist via DM, PGDCC & fellowship options in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/cardiology-courses-after-mbbs-india.webp-1.jpeg",
    "tags": [
      "cardiology career after mbbs",
      "cardiology courses after mbbs",
      "cardiology specialization after mbbs",
      "cardiology training for doctors",
      "clinical cardiology course",
      "fellowship in cardiology",
      "how to become cardiologist after mbbs",
      "medical courses after mbbs"
    ]
  },
  "post-mbbs-fellowship-vs-pg-diploma": {
    "h1": "Fellowship vs PG Diploma After MBBS in India",
    "keywords": "post mbbs fellowship courses",
    "title": "Post MBBS Fellowship Courses vs PG Diploma After MBBS in India",
    "canonical": "post-mbbs-fellowship-vs-pg-diploma",
    "description": "Confused between post MBBS fellowship courses and PG Diploma? Compare career, salary & skills to choose the best path in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/fellowship-vs-pg-diploma-after-mbbs.jpeg",
    "tags": [
      "after mbbs what next",
      "best courses after mbbs in india",
      "career after mbbs",
      "doctor career options after mbbs",
      "fellowship courses after mbbs in india",
      "fellowship vs pg diploma after mbbs",
      "medical courses after mbbs",
      "pg diploma after mbbs",
      "post mbbs fellowship courses",
      "specialization after mbbs"
    ]
  },
  "jobs-after-mbbs": {
    "h1": "Jobs After MBBS in India: Complete Salary Guide 2026",
    "keywords": "jobs after mbbs",
    "title": "Jobs After MBBS: ₹40K–₹10L/Month Salary Guide India 2026",
    "canonical": "jobs-after-mbbs",
    "description": "Jobs after MBBS in India: Salary ₹40K–₹10L/month. Explore top careers, govt vs private pay, scope & highest paying options in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/jobs-after-mbbs-salary-india-2026.jpg.jpg",
    "tags": [
      "career after mbbs",
      "doctor salary in india after mbbs",
      "emergency medicine salary india",
      "highest paying jobs after mbbs",
      "icu doctor salary india",
      "jobs after mbbs",
      "mbbs jobs and salary",
      "medical officer salary in india",
      "private practice after mbbs",
      "salary after mbbs",
      "what after mbbs"
    ]
  },
  "career-after-mbbs": {
    "h1": "After MBBS What to Do? Complete Career Guide for 2026",
    "keywords": "career after mbbs",
    "title": "After MBBS What to Do? Top Career Options in India 2026",
    "canonical": "career-after-mbbs",
    "description": "After MBBS, what to do next? Explore top career options — MD/MS, govt jobs, private practice & non-clinical paths. Complete 2026 guide with salary & scope.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/career-after-mbbs-best-career-options-and-growth-pathways.jpg.jpeg",
    "tags": [
      "best career after mbbs",
      "career after mbbs",
      "career after mbbs without neet pg",
      "career options after mbbs",
      "jobs after mbbs",
      "medical career after mbbs",
      "specialization after mbbs"
    ]
  },
  "fellowship-courses-after-mbbs-in-india": {
    "h1": "Best Fellowship Courses After MBBS in India: 10 Fellowship Options Every Doctor Should Explore",
    "keywords": "fellowship courses after mbbs in india",
    "title": "Fellowship Courses After MBBS in India: 10 Best Courses",
    "canonical": "fellowship-courses-after-mbbs-in-india",
    "description": "Explore fellowship courses after MBBS in India. Compare 10 popular courses, specialty scope, clinical skills, and career opportunities.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/fellowship-courses-after-mbbs-in-india-top-10-programs.jpg.jpeg",
    "tags": [
      "best fellowship courses after mbbs",
      "clinical fellowship courses after mbbs",
      "fellowship after mbbs",
      "fellowship courses after mbbs",
      "fellowship courses after mbbs in india",
      "medical fellowship programs",
      "post mbbs fellowship courses"
    ]
  },
  "courses-after-mbbs-in-india": {
    "h1": "PG Courses After MBBS in India: Complete Guide 2026",
    "keywords": "PG Diploma Courses After MBBS",
    "title": "PG Courses After MBBS in India 2026: MD, MS, DNB & Diploma",
    "canonical": "courses-after-mbbs-in-india",
    "description": "Explore PG courses, MD/MS, DNB, diploma & fellowship options after MBBS in India — compare duration, eligibility, career scope & salary for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/courses-after-mbbs-in-india.webp.jpeg",
    "tags": [
      "after mbbs",
      "after mbbs what next",
      "career after mbbs",
      "career options after mbbs",
      "courses after mbbs in india",
      "fellowship courses after mbbs in india",
      "jobs after mbbs",
      "post mbbs fellowship courses",
      "specialisation after mbbs",
      "what to do after mbbs"
    ]
  },
  "what-to-do-after-mbbs": {
    "h1": "What to Do After MBBS in India? 8 Career Paths, Salary Data & Honest Advice",
    "keywords": "what to do after mbbs",
    "title": "What to Do After MBBS in India 2026 | Complete Guide",
    "canonical": "what-to-do-after-mbbs",
    "description": "Confused about what to do after MBBS? Compare all 8 career paths — fellowship, PG diploma, government jobs, and more — with salary data and honest advice.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-08-06-at-5.11.41-PM.jpeg",
    "tags": [
      "best specialization after mbbs",
      "career after mbbs",
      "career options for mbbs doctors",
      "courses after mbbs",
      "fellowship after mbbs",
      "fellowship courses after mbbs",
      "fellowship vs pg diploma",
      "government jobs after mbbs",
      "jobs after mbbs",
      "mbbs career guide 2026",
      "mbbs doctor salary",
      "mbbs doctors",
      "medical career guidance",
      "medical education",
      "neet pg alternatives",
      "specialization after mbbs"
    ]
  },
  "fellowship-in-dermatology-skills": {
    "h1": "Fellowship in Dermatology Skills: Hands-On Skin Training Course 2026",
    "keywords": "fellowship in dermatology skills",
    "title": "Fellowship in Dermatology Skills: Skin Course India 2026",
    "canonical": "fellowship-in-dermatology-skills",
    "description": "Fellowship in Dermatology Skills for MBBS/BAMS doctors — skin, hair, nail & cosmetic procedure training. Hands-on hybrid course India. Enroll 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/04/fellowship-in-dermatology-skills.jpeg",
    "tags": [
      "career opportunities after drermatology fellowship",
      "cosmetic dermatology fellowship",
      "dermatology course after mbbs",
      "dermatology skills training",
      "fellowship after md dermatology in india",
      "fellowship for mbbs doctors in india",
      "fellowship in dermatology in india",
      "fellowship in dermatology skills",
      "hands on training in dermatology fellowship",
      "online fellowship in dermatology",
      "skin treatment course india"
    ]
  },
  "key-benefits-of-fellowship-in-oncology-for-doctors": {
    "h1": "What Are the Key Benefits of Fellowship in Oncology for Doctors",
    "keywords": "Oncology Fellowship",
    "title": "What Are the Key Benefits of Fellowship in Oncology for Doctors",
    "canonical": "key-benefits-of-fellowship-in-oncology-for-doctors",
    "description": "Unlock expert skills, advanced research, and career growth with an Oncology Fellowship. Elevate patient care and lead in cancer treatment.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM.jpeg",
    "tags": [
      "advanced medical research",
      "cancer specialist training",
      "career growth for doctors",
      "medical education",
      "oncology fellowship"
    ]
  },
  "online-medical-courses-in-india": {
    "h1": "Online Medical Courses in India for Improving Clinical Skills Fast",
    "keywords": "medical courses in india",
    "title": "Online Medical Courses in India for Improving Clinical Skills Fast",
    "canonical": "online-medical-courses-in-india",
    "description": "Master clinical practice with top-rated online medical courses in india. Enhance your skills fast through expert-led training and certification.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-21-at-4.44.48-PM.jpg",
    "tags": [
      "medical course in india",
      "online medical courses in india"
    ]
  },
  "online-medical-course-with-certificate": {
    "h1": "Online Medical Course with Certificate in India: Best Options for Practising Doctors",
    "keywords": "online medical course with certificate",
    "title": "Online Medical Course with Certificate: Best Options for Doctors",
    "canonical": "online-medical-course-with-certificate",
    "description": "Top online medical course with certificate. Get certified in Cardiology, Diabetes, & more from Medical Global Academy. Enroll now!",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-4.34.59-PM.jpeg",
    "tags": [
      "clinical fellowship online india",
      "cme certification courses for mbbs doctors",
      "medical certification courses for practitioners",
      "online medical courses for doctors in india",
      "postgraduate medical diploma online"
    ]
  },
  "online-medical-course-options": {
    "h1": "Online Medical Courses for Doctors: Clinical Upskilling & Certification",
    "keywords": "courses for doctors",
    "title": "Online Medical Courses for Doctors: Upskill & Certify 2026",
    "canonical": "online-medical-course-options",
    "description": "Online medical courses for doctors — clinical upskilling via fellowship, diploma & certificate programs. Hybrid learning with CPD certification. Enroll 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/online-medical-courses-option.jpg.jpeg",
    "tags": [
      "best online medical course in india",
      "clinical cardiology courses",
      "emergency medicine fellowships",
      "online medical certificate",
      "online medical course with certificate",
      "online medical courses in india",
      "online medical courses with certificates",
      "online pathology course"
    ]
  },
  "what-are-the-top-requirements-for-a-fellowship-in-paediatric-medicine": {
    "h1": "What are the Top Requirements for a Fellowship in Paediatric Medicine",
    "keywords": "Paediatric Medicine",
    "title": "The Top Requirements for a Fellowship in Paediatric Medicine",
    "canonical": "what-are-the-top-requirements-for-a-fellowship-in-paediatric-medicine",
    "description": "Explore the essential requirements for a Fellowship in Paediatric Medicine. From MRCPCH to clinical logs, learn how to secure your spot.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-1.jpeg",
    "tags": [
      "fellowship in paediatric medicine",
      "md pediatrics career path",
      "medical global academy",
      "pediatric fellowship requirements",
      "pediatric subspecialty training"
    ]
  },
  "how-is-ai-changing-the-curriculum-of-a-dermatology-fellowship": {
    "h1": "How is AI changing the curriculum of a dermatology fellowship",
    "keywords": "dermatology fellowship",
    "title": "How is AI changing the curriculum of a dermatology fellowship",
    "canonical": "how-is-ai-changing-the-curriculum-of-a-dermatology-fellowship",
    "description": "Explore how AI is transforming dermatology fellowship curricula through diagnostics, training, and personalized patient care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_6jskr6jskr6jskr6.png",
    "tags": [
      "ai in dermatology",
      "clinical training",
      "dermatology fellowship",
      "healthcare technology",
      "medical education"
    ]
  },
  "best-career-paths-after-a-fellowship-in-emergency-medicine": {
    "h1": "What are the best career paths after a Fellowship in Emergency Medicine",
    "keywords": "Best career paths after a Fellowship",
    "title": "Best career paths after a Fellowship in Emergency Medicine",
    "canonical": "best-career-paths-after-a-fellowship-in-emergency-medicine",
    "description": "Unlock your future: Discover the best career paths after a Fellowship in Emergency Medicine. From academia to tech, lead the future of ER.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_nhffqenhffqenhff.png",
    "tags": [
      "emergency medicine careers",
      "er doctor leadership",
      "fellowship in emergency medicine",
      "medical global academy",
      "medical sub-specialties"
    ]
  },
  "how-general-laparoscopic-surgery-change-the-patient-experience": {
    "h1": "How Does a Fellowship in General Laparoscopic Surgery Change the Patient Experience?",
    "keywords": "Patient Experience",
    "title": "How General Laparoscopic Surgery Change the Patient Experience",
    "canonical": "how-general-laparoscopic-surgery-change-the-patient-experience",
    "description": "Boost patient Experience with fellowship-trained surgeons. Learn how specialized expertise leads to faster recovery and less post-op pain.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.04-PM.jpeg",
    "tags": [
      "advanced surgical training",
      "general laparoscopic surgery",
      "minimally invasive surgery",
      "patient recovery outcomes",
      "surgical fellowship benefits"
    ]
  },
  "best-dermatology-courses-for-medical-students-in-2026": {
    "h1": "Best Dermatology Courses for Medical Students in 2026",
    "keywords": "Dermatology Courses",
    "title": "Best Dermatology Courses for Medical Students in 2026",
    "canonical": "best-dermatology-courses-for-medical-students-in-2026",
    "description": "Discover the top dermatology courses for medical students in 2026. From MD residency to elite fellowships at Medical Global Academy.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-2.jpeg",
    "tags": [
      "dermatology courses 2026",
      "dermatology training",
      "medical fellowships",
      "medical global academy",
      "skin specialization"
    ]
  },
  "fellowship-in-pediatric-dermatology-help-you-start-your-own-clinic": {
    "h1": "Can a Fellowship in Pediatric Dermatology Help You Start Your Own Specialized Clinic",
    "keywords": "Pediatric",
    "title": "Fellowship in Pediatric Dermatology Help You Start Your Own Clinic",
    "canonical": "fellowship-in-pediatric-dermatology-help-you-start-your-own-clinic",
    "description": "Launch your dream clinic! Discover how a Fellowship in Pediatric Dermatology from Medical Global Academy builds expertise & clinical trust.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-3.jpeg",
    "tags": [
      "medical global academy",
      "pediatric dermatology fellowship",
      "pediatric skin specialist",
      "post-graduate medical education",
      "specialized medical clinic"
    ]
  },
  "pg-diploma-in-dermatology-after-mbbs": {
    "h1": "PG Diploma in Dermatology After MBBS: Clinical Skills Every Doctor Should Learn",
    "keywords": "PG Diploma in Dermatology After MBBS",
    "title": "PG Diploma in Dermatology After MBBS | Clinical Skills for Doctors",
    "canonical": "pg-diploma-in-dermatology-after-mbbs",
    "description": "PG Diploma in Dermatology after MBBS—clinical training in acne, eczema, fungal infections and skin procedures doctors need for confident dermatology care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/pg-diploma-in-dermatology-mbbs.jpeg",
    "tags": [
      "Dermatology online courses with certificate",
      "diploma in dermatology",
      "diploma in dermatology online",
      "diploma in dermatoloogy in delhi",
      "p g diploma in dermatology after mbbs",
      "pg diploma in dermatology",
      "pg diploma in dermatology online"
    ]
  },
  "career-options-after-a-fellowship-in-reproductive-medicine": {
    "h1": "What are the career options after a Fellowship Program in Reproductive medicine",
    "keywords": "Career Options",
    "title": "The career options after a Fellowship in Reproductive medicine %",
    "canonical": "career-options-after-a-fellowship-in-reproductive-medicine",
    "description": "Career options after a Fellowship in Reproductive Medicine, including IVF specialist roles, research, teaching, and fertility clinics.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.06-PM.jpeg",
    "tags": [
      "assisted reproductive technology",
      "fellowship in reproductive medicine",
      "fertility specialist career",
      "ivf specialist training",
      "reproductive medicine career"
    ]
  },
  "echocardiography-worth-it-for-career-advancement": {
    "h1": "Fellowship in Echocardiography Worth It for Career Advancement",
    "keywords": "Echocardiography",
    "title": "Fellowship in Echocardiography Worth It for Career Advancement",
    "canonical": "echocardiography-worth-it-for-career-advancement",
    "description": "Fellowship in echocardiography worth it for career advancement. Learn about salary prospects, certification pathways.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_brlkacbrlkacbrlk.png",
    "tags": [
      "cardiac imaging certification",
      "cardiology career advancement",
      "echocardiography training",
      "fellowship in echocardiography",
      "medical subspecialty fellowship"
    ]
  },
  "scope-of-ultrasonography-in-2026": {
    "h1": "In 2026 What is the Scope of a PG Diploma in Ultrasonography",
    "keywords": "scope-of-ultrasonograph",
    "title": "In 2026 What is the Scope of a PG Diploma in Ultrasonography?",
    "canonical": "scope-of-ultrasonography-in-2026",
    "description": "Explore the career scope, AI trends, and high-paying roles for doctors with a PG Diploma in Ultrasonography in 2026. Stay ahead in medicine",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-4.jpeg",
    "tags": [
      "medical diagnostics 2026",
      "pg diploma in ultrasonography",
      "radiology training",
      "sonography career scope",
      "ultrasound course for doctors"
    ]
  },
  "fellowship-in-laparoscopy-skills-every-surgeon-should-master": {
    "h1": "Fellowship in Laparoscopy Skills Every Surgeon Should Master",
    "keywords": "Laparoscopy skills",
    "title": "Fellowship in Laparoscopy Skills Every Surgeon Should Master",
    "canonical": "fellowship-in-laparoscopy-skills-every-surgeon-should-master",
    "description": "Master essential Laparoscopy skills in a Fellowship in Laparoscopy and advance your surgical career with expert training.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-3-2026-05_11_45-PM.png",
    "tags": [
      "advanced surgical fellowship",
      "fellowship in laparoscopy",
      "laparoscopic surgery skills",
      "laparoscopy for surgeons",
      "minimally invasive surgery training"
    ]
  },
  "career-scope-after-fellowship-in-oncopathology-in-2026": {
    "h1": "Career Scope After Fellowship in Oncopathology in 2026",
    "keywords": "Oncopathology in 2026",
    "title": "Career Scope After Fellowship in Oncopathology in 2026",
    "canonical": "career-scope-after-fellowship-in-oncopathology-in-2026",
    "description": "Explore career scope after Fellowship in Oncopathology in 2026, including salary, job opportunities, growth, and global career prospects.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-2-2026-05_18_41-PM.png",
    "tags": [
      "cancer pathology fellowship",
      "career after fellowship in oncopathology",
      "fellowship in oncopathology",
      "oncopathologist salary",
      "oncopathology career scope"
    ]
  },
  "fellowship-in-dermatology-a-career-guide": {
    "h1": "Fellowship in Dermatology After MBBS: Complete Guide (2026)",
    "keywords": "Fellowship in Dermatology After MBBS",
    "title": "Fellowship in Dermatology after mbbs a Career Guide",
    "canonical": "fellowship-in-dermatology-a-career-guide",
    "description": "Here you will know about Fellowship in Dermatology after mbbs a career guide, income scope & clear learning for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/fellowship-in-dermatology-after-mbbs-JPG.png",
    "tags": [
      "dermatology fellowships after mbbs",
      "doctors in 2026",
      "fellowship course in dermatology",
      "fellowship in dermatology after mbbs",
      "online fellowship in dermatology in india"
    ]
  },
  "fellowship-in-critical-care-complete-guide-for-medical-graduates": {
    "h1": "Fellowship in Critical Care: Complete Guide for Medical Graduates",
    "keywords": "Fellowship in Critical Care",
    "title": "Fellowship in Critical Care: Complete Guide for Medical Graduates",
    "canonical": "fellowship-in-critical-care-complete-guide-for-medical-graduates",
    "description": "Complete guide to Fellowship in Critical Care covering eligibility, duration, salary, career scope, admission, and ICU specialist training.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-28-2026-02_49_04-PM.png",
    "tags": [
      "critical care career",
      "critical care course",
      "critical care fellowship",
      "fellowship in critical care",
      "icu fellowship"
    ]
  },
  "best-city-for-doing-fellowship-in-clinical-genetics": {
    "h1": "Clinical Genetics Fellowship: Best Cities, Training & Career",
    "keywords": "Clinical Genetics Fellowship",
    "title": "Clinical Genetics Fellowship: Best Cities & Career Guide",
    "canonical": "best-city-for-doing-fellowship-in-clinical-genetics",
    "description": "Explore Clinical Genetics Fellowship options in India, best cities, training areas, eligibility, clinical exposure, and career opportunities for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-27-2026-02_59_24-PM.png",
    "tags": [
      "clinical genetics fellowship",
      "clinical genetics training for doctors",
      "clinical genetics training in india",
      "fellowship in clinical genetics",
      "fellowship programs in india"
    ]
  },
  "top-benefits-of-doing-a-fellowship-in-cosmetic-gynecology": {
    "h1": "Top Benefits of Doing a Fellowship in Cosmetic Gynecology",
    "keywords": "Doing a Fellowship",
    "title": "Top Benefits of Doing a Fellowship in Cosmetic Gynecology",
    "canonical": "top-benefits-of-doing-a-fellowship-in-cosmetic-gynecology",
    "description": "Top benefits of doing a Fellowship in Cosmetic Gynecology, including career growth, higher income, advanced skills, and future scope.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-26-2026-12_26_45-PM.png",
    "tags": [
      "aesthetic gynecology training",
      "cosmetic gynecology career",
      "cosmetic gynecology course",
      "fellowship in cosmetic gynecology",
      "medical fellowship for doctors"
    ]
  },
  "pg-diploma-in-general-medicine-india": {
    "h1": "Diploma in General Medicine: Complete Course Guide 2026",
    "keywords": "Diploma in General Medicine",
    "title": "Diploma in General Medicine: Course & Career Guide India",
    "canonical": "pg-diploma-in-general-medicine-india",
    "description": "Explore a Diploma in General Medicine after MBBS, including course scope, career options, clinical skills, and practice opportunities for doctors in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/pg-diploma-in-general-medicine-india.jpg.jpg",
    "tags": [
      "diploma courses after mbbs in india",
      "diploma in general medicine in india",
      "general medicine course after mbbs",
      "general medicine diploma course"
    ]
  },
  "facial-aesthetic-cosmetology-in-2026": {
    "h1": "Why Choose a Facial Aesthetics Course in 2026?",
    "keywords": "Facial Aesthetics Course",
    "title": "Facial Aesthetics Course: Why Choose It in 2026?",
    "canonical": "facial-aesthetic-cosmetology-in-2026",
    "description": "Explore a Facial Aesthetics Course in 2026, including training, procedures, eligibility, career opportunities, and skills for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-25-2026-01_40_27-PM.png",
    "tags": [
      "aesthetic medicine training programs",
      "facial aesthetic and cosmetology course",
      "facial aesthetic procedures and career",
      "facial aesthetics training for doctors"
    ]
  },
  "interventional-radiology-in-india": {
    "h1": "Fellowship in Interventional Radiology in India: Eligibility & Scope",
    "keywords": "Interventional radiology in India",
    "title": "Interventional Radiology Training for Doctors",
    "canonical": "interventional-radiology-in-india",
    "description": "Learn interventional radiology in India with expert mentorship, practical training support, and doctor-focused education.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-24-2026-10_33_09-AM.png",
    "tags": [
      "fellowship in interventional radiology in india",
      "interventional radiology course india",
      "interventional radiology fellowship india",
      "ir fellowship eligibility india",
      "medical global academy"
    ]
  },
  "diabetology-after-mbbs-eligibility": {
    "h1": "Diabetology Course After MBBS: Fellowship, F.Diab & FIDM Guide 2026",
    "keywords": "fellowship in diabetology after mbbs",
    "title": "Diabetology Course After MBBS: F.Diab, FIDM Fees & Eligibility",
    "canonical": "diabetology-after-mbbs-eligibility",
    "description": "Diabetology course after MBBS — F.Diab full form, FIDM degree, fellowship eligibility, fees & salary in India. Complete 2026 guide for MBBS doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-23-2026-01_47_48-PM.png",
    "tags": [
      "diabetes care course",
      "diabetologist salary in india",
      "diabetology career scope",
      "diabetology course for doctors",
      "diabetology fellowship eligibility",
      "fellowship in diabetes",
      "fellowship in diabetology",
      "fellowship in diabetology after mbbs"
    ]
  },
  "diploma-in-dermatology-after-mbbs": {
    "h1": "Diploma in Dermatology After MBBS: Complete Course Guide 2026",
    "keywords": "Diploma in Dermatology After MBBS",
    "title": "Diploma in Dermatology After MBBS: DDVL, DVD Course & Fees",
    "canonical": "diploma-in-dermatology-after-mbbs",
    "description": "Diploma in Dermatology after MBBS — DDVL, DVD course details, fees ₹50K–2L, eligibility & career scope. 2-year program for MBBS doctors in India 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/diploma-in-dermatology-india.jpeg",
    "tags": [
      "career in dermatology after mbbs",
      "clinical scope of dermatology in india",
      "dermatology course after mbbs in india",
      "dermatology diploma course in india",
      "diploma in dermatology after mbbs",
      "fellowship in dermatology in india",
      "postgraduate diploma in dermatology"
    ]
  },
  "interventional-radiology-after-md-radiology": {
    "h1": "Fellowship in Interventional Radiology After MD Radiology: What You Need to Know",
    "keywords": "Interventional Radiology",
    "title": "Fellowship in Interventional Radiology After MD Radiology",
    "canonical": "interventional-radiology-after-md-radiology",
    "description": "Fellowship in Interventional Radiology after MD Radiology, eligibility, duration, career scope, salary, and training details.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-20-2026-04_30_31-PM.png",
    "tags": [
      "fellowship in interventional radiology",
      "interventional radiologist training and salary",
      "interventional radiology after md radiology",
      "ir fellowship career scope"
    ]
  },
  "artificial-intelligence-reproductive-medicine-2026": {
    "h1": "AI in IVF: Clinical Applications and Trends in 2026",
    "keywords": "AI in IVF",
    "title": "AI in IVF: How It Is Changing Fertility Care in 2026",
    "canonical": "artificial-intelligence-reproductive-medicine-2026",
    "description": "AI in IVF is changing embryo selection, fertility treatment and clinical care. Explore its key applications, benefits, challenges and future in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-19-at-4.15.15-PM.jpeg",
    "tags": [
      "ai applications in reproductive medicine",
      "ai in ivf and fertility treatment",
      "artificial intelligence in fertility care",
      "artificial intelligence in ivf"
    ]
  },
  "medical-fellowship-courses-booming-in-india-2026": {
    "h1": "Medical Fellowship Programs in India: Why They Are Growing in 2026",
    "keywords": "Medical Fellowship Programs in India",
    "title": "Medical Fellowship Programs in India: 2026 Guide",
    "canonical": "medical-fellowship-courses-booming-in-india-2026",
    "description": "Explore Medical Fellowship Programs in India in 2026, popular specialties, benefits, eligibility, duration, and how fellowships support doctors' careers.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-19-2026-11_35_08-AM.png",
    "tags": [
      "medical fellowship programs in india 2026",
      "best medical fellowship courses in india",
      "medical fellowship programs for doctors",
      "fellowship courses after mbbs in india",
      "clinical fellowship programs in india",
      "medical fellowship career opportunities",
      "postgraduate medical fellowship courses"
    ]
  },
  "medical-career-in-pathology-skills-you-need-to-succeed": {
    "h1": "Medical Career in Pathology: Skills You Need to Succeed",
    "keywords": "career in pathology",
    "title": "Medical Career in Pathology: Skills You Need to Succeed",
    "canonical": "medical-career-in-pathology-skills-you-need-to-succeed",
    "description": "Start a successful medical career in pathology by learning essential skills, courses, salary, and career opportunities.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-18-2026-04_51_33-PM.png",
    "tags": [
      "medical career in pathology",
      "pathology career scope and salary",
      "pathology career skills",
      "pathology courses after 12th"
    ]
  },
  "surgical-oncology-education-training-and-career-path": {
    "h1": "Surgical Oncology Training: Career Path & Requirements",
    "keywords": "Surgical oncology Training",
    "title": "Surgical Oncology Training: Eligibility & Career Path",
    "canonical": "surgical-oncology-education-training-and-career-path",
    "description": "Explore Surgical Oncology Training, eligibility, course options, career paths, and skills for doctors planning a career in surgical oncology in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-17-2026-04_22_16-PM.png",
    "tags": [
      "online surgical oncology training program",
      "surgical oncology career after mbbs",
      "surgical oncology course in india",
      "surgical oncology training for doctors"
    ]
  },
  "dermatology-course-career-scope-salary-and-opportunities": {
    "h1": "dermatology scope in India",
    "keywords": "dermatology scope in India",
    "title": "Dermatology Scope in India: Career, Salary & Opportunities",
    "canonical": "dermatology-course-career-scope-salary-and-opportunities",
    "description": "Explore the dermatology scope in India, including career options, salary factors, job opportunities, specializations and future growth for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-16-2026-04_52_52-PM.png",
    "tags": [
      "dermatology scope in india",
      "dermatology career options in india",
      "dermatology salary in india",
      "dermatology job opportunities in india",
      "dermatology specializations in india",
      "dermatology career growth in india",
      "future of dermatology in india"
    ]
  },
  "how-fellowship-in-laparoscopy-hysteroscopy-can-boost-your-medical-career": {
    "h1": "How Fellowship in Laparoscopy & Hysteroscopy Can Boost Your Medical Career",
    "keywords": "Laparoscopy & Hysteroscopy",
    "title": "How Fellowship in Laparoscopy & Hysteroscopy Can Boost Career",
    "canonical": "how-fellowship-in-laparoscopy-hysteroscopy-can-boost-your-medical-career",
    "description": "Boost your medical career in Fellowship in Laparoscopy & Hysteroscopy. advanced minimally invasive surgical skills, improve patient outcomes,",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-14-2026-05_25_33-PM.png",
    "tags": [
      "advanced surgical skills for doctors",
      "fellowship in laparoscopy & hysteroscopy",
      "medical career growth opportunities",
      "minimally invasive gynecology training"
    ]
  },
  "certificate-in-family-medicine-complete-guide-2026": {
    "h1": "Family Medicine Course 2026: Complete Guide for Doctors",
    "keywords": "Family Medicine Course",
    "title": "Family Medicine Course 2026: Fees, Eligibility & Career",
    "canonical": "certificate-in-family-medicine-complete-guide-2026",
    "description": "Explore the Family Medicine Course 2026 with details on eligibility, fees, duration, curriculum, career scope, salary and admission for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-13-2026-02_42_09-PM.png",
    "tags": [
      "family medicine course",
      "family medicine courses",
      "family medicine for doctors",
      "family medicine training course"
    ]
  }
};

// ---------------------------------------------------------------------------
// Apply title cleanup to every entry so "MGA" / "Medical Global Academy"
// never appears in the rendered <title>.
// ---------------------------------------------------------------------------
export const BLOG_META = Object.fromEntries(
  Object.entries(RAW_BLOG_META).map(([slug, meta]) => [
    slug,
    {
      ...meta,
      title: cleanTitle(meta.title),
    },
  ])
);

/**
 * Look up manual SEO/content overrides for a blog post by its slug.
 * Returns null if no override exists for that slug (falls back to WP data).
 * If the cleaned title ends up empty, falls back to h1 or a humanised slug.
 */
export function getBlogMeta(slug) {
  if (!slug) return null;

  const meta = BLOG_META[slug];
  if (!meta) return null;

  return {
    ...meta,
    title:
      meta.title ||
      meta.h1 ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}