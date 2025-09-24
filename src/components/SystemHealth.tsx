import React from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: string;
  percentage: number;
  status: 'good' | 'warning' | 'error';
  description: string;
}

const healthMetrics: HealthMetric[] = [
  {
    label: 'API Response Time',
    value: 'Average: 120ms',
    percentage: 85,
    status: 'good',
    description: 'Good'
  },
  {
    label: 'System Uptime',
    value: 'Last 24 hours',
    percentage: 99.8,
    status: 'good',
    description: '99.8%'
  },
  {
    label: 'Error Rate',
    value: 'Within acceptable range',
    percentage: 0.2,
    status: 'good',
    description: '0.2%'
  }
];

export function SystemHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-emerald-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'warning': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'error': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center">
          <Activity size={18} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
      </div>
      
      <div className="space-y-6">
        {healthMetrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              <div className="flex items-center space-x-2">
                {getStatusIcon(metric.status)}
                <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                  {metric.description}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(metric.status)}`}
                style={{ 
                  width: metric.label === 'Error Rate' ? '8%' : `${Math.min(metric.percentage, 100)}%` 
                }}
              />
            </div>
            <span className="text-xs text-gray-500">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}