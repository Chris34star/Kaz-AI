import { Job, ResponseEmail, Opportunity, UserProfile, CareerRole } from '../types';

// Core 20 Curated Kenyan Jobs followed by 480 systematically generated applications (Total: 500)
// Status breakdown: 170 Replied, 110 Viewed, 220 Not Replied (330 pending/unreplied)
const BASE_TOP_JOBS: Job[] = [
  {
    id: 'job-1',
    company: 'Aga Khan Hospital',
    role: 'Registered Staff Nurse - ICU / Ward',
    category: 'Nurse',
    location: 'Parklands, Nairobi',
    postedDate: 'Today, 08:30 AM',
    status: 'Replied',
    salaryRange: 'KES 75,000 - 95,000 / mo',
    source: 'BrighterMonday Kenya',
    emailSubject: 'Application for Registered Staff Nurse - [Your Name]',
    emailBodySnippet: 'Dear HR Aga Khan University Hospital, I am writing to express my strong interest in the ICU Nurse position with 4 years clinical experience...'
  },
  {
    id: 'job-2',
    company: 'Naivas',
    role: 'Logistics Fleet Driver (Class BCE)',
    category: 'Driver',
    location: 'Sameer Industrial Park, Nairobi',
    postedDate: 'Today, 09:15 AM',
    status: 'Replied',
    salaryRange: 'KES 45,000 - 58,000 / mo',
    source: 'Naivas Careers Portal',
    emailSubject: 'Application: Fleet Driver - Class BCE Valid License',
    emailBodySnippet: 'Dear Naivas Recruitment Team, I am submitting my credentials for the logistics driver role. Clean driving record with 6 years interstate Kenyan transit experience...'
  },
  {
    id: 'job-3',
    company: 'Equity Bank',
    role: 'Branch Operations Accountant',
    category: 'Accountant',
    location: 'Upper Hill, Nairobi',
    postedDate: 'Today, 10:00 AM',
    status: 'Replied',
    salaryRange: 'KES 80,000 - 110,000 / mo',
    source: 'LinkedIn Kenya',
    emailSubject: 'Application: Operations Accountant (CPA-K Finalist)',
    emailBodySnippet: 'Dear Talent Acquisition at Equity Bank, Please find my application for the Branch Accountant position. Equipped with strong ERP skills and CPA Section 6...'
  },
  {
    id: 'job-4',
    company: 'KNH (Kenyatta National Hospital)',
    role: 'Clinical Officer II (Outpatient Services)',
    category: 'Clinical Officer',
    location: 'Hospital Road, Nairobi',
    postedDate: 'Yesterday, 02:40 PM',
    status: 'Replied',
    salaryRange: 'KES 68,000 - 85,000 / mo',
    source: 'Public Service Board & KNH Portal',
    emailSubject: 'Application: Registered Clinical Officer II - COC Registered',
    emailBodySnippet: 'Dear Medical Superintendent, Respectfully applying for the Clinical Officer position. Valid COC board license with emergency triage experience...'
  },
  {
    id: 'job-5',
    company: 'Brookside',
    role: 'Regional FMCG Sales Executive',
    category: 'Sales Exec',
    location: 'Ruiru / Central Region',
    postedDate: 'Yesterday, 04:10 PM',
    status: 'Replied',
    salaryRange: 'KES 55,000 + Comm / mo',
    source: 'Direct HR Cold outreach',
    emailSubject: 'Application: FMCG Route Sales Executive - Central Kenya',
    emailBodySnippet: 'Dear Brookside Dairy Hiring Team, I bring 3 years track record in FMCG retail distribution and supermarket route expansion...'
  },
  {
    id: 'job-6',
    company: 'Java House',
    role: 'Assistant Restaurant Branch Cook',
    category: 'Waiter/Cook',
    location: 'Westlands, Nairobi',
    postedDate: 'Yesterday, 11:00 AM',
    status: 'Viewed',
    salaryRange: 'KES 38,000 - 48,000 / mo',
    source: 'Java Careers Desk',
    emailSubject: 'Application: Line Cook & Food Production Specialist',
    emailBodySnippet: 'Dear Java House Nairobi Team, eager to contribute my culinary skills and Kenya Utalii College training to your Westlands team...'
  },
  {
    id: 'job-7',
    company: 'Safaricom',
    role: 'Customer Experience Executive',
    category: 'Customer Care',
    location: 'HQ Waiyaki Way, Nairobi',
    postedDate: '2 days ago',
    status: 'Viewed',
    salaryRange: 'KES 65,000 - 80,000 / mo',
    source: 'Safaricom Careers',
    emailSubject: 'Application: Customer Experience Executive - Fluency in English & Swahili',
    emailBodySnippet: 'Dear Safaricom Talent Team, thrilled to submit my application for the customer care role with CRM mastery and client satisfaction leadership...'
  },
  {
    id: 'job-8',
    company: 'G4S',
    role: 'Corporate Security Supervisor',
    category: 'Security',
    location: 'Mombasa Road, Nairobi',
    postedDate: '2 days ago',
    status: 'Viewed',
    salaryRange: 'KES 42,000 - 52,000 / mo',
    source: 'Fuzu Kenya',
    emailSubject: 'Application: Security Supervisor - CCTV & Access Control Certified',
    emailBodySnippet: 'Dear G4S Human Resources, bringing 5 years disciplined security coordination and crisis management protocol...'
  },
  {
    id: 'job-9',
    company: 'Bidco',
    role: 'Quality Assurance Lab Technician',
    category: 'Lab Tech',
    location: 'Thika Industrial Hub',
    postedDate: '2 days ago',
    status: 'Sent',
    salaryRange: 'KES 50,000 - 65,000 / mo',
    source: 'Bidco Africa Careers',
    emailSubject: 'Application: QA Laboratory Technician - Edible Oils & Soaps',
    emailBodySnippet: 'Dear Bidco Africa Management, presenting my degree in Industrial Chemistry and 3 years laboratory titration and testing expertise...'
  },
  {
    id: 'job-10',
    company: 'MP Shah Hospital',
    role: 'Hospital Dispensing Pharmacist',
    category: 'Pharmacist',
    location: 'Shivachi Road, Parklands',
    postedDate: '3 days ago',
    status: 'Replied',
    salaryRange: 'KES 85,000 - 115,000 / mo',
    source: 'Hospital Board Notice',
    emailSubject: 'Application: Pharmacy Officer - PPB Enrolled',
    emailBodySnippet: 'Dear Chief Pharmacist MP Shah, applying with valid PPB license and 4 years institutional hospital dispensing experience...'
  },
  {
    id: 'job-11',
    company: 'Brookside',
    role: 'Secondary School Teacher - Mathematics & Physics',
    category: 'Teacher',
    location: 'Kiambu County',
    postedDate: '3 days ago',
    status: 'Replied',
    salaryRange: 'KES 50,000 - 70,000 / mo',
    source: 'TSC / Private Schools Portal',
    emailSubject: 'Application: High School Math & Physics Teacher - TSC Number 894321',
    emailBodySnippet: 'Dear Principal, Submitting my TSC registered application for the STEM faculty vacancy. Proven mean score track record in KCSE...'
  },
  {
    id: 'job-12',
    company: 'Quickmart',
    role: 'Inventory & Store Receiving Clerk',
    category: 'Accountant',
    location: 'Kilimani, Nairobi',
    postedDate: '4 days ago',
    status: 'Viewed',
    salaryRange: 'KES 40,000 - 50,000 / mo',
    source: 'Quickmart HR Desk',
    emailSubject: 'Application: Inventory Controller & Dispatch Officer',
    emailBodySnippet: 'Dear Quickmart Hiring Manager, skilled in stock reconciliation, ERP systems, and warehouse FIFO management...'
  },
  {
    id: 'job-13',
    company: 'Bamburi Cement',
    role: 'Heavy Commercial Truck Driver',
    category: 'Driver',
    location: 'Athi River Depot',
    postedDate: '4 days ago',
    status: 'Replied',
    salaryRange: 'KES 52,000 - 68,000 / mo',
    source: 'LafargeHolcim Careers',
    emailSubject: 'Application: Articulated Heavy Trailer Driver - NTSA Certified',
    emailBodySnippet: 'Dear Transport Manager, 8 years commercial trailer experience across Mombasa-Nairobi-Malaba corridor with accident-free record...'
  },
  {
    id: 'job-14',
    company: 'Britam',
    role: 'Financial Advisor & Micro-Insurance Officer',
    category: 'Sales Exec',
    location: 'Upper Hill, Nairobi',
    postedDate: '5 days ago',
    status: 'Sent',
    salaryRange: 'KES 45,000 + High Bonus',
    source: 'Britam Talent Network',
    emailSubject: 'Application: Financial Sales Associate - IRA Certified',
    emailBodySnippet: 'Dear Britam Recruitment, applying for the Financial Advisor role to drive retail life and health coverage products in Nairobi...'
  },
  {
    id: 'job-15',
    company: 'KNH (Kenyatta National Hospital)',
    role: 'Pediatric Care Ward Nurse',
    category: 'Nurse',
    location: 'Nairobi',
    postedDate: '5 days ago',
    status: 'Replied',
    salaryRange: 'KES 72,000 - 90,000 / mo',
    source: 'Ministry of Health Kenya',
    emailSubject: 'Application: Pediatric Nursing Officer - NCK Registration',
    emailBodySnippet: 'Dear Medical Board, offering 3 years specialized neonatal and pediatric nursing care at level 5 facilities...'
  },
  {
    id: 'job-16',
    company: 'Serena Hotels',
    role: 'Front Office Reception & Guest Host',
    category: 'Customer Care',
    location: 'Nairobi Serena Hotel',
    postedDate: '6 days ago',
    status: 'Viewed',
    salaryRange: 'KES 48,000 - 62,000 / mo',
    source: 'Hospitality Kenya Portal',
    emailSubject: 'Application: Front Office Guest Relations Specialist',
    emailBodySnippet: 'Dear Serena Hospitality Team, bringing warmth, professional etiquette, and opera PMS proficiency...'
  },
  {
    id: 'job-17',
    company: 'Davis & Shirtliff',
    role: 'Water Solutions Technical Sales Engineer',
    category: 'Sales Exec',
    location: 'Industrial Area, Nairobi',
    postedDate: '6 days ago',
    status: 'Not Replied',
    salaryRange: 'KES 65,000 - 85,000 / mo',
    source: 'D&S Careers',
    emailSubject: 'Application: Technical Sales - Solar Pumping & Water Systems',
    emailBodySnippet: 'Dear D&S Talent Acquisition, excited to present my mechanical background and solar borehole installation expertise...'
  },
  {
    id: 'job-18',
    company: 'Aga Khan Hospital',
    role: 'Medical Laboratory Technologist',
    category: 'Lab Tech',
    location: 'Mombasa Outreach Clinic',
    postedDate: '7 days ago',
    status: 'Not Replied',
    salaryRange: 'KES 60,000 - 78,000 / mo',
    source: 'BrighterMonday Kenya',
    emailSubject: 'Application: Clinical Laboratory Technologist - KMLTTB Registered',
    emailBodySnippet: 'Dear Mombasa Branch Director, KMLTTB licensed laboratory scientist ready to manage automated haematology and histology...'
  },
  {
    id: 'job-19',
    company: 'G4S',
    role: 'VIP Executive Driver & Escort',
    category: 'Driver',
    location: 'Gigiri / UN Diplomatic Blue Zone',
    postedDate: '1 week ago',
    status: 'Not Replied',
    salaryRange: 'KES 60,000 - 75,000 / mo',
    source: 'Direct Corporate Lead',
    emailSubject: 'Application: Executive Chauffeur - Defensive Driving Certified',
    emailBodySnippet: 'Dear Operations Manager, offering AA Kenya defensive driving qualification and clean VIP escort record for expatriates...'
  },
  {
    id: 'job-20',
    company: 'Bidco',
    role: 'Accounts Payable & Tax Accountant',
    category: 'Accountant',
    location: 'Thika / Nairobi Office',
    postedDate: '1 week ago',
    status: 'Not Replied',
    salaryRange: 'KES 70,000 - 88,000 / mo',
    source: 'Fuzu Kenya',
    emailSubject: 'Application: Accounts Payable Specialist - KRA iTax & SAP',
    emailBodySnippet: 'Dear Head of Finance, highly experienced in KRA VAT withholding, supplier ledger reconciliation, and statutory filing...'
  }
];

