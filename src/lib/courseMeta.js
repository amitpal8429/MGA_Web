// src/lib/courseMeta.js
// Har course slug ke liye manual SEO title & description + overview.
// Yahan entry na ho to component apne aap course.name/description se bana lega (fallback).
//
// IMPORTANT: Ek slug sirf EK baar likhna. Same key do baar ho to neeche wali
// entry upar wali ko overwrite kar deti hai.
//
// Title: ~55-60 characters ke andar rakhna best hai (Google truncate kar deta hai zyada lamba).
// Description: ~120-160 characters ideal.
// Overview: Sheet ka "Overview content" column — meta overview ke roop mein
//           CourseDetail.jsx mein seoOverview ke baad API fallback se pehle use hota hai.

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
    overview:
      "This online family medicine course for doctors gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Family Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen primary-care knowledge and practical clinical skills. The curriculum covers adult primary care, common acute presentations, chronic disease management (diabetes, hypertension, thyroid, dyslipidemia), preventive care and screening, women's health, pediatric and geriatric primary care, minor procedures, emergency stabilization, communication and counselling, and evidence-based clinical decision-making. The program emphasizes structured clinical reasoning, early diagnosis, appropriate referral, and patient-centred care in OPD and community settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-obstetrics-and-gynaecology": {
    title: "Certificate in Gynaecology and Obstetrics for Doctors",
    description:
      "Learn about gynaecological procedures and obstetric care with a 6-month Certificate in Gynaecology and Obstetrics — CPD & ACTD accredited.",
    overview:
      "This certificate course in gynaecology and obstetrics gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Gynaecology and Obstetrics from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want focused training in women's health and obstetric care. The curriculum covers antenatal care, normal and high-risk pregnancy, labour and delivery, obstetric emergencies, postnatal care, common gynaecological disorders, menstrual disorders, infertility basics, contraception and family planning, menopause, and gynaecological infections. The program emphasizes structured clinical reasoning, early diagnosis, safe management, and timely referral in OPD, hospital and community settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-rheumatology": {
    title: "Online Certificate in Rheumatology for Practising Doctors",
    description:
      "Sharpen how you diagnose and manage rheumatic conditions with a 6-month online rheumatology certificate — CPD & ACTD accredited, guided by practising faculty.",
    overview:
      "This certificate course in rheumatology gives learners a structured, self-paced route to build practical clinical skills. The Online Certificate in Rheumatology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for practising doctors who want to strengthen their knowledge of rheumatic and musculoskeletal conditions. The curriculum covers joint examination and clinical assessment, rheumatoid arthritis, spondyloarthritis, lupus, vasculitis, gout and crystal arthropathies, osteoporosis, fibromyalgia, and musculoskeletal imaging and laboratory interpretation. The program emphasizes early diagnosis, differentiation between inflammatory and non-inflammatory conditions, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-internal-medicine": {
    title: "Certificate in Internal Medicine for Clinical Practice",
    description:
      "Build sharper diagnosis and case-management skills with a 6-month internal medicine certificate — self-paced, CPD & ACTD accredited, mentored faculty.",
    overview:
      "This certificate course in internal medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Internal Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their adult-medicine knowledge and clinical reasoning. The curriculum covers systematic history-taking and examination, common adult presentations, diabetes, hypertension, infections, cardiovascular conditions, respiratory disorders, GI and hepatobiliary conditions, renal and electrolyte issues, and neurological problems. The program emphasizes structured diagnostic reasoning, evidence-based management, appropriate investigation, and safe referral for adults in OPD and inpatient settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-clinical-cardiology": {
    title: "Certificate in Clinical Cardiology to Build Core Skills",
    description:
      "Strengthen how you manage hypertension, ischemic heart disease and arrhythmias with a 6-month cardiology certificate, CPD & ACTD accredited.",
    overview:
      "This certificate course in clinical cardiology gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Clinical Cardiology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their cardiovascular knowledge. The curriculum covers cardiovascular examination, ECG interpretation, hypertension, ischemic heart disease, heart failure, arrhythmias, valvular heart disease, cardiovascular risk assessment, and preventive cardiology. The program emphasizes systematic interpretation, evidence-based management, cardiovascular risk reduction, and appropriate referral in OPD and hospital practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-research-methodology": {
    title: "Certificate in Research Methodology for Practising Doctors",
    description:
      "Learn to design, conduct and publish sound clinical research with a 6-month online certificate — CPD & ACTD accredited, guided by practising faculty.",
    overview:
      "This certificate course in research methodology gives learners a structured, self-paced route to build practical clinical research skills. The Certificate in Research Methodology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for practising doctors who want to understand and conduct clinical research. The curriculum covers research design, hypothesis formulation, sampling, biostatistics basics, data collection and management, ethical considerations, scientific writing, manuscript preparation, journal submission, and critical appraisal of medical literature. The program emphasizes practical research skills, publication ethics, and evidence-based practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-pediatrics": {
    title: "Certificate in Pediatrics for Confident Child Healthcare",
    description:
      "Build practical skills in child development, immunization and common pediatric illnesses with a 6-month certificate — CPD & ACTD accredited, mentored faculty.",
    overview:
      "This certificate course in pediatrics for MBBS doctors gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Pediatrics from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their pediatric knowledge. The curriculum covers pediatric history-taking and examination, growth and development, nutrition and breastfeeding, immunization schedules, common childhood illnesses, pediatric infections, respiratory and GI disorders, pediatric emergencies, and developmental assessment. The program emphasizes structured pediatric assessment, early recognition of red flags, evidence-based management, and appropriate referral for children in OPD and community settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-infection-control-and-prevention": {
    title: "Certificate in Infection Control & Prevention for Doctors",
    description:
      "Build essential skills in infection control and prevention for your healthcare facility with a 6-month online certificate, CPD & ACTD accredited.",
    overview:
      "This certificate course in infection prevention and control gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Infection Control and Prevention from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors and healthcare professionals who want to strengthen hospital and community infection control. The curriculum covers hand hygiene, sterilization and disinfection, personal protective equipment, healthcare-associated infections (HAIs), antimicrobial resistance, outbreak investigation, isolation precautions, and quality improvement in infection control. The program emphasizes practical infection control measures, HAI prevention, and infection control program implementation in hospitals and clinics. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-gastroenterology": {
    title: "Certificate Course in Gastroenterology for Doctors",
    description:
      "Elevate your expertise in diagnosing and managing GI diseases with a 6-month Certificate Course in Gastroenterology — CPD & ACTD accredited.",
    overview:
      "This gastroenterology certificate course gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Gastroenterology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of gastrointestinal and hepatobiliary disorders. The curriculum covers esophageal and gastric disorders, GERD, peptic ulcer disease, IBD, IBS, GI bleeding, liver and biliary diseases, pancreatitis, GI infections, and GI oncology. The program emphasizes structured diagnostic reasoning, endoscopy interpretation basics, evidence-based management, and appropriate referral in GI practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-addiction-medicine": {
    title: "Certificate in Addiction Medicine for Doctors",
    description:
      "Certification in Addiction Medicine covers the evaluation and management of substance-use disorders. 6-month online course, CPD & ACTD accredited.",
    overview:
      "This online certificate in addiction medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Addiction Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of substance-use disorders and addiction medicine. The curriculum covers substance-use assessment, withdrawal management, pharmacological and psychosocial interventions, harm reduction, motivational interviewing, relapse prevention, integrated care, and addiction psychiatry. The program emphasizes structured assessment, evidence-based treatment, patient-centred care, and multidisciplinary approach to addiction. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-neurology": {
    title: "Certificate in Neurology: Diagnose Neurological Disorders",
    description:
      "A 6-month online Certificate in Neurology covering nervous system anatomy, common neurological disorders and diagnostic techniques. CPD & ACTD accredited.",
    overview:
      "This neurology certificate course gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Neurology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of neurological disorders. The curriculum covers neurological examination, CNS anatomy and physiology, stroke, epilepsy, headache, movement disorders, neuromuscular disorders, dementia, neuroinfections, and neuroimaging interpretation. The program emphasizes structured neurological assessment, early recognition of emergencies, evidence-based management, and appropriate referral in neuro practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-maternal-and-child-health": {
    title: "Certificate in Maternal and Child Health for Doctors",
    description:
      "A 6-month Certificate in Maternal and Child Health for doctors — covering prenatal, postnatal and child healthcare, CPD & ACTD accredited.",
    overview:
      "This maternal and child health certificate course gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Maternal and Child Health from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of maternal, newborn and child health. The curriculum covers antenatal care, postnatal care, newborn care, breastfeeding, child growth and development, immunization, common pediatric illnesses, and maternal and child emergencies. The program emphasizes structured assessment, early identification of complications, evidence-based management, and appropriate referral in MCH practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-clinical-nutrition-and-dietetics": {
    title: "Certificate in Clinical Nutrition for Better Patient Care",
    description:
      "A 6-month Certificate in Clinical Nutrition and Dietetics for doctors — understand how nutrition impacts patient health, with CPD & ACTD accreditation.",
    overview:
      "This certificate in nutrition and dietetics gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Clinical Nutrition and Dietetics from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of clinical nutrition and therapeutic diet planning. The curriculum covers nutritional assessment, macro- and micronutrients, medical nutrition therapy in diabetes, cardiovascular disease, renal disorders, oncology, GI disorders, critical care, obesity, and maternal and pediatric nutrition. The program emphasizes evidence-based dietary planning, patient counselling, and integrated nutrition care in clinical practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-pain-management": {
    title: "Certificate in Pain Management: 6-Month Course for Doctors",
    description:
      "Enroll in the CPD & ACTD accredited Certificate in Pain Management. Master acute, chronic, cancer and neuropathic pain management online in 6 months.",
    overview:
      "This certificate course in pain management gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Pain Management from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of pain assessment and management. The curriculum covers acute pain, chronic pain, cancer pain, neuropathic pain, pharmacological management, interventional approaches, multimodal analgesia, pain assessment tools, and palliative pain care. The program emphasizes structured pain assessment, evidence-based multimodal management, patient safety, and appropriate referral in pain medicine. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-diabetic-foot-care": {
    title: "Certificate in Diabetic Footcare to Prevent Complications",
    description:
      "This 6-month Certificate in Diabetic Footcare covers foot anatomy, risk factors and early signs of complications — CPD & ACTD accredited, for doctors.",
    overview:
      "This diabetic foot care course online gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Diabetic Footcare from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of diabetic foot assessment and management. The curriculum covers foot anatomy, diabetic neuropathy, peripheral arterial disease, foot ulcer assessment, risk classification, wound care basics, offloading, infection management, and amputation prevention. The program emphasizes early identification, structured foot examination, evidence-based management, and multidisciplinary care for patients with diabetes. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-aesthetic-medicine": {
    title: "Certificate in Aesthetic Medicine to Build Clinical Skills",
    description:
      "This 6-month Certificate in Aesthetic Medicine covers skin assessment, chemical peels and microneedling — CPD & ACTD accredited, for doctors.",
    overview:
      "This certificate course in aesthetic medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Aesthetic Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of aesthetic medicine. The curriculum covers skin assessment, facial anatomy, chemical peels, microneedling, skin rejuvenation, acne and pigmentation management, cosmeceuticals, patient selection, and complication management. The program emphasizes structured aesthetic assessment, evidence-based treatment planning, patient safety, and ethical aesthetic practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-dermatology": {
    title: "Certificate Course in Dermatology to Manage Skin Conditions",
    description:
      "This 6-month Certificate Course in Dermatology covers skin anatomy, common dermatological conditions and diagnostic techniques — CPD & ACTD accredited.",
    overview:
      "This certificate in dermatology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Dermatology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of common skin conditions. The curriculum covers skin anatomy and physiology, common dermatological conditions (acne, eczema, psoriasis, fungal and bacterial infections), pigmentation disorders, hair and nail disorders, dermoscopy, and diagnostic techniques. The program emphasizes structured dermatological assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-diabetology": {
    title: "Certificate Course in Diabetology to Manage Diabetes Care",
    description:
      "Learn to diagnose, treat and monitor diabetes mellitus through structured, self-paced modules — a 6-month diabetology certificate, CPD & ACTD accredited.",
    overview:
      "This certificate in diabetology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Diabetology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of diabetes care. The curriculum covers diabetes classification, diagnosis, monitoring, oral agents, insulin therapy, diabetes complications, gestational diabetes, and patient education. The program emphasizes evidence-based glycemic management, early complication detection, and multidisciplinary diabetes care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-emergency-medicine": {
    title: "Certificate in Emergency Medicine for Doctors",
    description:
      "Strengthen your emergency assessment, clinical decision-making and patient management skills through this 6-month certificate, CPD & ACTD accredited.",
    overview:
      "This certificate course in emergency medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Emergency Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their emergency assessment and management skills. The curriculum covers triage, primary and secondary survey, airway management, ACLS, trauma, medical emergencies, pediatric and obstetric emergencies, toxicology, and emergency imaging. The program emphasizes rapid assessment, stabilization, evidence-based emergency management, and appropriate referral in emergency department settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-oncology": {
    title: "Certificate Course in Oncology to Understand Cancer Care",
    description:
      "Build a strong foundation in cancer biology, treatment modalities and patient care strategies through this 6-month oncology certificate, CPD & ACTD accredited.",
    overview:
      "This certificate in oncology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Oncology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of cancer care. The curriculum covers cancer biology, carcinogenesis, cancer diagnosis and staging, treatment modalities (surgery, chemotherapy, radiation, targeted therapy, immunotherapy), oncologic emergencies, palliative care, and multidisciplinary cancer care. The program emphasizes structured oncologic assessment, evidence-based treatment planning, and integrated cancer care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-pediatric-dermatology": {
    title: "Certificate in Pediatric Dermatology for Skin Care",
    description:
      "Explore the specialized field of pediatric skin care through this 6-month online certificate, CPD & ACTD accredited, guided by practising faculty.",
    overview:
      "This pediatric dermatology online certificate gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Pediatric Dermatology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of pediatric skin conditions. The curriculum covers neonatal skin, atopic dermatitis, pediatric infections, birthmarks, vascular anomalies, hair and nail disorders in children, pediatric dermoscopy, and common pediatric dermatoses. The program emphasizes age-appropriate assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-pediatric-neurology": {
    title: "Certificate in Pediatric Neurology for Child Care",
    description:
      "Diagnosing a child's neurological disorder takes a different lens — this 6-month certificate sharpens that clinical judgment, CPD & ACTD accredited.",
    overview:
      "This pediatric neurology online course gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Pediatric Neurology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of pediatric neurological disorders. The curriculum covers pediatric neurological examination, developmental assessment, seizures and epilepsy, cerebral palsy, neuromuscular disorders, neurodevelopmental disorders, pediatric headache, and neuroimaging basics. The program emphasizes age-appropriate assessment, early identification, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-neuropathology": {
    title: "Certificate Course in Neuropathology for Diagnosis",
    description:
      "Reading brain tissue and diagnostic patterns takes trained eyes — this 6-month certificate builds skills in histopathology, CPD & ACTD accredited.",
    overview:
      "This certificate in neuropathology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Neuropathology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of neuropathology and diagnostic interpretation. The curriculum covers neuroanatomy, histopathology basics, brain tumor pathology, neurodegenerative disease pathology, neuroinfections, demyelinating diseases, and diagnostic reporting. The program emphasizes systematic histopathological interpretation and evidence-based diagnostic practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-orthopaedics": {
    title: "Certificate in Orthopaedics for Bone and Joint Care",
    description:
      "Fractures, joint replacements and rehabilitation need sound clinical grounding — this 6-month certificate covers anatomy, biomechanics and dislocations.",
    overview:
      "This certificate course in orthopaedics gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Orthopaedics from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of orthopaedic care. The curriculum covers musculoskeletal anatomy, biomechanics, fracture assessment and management, dislocations, joint disorders, sports injuries, orthopaedic infections, and rehabilitation basics. The program emphasizes structured musculoskeletal assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-endocrinology": {
    title: "Certificate Course in Endocrinology for Hormone Care",
    description:
      "Hormone imbalances rarely show up in isolation — this 6-month certificate covers pituitary, thyroid and adrenal disorders, CPD & ACTD accredited.",
    overview:
      "This certificate in endocrinology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Endocrinology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of endocrine disorders. The curriculum covers pituitary, thyroid, adrenal, parathyroid and gonadal disorders, diabetes, obesity, metabolic syndrome, and endocrine emergencies. The program emphasizes structured endocrine assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-pathology": {
    title: "Certificate in Pathology for Lab Diagnosis",
    description:
      "Interpreting lab results with confidence takes practice — this 6-month certificate covers hematology and microbiology, CPD & ACTD accredited.",
    overview:
      "This certificate course in pathology gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Pathology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of laboratory diagnosis. The curriculum covers hematology, microbiology, clinical pathology, lab report interpretation, quality control, and diagnostic interpretation. The program emphasizes systematic lab interpretation and evidence-based diagnostic practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-thoracic-oncology": {
    title: "Online Certificate in Thoracic Oncology for Doctors",
    description:
      "Managing lung cancer and thoracic malignancies calls for focused clinical understanding, built through this 6-month certificate, CPD & ACTD accredited.",
    overview:
      "This thoracic oncology certificate course gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Thoracic Oncology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of thoracic malignancies. The curriculum covers lung cancer biology, thoracic imaging, diagnosis and staging, treatment modalities, targeted therapy, immunotherapy, thoracic oncologic emergencies, and multidisciplinary care. The program emphasizes structured oncologic assessment, evidence-based treatment planning, and integrated thoracic cancer care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-rehabilitation-therapy": {
    title: "Certificate Course in Rehabilitation Therapy Online",
    description:
      "Helping patients regain movement and function starts with structured rehabilitation knowledge. This 6-month certificate builds it, CPD & ACTD accredited.",
    overview:
      "This certificate in rehabilitation therapy gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Rehabilitation Therapy from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of rehabilitation. The curriculum covers rehabilitation assessment, physical therapy basics, occupational therapy concepts, neurorehabilitation, musculoskeletal rehabilitation, cardiac and pulmonary rehabilitation, and patient recovery strategies. The program emphasizes structured rehabilitation planning and multidisciplinary care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-ophthalmology": {
    title: "Certification Course in Ophthalmology for Eye Care",
    description:
      "Diagnosing and managing eye conditions starts with a strong clinical base. This 6-month Certification Course in Ophthalmology is CPD & ACTD accredited.",
    overview:
      "This ophthalmology certificate course online gives learners a structured, self-paced route to build practical clinical skills. The Certification Course in Ophthalmology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of eye conditions. The curriculum covers ophthalmic examination, refraction, cataract, glaucoma, retinal disorders, ocular infections, pediatric ophthalmology, and ophthalmic emergencies. The program emphasizes structured ophthalmic assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-otorhinolaryngology": {
    title: "Certificate Course in Otorhinolaryngology for ENT Care",
    description:
      "Confidently assess ear, nose and throat disorders in daily practice — this 6-month Certificate Course in Otorhinolaryngology is CPD & ACTD accredited.",
    overview:
      "This certificate in otorhinolaryngology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Otorhinolaryngology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of ENT disorders. The curriculum covers ENT examination, otology, rhinology, laryngology, pediatric ENT, ENT infections, and ENT emergencies. The program emphasizes structured ENT assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-cosmetology": {
    title: "Certificate Course in Cosmetology for Doctors Online",
    description:
      "Cosmetology through a clinical lens — this 6-month Certificate Course in Cosmetology for doctors covers skin and hair care, CPD & ACTD accredited.",
    overview:
      "This certificate in cosmetology for doctors gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Cosmetology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of clinical cosmetology. The curriculum covers skin and hair assessment, chemical peels, laser basics, skin rejuvenation, hair restoration, and aesthetic procedures. The program emphasizes evidence-based cosmetic practice and patient safety. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-echocardiography": {
    title: "Certificate Course in Echocardiography for Cardiac Care",
    description:
      "Reading echo studies shapes cardiac care — this 6-month Certificate Course in Echocardiography builds cardiac imaging skills, CPD & ACTD accredited.",
    overview:
      "This certificate in echocardiography gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Echocardiography from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of echocardiography. The curriculum covers cardiac anatomy, echo views, 2D echocardiography, Doppler basics, valvular assessment, cardiac function, and echo interpretation. The program emphasizes systematic echo interpretation and evidence-based cardiac care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-general-medicine": {
    title: "Certificate Course in General Medicine for Adult Care",
    description:
      "From fever to chronic illness, adult patients need a sound clinical approach — this 6-month Certificate Course in General Medicine is CPD & ACTD accredited.",
    overview:
      "This certificate in general medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in General Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their adult-medicine knowledge. The curriculum covers systematic history-taking, clinical examination, common adult presentations, chronic disease management, infectious diseases, and clinical reasoning. The program emphasizes structured diagnostic reasoning and evidence-based management for adults in OPD and inpatient settings. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-urology": {
    title: "Certificate Course in Urology for Urinary Tract Care",
    description:
      "Managing urinary tract and urological conditions calls for a focused clinical base — this 6-month Certificate Course in Urology is CPD & ACTD accredited.",
    overview:
      "This certificate in urology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Urology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of urological disorders. The curriculum covers urological examination, urinary tract infections, kidney stones, prostate disorders, urinary incontinence, hematuria, and urological emergencies. The program emphasizes structured urological assessment and evidence-based management. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-hernia": {
    title: "Certificate in Hernia for Diagnosis and Management",
    description:
      "Recognising hernia types and choosing the right management approach is core surgical knowledge — this 6-month online Certificate in Hernia is CPD & ACTD accredited.",
    overview:
      "This certificate course in hernia gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Hernia from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of hernia diagnosis and management. The curriculum covers hernia types, clinical assessment, surgical approaches, mesh technology, complications, and postoperative care. The program emphasizes structured hernia assessment, evidence-based management, and appropriate surgical referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-dental-oncology": {
    title: "Certificate Course in Dental Oncology for Oral Cancer",
    description:
      "Early detection of oral malignant changes starts with a trained eye — this 6-month online Certificate Course in Dental Oncology is CPD & ACTD accredited.",
    overview:
      "This certificate course in dental oncology gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Dental Oncology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for BDS and MDS professionals who want to strengthen their knowledge of oral oncology. The curriculum covers oral cancer pathology, oral cancer screening, premalignant lesions, biopsy basics, treatment modalities, and management of oral complications of cancer treatment. The program emphasizes early detection and evidence-based oral oncology care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-ecg-interpretation": {
    title: "Certificate Course in ECG Interpretation Online",
    description:
      "Reading the ECG waveform and cardiac rhythms is a core clinical skill — this 6-month Certificate Course in ECG Interpretation is CPD & ACTD accredited.",
    overview:
      "This ECG interpretation certificate course gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in ECG Interpretation from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their ECG interpretation skills. The curriculum covers ECG basics, cardiac rhythms, arrhythmias, ischemic changes, electrolyte abnormalities, and systematic ECG interpretation. The program emphasizes systematic ECG reading and evidence-based cardiac assessment. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-regenerative-medicine": {
    title: "Certificate Course in Regenerative Medicine Online",
    description:
      "Understand the science of tissue repair and regeneration in this 6-month online Certificate Course in Regenerative Medicine, CPD & ACTD accredited.",
    overview:
      "This regenerative medicine courses in India gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Regenerative Medicine from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of regenerative medicine. The curriculum covers stem cell biology, PRP therapy, tissue engineering, regenerative techniques, and clinical applications. The program emphasizes evidence-based regenerative medicine and patient safety. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-paediatric-orthopaedics": {
    title: "Certificate in Paediatric Orthopaedics: Child Bone Care",
    description:
      "Assessing congenital, developmental and traumatic conditions in children — this 6-month Certificate in Paediatric Orthopaedics is CPD & ACTD accredited.",
    overview:
      "This certificate in paediatric orthopaedics gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Paediatric Orthopaedics from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of pediatric orthopaedics. The curriculum covers pediatric bone growth, developmental dysplasia of the hip, clubfoot, pediatric fractures, pediatric bone and joint disorders, and pediatric orthopaedic assessment. The program emphasizes structured pediatric assessment and evidence-based orthopaedic management. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-child-health": {
    title: "Certificate Course in Child Health for Clinical Care",
    description:
      "History taking and clinical examination in children need a different approach — this 6-month Certificate Course in Child Health is CPD & ACTD accredited.",
    overview:
      "This certificate in child health gives learners a structured, self-paced route to build practical clinical skills. The Certificate Course in Child Health from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their pediatric knowledge. The curriculum covers pediatric history-taking, clinical examination, growth and development screening, pediatric nutrition, common childhood illnesses, and immunization. The program emphasizes structured pediatric assessment, evidence-based management, and appropriate referral. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-advanced-ultrasound-in-obstetrics-and-gynecology": {
    title: "Certificate Course in Gynecology and Obstetrics Online",
    description:
      "Interpreting obstetric and gynecological ultrasound — this 6-month online Certificate Course in Gynecology and Obstetrics is CPD & ACTD accredited.",
    overview:
      "This certificate in advanced obstetric and gynecologic ultrasound gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Advanced Ultrasound in Obstetrics and Gynecology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of obstetric and gynecological ultrasound. The curriculum covers obstetric ultrasound, fetal echocardiography, Doppler ultrasound, high-risk obstetric ultrasound, gynecologic ultrasound, and gynecologic oncology imaging. The program emphasizes systematic ultrasound interpretation and evidence-based obstetric and gynecologic care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-critical-care": {
    title: "Certificate in Critical Care | Online Certification Course",
    description:
      "Certificate in Critical Care for MBBS doctors — covers case-based learning, CPD certification & concepts to improve patient care outcomes.",
    overview:
      "This certificate in critical care medicine gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Critical Care from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for MBBS doctors who want to strengthen their critical care knowledge. The curriculum covers ICU protocols, ventilator management, sepsis management, hemodynamic monitoring, and critical care emergencies. The program emphasizes evidence-based critical care and patient safety. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-histopathology": {
    title: "Certificate in Histopathology for Doctors",
    description:
      "Learn online with MGA’s Certificate in Histopathology for doctors — covering tissue processing, staining & diagnostic reporting, UK CPD & ACTD accredited.",
    overview:
      "This certificate course in histopathology gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Histopathology from Medical Global Academy (MGA) is a 6-month professional skill-development program designed for doctors who want to strengthen their knowledge of histopathology. The curriculum covers tissue processing, staining techniques, histopathological interpretation, diagnostic reporting, and quality control. The program emphasizes systematic histopathological interpretation and evidence-based diagnostic practice. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-nutrition-and-dietetics": {
    title: "Certificate in Nutrition and Dietetics – Boost Career",
    description:
      "Certificate in Nutrition and Dietetics – an online course for MBBS doctors to gain expertise in diet planning, patient nutrition & clinical case learning.",
    overview:
      "This certificate in nutrition and dietetics gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Nutrition and Dietetics from Medical Global Academy (MGA) is a professional skill-development program designed for MBBS doctors who want to strengthen their knowledge of clinical nutrition. The curriculum covers diet planning, medical nutrition therapy, patient nutrition, and clinical case learning. The program emphasizes evidence-based nutrition care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-essential-cardiology": {
    title: "Certificate in Essential Cardiology Course | Online Learning",
    description:
      "Certificate in Essential Cardiology for MBBS doctors with expert-led sessions, recorded case discussions, CPD certification & skill upgrade.",
    overview:
      "This certificate in essential cardiology gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Essential Cardiology from Medical Global Academy (MGA) is a professional skill-development program designed for MBBS doctors who want to strengthen their core cardiology knowledge. The curriculum covers cardiovascular examination, ECG basics, hypertension, ischemic heart disease, heart failure, and arrhythmias. The program emphasizes structured cardiovascular assessment and evidence-based management. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-obstetrics-gynaecology": {
    title: "Certificate in Obstetrics & Gynaecology | Online CPD Course",
    description:
      "Obstetrics & Gynaecology certificate for MBBS, MD & MS doctors — case-based learning with CPD certification through online modules.",
    overview:
      "This certificate in obstetrics and gynaecology gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Obstetrics & Gynaecology from Medical Global Academy (MGA) is a professional skill-development program designed for MBBS, MD and MS doctors who want to strengthen their obstetrics and gynaecology knowledge. The curriculum covers antenatal care, labour management, obstetric emergencies, gynaecological disorders, and women's health. The program emphasizes evidence-based obstetric and gynaecologic care. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "certificate-in-diabetes-mellitus-management": {
    title: "Certificate in Diabetes Management",
    description:
      "Master modern insulin regimens, GLP-1 analogues, SGLT-2 inhibitors & CGM technology in this 3-month certificate program.",
    overview:
      "This certificate in diabetes mellitus management gives learners a structured, self-paced route to build practical clinical skills. The Certificate in Diabetes Mellitus Management from Medical Global Academy (MGA) is a 3-month professional skill-development program designed for doctors who want to strengthen their knowledge of modern diabetes care. The curriculum covers modern insulin regimens, GLP-1 analogues, SGLT-2 inhibitors, continuous glucose monitoring (CGM) technology, and contemporary diabetes management approaches. The program emphasizes evidence-based diabetes care and modern therapeutic approaches. This certificate is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },

  // ============================================================
  // PG DIPLOMA COURSES (from sheet — titles/descriptions from sheet, overview from sheet)
  // ============================================================
  "pg-diploma-in-reproductive-child-health": {
    title: "PG Diploma in Reproductive & Child Health: RCH Course 2026",
    description:
      "PG Diploma in Reproductive & Child Health for MBBS doctors — covers maternal health, child nutrition, family planning & neonatal care. Online course. Enroll 2026.",
    overview:
      "The PG Diploma in Reproductive Child Health from Medical Global Academy (MGA) is a professional skill-development program designed to strengthen knowledge and practical understanding across maternal, newborn and child health. The program covers sexual and reproductive health, family planning, antenatal and postnatal care, normal and high-risk pregnancy, childbirth, newborn care, child health and development, adolescent health, nutrition, immunization, preventive healthcare, and common maternal, neonatal and pediatric conditions. It emphasizes a life-course approach, evidence-based practice, respectful maternity and newborn care, early identification of complications, and multidisciplinary care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-obstetrics-and-gynaecology": {
    title: "Online Diploma in Gynecology and Obstetrics India",
    description:
      "Online Diploma in Gynecology and Obstetrics in India struggling with women's health cases? Master pregnancy care, gynecological disorders. CPD 12-month.",
    overview:
      "The PG Diploma in Obstetrics & Gynaecology from Medical Global Academy (MGA) is a 1-year professional skill-development program designed for doctors seeking to strengthen their knowledge and clinical skills in contemporary women's healthcare. The program covers comprehensive antenatal and postnatal care, normal and high-risk pregnancy, obstetric emergencies, fetal assessment, maternal medicine, gynecological disorders, reproductive health, infertility, contraception, menopause, gynecological endocrinology, ultrasound and imaging, and evidence-based clinical decision-making. It also incorporates contemporary areas including advanced obstetric ultrasound, fetal surveillance, preterm birth, hypertensive disorders of pregnancy, gestational diabetes, postpartum hemorrhage, minimally invasive gynecologic surgery, hysteroscopy, laparoscopy, reproductive medicine, gynecological oncology, urogynecology, pelvic-floor disorders, fertility preservation, and multidisciplinary management of complex cases. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-endocrinology": {
    title: "Post Graduate Diploma in Endocrinology for Doctors",
    description:
      "Learn online with MGA’s Post Graduate Diploma in Endocrinology — a 12-month program for MBBS doctors, UK CPD & ACTD accredited, with live mentorship.",
    overview:
      "The PG Diploma in Endocrinology from Medical Global Academy (MGA) is a post graduate diploma in endocrinology and a professional skill-development program designed for doctors and medical professionals seeking to strengthen their knowledge and clinical understanding of modern endocrinology and metabolic medicine. The program covers comprehensive evaluation and management of diabetes and glucose disorders, thyroid diseases, obesity and metabolic syndrome, dyslipidemia, adrenal disorders, pituitary and hypothalamic diseases, reproductive endocrinology, calcium and bone-mineral disorders, osteoporosis, endocrine hypertension, pediatric and geriatric endocrine conditions, and endocrine manifestations of systemic diseases. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-clinical-neurology": {
    title: "PG Diploma in Clinical Neurology Online India",
    description:
      "Learn online PG Diploma in Clinical Neurology in India. Master stroke, epilepsy, EEG & neuroimaging diagnosis. UK CPD accredited, 12-month course.",
    overview:
      "The PG Diploma in Clinical Neurology from Medical Global Academy (MGA) is an advanced professional skill-development program, a diploma in neurology designed for healthcare professionals seeking comprehensive knowledge and practical understanding of modern clinical neurology. The program covers advanced neurological examination and clinical reasoning, neuroanatomy and neurophysiology, stroke and cerebrovascular disorders, epilepsy and seizure management, headache and migraine medicine, movement disorders, Parkinson’s disease, cognitive and neurodegenerative disorders, multiple sclerosis and demyelinating diseases, autoimmune and inflammatory neurology, neuromuscular disorders, peripheral neuropathies, neuroinfectious diseases, neuro-oncology, spinal disorders, pediatric and geriatric neurology, sleep-related neurological disorders, neurocritical care, neurological emergencies, neuroimaging, EEG and electrophysiological investigations, biomarkers, precision neurology, digital health and AI-assisted neurological assessment. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-ultrasonography": {
    title: "PG Diploma in Ultrasound & Sonography for MBBS",
    description:
      "Join the PG Diploma in Ultrasonography with fees, eligibility, duration, EMI options, CPD certificate and admission details for MBBS doctors in India.",
    overview:
      "The PG Diploma in Ultrasonography from Medical Global Academy (MGA) is a comprehensive professional skill-development program designed to strengthen clinical knowledge and practical understanding of diagnostic ultrasound and point-of-care ultrasonography. The program covers ultrasound physics, equipment and transducer selection, image optimization, abdominal and pelvic ultrasonography, hepatobiliary and pancreatic imaging, renal and urinary ultrasound, thyroid and neck imaging, breast and scrotal ultrasound, obstetric and gynecological ultrasonography, vascular and Doppler studies, musculoskeletal ultrasound, chest and lung ultrasound, cardiac and basic echocardiographic principles, pediatric and neonatal ultrasound, emergency and POCUS applications, ultrasound-guided procedures, elastography, contrast-enhanced ultrasound concepts, image interpretation, documentation, quality assurance, patient safety, and emerging applications of AI and advanced ultrasound technology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-intensive-care": {
    title: "PG Diploma in Intensive Care for MBBS Doctors",
    description:
      "PG Diploma in Intensive Care – online course covering advanced life support, patient monitoring & management of critically ill patients for MBBS doctors.",
    overview:
      "The PG Diploma in Intensive Care from Medical Global Academy (MGA) is an advanced professional skill-development program designed for healthcare professionals seeking comprehensive knowledge and practical understanding of modern intensive care and critical care medicine. The program covers assessment and stabilization of critically ill patients, airway management, mechanical ventilation, hemodynamic monitoring, shock and sepsis management, acute respiratory failure, cardiac emergencies, acute kidney injury, neurological emergencies, trauma, infections, fluid and electrolyte management, critical-care pharmacology, nutrition, sedation, analgesia, organ-support strategies, point-of-care ultrasound, and multidisciplinary ICU care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-respiratory-medicine": {
    title: "PG Diploma in Respiratory Medicine for Doctors in India",
    description:
      "Learn online with MGA’s PG Diploma in Respiratory Medicine for doctors — covering asthma, COPD & pulmonary diagnostics, UK CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Respiratory Medicine from Medical Global Academy (MGA) is an advanced professional skill-development program designed for healthcare professionals seeking comprehensive knowledge and practical understanding of modern respiratory and pulmonary medicine. The program covers advanced respiratory assessment, pulmonary function testing, chest imaging, asthma, COPD, interstitial lung diseases, pulmonary infections and tuberculosis, bronchiectasis, pulmonary hypertension, sleep-disordered breathing, pleural diseases, respiratory emergencies, non-invasive and invasive respiratory support, mechanical ventilation principles, bronchoscopy, thoracic oncology, occupational and environmental lung diseases, pulmonary rehabilitation, critical respiratory care, and emerging areas including precision medicine, biomarkers, digital health and AI-assisted respiratory care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-clinical-psychiatry": {
    title: "PG Dip in Clinical Psychiatry for Doctors in India",
    description:
      "Learn online with MGA’s PG Dip in Clinical Psychiatry for doctors — covering psychiatric assessment & psychopharmacology, UK CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Clinical Psychiatry from Medical Global Academy (MGA) is an advanced professional skill-development program designed to strengthen comprehensive knowledge and clinical understanding of psychiatric assessment, diagnosis, treatment, and multidisciplinary mental healthcare. The program covers psychiatric history-taking and mental status examination, psychopathology, ICD-11-based diagnostic approaches, mood and anxiety disorders, psychotic disorders, bipolar disorder, obsessive-compulsive and related disorders, trauma-related disorders, personality disorders, substance-use and addictive disorders, neurodevelopmental disorders, child and adolescent psychiatry, geriatric psychiatry, consultation-liaison psychiatry, emergency psychiatry, suicide and self-harm assessment, sleep and behavioral disorders, psychopharmacology, psychotherapy principles, psychosocial interventions, neuropsychiatry, community mental health, digital psychiatry, and contemporary evidence-based psychiatric practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-oncology": {
    title: "PG Diploma in Oncology – Cancer Care Course",
    description:
      "PG Diploma in Oncology – a 12-month online course covering cancer biology, chemotherapy protocols & multidisciplinary cancer care case learning.",
    overview:
      "The PG Diploma in Oncology offered by MGA Medical Global Academy is designed to provide medical graduates and healthcare professionals with a structured understanding of cancer biology, diagnosis, and modern treatment approaches. This PG diploma in oncology typically covers core areas such as medical, surgical, and radiation oncology, along with chemotherapy protocols, tumor pathology, radiological imaging, and advancements in targeted and immunotherapy. Emphasis is placed on clinical exposure, case-based learning, and evidence-based practice to help learners develop practical skills in patient management, cancer prevention, and palliative care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-renal-medicine": {
    title: "PG Diploma in Renal Medicine for Doctors in India",
    description:
      "Build expertise in CKD, AKI and dialysis care with this PG Diploma in Renal Medicine for MBBS/MD doctors — CPD & ACTD accredited credential.",
    overview:
      "The PG Diploma in Renal Medicine from Medical Global Academy (MGA) is an advanced professional skill-development program designed for medical professionals seeking comprehensive knowledge and practical understanding of renal and kidney-related disorders. The program covers acute kidney injury (AKI), acute kidney disease (AKD), chronic kidney disease (CKD), glomerular diseases, diabetic and hypertensive kidney disease, electrolyte and acid–base disorders, renal hypertension, nephrotic and nephritic syndromes, dialysis and kidney replacement therapies, renal emergencies, CKD-related anemia and mineral-bone disorders, fluid and electrolyte management, renal pharmacology, kidney transplantation, and multidisciplinary renal care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-cosmetology-and-aesthetic-medicine": {
    title: "PG Diploma in Cosmetology & Aesthetic Medicine | EMI Plans",
    description:
      "Explore the PG Diploma in Cosmetology & Aesthetic Medicine with 12-month learning, clinical training, expert faculty, mentorship and flexible EMI plans.",
    overview:
      "The PG Diploma in Cosmetology and Aesthetic Medicine from Medical Global Academy (MGA) is a 1-year online skill-development program designed exclusively for doctors who wish to enhance their knowledge and clinical skills in cosmetology and aesthetic medicine. The program focuses on contemporary aesthetic medicine including skin assessment, facial anatomy, acne and acne-scar management, pigmentation and melasma, chemical peels, microneedling, PRP, laser and light-based therapies, radiofrequency, HIFU, skin rejuvenation, hair and scalp disorders, botulinum toxin, dermal fillers, non-surgical facial aesthetics, body contouring, and aesthetic treatment planning. It also emphasizes patient selection, contraindications, infection control, clinical photography, treatment safety, prevention and management of complications, and evidence-based aesthetic practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-maternal-and-child-health": {
    title: "PG Diploma in Maternal & Child Health Course Online",
    description:
      "Join the PG Diploma in Maternal & Child Health with CPD accreditation, expert mentorship, flexible learning, fees, eligibility and 12-month course duration.",
    overview:
      "The PG Diploma in Maternal & Child Health from Medical Global Academy (MGA) is an advanced professional program designed to develop comprehensive knowledge and practical understanding of maternal, newborn, and child healthcare across the life course. The program covers reproductive and preconception health, antenatal and postnatal care, high-risk pregnancy, obstetric emergencies, maternal nutrition, fetal assessment, safe childbirth, neonatal stabilization, prematurity, neonatal care, breastfeeding, child growth and development, pediatric nutrition, immunization, common childhood conditions, pediatric emergencies, adolescent health, maternal and child mental health, safeguarding, preventive healthcare, digital health, evidence-based practice, quality improvement, and multidisciplinary MCH care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-orthopedics": {
    title: "Postgraduate Diploma in Orthopedics — Online Course",
    description:
      "Master orthopedic care with our 12-month postgraduate diploma in orthopedics. Learn trauma, joint reconstruction, spine & sports medicine with expert care.",
    overview:
      "The PG Diploma in Orthopedic Medicine & Surgery from Medical Global Academy (MGA) is an advanced professional skill-development program designed to strengthen comprehensive knowledge and practical understanding of orthopedic and musculoskeletal care. The program covers orthopedic assessment and clinical examination, musculoskeletal imaging, fracture and trauma management, joint disorders, osteoarthritis, sports injuries, arthroscopy principles, hip and knee disorders, shoulder and elbow conditions, spine and back disorders, pediatric orthopedics, hand and wrist conditions, foot and ankle disorders, osteoporosis and metabolic bone disease, orthopedic infections, bone tumors, rehabilitation, pain management, perioperative care, patient safety, and contemporary evidence-based orthopedic practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-gastroenterology": {
    title: "PG Diploma in Gastroenterology for Doctors in India",
    description:
      "Build expertise in GERD, IBD, hepatology and GI endoscopy with this PG Diploma in Gastroenterology for doctors — CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Gastroenterology from Medical Global Academy (MGA) is a 1-year online professional skill-development program designed for doctors seeking to strengthen their knowledge and clinical skills in the assessment, diagnosis, and management of gastrointestinal and hepatobiliary disorders. The program covers advanced gastroenterology including esophageal and gastric disorders, inflammatory bowel disease, gastrointestinal bleeding, liver and biliary diseases, pancreatitis, pancreatic disorders, gastrointestinal infections, GI oncology, nutrition, and gastrointestinal emergencies. It also introduces contemporary areas such as metabolic dysfunction-associated steatotic liver disease (MASLD), advanced non-invasive liver assessment, therapeutic endoscopy, endoscopic ultrasound, precision gastroenterology, digital health, artificial intelligence, and multidisciplinary management of complex gastrointestinal disease. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-critical-care": {
    title: "PG Diploma in Critical Care Online India",
    description:
      "Learn online PG Diploma in Critical Care in India. Master ICU management, ventilator care & sepsis management. CPD accredited, 12-month course.",
    overview:
      "The PG Diploma in Critical Care from Medical Global Academy (MGA) is a 1-year online skill-development program designed exclusively for doctors who wish to enhance their knowledge and practical skills in critical-care medicine. The program focuses on advanced critical-care concepts including airway management, mechanical ventilation, sepsis and septic shock, hemodynamic monitoring, acute respiratory and renal failure, cardiac and neurological emergencies, trauma, critical-care pharmacology, point-of-care ultrasound, renal replacement therapy, ECMO principles, ICU infection control, nutrition, and organ-support strategies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-clinical-cardiology": {
    title: "PG Diploma in Clinical Cardiology | 12-Month Online Program",
    description:
      "Join a CPD accredited PG Diploma in Clinical Cardiology with online learning, EMI plans and a 12-month program for doctors seeking advanced skills now",
    overview:
      "The PG Diploma in Clinical Cardiology from Medical Global Academy (MGA) is a comprehensive program designed to provide healthcare professionals with advanced knowledge and skills in diagnosing, treating, and managing various cardiovascular conditions. The program covers a wide range of topics, including coronary artery disease, heart failure, arrhythmias, and cardiovascular risk management, with a focus on evidence-based practices and clinical decision-making. Delivered by experienced cardiologists and medical experts, the program blends theoretical learning with practical insights. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-dermatology": {
    title: "PG Diploma in Dermatology: 12-Month Online Program 2026",
    description:
      "PG Diploma in Dermatology — 12-month online learning. Master skin disorders, cosmetic & diagnostic skills. CPD accredited. Flexible fees & EMI. Enrol now.",
    overview:
      "The PG Diploma in Dermatology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors and medical professionals seeking to strengthen their knowledge and practical understanding of modern dermatology. The program covers clinical dermatology, common and complex skin disorders, acne, eczema, psoriasis, fungal and bacterial infections, pigmentation disorders, hair and nail diseases, dermoscopy, dermatopathology, procedural dermatology, cosmetic dermatology, laser-based treatments, and contemporary approaches to patient assessment and management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-embryology": {
    title: "PG Diploma in Clinical Embryology Online India",
    description:
      "Learn online PG Diploma in Clinical Embryology. Master IVF lab techniques, ICSI, embryo culture & cryopreservation. CPD-accredited, eligibility for MBBS/MD doctors.",
    overview:
      "The Postgraduate Diploma in Clinical Embryology from Medical Global Academy (MGA) offers a comprehensive curriculum designed to equip students with essential skills and knowledge in the field of reproductive medicine. The program covers advanced topics such as gamete biology, embryo culture, and assisted reproductive technologies, combining theoretical learning with practical laboratory experience. Students will gain insights into the ethical considerations and clinical practices necessary for successful embryological procedures. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-general-medicine": {
    title: "PG Diploma General Medicine: Clinical Skills for MBBS",
    description:
      "PG Diploma in General Medicine in India — is it worth it after MBBS? Compare with MD, explore career scope, eligibility & clinical training pathway.",
    overview:
      "The Postgraduate Diploma in General Medicine (PG Diploma in General Medicine) offered by Medical Global Academy (MGA) is designed for healthcare professionals seeking to deepen their knowledge and clinical skills in the diagnosis, treatment, and management of common medical conditions. The program provides a comprehensive curriculum covering a broad range of medical specialties, from cardiology to endocrinology, and equips students with the latest evidence-based practices. With a focus on both theoretical learning and clinical training, this PG diploma prepares professionals for advanced roles in general medicine. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-pathology": {
    title: "Postgraduate Pathology Diploma for Doctors Online",
    description:
      "Postgraduate pathology diploma for doctors covering histopathology, microbiology and lab diagnosis. 12-month CPD-accredited program with expert mentorship.",
    overview:
      "The PG Diploma in Pathology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their knowledge of diagnostic pathology. The program covers histopathology, microbiology, clinical pathology, laboratory diagnosis, and diagnostic reporting. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-emergency-medicine": {
    title: "PG Diploma in Emergency Medicine in India",
    description:
      "PG Diploma in Emergency Medicine for doctors. Master trauma care, emergency procedures and critical patient management. 12-month online, CPD accredited.",
    overview:
      "The PG Diploma in Emergency Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their emergency assessment and management skills. The program covers trauma, ACLS, critical care, emergency procedures, and rapid patient stabilization. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-child-health": {
    title: "PG Diploma in Child Health – Master Pediatric Care",
    description:
      "PG Diploma in Child Health struggling with pediatric cases? Master neonatal care, nutrition, immunization & common child health disorders. CPD 12-month.",
    overview:
      "The PG Diploma in Child Health from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their pediatric knowledge. The program covers neonatal care, child growth and development, pediatric nutrition, immunization, common childhood illnesses, and pediatric emergencies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-diabetology": {
    title: "PG Diploma in Diabetology | Online Course + Mentorship",
    description:
      "PG Diploma in Diabetology: Master Type 1, Type 2 diabetes, complications & management with a CPD-accredited 12-month online course for doctors. expert-led.",
    overview:
      "The PG Diploma in Diabetology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their diabetes care knowledge. The program covers Type 1 and Type 2 diabetes, insulin therapy, complications, and contemporary diabetes management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-family-medicine": {
    title: "PG Diploma in Family Medicine | Fees, Eligibility & Duration",
    description:
      "Explore PG Diploma in Family Medicine with a 12-month program, flexible EMI options, online learning, recorded lectures and 1-year mentorship.",
    overview:
      "The PG Diploma in Family Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their primary-care knowledge. The program covers whole-person care, preventive care, chronic disease management across life stages, and family medicine principles. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-anesthesiology": {
    title: "PG Diploma in Anesthesiology Online India",
    description:
      "Learn online PG Diploma in Anesthesiology in India. Master airway management, regional blocks, perioperative & pain care. UK CPD accredited, 12-month course.",
    overview:
      "The PG Diploma in Anesthesiology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their anesthesiology knowledge. The program covers airway management, regional blocks, perioperative care, patient monitoring, and pain management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-pulmonary-medicine": {
    title: "PG Diploma Pulmonary & Respiratory Medicine | CPD Certified",
    description:
      "Postgraduate Diploma in Pulmonary & Respiratory Medicine for MBBS doctors. CPD certified, 1-year mentorship, flexible EMI options. 12 months. Enroll now.",
    overview:
      "The PG Diploma in Pulmonary Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their respiratory medicine knowledge. The program covers asthma, COPD, lung disease diagnosis and treatment, respiratory care, and pulmonary diagnostics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-rheumatology": {
    title: "PG Diploma in Rheumatology | CPD, EMI & 12-Month Duration",
    description:
      "Learn about PG Diploma in Rheumatology after MBBS with CPD accreditation, EMI options, 12-month duration, fees, eligibility and admission details for doctors.",
    overview:
      "The PG Diploma in Rheumatology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their rheumatology knowledge. The program covers autoimmune and joint disorders, musculoskeletal medicine, and rheumatologic diagnosis and management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-reproductive-and-child-health": {
    title: "PG Diploma in Reproductive & Child Health | CPD Accredited",
    description:
      "Explore PG Diploma in Reproductive & Child Health with CPD accreditation, expert faculty, 1-year mentorship, flexible learning and EMI plans for doctors.",
    overview:
      "The PG Diploma in Reproductive & Child Health from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their RCH knowledge. The program covers maternal health, child nutrition, family planning, and neonatal care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-reproductive-medicine": {
    title: "PG Diploma in Reproductive Medicine | 12-Month CPD Course",
    description:
      "PG Diploma in Reproductive Medicine with CPD certification, expert faculty, 1-year mentorship, flexible learning and 0% interest EMI for doctors.",
    overview:
      "The PG Diploma in Reproductive Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their fertility and ART knowledge. The program covers infertility diagnosis and management, ART and IVF treatment planning, and reproductive endocrinology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-urology": {
    title: "PG Diploma in Urology | 12-Month Course for Doctors",
    description:
      "Explore the PG Diploma in Urology with 12-month learning, expert faculty, recorded lectures, 1-year mentorship and flexible payment options for doctors.",
    overview:
      "The PG Diploma in Urology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their urology knowledge. The program covers BPH, urinary stone management, UTI, prostate health, and endourology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-echocardiography": {
    title: "PG Diploma in Echocardiography – Master Cardiac Imaging",
    description:
      "Earn a PG Diploma in Echocardiography with CPD & ACTD accredited training in cardiac imaging. Online and hybrid formats for doctors. Apply now.",
    overview:
      "The PG Diploma in Echocardiography from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their echocardiography knowledge. The program covers cardiac imaging, Doppler studies, 2D and stress echocardiography, and echo interpretation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-geriatric-medicine": {
    title: "PG Diploma in Geriatric Medicine – Master Elder Care",
    description:
      "Earn a PG Diploma in Geriatric Medicine with CPD & ACTD accredited training in elder care. Online and hybrid formats for doctors. Apply now.",
    overview:
      "The PG Diploma in Geriatric Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their elder-care knowledge. The program covers dementia and cognitive care, elder care, chronic disease management, geriatric assessment, and frailty management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-nephrology": {
    title: "PG Diploma in Nephrology – Master Kidney Care",
    description:
      "Earn a PG Diploma in Nephrology with CPD & ACTD accredited training in kidney care. Self-paced online learning for doctors. Apply now.",
    overview:
      "The PG Diploma in Nephrology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their nephrology knowledge. The program covers kidney disease and dialysis management, CKD and AKI diagnosis, and nephrology diagnostics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-internal-medicine": {
    title: "PG Diploma in Internal Medicine – Strengthen Adult Care",
    description:
      "Earn a PG Diploma in Internal Medicine with CPD & ACTD accredited training in adult patient care. Self-paced online learning for doctors. Apply now.",
    overview:
      "The PG Diploma in Internal Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their internal medicine knowledge. The program covers adult patient diagnosis and management, chronic disease management, and internal medicine principles. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-orthodontics": {
    title: "PG Diploma in Orthodontics | Online Diploma Program",
    description:
      "PG Diploma in Orthodontics offers specialized online learning in diagnosis, prevention & correction of dental and facial irregularities for doctors.",
    overview:
      "The PG Diploma in Orthodontics from Medical Global Academy (MGA) is a professional skill-development program designed for dental professionals who want to strengthen their orthodontic knowledge. The program covers malocclusion diagnosis and treatment, clear aligner and braces therapy, and orthodontic principles. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-tuberculosis": {
    title: "PG Diploma in Tuberculosis | Online Diploma Program",
    description:
      "PG Diploma in Tuberculosis covers TB diagnosis, treatment & management strategies through online learning for effective patient care.",
    overview:
      "The PG Diploma in Tuberculosis from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their TB care knowledge. The program covers TB diagnosis, drug-resistant TB management, chest disease, and respiratory infection. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-otorhinolaryngology": {
    title: "PG Diploma in Otorhinolaryngology – Master ENT Care",
    description:
      "Earn a PG Diploma in Otorhinolaryngology with CPD & ACTD accredited training in ENT diagnosis and care. Online and hybrid formats. Apply now.",
    overview:
      "The PG Diploma in Otorhinolaryngology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their ENT knowledge. The program covers ear, nose and throat diagnosis, ENT management and treatment, and ENT surgical skills. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-infertility-management": {
    title: "PG Diploma in Infertility Management: Master ART and IVF Care",
    description:
      "Build expertise in ART and IVF with the PG Diploma in Infertility Management for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Infertility Management from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their ART and IVF knowledge. The program covers ovulation induction, ART protocols, IVF cycle management, and infertility diagnosis and treatment planning. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-pediatrics": {
    title: "Postgraduate Diploma in Pediatrics: Build Child Care Expertise",
    description:
      "Advance your career with the Postgraduate Diploma in Pediatrics for doctors. CPD & ACTD accredited, Online & Hybrid formats, hands-on clinical training.",
    overview:
      "The PG Diploma in Pediatrics Medicine from Medical Global Academy (MGA) is an advanced professional skill-development program designed to strengthen doctors’ clinical knowledge and practical understanding of pediatric healthcare from infancy through adolescence. The program covers pediatric growth and development, newborn and infant care, nutrition and breastfeeding, immunization, common childhood illnesses, pediatric infectious diseases, respiratory and gastrointestinal disorders, pediatric cardiology, neurology, nephrology, endocrinology, hematology, emergency and critical care, pediatric infections and sepsis, developmental and behavioral disorders, adolescent health, pediatric pharmacology, preventive and community pediatrics, child safeguarding, and evidence-based clinical decision-making. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-psychiatry-medicine": {
    title: "PG Diploma in Psychiatry: Fees, Eligibility & Duration",
    description:
      "Explore PG Diploma in Psychiatry after MBBS, including eligibility, fees, duration, syllabus, admission details and career options to choose the right course.",
    overview:
      "The PG Diploma in Psychiatry from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their psychiatry knowledge. The program covers psychiatric assessment and diagnosis, psychopharmacology, psychotherapy, and mental health practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-addiction-medicine": {
    title: "PG Diploma in Addiction Medicine: Build Treatment Skills",
    description:
      "Gain substance use and recovery treatment skills with the PG Diploma in Addiction Medicine for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Addiction Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their addiction medicine knowledge. The program covers substance use disorder treatment, de-addiction and rehabilitation, and addiction psychiatry. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-aesthetic-dentistry": {
    title: "PG Diploma in Aesthetic Dentistry: Master Smile Design",
    description:
      "Master smile design and cosmetic procedures with the PG Diploma in Aesthetic Dentistry for dentists. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Aesthetic Dentistry from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their aesthetic dentistry knowledge. The program covers smile design, cosmetic dentistry, veneers and teeth whitening, and CAD/CAM and digital smile design. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-alternative-medicine": {
    title: "PG Diploma in Alternative Medicine: Build Holistic Skills",
    description:
      "Blend holistic and conventional care with the PG Diploma in Alternative Medicine for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Alternative Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their integrative medicine knowledge. The program covers Ayurveda and naturopathy, yoga therapy, herbal medicine, and holistic and conventional care integration. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-anti-aging-medicine": {
    title: "PG Diploma in Anti-Aging Medicine: Master Longevity Care",
    description:
      "Master hormone, nutrition and regenerative therapies with the PG Diploma in Anti-Aging Medicine for doctors. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Anti-Aging Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their longevity and age-management knowledge. The program covers hormone and regenerative therapy, longevity and age management, and nutrition and lifestyle medicine. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-child-psychiatry": {
    title: "PG Diploma in Child Psychiatry: Build Pediatric Skills",
    description:
      "Diagnose and treat ADHD, autism and mood disorders with the PG Diploma in Child Psychiatry for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Child Psychiatry from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their child and adolescent psychiatry knowledge. The program covers ADHD and autism assessment, pediatric mood disorders, child psychopharmacology, and child therapy. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-cosmetology": {
    title: "PG Diploma in Cosmetology: Master Aesthetic Procedures",
    description:
      "Master laser, injectables and skin treatments with the PG Diploma in Cosmetology for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Cosmetology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their cosmetology knowledge. The program covers skin and hair treatment, laser treatment, trichology, and clinical aesthetic procedures. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-dental-crown-and-bridges": {
    title: "PG Diploma in Dental Crown and Bridges: Master Prosthodontics",
    description:
      "Master crown and bridge procedures with the PG Diploma in Dental Crown and Bridges for dentists. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Dental Crown and Bridges from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their prosthodontics knowledge. The program covers CAD/CAM and digital impressions, tooth preparation and cementation, and implant-supported restorations. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-dentistry": {
    title: "PG Diploma in Dentistry: Build Comprehensive Dental Skills",
    description:
      "Build skills across oral surgery, prosthodontics and more with the PG Diploma in Dentistry for dentists. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Dentistry from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their comprehensive dentistry knowledge. The program covers oral surgery, prosthodontics, dental specialties, and comprehensive dental skills. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-endodontics": {
    title: "PG Diploma in Endodontics: Master Root Canal Treatment",
    description:
      "Master root canal diagnosis and treatment with the PG Diploma in Endodontics for dentists. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in Endodontics from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their endodontics knowledge. The program covers root canal diagnosis and obturation, bioceramics and microscopy, and endodontic retreatment. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-ent": {
    title: "PG Diploma in ENT: Advance Your Otolaryngology Skills",
    description:
      "Build advanced ENT diagnostic and surgical skills with the PG Diploma in ENT for doctors. CPD & ACTD accredited, Online & Hybrid formats.",
    overview:
      "The PG Diploma in ENT from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their otolaryngology knowledge. The program covers rhinology and laryngology, otology and audiology, and ENT surgical skills. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-hematology": {
    title: "PG Diploma in Hematology: Master Blood Disorder Care",
    description:
      "Build expertise in diagnosing and managing blood disorders with the PG Diploma in Hematology for doctors. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Hematology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their hematology knowledge. The program covers blood disorders and transfusion medicine, coagulation disorders, and leukemia and hematologic malignancies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-hospital-management": {
    title: "Post Graduate Diploma in Hospital and Health Management",
    description:
      "Build leadership and administrative skills with the Post Graduate Diploma in Hospital and Health Management. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Hospital & Health Management from Medical Global Academy (MGA) is a professional skill-development program designed for doctors and healthcare administrators who want to strengthen their hospital management knowledge. The program covers healthcare leadership, hospital finance and operations, and healthcare quality and patient safety. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-infectious-diseases": {
    title: "PG Diploma in Infectious Diseases: Advance Your Expertise",
    description:
      "Build expertise in diagnosing, treating and preventing infections with the PG Diploma in Infectious Diseases. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Infectious Diseases from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their infectious diseases knowledge. The program covers antimicrobial resistance, outbreak investigation, tropical diseases, and infection control. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-musculoskeletal-ultrasound": {
    title: "PG Diploma in Musculoskeletal Ultrasound: Scan with Confidence",
    description:
      "Master probe technique, sonoanatomy and US-guided procedures with the PG Diploma in Musculoskeletal Ultrasound. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Musculoskeletal Ultrasound from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their MSK ultrasound knowledge. The program covers ultrasound-guided injections, PRP, sonoanatomy, probe technique, and sports medicine imaging. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-nutrition-and-dietetics": {
    title: "PG Diploma in Nutrition and Dietetics: Prescribe Better Diets",
    description:
      "Build expertise in clinical nutrition and therapeutic diet planning with the PG Diploma in Nutrition and Dietetics for doctors. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Nutrition and Dietetics from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their clinical nutrition knowledge. The program covers therapeutic diet planning, clinical and sports nutrition, and patient diet counselling. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-ophthalmology": {
    title: "PG Diploma in Ophthalmology: Diagnose & Treat Eye Disorders",
    description:
      "Build advanced diagnostic and surgical skills in eye care with the PG Diploma in Ophthalmology for doctors. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Ophthalmology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their ophthalmology knowledge. The program covers cataract and glaucoma management, retinal and corneal disorders, and ophthalmic surgery and diagnostics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-oral-implantology": {
    title: "PG Diploma in Oral Implantology: Master Implant Surgery",
    description:
      "Master implant placement, bone grafting and prosthetic restoration with the PG Diploma in Oral Implantology for dentists. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Oral Implantology from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their oral implantology knowledge. The program covers implant surgery and bone grafting, prosthetic restoration and digital implant planning, and dental implants. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-oral-medicine": {
    title: "PG Diploma in Oral Medicine: Sharpen Your Diagnostic Skills",
    description:
      "Build expertise in diagnosing oral mucosal disease and orofacial pain with the PG Diploma in Oral Medicine for dentists. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Oral Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their oral medicine knowledge. The program covers oral radiology and imaging, oral mucosal disease and orofacial pain, and oral cancer screening. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-oral-surgery": {
    title: "PG Diploma in Oral Surgery: Master Surgical Technique",
    description:
      "Master extractions, trauma management and maxillofacial procedures with the PG Diploma in Oral Surgery for dentists. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Oral Surgery from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their oral surgery knowledge. The program covers extractions and trauma management, maxillofacial reconstructive surgery, and dental implant surgery. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-pediatrics-medicine": {
    title: "PG Diploma in Pediatrics: Advance Your Child Care Skills",
    description:
      "Build advanced clinical skills in child health, from neonatal care to adolescent medicine, with the PG Diploma in Pediatrics. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Pediatrics Medicine from Medical Global Academy (MGA) is an advanced professional skill-development program designed to strengthen doctors’ clinical knowledge and practical understanding of pediatric healthcare from infancy through adolescence. The program covers pediatric growth and development, newborn and infant care, nutrition and breastfeeding, immunization, common childhood illnesses, pediatric infectious diseases, respiratory and gastrointestinal disorders, pediatric cardiology, neurology, nephrology, endocrinology, hematology, emergency and critical care, pediatric infections and sepsis, developmental and behavioral disorders, adolescent health, pediatric pharmacology, preventive and community pediatrics, child safeguarding, and evidence-based clinical decision-making. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-prosthodontics": {
    title: "PG Diploma in Prosthodontics: Restore Smiles with Precision",
    description:
      "Master crowns, bridges, dentures and implant prosthodontics with the PG Diploma in Prosthodontics for dentists. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Prosthodontics from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their prosthodontics knowledge. The program covers crowns and bridges, removable and fixed prosthodontics, digital prosthodontics, and implant prosthodontics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-regenerative-medicine": {
    title: "PG Diploma in Regenerative Medicine: Master Cell Therapy",
    description:
      "Build expertise in stem cell therapy, PRP and tissue engineering with the PG Diploma in Regenerative Medicine. CPD & ACTD accredited, Online & Hybrid.",
    overview:
      "The PG Diploma in Regenerative Medicine from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their regenerative medicine knowledge. The program covers PRP therapy, tissue engineering, hematopoietic stem cell transplant principles, and cell-based therapies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-research-methodology": {
    title: "PG Diploma in Research Methodology: Design Better Studies",
    description:
      "Build skills in research design, biostatistics and scientific writing with the PG Diploma in Research Methodology for doctors. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Research Methodology from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their clinical research knowledge. The program covers biostatistics and research design, scientific writing and publication, and clinical research methods. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-diploma-in-restorative-dentistry": {
    title: "PG Diploma in Restorative Dentistry That Builds Real Skill",
    description:
      "Build real skill in fillings, crowns, veneers and smile design with the PG Diploma in Restorative Dentistry. CPD & ACTD accredited.",
    overview:
      "The PG Diploma in Restorative Dentistry from Medical Global Academy (MGA) is a professional skill-development program designed for dentists who want to strengthen their restorative dentistry knowledge. The program covers direct and indirect restorations, composite fillings and smile design, and crowns and veneers. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "pg-in-pediatric-infectious-disease": {
    title: "PG in Pediatric Infectious Disease That Builds Real Skill",
    description:
      "Learn to diagnose and manage sepsis, meningitis, TB and emerging infections in children. PG in Pediatric Infectious Disease, CPD & ACTD accredited.",
    overview:
      "The PGDip in Paediatric Infectious Diseases from Medical Global Academy (MGA) is a professional skill-development program designed for doctors who want to strengthen their pediatric infectious diseases knowledge. The program covers neonatal sepsis and childhood infections, antimicrobial stewardship, and pediatric TB and vaccine-preventable diseases. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },

  // ============================================================
  // FELLOWSHIP COURSES (from sheet — overview from sheet)
  // NOTE: Fellowship entries ka overview sheet ke 'Overview content' column se hai.
  // Title/description sheet ke Title/Meta Description se override kiye gaye hain.
  // ============================================================
  "fellowship-in-cardiothoracic-surgery": {
    title: "Fellowship Cardiothoracic Surgery: 12-Month Program",
    description:
      "Learn online Fellowship in Cardiothoracic Surgery in India. Master CABG, valve surgery & thoracic procedures. UK CPD accredited, 12-month course.",
    overview:
      "The Fellowship in Cardiothoracic Surgery at Medical Global Academy offers focused training for doctors seeking advanced skills in cardiac and thoracic surgery. This 12-month cardiothoracic surgery fellowship combines flexible learning, clinical attachment, practical training, specialist faculty guidance, and one-year mentorship. The cardiothoracic fellowship covers key areas of cardiac and thoracic surgery through structured lectures, case-based learning, clinical exposure, and updated course resources. Doctors can strengthen their clinical knowledge while connecting academic learning with real clinical settings. The program supports focused cardiothoracic surgery training through a structured curriculum and flexible learning model. With specialist faculty, clinical exposure, learning resources, and continued mentorship, the fellowship provides a focused training experience for doctors seeking advanced cardiothoracic surgery education.",
  },
  "fellowship-in-radiology": {
    title: "Fellowship Radiology: Learn CT, MRI & Ultrasound Fast",
    description:
      "12-month CPD-accredited Radiology Fellowship for MBBS, MD & MS doctors. Master CT, MRI and ultrasound imaging with expert faculty and 1-year mentorship.",
    overview:
      "The Fellowship in Radiology is a 12-month programme for doctors who want focused training in diagnostic imaging. It combines online learning with clinical exposure, giving you the flexibility to study while building practical skills. The curriculum covers X-ray, ultrasound, CT, MRI, neuroimaging, abdominal imaging, chest imaging, emergency radiology and other key areas of diagnostic imaging. Experienced faculty support your learning through recorded lectures, case-based learning, Q&A sessions, clinical attachment and one-year mentorship. This programme suits doctors seeking a radiology fellowship after MBBS and professionals who want structured radiology training. With online learning and clinical exposure, the programme offers a practical pathway for doctors looking for a fellowship in radiology in India. Explore the curriculum, learning format, clinical training, certification and admission details before you enrol.",
  },
  "fellowship-in-dermatology": {
    title: "Fellowship Dermatology: Medical & Cosmetic Training",
    description:
      "Learn online Fellowship in Dermatology in India. Master medical & cosmetic dermatology, dermoscopy & laser treatment. UK CPD accredited, 12 months.",
    overview:
      "The Fellowship in Dermatology at Medical Global Academy helps doctors develop focused skills in clinical, cosmetic, and procedural dermatology. This 12-month course is designed for doctors who want structured dermatology training after MBBS while continuing their professional work. The program combines flexible online learning, expert-led sessions, case-based education, clinical-focused training, and one year of mentorship. Learners can build knowledge and practical understanding across areas such as common skin, hair, and nail conditions, dermoscopy, cosmetic dermatology, dermatologic procedures, and laser-based skills. The program also provides structured learning resources and academic support throughout the training period. With an updated curriculum and guidance from experienced faculty, this dermatology fellowship offers a focused learning pathway for doctors seeking additional dermatology skills. Explore the course, review the eligibility and curriculum, and decide if the program fits your professional learning goals.",
  },
  "fellowship-in-neurosurgery": {
    title: "Neurosurgery Fellowship Online Programs in India",
    description:
      "Online Neurosurgery Fellowship: Master flexible brain & spine surgery training with a CPD-accredited 12-month fellowship and expert mentorship for doctors.",
    overview:
      "Fellowship in Neurosurgery is a 12-month advanced training program for eligible doctors who want to build focused skills in modern neurosurgical practice. The Neurosurgery Fellowship program covers key areas such as cranial surgery, spine surgery, cerebrovascular care, neuro-oncology, neurotrauma, functional neurosurgery, and skull base surgery. The course combines structured learning with clinical exposure to help doctors apply their skills in real clinical settings. This Neurosurgery Fellowship course includes expert faculty guidance, updated study material, mentorship, and flexible learning support. Doctors looking for a Fellowship in Neurosurgery in India can review the program structure, eligibility, fees, duration, and admission process before applying. The program supports doctors who want focused neurosurgical training and stronger clinical skills for their professional growth.",
  },
  "fellowship-in-minimal-access-surgery": {
    title: "Minimal Access Surgery Fellowship After MBBS, Expert-Led",
    description:
      "Trusted by 200+ doctors, this 12-month Minimal Access Surgery Fellowship for post-MBBS doctors covers laparoscopic and robotic surgery with 1-year mentorship.",
    overview:
      "The Fellowship in Minimal Access Surgery at Medical Global Academy is designed for doctors and surgeons seeking focused training in modern minimally invasive surgical practice. This 12-month program combines structured academic learning, clinical exposure, expert guidance, and ongoing mentorship. Learners develop their knowledge of minimal access surgery through key areas such as laparoscopic surgery, endoscopic techniques, robotic-assisted surgery, surgical decision-making, patient safety, perioperative care, and complication management. The program also supports doctors who want to strengthen their surgical skills and gain focused experience in advanced minimally invasive techniques. With a clinical-focused learning approach, the fellowship connects surgical education with practical clinical learning and helps eligible medical professionals build relevant knowledge for their professional development. Medical Global Academy provides a structured learning pathway for doctors who want to advance their training in minimal access surgery.",
  },
  "fellowship-in-clinical-genetics": {
    title: "Fellowship in Clinical Genetics in India | 12-Month Program",
    description:
      "Explore Fellowship in Clinical Genetics, a 12-month program with flexible EMI options covering genomic medicine, genetic testing, NGS and genetic counselling.",
    overview:
      "The Fellowship in Clinical Genetics helps doctors develop practical skills in modern genetic care and genomic medicine. This 12-month clinical genetics fellowship program combines structured learning with clinical exposure, helping you apply key concepts in real clinical settings. The curriculum covers molecular genetics, genetic testing, inherited disorders, genetic counseling, pediatric genetics, cancer genetics, reproductive genetics, cardiogenetics, and pharmacogenomics. Experienced faculty guide your learning across important areas of medical genetics, while mentorship supports your progress throughout the program. The clinical genetics training program also includes clinical attachment for practical learning. This medical genetics fellowship suits doctors who want focused training in clinical genetics through a structured clinical genetics course. With guided learning, clinical exposure, and mentorship, the program supports doctors who want to strengthen their skills in this growing field.",
  },
  "fellowship-in-diabetology": {
    title: "Fellowship in Diabetology Online India",
    description:
      "Learn online Fellowship in Diabetology in India after MBBS. Master Type 1 & 2 diabetes, insulin therapy & complication care. UK CPD accredited, 12 months.",
    overview:
      "Advance your clinical practice with our Fellowship in Diabetology, a 12-month program designed for doctors seeking focused training in diabetes care and management. This diabetology fellowship combines flexible online and hybrid learning with clinical training, expert guidance, recorded lectures, and clinical attachment. Build practical skills in diabetes management, patient assessment, glucose monitoring, insulin therapy, and the care of Type 1, Type 2, and gestational diabetes. Strengthen your approach to acute and long-term diabetes complications while developing practical clinical decision-making skills. The program also provides study resources, library access, Q&A support, and one-year mentorship. Choose a structured fellowship in diabetes that combines flexible learning with practical clinical exposure and supports professional growth across diabetes clinics, hospitals, metabolic care, teaching, and research.",
  },
  "fellowship-in-oncology": {
    title: "Fellowship in Oncology Online India",
    description:
      "Join a online Fellowship in Oncology in India after MBBS. Master chemotherapy, immunotherapy & precision oncology. UK CPD accredited, 12 months.",
    overview:
      "Medical Global Academy’s Fellowship in Oncology is a 12-month programme for MBBS graduates, physicians, residents, general practitioners, and qualified doctors who want focused oncology training. This fellowship in oncology helps doctors build practical skills through live classes, recorded lectures, case discussions, LMS access, and expert-led sessions. The medical oncology fellowship covers diagnosis, treatment planning, chemotherapy, radiation oncology, surgical oncology, immunotherapy, targeted therapy, precision oncology, and multidisciplinary care. Doctors can join an online fellowship in oncology and continue learning alongside their clinical work. The programme also includes one-year mentorship, study resources, clinical case learning, and a CPD-accredited certificate. With a structured curriculum and specialist faculty, this oncology fellowship course helps doctors strengthen their oncology skills and add focused training to their professional profile.",
  },
  "fellowship-in-critical-care": {
    title: "Fellowship in Critical Care | 12-Month Program for Doctors",
    description:
      "Explore the Fellowship in Critical Care with a 12-month program, online learning, recorded lectures, updated curriculum and 1-year mentorship for doctors.",
    overview:
      "The Fellowship in Critical Care Medicine is a 12-month programme for doctors who want focused training in critical and intensive care. This critical care fellowship combines structured learning with practical clinical training to help doctors manage critically ill patients with greater confidence. The curriculum covers airway management, mechanical ventilation, sepsis, shock, hemodynamic monitoring, organ support, emergency care and critical care ultrasound. Doctors can strengthen clinical decision-making through focused study, guided training and practical exposure. The fellowship in critical care medicine also gives doctors access to experienced faculty and ongoing mentorship throughout the programme. With a focused curriculum and flexible learning options, this critical care medicine fellowship helps doctors build advanced skills for critical care and intensive care practice.",
  },
  "fellowship-in-gastroenterology": {
    title: "Fellowship in Gastroenterology | 12 Months + CPD Certificate",
    description:
      "Advance your expertise with a 12-month Fellowship in Gastroenterology featuring CPD certification, recorded lectures, study material and 1-year mentorship.",
    overview:
      "Medical Global Academy’s Fellowship in Gastroenterology is designed for doctors who want focused training in gastroenterology. This online fellowship in gastroenterology combines structured learning with a practical, case-focused approach. The curriculum covers core gastroenterology, hepatology, gastrointestinal endoscopy, IBD, liver disorders, pancreatobiliary conditions, and GI imaging. Doctors can learn through flexible online sessions, recorded lectures, study resources, Q&A support, and mentorship. The fellowship in gastroenterology in India helps doctors build focused specialty knowledge alongside clinical practice. It suits eligible doctors seeking a gastroenterology fellowship after MBBS or advanced learning after postgraduate training. The 12-month program provides a structured learning pathway for medical professionals who want focused, flexible, and specialty-based gastroenterology training.",
  },
  "fellowship-in-neuro-oncology": {
    title: "Fellowship in Neuro Oncology Online India",
    description:
      "Learn online Fellowship in Neuro Oncology in India. Master brain tumor diagnosis, neuroimaging & stereotactic radiosurgery. UK CPD accredited, 12 months.",
    overview:
      "Medical Global Academy’s Fellowship in Neuro-Oncology offers focused training for doctors who want advanced knowledge in neuro-oncology and brain tumor care. This neuro oncology fellowship combines structured learning with clinical-focused training in brain and spinal tumors, neuroimaging, neuropathology, medical and radiation oncology, surgical neuro-oncology, pediatric neuro-oncology, and multidisciplinary cancer care. The program gives doctors a focused neuro-oncology training program with specialist guidance, study resources, Q&A support, assessments, and clinical exposure. As an online course for neuro oncology, it supports flexible learning while helping medical professionals build practical knowledge across key areas of neuro-oncology. The 12-month program also includes mentorship and structured learning support for doctors seeking focused professional development in neuro-oncology and cancer care.",
  },
  "fellowship-in-clinical-cardiology": {
    title: "Fellowship in Clinical Cardiology Online India",
    description:
      "Learn online Fellowship in Clinical Cardiology in India. Master ECG interpretation, heart failure & cardiac emergencies. UK CPD accredited, 12 months.",
    overview:
      "The Fellowship in Clinical Cardiology is designed for doctors who want structured training in cardiovascular medicine and stronger clinical skills. The program covers cardiovascular diagnosis, patient evaluation, treatment planning, and long-term management of common cardiac conditions. Doctors can develop skills in ECG interpretation, coronary artery disease, heart failure, arrhythmias, cardiovascular emergencies, and cardiac imaging. Learning includes live and recorded classes, clinical training, study material, e-library access, Q&A sessions, and guidance from experienced faculty. The fellowship also provides one year of academic mentorship to support continuous learning and professional development. With flexible study options, the program suits eligible MBBS and postgraduate doctors who want to strengthen their clinical cardiology expertise while continuing their medical practice and building confidence in patient care in practice.",
  },
  "fellowship-in-neonatology": {
    title: "Fellowship in Neonatology in India | Online 12-Month Course",
    description:
      "Advance neonatal care skills with a 12-month Fellowship in Neonatology, expert mentorship, case discussions, flexible online learning and easy EMI options.",
    overview:
      "The Fellowship in Neonatology is a course for doctors. It helps doctors build skills in newborn care. The course joins online study with clinical training. It gives a clear plan for steady skill growth. It suits doctors who want focused NICU training. Doctors learn key skills for newborn care. The course covers care for new and preterm babies. It also covers safe care in the NICU. Topics include neonatal care and resuscitation. Doctors also study newborn feeding and breathing care. The course covers common NICU needs. The online neonatology fellowship gives doctors a flexible study path. It lets doctors learn course topics at a steady pace. Clinical training links study with daily care. It helps doctors use key skills in care. The fellowship in neonatology keeps the course clear. It keeps each topic focused and easy to follow. The neonatology fellowship program builds clinical skills. It also builds NICU skills for daily care. Doctors can grow their skills with a clear plan.",
  },
  "fellowship-in-internal-medicine": {
    title: "Fellowship in Internal Medicine After MBBS | CPD & EMI",
    description:
      "Learn about Fellowship in Internal Medicine after MBBS with CPD-approved certification, EMI options, 12-month duration, eligibility and admission details.",
    overview:
      "The Fellowship in Internal Medicine is a focused course for MBBS doctors who want stronger skills in adult medicine. It suits doctors. They seek a clear path after MBBS. This internal medicine fellowship builds key skills. These skills help with daily case work. Doctors learn how to assess a case. They spot key signs. They read test results and plan care. They also build skill in diagnosis, patient management, and clinical decision-making. The course links these skills to real case needs. Doctors can use them each day. They help with care for adult patients. The fellowship in internal medicine after MBBS helps doctors review cases. It gives them a clear plan. It can help them choose the next step. They can plan care with sound judgement. Doctors gain a clear way to assess cases. They can plan care. They can manage common adult health needs. The course aims to build strong clinical skills. It helps doctors use them with more ease. This supports daily medical work.",
  },
  "fellowship-in-reproductive-medicine": {
    title: "Fellowship in Reproductive Medicine | 12-Month Program",
    description:
      "Join the Fellowship in Reproductive Medicine with CPD accreditation, EMI options, 12-month course, IVF & ART learning, expert faculty and mentorship.",
    overview:
      "The Fellowship in Reproductive Medicine is a 12-month hybrid programme for doctors seeking focused training in reproductive medicine, infertility care, and assisted reproductive technology (ART). The programme covers infertility evaluation, reproductive endocrinology, IVF, ICSI, embryo transfer, fertility preservation, reproductive genetics, recurrent pregnancy loss, and male and female infertility. It also includes reproductive surgery and a clinical attachment to support focused clinical exposure. This reproductive medicine fellowship combines structured learning with a flexible hybrid format for doctors who want advanced training in this field. Candidates can review the fellowship eligibility, duration, fees, and admission requirements before applying. The programme offers a focused learning path for doctors seeking a fellowship in reproductive medicine with academic and clinical components.",
  },
  "fellowship-in-interventional-radiology": {
    title: "Interventional Radiology Fellowship | 12-Month Course",
    description:
      "Learn about the Interventional Radiology Fellowship, a 12-month online course with CPD accreditation, expert faculty, LMS access and one-year mentorship.",
    overview:
      "The Interventional Radiology Fellowship at Medical Global Academy is a 12-month program for eligible radiologists who want advanced skills in image-guided interventions. It suits doctors seeking fellowship training with academic learning and practical clinical exposure. The program covers vascular and non-vascular interventions, interventional oncology, hepatobiliary procedures, neurointerventional work, trauma care, and endovascular techniques. Doctors learn through a structured curriculum, case-based learning, and clinical exposure that connects core concepts with real-world practice. The fellowship in interventional radiology also supports research and career development. Doctors considering an interventional radiology fellowship in India can review the program structure, eligibility, training approach, and admission requirements before applying. The course aims to strengthen clinical decision-making, procedural skills and confidence for further work in interventional radiology.",
  },
  "fellowship-in-pediatric-cardiology": {
    title: "Pediatric Cardiology Fellowship | 12-Month Online Course",
    description:
      "Explore about our Pediatric Cardiology Fellowship, a 12-month online course with expert mentorship, pediatric ECG, imaging, heart disease and interventions.",
    overview:
      "The Pediatric Cardiology Fellowship at Medical Global Academy is a 12-month program for eligible medical professionals seeking focused training in pediatric cardiac care. The program combines structured online learning, case-based education, expert mentorship, LMS access and CPD certification. Doctors study congenital and acquired heart disease, pediatric ECG, echocardiography, cardiac imaging, arrhythmias, heart failure, cardiomyopathies and pediatric cardiac interventions. The curriculum also covers neonatal cardiac care, complex congenital heart disease, pediatric electrophysiology and research. Doctors exploring a pediatric cardiology fellowship in India can review the program format, eligibility, curriculum, certification and admission requirements before applying. The program helps strengthen clinical knowledge, diagnostic understanding and confidence in pediatric cardiovascular care.",
  },
  "fellowship-in-cosmetic-surgery": {
    title: "Cosmetic Surgery Fellowship in India | 12 Months",
    description:
      "Explore a 12-month Cosmetic Surgery Fellowship with online learning, expert mentorship, recorded lectures, study material, and flexible payment options.",
    overview:
      "Medical Global Academy’s Cosmetic Surgery Fellowship helps doctors build skills in cosmetic and aesthetic care. It offers clear lessons, expert guidance, and case-based learning. Doctors learn about patient assessment, treatment planning, facial aesthetic procedures, body contouring, breast procedures, and safe post-care. The course also covers patient safety and complication management. Doctors can access recorded lectures and study material during the program. They also get Q&A support and expert mentorship. This cosmetic surgery training helps doctors improve their clinical skills and build confidence in aesthetic practice. If you are looking for a cosmetic surgery course in India, this program offers a flexible way to learn. The cosmetic surgery fellowship program supports doctors who want focused training and career growth in cosmetic and aesthetic practice. The program also helps doctors strengthen clinical knowledge and patient-focused decision-making.",
  },
  "fellowship-in-interventional-pain-management": {
    title: "Interventional Pain Management Fellowship | 12 Months",
    description:
      "Enroll a 12-month Fellowship in Interventional Pain Management with online classes, expert faculty, CPD approval and flexible EMI options designed for doctors.",
    overview:
      "The Fellowship in Interventional Pain Management offers structured, practice-focused training for doctors who want to develop advanced skills in pain assessment and interventional care. This 12-month interventional pain management fellowship combines academic learning with clinical exposure and practical training. Doctors learn to assess patients, plan suitable interventions, and apply image-guided techniques in clinical practice. The curriculum covers key areas such as nerve blocks, epidural injections, radiofrequency procedures, ultrasound-guided interventions, neuromodulation, and minimally invasive pain procedures. The fellowship in interventional pain management also strengthens clinical decision-making and patient-management skills. With focused training and practical exposure, this interventional pain fellowship helps doctors build confidence in modern pain intervention. The program provides a structured pathway for doctors seeking advanced training through an interventional pain management fellowship program in India.",
  },
  "fellowship-in-pain-management": {
    title: "Fellowship in Pain Management | 12-Month Online Program",
    description:
      "Join a 12-month Fellowship in Pain Management with online classes, recorded lectures, expert mentorship, free study material and flexible EMI options.",
    overview:
      "The Fellowship in Pain Management at Medical Global Academy is designed for doctors who want structured training in pain medicine and related clinical areas. This online pain management fellowship covers pain assessment, pharmacology, neuropathic pain, cancer pain, pediatric pain, palliative care, interventional approaches, regenerative medicine, neuromodulation, research, and multidisciplinary pain care. The 12-month fellowship in pain management gives doctors a clear learning pathway while they continue their professional work. For doctors seeking a pain management fellowship in India, the online format provides flexible access to the program curriculum. The program suits doctors looking for a focused pain management fellowship for doctors and broader learning across key areas of pain medicine. This fellowship in pain management provides a structured academic pathway for doctors who want to strengthen their knowledge in pain medicine.",
  },
  "fellowship-in-cosmetic-gynecology": {
    title: "Fellowship in Cosmetic Gynecology | 12-Month Program",
    description:
      "Explore a 12-month Fellowship in Cosmetic Gynecology with online learning, expert mentorship, recorded lectures, study material and flexible EMI options.",
    overview:
      "Medical Global Academy’s Cosmetic Gynecology Fellowship helps qualified doctors and gynecologists develop focused skills in cosmetic and aesthetic gynecology. The fellowship in cosmetic gynecology combines academic learning with practical clinical exposure to support confident clinical decision-making. The program suits medical professionals who want structured training and practical experience in this growing field. Doctors looking for a cosmetic gynecology fellowship in India can review the program structure, eligibility, duration, fees, and application process before enrollment. The training also supports professionals who want to expand their clinical expertise through focused learning in cosmetic and aesthetic gynecology. With a clear program structure and practical clinical approach, the fellowship gives doctors a focused path to develop relevant skills and advance their professional practice. It gives doctors a clear path for focused clinical training and professional growth.",
  },
  "fellowship-in-oral-surgery": {
    title: "Fellowship in Oral Surgery | 12-Month Course for Doctors",
    description:
      "Advance your skills with a 12-month Fellowship in Oral Surgery for doctors, with online learning, expert mentorship, CPD certification and EMI options",
    overview:
      "Medical Global Academy’s Fellowship in Oral Surgery is a 12-month course for doctors who want focused training in oral surgery. This oral surgery fellowship blends online study, clinical work, and expert support. Doctors can follow the course at a steady pace. The course covers key oral surgery skills, patient checks, tooth removal, impacted teeth, minor oral surgery, implants, trauma care, and pain control. Doctors can use these lessons to build a strong base for daily clinical work. The oral surgery fellowship program includes video lessons, study notes, library access, and Q&A support. These tools help doctors learn each topic with ease. The 12-month fellowship in oral surgery gives doctors a clear path to grow their skills. Clinical attachment adds practical work to the course. Online study gives doctors more choice in how they learn. Expert support helps them stay on track. This course suits doctors who want focused oral surgery training with study and clinical work.",
  },
  "fellowship-in-minimally-invasive-surgery": {
    title: "Fellowship in Minimally Invasive Surgery | 12-Month Course",
    description:
      "Explore a 12-month Fellowship in Minimally Invasive Surgery for doctors with expert mentorship, online learning, CPD certification and flexible EMI options",
    overview:
      "This Fellowship in Minimally Invasive Surgery is for doctors and surgeons. It helps them build skills in modern surgery. The course gives a clear plan for study and work. It covers key MIS skills in laparoscopy, endoscopy, and robotic care. Doctors learn how to check a case. They plan safe care. They learn key steps to take before and after surgery. The course has study notes, video lessons, library use, Q&A help, and expert guidance. It also has clinical training. This minimally invasive surgery training links study with clinical work. It helps doctors build a strong base in safe care. The course keeps each topic clear and easy to use. It lets doctors learn at a set pace. It can help them add new skills to their work. It keeps the focus on safe care. It supports sound work. It is made for doctors who want to grow their skill in modern surgery. The course gives a clear path from study to use in day-to-day care. It also gives them time to review key ideas and build skill with care.",
  },
  "fellowship-in-preventive-cardiology": {
    title: "Preventive Cardiology Fellowship | 12-Month Course",
    description:
      "Join a 12-month Preventive Cardiology Fellowship for doctors with online learning, expert faculty, 1-year mentorship, CPD certification and EMI options",
    overview:
      "The Fellowship in Preventive Cardiology is a 12-month program designed for medical professionals seeking advanced training in cardiovascular disease prevention and risk management. This preventive cardiology fellowship focuses on cardiovascular risk assessment, early identification of risk factors, lifestyle medicine, and evidence-based preventive care. The program covers key areas including hypertension, dyslipidemia, diabetes, obesity, nutrition, exercise, and other factors that influence cardiovascular health. Through hybrid learning, clinical attachment, and expert mentorship, participants can develop practical knowledge relevant to prevention-focused cardiovascular care. The fellowship in preventive cardiology also provides structured learning through Medical Global Academy, with CPD and ACTD-aligned certification supporting professional development. This preventive cardiology course is designed to strengthen clinically relevant knowledge and skills in preventive cardiovascular care.",
  },
  "fellowship-in-orthopedic": {
    title: "Fellowship in Orthopedics in India | 12-Month Course",
    description:
      "Explore a 12-month Fellowship in Orthopedics for doctors with expert mentorship, online learning, CPD-approved certification and flexible EMI options now.",
    overview:
      "Advance your expertise with the Fellowship in Orthopedics at Medical Global Academy. This 12-month orthopedic fellowship program is designed for doctors seeking focused training in orthopedic care. The course combines structured learning, clinical training, and expert mentorship to help you build relevant skills for your professional goals. You can explore key areas of orthopedic practice through a focused fellowship curriculum and a structured learning approach. The program gives doctors in India an opportunity to strengthen their orthopedic knowledge through dedicated fellowship training. Before you apply, review the eligibility criteria, curriculum, duration, study format, and fees to decide if the course fits your goals. If the program matches your professional background and learning needs, take the next step by submitting your application to Medical Global Academy and connecting with the admissions team for course and enrollment details.",
  },
  "fellowship-in-endocrinology": {
    title: "Fellowship in Endocrinology Online Course in India",
    description:
      "Join our Fellowship in Endocrinology. Learn online with expert faculty, live and recorded classes, flexible study and a 12-month course. Apply now.",
    overview:
      "Medical Global Academy offers a 12-month Fellowship in Endocrinology for doctors who want to grow their skills in endocrine care. This online course covers diabetes, thyroid health, obesity, and other hormone disorders. Learn from expert faculty through live classes, recorded lessons, and real case discussions. Study at your own pace while you continue your medical practice. Our course helps you build strong clinical knowledge and make better care decisions. You can choose online learning or ask our team about the hybrid option. We offer a clear course plan, flexible study, and support throughout your learning journey. Explore our online endocrinology fellowship in India and find a study plan that fits your goals. Check the course fees, entry rules, and next batch dates with our admissions team. Take the next step in your medical career with a course that fits your busy work life. Request your brochure and apply for the next batch today.",
  },
  "fellowship-in-pathology": {
    title: "Fellowship in Pathology | Online 12-Month Fellowship",
    description:
      "Join a Fellowship in Pathology with 12-month online learning, expert faculty, practical exposure, free study material and 1-year mentorship.",
    overview:
      "Medical Global Academy’s Fellowship in Pathology is designed for doctors seeking focused postgraduate-level learning and professional development in pathology. This fellowship in pathology in India offers a structured programme to help medical professionals strengthen their pathology knowledge and develop relevant skills for professional practice. Available through online and hybrid learning modes, the programme provides flexibility for doctors who want to continue professional development alongside their existing commitments. This pathology fellowship offers a focused learning pathway aligned with doctors’ academic and professional goals. Doctors comparing an online pathology fellowship in India can review the curriculum, eligibility, programme format and academic support to assess its suitability. If you are considering a pathology fellowship India programme, an online fellowship in pathology, or a fellowship after MD Pathology, explore the course details and submit the enquiry form to discuss your requirements with Medical Global Academy.",
  },
  "fellowship-in-robotic-surgery": {
    title: "Robotic Surgery Fellowship in India | 12 Months",
    description:
      "Explore a robotic surgery fellowship with a 12-month programme for doctors. Learn online with expert faculty, case-based learning and 1-year mentorship.",
    overview:
      "The Robotic Surgery Fellowship at Medical Global Academy helps surgeons and qualified medical professionals build advanced knowledge in robotic-assisted surgery. This fellowship in robotic surgery covers robotic surgical systems, surgical planning, clinical workflows, patient selection, minimally invasive techniques, and patient safety. The robotic surgery fellowship programme gives learners a structured path to understand modern robotic surgery and its role in clinical practice. The curriculum focuses on practical clinical concepts, current surgical technology, and evidence-based decision-making. Expert-led learning and focused case discussions help participants connect key concepts with real-world surgical practice. Designed for a global medical audience, this robotic surgery fellowship training supports professionals who want to strengthen their knowledge and develop relevant skills in a fast-evolving field. The programme also helps surgeons explore the clinical applications of robotic-assisted surgery with greater confidence.",
  },
  "fellowship-in-ophthalmology": {
    title: "Online Fellowship in Ophthalmology for MBBS Doctors",
    description:
      "Online Fellowship in Ophthalmology for MBBS doctors. 12-month hybrid training, CPD UK certification, EMI available. Check eligibility, fees & curriculum.",
    overview:
      "The Fellowship in Ophthalmology at Medical Global Academy helps doctors build advanced knowledge and stronger decision-making skills in modern eye care. This 12-month ophthalmology fellowship offers structured online learning across cataract, retina, glaucoma, pediatric ophthalmology, uveitis, ocular oncology, oculoplastic surgery, and ophthalmic imaging. The online fellowship in ophthalmology gives eligible medical professionals a flexible way to continue learning alongside clinical practice or training. The program focuses on case-based learning, key clinical concepts, and professional development. It suits doctors and ophthalmology professionals who want to strengthen their knowledge through a flexible online format. The fellowship includes CPD UK and ACTD-aligned certification, giving learners a professional credential to add to their profile after successful completion.",
  },
  "fellowship-in-urology": {
    title: "Fellowship in Urology in India | 12-Month Programme",
    description:
      "Join a 12-month Fellowship in Urology in India with expert-led learning, live & recorded sessions, Online or Hybrid options, and a fellowship certificate.",
    overview:
      "The Fellowship in Urology at Medical Global Academy is a structured urology fellowship program designed for doctors seeking focused training and practical exposure in urological practice. The programme combines academic learning, clinical training, expert faculty guidance and structured mentorship to help eligible medical professionals develop specialty-focused skills and strengthen their clinical knowledge. This Fellowship in Urology is suitable for doctors looking to enhance their professional capabilities through focused urology fellowship training. The programme offers flexible learning options designed to support practising doctors, with opportunities for practical clinical learning through the applicable training format. International doctors can explore the international urology fellowship pathway subject to the programme’s eligibility and admission requirements. Candidates can review the curriculum, eligibility, study mode, certification and enrolment details to determine whether this urology fellowship program aligns with their professional goals.",
  },
  "fellowship-in-maxillofacial-surgery": {
    title: "Fellowship in Maxillofacial Surgery | 12-Month Course",
    description:
      "Explore MGA’s Fellowship in Maxillofacial Surgery with 12-month learning, online classes, recorded lectures, LMS access, Q&A and 1-year expert mentorship.",
    overview:
      "The Fellowship in Maxillofacial Surgery is designed for qualified dental and medical professionals seeking focused postgraduate-level training in maxillofacial surgery. This maxillofacial surgery fellowship helps participants strengthen their specialist knowledge and build a clearer understanding of key concepts in maxillofacial practice. The program is suited to professionals who want to advance their knowledge, improve their clinical understanding, and develop greater confidence in their specialist field. With a structured learning approach, this maxillofacial fellowship supports focused professional development in an important area of surgical practice. It can also suit professionals exploring an international fellowship in maxillofacial surgery as part of their career development. The fellowship provides a focused pathway for professionals looking to deepen their understanding of maxillofacial surgery and progress their specialist expertise.",
  },
  "fellowship-in-neuroradiology": {
    title: "Online Neuroradiology Fellowship | 12-Month CPD Course",
    description:
      "Join MGA’s Online Neuroradiology Fellowship with 12-month learning, CPD certification, expert mentorship, recorded lectures, LMS access and advanced imaging.",
    overview:
      "Medical Global Academy’s Fellowship in Neuroradiology is a 12-month hybrid programme combining online academic learning with clinical attachment for eligible medical professionals seeking focused training in neuroimaging. The programme develops practical knowledge across brain, spine, and head & neck imaging, with training in MRI, CT, advanced imaging techniques, imaging protocols, and structured reporting. Participants also explore neurovascular imaging, neuro-oncology, pediatric neuroradiology, neurodegenerative disorders, and emergency imaging through case-based learning and clinical discussions. Expert neuroradiologists and imaging specialists support the learning experience, helping participants connect imaging principles with real clinical cases and reporting approaches. The programme includes flexible online learning alongside clinical exposure, creating a structured pathway for professionals who want to develop specialised skills in contemporary neuroradiology while continuing their professional commitments.",
  },
  "fellowship-in-endoscopy": {
    title: "Fellowship in Endoscopy | Online Program for Doctors",
    description:
      "Join a 12-month fellowship in endoscopy for doctors with online learning, super-specialist faculty, CPD-accredited certification and 1-year mentorship.",
    overview:
      "Medical Global Academy’s Fellowship in Endoscopy helps eligible doctors build focused skills in gastrointestinal endoscopy through structured learning and clinical exposure. This 12-month endoscopy fellowship supports doctors who want to strengthen procedural knowledge, clinical judgment, and confidence in GI endoscopy. The fellowship in gastrointestinal endoscopy covers core endoscopic practice and supports focused training in endoscopy and colonoscopy where included in the programme curriculum. Doctors looking for an endoscopy fellowship in India can follow a structured learning path with guidance from experienced faculty and access to course resources. The programme also suits surgeons seeking focused endoscopy training to expand their clinical skill set. With a clear curriculum and practical learning approach, the fellowship helps eligible medical professionals build relevant endoscopy skills while continuing their professional development.",
  },
  "fellowship-in-echocardiography": {
    title: "Fellowship in Echocardiography for Doctors | 12-Month",
    description:
      "Join a 12-month fellowship in echocardiography for doctors with TTE, TEE, Doppler, online learning, mentorship, CPD certification and flexible EMI options.",
    overview:
      "The Fellowship in Echocardiography at Medical Global Academy is a 12-month programme for eligible medical professionals seeking to develop their knowledge of cardiac imaging and echocardiographic assessment. Review the official curriculum and learning outcomes before enrolment. MGA lists online, hybrid, and offline study options across its echocardiography programmes; confirm which formats are available for this fellowship and whether practical clinical training is included. MGA lists CPD and ACTD-aligned certification options. Applicants should verify the exact certificate issued, the organisations associated with each credential, and the scope of the relevant accreditation before applying. Before enrolment, confirm eligibility, current fees, batch dates, mentorship arrangements, and any in-person attendance requirements with the admissions team. Review the programme details to choose the study and certificate option that matches your professional development goals.",
  },
  "fellowship-in-hematology": {
    title: "Fellowship in Hematology | 12-Month Medical Course",
    description:
      "Learn about the 12-month Fellowship in Hematology, including eligibility, curriculum, clinical topics, study format, faculty support and certificate options.",
    overview:
      "Medical Global Academy offers a 12-month Fellowship in Hematology for medical practitioners seeking specialised professional training. This hematology fellowship in India is available in online and hybrid modes, allowing applicants to choose the study format that suits their needs. The programme includes CPD and ACTD accreditation, as confirmed by the academy. Prospective applicants can contact the admissions team to check eligibility, required documents, current course fees, payment options and upcoming intake dates. Doctors considering a Fellowship in Hematology can also confirm the requirements for their preferred study mode and request details about the enrolment process. Before registering, applicants should verify the applicable accreditation documentation, programme terms and any mode-specific requirements directly with Medical Global Academy. Contact the academy to discuss the available options and begin your application for the next intake, including any registration deadlines.",
  },
  "fellowship-in-otology": {
    title: "Fellowship in Otology | 12-Month Otology Fellowship",
    description:
      "Join a 12-month Fellowship in Otology with online learning, free study material, recorded lectures, Q&A sessions, library access and mentorship.",
    overview:
      "Medical Global Academy offers a 12-month Fellowship in Otology for medical practitioners seeking specialised professional training. This otology fellowship in India is available in online and hybrid modes, allowing applicants to choose the study format that suits their needs. The programme includes CPD and ACTD accreditation, as confirmed by the academy. Prospective applicants can contact the admissions team to check eligibility, required documents, current course fees, payment options and upcoming intake dates. Doctors considering a Fellowship in Otology can also confirm the requirements for their preferred study mode and request details about the enrolment process. Before registering, applicants should verify the applicable accreditation documentation, programme terms and any mode-specific requirements directly with Medical Global Academy. Contact the academy to discuss the available options and begin your application for the next intake, including any registration deadlines.",
  },
  "fellowship-in-laparoscopy": {
    title: "Fellowship in Laparoscopy | 12-Month Program for Doctors",
    description:
      "Build skills with a 12-month fellowship in laparoscopy for doctors, expert mentorship, flexible financing and structured learning with CPD certification.",
    overview:
      "The Fellowship in Laparoscopy at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their laparoscopic surgery knowledge. The program covers laparoscopy foundations, surgical equipment, safe access, suturing, knot-tying, and advanced laparoscopic procedures. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-critical-care": {
    title: "Pediatric Critical Care Fellowship | 12-Month Program",
    description:
      "Join a 12-month pediatric critical care fellowship for doctors with online learning, PICU case discussions, expert mentorship and CPD certification today.",
    overview:
      "The Pediatric Critical Care Fellowship at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their pediatric critical care knowledge. The program covers PICU case management, pediatric emergencies, and critical care principles. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-dermatopathology": {
    title: "Dermatopathology Fellowship | 12-Month Online Program",
    description:
      "Join a 12-month dermatopathology fellowship for doctors with online learning, case discussions, expert mentorship, flexible payments and CPD certification.",
    overview:
      "The Dermatopathology Fellowship at Medical Global Academy is a 12-month programme for eligible doctors seeking advanced training in skin pathology and histopathological interpretation. This 24-module fellowship covers inflammatory and autoimmune skin diseases, cutaneous infections, melanocytic pathology, skin tumours, and advanced diagnostic techniques. Doctors can choose between online and hybrid programme options, subject to the confirmed delivery arrangements. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-anorectal-and-laser-proctology": {
    title: "Fellowship in Laser Proctology | Online 12-Month Course",
    description:
      "Explore our 12-month Fellowship in Laser Proctology with online learning, clinical exposure and expert mentorship for doctors, plus course support now.",
    overview:
      "The Fellowship in Anorectal and Laser Proctology at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their proctology knowledge. The program covers laser proctology, endoscopic procedures, and minimally invasive management of hemorrhoids, fistulas, and fissures. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-oncopathology": {
    title: "Fellowship in Oncopathology in India | 12-Month Course",
    description:
      "Join a 12-month Fellowship in Oncopathology with CPD certification, expert guidance, recorded lectures and LMS access for doctors for focused career growth.",
    overview:
      "The Fellowship in Oncopathology at Medical Global Academy (MGA) is a 12-month online programme for medical professionals seeking to strengthen their knowledge of cancer pathology and diagnostic oncology. This oncopathology fellowship covers tumour biology, histopathology, immunohistochemistry (IHC), molecular pathology, tumour grading and staging, cancer biomarkers, cancer genomics and precision oncology. The curriculum introduces diagnostic techniques such as polymerase chain reaction (PCR), fluorescence in situ hybridisation (FISH) and next-generation sequencing (NGS), alongside digital pathology and tumour-specific pathology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-musculoskeletal-ultrasound": {
    title: "Fellowship in Musculoskeletal Ultrasound for Doctors",
    description:
      "Join a 12-month Fellowship in Musculoskeletal Ultrasound with online learning, super-specialist faculty, CPD accreditation, LMS access and 1-year mentorship.",
    overview:
      "Explore the Fellowship in Musculoskeletal Ultrasound at Medical Global Academy, a 12-month programme for eligible doctors seeking an MSK ultrasound fellowship. Applicants must hold an MBBS degree or higher medical qualification, valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. The programme is open to eligible doctors practising in India and internationally. Choose from the available online and hybrid learning modes, and review the course curriculum, assessment process, fees, certification details and enrolment requirements before applying. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-family-medicine": {
    title: "Fellowship in Family Medicine Online | 12-Month Program",
    description:
      "Enroll a 12-month online fellowship in family medicine for doctors with expert faculty, 1-year mentorship, flexible payment options and recorded lectures.",
    overview:
      "Medical Global Academy’s Fellowship in Family Medicine is designed for MBBS-qualified doctors seeking advanced training in comprehensive primary care. This 12-month family medicine fellowship combines flexible online learning with hybrid modules and clinical workshops featuring real-life primary care case simulations. The curriculum includes advanced diagnostic skills, chronic disease management, paediatric and geriatric care, women’s health, emergency management and evidence-based medicine. Self-paced learning and guidance from family medicine physicians and primary care experts support structured study across key clinical topics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-thoracic-surgery": {
    title: "Thoracic Surgery Fellowship | 12-Month Online Programme",
    description:
      "Join a 12-month thoracic surgery fellowship with online learning, super-specialist faculty and one-year mentorship for doctors seeking focused expertise.",
    overview:
      "Medical Global Academy offers a 12-month Thoracic Surgery Fellowship for MBBS and higher-degree doctors seeking structured learning in thoracic surgical care. The fellowship's curriculum covers thoracic surgical anatomy, imaging and diagnostics, minimally invasive techniques, lung cancer surgery, airway reconstruction, pleural and chest wall surgery, thoracic trauma, postoperative care and thoracic oncology. Case-based learning and expert mentorship support clinical reasoning and decision-making. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-echocardiography": {
    title: "Pediatric Echocardiography Course | 12-Month Fellowship",
    description:
      "Join a 12-month pediatric echocardiography course with online training, expert faculty, case discussions, LMS access, mentorship and CPD certification.",
    overview:
      "Medical Global Academy’s Fellowship in Pediatric Echocardiography is a 12-month programme for doctors seeking training in pediatric cardiac imaging. This pediatric echocardiography course covers cardiovascular anatomy, advanced echocardiography and Doppler techniques, congenital and acquired heart disease, heart failure, and pediatric cardiac care. The curriculum also explores pulmonary hypertension and cardiac imaging for pediatric surgery and interventions. Doctors can choose online or hybrid learning, with self-paced modules, clinical workshops, case studies, and faculty guidance. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatrics-dermatology": {
    title: "Pediatric Dermatology Fellowship | 12-Month Online Course",
    description:
      "Join a pediatric dermatology fellowship with live classes, recorded lectures, expert faculty, LMS access, 1-year mentorship and CPD certification for doctors.",
    overview:
      "The Pediatric Dermatology Fellowship at Medical Global Academy (MGA) is a 12-month program for eligible doctors seeking structured pediatric dermatology training. It combines self-paced learning with online and hybrid modules, pediatric skin case simulation workshops, and a curriculum covering pediatric skin disorders. Participants learn from pediatric dermatologists and child skin care experts, with clinical training through partner hospitals and dermatology centers subject to program arrangements. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pedodontist": {
    title: "Fellowship in Pediatric Dentistry Course | India",
    description:
      "Join a Fellowship in Pediatric Dentistry with hybrid learning, clinical attachment, expert faculty, recordings, mentorship, and flexible payment options.",
    overview:
      "The 12-month Fellowship in Pediatric Dentistry at Medical Global Academy is designed for BDS-qualified dental professionals seeking focused training in pediatric dental care. This pediatric dentistry fellowship covers clinical diagnosis and treatment planning, preventive and interceptive orthodontics, restorative dentistry for children, oral surgery and trauma, dental emergencies, radiology, and special care dentistry. The programme features self-paced online and hybrid learning, case-based clinical workshops, and teaching from pediatric dentistry professionals. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-head-neck-surgery": {
    title: "Fellowship in Head & Neck Surgery | 12-Month Program",
    description:
      "Build advanced skills with a 12-month Fellowship in Head & Neck Surgery, online learning, super-specialist faculty, study material and 1-year mentorship.",
    overview:
      "The Fellowship in Head and Neck Surgery is a comprehensive 12-month programme for doctors seeking advanced learning in head and neck surgical care. This head and neck surgery fellowship offers online and hybrid learning options, with a curriculum covering head and neck oncology, diagnostic imaging, reconstructive surgery and minimally invasive approaches. Programme highlights include surgical workshops with real patient case studies, clinical training through partnerships with head and neck surgery centres and hospitals, and teaching from experienced head and neck surgeons and ENT specialists. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-hospital-management": {
    title: "Fellowship in Hospital Management | Online Programme",
    description:
      "Join a 12-month Fellowship in Hospital Management with online learning, super-specialist faculty, study material, Q&A sessions and 1-year mentorship.",
    overview:
      "The Fellowship in Hospital Management at Medical Global Academy is a professional skill-development program designed for doctors and healthcare administrators who want to strengthen their hospital management knowledge. The program covers healthcare leadership, hospital finance and operations, healthcare quality and patient safety, and hospital management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-paediatric-endocrinology": {
    title: "Fellowship in Pediatric Endocrinology | 12-Month Program",
    description:
      "Join a 12-month fellowship in pediatric endocrinology with online learning, clinical attachment, expert mentorship and flexible EMI options for doctors.",
    overview:
      "Medical Global Academy’s Fellowship in Paediatric Endocrinology offers eligible doctors a comprehensive 12-month programme with flexible online and hybrid study options. Explore a curriculum covering paediatric endocrinology, clinical workshops with real case studies, and learning opportunities with paediatric endocrinologists and hormonal health experts. The hybrid option combines online modules with clinical training through hospital partnerships, subject to programme requirements. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-orthopedic-oncology": {
    title: "Orthopedic Oncology Fellowship | 12-Month Programme",
    description:
      "Join MGA’s orthopedic oncology fellowship for doctors. Learn tumor staging, biopsy, limb salvage and reconstruction with expert faculty and 1-year mentorship.",
    overview:
      "Medical Global Academy’s 12-month Orthopedic Oncology Fellowship is designed for eligible doctors. The 17-module curriculum covers imaging, tumor resection, soft-tissue tumors, pediatric oncology, metastatic bone disease, pathology, reconstruction, rehabilitation and systemic therapy. Choose self-paced online learning or a hybrid option featuring clinical workshops and real case studies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-endourology": {
    title: "Endourology Fellowship | Online 12-Month Programme",
    description:
      "Join a 12-month Endourology Fellowship with online learning, super-specialist faculty, 1-year mentorship, CPD accreditation and flexible payment for doctors.",
    overview:
      "Medical Global Academy (MGA) offers a 12-month endourology fellowship for eligible doctors seeking focused training in modern endourological techniques. The curriculum covers ureteroscopy, laser lithotripsy, percutaneous nephrolithotomy (PCNL), and endoscopic management of benign prostatic hyperplasia (BPH). It also includes modules on advanced endourologic procedures, functional urology, robotic surgery, research, and pediatric endourology. The programme features expert mentorship, case-based learning, diagnostic training, and workshops to support clinical decision-making. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-robotic-surgery": {
    title: "Pediatric Robotic Surgery Fellowship | 12-Month Program",
    description:
      "Enroll a 12-month Pediatric Robotic Surgery Fellowship with online learning, clinical attachment, super-specialist faculty, 1-year mentorship and EMI plans.",
    overview:
      "Medical Global Academy’s Fellowship in Pediatric Robotic Surgery is a comprehensive 12-month program designed for eligible doctors seeking specialized training in pediatric robotic surgery. The program features a 24-module curriculum covering robotic platforms, simulation-based training, pediatric surgical anatomy, port planning and advanced subspecialty applications. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-laparoscopic-hernia-surgery": {
    title: "Fellowship in Laparoscopic Hernia Surgery for Doctors",
    description:
      "Join a 12-month hernia fellowship for doctors with online learning, expert faculty, case-based study and 1-year mentorship in laparoscopic hernia surgery.",
    overview:
      "Medical Global Academy’s Fellowship in Laparoscopic Hernia Surgery is a 12-month programme for doctors seeking structured learning in laparoscopic hernia surgery. Its 20-module curriculum covers surgical anatomy and radiology, groin and ventral hernia repair, mesh technology, simulation, complications and emerging techniques. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-neurology": {
    title: "Pediatric Neurology Fellowship | 12-Month Programme",
    description:
      "Join a 12-month pediatric neurology fellowship with online learning, super-specialist faculty, 1-year mentorship, CPD certification and structured study.",
    overview:
      "Medical Global Academy’s Fellowship in Pediatric Neurology is a 12-month programme for eligible doctors pursuing focused training. Its 24-module curriculum spans neurodevelopment, neurogenetics, epilepsy, EEG, neonatal neurology, neuromuscular disorders, neuroimaging, neuroimmunology, neurocritical care, neurorehabilitation and AI in pediatric neurology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-addiction-medicine": {
    title: "Fellowship in Addiction Medicine | CPD Accredited",
    description:
      "Join the Fellowship in Addiction Medicine for doctors. Gain CPD-accredited training with flexible learning, expert faculty and practical clinical skills.",
    overview:
      "Medical Global Academy’s Fellowship in Addiction Medicine is a 12-month programme for doctors with an MBBS degree, valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. The 14-module curriculum covers addiction assessment and diagnosis, pharmacological and psychosocial interventions, integrated care, neuroscience, harm reduction, research, and a clinical rotation with a capstone project. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-emergency-medicine": {
    title: "Fellowship in Emergency Medicine | Online Certification",
    description:
      "Join the 1-Year Fellowship in Emergency Medicine with case-based learning, expert mentorship, recorded lectures & flexible schedule.",
    overview:
      "Medical Global Academy’s Fellowship in Emergency Medicine is a 12-month programme for qualified doctors seeking focused learning in emergency assessment, resuscitation and acute care. Topics include triage, life support, airway management, cardiovascular emergencies, trauma, neurological conditions, pediatric and neonatal emergencies, and obstetric and gynecological emergencies. Its 24-module curriculum covers cardiac arrest, ventilatory support, shock and sepsis, emergency imaging, toxicology, disaster medicine and patient safety. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-arthroplasty": {
    title: "Arthroplasty Fellowship — Joint Replacement Course in India",
    description:
      "Join MGA's 12-month Fellowship in Arthroplasty. Learn concepts of hip, knee & shoulder replacement, robotic surgery & revision arthroplasty online.",
    overview:
      "Medical Global Academy’s Fellowship in Arthroplasty is a 12-month programme for doctors seeking learning in joint replacement and reconstruction. Its 24 modules cover primary and revision hip and knee arthroplasty, digital preoperative planning, robotic-assisted techniques, complex reconstruction and rehabilitation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-molecular-pathology": {
    title: "Molecular Pathology Fellowship in India | 12-Month Course",
    description:
      "Join a Molecular Pathology Fellowship with live classes, clinical training, expert faculty, study material and 1-year mentorship for doctors.",
    overview:
      "The Molecular Pathology Fellowship at Medical Global Academy is a 12-month programme for doctors seeking to advance their knowledge of molecular diagnostics, genetic testing and precision medicine. The programme’s listed curriculum spans advanced molecular biology, human genomics, molecular genetics, molecular diagnostic technologies, next-generation sequencing (NGS), molecular oncology, infectious disease diagnostics, bioinformatics, variant interpretation, biomarkers and laboratory quality management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-embryology": {
    title: "Fellowship in Embryology | 12-Month Clinical Programme",
    description:
      "Join a 12-month Fellowship in Embryology with expert mentorship. Learn IVF, ICSI, embryo culture, cryopreservation, reproductive genetics and modern ART.",
    overview:
      "The Fellowship in Embryology at Medical Global Academy is a 12-month programme for eligible medical doctors seeking advanced knowledge in clinical embryology and assisted reproductive technologies (ART). The curriculum comprises 12 modules covering fundamentals of embryology, ART, reproductive genetics and genomics, cryobiology, cryopreservation, reproductive endocrinology, male infertility and advanced micromanipulation techniques. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-thoracic-oncology": {
    title: "Thoracic Oncology Fellowship | 12-Month Online Program",
    description:
      "Build thoracic oncology expertise through a 12-month fellowship with live classes, specialist faculty, 1-year mentorship, CPD certification and 11+ modules.",
    overview:
      "The Fellowship in Thoracic Oncology at Medical Global Academy is a comprehensive 12-month program for eligible doctors seeking specialised training in thoracic malignancies. Its 11-module curriculum covers diagnostic evaluation, treatment modalities, precision medicine, immuno-oncology, thoracic imaging, multidisciplinary tumour boards, surgical innovations, radiation oncology and clinical research. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pulmonology-medicine": {
    title: "Fellowship in Pulmonology | Advanced Respiratory Care",
    description:
      "Fellowship in Pulmonology covers diagnosis & management of respiratory disorders, pulmonary concepts & patient care approach through online learning.",
    overview:
      "Medical Global Academy’s Fellowship in Pulmonology Medicine is a 12-month program for doctors seeking advanced training in respiratory medicine. Its 14-module curriculum covers clinical pulmonary medicine, chronic respiratory diseases, pulmonary vascular diseases, critical care, diagnostics, and pulmonary oncology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-neonatal-echocardiography": {
    title: "Fellowship in Neonatal Echocardiography | Online Course",
    description:
      "Learn concepts of neonatal echocardiography, functional cardiac assessment & hemodynamic monitoring for evidence-based neonatal care.",
    overview:
      "Medical Global Academy’s Fellowship in Neonatal Echocardiography is a 12-month programme designed for eligible doctors seeking specialised training in neonatal cardiac imaging. This neonatal echocardiography course combines a comprehensive 28-module curriculum with flexible, self-paced online or hybrid learning options and clinical workshops featuring real NICU case studies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-cardiac-surgery": {
    title: "Fellowship in Cardiac Surgery | 12-Month Online Program",
    description:
      "Join a 12-month online cardiac surgery fellowship with live classes, recorded lectures, expert faculty, mentorship, study resources and CPD certification.",
    overview:
      "Medical Global Academy’s Fellowship in Cardiac Surgery is a 12-month programme for eligible doctors seeking structured learning in cardiac surgery. Its 24-module curriculum covers cardiac imaging, preoperative assessment, coronary artery bypass grafting (CABG), valve and aortic surgery, structural heart interventions, heart failure, ECMO, congenital cardiac surgery, minimally invasive and robotic techniques, cardiac anaesthesia, critical care, and surgical research. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-oral-oncology": {
    title: "Oral Oncology Fellowship | Eligibility & Course Details",
    description:
      "Join the Oral Oncology Fellowship with CPD UK accreditation, expert-led learning, flexible online study, practical case training and global career focus.",
    overview:
      "Medical Global Academy’s Oral Oncology Fellowship is a 12-month programme for MBBS-qualified doctors seeking training in clinical oncology, oral surgery and reconstructive techniques. Its 24-module curriculum covers prevention and early detection, clinical assessment, imaging, diagnostics, staging, oncologic surgery, reconstruction, radiotherapy, systemic therapy and multidisciplinary care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-arthroscopy-and-sports-medicine": {
    title: "Fellowship in Arthroscopy & Sports Medicine | Course",
    description:
      "Advance your orthopedic career with our Online Fellowship in Arthroscopy & Sports Medicine. Learn joint surgery and sports injury management concepts.",
    overview:
      "Medical Global Academy’s Fellowship in Arthroscopy and Sports Medicine is a 12-month program for eligible doctors seeking learning in arthroscopy and sports injury care. Its 24-module curriculum covers injury assessment, diagnosis, imaging, arthroscopy equipment, knee and shoulder procedures, joint preservation, rehabilitation, injury prevention, sports emergencies and emerging technologies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-aesthetic-dermatology": {
    title: "Fellowship in Aesthetic Dermatology – Skill Up Now",
    description:
      "Fellowship in Aesthetic Dermatology for MBBS doctors – gain expertise in facial aesthetics, laser treatments, injectables & skin rejuvenation techniques.",
    overview:
      "Medical Global Academy’s Fellowship in Aesthetic Dermatology is a 12-month programme for MBBS-qualified doctors with valid NMC or State Medical Council registration and at least one year of clinical experience after qualification. This aesthetic dermatology fellowship offers online and hybrid study options, clinical workshops using dermatology case simulations, and learning support from dermatologists and skin-care experts. Its 24-module curriculum covers facial anatomy, aesthetic assessment, skin biology, treatment planning, cosmeceuticals, chemical peels, botulinum toxin, dermal fillers, laser procedures, regenerative aesthetics, hair and body treatments, and patient safety. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-genetics-and-metabolism": {
    title: "Pediatric Genetics Fellowship | Course, Fees & Duration",
    description:
      "Pediatric genetics fellowship with 12-month hybrid learning, clinical training, 1-year mentorship, NAAC A+ and CPD UK certification for doctors. Enrol now.",
    overview:
      "The Fellowship in Pediatric Genetics and Metabolism at Medical Global Academy is a 12-month programme for doctors seeking advanced learning in pediatric genetics and metabolic medicine. This pediatric genetics fellowship covers genomic medicine, genetic assessment, diagnostic testing, variant interpretation, genetic counselling, newborn screening, and inborn errors of metabolism. Across 24 modules, learners explore inherited metabolic disorders, genetic syndromes, precision diagnostics, and emerging therapies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-ophthalmology-strabismus": {
    title: "Fellowship in Pediatric Ophthalmology – Enroll Now",
    description:
      "Fellowship in Pediatric Ophthalmology for MBBS doctors – learn to diagnose & manage childhood eye disorders including strabismus with case-based training.",
    overview:
      "Medical Global Academy’s pediatric ophthalmology fellowship is a 12-month program for eligible doctors seeking training in pediatric ophthalmology and strabismus. The 24-module curriculum covers pediatric eye examination, visual development, refraction, amblyopia, strabismus, pediatric cataract, and congenital eye disorders. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-nutrition-and-dietetics": {
    title: "Fellowship in Clinical Nutrition | Eligibility & Fees",
    description:
      "Join our 12-month Fellowship in Clinical Nutrition with online learning, expert faculty, study material and one-year mentorship for doctors.",
    overview:
      "The Fellowship in Nutrition and Dietetics at Medical Global Academy is a 12-month advanced programme designed for doctors seeking specialised training in clinical nutrition. This fellowship in clinical nutrition combines flexible online learning, clinical workshops and real-world nutrition and diet planning case studies. Its 24-module curriculum covers advanced nutrition science, metabolism, nutritional assessment, precision dietary planning, nutrigenomics and medical nutrition therapy, alongside specialist areas such as diabetes, obesity, cardiovascular health, renal nutrition, oncology, critical care, maternal and pediatric nutrition, and healthy ageing. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-laparoscopic-surgery": {
    title: "Fellowship in Laparoscopic Surgery for MBBS/MS",
    description:
      "Fellowship in General Laparoscopic Surgery for MBBS/MS doctors – learn lap cholecystectomy, hernia repair & minimally invasive abdominal surgery online.",
    overview:
      "Medical Global Academy’s Fellowship in Laparoscopic Surgery is a 12-month programme for eligible doctors seeking to strengthen their knowledge of minimally invasive surgery. The 24-module curriculum covers laparoscopic foundations, surgical equipment, safe access, pneumoperitoneum, ergonomics, suturing, knot-tying, and advanced surgical specialties. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-neurology": {
    title: "Fellowship in Clinical Neurology for MBBS/MD",
    description:
      "Fellowship in Clinical Neurology – a 12-month online course for MBBS & MD doctors covering stroke, epilepsy, EEG & neuroimaging case-based learning.",
    overview:
      "Medical Global Academy’s Fellowship in Neurology is a 12-month programme for eligible doctors seeking structured learning. The programme highlights flexible, self-paced online and hybrid study, clinical workshops using real case studies, and learning from neurology and brain-health experts. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-gastrointestinal-oncology": {
    title: "Fellowship in Gastrointestinal Oncology Course",
    description:
      "Fellowship in Gastrointestinal Oncology – gain advanced expertise in GI cancer diagnosis, treatment planning & multidisciplinary oncology case learning.",
    overview:
      "The Fellowship in Gastrointestinal Oncology at Medical Global Academy (MGA) is a 12-month programme for eligible doctors seeking advanced learning in gastrointestinal cancer care. This GI oncology fellowship covers cancers of the oesophagus, stomach, gastroesophageal junction, pancreas, liver, biliary tract, colon and rectum. Its 24-module curriculum explores molecular classification, precision oncology, targeted therapies, immunotherapy, surgical and radiation oncology, molecular diagnostics, liquid biopsy and multidisciplinary cancer management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-transcatheter-aortic-valve-implantation-tavi": {
    title: "TAVI Fellowship | Transcatheter Aortic Valve Implantation",
    description:
      "Enroll a 12-month TAVI fellowship with clinical exposure, simulation, expert mentorship, imaging, procedure planning and flexible online learning.",
    overview:
      "The Fellowship in Transcatheter Aortic Valve Implantation (TAVI) at Medical Global Academy is a 12-month programme for eligible doctors seeking TAVI training. Its 16-module curriculum covers patient selection, multimodality imaging, valve and device knowledge, vascular access, TAVI deployment, complication management and post-procedure care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-gastrointestinal-gi-surgery": {
    title: "Fellowship in GI Surgery for Doctors & Surgeons | MGA",
    description:
      "CPD UK-accredited Fellowship in GI Surgery for MBBS, MD, MS and DNB doctors. A 12-month program with expert mentors and real hospital case exposure today.",
    overview:
      "The Fellowship in Gastrointestinal (GI) Surgery at Medical Global Academy is a 12-month programme for eligible doctors seeking structured learning in gastrointestinal surgical sciences. Its 18-module curriculum covers foundations, upper GI surgery, hepatopancreatobiliary (HPB) surgery, colorectal surgery, minimally invasive and robotic GI surgery, emergency surgery and complex abdominal conditions. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-endoscopic-spine-surgery": {
    title: "Endoscopic Spine Surgery Fellowship | 1-Year Program",
    description:
      "Join our one-year Endoscopic Spine Surgery Fellowship in India for orthopaedic surgeons. Live case exposure, expert faculty, flexible eligibility. Apply now!",
    overview:
      "The Endoscopic Spine Surgery Fellowship at Medical Global Academy (MGA) is a 12-month programme for eligible doctors seeking focused education in minimally invasive spine surgery. The fellowship in endoscopic spine surgery includes a 24-module curriculum covering spinal anatomy and imaging, lumbar endoscopic approaches, biportal techniques, cervical and thoracic procedures, decompression, fusion, complications, patient safety, emerging technologies and rehabilitation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-robotic-urology": {
    title: "Robotic Urology Fellowship | Advanced Doctor Training",
    description:
      "Join a fellowship in andrology with expert-led learning, skill-driven workshops, flexible study and practical training in reproductive care for doctors.",
    overview:
      "Medical Global Academy’s Robotic Urology Fellowship is a 12-month programme for eligible doctors in India and abroad. Its 18 modules cover robotic surgical techniques, urologic oncology, reconstructive urology, perioperative care, imaging, complications, patient safety and ethics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-andrology": {
    title: "Fellowship in Andrology | Clinical Skills & Training",
    description:
      "Explore a 1-year Fellowship in Andrology with expert mentorship, blended clinical training, skill-driven workshops and a future-ready curriculum.",
    overview:
      "Medical Global Academy’s Fellowship in Andrology is a 12-month professional programme for eligible doctors seeking advanced education in male reproductive and sexual health. Its 24-module curriculum covers male infertility, semen analysis, reproductive endocrinology, sexual medicine, genetic diagnostics, sperm retrieval, microsurgical andrology, assisted reproductive technologies and fertility preservation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-paediatric": {
    title: "Fellowship in Pediatric Endocrinology Course",
    description:
      "Fellowship in Pediatric Endocrinology – master childhood hormone disorders, growth abnormalities & diabetes management through case-based online learning.",
    overview:
      "The Fellowship in Paediatric Endocrinology at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their pediatric endocrinology knowledge. The program covers childhood hormone disorders, growth abnormalities, and pediatric diabetes management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-spine-surgery": {
    title: "Spine Surgery Fellowship for MBBS/MD Doctors",
    description:
      "Spine Surgery Fellowship – a 12-month online course covering spinal cord surgery, minimally invasive techniques & spinal instrumentation case learning.",
    overview:
      "The Fellowship in Spine Surgery at Medical Global Academy (MGA) is a 12-month programme for doctors seeking structured education in spine surgery. The curriculum covers spinal anatomy and biomechanics, spine pathology, preoperative planning, minimally invasive techniques, spinal deformity, trauma, tumours, infections, spinal fusion and evidence-based practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatrics-neonatology": {
    title: "Fellowship in Pediatric Neonatology Course",
    description:
      "Fellowship in Pediatric Neonatology – build expertise in NICU care, neonatal critical care, newborn emergencies & evidence-based case learning online.",
    overview:
      "The Pediatric Neonatology Fellowship at Medical Global Academy (MGA) is a 12-month programme designed for eligible doctors seeking advanced knowledge in newborn care and neonatal critical care. This Fellowship in Pediatric Neonatology covers neonatal resuscitation, care of preterm and extremely low-birth-weight infants, respiratory support, neonatal sepsis, nutrition, neurological disorders and developmental care. Its 24-module curriculum also includes neonatal cardiovascular medicine, neuroimaging, patient safety, research and emerging digital technologies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatrics": {
    title: "Fellowship in Pediatrics – 12-Month Online Course",
    description:
      "Fellowship in Pediatrics – a 12-month online course with super-specialist faculty, case-based learning, CPD certificate & 1-year mentorship support.",
    overview:
      "The Fellowship in Pediatrics at Medical Global Academy (MGA) is a 12-month program for MBBS-qualified doctors with valid NMC or State Medical Council registration and at least one year of post-qualification clinical experience. Open to eligible doctors in India and internationally, this pediatric fellowship offers structured learning across newborn, infant, child and adolescent health. The curriculum covers pediatric assessment, growth and development, nutrition, immunization, common childhood illnesses, neonatal care, pediatric emergencies, critical care principles, infectious diseases and key pediatric specialties, including cardiology, pulmonology, neurology, gastroenterology and endocrinology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-obstetrics-and-gynaecology": {
    title: "Fellowship in Obstetrics & Gynaecology 2026",
    description:
      "Fellowship in Obstetrics & Gynaecology for MBBS/BAMS doctors – a 12-month online course on antenatal care, labour management & gynae disorders. Enroll 2026.",
    overview:
      "The Fellowship in Obstetrics and Gynaecology at Medical Global Academy (MGA) is a 12-month programme for eligible doctors advancing their knowledge of women’s health. Its 24-module curriculum covers high-risk pregnancy, labour and delivery, obstetric emergencies, maternal-fetal medicine, infertility, reproductive endocrinology, benign gynaecology, minimally invasive surgery, urogynecology and gynaecological oncology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-geriatric-medicine": {
    title: "Fellowship in Geriatric Medicine | Upskill Doctors",
    description:
      "Fellowship in Geriatric Medicine helps doctors upskill their knowledge of age-related diseases, chronic conditions, geriatric syndromes and healthy aging.",
    overview:
      "The Fellowship in Geriatric Medicine at Medical Global Academy (MGA) is a 12-month professional programme for eligible doctors seeking structured training in the assessment and care of older adults. The 24-module curriculum covers comprehensive geriatric assessment, healthy ageing, frailty, sarcopenia, multimorbidity, geriatric pharmacology, polypharmacy and deprescribing. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-robotic-gynaecological-oncology": {
    title: "Fellowship in Robotic Gynaecological Oncology",
    description:
      "Fellowship in Robotic Gynaecological Oncology – learn robot-assisted surgery concepts for cancer care through advanced case-based online learning.",
    overview:
      "The Fellowship in Robotic Gynaecological Oncology at MGA Medical Global Academy is a 12-month program for MBBS-qualified doctors seeking advanced learning in robotic surgery for gynaecological oncology. The 15-module curriculum covers robotic surgical techniques, complex gynaecological cancers, perioperative care, complications, evidence-based practice and research. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-minimally-invasive-cardiac-surgery": {
    title: "Minimally Invasive Cardiac Surgery Fellowship | MGA",
    description:
      "Join a minimally invasive cardiac surgery fellowship with advanced MICS training, expert-led learning, robotic techniques and flexible learning options.",
    overview:
      "The 12-month Minimally Invasive Cardiac Surgery Fellowship at MGA Medical Global Academy is designed for doctors seeking training in minimally invasive cardiac surgery. The 21-module curriculum includes foundations, imaging, diagnostics and surgical techniques; robotic-assisted cardiac surgery is listed as an optional advanced track. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-therapeutic-endo-in-gi-surgery": {
    title: "Fellowship in Therapeutic Endo in GI Surgery",
    description:
      "Fellowship in Therapeutic Endo in GI Surgery – learn minimally invasive endoscopic procedures & advanced gastrointestinal interventions online.",
    overview:
      "The Fellowship in Therapeutic Endo in GI Surgery at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their therapeutic endoscopy knowledge. The program covers minimally invasive endoscopic procedures and advanced gastrointestinal interventions. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-ent-otorhinolaryngology": {
    title: "Fellowship in ENT | 12-Month Otorhinolaryngology Course",
    description:
      "Join a 12-month Fellowship in ENT with clinical training, expert faculty, recorded lectures, Q&A, library access, mentorship and flexible learning.",
    overview:
      "The Fellowship in ENT (Otorhinolaryngology) at Medical Global Academy (MGA) is a 12-month professional development program for eligible doctors seeking structured learning across ear, nose, throat, and head and neck care. This ENT fellowship offers flexible online and hybrid learning options to suit different professional needs. Its 24-module curriculum covers otology, audiology, neurotology, rhinology, endoscopic sinus and skull-base surgery, laryngology, airway disorders, pediatric ENT, head and neck surgery, facial plastic and reconstructive ENT, sleep-related disorders, ENT emergencies, diagnostics, digital health, and evidence-based practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-vitreo-retina": {
    title: "Vitreo Retina Fellowship in India | 12-Month Program",
    description:
      "Join a 12-month Vitreo Retina Fellowship with hybrid learning, clinical attachment, expert faculty, recorded lectures, Q&A, and 1-year mentorship for doctors.",
    overview:
      "The Fellowship in Vitreo Retina at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their vitreo-retina knowledge. The program covers retinal disorders, vitreoretinal surgery, and retinal imaging. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-gynae-endoscopy": {
    title: "Fellowship in Gynecological Endoscopy Course",
    description:
      "Fellowship in Gynecological Endoscopy – learn laparoscopy, hysteroscopy & minimally invasive surgery concepts through evidence-based case learning.",
    overview:
      "The Fellowship in Gynae Endoscopy at MGA Medical Global Academy is a 12-month programme for eligible doctors seeking training in minimally invasive gynaecological surgery. Its 17-module curriculum covers laparoscopy, hysteroscopy, skills-lab simulation, basic procedures, advanced techniques, patient care and complications management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-rhinology": {
    title: "Fellowship in Rhinology – Online Certification Course",
    description:
      "Advance your ENT career with an Online Fellowship in Rhinology. Learn nasal and sinus disorder management concepts and get certified from anywhere.",
    overview:
      "The Fellowship in Rhinology at Medical Global Academy (MGA) is a 12-month professional development programme for eligible doctors seeking advanced learning in nasal, sinus and skull-base disorders. Its 24-module curriculum covers diagnostic rhinology, chronic rhinosinusitis, nasal polyps, rhinologic allergy, functional endoscopic sinus surgery (FESS), revision sinus surgery, nasal airway procedures, skull-base conditions, sinonasal tumours, olfactory dysfunction, paediatric rhinology and evidence-based practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-high-risk-pregnancy": {
    title: "Fellowship in High Risk Pregnancy After MBBS/MD",
    description:
      "12-month online Fellowship in High Risk Pregnancy for doctors after MBBS/MD. Covers pre-eclampsia, diabetes, fetal growth restriction and MFM emergencies.",
    overview:
      "The Fellowship in High-Risk Pregnancy at Medical Global Academy (MGA) is a 12-month program for eligible doctors seeking to strengthen their knowledge of high-risk obstetrics and maternal–fetal medicine. Its 24-module curriculum covers hypertensive disorders, diabetes in pregnancy, maternal medical conditions, fetal growth restriction, placental complications, multiple pregnancies, preterm birth, fetal surveillance, prenatal diagnosis, obstetric emergencies and high-risk delivery planning. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-trichology": {
    title: "Fellowship in Trichology for Doctors After MBBS",
    description:
      "Fellowship in Trichology for doctors after MBBS. Build expertise in hair loss, scalp disorders, trichoscopy and hair restoration through advanced online training.",
    overview:
      "The fellowship in trichology at MGA Medical Global Academy is a 12-month advanced training programme for doctors seeking focused education in hair and scalp disorders. Its 19-module curriculum covers trichology, dermatology and hair disorders, hair loss and alopecia, hair restoration techniques, diagnostics, and related clinical topics. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-refractive-surgeries": {
    title: "Refractive Surgery Fellowship for Ophthalmologists",
    description:
      "Join MGA’s Refractive Surgery Fellowship, a 12-month course with clinical attachment, expert mentorship, recorded lectures and flexible learning options.",
    overview:
      "The Refractive Surgery Fellowship at Medical Global Academy (MGA) is a 12-month training program for eligible doctors seeking focused knowledge of refractive procedures. The curriculum covers LASIK, SMILE, PRK and phakic intraocular lenses (IOLs), along with diagnostic imaging, laser vision correction, patient assessment and surgical principles. Across 18 modules, participants explore corneal biomechanics, refractive cataract surgery, ocular surface optimization, surgical outcomes and emerging technologies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-oral-and-maxillofacial-surgery": {
    title: "Fellowship in Oral & Maxillofacial Surgery",
    description:
      "Join our 12-month oral and maxillofacial surgery fellowship with clinical training, expert mentors, recorded classes, Q&A and flexible study options.",
    overview:
      "Medical Global Academy’s Fellowship in Oral and Maxillofacial Surgery is a 12-month professional development programme for experienced BDS graduates and MDS-qualified applicants, subject to admission criteria. This oral and maxillofacial surgery fellowship covers surgical anatomy, dentoalveolar surgery, maxillofacial trauma and reconstruction, orthognathic planning, TMJ surgery, pathology, implantology, advanced imaging and digital technologies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-breast-surgery": {
    title: "Breast Surgery Fellowship | Hybrid Course for Doctors",
    description:
      "Enroll a breast surgery fellowship with hybrid learning, expert faculty, clinical attachment, recorded classes, Q&A, flexible payment and 1-year mentorship.",
    overview:
      "Medical Global Academy’s Breast Surgery Fellowship is a 12-month advanced training programme for eligible doctors seeking structured professional development in breast surgery. Its 24-module curriculum covers breast assessment, imaging, benign breast disease, breast cancer staging, breast-conserving surgery, mastectomy, axillary procedures, oncoplastic techniques, reconstruction and multidisciplinary oncology. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-periodontology": {
    title: "Fellowship in Periodontology | 12-Month Hybrid Course",
    description:
      "Join a 12-month fellowship in periodontology with hybrid learning, clinical attachment, expert faculty, recordings, mentorship and flexible payment options.",
    overview:
      "The Fellowship in Periodontology at Medical Global Academy (MGA) is a comprehensive 12-month programme for eligible BDS and MDS dental professionals seeking advanced learning in periodontal and peri-implant care. The 24-module curriculum covers periodontal diagnosis and risk assessment, periodontal microbiology, non-surgical therapy, periodontal surgery, regenerative procedures, mucogingival treatment, implant-site development, peri-implant diseases, digital periodontology and complex multidisciplinary cases. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-gi-endoscopy": {
    title: "Fellowship in GI Endoscopy for Doctors After MBBS",
    description:
      "12-month Fellowship in GI Endoscopy for doctors after MBBS. Learn diagnostic and therapeutic endoscopy techniques through case-based online training.",
    overview:
      "The Fellowship in GI Endoscopy at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their GI endoscopy knowledge. The program covers diagnostic and therapeutic endoscopy techniques. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-spinal-cord-surgery": {
    title: "Spine Surgery Fellowship for Doctors After MBBS/MD",
    description:
      "12-month Spine Surgery Fellowship for MBBS/MD doctors in India. Master minimally invasive techniques, spinal instrumentation and advanced case management.",
    overview:
      "The Fellowship in Spinal Cord Surgery at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their spine surgery knowledge. The program covers minimally invasive techniques, spinal instrumentation, and advanced case management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-infertility-management": {
    title: "Fellowship in Infertility Management for Doctors",
    description:
      "12-month Fellowship in Infertility Management for experienced doctors. Learn ART, IVF, reproductive endocrinology and male infertility through online classes.",
    overview:
      "The Fellowship in Infertility Management from Medical Global Academy (MGA) is an advanced professional program designed for doctors seeking comprehensive knowledge and contemporary clinical skills in the evaluation, diagnosis and management of male and female infertility. This fellowship in infertility covers reproductive endocrinology, ovarian reserve assessment, ovulatory disorders, polycystic ovary syndrome, endometriosis, tubal and uterine factors, recurrent implantation failure, recurrent pregnancy loss, male-factor infertility, sperm assessment, advanced semen analysis, sperm DNA fragmentation and unexplained infertility. It incorporates assisted reproductive technologies including ovulation induction, controlled ovarian stimulation, intrauterine insemination (IUI), in-vitro fertilization (IVF), intracytoplasmic sperm injection (ICSI), embryo culture, vitrification, cryopreservation, frozen embryo transfer, preimplantation genetic testing and fertility preservation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-cosmetology": {
    title: "Fellowship in Cosmetology | Online Fellowship Course",
    description:
      "Fellowship in Cosmetology is an online fellowship course covering cosmetology concepts, aesthetic procedures, skin care and modern cosmetic practices.",
    overview:
      "The Fellowship in Cosmetology from Medical Global Academy (MGA) is an advanced professional skill-development program designed for doctors seeking comprehensive knowledge and clinical skills in modern aesthetic medicine, skin health, hair restoration and non-surgical cosmetic procedures. The Fellowship in Cosmetology covers advanced assessment of skin and hair conditions, facial aesthetics, skin ageing, acne and acne scarring, pigmentation disorders, chemical peels, medical-grade skincare, botulinum toxin, dermal fillers, microneedling, platelet-rich plasma, energy-based devices, lasers, radiofrequency, ultrasound-based technologies, body contouring, non-surgical facial rejuvenation, hair-loss management, regenerative aesthetic approaches, patient selection, complication prevention and management, and evidence-based aesthetic treatment planning. This is a professional skill-development fellowship, not a postgraduate medical degree, NEET-based PG residency or regular 2-year medical college seat.",
  },
  "fellowship-in-robotic-gynecologic-surgery": {
    title: "Fellowship in Robotic Gynecologic Surgery | Online Course",
    description:
      "Fellowship in Robotic Gynecologic Surgery is an online fellowship course covering robotic surgery concepts, gynecologic procedures and modern surgical practices.",
    overview:
      "The Fellowship in Robotic Gynecologic Surgery offered by MGA Medical Global Academy is a comprehensive, advanced program designed for gynecologists seeking to enhance their expertise in minimally invasive robotic-assisted surgical techniques. This Fellowship in Robotic Gynecologic Surgery covers modern robotic systems, focusing on procedures such as hysterectomy, myomectomy and endometriosis treatment. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-trauma-pain-management": {
    title: "Fellowship in Trauma Pain Management for Doctors",
    description:
      "Fellowship in Trauma Pain Management for doctors, focused on acute and chronic pain control, interventional techniques and multidisciplinary patient care.",
    overview:
      "The Fellowship in Trauma Pain Management at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their trauma and pain management knowledge. The program covers acute and chronic pain control, interventional techniques, and multidisciplinary patient care. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-neuroendoscopy": {
    title: "Neuroendoscopy Fellowship Training Program for Neurosurgeons",
    description:
      "Explore an advanced fellowship in neuroendoscopic surgery covering ETV, intraventricular procedures, and skull base techniques for neurosurgeons.",
    overview:
      "The Fellowship in Neuroendoscopy at Medical Global Academy (MGA) is a Neuroendoscopy Fellowship designed for medical professionals seeking to advance their knowledge of minimally invasive neurosurgical techniques used in the diagnosis and treatment of neurological disorders. The program covers the fundamentals of neuroendoscopic anatomy, endoscopic approaches to ventricular and skull-base lesions, hydrocephalus management, endoscopic third ventriculostomy, intraventricular tumor evaluation, colloid cyst management and endoscopic techniques for selected spinal and cranial conditions. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-hand-surgery": {
    title: "Fellowship in Hand Surgery Training Program for Surgeons",
    description:
      "Learn about the Fellowship in Hand Surgery covering trauma, reconstructive microsurgery, congenital anomalies, and nerve injuries for surgical specialists.",
    overview:
      "The Fellowship in Hand Surgery offered by MGA Medical Global Academy is a comprehensive and advanced program for medical professionals seeking specialized expertise in the diagnosis, treatment and surgical management of hand and upper extremity conditions. The Fellowship in Hand Surgery covers hand and upper limb trauma [including fractures, tendon and ligament injuries], reconstructive microsurgery, congenital hand anomalies and peripheral nerve injuries [including nerve repair and compression neuropathies]. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-laryngology": {
    title: "Laryngology Fellowship Program for ENT Specialists",
    description:
      "Explore the Laryngology Fellowship focused on voice, airway, and swallowing disorders with exposure to stroboscopy and laryngeal EMG diagnostics.",
    overview:
      "The Fellowship in Laryngology from Medical Global Academy (MGA) is an advanced professional program focused on the comprehensive evaluation and management of disorders of the larynx, voice, airway, swallowing and upper aerodigestive tract. This Laryngology Fellowship covers advanced laryngeal anatomy and physiology, flexible and rigid laryngoscopy, voice and swallowing assessment, benign and malignant laryngeal disorders, professional voice disorders, vocal-fold lesions, laryngeal paralysis, phonosurgery, endoscopic and microlaryngeal surgery, transoral laser techniques, airway management, tracheostomy, laryngotracheal stenosis, pediatric laryngology, laryngeal trauma, neurolaryngology, sleep-related upper-airway disorders and multidisciplinary voice and swallowing rehabilitation. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-sleep-medicine": {
    title: "Fellowship in Sleep Medicine for Healthcare Professionals",
    description:
      "A focused fellowship covering diagnosis and management of sleep disorders like insomnia, sleep apnea, narcolepsy, and circadian rhythm disorders.",
    overview:
      "The Fellowship in Sleep Medicine from Medical Global Academy (MGA) is an advanced professional skill-development program designed to provide comprehensive knowledge of modern sleep health, sleep disorders, diagnostic evaluation and multidisciplinary management. The Fellowship in Sleep Medicine covers sleep physiology and neurobiology, sleep architecture, polysomnography, home sleep apnea testing, multiple sleep latency testing (MSLT), maintenance of wakefulness testing (MWT), obstructive and central sleep apnea, insomnia, hypersomnolence disorders, narcolepsy, restless legs syndrome, periodic limb movement disorders, parasomnias, circadian rhythm sleep-wake disorders, pediatric and geriatric sleep medicine, sleep-related breathing disorders, behavioral sleep medicine and CBT-I. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-bone-marrow-transplant": {
    title: "Bone Marrow Transplant Fellowship for Medical Professionals",
    description:
      "Explore the Bone Marrow Transplant Fellowship offering advanced training in hematopoietic stem cell transplantation for leukemia, lymphoma, and related disorders.",
    overview:
      "The Fellowship in Bone Marrow Transplantation offered by Medical Global Academy (MGA) is a Bone Marrow Transplant Fellowship designed to enhance physicians’ knowledge and professional skills in hematopoietic stem cell transplantation and advanced cellular therapies. The program covers transplant indications, donor selection and HLA matching, autologous and allogeneic transplantation, stem cell collection and processing, conditioning regimens, graft-versus-host disease (GVHD), transplant-related infections, immunosuppression, supportive care, management of complications and post-transplant monitoring. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-minimal-invasive-proctology": {
    title: "Proctology Fellowship in Minimally Invasive Techniques",
    description:
      "A focused Proctology Fellowship covering laser proctology, endoscopic procedures, and minimally invasive management of hemorrhoids, fistulas, and fissures.",
    overview:
      "The Fellowship in Minimal Invasive Proctology offered by MGA Medical Global Academy is a comprehensive Proctology Fellowship designed for surgeons seeking advanced expertise in the diagnosis and minimally invasive management of anorectal disorders. This fellowship emphasizes evidence-based techniques and modern technologies, including laser proctology, endoscopic procedures and minimally invasive surgical interventions for conditions such as hemorrhoids, fistulas, fissures and pilonidal sinus. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-nursing": {
    title: "Fellowship in Pediatric Nursing Course",
    description:
      "Enroll in our Fellowship in Pediatric Nursing to gain advanced knowledge in child assessment, growth monitoring, immunization, and illness management.",
    overview:
      "The Fellowship in Pediatric Nursing from MGA Medical Global Academy is a specialized Pediatric Nursing Course designed to equip registered nurses with advanced knowledge in pediatric care. The fellowship emphasizes comprehensive child health management, including pediatric assessment, growth and development monitoring, immunization practices, and the management of common and complex childhood illnesses. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-paediatric-psychology": {
    title: "Fellowship in Paediatric Psychology Course Online",
    description:
      "Learn Paediatric Psychology through this fellowship covering child development, anxiety, depression, and family-centered mental health care.",
    overview:
      "The Fellowship in Paediatric Psychology at Medical Global Academy (MGA) focuses on the psychological development and well-being of children from infancy through adolescence. This discipline addresses the emotional, cognitive, and behavioral aspects of health and illness in young patients, often working alongside paediatricians and other healthcare professionals. Through evidence-based practices in this Fellowship in Paediatric Psychology, students learn to assess, diagnose, and manage conditions such as anxiety, depression, developmental disorders, and the psychological impacts of chronic illnesses. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-renal-pathology": {
    title: "Renal Pathology Fellowship Course for Pathologists Online",
    description:
      "This Renal Pathology Fellowship helps pathologists build expertise in diagnosing native and transplant kidney diseases using microscopy-based techniques.",
    overview:
      "The Fellowship in Renal Pathology from Medical Global Academy (MGA) is an advanced professional program designed for doctors seeking specialized expertise in the diagnosis, interpretation, and classification of kidney diseases through modern histopathology and integrated laboratory techniques. The Renal Pathology Fellowship covers comprehensive evaluation of native and transplant kidney biopsies, glomerular diseases, tubulointerstitial disorders, vascular and hypertensive nephropathies, diabetic kidney disease, immune-mediated renal diseases, lupus nephritis, IgA nephropathy, membranous nephropathy, ANCA-associated disease, thrombotic microangiopathy, hereditary and metabolic disorders, and renal neoplasms. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-restorative-reproductive-medicine": {
    title: "Fellowship in Reproductive Medicine for Doctors",
    description:
      "Fellowship in Restorative Reproductive Medicine for doctors. Build expertise in fertility care, IVF, ART, reproductive endocrinology and infertility management.",
    overview:
      "The Fellowship in Restorative Reproductive Medicine offered by MGA Medical Global Academy is a comprehensive, evidence-based fellowship in reproductive medicine designed for healthcare professionals committed to advancing natural and ethical approaches to reproductive health. It equips participants with in-depth knowledge and clinical skills to diagnose and treat underlying causes of infertility, hormonal imbalances and reproductive disorders using restorative techniques that support the body’s natural function. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-fetal-medicine": {
    title: "Fellowship in Fetal Medicine – Build Ultrasound Skills",
    description:
      "Fellowship in Fetal Medicine struggling with diagnosis? Master prenatal diagnosis, anomaly detection & high-risk pregnancy. CPD-accredited 12-month course.",
    overview:
      "The Fetal Medicine Fellowship at Medical Global Academy (MGA) is a 12-month professional program for doctors seeking advanced knowledge in fetal assessment, prenatal diagnosis, and high-risk pregnancy care. The 24-module curriculum covers advanced obstetric ultrasound, first-trimester assessment, prenatal screening, precision genomics, fetal anomaly detection, fetal echocardiography, neurosonography, fetal MRI, fetal growth restriction, placental disorders, multiple pregnancies, congenital infections, fetal anemia, and fetal therapy. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-cosmetology-and-aesthetic-medicine": {
    title: "Fellowship in Cosmetology & Aesthetic Medicine India",
    description:
      "Learn online Fellowship in Cosmetology & Aesthetic Medicine in India. Master Botox, dermal fillers & facial rejuvenation. CPD accredited, 12 months.",
    overview:
      "The Fellowship in Cosmetology and Aesthetic Medicine at Medical Global Academy (MGA) is a 12-month professional training programme for eligible doctors seeking skills in clinical cosmetology and aesthetic medicine. Available in online and hybrid formats, it combines structured learning, clinical workshops, case simulations and mentorship from practising faculty. The 24-module curriculum covers skin science, medical skincare, botulinum toxin, dermal fillers, chemical peels, laser and energy-based technologies, microneedling, regenerative aesthetics, hair and scalp aesthetics, facial harmonisation, pigmentation and acne management, body contouring, and aesthetic complications and emergency management. This is a professional skill-development fellowship, not a government postgraduate medical degree or NEET-based PG residency.",
  },
  "fellowship-in-anorectal-plus-laser-proctology": {
    title: "Fellowship in Anorectal Plus Laser Proctology | MGA",
    description:
      "Explore the Fellowship in Anorectal Plus Laser Proctology at Medical Global Academy. Check course details, eligibility, training, curriculum and admission information.",
    overview:
      "The Fellowship in Anorectal Plus Laser Proctology at Medical Global Academy (MGA) is a 12-month program for eligible doctors seeking structured learning in anorectal and laser proctology. This laser proctology course offers self-paced online learning, online and hybrid options, clinical workshops based on surgical case studies, and mentorship from practising faculty. Its 24-module curriculum covers anorectal assessment and imaging, hemorrhoidal disease, laser technology and safety, laser hemorrhoidoplasty, FiLaC, anal fissures, complex fistulas, pilonidal disease, prolapse, pelvic floor disorders, perioperative care, complication management, and evidence-based clinical outcomes. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-aesthetic-dentistry": {
    title: "Fellowship in Aesthetic Dentistry | 12-Month CPD Course",
    description:
      "Learn about the Fellowship in Aesthetic Dentistry, a 12-month CPD course for BDS and MDS graduates with expert faculty, mentorship and flexible payment options",
    overview:
      "The Fellowship in Aesthetic Dentistry by Medical Global Academy (MGA) is a 12-month professional program for eligible BDS graduates and MD-qualified applicants who meet the admission requirements. Its 24-module curriculum covers smile design, digital smile design (DSD), aesthetic diagnosis and treatment planning, minimally invasive dentistry, composite restorations, veneers, ceramic restorations, tooth whitening, adhesive dentistry and digital workflows. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-palliative-medicine": {
    title: "Palliative Medicine Fellowship in India | 12-Month",
    description:
      "Join MGA's 12-month Palliative Medicine Fellowship in India with expert faculty, online classes, e-library, study materials, 1-year mentorship & flexible payments.",
    overview:
      "The Fellowship in Palliative Medicine at Medical Global Academy (MGA) is a 12-month programme for doctors seeking advanced training in palliative care. The 15-module curriculum covers symptom management, communication, paediatric and geriatric palliative care, psychosocial support, end-of-life care, research, and palliative care for cancer and non-cancer illnesses. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-pediatric-orthopedic": {
    title: "Pediatric Orthopedic Fellowship Online | 12-Month Course",
    description:
      "Join a 12-month Pediatric Orthopedic Fellowship online covering trauma, deformities, DDH, scoliosis, sports injuries & more. Flexible payment options.",
    overview:
      "Medical Global Academy (MGA) offers a pediatric orthopedic fellowship for doctors seeking structured learning in the diagnosis, assessment, and management of musculoskeletal conditions affecting infants, children, and adolescents. This pediatric orthopedic fellowship covers bone growth and development, childhood fractures, growth-plate injuries, developmental dysplasia of the hip, clubfoot, limb deformities, spinal conditions, cerebral palsy, sports injuries, and pediatric bone and joint disorders. The 12-month pediatric orthopedic fellowship program comprises 24 curriculum modules covering clinical assessment, digital imaging, pediatric trauma, hip and spinal disorders, limb reconstruction, deformity correction, rehabilitation, and evidence-based practice. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-rheumatology": {
    title: "Fellowship in Rheumatology in India | Online Course",
    description:
      "Explore a 12-month Fellowship in Rheumatology in India with online learning, CPD accreditation and flexible EMI options for eligible medical professionals.",
    overview:
      "The Fellowship in Rheumatology at Medical Global Academy (MGA) is a 12-month programme for doctors seeking structured training in rheumatic, autoimmune and musculoskeletal diseases. Its 24-module curriculum covers rheumatoid arthritis, lupus, vasculitis, spondyloarthritis, bone disorders, musculoskeletal imaging, biologic therapies and rheumatologic emergencies. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-general-laparoscopic-surgery": {
    title: "Fellowship in Laparoscopic Surgery for MBBS/MS Doctors",
    description:
      "Fellowship in Laparoscopic Surgery for MBBS/MS doctors. 12-month online programme covering cholecystectomy, hernia repair & minimally invasive surgery.",
    overview:
      "The Fellowship in General Laparoscopic Surgery at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their general laparoscopic surgery knowledge. The program covers cholecystectomy, hernia repair, and minimally invasive abdominal surgery. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-anesthesia": {
    title: "Fellowship in Anesthesia & Anesthesiology in India",
    description:
      "Advance your skills with our 12-month online Fellowship in Anesthesia with expert mentorship, recorded lectures, study material and flexible payment options.",
    overview:
      "The Fellowship in Anesthesia at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their anesthesiology knowledge. The program covers anesthesia techniques, patient monitoring, perioperative care, and pain management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
  "fellowship-in-oncogynecology": {
    title: "Fellowship in Gynae Oncology | 12-Month Online Course",
    description:
      "Advance your knowledge with our 12-month online Fellowship in Gynae Oncology, featuring expert faculty, live & recorded lectures and 1-year mentorship.",
    overview:
      "The Fellowship in Oncogynecology at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their gynecologic oncology knowledge. The program covers gynecologic cancers, diagnosis, staging, and multidisciplinary management. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },
    "fellowship-in-laparoscopy-and-hysteroscopy": {
    title: "Fellowship in Laparoscopy & Hysteroscopy Program India",
    description:
      "Fellowship in Laparoscopy & Hysteroscopy for MBBS/DGO doctors. Build advanced surgical skills through live cases and expert mentorship. Enroll for 2026.",
    overview:
      "The Fellowship in Laparoscopy & Hysteroscopy at Medical Global Academy is a professional skill-development program designed for doctors who want to strengthen their laparoscopic and hysteroscopic surgery knowledge. The program covers laparoscopy, hysteroscopy, and advanced gynecologic surgical techniques. This is a professional skill-development course and is not a government postgraduate medical degree, NEET-based PG residency, or regular 2-year medical college seat.",
  },

  // ============================================================
  // NEW FELLOWSHIP ENTRIES (from sheet) — paste inside COURSE_META,
  // just before the "ALIASES" comment block.
  // ============================================================
  "fellowship-in-interventional-cardiology": {
    title: "Fellowship in Interventional Cardiology | MGA India",
    description:
      "Join the Fellowship in Interventional Cardiology with CPD and ACTD accreditation, EMI options, live learning, specialist faculty and flexible study modes.",
    overview:
      "Medical Global Academy offers a Fellowship in Interventional Cardiology for doctors seeking structured training in this specialised field. This interventional cardiology fellowship course combines live sessions, recorded lectures, study material and LMS access with flexible online and hybrid learning options. Doctors can learn from specialist faculty and receive academic support through Q&A sessions, e-library access and one-year mentorship. The programme also provides clinical attachment or observation opportunities at a suitable hospital or clinic, subject to course structure and availability. The interventional cardiology training programme follows an updated curriculum and includes MCQ-based assessment. The course provides CPD and ACTD accreditation, supporting recognised professional learning. Flexible payment options, including EMI options where available, make enrolment more convenient. This cardiology fellowship course is designed for doctors who want focused learning, academic guidance and flexible training while continuing their professional commitments.",
  },
  "fellowship-in-pediatric-ophthalmology": {
    title: "Fellowship in Pediatric Ophthalmology – Enroll Now",
    description:
      "Fellowship in Pediatric Ophthalmology for MBBS doctors – learn to diagnose & manage childhood eye disorders including strabismus with case-based training.",
    overview:
      "Medical Global Academy’s pediatric ophthalmology fellowship is a 12-month program for eligible doctors seeking training in pediatric ophthalmology and strabismus. Applicants must hold an MBBS degree, have valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. Open to doctors in India and internationally, the 24-module curriculum covers pediatric eye examination, visual development, refraction, amblyopia, strabismus, pediatric cataract, and congenital eye disorders. The program highlights learning from pediatric ophthalmologists and strabismus experts, with clinical training in collaboration with pediatric eye hospitals and child vision centers. Choose the online option at ₹1,50,000 or the hybrid option at ₹1,80,000. The listed registration fee is ₹50,000. Certification is described as CPD-aligned and ACTD-aligned. Contact the academy to confirm fee inclusions, training arrangements, and certification terms before applying.",
  },
  "fellowship-in-geriatric-psychiatry": {
    title: "Geriatric Psychiatry Fellowship for Doctors in India | MGA",
    description:
      "Join the Geriatric Psychiatry Fellowship with 12-month hybrid learning, clinical attachment, expert faculty, Q&A, flexible study and 1-year mentorship.",
    overview:
      "Medical Global Academy’s Fellowship in Geriatric Psychiatry is a 12-month program for eligible doctors seeking structured training in the mental health care of older adults. Choose the online or hybrid format to suit your learning needs. The 24-module curriculum covers geriatric psychiatric assessment, neurocognitive disorders and dementia, biomarkers and neuroimaging, delirium, psychopharmacology, late-life depression and anxiety, psychotherapy, sleep disorders, neuropsychiatry, ethics, rehabilitation and evidence-based practice. The program includes flexible, self-paced learning, clinical workshops using older-adult case simulations, and mentorship from practising faculty. Clinical training partnerships with geriatric psychiatry centres and hospitals are described as part of the program; contact the academy for details of the available arrangements. Applicants must hold an MBBS degree, have valid NMC or State Medical Council registration, and have at least one year of post-qualification clinical experience. Eligible doctors practising in India and internationally may apply. The total fee is ₹1,50,000 for the online format or ₹1,80,000 for the hybrid format. The ₹50,000 registration fee is included in each total. The program provides a certificate on completion, with CPD-aligned and ACTD-aligned certification. Contact Medical Global Academy to confirm admission steps, current delivery arrangements and certification terms.",
  },
  "fellowship-in-pediatric-cardiac-surgery": {
    title: "Pediatric Cardiac Surgery Fellowship – 12-Month Program",
    description:
      "Join a Pediatric Cardiac Surgery Fellowship with 12-month training, clinical exposure, expert faculty, flexible learning, and academic support for doctors.",
    overview:
      "The Fellowship in Pediatric Cardiac Surgery at MGA Medical Global Academy is a comprehensive and advanced pediatric cardiac surgery fellowship designed for cardiothoracic surgeons seeking specialized expertise in the surgical management of congenital and acquired heart diseases in infants and children. Learning takes place under the guidance of leading pediatric cardiac surgeons, with exposure to a wide range of complex procedures including neonatal surgeries, valve repairs and correction of congenital anomalies. The pediatric cardiac surgery fellowship emphasizes surgical precision, perioperative care and multidisciplinary collaboration in the care of pediatric patients. With a strong focus on academic excellence, research and innovation, the program builds the skills and confidence needed to practise in the field of pediatric cardiac surgery.",
  },
  "fellowship-in-plastic-surgery": {
    title: "Plastic Surgery Fellowship | 12-Month Course & MGA",
    description:
      "Enroll a 12-month Plastic Surgery Fellowship course with expert guidance, clinical learning, structured curriculum and flexible EMI options for doctors.",
    overview:
      "The Fellowship in Plastic Surgery from Medical Global Academy (MGA) is an advanced professional program designed to develop comprehensive knowledge and contemporary clinical skills across aesthetic, reconstructive and microsurgical plastic surgery. This plastic surgery fellowship covers core surgical principles, wound healing, skin and soft-tissue management, skin grafts and local/regional flaps, burns and trauma, hand and upper-extremity reconstruction, craniofacial and cleft surgery, breast reconstruction and aesthetic breast surgery, body contouring, facial aesthetic surgery, rhinoplasty, blepharoplasty, facial rejuvenation, hair restoration and minimally invasive aesthetic procedures. The plastic surgery fellowship also covers microsurgery and free-tissue transfer, nerve and tendon reconstruction, head and neck reconstruction, scar management, advanced wound care, perioperative management, complication prevention and patient safety. The curriculum incorporates surgical planning, tissue preservation, digital imaging, simulation, evidence-based practice, multidisciplinary care, clinical research and emerging technologies in plastic and reconstructive surgery, focusing on reconstructive microsurgery, hand surgery, craniofacial surgery and cosmetic and breast surgery.",
  },
  "fellowship-in-cytopathology": {
    title: "Fellowship in Cytopathology: Hybrid Learning & Training",
    description:
      "Join a Cytopathology Fellowship with hybrid learning, clinical attachment, expert faculty, recorded lectures, Q&A support and flexible payment options.",
    overview:
      "The Fellowship in Cytopathology from Medical Global Academy (MGA) is an advanced professional program designed for doctors seeking comprehensive expertise in the diagnosis and interpretation of cellular specimens across gynecologic and nongynecologic cytology. The Fellowship in Cytopathology covers cervical and HPV-related cytology, thyroid, breast, lymph-node, respiratory, urinary, gastrointestinal, serous-fluid, salivary-gland, pancreaticobiliary and other fine-needle aspiration (FNA) specimens, with emphasis on systematic cytomorphological evaluation, differential diagnosis, specimen adequacy and clinicoradiological correlation. It incorporates ancillary techniques including cell-block preparation, immunocytochemistry, flow cytometry, HPV testing, FISH, PCR, molecular profiling and next-generation sequencing for selected cytology specimens. The curriculum also covers liquid-based cytology, digital cytology, whole-slide imaging, telecytology, computational image analysis, artificial intelligence-assisted interpretation, standardized reporting, quality assurance and diagnostic error reduction. Through expert-led academic sessions, case-based learning, digital slide interpretation, FNA case discussions, cytology-histology correlation, multidisciplinary tumor-board discussions, diagnostic reporting exercises and assessments, doctors develop advanced skills in contemporary cytopathology and evidence-based diagnostic practice. The Fellowship in Cytopathology integrates cytomorphology with molecular and digital methods. The program teaches correlation of cytology findings with histology, imaging and molecular results before issuing a structured diagnostic report.",
  },
  "fellowship-in-social-preventive-medicine": {
    title: "Preventive Medicine Fellowship for Doctors | MGA",
    description:
      "Join a Preventive Medicine Fellowship for doctors with expert faculty, flexible learning, study resources, mentorship and structured course support at MGA.",
    overview:
      "The Fellowship in Social Preventive Medicine from MGA Medical Global Academy is a specialized preventive medicine fellowship designed to equip healthcare professionals with advanced knowledge and skills in public health, disease prevention and health promotion strategies. It emphasizes the integration of social determinants of health into preventive care. The preventive medicine fellowship focuses on community-based interventions, epidemiological research and health policy development. The program is designed for eligible doctors committed to preventive medicine and social health strategies that support public health and population wellbeing.",
  },
  "fellowship-in-phacoemulsification": {
    title: "Phacoemulsification Fellowship | MGA Medical Academy",
    description:
      "Advance your skills with MGA’s Phacoemulsification Fellowship, featuring clinical attachment, expert faculty, mentorship, recordings, Q&A and flexible learning.",
    overview:
      "The Fellowship in Phacoemulsification at MGA Medical Global Academy is a comprehensive phacoemulsification Fellowship designed for ophthalmologists seeking to enhance their surgical skills in cataract management. This advanced program provides in-depth exposure to modern phacoemulsification techniques, including pre-operative evaluation, machine handling, fluidics management and intraoperative decision-making. Under the mentorship of experienced faculty, fellows gain confidence in surgical decision-making through case-based learning, structured teaching sessions and interactive case discussions. MGA Medical Global Academy emphasizes both technical excellence and patient safety, supporting participants in delivering high-quality cataract care with precision and efficiency through the phacoemulsification Fellowship.",
  },
  "fellowship-in-interventional-neurology": {
    title: "Interventional Neurology Fellowship | 12-Month Program",
    description:
      "Join a 12-month Interventional Neurology Fellowship with expert faculty, flexible online learning, clinical exposure, CPD & ACTD accreditation, and mentorship.",
    overview:
      "The Fellowship in Interventional Neurology at MGA Medical Global Academy is a specialized interventional neurology fellowship designed to equip physicians with advanced knowledge and skills in the diagnosis and minimally invasive treatment of neurological disorders. This comprehensive curriculum emphasizes neuroimaging, catheter-based techniques, stroke intervention and endovascular procedures. Under the mentorship of experienced faculty, fellows gain exposure to a wide spectrum of complex cerebrovascular conditions, including acute ischemic stroke, cerebral aneurysms and arteriovenous malformations. The interventional neurology fellowship integrates case-based learning with current research, supporting fellows in the rapidly evolving field of interventional neurology.",
  },
  "fellowship-in-toxicology": {
    title: "Fellowship in Toxicology | Clinical Toxicology Training",
    description:
      "Fellowship in Toxicology with specialist faculty, flexible learning, case-based training and 1-year mentorship to build focused clinical toxicology skills.",
    overview:
      "The Fellowship in Toxicology from Medical Global Academy (MGA) is an advanced professional program designed for doctors seeking comprehensive knowledge and contemporary clinical skills in the prevention, recognition, diagnosis and management of poisoning and toxicological emergencies. This fellowship in toxicology covers pharmaceutical overdoses, drugs of abuse and withdrawal, pesticides, toxic alcohols, metals and metalloids, hydrocarbons, poisonous plants and mushrooms, venomous bites and stings, inhalational and environmental toxins, occupational exposures, and chemical and radiological hazards. It emphasizes toxidrome recognition, toxicokinetics and toxicodynamics, risk assessment, laboratory and toxicology investigations, antidotal therapy, gastrointestinal decontamination, enhanced elimination, extracorporeal toxin removal, critical-care management and poisoning-related complications. The program also covers substance-use disorders, emerging recreational and pharmaceutical toxicities, pharmacogenomics, advanced toxicological diagnostics, poison-centre consultation, environmental and occupational health, emergency preparedness, advanced resuscitation, pediatric toxicity, neurotoxins, radiation and population-level toxicology. Through expert-led academic sessions, case-based learning, clinical scenarios, toxicology investigations, antidote and emergency-management exercises, multidisciplinary case discussions, digital learning resources and assessments, doctors develop an advanced understanding of modern clinical toxicology and evidence-based management of poisoned patients through the Fellowship in Toxicology. The fellowship builds a structured approach to assessing, treating and monitoring poisoned patients.",
  },
  "fellowship-in-pediatric-orthodontics": {
    title: "Fellowship in Pediatric Orthodontics| 12 month",
    description:
      "Join Medical Global Academy’s Fellowship in Pediatric Orthodontics with live and recorded learning, expert faculty, LMS access, Q&A, and mentorship support.",
    overview:
      "The Fellowship in Pediatric Orthodontics from Medical Global Academy (MGA) is an advanced professional program designed for doctors and dental professionals seeking specialized knowledge and contemporary clinical skills in the orthodontic care of children and adolescents. This fellowship in pediatric orthodontics focuses on craniofacial growth and development, developing dentition, occlusion, malocclusion, space management, early orthodontic diagnosis, interceptive orthodontics, growth modification, functional appliances, habit correction, and management of Class I, Class II and Class III malocclusions. It also covers advanced pediatric orthodontic assessment, cephalometric analysis, digital orthodontic records, intraoral scanning, 3D imaging, aligner-based treatment concepts, fixed and removable appliances, mixed-dentition treatment, impacted and ectopically erupting teeth, cleft lip and palate, craniofacial anomalies, airway-related orthodontic considerations and multidisciplinary pediatric care. The program also emphasizes individualized treatment timing, growth-guided intervention, digital workflows and evidence-based space and occlusion management. Through expert-led academic sessions, case-based learning, orthodontic case analysis, treatment planning, digital resources and assessments, doctors develop an advanced understanding of modern pediatric orthodontics and comprehensive approaches to the growing child and adolescent patient through the Fellowship in Pediatric Orthodontics.",
  },
  "fellowship-in-oral-radiology": {
    title: "Fellowship in Oral Radiology | 12-Month Course",
    description:
      "Explore MGA's 12-month oral radiology fellowship with 24 modules, flexible online or hybrid learning, expert mentorship and clinical case-based training.",
    overview:
      "The Fellowship in Oral Radiology at Medical Global Academy (MGA) is a 12-month program for eligible doctors seeking advanced training in oral and maxillofacial imaging. Its 24-module curriculum covers digital dental radiography, CBCT, head and neck CT, MRI, radiographic anatomy, image interpretation, implant imaging, craniofacial imaging, oral pathology, oncology, trauma, ultrasound and radiation protection. The program also explores 3D visualization, AI in oral radiology, radiomics and evidence-based case analysis. Learning options include online and hybrid formats, self-paced modules, clinical workshops using dental imaging cases, and mentorship from practising faculty. Practical training arrangements should be confirmed with MGA before enrolment. The program lists CPD-aligned and ACTD-aligned certifications, along with a certificate on completion. The total fee is ₹1,50,000 for the online format and ₹1,80,000 for the hybrid format, including the ₹50,000 registration fee. Eligibility requires an MBBS degree, valid NMC or State Medical Council registration, and at least one year of clinical experience after qualification. Review the curriculum, learning format and eligibility criteria before applying.",
  },
  "fellowship-in-orthodontics": {
    title: "Fellowship in Orthodontics | 12-Month Programme",
    description:
      "Explore the Fellowship in Orthodontics at Medical Global Academy. Get 12-month training, faculty mentorship and CPD/ACTD-aligned certification. Enquire.",
    overview:
      "Medical Global Academy’s Fellowship in Orthodontics is a 12-month programme for eligible dental professionals seeking structured learning in orthodontic principles and techniques. The curriculum covers craniofacial growth, dental anatomy and occlusion, malocclusion classification, diagnosis and treatment planning, cephalometric analysis, dental imaging, fixed and removable appliances, clear aligners, digital orthodontics, and biomechanics. Learners receive practising-faculty mentorship and a certificate on completion, with CPD-aligned and ACTD-aligned certification. The total fee is ₹1,80,000 for the hybrid format and ₹1,50,000 for the online format; the ₹50,000 registration fee is included in each total. If you are considering a fellowship in orthodontics in India, review the programme details and confirm that you meet the accepted dental qualification and registration requirements. Contact Medical Global Academy to verify eligibility and the application process before enrolling.",
  },
  "fellowship-in-gynaecologic-oncology": {
    title: "Gynae Oncology Fellowship | 12-Month Program",
    description:
      "Join MGA's Gynae Oncology Fellowship for doctors. Explore 24 modules, expert mentorship, flexible online or hybrid learning, and certification options.",
    overview:
      "Medical Global Academy’s Gynae Oncology Fellowship is a 12-month programme for eligible doctors seeking advanced training in gynaecologic oncology. This fellowship in gynae oncology covers cervical, ovarian, endometrial and other gynaecological cancers, including imaging, precision diagnosis, surgery, systemic therapy, radiotherapy, genetics, fertility preservation and multidisciplinary care. The fellowship in gynecologic oncology includes a 24-module curriculum, practising-faculty mentorship, CPD-aligned and ACTD-aligned certification, and a certificate on completion, subject to programme requirements. Applicants need an MBBS degree, valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. The programme is open to eligible doctors in India and internationally. Total fees are ₹1,50,000 online and ₹1,80,000 hybrid. Confirm registration fee terms and certification conditions with Medical Global Academy before enrolment.",
  },
  "fellowship-in-neonatal-surgery": {
    title: "Neonatal Surgery Fellowship | 12-Month Doctor Training",
    description:
      "Explore the 12-month Neonatal Surgery Fellowship for eligible doctors, with case-based learning, faculty mentorship, and online or hybrid study options available.",
    overview:
      "The Neonatal Surgery Fellowship is a 12-month program for eligible doctors seeking structured learning in neonatal surgical principles and newborn care. Topics include congenital gastrointestinal anomalies, neonatal intestinal obstruction, oesophageal atresia, tracheoesophageal fistula, diaphragmatic hernia, abdominal wall defects, and anorectal malformations. It also introduces neonatal urological and thoracic conditions, preoperative stabilisation, perioperative care, postoperative monitoring, and initial management of neonatal surgical emergencies. This neonatal surgery training program includes case-based learning and mentorship from practising faculty. CPD-aligned and ACTD-aligned certification are included, with a certificate on completion subject to program requirements. Applicants need an MBBS degree, valid NMC or State Medical Council registration, and at least one year of clinical experience. Online fees are ₹1,50,000 and hybrid fees ₹1,80,000; registration is ₹50,000.",
  },
  "fellowship-in-aesthetic-dentistry-surgery": {
    title: "Fellowship in Aesthetic Dentistry Surgery Course | MGA",
    description:
      "Explore the Fellowship in Aesthetic Dentistry Surgery at MGA with a 12-month program, faculty mentorship, online and hybrid options, and certification.",
    overview:
      "The Fellowship in Aesthetic Dentistry Surgery at Medical Global Academy is a 12-month program designed for eligible dental professionals seeking to develop their knowledge of aesthetic dentistry and smile enhancement. The curriculum covers smile design, facial aesthetics, digital smile analysis, tooth whitening, shade selection, composite bonding, veneers, ceramic restorations, aesthetic crowns, gingival aesthetics, periodontal principles, dental materials and adhesive techniques. Participants explore patient assessment, personalised treatment planning, complication prevention, long-term maintenance and clinical case discussions focused on aesthetic outcomes. The program includes mentorship from practising faculty, CPD-aligned and ACTD-aligned certification, and a certificate on completion. Online and hybrid learning options are available, with total fees of ₹1,50,000 and ₹1,80,000, respectively. The ₹50,000 registration fee is included in the stated total fee. Eligible BDS and MDS professionals can review the admission requirements and program details before applying.",
  },
  "fellowship-in-breast-onco-surgery": {
    title: "Fellowship in Breast Onco-Surgery | 12-Month",
    description:
      "Explore MGA’s 12-month Fellowship in Breast Onco-Surgery for doctors, with surgical workshops, breast cancer case simulations and flexible online or hybrid learning.",
    overview:
      "The Fellowship in Breast Onco-Surgery at Medical Global Academy (MGA) is a 12-month advanced programme for eligible doctors seeking to strengthen their knowledge of breast surgical oncology and breast cancer care. Its 24-module curriculum covers breast imaging, pathology, molecular classification, staging, treatment planning, breast-conserving surgery, mastectomy, sentinel lymph node biopsy, axillary surgery, oncoplastic techniques and reconstruction. It also addresses hereditary breast cancer, neoadjuvant treatment, recurrent disease, surgical complications and multidisciplinary decision-making. Learning includes recorded lectures, interactive sessions, case discussions, digital resources, assignments and MCQ assessments. Programme highlights include surgical workshops with breast cancer case simulations, flexible online and hybrid formats, and guidance from practising faculty. Confirm the availability and requirements for any hospital-based or practical training before enrolment. The flexible learning structure is designed to support study alongside clinical responsibilities. This breast surgical oncology fellowship is intended for doctors with an MBBS degree, valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. The total fee is ₹1,50,000 online or ₹1,80,000 hybrid; the ₹50,000 registration fee is included in each total, not charged separately. Review the curriculum, eligibility and learning format, then contact MGA to discuss admission to the Fellowship in Breast Onco-Surgery.",
  },
  "fellowship-in-clinical-nutrition": {
    title: "Fellowship in Clinical Nutrition | 12-Month Program",
    description:
      "Join a fellowship in clinical nutrition for doctors, with CPD & ACTD-aligned certification, 12-month training and flexible EMI options",
    overview:
      "Medical Global Academy offers the Fellowship in Clinical Nutrition, a 12-month program for doctors who want to strengthen their knowledge of clinical nutrition and evidence-based nutritional care. The curriculum covers nutritional assessment, identifying nutritional risks and planning therapeutic diets. Doctors explore nutrition management for diabetes, obesity and cardiovascular conditions, alongside nutrition considerations in gastrointestinal, renal and liver diseases. The program also covers vitamin and mineral deficiencies, enteral and parenteral nutrition support, hospital and critical care nutrition, nutritional needs across life stages, patient counselling and dietary education. This clinical nutrition fellowship includes mentorship from practising faculty and CPD-aligned and ACTD-aligned certification, with a certificate on completion. Applicants must hold an MBBS degree, have valid NMC or State Medical Council registration, and at least one year of post-qualification clinical experience. The program welcomes eligible doctors in India and internationally. Choose online learning at ₹1,50,000 or the hybrid option at ₹1,80,000. The ₹50,000 registration fee is included in the stated total program fee. Contact Medical Global Academy to enquire about admission.",
  },

  // ============================================================
  // ALIASES (same content, different slug)
  // ============================================================
}; // <--- YAHAN OBJECT CLOSE HO RAHA HAI (FIX)

// Alias entries: same as their canonical slugs
COURSE_META["pg-diploma-in-pediatric-infectious-disease"] = COURSE_META["pg-in-pediatric-infectious-disease"];
COURSE_META["pg-diploma-in-reproductive-medicine"] = COURSE_META["pg-diploma-in-reproductive-medicine"];
COURSE_META["pg-diploma-in-maternal-child-health"] = COURSE_META["pg-diploma-in-maternal-and-child-health"];
COURSE_META["pg-diploma-in-clinical-embryology"] = COURSE_META["pg-diploma-in-embryology"];
COURSE_META["pg-diploma-in-psychiatric-medicine"] = COURSE_META["pg-diploma-in-psychiatry-medicine"];
COURSE_META["pg-diploma-in-cosmetology-aesthetic-medicine"] = COURSE_META["pg-diploma-in-cosmetology-and-aesthetic-medicine"];
COURSE_META["fellowship-in-obstetrics-gynaecology"] = COURSE_META["fellowship-in-obstetrics-and-gynaecology"];
COURSE_META["fellowship-in-cosmetology-and-aesthetic-medicine-p2"] = COURSE_META["fellowship-in-cosmetology-and-aesthetic-medicine"];
COURSE_META["fellowship-in-minimally-invasive-surgery-p2"] = COURSE_META["fellowship-in-minimally-invasive-surgery"];
COURSE_META["fellowship-in-orthopedics"] = COURSE_META["fellowship-in-orthopedic"];
COURSE_META["fellowship-in-arthroscopy-sports-medicine"] = COURSE_META["fellowship-in-arthroscopy-and-sports-medicine"];
COURSE_META["fellowship-in-pulmonary-medicine"] = COURSE_META["fellowship-in-pulmonology-medicine"];
COURSE_META["fellowship-in-anesthesiology"] = COURSE_META["fellowship-in-anesthesia"];
COURSE_META["fellowship-in-head-and-neck-surgicl-oncology"] = COURSE_META["fellowship-in-head-neck-surgery"];
COURSE_META["fellowship-in-critical-care"] = COURSE_META["fellowship-in-critical-care"];
COURSE_META["pg-diploma-in-reproductive-and-child-health"] = COURSE_META["pg-diploma-in-reproductive-and-child-health"];

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