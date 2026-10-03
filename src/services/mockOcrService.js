// Mock OCR & Document Entity Extraction Service
// Simulates an intelligent document processing pipeline for maternal records

export const simulateOcrProcessing = async (file, category, patient) => {
  // Simulate network & AI processing latency
  await new Promise(resolve => setTimeout(resolve, 1400));

  const fileName = file.name || "scanned_maternal_record.pdf";
  const lowerName = fileName.toLowerCase();

  let extractedEntities = [];
  let fullOcrSnippet = "";
  let confidence = 96.4;

  if (category === "Ultrasound Report" || lowerName.includes("scan") || lowerName.includes("usg")) {
    extractedEntities = [
      { key: "Scan Modality", value: "Obstetric 2D/Doppler USG", confidence: 0.99, bbox: [120, 40, 180, 16] },
      { key: "Fetal Number", value: "Single Intrauterine Gestation", confidence: 0.98, bbox: [120, 70, 200, 16] },
      { key: "Presentation", value: "Cephalic, longitudinal lie", confidence: 0.96, bbox: [120, 100, 180, 16] },
      { key: "BPD (Biparietal Diameter)", value: "81.4 mm", confidence: 0.97, bbox: [120, 130, 150, 16] },
      { key: "Femur Length (FL)", value: "62.0 mm", confidence: 0.96, bbox: [120, 160, 140, 16] },
      { key: "Abdominal Circumference (AC)", value: "282.0 mm", confidence: 0.95, bbox: [120, 190, 160, 16] },
      { key: "Estimated Fetal Weight (EFW)", value: "1980 grams", confidence: 0.94, bbox: [120, 220, 170, 16] },
      { key: "Amniotic Fluid Index (AFI)", value: "13.6 cm (Adequate)", confidence: 0.97, bbox: [120, 250, 170, 16] },
      { key: "Placenta Position", value: "Posterior Grade 2, away from internal os", confidence: 0.96, bbox: [120, 280, 260, 16] }
    ];
    fullOcrSnippet = `ULTRASOUND REPORT - ${fileName.toUpperCase()}\nPatient: ${patient?.name || "Patient"}. Single live fetus in cephalic presentation. Regular cardiac rhythm observed (142 bpm). Biometry: BPD 81.4mm, FL 62.0mm, AC 282.0mm. Estimated fetal weight 1980g. Amniotic fluid index 13.6 cm. No gross anomaly detected. Placenta posterior grade 2.`;
  } else if (category === "Laboratory Report" || lowerName.includes("lab") || lowerName.includes("cbc") || lowerName.includes("blood")) {
    extractedEntities = [
      { key: "Hemoglobin (Hb)", value: "10.4 g/dL", confidence: 0.99, bbox: [120, 60, 140, 16], flagged: true },
      { key: "Platelet Count", value: "215,000 /uL", confidence: 0.98, bbox: [120, 95, 150, 16] },
      { key: "Total Leucocyte Count", value: "9,800 /uL", confidence: 0.97, bbox: [120, 130, 160, 16] },
      { key: "Red Cell Indices", value: "MCV 83.2 fL, MCH 28.1 pg", confidence: 0.94, bbox: [120, 165, 200, 16] },
      { key: "Fasting Blood Sugar", value: "88 mg/dL", confidence: 0.99, bbox: [120, 200, 150, 16] },
      { key: "Urine Routine", value: "Albumin: Nil, Sugar: Nil, Pus cells 1-2/hpf", confidence: 0.95, bbox: [120, 235, 240, 16] }
    ];
    fullOcrSnippet = `PATHOLOGY LABORATORY REPORT\nPatient Name: ${patient?.name || "Maternal Patient"}. Specimen: EDTA Whole Blood & Fluoride Plasma. Automated CBC Analyzer Sysmex.\nHb: 10.4 g/dL (Reference: 11.0-14.5 g/dL). PCV: 32.1%. RBC: 3.8 mil/cu.mm. WBC: 9,800/cu.mm. Platelets: 215,000/cu.mm. Fasting Glucose: 88 mg/dL.`;
  } else if (category === "Taayi / Mother Card" || lowerName.includes("taayi") || lowerName.includes("card")) {
    extractedEntities = [
      { key: "Taayi Card No", value: patient?.taayiCardNo || "TC-884219", confidence: 0.98, bbox: [120, 45, 140, 18] },
      { key: "LMP Date", value: patient?.currentPregnancy?.lmpDate || "12-02-2026", confidence: 0.97, bbox: [120, 85, 120, 18] },
      { key: "EDD Date", value: patient?.currentPregnancy?.eddLmp || "19-11-2026", confidence: 0.96, bbox: [120, 120, 120, 18] },
      { key: "Documented Blood Group", value: patient?.bloodGroup || "O Negative", confidence: 0.95, bbox: [120, 155, 110, 18] },
      { key: "Obstetric Score", value: patient?.obstetricFormula || "G2 P1 L1 A0", confidence: 0.96, bbox: [120, 190, 120, 18] }
    ];
    fullOcrSnippet = `MOTHER AND CHILD PROTECTION CARD (TAAYI CARD)\nName: ${patient?.name}. Taayi No: ${patient?.taayiCardNo}. RCH ID: ${patient?.rchId}. LMP: ${patient?.currentPregnancy?.lmpDate}. EDD: ${patient?.currentPregnancy?.eddLmp}. Blood Group: ${patient?.bloodGroup}. Gravida: ${patient?.obstetrics?.gravida}, Para: ${patient?.obstetrics?.para}.`;
  } else {
    // Generic clinical prescription or record
    extractedEntities = [
      { key: "Document Date", value: new Date().toISOString().split('T')[0], confidence: 0.98, bbox: [120, 50, 120, 16] },
      { key: "Facility", value: patient?.phc || "Taluk Hospital", confidence: 0.96, bbox: [120, 85, 180, 16] },
      { key: "Documented Diagnosis / Note", value: "Antenatal Consultation Follow-up", confidence: 0.93, bbox: [120, 120, 220, 16] },
      { key: "Medications Recorded", value: "Tab IFA OD + Tab Calcium 500mg BD", confidence: 0.94, bbox: [120, 155, 240, 16] }
    ];
    fullOcrSnippet = `CLINICAL CONSULTATION NOTE\nFacility: ${patient?.phc || "Hospital"}. Date: ${new Date().toISOString().split('T')[0]}. Patient: ${patient?.name}. Follow-up evaluation. Vitals recorded. Continued on regular antenatal supplements. Advised next follow-up in 2 weeks.`;
  }

  return {
    title: fileName.replace(/\.[^/.]+$/, ""),
    category: category || "Clinical Document",
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB` || "1.8 MB",
    fileType: file.type || "application/pdf",
    ocrStatus: "Extracted",
    ocrConfidence: confidence,
    extractedEntities,
    fullOcrSnippet
  };
};