const KENYAN_EMPLOYERS = [
  'Aga Khan Hospital', 'Naivas', 'Equity Bank', 'KNH (Kenyatta National Hospital)',
  'Brookside', 'Java House', 'Safaricom', 'G4S', 'Bidco', 'MP Shah Hospital',
  'Bamburi Cement', 'Quickmart', 'Britam', 'Serena Hotels', 'Davis & Shirtliff',
  'KCB Bank', 'Co-operative Bank', 'NCBA Bank', 'Absa Kenya', 'Stanbic Bank',
  'Nairobi Hospital', "Gertrude's Children's Hospital", 'Mater Hospital',
  'Avenue Healthcare', 'Coptic Hospital', 'Twiga Foods', 'Copia Global',
  'EABL (East African Breweries)', 'BAT Kenya', 'TotalEnergies Kenya',
  'Vivo Energy Kenya', 'KenGen', 'Kenya Power', 'Sarova Hotels & Resorts',
  'Carrefour Kenya', 'Chandarana Foodplus', 'Artcaffe', 'Big Square',
  'Wells Fargo Kenya', 'KK Security', 'Jubilee Insurance', 'CIC Insurance Group',
  'ICEA Lion', 'Sanlam Kenya', 'Brookhouse School', 'Braeburn Schools',
  'Makini School', 'Riara Group of Schools', 'Oshwal Academy', 'Strathmore University'
];

