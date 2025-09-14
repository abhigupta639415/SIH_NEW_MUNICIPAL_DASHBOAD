import React, { useState } from 'react';
import { Issue } from '../../types';
import { useIssues } from '../../hooks/useIssues';
import { useAuth } from '../../contexts/AuthContext';
import { X, Building, User, MapPin } from 'lucide-react';

interface AssignmentModalProps {
  issue: Issue;
  onClose: () => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ issue, onClose }) => {
  const { updateIssueStatus } = useIssues();
  const { user } = useAuth();
  const [assignmentType, setAssignmentType] = useState<'department' | 'ward' | 'field_worker'>('department');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedFieldWorker, setSelectedFieldWorker] = useState('');
  const [notes, setNotes] = useState('');

  const departments = [
    { id: 'water', name: 'Water Department', suitable: issue.type === 'water_supply' },
    { id: 'electricity', name: 'Electricity Department', suitable: issue.type === 'electricity' },
    { id: 'pwd', name: 'PWD Department', suitable: issue.type === 'roads_infrastructure' },
    { id: 'sanitation', name: 'Sanitation Department', suitable: issue.type === 'sanitation' }
  ];

  const wards = [
    'Ward 8', 'Ward 12', 'Ward 15', 'Ward 18', 'Ward 22'
  ];

  const fieldWorkers = [
    { id: 'fw1', name: 'Rajesh Kumar', specialization: 'Water & Sanitation' },
    { id: 'fw2', name: 'Amit Singh', specialization: 'Electrical Work' },
    { id: 'fw3', name: 'Priya Sharma', specialization: 'Road Maintenance' },
    { id: 'fw4', name: 'Suresh Patel', specialization: 'General Maintenance' }
  ];

  const contractors = [
    { id: 'c1', name: 'ABC Construction Ltd.', contact: '+91 98765 43210' },
    { id: 'c2', name: 'XYZ Infrastructure', contact: '+91 98765 43211' },
    { id: 'c3', name: 'City Maintenance Co.', contact: '+91 98765 43212' }
  ];

  const handleAssign = () => {
    let assignedTo = '';
    let assignedDepartment = '';
    
    if (assignmentType === 'department' && selectedDepartment) {
      assignedDepartment = departments.find(d => d.id === selectedDepartment)?.name || '';
      updateIssueStatus(issue.id, 'assigned', assignedTo, assignedDepartment);
    } else if (assignmentType === 'ward' && selectedWard) {
      updateIssueStatus(issue.id, 'assigned', selectedWard);
    } else if (assignmentType === 'field_worker' && selectedFieldWorker) {
      assignedTo = fieldWorkers.find(fw => fw.id === selectedFieldWorker)?.name || '';
      updateIssueStatus(issue.id, 'assigned', assignedTo);
    }
    
    onClose();
  };

  const getAssignmentOptions = () => {
    if (user?.role === 'municipal_admin') {
      return ['department', 'ward'];
    } else if (user?.role?.includes('dept')) {
      return ['ward', 'field_worker'];
    } else if (user?.role === 'ward_supervisor') {
      return ['field_worker'];
    }
    return ['department'];
  };

  const availableOptions = getAssignmentOptions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-official">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-government-primary">
            Assign Issue: {issue.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Issue Details
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">{issue.title}</p>
              <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm text-gray-500">Type: {issue.type.replace('_', ' ')}</span>
                <span className="text-sm text-gray-500">Priority: {issue.priority}</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">{issue.location.address}, {issue.location.ward}</span>
              </div>
            </div>
          </div>

          {/* Assignment Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Assignment Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableOptions.includes('department') && (
                <button
                  onClick={() => setAssignmentType('department')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    assignmentType === 'department'
                      ? 'border-government-primary bg-government-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-6 h-6 text-government-primary mb-2" />
                  <div className="font-medium">Department</div>
                  <div className="text-sm text-gray-600">Assign to department</div>
                </button>
              )}
              
              {availableOptions.includes('ward') && (
                <button
                  onClick={() => setAssignmentType('ward')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    assignmentType === 'ward'
                      ? 'border-government-primary bg-government-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MapPin className="w-6 h-6 text-government-primary mb-2" />
                  <div className="font-medium">Ward Supervisor</div>
                  <div className="text-sm text-gray-600">Assign to ward</div>
                </button>
              )}
              
              {availableOptions.includes('field_worker') && (
                <button
                  onClick={() => setAssignmentType('field_worker')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    assignmentType === 'field_worker'
                      ? 'border-government-primary bg-government-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="w-6 h-6 text-government-primary mb-2" />
                  <div className="font-medium">Field Worker</div>
                  <div className="text-sm text-gray-600">Assign to field worker</div>
                </button>
              )}
            </div>
          </div>

          {/* Assignment Selection */}
          <div className="mb-6 overflow-y-auto flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Assignment
            </h3>
            
            {assignmentType === 'department' && (
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedDepartment === dept.id
                        ? 'border-government-primary bg-government-light'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${dept.suitable ? 'ring-2 ring-green-200' : ''}`}
                    onClick={() => setSelectedDepartment(dept.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{dept.name}</div>
                        {dept.suitable && (
                          <div className="text-sm text-green-600">✓ Recommended for this issue type</div>
                        )}
                      </div>
                      <Building className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {assignmentType === 'ward' && (
              <div className="space-y-3">
                {wards.map((ward) => (
                  <div
                    key={ward}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedWard === ward
                        ? 'border-government-primary bg-government-light'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${ward === issue.location.ward ? 'ring-2 ring-green-200' : ''}`}
                    onClick={() => setSelectedWard(ward)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{ward} Supervisor</div>
                        {ward === issue.location.ward && (
                          <div className="text-sm text-green-600">✓ Same ward as issue location</div>
                        )}
                      </div>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {assignmentType === 'field_worker' && (
              <div className="space-y-3">
                {fieldWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedFieldWorker === worker.id
                        ? 'border-government-primary bg-government-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFieldWorker(worker.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{worker.name}</div>
                        <div className="text-sm text-gray-600">{worker.specialization}</div>
                      </div>
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assignment Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
              placeholder="Add any specific instructions or notes for the assignee..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 bg-gray-50 rounded-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={
              (assignmentType === 'department' && !selectedDepartment) ||
              (assignmentType === 'ward' && !selectedWard) ||
              (assignmentType === 'field_worker' && !selectedFieldWorker)
            }
            className="px-6 py-2 bg-government-primary hover:bg-government-dark disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Assign Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;