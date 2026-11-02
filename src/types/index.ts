export type CareerRole =
  | 'Nurse'
  | 'Teacher'
  | 'Driver'
  | 'Accountant'
  | 'Clinical Officer'
  | 'Sales Exec'
  | 'Lab Tech'
  | 'Pharmacist'
  | 'Customer Care'
  | 'Waiter/Cook'
  | 'Security'
  | 'Other';

export type JobStatus = 'Draft' | 'Sent' | 'Viewed' | 'Replied' | 'Not Replied';

export interface Job {
  id: string;
  company: string;
  role: string;
  category: CareerRole;
  location: string;
  postedDate: string;
  status: JobStatus;
  salaryRange: string;
  source: string;
  emailSubject: string;
  emailBodySnippet: string;
  isSending?: boolean;
}

export type ResponseCategory = 'all' | 'interview' | 'send_cv' | 'shortlist';

export interface ResponseEmail {
  id: string;
  company: string;
  role: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  timeAgo: string;
  category: 'interview' | 'send_cv' | 'shortlist';
  badgeLabel: string;
  summary: string;
  fullThread: {
    sender: 'user' | 'company';
    senderName: string;
    timestamp: string;
    body: string;
  }[];
  actionText: string;
}

export interface Opportunity {
  id: string;
  company: string;
  role: string;
  type: 'Interview' | 'Send CV';
  meetingType: 'In-person' | 'Phone / WhatsApp Screen' | 'Online Video';
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  salary: string;
  contactPerson: string;
  status: 'Action Needed' | 'Confirmed' | 'CV Sent';
  keyNotes: string;
}

export interface UserProfile {
  googleEmail: string;
  googleVerified?: boolean;
  whatsappNumber: string;
  validationNumber?: string;
  careers: CareerRole[];
  otherCareer?: string;
  fullName: string;
  experienceYears: number;
  skills: string[];
  location: string;
  driverLicense?: string;
  tscNumber?: string;
  kmpdbNumber?: string;
  applyMode: 'automatic' | 'manual';
  autoApplyActive: boolean;
  gmailConnected: boolean;
  trialActive: boolean;
  selectedPlan?: 'trial' | 'weekly' | 'monthly' | 'yearly';
  applicationsToday: number;
  maxDailyApplications: number;
}
