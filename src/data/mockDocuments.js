// Mock Document Intelligence Data & OCR Extraction Models
// Provides realistic document metadata, OCR text, and extracted structured entities

export const MOCK_DOCUMENTS = [
  // Sunita Devi Documents
  {
    id: "DOC-081-01",
    patientId: "PAT-2026-081",
    title: "Karnataka Taayi Card - Page 1 & 2 (Registration & ANC 1)",
    category: "Taayi / Mother Card",
    uploadDate: "2026-04-12",
    fileType: "image/jpeg",
    fileSize: "2.4 MB",
    uploadedBy: "Sowbhagya K. (ASHA)",
    verifiedByClinician: true,
    pageCount: 2,
    previewUrl: "/sample-documents/taayi_card_sample.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 94.2,
    extractedEntities: [
      { key: "Taayi Card No", value: "TC-884219", confidence: 0.99, bbox: [120, 45, 180, 20] },
      { key: "RCH ID", value: "KA-RCH-2026-99214", confidence: 0.98, bbox: [310, 45, 200, 20] },
      { key: "LMP", value: "12-02-2026", confidence: 0.96, bbox: [140, 110, 110, 18] },
      { key: "EDD (LMP)", value: "19-11-2026", confidence: 0.95, bbox: [260, 110, 110, 18] },
      { key: "Blood Group", value: "O Negative", confidence: 0.92, bbox: [410, 110, 90, 18] },
      { key: "Gravida / Para", value: "G2 P1 L1 A0", confidence: 0.97, bbox: [140, 150, 120, 18] },
      { key: "Pre-Pregnancy Weight", value: "58.0 kg", confidence: 0.94, bbox: [300, 150, 80, 18] },
      { key: "Baseline BP", value: "116/74 mmHg", confidence: 0.96, bbox: [420, 150, 100, 18] }
    ],
    fullOcrSnippet: "GOVERNMENT OF KARNATAKA - HEALTH & FAMILY WELFARE SERVICES. MOTHER AND CHILD PROTECTION CARD (TAAYI CARD). Name: Sunita Devi W/o Ramesh Kumar. RCH ID: KA-RCH-2026-99214. Taayi No: TC-884219. LMP: 12/02/2026. EDD: 19/11/2026. Blood Group: O Rh -ve. Gravida: 2, Para: 1. Previous Delivery: 2023 Normal Delivery at Taluk Hospital. ANC-1 Date: 10/04/2026. Weight: 58.5 kg, BP: 114/74. Hb: 11.2 g/dL. Urine Alb/Sug: Nil/Nil. Tab Folic Acid 5mg dispensed."
  },
  {
    id: "DOC-081-02",
    patientId: "PAT-2026-081",
    title: "PHC Antenatal Visit Slip & Td-1 Card",
    category: "ANC Record",
    uploadDate: "2026-06-06",
    fileType: "application/pdf",
    fileSize: "1.1 MB",
    uploadedBy: "Dr. Rekha Rao",
    verifiedByClinician: true,
    pageCount: 1,
    previewUrl: "/sample-documents/anc_visit_slip.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 96.8,
    extractedEntities: [
      { key: "Visit Date", value: "05-06-2026", confidence: 0.99, bbox: [110, 60, 90, 16] },
      { key: "GA at Visit", value: "16 weeks 2 days", confidence: 0.97, bbox: [220, 60, 120, 16] },
      { key: "Weight", value: "61.2 kg", confidence: 0.99, bbox: [110, 95, 70, 16] },
      { key: "Blood Pressure", value: "118/76 mmHg", confidence: 0.98, bbox: [210, 95, 100, 16] },
      { key: "Fetal Heart Rate", value: "148 bpm", confidence: 0.95, bbox: [330, 95, 80, 16] },
      { key: "Td Dose 1", value: "Administered 05-06-2026", confidence: 0.99, bbox: [110, 140, 180, 16] },
      { key: "Medications Prescribed", value: "Tab IFA OD + Tab Calcium 500mg BD", confidence: 0.94, bbox: [110, 180, 260, 20] }
    ],
    fullOcrSnippet: "TALUK HOSPITAL KANAKAPURA. ANC Outpatient Slip. Date: 05-Jun-2026. GA: 16w2d. Vitals: Wt 61.2 kg, BP 118/76 mmHg. Fundal Ht: 16cm. FHR: 148 bpm regular. Td vaccine 0.5ml IM given (Dose 1). Advised Tab IFA once daily, Tab Calcium 500mg twice daily. Advised TIFFA scan at 18-20 weeks. Signature: Dr. Rekha Rao."
  },
  {
    id: "DOC-081-03",
    patientId: "PAT-2026-081",
    title: "TIFFA / Level-II Ultrasound Scan Report (20w)",
    category: "Ultrasound Report",
    uploadDate: "2026-07-03",
    fileType: "application/pdf",
    fileSize: "3.8 MB",
    uploadedBy: "Patient / Care Coordinator",
    verifiedByClinician: true,
    pageCount: 3,
    previewUrl: "/sample-documents/ultrasound_report.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 98.4,
    extractedEntities: [
      { key: "Scan Date", value: "02-07-2026", confidence: 0.99, bbox: [140, 70, 90, 16] },
      { key: "Scan GA", value: "20 weeks 0 days", confidence: 0.98, bbox: [280, 70, 110, 16] },
      { key: "EDD by Scan", value: "20-11-2026", confidence: 0.97, bbox: [430, 70, 90, 16] },
      { key: "BPD", value: "48.0 mm", confidence: 0.98, bbox: [130, 120, 80, 16] },
      { key: "FL", value: "33.1 mm", confidence: 0.97, bbox: [240, 120, 80, 16] },
      { key: "AC", value: "154.0 mm", confidence: 0.96, bbox: [350, 120, 80, 16] },
      { key: "Estimated Fetal Weight", value: "360 grams", confidence: 0.95, bbox: [130, 155, 100, 16] },
      { key: "Amniotic Fluid Index", value: "14.2 cm", confidence: 0.98, bbox: [260, 155, 80, 16] },
      { key: "Placenta", value: "Posterior Grade 1, High", confidence: 0.96, bbox: [130, 190, 180, 16] },
      { key: "Fetal Anatomy", value: "No gross structural anomaly detected", confidence: 0.99, bbox: [130, 225, 280, 18] }
    ],
    fullOcrSnippet: "RAMANAGARA DIAGNOSTIC ULTRASOUND CLINIC. Target Scan for Fetal Anomalies (TIFFA). Patient: Sunita Devi, 27Y/F. Ref: Dr. K. Srinivas. Date: 02-Jul-2026. Findings: Single live intrauterine fetus in cephalic presentation. BPD: 48mm (20w2d), FL: 33.1mm (20w1d), AC: 154mm (20w3d). EFW: 360g +/- 10%. Head: Cranial vault intact, lateral ventricles 5.8mm, cerebellum normal, midline falx present. Spine: Intact. Four-chamber heart seen, outflow tracts normal. Stomach bubble and urinary bladder seen. Liquor: Adequate, AFI 14.2cm. Impression: 20 weeks anatomy scan within normal limits. Sonologist: Dr. N. Mahesh, DMRD."
  },
  {
    id: "DOC-081-04",
    patientId: "PAT-2026-081",
    title: "Oral Glucose Tolerance Test (75g OGTT) - Biochemistry Report",
    category: "Laboratory Report",
    uploadDate: "2026-08-05",
    fileType: "application/pdf",
    fileSize: "1.4 MB",
    uploadedBy: "Central Diagnostic Lab",
    verifiedByClinician: true,
    pageCount: 1,
    previewUrl: "/sample-documents/lab_report.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 99.1,
    extractedEntities: [
      { key: "Sample Date", value: "04-08-2026", confidence: 0.99, bbox: [130, 60, 90, 16] },
      { key: "Test Name", value: "75g OGTT (DIPSI/IADPSG)", confidence: 0.98, bbox: [130, 90, 190, 18] },
      { key: "Fasting Plasma Glucose", value: "92 mg/dL", confidence: 0.99, bbox: [280, 130, 80, 16], flagged: false },
      { key: "1-Hour Plasma Glucose", value: "184 mg/dL", confidence: 0.99, bbox: [280, 160, 80, 16], flagged: true },
      { key: "2-Hour Plasma Glucose", value: "158 mg/dL", confidence: 0.99, bbox: [280, 190, 80, 16], flagged: true },
      { key: "Report Impression", value: "Values consistent with Gestational Diabetes Mellitus (GDM)", confidence: 0.97, bbox: [130, 230, 320, 20] }
    ],
    fullOcrSnippet: "DISTRICT HOSPITAL CLINICAL BIOCHEMISTRY LABORATORY. 75g Oral Glucose Tolerance Test Report. Patient: Sunita Devi. Age: 27. Specimen: Fluoride Plasma. Fasting: 92 mg/dL (Ref < 92). 1-Hour Post 75g Glucose: 184 mg/dL (Ref < 180 - ELEVATED). 2-Hour Post 75g Glucose: 158 mg/dL (Ref < 153 - ELEVATED). Method: Hexokinase. Biochemistry Note: Meets diagnostic criteria for Gestational Diabetes Mellitus. Verified by: Dr. Aruna K., MD Pathologist."
  },
  {
    id: "DOC-081-05",
    patientId: "PAT-2026-081",
    title: "Automated CBC & Venous Fasting Blood Sugar Report",
    category: "Laboratory Report",
    uploadDate: "2026-09-13",
    fileType: "application/pdf",
    fileSize: "1.2 MB",
    uploadedBy: "District Hospital Lab",
    verifiedByClinician: true,
    pageCount: 1,
    previewUrl: "/sample-documents/lab_report_cbc.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 98.2,
    extractedEntities: [
      { key: "Sample Date", value: "12-09-2026", confidence: 0.99, bbox: [120, 55, 90, 16] },
      { key: "Hemoglobin", value: "10.2 g/dL", confidence: 0.99, bbox: [260, 100, 80, 16], flagged: true },
      { key: "Total RBC Count", value: "3.75 mill/uL", confidence: 0.98, bbox: [260, 125, 90, 16] },
      { key: "Platelet Count", value: "220,000 /uL", confidence: 0.98, bbox: [260, 150, 90, 16] },
      { key: "Fasting Venous Plasma Glucose", value: "89 mg/dL", confidence: 0.99, bbox: [260, 190, 80, 16] }
    ],
    fullOcrSnippet: "DISTRICT HOSPITAL CENTRAL LAB. Complete Blood Count & Fasting Glucose. Date: 12-Sep-2026. Hb: 10.2 g/dL (Mild Anemia, Ref 11.0-14.0). PCV: 31.4%. MCV: 82 fL. Venous Fasting Blood Glucose: 89 mg/dL (Normal Fasting < 92 mg/dL)."
  },
  {
    id: "DOC-081-06",
    patientId: "PAT-2026-081",
    title: "Patient Self-Monitoring Home Glucose Diary Sheet",
    category: "Patient-Provided Record",
    uploadDate: "2026-09-18",
    fileType: "image/jpeg",
    fileSize: "1.8 MB",
    uploadedBy: "Sowbhagya K. (ASHA via Mobile)",
    verifiedByClinician: false,
    pageCount: 1,
    previewUrl: "/sample-documents/patient_diary.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 89.3,
    extractedEntities: [
      { key: "Diary Entry Date", value: "14-09-2026", confidence: 0.92, bbox: [110, 80, 80, 16] },
      { key: "Fasting Glucose (Meter)", value: "104 mg/dL", confidence: 0.91, bbox: [240, 80, 80, 16], flagged: true },
      { key: "2-hr Post Breakfast", value: "132 mg/dL", confidence: 0.88, bbox: [240, 110, 80, 16] },
      { key: "2-hr Post Lunch", value: "128 mg/dL", confidence: 0.89, bbox: [240, 140, 80, 16] },
      { key: "2-hr Post Dinner", value: "136 mg/dL", confidence: 0.87, bbox: [240, 170, 80, 16] }
    ],
    fullOcrSnippet: "HANDWRITTEN DIARY SHEET. Sunita Devi. Date: 14/09/2026. Fasting 7:00 AM: 104 (GlucoOne meter). Breakfast: 2 idlis, sambar. 2hr after breakfast: 132. Lunch 1:30 PM: 1 cup rice, dal, palya. 2hr post lunch: 128. Dinner 8:30 PM: 2 rotis, vegetable curry. 2hr post dinner: 136. Note: Had mild dizziness in afternoon."
  },

  // Priya Sharma Documents
  {
    id: "DOC-042-01",
    patientId: "PAT-2026-042",
    title: "UPHC Kengeri Mother Protection Card (Taayi)",
    category: "Taayi / Mother Card",
    uploadDate: "2026-07-22",
    fileType: "image/jpeg",
    fileSize: "2.1 MB",
    uploadedBy: "Mangala Gowri (ASHA)",
    verifiedByClinician: true,
    pageCount: 2,
    previewUrl: "/sample-documents/taayi_card_sample.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 95.1,
    extractedEntities: [
      { key: "Taayi Card No", value: "TC-652391", confidence: 0.99, bbox: [120, 45, 180, 20] },
      { key: "LMP", value: "04-06-2026", confidence: 0.95, bbox: [140, 110, 110, 18] },
      { key: "Calculated EDD by LMP", value: "11-03-2027", confidence: 0.96, bbox: [260, 110, 110, 18] },
      { key: "Blood Group", value: "B Positive", confidence: 0.97, bbox: [410, 110, 90, 18] },
      { key: "Gravida / Para", value: "G1 P0 L0 A0", confidence: 0.98, bbox: [140, 150, 120, 18] }
    ],
    fullOcrSnippet: "UPHC KENGERI. Taayi Card No: TC-652391. Name: Priya Sharma, 23Y. LMP: 04/06/2026. Calculated EDD: 11/03/2027. Gravida 1, Para 0. Blood Group: B Rh +ve. Baseline Weight: 52.0 kg. BP: 110/70. History: Irregular menstrual cycles (35-45 days)."
  },
  {
    id: "DOC-042-04",
    patientId: "PAT-2026-042",
    title: "First Trimester NT & Dating Scan Report (11w3d)",
    category: "Ultrasound Report",
    uploadDate: "2026-08-27",
    fileType: "application/pdf",
    fileSize: "2.9 MB",
    uploadedBy: "Bengaluru Scan Center",
    verifiedByClinician: true,
    pageCount: 2,
    previewUrl: "/sample-documents/ultrasound_report.svg",
    ocrStatus: "Extracted",
    ocrConfidence: 98.7,
    extractedEntities: [
      { key: "Scan Date", value: "26-08-2026", confidence: 0.99, bbox: [140, 60, 90, 16] },
      { key: "Crown-Rump Length (CRL)", value: "48.0 mm", confidence: 0.99, bbox: [260, 105, 80, 16] },
      { key: "Ultrasound Gestational Age", value: "11 weeks 3 days", confidence: 0.98, bbox: [260, 130, 110, 16] },
      { key: "Ultrasound Derived EDD", value: "23-03-2027", confidence: 0.98, bbox: [260, 155, 100, 16] },
      { key: "Nuchal Translucency (NT)", value: "1.2 mm (Normal)", confidence: 0.97, bbox: [260, 180, 110, 16] },
      { key: "Nasal Bone", value: "Present", confidence: 0.99, bbox: [260, 205, 80, 16] }
    ],
    fullOcrSnippet: "BENGALURU ADVANCED RADIOLOGY CENTER. Obstetric Ultrasound: First Trimester Dating & NT Scan. Patient: Priya Sharma, 23Y. Date: 26-Aug-2026. Findings: Single live fetus. CRL: 48mm corresponding to 11w3d. EDD by scan: 23-March-2027. Note: Discrepancy of 12 days with LMP EDD (11-Mar-2027), consistent with delayed ovulation in prolonged cycles. NT: 1.2mm. Nasal bone visualized. FHR: 156 bpm."
  }
];

export const DOCUMENT_CATEGORIES = [
  "All Documents",
  "Taayi / Mother Card",
  "ANC Record",
  "Laboratory Report",
  "Ultrasound Report",
  "Prescription",
  "Discharge Summary",
  "Patient-Provided Record"
];