const KENYAN_ROLES_POOL: Record<CareerRole, string[]> = {
  Nurse: [
    'Registered Staff Nurse - ICU / Ward',
    'Pediatric Care Ward Nurse',
    'Theatre & Scrub Registered Nurse',
    'A&E Triage Emergency Nurse',
    'Maternity & Labour Ward Nurse',
    'Occupational Health & Wellness Nurse',
    'Renal Dialysis Unit Nurse'
  ],
  Teacher: [
    'High School Mathematics & Physics Teacher (TSC)',
    'Secondary Biology & Chemistry Teacher',
    'Primary CBC Lead Educator (TSC Registered)',
    'English Literature & Kiswahili Faculty',
    'Computer Studies & ICT Instructor',
    'Special Needs Education Specialist',
    'High School Geography & History Teacher'
  ],
  Driver: [
    'Logistics Fleet Driver (Class BCE)',
    'Executive Corporate Chauffeur',
    'Heavy Commercial Interstate Trailer Driver',
    'Light Delivery Van Driver (Class C1)',
    'Ambulance Paramedic Driver',
    'School Bus Logistics Driver',
    'NTSA Certified Passenger Van Driver'
  ],
  Accountant: [
    'Branch Operations Accountant',
    'Accounts Payable & Tax Accountant',
    'Inventory & Store Receiving Clerk',
    'Financial Reporting & General Ledger Officer',
    'Internal Audit & Compliance Associate',
    'Payroll & Statutory Deductions Controller',
    'Credit Control & Reconciliation Officer'
  ],
  'Clinical Officer': [
    'Clinical Officer II (Outpatient Services)',
    'Emergency & Critical Care Clinical Officer',
    'MCH & Reproductive Health Clinical Officer',
    'Orthopaedic & Trauma Clinical Officer',
    'General Medical Consultation Officer',
    'Community Health & Field Clinical Officer'
  ],
  'Sales Exec': [
    'Regional FMCG Sales Executive',
    'Financial Advisor & Micro-Insurance Officer',
    'Water Solutions Technical Sales Engineer',
    'Key Accounts B2B Relationship Manager',
    'Direct Retail Territory Executive',
    'Pharmaceutical Medical Representative'
  ],
  'Lab Tech': [
    'Quality Assurance Lab Technician',
    'Medical Laboratory Technologist (KMLTTB)',
    'Clinical Pathology & Hematology Analyst',
    'Microbiology Testing Technologist',
    'Industrial Quality Control Assistant'
  ],
  Pharmacist: [
    'Hospital Dispensing Pharmacist',
    'Retail Branch Pharmacy Superintendent',
    'Clinical Pharmacist - Inpatient Care',
    'Pharmaceutical Regulatory & QC Specialist',
    'Wholesale Drug Distribution Officer'
  ],
  'Customer Care': [
    'Customer Experience Executive',
    'Front Office Reception & Guest Host',
    'Bilingual Inbound Support Specialist',
    'Client Escalations & CRM Support Officer',
    'Corporate Call Center Agent'
  ],
  'Waiter/Cook': [
    'Assistant Restaurant Branch Cook',
    'Pastry Chef & Bakery Production Specialist',
    'Head Waiter & Banquet Food Server',
    'Barista & Specialty Beverage Maker',
    'Line Cook - Continental & Swahili Cuisine'
  ],
  Security: [
    'Corporate Security Supervisor',
    'VIP Executive Escort & Driver',
    'CCTV Control Room Surveillance Operator',
    'Premises Access Control & Patrol Lead',
    'Loss Prevention & Asset Protection Officer'
  ],
  Other: [
    'Digital Marketing & Social Media Manager',
    'Warehouse & Inventory Logistics Officer',
    'Procurement & Supply Chain Assistant',
    'Administrative Assistant & Office Lead'
  ]
};

