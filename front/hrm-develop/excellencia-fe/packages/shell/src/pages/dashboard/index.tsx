// pages/Dashboard/index.tsx
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching dashboard metrics
    setTimeout(() => {
      setMetrics([
        {
          id: '1',
          title: 'Total Revenue',
          value: '$124,563.00',
          change: 12.5,
          trend: 'up',
          icon: 'chart-pie'
        },
        {
          id: '2',
          title: 'Active Projects',
          value: '12',
          change: 5.3,
          trend: 'up',
          icon: 'briefcase'
        },
        {
          id: '3',
          title: 'Pending Tasks',
          value: '42',
          change: -8.4,
          trend: 'down',
          icon: 'clipboard-list'
        },
        {
          id: '4',
          title: 'Team Members',
          value: '28',
          change: 0,
          trend: 'neutral',
          icon: 'users'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Icon mapping function - replace with your preferred icon library
  const renderIcon = (iconName: string) => {
    // This is a placeholder - you would implement this based on your icon library
    // For example, if using heroicons:
    // return <UserIcon className="h-6 w-6" />
    return <div className="bg-blue-100 p-2 rounded-lg text-blue-600">{iconName.charAt(0).toUpperCase()}</div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="text-gray-500 text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'User'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div 
            key={metric.id} 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 my-1">{metric.value}</h3>
                <div className={`text-sm flex items-center ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {metric.trend === 'up' && (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                  {metric.trend === 'down' && (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {metric.trend === 'neutral' && (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  )}
                  <span>{metric.change > 0 && '+'}{metric.change}%</span>
                </div>
              </div>
              <div className="ml-4">
                {renderIcon(metric.icon)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Activity Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-600">No recent activities to show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;