import { useState } from 'react';
import { 
  Users, 
  Clock, 
  Star, 
  MessageSquare,
  Search,
  X,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Maximize2,
  Minimize2,
  Settings,
  TrendingUp
} from 'lucide-react';

// 1. Define the Agent type
type Agent = {
  id: number;
  name: string;
  score: number;
  calls: number;
  satisfaction: number;
  talkRatio: number;
  interruptions: number;
  monologues: number;
};

// 2. Declare the agents array above component
const agents: Agent[] = [
  { id: 1, name: 'Priya Sharma', score: 94.5, calls: 52, satisfaction: 4.8, talkRatio: 58, interruptions: 1, monologues: 2.3 },
  { id: 2, name: 'Arjun Patel', score: 92.1, calls: 48, satisfaction: 4.7, talkRatio: 62, interruptions: 2, monologues: 3.1 },
  { id: 3, name: 'Kavya Reddy', score: 89.8, calls: 45, satisfaction: 4.6, talkRatio: 55, interruptions: 0, monologues: 1.8 },
  { id: 4, name: 'Sneha Gupta', score: 87.2, calls: 41, satisfaction: 4.5, talkRatio: 65, interruptions: 3, monologues: 4.2 },
  { id: 5, name: 'Vikram Singh', score: 85.6, calls: 39, satisfaction: 4.3, talkRatio: 68, interruptions: 4, monologues: 5.1 }
];