const LOCATIONS_POOL = [
  'Parklands, Nairobi', 'Upper Hill, Nairobi', 'Westlands, Nairobi',
  'Sameer Industrial Park, Nairobi', 'Hospital Road, Nairobi', 'Ruiru, Kiambu',
  'Mombasa Road, Nairobi', 'Thika Industrial Hub', 'Kilimani, Nairobi',
  'Athi River Depot, Machakos', 'Nyali, Mombasa', 'Changamwe, Mombasa',
  'Milimani, Kisumu', 'Nakuru CBD', 'Eldoret, Uasin Gishu', 'Gigiri UN Zone, Nairobi',
  'Industrial Area, Nairobi', 'CBD, Nairobi', 'Karen, Nairobi', 'Remote Kenya'
];

const SOURCES_POOL = [
  'BrighterMonday Kenya', 'Fuzu Kenya', 'LinkedIn Kenya',
  'Direct HR Cold outreach', 'MyJobMag Kenya', 'Company Careers Portal',
  'Public Service Board Notice', 'Executive Recruiter Network'
];

// Helper to generate exactly 500 jobs
// Distribution: 170 Replied, 110 Viewed, 220 Not Replied = 500 total applied jobs!
const generateFull500DemoJobs = (): Job[] => {
  const result: Job[] = [...BASE_TOP_JOBS];
  const allCategories: CareerRole[] = [
    'Nurse', 'Teacher', 'Driver', 'Accountant', 'Clinical Officer',
    'Sales Exec', 'Lab Tech', 'Pharmacist', 'Customer Care', 'Waiter/Cook', 'Security', 'Other'
  ];

  // We have 20 base jobs:
  // In BASE_TOP_JOBS: 8 Replied, 5 Viewed, 2 Sent, 5 Not Replied.
  // We need total 500: exactly 170 Replied, 110 Viewed, 220 Not Replied.
  // Needed:
  // Replied needed: 170 - 8 = 162
  // Viewed needed: 110 - 5 = 105
  // Not Replied needed: 220 - (5 + 2) = 213
  // 162 + 105 + 213 = 480 jobs!

  const statusesNeeded: ('Replied' | 'Viewed' | 'Not Replied')[] = [];
  for (let i = 0; i < 162; i++) statusesNeeded.push('Replied');
  for (let i = 0; i < 105; i++) statusesNeeded.push('Viewed');
  for (let i = 0; i < 213; i++) statusesNeeded.push('Not Replied');

  // Deterministic shuffle
  statusesNeeded.sort((a, b) => {
    return ((a.charCodeAt(0) * 17) % 7) - ((b.charCodeAt(0) * 17) % 7);
  });

  for (let i = 0; i < 480; i++) {
    const jobIndex = 21 + i;
    const category = allCategories[i % allCategories.length];
    const roleOptions = KENYAN_ROLES_POOL[category];
    const role = roleOptions[i % roleOptions.length];
    const company = KENYAN_EMPLOYERS[(i + 3) % KENYAN_EMPLOYERS.length];
    const location = LOCATIONS_POOL[(i + 5) % LOCATIONS_POOL.length];
    const source = SOURCES_POOL[(i + 2) % SOURCES_POOL.length];
    const status = statusesNeeded[i];

    const daysAgo = Math.floor(i / 35) + 1;
    const postedDate = daysAgo === 1 
      ? `Today, ${8 + (i % 8)}:${(i * 7) % 60 < 10 ? '0' : ''}${(i * 7) % 60} ${i % 2 === 0 ? 'AM' : 'PM'}`
      : daysAgo === 2 
        ? `Yesterday, ${2 + (i % 6)}:30 PM`
        : `${daysAgo} days ago`;

    const minSalary = 35 + ((i * 13) % 45);
    const maxSalary = minSalary + 15 + ((i * 7) % 25);
    const salaryRange = `KES ${minSalary},000 - ${maxSalary},000 / mo`;

    result.push({
      id: `job-${jobIndex}`,
      company,
      role,
      category,
      location,
      postedDate,
      status,
      salaryRange,
      source,
      emailSubject: `Application for ${role} - [Your Name]`,
      emailBodySnippet: `Dear Hiring Team at ${company}, I am submitting my credentials for the ${role} position. Valid credentials with proven Kenyan track record...`
    });
  }

  return result;
};

