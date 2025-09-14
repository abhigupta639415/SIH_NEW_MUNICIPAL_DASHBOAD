import React from 'react';
import { useIssues } from '../../hooks/useIssues';
import { BarChart3, TrendingUp, PieChart, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  const { analytics, loading } = useIssues();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) return null;

  const maxReported = Math.max(...analytics.monthlyData.map(d => d.reported));
  const maxResolved = Math.max(...analytics.monthlyData.map(d => d.resolved));
  const maxValue = Math.max(maxReported, maxResolved);

  const maxCategoryCount = Math.max(...analytics.categoryData.map(d => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics & Reporting
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Insights and trends from issue management data
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Trends
            </h3>
          </div>
          
          <div className="space-y-4">
            {analytics.monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{data.month}</span>
                  <div className="flex space-x-4">
                    <span className="text-blue-600 dark:text-blue-400">
                      Reported: {data.reported}
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      Resolved: {data.resolved}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.reported / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
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

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <PieChart className="w-6 h-6 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Issues by Category
            </h3>
          </div>
          
          <div className="space-y-4">
            {analytics.categoryData.map((data, index) => {
              const colors = [
                'bg-blue-500',
                'bg-green-500',
                'bg-yellow-500',
                'bg-purple-500',
                'bg-red-500'
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={data.category} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-4 h-4 rounded-full ${color} mr-3`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {data.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${color}`}
                        style={{ width: `${(data.count / maxCategoryCount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {data.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolution Time by Role */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-indigo-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Avg Resolution Time by Role
            </h3>
          </div>
          
          <div className="space-y-4">
            {analytics.resolutionTimeByRole.map((data, index) => {
              const maxTime = Math.max(...analytics.resolutionTimeByRole.map(d => d.averageTime));
              const colors = [
                'bg-indigo-500',
                'bg-blue-500',
                'bg-green-500',
                'bg-yellow-500'
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={data.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {data.role}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {data.averageTime} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${color}`}
                      style={{ width: `${(data.averageTime / maxTime) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Insights
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-300">
                  Resolution Rate
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  This month vs last month
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                  87%
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +5% ↗
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Response Time
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Average first response
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  2.3h
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  -0.5h ↘
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
                  Citizen Satisfaction
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Based on feedback
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                  4.2/5
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  +0.3 ↗
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;