// src/lib/courseSeo.js
// Har course ka SEO data. Key = page ka slug (URL ka last part).
// Har field page ke ek specific tag ki jagah aati hai (sheet ke "Use" column ke hisaab se).
//
// Field -> page par kahan dikhta hai:
//   h1             -> H1
//   metaTitle      -> <title>
//   metaDescription-> meta description
//   overviewH2     -> Overview ka H2            (+ intro = opening para)
//   deliveryH2     -> Program Highlights ka H2  ("delivery section")
//   eligibilityH2  -> Eligibility ka H2
//   curriculumH2   -> Curriculum ka H2
//   learnH2        -> "What you'll learn" ka H2
//   detailsH3      -> PG Note ka H3             ("course details section")
//   overviewH3     -> Overview ke neeche H3     ("course overview")
//   curriculumH3   -> Curriculum ke neeche H3
//   faqs           -> FAQ (Body / FAQ)
//   ctaText        -> Enroll button ke upar line (Body / CTA)

export const COURSE_SEO = {
  /* =======================================================
     1) PG Diploma in Reproductive Child Health
     ======================================================= */
  "pg-diploma-in-reproductive-child-health": {
    // Primary: H1, Title, URL
    h1: "PG Diploma in Reproductive Child Health: Build Skills in Maternal & Child Care",
    metaTitle: "PG Diploma in Reproductive Child Health for Doctors",

    // H2, Meta Description: rch diploma for mbbs doctors
    metaDescription:
      "A 12-month RCH diploma for MBBS doctors covering antenatal, postnatal, newborn and child healthcare. CPD & ACTD accredited.",
    learnH2: "What You'll Learn in the RCH Diploma for MBBS Doctors",

    // H2, opening para: reproductive and child health programme for doctors
    overviewH2: "Reproductive and Child Health Programme for Doctors",
    intro:
      "This reproductive and child health programme for doctors builds practical skills in maternal and child care through a structured, self-paced format.",

    // H2, eligibility section: diploma in reproductive medicine
    eligibilityH2: "Diploma in Reproductive Medicine: Eligibility",

    // H2, curriculum section: reproductive health and family planning diploma
    curriculumH2: "Reproductive Health and Family Planning Diploma Curriculum",

    // H3, course details section: 12 month reproductive child health diploma
    detailsH3: "12 Month Reproductive Child Health Diploma",

    // H3, curriculum section: antenatal postnatal and newborn care diploma
    curriculumH3: "Antenatal Postnatal and Newborn Care Diploma",

    // H3, course overview: reproductive and child health programme india
    overviewH3: "Reproductive and Child Health Programme India",

    // Body / FAQ: self-paced rch programme for doctors
    faqs: [
      {
        q: "Is this a self-paced RCH programme for doctors?",
        a: "Yes, this is a self-paced RCH programme for doctors, so you can learn alongside your clinical work.",
      },
      {
        q: "Can MBBS doctors enrol in this diploma?",
        a: "Yes, MBBS doctors with valid registration can enrol in this course.",
      },
    ],

    // Body / CTA: reproductive child health course after mbbs
    ctaText: "Start your reproductive child health course after MBBS today.",
  },

  /* =======================================================
     2) PG Diploma in Obstetrics and Gynaecology
     NOTE: sheet mein URL, H1 aur Meta Description kat gaye the.
     Slug aur H1 ka aakhri hissa confirm kar lena.
     ======================================================= */
  "pg-diploma-in-obstetrics-and-gynaecology": {
    // Primary: H1, Title, URL: diploma in gynaecology and obstetrics
    h1: "Diploma in Gynaecology and Obstetrics: Build Core Skills in Women's Health",
    metaTitle: "Diploma in Gynaecology and Obstetrics for Doctors",

    // H2, Meta Description: postgraduate diploma in obstetrics and gynaecology
    metaDescription:
      "Learn online with MGA's 12-month postgraduate diploma in obstetrics and gynaecology for doctors. CPD & ACTD accredited.",
    learnH2: "What You'll Learn in the Postgraduate Diploma in Obstetrics and Gynaecology",

    // H2, opening para: diploma in gynaecology and obstetrics course
    overviewH2: "Diploma in Gynaecology and Obstetrics Course",
    intro:
      "This diploma in gynaecology and obstetrics course helps doctors build core clinical skills in antenatal care, labour, delivery and women's health through a structured online format.",

    // H2, delivery section: pg diploma in obstetrics and gynaecology
    deliveryH2: "PG Diploma in Obstetrics and Gynaecology",

    // H2, eligibility section: diploma in gynaecology and obstetrics for doctors
    eligibilityH2: "Diploma in Gynaecology and Obstetrics for Doctors: Eligibility",

    // H3, course details section: 12 month diploma in obstetrics and gynaecology
    detailsH3: "12 Month Diploma in Obstetrics and Gynaecology",

    // H3, course overview: women's health diploma course for doctors
    overviewH3: "Women's Health Diploma Course for Doctors",

    // H3, curriculum section: obstetrics and gynaecology diploma after mbbs
    curriculumH3: "Obstetrics and Gynaecology Diploma After MBBS",

    // Body / FAQ: diploma in gynaecology and obstetrics fees
    faqs: [
      {
        q: "What are the diploma in gynaecology and obstetrics fees?",
        a: "The diploma in gynaecology and obstetrics fees, including registration and total program cost, are shown in the fee section on this page.",
      },
      {
        q: "Can I do this diploma after MBBS?",
        a: "Yes, MBBS doctors with valid registration can enrol in this course.",
      },
    ],

    // Body / CTA: online diploma in obstetrics and gynaecology india
    ctaText: "Enrol in the online diploma in obstetrics and gynaecology India today.",
  },

  /* =======================================================
     CERTIFICATE COURSES (sheet se add kiye gaye)
     Sirf h1 / metaTitle / metaDescription sheet mein the,
     baaki fields (H2/H3/FAQ/CTA) jab ready ho tab add karna.
     ======================================================= */

  "certificate-in-family-medicine": {
    h1: "Certificate in Family Medicine: Build Confidence in Primary Care",
    metaTitle: "Certificate in Family Medicine for Confident Primary Care",
    // NOTE: sheet mein "helps Dr. build" likha hai -- "Dr." check kar lena
    metaDescription:
      "This certificate helps Dr. build stronger primary care skills over 6 months — self-paced, CPD & ACTD accredited, with mentorship from practising faculty.",
  },

  "certificate-in-obstetrics-and-gynaecology": {
    h1: "Certificate in Gynaecology and Obstetrics: Build Practical Knowledge of Women's Health",
    metaTitle: "Certificate in Gynaecology and Obstetrics for Doctors",
    metaDescription:
      "Learn about gynaecological procedures and obstetric care with a 6-month Certificate in Gynaecology and Obstetrics — CPD & ACTD accredited.",
  },

  "certificate-in-rheumatology": {
    h1: "Online Certificate in Rheumatology: For Doctors Managing Rheumatic Conditions",
    metaTitle: "Online Certificate in Rheumatology for Practising Doctors",
    metaDescription:
      "Sharpen how you diagnose and manage rheumatic conditions with a 6-month online rheumatology certificate — CPD & ACTD accredited, guided by practising faculty.",
  },

  "certificate-in-internal-medicine": {
    h1: "Certificate in Internal Medicine: Strengthen Everyday Clinical Practice",
    metaTitle: "Certificate in Internal Medicine for Clinical Practice",
    metaDescription:
      "Build sharper diagnosis and case-management skills with a 6-month internal medicine certificate — self-paced, CPD & ACTD accredited, mentored faculty.",
  },

  "certificate-in-clinical-cardiology": {
    h1: "Certificate in Clinical Cardiology: Build Core Diagnostic Skills",
    metaTitle: "Certificate in Clinical Cardiology to Build Core Skills",
    metaDescription:
      "Strengthen how you manage hypertension, ischemic heart disease and arrhythmias with a 6-month cardiology certificate, CPD & ACTD accredited.",
  },

  "certificate-in-research-methodology": {
    h1: "Certificate in Research Methodology: Design, Conduct & Publish Clinical Research",
    metaTitle: "Certificate in Research Methodology for Practising Doctors",
    metaDescription:
      "Learn to design, conduct and publish sound clinical research with a 6-month online certificate — CPD & ACTD accredited, guided by practising faculty.",
  },

  "certificate-in-pediatrics": {
    h1: "Certificate in Pediatrics: Build Confidence in Child Healthcare",
    metaTitle: "Certificate in Pediatrics for Confident Child Healthcare",
    metaDescription:
      "Build practical skills in child development, immunization and common pediatric illnesses with a 6-month certificate — CPD & ACTD accredited, mentored faculty.",
  },

  // NOTE: sheet mein is slug ki 2 entries thi (S.No 8 + neeche wali newer row). Newer row use ki hai.
  "certificate-in-infection-control-and-prevention": {
    h1: "Certification in Infection Control: Master Outbreak Prevention",
    metaTitle: "Certification in Infection Control for Doctors in India",
    metaDescription:
      "Learn online with MGA’s Certification in Infection Control for doctors — covering sterilization, outbreak & HAI management, UK CPD & ACTD accredited.",
  },

  "certificate-in-gastroenterology": {
    h1: "Certificate Course in Gastroenterology: Build Your GI Practice Foundation",
    metaTitle: "Certificate Course in Gastroenterology for Doctors",
    metaDescription:
      "Elevate your expertise in diagnosing and managing GI diseases with a 6-month Certificate Course in Gastroenterology — CPD & ACTD accredited.",
  },

  "certificate-in-addiction-medicine": {
    h1: "Certificate in Addiction Medicine",
    metaTitle: "Certificate in Addiction Medicine for Doctors",
    metaDescription:
      "Certification in Addiction Medicine covers the evaluation and management of substance-use disorders. 6-month online course, CPD & ACTD accredited.",
  },

  "certificate-in-neurology": {
    h1: "Certificate in Neurology: Build a Structured Foundation in Neurological Care",
    metaTitle: "Certificate in Neurology: Diagnose Neurological Disorders",
    metaDescription:
      "A 6-month online Certificate in Neurology covering nervous system anatomy, common neurological disorders and diagnostic techniques. CPD & ACTD accredited.",
  },

  "certificate-in-maternal-and-child-health": {
    h1: "Certificate in Maternal and Child Health for Doctors",
    metaTitle: "Certificate in Maternal and Child Health for Doctors",
    metaDescription:
      "A 6-month Certificate in Maternal and Child Health for doctors — covering prenatal, postnatal and child healthcare, CPD & ACTD accredited.",
  },

  "certificate-in-clinical-nutrition-and-dietetics": {
    h1: "Certificate in Clinical Nutrition and Dietetics: For Better Patient Care",
    metaTitle: "Certificate in Clinical Nutrition for Better Patient Care",
    metaDescription:
      "A 6-month Certificate in Clinical Nutrition and Dietetics for doctors — understand how nutrition impacts patient health, with CPD & ACTD accreditation.",
  },

  "certificate-in-pain-management": {
    h1: "Certificate in Pain Management: Master Acute, Chronic, Cancer and Neuropathic Pain Care",
    metaTitle: "Certificate in Pain Management: 6-Month Course for Doctors",
    metaDescription:
      "Enroll in the CPD & ACTD accredited Certificate in Pain Management. Master acute, chronic, cancer and neuropathic pain management online in 6 months.",
  },

  // NOTE: sheet mein is slug ki 2 entries thi (S.No 15 + neeche wali newer row). Newer row use ki hai.
  "certificate-in-diabetic-foot-care": {
    h1: "Certificate Course in Diabetic Footcare: Prevent Complications",
    metaTitle: "Certificate Course in Diabetic Footcare for Doctors",
    metaDescription:
      "Learn online with MGA’s Certificate Course in Diabetic Footcare for doctors — 6 months in ulcer prevention & wound care, UK CPD & ACTD accredited.",
  },

  "certificate-in-aesthetic-medicine": {
    h1: "Certificate in Aesthetic Medicine: Build Foundational Skills in Skin and Aesthetic Care",
    metaTitle: "Certificate in Aesthetic Medicine to Build Clinical Skills",
    metaDescription:
      "This 6-month Certificate in Aesthetic Medicine covers skin assessment, chemical peels and microneedling — CPD & ACTD accredited, for doctors.",
  },

  "certificate-in-dermatology": {
    h1: "Certificate Course in Dermatology: Manage Common Skin Conditions",
    metaTitle: "Certificate Course in Dermatology to Manage Skin Conditions",
    metaDescription:
      "This 6-month Certificate Course in Dermatology covers skin anatomy, common dermatological conditions and diagnostic techniques — CPD & ACTD accredited.",
  },

  "certificate-in-diabetology": {
    h1: "Certificate Course in Diabetology: Build Skills in Diabetes Management",
    metaTitle: "Certificate Course in Diabetology to Manage Diabetes Care",
    metaDescription:
      "Learn to diagnose, treat and monitor diabetes mellitus through structured, self-paced modules — a 6-month diabetology certificate, CPD & ACTD accredited.",
  },

  "certificate-in-emergency-medicine": {
    h1: "Certificate in Emergency Medicine: Strengthen Assessment and Decision-Making Skills",
    metaTitle: "Certificate in Emergency Medicine for Doctors",
    metaDescription:
      "Strengthen your emergency assessment, clinical decision-making and patient management skills through this 6-month certificate, CPD & ACTD accredited.",
  },

  "certificate-in-oncology": {
    h1: "Certificate Course in Oncology: Build a Foundation in Cancer Care",
    metaTitle: "Certificate Course in Oncology to Understand Cancer Care",
    metaDescription:
      "Build a strong foundation in cancer biology, treatment modalities and patient care strategies through this 6-month oncology certificate, CPD & ACTD accredited.",
  },

  "certificate-in-pediatric-dermatology": {
    h1: "Certificate in Pediatric Dermatology: Explore Pediatric Skin Care",
    metaTitle: "Certificate in Pediatric Dermatology for Skin Care",
    metaDescription:
      "Explore the specialized field of pediatric skin care through this 6-month online certificate, CPD & ACTD accredited, guided by practising faculty.",
  },

  "certificate-in-pediatric-neurology": {
    h1: "Certificate in Pediatric Neurology: Assess and Manage Neurological Disorders in Children",
    metaTitle: "Certificate in Pediatric Neurology for Child Care",
    metaDescription:
      "Diagnosing a child's neurological disorder takes a different lens — this 6-month certificate sharpens that clinical judgment, CPD & ACTD accredited.",
  },

  "certificate-in-neuropathology": {
    h1: "Certificate Course in Neuropathology: Build Diagnostic Skills in Histopathology and Neuroanatomy",
    metaTitle: "Certificate Course in Neuropathology for Diagnosis",
    metaDescription:
      "Reading brain tissue and diagnostic patterns takes trained eyes — this 6-month certificate builds skills in histopathology, CPD & ACTD accredited.",
  },

  "certificate-in-orthopaedics": {
    h1: "Certificate in Orthopaedics: Build Skills in Bone and Joint Management",
    metaTitle: "Certificate in Orthopaedics for Bone and Joint Care",
    metaDescription:
      "Fractures, joint replacements and rehabilitation need sound clinical grounding — this 6-month certificate covers anatomy, biomechanics and dislocations.",
  },

  "certificate-in-endocrinology": {
    h1: "Certificate Course in Endocrinology: Build Knowledge Across the Endocrine Spectrum",
    metaTitle: "Certificate Course in Endocrinology for Hormone Care",
    metaDescription:
      "Hormone imbalances rarely show up in isolation — this 6-month certificate covers pituitary, thyroid and adrenal disorders, CPD & ACTD accredited.",
  },

  "certificate-in-pathology": {
    h1: "Online Certificate in Pathology: Build Confidence in Diagnostic Interpretation",
    metaTitle: "Online Certificate in Pathology for Lab Diagnosis",
    metaDescription:
      "Interpreting lab results with confidence takes practice — this 6-month certificate covers hematology and microbiology, CPD & ACTD accredited.",
  },

  "certificate-in-thoracic-oncology": {
    h1: "Certificate in Thoracic Oncology: Build Expertise in Lung Cancer and Malignancies",
    metaTitle: "Online Certificate in Thoracic Oncology for Doctors",
    metaDescription:
      "Managing lung cancer and thoracic malignancies calls for focused clinical understanding, built through this 6-month certificate, CPD & ACTD accredited.",
  },

  "certificate-in-rehabilitation-therapy": {
    h1: "Certificate Course in Rehabilitation Therapy: Structured Online Learning for Patient Recovery",
    metaTitle: "Certificate Course in Rehabilitation Therapy Online",
    metaDescription:
      "Helping patients regain movement and function starts with structured rehabilitation knowledge. This 6-month certificate builds it, CPD & ACTD accredited.",
  },

  "certificate-in-ophthalmology": {
    h1: "Certification Course in Ophthalmology: Online Learning to Diagnose and Manage Eye Conditions",
    metaTitle: "Certification Course in Ophthalmology for Eye Care",
    metaDescription:
      "Diagnosing and managing eye conditions starts with a strong clinical base. This 6-month Certification Course in Ophthalmology is CPD & ACTD accredited.",
  },

  "certificate-in-otorhinolaryngology": {
    h1: "Certificate Course in Otorhinolaryngology: Online Learning for Ear, Nose and Throat Care",
    metaTitle: "Certificate Course in Otorhinolaryngology for ENT Care",
    metaDescription:
      "Confidently assess ear, nose and throat disorders in daily practice — this 6-month Certificate Course in Otorhinolaryngology is CPD & ACTD accredited.",
  },

  "certificate-in-cosmetology": {
    h1: "Certificate Course in Cosmetology: Online Learning for Doctors in Skin and Hair Care",
    metaTitle: "Certificate Course in Cosmetology for Doctors Online",
    metaDescription:
      "Cosmetology through a clinical lens — this 6-month Certificate Course in Cosmetology for doctors covers skin and hair care, CPD & ACTD accredited.",
  },

  "certificate-in-echocardiography": {
    h1: "Certificate Course in Echocardiography: Online Learning in Cardiac Imaging for Doctors",
    metaTitle: "Certificate Course in Echocardiography for Cardiac Care",
    metaDescription:
      "Reading echo studies shapes cardiac care — this 6-month Certificate Course in Echocardiography builds cardiac imaging skills, CPD & ACTD accredited.",
  },

  "certificate-in-general-medicine": {
    h1: "Certificate Course in General Medicine: Online Learning for Adult Patient Care",
    metaTitle: "Certificate Course in General Medicine for Adult Care",
    metaDescription:
      "From fever to chronic illness, adult patients need a sound clinical approach — this 6-month Certificate Course in General Medicine is CPD & ACTD accredited.",
  },

  "certificate-in-urology": {
    h1: "Certificate Course in Urology: Online Learning for Urinary Tract and Urological Conditions",
    metaTitle: "Certificate Course in Urology for Urinary Tract Care",
    metaDescription:
      "Managing urinary tract and urological conditions calls for a focused clinical base — this 6-month Certificate Course in Urology is CPD & ACTD accredited.",
  },

  "certificate-in-hernia": {
    h1: "Certificate in Hernia: Online Learning in Hernia Diagnosis and Management for Doctors",
    metaTitle: "Certificate in Hernia for Diagnosis and Management",
    metaDescription:
      "Recognising hernia types and choosing the right management approach is core surgical knowledge — this 6-month online Certificate in Hernia is CPD & ACTD accredited.",
  },

  "certificate-in-dental-oncology": {
    h1: "Certificate Course in Dental Oncology: Online Learning in Oral Cancer Awareness and Early Detection",
    metaTitle: "Certificate Course in Dental Oncology for Oral Cancer",
    metaDescription:
      "Early detection of oral malignant changes starts with a trained eye — this 6-month online Certificate Course in Dental Oncology is CPD & ACTD accredited.",
  },

  "certificate-in-ecg-interpretation": {
    h1: "Certificate Course in ECG Interpretation: Online Learning in ECG Waveforms and Cardiac Rhythms for Doctors",
    metaTitle: "Certificate Course in ECG Interpretation Online",
    metaDescription:
      "Reading the ECG waveform and cardiac rhythms is a core clinical skill — this 6-month Certificate Course in ECG Interpretation is CPD & ACTD accredited.",
  },

  "certificate-in-regenerative-medicine": {
    h1: "Certificate Course in Regenerative Medicine: Online Learning in Tissue Repair and Regeneration for Doctors",
    metaTitle: "Certificate Course in Regenerative Medicine Online",
    metaDescription:
      "Understand the science of tissue repair and regeneration in this 6-month online Certificate Course in Regenerative Medicine, CPD & ACTD accredited.",
  },

  "certificate-in-paediatric-orthopaedics": {
    h1: "Certificate in Paediatric Orthopaedics: Online Learning in Musculoskeletal Care of Children for Doctors",
    metaTitle: "Certificate in Paediatric Orthopaedics: Child Bone Care",
    metaDescription:
      "Assessing congenital, developmental and traumatic conditions in children — this 6-month Certificate in Paediatric Orthopaedics is CPD & ACTD accredited.",
  },

  "certificate-in-child-health": {
    h1: "Certificate Course in Child Health: Online Learning in Clinical Examination and Case Presentation for Doctors",
    metaTitle: "Certificate Course in Child Health for Clinical Care",
    metaDescription:
      "History taking and clinical examination in children need a different approach — this 6-month Certificate Course in Child Health is CPD & ACTD accredited.",
  },

  "certificate-in-advanced-ultrasound-in-obstetrics-and-gynecology": {
    h1: "Certificate Course in Gynecology and Obstetrics: Online Learning in Advanced Ultrasound for Doctors",
    metaTitle: "Certificate Course in Gynecology and Obstetrics Online",
    metaDescription:
      "Interpreting obstetric and gynecological ultrasound — this 6-month online Certificate Course in Gynecology and Obstetrics is CPD & ACTD accredited.",
  },

  // NOTE: sheet mein status "redirect" hai -- confirm kar lena ki ye page live hai
  "certificate-in-critical-care": {
    h1: "Certificate in Critical Care: Build Core ICU Skills",
    metaTitle: "Certificate in Critical Care for Doctors in India",
    metaDescription:
      "Learn online with MGA’s Certificate in Critical Care for doctors — covering ICU protocols, sepsis & ventilator management, UK CPD & ACTD accredited.",
  },

  // NOTE: sheet mein status "redirect" hai -- confirm kar lena ki ye page live hai
  "certificate-in-histopathology": {
    h1: "Certificate in Histopathology: Build Core Diagnostic Skills",
    metaTitle: "Certificate in Histopathology for Doctors",
    metaDescription:
      "Learn online with MGA’s Certificate in Histopathology for doctors — covering tissue processing, staining & diagnostic reporting, UK CPD & ACTD accredited.",
  },

  // Naya course add karna ho to yahan isi format mein ek aur block daalo
};

export const getCourseSeo = (slug) => COURSE_SEO[slug] || null;