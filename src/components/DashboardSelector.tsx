import React from 'react';
import { 
  Headphones, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Target
} from 'lucide-react';
import { DashboardType } from '../types';

interface DashboardSelectorProps {
  selectedType: DashboardType;
  onTypeChange: (type: DashboardType) => void;
}

const dashboardTypes = [
  {
    type: 'support' as DashboardType,
    title: 'Support Analytics',
    description: 'Customer support call quality, resolution metrics, and agent performance',
    icon: Headphones,
    color: 'blue',
    metrics: [
      'Resolution Rate',
      'First Call Resolution',
      'Customer Satisfaction',
      'Escalation Rate'
    ],
    goals: [
      'Issue Classification',
      'Resolution Quality',
      'Empathy Scoring',
      'Knowledge Gap Detection'
    ]
  },
  {
    type: 'sales' as DashboardType,
    title: 'Sales Analytics',
    description: 'Sales call performance, conversion metrics, and pipeline insights',
    icon: TrendingUp,
    color: 'green',
    metrics: [
      'Conversion Rate',
      'Deal Velocity',
      'Pipeline Health',
      'Objection Handling'
    ],
    goals: [
      'Lead Qualification',
      'Discovery Quality',
      'Closing Techniques',
      'Competitor Analysis'
    ]
  },
  {
    type: 'customer-success' as DashboardType,
    title: 'Customer Success Analytics',
    description: 'Customer health monitoring, expansion opportunities, and retention metrics',
    icon: Users,
    color: 'purple',
    metrics: [
      'Health Score',
      'Expansion Rate',
      'Churn Risk',
      'Feature Adoption'
    ],
    goals: [
      'Health Assessment',
      'Upsell Opportunities',
      'Renewal Risk Detection',
      'Feature Engagement'
    ]
  }
];

export function DashboardSelector({ selectedType, onTypeChange }: DashboardSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Dashboard Type Selection</h2>
        </div>
        <div className="text-sm text-gray-500">
          Choose your analysis focus
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dashboardTypes.map((dashboard) => {
          const IconComponent = dashboard.icon;
          const isSelected = selectedType === dashboard.type;
          const colorClasses = {
            blue: {
              selected: 'border-blue-500 bg-blue-50',
              icon: 'text-blue-600',
              badge: 'bg-blue-100 text-blue-700',
              hover: 'hover:border-blue-300'
            },
            green: {
              selected: 'border-green-500 bg-green-50',
              icon: 'text-green-600',
              badge: 'bg-green-100 text-green-700',
              hover: 'hover:border-green-300'
            },
            purple: {
              selected: 'border-purple-500 bg-purple-50',
              icon: 'text-purple-600',
              badge: 'bg-purple-100 text-purple-700',
              hover: 'hover:border-purple-300'
            }
          };
          
          const colors = colorClasses[dashboard.color as keyof typeof colorClasses];
          
          return (
            <div
              key={dashboard.type}
              onClick={() => onTypeChange(dashboard.type)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                isSelected
                  ? colors.selected
                  : `border-gray-200 ${colors.hover}`
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${
                    dashboard.color === 'blue' ? 'bg-blue-500' :
                    dashboard.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                  }`}>
                    <IconComponent size={24} className={colors.icon} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{dashboard.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dashboard.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className={`w-3 h-3 rounded-full ${
                    dashboard.color === 'blue' ? 'bg-blue-500' :
                    dashboard.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Metrics</h4>
                  <div className="flex flex-wrap gap-1">
                    {dashboard.metrics.map((metric, index) => (
                      <span key={index} className={`px-2 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis Goals</h4>
                  <div className="space-y-1">
                    {dashboard.goals.map((goal, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle2 size={12} className={colors.icon} />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {dashboard.goals.length} analysis goals
                </span>
                <ArrowRight 
                  size={16} 
                  className={`transition-transform group-hover:translate-x-1 ${
                    isSelected ? colors.icon : 'text-gray-400'
                  }`} 
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Multi-Function CQA Platform</h4>
            <p className="text-sm text-gray-600 mt-1">
              Switch between Support, Sales, and Customer Success analytics with specialized metrics, 
              goals, and insights tailored to each function's unique requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
