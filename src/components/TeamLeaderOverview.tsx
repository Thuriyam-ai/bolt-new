import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Star, 
  Phone, 
  MessageSquare,
  Filter,
  Search,
  ChevronDown,
  X,
  BarChart3,
  PieChart,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  User,
  Award,
  TrendingDown
} from 'lucide-react';

export function TeamLeaderOverview() {
  const [showInsights, setShowInsights] = useState(false);
  const [activeInsightTab, setActiveInsightTab] = useState('flow');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const agents = [
    { id: 1, name: 'Priya Sharma', score: 94.5, calls: 52, satisfaction: 4.8, talkRatio: 58, interruptions: 1, monologues: 2.3 },
    { id: 2, name: 'Arjun Patel', score: 92.1, calls: 48, satisfaction: 4.7, talkRatio: 62, interruptions: 2, monologues: 3.1 },
    { id: 3, name: 'Kavya Reddy', score: 89.8, calls: 45, satisfaction: 4.6, talkRatio: 55, interruptions: 0, monologues: 1.8 },
    { id: 4, name: 'Sneha Gupta', score: 87.2, calls: 41, satisfaction: 4.5, talkRatio: 65, interruptions: 3, monologues: 4.2 },
    { id: 5, name: 'Vikram Singh', score: 85.6, calls: 39, satisfaction: 4.3, talkRatio: 68, interruptions: 4, monologues: 5.1 }
  ];

  const renderFlowTab = () => (
    <div className="space-y-8">
      {/* FR-DV-4.5: Distribution Plots - Box Plot for Talk Ratios */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Talk Ratio Distribution (Box Plot)
        </h4>
        <div className="relative h-64">
          <svg width="100%" height="100%" viewBox="0 0 600 200">
            {/* Box plot visualization */}
            <g transform="translate(50, 20)">
              {/* Y-axis */}
              <line x1="0" y1="0" x2="0" y2="160" stroke="#374151" strokeWidth="2"/>
              {/* X-axis */}
              <line x1="0" y1="160" x2="500" y2="160" stroke="#374151" strokeWidth="2"/>
              
              {/* Box plot elements */}
              <g transform="translate(200, 40)">
                {/* Whiskers */}
                <line x1="0" y1="60" x2="200" y2="60" stroke="#6b7280" strokeWidth="2"/>
                <line x1="0" y1="50" x2="0" y2="70" stroke="#6b7280" strokeWidth="2"/>
                <line x1="200" y1="50" x2="200" y2="70" stroke="#6b7280" strokeWidth="2"/>
                
                {/* Box */}
                <rect x="50" y="40" width="100" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                
                {/* Median line */}
                <line x1="90" y1="40" x2="90" y2="80" stroke="#1d4ed8" strokeWidth="3"/>
                
                {/* Outliers */}
                <circle cx="220" cy="60" r="3" fill="#ef4444"/>
                <circle cx="240" cy="60" r="3" fill="#ef4444"/>
              </g>
              
              {/* Labels */}
              <text x="50" y="180" textAnchor="middle" className="text-sm fill-gray-600">40%</text>
              <text x="150" y="180" textAnchor="middle" className="text-sm fill-gray-600">55%</text>
              <text x="250" y="180" textAnchor="middle" className="text-sm fill-gray-600">65%</text>
              <text x="350" y="180" textAnchor="middle" className="text-sm fill-gray-600">75%</text>
              <text x="450" y="180" textAnchor="middle" className="text-sm fill-gray-600">85%</text>
            </g>
          </svg>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center"><div className="w-3 h-3 bg-blue-100 border-2 border-blue-500 mr-2"></div>Q1-Q3 Range</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-blue-600 mr-2"></div>Median</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>Outliers</div>
          </div>
        </div>
      </div>

      {/* FR-DV-4.6: Leaderboards for Coaching */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monologue Frequency Leaderboard */}
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
            Monologue Frequency Leaderboard
          </h4>
          <div className="space-y-3">
            {agents.sort((a, b) => a.monologues - b.monologues).map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium">{agent.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">{agent.monologues}/call</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agent.monologues <= 2 ? 'bg-green-100 text-green-700' :
                    agent.monologues <= 3 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {agent.monologues <= 2 ? 'Excellent' : agent.monologues <= 3 ? 'Good' : 'Needs Coaching'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interruption Rate Leaderboard */}
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Interruption Rate Leaderboard
          </h4>
          <div className="space-y-3">
            {agents.sort((a, b) => a.interruptions - b.interruptions).map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium">{agent.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">{agent.interruptions}/call</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agent.interruptions <= 1 ? 'bg-green-100 text-green-700' :
                    agent.interruptions <= 2 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {agent.interruptions <= 1 ? 'Excellent' : agent.interruptions <= 2 ? 'Good' : 'Needs Coaching'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FR-DV-4.7: Radar Chart for Rep vs Team Average */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          Rep vs Team Average (Radar Chart)
        </h4>
        <div className="flex justify-center">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <g transform="translate(200, 200)">
              {/* Radar chart grid */}
              {[1, 2, 3, 4, 5].map(ring => (
                <polygon
                  key={ring}
                  points="0,-150 129.9,-75 129.9,75 0,150 -129.9,75 -129.9,-75"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  transform={`scale(${ring * 0.2})`}
                />
              ))}
              
              {/* Radar chart axes */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={150 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)}
                  y2={150 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {/* Team average (blue) */}
              <polygon
                points="0,-120 103.9,-60 103.9,60 0,120 -103.9,60 -103.9,-60"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* Individual agent (red) */}
              <polygon
                points="0,-135 116.9,-67.5 116.9,67.5 0,135 -116.9,67.5 -116.9,-67.5"
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                strokeWidth="2"
              />
              
              {/* Labels */}
              <text x="0" y="-170" textAnchor="middle" className="text-sm fill-gray-700">Talk Ratio</text>
              <text x="147" y="-85" textAnchor="start" className="text-sm fill-gray-700">Response Time</text>
              <text x="147" y="85" textAnchor="start" className="text-sm fill-gray-700">Resolution Rate</text>
              <text x="0" y="185" textAnchor="middle" className="text-sm fill-gray-700">Satisfaction</text>
              <text x="-147" y="85" textAnchor="end" className="text-sm fill-gray-700">Quality Score</text>
              <text x="-147" y="-85" textAnchor="end" className="text-sm fill-gray-700">Interruptions</text>
            </g>
          </svg>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 opacity-50 mr-2"></div>
            <span className="text-sm">Team Average</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 opacity-50 mr-2"></div>
            <span className="text-sm">Priya Sharma</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-8">
      {/* Topic Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-blue-600" />
          Topic Distribution
        </h4>
        <div className="flex justify-center">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <g transform="translate(150, 150)">
              {/* Pie slices */}
              <path d="M 0,-100 A 100,100 0 0,1 86.6,-50 L 0,0 Z" fill="#3b82f6" />
              <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50 L 0,0 Z" fill="#10b981" />
              <path d="M 86.6,50 A 100,100 0 0,1 0,100 L 0,0 Z" fill="#f59e0b" />
              <path d="M 0,100 A 100,100 0 0,1 -86.6,50 L 0,0 Z" fill="#ef4444" />
              <path d="M -86.6,50 A 100,100 0 0,1 0,-100 L 0,0 Z" fill="#8b5cf6" />
            </g>
          </svg>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 mr-2"></div>Technical Support (35%)</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 mr-2"></div>Billing (25%)</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 mr-2"></div>Product Info (20%)</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-red-500 mr-2"></div>Complaints (12%)</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 mr-2"></div>Sales (8%)</div>
        </div>
      </div>

      {/* Language Patterns Trend */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Language Patterns Over Time
        </h4>
        <div className="h-64">
          <svg width="100%" height="100%" viewBox="0 0 600 200">
            <g transform="translate(50, 20)">
              {/* Axes */}
              <line x1="0" y1="160" x2="500" y2="160" stroke="#374151" strokeWidth="2"/>
              <line x1="0" y1="0" x2="0" y2="160" stroke="#374151" strokeWidth="2"/>
              
              {/* Filler words trend */}
              <polyline
                points="0,120 70,110 140,100 210,95 280,85 350,80 420,75 490,70"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />
              
              {/* Interruptions trend */}
              <polyline
                points="0,140 70,135 140,130 210,125 280,115 350,110 420,105 490,100"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
              />
              
              {/* X-axis labels */}
              <text x="0" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 1</text>
              <text x="70" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 2</text>
              <text x="140" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 3</text>
              <text x="210" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 4</text>
              <text x="280" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 5</text>
              <text x="350" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 6</text>
              <text x="420" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 7</text>
            </g>
          </svg>
        </div>
        <div className="mt-4 flex space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-1 bg-red-500 mr-2"></div>
            <span className="text-sm">Filler Words/Call</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
            <span className="text-sm">Interruptions/Call</span>
          </div>
        </div>
      </div>

      {/* Script Adherence Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Opening Script', value: 92, color: 'text-green-600' },
          { label: 'Questioning Script', value: 87, color: 'text-yellow-600' },
          { label: 'Closing Script', value: 94, color: 'text-blue-600' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border text-center">
            <h5 className="font-medium mb-4">{item.label}</h5>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none"
                  className={item.color}
                  strokeDasharray={`${(item.value / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${item.color}`}>{item.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSentimentTab = () => (
    <div className="space-y-8">
      {/* Sentiment Distribution */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
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

      {/* Escalation Trends */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingDown className="w-5 h-5 mr-2 text-green-600" />
          Escalation Rate Trends
        </h4>
        <div className="h-64">
          <svg width="100%" height="100%" viewBox="0 0 600 200">
            <g transform="translate(50, 20)">
              {/* Axes */}
              <line x1="0" y1="160" x2="500" y2="160" stroke="#374151" strokeWidth="2"/>
              <line x1="0" y1="0" x2="0" y2="160" stroke="#374151" strokeWidth="2"/>
              
              {/* Escalation trend line */}
              <polyline
                points="0,40 70,50 140,45 210,35 280,30 350,25 420,20 490,15"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
              
              {/* Data points */}
              {[0, 70, 140, 210, 280, 350, 420, 490].map((x, i) => {
                const y = [40, 50, 45, 35, 30, 25, 20, 15][i];
                return <circle key={i} cx={x} cy={y} r="4" fill="#10b981" />;
              })}
              
              {/* X-axis labels */}
              <text x="0" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 1</text>
              <text x="140" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 3</text>
              <text x="280" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 5</text>
              <text x="420" y="180" textAnchor="middle" className="text-sm fill-gray-600">Week 7</text>
            </g>
          </svg>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Escalation rate decreased from 12% to 3% over 7 weeks</p>
        </div>
      </div>

      {/* Emotional Patterns Heatmap */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-600" />
          Emotional Intensity Heatmap
        </h4>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 100 }, (_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className="w-6 h-6 rounded-sm"
                style={{
                  backgroundColor: intensity > 0.7 ? '#ef4444' : 
                                 intensity > 0.4 ? '#f59e0b' : 
                                 intensity > 0.2 ? '#eab308' : '#22c55e'
                }}
                title={`Call ${i + 1}: ${(intensity * 100).toFixed(0)}% intensity`}
              />
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span>Low Frustration</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
          </div>
          <span>High Frustration</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Team Overview</h1>
            <p className="text-gray-600 text-lg">Comprehensive team performance analytics and insights</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              <span>Advanced Filters</span>
            </button>
            <button 
              onClick={() => setShowInsights(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 size={16} />
              <span>Insights</span>
            </button>
          </div>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents, campaigns, or metrics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Teams</option>
              <option>Customer Support</option>
              <option>Technical Support</option>
              <option>Sales Team</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Campaigns</option>
              <option>Holiday Sales</option>
              <option>Product Launch</option>
              <option>Customer Retention</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Team Performance Metrics</h3>
          <button 
            onClick={() => setShowInsights(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BarChart3 size={16} />
            <span>Insights</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
              <Users size={20} className="text-blue-500" />
            </div>
            <h4 className="text-gray-600 text-sm font-medium mb-1">Active Agents</h4>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500 mt-1">2 on break</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
              <TrendingUp size={20} className="text-emerald-500" />
            </div>
            <h4 className="text-gray-600 text-sm font-medium mb-1">Avg Performance</h4>
            <p className="text-3xl font-bold text-gray-900">89.8%</p>
            <p className="text-sm text-gray-500 mt-1">+2.3% from last week</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
              <Clock size={20} className="text-purple-500" />
            </div>
            <h4 className="text-gray-600 text-sm font-medium mb-1">Avg Response Time</h4>
            <p className="text-3xl font-bold text-gray-900">2.1min</p>
            <p className="text-sm text-gray-500 mt-1">Within target</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
              <Star size={20} className="text-yellow-500" />
            </div>
            <h4 className="text-gray-600 text-sm font-medium mb-1">Customer Satisfaction</h4>
            <p className="text-3xl font-bold text-gray-900">4.6/5</p>
            <p className="text-sm text-gray-500 mt-1">Excellent rating</p>
          </div>
        </div>
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h3>
        <div className="h-64 flex items-end space-x-2">
          {[85, 87, 89, 88, 92, 90, 94].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 bg-opacity-60 rounded-t-sm transition-all duration-500 hover:bg-opacity-80"
                style={{ 
                  height: `${value}%`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-gray-500 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
              <span className="text-xs text-gray-400">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Priya Sharma completed training</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New call quality threshold set</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertTriangle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">High call volume alert</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {agents.slice(0, 3).map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{agent.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{agent.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response Time</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium text-green-600">Good</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Uptime</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
                <span className="text-sm font-medium text-green-600">99.8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
                <span className="text-sm font-medium text-green-600">0.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Agent Performance Leaderboard</h3>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div 
              key={agent.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-500">{agent.calls} calls this week</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.score}%</p>
                  <p className="text-xs text-gray-500">Quality Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.satisfaction}</p>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.talkRatio}%</p>
                  <p className="text-xs text-gray-500">Talk Ratio</p>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Quality Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Call Quality Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Talk-to-Listen Ratio</h4>
            <p className="text-3xl font-bold text-blue-600 mb-2">62%</p>
            <p className="text-sm text-gray-600">Average across all agents</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Script Adherence</h4>
            <p className="text-3xl font-bold text-green-600 mb-2">91%</p>
            <p className="text-sm text-gray-600">Following protocols</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Interruption Rate</h4>
            <p className="text-3xl font-bold text-yellow-600 mb-2">2.1</p>
            <p className="text-sm text-gray-600">Per call average</p>
          </div>
        </div>
      </div>

      {/* Coaching Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Coaching Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Vikram Singh - Talk Ratio Coaching</h4>
              <p className="text-sm text-gray-600 mt-1">Agent has 68% talk ratio (target: {'<'}60%). Focus on active listening techniques.</p>
              <button className="text-sm text-yellow-700 font-medium mt-2 hover:text-yellow-800">
                Schedule Coaching Session →
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Sneha Gupta - Interruption Management</h4>
              <p className="text-sm text-gray-600 mt-1">High interruption rate (4/call). Review conversation flow and patience techniques.</p>
              <button className="text-sm text-red-700 font-medium mt-2 hover:text-red-800">
                View Call Examples →
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Priya Sharma - Excellent Performance</h4>
              <p className="text-sm text-gray-600 mt-1">Consistently high scores. Consider for mentoring role or advanced training.</p>
              <button className="text-sm text-green-700 font-medium mt-2 hover:text-green-800">
                Assign Mentoring Role →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance Leaderboard - REMOVED DUPLICATE */}
      {/* This section was duplicated, keeping only the one above */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Performance</h3>
          <p className="text-3xl font-bold text-gray-900">89.8%</p>
          <p className="text-sm text-gray-500 mt-1">+2.3% from last week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Clock size={20} className="text-purple-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Response Time</h3>
          <p className="text-3xl font-bold text-gray-900">2.1min</p>
          <p className="text-sm text-gray-500 mt-1">Within target</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Star size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Customer Satisfaction</h3>
          <p className="text-3xl font-bold text-gray-900">4.6/5</p>
          <p className="text-sm text-gray-500 mt-1">Excellent rating</p>
        </div>
      </div>

      {/* Agent Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Agent Performance Leaderboard</h3>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div 
              key={agent.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-500">{agent.calls} calls this week</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.score}%</p>
                  <p className="text-xs text-gray-500">Quality Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.satisfaction}</p>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.talkRatio}%</p>
                  <p className="text-xs text-gray-500">Talk Ratio</p>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Modal */}
      {showInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Team Insights & Analytics</h2>
              <button 
                onClick={() => setShowInsights(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex border-b">
              {[
                { id: 'flow', label: 'Flow', icon: Activity },
                { id: 'content', label: 'Content', icon: MessageSquare },
                { id: 'sentiment', label: 'Sentiment', icon: Star }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInsightTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeInsightTab === tab.id 
                      ? 'border-blue-500 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {activeInsightTab === 'flow' && renderFlowTab()}
              {activeInsightTab === 'content' && renderContentTab()}
              {activeInsightTab === 'sentiment' && renderSentimentTab()}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All Teams</option>
                  <option>Customer Support</option>
                  <option>Technical Support</option>
                  <option>Sales</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Range</label>
                <div className="flex space-x-2">
                  <input type="number" placeholder="Min %" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                  <input type="number" placeholder="Max %" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All Campaigns</option>
                  <option>Holiday Sales</option>
                  <option>Product Launch</option>
                  <option>Customer Retention</option>
                </select>
              </div>
              
              <div className="pt-4 border-t">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Details Drawer */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedAgent.name}</h3>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold">{selectedAgent.name}</h4>
                <p className="text-gray-600">Customer Support Agent</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{selectedAgent.score}%</p>
                  <p className="text-sm text-gray-600">Quality Score</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{selectedAgent.calls}</p>
                  <p className="text-sm text-gray-600">Total Calls</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{selectedAgent.satisfaction}</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{selectedAgent.talkRatio}%</p>
                  <p className="text-sm text-gray-600">Talk Ratio</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-3">Performance Metrics</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Interruptions/Call</span>
                    <span className="text-sm font-medium">{selectedAgent.interruptions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monologues/Call</span>
                    <span className="text-sm font-medium">{selectedAgent.monologues}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium">2.1 min</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-2">
                  View Detailed Analytics
                </button>
                <button className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50">
                  Schedule Coaching Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}