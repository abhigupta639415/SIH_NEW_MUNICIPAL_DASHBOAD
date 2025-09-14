import React, { useState } from 'react';
import { Issue } from '../../types';
import { useIssues } from '../../hooks/useIssues';
import { useAuth } from '../../contexts/AuthContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  Camera,
  CheckCircle,
  AlertTriangle,
  FileText,
  Building
} from 'lucide-react';

interface IssueDetailsModalProps {
  issue: Issue;
  onClose: () => void;
}

const IssueDetailsModal: React.FC<IssueDetailsModalProps> = ({ issue, onClose }) => {
  const { addComment, updateIssueStatus } = useIssues();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState(issue.status);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addComment(issue.id, newComment);
    setNewComment('');
  };

  const handleStatusUpdate = () => {
    if (newStatus !== issue.status) {
      updateIssueStatus(issue.id, newStatus as Issue['status']);
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'department_assigned':
        return <Building className="w-4 h-4 text-yellow-500" />;
      case 'ward_assigned':
        return <User className="w-4 h-4 text-indigo-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-purple-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'unresolved':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const canUpdateStatus = () => {
    if (user?.role === 'municipal_admin') return true;
    if (user?.role?.includes('dept') && issue.assignedDepartment?.toLowerCase().includes(user.role.split('_')[0])) return true;
    if (user?.role === 'ward_supervisor' && issue.location.ward === user?.ward) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-official">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-government-primary">
            Issue Details: {issue.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Issue Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Issue Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">
                      {issue.title}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {issue.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Type</span>
                      <p className="font-medium text-gray-900 capitalize">{issue.type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Priority</span>
                      <p className="font-medium text-gray-900 capitalize">{issue.priority}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Status</span>
                      <p className="font-medium text-gray-900 capitalize">{issue.status.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Assigned Department</span>
                      <p className="font-medium text-gray-900">{issue.assignedDepartment || 'Unassigned'}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <div>
                      <div>{issue.location.address}</div>
                      <div className="text-xs">{issue.location.ward}, {issue.location.sector}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reported: {new Date(issue.reportedDate).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Photos */}
              {issue.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Photos ({issue.photos.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {issue.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Issue photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update */}
              {canUpdateStatus() && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Update Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary bg-white text-gray-900"
                      >
                        <option value="new">New</option>
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="unresolved">Unresolved</option>
                      </select>
                      <button
                        onClick={handleStatusUpdate}
                        disabled={newStatus === issue.status}
                        className="px-4 py-2 bg-government-primary hover:bg-government-dark disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Timeline and Comments */}
            <div className="space-y-6">
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Timeline
                </h3>
                <div className="space-y-4">
                  {issue.timeline.map((event) => (
                    <div key={event.id} className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {event.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{event.user}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(event.timestamp).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Comments ({issue.comments.length})
                </h3>
                
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {issue.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.message}</p>
                    </div>
                  ))}
                  
                  {issue.comments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No comments yet</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or update..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-government-primary hover:bg-government-dark disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsModal;