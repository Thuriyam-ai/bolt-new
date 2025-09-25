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
  Award,
  Maximize2,
  Minimize2,
  Settings,
  Copy,
  Trash2,
  Move
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
  const [showAnalyticsCards, setShowAnalyticsCards] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [showWidgetMenu, setShowWidgetMenu] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleWidgetExpand = (widgetId: string) => {
    console.log('Expanding widget:', widgetId);
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
    setShowWidgetMenu(null);
  };

  const handleWidgetMenu = (widgetId: string) => {
    console.log('Opening menu for widget:', widgetId);
    setShowWidgetMenu(showWidgetMenu === widgetId ? null : widgetId);
  };

  const handleWidgetAction = (action: string, widgetId: string) => {
    console.log(`Action: ${action} on widget: ${widgetId}`);
    setShowWidgetMenu(null);
    
    switch(action) {
      case 'refresh':
        handleRefresh();
        break;
      case 'copy':
        navigator.clipboard.writeText(`Widget: ${widgetId}`);
        break;
      case 'settings':
        // Open widget settings
        break;
      case 'delete':
        // Remove widget (would need confirmation)
        break;
    }
  };




  // Close widget menu when clicking outside
  const handleClickOutside = () => {
    setShowWidgetMenu(null);
  };


  return (
    <>
    <div className="flex-1 bg-gray-50 min-h-screen" onClick={handleClickOutside}>
      {/* Modern Header with Gong.io styling */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Leader Overview</h1>
              <p className="text-sm text-gray-600 mt-1">Monitor team performance and coaching opportunities</p>
          </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search agents, campaigns, or metrics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              <option>All Teams</option>
              <option>Sales Team</option>
              <option>Support Team</option>
              <option>Marketing Team</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
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

      {/* Main Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Top Row: Metrics and Performance Trends Side by Side */}
        <div className={`grid grid-cols-1 gap-6 ${expandedWidget === 'metrics' || expandedWidget === 'trends' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          {/* Key Performance Metrics */}
          <div className={`${expandedWidget === 'metrics' ? 'lg:col-span-1' : 'lg:col-span-2'} ${expandedWidget === 'trends' ? 'hidden' : ''}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${expandedWidget === 'metrics' ? 'min-h-[600px]' : ''}`}>
              <div className="bg-blue-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Key Performance Metrics</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-end mb-6">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWidgetExpand('metrics');
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                    title={expandedWidget === 'metrics' ? 'Minimize widget' : 'Maximize widget'}
                  >
                    {expandedWidget === 'metrics' ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWidgetMenu('metrics');
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Widget options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                    {showWidgetMenu === 'metrics' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('refresh', 'metrics');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('copy', 'metrics');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('settings', 'metrics');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </button>
                        <hr className="my-1" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('delete', 'metrics');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              <div className={`grid gap-4 ${expandedWidget === 'metrics' ? 'grid-cols-2 lg:grid-cols-6' : 'grid-cols-2 lg:grid-cols-4'}`}>
                {/* Average Score */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-blue-600 font-medium">+2.3%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">89.8</div>
                  <div className="text-sm text-blue-700">Average Score</div>
          </div>

                {/* Total Calls */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-white" />
            </div>
                    <span className="text-xs text-green-600 font-medium">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">225</div>
                  <div className="text-sm text-green-700">Total Calls</div>
          </div>

                {/* Team Size */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
            </div>
                    <span className="text-xs text-purple-600 font-medium">+1</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">12</div>
                  <div className="text-sm text-purple-700">Active Agents</div>
          </div>

                {/* Avg Response Time */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
            </div>
                    <span className="text-xs text-orange-600 font-medium">-15%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">2.4m</div>
                  <div className="text-sm text-orange-700">Avg Response</div>
                </div>

                {/* Additional metrics shown only when expanded */}
                {expandedWidget === 'metrics' && (
                  <>
                    {/* Conversion Rate */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+12%</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700">23.4%</div>
                      <div className="text-sm text-purple-600">Conversion Rate</div>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">+5%</span>
                      </div>
                      <div className="text-2xl font-bold text-indigo-700">4.7/5</div>
                      <div className="text-sm text-indigo-600">Customer Rating</div>
                    </div>
                  </>
                )}
              </div>
              </div>
            </div>
          </div>

          {/* Performance Trends Chart */}
          <div className={`${expandedWidget === 'trends' ? 'lg:col-span-1' : 'lg:col-span-1'} ${expandedWidget === 'metrics' ? 'hidden' : ''}`}>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${expandedWidget === 'trends' ? 'min-h-[600px]' : 'h-full'}`}>
              <div className="bg-green-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Performance Trends</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-end mb-6">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWidgetExpand('trends');
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                    title={expandedWidget === 'trends' ? 'Minimize widget' : 'Maximize widget'}
                  >
                    {expandedWidget === 'trends' ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWidgetMenu('trends');
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Widget options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                    {showWidgetMenu === 'trends' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('refresh', 'trends');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('copy', 'trends');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('settings', 'trends');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </button>
                        <hr className="my-1" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetAction('delete', 'trends');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                </div>
        <div className={`flex items-end space-x-2 ${expandedWidget === 'trends' ? 'h-96' : 'h-64'}`}>
          {[85, 87, 89, 88, 92, 90, 94].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                      style={{ height: `${(value / 100) * (expandedWidget === 'trends' ? 300 : 200)}px` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2 font-medium">{value}</div>
                    <div className="text-xs text-gray-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</div>
            </div>
          ))}
        </div>

        {/* Additional trend details shown only when expanded */}
        {expandedWidget === 'trends' && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Weekly Summary</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Peak Performance: Sunday (94%)</div>
                <div>Average Score: 89.3%</div>
                <div>Improvement: +9%</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Trend Analysis</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Consistent Growth: 6 days</div>
                <div>Best Streak: 3 days</div>
                <div>Target: 95%</div>
              </div>
            </div>
          </div>
        )}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Weekly Performance</span>
                <span className="text-green-600 font-medium">+5.2% vs last week</span>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call Quality Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-purple-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">Call Quality Analytics</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-end mb-6">
                <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAnalyticsCards(!showAnalyticsCards)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{showAnalyticsCards ? 'Hide Analytics' : 'View Analytics'}</span>
              </button>
              <div className="flex items-center space-x-2">
                <Move className="w-4 h-4 text-gray-400" />
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
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
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Flow Analysis
        </h4>
                <div className="space-y-6">
                  {/* Talk Ratio Distribution (Box Plot) */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Talk Ratio Distribution (Box Plot)</h5>
                    <div className="h-24 bg-white rounded-lg p-3">
                      <svg width="100%" height="100%" viewBox="0 0 200 60">
                        <g transform="translate(20, 10)">
              {/* Y-axis */}
                          <line x1="0" y1="0" x2="0" y2="40" stroke="#374151" strokeWidth="1"/>
              {/* X-axis */}
                          <line x1="0" y1="40" x2="160" y2="40" stroke="#374151" strokeWidth="1"/>
              
              {/* Box plot elements */}
                          <g transform="translate(60, 10)">
                {/* Whiskers */}
                            <line x1="0" y1="20" x2="80" y2="20" stroke="#6b7280" strokeWidth="1"/>
                            <line x1="0" y1="15" x2="0" y2="25" stroke="#6b7280" strokeWidth="1"/>
                            <line x1="80" y1="15" x2="80" y2="25" stroke="#6b7280" strokeWidth="1"/>
                
                {/* Box */}
                            <rect x="20" y="10" width="40" height="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
                
                {/* Median line */}
                            <line x1="35" y1="10" x2="35" y2="30" stroke="#1d4ed8" strokeWidth="2"/>
                
                {/* Outliers */}
                            <circle cx="90" cy="20" r="2" fill="#ef4444"/>
                            <circle cx="100" cy="20" r="2" fill="#ef4444"/>
              </g>
              
              {/* Labels */}
                          <text x="40" y="50" textAnchor="middle" className="text-xs fill-gray-600">40%</text>
                          <text x="80" y="50" textAnchor="middle" className="text-xs fill-gray-600">60%</text>
                          <text x="120" y="50" textAnchor="middle" className="text-xs fill-gray-600">80%</text>
            </g>
          </svg>
        </div>
                    <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center"><div className="w-2 h-2 bg-blue-100 border border-blue-500 mr-1"></div>Q1-Q3</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-blue-600 mr-1"></div>Median</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>Outliers</div>
        </div>
      </div>

                  {/* Coaching Leaderboards */}
            <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Coaching Leaderboards</h5>
          <div className="space-y-3">
                      {/* Monologue Frequency Leaderboard */}
                      <div>
                        <h6 className="text-xs font-medium text-gray-600 mb-1">Monologue Frequency</h6>
                        <div className="space-y-1">
                          {agents.sort((a, b) => a.monologues - b.monologues).slice(0, 3).map((agent, index) => (
                            <div key={agent.id} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>
                    {index + 1}
                  </div>
                                <span className="text-gray-600">{agent.name}</span>
                </div>
                              <span className={`px-1 py-0.5 text-xs rounded ${
                    agent.monologues <= 2 ? 'bg-green-100 text-green-700' :
                    agent.monologues <= 3 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                                {agent.monologues}/call
                  </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interruption Rate Leaderboard */}
            <div>
                        <h6 className="text-xs font-medium text-gray-600 mb-1">Interruption Rate</h6>
                        <div className="space-y-1">
                          {agents.sort((a, b) => a.interruptions - b.interruptions).slice(0, 3).map((agent, index) => (
                            <div key={agent.id} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>
                    {index + 1}
                  </div>
                                <span className="text-gray-600">{agent.name}</span>
                </div>
                              <span className={`px-1 py-0.5 text-xs rounded ${
                    agent.interruptions <= 1 ? 'bg-green-100 text-green-700' :
                    agent.interruptions <= 2 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                                {agent.interruptions}/call
                  </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

                  {/* Rep vs Team Average Radar Chart */}
              <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Rep vs Team Average</h5>
                    <div className="h-32 bg-white rounded-lg p-2 flex items-center justify-center">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <g transform="translate(60, 60)">
              {/* Radar chart grid */}
              {[1, 2, 3, 4, 5].map(ring => (
                <polygon
                  key={ring}
                              points="0,-45 38.9,-22.5 38.9,22.5 0,45 -38.9,22.5 -38.9,-22.5"
                  fill="none"
                  stroke="#e5e7eb"
                              strokeWidth="0.5"
                  transform={`scale(${ring * 0.2})`}
                />
              ))}
              
              {/* Radar chart axes */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                              x2={45 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)}
                              y2={45 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}
                  stroke="#e5e7eb"
                              strokeWidth="0.5"
                />
              ))}
              
              {/* Team average (blue) */}
              <polygon
                            points="0,-36 31.2,-18 31.2,18 0,36 -31.2,18 -31.2,-18"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="#3b82f6"
                            strokeWidth="1"
              />
              
              {/* Individual agent (red) */}
              <polygon
                            points="0,-40.5 35.1,-20.25 35.1,20.25 0,40.5 -35.1,20.25 -35.1,-20.25"
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                            strokeWidth="1"
                          />
            </g>
          </svg>
        </div>
                    <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center"><div className="w-2 h-2 bg-blue-500 opacity-50 mr-1"></div>Team Avg</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-red-500 opacity-50 mr-1"></div>Priya Sharma</div>
          </div>
          </div>
        </div>
      </div>

              {/* Content Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Content Analysis
        </h4>
                <div className="space-y-4">
                  {[
                    { label: 'Product Knowledge', value: 92, color: 'bg-green-500' },
                    { label: 'Objection Handling', value: 87, color: 'bg-blue-500' },
                    { label: 'Closing Techniques', value: 78, color: 'bg-yellow-500' },
                    { label: 'Follow-up Quality', value: 95, color: 'bg-green-500' }
        ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm font-medium">{item.label}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-6">
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
              
              {/* Sentiment Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
          Sentiment Distribution
        </h4>
        <div className="space-y-4">
          {[
            { label: 'Positive', value: 68, color: 'bg-green-500' },
            { label: 'Neutral', value: 24, color: 'bg-yellow-500' },
            { label: 'Negative', value: 8, color: 'bg-red-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium">{item.label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6">
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
          )}
          </div>
      </div>

        {/* Third Row: Activity and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-orange-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-end mb-6">
              <div className="flex items-center space-x-2">
                <Move className="w-4 h-4 text-gray-400" />
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
              </div>
          <div className="space-y-4">
              {[
                { type: 'call', agent: 'Priya Sharma', action: 'completed a call', time: '2 min ago', status: 'success' },
                { type: 'coaching', agent: 'Arjun Patel', action: 'received coaching feedback', time: '5 min ago', status: 'info' },
                { type: 'achievement', agent: 'Kavya Reddy', action: 'achieved monthly target', time: '1 hour ago', status: 'success' },
                { type: 'alert', agent: 'Sneha Gupta', action: 'needs attention', time: '2 hours ago', status: 'warning' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {activity.type === 'call' && <MessageSquare className="w-4 h-4 text-green-600" />}
                    {activity.type === 'coaching' && <Target className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'achievement' && <Award className="w-4 h-4 text-green-600" />}
                    {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{activity.agent}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
            </div>
        </div>

          {/* Agent Performance Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Top Performers</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-end mb-6">
              <div className="flex items-center space-x-2">
                <Move className="w-4 h-4 text-gray-400" />
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            <div className="space-y-3">
          {agents.map((agent, index) => (
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
                    <div className="text-lg font-bold text-gray-900">{agent.score}</div>
                    <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          ))}
        </div>
              </div>
      </div>
          </div>
          
        {/* Fourth Row: Coaching Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">Coaching Recommendations</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-end mb-6">
            <div className="flex items-center space-x-2">
              <Move className="w-4 h-4 text-gray-400" />
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                agent: 'Sneha Gupta', 
                issue: 'High interruption rate', 
                recommendation: 'Practice active listening techniques',
                priority: 'high',
                impact: 'Could improve customer satisfaction by 15%'
              },
              { 
                agent: 'Vikram Singh', 
                issue: 'Long monologues', 
                recommendation: 'Use more open-ended questions',
                priority: 'medium',
                impact: 'Could increase engagement by 20%'
              },
              { 
                agent: 'Arjun Patel', 
                issue: 'Low closing rate', 
                recommendation: 'Focus on objection handling',
                priority: 'high',
                impact: 'Could boost conversion by 25%'
              }
            ].map((rec, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-blue-900">{rec.agent}</div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {rec.priority}
                  </span>
            </div>
                <div className="text-sm text-blue-800 mb-2">{rec.issue}</div>
                <div className="text-sm text-blue-700 mb-3">{rec.recommendation}</div>
                <div className="text-xs text-blue-600">{rec.impact}</div>
              </div>
            ))}
          </div>
            </div>
        </div>
      </div>

      {/* Advanced Filters Side Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto h-full">
              {/* Date Range */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">From</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                    <label className="block text-xs text-gray-600 mb-1">To</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
            </div>

              {/* Performance Metrics */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Performance Metrics</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Min Score</span>
                    <input type="number" placeholder="80" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
            </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Min Calls</span>
                    <input type="number" placeholder="30" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
          </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Min Satisfaction</span>
                    <input type="number" placeholder="4.0" step="0.1" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
        </div>
      </div>
            </div>
            
              {/* Call Quality Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Call Quality</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Max Interruptions</span>
                    <input type="number" placeholder="3" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
            </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Max Monologues</span>
                    <input type="number" placeholder="4" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
            </div>
              <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Talk Ratio Range</span>
                    <div className="flex space-x-1">
                      <input type="number" placeholder="40" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                      <span className="text-sm text-gray-500">-</span>
                      <input type="number" placeholder="70" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
            </div>
              </div>
              </div>
              
              {/* Campaign Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Campaigns</label>
                <div className="space-y-2">
                  {['Q4 Push', 'Holiday Special', 'New Product Launch', 'Retention Campaign'].map(campaign => (
                    <label key={campaign} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">{campaign}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                  Apply Filters
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Agent Details</h3>
                <button 
                onClick={() => setShowAgentDetails(false)}
                className="p-1 hover:bg-gray-100 rounded"
                >
                <X className="w-5 h-5" />
                </button>
              </div>
            <div className="p-6 space-y-6 overflow-y-auto h-full">
              {/* Agent Profile */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedAgent.name}</h4>
                <p className="text-sm text-gray-600">Senior Sales Agent</p>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedAgent.score}</div>
                  <div className="text-sm text-blue-700">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedAgent.calls}</div>
                  <div className="text-sm text-green-700">Total Calls</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{selectedAgent.satisfaction}</div>
                  <div className="text-sm text-yellow-700">Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedAgent.talkRatio}%</div>
                  <div className="text-sm text-purple-700">Talk Ratio</div>
                </div>
              </div>
              
              {/* Performance Breakdown */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Performance Breakdown</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Interruptions per call</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedAgent.interruptions <= 1 ? 'bg-green-100 text-green-700' :
                      selectedAgent.interruptions <= 2 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedAgent.interruptions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monologues per call</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedAgent.monologues <= 2 ? 'bg-green-100 text-green-700' :
                      selectedAgent.monologues <= 3 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedAgent.monologues}
                    </span>
                  </div>
                  </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h5>
                <div className="space-y-2">
                  {[
                    { action: 'Completed call with high satisfaction', time: '2 hours ago', status: 'success' },
                    { action: 'Received coaching feedback', time: '1 day ago', status: 'info' },
                    { action: 'Achieved weekly target', time: '2 days ago', status: 'success' },
                    { action: 'Attended training session', time: '3 days ago', status: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-900">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Coaching Session
                </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    View Call History
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