export const DEMO_JOBS: Job[] = generateFull500DemoJobs();

export const DEMO_RESPONSES: ResponseEmail[] = [
  {
    id: 'resp-1',
    company: 'Aga Khan Hospital',
    role: 'Registered Staff Nurse - ICU / Ward',
    fromName: 'Dr. Jane Muthoni (HR Healthcare Recruitment)',
    fromEmail: 'careers.nairobi@aku.edu',
    subject: 'RE: Application for Registered Staff Nurse - Please send certified CV and NCK Pin',
    timeAgo: '18 minutes ago',
    category: 'send_cv',
    badgeLabel: 'Send CV & Documents',
    summary: 'Please submit your detailed CV and copy of Nursing Council of Kenya (NCK) practicing license by Friday.',
    actionText: 'Reply with CV & NCK Pin',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: 'Today, 08:30 AM',
        body: 'Dear HR Aga Khan University Hospital, I am writing to express my strong interest in the Registered Staff Nurse vacancy. I hold 4 years of clinical experience in high-dependency units...'
      },
      {
        sender: 'company',
        senderName: 'Dr. Jane Muthoni (Aga Khan Hospital HR)',
        timestamp: 'Today, 11:04 AM',
        body: 'Dear Candidate,\n\nThank you for reaching out with your application. The Nursing Review Committee has reviewed your profile and would like to invite you to the preliminary shortlist.\n\nPlease reply directly to this email with:\n1. Your updated Curriculum Vitae (PDF format)\n2. Valid Nursing Council of Kenya (NCK) practicing license\n3. Copy of National ID\n\nKindly send these before Friday 4:00 PM.\n\nWarm regards,\nDr. Jane Muthoni\nTalent Acquisition, Aga Khan Hospital Nairobi'
      }
    ]
  },
  {
    id: 'resp-2',
    company: 'Naivas',
    role: 'Logistics Fleet Driver (Class BCE)',
    fromName: 'Peter Kamau (Fleet Operations Manager)',
    fromEmail: 'recruitment@naivas.co.ke',
    subject: 'INVITATION: Practical Driving Assessment & Oral Interview at Sameer Park',
    timeAgo: '1 hour ago',
    category: 'interview',
    badgeLabel: 'Called for Interview',
    summary: 'Confirmed interview & driving road test tomorrow at 09:30 AM at Sameer Industrial Park, Mombasa Road.',
    actionText: 'Confirm Interview Attendance',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: 'Today, 09:15 AM',
        body: 'Dear Naivas Recruitment Team, I am submitting my credentials for the logistics driver role. Clean driving record with 6 years interstate Kenyan transit experience...'
      },
      {
        sender: 'company',
        senderName: 'Peter Kamau (Naivas Fleet Logistics)',
        timestamp: 'Today, 10:18 AM',
        body: 'Hello,\n\nWe have reviewed your application for the Logistics Fleet Driver position. We are pleased to invite you for a physical road test and interview tomorrow:\n\nDate: Tomorrow (Thursday)\nTime: 9:30 AM EAT\nLocation: Naivas Central Distribution Hub, Sameer Industrial Park, Mombasa Road (Gate 3)\nBring: Original Driving License (Class BCE) and National ID Card.\n\nPlease confirm your availability via WhatsApp or reply to this email.\n\nBest regards,\nPeter Kamau\nFleet Logistics Operations, Naivas'
      }
    ]
  },
  {
    id: 'resp-3',
    company: 'Equity Bank',
    role: 'Branch Operations Accountant',
    fromName: 'Talent Acquisition Team (Equity Group)',
    fromEmail: 'careers@equitybank.co.ke',
    subject: 'Equity Bank Careers: Invitation for Competency Interview & Verification',
    timeAgo: '3 hours ago',
    category: 'interview',
    badgeLabel: 'Called for Interview',
    summary: 'Panel interview scheduled for Friday at Equity Centre, Upper Hill (9th Floor, Room 904).',
    actionText: 'View Interview Details',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: 'Today, 10:00 AM',
        body: 'Dear Talent Acquisition at Equity Bank, Please find my application for the Branch Accountant position. Equipped with CPA-K finalist status...'
      },
      {
        sender: 'company',
        senderName: 'Equity Group Talent Acquisition',
        timestamp: 'Today, 10:45 AM',
        body: 'Dear Applicant,\n\nCongratulations! Following the preliminary screening of your accounting background, you have been shortlisted for an interview for the Branch Operations Accountant position.\n\nDate: Friday\nTime: 2:00 PM EAT\nVenue: Equity Centre, 9th Floor, Hospital Road, Upper Hill, Nairobi.\n\nPlease bring hard copies of your CPA certificates and academic transcripts.\n\nKind regards,\nEquity Group Talent Team'
      }
    ]
  },
  {
    id: 'resp-4',
    company: 'MP Shah Hospital',
    role: 'Hospital Dispensing Pharmacist',
    fromName: 'Grace Otieno (Senior Human Resource Officer)',
    fromEmail: 'hr@mpshahhosp.org',
    subject: 'RE: Dispensing Pharmacist Application - Document Submission Request',
    timeAgo: 'Yesterday',
    category: 'send_cv',
    badgeLabel: 'Send CV & Documents',
    summary: 'Please attach your updated CV along with your PPB certificate and testimonials.',
    actionText: 'Submit Required Documents',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: '3 days ago',
        body: 'Dear Chief Pharmacist MP Shah, applying with valid PPB license and 4 years institutional hospital dispensing experience...'
      },
      {
        sender: 'company',
        senderName: 'Grace Otieno (MP Shah Hospital HR)',
        timestamp: 'Yesterday, 03:20 PM',
        body: 'Dear Candidate,\n\nYour application has reached our medical hiring committee. We require you to send your comprehensive CV with 3 professional referees and your Pharmacy and Poisons Board (PPB) annual certificate.\n\nReply directly to this email.\n\nThank you,\nGrace Otieno'
      }
    ]
  },
  {
    id: 'resp-5',
    company: 'KNH (Kenyatta National Hospital)',
    role: 'Clinical Officer II (Outpatient Services)',
    fromName: 'Human Resources Directorate (KNH)',
    fromEmail: 'recruitment@knh.or.ke',
    subject: 'KNH Shortlist Notification: Clinical Officer II',
    timeAgo: 'Yesterday',
    category: 'shortlist',
    badgeLabel: 'Shortlisted for Next Round',
    summary: 'Your profile has passed technical evaluation and is forwarded to the Departmental Selection Board.',
    actionText: 'View Shortlist Status',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: 'Yesterday, 02:40 PM',
        body: 'Dear Medical Superintendent, Respectfully applying for the Clinical Officer position. Valid COC board license with emergency triage experience...'
      },
      {
        sender: 'company',
        senderName: 'KNH Recruitment Unit',
        timestamp: 'Yesterday, 05:12 PM',
        body: 'Dear Applicant,\n\nWe acknowledge receipt of your application for Clinical Officer II. You have satisfied the preliminary criteria and have been shortlisted. The formal interview timetable will be gazetted and sent via SMS and email within 5 business days.\n\nKNH Recruitment Secretariat'
      }
    ]
  },
  {
    id: 'resp-6',
    company: 'Brookside',
    role: 'Regional FMCG Sales Executive',
    fromName: 'Sammy Njoroge (Commercial Territory Lead)',
    fromEmail: 'snjoroge@brookside.co.ke',
    subject: 'Quick Phone Screening - Brookside Dairy Sales Role',
    timeAgo: '2 days ago',
    category: 'interview',
    badgeLabel: 'Called for Interview',
    summary: 'Territory manager requested a 15-minute WhatsApp / phone screening call on sales track record.',
    actionText: 'Accept Call Slot',
    fullThread: [
      {
        sender: 'user',
        senderName: 'You (via Gmail)',
        timestamp: 'Yesterday, 04:10 PM',
        body: 'Dear Brookside Dairy Hiring Team, I bring 3 years track record in FMCG retail distribution and supermarket route expansion...'
      },
      {
        sender: 'company',
        senderName: 'Sammy Njoroge (Brookside)',
        timestamp: '2 days ago, 09:30 AM',
        body: 'Hi,\n\nSaw your application sent to our sales portal. Your FMCG route experience looks sharp. Are you available for a 15-minute phone screening tomorrow at 11:30 AM? Let me know your WhatsApp number.\n\nCheers,\nSammy'
      }
    ]
  }
];

