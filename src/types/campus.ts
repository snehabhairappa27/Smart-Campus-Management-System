export type NavSection =
  | 'overview'
  | 'apprentices'
  | 'attendance'
  | 'labs'
  | 'notices';

export type Track =
  | 'Full-Stack'
  | 'Cloud & DevOps'
  | 'Data Engineering'
  | 'QA Automation';

export type ApprenticeStatus = 'Active' | 'On Leave' | 'Graduated';

export type AttendanceStatus = 'Present' | 'Late' | 'Absent';

export type LabStatus = 'Available' | 'Occupied' | 'Maintenance';

export type NoticeCategory =
  | 'Academic'
  | 'Workshop'
  | 'Facilities'
  | 'IT & Access';

export interface Apprentice {
  id: string;
  name: string;
  email: string;
  track: Track;
  cohort: string;
  mentor: string;
  workstation: string;
  status: ApprenticeStatus;
  attendanceRate: number;
  sprintScore: string;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  apprenticeId: string;
  status: AttendanceStatus;
  checkInTime?: string;
}

export interface CampusLab {
  id: string;
  name: string;
  wing: string;
  capacity: number;
  equipment: string;
  status: LabStatus;
}

export interface LabBooking {
  id: string;
  labId: string;
  date: string;
  timeSlot: string;
  reservedBy: string;
  purpose: string;
}

export interface CampusNotice {
  id: string;
  title: string;
  category: NoticeCategory;
  author: string;
  publishedAt: string;
  body: string;
  pinned?: boolean;
}