export function TeamLeaderOverview() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [widgetMenu, setWidgetMenu] = useState<string | null>(null);
  const [showAnalyticsCards, setShowAnalyticsCards] = useState(false);

  const handleExpandWidget = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
    setWidgetMenu(null);
  };

  const handleWidgetAction = (widgetId: string, action: string) => {
    console.log(`Widget ${widgetId} action: ${action}`);
    setWidgetMenu(null);
  };


  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Modern Header with Gong.io styling */}
      <div className="bg-white px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Analytics Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Comprehensive conversation quality and performance metrics</p>
          </div>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <div className="px-12 py-6 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search agents, campaigns, or metrics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium shadow-sm"
            />
          </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm">
              <option>All Teams</option>
              <option>Sales Team</option>
              <option>Support Team</option>
              <option>Marketing Team</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm">
              <option>All Campaigns</option>
              <option>Q4 Push</option>
              <option>Holiday Special</option>
              <option>New Product Launch</option>
            </select>
          <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
          </button>
          </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Top Row: Metrics and Performance Trends Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Performance Metrics */}
          <div className={`${expandedWidget === 'metrics' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500 p-6 ${expandedWidget === 'metrics' ? 'min-h-[600px]' : ''}`}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Conversational Metrics</h3>
                  <p className="text-sm text-gray-600 mt-1">Core conversation quality and performance indicators</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('metrics')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title={expandedWidget === 'metrics' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'metrics' ? 
                      <Minimize2 className="w-4 h-4 text-gray-600" /> : 
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('metrics')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    {widgetMenu === 'metrics' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('metrics', 'refresh')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('metrics', 'export')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('metrics', 'settings')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Widget Settings</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
        </div>
            </div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Active Agents */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-700">Active Agents</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+2 this month</span>
                  </div>
          </div>

                {/* Average Quality Score */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
            </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">91.2</div>
                  <div className="text-sm text-gray-700">Average Quality Score</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+3.5% from last month</span>
                  </div>
          </div>

                {/* Total Conversations */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-white" />
            </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-gray-700">Total Conversations</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+15% this week</span>
                  </div>
          </div>

                {/* Average Duration */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
            </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">9:45</div>
                  <div className="text-sm text-gray-700">Average Duration</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">-2 min from last week</span>
                </div>
          </div>

                {/* Interruption Rate */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1.8</div>
                  <div className="text-sm text-gray-700">Interruption Rate</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-red-600 font-medium">+0.3 from last month</span>
        </div>
      </div>

                {/* Customer Satisfaction */}
                
              </div>
              
              {/* Summary Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Summary */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-gray-600" />
                      Performance Summary
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Team Efficiency</span>
                        <span className="font-medium text-green-600">↑ 8.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality Consistency</span>
                        <span className="font-medium text-green-600">↑ 5.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-medium text-red-600">↑ 12%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Insights */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-blue-600" />
                      Quick Insights
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Quality scores above team average</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Monitor interruption patterns</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Conversation volume trending up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>

      {/* Trend Analysis */}
          <div className={`${expandedWidget === 'trends' ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500 p-6 h-full ${expandedWidget === 'trends' ? 'min-h-[600px]' : ''}`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Trend Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">Team performance trends over time</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('trends')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title={expandedWidget === 'trends' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'trends' ? 
                      <Minimize2 className="w-4 h-4 text-gray-600" /> : 
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('trends')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    {widgetMenu === 'trends' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('trends', 'refresh')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('trends', 'export')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Chart</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('trends', 'settings')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Chart Settings</span>
                          </button>
                </div>
              </div>
                    )}
            </div>
        </div>
      </div>
              
              {/* Combined Trend Analysis Chart */}
              <div className="mb-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className={`${expandedWidget === 'trends' ? 'h-96' : 'h-64'} mb-4`}>
                    <svg width="100%" height="100%" viewBox="0 0 500 200" className="overflow-visible">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid-combined" width="50" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-combined)" />
                      
                      {/* Y-axis labels */}
                      <text x="15" y="25" textAnchor="start" className="text-xs fill-gray-500">100%</text>
                      <text x="15" y="65" textAnchor="start" className="text-xs fill-gray-500">75%</text>
                      <text x="15" y="105" textAnchor="start" className="text-xs fill-gray-500">50%</text>
                      <text x="15" y="145" textAnchor="start" className="text-xs fill-gray-500">25%</text>
                      <text x="15" y="185" textAnchor="start" className="text-xs fill-gray-500">0%</text>
                      
                      {/* Avg Talk Ratio (Blue) */}
                      <polyline
                        points="80,120 140,110 200,100 260,90 320,80 380,70"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="120" r="3" fill="#3b82f6" />
                      <circle cx="140" cy="110" r="3" fill="#3b82f6" />
                      <circle cx="200" cy="100" r="3" fill="#3b82f6" />
                      <circle cx="260" cy="90" r="3" fill="#3b82f6" />
                      <circle cx="320" cy="80" r="3" fill="#3b82f6" />
                      <circle cx="380" cy="70" r="3" fill="#3b82f6" />
                      
                      {/* Avg Interruptions (Gray) */}
                      <polyline
                        points="80,60 140,62 200,60 260,58 320,60 380,59"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="60" r="3" fill="#6b7280" />
                      <circle cx="140" cy="62" r="3" fill="#6b7280" />
                      <circle cx="200" cy="60" r="3" fill="#6b7280" />
                      <circle cx="260" cy="58" r="3" fill="#6b7280" />
                      <circle cx="320" cy="60" r="3" fill="#6b7280" />
                      <circle cx="380" cy="59" r="3" fill="#6b7280" />
                      
                      {/* Avg Quality Score (Green) */}
                      <polyline
                        points="80,90 140,80 200,70 260,60 320,50 380,40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="90" r="3" fill="#10b981" />
                      <circle cx="140" cy="80" r="3" fill="#10b981" />
                      <circle cx="200" cy="70" r="3" fill="#10b981" />
                      <circle cx="260" cy="60" r="3" fill="#10b981" />
                      <circle cx="320" cy="50" r="3" fill="#10b981" />
                      <circle cx="380" cy="40" r="3" fill="#10b981" />
                      
                      {/* Total Conversations (Purple) */}
                      <polyline
                        points="80,150 140,140 200,130 260,120 320,110 380,100"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="150" r="3" fill="#8b5cf6" />
                      <circle cx="140" cy="140" r="3" fill="#8b5cf6" />
                      <circle cx="200" cy="130" r="3" fill="#8b5cf6" />
                      <circle cx="260" cy="120" r="3" fill="#8b5cf6" />
                      <circle cx="320" cy="110" r="3" fill="#8b5cf6" />
                      <circle cx="380" cy="100" r="3" fill="#8b5cf6" />
                      
                      {/* X-axis labels */}
                      <text x="80" y="195" textAnchor="middle" className="text-xs fill-gray-500">Mon</text>
                      <text x="140" y="195" textAnchor="middle" className="text-xs fill-gray-500">Tue</text>
                      <text x="200" y="195" textAnchor="middle" className="text-xs fill-gray-500">Wed</text>
                      <text x="260" y="195" textAnchor="middle" className="text-xs fill-gray-500">Thu</text>
                      <text x="320" y="195" textAnchor="middle" className="text-xs fill-gray-500">Fri</text>
                      <text x="380" y="195" textAnchor="middle" className="text-xs fill-gray-500">Sat</text>
                    </svg>
            </div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Avg Talk Ratio (60%)</span>
                      <svg className="w-3 h-3 text-red-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Avg Interruptions (1.9)</span>
                      <svg className="w-3 h-3 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Avg Quality Score (91)</span>
                      <svg className="w-3 h-3 text-green-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Total Conversations (693)</span>
                      <svg className="w-3 h-3 text-green-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Call Quality Analytics */}
        <div className={`${expandedWidget === 'analytics' ? 'lg:col-span-3' : ''} ${expandedWidget === 'metrics' ? 'hidden' : ''} ${expandedWidget === 'trends' ? 'hidden' : ''}`}>
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500 p-6 ${expandedWidget === 'analytics' ? 'min-h-[600px]' : ''}`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Conversational Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Advanced conversation flow metrics and coaching insights</p>
            </div>
                <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAnalyticsCards(!showAnalyticsCards)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{showAnalyticsCards ? 'Hide Insights' : 'View Insights'}</span>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExpandWidget('analytics')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title={expandedWidget === 'analytics' ? 'Minimize' : 'Maximize'}
                >
                  {expandedWidget === 'analytics' ? 
                    <Minimize2 className="w-4 h-4 text-gray-600" /> : 
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  }
                </button>
                <div className="relative">
                  <button
                    onClick={() => setWidgetMenu('analytics')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                  {widgetMenu === 'analytics' && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                      <div className="py-1">
                        <button
                          onClick={() => handleWidgetAction('analytics', 'refresh')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Refresh Data</span>
                        </button>
                        <button
                          onClick={() => handleWidgetAction('analytics', 'export')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Analytics</span>
                        </button>
                        <button
                          onClick={() => handleWidgetAction('analytics', 'settings')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Analytics Settings</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
                </div>
        </div>

          {!showAnalyticsCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Flow Analysis */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                </div>
                  <span className="text-sm text-blue-600 font-medium">Good</span>
              </div>
                <div className="text-2xl font-bold text-blue-900 mb-2">78%</div>
                <div className="text-sm text-blue-700 mb-4">Flow Quality Score</div>
                <div className="text-xs text-blue-600">+3% from last week</div>
            </div>

              {/* Content Analysis */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                </div>
                  <span className="text-sm text-green-600 font-medium">Excellent</span>
              </div>
                <div className="text-2xl font-bold text-green-900 mb-2">92%</div>
                <div className="text-sm text-green-700 mb-4">Content Relevance</div>
                <div className="text-xs text-green-600">+5% from last week</div>
            </div>

              {/* Sentiment Analysis */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                  <span className="text-sm text-purple-600 font-medium">Positive</span>
              </div>
                <div className="text-2xl font-bold text-purple-900 mb-2">85%</div>
                <div className="text-sm text-purple-700 mb-4">Positive Sentiment</div>
                <div className="text-xs text-purple-600">+2% from last week</div>
            </div>
          </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Flow Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-blue-50 px-4 py-3 rounded-lg">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Flow Metrics
                </h4>
                <div className="space-y-6">
                  {/* Talk Ratio Distribution (Box Plot) */}
                  <div className="pb-6 border-b border-gray-200">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Talk Ratio Distribution</h5>
                      </div>
                      <div className="border-b border-blue-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100">
                      <div className="h-32 bg-white rounded-lg p-4 shadow-sm">
                        <svg width="100%" height="100%" viewBox="0 0 240 80">
                          <g transform="translate(30, 15)">
                          {/* Y-axis */}
                            <line x1="0" y1="0" x2="0" y2="50" stroke="#374151" strokeWidth="1.5"/>
                            <text x="-8" y="5" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">100%</text>
                            <text x="-8" y="25" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">50%</text>
                            <text x="-8" y="45" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">0%</text>
                            
                          {/* X-axis */}
                            <line x1="0" y1="50" x2="180" y2="50" stroke="#374151" strokeWidth="1.5"/>
                            <text x="30" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">40%</text>
                            <text x="70" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">60%</text>
                            <text x="110" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">80%</text>
                            
                            {/* Box plot */}
                            <rect x="60" y="25" width="50" height="25" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="1.5" rx="2"/>
                            <line x1="85" y1="25" x2="85" y2="50" stroke="#1E40AF" strokeWidth="2.5"/>
                            <line x1="40" y1="37" x2="60" y2="37" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="110" y1="37" x2="130" y2="37" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="40" y1="32" x2="40" y2="42" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="130" y1="32" x2="130" y2="42" stroke="#3B82F6" strokeWidth="2"/>
                            
                            {/* Outliers */}
                            <circle cx="150" cy="20" r="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
                            <circle cx="160" cy="15" r="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
                            
                            {/* Grid lines */}
                            <line x1="0" y1="25" x2="180" y2="25" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <line x1="0" y1="37" x2="180" y2="37" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2,2"/>
                        </g>
                      </svg>
                        
                        {/* Enhanced Legend */}
                        <div className="flex justify-center space-x-6 mt-3 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-300 rounded border border-blue-400"></div>
                            <span className="text-gray-700 font-medium">Q1-Q3 Range</span>
            </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-800 rounded"></div>
                            <span className="text-gray-700 font-medium">Median</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full border border-red-600"></div>
                            <span className="text-gray-700 font-medium">Outliers</span>
                          </div>
                        </div>
                      </div>
        </div>
      </div>

                  {/* Coaching Leaderboards */}
                  <div className="pb-6 border-b border-gray-200">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Coaching Leaderboards</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Monologue Frequency Leaderboard */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-orange-100">
                        <h6 className="text-xs font-medium text-gray-700 mb-3 text-center flex items-center justify-center space-x-1">
                          <MessageSquare className="w-3 h-3 text-orange-600" />
                          <span>Monologue Frequency</span>
                        </h6>
                        <div className="space-y-2">
                          {agents.sort((a, b) => a.monologues - b.monologues).map((agent, index) => (
                            <div 
                              key={agent.id} 
                              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowAgentDetails(true);
                              }}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 
                                index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}>
                                  {index + 1}
            </div>
                              <div className="flex-1">
                                <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                                <div className="text-xs text-gray-600">{agent.calls} calls</div>
          </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{agent.monologues}</div>
                                <div className="text-xs text-gray-500">per call</div>
                              </div>
                              <div className="w-12">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${
                                    agent.monologues <= 2 ? 'bg-green-500' :
                                    agent.monologues <= 3 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} style={{ width: `${Math.min(agent.monologues * 20, 100)}%` }}></div>
                                </div>
                              </div>
            </div>
                          ))}
            </div>
          </div>
          
                      {/* Interruption Rate Leaderboard */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                        <h6 className="text-xs font-medium text-gray-700 mb-3 text-center flex items-center justify-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-purple-600" />
                          <span>Interruption Rate</span>
                        </h6>
                        <div className="space-y-2">
                          {agents.sort((a, b) => a.interruptions - b.interruptions).map((agent, index) => (
                            <div 
                              key={agent.id} 
                              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowAgentDetails(true);
                              }}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 
                                index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}>
                                  {index + 1}
            </div>
                              <div className="flex-1">
                                <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                                <div className="text-xs text-gray-600">{agent.calls} calls</div>
          </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{agent.interruptions}</div>
                                <div className="text-xs text-gray-500">per call</div>
                              </div>
                              <div className="w-12">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${
                                    agent.interruptions <= 1 ? 'bg-green-500' :
                                    agent.interruptions <= 2 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} style={{ width: `${Math.min(agent.interruptions * 25, 100)}%` }}></div>
                                </div>
                              </div>
        </div>
              ))}
            </div>
            </div>
          </div>
        </div>

                  {/* Rep vs Team Average Radar Chart */}
              <div>
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Rep vs Team Average</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="h-40 bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          <g transform="translate(70, 70)">
                          {/* Radar chart grid */}
                          {[1, 2, 3, 4, 5].map(ring => (
                            <polygon
                              key={ring}
                                points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
                              fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="1.5"
                              transform={`scale(${ring * 0.2})`}
                            />
                          ))}
                          
                          {/* Radar chart axes */}
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <line
                              key={i}
                              x1="0"
                              y1="0"
                                x2={50 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)}
                                y2={50 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}
                                stroke="#E5E7EB"
                                strokeWidth="1.5"
                            />
                          ))}
                          
                          {/* Team average (blue) */}
                          <polygon
                              points="0,-40 34.6,-20 34.6,20 0,40 -34.6,20 -34.6,-20"
                              fill="rgba(59, 130, 246, 0.4)"
                              stroke="#3B82F6"
                              strokeWidth="2.5"
                          />
                          
                          {/* Individual agent (red) */}
                          <polygon
                              points="0,-45 39.0,-22.5 39.0,22.5 0,45 -39.0,22.5 -39.0,-22.5"
                              fill="rgba(239, 68, 68, 0.4)"
                              stroke="#EF4444"
                              strokeWidth="2.5"
                            />
                            
                            {/* Center dot */}
                            <circle cx="0" cy="0" r="3" fill="#374151"/>
                        </g>
                      </svg>
                        
                        {/* Enhanced Legend */}
                        <div className="ml-6 flex flex-col space-y-3 text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-blue-500 rounded border border-blue-600"></div>
                            <span className="text-gray-700 font-medium">Team Average</span>
              </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
                            <span className="text-gray-700 font-medium">Priya Sharma</span>
                          </div>
              </div>
            </div>
                    </div>
            </div>

          </div>
        </div>

              {/* Content Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-green-50 px-4 py-3 rounded-lg">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Content Metrics
                </h4>
                <div className="space-y-6">
                  {/* FR-DV-4.4: Keyword & Competitor Heatmap */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Keyword & Competitor Heatmap</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-green-100">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Competitor Mentions */}
                        <div>
                          <h6 className="text-xs font-medium text-gray-600 mb-2 text-center">Competitor Mentions</h6>
                          <div className="space-y-2">
                            {[
                              { name: 'Competitor A', mentions: 45, intensity: 'high' },
                              { name: 'Competitor B', mentions: 32, intensity: 'medium' },
                              { name: 'Competitor C', mentions: 18, intensity: 'low' }
                            ].map((competitor, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                                <span className="text-xs font-medium text-gray-700">{competitor.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-600">{competitor.mentions}</span>
                                  <div className={`w-3 h-3 rounded-full ${
                                    competitor.intensity === 'high' ? 'bg-red-500' :
                                    competitor.intensity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Product Mentions */}
                        <div>
                          <h6 className="text-xs font-medium text-gray-600 mb-2 text-center">Product Mentions</h6>
                          <div className="space-y-2">
                            {[
                              { name: 'Product X', mentions: 67, intensity: 'high' },
                              { name: 'Product Y', mentions: 43, intensity: 'medium' },
                              { name: 'Product Z', mentions: 25, intensity: 'low' }
                            ].map((product, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                                <span className="text-xs font-medium text-gray-700">{product.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-600">{product.mentions}</span>
                                  <div className={`w-3 h-3 rounded-full ${
                                    product.intensity === 'high' ? 'bg-blue-500' :
                                    product.intensity === 'medium' ? 'bg-blue-400' : 'bg-blue-300'
                                  }`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FR-DV-4.5: Intent Distribution Chart */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Intent Distribution</h5>
                      </div>
                      <div className="border-b border-blue-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100">
                      <div className="space-y-3">
                        {[
                          { intent: 'Objection Handling', percentage: 35, color: 'bg-red-500' },
                          { intent: 'Product Inquiry', percentage: 28, color: 'bg-blue-500' },
                          { intent: 'Technical Support', percentage: 22, color: 'bg-green-500' },
                          { intent: 'Billing Questions', percentage: 15, color: 'bg-yellow-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                            <div className="w-32 text-xs font-medium text-gray-700">{item.intent}</div>
                            <div className="flex-1 bg-white rounded-full h-4 border">
                        <div 
                                className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
                                style={{ width: `${item.percentage}%` }}
                        >
                                <span className="text-white text-xs font-medium">{item.percentage}%</span>
              </div>
            </div>
                </div>
                  ))}
                      </div>
                    </div>
                  </div>

                  {/* FR-DV-4.6: Trending Topics */}
                  <div>
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Trending Topics</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="space-y-3">
                        {[
                          { topic: 'AI Integration', trend: 'up', mentions: 89, change: '+12%' },
                          { topic: 'Security Concerns', trend: 'up', mentions: 67, change: '+8%' },
                          { topic: 'Pricing Questions', trend: 'down', mentions: 45, change: '-3%' },
                          { topic: 'Feature Requests', trend: 'up', mentions: 78, change: '+15%' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <span className="text-sm font-medium text-gray-700">{item.topic}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-600">{item.mentions} mentions</span>
                              <span className={`text-xs font-medium ${
                                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>{item.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sentiment Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-purple-50 px-4 py-3 rounded-lg">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Sentiment Distribution
                </h4>
                <div className="space-y-6">
                  {/* FR-DV-4.4: Sentiment Distribution */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Sentiment Distribution</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="space-y-3">
                        {[
                          { label: 'Positive', value: 70, color: 'bg-green-500' },
                          { label: 'Neutral', value: 20, color: 'bg-yellow-500' },
                          { label: 'Negative', value: 10, color: 'bg-red-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                            <div className="w-20 text-sm font-medium text-gray-700">{item.label}</div>
                            <div className="flex-1 bg-white rounded-full h-6 border">
                        <div 
                          className={`${item.color} h-6 rounded-full flex items-center justify-end pr-2`}
                          style={{ width: `${item.value}%` }}
                        >
                          <span className="text-white text-sm font-medium">{item.value}%</span>
                  </div>
                  </div>
                  </div>
                  ))}
            </div>
          </div>
            </div>

                  {/* FR-DV-4.5: Escalation Rate Trend */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Escalation Rate Trend</h5>
          </div>
                      <div className="border-b border-red-200 mt-1"></div>
        </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-red-100">
                      <div className="h-24 bg-white rounded-lg p-3">
                        <svg width="100%" height="100%" viewBox="0 0 200 60">
                          <g transform="translate(20, 10)">
                            {/* Y-axis */}
                            <line x1="0" y1="0" x2="0" y2="40" stroke="#374151" strokeWidth="1.5"/>
                            <text x="-5" y="5" fontSize="8" fill="#6B7280" textAnchor="end">25%</text>
                            <text x="-5" y="25" fontSize="8" fill="#6B7280" textAnchor="end">15%</text>
                            <text x="-5" y="45" fontSize="8" fill="#6B7280" textAnchor="end">5%</text>
                            
                            {/* X-axis */}
                            <line x1="0" y1="40" x2="160" y2="40" stroke="#374151" strokeWidth="1.5"/>
                            <text x="20" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Mon</text>
                            <text x="60" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Tue</text>
                            <text x="100" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Wed</text>
                            <text x="140" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Thu</text>
                            
                            {/* Escalation trend line */}
                            <polyline
                              points="20,35 40,30 60,25 80,20 100,18 120,15 140,12"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="2"
                            />
                            
                            {/* Data points */}
                            <circle cx="20" cy="35" r="3" fill="#EF4444"/>
                            <circle cx="40" cy="30" r="3" fill="#EF4444"/>
                            <circle cx="60" cy="25" r="3" fill="#EF4444"/>
                            <circle cx="80" cy="20" r="3" fill="#EF4444"/>
                            <circle cx="100" cy="18" r="3" fill="#EF4444"/>
                            <circle cx="120" cy="15" r="3" fill="#EF4444"/>
                            <circle cx="140" cy="12" r="3" fill="#EF4444"/>
                          </g>
                        </svg>
              </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs text-gray-600">Escalation rate decreasing: 18% → 12%</span>
            </div>
                    </div>
                  </div>

                  {/* FR-DV-4.6: Agent Empathy Leaderboard */}
                  <div>
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Agent Empathy Leaderboard</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-green-100">
                      <div className="space-y-2">
                        {agents.sort((a, b) => b.score - a.score).map((agent, index) => (
                          <div 
                            key={agent.id} 
                            className="flex items-center space-x-3 p-2 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setShowAgentDetails(true);
                            }}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              index === 0 ? 'bg-green-500' : 
                              index === 1 ? 'bg-blue-500' : 
                              index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}>
                              {index + 1}
                  </div>
                  <div className="flex-1">
                              <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                              <div className="text-xs text-gray-600">{agent.calls} calls</div>
                  </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">{agent.score}</div>
                              <div className="text-xs text-gray-500">empathy score</div>
                            </div>
                            <div className="w-12">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full ${
                                  agent.score >= 90 ? 'bg-green-500' :
                                  agent.score >= 80 ? 'bg-blue-500' :
                                  agent.score >= 70 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} style={{ width: `${agent.score}%` }}></div>
                              </div>
                            </div>
                </div>
              ))}
                      </div>
                    </div>
                  </div>
                </div>
          </div>
            </div>
          )}
            </div>
          </div>

        {/* Third Row: Performance Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* FR-DV-4.4: Talk-to-Listen Ratio Leaderboard */}
          <div className={`${expandedWidget === 'talkListenLeaderboard' ? 'lg:col-span-2' : ''}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-orange-500 p-6 h-full ${expandedWidget === 'talkListenLeaderboard' ? 'min-h-[600px]' : ''}`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Talk-to-Listen Ratio Leaderboard</h3>
                  <p className="text-sm text-gray-600 mt-1">Best performing agents by conversation balance</p>
                </div>
              <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('talkListenLeaderboard')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title={expandedWidget === 'talkListenLeaderboard' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'talkListenLeaderboard' ? 
                      <Minimize2 className="w-4 h-4 text-gray-600" /> : 
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('talkListenLeaderboard')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    {widgetMenu === 'talkListenLeaderboard' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'refresh')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'export')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Leaderboard</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'settings')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Leaderboard Settings</span>
                          </button>
              </div>
            </div>
                    )}
                  </div>
            </div>
          </div>

            <div className="space-y-3">
                {agents.sort((a, b) => b.talkRatio - a.talkRatio).map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAgentDetails(true);
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-600">{agent.calls} calls • {agent.satisfaction}★ rating</div>
                  </div>
                  <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{agent.talkRatio}%</div>
                      <div className="text-xs text-gray-500">Talk Ratio</div>
                    </div>
                    <div className="w-16">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${agent.talkRatio}%` }}
                        ></div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* FR-DV-4.4: Interruption Count Leaderboard */}
          <div className={`${expandedWidget === 'interruptionLeaderboard' ? 'lg:col-span-2' : ''}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-red-500 p-6 h-full ${expandedWidget === 'interruptionLeaderboard' ? 'min-h-[600px]' : ''}`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Lowest Interruption Count</h3>
                  <p className="text-sm text-gray-600 mt-1">Agents with best listening skills</p>
                </div>
            <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('interruptionLeaderboard')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title={expandedWidget === 'interruptionLeaderboard' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'interruptionLeaderboard' ? 
                      <Minimize2 className="w-4 h-4 text-gray-600" /> : 
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('interruptionLeaderboard')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    {widgetMenu === 'interruptionLeaderboard' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'refresh')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'export')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Leaderboard</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'settings')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Leaderboard Settings</span>
                          </button>
            </div>
          </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {agents.sort((a, b) => a.interruptions - b.interruptions).map((agent, index) => (
                  <div 
                    key={agent.id} 
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setShowAgentDetails(true);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {index + 1}
                </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-600">{agent.calls} calls • {agent.satisfaction}★ rating</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{agent.interruptions}</div>
                      <div className="text-xs text-gray-500">Interruptions</div>
                    </div>
                    <div className="w-16">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            agent.interruptions <= 1 ? 'bg-green-500' :
                            agent.interruptions <= 2 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(agent.interruptions * 20, 100)}%` }}
                        ></div>
                      </div>
                    </div>
              </div>
            ))}
              </div>
          </div>
        </div>
        </div>

      </div>


      {/* Advanced Filters Side Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg mb-3">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom Range</option>
                  </select>
                  
                  {/* Custom Date Range */}
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">Custom Date Range</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">From Date</label>
                        <input 
                          type="date" 
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          defaultValue="2024-01-01"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">To Date</label>
                        <input 
                          type="date" 
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          defaultValue="2024-01-31"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                        Apply
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 border border-gray-300">
                      All Teams
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Sales Team
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Support Team
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Marketing Team
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 border border-gray-300">
                      All Agents
                    </button>
                    {agents.slice(0, 4).map(agent => (
                      <button key={agent.id} className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                        {agent.name}
                      </button>
                    ))}
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200">
                      +{agents.length - 4} more
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Performance Score</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 border border-gray-300">
                      All Scores
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Excellent (90+)
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Good (70-89)
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Average (50-69)
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Needs Improvement (&lt;50)
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Call Volume</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 border border-gray-300">
                      All Volumes
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      High (50+)
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Medium (20-49)
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                      Low (&lt;20)
                    </button>
                    </div>
                  </div>
                
                {/* Save Views Section - Compact */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Save Views</label>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Manage</button>
                </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="View name..."
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                      Save
                    </button>
                    </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Last Week
                    </button>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Q4 Perf
                    </button>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Top Agents
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Filters
                  </button>
                  <button className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Details Side Drawer */}
      {showAgentDetails && selectedAgent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAgentDetails(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Agent Details</h3>
                <button 
                  onClick={() => setShowAgentDetails(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-lg font-semibold">{selectedAgent.name}</h4>
                  <p className="text-sm text-gray-600">Sales Representative</p>
                </div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedAgent.score}</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedAgent.calls}</div>
                    <div className="text-sm text-gray-600">Total Calls</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedAgent.satisfaction}</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedAgent.talkRatio}%</div>
                    <div className="text-sm text-gray-600">Talk Ratio</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Interruptions</span>
                    <span className="font-semibold">{selectedAgent.interruptions}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Avg Monologue Length</span>
                    <span className="font-semibold">{selectedAgent.monologues}m</span>
                  </div>
                </div>

                {/* Performance Insights */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold mb-3">Performance Insights</h5>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Above average performance score</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Good customer satisfaction rating</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Room for improvement in talk ratio</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Profile
                  </button>
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