export const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    company: 'Naivas Supermarket',
    role: 'Logistics Fleet Driver (Class BCE)',
    type: 'Interview',
    meetingType: 'In-person',
    scheduledDate: 'Tomorrow (Thursday)',
    scheduledTime: '09:30 AM EAT',
    location: 'Naivas Distribution Hub, Sameer Park, Mombasa Road, Nairobi',
    salary: 'KES 45,000 - 58,000 / mo + Benefits',
    contactPerson: 'Peter Kamau (Fleet Manager)',
    status: 'Action Needed',
    keyNotes: 'Bring original BCE driving license, National ID, and certificate of good conduct. Practical road test scheduled.'
  },
  {
    id: 'opp-2',
    company: 'Equity Bank',
    role: 'Branch Operations Accountant',
    type: 'Interview',
    meetingType: 'In-person',
    scheduledDate: 'This Friday',
    scheduledTime: '02:00 PM EAT',
    location: 'Equity Centre, 9th Floor, Hospital Road, Upper Hill, Nairobi',
    salary: 'KES 80,000 - 110,000 / mo',
    contactPerson: 'Talent Acquisition Board',
    status: 'Confirmed',
    keyNotes: 'Panel interview. Bring 3 bound copies of CV, CPA Section 6 certificate, and university degree transcript.'
  },
  {
    id: 'opp-3',
    company: 'Aga Khan Hospital',
    role: 'Registered Staff Nurse - ICU / Ward',
    type: 'Send CV',
    meetingType: 'In-person',
    scheduledDate: 'Deadline: Friday 4:00 PM',
    scheduledTime: 'Before 16:00 EAT',
    location: 'Aga Khan University Hospital, 3rd Parklands Ave, Nairobi',
    salary: 'KES 75,000 - 95,000 / mo + Medical Cover',
    contactPerson: 'Dr. Jane Muthoni (HR Healthcare)',
    status: 'Action Needed',
    keyNotes: 'Direct request for full PDF CV and valid NCK practicing license pin. Kaz AI has drafted a customized response ready for 1-click send.'
  },
  {
    id: 'opp-4',
    company: 'Brookside Dairy',
    role: 'Regional FMCG Sales Executive',
    type: 'Interview',
    meetingType: 'Phone / WhatsApp Screen',
    scheduledDate: 'Tomorrow',
    scheduledTime: '11:30 AM EAT',
    location: 'WhatsApp Voice Call (+254 7XX XXX XXX)',
    salary: 'KES 55,000 + Lucrative Sales Commissions',
    contactPerson: 'Sammy Njoroge (Territory Lead)',
    status: 'Confirmed',
    keyNotes: '15-minute quick interview focusing on key accounts, van sales, and FMCG store targets in Central Kenya.'
  },
  {
    id: 'opp-5',
    company: 'MP Shah Hospital',
    role: 'Hospital Dispensing Pharmacist',
    type: 'Send CV',
    meetingType: 'In-person',
    scheduledDate: 'Open (Urgent)',
    scheduledTime: 'Immediate',
    location: 'Shivachi Road, Parklands, Nairobi',
    salary: 'KES 85,000 - 115,000 / mo',
    contactPerson: 'Grace Otieno (Senior HR)',
    status: 'Action Needed',
    keyNotes: 'Submit CV and PPB annual registration certificate to finalize interview invitation.'
  }
];

