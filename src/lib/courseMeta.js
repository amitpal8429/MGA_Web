// src/lib/courseMeta.js
// Har course slug ke liye manual SEO title & description.
// Yahan entry na ho to component apne aap course.name/description se bana lega (fallback).
//
// Title: ~55-60 characters ke andar rakhna best hai (Google truncate kar deta hai zyada lamba).
// Description: ~120-160 characters ideal.

// ---------------------------------------------------------------------------
// Helper: strip "MGA" / "Medical Global Academy" from a title string.
// Handles brand at start, end, or middle, with any common separator.
// ---------------------------------------------------------------------------
export function cleanTitle(title) {
  if (!title) return title;

  const BRAND = "(?:MGA|Medical\\s*Global\\s*Academy)";

  return title
    // "| MGA", "- MGA", "– MGA", "— MGA", ": MGA", "• MGA" at end
    .replace(new RegExp(`[\\|\\-–—:•]\\s*${BRAND}\\s*$`, "gi"), "")
    // "MGA |", "MGA -", "MGA –", "MGA —", "MGA :", "MGA •" at start
    .replace(new RegExp(`^\\s*${BRAND}\\s*[\\|\\-–—:•]\\s*`, "gi"), "")
    // brand in middle surrounded by separators on both sides
    .replace(
      new RegExp(`\\s*[\\|\\-–—:•]\\s*${BRAND}\\s*[\\|\\-–—:•]\\s*`, "gi"),
      " | "
    )
    // leftover standalone brand word
    .replace(new RegExp(BRAND, "gi"), "")
    // tidy up
    .replace(/\s{2,}/g, " ")
    .replace(/^[\|\-–—:•\s]+|[\|\-–—:•\s]+$/g, "")
    .trim();
}

