export interface User {
  id: string;
  name: string;
  email: string;
  role: 'municipal_admin' | 'water_dept' | 'electricity_dept' | 'pwd_dept' | 'sanitation_dept' | 'ward_supervisor';
  department?: string;
  ward?: string;
  phone?: string;
  avatar?: string;
  designation?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: 'water_supply' | 'electricity' | 'roads_infrastructure' | 'sanitation' | 'others';
  priority: 'emergency' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in_progress' | 'resolved' | 'unresolved';
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  assignedDepartment?: string;
  location: {
    address: string;
    ward: string;
    sector: string;
    coordinates?: [number, number];
  };
  photos: string[];
  timeline: TimelineEvent[];
  comments: Comment[];
  estimatedResolution?: string;
  actualResolution?: string;
  contractorAssigned?: string;
  fieldWorkerAssigned?: string;
}

export interface TimelineEvent {
  id: string;
  type: 'created' | 'assigned' | 'department_assigned' | 'ward_assigned' | 'in_progress' | 'resolved' | 'unresolved';
  timestamp: string;
  user: string;
  description: string;
  details?: any;
}

export interface Comment {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface DashboardStats {
  total: number;
  resolved: number;
  pending: number;
  inProgress: number;
  unresolved: number;
  emergency: number;
  percentageChange: {
    total: number;
    resolved: number;
    pending: number;
    inProgress: number;
  };
}