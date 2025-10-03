import { useState, useEffect } from 'react';
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

// Define goal data structure
interface Goal {
  id: string;
  name: string;
  description: string;
  scorecard: {
    parameter: string;
    maxScore: number;
    failureType: 'Fatal' | 'Non-Fatal';
    rules: string;
  }[];
  analytics: {
    overallScore: number;
    totalCalls: number;
    fatalErrors: number;
    avgDuration: string;
    parameters: {
      parameter: string;
      maxScore: number;
      currentScore: number;
      adherence: number;
      trend: 'up' | 'down';
    }[];
  };
}

export function CallQualityAnalytics() {
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
  const [selectedGoal, setSelectedGoal] = useState<string>('lead-qualification');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [scoreRange, setScoreRange] = useState('All Scores');
  const [failureType, setFailureType] = useState('All Types');

  // Mock goals data - in real app, this would come from API
  useEffect(() => {
    const mockGoals: Goal[] = [
      {
        id: 'lead-qualification',
        name: 'Lead Qualification Assistant',
        description: 'Professional lead qualification with comprehensive scoring',
        scorecard: [
          {
            parameter: 'Call Opening Adherence',
            maxScore: 10,
            failureType: 'Non-Fatal',
            rules: 'Greet professionally, introduce with name, mention company, state purpose'
          },
          {
            parameter: 'Effective Questioning',
            maxScore: 25,
            failureType: 'Fatal',
            rules: 'Ask all mandatory questions clearly and appropriately'
          },
          {
            parameter: 'Budget & Timeline Assessment',
            maxScore: 20,
            failureType: 'Fatal',
            rules: 'Confirm budget range and implementation timeline'
          },
          {
            parameter: 'Decision Process Identification',
            maxScore: 15,
            failureType: 'Non-Fatal',
            rules: 'Identify key stakeholders and decision-making process'
          },
          {
            parameter: 'Needs Assessment',
            maxScore: 15,
            failureType: 'Fatal',
            rules: 'Understand current challenges and pain points'
          },
          {
            parameter: 'Professional Communication',
            maxScore: 10,
            failureType: 'Non-Fatal',
            rules: 'Maintain professional tone, avoid interruptions'
          },
          {
            parameter: 'Call Closing',
            maxScore: 5,
            failureType: 'Non-Fatal',
            rules: 'Thank prospect, summarize next steps, close professionally'
          }
        ],
        analytics: {
          overallScore: 87.2,
          totalCalls: 212,
          fatalErrors: 3,
          avgDuration: '8:45',
          parameters: [
            {
              parameter: 'Call Opening Adherence',
              maxScore: 10,
              currentScore: 8.4,
              adherence: 84,
              trend: 'down'
            },
            {
              parameter: 'Effective Questioning',
              maxScore: 25,
              currentScore: 20.3,
              adherence: 81,
              trend: 'down'
            },
            {
              parameter: 'Budget & Timeline Assessment',
              maxScore: 20,
              currentScore: 17.8,
              adherence: 89,
              trend: 'up'
            },
            {
              parameter: 'Decision Process Identification',
              maxScore: 15,
              currentScore: 13.2,
              adherence: 88,
              trend: 'up'
            },
            {
              parameter: 'Needs Assessment',
              maxScore: 15,
              currentScore: 14.1,
              adherence: 94,
              trend: 'up'
            },
            {
              parameter: 'Professional Communication',
              maxScore: 10,
              currentScore: 9.2,
              adherence: 92,
              trend: 'up'
            },
            {
              parameter: 'Call Closing',
              maxScore: 5,
              currentScore: 4.7,
              adherence: 94,
              trend: 'up'
            }
          ]
        }
      },
      {
        id: 'support-triage',
        name: 'Support Ticket Triage',
        description: 'Efficient ticket categorization and routing',
        scorecard: [
          {
            parameter: 'Issue Classification',
            maxScore: 30,
            failureType: 'Fatal',
            rules: 'Correctly categorize ticket type and priority level'
          },
          {
            parameter: 'Customer Information Gathering',
            maxScore: 20,
            failureType: 'Non-Fatal',
            rules: 'Collect relevant customer details and system information'
          },
          {
            parameter: 'Initial Resolution Attempt',
            maxScore: 25,
            failureType: 'Non-Fatal',
            rules: 'Attempt basic troubleshooting before escalation'
          },
          {
            parameter: 'Escalation Decision',
            maxScore: 15,
            failureType: 'Fatal',
            rules: 'Make appropriate escalation decisions based on complexity'
          },
          {
            parameter: 'Documentation Quality',
            maxScore: 10,
            failureType: 'Non-Fatal',
            rules: 'Provide clear, detailed ticket documentation'
          }
        ],
        analytics: {
          overallScore: 91.5,
          totalCalls: 156,
          fatalErrors: 1,
          avgDuration: '6:23',
          parameters: [
            {
              parameter: 'Issue Classification',
              maxScore: 30,
              currentScore: 27.9,
              adherence: 93,
              trend: 'up'
            },
            {
              parameter: 'Customer Information Gathering',
              maxScore: 20,
              currentScore: 18.4,
              adherence: 92,
              trend: 'up'
            },
            {
              parameter: 'Initial Resolution Attempt',
              maxScore: 25,
              currentScore: 22.8,
              adherence: 91,
              trend: 'down'
            },
            {
              parameter: 'Escalation Decision',
              maxScore: 15,
              currentScore: 14.2,
              adherence: 95,
              trend: 'up'
            },
            {
              parameter: 'Documentation Quality',
              maxScore: 10,
              currentScore: 9.5,
              adherence: 95,
              trend: 'up'
            }
          ]
        }
      },
      {
        id: 'feedback-collection',
        name: 'Customer Feedback Collection',
        description: 'Systematic feedback gathering and analysis',
        scorecard: [
          {
            parameter: 'Survey Introduction',
            maxScore: 15,
            failureType: 'Non-Fatal',
            rules: 'Clearly explain feedback purpose and process'
          },
          {
            parameter: 'Question Delivery',
            maxScore: 35,
            failureType: 'Fatal',
            rules: 'Ask all survey questions clearly and in correct order'
          },
          {
            parameter: 'Response Capture',
            maxScore: 25,
            failureType: 'Fatal',
            rules: 'Accurately record all customer responses'
          },
          {
            parameter: 'Follow-up Questions',
            maxScore: 15,
            failureType: 'Non-Fatal',
            rules: 'Ask appropriate clarifying questions when needed'
          },
          {
            parameter: 'Survey Completion',
            maxScore: 10,
            failureType: 'Non-Fatal',
            rules: 'Thank customer and provide next steps'
          }
        ],
        analytics: {
          overallScore: 89.3,
          totalCalls: 98,
          fatalErrors: 2,
          avgDuration: '12:15',
          parameters: [
            {
              parameter: 'Survey Introduction',
              maxScore: 15,
              currentScore: 13.5,
              adherence: 90,
              trend: 'up'
            },
            {
              parameter: 'Question Delivery',
              maxScore: 35,
              currentScore: 31.2,
              adherence: 89,
              trend: 'down'
            },
            {
              parameter: 'Response Capture',
              maxScore: 25,
              currentScore: 22.8,
              adherence: 91,
              trend: 'up'
            },
            {
              parameter: 'Follow-up Questions',
              maxScore: 15,
              currentScore: 13.4,
              adherence: 89,
              trend: 'up'
            },
            {
              parameter: 'Survey Completion',
              maxScore: 10,
              currentScore: 9.2,
              adherence: 92,
              trend: 'up'
            }
          ]
        }
      }
    ];
    setGoals(mockGoals);
  }, []);

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
              <p className="text-sm text-gray-600 mt-1">Comprehensive call quality metrics and performance analysis</p>
            </div>
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
      {currentGoal && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center">
              <BarChart3 size={20} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Overall Score</h3>
            <p className="text-4xl font-bold text-blue-600">{currentGoal.analytics.overallScore}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500 bg-opacity-10 flex items-center justify-center">
              <Phone size={20} className="text-green-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Calls</h3>
            <p className="text-4xl font-bold text-green-600">{currentGoal.analytics.totalCalls}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500 bg-opacity-10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Fatal Errors</h3>
            <p className="text-4xl font-bold text-red-600">{currentGoal.analytics.fatalErrors}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center">
              <Clock size={20} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Call Duration</h3>
            <p className="text-4xl font-bold text-blue-600">{currentGoal.analytics.avgDuration}</p>
          </div>
        </div>
      )}

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