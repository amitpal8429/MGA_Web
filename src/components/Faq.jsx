import { useState } from "react";
import { Plus, Minus } from "lucide-react";

/* ==================================================================
   COMMON FAQS — fallback when a course has no specific FAQs
================================================================== */
const COMMON_FAQS = [
  { q: "What is the eligibility criteria for these programs?", a: "Most certificate and PG diploma programs require an MBBS degree with valid registration. Fellowships generally expect MBBS, MD, MS or DNB — the exact requirement is listed on each program's detail page." },
  { q: "How are the programs delivered?", a: "Programs combine self-paced online modules with live faculty-led sessions. Fellowships and diplomas add a hospital-based clinical training component in the later months." },
  { q: "How do I enrol in a program?", a: "Open any program page and use the Enquire Now button — our admissions team will reach out with the fee structure, intake dates, and next steps." },
  { q: "Is the certification recognised?", a: "Yes. Certificates are ACTD, CPD-aligned and issued on successful completion of the assessments and, where applicable, the clinical training component." },
  { q: "Can I enrol in more than one program at a time?", a: "Yes, you can enrol in multiple programs and access each of them at your own pace, provided the schedules don't clinically overlap." },
];

/* ==================================================================
   COURSE-SPECIFIC FAQS — keyed by exact course title
================================================================== */
const COURSE_FAQS = {
  "Fellowship in Cardiothoracic Surgery": [
    { q: "What does the Fellowship in Cardiothoracic Surgery include?", a: "The program combines structured learning, clinical attachment, practical training, specialist faculty guidance, updated course resources, and one-year mentorship. It provides focused training across relevant cardiac and thoracic surgery areas." },
    { q: "Does the fellowship include clinical training?", a: "Yes. The program includes clinical attachment and practical exposure, helping doctors connect academic learning with clinical settings and strengthen their cardiothoracic surgery training." },
    { q: "Does the program cover cardiac and thoracic surgery?", a: "Yes. The fellowship covers key areas of both cardiac and thoracic surgery within a broader cardiothoracic training structure. This gives doctors focused exposure to relevant surgical practices." },
    { q: "Is this a 12-month cardiothoracic fellowship?", a: "Yes. Medical Global Academy offers a 12-month cardiothoracic fellowship with structured learning, clinical exposure, practical training, and ongoing mentorship throughout the program." },
    { q: "Does the program offer flexible learning?", a: "Yes. The program combines flexible learning with clinical attachment, allowing doctors to pursue focused cardiothoracic surgery training while managing their professional commitments." },
  ],
  "Fellowship in Radiology": [
    { q: "Who can apply for the Fellowship in Radiology?", a: "The programme is designed for doctors seeking focused training in diagnostic imaging. Doctors considering a radiology fellowship after MBBS can review the programme eligibility and admission requirements before applying." },
    { q: "Is this an online radiology fellowship?", a: "Yes. The programme combines online learning with clinical exposure. Doctors can access structured learning resources while gaining practical experience through clinical attachment." },
    { q: "Is the Fellowship in Radiology available in India?", a: "Yes. Medical Global Academy offers the Fellowship in Radiology in India with online learning, clinical exposure, expert faculty support and a structured 12-month programme." },
    { q: "How long does the radiology fellowship programme take?", a: "The programme runs for 12 months and combines structured learning with clinical attachment, recorded lectures, Q&A support and one-year mentorship." },
    { q: "How can I apply for the radiology fellowship?", a: "You can review the programme, eligibility and admission details before applying. Contact Medical Global Academy for the current admission process, available intake and enrolment support." },
  ],
  "Fellowship in Dermatology": [
    { q: "Who can apply for a Fellowship in Dermatology after MBBS?", a: "Doctors who meet the program's eligibility requirements can apply. The course suits MBBS doctors who want focused training in dermatology and want to develop additional skills alongside their clinical practice." },
    { q: "Is this an online dermatology fellowship?", a: "Yes. The program offers flexible online learning with expert-led sessions, structured course resources, case-based education, and ongoing mentorship. This format allows doctors to continue their professional work while completing the course." },
    { q: "How long is the 12-month Dermatology Fellowship?", a: "The course runs for 12 months and follows a structured learning plan. During this period, doctors receive access to course resources, expert guidance, case-based learning, and mentorship." },
    { q: "What does the Dermatology Fellowship program include?", a: "The program covers clinical, cosmetic, and procedural dermatology. Key learning areas include skin, hair and nail conditions, dermoscopy, cosmetic dermatology, dermatologic procedures, and laser-based skills." },
    { q: "Is the Fellowship in Dermatology suitable for doctors?", a: "Yes. The course is designed for doctors who want focused dermatology training and additional clinical skills. Its flexible learning format, structured curriculum, expert guidance, and mentorship make it suitable for doctors managing professional commitments alongside further education." },
  ],
  "Fellowship in Obstetrics and Gynaecology": [
    { q: "Who can apply for the Fellowship in Obstetrics and Gynaecology?", a: "Doctors who meet the programme's current eligibility criteria can apply. The fellowship suits medical professionals who want structured clinical training and focused academic support in Obstetrics and Gynaecology." },
    { q: "What does the fellowship course include?", a: "The programme combines expert-led teaching, clinical attachment, case-based learning, live and recorded sessions, LMS access, and faculty mentorship. The curriculum covers key areas of obstetric and gynaecological practice." },
    { q: "How long is the fellowship programme?", a: "The programme follows a structured duration that supports academic learning, clinical exposure, and mentorship. The current course schedule and duration may vary based on the programme format." },
    { q: "Does the course provide clinical training?", a: "Yes. The programme includes clinical-focused learning and clinical attachment opportunities. These components help doctors connect structured academic learning with practical clinical experience." },
    { q: "How can I apply for the fellowship?", a: "Eligible doctors can contact Medical Global Academy for the latest admission details, course availability, fees, schedule, and enrolment process. The admissions team can also guide applicants through the next steps." },
  ],
  "Fellowship in Neurosurgery": [
    { q: "Who is eligible for a Fellowship in Neurosurgery?", a: "Eligible doctors who meet the program requirements can apply for the Fellowship in Neurosurgery. The admission team reviews the applicant's medical qualification and relevant clinical background as part of the admission process." },
    { q: "How long is the Neurosurgery Fellowship program?", a: "The Neurosurgery Fellowship program runs for 12 months. It combines structured learning, clinical exposure, expert guidance, and focused training across key areas of neurosurgical practice." },
    { q: "What are the fees for the Neurosurgery Fellowship?", a: "The Neurosurgery Fellowship fees depend on the current program terms. Applicants can contact Medical Global Academy or check the latest course details for the current fee and payment options." },
    { q: "How can I apply for a Neurosurgery Fellowship?", a: "Doctors can apply through the admission process for the Neurosurgery Fellowship course. Applicants can review the eligibility criteria, course details, and admission requirements before submitting their application." },
    { q: "What does the Neurosurgery Fellowship course include?", a: "The Neurosurgery Fellowship course includes structured learning, clinical exposure, expert faculty guidance, study material, and mentorship. Training covers relevant areas such as cranial, spine, cerebrovascular, neuro-oncology, and functional neurosurgical practice." },
  ],
  "Fellowship in Minimal Access Surgery": [
    { q: "Who can apply for the Fellowship in Minimal Access Surgery?", a: "The Fellowship in Minimal Access Surgery is designed for eligible doctors and surgeons who want focused training in minimally invasive surgical practice. Applicants should review Medical Global Academy's current eligibility requirements before applying." },
    { q: "What is the duration of the Minimal Access Surgery Fellowship?", a: "The Fellowship in Minimal Access Surgery is a 12-month program. It combines structured learning, clinical exposure, surgical training, and mentorship throughout the program." },
    { q: "What does the Fellowship in Minimal Access Surgery cover?", a: "The program covers key areas of minimal access surgery, including laparoscopic surgery, endoscopic techniques, robotic-assisted surgery, surgical decision-making, patient safety, perioperative care, and complication management." },
    { q: "Does the Minimal Access Surgery Fellowship include clinical training?", a: "Yes. The program follows a clinical-focused learning approach and includes clinical exposure, structured learning, and expert mentorship. The exact clinical activities depend on the program structure and applicable eligibility requirements." },
    { q: "Is this Fellowship in Minimal Access Surgery suitable for doctors seeking advanced surgical training?", a: "Yes. The fellowship is designed for eligible doctors and surgeons who want to strengthen their knowledge and skills in minimal access surgery and develop focused training in modern minimally invasive surgical techniques." },
  ],
  "Fellowship in Clinical Genetics": [
    { q: "Who can apply for the Fellowship in Clinical Genetics?", a: "Doctors who meet the program's eligibility requirements can apply for the Fellowship in Clinical Genetics. It suits doctors seeking focused training and practical exposure in clinical genetics." },
    { q: "How long is the clinical genetics fellowship program?", a: "The clinical genetics fellowship program runs for 12 months. The program combines structured learning, clinical exposure, and mentorship throughout the training period." },
    { q: "What does the clinical genetics fellowship include?", a: "The clinical genetics fellowship covers areas such as molecular genetics, genetic testing, inherited disorders, genetic counseling, pediatric genetics, cancer genetics, reproductive genetics, cardiogenetics, and pharmacogenomics." },
    { q: "Does the medical genetics fellowship include clinical exposure?", a: "Yes. The medical genetics fellowship includes clinical attachment and practical exposure. This allows doctors to connect structured learning with clinical settings." },
    { q: "What can I expect from this clinical genetics course?", a: "This clinical genetics course provides structured learning, clinical exposure, mentorship, and guidance from experienced faculty. It is designed for doctors who want focused training in clinical genetics and related areas of medical genetics." },
  ],
  "Fellowship in Diabetology": [
    { q: "Why choose this Fellowship in Diabetology?", a: "This Fellowship in Diabetology combines structured learning, clinical training, expert guidance, recorded lectures, clinical attachment, study resources, and one-year mentorship. It gives doctors a focused pathway to strengthen their skills in diabetes care." },
    { q: "Is the Diabetology Fellowship available through online learning?", a: "Yes. The Diabetology Fellowship offers flexible online and hybrid learning with clinical attachment. This format helps doctors balance professional commitments with structured course learning and practical clinical exposure." },
    { q: "Does the Fellowship in Diabetology include clinical training?", a: "Yes. The program includes clinical training through hospital or clinic-based exposure. Doctors can connect their structured learning with practical diabetes care and develop stronger clinical skills." },
    { q: "Does the Fellowship in Diabetes include diabetes management training?", a: "Yes. The program focuses on diabetes management, including patient assessment, glucose monitoring, insulin therapy, Type 1 and Type 2 diabetes, gestational diabetes, and diabetes complications. It also supports practical clinical decision-making." },
    { q: "What professional opportunities can a Diabetes Fellowship support?", a: "The program can support doctors seeking focused skills for diabetes clinics, hospitals, metabolic care, teaching, and research. The training can complement existing medical practice and support continued professional development." },
  ],
  "Fellowship in Oncology": [
    { q: "Who can apply for the Fellowship in Oncology?", a: "MBBS graduates, physicians, residents, general practitioners, and other qualified doctors can apply for the Fellowship in Oncology, subject to the programme's eligibility requirements." },
    { q: "What does the Medical Oncology Fellowship include?", a: "The Medical Oncology Fellowship includes live classes, recorded lectures, case discussions, LMS access, specialist-led sessions, study resources, and one-year mentorship." },
    { q: "How long is the Online Fellowship in Oncology?", a: "The Online Fellowship in Oncology is a 12-month programme. Doctors get structured learning, recorded content, live sessions, and one-year mentorship throughout the programme." },
    { q: "Why choose this Oncology Fellowship course?", a: "This Oncology Fellowship course offers specialist-led learning, flexible online study, clinical case discussions, updated course content, LMS access, one-year mentorship, and a CPD-accredited certificate." },
    { q: "What is the fee for the Fellowship in Oncology?", a: "The Fellowship in Oncology fee follows the current programme fee provided by Medical Global Academy. Doctors can contact the academy for the latest fee, payment options, and admission details." },
  ],
  "Fellowship in Critical Care Medicine": [
    { q: "Who can apply for the Critical Care Fellowship?", a: "Doctors who meet the programme's current eligibility requirements can apply for the Critical Care Fellowship. Applicants should check the required medical qualification and other admission criteria before submitting an application." },
    { q: "What is the duration of the Critical Care Fellowship?", a: "The programme runs for 12 months. This 1-year critical care fellowship combines structured learning with focused clinical training to help doctors develop practical skills in critical care medicine." },
    { q: "What does the Critical Care Fellowship cover?", a: "The programme covers key areas of critical care medicine, including airway management, mechanical ventilation, sepsis, shock, hemodynamic monitoring, organ support, emergency care and critical care ultrasound." },
    { q: "Does the fellowship include clinical training and practical exposure?", a: "Yes. The programme includes clinical training and practical exposure as part of its learning structure. This allows doctors to connect their academic learning with clinical practice and strengthen their skills in critical care settings." },
    { q: "What certification is provided after completing the fellowship?", a: "Doctors who complete the programme and meet all required completion criteria receive the certification specified for the fellowship. Applicants should review the current programme details for the exact certification and awarding information." },
  ],
  "Fellowship in Gastroenterology": [
    { q: "Can I pursue a gastroenterology fellowship after MBBS?", a: "Yes, eligible MBBS doctors can apply for a gastroenterology fellowship after MBBS, subject to the program's current admission and eligibility requirements. The course provides structured learning focused on gastroenterology and related clinical areas." },
    { q: "Is an online fellowship in gastroenterology suitable for working doctors?", a: "Yes. An online fellowship in gastroenterology offers flexible learning that can fit around a doctor's clinical schedule. Recorded lectures, study resources, Q&A support, and mentorship help doctors follow a structured learning path." },
    { q: "Can I join a gastroenterology fellowship after MD Medicine?", a: "Yes, eligible doctors can pursue a gastroenterology fellowship after MD Medicine to develop focused knowledge in gastroenterology. The curriculum includes hepatology, IBD, gastrointestinal endoscopy, GI imaging, and pancreatobiliary conditions." },
    { q: "What does the gastroenterology fellowship course offer?", a: "The gastroenterology fellowship course covers core gastroenterology, hepatology, gastrointestinal endoscopy, IBD, liver disorders, GI imaging, and pancreatobiliary conditions. It also provides structured study resources, Q&A support, and mentorship." },
    { q: "What support is included in the gastroenterology fellowship?", a: "The gastroenterology fellowship includes structured online learning, recorded lectures, study resources, Q&A support, and mentorship. These resources help eligible doctors follow a focused learning pathway while managing their clinical practice." },
  ],
  "Fellowship in Cosmetology and Aesthetic Medicine": [
    { q: "Who can apply for the Fellowship in Cosmetology and Aesthetic Medicine?", a: "The program is designed for eligible doctors and medical professionals who meet Medical Global Academy's admission requirements." },
    { q: "What is the duration of the Fellowship in Cosmetology and Aesthetic Medicine?", a: "The program follows a 12-month learning and mentorship structure with continued academic support throughout the course." },
    { q: "What are the fees for the Cosmetology Fellowship?", a: "Course fees depend on the current admission plan. Contact Medical Global Academy for the latest fee, payment options, and available admission offers." },
    { q: "Does the Aesthetic Medicine Fellowship include clinical exposure?", a: "Yes. The program includes clinical exposure as part of its clinical-focused training approach." },
    { q: "How can I apply for the Cosmetology Fellowship?", a: "You can contact Medical Global Academy to confirm eligibility, current fees, available seats, and admission details before enrollment." },
  ],
  "Fellowship in Neuro-Oncology": [
    { q: "Who can apply for the Neuro-Oncology Fellowship?", a: "The Neuro-Oncology Fellowship is designed for eligible medical professionals who want focused training and advanced knowledge in neuro-oncology. It suits doctors seeking structured learning and professional development in brain tumor care." },
    { q: "What does the Neuro Oncology Fellowship course cover?", a: "The Neuro Oncology Fellowship course covers brain and spinal tumors, neuroimaging, neuropathology, medical and radiation oncology, surgical neuro-oncology, pediatric neuro-oncology, and multidisciplinary cancer care." },
    { q: "Does the Neuro Oncology Fellowship include clinical training?", a: "Yes. The program combines structured learning with clinical-focused training, helping doctors build focused knowledge in neuro-oncology and related areas of cancer care." },
    { q: "Does the program offer an online learning option?", a: "Yes. The program offers flexible learning with structured course content, specialist guidance, study resources, Q&A support, assessments, and clinical exposure." },
    { q: "Is this a Neuro Oncology Course for Doctors?", a: "Yes. The program supports eligible doctors who want focused neuro-oncology training, specialist guidance, and structured professional development in brain tumor care and related clinical areas." },
  ],
  "Fellowship in Clinical Cardiology": [
    { q: "Who is eligible for the Fellowship in Clinical Cardiology?", a: "The Fellowship in Clinical Cardiology is suitable for eligible MBBS graduates, MD/MS doctors, and registered medical professionals who want structured training in clinical cardiology. Admission follows the current program eligibility criteria." },
    { q: "Can MBBS doctors apply for the Fellowship in Clinical Cardiology?", a: "Yes. Eligible MBBS doctors can apply for the Fellowship in Clinical Cardiology to develop practical skills in cardiovascular diagnosis, ECG interpretation, patient evaluation, and cardiac care." },
    { q: "How can I enroll in the Fellowship in Clinical Cardiology?", a: "Eligible doctors can apply through Medical Global Academy. The admission team can guide you through eligibility, enrollment, course options, and the available learning format." },
    { q: "What does the Clinical Cardiology Fellowship include?", a: "The Clinical Cardiology Fellowship includes live and recorded classes, clinical training, study material, e-library access, Q&A sessions, expert faculty guidance, and academic mentorship." },
    { q: "Can practicing doctors join the Clinical Cardiology Fellowship?", a: "Yes. The flexible learning format supports eligible practicing doctors who want to continue their medical practice while developing stronger clinical cardiology skills." },
  ],
  "Fellowship in Neonatology": [
    { q: "Who is eligible for the Fellowship in Neonatology?", a: "The Fellowship in Neonatology is designed for eligible healthcare professionals who want structured training in neonatal and NICU care. Admission depends on the eligibility criteria set by Medical Global Academy. Applicants should review the current course requirements before applying." },
    { q: "What is the duration of the Fellowship in Neonatology?", a: "The fellowship in neonatology duration follows the course structure defined by Medical Global Academy. The program combines structured learning with the relevant clinical training included in the fellowship. Applicants can check the current course details for the exact duration and schedule." },
    { q: "Is the Fellowship in Neonatology available online?", a: "Yes, the program supports an online fellowship in neonatology format for structured learning. The course provides online access to the academic component while the applicable clinical component provides practical exposure. This format suits healthcare professionals seeking flexible online neonatology fellowship learning." },
    { q: "Does the Neonatology Fellowship include clinical training?", a: "The neonatology fellowship includes clinical training focused on practical neonatal and NICU care, according to the course structure. Learners can develop relevant skills across areas covered by the program, including neonatal emergencies, resuscitation, respiratory support and newborn care." },
    { q: "How can I apply for the Fellowship in Neonatology?", a: "To apply for the Fellowship in Neonatology, review the eligibility requirements, course details and admission process provided by Medical Global Academy. Complete the application process with the required information to begin your admission journey." },
  ],
  "Fellowship in Internal Medicine": [
    { q: "Can I pursue a Fellowship in Internal Medicine after MBBS?", a: "Yes. Eligible MBBS doctors can pursue the Fellowship in Internal Medicine after MBBS, subject to the programme's admission requirements. The fellowship is designed to help doctors strengthen their skills in clinical assessment, diagnosis, patient management, treatment planning, and clinical decision-making in adult medicine." },
    { q: "What are the eligibility requirements for an Internal Medicine Fellowship?", a: "The Internal Medicine Fellowship is available to eligible medical professionals who meet the programme's stated admission requirements. MBBS qualification is accepted for the post-MBBS pathway, subject to the applicable registration and admission criteria. Doctors should review the current eligibility requirements before applying." },
    { q: "What is the duration of an Internal Medicine Fellowship?", a: "The Fellowship in Internal Medicine is a 12-month programme. It provides structured learning through the programme's academic content, clinical case discussions, mentorship, and learning resources. The exact schedule and learning format may vary according to the selected programme mode." },
    { q: "What does the Internal Medicine Fellowship curriculum include?", a: "The Internal Medicine Fellowship curriculum covers key areas of adult medicine and focuses on clinical diagnosis, diagnostic reasoning, patient management, treatment planning, and clinical decision-making. The curriculum includes areas such as cardiology, pulmonology, endocrinology, gastroenterology, nephrology, infectious diseases, hematology and oncology, geriatrics, rheumatology, psychiatry, and vascular medicine." },
    { q: "What are the fees for a Fellowship in Internal Medicine?", a: "The Fellowship in Internal Medicine fees depend on the selected programme option and learning mode. The programme provides different fee and payment options, including EMI facilities. Doctors should check the current fee displayed for their selected programme option before enrolment." },
  ],
  "Fellowship in Reproductive Medicine": [
    { q: "What is the eligibility for the Fellowship in Reproductive Medicine?", a: "Candidates should meet the eligibility requirements set by Medical Global Academy before applying. Doctors should review the stated academic and professional requirements on the programme page to confirm their eligibility for the Fellowship in Reproductive Medicine." },
    { q: "What is the duration of the Reproductive Medicine Fellowship?", a: "The Reproductive Medicine Fellowship runs for 12 months and follows a hybrid programme format. The structure combines academic learning with a clinical attachment, giving doctors a focused path for advanced training in reproductive medicine." },
    { q: "What are the fees for the Fellowship in Reproductive Medicine?", a: "The reproductive medicine fellowship fees include a ₹50,000 registration fee. The total cost is ₹1,80,000 for the Hybrid programme and ₹1,50,000 for the Online programme. Candidates can choose the programme format based on their learning and clinical training needs." },
    { q: "Does the Fellowship in Reproductive Medicine include clinical training?", a: "Yes. The programme includes a clinical attachment along with its hybrid learning format. The curriculum covers reproductive medicine, infertility care, IVF, ICSI, and assisted reproductive technology (ART), giving doctors structured academic learning with clinical exposure." },
    { q: "How can I apply for admission to the Reproductive Medicine Fellowship?", a: "Candidates can review the programme eligibility, duration, fees, and admission requirements before starting the reproductive medicine fellowship admission process. Applicants should follow the official Medical Global Academy application process and submit the required details for admission." },
  ],
  "Interventional Radiology Fellowship": [
    { q: "Who can apply for the Interventional Radiology Fellowship?", a: "The Interventional Radiology Fellowship is designed for eligible radiologists, including doctors with MD or DNB in Radiology. Applicants should review the current eligibility requirements before starting the admission process." },
    { q: "What is the duration of the Interventional Radiology Fellowship?", a: "The Interventional Radiology Fellowship runs for 12 months. The program combines structured academic learning, clinical exposure, case-based training, and focused interventional radiology training." },
    { q: "What are the fees for the Interventional Radiology Fellowship?", a: "The fellowship fees depend on the current program fee structure. Applicants should check the latest fee details, payment terms, and admission information before applying for the fellowship in India." },
    { q: "How can I apply for the Interventional Radiology Fellowship?", a: "Eligible doctors can review the admission requirements and application process before applying. The admission process provides the key steps, required documents, and other details needed to apply for the program." },
    { q: "What clinical training does the Interventional Radiology Fellowship include?", a: "The program provides focused clinical training across vascular and non-vascular interventions. It also covers interventional oncology, hepatobiliary procedures, neurointerventional work, trauma care, and endovascular techniques." },
  ],
  "Pediatric Cardiology Fellowship": [
    { q: "What are the eligibility requirements for a Pediatric Cardiology Fellowship?", a: "Doctors and other medical professionals who meet the current program requirements can apply for the Pediatric Cardiology Fellowship. Applicants should review Medical Global Academy's latest eligibility criteria before applying to confirm that they meet the required academic and professional qualifications." },
    { q: "What is the duration of a Pediatric Cardiology Fellowship?", a: "The Pediatric Cardiology Fellowship has a duration of 12 months. The program provides structured learning across pediatric cardiology, congenital heart disease, diagnostic methods, cardiac imaging, arrhythmias, heart failure and other important areas of pediatric cardiovascular care." },
    { q: "How can I apply for a Pediatric Cardiology Fellowship?", a: "Applicants can review the admission requirements and complete the Pediatric Cardiology Fellowship application process through Medical Global Academy. The admissions team can provide the latest details about available batches, required documents and enrollment steps." },
    { q: "What does the Pediatric Cardiology Fellowship curriculum cover?", a: "The Pediatric Cardiology Fellowship curriculum covers congenital heart disease, pediatric ECG, echocardiography, cardiac imaging, arrhythmias, heart failure, cardiomyopathies, neonatal cardiac conditions and pediatric cardiac interventions. Case-based learning and expert mentorship help doctors connect core concepts with clinically relevant decision-making." },
    { q: "Is the Pediatric Cardiology Fellowship available online?", a: "Yes. The Pediatric Cardiology Fellowship follows an online learning format and provides access to structured educational resources through the LMS. Doctors can study the curriculum, use available learning materials and receive mentorship through the program. Applicants should review the current program details for the latest information about the learning format and certification." },
  ],
  "Cosmetic Surgery Fellowship": [
    { q: "Who can apply for the Cosmetic Surgery Fellowship?", a: "The Cosmetic Surgery Fellowship is designed for doctors who want to develop focused skills in cosmetic and aesthetic practice. Applicants should check the current eligibility criteria and ensure that their medical qualification and professional background meet the requirements before enrolment." },
    { q: "Can doctors pursue a Cosmetic Surgery Fellowship after General Surgery?", a: "Doctors considering a cosmetic surgery fellowship after general surgery can explore this program if they meet the eligibility criteria. The training focuses on cosmetic and aesthetic procedures, patient assessment, treatment planning, clinical learning, and safe patient care." },
    { q: "What does the Cosmetic Surgery Training include?", a: "The cosmetic surgery training covers areas such as patient assessment, treatment planning, facial aesthetic procedures, body contouring, breast procedures, postoperative care, and complication management. Learners also receive access to lectures, study resources, Q&A support, and mentorship." },
    { q: "Is there a Cosmetic Surgery Course in India for doctors?", a: "Yes. Doctors looking for a cosmetic surgery course in India can explore the Medical Global Academy program. The course combines structured academic learning, specialist guidance, clinical-focused learning, study resources, and mentorship to support professional skill development." },
    { q: "Does the Fellowship in Cosmetic Surgery provide certification?", a: "The Fellowship in Cosmetic Surgery includes certification as part of the program, subject to the applicable completion and assessment requirements. Doctors should review the current certification details and course terms before enrolment." },
  ],
  "Interventional Pain Management Fellowship": [
    { q: "Who is eligible for the Interventional Pain Management Fellowship?", a: "The Interventional Pain Management Fellowship is designed for eligible doctors who want structured training in interventional pain care. Applicants should meet the program's current eligibility requirements and review the admission criteria before applying." },
    { q: "How long is the Interventional Pain Management Fellowship?", a: "The Interventional Pain Management Fellowship is a 12-month program. It combines academic learning, clinical exposure, and practical training to help doctors develop relevant skills in interventional pain management." },
    { q: "What training is included in the Interventional Pain Management Fellowship?", a: "The fellowship provides structured training in pain assessment, clinical decision-making, and interventional procedures. Doctors receive practical exposure to areas such as nerve blocks, epidural injections, radiofrequency procedures, ultrasound-guided interventions, neuromodulation, and other advanced pain interventions." },
    { q: "How can I apply for the Interventional Pain Management Fellowship?", a: "Doctors interested in the fellowship can review the current admission requirements and application process provided by Medical Global Academy. Applicants can then submit the required information through the official application process." },
    { q: "Is the Interventional Pain Management Fellowship available in India?", a: "Yes, the program is positioned as an Interventional Pain Management Fellowship in India for doctors seeking structured training in interventional pain care. Applicants should check the current program details for the latest training structure, eligibility, and admission information." },
  ],
  "Fellowship in Pain Management": [
    { q: "Who can apply for the Fellowship in Pain Management?", a: "The Fellowship in Pain Management is intended for eligible doctors seeking structured training in pain medicine. Applicants should meet the eligibility requirements set by Medical Global Academy before submitting their application." },
    { q: "Is the Fellowship in Pain Management offered online?", a: "Yes. Medical Global Academy offers the fellowship through an online learning format, allowing eligible doctors to access the program curriculum while continuing their professional work." },
    { q: "What is the duration of the Pain Management Fellowship?", a: "The Pain Management Fellowship is a 12-month program. The program follows a structured timeline that allows enrolled doctors to progress through the required curriculum and program components." },
    { q: "What does the Pain Management Fellowship program include?", a: "The program includes structured learning across pain assessment, pharmacology, neuropathic pain, cancer pain, pediatric pain, palliative care, interventional approaches, regenerative medicine, neuromodulation, research, and multidisciplinary pain care." },
    { q: "What certificate will I receive after completing the fellowship?", a: "Doctors who successfully complete the program receive the certificate specified by Medical Global Academy under its current certification requirements. Applicants should review the official certification and completion requirements before enrolment." },
  ],
  "Cosmetic Gynecology Fellowship": [
    { q: "Who can apply for the Cosmetic Gynecology Fellowship?", a: "The Cosmetic Gynecology Fellowship is designed for qualified doctors and gynecologists seeking focused training in cosmetic and aesthetic gynecology. Applicants should review the current eligibility requirements before applying." },
    { q: "What is the duration of the Cosmetic Gynecology Fellowship?", a: "The Cosmetic Gynecology Fellowship follows the duration defined by the program structure. Doctors should check the latest course details for the current fellowship duration and training schedule before enrollment." },
    { q: "What are the fees for the Cosmetic Gynecology Fellowship?", a: "Cosmetic Gynecology Fellowship fees depend on the current program and enrollment terms. Prospective applicants should contact Medical Global Academy for the latest fee details before confirming admission." },
    { q: "How can doctors apply for the Cosmetic Gynecology Fellowship?", a: "Doctors can review the current eligibility criteria and complete the official application process for the fellowship. Contact Medical Global Academy for the latest application steps and enrollment guidance." },
    { q: "Is the Cosmetic Gynecology Fellowship suitable for gynecologists?", a: "Yes. The fellowship is suitable for qualified gynecologists and doctors who want focused training in cosmetic and aesthetic gynecology and wish to expand their professional clinical expertise." },
  ],
  "Fellowship in Oral Surgery": [
    { q: "What does the Fellowship in Oral Surgery include?", a: "The Fellowship in Oral Surgery includes online learning, clinical attachment and expert mentorship. Doctors can study topics such as patient assessment, diagnosis, treatment planning, surgical techniques, surgical extractions, impacted teeth, minor oral surgery, implantology, oral pathology, trauma care, anesthesia and post-operative care." },
    { q: "How long is the Oral Surgery Fellowship?", a: "The Oral Surgery Fellowship is a 12-month program. It combines structured online learning with clinical attachment and mentorship to give doctors a focused learning pathway in oral surgery." },
    { q: "Does the Oral Surgery Fellowship include clinical attachment?", a: "Yes. The program includes clinical attachment along with online learning. This allows doctors to add practical clinical exposure to their academic learning during the oral surgery fellowship." },
    { q: "Can doctors complete the Oral Surgery Fellowship through online learning?", a: "Yes. The oral surgery fellowship includes online learning with recorded lectures and study resources. Doctors can use these resources to study the course content in a flexible format while also taking part in the clinical component of the program." },
    { q: "How can doctors apply for the Fellowship in Oral Surgery?", a: "Doctors interested in the Fellowship in Oral Surgery can use the enquiry or enrolment option on the Medical Global Academy course page. The admissions team can provide the latest information about the application process, course requirements and enrolment steps." },
  ],
  "Fellowship in Minimally Invasive Surgery": [
    { q: "What does the Fellowship in Minimally Invasive Surgery include?", a: "The Fellowship in Minimally Invasive Surgery includes structured learning in laparoscopic, endoscopic, and robotic surgical techniques. Doctors learn about patient assessment, surgical planning, operative care, complication management, and post-operative care. The course also includes clinical training and expert guidance to connect learning with clinical practice." },
    { q: "Who is the Minimally Invasive Surgery Fellowship for?", a: "The Minimally Invasive Surgery Fellowship is designed for doctors and surgeons who want to strengthen their skills in minimally invasive surgical techniques. It is suitable for medical professionals who want structured learning and clinical exposure in modern laparoscopic, endoscopic, and robotic approaches. Doctors should confirm the current admission requirements before enrolment." },
    { q: "Does the fellowship include clinical training?", a: "Yes. The fellowship includes clinical training along with structured learning. It helps doctors connect surgical concepts with clinical practice. Training covers areas such as patient assessment, surgical planning, operative techniques, complication management, and post-operative care within the course structure." },
    { q: "What techniques are covered in the Minimally Invasive Surgery Fellowship?", a: "The fellowship covers laparoscopic, endoscopic, and robotic approaches to minimally invasive surgery. The curriculum also includes applications across general and gastrointestinal surgery, with additional learning related to gynecological and urological procedures." },
    { q: "How can I apply for the Fellowship in Minimally Invasive Surgery?", a: "Doctors interested in the Fellowship in Minimally Invasive Surgery can use the course enquiry or enrolment option provided by Medical Global Academy. The admissions team can provide the latest details about eligibility, course format, clinical training, fees, and enrolment requirements before registration." },
  ],
  "Fellowship in Preventive Cardiology": [
    { q: "Who is eligible for the Fellowship in Preventive Cardiology?", a: "The Fellowship in Preventive Cardiology is designed for eligible medical professionals who meet the program's admission requirements. MBBS-qualified doctors and other eligible healthcare professionals may apply, subject to the Academy's stated eligibility criteria. Applicants should review the current requirements before enrolling to confirm that they meet the eligibility criteria for the preventive cardiology fellowship." },
    { q: "What is the duration of the Preventive Cardiology Fellowship?", a: "The Preventive Cardiology Fellowship is a 12-month program. It combines structured learning with a hybrid learning approach, clinical attachment, and expert mentorship, providing participants with an extended learning pathway focused on preventive cardiovascular care and risk management." },
    { q: "What does the Preventive Cardiology Fellowship curriculum cover?", a: "The Preventive Cardiology Fellowship curriculum covers cardiovascular risk assessment, hypertension, dyslipidemia, diabetes, obesity, lifestyle medicine, nutrition, exercise, and evidence-based preventive care. The program is designed to strengthen participants' understanding of cardiovascular risk management and prevention-focused approaches that can support their clinical practice." },
    { q: "What clinical training is included in the Preventive Cardiology Fellowship?", a: "The fellowship includes a clinical attachment that complements structured learning with practical exposure to preventive cardiovascular care. Participants can strengthen their understanding of cardiovascular risk assessment, prevention-focused approaches, and risk-factor management through the program's clinical learning and expert mentorship framework." },
    { q: "What certification and professional recognition does the fellowship provide?", a: "On successful completion, participants receive certification from Medical Global Academy. The program also highlights CPD and ACTD-aligned certification, providing an additional professional-development credential for participants. Applicants should review the current certification and recognition details provided by the Academy before enrolling." },
  ],
  "Fellowship in Orthopedics": [
    { q: "Who can apply for the Fellowship in Orthopedics?", a: "Doctors who meet the program's eligibility criteria can apply for the Fellowship in Orthopedics. Review the official eligibility requirements and contact the Medical Global Academy admissions team if you need confirmation based on your qualifications." },
    { q: "How long is the Orthopedic Fellowship Program?", a: "The Orthopedic Fellowship Program has a duration of 12 months. Review the study format and course schedule to understand the expected time commitment before you apply." },
    { q: "What does the Orthopedic Fellowship Training include?", a: "The course includes structured learning, clinical training, and expert mentorship focused on orthopedic care. Review the official curriculum for the complete course structure and training details." },
    { q: "What are the fees for the Orthopedic Fellowship?", a: "The current fees depend on the program's official fee structure. Contact Medical Global Academy for the latest fee details, payment options, and enrollment information before applying." },
    { q: "How can doctors apply for the Orthopedic Fellowship?", a: "Doctors can review the eligibility criteria and course details before submitting the application. If you need help with the admission process or application requirements, contact the Medical Global Academy admissions team." },
  ],
  "Fellowship in Palliative Medicine": [
    { q: "How long is the Fellowship in Palliative Medicine?", a: "MGA's Fellowship in Palliative Medicine is a 12-month program with structured learning, expert guidance and access to course resources throughout the program." },
    { q: "Is the Fellowship in Palliative Medicine available online?", a: "Yes. The fellowship offers online learning with live and recorded classes, allowing doctors to access course content alongside their professional commitments." },
    { q: "What is included in the Palliative Medicine Fellowship?", a: "The program includes expert faculty guidance, live and recorded classes, free study materials, e-library access, structured learning and 1 year of post-completion mentorship." },
    { q: "What are the benefits of choosing MGA's Palliative Medicine Fellowship?", a: "MGA offers a structured 12-month fellowship, expert faculty, online learning, study resources, e-library access, mentorship and flexible payment options to support your professional development." },
    { q: "How can I enroll in the Fellowship in Palliative Medicine in India?", a: "Contact Medical Global Academy to check your eligibility, current batch availability, course fee and payment options, then complete the enrollment process." },
  ],
  "Breast Surgery Fellowship (Breast Surgical Oncology)": [
    { q: "How long is the Breast Surgical Oncology Fellowship?", a: "The Breast Surgical Oncology Fellowship is a 12-month program. It provides structured learning in breast surgery, breast cancer care, imaging, oncoplastic techniques and other key areas of surgical oncology." },
    { q: "Is the Breast Surgery Fellowship available online?", a: "Yes. The Breast Surgery Fellowship offers online learning with live and recorded classes, study materials and e-library access. This gives doctors flexibility to learn alongside their professional work." },
    { q: "Who can apply for the Breast Surgical Oncology Fellowship?", a: "The program is designed for eligible doctors and healthcare professionals. Current eligibility includes MBBS graduates with the required experience, MS Surgery/Surgical Oncology, MD/MS physicians, general surgeons and NMC-qualified doctors. Please confirm the latest eligibility before applying." },
    { q: "What does the Breast Surgery Fellowship include?", a: "The fellowship includes 18+ curriculum modules, expert faculty guidance, live and recorded classes, study materials, e-library access, tumor board discussions and one year of post-completion mentorship." },
    { q: "How can I enroll in the Breast Surgery Fellowship in India?", a: "Contact Medical Global Academy to check your eligibility, upcoming batches, course fee and flexible payment options. After confirmation, you can complete the enrollment process for the 12-month fellowship." },
  ],
  "Pediatric Orthopedic Fellowship": [
    { q: "How long is the Pediatric Orthopedic Fellowship?", a: "The Pediatric Orthopedic Fellowship runs for 12 months. The program covers key areas of pediatric orthopedic care through structured online learning and expert guidance." },
    { q: "Can I take the Pediatric Orthopedic Course online?", a: "Yes. You can take the Pediatric Orthopedic Course online and access course materials and recorded lectures remotely. This format gives you flexibility while you continue your professional work." },
    { q: "What does the Pediatric Orthopedic Fellowship cover?", a: "The fellowship covers pediatric trauma, congenital conditions, DDH, clubfoot, scoliosis, pediatric sports injuries, neuromuscular conditions, imaging, infections, tumors and rehabilitation." },
    { q: "Who can enroll in the Pediatric Orthopedic Fellowship?", a: "The program is designed for doctors and healthcare professionals who want to develop advanced knowledge in pediatric orthopedic care. Check the latest eligibility criteria with Medical Global Academy before enrollment." },
    { q: "How can I apply for the Pediatric Orthopedic Fellowship?", a: "Contact Medical Global Academy to check the current eligibility, upcoming batch, course fee and payment options. You can then complete the enrollment process for the 12-month program." },
  ],
  "Fellowship in Rheumatology": [
    { q: "Is this Fellowship in Rheumatology available online?", a: "Yes. The Fellowship in Rheumatology is available through an online learning format, giving eligible medical professionals flexible access to the programme." },
    { q: "What is the duration of the Fellowship in Rheumatology?", a: "The Fellowship in Rheumatology is a 12-month programme covering major areas of rheumatology through a structured curriculum." },
    { q: "Who is eligible to enrol in this fellowship?", a: "The programme is intended for eligible medical professionals. Applicants should confirm the current qualification and registration requirements with Medical Global Academy before enrolment." },
    { q: "Is the Fellowship in Rheumatology CPD accredited?", a: "Yes, if the programme's current accreditation is confirmed by Medical Global Academy, the fellowship can be presented as CPD accredited. The specific accreditation details should be clearly displayed on the course page." },
    { q: "Are EMI options available for the fellowship?", a: "Flexible EMI options are available for the programme, subject to the applicable payment terms and eligibility conditions. Applicants can contact Medical Global Academy for the current EMI options." },
  ],
  "Fellowship in Laparoscopic Surgery (FALS)": [
    { q: "What is the Fellowship in Laparoscopic Surgery, and how long does it take?", a: "The Fellowship in Laparoscopic Surgery is a 12-month, online structured programme by Medical Global Academy for MBBS/MS doctors, covering foundational to advanced laparoscopic and minimally invasive surgical techniques — including abdominal, pelvic, bariatric, colorectal, endocrine, gynaecological and emergency laparoscopic surgery — with recorded lectures, mentorship, and faculty support." },
    { q: "Can doctors based in India apply for this fellowship?", a: "Yes. The fellowship is open to MBBS/MS doctors both in India and internationally. New batches start twice a year — January to December and May to June — and the entire programme is delivered online for flexible learning." },
    { q: "Is the Fellowship in Laparoscopic Surgery accredited?", a: "Yes, this fellowship is accredited by recognized medical and educational institutions. Full accreditation details are available on this course page and can also be confirmed by our support team before enrollment." },
    { q: "What will I learn in this laparoscopic surgery fellowship?", a: "You'll gain expertise in laparoscopic anatomy, port placement, basic and advanced procedures (cholecystectomy, hernia repair, hysterectomy, colorectal surgery), suturing and tissue handling, use of modern laparoscopic instruments, and perioperative patient management — through structured curriculum, simulation-based learning and expert mentorship." },
    { q: "How do I apply for the Fellowship in Laparoscopic Surgery?", a: "Click \"Enroll Now\" or \"Get Free Details on WhatsApp\" on this page, fill in your qualification and specialization details, and our team will contact you with the application process, fees, and batch start dates." },
  ],
  "Fellowship in Anesthesia / Anesthesiology": [
    { q: "Who is eligible for the Fellowship in Anesthesia at Medical Global Academy?", a: "Eligibility depends on the current admission criteria of the program. Candidates should check the latest eligibility requirements with Medical Global Academy before applying." },
    { q: "Can I pursue the Fellowship in Anesthesia after MBBS?", a: "Candidates interested in pursuing a Fellowship in Anesthesia after MBBS should check the current eligibility criteria of Medical Global Academy before applying." },
    { q: "Is the Fellowship in Anesthesia available online?", a: "Yes. The 12-month Fellowship in Anesthesia at Medical Global Academy is offered through an online learning format with recorded lectures, study material, expert faculty guidance and mentorship." },
    { q: "Can international medical graduates apply for the Fellowship in Anesthesia?", a: "International medical graduates can explore the fellowship based on the program's current eligibility and admission requirements. Applicants should contact Medical Global Academy to confirm their eligibility and required documentation." },
    { q: "What are the duration and payment options for the Fellowship in Anesthesia?", a: "The Fellowship in Anesthesia is a 12-month online program. Medical Global Academy also provides flexible payment or financing options, subject to the current terms of the program." },
  ],
  "Fellowship in Gynae Oncology": [
    { q: "Who is eligible for the Fellowship in Gynae Oncology at Medical Global Academy?", a: "Eligibility depends on the current admission criteria of the program. Applicants should check the latest qualification, specialization and experience requirements with Medical Global Academy before applying." },
    { q: "Is the Fellowship in Gynae Oncology available online?", a: "Yes. The 12-month Fellowship in Gynae Oncology is offered through an online learning format with structured educational content, live and recorded lectures, study resources, expert faculty guidance and one-year mentorship." },
    { q: "Can I apply for the Fellowship in Gynae Oncology in India?", a: "Eligible medical professionals can apply according to the current admission requirements of the program. Contact Medical Global Academy to confirm your eligibility before applying." },
    { q: "What is the duration of the Fellowship in Gynae Oncology?", a: "The Fellowship in Gynae Oncology is a 12-month program delivered through an online learning format." },
    { q: "What topics are covered in the Fellowship in Gynae Oncology?", a: "The program covers major areas of gynecologic oncology, including cancer screening and prevention, cervical, ovarian, endometrial, vulvar and vaginal cancers, surgical oncology, medical management, palliative care, survivorship and multidisciplinary cancer care." },
  ],
  "Fellowship in Laparoscopy and Hysteroscopy": [
    { q: "What is the difference between hysteroscopy and laparoscopy in clinical practice?", a: "Hysteroscopy is used for direct visualization and intervention inside the uterine cavity ideal for conditions like submucosal fibroids, septum, and Asherman syndrome. Laparoscopy addresses extra-uterine pathology — endometriosis, adnexal masses, and pelvic pathology requiring abdominal access. Many complex gynecological cases require competence in both, which is why this fellowship trains doctors to integrate diagnostic and operative decision-making across both approaches rather than treating them as separate skill sets." },
    { q: "How is this fellowship structured for working doctors?", a: "This fellowship runs over 12 months in an online-mode, flexible format, combining live case observation, simulation-based practice, and mentorship, so practicing doctors can build real surgical confidence alongside their existing work." },
    { q: "What is the fee or cost of this fellowship programme?", a: "The fellowship cost depends on the enrollment batch and payment plan chosen. Flexible payment options are available, and detailed fee information is shared directly on request through the enquiry form on this page." },
    { q: "What postoperative care protocols does this fellowship cover for laparoscopy and hysteroscopy cases?", a: "The curriculum covers postoperative monitoring, complication management, and discharge planning for both procedures — including thermal injury and fluid overload prevention in hysteroscopy, and conversion or complication protocols in laparoscopy. Doctors also learn to counsel patients on realistic recovery timelines for each procedure type." },
    { q: "Who is eligible to join this fellowship in laparoscopy and hysteroscopy?", a: "This fellowship is designed for MBBS doctors with a DGO or equivalent postgraduate qualification in obstetrics and gynaecology who want to build advanced expertise in minimally invasive gynecological surgery" },
  ],
  "Fellowship in Endocrinology": [
    { q: "Can I enrol in an online Fellowship in Endocrinology in India?", a: "Yes. MGA offers a 12-month online fellowship for eligible doctors in India. Join live classes, access recorded lessons and study alongside your medical practice. Contact our admissions team to enrol in the next available batch." },
    { q: "Can MBBS doctors apply for MGA's Fellowship in Endocrinology?", a: "MBBS graduates can contact MGA's admissions team to check their eligibility under the current admission criteria. Share your qualifications and medical registration details to confirm whether you can apply." },
    { q: "What is the fee for MGA's online endocrinology fellowship course?", a: "MGA offers online and hybrid study options with different fees. Request the latest fee structure, payment details and upcoming batch information from our admissions team before enrolling." },
    { q: "Can I enrol in a hybrid Fellowship in Endocrinology at MGA?", a: "MGA offers a hybrid option that combines online study with a hospital-based learning period, subject to current availability. Contact our team to confirm the next batch, location and fees." },
    { q: "How can I apply for MGA's Fellowship in Endocrinology?", a: "Request the course brochure or contact our admissions team. We can help you check eligibility, compare online and hybrid options, review current fees and complete your application for the next available batch." },
  ],
  "Fellowship in Interventional Cardiology": [
    { q: "What does the Fellowship in Interventional Cardiology include?", a: "The fellowship includes live sessions, recorded lectures, study material, LMS access, specialist faculty support, Q&A sessions, e-library access and one-year mentorship." },
    { q: "What learning options are available for the Interventional Cardiology Fellowship?", a: "The programme offers flexible learning options designed to help doctors continue their professional commitments while completing their fellowship training." },
    { q: "What accreditation does the Interventional Cardiology Fellowship provide?", a: "The programme provides CPD and ACTD accreditation as stated for the course. These accreditations support the professional learning and certification offered through the programme." },
    { q: "Does the fellowship offer clinical attachment or observation?", a: "Clinical attachment or observation may be available as part of the programme, subject to the course structure, location, hospital or clinic availability and applicable conditions." },
    { q: "Are EMI options available for the Interventional Cardiology Fellowship?", a: "EMI options may be available for the programme. Doctors can check the current fee structure and available payment options with Medical Global Academy before enrolment." },
  ],
  "Fellowship in Pathology": [
    { q: "Who is the Fellowship in Pathology designed for?", a: "The Fellowship in Pathology is designed for doctors seeking focused learning and professional development in pathology. Doctors can review the programme eligibility, curriculum and learning format to determine whether the fellowship aligns with their academic background and professional objectives." },
    { q: "Is the Pathology Fellowship available in online and hybrid modes?", a: "Yes. The programme is available through online and hybrid learning modes, providing flexibility for doctors with ongoing professional commitments. Doctors comparing online fellowship courses in pathology can review the programme structure, curriculum and academic support before selecting a suitable learning format." },
    { q: "Is this fellowship suitable for doctors after MD Pathology?", a: "Doctors considering a fellowship after MD Pathology can review the programme eligibility, curriculum and learning format to assess its suitability for their professional goals. If you are comparing fellowship courses after MD Pathology, consider how the programme aligns with your qualification and intended professional development." },
    { q: "Why should doctors consider this pathology fellowship in India?", a: "Doctors should evaluate the curriculum, eligibility, programme duration, learning mode, academic support and overall relevance to their professional objectives when choosing a pathology fellowship in India. The online and hybrid formats can offer flexibility while doctors continue their professional commitments." },
    { q: "How can doctors apply for the Pathology Fellowship?", a: "Doctors interested in the programme can review the course details and eligibility requirements and submit the enquiry form on the page. If you need clarification before applying, contact Medical Global Academy to discuss your requirements and understand the next steps towards enrolment." },
  ],
  "Robotic Surgery Fellowship": [
    { q: "Who is eligible for the Robotic Surgery Fellowship?", a: "The Robotic Surgery Fellowship is designed for qualified surgeons and medical professionals who meet the programme's academic and professional requirements. Applicants should review the current eligibility criteria before applying." },
    { q: "What does the Robotic Surgery Fellowship curriculum cover?", a: "The robotic surgery fellowship curriculum covers robotic surgical systems, surgical planning, clinical workflows, patient selection, minimally invasive techniques, patient safety, and clinical applications of robotic-assisted surgery." },
    { q: "How long is the Robotic Surgery Fellowship?", a: "The robotic surgery fellowship duration follows the programme structure set by Medical Global Academy. Applicants should check the current programme information for the latest duration and learning schedule." },
    { q: "What are the fees for the Robotic Surgery Fellowship?", a: "The robotic surgery fellowship fees depend on the programme terms and applicable enrolment options. Applicants should confirm the current fee details with Medical Global Academy before enrolment." },
    { q: "How can I apply for the Robotic Surgery Fellowship?", a: "To apply for the Robotic Surgery Fellowship, review the programme eligibility and admission requirements, then follow Medical Global Academy's application process. The admissions team can provide the latest enrolment and batch information." },
  ],
  "Fellowship in Ophthalmology": [
    { q: "Who can apply for the Fellowship in Ophthalmology?", a: "The Fellowship in Ophthalmology is designed for eligible doctors and medical professionals who want to strengthen their knowledge and skills in ophthalmology. Applicants should meet the eligibility requirements set by Medical Global Academy before applying. Please check the current program requirements for the latest admission details." },
    { q: "Is the Ophthalmology Fellowship available online?", a: "Yes. Medical Global Academy offers the Ophthalmology Fellowship through an online learning format. This flexible approach allows eligible doctors to continue their clinical or professional commitments while completing structured academic learning in ophthalmology." },
    { q: "What does the Ophthalmology Fellowship cover?", a: "The program covers key areas of ophthalmology, including cataract, retina, glaucoma, pediatric ophthalmology, uveitis, ocular oncology, oculoplastic surgery, and ophthalmic imaging. It provides structured academic learning and case-based knowledge across these core areas of ophthalmology." },
    { q: "Does the fellowship include CPD UK and ACTD certification?", a: "Yes. The fellowship includes CPD UK and ACTD-aligned certification for eligible participants who successfully complete the program. These credentials can support professional development and add value to a professional profile." },
    { q: "Who is the Ophthalmology Fellowship designed for?", a: "The fellowship is designed for eligible doctors and ophthalmology professionals who want to strengthen their knowledge across key areas of eye care. Its online format provides flexibility for professionals who want to continue their existing clinical or professional commitments while pursuing structured academic development." },
  ],
  "Fellowship in Urology": [
    { q: "Who can apply for the Fellowship in Urology?", a: "The Fellowship in Urology is designed for eligible doctors and medical professionals who meet the programme's admission requirements. Candidates should review the applicable academic qualification, professional registration, experience and other eligibility criteria before submitting an application." },
    { q: "Can international doctors apply for the Fellowship in Urology?", a: "International doctors can explore the Fellowship in Urology subject to the programme's eligibility, admission and documentation requirements. Candidates practising outside India should confirm the applicable requirements with Medical Global Academy before enrolment." },
    { q: "What does the Urology Fellowship Program include?", a: "The Urology Fellowship Program combines structured academic learning with practical and clinical training, supported by expert faculty and mentorship. Doctors can review the programme curriculum, study mode, practical training components and applicable schedule to understand the learning pathway before enrolment." },
    { q: "What certification is provided after completing the Fellowship in Urology?", a: "Eligible candidates who successfully complete the Fellowship in Urology receive the applicable programme certification from Medical Global Academy. Candidates should review the certification details, completion requirements and applicable certificate option before enrolment." },
    { q: "How can doctors enrol in the Fellowship in Urology?", a: "Doctors interested in the Fellowship in Urology can review the programme eligibility, curriculum, study mode, certification and current enrolment details before applying. Eligible candidates can then proceed through Medical Global Academy's application process and confirm the required documentation with the admissions team." },
  ],
  "Fellowship in Orthodontics": [
    { q: "Who can apply for the Fellowship in Orthodontics in India?", a: "The Fellowship in Orthodontics is designed for eligible dental professionals seeking structured orthodontic training and practical clinical exposure. Applicants should review the current programme eligibility requirements to confirm that they meet the admission criteria before applying." },
    { q: "How long is the Orthodontic Fellowship course?", a: "The Orthodontic Fellowship is a 12-month programme that combines theoretical learning with clinical exposure through a hybrid format. Applicants should check the latest batch schedule and programme details before enrolment." },
    { q: "Does the Orthodontic Fellowship Course include clinical training?", a: "Yes. The programme combines theoretical learning with clinical exposure focused on orthodontic diagnosis, treatment planning, fixed orthodontics and clear aligner concepts. The exact clinical components should be reviewed in the current programme structure before enrolment." },
    { q: "Can international dental professionals apply for the Fellowship in Orthodontics?", a: "Dental professionals from outside India can review the programme and contact Medical Global Academy to confirm current eligibility, admission requirements, participation options and other requirements applicable to international applicants." },
    { q: "What certification is provided after completing the Orthodontic Fellowship?", a: "Eligible participants who successfully complete the programme can receive fellowship certification according to the applicable programme completion requirements. Applicants should review the current certification terms with Medical Global Academy before enrolment." },
  ],
  "Fellowship in Maxillofacial Surgery": [
    { q: "Who is eligible for the Fellowship in Maxillofacial Surgery?", a: "The fellowship is designed for qualified dental and medical professionals seeking focused postgraduate-level training and professional development in maxillofacial surgery. Candidates should review the current admission requirements before applying." },
    { q: "What does the Maxillofacial Surgery Fellowship include?", a: "The fellowship focuses on specialist knowledge and key concepts related to maxillofacial surgery. It is structured to help participants strengthen their understanding and develop greater confidence in their specialist field." },
    { q: "How long is the Maxillofacial Surgery Fellowship?", a: "The Fellowship in Maxillofacial Surgery is a 12-month program, providing a structured period of focused learning and professional development in maxillofacial surgery." },
    { q: "Is clinical training included in the Maxillofacial Fellowship?", a: "The course structure and available clinical training should be reviewed on the current course page before applying, as the exact training format and requirements may vary by program." },
    { q: "How can I apply for the Maxillofacial Surgery Fellowship?", a: "Candidates can apply through Medical Global Academy after reviewing the course requirements, eligibility criteria, and admission process. Applicants should check the current course page for the latest application details." },
  ],
  "Fellowship in Neuroradiology": [
    { q: "Is this an online Neuroradiology Fellowship with clinical training?", a: "Yes. The programme follows a hybrid format that combines online academic learning with clinical attachment and practical exposure to neuroimaging cases." },
    { q: "Who can apply for this Neuroradiology Fellowship?", a: "The programme is intended for radiologists, neurologists, MBBS graduates, and physicians interested in specialised neuroimaging training, subject to the programme's eligibility requirements." },
    { q: "What is the duration of the Neuroradiology Fellowship?", a: "The programme has a duration of 12 months, combining structured academic learning, case-based discussions, mentorship, and clinical training." },
    { q: "Which areas are covered in the programme?", a: "Training includes brain, spine, and head & neck imaging, MRI and CT techniques, advanced neuroimaging, neurovascular imaging, neuro-oncology, pediatric neuroradiology, neurodegenerative disorders, and structured reporting." },
    { q: "Does the programme include practical clinical exposure?", a: "Yes. The clinical component includes exposure to actual neuroimaging cases, monitored reporting and diagnostic processes, radiology department experience, and multidisciplinary clinical discussions." },
  ],
  "Fellowship in Endoscopy": [
    { q: "Who can apply for the Fellowship in Endoscopy?", a: "The programme is designed for eligible doctors and medical professionals who want focused training in gastrointestinal endoscopy. It suits professionals who want to strengthen their procedural knowledge, clinical skills, and confidence through structured learning." },
    { q: "Is this an endoscopy fellowship for surgeons?", a: "Yes. The programme suits surgeons who want focused endoscopy training and want to expand their clinical skill set. It provides a structured learning path for doctors seeking stronger knowledge and practical exposure in GI endoscopy." },
    { q: "What does the GI endoscopy fellowship cover?", a: "The programme covers core areas of gastrointestinal endoscopy and includes structured training around relevant endoscopic procedures. Where included in the curriculum, the fellowship also covers endoscopy and colonoscopy training with a focus on practical clinical learning." },
    { q: "How long does the Fellowship in Endoscopy take?", a: "The fellowship runs for 12 months. This duration gives participants time to follow the structured curriculum, build their endoscopy knowledge, and develop their skills through the programme's learning and clinical components." },
    { q: "What training does the Fellowship in Endoscopy provide?", a: "The programme provides structured learning focused on gastrointestinal endoscopy, supported by clinical exposure, faculty guidance, and course resources. It helps eligible doctors develop focused endoscopy skills and strengthen their professional clinical practice." },
  ],
  "Fellowship in Echocardiography": [
    { q: "Can doctors enrol in the Fellowship in Echocardiography?", a: "Doctors can check the current eligibility rules before enrolment. The admissions team can also help confirm the course requirements." },
    { q: "Is the Fellowship in Echocardiography available online?", a: "Yes. The programme offers online lessons and LMS access. Doctors can study online during the 12-month programme." },
    { q: "Are EMI options available for the Fellowship in Echocardiography?", a: "Yes. The programme offers EMI options, subject to the current course terms. Check the latest payment details before enrolment." },
    { q: "Does the Fellowship in Echocardiography include CPD certification?", a: "Yes. The programme includes CPD certification. Doctors can check the current course terms for certification details." },
    { q: "How can I enrol in the Fellowship in Echocardiography?", a: "You can check the course details, eligibility and admission process before you enrol. Contact the admissions team for the latest enrolment steps." },
  ],
  "Fellowship in Hematology": [
    { q: "Who can join the Fellowship in Hematology?", a: "The Fellowship in Hematology is designed for MBBS graduates, MD/MS doctors, and registered medical professionals who want to build their knowledge of blood and bone marrow disorders." },
    { q: "Is the Fellowship in Hematology a 12-month course?", a: "Yes. The Fellowship in Hematology is a 12-month programme. It covers anemia, leukemia, lymphoma, bleeding and clotting disorders, bone marrow disorders, and blood transfusion." },
    { q: "What does the Fellowship in Clinical Hematology cover?", a: "The Fellowship in Clinical Hematology covers blood disorders, blood tests, blood smears, bone marrow tests, coagulation, blood cancer, and transfusion medicine. It also builds a strong base in clinical hematology." },
    { q: "Does the course include live classes and study material?", a: "Yes. The course includes live and recorded classes, study material, and Q&A support. These resources help you review key topics and clear your doubts during the course." },
    { q: "Which certificate options are available with the course?", a: "The course offers CPD and university certificate options, based on the applicable course structure. These options provide a formal record of course completion." },
  ],
  "Fellowship in Otology": [
    { q: "Who can choose the Fellowship in Otology?", a: "The Fellowship in Otology is designed for medical practitioners who want focused knowledge in ear and hearing care. It covers the assessment, diagnosis, and management of common and complex otologic conditions." },
    { q: "What does the 12-month Otology Fellowship include?", a: "The 12-month programme covers ear anatomy, hearing loss, chronic ear disease, vertigo, cochlear implants, pediatric otology, audiological assessment, and ear surgery. It also covers medical care, surgical approaches, and hearing rehabilitation." },
    { q: "What learning support is included with the programme?", a: "The programme includes online classes, recorded lectures, study material, library access, Q&A sessions, and one year of mentorship. Attending and non-attending class options are also available." },
    { q: "Which key areas are covered in the Otology curriculum?", a: "The curriculum covers audiometry, tympanometry, ABR, vestibular testing, otitis media, cholesteatoma, tympanoplasty, mastoidectomy, cochlear implants, hearing rehabilitation, pediatric otology, neurotology, and otologic research." },
    { q: "Which areas can doctors explore after the programme?", a: "Doctors can explore areas such as ear surgery, hearing rehabilitation, cochlear implants, pediatric otology, neurotology, vestibular medicine, teaching, and research. The programme supports a focused approach to otologic care based on individual career goals." },
  ],
  "Fellowship in Laparoscopy": [
    { q: "Is this a 12-month Fellowship in Laparoscopy for doctors?", a: "Yes. The programme is designed as a 12-month fellowship for doctors who want to develop their knowledge and skills in laparoscopic surgery." },
    { q: "What does the Fellowship in Laparoscopy cover?", a: "The programme covers laparoscopic anatomy, patient selection, port placement, instrument handling, suturing, tissue handling, common procedures, perioperative care and complication management." },
    { q: "Does the fellowship include expert mentorship?", a: "Yes. Expert mentorship and case discussions help doctors connect core concepts with surgical decision-making throughout the programme." },
    { q: "Are flexible financing options available for the fellowship?", a: "Yes. Flexible financing options are available to help doctors plan their programme fees." },
    { q: "What study support is included in the Fellowship in Laparoscopy?", a: "Doctors receive structured study resources to review key topics and support learning throughout the 12-month programme." },
  ],
  "Pediatric Critical Care Fellowship": [
    { q: "Is the Pediatric Critical Care Fellowship designed for doctors?", a: "Yes. The programme is designed for doctors who want to build stronger knowledge in pediatric critical care and PICU care." },
    { q: "Is the Pediatric Critical Care Fellowship a 12-month programme?", a: "Yes. The programme runs for 12 months and covers key areas of pediatric critical care through a clear and planned learning format." },
    { q: "Can I complete the Pediatric Critical Care Fellowship online?", a: "Yes. The programme offers online learning with live and recorded lectures, study material, digital resources and LMS access." },
    { q: "Does the fellowship include one year of mentor support?", a: "Yes. Doctors receive one year of mentor support along with faculty guidance during the programme." },
    { q: "Does the Pediatric Critical Care Fellowship include CPD certification?", a: "Yes. The programme includes CPD certification as part of its stated course offering." },
    { q: "How can I enquire about the Pediatric Critical Care Fellowship?", a: "You can contact Medical Global Academy to learn more about the programme, enrolment process and available financing options." },
  ],
  "Dermatopathology Fellowship": [
    { q: "Who can enroll in the Dermatopathology Fellowship?", a: "The fellowship is designed for doctors who want to build focused knowledge in dermatopathology and skin pathology. It is suitable for doctors who want to improve their understanding of skin biopsies, skin diseases, tumors, melanoma, and related diagnostic methods." },
    { q: "How long is the Dermatopathology Fellowship?", a: "The Dermatopathology Fellowship is a 12-month programme. Doctors can follow the full curriculum, access study material, attend online lessons, and receive mentor support throughout the programme." },
    { q: "Is the Dermatopathology Fellowship available online?", a: "Yes. The fellowship follows an online learning format. Doctors can access online lessons, recorded lectures, study material, and case-based learning while continuing their professional work." },
    { q: "Does the Dermatopathology Fellowship include mentorship and CPD certification?", a: "Yes. The programme includes one year of mentorship and CPD certification. Expert faculty support helps doctors stay connected with the learning process throughout the 12-month programme." },
    { q: "How can I enrol in the Dermatopathology Fellowship?", a: "You can contact Medical Global Academy for admission details and enrolment support. The team can also guide you about available payment options and the steps to join the fellowship." },
  ],
  "Fellowship in Laser Proctology": [
    { q: "Is the Fellowship in Laser Proctology a 12-month course?", a: "Yes. The programme runs for 12 months and covers anorectal care, laser methods, patient care, case learning, and related clinical topics." },
    { q: "Is this programme suitable for doctors who want to learn laser proctology?", a: "Yes. The programme is designed for doctors who want to build their skills in anorectal care and laser-based treatment." },
    { q: "Does the programme include clinical exposure and case learning?", a: "Yes. It includes clinical exposure, case talks, and mentor support. These help doctors connect course learning with clinical cases." },
    { q: "Does the programme offer online classes and study material?", a: "Yes. Doctors can learn through online classes, recorded lectures, and study material. Q&A support is also available during the programme." },
    { q: "Does the Fellowship in Laser Proctology include mentor support?", a: "Yes. The programme includes 1 year of mentor support. Doctors can use this support to discuss course topics and learn from case-based sessions." },
  ],
  "Fellowship in Oncopathology": [
    { q: "What is the duration of the Fellowship in Oncopathology?", a: "The programme has a 12-month duration. It gives doctors a clear study plan and enough time to learn key topics step by step." },
    { q: "What does the Fellowship in Oncopathology include?", a: "The programme covers histopathology, molecular pathology, immunohistochemistry, cancer genomics, FISH, PCR, digital pathology and precision oncology." },
    { q: "What learning support does the programme offer?", a: "You get recorded lectures, LMS access and expert faculty guidance during the programme. This helps you study at your own pace and follow a clear learning plan." },
    { q: "Does the programme offer CPD certification?", a: "Yes. The programme includes CPD certification after course completion, giving you a record of your professional learning." },
    { q: "How can the Fellowship in Oncopathology support your professional growth?", a: "The programme helps doctors build focused knowledge in oncopathology and cancer care. It also helps you connect key topics with their use in daily medical work." },
  ],
  "Fellowship in Musculoskeletal Ultrasound": [
    { q: "Who can enrol in the Fellowship in Musculoskeletal Ultrasound?", a: "The fellowship is for eligible doctors, including MBBS doctors, MD/MS physicians, general physicians, orthopedic doctors and NMC-qualified doctors." },
    { q: "How long is the Fellowship in Musculoskeletal Ultrasound?", a: "The programme runs for 12 months and offers online learning with live and recorded classes through the LMS." },
    { q: "What do I get with the Fellowship in Musculoskeletal Ultrasound?", a: "Doctors get LMS access, live and recorded classes, free study material, e-library access and guidance from super-specialist faculty." },
    { q: "Does the fellowship provide a CPD-accredited certificate?", a: "Yes. Eligible doctors receive a CPD-accredited certificate after they complete the programme requirements." },
    { q: "Does the MSK ultrasound fellowship include mentorship?", a: "Yes. Doctors get one year of post-completion mentorship along with the fellowship programme." },
  ],
  "Fellowship in Family Medicine": [
    { q: "Who is this programme designed for?", a: "This programme is designed for doctors and medical professionals who want to strengthen their knowledge and skills in family and primary care." },
    { q: "How long does the programme take to complete?", a: "The programme has a 12-month duration, allowing doctors to develop knowledge across key areas of family medicine through a structured learning format." },
    { q: "Can I study while continuing my medical practice?", a: "Yes. The online format, recorded lectures and study resources provide flexibility for working doctors to continue learning alongside their professional commitments." },
    { q: "What learning support will I receive?", a: "You get recorded lectures, study material, library access, Q&A sessions and 1 year of mentorship. Super-specialist faculty also support your learning journey." },
    { q: "Can I choose a flexible payment option for the programme?", a: "Yes. Flexible payment and financing options are available to help doctors plan their enrolment according to their needs." },
  ],
  "Thoracic Surgery Fellowship": [
    { q: "Is the Thoracic Surgery Fellowship suitable for doctors?", a: "Yes. This fellowship suits doctors who want to build stronger knowledge in thoracic surgery and improve their understanding of modern thoracic care." },
    { q: "What are the eligibility requirements for this Thoracic Surgery Fellowship?", a: "Doctors should meet the programme's current eligibility rules before they apply. Please check the latest admission requirements for the exact qualification criteria." },
    { q: "What does the 12-month Thoracic Surgery Fellowship programme cover?", a: "The programme covers VATS, robotic surgery, chest cancer care, airway and esophageal surgery, pleural care, mediastinal surgery, thoracic trauma, and post-surgery care." },
    { q: "Can doctors join an online Thoracic Surgery Fellowship while working?", a: "Yes. The online format lets doctors learn alongside their work. Doctors can follow the course at a pace that fits their professional schedule." },
    { q: "Why should doctors choose a 12-month Thoracic Surgery Fellowship?", a: "The programme gives doctors a focused 12-month learning path with online study, super-specialist faculty, and one-year mentorship. It helps doctors build knowledge in key areas of thoracic surgery." },
  ],
  "Fellowship in Pediatric Echocardiography": [
    { q: "What does the Pediatric Echocardiography Fellowship cover?", a: "The fellowship covers pediatric cardiac imaging, 2D echo, M-mode, Doppler, colour flow imaging, congenital heart disease, neonatal echocardiography, 3D echocardiography, and clinical image review." },
    { q: "Is the pediatric echocardiography course available online?", a: "Yes. The course offers online classes, recorded lectures, LMS access, study resources, case discussions, expert faculty support, and one-year mentorship." },
    { q: "How long is the pediatric echocardiography course?", a: "The programme runs for 12 months and includes structured learning, online resources, expert guidance, one-year mentorship, and CPD certification." },
    { q: "Does the course provide pediatric echocardiography training?", a: "Yes. The training covers key echo methods, Doppler imaging, congenital heart conditions, neonatal imaging, pediatric cardiac function, and advanced echocardiography topics." },
    { q: "Who can join the Fellowship in Pediatric Echocardiography?", a: "The fellowship is designed for medical professionals who want to develop their knowledge of pediatric echocardiography, pediatric cardiac imaging, and related clinical applications." },
  ],
  "Pediatric Dermatology Fellowship": [
    { q: "Who can join the Pediatric Dermatology Fellowship?", a: "The programme suits MBBS doctors, MD/MS doctors, pediatricians, general physicians, and other eligible doctors who want to build focused skills in pediatric dermatology." },
    { q: "What is the duration of the Pediatric Dermatology Fellowship?", a: "The Pediatric Dermatology Fellowship runs for 12 months and covers key areas of pediatric skin care through structured learning, clinical case discussions, and expert guidance." },
    { q: "Does the Pediatric Dermatology Fellowship offer online learning?", a: "Yes. The pediatric dermatology fellowship online programme includes live classes, recorded lectures, LMS access, study material, and clinical case discussions for flexible learning." },
    { q: "Is this Pediatric Dermatology Fellowship suitable for pediatricians?", a: "Yes. The programme suits pediatricians who want to build focused knowledge in pediatric skin conditions, clinical assessment, treatment approaches, and pediatric dermatology care." },
    { q: "Does the programme include mentorship and CPD certification?", a: "Yes. The programme includes 1-year mentorship and CPD certification, along with expert faculty guidance, study material, LMS access, and structured learning support." },
  ],
  "Fellowship in Pediatric Dentistry": [
    { q: "What are the eligibility requirements for the Fellowship in Pediatric Dentistry?", a: "Medical Global Academy sets the eligibility requirements for this fellowship. Dental professionals should check the current admission criteria with the MGA team before applying." },
    { q: "How long is the Fellowship in Pediatric Dentistry?", a: "The Fellowship in Pediatric Dentistry runs for 12 months. The course combines hybrid learning, clinical attachment, recorded lectures, academic support, and one-year mentorship." },
    { q: "What are the fees for the Fellowship in Pediatric Dentistry?", a: "The Fellowship in Pediatric Dentistry has fee options of ₹1,50,000 and ₹1,80,000. Contact the MGA admission team to confirm the applicable fee and available payment options." },
    { q: "What does the Pediatric Dentistry Fellowship course include?", a: "The course includes hybrid learning, clinical attachment, recorded lectures, expert faculty support, Q&A, library access, study resources, and one-year mentorship. The curriculum also covers key areas of pediatric dental care." },
    { q: "How do I apply for the Fellowship in Pediatric Dentistry?", a: "You can apply through the MGA course page by submitting your details through the admission option. The MGA team can guide you through the eligibility, fee, payment options, and admission process." },
  ],
  "Fellowship in Head & Neck Surgery": [
    { q: "How can I apply for the Fellowship in Head & Neck Surgery?", a: "You can submit your course enquiry with your qualification and specialization. The Medical Global Academy admissions team can guide you through the application and enrollment process." },
    { q: "Who can apply for the Head & Neck Surgery fellowship?", a: "The programme is designed for doctors who want to build advanced knowledge in head and neck surgical care. Please confirm the exact qualification and experience requirements with the admissions team." },
    { q: "How long is the Head & Neck Surgery fellowship?", a: "The programme runs for 12 months and gives doctors a structured way to build their knowledge in head and neck surgery and related areas." },
    { q: "Can I complete the Head & Neck Surgery fellowship online?", a: "Yes. The programme offers online learning, recorded study material, Q&A sessions and support from super-specialist faculty." },
    { q: "Does the fellowship include 1 year of mentorship?", a: "Yes. The programme includes 1 year of mentorship to give doctors continued support as they build their knowledge and plan their next career step." },
  ],
  "Fellowship in Hospital Management": [
    { q: "How can I apply for the Fellowship in Hospital Management?", a: "You can visit the course page and use the application or enquiry option. You may need to provide your qualification and professional details. The admissions team can guide you through the next steps." },
    { q: "Is the Fellowship in Hospital Management available online?", a: "Yes. The programme is available in online mode. The page also lists free study material with recorded lectures, Q&A sessions and 1 year of mentorship." },
    { q: "How long is the Fellowship in Hospital Management?", a: "The course duration is 12 months. The page also lists batch options and online learning for the programme." },
    { q: "Does the fellowship include mentorship and academic support?", a: "Yes. The programme includes 1 year of mentorship, free study material with recorded lectures, super-specialist faculty and Q&A sessions." },
    { q: "What topics are covered in the Fellowship in Hospital Management?", a: "The programme covers hospital management, hospital operations, healthcare policy and regulations, financial management, strategic planning, leadership, quality improvement, patient safety and healthcare information technology." },
  ],
  "Fellowship in Pediatric Endocrinology": [
    { q: "Who can apply for this fellowship?", a: "Doctors who meet programme eligibility requirements can apply. Review the current eligibility criteria and admission details before submitting your application." },
    { q: "What does the Pediatric Endocrinology Fellowship include?", a: "The programme includes structured online learning, clinical attachment, expert mentorship, recorded lectures, study resources, library access and Q&A support." },
    { q: "How is the programme delivered?", a: "The fellowship combines online learning with clinical attachment, giving doctors a flexible format with structured academic support." },
    { q: "Why choose a 12-month fellowship in pediatric endocrinology?", a: "The 12-month format gives doctors time to follow a structured curriculum, learn from specialist faculty, use study resources and receive ongoing mentorship." },
    { q: "How can I enrol in the programme?", a: "Review the eligibility and programme details, then contact admissions for current enrolment steps, batch availability and payment options, including available EMI plans." },
  ],
  "Orthopedic Oncology Fellowship": [
    { q: "Who can apply for the Orthopedic Oncology Fellowship?", a: "The programme is designed for eligible doctors who want focused learning in bone and soft tissue tumor care. Please check the latest admission and eligibility criteria with the MGA admissions team before applying." },
    { q: "Does the Orthopedic Oncology Fellowship include clinical exposure?", a: "Yes. The programme includes clinical exposure along with structured learning, case discussions, study resources, and expert faculty support. Clinical activities depend on the programme structure and attachment arrangements." },
    { q: "Is this fellowship suitable for doctors interested in limb-salvage surgery and tumor reconstruction?", a: "Yes. The curriculum covers tumor evaluation, limb-salvage surgery, reconstruction, metastatic bone disease, pediatric tumors, and multidisciplinary cancer care." },
    { q: "Can doctors continue their professional work while completing the fellowship?", a: "The programme uses a hybrid learning format that helps eligible doctors continue their professional responsibilities while completing the fellowship, subject to the programme schedule." },
    { q: "Does the programme include mentorship and academic support?", a: "Yes. Doctors receive expert faculty guidance, study resources, case-based learning, and one year of mentorship after the main fellowship period." },
  ],
  "Fellowship in Maxillofacial Radiology": [
    { q: "Who can join this maxillofacial radiology fellowship?", a: "The programme is designed for dental professionals who want to build skills in maxillofacial imaging, CBCT, scan review and diagnostic reporting." },
    { q: "How long is the maxillofacial radiology programme?", a: "The programme runs for 12 months and includes online learning, clinical case discussions, study resources and expert guidance." },
    { q: "Does the course include CBCT imaging and reporting?", a: "Yes. You will learn CBCT imaging, scan review, reporting, image quality and artifact management, along with other key imaging methods." },
    { q: "Will I learn implant and TMJ imaging in this course?", a: "Yes. The programme covers CBCT-based implant planning, TMJ imaging, airway and sinus checks, and other dental and maxillofacial imaging areas." },
    { q: "Which areas can I build skills in after this fellowship?", a: "The programme can help you build skills in CBCT reporting, dental imaging, implant planning, digital dentistry, teaching and clinical research." },
  ],
  "Robotic Gynaecology Fellowship": [
    { q: "Who can join the Robotic Gynaecology Fellowship?", a: "The fellowship is designed for surgeons, gynecologists, gynecologic oncologists, and eligible doctors who want to develop specialised knowledge in robotic gynaecological surgery and oncology." },
    { q: "How long is the Robotic Gynaecology Fellowship?", a: "The fellowship is a 12-month programme with 21+ curriculum modules covering robotic surgery, gynaecological oncology, surgical planning, perioperative care, advanced imaging, and related topics." },
    { q: "Can doctors complete the Robotic Gynaecology Fellowship online?", a: "Yes. The fellowship is available online, with live evening sessions and recorded lectures through the LMS. Doctors can access the sessions around their professional and OPD schedules." },
    { q: "What certificate do doctors receive after completing the fellowship?", a: "After successful completion of the programme, participants receive a CPD-accredited fellowship certificate, subject to the applicable programme requirements." },
    { q: "Does the fellowship include mentorship after completion?", a: "Yes. The programme includes 1-year post-completion mentorship, providing continued guidance after the fellowship is completed." },
  ],
  "Endourology Fellowship": [
    { q: "Who can apply for this fellowship?", a: "The programme is designed for doctors who want to build focused knowledge in endourology and minimally invasive urology." },
    { q: "Can I complete the programme online?", a: "Yes. The programme offers online learning with recorded classes, study resources, Q&A support and guidance from super-specialist faculty." },
    { q: "Is this programme suitable for doctors interested in minimally invasive urology?", a: "Yes. It suits doctors who want to develop focused knowledge in endourology and related areas of urology." },
    { q: "Does the programme include mentorship?", a: "Yes. Doctors receive 1-year mentorship to support their learning throughout the programme." },
    { q: "Is CPD certification available with the programme?", a: "The Fellowship in Endourology is listed among Medical Global Academy's CPD-accredited activities by the CPD Standards Office." },
  ],
  "Pediatric Robotic Surgery Fellowship": [
    { q: "Can I apply for this fellowship if I am a doctor or surgeon?", a: "Yes. The fellowship is designed for doctors and surgeons who want focused academic exposure to pediatric robotic surgery." },
    { q: "Is this fellowship suitable for working doctors?", a: "Yes. The online learning format can support doctors who want to study while managing their professional commitments." },
    { q: "Does the programme include a clinical attachment?", a: "Yes. The programme includes a clinical attachment along with online learning and case-based sessions." },
    { q: "Does the programme include 1-year mentorship?", a: "Yes. The programme includes 1-year mentorship to support your continued learning after the main programme." },
    { q: "Are EMI plans available for the fellowship?", a: "Yes. EMI plans are available. Contact the admissions team for the current payment options and terms." },
  ],
  "Fellowship in Laparoscopic Hernia Surgery": [
    { q: "Who can enrol in the Fellowship in Laparoscopic Hernia Surgery?", a: "The fellowship is designed for eligible doctors and surgeons who want focused study in laparoscopic hernia surgery. Please check the current eligibility criteria before applying." },
    { q: "What does the Fellowship in Laparoscopic Hernia Surgery cover?", a: "The fellowship covers inguinal, ventral, incisional, recurrent and complex hernias. It also covers key laparoscopic approaches, mesh use, complication management and postoperative care." },
    { q: "How long is the Fellowship in Laparoscopic Hernia Surgery?", a: "The programme runs for 12 months and gives doctors a structured path to study laparoscopic hernia surgery through course content, case-based learning and guided study." },
    { q: "Does the hernia fellowship include mentorship?", a: "Yes. The programme includes 1-year mentorship to support doctors throughout their course journey and help them review key topics and case-based learning." },
    { q: "How can I apply for the Fellowship in Laparoscopic Hernia Surgery?", a: "You can submit an enquiry to check your eligibility, course details, fees and the current admission process before you enrol." },
  ],
  "Pediatric Neurology Fellowship": [
    { q: "How long is the Pediatric Neurology Fellowship?", a: "The Medical Global Academy Pediatric Neurology Fellowship is a 12-month programme designed for doctors who want to develop focused knowledge in pediatric neurology. The programme includes online learning, specialist academic guidance and 1-year mentorship." },
    { q: "Who can apply for the Fellowship in Pediatric Neurology?", a: "Doctors interested in developing focused knowledge in pediatric neurology can review the current eligibility and admission requirements before applying. Applicants should confirm the latest requirements with Medical Global Academy." },
    { q: "What does the Pediatric Neurology Fellowship Program include?", a: "The programme covers pediatric neurological examination, epilepsy and seizure disorders, neurodevelopment, EEG, neuroimaging, neurogenetic conditions, neuromuscular disorders, neonatal neurology and pediatric neurocritical care." },
    { q: "Is the Pediatric Neurology Fellowship available online?", a: "Yes. The programme includes online learning, allowing doctors to study alongside their professional commitments. Applicants can review the current learning format and programme structure before enrolment." },
    { q: "What certification do I receive after completing the fellowship?", a: "The programme includes CPD certification as part of its professional development offering. Doctors should confirm the current certificate details, applicable accreditation and completion requirements with Medical Global Academy before enrolment." },
  ],
  "Fellowship in Addiction Medicine": [
    { q: "Why choose a Fellowship in Addiction Medicine at MGA?", a: "The Fellowship in Addiction Medicine helps doctors build focused skills in addiction care. The programme covers patient assessment, withdrawal care, treatment planning and relapse care." },
    { q: "Who can apply for an Addiction Medicine Fellowship?", a: "The Addiction Medicine Fellowship suits doctors who want focused training in addiction care. Check the current eligibility criteria with MGA before you enrol." },
    { q: "What makes this Addiction Medicine Course suitable for doctors?", a: "The Addiction Medicine Course gives doctors focused learning in addiction care. Flexible learning options can help doctors continue their studies alongside their clinical work." },
    { q: "Can doctors build skills through Addiction Medicine Training?", a: "Yes. Addiction Medicine Training can help doctors build focused skills in patient assessment, care planning, withdrawal care and long-term patient support." },
    { q: "How can I enrol in an Addiction Medicine Fellowship for Doctors?", a: "You can contact Medical Global Academy to check the current eligibility, course schedule, fees and admission process before you enrol." },
  ],
  "Molecular Pathology Fellowship": [
    { q: "What does the Molecular Pathology Fellowship at MGA include?", a: "The Molecular Pathology Fellowship includes live and recorded classes, clinical training, expert faculty, study material, library access, Q&A sessions and one year of mentorship." },
    { q: "Who can apply for the Fellowship in Molecular Pathology?", a: "Eligible MBBS graduates, MD/MS doctors and registered medical professionals can apply based on the programme criteria. Contact MGA to confirm your eligibility before enrolment." },
    { q: "Can I join the Molecular Pathology Fellowship online?", a: "Yes. The programme includes online learning with live and recorded classes. Doctors can continue their professional work while completing the online molecular pathology fellowship." },
    { q: "What does the Molecular Pathology Course cover?", a: "The Molecular Pathology Course covers molecular tests, genetics, cancer diagnosis, biomarkers and precision medicine. Doctors also learn how test results can support patient care." },
    { q: "How can I enrol in the Molecular Pathology Fellowship in India?", a: "Contact Medical Global Academy to check the current eligibility, fees, course schedule and enrolment process. The MGA team can guide you through the next steps." },
  ],
  "Fellowship in Embryology": [
    { q: "Is the Fellowship in Embryology suitable for doctors and healthcare professionals?", a: "Yes. The programme is designed for eligible doctors and healthcare professionals who want to build focused knowledge in clinical embryology, IVF, ICSI and assisted reproductive technology." },
    { q: "What learning options are available for this programme?", a: "The programme offers online learning with clinical attachment. It also provides recorded lectures and study material to support your learning. Please confirm the current learning mode before enrolment." },
    { q: "Does the programme include clinical embryology training?", a: "Yes. The programme includes clinical training support and covers IVF, ICSI, embryo culture, embryo assessment, embryo grading and key embryology laboratory practices." },
    { q: "Is mentorship included in the programme?", a: "Yes. The programme includes expert faculty guidance and 1-year mentorship to support your learning throughout the fellowship." },
    { q: "Can this programme help me develop advanced embryology skills?", a: "Yes. You can study advanced areas such as cryopreservation, reproductive genetics, micromanipulation, laboratory quality and emerging technologies in clinical embryology." },
  ],
  "Thoracic Oncology Fellowship": [
    { q: "What are the eligibility requirements for the Thoracic Oncology Fellowship?", a: "The programme is designed for MBBS doctors with 4+ years of clinical experience, MD/MS doctors, pulmonologists and surgical oncologists. Applicants should check the latest admission requirements before applying." },
    { q: "How long is the Thoracic Oncology Fellowship programme?", a: "The Thoracic Oncology Fellowship runs for 12 months. Doctors can attend live evening classes and use recorded lectures and LMS access while continuing their professional work." },
    { q: "What does the Fellowship in Thoracic Oncology include?", a: "The Fellowship in Thoracic Oncology includes 11+ modules, live classes, recorded lectures, study materials, e-library access, tumour board discussions and specialist faculty support. The curriculum covers lung cancer, esophageal cancer, pleural cancer, imaging, bronchoscopy, immunotherapy and precision oncology." },
    { q: "Is this programme suitable for doctors seeking a pulmonary oncology fellowship?", a: "Yes. The programme covers key areas linked to pulmonary oncology, including lung cancer, bronchoscopy, EBUS, PET-CT, immunotherapy and precision oncology. It can suit doctors who want focused learning in thoracic cancer care." },
    { q: "What certification and support does the programme offer?", a: "The programme offers CPD certification and one year of mentorship. Doctors also receive access to study materials, e-library resources and LMS-based learning during the 12-month programme." },
  ],
  "Fellowship in Cardiac Surgery": [
    { q: "Who can apply for the Fellowship in Cardiac Surgery?", a: "The programme is designed for doctors who want to build focused knowledge in cardiac surgery. Applicants should check the latest admission requirements and confirm that they meet the required qualification and experience criteria." },
    { q: "How long is the Fellowship in Cardiac Surgery?", a: "The Fellowship in Cardiac Surgery runs for 12 months. Doctors can join live online classes, watch recorded lectures, and use study resources throughout the programme." },
    { q: "What does the Cardiac Surgery Fellowship cover?", a: "The programme covers cardiac imaging, CABG, valve surgery, aortic surgery, heart failure, heart transplant, congenital heart surgery, minimally invasive cardiac surgery, and robotic cardiac surgery." },
    { q: "Is the Cardiac Surgery Fellowship available online?", a: "Yes. The programme follows an online format with live classes and recorded lectures. Doctors can access course resources through the LMS and study while continuing their professional work." },
    { q: "What support and certification does the programme offer?", a: "The programme offers expert faculty support, study material, LMS access, e-library resources, and mentor support. Doctors also receive CPD certification after successful completion of the programme." },
  ],
  "Fellowship in Oral Oncology": [
    { q: "Who can apply for the Oral Oncology Fellowship?", a: "The programme is designed for doctors and healthcare professionals who want to build focused knowledge and skills in oral oncology. Check the current eligibility criteria before applying." },
    { q: "Is the Oral Oncology Fellowship suitable for working doctors?", a: "Yes. The programme offers flexible learning, so doctors and healthcare professionals can continue their work while developing their knowledge in oral oncology." },
    { q: "What does the programme cover?", a: "The programme covers oral cancer diagnosis, imaging, biopsy, treatment planning, surgery, reconstruction, radiation, medical oncology and follow-up care. It also includes clinical case discussions and multidisciplinary cancer care." },
    { q: "What are the duration, fee and learning options?", a: "You can contact Medical Global Academy for the latest programme duration, fee and available learning options before enrolment." },
    { q: "How can I enrol in the Fellowship in Oral Oncology?", a: "Contact Medical Global Academy to confirm your eligibility and get the latest admission details. The admissions team can guide you through the enrolment process." },
  ],
  "Fellowship in Neonatal Surgery": [
    { q: "Can I pursue a Neonatal Surgery Fellowship online in India?", a: "MGA's 12-month Fellowship in Neonatal Surgery offers a flexible learning option for eligible doctors. Contact our admissions team to confirm the current online class schedule, recorded lectures and any hybrid study options available for your batch." },
    { q: "Who is eligible to apply for this fellowship course?", a: "Doctors can share their medical qualifications, registration details and relevant experience with MGA's admissions team. Our team will review their details against the programme's current eligibility requirements and guide them through the next steps." },
    { q: "What are the fees for MGA's Neonatal Surgery Fellowship?", a: "Contact our admissions team for the latest course fees, payment options and any additional charges. You can also request the course brochure to review the programme details before enrolling." },
    { q: "What certificate will I receive after completing the fellowship?", a: "MGA will confirm the certificate available for your selected programme, including its issuing institution and applicable accreditation details, before you enrol. This educational fellowship does not replace a recognized surgical qualification or medical registration." },
    { q: "How can I apply for the next fellowship batch?", a: "Submit an enquiry through MGA's website or request the course brochure. Our admissions team will help you confirm your eligibility, review the fees, check upcoming batch availability and complete the application process." },
  ],
  "Pediatric Genetics Fellowship": [
    { q: "Who can enrol in the Pediatric Genetics Fellowship?", a: "Doctors and medical professionals who want focused training in pediatric genetics and metabolic disorders can apply, subject to the programme eligibility criteria." },
    { q: "How long is the Pediatric Genetics Fellowship?", a: "The Pediatric Genetics Fellowship is a 12-month programme. It combines online learning with clinical training and supports doctors who want to continue their professional work." },
    { q: "Can I continue working while taking the fellowship?", a: "Yes. The hybrid format lets working doctors study online and take part in clinical training while they continue their professional work." },
    { q: "What does the fellowship in pediatric genetics include?", a: "The programme includes online classes, clinical training, recorded lectures, study material, Q&A support, clinical exposure and one year of mentorship." },
    { q: "What certification do I receive after completing the programme?", a: "Learners receive CPD UK certification after completing the programme, as stated on the course page. The programme also provides expert faculty and one year of mentorship support." },
  ],
  "Fellowship in Clinical Nutrition": [
    { q: "What is the duration of the Fellowship in Clinical Nutrition?", a: "The Fellowship in Clinical Nutrition is a 12-month programme. It includes online learning, recorded lectures, study material, case-based learning and one-year mentorship." },
    { q: "Is the Fellowship in Clinical Nutrition available online?", a: "Yes. The Fellowship in Clinical Nutrition follows an online learning format. You can access recorded lectures and study material while continuing your clinical or professional work." },
    { q: "Who can apply for the Clinical Nutrition Fellowship?", a: "The Clinical Nutrition Fellowship is designed for doctors and healthcare professionals who want focused training in clinical nutrition and dietary care. Please check the current admission criteria with Medical Global Academy before applying." },
    { q: "Does the Fellowship in Nutrition and Dietetics include clinical nutrition training?", a: "Yes. The Fellowship in Nutrition and Dietetics includes clinical nutrition, Medical Nutrition Therapy, dietary care, lifestyle care and nutrition support." },
    { q: "How can I get the fees and admission details for the Nutrition Fellowship?", a: "You can contact Medical Global Academy for the latest fees, batch dates and admission details for the Nutrition Fellowship. The team can also guide you through the application process." },
  ],
  "TAVI Fellowship": [
    { q: "Who can join the TAVI Fellowship?", a: "The TAVI Fellowship is designed for eligible cardiologists, interventional cardiologists, cardiac surgeons and other medical professionals who want focused TAVI training." },
    { q: "How long is the TAVI Fellowship programme?", a: "The TAVI Fellowship programme runs for 12 months. It combines online learning, simulation training, clinical exposure, live case observation and expert mentorship." },
    { q: "What does the TAVI fellowship course include?", a: "The TAVI fellowship course includes structured learning, cardiac imaging, case planning, valve selection, clinical exposure, simulation training and expert mentorship." },
    { q: "Can working doctors join the TAVI Fellowship?", a: "Yes. The flexible learning format supports eligible doctors who want to continue their clinical work while completing focused TAVI clinical training." },
    { q: "How can I enrol in the TAVI Fellowship?", a: "You can contact Medical Global Academy to learn about eligibility, programme details, learning format, clinical exposure and the enrolment process for the TAVI Fellowship." },
  ],
  "Fellowship in GI Surgery": [
    { q: "Who can join this GI Surgery Fellowship?", a: "MBBS, MD, MS, and DNB doctors can apply. The program suits surgical residents, general surgeons, fellows, and working doctors who want deeper GI surgery skill." },
    { q: "How is this fellowship delivered?", a: "The program runs in two parts. You first join live online classes with expert faculty. Then you get hands-on clinical time at partner hospitals with real patient cases." },
    { q: "Is this fellowship accredited?", a: "Yes. This fellowship holds CPD UK accreditation, so your certificate carries international recognition with hospitals and peers." },
    { q: "How long does the fellowship run, and how often are classes held?", a: "The program runs for 12 months. Live classes take place two to three times each month, on evenings or weekends. You can rewatch every recorded session, so you never miss a class." },
    { q: "How do I check the fee and apply?", a: "Fill the application form on this page, or message MGA's team on WhatsApp for full curriculum and fee details." },
  ],
  "Fellowship in Endoscopic Spine Surgery": [
    { q: "Who is eligible to join the Fellowship in Endoscopic Spine Surgery?", a: "Surgeons with an MS or DNB in Orthopaedics can apply. No prior endoscopic experience is required — MGA Medical Global Academy trains you from the ground up." },
    { q: "How long does this endoscopic spine surgery fellowship run?", a: "This is a one-year fellowship. You progress from core techniques to live surgical cases, cadaveric workshops, and independent practice by the end of the year." },
    { q: "What surgical skills will I gain from this spine endoscopy fellowship?", a: "You gain skill in endoscopic discectomy, UBE, and minimally invasive procedures for lumbar and cervical spine disorders — the exact skills top spine teams look for." },
    { q: "Does the endoscopic spine fellowship include live surgery, not just theory?", a: "Yes. The program combines live surgeries, cadaveric workshops, and class sessions, so you build real operative confidence, not just classroom knowledge." },
    { q: "How do I apply for the fellowship in endoscopic spine surgery at MGA?", a: "Click Apply Now on this page. Our team will contact you within a few working days with batch dates and the next steps in the process." },
  ],
  "Robotic Urology Fellowship": [
    { q: "Who can join the Robotic Urology Fellowship?", a: "The Robotic Urology Fellowship is designed for urologists who want focused training in robotic-assisted and minimally invasive urologic surgery. The programme helps doctors build skills in robotic surgery through learning, clinical observation, simulation and expert mentorship." },
    { q: "How long is the Robotic Urology Fellowship?", a: "The Robotic Urology Fellowship is a 12-month advanced training programme. It combines online learning, simulation training, live surgical demonstrations, clinical observations and mentorship to support focused learning in robotic urology." },
    { q: "What does the Fellowship in Robotic Urology include?", a: "The Fellowship in Robotic Urology includes online learning, simulation training, live surgical demonstrations, clinical observations and mentorship. The programme covers robotic surgical systems, surgical planning, minimally invasive surgery and advanced urologic surgery." },
    { q: "What skills will I gain from the Robotic Urology Fellowship?", a: "The programme helps doctors build skills in robotic surgical systems, robotic console use, surgical planning and minimally invasive surgery. It also covers robotic prostatectomy, nephrectomy, cystectomy, pyeloplasty, reconstructive urology and uro-oncologic surgery." },
    { q: "Does the Robotic Urology Fellowship include clinical training?", a: "Yes. The programme includes clinical observations, live surgical demonstrations, simulation training and mentorship. These learning methods help doctors gain practical knowledge of robotic and minimally invasive urologic surgery." },
  ],
  "Fellowship in Andrology": [
    { q: "Who can apply for the Fellowship in Andrology?", a: "The programme is designed for healthcare professionals who want to build advanced skills in male reproductive and sexual health. Applicants should review the programme's eligibility requirements before applying." },
    { q: "What does the Fellowship in Andrology cover?", a: "The programme covers male infertility, erectile dysfunction, hormonal disorders, reproductive endocrinology, sexual health and assisted reproductive technology. It also includes semen analysis, fertility investigations and genetic testing." },
    { q: "Does the programme include practical and clinical training?", a: "Yes. The programme combines online learning with clinical training. Fellows can learn through patient evaluations, diagnostic workups, procedural training, case-based discussions and mentorship from experienced andrologists and urologists." },
    { q: "What skills can doctors develop through the programme?", a: "Doctors can develop skills in male infertility assessment, semen analysis, hormonal evaluation, sexual health and advanced andrological procedures. The curriculum also covers microsurgical techniques, sperm retrieval and assisted reproduction." },
    { q: "How long is the Fellowship in Andrology?", a: "The Fellowship in Andrology has a one-year duration. It uses a blended learning approach that combines online education with clinical learning and practical exposure." },
  ],
  "Minimally Invasive Cardiac Surgery Fellowship (MICS)": [
    { q: "Who is eligible for the Minimally Invasive Cardiac Surgery Fellowship?", a: "The fellowship is designed for qualified doctors and surgeons with a relevant background in cardiac or cardiothoracic surgery who want focused training in minimally invasive and technology-assisted cardiac surgical practice. Applicants should review the current eligibility criteria before applying." },
    { q: "What does the MICS Fellowship curriculum include?", a: "The curriculum covers patient selection, cardiac imaging, surgical planning, minimally invasive valve and coronary procedures, robotic-assisted techniques, hybrid interventions, perioperative management, postoperative care, and multidisciplinary cardiac care." },
    { q: "What training areas are covered in the fellowship?", a: "The program focuses on key areas of minimally invasive cardiac surgery, including surgical planning, cardiac imaging, minimally invasive procedures, robotic-assisted approaches, perioperative care, and modern technology used in cardiac surgical practice." },
    { q: "Does the fellowship include robotic cardiac surgery training?", a: "The program includes robotic-assisted cardiac surgery as part of its focus on modern technology-assisted approaches. The curriculum introduces the role of robotic techniques within minimally invasive cardiac surgical practice." },
    { q: "How can I apply for the Minimally Invasive Cardiac Surgery Fellowship?", a: "Candidates interested in the program can review the current admission requirements and application process on the course page before submitting their application. Applicants should confirm eligibility and required documents with Medical Global Academy before enrollment." },
  ],
  "Fellowship in ENT": [
    { q: "Who can apply for the Fellowship in ENT?", a: "The course is designed for eligible doctors who want advanced training in Otorhinolaryngology. Applicants should check the eligibility criteria before applying." },
    { q: "What is the duration of the ENT fellowship?", a: "The program has a 12-month duration. It combines online learning, clinical training, case-based learning, Q&A support, and academic guidance." },
    { q: "Is the Fellowship in ENT available online?", a: "Yes. The program includes online learning with recorded lectures, study resources, Q&A support, and flexible access. Clinical training follows the course structure and training schedule." },
    { q: "What does the course cover?", a: "The course covers key areas of Otorhinolaryngology, including otology, rhinology, laryngology, pediatric ENT, head and neck care, and ENT emergencies. It also includes clinical training and case-based learning." },
    { q: "How can I apply for the program?", a: "Doctors can review the eligibility criteria, course details, and admission process before applying. The admission team can provide guidance on the next steps." },
  ],
  "Vitreo Retina Fellowship": [
    { q: "Who can apply for a Vitreo Retina Fellowship?", a: "The fellowship is intended for qualified ophthalmologists who want focused training in retina care. Applicants should review the current eligibility criteria before admission, as requirements may vary between programs." },
    { q: "What does a Vitreo Retina Fellowship cover?", a: "A Vitreo Retina Fellowship can cover medical retina, retinal assessment, diagnostic imaging, vitreoretinal conditions, clinical decision-making, and relevant management approaches. The exact curriculum depends on the fellowship program." },
    { q: "How long is a Vitreo Retina Fellowship?", a: "The duration varies between institutions. Medical Global Academy offers a 12-month Vitreo Retina Fellowship with a structured learning model for doctors who want to continue their professional practice alongside the program." },
    { q: "Is this Retina Fellowship suitable for working ophthalmologists?", a: "Yes. The hybrid learning format, recorded lectures, flexible learning options, study material, Q&A support, and attending or non-attending options can help working ophthalmologists manage their learning alongside professional responsibilities." },
    { q: "What does the fellowship provide for ophthalmologists?", a: "The program provides structured learning in retina care, clinical attachment, guidance from super-specialist faculty, recorded lectures, a learning library, Q&A support, and 1-year mentorship to support continued professional development." },
  ],
  "Refractive Surgery Fellowship": [
    { q: "Who can join a refractive surgery fellowship?", a: "The refractive surgery fellowship is designed for ophthalmologists who want focused training in refractive care. Doctors should check the current MGA eligibility rules before joining the program." },
    { q: "How long is the refractive surgery fellowship?", a: "The refractive surgery fellowship follows the duration set by the MGA course plan. Doctors can check the current program details for the course duration, schedule, and study format." },
    { q: "What does refractive surgery fellowship training include?", a: "Refractive surgery fellowship training includes structured classes, clinical attachment, expert mentor support, recorded lectures, Q&A support, and access to study resources as part of the MGA course." },
    { q: "Does MGA offer refractive surgery training for ophthalmologists?", a: "Yes. MGA provides refractive surgery training for ophthalmologists through structured learning, clinical attachment, specialist faculty support, recorded classes, and one-year mentorship." },
    { q: "Does MGA offer a flexible refractive surgery course?", a: "Yes. The refractive surgery course offers attending and non-attending options, recorded lectures, library access, Q&A support, and flexible payment options for doctors with different work schedules." },
  ],
  "Fellowship in Oral and Maxillofacial Surgery (OMFS)": [
    { q: "Who can apply for the fellowship in oral and maxillofacial surgery?", a: "The fellowship in oral and maxillofacial surgery is for eligible dental professionals who want to build advanced skills in oral and maxillofacial surgery. Please check the current eligibility rules before applying." },
    { q: "What is the duration of the OMFS fellowship?", a: "The OMFS fellowship is a 12-month program. It includes online learning, clinical training, expert guidance, recorded classes, case talks, and Q&A support." },
    { q: "What will I learn in the oral and maxillofacial surgery fellowship?", a: "The oral and maxillofacial surgery fellowship covers oral surgery, facial trauma, TMJ surgery, jaw surgery, oral cancer, dental implants, craniofacial surgery, facial aesthetics, imaging, and surgical planning." },
    { q: "Does the OMFS fellowship include clinical training?", a: "Yes. The OMFS fellowship includes clinical training along with online classes, case talks, surgical demonstrations, recorded learning, and expert guidance." },
    { q: "How can I apply for the oral and maxillofacial surgery fellowship?", a: "You can contact MGA to check the current admission process, eligibility, course details, and available study options before enrolling in the oral and maxillofacial surgery fellowship." },
  ],
  "Breast Surgery Fellowship (Hybrid)": [
    { q: "What does the breast surgery fellowship course include?", a: "The breast surgery fellowship course includes hybrid learning, recorded classes, case-based learning, clinical attachment, expert faculty support, Q&A, a study library, and 1-year mentorship." },
    { q: "How long is the fellowship training in breast surgery?", a: "The fellowship training in breast surgery follows a 12-month course plan with structured learning and support throughout the program." },
    { q: "Does the breast surgery fellowship program offer clinical attachment?", a: "Yes. The breast surgery fellowship program includes clinical attachment along with case-based learning and expert faculty support." },
    { q: "Can doctors choose flexible learning options?", a: "Yes. The fellowship in breast surgery offers attending and non-attending options, hybrid learning, recorded classes, and flexible study support." },
    { q: "Does the breast surgical fellowship include mentorship?", a: "Yes. The breast surgical fellowship includes 1-year mentorship, along with Q&A support, expert faculty guidance, recorded classes, and access to a study library." },
  ],
  "Fellowship in Periodontology": [
    { q: "Is this fellowship in periodontology suitable for dentists?", a: "Yes. This fellowship in periodontology is designed for eligible dental professionals who want focused training in periodontology and want to build advanced skills alongside their dental work." },
    { q: "Does the periodontology fellowship offer flexible learning options?", a: "Yes. The program offers hybrid learning, recorded lectures, and attending or non-attending options. These options help dentists choose a study plan that fits their work schedule." },
    { q: "Does the fellowship in periodontology include clinical attachment?", a: "Yes. The program includes clinical attachment as part of the course. It adds a practical learning element to the academic sessions and helps you connect your learning with clinical work." },
    { q: "What do I get with the periodontology fellowship course?", a: "You get recorded lectures, specialist faculty guidance, free study material, a learning library, Q&A support, and one-year mentorship. These resources support your learning throughout the course." },
    { q: "How can I enrol in the fellowship in periodontology?", a: "You can contact Medical Global Academy to check the current admission process, eligibility, course fee, available learning options, and enrolment details before joining." },
  ],
  "Geriatric Psychiatry Fellowship": [
    { q: "Who can join the Geriatric Psychiatry Fellowship?", a: "The Geriatric Psychiatry Fellowship is designed for eligible doctors who want focused training in geriatric psychiatry. Please check the course eligibility criteria before admission." },
    { q: "What does the Fellowship in Geriatric Psychiatry include?", a: "The fellowship includes structured learning, clinical attachment, recorded lectures, expert faculty support, Q&A, study material and one-year mentorship." },
    { q: "How long is the Geriatric Psychiatry Fellowship?", a: "The fellowship runs for 12 months. Its hybrid format gives doctors the flexibility to study while managing their clinical or professional work." },
    { q: "Does the Geriatric Psychiatry course include clinical attachment?", a: "Yes. The Geriatric Psychiatry course includes clinical attachment as part of its learning structure. It helps doctors connect course learning with clinical practice." },
    { q: "Is the Geriatric Psychiatry Training suitable for doctors?", a: "Yes. The training is designed for eligible doctors who want focused learning in geriatric psychiatry. It combines structured study, clinical attachment, expert faculty support and flexible learning options." },
  ],
  "Fellowship in Aesthetic Dentistry": [
    { q: "Who can enrol in the Fellowship in Aesthetic Dentistry?", a: "The Fellowship in Aesthetic Dentistry is designed for eligible dentists who want to build focused skills in aesthetic dental care. Please check the course eligibility criteria before applying." },
    { q: "What is the duration of the Fellowship in Aesthetic Dentistry?", a: "The fellowship has a 12-month duration. It uses a hybrid learning format, so dentists can learn through scheduled sessions along with other course resources." },
    { q: "What does the Aesthetic Dentistry Fellowship include?", a: "The Aesthetic Dentistry Fellowship covers key areas such as smile design, veneers, tooth whitening, aesthetic restorations, digital dentistry and treatment planning. It also includes case-based learning to support clinical learning." },
    { q: "Does the Fellowship in Aesthetic Dentistry include clinical training?", a: "Yes, the course includes clinical attachment as part of the learning experience. This helps dentists connect course learning with clinical cases and modern aesthetic dental practice." },
    { q: "What support do dentists receive during the fellowship?", a: "Dentists receive expert faculty guidance, Q&A support, recorded lectures, study resources and one-year mentorship. These resources help learners review topics, ask questions and continue learning throughout the fellowship." },
  ],
  "Pediatric Cardiac Surgery Fellowship": [
    { q: "Who is eligible for the Pediatric Cardiac Surgery Fellowship?", a: "The fellowship is for qualified doctors and surgical professionals who meet the program eligibility rules. Doctors should check the latest eligibility details before applying." },
    { q: "How long is the Pediatric Cardiac Surgery Fellowship?", a: "The Pediatric Cardiac Surgery Fellowship is a 12-month program. It provides structured learning and clinical training in pediatric and congenital cardiac surgery." },
    { q: "What does the Pediatric Cardiac Surgery Fellowship cover?", a: "The program covers pediatric cardiothoracic surgery, congenital heart surgery, surgical planning, cardiac imaging, cardiopulmonary bypass, ECMO, and other key areas of pediatric cardiac surgery training." },
    { q: "Does the fellowship include clinical training?", a: "Yes. The program includes clinical learning related to pediatric and congenital cardiac surgery. Doctors can review the program details to understand the current training structure and clinical exposure." },
    { q: "How can I apply for the Pediatric Cardiac Surgery Fellowship?", a: "Doctors can review the eligibility, 12-month program structure, training details, and admission process before contacting Medical Global Academy to apply." },
  ],
  "Plastic Surgery Fellowship": [
    { q: "Who can apply for the Plastic Surgery Fellowship?", a: "Doctors and surgeons who meet the program's stated eligibility requirements can apply. Applicants should review the official requirements before starting their application." },
    { q: "What are the eligibility requirements for the Plastic Surgery Fellowship?", a: "Applicants should check the program's eligibility criteria, required qualifications, and application conditions to confirm that they meet the requirements before applying." },
    { q: "How do I apply for the Plastic Surgery Fellowship?", a: "Applicants should review the official application process, required documents, eligibility criteria, and submission steps before sending their application." },
    { q: "What does the Plastic Surgery Fellowship program offer?", a: "The program offers focused training in plastic, reconstructive, and aesthetic surgery, with curriculum-based learning across relevant areas of plastic surgery." },
    { q: "Where can I find the Plastic Surgery Fellowship course details?", a: "Doctors can review the official course details, curriculum, eligibility requirements, application process, and other program information before deciding to apply." },
  ],
  "Cytopathology Fellowship": [
    { q: "Is the Cytopathology Fellowship suitable for doctors seeking focused training?", a: "Yes. The fellowship suits doctors who want structured training in cytology and pathology practice. The course covers specimen preparation, cytological techniques, FNA/FNAC and diagnostic cytology." },
    { q: "What does the Cytopathology Fellowship course cover?", a: "The course covers specimen preparation, cytological techniques, FNA/FNAC, diagnostic cytology and case-based learning. The updated curriculum supports structured learning across these areas." },
    { q: "Does the Cytopathology Fellowship offer flexible learning options?", a: "Yes. The fellowship offers a hybrid learning format along with attending and non-attending options, helping doctors choose a study format that fits their professional schedule." },
    { q: "What learning support is included in the Cytopathology Fellowship?", a: "Learners receive recorded lectures, medical library access and Q&A support. The course also includes one-year mentorship for ongoing academic guidance." },
    { q: "Does the Cytopathology Fellowship include clinical attachment?", a: "Yes. The fellowship includes clinical attachment, which adds exposure to practical clinical settings alongside structured academic learning." },
  ],
  "Preventive Medicine Fellowship": [
    { q: "Who is eligible for the Preventive Medicine Fellowship?", a: "Eligibility depends on the course requirements. Doctors and eligible medical professionals can review the current academic and admission criteria before enrollment." },
    { q: "What does the fellowship course include?", a: "The course includes structured learning, study resources and academic support. Available features may include expert-led sessions, Q&A access and mentorship." },
    { q: "Is this fellowship available through flexible learning options?", a: "Available learning formats depend on the course. Medical Global Academy provides flexible options across its programs, subject to the specific fellowship format." },
    { q: "What support do doctors receive during the course?", a: "Doctors can receive structured academic guidance, study resources, Q&A support and mentorship according to the available course structure." },
    { q: "What should I check before enrolling in the fellowship?", a: "Review the eligibility, curriculum, duration, faculty, learning format, certification and admission details to understand the course before enrollment." },
  ],
  "Phacoemulsification Fellowship": [
    { q: "Who can join the Phacoemulsification Fellowship?", a: "The Phacoemulsification Fellowship is designed for ophthalmologists who want focused training in phacoemulsification and cataract surgery. Candidates should review MGA's current eligibility requirements before applying." },
    { q: "What does the Phacoemulsification Fellowship include?", a: "The fellowship combines structured learning with clinical exposure, recorded sessions, study resources, Q&A support, specialist faculty guidance, clinical attachment and mentorship. These features support focused phacoemulsification training for ophthalmologists." },
    { q: "Is the Phacoemulsification Course suitable for practicing ophthalmologists?", a: "The phacoemulsification course focuses on professional learning and skill development for ophthalmologists. Flexible learning options can help doctors continue their education alongside their clinical responsibilities." },
    { q: "Does the fellowship provide clinical training?", a: "The program includes clinical attachment to help ophthalmologists connect academic learning with clinical practice. The exact format and scope of phaco surgery training should follow MGA's current program details." },
    { q: "How can a Phaco Fellowship support professional development?", a: "A phaco fellowship can provide structured learning, specialist guidance and mentorship for ophthalmologists who want to strengthen their cataract surgery knowledge and continue their professional development." },
  ],
  "Interventional Neurology Fellowship": [
    { q: "What are the eligibility requirements for the Interventional Neurology Fellowship?", a: "Doctors who meet the program's academic and professional criteria can apply. Medical Global Academy can confirm the current eligibility requirements before you begin the admission process." },
    { q: "How can I apply for the Interventional Neurology Fellowship?", a: "Review the program details and eligibility criteria, then contact Medical Global Academy for the current application requirements and admission guidance." },
    { q: "What admission requirements apply to the Neurointerventional Fellowship?", a: "Medical Global Academy reviews applications against the program's eligibility criteria. Contact the admissions team to confirm the required qualifications and documents before applying." },
    { q: "Can I complete the Interventional Neurology Fellowship online?", a: "Yes. The program supports flexible online learning through live sessions, recorded lectures, study material, and LMS access. Clinical exposure may depend on your selected format and local availability." },
    { q: "What accreditation does the fellowship provide?", a: "Successful completion provides CPD and ACTD accreditation, subject to the program's completion requirements. Medical Global Academy can provide the current accreditation details during the admission process." },
  ],
  "Fellowship in Toxicology": [
    { q: "Who can enrol in the Fellowship in Toxicology?", a: "The Fellowship in Toxicology is designed for doctors and healthcare professionals seeking focused training in clinical toxicology. Check the current eligibility criteria before enrolment." },
    { q: "What does the Toxicology Fellowship include?", a: "The Toxicology Fellowship includes structured learning, case-based training, specialist faculty guidance, study resources, Q&A support, and mentorship to support professional learning." },
    { q: "Does the Clinical Toxicology Fellowship offer flexible learning?", a: "Yes, the Clinical Toxicology Fellowship supports flexible learning through the available course format, recorded lectures, study resources, and guided learning support." },
    { q: "Is clinical training included in the Fellowship in Toxicology?", a: "Clinical training or clinical exposure depends on the selected course format and available training arrangements. Review the current program details before enrolment." },
    { q: "Why choose a Toxicology Fellowship for professional training?", a: "A Toxicology Fellowship gives doctors a focused learning path with specialist faculty, case-based learning, flexible study options, and mentorship for professional development." },
  ],
  "Fellowship in Pediatric Orthodontics": [
    { q: "Who can enroll in the Fellowship in Pediatric Orthodontics?", a: "The program is intended for eligible dental professionals who want focused training in pediatric orthodontics. Check the current eligibility requirements before applying." },
    { q: "Is the Fellowship in Pediatric Orthodontics available online?", a: "Check the current program format for available online or hybrid learning options and choose the format that fits your professional schedule." },
    { q: "What does the fellowship program include?", a: "The program provides structured learning with course materials and academic support. Current learning features, sessions, LMS access, and mentorship depend on the program structure." },
    { q: "Does the program offer clinical attachment or observation?", a: "Clinical attachment or observation depends on the course structure, location, and availability. Check the current program details for the options available with this fellowship." },
    { q: "How can I apply for the fellowship program?", a: "Review the current eligibility, course structure, duration, format, and admission details, then contact Medical Global Academy to proceed with enrollment." },
  ],
};

