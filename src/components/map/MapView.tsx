import React, { useState } from 'react';
import { useIssues } from '../../hooks/useIssues';
import { Issue } from '../../types';
import { MapPin, Filter, Eye } from 'lucide-react';
import IssueDetailsModal from '../issues/IssueDetailsModal';

const MapView: React.FC = () => {
  const { issues, loading } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const getMarkerColor = (status: Issue['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'assigned':
        return 'bg-yellow-500';
      case 'in_progress':
        return 'bg-indigo-500';
      case 'reassigned':
        return 'bg-orange-500';
      case 'resolved':
        return 'bg-green-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const filteredIssues = statusFilter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === statusFilter);

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Map View
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Geographic overview of reported issues
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="reassigned">Reassigned</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="h-96 bg-gray-100 dark:bg-gray-700 relative">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 dark:from-green-800 dark:via-blue-800 dark:to-purple-800"></div>
              </div>
              
              {/* Grid Lines for Map Effect */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`v-${i}`} className="absolute bg-gray-400 w-px h-full" style={{ left: `${i * 10}%` }}></div>
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`h-${i}`} className="absolute bg-gray-400 h-px w-full" style={{ top: `${i * 12.5}%` }}></div>
                ))}
              </div>

              {/* Issue Markers */}
              {filteredIssues.map((issue) => {
                // Simulate marker positions based on coordinates
                const left = ((issue.location.coordinates[1] - 77.2000) * 2000) % 80 + 10;
                const top = ((28.7000 - issue.location.coordinates[0]) * 2000) % 70 + 10;
                
                return (
                  <div
                    key={issue.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    onClick={() => handleMarkerClick(issue)}
                  >
                    <div className={`w-6 h-6 rounded-full ${getMarkerColor(issue.status)} shadow-lg ring-2 ring-white flex items-center justify-center hover:scale-110 transition-transform`}>
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {issue.title}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">+</span>
                </button>
                <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">−</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend and Issue List */}
        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h3>
            <div className="space-y-2">
              {[
                { status: 'new', label: 'New', color: 'bg-blue-500' },
                { status: 'assigned', label: 'Assigned', color: 'bg-yellow-500' },
                { status: 'in_progress', label: 'In Progress', color: 'bg-indigo-500' },
                { status: 'reassigned', label: 'Reassigned', color: 'bg-orange-500' },
                { status: 'resolved', label: 'Resolved', color: 'bg-green-500' },
                { status: 'closed', label: 'Closed', color: 'bg-gray-500' }
              ].map(({ status, label, color }) => (
                <div key={status} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Issues */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Issues in View ({filteredIssues.length})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredIssues.slice(0, 5).map((issue) => (
                <div key={issue.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                      {issue.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {issue.location.ward}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-2 rounded-full ${getMarkerColor(issue.status)} mr-2`}></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkerClick(issue)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {filteredIssues.length > 5 && (
                <div className="text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{filteredIssues.length - 5} more issues
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Issue Details Modal */}
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

export default MapView;