// Clinical milestones & guideline references for maternal continuity
// Grounded in National Health Mission (NHM) & FOGSI antenatal care guidelines

export const MATERNAL_STAGES = [
  { id: "pre-conception", label: "Pre-conception", description: "Baseline health, rubella immunity, pre-pregnancy BMI, peri-conceptional folic acid." },
  { id: "trimester-1", label: "Trimester 1 (0–12w)", description: "Dating scan (CRL), ABO/Rh grouping, baseline CBC, Td-1, TSH, urine screening, folic acid." },
  { id: "trimester-2", label: "Trimester 2 (13–27w)", description: "TIFFA anomaly scan (18–22w), Td-2/booster, 24–28w 75g OGTT, daily IFA + Calcium, maternal weight gain." },
  { id: "trimester-3", label: "Trimester 3 (28–40w)", description: "28w Anti-D (Rh-neg), 32–34w growth scan, repeat Hb for late anemia, birth preparedness, fetal kick counts." },
  { id: "delivery", label: "Delivery & Intrapartum", description: "Mode of delivery, intrapartum vitals, birth weight, APGAR scores, active management of 3rd stage." },
  { id: "post-natal", label: "Post-natal (0–42d)", description: "Day 3/7/14/42 follow-ups, wound healing, involution, exclusive lactation, newborn screening, postpartum IFA." }
];

export const MANDATORY_SCREENING_SCHEDULE = [
  {
    stage: "Trimester 1",
    items: [
      { name: "Blood Grouping & Rh Factor", code: "ABO_RH", weekRange: "6–12w", rationale: "Identify Rh-negative mothers early for isoimmunization surveillance" },
      { name: "Baseline Hemoglobin / CBC", code: "CBC_T1", weekRange: "6–12w", rationale: "Establish pre-existing anemia baseline before physiologic hemodilution" },
      { name: "Dating & Viability Ultrasound", code: "USG_DATING", weekRange: "8–12w", rationale: "Accurate gestational age dating by CRL (accurate within +/- 5 days)" },
      { name: "Serum TSH", code: "TSH", weekRange: "6–12w", rationale: "Rule out subclinical hypothyroidism critical for fetal neurodevelopment" }
    ]
  },
  {
    stage: "Trimester 2",
    items: [
      { name: "Level-II / TIFFA Anomaly Scan", code: "USG_TIFFA", weekRange: "18–22w", rationale: "Detailed fetal anatomical structural survey and placental localization" },
      { name: "75g Oral Glucose Tolerance Test (OGTT)", code: "OGTT", weekRange: "24–28w", rationale: "Universal screening for Gestational Diabetes Mellitus (GDM)" },
      { name: "Tetanus-Diphtheria (Td) Dose 2", code: "TD_2", weekRange: "4 weeks post Td-1", rationale: "Maternal and neonatal tetanus prevention" },
      { name: "Second Trimester Hemoglobin", code: "CBC_T2", weekRange: "24–28w", rationale: "Monitor response to oral iron supplementation" }
    ]
  },
  {
    stage: "Trimester 3",
    items: [
      { name: "Prophylactic Anti-D Immunoglobulin (Rh-Negative)", code: "ANTI_D_28W", weekRange: "28–30w", rationale: "Prevent maternal alloimmunization in Rh-negative mothers" },
      { name: "Third Trimester Growth Ultrasound", code: "USG_GROWTH", weekRange: "32–34w", rationale: "Assess fetal growth velocity, estimated weight, and amniotic fluid volume" },
      { name: "Pre-delivery Hemoglobin", code: "CBC_T3", weekRange: "34–36w", rationale: "Optimize maternal oxygen reserves prior to labor blood loss" }
    ]
  },
  {
    stage: "Post-natal",
    items: [
      { name: "Postpartum Hemoglobin & Vitals Check", code: "PNC_HB", weekRange: "Day 7–14", rationale: "Detect delayed postpartum hemorrhage or uncorrected anemia" },
      { name: "Newborn Metabolic Screening (NBS)", code: "NBS", weekRange: "Day 2–7", rationale: "Screen for congenital hypothyroidism and inborn metabolic disorders" },
      { name: "Surgical Scar / Perineal Healing Inspection", code: "SCAR_CHECK", weekRange: "Day 7–14", rationale: "Ensure clean wound healing post LSCS or episiotomy" }
    ]
  }
];

export const SAFETY_DISCLAIMER_TEXT = "MaatruAI is an assistive maternal continuity platform. It synthesizes and timelines documented records with exact source citations. It does not provide medical diagnoses, treatment advice, clinical risk scores, or autonomous recommendations. All clinical decisions remain solely with the examining clinician.";
