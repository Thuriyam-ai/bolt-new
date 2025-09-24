import React from 'react';
import { MetricCard } from './MetricCard';
import { ChartCard } from './ChartCard';
import { SystemHealth } from './SystemHealth';
import { RecentActivity } from './RecentActivity';
import { DashboardConfig } from '../types';

interface DashboardProps {
  config: DashboardConfig;
  userRole: string;
}

const roleColors = {
  team_manager: 'bg-blue-500',
  team_leader: 'bg-emerald-500',
  agent: 'bg-purple-500'
};

const roleLabels = {
  team_manager: 'Team Manager Dashboard',
  team_leader: 'Team Leader Dashboard',
  agent: 'Agent Dashboard'
};

export function Dashboard({ config, userRole }: DashboardProps) {
  const accentColor = roleColors[userRole as keyof typeof roleColors] || roleColors.team_manager;
  const dashboardTitle = roleLabels[userRole as keyof typeof roleLabels] || 'Dashboard Overview';

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{dashboardTitle}</h1>
        <p className="text-gray-600">Monitor your key metrics and system performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {config.metrics.map((metric, index) => (
          <MetricCard 
            key={index} 
            metric={metric} 
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          {config.charts.map((chart) => (
            <ChartCard
              key={chart.id}
              title={chart.title}
              type={chart.type}
              data={chart.data}
              accentColor={accentColor}
            />
          ))}
        </div>
        
        <div className="space-y-8">
          <RecentActivity />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}