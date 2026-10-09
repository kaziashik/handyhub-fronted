export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type AuthUser = {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  imageUrl?: string;
};

export type AdminAnalytics = {
  totalTechician: number;
  totalPendingTechicianApplications: number;
  totalApprovedTechician: number;
  totalRejectedTechician: number;
  totalCustomer: number;
  totalAppointments: number;
  totalCompletedAppointments: number;
  totalCancelledAppointments: number;
  totalRevenue: number;
  totalRefunded: number;
};

export type TechnicianAnalytics = {
  totalSchedules: number;
  publishedSchedules: number;
  totalAppointments: number;
  upcomingAppointments: number;
  ongoingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totaltechinicianEarnings: number;
  totaltechinicianRefunded: number;
};

export type CustomerAnalytics = {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalAmountSpent: number;
  totalRefunded: number;
};

export type TodaySchedule = {
  id: string;
  startDateTime: string;
  endDateTime: string;
  availableSlots: number;
  techinician: {
    id: string;
    name: string;
    consultationFee: string | number | null;
    specialization?: string;
    bio?: string | null;
    user?: { imageUrl: string };
  };
};

export type PublicTechnician = {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
  bio: string | null;
  consultationFee: string | number | null;
  address: string | null;
  user: { imageUrl: string };
};

export type PublicOverview = {
  approvedTechnicians: number;
  customers: number;
  appointments: number;
  publishedSchedules: number;
};

export type CustomerAccount = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
};

export type ScheduleStatus = "DRAFT" | "PUBLISHED";

export type AdminSchedule = {
  id: string;
  status: ScheduleStatus;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  meetingLink: string;
  isDeleted: boolean;
  techinician: {
    id: string;
    name: string;
    email: string;
    specialization: string;
  };
};

export type AdminScheduleDetail = AdminSchedule & {
  appointments: {
    id: string;
    status: AppointmentStatus;
    customer: {
      id: string;
      name: string;
      email: string;
    };
  }[];
};

export type TechnicianSchedule = {
  id: string;
  status: ScheduleStatus;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  meetingLink: string;
};

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "ONGOING"
  | "COMPLETED";

export type AdminAppointment = {
  id: string;
  status: AppointmentStatus;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  techinician: {
    id: string;
    name: string;
    specialization: string;
  };
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
  payment: {
    status: string;
    amount: string | number;
    currency: string;
  } | null;
};

export type TechnicianAppointment = {
  id: string;
  status: AppointmentStatus;
  serialNumber: number | null;
  customer: {
    id: string;
    name: string;
    email: string;
    contactNumber: string | null;
  };
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
  payment: {
    status: string;
    amount: string | number;
    currency: string;
  } | null;
};

export type CustomerAppointment = {
  id: string;
  status: AppointmentStatus;
  serialNumber: number | null;
  techinician: {
    id: string;
    name: string;
    specialization: string;
  };
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
  payment: {
    status: string;
    amount: string | number;
    currency: string;
  } | null;
};

export type AppointmentDetail = {
  id: string;
  status: AppointmentStatus;
  techinician: {
    id: string;
    name: string;
    specialization: string;
  };
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    meetingLink: string;
  };
  payment: {
    status: string;
    amount: string | number;
    currency: string;
    paidAt: string | null;
    refundAmount: string | number | null;
    refundReason: string | null;
    refundedAt: string | null;
  } | null;
};

export type TechnicianVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type TechnicianApplication = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  verificationStatus: TechnicianVerificationStatus;
  rejectionReason: string | null;
  user: {
    emailVerified: boolean;
  };
};

export type ListQuery = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: string;
};
