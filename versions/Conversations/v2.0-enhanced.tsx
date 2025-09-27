import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  User, 
  Star,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  X,
  MoreHorizontal,
  Settings,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';

export function Conversations() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [widgetMenu, setWidgetMenu] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({
    performanceScore: true,
    callVolume: true
  });

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleExpandWidget = (widgetId) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
    setWidgetMenu(null);
  };

  const conversations = [
    {
      id: 1,
      agent: 'Priya Sharma',
      customer: 'Rajesh Gupta',
      type: 'Voice Call',
      category: 'Technical Support',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '8:45',
      status: 'Resolved',
      rating: 5.0,
      quality: 95,
      talkRatio: 58,
      interruptions: 1,
      summary: 'Customer had trouble with account login. Issue resolved by resetting password and updating security settings.',
      tags: ['Login Issue', 'Password Reset', 'Security']
    },
    {
      id: 2,
      agent: 'Kavya Reddy',
      customer: 'Amit Singh',
      type: 'Chat',
      category: 'Billing Support',
      date: '2024-01-15',
      time: '11:15 AM',
      duration: '6:32',
      status: 'Resolved',
      rating: 4.8,
      quality: 92,
      talkRatio: 62,
      interruptions: 0,
      summary: 'Billing inquiry about extra charges. Explained billing cycle and provided detailed breakdown.',
      tags: ['Billing', 'Charges', 'Explanation']
    },
    {
      id: 3,
      agent: 'Arjun Patel',
      customer: 'Sneha Iyer',
      type: 'Voice Call',
      category: 'Product Inquiry',
      date: '2024-01-15',
      time: '2:20 PM',
      duration: '12:18',
      status: 'In Progress',
      rating: null,
      quality: 88,
      talkRatio: 65,
      interruptions: 3,
      summary: 'Complex product inquiry requiring technical consultation. Escalated to product specialist.',
      tags: ['Product Info', 'Technical', 'Escalation']
    },
    {
      id: 4,
      agent: 'Sneha Gupta',
      customer: 'Vikram Mehta',
      type: 'Voice Call',
      category: 'Sales',
      date: '2024-01-15',
      time: '3:45 PM',
      duration: '15:22',
      status: 'Resolved',
      rating: 4.9,
      quality: 96,
      talkRatio: 55,
      interruptions: 0,
      summary: 'Sales consultation for premium plan. Customer upgraded to annual subscription.',
      tags: ['Sales', 'Upgrade', 'Premium Plan']
    }
  ];

  const transcript = [
    { speaker: 'Agent', text: 'Hello, this is Priya from customer support. How can I help you today?', time: '00:05', type: 'normal' },
    { speaker: 'Customer', text: 'Hi Priya, I\'m having trouble with my account login.', time: '00:12', type: 'normal' },
    { speaker: 'Agent', text: 'I understand your concern. Let me, um, check your account details.', time: '00:18', type: 'filler' },
    { speaker: 'System', text: '[PAUSE 3.5s]', time: '00:25', type: 'pause' },
    { speaker: 'Agent', text: 'I can see the issue here. Your password needs to be reset.', time: '00:28', type: 'normal' },
    { speaker: 'Customer', text: 'But I just changed it yesterday—', time: '00:35', type: 'interrupted' },
    { speaker: 'Agent', text: 'Sorry to interrupt, but let me explain what happened.', time: '00:36', type: 'interruption' }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header with Team Analytics Dashboard styling */}
      <div className="bg-white px-12 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conversation Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor and analyze team conversations with detailed insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar with chip styling */}
      <div className="bg-white px-12 py-6 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations, agents, or customers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium shadow-sm"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm">
                <option>All Agents</option>
                <option>Priya Sharma</option>
                <option>Kavya Reddy</option>
                <option>Arjun Patel</option>
                <option>Sneha Gupta</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm">
                <option>All Categories</option>
                <option>Technical Support</option>
                <option>Billing Support</option>
                <option>Sales</option>
                <option>Product Inquiry</option>
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

      <div className="px-12 py-8">

      {/* Conversation Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Total Conversations</h3>
              <div className="relative">
                <button 
                  onClick={() => setWidgetMenu(widgetMenu === 'conversations' ? null : 'conversations')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                {widgetMenu === 'conversations' && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
                <MessageSquare size={20} className="text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">1,247</p>
              <p className="text-sm text-gray-500">Today: 156 conversations</p>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+12.5%</span>
                <span className="text-gray-500 ml-1">vs yesterday</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-emerald-500">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Avg Response Time</h3>
              <div className="relative">
                <button 
                  onClick={() => setWidgetMenu(widgetMenu === 'response' ? null : 'response')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                {widgetMenu === 'response' && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
                <Clock size={20} className="text-emerald-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">2.3min</p>
              <p className="text-sm text-gray-500">15% faster than yesterday</p>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">-15%</span>
                <span className="text-gray-500 ml-1">improvement</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Satisfaction Score</h3>
              <div className="relative">
                <button 
                  onClick={() => setWidgetMenu(widgetMenu === 'satisfaction' ? null : 'satisfaction')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                {widgetMenu === 'satisfaction' && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
                <Star size={20} className="text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">4.7/5</p>
              <p className="text-sm text-gray-500">Based on 892 ratings</p>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+0.2</span>
                <span className="text-gray-500 ml-1">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-yellow-500">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Resolution Rate</h3>
              <div className="relative">
                <button 
                  onClick={() => setWidgetMenu(widgetMenu === 'resolution' ? null : 'resolution')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                {widgetMenu === 'resolution' && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
                <CheckCircle size={20} className="text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">87%</p>
              <p className="text-sm text-gray-500">First call resolution</p>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+3%</span>
                <span className="text-gray-500 ml-1">this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-indigo-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Conversations</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setWidgetMenu(widgetMenu === 'conversations-list' ? null : 'conversations-list')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                    {widgetMenu === 'conversations-list' && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </button>
                        <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </button>
                        <button 
                          onClick={() => handleExpandWidget('conversations-list')}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Maximize2 className="w-4 h-4 mr-2" />
                          Expand
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pb-4 border-b border-gray-200"></div>

            <div className="space-y-4">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedConversation?.id === conv.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{conv.category}</h4>
                        <p className="text-sm text-gray-500">Agent: {conv.agent}</p>
                        <p className="text-sm text-gray-500">Customer: {conv.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        conv.status === 'Resolved' 
                          ? 'bg-emerald-100 text-emerald-700'
                          : conv.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {conv.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{conv.summary}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      {conv.type === 'Voice Call' ? <Phone size={14} /> : <MessageSquare size={14} />}
                      <span>{conv.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{conv.duration}</span>
                    </div>
                    {conv.rating && (
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500" />
                        <span>{conv.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {conv.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    {conv.date} at {conv.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className="space-y-6">
              {/* Conversation Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {selectedConversation.category}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span>{selectedConversation.agent} with {selectedConversation.customer}</span>
                      <span>•</span>
                      <span>{selectedConversation.date} at {selectedConversation.time}</span>
                      <span>•</span>
                      <span>{selectedConversation.duration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          stroke={selectedConversation.talkRatio <= 60 ? "#10b981" : "#f59e0b"}
                          strokeWidth="4" 
                          fill="none"
                          strokeDasharray={`${(selectedConversation.talkRatio / 100) * 175.9} 175.9`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">{selectedConversation.talkRatio}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Talk-to-Listen Ratio</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedConversation.talkRatio <= 60 ? 'Good' : 'Needs Improvement'}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{selectedConversation.interruptions}</div>
                    <p className="text-xs text-gray-600">Interruptions</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedConversation.interruptions <= 1 ? 'Excellent' : 'Fair'}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{selectedConversation.quality}</div>
                    <p className="text-xs text-gray-600">Quality Score</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedConversation.quality >= 90 ? 'Excellent' : 'Good'}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {selectedConversation.rating ? (
                        <>
                          <Star size={20} className="text-yellow-500 mr-1" />
                          <span className="text-2xl font-bold text-gray-900">{selectedConversation.rating}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">-</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">Customer Rating</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedConversation.rating ? 'Rated' : 'Pending'}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {selectedConversation.status === 'Resolved' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : selectedConversation.status === 'In Progress' ? (
                        <Clock size={20} className="text-yellow-500" />
                      ) : (
                        <AlertTriangle size={20} className="text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">Status</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedConversation.status}</p>
                  </div>
                </div>
              </div>

              {/* Speaker Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Speaker Timeline</h4>
                <div className="relative">
                  <div className="flex h-8 rounded-lg overflow-hidden">
                    <div className="bg-blue-500 flex-1" style={{ flexBasis: '35%' }} title="Agent Speaking"></div>
                    <div className="bg-green-500 flex-1" style={{ flexBasis: '45%' }} title="Customer Speaking"></div>
                    <div className="bg-gray-300 flex-1" style={{ flexBasis: '10%' }} title="Silence"></div>
                    <div className="bg-blue-500 flex-1" style={{ flexBasis: '10%' }} title="Agent Speaking"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0:00</span>
                    <span>2:00</span>
                    <span>4:00</span>
                    <span>6:00</span>
                    <span>{selectedConversation.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Agent ({selectedConversation.talkRatio}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Customer ({100 - selectedConversation.talkRatio}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Silence</span>
                  </div>
                </div>
              </div>

              {/* Interactive Transcript */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Interactive Transcript Player</h4>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transcript.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <span className="text-xs text-gray-500 w-12 flex-shrink-0 mt-1 font-mono">{item.time}</span>
                      <div className="flex-1">
                        {item.type === 'pause' ? (
                          <div className="flex items-center space-x-2 text-gray-500 italic bg-gray-50 p-2 rounded">
                            <Clock size={14} />
                            <span>{item.text}</span>
                          </div>
                        ) : (
                          <div className="p-2 rounded">
                            <span className={`font-medium ${
                              item.speaker === 'Agent' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {item.speaker}:
                            </span>
                            <span className={`ml-2 ${
                              item.type === 'filler' ? 'bg-yellow-200 px-1 rounded' :
                              item.type === 'interruption' ? 'text-red-600 font-medium' :
                              item.type === 'interrupted' ? 'text-red-600' : ''
                            }`}>
                              {item.text}
                              {item.type === 'interruption' && (
                                <AlertTriangle size={14} className="inline ml-1 text-red-500" />
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Legend:</h5>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      <span>Filler Words</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={14} className="text-red-500" />
                      <span>Interruptions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-500" />
                      <span>Long Pauses</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Conversation Summary</h4>
                <p className="text-gray-700 mb-4">{selectedConversation.summary}</p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedConversation.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to view detailed analytics, transcript, and insights</p>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filters Side Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                      All Time
                    </button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 border border-blue-300">
                      Last 7 days
                    </button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 border border-blue-300">
                      Last 30 days
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                      This Month
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                      All Agents
                    </button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 border border-blue-300">
                      Priya Sharma
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                      Kavya Reddy
                    </button>
                    <button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 border border-purple-300">
                      Arjun Patel
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                      All Categories
                    </button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 border border-blue-300">
                      Technical Support
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                      Billing Support
                    </button>
                    <button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 border border-purple-300">
                      Sales
                    </button>
                    <button className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 border border-orange-300">
                      Product Inquiry
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                      All Status
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                      Resolved
                    </button>
                    <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 border border-yellow-300">
                      In Progress
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 border border-red-300">
                      Escalated
                    </button>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => toggleSection('performanceScore')}
                    className="flex items-center justify-between w-full text-xs font-medium text-gray-700 mb-2 hover:text-gray-900"
                  >
                    <span>Quality Score Range</span>
                    {collapsedSections.performanceScore ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {!collapsedSections.performanceScore && (
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                        All Scores
                      </button>
                      <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                        Excellent (90+)
                      </button>
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 border border-blue-300">
                        Good (70-89)
                      </button>
                      <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 border border-yellow-300">
                        Average (50-69)
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 border border-red-300">
                        Needs Improvement (&lt;50)
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => toggleSection('callVolume')}
                    className="flex items-center justify-between w-full text-xs font-medium text-gray-700 mb-2 hover:text-gray-900"
                  >
                    <span>Duration Range</span>
                    {collapsedSections.callVolume ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {!collapsedSections.callVolume && (
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 border border-indigo-300">
                        All Durations
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 border border-red-300">
                        Long (15+ min)
                      </button>
                      <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 border border-yellow-300">
                        Medium (5-15 min)
                      </button>
                      <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 border border-green-300">
                        Short (&lt;5 min)
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Filters
                  </button>
                  <button className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm">
                    Reset
                  </button>
                </div>
                
                <div className="border-b border-gray-200 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
