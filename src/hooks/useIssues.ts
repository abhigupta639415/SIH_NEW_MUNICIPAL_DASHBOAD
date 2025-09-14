import { useState, useEffect } from 'react';
import { Issue, DashboardStats } from '../types';
import { mockIssues, mockStats } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

export const useIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let filteredIssues = mockIssues;
      
      if (user?.role === 'water_dept') {
        filteredIssues = mockIssues.filter(issue => 
          issue.type === 'water_supply' && issue.assignedDepartment === 'Water Supply'
        );
      } else if (user?.role === 'electricity_dept') {
        filteredIssues = mockIssues.filter(issue => 
          issue.type === 'electricity' && issue.assignedDepartment === 'Electricity'
        );
      } else if (user?.role === 'pwd_dept') {
        filteredIssues = mockIssues.filter(issue => 
          issue.type === 'roads_infrastructure' && issue.assignedDepartment === 'Public Works'
        );
      } else if (user?.role === 'sanitation_dept') {
        filteredIssues = mockIssues.filter(issue => 
          issue.type === 'sanitation' && issue.assignedDepartment === 'Sanitation'
        );
      } else if (user?.role === 'ward_supervisor') {
        filteredIssues = mockIssues.filter(issue => 
          issue.location.ward === user.ward
        );
      }
      
      setIssues(filteredIssues);
      
      // Calculate department-specific stats
      const departmentStats = {
        total: filteredIssues.length,
        resolved: filteredIssues.filter(i => i.status === 'resolved').length,
        pending: filteredIssues.filter(i => i.status === 'new' || i.status === 'assigned').length,
        inProgress: filteredIssues.filter(i => i.status === 'in_progress').length,
        unresolved: filteredIssues.filter(i => i.status === 'unresolved').length,
        emergency: filteredIssues.filter(i => i.priority === 'emergency').length,
        percentageChange: mockStats.percentageChange
      };
      
      setStats(user?.role === 'municipal_admin' ? mockStats : departmentStats);
      setLoading(false);
    }, 500);
  }, [user]);

  const updateIssueStatus = (issueId: string, status: Issue['status'], assignedTo?: string, assignedDepartment?: string) => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status, 
              assignedTo: assignedTo || issue.assignedTo,
              assignedDepartment: assignedDepartment || issue.assignedDepartment,
              timeline: [...issue.timeline, {
                id: `tl-${Date.now()}`,
                type: status === 'assigned' ? 'department_assigned' : status,
                timestamp: new Date().toISOString(),
                user: user?.name || 'System',
                description: `Status updated to ${status.replace('_', ' ')}`
              }]
            }
          : issue
      )
    );
  };

  const addComment = (issueId: string, message: string) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId
          ? {
              ...issue,
              comments: [...issue.comments, {
                id: `c-${Date.now()}`,
                user: user?.name || 'User',
                message,
                timestamp: new Date().toISOString()
              }]
            }
          : issue
      )
    );
  };

  return {
    issues,
    stats,
    loading,
    updateIssueStatus,
    addComment
  };
};