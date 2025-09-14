import React, { useState, useMemo } from 'react';
import { useIssues } from '../../hooks/useIssues';
import { useAuth } from '../../contexts/AuthContext';
import { Issue } from '../../types';
import {
  Search,
  Filter,
  Eye,
  UserPlus,
  MessageSquare,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
  Download,
  Users
} from 'lucide-react';
import AssignmentModal from './AssignmentModal';
import IssueDetailsModal from './IssueDetailsModal';

const IssuesTable: React.FC = () => {
  const { issues, loading, updateIssueStatus } = useIssues();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [wardFilter, setWardFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearch = 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
      const matchesType = typeFilter === 'all' || issue.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
      const matchesWard = wardFilter === 'all' || issue.location.ward === wardFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesWard;
    });
  }, [issues, searchTerm, statusFilter, typeFilter, priorityFilter, wardFilter]);

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'new':
        return <AlertTriangle className="w-4 h-4 text-status-new" />;
      case 'assigned':
        return <UserPlus className="w-4 h-4 text-status-assigned" />;
      case 'in_progress':
        return <RefreshCw className="w-4 h-4 text-status-progress" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-status-resolved" />;
      case 'unresolved':
        return <XCircle className="w-4 h-4 text-status-unresolved" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Issue['status']) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'new':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'assigned':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'in_progress':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'resolved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'unresolved':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPriorityBadge = (priority: Issue['priority']) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (priority) {
      case 'emergency':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleBulkAssign = () => {
    if (selectedIssues.length > 0) {
      // Handle bulk assignment logic
      console.log('Bulk assign:', selectedIssues);
    }
  };

  const handleExport = () => {
    // Handle export logic
    console.log('Export issues');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-government-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-official">
      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </select>
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="water_supply">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="roads_infrastructure">Roads & Infrastructure</option>
              <option value="sanitation">Sanitation</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
            >
              <option value="all">All Wards</option>
              <option value="Ward 8">Ward 8</option>
              <option value="Ward 12">Ward 12</option>
              <option value="Ward 15">Ward 15</option>
              <option value="Ward 18">Ward 18</option>
              <option value="Ward 22">Ward 22</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedIssues.length} of {filteredIssues.length} selected
            </span>
            {selectedIssues.length > 0 && (
              <button
                onClick={handleBulkAssign}
                className="flex items-center space-x-2 px-4 py-2 bg-government-primary text-white rounded-lg hover:bg-government-dark transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Bulk Assign</span>
              </button>
            )}
          </div>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIssues(filteredIssues.map(issue => issue.id));
                      } else {
                        setSelectedIssues([]);
                      }
                    }}
                    className="rounded border-gray-300 text-government-primary focus:ring-government-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title & Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIssues.includes(issue.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIssues([...selectedIssues, issue.id]);
                        } else {
                          setSelectedIssues(selectedIssues.filter(id => id !== issue.id));
                        }
                      }}
                      className="rounded border-gray-300 text-government-primary focus:ring-government-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-government-primary">
                      {issue.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {issue.title}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {issue.type.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPriorityBadge(issue.priority)}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(issue.status)}
                      <span className={`ml-2 ${getStatusBadge(issue.status)}`}>
                        {issue.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <div>
                        <div className="font-medium">{issue.location.address}</div>
                        <div className="text-gray-500">{issue.location.ward}, {issue.location.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {new Date(issue.reportedDate).toLocaleDateString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {issue.assignedDepartment || 'Unassigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedIssue(issue);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {(user?.role === 'municipal_admin' || user?.role?.includes('dept') || user?.role === 'ward_supervisor') && (
                        <button
                          onClick={() => {
                            setSelectedIssue(issue);
                            setShowAssignModal(true);
                          }}
                          className="p-2 text-government-primary hover:bg-government-light rounded-lg"
                          title="Assign"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          setSelectedIssue(issue);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        title="Add Comment"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No issues found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAssignModal && selectedIssue && (
        <AssignmentModal
          issue={selectedIssue}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedIssue(null);
          }}
        />
      )}

      {showDetailsModal && selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
};

export default IssuesTable;