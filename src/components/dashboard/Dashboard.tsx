import React from 'react';
import { useIssues } from '../../hooks/useIssues';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from './StatsCard';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { stats, loading } = useIssues();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-government-primary"></div>
      </div>
    );
  }

  if (!stats) return null;

  const statsCards = [
    {
      title: 'Total Issues',
      value: stats.total,
      icon: FileText,
      color: 'bg-government-primary',
      change: { value: stats.percentageChange.total, isUp: stats.percentageChange.total > 0 }
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      color: 'bg-status-resolved',
      change: { value: stats.percentageChange.resolved, isUp: stats.percentageChange.resolved > 0 }
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-status-assigned',
      change: { value: stats.percentageChange.pending, isUp: stats.percentageChange.pending > 0 }
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: TrendingUp,
      color: 'bg-status-progress',
      change: { value: stats.percentageChange.inProgress, isUp: stats.percentageChange.inProgress > 0 }
    },
    {
      title: 'Unresolved',
      value: stats.unresolved,
      icon: XCircle,
      color: 'bg-status-unresolved',
      change: { value: stats.percentageChange.unresolved, isUp: stats.percentageChange.unresolved > 0 }
    },
    {
      title: 'Emergency',
      value: stats.emergency,
      icon: AlertTriangle,
      color: 'bg-red-600',
      change: { value: stats.percentageChange.emergency, isUp: stats.percentageChange.emergency > 0 }

    }
  ];

  const getQuickActions = () => {
    if (user?.role === 'municipal_admin') {
      return [
        { label: 'Assign to Water Department', count: 8, color: 'bg-blue-600' },
        { label: 'Assign to Electricity Department', count: 5, color: 'bg-yellow-600' },
        { label: 'Assign to PWD Department', count: 12, color: 'bg-green-600' },
        { label: 'Assign to Sanitation Department', count: 6, color: 'bg-purple-600' }
      ];
    } else if (user?.role === 'ward_supervisor') {
      return [
        { label: 'Assign to Field Worker', count: stats.pending, color: 'bg-indigo-600' },
        { label: 'Assign to Contractor', count: 4, color: 'bg-gray-600' },
        { label: 'Mark In Progress', count: 3, color: 'bg-status-progress' },
        { label: 'Mark Resolved', count: 2, color: 'bg-status-resolved' }
      ];
    } else {
      return [
        { label: 'Assign to Ward Supervisor', count: stats.pending, color: 'bg-indigo-600' },
        { label: 'Mark In Progress', count: 3, color: 'bg-status-progress' },
        { label: 'Mark Resolved', count: 2, color: 'bg-status-resolved' },
        { label: 'Mark Unresolved', count: 1, color: 'bg-status-unresolved' }
      ];
    }
  };

  return (
    <div className="space-y-6 font-official">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
          />
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {getQuickActions().map((action, index) => (
              <button
                key={index}
                className={`w-full ${action.color} hover:opacity-90 text-white py-3 px-4 rounded-lg transition-opacity text-left flex items-center justify-between`}
              >
                <span className="font-medium">{action.label}</span>
                <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                  {action.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Water supply issue resolved
                </p>
                <p className="text-xs text-gray-600">
                  ISS-2025-005 • Gandhi Nagar • 2 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New issue assigned to department
                </p>
                <p className="text-xs text-gray-600">
                  ISS-2025-003 • Main Street • 4 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Emergency issue reported
                </p>
                <p className="text-xs text-gray-600">
                  ISS-2025-001 • MG Road • 6 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Sanitation issue in progress
                </p>
                <p className="text-xs text-gray-600">
                  ISS-2025-004 • Rose Garden Society • 8 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {user?.role === 'municipal_admin' ? 'Department Performance Overview' : 'Performance Summary'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">87%</div>
            <div className="text-sm text-green-700">Resolution Rate</div>
            <div className="text-xs text-green-600 mt-1">+5% from last month</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <div className="text-sm text-blue-700">Avg Response Time</div>
            <div className="text-xs text-blue-600 mt-1">-0.5h improvement</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">4.2/5</div>
            <div className="text-sm text-yellow-700">Citizen Satisfaction</div>
            <div className="text-xs text-yellow-600 mt-1">+0.3 improvement</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-purple-700">SLA Compliance</div>
            <div className="text-xs text-purple-600 mt-1">+2% improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;