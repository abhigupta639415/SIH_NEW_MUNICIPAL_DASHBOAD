import React from 'react';
import { useIssues } from '../../hooks/useIssues';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const { issues, stats, loading } = useIssues();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-government-primary"></div>
      </div>
    );
  }

  const monthlyData = [
    { month: 'Aug', reported: 45, resolved: 42 },
    { month: 'Sep', reported: 52, resolved: 48 },
    { month: 'Oct', reported: 38, resolved: 41 },
    { month: 'Nov', reported: 47, resolved: 45 },
    { month: 'Dec', reported: 41, resolved: 39 },
    { month: 'Jan', reported: 24, resolved: 18 }
  ];

  const typeData = [
    { type: 'Water Supply', count: 89, color: 'bg-blue-500' },
    { type: 'Electricity', count: 56, color: 'bg-yellow-500' },
    { type: 'Roads & Infrastructure', count: 43, color: 'bg-green-500' },
    { type: 'Sanitation', count: 32, color: 'bg-purple-500' }
  ];

  const maxReported = Math.max(...monthlyData.map(d => d.reported));
  const maxResolved = Math.max(...monthlyData.map(d => d.resolved));
  const maxValue = Math.max(maxReported, maxResolved);
  const maxTypeCount = Math.max(...typeData.map(d => d.count));

  return (
    <div className="space-y-6 font-official">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-government-primary mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights and performance metrics
          </p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-government-primary text-white rounded-lg hover:bg-government-dark transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-government-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Trends
            </h3>
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">{data.month} 2025</span>
                  <div className="flex space-x-4">
                    <span className="text-government-primary">
                      Reported: {data.reported}
                    </span>
                    <span className="text-green-600">
                      Resolved: {data.resolved}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-government-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.reported / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.resolved / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <PieChart className="w-6 h-6 text-government-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Issues by Type
            </h3>
          </div>
          
          <div className="space-y-4">
            {typeData.map((data, index) => (
              <div key={data.type} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className={`w-4 h-4 rounded-full ${data.color} mr-3`}></div>
                  <span className="text-sm text-gray-700 font-medium">
                    {data.type}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${data.color}`}
                      style={{ width: `${(data.count / maxTypeCount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {data.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-government-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Metrics
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm font-medium text-green-900">
                  Resolution Rate
                </p>
                <p className="text-xs text-green-600">
                  This month vs last month
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-900">
                  {stats ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </p>
                <p className="text-xs text-green-600">
                  +5% ↗
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Average Response Time
                </p>
                <p className="text-xs text-blue-600">
                  First response to citizen
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">
                  2.3h
                </p>
                <p className="text-xs text-blue-600">
                  -0.5h ↘
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="text-sm font-medium text-purple-900">
                  Citizen Satisfaction
                </p>
                <p className="text-xs text-purple-600">
                  Based on feedback surveys
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-900">
                  4.2/5
                </p>
                <p className="text-xs text-purple-600">
                  +0.3 ↗
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-government-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Department Performance
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { dept: 'Water Department', resolved: 42, total: 48, color: 'bg-blue-500' },
              { dept: 'Electricity Department', resolved: 38, total: 45, color: 'bg-yellow-500' },
              { dept: 'PWD Department', resolved: 35, total: 41, color: 'bg-green-500' },
              { dept: 'Sanitation Department', resolved: 28, total: 32, color: 'bg-purple-500' }
            ].map((dept) => {
              const percentage = Math.round((dept.resolved / dept.total) * 100);
              return (
                <div key={dept.dept} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 font-medium">
                      {dept.dept}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {percentage}% ({dept.resolved}/{dept.total})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${dept.color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;