/* ==================================================================
   MATCHING HELPERS
================================================================== */
const normaliseKey = (s) =>
  (s || "")
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const FAQ_LOOKUP = Object.keys(COURSE_FAQS).reduce((acc, key) => {
  acc[normaliseKey(key)] = COURSE_FAQS[key];
  return acc;
}, {});

const COURSE_ALIASES = {
  "fellowshipinorthopedic": "Fellowship in Orthopedics",
  "fellowshipinorthopedics": "Fellowship in Orthopedics",
  "fellowshipinanesthesia": "Fellowship in Anesthesia / Anesthesiology",
  "fellowshipinanaesthesia": "Fellowship in Anesthesia / Anesthesiology",
  "fellowshipinanesthesiology": "Fellowship in Anesthesia / Anesthesiology",
  "fellowshipinpaediatricendocrinology": "Fellowship in Pediatric Endocrinology",
  "fellowshipinpediatricendocrinology": "Fellowship in Pediatric Endocrinology",
  "fellowshipinpediatricgeneticsandmetabolism": "Pediatric Genetics Fellowship",
  "fellowshipinpedodontist": "Fellowship in Pediatric Dentistry",
  "fellowshipinnutritionanddietetics": "Fellowship in Clinical Nutrition",
  "fellowshipinanorectalpluslaserproctology": "Fellowship in Laser Proctology",
  "fellowshipinanorectalandlaserproctology": "Fellowship in Laser Proctology",
  "fellowshipinlaparoscopicsurgery": "Fellowship in Laparoscopic Surgery (FALS)",
  "fellowshipinthoracicsurgery": "Thoracic Surgery Fellowship",
  "fellowshipinendourology": "Endourology Fellowship",
  "fellowshipincardiacsurgery": "Fellowship in Cardiac Surgery",
  "fellowshipinclinicalcardiology": "Fellowship in Clinical Cardiology",
  "fellowshipinoraloncology": "Fellowship in Oral Oncology",
  "fellowshipinoncopathology": "Fellowship in Oncopathology",
  "fellowshipininterventionalpainmanagement": "Interventional Pain Management Fellowship",
  "fellowshipininterventionalradiology": "Interventional Radiology Fellowship",
  "fellowshipinheadnecksurgery": "Fellowship in Head & Neck Surgery",
  "fellowshipinheadandnecksurgery": "Fellowship in Head & Neck Surgery",
  "fellowshipinlaparoscopicherniasurgery": "Fellowship in Laparoscopic Hernia Surgery",
  "fellowshipincosmeticsurgery": "Cosmetic Surgery Fellowship",
  "fellowshipinneurosurgery": "Fellowship in Neurosurgery",
  "fellowshipinurology": "Fellowship in Urology",
  "fellowshipinclinicalgenetics": "Fellowship in Clinical Genetics",
};

/* ==================================================================
   FAQ LIST (shared rendering)
================================================================== */
function FaqList({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q || i}>
            <button
              className="faq-question"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="faq-icon">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            {isOpen && <p className="faq-answer muted">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

/* ==================================================================
   FAQ COMPONENT
   Usage:
     <Faq slug={course?.slug} courseName={course?.name} />
================================================================== */
export default function Faq({ courseName, slug, items }) {
  // 1) Agar parent ne SEO FAQs diye hain, wahi dikhao
  if (Array.isArray(items) && items.length > 0) {
    return <FaqList faqs={items} />;
  }

  // 2) Warna course-specific / common FAQs
  const candidates = [slug, courseName].filter(Boolean);
  let faqs = null;

  for (const candidate of candidates) {
    const norm = normaliseKey(candidate);

    if (FAQ_LOOKUP[norm]) {
      faqs = FAQ_LOOKUP[norm];
      break;
    }

    const aliasedKey = COURSE_ALIASES[norm];
    if (aliasedKey && COURSE_FAQS[aliasedKey]) {
      faqs = COURSE_FAQS[aliasedKey];
      break;
    }
  }

  if (!faqs) faqs = COMMON_FAQS;

  return <FaqList faqs={faqs} />;
}