import React from 'react';
import { BarChart3, LineChart, PieChart, Activity } from 'lucide-react';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any;
  accentColor: string;
}

const chartIcons = {
  line: LineChart,
  bar: BarChart3,
  pie: PieChart,
  area: Activity
};

export function ChartCard({ title, type, data, accentColor }: ChartCardProps) {
  const IconComponent = chartIcons[type];
  
  // Simple visualization for demonstration - in a real app, you'd use a charting library
  const renderChart = () => {
    if (type === 'bar' || type === 'line' || type === 'area') {
      const maxValue = Math.max(...data.datasets[0].data);
      return (
        <div className="flex items-end space-x-2 h-32">
          {data.datasets[0].data.map((value: number, index: number) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${accentColor} bg-opacity-60 rounded-t-sm transition-all duration-500 hover:bg-opacity-80`}
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-gray-500 mt-2">
                {data.labels[index]}
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'pie') {
      const total = data.datasets[0].data.reduce((sum: number, val: number) => sum + val, 0);
      return (
        <div className="space-y-3">
          {data.labels.map((label: string, index: number) => {
            const value = data.datasets[0].data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{percentage}%</span>
              </div>
            );
          })}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-lg ${accentColor} bg-opacity-10 flex items-center justify-center`}>
          <IconComponent size={18} className={`${accentColor.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {renderChart()}
    </div>
  );
}