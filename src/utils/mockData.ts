import { User, Issue, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Municipal Commissioner',
    email: 'admin@municipal.gov.in',
    role: 'municipal_admin',
    phone: '+91 11 2345 6789',
    designation: 'Municipal Commissioner',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Water Department Head',
    email: 'water@municipal.gov.in',
    role: 'water_dept',
    department: 'Water Supply',
    phone: '+91 11 2345 6790',
    designation: 'Executive Engineer - Water',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Electricity Department Head',
    email: 'electricity@municipal.gov.in',
    role: 'electricity_dept',
    department: 'Electricity',
    phone: '+91 11 2345 6791',
    designation: 'Executive Engineer - Electrical',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'PWD Department Head',
    email: 'pwd@municipal.gov.in',
    role: 'pwd_dept',
    department: 'Public Works',
    phone: '+91 11 2345 6792',
    designation: 'Executive Engineer - PWD',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Sanitation Department Head',
    email: 'sanitation@municipal.gov.in',
    role: 'sanitation_dept',
    department: 'Sanitation',
    phone: '+91 11 2345 6793',
    designation: 'Executive Engineer - Sanitation',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '6',
    name: 'Ward Supervisor - 12',
    email: 'ward12@municipal.gov.in',
    role: 'ward_supervisor',
    ward: 'Ward 12',
    phone: '+91 11 2345 6794',
    designation: 'Ward Supervisor',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'ISS-2025-001',
    title: 'Water leakage on MG Road',
    description: 'Major water pipe burst causing flooding on MG Road near sector 14',
    type: 'water_supply',
    priority: 'emergency',
    status: 'in_progress',
    reportedBy: 'citizen@email.com',
    reportedDate: '2025-01-15T10:30:00Z',
    assignedTo: '2',
    assignedDepartment: 'Water Supply',
    location: {
      address: 'MG Road, Near Sector 14 Market',
      ward: 'Ward 12',
      sector: 'Sector 14',
      coordinates: [28.6139, 77.2090]
    },
    photos: [
       
      // 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    timeline: [
      {
        id: 'tl1',
        type: 'created',
        timestamp: '2025-01-15T10:30:00Z',
        user: 'Citizen',
        description: 'Issue reported via mobile app'
      },
      {
        id: 'tl2',
        type: 'department_assigned',
        timestamp: '2025-01-15T11:00:00Z',
        user: 'Municipal Commissioner',
        description: 'Assigned to Water Department'
      },
      {
        id: 'tl3',
        type: 'in_progress',
        timestamp: '2025-01-15T14:30:00Z',
        user: 'Water Department Head',
        description: 'Work started - Emergency repair team deployed'
      }
    ],
    comments: [
      {
        id: 'c1',
        user: 'Water Department Head',
        message: 'Emergency repair team dispatched. Water supply temporarily shut off for repairs.',
        timestamp: '2025-01-15T14:30:00Z'
      }
    ],
    estimatedResolution: '2025-01-16T18:00:00Z'
  },
  {
    id: 'ISS-2025-002',
    title: 'Street light not working - Park Avenue',
    description: 'Multiple street lights not functioning on Park Avenue affecting night visibility',
    type: 'electricity',
    priority: 'high',
    status: 'assigned',
    reportedBy: 'resident@email.com',
    reportedDate: '2025-01-14T19:45:00Z',
    assignedTo: '3',
    assignedDepartment: 'Electricity',
    location: {
      address: 'Park Avenue, Sector 15',
      ward: 'Ward 15',
      sector: 'Sector 15',
      coordinates: [28.6129, 77.2100]
    },
    photos: [
      'https://images.pexels.com/photos/247627/pexels-photo-247627.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    timeline: [
      {
        id: 'tl4',
        type: 'created',
        timestamp: '2025-01-14T19:45:00Z',
        user: 'Citizen',
        description: 'Street lighting issue reported'
      },
      {
        id: 'tl5',
        type: 'department_assigned',
        timestamp: '2025-01-15T09:00:00Z',
        user: 'Municipal Commissioner',
        description: 'Assigned to Electricity Department'
      }
    ],
    comments: [],
    estimatedResolution: '2025-01-17T17:00:00Z'
  },
  {
    id: 'ISS-2025-003',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and vehicle damage on Main Street',
    type: 'roads_infrastructure',
    priority: 'high',
    status: 'new',
    reportedBy: 'driver@email.com',
    reportedDate: '2025-01-16T08:15:00Z',
    location: {
      address: 'Main Street, Block A',
      ward: 'Ward 8',
      sector: 'Sector 12',
      coordinates: [28.6150, 77.2080]
    },
    photos: [
      'https://images.pexels.com/photos/6249504/pexels-photo-6249504.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    timeline: [
      {
        id: 'tl6',
        type: 'created',
        timestamp: '2025-01-16T08:15:00Z',
        user: 'Citizen',
        description: 'Road infrastructure issue reported'
      }
    ],
    comments: []
  },
  {
    id: 'ISS-2025-004',
    title: 'Garbage collection missed - Rose Garden Society',
    description: 'Scheduled garbage collection missed for 3 consecutive days in residential area',
    type: 'sanitation',
    priority: 'medium',
    status: 'assigned',
    reportedBy: 'society@email.com',
    reportedDate: '2025-01-15T07:00:00Z',
    assignedTo: '5',
    assignedDepartment: 'Sanitation',
    location: {
      address: 'Rose Garden Society, Sector 22',
      ward: 'Ward 22',
      sector: 'Sector 22',
      coordinates: [28.6160, 77.2070]
    },
    photos: [
      'https://images.pexels.com/photos/9324319/pexels-photo-9324319.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    timeline: [
      {
        id: 'tl7',
        type: 'created',
        timestamp: '2025-01-15T07:00:00Z',
        user: 'Citizen',
        description: 'Sanitation issue reported'
      },
      {
        id: 'tl8',
        type: 'department_assigned',
        timestamp: '2025-01-15T10:30:00Z',
        user: 'Municipal Commissioner',
        description: 'Assigned to Sanitation Department'
      }
    ],
    comments: [
      {
        id: 'c2',
        user: 'Sanitation Department Head',
        message: 'Investigating the missed collection schedule. Will coordinate with collection team.',
        timestamp: '2025-01-15T11:00:00Z'
      }
    ]
  },
  {
    id: 'ISS-2025-005',
    title: 'Water supply disruption - Gandhi Nagar',
    description: 'No water supply for 2 days in Gandhi Nagar residential area',
    type: 'water_supply',
    priority: 'high',
    status: 'resolved',
    reportedBy: 'resident2@email.com',
    reportedDate: '2025-01-12T06:00:00Z',
    assignedTo: '2',
    assignedDepartment: 'Water Supply',
    location: {
      address: 'Gandhi Nagar, Block C',
      ward: 'Ward 18',
      sector: 'Sector 18',
      coordinates: [28.6140, 77.2110]
    },
    photos: [],
    timeline: [
      {
        id: 'tl9',
        type: 'created',
        timestamp: '2025-01-12T06:00:00Z',
        user: 'Citizen',
        description: 'Water supply issue reported'
      },
      {
        id: 'tl10',
        type: 'resolved',
        timestamp: '2025-01-14T16:00:00Z',
        user: 'Water Department Head',
        description: 'Water supply restored after pipeline repair'
      }
    ],
    comments: [
      {
        id: 'c3',
        user: 'Water Department Head',
        message: 'Pipeline repair completed. Water supply restored to all affected areas.',
        timestamp: '2025-01-14T16:00:00Z'
      }
    ],
    actualResolution: '2025-01-14T16:00:00Z'
  }
];

export const mockStats: DashboardStats = {
  total: 156,
  resolved: 89,
  pending: 23,
  inProgress: 31,
  unresolved: 13,
  emergency: 5,
  percentageChange: {
    total: 12,
    resolved: 18,
    pending: -8,
    inProgress: 15
  }
};

export const sampleCredentials = {
  municipal_admin: { email: 'admin@municipal.gov.in', password: 'admin123' },
  water_dept: { email: 'water@municipal.gov.in', password: 'water123' },
  electricity_dept: { email: 'electricity@municipal.gov.in', password: 'electricity123' },
  pwd_dept: { email: 'pwd@municipal.gov.in', password: 'pwd123' },
  sanitation_dept: { email: 'sanitation@municipal.gov.in', password: 'sanitation123' },
  ward_supervisor: { email: 'ward12@municipal.gov.in', password: 'ward123' }
};