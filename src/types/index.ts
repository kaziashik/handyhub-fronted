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
  role: Role;
  imageUrl?: string;
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
  };
};

export type ScheduleStatus = "DRAFT" | "PUBLISHED";

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

export type ListQuery = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: string;
};
