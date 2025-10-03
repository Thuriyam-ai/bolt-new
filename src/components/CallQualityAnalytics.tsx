import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Clock, 
  AlertTriangle,
  Filter,
  Search,
  Info,
  User,
  Target
} from 'lucide-react';
import { cqaConfigs } from '../data/cqaConfigs';
import { DashboardType } from '../types';

export function CallQualityAnalytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get dashboard type from URL or default to 'support'
  const dashboardTypeFromUrl = searchParams.get('type') as DashboardType;
  const [selectedDashboardType, setSelectedDashboardType] = useState<DashboardType>(
    dashboardTypeFromUrl && ['support', 'sales', 'customer-success'].includes(dashboardTypeFromUrl) 
      ? dashboardTypeFromUrl 
      : 'support'
  );
  
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [scoreRange, setScoreRange] = useState('All Scores');
  const [failureType, setFailureType] = useState('All Types');

  // Get current dashboard configuration
  const currentConfig = cqaConfigs[selectedDashboardType];
  const goals = currentConfig.goals;

  // Set default selected goal when dashboard type changes
  useEffect(() => {
    if (goals.length > 0 && (!selectedGoal || !goals.find(g => g.id === selectedGoal))) {
      setSelectedGoal(goals[0].id);
    }
  }, [selectedDashboardType, goals, selectedGoal]);

  const currentGoal = goals.find(goal => goal.id === selectedGoal);

  // Filter parameters based on search and filters
  const filteredParameters = currentGoal?.analytics.parameters.filter(param => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      param.parameter.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Score range filter
    const matchesScoreRange = scoreRange === 'All Scores' || 
      (scoreRange === '90-100%' && param.adherence >= 90) ||
      (scoreRange === '80-89%' && param.adherence >= 80 && param.adherence < 90) ||
      (scoreRange === '70-79%' && param.adherence >= 70 && param.adherence < 80) ||
      (scoreRange === 'Below 70%' && param.adherence < 70);
    
    // Failure type filter
    const scorecardParam = currentGoal?.scorecard.find(p => p.parameter === param.parameter);
    const matchesFailureType = failureType === 'All Types' ||
      (failureType === 'Fatal Only' && scorecardParam?.failureType === 'Fatal') ||
      (failureType === 'Non-Fatal Only' && scorecardParam?.failureType === 'Non-Fatal');
    
    return matchesSearch && matchesScoreRange && matchesFailureType;
  }) || [];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Call Quality Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                {selectedDashboardType === 'support' && 'Customer support call quality and resolution metrics'}
                {selectedDashboardType === 'sales' && 'Sales performance analytics and conversion insights'}
                {selectedDashboardType === 'customer-success' && 'Customer health monitoring and expansion opportunities'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Dashboard Type:</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              selectedDashboardType === 'support' ? 'bg-blue-100 text-blue-700' :
              selectedDashboardType === 'sales' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {selectedDashboardType === 'support' ? 'Support' :
               selectedDashboardType === 'sales' ? 'Sales' : 'Customer Success'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <div className="bg-white px-12 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search parameters, agents, or scores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedAgent} 
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All Agents">All Agents</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Arjun Patel">Arjun Patel</option>
              <option value="Kavya Reddy">Kavya Reddy</option>
            </select>
            <select 
              value={selectedDateRange} 
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Custom Range">Custom Range</option>
            </select>
            <select 
              value={scoreRange} 
              onChange={(e) => setScoreRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All Scores">All Scores</option>
              <option value="90-100%">90-100%</option>
              <option value="80-89%">80-89%</option>
              <option value="70-79%">70-79%</option>
              <option value="Below 70%">Below 70%</option>
            </select>
            <select 
              value={failureType} 
              onChange={(e) => setFailureType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All Types">All Types</option>
              <option value="Fatal Only">Fatal Only</option>
              <option value="Non-Fatal Only">Non-Fatal Only</option>
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">

      {/* Goal Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Goal Selection</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedGoal === goal.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                {selectedGoal === goal.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {goal.scorecard.length} parameters
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {goal.analytics.totalCalls} calls
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Goal Info */}
      {currentGoal && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Current Goal: {currentGoal.name}
              </h3>
            <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Total Parameters:</strong> {currentGoal.scorecard.length} scoring criteria</p>
                <p><strong>Total Score:</strong> {currentGoal.scorecard.reduce((sum, param) => sum + param.maxScore, 0)} points</p>
                <p><strong>Fatal Parameters:</strong> {currentGoal.scorecard.filter(p => p.failureType === 'Fatal').length} critical criteria</p>
                <p><strong>Scoring Rules:</strong> Fatal errors = 30-75% reduction, Non-fatal errors = 10-20% reduction</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Overall Dashboard Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${
              selectedDashboardType === 'support' ? 'bg-blue-500' :
              selectedDashboardType === 'sales' ? 'bg-green-500' : 'bg-purple-500'
            }`}>
              <BarChart3 size={20} className={
                selectedDashboardType === 'support' ? 'text-blue-500' :
                selectedDashboardType === 'sales' ? 'text-green-500' : 'text-purple-500'
              } />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Overall Score</h3>
          <p className={`text-4xl font-bold ${
            selectedDashboardType === 'support' ? 'text-blue-600' :
            selectedDashboardType === 'sales' ? 'text-green-600' : 'text-purple-600'
          }`}>{currentConfig.analytics.overallScore}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${
              selectedDashboardType === 'support' ? 'bg-green-500' :
              selectedDashboardType === 'sales' ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              <Phone size={20} className={
                selectedDashboardType === 'support' ? 'text-green-500' :
                selectedDashboardType === 'sales' ? 'text-blue-500' : 'text-green-500'
              } />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Calls</h3>
          <p className={`text-4xl font-bold ${
            selectedDashboardType === 'support' ? 'text-green-600' :
            selectedDashboardType === 'sales' ? 'text-blue-600' : 'text-green-600'
          }`}>{currentConfig.analytics.totalCalls}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500 bg-opacity-10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Fatal Errors</h3>
          <p className="text-4xl font-bold text-red-600">{currentConfig.analytics.fatalErrors}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${
              selectedDashboardType === 'support' ? 'bg-blue-500' :
              selectedDashboardType === 'sales' ? 'bg-green-500' : 'bg-purple-500'
            }`}>
              <Clock size={20} className={
                selectedDashboardType === 'support' ? 'text-blue-500' :
                selectedDashboardType === 'sales' ? 'text-green-500' : 'text-purple-500'
              } />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Call Duration</h3>
          <p className={`text-4xl font-bold ${
            selectedDashboardType === 'support' ? 'text-blue-600' :
            selectedDashboardType === 'sales' ? 'text-green-600' : 'text-purple-600'
          }`}>{currentConfig.analytics.avgDuration}</p>
        </div>
      </div>

      {/* Specialized Metrics for Dashboard Type */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Target className={`w-6 h-6 ${
              selectedDashboardType === 'support' ? 'text-blue-600' :
              selectedDashboardType === 'sales' ? 'text-green-600' : 'text-purple-600'
            }`} />
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedDashboardType === 'support' ? 'Support Performance Metrics' :
               selectedDashboardType === 'sales' ? 'Sales Performance Metrics' : 
               'Customer Success Metrics'}
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {currentConfig.specializedMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-opacity-10 mb-3 ${
                selectedDashboardType === 'support' ? 'bg-blue-500' :
                selectedDashboardType === 'sales' ? 'bg-green-500' : 'bg-purple-500'
              }`}>
                <BarChart3 size={20} className={
                  selectedDashboardType === 'support' ? 'text-blue-500' :
                  selectedDashboardType === 'sales' ? 'text-green-500' : 'text-purple-500'
                } />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
              <p className={`text-2xl font-bold ${
                selectedDashboardType === 'support' ? 'text-blue-600' :
                selectedDashboardType === 'sales' ? 'text-green-600' : 'text-purple-600'
              }`}>{metric.value}</p>
              <p className={`text-xs mt-1 ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call Quality Parameters Analysis */}
      {currentGoal && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentGoal.name} - Quality Parameters Analysis
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing {filteredParameters.length} of {currentGoal.analytics.parameters.length} parameters</span>
              {(searchQuery || scoreRange !== 'All Scores' || failureType !== 'All Types') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setScoreRange('All Scores');
                    setFailureType('All Types');
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Parameter</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Max Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Current Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Adherence %</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParameters.map((param, index) => {
                  const scorecardParam = currentGoal?.scorecard.find(p => p.parameter === param.parameter);
                  const progressColor = param.adherence >= 90 ? 'bg-green-500' : 
                                       param.adherence >= 80 ? 'bg-orange-500' : 'bg-red-500';
                  
                  return (
                    <tr key={index}>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{param.parameter}</p>
                          <p className="text-sm text-gray-500">{scorecardParam?.rules}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{param.maxScore}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          scorecardParam?.failureType === 'Fatal' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {scorecardParam?.failureType}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{param.currentScore}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${param.adherence}%` }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{param.adherence}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {param.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Agent Performance Summary */}
      {currentGoal && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Agent Performance Summary - {currentGoal.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Filtered by: {selectedAgent} • {selectedDateRange}</span>
            </div>
          </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Agent Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fatal Errors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Non-Fatal Errors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Calls</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {/* Mock agent data - in real app, this would be filtered by selected goal */}
              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Priya Sharma</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                    <span className={`text-lg font-semibold ${
                      currentGoal.analytics.overallScore >= 90 ? 'text-green-600' : 
                      currentGoal.analytics.overallScore >= 80 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {currentGoal.analytics.overallScore}%
                    </span>
                </td>
                  <td className="py-4 px-4 text-gray-700">{currentGoal.analytics.fatalErrors}</td>
                <td className="py-4 px-4 text-gray-700">2</td>
                  <td className="py-4 px-4 text-gray-700">{Math.floor(currentGoal.analytics.totalCalls * 0.3)}</td>
                <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      currentGoal.analytics.overallScore >= 90 
                        ? 'bg-green-100 text-green-700'
                        : currentGoal.analytics.overallScore >= 80 
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {currentGoal.analytics.overallScore >= 90 ? 'Excellent' : 
                       currentGoal.analytics.overallScore >= 80 ? 'Good' : 'Needs Improvement'}
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Arjun Patel</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                    <span className="text-lg font-semibold text-orange-600">
                      {(currentGoal.analytics.overallScore - 5).toFixed(1)}%
                    </span>
                </td>
                  <td className="py-4 px-4 text-gray-700">{currentGoal.analytics.fatalErrors + 1}</td>
                <td className="py-4 px-4 text-gray-700">3</td>
                  <td className="py-4 px-4 text-gray-700">{Math.floor(currentGoal.analytics.totalCalls * 0.25)}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-700">
                    Good
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Kavya Reddy</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                    <span className="text-lg font-semibold text-green-600">
                      {(currentGoal.analytics.overallScore + 7).toFixed(1)}%
                    </span>
                </td>
                <td className="py-4 px-4 text-gray-700">0</td>
                <td className="py-4 px-4 text-gray-700">1</td>
                  <td className="py-4 px-4 text-gray-700">{Math.floor(currentGoal.analytics.totalCalls * 0.45)}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                    Excellent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      )}
      </div>
    </div>
  );
}