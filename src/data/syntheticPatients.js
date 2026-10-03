// High-fidelity synthetic patient data for MaatruAI Prototype
// Health-a-thon 2026 - Consultation Readiness & Patient Journey Review
// All data is realistic, clinically grounded, and strictly synthetic.

export const SYNTHETIC_PATIENTS = [
  {
    id: "PAT-2026-081",
    rchId: "KA-RCH-2026-99214",
    taayiCardNo: "TC-884219",
    name: "Sunita Devi",
    age: 27,
    gender: "Female",
    phone: "+91 98450 12890",
    address: "Ward 4, Kanakapura Town, Ramanagara Dist, Karnataka",
    subCenter: "Kanakapura Rural-SC",
    phc: "Kanakapura Taluk General Hospital",
    ashaWorker: {
      name: "Sowbhagya K.",
      phone: "+91 94481 44521",
      lastContactDate: "2026-09-24"
    },
    bloodGroup: "O Negative (Rh -ve)",
    rhFactor: "Negative",
    obstetricFormula: "G2 P1 L1 A0",
    obstetrics: {
      gravida: 2,
      para: 1,
      living: 1,
      abortions: 0,
      priorDeliveries: [
        {
          year: 2023,
          outcome: "Live Birth",
          mode: "Normal Vaginal Delivery",
          birthWeightKg: 2.9,
          facility: "Taluk Hospital Kanakapura",
          babyGender: "Male",
          complications: "Uneventful. Received Anti-D postpartum (Baby was B +ve)."
        }
      ]
    },
    baselineVitals: {
      prePregnancyWeightKg: 58.0,
      heightCm: 156,
      baselineBMI: 23.8,
      baselineBP: "116/74"
    },
    currentPregnancy: {
      lmpDate: "2026-02-12",
      eddLmp: "2026-11-19",
      eddUsg: "2026-11-21",
      gestationalAgeWeeks: 32,
      gestationalAgeDays: 4,
      currentStage: "Trimester 3",
      trimester: 3,
      isHighAttention: true,
      highAttentionReasons: [
        "Documented Gestational Diabetes Mellitus (26w OGTT)",
        "Documented Rh-Negative Maternal Status",
        "Documented Mild Anemia (Hb 9.8 g/dL)"
      ]
    },
    consultationReadiness: {
      overallStatus: "Review Required",
      scorePercent: 78,
      lastSynthesizedAt: "2026-09-27T08:30:00Z",
      summaryText: "32w4d G2P1 with documented GDM on dietary therapy and Rh-negative status. 28w Anti-D documentation is missing from records. Fasting glucose discrepancy detected between home log and central lab report.",
      unreviewedDiscrepanciesCount: 1,
      missingMandatoryRecordsCount: 2,
      pendingActionsCount: 3,
      digitizedDocumentsCount: 6
    },
    visits: [
      {
        id: "VIS-081-1",
        visitNumber: 1,
        date: "2026-04-10",
        gestationalAgeWeeks: 8,
        gestationalAgeDays: 1,
        facility: "Kanakapura Taluk Hospital",
        clinician: "Dr. Rekha Rao, MBBS, DGO",
        vitals: {
          systolicBP: 114,
          diastolicBP: 74,
          weightKg: 58.5,
          fundalHeightCm: null,
          fetalHeartRateBpm: null,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Mild morning nausea", "Fatigue"],
        notes: "First antenatal visit. Early dating scan advised. Started on Tab Folic Acid 5mg OD. Rh negative status identified - advised indirect Coombs test (ICT) and spouse Rh typing.",
        sourceDocumentId: "DOC-081-01"
      },
      {
        id: "VIS-081-2",
        visitNumber: 2,
        date: "2026-06-05",
        gestationalAgeWeeks: 16,
        gestationalAgeDays: 2,
        facility: "Kanakapura Taluk Hospital",
        clinician: "Dr. Rekha Rao, MBBS, DGO",
        vitals: {
          systolicBP: 118,
          diastolicBP: 76,
          weightKg: 61.2,
          fundalHeightCm: 16,
          fetalHeartRateBpm: 148,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["None"],
        notes: "Uterus 16 weeks size. FHR positive and regular (148 bpm). Started on Tab Iron + Folic Acid (IFA) OD and Tab Calcium 500mg BD. Td dose 1 administered. TIFFA scan scheduled between 18-20 weeks.",
        sourceDocumentId: "DOC-081-02"
      },
      {
        id: "VIS-081-3",
        visitNumber: 3,
        date: "2026-07-28",
        gestationalAgeWeeks: 23,
        gestationalAgeDays: 5,
        facility: "Ramanagara District Hospital",
        clinician: "Dr. K. Srinivas, MD (OBG)",
        vitals: {
          systolicBP: 122,
          diastolicBP: 78,
          weightKg: 64.0,
          fundalHeightCm: 24,
          fetalHeartRateBpm: 144,
          pedalEdema: "Trace bilateral",
          urineAlbumin: "Nil",
          urineSugar: "Trace"
        },
        documentedComplaints: ["Occasional dizziness", "Leg cramps"],
        notes: "TIFFA scan report reviewed - normal single intrauterine pregnancy, no gross anomaly. Trace urine sugar noted - 75g OGTT scheduled. Td dose 2 administered. Advised dietary counseling for maternal weight gain.",
        sourceDocumentId: "DOC-081-03"
      },
      {
        id: "VIS-081-4",
        visitNumber: 4,
        date: "2026-09-08",
        gestationalAgeWeeks: 29,
        gestationalAgeDays: 5,
        facility: "Kanakapura Taluk Hospital",
        clinician: "Dr. Rekha Rao, MBBS, DGO",
        vitals: {
          systolicBP: 126,
          diastolicBP: 82,
          weightKg: 66.8,
          fundalHeightCm: 30,
          fetalHeartRateBpm: 140,
          pedalEdema: "Mild (+)",
          urineAlbumin: "Nil",
          urineSugar: "Present (+)"
        },
        documentedComplaints: ["Increased thirst", "Mild pedal edema after walking"],
        notes: "Review of 26w OGTT results: Fasting 92, 1h 184, 2h 158 mg/dL. Gestational Diabetes documented. Medical Nutrition Therapy (MNT) initiated. Advised home capillary blood glucose self-monitoring. Advised 28w prophylactic Anti-D immunoglobulin injection.",
        sourceDocumentId: "DOC-081-04"
      }
    ],
    longitudinalMetrics: {
      hemoglobin: [
        { date: "2026-04-10", gaWeeks: 8, value: 11.2, unit: "g/dL", sourceDoc: "DOC-081-05" },
        { date: "2026-06-05", gaWeeks: 16, value: 10.6, unit: "g/dL", sourceDoc: "DOC-081-05" },
        { date: "2026-07-28", gaWeeks: 24, value: 9.8, unit: "g/dL", sourceDoc: "DOC-081-05" },
        { date: "2026-09-08", gaWeeks: 30, value: 10.2, unit: "g/dL", sourceDoc: "DOC-081-05" }
      ],
      bloodPressure: [
        { date: "2026-04-10", gaWeeks: 8, systolic: 114, diastolic: 74 },
        { date: "2026-06-05", gaWeeks: 16, systolic: 118, diastolic: 76 },
        { date: "2026-07-28", gaWeeks: 24, systolic: 122, diastolic: 78 },
        { date: "2026-09-08", gaWeeks: 30, systolic: 126, diastolic: 82 }
      ],
      weight: [
        { date: "2026-02-12", gaWeeks: 0, weightKg: 58.0, note: "Pre-pregnancy" },
        { date: "2026-04-10", gaWeeks: 8, weightKg: 58.5, note: "ANC 1" },
        { date: "2026-06-05", gaWeeks: 16, weightKg: 61.2, note: "ANC 2" },
        { date: "2026-07-28", gaWeeks: 24, weightKg: 64.0, note: "ANC 3" },
        { date: "2026-09-08", gaWeeks: 30, weightKg: 66.8, note: "ANC 4" }
      ],
      glucose: [
        { date: "2026-08-04", gaWeeks: 25, type: "OGTT Fasting", value: 92, unit: "mg/dL", normalRef: "< 92" },
        { date: "2026-08-04", gaWeeks: 25, type: "OGTT 1-Hour", value: 184, unit: "mg/dL", normalRef: "< 180" },
        { date: "2026-08-04", gaWeeks: 25, type: "OGTT 2-Hour", value: 158, unit: "mg/dL", normalRef: "< 153" },
        { date: "2026-09-12", gaWeeks: 30, type: "Fasting Plasma Glucose (Central Lab)", value: 89, unit: "mg/dL", normalRef: "< 92" },
        { date: "2026-09-14", gaWeeks: 30, type: "Self-Monitoring Fasting (Home Meter)", value: 104, unit: "mg/dL", normalRef: "< 95" }
      ],
      ultrasounds: [
        {
          date: "2026-04-12",
          gaWeeks: 8,
          scanType: "Dating & Viability Scan",
          crlMm: 18.2,
          bpdMm: null,
          flMm: null,
          acMm: null,
          efwGrams: null,
          afiCm: null,
          presentation: "N/A",
          placenta: "Anterior, adequate liquor",
          eddScan: "2026-11-21",
          impression: "Single viable intrauterine gestation corresponding to 8w2d. Cardiac activity confirmed."
        },
        {
          date: "2026-07-02",
          gaWeeks: 20,
          scanType: "TIFFA / Anomaly Scan (18-22w)",
          crlMm: null,
          bpdMm: 48.0,
          flMm: 33.1,
          acMm: 154.0,
          efwGrams: 360,
          afiCm: 14.2,
          presentation: "Cephalic",
          placenta: "Posterior Grade 1, clear of internal os",
          eddScan: "2026-11-20",
          impression: "Single live fetus with normal anatomical survey. Normal fetal biometry corresponding to 20w0d."
        }
      ]
    },
    activeMedications: [
      {
        id: "MED-081-1",
        name: "Tab Iron & Folic Acid (IFA)",
        dose: "100mg elemental Iron + 500mcg FA",
        frequency: "Once daily, night after food",
        startedAt: "2026-06-05",
        status: "Active",
        adherenceNote: "Patient reports regular intake. Mild constipation reported."
      },
      {
        id: "MED-081-2",
        name: "Tab Calcium Carbonate",
        dose: "500mg Calcium + 250 IU Vit D3",
        frequency: "Twice daily with meals",
        startedAt: "2026-06-05",
        status: "Active",
        adherenceNote: "Taken separately from Iron as advised."
      },
      {
        id: "MED-081-3",
        name: "Medical Nutrition Therapy (GDM)",
        dose: "1800 kcal divided gestational diabetic diet",
        frequency: "3 major meals + 3 snacks",
        startedAt: "2026-09-08",
        status: "Active",
        adherenceNote: "Advised walking 15 mins post meals."
      }
    ],
    discrepancies: [
      {
        id: "DISC-081-1",
        field: "Fasting Blood Glucose (30w)",
        status: "Pending Clinician Review",
        severity: "Medium",
        neutralAdvisory: "Information discrepancy detected — clinician verification required.",
        description: "Significant difference observed between documented home glucometer log and central laboratory plasma glucose report taken within 48 hours.",
        sources: [
          {
            title: "District Hospital Venous Plasma Report",
            date: "2026-09-12",
            reportedValue: "89 mg/dL (Normal Fasting)",
            docType: "Laboratory Slip",
            docId: "DOC-081-05"
          },
          {
            title: "Patient Self-Monitoring Diary",
            date: "2026-09-14",
            reportedValue: "104 mg/dL (Elevated Fasting)",
            docType: "Patient Uploaded Image",
            docId: "DOC-081-06"
          }
        ],
        clinicianActionPrompt: "Verify testing condition, fasting duration, meter calibration, or repeat supervised venous fasting blood sugar."
      }
    ],
    missingInformation: [
      {
        id: "MISS-081-1",
        title: "28-Week Anti-D Prophylaxis Administration Slip",
        category: "Immunization / Prophylaxis",
        criticality: "High",
        recommendedWindow: "28w 0d to 30w 0d (Due: Early September 2026)",
        clinicalContext: "Patient is documented Rh-Negative (O -ve) with prior Rh+ newborn. Anti-D administration at 28 weeks was advised in ANC notes, but official injection receipt / batch slip is missing from uploaded records.",
        suggestedAction: "ASHA / Doctor to confirm if 300mcg Anti-D was administered at Taluk Hospital and collect document."
      },
      {
        id: "MISS-081-2",
        title: "Third Trimester Growth Ultrasound (32-34w)",
        category: "Ultrasound Biometry",
        criticality: "Medium",
        recommendedWindow: "32w 0d to 34w 0d",
        clinicalContext: "Required for GDM fetal surveillance to assess abdominal circumference (AC), estimated fetal weight (EFW), and amniotic fluid index (AFI).",
        suggestedAction: "Schedule 32-34 week growth scan at District Hospital."
      }
    ],
    pendingDocumentedActions: [
      {
        id: "ACT-081-1",
        task: "Verify 28w Anti-D Immunoglobulin documentation with patient/ASHA",
        dueDate: "2026-09-28",
        responsible: "Doctor / ASHA",
        status: "Pending"
      },
      {
        id: "ACT-081-2",
        task: "Review home glucometer technique & fasting compliance with dietitian",
        dueDate: "2026-09-28",
        responsible: "Care Coordinator",
        status: "Pending"
      },
      {
        id: "ACT-081-3",
        task: "Repeat complete blood count (CBC) to evaluate response to oral iron",
        dueDate: "2026-10-02",
        responsible: "Laboratory",
        status: "Scheduled"
      }
    ],
    changesSinceLastVisit: [
      "Gestational age progressed from 29w5d to 32w4d (+19 days).",
      "Maternal weight increased from 66.8 kg to 67.9 kg (+1.1 kg).",
      "Home glucometer log uploaded showing 4 fasting readings averaging 101 mg/dL.",
      "Trace pedal edema persisted; blood pressure remained stable at 124/80 mmHg.",
      "Dietary adherence to 1800 kcal meal plan reported by ASHA phone check-in."
    ]
  },
  {
    id: "PAT-2026-042",
    rchId: "KA-RCH-2026-77149",
    taayiCardNo: "TC-652391",
    name: "Priya Sharma",
    age: 23,
    gender: "Female",
    phone: "+91 97410 43901",
    address: "Cross 2, Vidyanagar, Bengaluru South, Karnataka",
    subCenter: "Kengeri-SC",
    phc: "Urban Primary Health Center Kengeri",
    ashaWorker: {
      name: "Mangala Gowri",
      phone: "+91 98802 33119",
      lastContactDate: "2026-09-22"
    },
    bloodGroup: "B Positive (Rh +ve)",
    rhFactor: "Positive",
    obstetricFormula: "G1 P0 L0 A0",
    obstetrics: {
      gravida: 1,
      para: 0,
      living: 0,
      abortions: 0,
      priorDeliveries: []
    },
    baselineVitals: {
      prePregnancyWeightKg: 52.0,
      heightCm: 160,
      baselineBMI: 20.3,
      baselineBP: "110/70"
    },
    currentPregnancy: {
      lmpDate: "2026-06-04",
      eddLmp: "2026-03-11", // Discordant with scan
      eddUsg: "2026-03-23", // 12 days difference
      gestationalAgeWeeks: 14,
      gestationalAgeDays: 2,
      currentStage: "Trimester 2",
      trimester: 2,
      isHighAttention: true,
      highAttentionReasons: [
        "12-Day Dating Discrepancy (LMP vs 11w Ultrasound)",
        "Documented Subclinical Hypothyroidism on L-Thyroxine",
        "Primigravida Early 2nd Trimester Transition"
      ]
    },
    consultationReadiness: {
      overallStatus: "Review Required",
      scorePercent: 82,
      lastSynthesizedAt: "2026-09-27T09:15:00Z",
      summaryText: "14w2d Primigravida with subclinical hypothyroidism (TSH 2.6 mIU/L on 25mcg Thyroxine). Significant 12-day discrepancy between LMP EDD and first-trimester dating scan. Td-2 immunization pending.",
      unreviewedDiscrepanciesCount: 1,
      missingMandatoryRecordsCount: 1,
      pendingActionsCount: 2,
      digitizedDocumentsCount: 5
    },
    visits: [
      {
        id: "VIS-042-1",
        visitNumber: 1,
        date: "2026-07-20",
        gestationalAgeWeeks: 6,
        gestationalAgeDays: 4,
        facility: "UPHC Kengeri",
        clinician: "Dr. Deepa Nataraj, MBBS",
        vitals: {
          systolicBP: 108,
          diastolicBP: 68,
          weightKg: 52.2,
          fundalHeightCm: null,
          fetalHeartRateBpm: null,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Nausea", "Breast tenderness", "History of irregular periods"],
        notes: "Urine pregnancy test positive. History of 35-45 day menstrual cycles. Started Tab Folic Acid 5mg OD. Advised Thyroid function test and dating ultrasound.",
        sourceDocumentId: "DOC-042-01"
      },
      {
        id: "VIS-042-2",
        visitNumber: 2,
        date: "2026-08-28",
        gestationalAgeWeeks: 11,
        gestationalAgeDays: 5,
        facility: "UPHC Kengeri",
        clinician: "Dr. Deepa Nataraj, MBBS",
        vitals: {
          systolicBP: 112,
          diastolicBP: 70,
          weightKg: 53.4,
          fundalHeightCm: null,
          fetalHeartRateBpm: 156,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Mild fatigue"],
        notes: "Dating scan performed at 11w3d. CRL 48mm, NT 1.2mm, nasal bone present. Dating ultrasound places EDD at 23-Mar-2027, compared to LMP EDD of 11-Mar-2027 (12 days difference). TSH 4.6 mIU/L documented; started Tab Levothyroxine 25mcg OD empty stomach.",
        sourceDocumentId: "DOC-042-02"
      }
    ],
    longitudinalMetrics: {
      hemoglobin: [
        { date: "2026-07-20", gaWeeks: 6, value: 12.4, unit: "g/dL", sourceDoc: "DOC-042-03" },
        { date: "2026-08-28", gaWeeks: 12, value: 12.0, unit: "g/dL", sourceDoc: "DOC-042-03" }
      ],
      bloodPressure: [
        { date: "2026-07-20", gaWeeks: 6, systolic: 108, diastolic: 68 },
        { date: "2026-08-28", gaWeeks: 12, systolic: 112, diastolic: 70 },
        { date: "2026-09-25", gaWeeks: 14, systolic: 110, diastolic: 72 }
      ],
      weight: [
        { date: "2026-06-04", gaWeeks: 0, weightKg: 52.0, note: "Pre-pregnancy" },
        { date: "2026-07-20", gaWeeks: 6, weightKg: 52.2, note: "ANC 1" },
        { date: "2026-08-28", gaWeeks: 12, weightKg: 53.4, note: "ANC 2" },
        { date: "2026-09-25", gaWeeks: 14, weightKg: 54.5, note: "ANC 3" }
      ],
      glucose: [
        { date: "2026-07-20", gaWeeks: 6, type: "Fasting Blood Sugar", value: 84, unit: "mg/dL", normalRef: "< 92" }
      ],
      ultrasounds: [
        {
          date: "2026-08-26",
          gaWeeks: 11,
          scanType: "NT / First Trimester Scan",
          crlMm: 48.0,
          bpdMm: 17.5,
          flMm: null,
          acMm: null,
          efwGrams: null,
          afiCm: null,
          presentation: "N/A",
          placenta: "Anterior, clear",
          eddScan: "2027-03-23",
          impression: "Single live intrauterine fetus measuring 11w3d. CRL 48mm. NT 1.2mm (Normal). Nasal bone visualized."
        }
      ]
    },
    activeMedications: [
      {
        id: "MED-042-1",
        name: "Tab Levothyroxine Sodium",
        dose: "25 mcg",
        frequency: "Once daily, early morning empty stomach 30m before tea",
        startedAt: "2026-08-28",
        status: "Active",
        adherenceNote: "Patient reports strict morning adherence."
      },
      {
        id: "MED-042-2",
        name: "Tab Folic Acid",
        dose: "5 mg",
        frequency: "Once daily",
        startedAt: "2026-07-20",
        status: "Active",
        adherenceNote: "Completing first trimester regimen."
      },
      {
        id: "MED-042-3",
        name: "Tab IFA + Tab Calcium",
        dose: "Standard national program dose",
        frequency: "Starting at 14 weeks",
        startedAt: "2026-09-25",
        status: "Active",
        adherenceNote: "Prescribed at current visit."
      }
    ],
    discrepancies: [
      {
        id: "DISC-042-1",
        field: "Expected Delivery Date (EDD) Dating",
        status: "Pending Clinician Review",
        severity: "High",
        neutralAdvisory: "Information discrepancy detected — clinician verification required.",
        description: "A 12-day difference exists between the LMP calculation (EDD: 11-Mar-2027) and the 11-week Dating Ultrasound scan (EDD: 23-Mar-2027). When LMP vs T1 scan differs by >7 days, guidelines suggest scan-derived dating.",
        sources: [
          {
            title: "Taayi Card LMP Record",
            date: "2026-07-20",
            reportedValue: "EDD: 11-March-2027 (by LMP: 04-Jun-2026)",
            docType: "Physical Mother Card",
            docId: "DOC-042-01"
          },
          {
            title: "First Trimester NT & Dating Scan",
            date: "2026-08-26",
            reportedValue: "EDD: 23-March-2027 (by CRL: 48mm at 11w3d)",
            docType: "Radiology Report",
            docId: "DOC-042-04"
          }
        ],
        clinicianActionPrompt: "Confirm whether clinical dating should be formally updated to scan EDD (23-Mar-2027) in the Taayi card."
      }
    ],
    missingInformation: [
      {
        id: "MISS-042-1",
        title: "Tetanus-Diphtheria (Td) Dose 2 Immunization Record",
        category: "Immunization",
        criticality: "Medium",
        recommendedWindow: "4 weeks after Dose 1 (Due: Late September 2026)",
        clinicalContext: "Td-1 was documented on 28-Aug-2026. The 4-week window has elapsed, but Td-2 verification stamp has not been uploaded.",
        suggestedAction: "ASHA worker to administer or verify Td-2 administration at UPHC."
      }
    ],
    pendingDocumentedActions: [
      {
        id: "ACT-042-1",
        task: "Clinician verification of formal EDD (LMP vs Scan Dating reconciliation)",
        dueDate: "2026-09-28",
        responsible: "Doctor",
        status: "Pending"
      },
      {
        id: "ACT-042-2",
        task: "Repeat Serum TSH at 16 weeks to assess adequacy of 25mcg Thyroxine",
        dueDate: "2026-10-10",
        responsible: "Laboratory",
        status: "Scheduled"
      }
    ],
    changesSinceLastVisit: [
      "Second trimester entered: Gestational age progressed to 14w2d.",
      "Blood pressure remains normal and stable at 110/72 mmHg.",
      "TSH repeat sample collected; awaiting lab validation.",
      "Transitioned from Folic Acid alone to routine IFA + Calcium supplementation."
    ]
  },
  {
    id: "PAT-2026-105",
    rchId: "KA-RCH-2026-33981",
    taayiCardNo: "TC-401928",
    name: "Ananya Rao",
    age: 31,
    gender: "Female",
    phone: "+91 99801 88412",
    address: "14th Main, Malleshwaram, Bengaluru North, Karnataka",
    subCenter: "Malleshwaram-SC",
    phc: "KC General Hospital",
    ashaWorker: {
      name: "Lakshmamma N.",
      phone: "+91 94811 77620",
      lastContactDate: "2026-09-26"
    },
    bloodGroup: "A Positive (Rh +ve)",
    rhFactor: "Positive",
    obstetricFormula: "G3 P2 L2 A1",
    obstetrics: {
      gravida: 3,
      para: 2,
      living: 2,
      abortions: 1,
      priorDeliveries: [
        {
          year: 2021,
          outcome: "Live Birth",
          mode: "Lower Segment Cesarean Section (LSCS)",
          birthWeightKg: 3.1,
          facility: "KC General Hospital",
          babyGender: "Male",
          complications: "Fetal distress in late 1st stage."
        },
        {
          year: 2026,
          outcome: "Live Birth",
          mode: "Repeat Elective LSCS",
          birthWeightKg: 3.15,
          facility: "KC General Hospital",
          babyGender: "Female",
          complications: "Delivered 14 days ago (13-Sep-2026). Uneventful intra-op course."
        }
      ]
    },
    baselineVitals: {
      prePregnancyWeightKg: 62.0,
      heightCm: 158,
      baselineBMI: 24.8,
      baselineBP: "118/76"
    },
    currentPregnancy: {
      lmpDate: "2025-12-08",
      eddLmp: "2026-09-15",
      eddUsg: "2026-09-14",
      deliveryDate: "2026-09-13",
      postnatalDay: 14,
      currentStage: "Post-natal",
      trimester: null,
      isHighAttention: false,
      highAttentionReasons: [
        "Postnatal Day 14 post Repeat Cesarean Delivery",
        "Mild Discrepancy in Postpartum Hemoglobin Readings"
      ]
    },
    consultationReadiness: {
      overallStatus: "Ready",
      scorePercent: 91,
      lastSynthesizedAt: "2026-09-27T08:00:00Z",
      summaryText: "Postnatal Day 14 follow-up following repeat LSCS. Healthy female infant (3.15kg). Surgical scar healthy, uterus well-involuted, exclusive breastfeeding established. Newborn screening lab slip pending.",
      unreviewedDiscrepanciesCount: 1,
      missingMandatoryRecordsCount: 1,
      pendingActionsCount: 1,
      digitizedDocumentsCount: 7
    },
    visits: [
      {
        id: "VIS-105-D",
        visitNumber: 5,
        date: "2026-09-13",
        gestationalAgeWeeks: 39,
        gestationalAgeDays: 5,
        facility: "KC General Hospital",
        clinician: "Dr. Vidya Shankar, MS (OBG)",
        vitals: {
          systolicBP: 120,
          diastolicBP: 80,
          weightKg: 73.5,
          fundalHeightCm: 38,
          fetalHeartRateBpm: 142,
          pedalEdema: "Mild",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Scheduled admission for elective repeat LSCS"],
        notes: "Delivered live female infant at 10:14 AM. Birth weight 3.15kg. APGAR 8, 9. Baby cried immediately. Placenta complete.",
        sourceDocumentId: "DOC-105-01"
      },
      {
        id: "VIS-105-P1",
        visitNumber: 6,
        date: "2026-09-20",
        gestationalAgeWeeks: null,
        facility: "Home Visit (ASHA / ANM)",
        clinician: "Lakshmamma N. (ASHA) / ANM Sudha",
        vitals: {
          systolicBP: 116,
          diastolicBP: 74,
          weightKg: 68.2,
          fundalHeightCm: null,
          fetalHeartRateBpm: null,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Mild lower abdominal twinges on movement"],
        notes: "Postnatal Day 7 home check. LSCS dressing intact, no soakage or induration. Lochia serosa, non-foul smelling. Infant breastfed every 2 hours, passed urine >6 times/day, no neonatal jaundice noted.",
        sourceDocumentId: "DOC-105-02"
      }
    ],
    longitudinalMetrics: {
      hemoglobin: [
        { date: "2026-01-15", gaWeeks: 6, value: 12.1, unit: "g/dL", sourceDoc: "DOC-105-03" },
        { date: "2026-05-10", gaWeeks: 22, value: 11.4, unit: "g/dL", sourceDoc: "DOC-105-03" },
        { date: "2026-08-20", gaWeeks: 36, value: 11.2, unit: "g/dL", sourceDoc: "DOC-105-03" },
        { date: "2026-09-15", gaWeeks: 40, value: 10.5, unit: "g/dL", sourceDoc: "DOC-105-04", note: "Hospital Discharge Hb" },
        { date: "2026-09-20", gaWeeks: null, value: 9.1, unit: "g/dL", sourceDoc: "DOC-105-02", note: "Day-7 PHC Fingerstick" }
      ],
      bloodPressure: [
        { date: "2026-05-10", gaWeeks: 22, systolic: 114, diastolic: 74 },
        { date: "2026-08-20", gaWeeks: 36, systolic: 120, diastolic: 78 },
        { date: "2026-09-13", gaWeeks: 39, systolic: 120, diastolic: 80 },
        { date: "2026-09-20", gaWeeks: null, systolic: 116, diastolic: 74 },
        { date: "2026-09-27", gaWeeks: null, systolic: 114, diastolic: 72 }
      ],
      weight: [
        { date: "2025-12-08", gaWeeks: 0, weightKg: 62.0, note: "Pre-pregnancy" },
        { date: "2026-05-10", gaWeeks: 22, weightKg: 68.0, note: "ANC 2" },
        { date: "2026-08-20", gaWeeks: 36, weightKg: 73.0, note: "ANC 4" },
        { date: "2026-09-13", gaWeeks: 39, weightKg: 73.5, note: "Pre-delivery" },
        { date: "2026-09-20", gaWeeks: null, weightKg: 68.2, note: "Postnatal Day 7" },
        { date: "2026-09-27", gaWeeks: null, weightKg: 66.8, note: "Postnatal Day 14" }
      ],
      glucose: [
        { date: "2026-05-15", gaWeeks: 23, type: "OGTT Fasting", value: 82, unit: "mg/dL", normalRef: "< 92" },
        { date: "2026-05-15", gaWeeks: 23, type: "OGTT 2-Hour", value: 118, unit: "mg/dL", normalRef: "< 153" }
      ],
      ultrasounds: [
        {
          date: "2026-08-22",
          gaWeeks: 36,
          scanType: "Third Trimester Growth Scan",
          crlMm: null,
          bpdMm: 90.0,
          flMm: 70.2,
          acMm: 318.0,
          efwGrams: 2850,
          afiCm: 12.8,
          presentation: "Cephalic",
          placenta: "Posterior Grade 2, well away from prior LSCS scar",
          eddScan: "2026-09-14",
          impression: "Single live fetus with reassuring growth parameters. Lower uterine segment scar thickness 3.2mm."
        }
      ]
    },
    activeMedications: [
      {
        id: "MED-105-1",
        name: "Tab Iron & Folic Acid",
        dose: "100mg elemental Iron + 500mcg FA",
        frequency: "Once daily, night after food (180 days postpartum)",
        startedAt: "2026-09-15",
        status: "Active",
        adherenceNote: "Continuing routine postpartum anemia prophylaxis."
      },
      {
        id: "MED-105-2",
        name: "Tab Calcium + Vitamin D3",
        dose: "500mg elemental Calcium",
        frequency: "Twice daily with meals",
        startedAt: "2026-09-15",
        status: "Active",
        adherenceNote: "Supports maternal bone density during lactation."
      },
      {
        id: "MED-105-3",
        name: "Tab Paracetamol",
        dose: "650 mg",
        frequency: "SOS for pain",
        startedAt: "2026-09-15",
        status: "Active",
        adherenceNote: "Patient reports rare usage (once in last 4 days)."
      }
    ],
    discrepancies: [
      {
        id: "DISC-105-1",
        field: "Postpartum Hemoglobin Level",
        status: "Pending Clinician Review",
        severity: "Medium",
        neutralAdvisory: "Information discrepancy detected — clinician verification required.",
        description: "Discharge summary reports venous automated CBC Hb as 10.5 g/dL on 15-Sep. Day-7 PHC home visit notes record capillary fingerstick Hb as 9.1 g/dL on 20-Sep.",
        sources: [
          {
            title: "KC General Hospital Inpatient Discharge Summary",
            date: "2026-09-15",
            reportedValue: "Hb: 10.5 g/dL (Venous Coulter counter)",
            docType: "Discharge Summary",
            docId: "DOC-105-04"
          },
          {
            title: "PHC Postnatal Day-7 Home Visit Slip",
            date: "2026-09-20",
            reportedValue: "Hb: 9.1 g/dL (Capillary Hemocue)",
            docType: "ASHA / ANM Note",
            docId: "DOC-105-02"
          }
        ],
        clinicianActionPrompt: "Assess patient clinically for signs of pallor or lethargy; consider standard venous CBC repeat if symptomatic."
      }
    ],
    missingInformation: [
      {
        id: "MISS-105-1",
        title: "Newborn Metabolic Screening (NBS) Slip",
        category: "Neonatal Laboratory Records",
        criticality: "Medium",
        recommendedWindow: "Between 48 hours and 7 days post-birth",
        clinicalContext: "Infant heel-prick sample was recorded as collected in hospital, but formal NBS lab result slip has not been added to maternal continuity record.",
        suggestedAction: "Request mother or hospital records clerk to provide NBS test result."
      }
    ],
    pendingDocumentedActions: [
      {
        id: "ACT-105-1",
        task: "Surgical suture removal / wound inspection confirmation by Medical Officer",
        dueDate: "2026-09-27",
        responsible: "Doctor",
        status: "Pending"
      },
      {
        id: "ACT-105-2",
        task: "6-Week Postpartum visit & Family Planning counseling scheduling",
        dueDate: "2026-10-25",
        responsible: "ASHA Worker",
        status: "Scheduled"
      }
    ],
    changesSinceLastVisit: [
      "Patient is now at Postnatal Day 14 following successful repeat LSCS.",
      "Lochial flow transitioned to scant lochia alba with zero signs of infection.",
      "Infant birth weight (3.15kg) regained, current estimated weight 3.32kg.",
      "Maternal weight decreased to 66.8 kg (-6.7 kg from pre-delivery)."
    ]
  },
  {
    id: "PAT-2026-027",
    rchId: "KA-RCH-2026-11488",
    taayiCardNo: "TC-291044",
    name: "Lakshmi Gowda",
    age: 29,
    gender: "Female",
    phone: "+91 96112 55904",
    address: "Harihara Colony, Magadi Taluk, Ramanagara Dist, Karnataka",
    subCenter: "Tippasandra-SC",
    phc: "Magadi Taluk Community Health Center",
    ashaWorker: {
      name: "Geetha Bai",
      phone: "+91 97311 00892",
      lastContactDate: "2026-09-25"
    },
    bloodGroup: "B Positive on Taayi Card / B Negative on Old 2022 Requisition",
    rhFactor: "Unconfirmed / Discrepant",
    obstetricFormula: "G3 P2 L2 A0",
    obstetrics: {
      gravida: 3,
      para: 2,
      living: 2,
      abortions: 0,
      priorDeliveries: [
        {
          year: 2020,
          outcome: "Live Birth",
          mode: "Normal Vaginal Delivery",
          birthWeightKg: 2.7,
          facility: "Magadi CHC",
          babyGender: "Female",
          complications: "None documented."
        },
        {
          year: 2022,
          outcome: "Live Birth",
          mode: "Normal Vaginal Delivery",
          birthWeightKg: 2.85,
          facility: "Magadi CHC",
          babyGender: "Male",
          complications: "Severe postpartum anemia (Hb 7.8 g/dL), treated with oral iron."
        }
      ]
    },
    baselineVitals: {
      prePregnancyWeightKg: 49.0,
      heightCm: 152,
      baselineBMI: 21.2,
      baselineBP: "106/66"
    },
    currentPregnancy: {
      lmpDate: "2026-04-10",
      eddLmp: "2027-01-15",
      eddUsg: "2027-01-18",
      gestationalAgeWeeks: 24,
      gestationalAgeDays: 1,
      currentStage: "Trimester 2",
      trimester: 2,
      isHighAttention: true,
      highAttentionReasons: [
        "Conflicting Maternal Rh Typing in Documented Records",
        "Documented Moderate Iron Deficiency Anemia (Hb 8.2 g/dL)",
        "Severe Gastrointestinal Intolerance to Oral Iron Tablets"
      ]
    },
    consultationReadiness: {
      overallStatus: "Incomplete Records",
      scorePercent: 64,
      lastSynthesizedAt: "2026-09-27T07:45:00Z",
      summaryText: "24w1d G3P2 with documented moderate anemia (Hb 8.2 g/dL) and poor oral iron tolerance. Conflicting blood group records: Taayi card records B+ve, while an older 2022 requisition records B-ve. Formal 20-22w TIFFA report missing.",
      unreviewedDiscrepanciesCount: 1,
      missingMandatoryRecordsCount: 2,
      pendingActionsCount: 3,
      digitizedDocumentsCount: 4
    },
    visits: [
      {
        id: "VIS-027-1",
        visitNumber: 1,
        date: "2026-06-18",
        gestationalAgeWeeks: 9,
        gestationalAgeDays: 5,
        facility: "Tippasandra Sub-Center",
        clinician: "ANM Shailaja",
        vitals: {
          systolicBP: 104,
          diastolicBP: 64,
          weightKg: 49.2,
          fundalHeightCm: null,
          fetalHeartRateBpm: null,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Easy fatigability", "Breathlessness on climbing stairs"],
        notes: "Card issued. Pallor ++ noted on conjunctival exam. Started Tab Folic acid. Advised CBC at CHC.",
        sourceDocumentId: "DOC-027-01"
      },
      {
        id: "VIS-027-2",
        visitNumber: 2,
        date: "2026-08-14",
        gestationalAgeWeeks: 18,
        gestationalAgeDays: 0,
        facility: "Magadi CHC",
        clinician: "Dr. Girish Babu, MBBS",
        vitals: {
          systolicBP: 108,
          diastolicBP: 66,
          weightKg: 50.8,
          fundalHeightCm: 18,
          fetalHeartRateBpm: 146,
          pedalEdema: "Absent",
          urineAlbumin: "Nil",
          urineSugar: "Nil"
        },
        documentedComplaints: ["Nausea and severe epigastric burning whenever taking red IFA tablets"],
        notes: "Uterus corresponds to 18 weeks. FHR regular. CBC reviewed: Hb 8.2 g/dL, MCV 68 fL. Patient discontinued oral IFA due to gastritis and vomiting. Advised referral to District Hospital for parenteral iron sucrose consideration. Ultrasound scan referral given.",
        sourceDocumentId: "DOC-027-02"
      }
    ],
    longitudinalMetrics: {
      hemoglobin: [
        { date: "2026-06-18", gaWeeks: 10, value: 8.9, unit: "g/dL", sourceDoc: "DOC-027-01" },
        { date: "2026-08-14", gaWeeks: 18, value: 8.2, unit: "g/dL", sourceDoc: "DOC-027-03" }
      ],
      bloodPressure: [
        { date: "2026-06-18", gaWeeks: 10, systolic: 104, diastolic: 64 },
        { date: "2026-08-14", gaWeeks: 18, systolic: 108, diastolic: 66 },
        { date: "2026-09-25", gaWeeks: 24, systolic: 106, diastolic: 68 }
      ],
      weight: [
        { date: "2026-04-10", gaWeeks: 0, weightKg: 49.0, note: "Pre-pregnancy" },
        { date: "2026-06-18", gaWeeks: 10, weightKg: 49.2, note: "ANC 1" },
        { date: "2026-08-14", gaWeeks: 18, weightKg: 50.8, note: "ANC 2" },
        { date: "2026-09-25", gaWeeks: 24, weightKg: 52.1, note: "ANC 3" }
      ],
      glucose: [
        { date: "2026-08-14", gaWeeks: 18, type: "Random Blood Sugar", value: 94, unit: "mg/dL", normalRef: "< 140" }
      ],
      ultrasounds: [
        {
          date: "2026-06-20",
          gaWeeks: 10,
          scanType: "Dating Scan",
          crlMm: 34.0,
          bpdMm: null,
          flMm: null,
          acMm: null,
          efwGrams: null,
          afiCm: null,
          presentation: "N/A",
          placenta: "Posterior",
          eddScan: "2027-01-18",
          impression: "Single live intrauterine pregnancy measuring 10w1d."
        }
      ]
    },
    activeMedications: [
      {
        id: "MED-027-1",
        name: "Tab Iron & Folic Acid",
        dose: "100mg elemental Iron",
        frequency: "Once daily (DISCONTINUED BY PATIENT DUE TO GASTRITIS)",
        startedAt: "2026-06-18",
        status: "Discontinued",
        adherenceNote: "Patient discontinued due to severe epigastric cramps and vomiting."
      },
      {
        id: "MED-027-2",
        name: "Tab Calcium Carbonate",
        dose: "500 mg",
        frequency: "Twice daily",
        startedAt: "2026-08-14",
        status: "Active",
        adherenceNote: "Tolerated well."
      }
    ],
    discrepancies: [
      {
        id: "DISC-027-1",
        field: "Maternal Blood Group & Rh Typing",
        status: "Pending Clinician Review",
        severity: "High",
        neutralAdvisory: "Information discrepancy detected — clinician verification required.",
        description: "Taayi card records maternal blood group as 'B Positive', but an archived 2022 referral slip from Magadi CHC recorded 'B Negative'. Critical clinical importance for Rh isoimmunization surveillance.",
        sources: [
          {
            title: "Karnataka Taayi Card Entry",
            date: "2026-06-18",
            reportedValue: "B Positive (Rh +ve)",
            docType: "Taayi Card Stamp",
            docId: "DOC-027-01"
          },
          {
            title: "Archived 2022 Delivery Requisition Slip",
            date: "2022-11-04",
            reportedValue: "B Negative (Rh -ve)",
            docType: "Hospital Record",
            docId: "DOC-027-04"
          }
        ],
        clinicianActionPrompt: "Mandatory urgent central tube agglutination blood grouping and Rh factor typing with Indirect Coombs Test (ICT)."
      }
    ],
    missingInformation: [
      {
        id: "MISS-027-1",
        title: "20-22 Week TIFFA / Anomaly Ultrasound Scan Report",
        category: "Ultrasound Biometry",
        criticality: "High",
        recommendedWindow: "18w 0d to 22w 0d (Overdue at 24w)",
        clinicalContext: "Patient was referred to District Hospital for TIFFA scan on 14-Aug-2026, but formal report or radiologist findings have not been received or entered.",
        suggestedAction: "ASHA to track whether patient completed ultrasound at Ramanagara DH or assist in rescheduling."
      },
      {
        id: "MISS-027-2",
        title: "24-Week 75g Oral Glucose Tolerance Test (OGTT)",
        category: "Biochemistry",
        criticality: "Medium",
        recommendedWindow: "24w 0d to 28w 0d",
        clinicalContext: "Guideline mandatory screening for gestational diabetes mellitus.",
        suggestedAction: "Schedule OGTT at upcoming CHC visit."
      }
    ],
    pendingDocumentedActions: [
      {
        id: "ACT-027-1",
        task: "Immediate repeat blood grouping & Rh typing by central tube test",
        dueDate: "2026-09-28",
        responsible: "Laboratory / Doctor",
        status: "Pending"
      },
      {
        id: "ACT-027-2",
        task: "Evaluate for IV Iron Sucrose infusion protocol given oral intolerance & Hb 8.2",
        dueDate: "2026-09-28",
        responsible: "Medical Officer",
        status: "Pending"
      },
      {
        id: "ACT-027-3",
        task: "Trace status of 20w Anomaly scan from District Hospital records",
        dueDate: "2026-09-30",
        responsible: "ASHA Worker",
        status: "Pending"
      }
    ],
    changesSinceLastVisit: [
      "Advanced to 24w1d gestation.",
      "Hb documented at 8.2 g/dL (drop from 8.9 g/dL).",
      "Oral IFA formally stopped due to intolerance; patient awaiting IV iron evaluation.",
      "Blood group discrepancy flagged during automated multi-record synthesis."
    ]
  }
];
