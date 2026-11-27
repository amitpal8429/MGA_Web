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
  
  },


    "orthopedic-surgeon-after-mbbs": {
    "h1": "How to Become an Orthopedic Surgeon After MBBS: Complete Career",
    "keywords": "orthopedic surgeon after mbbs",
    "title": "Orthopedic Surgeon After MBBS: Career Path & Guide",
    "canonical": "orthopedic-surgeon-after-mbbs",
    "description": "Want to become an orthopedic surgeon after MBBS? Explore the career path, eligibility, NEET PG, specialization, training and future opportunities.",
    "image": null,
  },
  "heart-failure-and-cardiomyopathies-diagnosis-management": {
    "h1": "Heart Failure and Cardiomyopathies: A Clinical Overview for Practicing Physicians",
    "keywords": "heart failure and cardiomyopathies",
    "title": "Heart Failure & Cardiomyopathies: A Physician's Guide",
    "canonical": "heart-failure-and-cardiomyopathies-diagnosis-management",
    "description": "Explore heart failure and cardiomyopathies, including clinical features, diagnosis, classification and evidence-based management approaches for practicing physicians.",
    "image": null,
  },
  "dermoscopy-for-general-physicians-clinical-benefits": {
    "h1": "Dermoscopy for General Physicians: Why This Skill Belongs in Primary Care",
    "keywords": "dermoscopy for general physicians",
    "title": "Dermoscopy for General Physicians: Clinical Benefits & Skills",
    "canonical": "dermoscopy-for-general-physicians-clinical-benefits",
    "description": "Learn how dermoscopy for general physicians improves skin lesion assessment, early detection, diagnostic accuracy and clinical decision-making in primary care.",
    "image": null,
  },

    "congenital-heart-disease-types": {
    "h1": "Congenital Heart Disease in Children and Adults: A Clinical Guide for Doctors",
    "keywords": "congenital heart disease",
    "title": "Congenital Heart Disease: Types, Symptoms & Treatment Guide",
    "canonical": "congenital-heart-disease-types",
    "description": "Explore congenital heart disease in children and adults, including types, causes, symptoms, diagnosis and treatment approaches for doctors.",
    "image": null,

  },
  "congenital-heart-disease": {
    "h1": "Congenital Heart Disease: Types, Causes, Symptoms & Treatment",
    "keywords": "congenital heart disease",
    "title": "Congenital Heart Disease: Types, Causes & Treatment",
    "canonical": "congenital-heart-disease",
    "description": "Congenital heart disease: types, causes, symptoms, diagnosis, treatment & prevention. Cyanotic vs acyanotic classification explained.",
    "image": null,
  
  },
  "cancer-screening-guidelines-india": {
    "h1": "Cancer Screening Guidelines in India 2027: A Practical Guide for Doctors",
    "keywords": "cancer screening guidelines india",
    "title": "Cancer Screening Guidelines India 2027: A Doctor's Guide",
    "canonical": "congenital-heart-disease",
    "description": "Cancer screening guidelines india — NP-NCD, NCG, and ICMR protocols for oral, breast, and cervical cancer, and why coverage still lags.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-16-at-4.24.45-PM.jpeg",
  
  },
  "how-to-become-an-orthopedic-surgeon-after-mbbs": {
    "h1": "How to Become an Orthopedic Surgeon After MBBS: Complete Career Roadmap",
    "keywords": "how to become an orthopedic surgeon after mbbs",
    "title": "How to Become an Orthopedic Surgeon After MBBS: Roadmap",
    "canonical": "how-to-become-an-orthopedic-surgeon-after-mbbs",
    "description": "How to become an orthopedic surgeon after MBBS — the complete roadmap from MS/DNB Orthopedics to sub-specialty fellowship training in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-16-at-1.55.38-PM.jpeg",
 
  },
  "medical-writing-career-after-mbbs": {
    "h1": "Medical Writing Career After MBBS: Where Medicine Meets the Written Word",
    "keywords": "medical writing career after mbbs",
    "title": "Medical Writing Career After MBBS: How to Get Started",
    "canonical": "medical-writing-career-after-mbbs",
    "description": "Medical writing career after MBBS — a practical guide to regulatory, scientific, and healthcare content writing roles for doctors in 2027.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-14-at-5.33.17-PM-1.jpeg",

  },
  "clinical-research-pharma-careers-after-mbbs": {
    "h1": "Clinical Research Jobs After MBBS: What CRA, MSL & Pharmacovigilance Roles Actually Involve",
    "keywords": "clinical research jobs after mbbs",
    "title": "Clinical Research Jobs After MBBS: 2027 Guide",
    "canonical": "clinical-research-pharma-careers-after-mbbs",
    "description": "Clinical research jobs after MBBS span CRA, medical affairs, MSL, and pharmacovigilance roles — here's what they involve and how doctors break in.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-14-at-5.33.17-PM.jpeg",
 
  },
  "hospital-administration-career-after-mbbs": {
    "h1": "Hospital Administration & Healthcare Management Careers After MBBS",
    "keywords": "Hospital Administration Career After MBBS",
    "title": "Hospital Administration Career After MBBS: Complete Guide",
    "canonical": "hospital-administration-career-after-mbbs",
    "description": "A hospital administration career after MBBS lets you move beyond clinical practice into healthcare management and leadership roles in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM-2.jpeg",
   
  },
  "precision-oncology-fellowship": {
    "h1": "Precision Oncology & Immunotherapy: Why Every Oncology Fellow Needs This in 2026",
    "keywords": "precision oncology fellowship",
    "title": "Precision Oncology Fellowship: Why It Matters in 2026",
    "canonical": "precision-oncology-fellowship",
    "description": "Precision oncology fellowship training closes a real gap — most oncologists know genomic-guided treatment matters, but few use it routinely. Here's why.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-12-at-2.20.42-PM-1.jpeg",
  
  },
  "dermatologist-salary-in-india": {
    "h1": "Dermatologist Salary in India 2026: What the Data Actually Shows",
    "keywords": "dermatologist salary in india",
    "title": "Dermatologist Salary in India 2026: The Real Data",
    "canonical": "dermatologist-salary-in-india",
    "description": "Dermatologist salary in India 2026: real MD dermatology salary bands, cosmetic practice income factors, and why one national figure doesn't exist.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.38-PM.jpeg",
    
  },
  "cosmetic-vs-clinical-dermatology-career": {
    "h1": "Cosmetic Dermatology vs Clinical Dermatology: Which Career Path Fits You?",
    "keywords": "cosmetic dermatology vs clinical dermatology",
    "title": "Cosmetic Dermatology vs Clinical Dermatology Career",
    "canonical": "cosmetic-vs-clinical-dermatology-career",
    "description": "Cosmetic dermatology vs clinical dermatology — compare daily work, training requirements, and which career path fits your interests best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.37-PM.jpeg",
   
  },

  "radiology-courses-after-mbbs": {
    "h1": "Radiology Courses After MBBS: Which Route Fits Your Career Stage?",
    "keywords": "radiology courses after mbbs",
    "title": "Radiology Courses After MBBS: Career Paths & Options",
    "canonical": "radiology-courses-after-mbbs",
    "description": "Explore radiology courses after MBBS, including MD, DNB, fellowships, and diploma options. Find the right path for your career stage and future goals.",
    "image": null,
  
  },


  "medical-vs-surgical-vs-radiation-oncology-fellowship": {
    "h1": "Medical vs Surgical vs Radiation Oncology: Which Fellowship Fits You?",
    "keywords": "medical vs surgical vs radiation oncology fellowship",
    "title": "Medical vs Surgical vs Radiation Oncology Fellowship",
    "canonical": "medical-vs-surgical-vs-radiation-oncology-fellowship",
    "description": "Medical vs surgical vs radiation oncology fellowship — compare the three paths, their eligibility routes, and which fits your clinical interests best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-10-at-4.27.37-PM-1.jpeg",
  
  },
  "fellowship-in-oncology-vs-dm-medical-oncology": {
    "h1": "Fellowship in Oncology vs DM Medical Oncology: Which Path Should You Choose?",
    "keywords": "fellowship in oncology vs dm medical oncology",
    "title": "Fellowship in Oncology vs DM Medical Oncology",
    "canonical": "fellowship-in-oncology-vs-dm-medical-oncology",
    "description": "Fellowship in oncology vs DM Medical Oncology — understand the real difference in eligibility, recognition, and career path before you decide.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-09-at-4.42.36-PM.jpeg",
  
  },
  "easiest-medical-specialization-to-get-india": {
    "h1": "Easiest Medical Specialization to Get India (And the Hardest Ones to Crack)",
    "keywords": "Easiest Medical Specialization to Get India",
    "title": "Easiest Medical Specializations to Get in India",
    "canonical": "easiest-medical-specialization-to-get-india",
    "description": "Which medical specialization is easiest to get into in India? Compare NEET-PG cutoffs, seat availability, and competition across specialties.",
    "image": "",
   
  },
  "dermoscopy-for-general-physicians": {
    "h1": "Dermoscopy for General Physicians: Skin Diagnosis, Differential Diagnosis & When to Refer",
    "keywords": "dermoscopy for general physicians",
    "title": "Dermoscopy for General Physicians: Skin Diagnosis Guide (2026)",
    "canonical": "dermoscopy-for-general-physicians",
    "description": "Dermoscopy for general physicians improves skin diagnosis without specialist training. Learn how it helps distinguish fungal rash, eczema, psoriasis & when to refer.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-08-at-2.23.26-PM-1.jpeg",
   
  },
  "heart-failure-and-cardiomyopathies": {
    "h1": "Heart Failure and Cardiomyopathies: Understanding the Heart's Struggle to Keep Up",
    "keywords": "heart failure and cardiomyopathies",
    "title": "Heart Failure & Cardiomyopathies: Pathophysiology & Management",
    "canonical": "heart-failure-and-cardiomyopathies",
    "description": "A clear guide to heart failure and cardiomyopathies — pathophysiology, neurohormonal remodeling, genetics, and modern management from medication to transplant.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-04-at-4.50.44-PM.jpeg",
   
  },
  "dermoscopy-training-for-general-physicians": {
    "h1": "Dermoscopy Training for General Physicians: A Practical Guide",
    "keywords": "Dermoscopy Training for General Physicians",
    "title": "Dermoscopy Training for General Physicians | Clinical Guide",
    "canonical": "dermoscopy-training-for-general-physicians",
    "description": "Explore dermoscopy training for general physicians to develop essential skills in clinical applications, skin lesion assessment and practical techniques for improving diagnostic accuracy.",
    "image": "",
   
  },

  "doctor-specialization-salary-comparison": {
    "h1": "Doctor Specialization Salary Comparison: MBBS to Super Specialist (2026 India Guide",
    "keywords": "Doctor Specialization Salary Comparison",
    "title": "Doctor Specialization Salary Comparison India (2026)",
    "canonical": "doctor-specialization-salary-comparison",
    "description": "This doctor specialization salary comparison tracks pay from MBBS to super specialist — MD, MS and DM/MCh stages, 2026 India data.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-04-at-4.03.33-PM.jpeg",
   
  },
  "medical-vs-surgical-specialization": {
    "h1": "Medical vs Surgical Specialization After MBBS: A Clear Comparison (2026)",
    "keywords": "Medical vs Surgical Specialization After MBBS",
    "title": "Medical vs Surgical Specialization After MBBS (2026)",
    "canonical": "medical-vs-surgical-specialization",
    "description": "Confused about medical vs surgical specialization after MBBS? Compare training, lifestyle, career scope, and who each path suits best.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM.jpeg",

  },
  "pediatric-skin-conditions-physician-guide": {
    "h1": "Recognising Pediatric Skin Conditions: A Quick-Reference Guide for MBBS & Family Physicians",
    "keywords": "pediatric skin conditions",
    "title": "Pediatric Skin Conditions: Guide for MBBS Doctors",
    "canonical": "pediatric-skin-conditions-physician-guide",
    "description": "A quick-reference guide to pediatric skin conditions in Indian children — atopic dermatitis, infections, nutritional signs, and red flags for referral.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-6.04.03-PM.jpeg",
   
  },
  "future-scope-medical-specialization-india": {
    "h1": "Future Scope of Medical Specialization in India: What the Next Decade Looks Like",
    "keywords": "future scope of medical specialization",
    "title": "Future Scope of Medical Specialization in India (2026)",
    "canonical": "future-scope-medical-specialization-india",
    "description": "The future scope of medical specialization in India spans Critical Care, Radiology, Oncology & more — see the demand drivers for the next decade.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-5.29.19-PM.jpeg",
   
  },
  "rmo-vs-duty-doctor-vs-junior-resident": {
    "h1": "RMO vs Duty Doctor vs Junior Resident: Which Builds a Better Career After MBBS?",
    "keywords": "rmo vs duty doctor vs junior resident",
    "title": "RMO vs Duty Doctor vs Junior Resident: Best First Job?",
    "canonical": "rmo-vs-duty-doctor-vs-junior-resident",
    "description": "RMO, Duty Doctor, or Junior Resident — which private hospital role after MBBS builds the strongest clinical career? A practical 2026 comparison.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-02-at-5.29.19-PM-2.jpeg",
   
  },
  "trichology-vs-dermatology-hair-loss-india": {
    "h1": "Hair Loss & Alopecia in India: When to Treat, When to Refer, and the Rise of Trichology",
    "keywords": "Hair Loss & Trichology in India",
    "title": "Hair Loss & Trichology in India: A Doctor's Guide",
    "canonical": "trichology-vs-dermatology-hair-loss-india",
    "description": "Hair loss and trichology in India: alopecia types, general management principles, and whether trichology is a credible career path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-03-at-5.02.07-PM-1.jpeg",
  
  },
  "medical-officer-vs-junior-resident-after-mbbs": {
    "h1": "Medical Officer vs Junior Resident: Which Clinical Job First After MBBS?",
    "keywords": "medical officer vs junior resident",
    "title": "Medical Officer vs Junior Resident: Which Job After MBBS?",
    "canonical": "medical-officer-vs-junior-resident-after-mbbs",
    "description": "Medical Officer vs Junior Resident after MBBS: compare eligibility, duties, clinical exposure, salary, career growth and PG preparation to choose the right job.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.19-PM.jpeg",
   
  },
  "pigmentation-disorders-indian-skin": {
    "h1": "Pigmentation Disorders in Indian Skin: Melasma, Vitiligo & Post-Inflammatory Hyperpigmentation",
    "keywords": "pigmentation disorders indian skin",
    "title": "Pigmentation Disorders in Indian Skin: Doctor's Guide",
    "canonical": "pigmentation-disorders-indian-skin",
    "description": "Pigmentation Disorders in Indian Skin: understand melasma, vitiligo, PIH, treatment considerations, and referral guidance for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.20-PM.jpeg",
 
  },
  "medical-specialization-work-life-balance": {
    "h1": "Medical Specializations With the Best Work-Life Balance After MBBS",
    "keywords": "medical specialties for work life balance",
    "title": "Medical Specialties for Work Life Balance After MBBS",
    "canonical": "medical-specialization-work-life-balance",
    "description": "Explore medical specialties for work life balance, with insights into work hours, emergencies, call duties, and lifestyle after MBBS.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-4.06.20-PM-1.jpeg",
 
  },
  "md-vs-ms-vs-dnb-complete-guide": {
    "h1": "MD vs MS vs DNB: Which Postgraduate Path Should You Choose?",
    "keywords": "md vs ms vs dnb",
    "title": "MD vs MS vs DNB in India: Complete PG Guide",
    "canonical": "md-vs-ms-vs-dnb-complete-guide",
    "description": "MD vs MS vs DNB in India: real differences in training, institutions, and career pathways — plus a clear decision framework for choosing your path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-29-at-4.34.22-PM.jpeg",
  
  },
  "eczema-vs-psoriasis-vs-fungal-rash-diagnosis-2": {
    "h1": "Eczema vs Psoriasis vs Fungal Rash: A Differential Diagnosis Guide for General Physicians",
    "keywords": "eczema vs psoriasis vs fungal rash",
    "title": "Eczema vs Psoriasis vs Fungal Rash: Diagnosis Guide",
    "canonical": "eczema-vs-psoriasis-vs-fungal-rash-diagnosis-2",
    "description": "Comparing eczema vs psoriasis vs fungal rash? This differential diagnosis guide for general physicians covers key features, a comparison table, and red flags.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-29-at-4.58.50-PM.jpeg",
  
  },
  "steroid-modified-tinea-india": {
    "h1": "Steroid-Modified Tinea in India: The Silent Epidemic Every Doctor Should Understand",
    "keywords": "steroid modified tinea",
    "title": "Steroid-Modified Tinea in India: What Doctors Must Know",
    "canonical": "steroid-modified-tinea-india",
    "description": "Understand tinea incognito and India's steroid-modified tinea epidemic — clinical recognition, causes and the doctor's role in reversing it.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-28-2026-04_31_23-PM.webp",
   
  },
  "cpd-accreditation-for-doctors-india": {
    "h1": "CPD Accreditation for Doctors in India: What It Means, Why It Matters and How to Choose a Program",
    "keywords": "CPD Accreditation for Doctors in India: What It Means, Why It Matters and How to Choose a Program",
    "title": "CPD Accreditation for Doctors in India (2026 Guide)",
    "canonical": "cpd-accreditation-for-doctors-india",
    "description": "What CPD accreditation means for Indian doctors, how it differs from CME and PG qualifications, and how to choose a credible program.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-28-2026-04_22_40-PM.webp",

  },
  "recurrent-fungal-infection-treatment-india": {
    "h1": "Fungal Skin Infections (Tinea) in India: Why They Keep Coming Back",
    "keywords": "recurrent fungal infection",
    "title": "Recurrent Fungal Infection in India: Doctor's Guide (2026)",
    "canonical": "recurrent-fungal-infection-treatment-india",
    "description": "Why fungal skin infections keep recurring in Indian patients, common tinea types, and general management principles every doctor should know.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-27-at-4.18.00-PM.jpeg",
   
  },
  "acne-management-general-physicians-india": {
    "h1": "Acne Management for Doctors: A Practical Clinical Guide and check image issue",
    "keywords": "acne in indian patients",
    "title": "Acne in Indian Patients: GP's Management Guide (2026)",
    "canonical": "acne-management-general-physicians-india",
    "description": "Acne in Indian patients causes persistent PIH even with mild lesions. A clinical grading and first-line management guide for MBBS doctors in OPD.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-24-at-3.29.45-PM.jpeg",
    
  },
  "best-specialization-for-female-doctors": {
    "h1": "Best Medical Specialization for Female Doctors After MBBS (2026 Guide)",
    "keywords": "Medical Specialization Female Doctors",
    "title": "Best Medical Specialization for Female Doctors (2026)",
    "canonical": "best-specialization-for-female-doctors",
    "description": "Which medical specialization suits female doctors best? Compare lifestyle, flexibility, growth & demand across top specialties for women MBBS graduates.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-26-at-3.57.57-PM.jpeg",
 
  },
  "infertility-evaluation-structured-workup-general-practice": {
    "h1": "Evaluating the Infertile Couple: A Structured First-Visit Workup for General Practice",
    "keywords": "Infertility Evaluation",
    "title": "Infertility Evaluation: First-Visit Workup for Doctors",
    "canonical": "infertility-evaluation-structured-workup-general-practice",
    "description": "Structured Infertility Evaluation for both partners — ovulation, ovarian reserve, semen analysis, tubal assessment and referral criteria.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-21-at-5.45.21-PM.jpeg",
  
  },
  "fellowship-in-infertility-management-curriculum-eligibility": {
    "h1": "Fellowship in Infertility Management: Eligibility, Curriculum and Practice Scope",
    "keywords": "Fellowship in Infertility Management",
    "title": "Fellowship in Infertility Management: Curriculum & Scope",
    "canonical": "fellowship-in-infertility-management-curriculum-eligibility",
    "description": "Description MGA's Fellowship in Infertility Management: eligibility, ART curriculum, IVF scope and how it differs from the Restorative Reproductive Medicine fellowship",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-21-at-5.42.23-PM-1.jpeg",
 
  },
  "first-trimester-screening-timing-protocol-counselling": {
    "h1": "First-Trimester Screening: Timing, Protocol and Counselling Considerations in Indian Practice",
    "keywords": "First-Trimester Screening",
    "title": "First-Trimester Screening: Timing, Protocol & Counselling",
    "canonical": "first-trimester-screening-timing-protocol-counselling",
    "description": "Learn first-trimester screening in Indian practice, including NT scans, dual markers, timing, and counselling.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-4.18.34-PM.jpeg",
  },

  "fetal-medicine-fellowship-curriculum-eligibility-competencies": {
    "h1": "Fetal Medicine Fellowship: Curriculum, Eligibility and the Competencies It Develops",
    "keywords": "Fetal Medicine Fellowship",
    "title": "Fetal Medicine Fellowship: Curriculum & Eligibility",
    "canonical": "fetal-medicine-fellowship-curriculum-eligibility-competencies",
    "description": "Explore MGA's 12-month online Fetal Medicine Fellowship with a 17-module curriculum, OBGYN eligibility, and core clinical competencies.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-4.18.35-PM.jpeg",
 
  },
  "ecg-interpretation-mistakes-systematic-reading": {
    "h1": "Commonly Missed ECG Findings in Primary Care and How to Systematise Your Reading",
    "keywords": "ecg interpretation mistakes",
    "title": "ECG Interpretation Mistakes: Systematic Reading Guide",
    "canonical": "ecg-interpretation-mistakes-systematic-reading",
    "description": "ECG interpretation mistakes happen even when doctors know the patterns. Learn the 7-step systematic method and 8 missed findings that hide in plain sight.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-4.36.12-PM-1.jpeg",
  
  },
  "certificate-ecg-interpretation-vs-echocardiography": {
    "h1": "Certificate in ECG Interpretation vs Certificate in Echocardiography: Which Cardiac Skill First?",
    "keywords": "certificate in ecg interpretation",
    "title": "ECG vs Echocardiography Certificate: Which First?",
    "canonical": "certificate-ecg-interpretation-vs-echocardiography",
    "description": "Deciding between MGA's ECG Interpretation and Echocardiography certificates? Compare scope, learning curve and clinical fit to sequence your skills.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-4.36.12-PM.jpeg",
  
  },
  "fellowship-molecular-pathology-vs-cytopathology": {
    "h1": "Fellowship in Molecular Pathology vs Cytopathology: Choosing a Diagnostic Subspecialty",
    "keywords": "fellowship in molecular pathology",
    "title": "Molecular Pathology vs Cytopathology Fellowship",
    "canonical": "fellowship-molecular-pathology-vs-cytopathology",
    "description": "Comparing a Fellowship in Molecular Pathology vs Cytopathology? Explore daily practice, clinical scope & career fit to choose your subspecialty.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-18-at-3.21.18-PM.jpeg",
  
  },
  "digital-pathology-ai-diagnostics-india": {
    "h1": "Digital Pathology and AI-Assisted Diagnostics: What Changes in the Indian Laboratory",
    "keywords": "digital pathology india",
    "title": "Digital Pathology in India: What Actually Changes",
    "canonical": "digital-pathology-ai-diagnostics-india",
    "description": "Whole slide imaging and AI-assisted diagnostics are entering Indian labs. A grounded look at what changes in reporting, quality assurance and turnaround",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-18-at-3.21.18-PM-1.jpeg",

  },
  "point-of-care-ultrasound-pocus-clinical-decisions": {
    "h1": "Point-of-Care Ultrasound in Everyday Practice: Where POCUS Changes Clinical Decisions",
    "keywords": "point of care ultrasound",
    "title": "Point-of-Care Ultrasound: Where POCUS Changes Decisions",
    "canonical": "point-of-care-ultrasound-pocus-clinical-decisions",
    "description": "Master point of care ultrasound. Learn how bedside POCUS, FAST, and lung ultrasound change immediate clinical decisions in emergency and rural care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-14-at-2.54.37-PM.jpeg",

  },
  "pg-diploma-ultrasonography-vs-certificate-advanced-ultrasound": {
    "h1": "PG Diploma in Ultrasonography vs Certificate in Advanced Ultrasound: Choosing the Right Depth",
    "keywords": "pg diploma in ultrasonography",
    "title": "PG Diploma vs Certificate in Ultrasound: Which to Choose",
    "canonical": "pg-diploma-ultrasonography-vs-certificate-advanced-ultrasound",
    "description": "Compare the PG Diploma in Ultrasonography with the Certificate in Advanced Ultrasound. Find the right imaging course for your medical practice.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-14-at-2.54.47-PM.jpeg",

  },
  "diagnostic-vs-therapeutic-endoscopy": {
    "h1": "Diagnostic vs Therapeutic Endoscopy: Indications, Skill Requirements and Referral Thresholds",
    "keywords": "diagnostic vs therapeutic endoscopy",
    "title": "Diagnostic vs Therapeutic Endoscopy: Key Differences",
    "canonical": "diagnostic-vs-therapeutic-endoscopy",
    "description": "What separates diagnostic from therapeutic endoscopy? Learn the clinical indications, skill requirements and referral thresholds every doctor should know.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-12-at-5.16.18-PM-1.jpeg",
  
  },
  "fellowship-in-gi-endoscopy-eligibility-curriculum-scope": {
    "h1": "Fellowship in GI Endoscopy: Eligibility, Curriculum and Clinical Scope in India",
    "keywords": "fellowship in GI endoscopy",
    "title": "Fellowship in GI Endoscopy: Eligibility & Scope",
    "canonical": "fellowship-in-gi-endoscopyfellowship-in-gi-endoscopy-eligibility-curriculum-scope",
    "description": "Who can apply for a GI Endoscopy Fellowship in India? Learn the eligibility, curriculum, procedural competencies and how it compares to DM Gastroenterology.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-12-at-5.16.18-PM.jpeg",

  },
  "top-medical-pg-branches-in-india": {
    "h1": "How to Choose the Best Medical PG Branch in India: Complete Guide",
    "keywords": "top medical PG branches in India",
    "title": "Top Medical PG Branches in India: Scope, Demand & Salary",
    "canonical": "top-medical-pg-branches-in-india",
    "description": "Confused about which medical PG branch to choose? Compare India's top medical specialties by market demand, scope, and earning potential",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-11-at-5.04.30-PM-1-1.jpeg",
 
  },
  "most-in-demand-medical-courses-after-mbbs": {
    "h1": "Most In-Demand Medical Courses After MBBS: What Hospitals Are Actually Hiring For",
    "keywords": "most in demand medical courses after mbbs",
    "title": "Most In-Demand Medical Courses After MBBS 2026",
    "canonical": "most-in-demand-medical-courses-after-mbbs",
    "description": "Discover the most in demand medical courses after MBBS that hospitals are actually hiring for in 2026, including Emergency Medicine and Critical Care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-3.53.18-PM-1.jpeg",
   
  },
  "highest-paying-medical-courses-after-mbbs": {
    "h1": "Highest Paying Medical Courses After MBBS in India (2026): Which Course Gives the Best ROI?",
    "keywords": "highest paying medical courses after mbbs",
    "title": "Highest Paying Medical Courses After MBBS 2026",
    "canonical": "highest-paying-medical-courses-after-mbbs",
    "description": "Fellowship vs PG diploma vs certificate — which course format gives the best ROI after MBBS? Compare duration, salary impact, and payback period.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-08-at-3.59.39-PM.jpeg",
  
  },
  "best-pg-diploma-courses-after-mbbs": {
    "h1": "Best PG Diploma Courses After MBBS in India (2026): Full List, Duration & Career Scope",
    "keywords": "best pg diploma courses after mbbs",
    "title": "Best PG Diploma Courses After MBBS 2026",
    "canonical": "best-pg-diploma-courses-after-mbbs",
    "description": "Complete list of PG diploma courses after MBBS in India — duration, eligibility, and career scope. University-awarded programs for working doctors, no NEET PG required.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-08-at-3.59.38-PM.jpeg",
   
  },
  "online-fellowship-courses-after-mbbs": {
    "h1": "Online Fellowship Courses After MBBS: Are They Worth It in 2026?",
    "keywords": "online fellowship courses after mbbs",
    "title": "Online Fellowship Courses After MBBS 2026",
    "canonical": "online-fellowship-courses-after-mbbs",
    "description": "Discover how online fellowship courses after MBBS work, which specialties suit them best, and how to evaluate programs. Guide for working doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-07-at-4.13.22-PM.jpeg",
 
  },
  "higher-studies-after-mbbs": {
    "h1": "Higher Studies After MBBS: MD, MS, DNB, PG Diploma, Fellowship and Non-Clinical Options Compared (2026)",
    "keywords": "higher studies after mbbs",
    "title": "Higher Studies After MBBS: Which Path Is Right for You?",
    "canonical": "higher-studies-after-mbbs",
    "description": "Not sure which higher studies after MBBS suit you? Compare MD, DNB, fellowship and PG Diploma by entry, duration and recognition. Clear 2026 guide.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-07-at-4.02.31-PM.jpeg",
  
  },
  "best-medical-courses-after-mbbs-2026": {
    "h1": "Best Medical Courses After MBBS in 2026: Fellowship, PG Diploma, Certificate, Online & CME Guide",
    "keywords": "Best Medical Courses After MBBS",
    "title": "Best Medical Courses After MBBS in 2026: Complete Guide",
    "canonical": "best-medical-courses-after-mbbs-2026",
    "description": "Compare the best fellowship, PG diploma, certificate, online & CME courses after MBBS in2026. Duration, fees, NEET PG rules & how to choose",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-04-at-5.29.15-PM.jpeg",

  },
  "higher-studies-after-mbbs-2": {
    "h1": "Higher Studies After MBBS: Which Path Is Right for You?",
    "keywords": "Higher studies after MBBS",
    "title": "Higher Studies After MBBS: Which Path Is Right for You?",
    "canonical": "higher-studies-after-mbbs-2",
    "description": "MD/MS, DNB, PG Diploma or Fellowship after MBBS? Compare entrance requirements, duration, recognition and career scope to pick the right path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-31-at-3.57.14-PM.jpeg",
   
  },
  "pg-diploma-in-ultrasonography-after-mbbs-guide": {
    "h1": "PG Diploma in Ultrasonography After MBBS: Eligibility, Duration, Fees, Syllabus & Career Guide (2026)",
    "keywords": "PG Diploma Ultrasonography",
    "title": "PG Diploma in Ultrasonography After MBBS: Guide 2026",
    "canonical": "pg-diploma-in-ultrasonography-after-mbbs-guide",
    "description": "Complete 2026 guide to the PG Diploma in Ultrasonography after MBBS: eligibility, duration, fees, syllabus, career scope and FAQs.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-30-at-4.29.33-PM.jpeg",
    
  },
  "private-doctor-salary-in-india": {
    "h1": "Private Doctor Salary in India: Complete Guide 2026",
    "keywords": "Private doctor salary in India",
    "title": "Private Doctor Salary in India 2026: ₹40K–₹5L/Month Guide",
    "canonical": "private-doctor-salary-in-india",
    "description": "Private doctor salary in India: ₹40K–₹5L/month by experience, specialization & city tier. Complete 2026 income guide with real numbers.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-29-at-5.00.37-PM.jpeg",

  },
  "cardiology-courses-after-mbbs-india-types-duration": {
    "h1": "Cardiology Course Duration After MBBS: Complete Comparison",
    "keywords": "Cardiology Courses After MBBS",
    "title": "Cardiology Course Duration: DM, Diploma & Fellowship Compared",
    "canonical": "cardiology-courses-after-mbbs-india-types-duration",
    "description": "Compare cardiology course duration after MBBS — DM (3 yrs), PG Diploma (2 yrs) & Fellowship (1 yr). Full eligibility & career path breakdown for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-28-at-3.14.45-PM.jpeg",
  
  },
  "fellowship-in-cardiology-in-india": {
    "h1": "Fellowship in Cardiology in India: Eligibility, Duration, Curriculum, and Career Scope",
    "keywords": "Fellowship in Cardiology in India",
    "title": "Fellowship in Cardiology in India 2026: Eligibility & Scope",
    "canonical": "fellowship-in-cardiology-in-india",
    "description": "MBBS & MD doctors can join this 6–12 month Fellowship in Cardiology in India — no full-time DM needed. Check eligibility, curriculum & career scope inside.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-27-at-3.27.21-PM.jpeg",

  },
  "government-doctor-salary-in-india": {
    "h1": "Government Doctor Salary in India: What Can You Earn in Public Healthcare?",
    "keywords": "government doctor salary in India",
    "title": "Government Doctor Salary in India 2026: Complete Pay Guide",
    "canonical": "government-doctor-salary-in-india",
    "description": "Explore government doctor salary in India, including MBBS, AIIMS, AFMS, pay scales, allowances, career growth, and 8th Pay Commission.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-98.jpg",

  },
  "mbbs-doctor-salary-in-india": {
    "h1": "MBBS Doctor Starting Salary in India:  City, State & Hospital-Type Guide (2026)",
    "keywords": "mbbs doctor salary in india",
    "title": "MBBS Doctor Starting Salary — City & State Breakdown 2026",
    "canonical": "mbbs-doctor-salary-in-india",
    "description": "MBBS doctor starting salary ranges from ₹40,000 in UP to ₹95,000/month in Delhi. Compare pay by city, state, hospital type & years of experience.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-22-at-4.44.31-PM.webp",
 
  },
  "medical-officer-jobs-after-mbbs": {
    "h1": "Medical Officer Jobs After MBBS: Eligibility, Exams, Salary & Career Path (2026)",
    "keywords": "Medical Officer Jobs After MBBS",
    "title": "Medical Officer Jobs After MBBS: Salary & Exams 2026",
    "canonical": "medical-officer-jobs-after-mbbs",
    "description": "Medical Officer jobs after MBBS: eligibility, UPSC CMS, State PSC, AFMS & ESIC recruitment routes, exam pattern, salary ₹50K–₹1.77L/month, and career path.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-21-at-5.44.50-PM.webp",
 
  },
  "non-clinical-jobs-after-mbbs": {
    "h1": "Non-Clinical Jobs After MBBS: Explore Careers Beyond Clinical Practice",
    "keywords": "Non-Clinical Jobs After MBBS",
    "title": "Non-Clinical Jobs After MBBS: Is This the Right Career for You?",
    "canonical": "non-clinical-jobs-after-mbbs",
    "description": "Explore non-clinical jobs after MBBS, discover careers beyond patient care, and find the right medical path based on your skills, interests, and goals.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-20-at-3.44.13-PM.jpeg",

  },
  "clinical-career-after-mbbs": {
    "h1": "Clinical Jobs After MBBS: Build a Successful Clinical Career",
    "keywords": "Clinical Career After MBBS",
    "title": "Clinical Jobs After MBBS: Start Your Medical Career",
    "canonical": "clinical-career-after-mbbs",
    "description": "Explore the best clinical jobs after MBBS, career opportunities, growth, and practical guidance to build a successful clinical medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/mbbs-clinical-career-guide.webp",
  
  },
  "government-jobs-after-mbbs": {
    "h1": "Government Jobs After MBBS in India: Full List & Guide (2026)",
    "keywords": "Government Jobs After MBBS",
    "title": "Government Jobs After MBBS 2026: Full List & How to Apply",
    "canonical": "government-jobs-after-mbbs",
    "description": "Explore permanent government jobs after MBBS in India — central, state & PSU posts. Learn how to become a government doctor with exams, salary & apply process.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-96.webp",
  
  },
  "doctor-salary-india": {
    "h1": "Doctor Salary in India: Understanding How Doctors Build Long-Term Income",
    "keywords": "Doctor Salary in India",
    "title": "Doctor Salary in India: What Shapes a Doctor's Income?",
    "canonical": "doctor-salary-india",
    "description": "Understand what influences doctor salary in India, from career choices and experience to specialization, skills, and long-term professional growth.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-95.jpg",
  
  },
  "best-jobs-after-mbbs": {
    "h1": "Jobs After MBBS: A Complete Career Guide for MBBS Doctors in India (2026 Guide)",
    "keywords": "Jobs After MBBS",
    "title": "Jobs After MBBS: Best Career Opportunities in India (2026)",
    "canonical": "best-jobs-after-mbbs",
    "description": "Explore the best jobs after MBBS in India, including government, private, clinical, and non-clinical careers. Find the right path for your medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/jobs-after-mbbs-career-opportunities-guide.webp",

  },
  "most-in-demand-medical-specialties": {
    "h1": "Most In-Demand Medical Specialties in India: Complete 2026 Demand Guide",
    "keywords": "most in demand medical specialties in india",
    "title": "Most In-Demand Medical Specialties in India (2026 Guide)",
    "canonical": "most-in-demand-medical-specialties",
    "description": "Which doctor is most in demand in India? Cardiology, Emergency Medicine & Radiology top the list. Full demand analysis & growth drivers explained for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/most-in-demand-medical-specialties-in-india-scaled.webp",
  
  },
  "highest-paying-medical-specializations": {
    "h1": "Highest Paying Medical Specializations in India:  Salary Guide for Doctors (2026)",
    "keywords": "highest paying medical specializations in india",
    "title": "Highest Paying Medical Specializations in India: 2026 Salary Guide",
    "canonical": "highest-paying-medical-specializations",
    "description": "Neurosurgery ₹1Cr+, Cardiology ₹80L+, Radiology ₹60L+ compare salary across 10 highest paying specializations in India. 2026 data, by experience & hospital type.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-91.webp",
 
  },
  "how-to-choose-medical-specialization": {
    "h1": "How to Choose the Right Medical Specialization? A Practical Guide for MBBS Doctors",
    "keywords": "Medical Specialization",
    "title": "How to Choose the Right Medical Specialization After MBBS",
    "canonical": "how-to-choose-medical-specialization",
    "description": "Learn how to choose the right medical specialization after MBBS with practical tips, self-assessment, internship insights, and career guidance.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-90.webp",
  
  },
  "which-medical-specialization-is-best-after-mbbs": {
    "h1": "Medical Specialization After MBBS: Which Specialty Is Right for You? (2026)",
    "keywords": "medical specialization after MBBS",
    "title": "Medical Specialization After MBBS: Complete Guide for Doctors",
    "canonical": "which-medical-specialization-is-best-after-mbbs",
    "description": "Compare 15+ medical specializations after MBBS — salary, scope, demand & career path. The only specialization guide you need in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-85.jpg",
    
  },
  "best-specialization-after-mbbs": {
    "h1": "MD vs MS vs DNB After MBBS: Which PG Path Should You Choose? (2026)",
    "keywords": "md vs ms after mbbs",
    "title": "MD vs MS vs DNB After MBBS: Which PG Path to Choose?",
    "canonical": "best-specialization-after-mbbs",
    "description": "MD, MS, or DNB — which postgraduate path fits your specialty goal? Compare training, recognition & career scope. 2026 guide for MBBS doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-84.jpg",
  
  },
  "best-gynecology-courses-after-mbbs": {
    "h1": "gynecology courses after mbbs",
    "keywords": "gynecology courses after mbbs",
    "title": "Best Gynecology Courses After MBBS in India (2026)",
    "canonical": "best-gynecology-courses-after-mbbs",
    "description": "Explore the best Gynecology courses after MBBS in India. Compare fellowships, choose the right specialization, and advance your medical career.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/07/Untitled-design-83.jpg",
 
  },
  "courses-after-mbbs-without-neet-pg": {
    "h1": "Best Courses After MBBS Without NEET PG in 2026: Salary, Scope, Eligibility & Career Opportunities",
    "keywords": "courses after mbbs without neet pg",
    "title": "Best Courses After MBBS Without NEET PG (2026)",
    "canonical": "courses-after-mbbs-without-neet-pg",
    "description": "Explore the best courses after MBBS without NEET PG, including MRCP, MRCOG, MRCEM, career scope, eligibility, and fellowships.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/best-courses-after-mbbs-with-out-neet-pg.webp",
  
  },
  "how-to-become-a-cardiologist-india": {
    "h1": "How to Become a Cardiologist in India: Complete Guide 2026",
    "keywords": "how to become a cardiologist in India",
    "title": "How to Become a Cardiologist in India: Years & DM Roadmap",
    "canonical": "how-to-become-a-cardiologist-india",
    "description": "How to become a cardiologist in India? MBBS → MD → DM takes 11–13 years. Explore eligibility, entrance exams, salary & complete cardiologist career roadmap.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/how-to-become-cardiologist-after-mbbs-career-roadmap.jpeg",
 
  },
  "cardiology-courses-after-mbbs": {
    "h1": "Cardiology Courses After MBBS in India: Complete Guide 2026",
    "keywords": "cardiology courses after mbbs",
    "title": "Cardiology Courses After MBBS: Duration, Fees & Eligibility 2026",
    "canonical": "cardiology-courses-after-mbbs",
    "description": "Cardiology courses after MBBS: eligibility, duration & fees explained. Learn how to become a cardiologist via DM, PGDCC & fellowship options in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/cardiology-courses-after-mbbs-india.webp-1.jpeg",

  },
  "post-mbbs-fellowship-vs-pg-diploma": {
    "h1": "Fellowship vs PG Diploma After MBBS in India",
    "keywords": "post mbbs fellowship courses",
    "title": "Post MBBS Fellowship Courses vs PG Diploma After MBBS in India",
    "canonical": "post-mbbs-fellowship-vs-pg-diploma",
    "description": "Confused between post MBBS fellowship courses and PG Diploma? Compare career, salary & skills to choose the best path in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/fellowship-vs-pg-diploma-after-mbbs.jpeg",
  
  },
  "jobs-after-mbbs": {
    "h1": "Jobs After MBBS in India: Complete Salary Guide 2026",
    "keywords": "jobs after mbbs",
    "title": "Jobs After MBBS: ₹40K–₹10L/Month Salary Guide India 2026",
    "canonical": "jobs-after-mbbs",
    "description": "Jobs after MBBS in India: Salary ₹40K–₹10L/month. Explore top careers, govt vs private pay, scope & highest paying options in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/jobs-after-mbbs-salary-india-2026.jpg.jpg",
 

  },
  "career-after-mbbs": {
    "h1": "After MBBS What to Do? Complete Career Guide for 2026",
    "keywords": "career after mbbs",
    "title": "After MBBS What to Do? Top Career Options in India 2026",
    "canonical": "career-after-mbbs",
    "description": "After MBBS, what to do next? Explore top career options — MD/MS, govt jobs, private practice & non-clinical paths. Complete 2026 guide with salary & scope.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/career-after-mbbs-best-career-options-and-growth-pathways.jpg.jpeg",
  
  },
  "fellowship-courses-after-mbbs-in-india": {
    "h1": "Best Fellowship Courses After MBBS in India: 10 Fellowship Options Every Doctor Should Explore",
    "keywords": "fellowship courses after mbbs in india",
    "title": "Fellowship Courses After MBBS in India: 10 Best Courses",
    "canonical": "fellowship-courses-after-mbbs-in-india",
    "description": "Explore fellowship courses after MBBS in India. Compare 10 popular courses, specialty scope, clinical skills, and career opportunities.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/fellowship-courses-after-mbbs-in-india-top-10-programs.jpg.jpeg",

  },
  "courses-after-mbbs-in-india": {
    "h1": "PG Courses After MBBS in India: Complete Guide 2026",
    "keywords": "PG Diploma Courses After MBBS",
    "title": "PG Courses After MBBS in India 2026: MD, MS, DNB & Diploma",
    "canonical": "courses-after-mbbs-in-india",
    "description": "Explore PG courses, MD/MS, DNB, diploma & fellowship options after MBBS in India — compare duration, eligibility, career scope & salary for 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/06/courses-after-mbbs-in-india.webp.jpeg",
 
  },
  "what-to-do-after-mbbs": {
    "h1": "What to Do After MBBS in India? 8 Career Paths, Salary Data & Honest Advice",
    "keywords": "what to do after mbbs",
    "title": "What to Do After MBBS in India 2026 | Complete Guide",
    "canonical": "what-to-do-after-mbbs",
    "description": "Confused about what to do after MBBS? Compare all 8 career paths — fellowship, PG diploma, government jobs, and more — with salary data and honest advice.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-08-06-at-5.11.41-PM.jpeg",
  
  },
  "fellowship-in-dermatology-skills": {
    "h1": "Fellowship in Dermatology Skills: Hands-On Skin Training Course 2026",
    "keywords": "fellowship in dermatology skills",
    "title": "Fellowship in Dermatology Skills: Skin Course India 2026",
    "canonical": "fellowship-in-dermatology-skills",
    "description": "Fellowship in Dermatology Skills for MBBS/BAMS doctors — skin, hair, nail & cosmetic procedure training. Hands-on hybrid course India. Enroll 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/04/fellowship-in-dermatology-skills.jpeg",
  
  },
  "key-benefits-of-fellowship-in-oncology-for-doctors": {
    "h1": "What Are the Key Benefits of Fellowship in Oncology for Doctors",
    "keywords": "Oncology Fellowship",
    "title": "What Are the Key Benefits of Fellowship in Oncology for Doctors",
    "canonical": "key-benefits-of-fellowship-in-oncology-for-doctors",
    "description": "Unlock expert skills, advanced research, and career growth with an Oncology Fellowship. Elevate patient care and lead in cancer treatment.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM.jpeg",

  },
  "online-medical-courses-in-india": {
    "h1": "Online Medical Courses in India for Improving Clinical Skills Fast",
    "keywords": "medical courses in india",
    "title": "Online Medical Courses in India for Improving Clinical Skills Fast",
    "canonical": "online-medical-courses-in-india",
    "description": "Master clinical practice with top-rated online medical courses in india. Enhance your skills fast through expert-led training and certification.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-21-at-4.44.48-PM.jpg",
    
  },
  "online-medical-course-with-certificate": {
    "h1": "Online Medical Course with Certificate: What Doctors in India Should Actually Check Before Enrolling",
    "keywords": "online medical course with certificate",
    "title": "Online Medical Course with Certificate: 7 Things to Check",
    "canonical": "online-medical-course-with-certificate",
    "description": "Looking for an online medical course with certificate? Discover what doctors in India should check before enrolling, including accreditation, curriculum and clinical relevance.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-27-at-2.56.35-PM.jpeg",
 
  },
  "online-medical-course-options": {
    "h1": "Online Medical Courses for Doctors: Clinical Upskilling & Certification",
    "keywords": "courses for doctors",
    "title": "Online Medical Courses for Doctors: Upskill & Certify 2026",
    "canonical": "online-medical-course-options",
    "description": "Online medical courses for doctors — clinical upskilling via fellowship, diploma & certificate programs. Hybrid learning with CPD certification. Enroll 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/online-medical-courses-option.jpg.jpeg",
  
  },
  "what-are-the-top-requirements-for-a-fellowship-in-paediatric-medicine": {
    "h1": "What are the Top Requirements for a Fellowship in Paediatric Medicine",
    "keywords": "Paediatric Medicine",
    "title": "The Top Requirements for a Fellowship in Paediatric Medicine",
    "canonical": "what-are-the-top-requirements-for-a-fellowship-in-paediatric-medicine",
    "description": "Explore the essential requirements for a Fellowship in Paediatric Medicine. From MRCPCH to clinical logs, learn how to secure your spot.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-1.jpeg",
  
  },
  "how-is-ai-changing-the-curriculum-of-a-dermatology-fellowship": {
    "h1": "How is AI changing the curriculum of a dermatology fellowship",
    "keywords": "dermatology fellowship",
    "title": "How is AI changing the curriculum of a dermatology fellowship",
    "canonical": "how-is-ai-changing-the-curriculum-of-a-dermatology-fellowship",
    "description": "Explore how AI is transforming dermatology fellowship curricula through diagnostics, training, and personalized patient care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_6jskr6jskr6jskr6.png",
  
  },
  "best-career-paths-after-a-fellowship-in-emergency-medicine": {
    "h1": "What are the best career paths after a Fellowship in Emergency Medicine",
    "keywords": "Best career paths after a Fellowship",
    "title": "Best career paths after a Fellowship in Emergency Medicine",
    "canonical": "best-career-paths-after-a-fellowship-in-emergency-medicine",
    "description": "Unlock your future: Discover the best career paths after a Fellowship in Emergency Medicine. From academia to tech, lead the future of ER.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_nhffqenhffqenhff.png",
  
  },
  "how-general-laparoscopic-surgery-change-the-patient-experience": {
    "h1": "How Does a Fellowship in General Laparoscopic Surgery Change the Patient Experience?",
    "keywords": "Patient Experience",
    "title": "How General Laparoscopic Surgery Change the Patient Experience",
    "canonical": "how-general-laparoscopic-surgery-change-the-patient-experience",
    "description": "Boost patient Experience with fellowship-trained surgeons. Learn how specialized expertise leads to faster recovery and less post-op pain.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.04-PM.jpeg",
   
  },
  "best-dermatology-courses-for-medical-students-in-2026": {
    "h1": "Best Dermatology Courses for Medical Students in 2026",
    "keywords": "Dermatology Courses",
    "title": "Best Dermatology Courses for Medical Students in 2026",
    "canonical": "best-dermatology-courses-for-medical-students-in-2026",
    "description": "Discover the top dermatology courses for medical students in 2026. From MD residency to elite fellowships at Medical Global Academy.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-2.jpeg",
   
  },
  "fellowship-in-pediatric-dermatology-help-you-start-your-own-clinic": {
    "h1": "Can a Fellowship in Pediatric Dermatology Help You Start Your Own Specialized Clinic",
    "keywords": "Pediatric",
    "title": "Fellowship in Pediatric Dermatology Help You Start Your Own Clinic",
    "canonical": "fellowship-in-pediatric-dermatology-help-you-start-your-own-clinic",
    "description": "Launch your dream clinic! Discover how a Fellowship in Pediatric Dermatology from Medical Global Academy builds expertise & clinical trust.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-3.jpeg",
   
  },
  "pg-diploma-in-dermatology-after-mbbs": {
    "h1": "PG Diploma in Dermatology After MBBS: Clinical Skills Every Doctor Should Learn",
    "keywords": "PG Diploma in Dermatology After MBBS",
    "title": "PG Diploma in Dermatology After MBBS | Clinical Skills for Doctors",
    "canonical": "pg-diploma-in-dermatology-after-mbbs",
    "description": "PG Diploma in Dermatology after MBBS—clinical training in acne, eczema, fungal infections and skin procedures doctors need for confident dermatology care.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/pg-diploma-in-dermatology-mbbs.jpeg",

  },
  "career-options-after-a-fellowship-in-reproductive-medicine": {
    "h1": "What are the career options after a Fellowship Program in Reproductive medicine",
    "keywords": "Career Options",
    "title": "The career options after a Fellowship in Reproductive medicine %",
    "canonical": "career-options-after-a-fellowship-in-reproductive-medicine",
    "description": "Career options after a Fellowship in Reproductive Medicine, including IVF specialist roles, research, teaching, and fertility clinics.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.06-PM.jpeg",
   
  },
  "echocardiography-worth-it-for-career-advancement": {
    "h1": "Fellowship in Echocardiography Worth It for Career Advancement",
    "keywords": "Echocardiography",
    "title": "Fellowship in Echocardiography Worth It for Career Advancement",
    "canonical": "echocardiography-worth-it-for-career-advancement",
    "description": "Fellowship in echocardiography worth it for career advancement. Learn about salary prospects, certification pathways.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/Gemini_Generated_Image_brlkacbrlkacbrlk.png",
   
  },
  "scope-of-ultrasonography-in-2026": {
    "h1": "In 2026 What is the Scope of a PG Diploma in Ultrasonography",
    "keywords": "scope-of-ultrasonograph",
    "title": "In 2026 What is the Scope of a PG Diploma in Ultrasonography?",
    "canonical": "scope-of-ultrasonography-in-2026",
    "description": "Explore the career scope, AI trends, and high-paying roles for doctors with a PG Diploma in Ultrasonography in 2026. Stay ahead in medicine",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-05-14-at-4.04.05-PM-4.jpeg",
   
  },
  "fellowship-in-laparoscopy-skills-every-surgeon-should-master": {
    "h1": "Fellowship in Laparoscopy Skills Every Surgeon Should Master",
    "keywords": "Laparoscopy skills",
    "title": "Fellowship in Laparoscopy Skills Every Surgeon Should Master",
    "canonical": "fellowship-in-laparoscopy-skills-every-surgeon-should-master",
    "description": "Master essential Laparoscopy skills in a Fellowship in Laparoscopy and advance your surgical career with expert training.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-3-2026-05_11_45-PM.png",
   
  },
  "career-scope-after-fellowship-in-oncopathology-in-2026": {
    "h1": "Career Scope After Fellowship in Oncopathology in 2026",
    "keywords": "Oncopathology in 2026",
    "title": "Career Scope After Fellowship in Oncopathology in 2026",
    "canonical": "career-scope-after-fellowship-in-oncopathology-in-2026",
    "description": "Explore career scope after Fellowship in Oncopathology in 2026, including salary, job opportunities, growth, and global career prospects.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-2-2026-05_18_41-PM.png",
   
  },
  "fellowship-in-dermatology-a-career-guide": {
    "h1": "Fellowship in Dermatology After MBBS: Complete Guide (2026)",
    "keywords": "Fellowship in Dermatology After MBBS",
    "title": "Fellowship in Dermatology after mbbs a Career Guide",
    "canonical": "fellowship-in-dermatology-a-career-guide",
    "description": "Here you will know about Fellowship in Dermatology after mbbs a career guide, income scope & clear learning for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/fellowship-in-dermatology-after-mbbs-JPG.png",
  
  },
  "fellowship-in-critical-care-complete-guide-for-medical-graduates": {
    "h1": "Fellowship in Critical Care: Complete Guide for Medical Graduates",
    "keywords": "Fellowship in Critical Care",
    "title": "Fellowship in Critical Care: Complete Guide for Medical Graduates",
    "canonical": "fellowship-in-critical-care-complete-guide-for-medical-graduates",
    "description": "Complete guide to Fellowship in Critical Care covering eligibility, duration, salary, career scope, admission, and ICU specialist training.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-28-2026-02_49_04-PM.png",

  },
  "best-city-for-doing-fellowship-in-clinical-genetics": {
    "h1": "Clinical Genetics Fellowship: Best Cities, Training & Career",
    "keywords": "Clinical Genetics Fellowship",
    "title": "Clinical Genetics Fellowship: Best Cities & Career Guide",
    "canonical": "best-city-for-doing-fellowship-in-clinical-genetics",
    "description": "Explore Clinical Genetics Fellowship options in India, best cities, training areas, eligibility, clinical exposure, and career opportunities for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-27-2026-02_59_24-PM.png",
  
  },
  "top-benefits-of-doing-a-fellowship-in-cosmetic-gynecology": {
    "h1": "Top Benefits of Doing a Fellowship in Cosmetic Gynecology",
    "keywords": "Doing a Fellowship",
    "title": "Top Benefits of Doing a Fellowship in Cosmetic Gynecology",
    "canonical": "top-benefits-of-doing-a-fellowship-in-cosmetic-gynecology",
    "description": "Top benefits of doing a Fellowship in Cosmetic Gynecology, including career growth, higher income, advanced skills, and future scope.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-26-2026-12_26_45-PM.png",
   
  },
  "pg-diploma-in-general-medicine-india": {
    "h1": "Diploma in General Medicine: Complete Course Guide 2026",
    "keywords": "Diploma in General Medicine",
    "title": "Diploma in General Medicine: Course & Career Guide India",
    "canonical": "pg-diploma-in-general-medicine-india",
    "description": "Explore a Diploma in General Medicine after MBBS, including course scope, career options, clinical skills, and practice opportunities for doctors in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/pg-diploma-in-general-medicine-india.jpg.jpg",
   
  },
  "facial-aesthetic-cosmetology-in-2026": {
    "h1": "Why Choose a Facial Aesthetics Course in 2026?",
    "keywords": "Facial Aesthetics Course",
    "title": "Facial Aesthetics Course: Why Choose It in 2026?",
    "canonical": "facial-aesthetic-cosmetology-in-2026",
    "description": "Explore a Facial Aesthetics Course in 2026, including training, procedures, eligibility, career opportunities, and skills for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-25-2026-01_40_27-PM.png",
   
  },
  "interventional-radiology-in-india": {
    "h1": "Fellowship in Interventional Radiology in India: Eligibility & Scope",
    "keywords": "Interventional radiology in India",
    "title": "Interventional Radiology Training for Doctors",
    "canonical": "interventional-radiology-in-india",
    "description": "Learn interventional radiology in India with expert mentorship, practical training support, and doctor-focused education.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-24-2026-10_33_09-AM.png",
  
  },
  "diabetology-after-mbbs-eligibility": {
    "h1": "Diabetology Course After MBBS: Fellowship, F.Diab & FIDM Guide 2026",
    "keywords": "fellowship in diabetology after mbbs",
    "title": "Diabetology Course After MBBS: F.Diab, FIDM Fees & Eligibility",
    "canonical": "diabetology-after-mbbs-eligibility",
    "description": "Diabetology course after MBBS — F.Diab full form, FIDM degree, fellowship eligibility, fees & salary in India. Complete 2026 guide for MBBS doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-23-2026-01_47_48-PM.png",
  
  },
  "diploma-in-dermatology-after-mbbs": {
    "h1": "Diploma in Dermatology After MBBS: Complete Course Guide 2026",
    "keywords": "Diploma in Dermatology After MBBS",
    "title": "Diploma in Dermatology After MBBS: DDVL, DVD Course & Fees",
    "canonical": "diploma-in-dermatology-after-mbbs",
    "description": "Diploma in Dermatology after MBBS — DDVL, DVD course details, fees ₹50K–2L, eligibility & career scope. 2-year program for MBBS doctors in India 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/diploma-in-dermatology-india.jpeg",
   
  },
  "interventional-radiology-after-md-radiology": {
    "h1": "Fellowship in Interventional Radiology After MD Radiology: What You Need to Know",
    "keywords": "Interventional Radiology",
    "title": "Fellowship in Interventional Radiology After MD Radiology",
    "canonical": "interventional-radiology-after-md-radiology",
    "description": "Fellowship in Interventional Radiology after MD Radiology, eligibility, duration, career scope, salary, and training details.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-20-2026-04_30_31-PM.png",

  },
  "artificial-intelligence-reproductive-medicine-2026": {
    "h1": "AI in IVF: Clinical Applications and Trends in 2026",
    "keywords": "AI in IVF",
    "title": "AI in IVF: How It Is Changing Fertility Care in 2026",
    "canonical": "artificial-intelligence-reproductive-medicine-2026",
    "description": "AI in IVF is changing embryo selection, fertility treatment and clinical care. Explore its key applications, benefits, challenges and future in 2026.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-19-at-4.15.15-PM.jpeg",
   
  },
  "medical-fellowship-courses-booming-in-india-2026": {
    "h1": "Medical Fellowship Programs in India: Why They Are Growing in 2026",
    "keywords": "Medical Fellowship Programs in India",
    "title": "Medical Fellowship Programs in India: 2026 Guide",
    "canonical": "medical-fellowship-courses-booming-in-india-2026",
    "description": "Explore Medical Fellowship Programs in India in 2026, popular specialties, benefits, eligibility, duration, and how fellowships support doctors' careers.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-19-2026-11_35_08-AM.png",
    
  },
  "medical-career-in-pathology-skills-you-need-to-succeed": {
    "h1": "Medical Career in Pathology: Skills You Need to Succeed",
    "keywords": "career in pathology",
    "title": "Medical Career in Pathology: Skills You Need to Succeed",
    "canonical": "medical-career-in-pathology-skills-you-need-to-succeed",
    "description": "Start a successful medical career in pathology by learning essential skills, courses, salary, and career opportunities.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-18-2026-04_51_33-PM.png",
   
  },
  "surgical-oncology-education-training-and-career-path": {
    "h1": "Surgical Oncology Training: Career Path & Requirements",
    "keywords": "Surgical oncology Training",
    "title": "Surgical Oncology Training: Eligibility & Career Path",
    "canonical": "surgical-oncology-education-training-and-career-path",
    "description": "Explore Surgical Oncology Training, eligibility, course options, career paths, and skills for doctors planning a career in surgical oncology in India.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-17-2026-04_22_16-PM.png",
   
  },
  "dermatology-course-career-scope-salary-and-opportunities": {
    "h1": "dermatology scope in India",
    "keywords": "dermatology scope in India",
    "title": "Dermatology Scope in India: Career, Salary & Opportunities",
    "canonical": "dermatology-course-career-scope-salary-and-opportunities",
    "description": "Explore the dermatology scope in India, including career options, salary factors, job opportunities, specializations and future growth for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-16-2026-04_52_52-PM.png",

  },
  "how-fellowship-in-laparoscopy-hysteroscopy-can-boost-your-medical-career": {
    "h1": "How Fellowship in Laparoscopy & Hysteroscopy Can Boost Your Medical Career",
    "keywords": "Laparoscopy & Hysteroscopy",
    "title": "How Fellowship in Laparoscopy & Hysteroscopy Can Boost Career",
    "canonical": "how-fellowship-in-laparoscopy-hysteroscopy-can-boost-your-medical-career",
    "description": "Boost your medical career in Fellowship in Laparoscopy & Hysteroscopy. advanced minimally invasive surgical skills, improve patient outcomes,",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-14-2026-05_25_33-PM.png",
   
  },
  "certificate-in-family-medicine-complete-guide-2026": {
    "h1": "Family Medicine Course 2026: Complete Guide for Doctors",
    "keywords": "Family Medicine Course",
    "title": "Family Medicine Course 2026: Fees, Eligibility & Career",
    "canonical": "certificate-in-family-medicine-complete-guide-2026",
    "description": "Explore the Family Medicine Course 2026 with details on eligibility, fees, duration, curriculum, career scope, salary and admission for doctors.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-13-2026-02_42_09-PM.png",
   
  },
    "cancer-screening-guidelines": {
    "h1": "Cancer Screening Guidelines: A Protocol for General Physicians",
    "keywords": "cancer screening guidelines",
    "title": "Cancer Screening Guidelines: A Protocol for Physicians",
    "canonical": "cancer-screening-guidelines",
    "description": "Cancer screening guidelines for Indian physicians: breast, cervical & oral cancer protocols, NCG/NP-NCD standards, and an early-detection checklist.",
    "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-24-at-5.29.59-PM.jpeg",
    
  },
  "genetic-testing": {
    "h1": "Genetic Testing in Clinical Practice: A Guide for Doctors in India",
    "keywords": "genetic testing",
    "title": "Genetic Testing: Types, Uses & Clinical Applications in India",
    "canonical": "genetic-testing",
    "description": "Explore genetic testing for doctors in India, including testing methods, whole exome sequencing, genetic counselling and clinical applications.",
    "image": null,
   
  },


    "advances-in-pediatric-oncology-care": {
    "h1": "Advances in Pediatric Oncology Care: Latest Updates for Doctors",
    "keywords": "advances in pediatric oncology care",
    "title": "Advances in Pediatric Oncology Care: Latest Updates for Doctors",
    "canonical": "advances-in-pediatric-oncology-care",
    "description": "Explore the latest advances in pediatric oncology care, including targeted therapy, immunotherapy, precision medicine and modern cancer treatments for children.",
    "image": null,
   
  },

    "pediatric-skin-conditions-a-physicians-guide-to-diagnosis-and-care": {
    "h1": "Pediatric Skin Conditions: A Physician's Guide to Diagnosis and Care",
    "keywords": "pediatric skin conditions physician guide",
    "title": "Pediatric Skin Conditions Physician Guide: Diagnosis & Care",
    "canonical": "pediatric-skin-conditions-a-physicians-guide-to-diagnosis-and-care",
    "description": "Explore common pediatric skin conditions with this pediatric skin conditions physician guide covering symptoms, diagnosis and treatment approaches for better clinical care.",
   "image": "https://medicalglobalacademy.com/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-24-at-3.49.56-PM.jpeg",
  },

    "cme-full-form-doctors": {
    "h1": "CME Full Form for Doctors: Meaning & Why It Matters",
    "keywords": "CME full form",
    "title": "CME Full Form for Doctors: Meaning & Why It Matters",
    "canonical": "cme-full-form-doctors",
    "description": "CME stands for Continuing Medical Education — mandatory ongoing training for doctors. Learn what it means, why it's required, and how to earn credits.",
    "image": null,
  },

    "esr-high-means-causes-work-up-rheumatology": {
    "h1": "High ESR: What It Means, Causes & Rheumatology Work-Up",
    "keywords": "high ESR",
    "title": "High ESR: What It Means, Causes & Rheumatology Work-Up",
    "canonical": "esr-high-means-causes-work-up-rheumatology",
    "description": "High ESR (erythrocyte sedimentation rate) can signal inflammation. Learn common causes, when it points to rheumatologic disease, and next steps.",
    "image": null,
  }
};


export const BLOG_META = Object.fromEntries(
  Object.entries(RAW_BLOG_META).map(([slug, meta]) => [
    slug,
    {
      ...meta,
      title: cleanTitle(meta.title),
    },
  ])
);


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