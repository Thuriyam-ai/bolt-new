import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Headphones, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';
import { DashboardType } from '../types';

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
    ],
    route: '/call-quality-analytics?type=support'
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
    ],
    route: '/call-quality-analytics?type=sales'
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
    ],
    route: '/call-quality-analytics?type=customer-success'
  }
];

export function Dashboards() {
  const navigate = useNavigate();

  const handleDashboardSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboards</h1>
              <p className="text-lg text-gray-600 mt-1">Choose your analysis focus area</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Dashboard Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {dashboardTypes.map((dashboard) => {
            const IconComponent = dashboard.icon;
            const colorClasses = {
              blue: {
                selected: 'border-blue-500 bg-blue-50',
                icon: 'text-blue-600',
                badge: 'bg-blue-100 text-blue-700',
                hover: 'hover:border-blue-300',
                gradient: 'from-blue-500 to-blue-600'
              },
              green: {
                selected: 'border-green-500 bg-green-50',
                icon: 'text-green-600',
                badge: 'bg-green-100 text-green-700',
                hover: 'hover:border-green-300',
                gradient: 'from-green-500 to-green-600'
              },
              purple: {
                selected: 'border-purple-500 bg-purple-50',
                icon: 'text-purple-600',
                badge: 'bg-purple-100 text-purple-700',
                hover: 'hover:border-purple-300',
                gradient: 'from-purple-500 to-purple-600'
              }
            };
            
            const colors = colorClasses[dashboard.color as keyof typeof colorClasses];
            
            return (
              <div
                key={dashboard.type}
                onClick={() => handleDashboardSelect(dashboard.route)}
                className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 group hover:shadow-xl ${
                  `border-gray-200 ${colors.hover}`
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">{dashboard.title}</h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{dashboard.description}</p>
                    </div>
                  </div>
                  <ArrowRight 
                    size={20} 
                    className={`transition-transform group-hover:translate-x-2 ${colors.icon}`} 
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Metrics</h4>
                    <div className="flex flex-wrap gap-2">
                      {dashboard.metrics.map((metric, index) => (
                        <span key={index} className={`px-3 py-1 text-sm font-medium rounded-full ${colors.badge}`}>
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Analysis Goals</h4>
                    <div className="space-y-2">
                      {dashboard.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                          <CheckCircle2 size={14} className={colors.icon} />
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {dashboard.goals.length} analysis goals
                  </span>
                  <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${colors.gradient} text-white text-sm font-medium shadow-md group-hover:shadow-lg transition-shadow`}>
                    View Analytics
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Information Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Target size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Function CQA Platform</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our unified analytics platform provides specialized insights for each business function. 
                Switch between Support, Sales, and Customer Success analytics to get role-specific metrics, 
                goals, and coaching recommendations tailored to your team's needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Support Teams</h4>
                  <p className="text-sm text-gray-600">Focus on resolution quality, customer satisfaction, and empathy scoring</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Sales Teams</h4>
                  <p className="text-sm text-gray-600">Track conversion rates, pipeline health, and objection handling</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Success</h4>
                  <p className="text-sm text-gray-600">Monitor health scores, expansion opportunities, and churn risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
