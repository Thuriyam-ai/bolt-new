import React from 'react';
import { Rocket, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'success' | 'pending' | 'failed' | 'processing';
  timestamp: string;
  type: 'deployment' | 'analysis' | 'report' | 'system';
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'Quarterly Report Generated',
    subtitle: 'Executive Dashboard • Q4 2024',
    status: 'success',
    timestamp: '2 minutes ago',
    type: 'report'
  },
  {
    id: '2',
    title: 'Data Pipeline Update',
    subtitle: 'Analytics Engine • v2.1.4',
    status: 'pending',
    timestamp: '15 minutes ago',
    type: 'system'
  },
  {
    id: '3',
    title: 'Performance Analysis',
    subtitle: 'Team Metrics • Weekly Report',
    status: 'processing',
    timestamp: '32 minutes ago',
    type: 'analysis'
  },
  {
    id: '4',
    title: 'System Backup',
    subtitle: 'Database • Scheduled',
    status: 'failed',
    timestamp: '1 hour ago',
    type: 'system'
  }
];

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-500';
      case 'pending': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      case 'processing': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'failed': return <AlertCircle size={16} className="text-red-500" />;
      case 'processing': return <Zap size={16} className="text-blue-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'pending': return 'pending';
      case 'failed': return 'failed';
      case 'processing': return 'processing';
      default: return 'unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center">
          <Rocket size={18} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {activityData.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(item.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}