export const KENYAN_CAREER_OPTIONS: { id: string; label: string; icon: string; count: string }[] = [
  { id: 'Nurse', label: 'Nurse', icon: 'stethoscope', count: '142 active jobs' },
  { id: 'Teacher', label: 'Teacher', icon: 'graduation-cap', count: '188 active jobs' },
  { id: 'Driver', label: 'Driver', icon: 'truck', count: '114 active jobs' },
  { id: 'Accountant', label: 'Accountant', icon: 'calculator', count: '210 active jobs' },
  { id: 'Clinical Officer', label: 'Clinical Officer', icon: 'activity', count: '95 active jobs' },
  { id: 'Sales Exec', label: 'Sales Exec', icon: 'trending-up', count: '320 active jobs' },
  { id: 'Lab Tech', label: 'Lab Tech', icon: 'flask-conical', count: '64 active jobs' },
  { id: 'Pharmacist', label: 'Pharmacist', icon: 'pill', count: '78 active jobs' },
  { id: 'Customer Care', label: 'Customer Care', icon: 'headphones', count: '155 active jobs' },
  { id: 'Waiter/Cook', label: 'Waiter/Cook', icon: 'utensils', count: '130 active jobs' },
  { id: 'Security', label: 'Security', icon: 'shield-check', count: '89 active jobs' }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  googleEmail: 'chrisandusodhiambo80@gmail.com',
  whatsappNumber: '+254 712 345 678',
  careers: ['Nurse'],
  fullName: 'Chrisandus Odhiambo',
  experienceYears: 4,
  skills: ['ICU Care', 'Patient Triage', 'NCK Licensed', 'Emergency Care'],
  location: 'Nairobi',
  kmpdbNumber: 'NCK/2021/8942',
  applyMode: 'manual',
  autoApplyActive: true,
  gmailConnected: true,
  trialActive: true,
  applicationsToday: 3,
  maxDailyApplications: 5
};