const COURSE_META = {
  // ============================================================
  // CERTIFICATE COURSES (from spreadsheet rows 1-41)
  // ============================================================
  "certificate-in-family-medicine": {
    title: "Certificate in Family Medicine for Confident Primary Care",
    description:
      "This certificate helps doctors build stronger primary care skills over 6 months — self-paced, CPD & ACTD accredited, with mentorship from practising faculty.",
  },
  "certificate-in-obstetrics-and-gynaecology": {
    title: "Certificate in Gynaecology and Obstetrics for Doctors",
    description:
      "Learn about gynaecological procedures and obstetric care with a 6-month Certificate in Gynaecology and Obstetrics — CPD & ACTD accredited.",
  },
  "certificate-in-rheumatology": {
    title: "Online Certificate in Rheumatology for Practising Doctors",
    description:
      "Sharpen how you diagnose and manage rheumatic conditions with a 6-month online rheumatology certificate — CPD & ACTD accredited, guided by practising faculty.",
  },
  "certificate-in-internal-medicine": {
    title: "Certificate in Internal Medicine for Clinical Practice",
    description:
      "Build sharper diagnosis and case-management skills with a 6-month internal medicine certificate — self-paced, CPD & ACTD accredited, mentored faculty.",
  },
  "certificate-in-clinical-cardiology": {
    title: "Certificate in Clinical Cardiology to Build Core Skills",
    description:
      "Strengthen how you manage hypertension, ischemic heart disease and arrhythmias with a 6-month cardiology certificate, CPD & ACTD accredited.",
  },
  "certificate-in-research-methodology": {
    title: "Certificate in Research Methodology for Practising Doctors",
    description:
      "Learn to design, conduct and publish sound clinical research with a 6-month online certificate — CPD & ACTD accredited, guided by practising faculty.",
  },
  "certificate-in-pediatrics": {
    title: "Certificate in Pediatrics for Confident Child Healthcare",
    description:
      "Build practical skills in child development, immunization and common pediatric illnesses with a 6-month certificate — CPD & ACTD accredited, mentored faculty.",
  },
  "certificate-in-infection-control-and-prevention": {
    title: "Certificate in Infection Control & Prevention for Doctors",
    description:
      "Build essential skills in infection control and prevention for your healthcare facility with a 6-month online certificate, CPD & ACTD accredited.",
  },
  "certificate-in-gastroenterology": {
    title: "Certificate Course in Gastroenterology for Doctors",
    description:
      "Elevate your expertise in diagnosing and managing GI diseases with a 6-month Certificate Course in Gastroenterology — CPD & ACTD accredited.",
  },
  "certificate-in-addiction-medicine": {
    title: "Certificate in Addiction Medicine for Doctors",
    description:
      "Certification in Addiction Medicine covers the evaluation and management of substance-use disorders. 6-month online course, CPD & ACTD accredited.",
  },
  "certificate-in-neurology": {
    title: "Certificate in Neurology: Diagnose Neurological Disorders",
    description:
      "A 6-month online Certificate in Neurology covering nervous system anatomy, common neurological disorders and diagnostic techniques. CPD & ACTD accredited.",
  },
  "certificate-in-maternal-and-child-health": {
    title: "Certificate in Maternal and Child Health for Doctors",
    description:
      "A 6-month Certificate in Maternal and Child Health for doctors — covering prenatal, postnatal and child healthcare, CPD & ACTD accredited.",
  },
  "certificate-in-clinical-nutrition-and-dietetics": {
    title: "Certificate in Clinical Nutrition for Better Patient Care",
    description:
      "A 6-month Certificate in Clinical Nutrition and Dietetics for doctors — understand how nutrition impacts patient health, with CPD & ACTD accreditation.",
  },
  "certificate-in-pain-management": {
    title: "Certificate in Pain Management: 6-Month Course for Doctors",
    description:
      "Enroll in the CPD & ACTD accredited Certificate in Pain Management. Master acute, chronic, cancer and neuropathic pain management online in 6 months.",
  },
  "certificate-in-diabetic-foot-care": {
    title: "Certificate in Diabetic Footcare to Prevent Complications",
    description:
      "This 6-month Certificate in Diabetic Footcare covers foot anatomy, risk factors and early signs of complications — CPD & ACTD accredited, for doctors.",
  },
  "certificate-in-aesthetic-medicine": {
    title: "Certificate in Aesthetic Medicine to Build Clinical Skills",
    description:
      "This 6-month Certificate in Aesthetic Medicine covers skin assessment, chemical peels and microneedling — CPD & ACTD accredited, for doctors.",
  },
  "certificate-in-dermatology": {
    title: "Certificate Course in Dermatology to Manage Skin Conditions",
    description:
      "This 6-month Certificate Course in Dermatology covers skin anatomy, common dermatological conditions and diagnostic techniques — CPD & ACTD accredited.",
  },
  "certificate-in-diabetology": {
    title: "Certificate Course in Diabetology to Manage Diabetes Care",
    description:
      "Learn to diagnose, treat and monitor diabetes mellitus through structured, self-paced modules — a 6-month diabetology certificate, CPD & ACTD accredited.",
  },
  "certificate-in-emergency-medicine": {
    title: "Certificate in Emergency Medicine for Doctors",
    description:
      "Strengthen your emergency assessment, clinical decision-making and patient management skills through this 6-month certificate, CPD & ACTD accredited.",
  },
  "certificate-in-oncology": {
    title: "Certificate Course in Oncology to Understand Cancer Care",
    description:
      "Build a strong foundation in cancer biology, treatment modalities and patient care strategies through this 6-month oncology certificate, CPD & ACTD accredited.",
  },
  "certificate-in-pediatric-dermatology": {
    title: "Certificate in Pediatric Dermatology for Skin Care",
    description:
      "Explore the specialized field of pediatric skin care through this 6-month online certificate, CPD & ACTD accredited, guided by practising faculty.",
  },
  "certificate-in-pediatric-neurology": {
    title: "Certificate in Pediatric Neurology for Child Care",
    description:
      "Diagnosing a child's neurological disorder takes a different lens — this 6-month certificate sharpens that clinical judgment, CPD & ACTD accredited.",
  },
  "certificate-in-neuropathology": {
    title: "Certificate Course in Neuropathology for Diagnosis",
    description:
      "Reading brain tissue and diagnostic patterns takes trained eyes — this 6-month certificate builds skills in histopathology, CPD & ACTD accredited.",
  },
  "certificate-in-orthopaedics": {
    title: "Certificate in Orthopaedics for Bone and Joint Care",
    description:
      "Fractures, joint replacements and rehabilitation need sound clinical grounding — this 6-month certificate covers anatomy, biomechanics and dislocations.",
  },
  "certificate-in-endocrinology": {
    title: "Certificate Course in Endocrinology for Hormone Care",
    description:
      "Hormone imbalances rarely show up in isolation — this 6-month certificate covers pituitary, thyroid and adrenal disorders, CPD & ACTD accredited.",
  },
  "certificate-in-pathology": {
    title: "Certificate in Pathology for Lab Diagnosis",
    description:
      "Interpreting lab results with confidence takes practice — this 6-month certificate covers hematology and microbiology, CPD & ACTD accredited.",
  },
  "certificate-in-thoracic-oncology": {
    title: "Online Certificate in Thoracic Oncology for Doctors",
    description:
      "Managing lung cancer and thoracic malignancies calls for focused clinical understanding, built through this 6-month certificate, CPD & ACTD accredited.",
  },
  "certificate-in-rehabilitation-therapy": {
    title: "Certificate Course in Rehabilitation Therapy Online",
    description:
      "Helping patients regain movement and function starts with structured rehabilitation knowledge. This 6-month certificate builds it, CPD & ACTD accredited.",
  },
  "certificate-in-ophthalmology": {
    title: "Certification Course in Ophthalmology for Eye Care",
    description:
      "Diagnosing and managing eye conditions starts with a strong clinical base. This 6-month Certification Course in Ophthalmology is CPD & ACTD accredited.",
  },
  "certificate-in-otorhinolaryngology": {
    title: "Certificate Course in Otorhinolaryngology for ENT Care",
    description:
      "Confidently assess ear, nose and throat disorders in daily practice — this 6-month Certificate Course in Otorhinolaryngology is CPD & ACTD accredited.",
  },
  "certificate-in-cosmetology": {
    title: "Certificate Course in Cosmetology for Doctors Online",
    description:
      "Cosmetology through a clinical lens — this 6-month Certificate Course in Cosmetology for doctors covers skin and hair care, CPD & ACTD accredited.",
  },
  "certificate-in-echocardiography": {
    title: "Certificate Course in Echocardiography for Cardiac Care",
    description:
      "Reading echo studies shapes cardiac care — this 6-month Certificate Course in Echocardiography builds cardiac imaging skills, CPD & ACTD accredited.",
  },
  "certificate-in-general-medicine": {
    title: "Certificate Course in General Medicine for Adult Care",
    description:
      "From fever to chronic illness, adult patients need a sound clinical approach — this 6-month Certificate Course in General Medicine is CPD & ACTD accredited.",
  },
  "certificate-in-urology": {
    title: "Certificate Course in Urology for Urinary Tract Care",
    description:
      "Managing urinary tract and urological conditions calls for a focused clinical base — this 6-month Certificate Course in Urology is CPD & ACTD accredited.",
  },
  "certificate-in-hernia": {
    title: "Certificate in Hernia for Diagnosis and Management",
    description:
      "Recognising hernia types and choosing the right management approach is core surgical knowledge — this 6-month online Certificate in Hernia is CPD & ACTD accredited.",
  },
  "certificate-in-dental-oncology": {
    title: "Certificate Course in Dental Oncology for Oral Cancer",
    description:
      "Early detection of oral malignant changes starts with a trained eye — this 6-month online Certificate Course in Dental Oncology is CPD & ACTD accredited.",
  },
  "certificate-in-ecg-interpretation": {
    title: "Certificate Course in ECG Interpretation Online",
    description:
      "Reading the ECG waveform and cardiac rhythms is a core clinical skill — this 6-month Certificate Course in ECG Interpretation is CPD & ACTD accredited.",
  },
  "certificate-in-regenerative-medicine": {
    title: "Certificate Course in Regenerative Medicine Online",
    description:
      "Understand the science of tissue repair and regeneration in this 6-month online Certificate Course in Regenerative Medicine, CPD & ACTD accredited.",
  },
  "certificate-in-paediatric-orthopaedics": {
    title: "Certificate in Paediatric Orthopaedics: Child Bone Care",
    description:
      "Assessing congenital, developmental and traumatic conditions in children — this 6-month Certificate in Paediatric Orthopaedics is CPD & ACTD accredited.",
  },
  "certificate-in-child-health": {
    title: "Certificate Course in Child Health for Clinical Care",
    description:
      "History taking and clinical examination in children need a different approach — this 6-month Certificate Course in Child Health is CPD & ACTD accredited.",
  },
  "certificate-in-advanced-ultrasound-in-obstetrics-and-gynecology": {
    title: "Certificate Course in Gynecology and Obstetrics Online",
    description:
      "Interpreting obstetric and gynecological ultrasound — this 6-month online Certificate Course in Gynecology and Obstetrics is CPD & ACTD accredited.",
  },

  // ============================================================
  // P1 - Meta/Title Fix (Rows 1-52)
  // ============================================================
  "pg-diploma-in-ultrasonography": {
    title: "PG Diploma in Ultrasound & Sonography for MBBS",
    description:
      "Join the PG Diploma in Ultrasonography with fees, eligibility, duration, EMI options, CPD certificate and admission details for MBBS doctors in India.",
  },
  "pg-diploma-in-clinical-cardiology": {
    title: "PG Diploma in Clinical Cardiology | 12-Month Online Program",
    description:
      "Join a CPD accredited PG Diploma in Clinical Cardiology with online learning, EMI plans and a 12-month program for doctors seeking advanced skills now",
  },
  "pg-diploma-in-dermatology": {
    title: "PG Diploma in Dermatology: 12-Month Online Program 2026",
    description:
      "PG Diploma in Dermatology — 12-month online learning. Master skin disorders, cosmetic & diagnostic skills. CPD accredited. Flexible fees & EMI. Enrol now.",
  },
  "fetal-medicine-fellowship": {
    title: "Fellowship in Fetal Medicine: 12-Month Online Course",
    description:
      "Fellowship in Fetal Medicine | 12-month CPD program. Master prenatal diagnosis, fetal ultrasound & high-risk pregnancy care with 1-year mentorship",
  },
  "pg-diploma-in-clinical-embryology": {
    title: "PG Diploma in Clinical Embryology Online IVF Course",
    description:
      "Learn online PG Diploma in Clinical Embryology. Master IVF, ICSI, embryo culture, cryopreservation. CPD-accredited 12-month fertility specialist training.",
  },
  "pg-diploma-in-general-medicine": {
    title: "PG Diploma General Medicine: Clinical Skills for MBBS",
    description:
      "PG Diploma in General Medicine in India — is it worth it after MBBS? Compare with MD, explore career scope, eligibility & clinical training pathway.",
  },
  "fellowship-in-cardiothoracic-surgery": {
    title: "Fellowship Cardiothoracic Surgery: 12-Month Program",
    description:
      "Learn online Fellowship in Cardiothoracic Surgery in India. Master CABG, valve surgery & thoracic procedures. UK CPD accredited, 12-month course.",
  },
  "fellowship-in-radiology": {
    title: "Fellowship Radiology: Learn CT, MRI & Ultrasound Fast",
    description:
      "12-month CPD-accredited Radiology Fellowship for MBBS, MD & MS doctors. Master CT, MRI and ultrasound imaging with expert faculty and 1-year mentorship.",
  },
  "fellowship-in-dermatology": {
    title: "Fellowship Dermatology: Medical & Cosmetic Training",
    description:
      "Learn online Fellowship in Dermatology in India. Master medical & cosmetic dermatology, dermoscopy & laser treatment. UK CPD accredited, 12 months.",
  },
  "pg-diploma-in-pathology": {
    title: "Postgraduate Pathology Diploma for Doctors Online",
    description:
      "Postgraduate pathology diploma for doctors covering histopathology, microbiology and lab diagnosis. 12-month CPD-accredited program with expert mentorship.",
  },
  "fellowship-in-obstetrics-gynaecology": {
    title: "Fellowship in Gynaecology & Obstetrics for Doctors",
    description:
      "Fellowship in Gynaecology & Obstetrics for doctors. Master pregnancy care, labour management and women's health in a 12-month online course with guidance.",
  },
  "pg-diploma-in-emergency-medicine": {
    title: "PG Diploma in Emergency Medicine in India",
    description:
      "PG Diploma in Emergency Medicine for doctors. Master trauma care, emergency procedures and critical patient management. 12-month online, CPD accredited.",
  },
  "pg-diploma-in-orthopedics": {
    title: "Postgraduate Diploma in Orthopedics — Online Course",
    description:
      "Master orthopedic care with our 12-month postgraduate diploma in orthopedics. Learn trauma, joint reconstruction, spine & sports medicine with expert care.",
  },
  "fellowship-in-fetal-medicine": {
    title: "Fellowship in Fetal Medicine – Build Ultrasound Skills",
    description:
      "Fellowship in Fetal Medicine struggling with diagnosis? Master prenatal diagnosis, anomaly detection & high-risk pregnancy. CPD-accredited 12-month course.",
  },
  "pg-diploma-in-child-health": {
    title: "PG Diploma in Child Health – Master Pediatric Care",
    description:
      "PG Diploma in Child Health struggling with pediatric cases? Master neonatal care, nutrition, immunization & common child health disorders. CPD 12-month.",
  },
  "pg-diploma-in-diabetology": {
    title: "PG Diploma in Diabetology | Online Course + Mentorship",
    description:
      "PG Diploma in Diabetology: Master Type 1, Type 2 diabetes, complications & management with a CPD-accredited 12-month online course for doctors. expert-led.",
  },
  "fellowship-in-neurosurgery": {
    title: "Neurosurgery Fellowship Online Programs in India",
    description:
      "Online Neurosurgery Fellowship: Master flexible brain & spine surgery training with a CPD-accredited 12-month fellowship and expert mentorship for doctors.",
  },
  "pg-diploma-in-obstetrics-and-gynaecology": {
    title: "Online Diploma in Gynecology and Obstetrics India",
    description:
      "Online Diploma in Gynecology and Obstetrics in India struggling with women's health cases? Master pregnancy care, gynecological disorders. CPD 12-month.",
  },
  "pg-diploma-in-maternal-child-health": {
    title: "PG Diploma Maternal & Child Health Online India",
    description:
      "Learn online PG Diploma in Maternal & Child Health. Master antenatal care, neonatal management, pediatric nutrition. CPD-accredited 12-month flexible course.",
  },
  "pg-diploma-in-embryology": {
    title: "PG Diploma in Clinical Embryology Online India",
    description:
      "Learn online PG Diploma in Clinical Embryology. Master IVF lab techniques, ICSI, embryo culture & cryopreservation. CPD-accredited, eligibility for MBBS/MD doctors.",
  },
  "fellowship-in-minimal-access-surgery": {
    title: "Minimal Access Surgery Fellowship After MBBS, Expert-Led",
    description:
      "Trusted by 200+ doctors, this 12-month Minimal Access Surgery Fellowship for post-MBBS doctors covers laparoscopic and robotic surgery with 1-year mentorship.",
  },
  "fellowship-in-clinical-genetics": {
    title: "Fellowship in Clinical Genetics in India | 12-Month Program",
    description:
      "Explore Fellowship in Clinical Genetics, a 12-month program with flexible EMI options covering genomic medicine, genetic testing, NGS and genetic counselling.",
  },
  "pg-diploma-in-family-medicine": {
    title: "PG Diploma in Family Medicine | Fees, Eligibility & Duration",
    description:
      "Explore PG Diploma in Family Medicine with a 12-month program, flexible EMI options, online learning, recorded lectures and 1-year mentorship.",
  },
  "pg-diploma-in-critical-care": {
    title: "PG Diploma in Critical Care Online India",
    description:
      "Learn online PG Diploma in Critical Care in India. Master ICU management, ventilator care & sepsis management. CPD accredited, 12-month course.",
  },
  "pg-diploma-in-clinical-neurology": {
    title: "PG Diploma in Clinical Neurology Online India",
    description:
      "Learn online PG Diploma in Clinical Neurology in India. Master stroke, epilepsy, EEG & neuroimaging diagnosis. UK CPD accredited, 12-month course.",
  },
  "pg-diploma-in-anesthesiology": {
    title: "PG Diploma in Anesthesiology Online India",
    description:
      "Learn online PG Diploma in Anesthesiology in India. Master airway management, regional blocks, perioperative & pain care. UK CPD accredited, 12-month course.",
  },
  "fellowship-in-diabetology": {
    title: "Fellowship in Diabetology Online India",
    description:
      "Learn online Fellowship in Diabetology in India after MBBS. Master Type 1 & 2 diabetes, insulin therapy & complication care. UK CPD accredited, 12 months.",
  },
  "pg-diploma-in-general-medicine-india": {
    title: "PG Diploma in General Medicine in India: Full Guide",
    description:
      "PG Diploma in General Medicine in India — is it worth it after MBBS? Compare with MD, explore career scope, eligibility & clinical training pathway.",
  },
  "fellowship-in-oncology": {
    title: "Fellowship in Oncology Online India",
    description:
      "Learn online Fellowship in Oncology in India after MBBS. Master chemotherapy, immunotherapy & precision oncology. UK CPD accredited, 12 months.",
  },
  "pg-diploma-in-pulmonary-medicine": {
    title: "PG Diploma Pulmonary & Respiratory Medicine | CPD Certified",
    description:
      "Postgraduate Diploma in Pulmonary & Respiratory Medicine for MBBS doctors. CPD certified, 1-year mentorship, flexible EMI options. 12 months. Enroll now.",
  },
  "fellowship-in-critical-care": {
    title: "Fellowship in Critical Care | 12-Month Program for Doctors",
    description:
      "Explore the Fellowship in Critical Care with a 12-month program, online learning, recorded lectures, updated curriculum and 1-year mentorship for doctors.",
  },
  "pg-diploma-in-psychiatric-medicine": {
    title: "PG Diploma in Psychiatry | 12-Month Program for Doctors",
    description:
      "Advance your career with a 12-month PG Diploma in Psychiatry featuring CPD certification, EMI options, recorded lectures, study material and 1-year mentorship.",
  },
  "fellowship-in-gastroenterology": {
    title: "Fellowship in Gastroenterology | 12 Months + CPD Certificate",
    description:
      "Advance your expertise with a 12-month Fellowship in Gastroenterology featuring CPD certification, recorded lectures, study material and 1-year mentorship.",
  },
  "fellowship-in-cosmetology-and-aesthetic-medicine": {
    title: "Fellowship in Cosmetology & Aesthetic Medicine India",
    description:
      "Learn online Fellowship in Cosmetology & Aesthetic Medicine in India. Master Botox, dermal fillers & facial rejuvenation. CPD accredited, 12 months.",
  },
  "fellowship-in-neuro-oncology": {
    title: "Fellowship in Neuro Oncology Online India",
    description:
      "Learn online Fellowship in Neuro Oncology in India. Master brain tumor diagnosis, neuroimaging & stereotactic radiosurgery. UK CPD accredited, 12 months.",
  },
  "fellowship-in-clinical-cardiology": {
    title: "Fellowship in Clinical Cardiology Online India",
    description:
      "Learn online Fellowship in Clinical Cardiology in India. Master ECG interpretation, heart failure & cardiac emergencies. UK CPD accredited, 12 months.",
  },
  "fellowship-in-neonatology": {
    title: "Fellowship in Neonatology in India | Online 12-Month Course",
    description:
      "Advance neonatal care skills with a 12-month Fellowship in Neonatology, expert mentorship, case discussions, flexible online learning and easy EMI options.",
  },
  "pg-diploma-in-psychiatry-medicine": {
    title: "PG Diploma in Psychiatry: Fees, Eligibility & Duration",
    description:
      "Explore PG Diploma in Psychiatry after MBBS, including eligibility, fees, duration, syllabus, admission details and career options to choose the right course.",
  },
  "fellowship-in-internal-medicine": {
    title: "Fellowship in Internal Medicine After MBBS | CPD & EMI",
    description:
      "Learn about Fellowship in Internal Medicine after MBBS with CPD-approved certification, EMI options, 12-month duration, eligibility and admission details.",
  },
  "pg-diploma-in-rheumatology": {
    title: "PG Diploma in Rheumatology | CPD, EMI & 12-Month Duration",
    description:
      "Learn about PG Diploma in Rheumatology after MBBS with CPD accreditation, EMI options, 12-month duration, fees, eligibility and admission details for doctors.",
  },
  "pg-diploma-in-cosmetology-and-aesthetic-medicine": {
    title: "PG Diploma in Cosmetology & Aesthetic Medicine | EMI Plans",
    description:
      "Explore the PG Diploma in Cosmetology & Aesthetic Medicine with 12-month learning, clinical training, expert faculty, mentorship and flexible EMI plans.",
  },
  "pg-diploma-in-reproductive-and-child-health": {
    title: "PG Diploma in Reproductive & Child Health | CPD Accredited",
    description:
      "Explore PG Diploma in Reproductive & Child Health with CPD accreditation, expert faculty, 1-year mentorship, flexible learning and EMI plans for doctors.",
  },
  "pg-diploma-in-reproductive-medicine": {
    title: "PG Diploma in Reproductive Medicine | 12-Month CPD Course",
    description:
      "PG Diploma in Reproductive Medicine with CPD certification, expert faculty, 1-year mentorship, flexible learning and 0% interest EMI for doctors.",
  },
  "fellowship-in-head-and-neck-surgicl-oncology": {
    title: "Head & Neck Surgical Oncology Fellowship | 12-Month CPD",
    description:
      "Explore the Fellowship in Head & Neck Surgical Oncology with CPD certification, 12-month learning, expert faculty, 1-year mentorship and online classes.",
  },
  "fellowship-in-reproductive-medicine": {
    title: "Fellowship in Reproductive Medicine | 12-Month Program",
    description:
      "Join the Fellowship in Reproductive Medicine with CPD accreditation, EMI options, 12-month course, IVF & ART learning, expert faculty and mentorship.",
  },
  "pg-diploma-in-urology": {
    title: "PG Diploma in Urology | 12-Month Course for Doctors",
    description:
      "Explore the PG Diploma in Urology with 12-month learning, expert faculty, recorded lectures, 1-year mentorship and flexible payment options for doctors.",
  },
  "pg-diploma-in-maternal-and-child-health": {
    title: "PG Diploma in Maternal & Child Health Course Online",
    description:
      "Join the PG Diploma in Maternal & Child Health with CPD accreditation, expert mentorship, flexible learning, fees, eligibility and 12-month course duration.",
  },

  // ============================================================
  // P2 - Page2 to Page1 Push (Rows 55-87)
  // ============================================================
  "fellowship-in-interventional-radiology": {
    title: "Interventional Radiology Fellowship | 12-Month Course",
    description:
      "Learn about the Interventional Radiology Fellowship, a 12-month online course with CPD accreditation, expert faculty, LMS access and one-year mentorship.",
  },
  "fellowship-in-pediatric-cardiology": {
    title: "Pediatric Cardiology Fellowship | 12-Month Online Course",
    description:
      "Explore about our Pediatric Cardiology Fellowship, a 12-month online course with expert mentorship, pediatric ECG, imaging, heart disease and interventions.",
  },
  "fellowship-in-aesthetic-dentistry": {
    title: "Fellowship in Aesthetic Dentistry | 12-Month CPD Course",
    description:
      "Learn about the Fellowship in Aesthetic Dentistry, a 12-month CPD course for BDS and MDS graduates with expert faculty, mentorship and flexible payment options",
  },
  "fellowship-in-cosmetic-surgery": {
    title: "Cosmetic Surgery Fellowship in India | 12 Months",
    description:
      "Explore a 12-month Cosmetic Surgery Fellowship with online learning, expert mentorship, recorded lectures, study material, and flexible payment options.",
  },
  "fellowship-in-interventional-pain-management": {
    title: "Interventional Pain Management Fellowship | 12 Months",
    description:
      "Enroll a 12-month Fellowship in Interventional Pain Management with online classes, expert faculty, CPD approval and flexible EMI options designed for doctors.",
  },
  "fellowship-in-pain-management": {
    title: "Fellowship in Pain Management | 12-Month Online Program",
    description:
      "Join a 12-month Fellowship in Pain Management with online classes, recorded lectures, expert mentorship, free study material and flexible EMI options.",
  },
  "fellowship-in-cosmetic-gynecology": {
    title: "Fellowship in Cosmetic Gynecology | 12-Month Program",
    description:
      "Explore a 12-month Fellowship in Cosmetic Gynecology with online learning, expert mentorship, recorded lectures, study material and flexible EMI options.",
  },
  "fellowship-in-cosmetology-and-aesthetic-medicine-p2": {
    title: "Fellowship in Aesthetic Medicine & Cosmetology",
    description:
      "Join a 12-month Fellowship in Aesthetic Medicine & Cosmetology for doctors with CPD accreditation, 1-year mentorship, recorded lectures and EMI options.",
  },
  "fellowship-in-oral-surgery": {
    title: "Fellowship in Oral Surgery | 12-Month Course for Doctors",
    description:
      "Advance your skills with a 12-month Fellowship in Oral Surgery for doctors, with online learning, expert mentorship, CPD certification and EMI options",
  },
  "fellowship-in-minimally-invasive-surgery": {
    title: "Fellowship in Minimally Invasive Surgery | 12-Month Course",
    description:
      "Explore a 12-month Fellowship in Minimally Invasive Surgery for doctors with expert mentorship, online learning, CPD certification and flexible EMI options",
  },
  "fellowship-in-preventive-cardiology": {
    title: "Preventive Cardiology Fellowship | 12-Month Course",
    description:
      "Join a 12-month Preventive Cardiology Fellowship for doctors with online learning, expert faculty, 1-year mentorship, CPD certification and EMI options",
  },
  "fellowship-in-orthopedic": {
    title: "Fellowship in Orthopedics in India | 12-Month Course",
    description:
      "Explore a 12-month Fellowship in Orthopedics for doctors with expert mentorship, online learning, CPD-approved certification and flexible EMI options now.",
  },
  "fellowship-in-palliative-medicine": {
    title: "Palliative Medicine Fellowship in India | 12-Month",
    description:
      "Join our 12-month Palliative Medicine Fellowship in India with expert faculty, online classes, e-library, study materials, 1-year mentorship & flexible payments.",
  },
  "fellowship-in-breast-surgical-oncology": {
    title: "Breast Surgery Fellowship in India | 12-Month Program",
    description:
      "Enroll in our 12-month Breast Surgery Fellowship in India with expert faculty, live & recorded classes, study materials, e-library, mentorship & flexible payments.",
  },
  "fellowship-in-pediatric-orthopedic": {
    title: "Pediatric Orthopedic Fellowship Online | 12-Month Course",
    description:
      "Join a 12-month Pediatric Orthopedic Fellowship online covering trauma, deformities, DDH, scoliosis, sports injuries & more. Flexible payment options.",
  },
  "fellowship-in-rheumatology": {
    title: "Fellowship in Rheumatology in India | Online Course",
    description:
      "Explore a 12-month Fellowship in Rheumatology in India with online learning, CPD accreditation and flexible EMI options for eligible medical professionals.",
  },
  "fellowship-in-general-laparoscopic-surgery": {
    title: "Fellowship in Laparoscopic Surgery for MBBS/MS Doctors",
    description:
      "Fellowship in Laparoscopic Surgery for MBBS/MS doctors. 12-month online programme covering cholecystectomy, hernia repair & minimally invasive surgery.",
  },
  "fellowship-in-anesthesia": {
    title: "Fellowship in Anesthesia & Anesthesiology in India",
    description:
      "Advance your skills with our 12-month online Fellowship in Anesthesia with expert mentorship, recorded lectures, study material and flexible payment options.",
  },
  "fellowship-in-oncogynecology": {
    title: "Fellowship in Gynae Oncology | 12-Month Online Course",
    description:
      "Advance your knowledge with our 12-month online Fellowship in Gynae Oncology, featuring expert faculty, live & recorded lectures and 1-year mentorship.",
  },
  "fellowship-in-laparoscopy-and-hysteroscopy": {
    title: "Fellowship in Laparoscopy & Hysteroscopy Program India",
    description:
      "Fellowship in Laparoscopy & Hysteroscopy for MBBS/DGO doctors. Build advanced surgical skills through live cases and expert mentorship. Enroll for 2026.",
  },

  // ============================================================
  // Monitor - Page 1 (Rows 98-257)
  // ============================================================
  "fellowship-in-pathology": {
    title: "Fellowship in Pathology | Online 12-Month Fellowship",
    description:
      "Join a Fellowship in Pathology with 12-month online learning, expert faculty, practical exposure, free study material and 1-year mentorship.",
  },
  "fellowship-in-robotic-surgery": {
    title: "Robotic Surgery Fellowship in India | 12 Months",
    description:
      "Explore a robotic surgery fellowship with a 12-month programme for doctors. Learn online with expert faculty, case-based learning and 1-year mentorship.",
  },
  "fellowship-in-ophthalmology": {
    title: "Online Fellowship in Ophthalmology for MBBS Doctors",
    description:
      "Online Fellowship in Ophthalmology for MBBS doctors. 12-month hybrid training, CPD UK certification, EMI available. Check eligibility, fees & curriculum.",
  },
  "fellowship-in-endocrinology": {
    title: "Fellowship in Endocrinology Online Course in India",
    description:
      "Join our Fellowship in Endocrinology. Learn online with expert faculty, live and recorded classes, flexible study and a 12-month course. Apply now.",
  },
  "fellowship-in-urology": {
    title: "Fellowship in Urology in India | 12-Month Programme",
    description:
      "Join a 12-month Fellowship in Urology in India with expert-led learning, live & recorded sessions, Online or Hybrid options, and a fellowship certificate.",
  },
  "fellowship-in-orthodontics": {
    title: "Fellowship in Orthodontics | 12-Month, CPD & LMS",
    description:
      "Join our Fellowship in Orthodontics in India. Study braces, clear aligners and diagnosis with 12-month learning, CPD, LMS and 1-year expert mentorship.",
  },
  "fellowship-in-maxillofacial-surgery": {
    title: "Fellowship in Maxillofacial Surgery | 12-Month Course",
    description:
      "Explore our Fellowship in Maxillofacial Surgery with 12-month learning, online classes, recorded lectures, LMS access, Q&A and 1-year expert mentorship.",
  },
  "fellowship-in-neuroradiology": {
    title: "Online Neuroradiology Fellowship | 12-Month CPD Course",
    description:
      "Join our Online Neuroradiology Fellowship with 12-month learning, CPD certification, expert mentorship, recorded lectures, LMS access and advanced imaging.",
  },
  "fellowship-in-endoscopy": {
    title: "Fellowship in Endoscopy | Online Program for Doctors",
    description:
      "Join a 12-month fellowship in endoscopy for doctors with online learning, super-specialist faculty, CPD-accredited certification and 1-year mentorship.",
  },
  "fellowship-in-echocardiography": {
    title: "Fellowship in Echocardiography for Doctors | 12-Month",
    description:
      "Join a 12-month fellowship in echocardiography for doctors with TTE, TEE, Doppler, online learning, mentorship, CPD certification and flexible EMI options.",
  },
  "fellowship-in-hematology": {
    title: "Fellowship in Hematology | 12-Month Medical Course",
    description:
      "Learn about the 12-month Fellowship in Hematology, including eligibility, curriculum, clinical topics, study format, faculty support and certificate options.",
  },
  "fellowship-in-otology": {
    title: "Fellowship in Otology | 12-Month Otology Fellowship",
    description:
      "Join a 12-month Fellowship in Otology with online learning, free study material, recorded lectures, Q&A sessions, library access and mentorship.",
  },
  "fellowship-in-laparoscopy": {
    title: "Fellowship in Laparoscopy | 12-Month Program for Doctors",
    description:
      "Build skills with a 12-month fellowship in laparoscopy for doctors, expert mentorship, flexible financing and structured learning with CPD certification.",
  },
  "fellowship-in-pediatric-critical-care": {
    title: "Pediatric Critical Care Fellowship | 12-Month Program",
    description:
      "Join a 12-month pediatric critical care fellowship for doctors with online learning, PICU case discussions, expert mentorship and CPD certification today.",
  },
  "fellowship-in-dermatopathology": {
    title: "Dermatopathology Fellowship | 12-Month Online Program",
    description:
      "Join a 12-month dermatopathology fellowship for doctors with online learning, case discussions, expert mentorship, flexible payments and CPD certification.",
  },
  "fellowship-in-anorectal-and-laser-proctology": {
    title: "Fellowship in Laser Proctology | Online 12-Month Course",
    description:
      "Explore our 12-month Fellowship in Laser Proctology with online learning, clinical exposure and expert mentorship for doctors, plus course support now.",
  },
  "fellowship-in-oncopathology": {
    title: "Fellowship in Oncopathology in India | 12-Month Course",
    description:
      "Join a 12-month Fellowship in Oncopathology with CPD certification, expert guidance, recorded lectures and LMS access for doctors for focused career growth.",
  },
  "fellowship-in-musculoskeletal-ultrasound": {
    title: "Fellowship in Musculoskeletal Ultrasound for Doctors",
    description:
      "Join a 12-month Fellowship in Musculoskeletal Ultrasound with online learning, super-specialist faculty, CPD accreditation, LMS access and 1-year mentorship.",
  },
  "fellowship-in-family-medicine": {
    title: "Fellowship in Family Medicine Online | 12-Month Program",
    description:
      "Enroll a 12-month online fellowship in family medicine for doctors with expert faculty, 1-year mentorship, flexible payment options and recorded lectures.",
  },
  "fellowship-in-thoracic-surgery": {
    title: "Thoracic Surgery Fellowship | 12-Month Online Programme",
    description:
      "Join a 12-month thoracic surgery fellowship with online learning, super-specialist faculty and one-year mentorship for doctors seeking focused expertise.",
  },
  "fellowship-in-pediatric-echocardiography": {
    title: "Pediatric Echocardiography Course | 12-Month Fellowship",
    description:
      "Join a 12-month pediatric echocardiography course with online training, expert faculty, case discussions, LMS access, mentorship and CPD certification.",
  },
  "fellowship-in-pediatrics-dermatology": {
    title: "Pediatric Dermatology Fellowship | 12-Month Online Course",
    description:
      "Join a pediatric dermatology fellowship with live classes, recorded lectures, expert faculty, LMS access, 1-year mentorship and CPD certification for doctors.",
  },
  "certificate-in-essential-cardiology": {
    title: "Certificate in Essential Cardiology Course | Online Learning",
    description:
      "Certificate in Essential Cardiology for MBBS doctors with expert-led sessions, recorded case discussions, CPD certification & skill upgrade.",
  },
  "fellowship-in-pedodontist": {
    title: "Fellowship in Pediatric Dentistry Course | India",
    description:
      "Join a Fellowship in Pediatric Dentistry with hybrid learning, clinical attachment, expert faculty, recordings, mentorship, and flexible payment options.",
  },
  "fellowship-in-head-neck-surgery": {
    title: "Fellowship in Head & Neck Surgery | 12-Month Program",
    description:
      "Build advanced skills with a 12-month Fellowship in Head & Neck Surgery, online learning, super-specialist faculty, study material and 1-year mentorship.",
  },
  "fellowship-in-hospital-management": {
    title: "Fellowship in Hospital Management | Online Programme",
    description:
      "Join a 12-month Fellowship in Hospital Management with online learning, super-specialist faculty, study material, Q&A sessions and 1-year mentorship.",
  },
  "pg-diploma-in-orthodontics": {
    title: "PG Diploma in Orthodontics | Online Diploma Program",
    description:
      "PG Diploma in Orthodontics offers specialized online learning in diagnosis, prevention & correction of dental and facial irregularities for doctors.",
  },
  "fellowship-in-paediatric-endocrinology": {
    title: "Fellowship in Pediatric Endocrinology | 12-Month Program",
    description:
      "Join a 12-month fellowship in pediatric endocrinology with online learning, clinical attachment, expert mentorship and flexible EMI options for doctors.",
  },
  "fellowship-in-orthopedic-oncology": {
    title: "Orthopedic Oncology Fellowship | 12-Month Programme",
    description:
      "Join our orthopedic oncology fellowship for doctors. Learn tumor staging, biopsy, limb salvage and reconstruction with expert faculty and 1-year mentorship.",
  },
  "pg-diploma-in-tuberculosis": {
    title: "PG Diploma in Tuberculosis | Online Diploma Program",
    description:
      "PG Diploma in Tuberculosis covers TB diagnosis, treatment & management strategies through online learning for effective patient care.",
  },
  "fellowship-in-oral-and-maxillofacial-radiology": {
    title: "Fellowship in Maxillofacial Radiology | 12-Month Course",
    description:
      "Join a 12-month Fellowship in Maxillofacial Radiology for dental professionals. Learn CBCT, CT, MRI, pathology and reporting with expert guidance online.",
  },
  "fellowship-in-gynaecologic-oncology": {
    title: "Robotic Gynaecology Fellowship | Oncology & Surgery",
    description:
      "Enroll a 12-month online robotic gynaecology fellowship for doctors with expert faculty, 21+ modules, CPD certification and 1-year post-completion mentorship.",
  },
  "fellowship-in-endourology": {
    title: "Endourology Fellowship | Online 12-Month Programme",
    description:
      "Join a 12-month Endourology Fellowship with online learning, super-specialist faculty, 1-year mentorship, CPD accreditation and flexible payment for doctors.",
  },
  "fellowship-in-pediatric-robotic-surgery": {
    title: "Pediatric Robotic Surgery Fellowship | 12-Month Program",
    description:
      "Enroll a 12-month Pediatric Robotic Surgery Fellowship with online learning, clinical attachment, super-specialist faculty, 1-year mentorship and EMI plans.",
  },
  "fellowship-in-laparoscopic-hernia-surgery": {
    title: "Fellowship in Laparoscopic Hernia Surgery for Doctors",
    description:
      "Join a 12-month hernia fellowship for doctors with online learning, expert faculty, case-based study and 1-year mentorship in laparoscopic hernia surgery.",
  },
  "fellowship-in-pediatric-neurology": {
    title: "Pediatric Neurology Fellowship | 12-Month Programme",
    description:
      "Join a 12-month pediatric neurology fellowship with online learning, super-specialist faculty, 1-year mentorship, CPD certification and structured study.",
  },
  "pg-diploma-in-cosmetology-aesthetic-medicine": {
    title: "PG Diploma in Cosmetology & Aesthetic Medicine 2026",
    description:
      "PG Diploma in Cosmetology & Aesthetic Medicine for MBBS doctors — covers Botox, fillers, laser & skin care. University-awarded online program. Enroll 2026.",
  },
  "fellowship-in-arthroscopy-sports-medicine": {
    title: "Fellowship in Arthroscopy & Sports Medicine | Online Program",
    description:
      "Fellowship in Arthroscopy & Sports Medicine for MBBS doctors — gain advanced knowledge in joint surgery concepts & sports injury management online.",
  },
  "fellowship-in-pulmonary-medicine": {
    title: "Fellowship in Pulmonary Medicine | Online Certification",
    description:
      "Fellowship in Pulmonary Medicine for MBBS doctors — covers diagnosis, management & concepts of respiratory diseases through online learning.",
  },
  "fellowship-in-orthopedics": {
    title: "Fellowship in Orthopedics: Bone & Joint Course India 2026",
    description:
      "Fellowship in Orthopedics for MBBS doctors — covers bone, joint, trauma care & arthroscopy concepts. 12-month online course India. Enroll 2026.",
  },
  "fellowship-in-addiction-medicine": {
    title: "Fellowship in Addiction Medicine | CPD Accredited",
    description:
      "Join the Fellowship in Addiction Medicine for doctors. Gain CPD-accredited training with flexible learning, expert faculty and practical clinical skills.",
  },
  "fellowship-in-emergency-medicine": {
    title: "Fellowship in Emergency Medicine | Online Certification",
    description:
      "Join the 1-Year Fellowship in Emergency Medicine with case-based learning, expert mentorship, recorded lectures & flexible schedule.",
  },
  "certificate-in-critical-care": {
    title: "Certificate in Critical Care | Online Certification Course",
    description:
      "Certificate in Critical Care for MBBS doctors — covers case-based learning, CPD certification & concepts to improve patient care outcomes.",
  },
  "fellowship-in-arthroplasty": {
    title: "Arthroplasty Fellowship — Joint Replacement Course in India",
    description:
      "Join our 12-month Fellowship in Arthroplasty. Learn concepts of hip, knee & shoulder replacement, robotic surgery & revision arthroplasty online.",
  },
  "certificate-in-internal-medicine": {
    title: "Certificate in Internal Medicine | Case-Based Learning",
    description:
      "Join Certificate in Internal Medicine with case-based learning, NAAC A+ University, specialist faculty, flexible schedule & EMI option.",
  },
  "fellowship-in-molecular-pathology": {
    title: "Molecular Pathology Fellowship in India | 12-Month Course",
    description:
      "Join a Molecular Pathology Fellowship with live classes, clinical training, expert faculty, study material and 1-year mentorship for doctors.",
  },
  "certificate-in-research-methodology": {
    title: "Certificate in Research Methodology | CPD Online Course",
    description:
      "Certificate in Research Methodology for doctors — CPD-accredited online course with case-based learning to upgrade clinical research skills in 3-6 months.",
  },
  "pg-diploma-in-reproductive-child-health": {
    title: "PG Diploma in Reproductive & Child Health: RCH Course 2026",
    description:
      "PG Diploma in Reproductive & Child Health for MBBS doctors — covers maternal health, child nutrition, family planning & neonatal care. Online course. Enroll 2026.",
  },
  "fellowship-in-embryology": {
    title: "Fellowship in Embryology | 12-Month Clinical Programme",
    description:
      "Join a 12-month Fellowship in Embryology with expert mentorship. Learn IVF, ICSI, embryo culture, cryopreservation, reproductive genetics and modern ART.",
  },
  "fellowship-in-thoracic-oncology": {
    title: "Thoracic Oncology Fellowship | 12-Month Online Program",
    description:
      "Build thoracic oncology expertise through a 12-month fellowship with live classes, specialist faculty, 1-year mentorship, CPD certification and 11+ modules.",
  },
  "fellowship-in-pulmonology-medicine": {
    title: "Fellowship in Pulmonology | Advanced Respiratory Care",
    description:
      "Fellowship in Pulmonology covers diagnosis & management of respiratory disorders, pulmonary concepts & patient care approach through online learning.",
  },
  "fellowship-in-neonatal-echocardiography": {
    title: "Fellowship in Neonatal Echocardiography | Online Course",
    description:
      "Learn concepts of neonatal echocardiography, functional cardiac assessment & hemodynamic monitoring for evidence-based neonatal care.",
  },
  "fellowship-in-anesthesiology": {
    title: "Fellowship in Anesthesia: OT & Pain Course India 2026",
    description:
      "Fellowship in Anesthesia for MBBS/MD doctors — covers OT anesthesia, regional blocks, ICU sedation & pain management. Online course India. Enroll 2026.",
  },
  "fellowship-in-cardiac-surgery": {
    title: "Fellowship in Cardiac Surgery | 12-Month Online Program",
    description:
      "Join a 12-month online cardiac surgery fellowship with live classes, recorded lectures, expert faculty, mentorship, study resources and CPD certification.",
  },
  "certificate-in-obstetrics-gynaecology": {
    title: "Certificate in Obstetrics & Gynaecology | Online CPD Course",
    description:
      "Obstetrics & Gynaecology certificate for MBBS, MD & MS doctors — case-based learning with CPD certification through online modules.",
  },
  "fellowship-in-oral-oncology": {
    title: "Oral Oncology Fellowship | Eligibility & Course Details",
    description:
      "Join the Oral Oncology Fellowship with CPD UK accreditation, expert-led learning, flexible online study, practical case training and global career focus.",
  },
  "fellowship-in-arthroscopy-and-sports-medicine": {
    title: "Fellowship in Arthroscopy & Sports Medicine | Course",
    description:
      "Advance your orthopedic career with our Online Fellowship in Arthroscopy & Sports Medicine. Learn joint surgery and sports injury management concepts.",
  },
  "fellowship-in-clinical-neurology": {
    title: "Fellowship in Clinical Neurology for MBBS Doctors",
    description:
      "Pursue our Fellowship in Clinical Neurology — a 12-month program covering stroke, epilepsy, EEG & neuroimaging, designed for MBBS & MD doctors in India.",
  },
  "fellowship-in-neonatal-surgery": {
    title: "Neonatal Surgery Fellowship Online Course in India",
    description:
      "Explore our Neonatal Surgery Fellowship for doctors. Study online with expert faculty, live and recorded classes, and a 12-month plan. Apply today now.",
  },
  "certificate-in-diabetic-foot-care": {
    title: "Certificate in Diabetic Footcare for MBBS Doctors",
    description:
      "Certificate in Diabetic Footcare – online program for MBBS doctors to learn diabetic foot assessment, wound care & complication management skills.",
  },
  "certificate-in-gastroenterology": {
    title: "Certificate in Gastroenterology – Boost Your Skills",
    description:
      "Certificate in Gastroenterology – an online course for MBBS doctors to master GI disorder diagnosis, case-based learning & advanced diagnostic skills.",
  },
  "certificate-in-nutrition-and-dietetics": {
    title: "Certificate in Nutrition and Dietetics – Boost Career",
    description:
      "Certificate in Nutrition and Dietetics – an online course for MBBS doctors to gain expertise in diet planning, patient nutrition & clinical case learning.",
  },
  "fellowship-in-aesthetic-dermatology": {
    title: "Fellowship in Aesthetic Dermatology – Skill Up Now",
    description:
      "Fellowship in Aesthetic Dermatology for MBBS doctors – gain expertise in facial aesthetics, laser treatments, injectables & skin rejuvenation techniques.",
  },
  "fellowship-in-pediatric-genetics-and-metabolism": {
    title: "Pediatric Genetics Fellowship | Course, Fees & Duration",
    description:
      "Pediatric genetics fellowship with 12-month hybrid learning, clinical training, 1-year mentorship, NAAC A+ and CPD UK certification for doctors. Enroll now.",
  },
  "fellowship-in-pediatric-ophthalmology-strabismus": {
    title: "Fellowship in Pediatric Ophthalmology – Enroll Now",
    description:
      "Fellowship in Pediatric Ophthalmology for MBBS doctors – learn to diagnose & manage childhood eye disorders including strabismus with case-based training.",
  },
  "fellowship-in-nutrition-and-dietetics": {
    title: "Fellowship in Clinical Nutrition | Eligibility & Fees",
    description:
      "Join our 12-month Fellowship in Clinical Nutrition with online learning, expert faculty, study material and one-year mentorship for doctors.",
  },
  "certificate-in-obstetrics-and-gynaecology": {
    title: "Obstetrics & Gynaecology Certificate for MBBS/MD/MS",
    description:
      "Certificate in Obstetrics & Gynaecology for MBBS, MD & MS doctors – build advanced diagnostic skills, case-based learning & CPD certification online.",
  },
  "fellowship-in-laparoscopic-surgery": {
    title: "Fellowship in Laparoscopic Surgery for MBBS/MS",
    description:
      "Fellowship in General Laparoscopic Surgery for MBBS/MS doctors – learn lap cholecystectomy, hernia repair & minimally invasive abdominal surgery online.",
  },
  "fellowship-in-neurology": {
    title: "Fellowship in Clinical Neurology for MBBS/MD",
    description:
      "Fellowship in Clinical Neurology – a 12-month online course for MBBS & MD doctors covering stroke, epilepsy, EEG & neuroimaging case-based learning.",
  },
  "certificate-in-family-medicine": {
    title: "Certificate in Family Medicine for MBBS Doctors",
    description:
      "Certificate in Family Medicine for MBBS doctors – gain skills in primary care, OPD management & case-based learning through this online course.",
  },
  "fellowship-in-gastrointestinal-oncology": {
    title: "Fellowship in Gastrointestinal Oncology Course",
    description:
      "Fellowship in Gastrointestinal Oncology – gain advanced expertise in GI cancer diagnosis, treatment planning & multidisciplinary oncology case learning.",
  },
  "fellowship-in-transcatheter-aortic-valve-implantation-tavi": {
    title: "TAVI Fellowship | Transcatheter Aortic Valve Implantation",
    description:
      "Enroll a 12-month TAVI fellowship with clinical exposure, simulation, expert mentorship, imaging, procedure planning and flexible online learning.",
  },
  "pg-diploma-in-intensive-care": {
    title: "PG Diploma in Intensive Care for MBBS Doctors",
    description:
      "PG Diploma in Intensive Care – online course covering advanced life support, patient monitoring & management of critically ill patients for MBBS doctors.",
  },
  "fellowship-in-gastrointestinal-gi-surgery": {
    title: "Fellowship in GI Surgery for Doctors & Surgeons",
    description:
      "CPD UK-accredited Fellowship in GI Surgery for MBBS, MD, MS and DNB doctors. A 12-month program with expert mentors and real hospital case exposure today.",
  },
  "fellowship-in-endoscopic-spine-surgery": {
    title: "Endoscopic Spine Surgery Fellowship | 1-Year Program",
    description:
      "Join our one-year Endoscopic Spine Surgery Fellowship in India for orthopaedic surgeons. Live case exposure, expert faculty, flexible eligibility. Apply now!",
  },
  "fellowship-in-robotic-urology": {
    title: "Robotic Urology Fellowship | Advanced Doctor Training",
    description:
      "Join a fellowship in andrology with expert-led learning, skill-driven workshops, flexible study and practical training in reproductive care for doctors.",
  },
  "fellowship-in-andrology": {
    title: "Fellowship in Andrology | Clinical Skills & Training",
    description:
      "Explore a 1-year Fellowship in Andrology with expert mentorship, blended clinical training, skill-driven workshops and a future-ready curriculum.",
  },
  "pg-diploma-in-oncology": {
    title: "PG Diploma in Oncology – Cancer Care Course",
    description:
      "PG Diploma in Oncology – a 12-month online course covering cancer biology, chemotherapy protocols & multidisciplinary cancer care case learning.",
  },
  "fellowship-in-paediatric": {
    title: "Fellowship in Pediatric Endocrinology Course",
    description:
      "Fellowship in Pediatric Endocrinology – master childhood hormone disorders, growth abnormalities & diabetes management through case-based online learning.",
  },
  "fellowship-in-spine-surgery": {
    title: "Spine Surgery Fellowship for MBBS/MD Doctors",
    description:
      "Spine Surgery Fellowship – a 12-month online course covering spinal cord surgery, minimally invasive techniques & spinal instrumentation case learning.",
  },
  "certificate-in-addiction-medicine": {
    title: "Certificate in Addiction Medicine – Skill Up Now",
    description:
      "Certificate in Addiction Medicine for MBBS doctors – gain skills in substance use disorder management, case discussions & CPD certification online.",
  },
  "fellowship-in-pediatrics-neonatology": {
    title: "Fellowship in Pediatric Neonatology Course",
    description:
      "Fellowship in Pediatric Neonatology – build expertise in NICU care, neonatal critical care, newborn emergencies & evidence-based case learning online.",
  },
  "fellowship-in-pediatrics": {
    title: "Fellowship in Pediatrics – 12-Month Online Course",
    description:
      "Fellowship in Pediatrics – a 12-month online course with super-specialist faculty, case-based learning, CPD certificate & 1-year mentorship support.",
  },
  "fellowship-in-obstetrics-and-gynaecology": {
    title: "Fellowship in Obstetrics & Gynaecology 2026",
    description:
      "Fellowship in Obstetrics & Gynaecology for MBBS/BAMS doctors – a 12-month online course on antenatal care, labour management & gynae disorders. Enroll 2026.",
  },
  "fellowship-in-geriatric-medicine": {
    title: "Fellowship in Geriatric Medicine | Upskill Doctors",
    description:
      "Fellowship in Geriatric Medicine helps doctors upskill their knowledge of age-related diseases, chronic conditions, geriatric syndromes and healthy aging.",
  },
  "fellowship-in-robotic-gynaecological-oncology": {
    title: "Fellowship in Robotic Gynaecological Oncology",
    description:
      "Fellowship in Robotic Gynaecological Oncology – learn robot-assisted surgery concepts for cancer care through advanced case-based online learning.",
  },
  "fellowship-in-minimally-invasive-cardiac-surgery": {
    title: "Minimally Invasive Cardiac Surgery Fellowship",
    description:
      "Join a minimally invasive cardiac surgery fellowship with advanced MICS training, expert-led learning, robotic techniques and flexible learning options.",
  },
  "fellowship-in-therapeutic-endo-in-gi-surgery": {
    title: "Fellowship in Therapeutic Endo in GI Surgery",
    description:
      "Fellowship in Therapeutic Endo in GI Surgery – learn minimally invasive endoscopic procedures & advanced gastrointestinal interventions online.",
  },
  "fellowship-in-ent-otorhinolaryngology": {
    title: "Fellowship in ENT | 12-Month Otorhinolaryngology Course",
    description:
      "Join a 12-month Fellowship in ENT with clinical training, expert faculty, recorded lectures, Q&A, library access, mentorship and flexible learning.",
  },
  "fellowship-in-vitreo-retina": {
    title: "Vitreo Retina Fellowship in India | 12-Month Program",
    description:
      "Join a 12-month Vitreo Retina Fellowship with hybrid learning, clinical attachment, expert faculty, recorded lectures, Q&A, and 1-year mentorship for doctors.",
  },
  "fellowship-in-gynae-endoscopy": {
    title: "Fellowship in Gynecological Endoscopy Course",
    description:
      "Fellowship in Gynecological Endoscopy – learn laparoscopy, hysteroscopy & minimally invasive surgery concepts through evidence-based case learning.",
  },
  "fellowship-in-rhinology": {
    title: "Fellowship in Rhinology – Online Certification Course",
    description:
      "Advance your ENT career with an Online Fellowship in Rhinology. Learn nasal and sinus disorder management concepts and get certified from anywhere.",
  },
  "fellowship-in-high-risk-pregnancy": {
    title: "Fellowship in High Risk Pregnancy After MBBS/MD",
    description:
      "12-month online Fellowship in High Risk Pregnancy for doctors after MBBS/MD. Covers pre-eclampsia, diabetes, fetal growth restriction and MFM emergencies.",
  },
  "fellowship-in-trichology": {
    title: "Fellowship in Trichology for Doctors After MBBS",
    description:
      "Fellowship in Trichology for doctors after MBBS. Build expertise in hair loss, scalp disorders, trichoscopy and hair restoration through advanced online training.",
  },
  "fellowship-in-refractive-surgeries": {
    title: "Refractive Surgery Fellowship for Ophthalmologists",
    description:
      "Join our Refractive Surgery Fellowship, a 12-month course with clinical attachment, expert mentorship, recorded lectures and flexible learning options.",
  },
  "fellowship-in-oral-and-maxillofacial-surgery": {
    title: "Fellowship in Oral & Maxillofacial Surgery",
    description:
      "Join our 12-month oral and maxillofacial surgery fellowship with clinical training, expert mentors, recorded classes, Q&A and flexible study options.",
  },
  "fellowship-in-breast-surgery": {
    title: "Breast Surgery Fellowship | Hybrid Course for Doctors",
    description:
      "Enroll a breast surgery fellowship with hybrid learning, expert faculty, clinical attachment, recorded classes, Q&A, flexible payment and 1-year mentorship.",
  },
  "fellowship-in-periodontology": {
    title: "Fellowship in Periodontology | 12-Month Hybrid Course",
    description:
      "Join a 12-month fellowship in periodontology with hybrid learning, clinical attachment, expert faculty, recordings, mentorship and flexible payment options.",
  },
  "fellowship-in-gi-endoscopy": {
    title: "Fellowship in GI Endoscopy for Doctors After MBBS",
    description:
      "12-month Fellowship in GI Endoscopy for doctors after MBBS. Learn diagnostic and therapeutic endoscopy techniques through case-based online training.",
  },
  "fellowship-in-spinal-cord-surgery": {
    title: "Spine Surgery Fellowship for Doctors After MBBS/MD",
    description:
      "12-month Spine Surgery Fellowship for MBBS/MD doctors in India. Master minimally invasive techniques, spinal instrumentation and advanced case management.",
  },
  "fellowship-in-infertility-management": {
    title: "Fellowship in Infertility Management for Doctors",
    description:
      "12-month Fellowship in Infertility Management for experienced doctors. Learn ART, IVF, reproductive endocrinology and male infertility through online classes.",
  },
  "fellowship-in-cosmetology": {
    title: "Fellowship in Cosmetology | Online Fellowship Course",
    description:
      "Fellowship in Cosmetology is an online fellowship course covering cosmetology concepts, aesthetic procedures, skin care and modern cosmetic practices.",
  },
  "fellowship-in-robotic-gynecologic-surgery": {
    title: "Fellowship in Robotic Gynecologic Surgery | Online Course",
    description:
      "Fellowship in Robotic Gynecologic Surgery is an online fellowship course covering robotic surgery concepts, gynecologic procedures and modern surgical practices.",
  },
  "fellowship-in-trauma-pain-management": {
    title: "Fellowship in Trauma Pain Management for Doctors",
    description:
      "Fellowship in Trauma Pain Management for doctors, focused on acute and chronic pain control, interventional techniques and multidisciplinary patient care.",
  },
  "fellowship-in-neuroendoscopy": {
    title: "Neuroendoscopy Fellowship Training Program for Neurosurgeons",
    description:
      "Explore an advanced fellowship in neuroendoscopic surgery covering ETV, intraventricular procedures, and skull base techniques for neurosurgeons.",
  },
  "fellowship-in-hand-surgery": {
    title: "Fellowship in Hand Surgery Training Program for Surgeons",
    description:
      "Learn about the Fellowship in Hand Surgery covering trauma, reconstructive microsurgery, congenital anomalies, and nerve injuries for surgical specialists.",
  },
  "fellowship-in-laryngology": {
    title: "Laryngology Fellowship Program for ENT Specialists",
    description:
      "Explore the Laryngology Fellowship focused on voice, airway, and swallowing disorders with exposure to stroboscopy and laryngeal EMG diagnostics.",
  },
  "fellowship-in-sleep-medicine": {
    title: "Fellowship in Sleep Medicine for Healthcare Professionals",
    description:
      "A focused fellowship covering diagnosis and management of sleep disorders like insomnia, sleep apnea, narcolepsy, and circadian rhythm disorders.",
  },
  "fellowship-in-bone-marrow-transplant": {
    title: "Bone Marrow Transplant Fellowship for Medical Professionals",
    description:
      "Explore the Bone Marrow Transplant Fellowship offering advanced training in hematopoietic stem cell transplantation for leukemia, lymphoma, and related disorders.",
  },
  "fellowship-in-minimal-invasive-proctology": {
    title: "Proctology Fellowship in Minimally Invasive Techniques",
    description:
      "A focused Proctology Fellowship covering laser proctology, endoscopic procedures, and minimally invasive management of hemorrhoids, fistulas, and fissures.",
  },
  "fellowship-in-pediatric-nursing": {
    title: "Fellowship in Pediatric Nursing Course",
    description:
      "Enroll in our Fellowship in Pediatric Nursing to gain advanced knowledge in child assessment, growth monitoring, immunization, and illness management.",
  },
  "tag-fellowship-in-cosmetic-gynecology": {
    title: "Cosmetic Gynecology Fellowship Program – Upskill Online",
    description:
      "Join our Online Fellowship in Cosmetic Gynecology for doctors. Learn aesthetic gynecology concepts, upskill your career, and get certified online.",
  },
  "fellowship-in-paediatric-psychology": {
    title: "Fellowship in Paediatric Psychology Course Online",
    description:
      "Learn Paediatric Psychology through this fellowship covering child development, anxiety, depression, and family-centered mental health care.",
  },
  "fellowship-in-renal-pathology": {
    title: "Renal Pathology Fellowship Course for Pathologists Online",
    description:
      "This Renal Pathology Fellowship helps pathologists build expertise in diagnosing native and transplant kidney diseases using microscopy-based techniques.",
  },
  "fellowship-in-restorative-reproductive-medicine": {
    title: "Fellowship in Reproductive Medicine for Doctors",
    description:
      "Fellowship in Restorative Reproductive Medicine for doctors. Build expertise in fertility care, IVF, ART, reproductive endocrinology and infertility management.",
  },

  // ============================================================
  // Certificate in Diabetes Mellitus Management (pre-existing)
  // ============================================================
  "certificate-in-diabetes-mellitus-management": {
    title: "Certificate in Diabetes Management",
    description:
      "Master modern insulin regimens, GLP-1 analogues, SGLT-2 inhibitors & CGM technology in this 3-month certificate program.",
  },
};

/**
 * Look up manual SEO overrides for a course by its slug.
 * Returns null if no override exists for that slug (falls back to course data).
 * Title is auto-cleaned so "MGA" / "Medical Global Academy" never appears.
 */
export function getCourseMeta(slug) {
  const meta = COURSE_META[slug];
  if (!meta) return null;

  return {
    ...meta,
    title: cleanTitle(meta.title) || meta.title,
  };
}

export default COURSE_META;