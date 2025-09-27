import { useState } from 'react';
import { 
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Download,
  MessageSquare,
  Clock,
  User,
  Phone,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  MoreHorizontal,
  Share2,
  Bookmark,
  RefreshCw,
  Settings,
  ChevronDown,
  ChevronRight,
  FileText,
  Calendar,
  Timer,
  Mic,
  VolumeX,
  Heart,
  CheckCircle,
  X
} from 'lucide-react';

interface ConversationDetailsProps {
  conversation: {
    id: number;
    agent: string;
    customer: string;
    type: string;
    category: string;
    date: string;
    time: string;
    duration: string;
    status: string;
    rating: number | null;
    quality: number;
    talkRatio: number;
    interruptions: number;
    summary: string;
    tags: string[];
    conversationId: string;
    owner: string;
    account: string;
    score: number;
    scoreTrend: 'up' | 'down' | 'stable';
    previousScore?: number;
  };
  onBack: () => void;
}

export function ConversationDetails({ conversation, onBack }: ConversationDetailsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [widgetMenu, setWidgetMenu] = useState<string | null>(null);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('stats');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [likedTranscriptEntries, setLikedTranscriptEntries] = useState<number[]>([]);
  const [showAuditorScoring, setShowAuditorScoring] = useState(false);
  const [auditorScores, setAuditorScores] = useState({
    communication: 0,
    productKnowledge: 0,
    customerService: 0,
    compliance: 0,
    technicalAccuracy: 0,
    salesEffectiveness: 0,
    problemResolution: 0,
    overall: 0,
    notes: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState(conversation.category);
  const [savedHumanScore, setSavedHumanScore] = useState<number | null>(null);

  // Get scoring template based on conversation category
  const getScoringTemplate = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical support':
        return {
          title: 'Technical Support Scoring',
          description: 'Evaluate technical assistance quality',
          criteria: [
            { key: 'communication', label: 'Communication', max: 25, description: 'Clarity in explaining technical solutions' },
            { key: 'technicalAccuracy', label: 'Technical Accuracy', max: 30, description: 'Correctness of technical information provided' },
            { key: 'problemResolution', label: 'Problem Resolution', max: 25, description: 'Effectiveness in solving customer issues' },
            { key: 'customerService', label: 'Customer Service', max: 20, description: 'Professionalism and empathy' }
          ]
        };
      case 'sales':
      case 'tech sales':
        return {
          title: 'Sales Performance Scoring',
          description: 'Evaluate sales effectiveness and techniques',
          criteria: [
            { key: 'communication', label: 'Communication', max: 25, description: 'Persuasive and clear communication' },
            { key: 'productKnowledge', label: 'Product Knowledge', max: 25, description: 'Understanding of products and features' },
            { key: 'salesEffectiveness', label: 'Sales Effectiveness', max: 30, description: 'Ability to close deals and handle objections' },
            { key: 'customerService', label: 'Customer Service', max: 20, description: 'Relationship building and trust' }
          ]
        };
      case 'customer success':
        return {
          title: 'Customer Success Scoring',
          description: 'Evaluate customer relationship management',
          criteria: [
            { key: 'communication', label: 'Communication', max: 25, description: 'Clear and helpful communication' },
            { key: 'customerService', label: 'Customer Service', max: 30, description: 'Proactive support and satisfaction' },
            { key: 'problemResolution', label: 'Problem Resolution', max: 25, description: 'Quick and effective issue resolution' },
            { key: 'compliance', label: 'Compliance', max: 20, description: 'Following company policies and procedures' }
          ]
        };
      default:
        return {
          title: 'General Conversation Scoring',
          description: 'Evaluate overall conversation quality',
          criteria: [
            { key: 'communication', label: 'Communication', max: 25, description: 'Clear and professional communication' },
            { key: 'productKnowledge', label: 'Product Knowledge', max: 25, description: 'Knowledge of products and services' },
            { key: 'customerService', label: 'Customer Service', max: 25, description: 'Helpfulness and professionalism' },
            { key: 'compliance', label: 'Compliance', max: 25, description: 'Following guidelines and procedures' }
          ]
        };
    }
  };

  const scoringTemplate = getScoringTemplate(selectedTemplate);

  // Reset scores when template changes
  const handleTemplateChange = (newTemplate: string) => {
    setSelectedTemplate(newTemplate);
    // Reset all scores to 0 when template changes
    setAuditorScores({
      communication: 0,
      productKnowledge: 0,
      customerService: 0,
      compliance: 0,
      technicalAccuracy: 0,
      salesEffectiveness: 0,
      problemResolution: 0,
      overall: 0,
      notes: auditorScores.notes // Keep notes
    });
  };

  const handleExpandWidget = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
    setWidgetMenu(null);
  };

  const handleWidgetAction = (widgetId: string, action: string) => {
    console.log(`Widget ${widgetId} action: ${action}`);
    setWidgetMenu(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  // Mock transcript data with sentiment
  const transcriptData = [
    { time: "0:00", speaker: "Agent", text: "Hello! This is Testbot from Creditmann. I wanted to talk to you about a loan offer that might interest you. Would you like to receive the details via SMS?", sentiment: "neutral" },
    { time: "0:11", speaker: "Customer", text: "Yes, I would be interested in hearing more about the loan offer.", sentiment: "positive" },
    { time: "0:18", speaker: "Agent", text: "Great! I'll send you the details via SMS. Can you confirm your mobile number?", sentiment: "positive" },
    { time: "0:25", speaker: "Customer", text: "Yes, it's +919482540097", sentiment: "neutral" },
    { time: "0:30", speaker: "Agent", text: "Perfect! I've sent you the loan details via SMS. The offer includes a personal loan of up to ₹5 lakhs with competitive interest rates.", sentiment: "positive" },
    { time: "0:45", speaker: "Customer", text: "That sounds good. What are the interest rates?", sentiment: "positive" },
    { time: "0:50", speaker: "Agent", text: "The interest rates start from 10.99% per annum for eligible customers. The exact rate will be determined based on your credit profile.", sentiment: "neutral" },
    { time: "1:05", speaker: "Customer", text: "How long does the approval process take?", sentiment: "neutral" },
    { time: "1:10", speaker: "Agent", text: "The approval process typically takes 24-48 hours for eligible customers. You'll receive an SMS confirmation once approved.", sentiment: "neutral" },
    { time: "1:25", speaker: "Customer", text: "That's quick. I'll wait for the SMS with the details.", sentiment: "positive" },
    { time: "1:30", speaker: "Agent", text: "Excellent! Is there anything else I can help you with today?", sentiment: "positive" },
    { time: "1:35", speaker: "Customer", text: "No, that's all. Thank you for the information.", sentiment: "positive" },
    { time: "1:40", speaker: "Agent", text: "You're welcome! Have a great day and thank you for choosing Creditmann!", sentiment: "positive" }
  ];

  const toggleLike = (index: number) => {
    setLikedTranscriptEntries(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredTranscriptData = transcriptData.filter(item => 
    selectedSentiment === 'all' || item.sentiment === selectedSentiment
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="bg-white px-12 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Conversations</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{conversation.type} to {conversation.customer}</h1>
              <p className="text-sm text-gray-600 mt-1">{conversation.conversationId} • {conversation.date} at {conversation.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Audio Player and Transcript */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Player */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Audio Player</h3>
                    <p className="text-sm text-gray-600">Conversation Recording</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              {/* Audio Player Controls */}
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 text-gray-900" /> : <Play className="w-5 h-5 text-gray-900 ml-0.5" />}
                    </button>
                    <div className="text-white">
                      <div className="text-sm font-medium">Conversation Recording</div>
                      <div className="text-xs text-gray-400">{formatTime(currentTime)} / {formatTime(duration)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={toggleMute} className="text-white hover:text-gray-300">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20"
                    />
                    <button className="text-white hover:text-gray-300">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Transcript</h3>
                    <p className="text-sm text-gray-600">Conversation Text</p>
                  </div>
                </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedSentiment}
                  onChange={(e) => setSelectedSentiment(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              </div>

              {/* Transcript Content */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredTranscriptData.map((item, originalIndex) => {
                  const actualIndex = transcriptData.findIndex(t => t === item);
                  return (
                    <div key={actualIndex} className="flex space-x-4 p-3 rounded-lg hover:bg-gray-50 group">
                      <div className="text-sm text-gray-500 font-mono min-w-[3rem]">{item.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {item.speaker === 'Agent' ? conversation.agent : item.speaker}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {item.speaker === 'Agent' ? 'Agent' : 'Customer'}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                            item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.sentiment}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{item.text}</p>
                      </div>
                      <button
                        onClick={() => toggleLike(actualIndex)}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full ${
                          likedTranscriptEntries.includes(actualIndex) 
                            ? 'text-red-500 bg-red-50' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedTranscriptEntries.includes(actualIndex) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column - Analysis Tabs */}
          <div className="lg:col-span-3">
            {/* Analysis Tabs Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-indigo-500 p-6">
              <div className="flex space-x-1 mb-6">
                <button
                  onClick={() => setActiveAnalysisTab('stats')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeAnalysisTab === 'stats'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Stats
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('ai-insights')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeAnalysisTab === 'ai-insights'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  AI Insights
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('snippets')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeAnalysisTab === 'snippets'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Snippets
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('topics')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeAnalysisTab === 'topics'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Topics
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('auditor')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeAnalysisTab === 'auditor'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Audit
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeAnalysisTab === 'stats' && (
                  <>
                    {/* Conversation Score */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Score</h4>
                            <p className="text-xs text-gray-600">Overall Quality Assessment</p>
                          </div>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
                          conversation.score >= 90 ? 'bg-green-500' :
                          conversation.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {conversation.score}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          {savedHumanScore !== null ? (
                            <div className="flex justify-center space-x-3 mb-2">
                              {/* AI Score */}
                              <div className="text-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                  <Activity className="w-4 h-4 text-white" />
                                </div>
                                <div className={`text-sm font-bold ${
                                  conversation.score >= 90 ? 'text-green-600' :
                                  conversation.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {conversation.score}
                                </div>
                              </div>
                              {/* Human Score */}
                              <div className="text-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <div className={`text-sm font-bold ${
                                  savedHumanScore >= 90 ? 'text-green-600' :
                                  savedHumanScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {savedHumanScore}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Activity className="w-4 h-4 text-white" />
                              </div>
                              <div className={`text-sm font-bold ml-2 ${
                                conversation.score >= 90 ? 'text-green-600' :
                                conversation.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {conversation.score}
                              </div>
                            </div>
                          )}
                          <div className="text-xs text-gray-600">Agent Score</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{conversation.rating || 'N/A'}</div>
                          <div className="text-xs text-gray-600">Customer Rating</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-green-600">{conversation.status}</div>
                          <div className="text-xs text-gray-600">Status</div>
                        </div>
                      </div>
                    </div>

                    {/* Call Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Talk Ratio</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{conversation.talkRatio}%</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Timer className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Duration</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{conversation.duration}</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mic className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Interruptions</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{conversation.interruptions}</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Category</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{conversation.category}</div>
                      </div>
                    </div>

                    {/* Agent Performance */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Agent Performance</h4>
                          <p className="text-xs text-gray-600">{conversation.owner}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Quality Score</span>
                          <div className="flex items-center space-x-2">
                            {conversation.scoreTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {conversation.scoreTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                            {conversation.scoreTrend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                            <span className="text-sm font-semibold">{conversation.quality}/100</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Call Efficiency</span>
                          <span className="text-sm font-semibold text-green-600">High</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Customer Satisfaction</span>
                          <span className="text-sm font-semibold">{conversation.rating || 'N/A'}/5</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeAnalysisTab === 'ai-insights' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">AI Insights</h4>
                          <p className="text-xs text-gray-600">Automated Analysis</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-sm font-medium text-gray-900 mb-1">Key Topics Identified</div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Loan Offer</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">SMS Details</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Interest Rates</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Approval Process</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-sm font-medium text-gray-900 mb-1">Sentiment Analysis</div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">0</div>
                              <div className="text-xs text-gray-600">Positive</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-yellow-600">3</div>
                              <div className="text-xs text-gray-600">Neutral</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">3</div>
                              <div className="text-xs text-gray-600">Negative</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'snippets' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Conversation Snippets</h4>
                          <p className="text-xs text-gray-600">Key Moments</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border-l-4 border-l-blue-500">
                          <div className="text-xs text-gray-500 mb-1">0:00 - Agent</div>
                          <div className="text-sm text-gray-700">"Hello! This is Testbot from Creditmann. I wanted to talk to you about a loan offer..."</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border-l-4 border-l-green-500">
                          <div className="text-xs text-gray-500 mb-1">0:11 - Customer</div>
                          <div className="text-sm text-gray-700">"Yes, I would be interested in hearing more about the loan offer."</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border-l-4 border-l-purple-500">
                          <div className="text-xs text-gray-500 mb-1">1:05 - Customer</div>
                          <div className="text-sm text-gray-700">"How long does the approval process take?"</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'topics' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Topic Analysis</h4>
                          <p className="text-xs text-gray-600">Conversation Themes</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Loan Information</span>
                            <span className="text-xs text-gray-500">45%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Customer Queries</span>
                            <span className="text-xs text-gray-500">30%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Process Details</span>
                            <span className="text-xs text-gray-500">25%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{width: '25%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'auditor' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{scoringTemplate.title}</h4>
                          <p className="text-xs text-gray-600">{scoringTemplate.description}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-gray-400 mb-2">No Score</div>
                          <p className="text-sm text-gray-600 mb-4">
                            This conversation has not been manually scored yet
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <span className="text-gray-700">Pending Review</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-blue-600" />
                              <span className="text-gray-700">{conversation.score}/100</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-700">Never</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-4 h-4 text-purple-600" />
                              <span className="text-gray-700">{conversation.type}</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center space-x-2">
                              <Timer className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{conversation.duration}</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <span className="text-gray-700">{conversation.agent}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <button
                            onClick={() => setShowAuditorScoring(true)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Score This Conversation
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          Manual scoring will be used to reconcile with AI-generated scores
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Post Call Summary Analysis - Full Width */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-emerald-500 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Post Call Summary</h3>
                  <p className="text-sm text-gray-600">AI-Generated Analysis</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Key Points */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Key Points Discussed</span>
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Customer expressed interest in personal loan offer from Creditmann</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Loan details sent via SMS to customer's mobile number (+919482540097)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interest rates start from 10.99% per annum for eligible customers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Approval process typically takes 24-48 hours</span>
                  </li>
                </ul>
              </div>

              {/* Customer Sentiment */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-green-600" />
                  <span>Customer Sentiment</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <div className="text-xl font-bold text-green-600">6</div>
                    <div className="text-xs text-gray-600">Positive</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-yellow-600">4</div>
                    <div className="text-xs text-gray-600">Neutral</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-600">0</div>
                    <div className="text-xs text-gray-600">Negative</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Overall:</span> Customer showed strong interest and positive engagement throughout the conversation.
                  </p>
                </div>
              </div>

              {/* Action Items */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span>Action Items</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-white rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">SMS sent with loan details</span>
                    <span className="text-xs text-green-600 font-medium ml-auto">Completed</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Monitor customer response</span>
                    <span className="text-xs text-yellow-600 font-medium ml-auto">Pending</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Follow up in 24-48h</span>
                    <span className="text-xs text-blue-600 font-medium ml-auto">Scheduled</span>
                  </div>
                </div>
              </div>

              {/* Conversation Quality */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span>Quality Assessment</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg font-bold text-green-600">Excellent</div>
                    <div className="text-xs text-gray-600">Agent Performance</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg font-bold text-blue-600">High</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Summary:</span> Agent demonstrated excellent product knowledge and maintained positive engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auditor Scoring Side Drawer */}
        {showAuditorScoring && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAuditorScoring(false)}></div>
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{scoringTemplate.title}</h2>
                  <p className="text-sm text-gray-600">{scoringTemplate.description}</p>
                </div>
                <button
                  onClick={() => setShowAuditorScoring(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* Conversation Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Conversation Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Agent Card */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">Agent</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{conversation.agent}</div>
                    </div>

                    {/* Customer Card */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">Customer</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{conversation.customer}</div>
                    </div>

                    {/* Duration Card */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Timer className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-medium text-gray-600">Duration</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{conversation.duration}</div>
                    </div>

                    {/* AI Score Card */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-gray-600">AI Score</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-semibold ${
                          conversation.score >= 90 ? 'text-green-600' :
                          conversation.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {conversation.score}/100
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          conversation.score >= 90 ? 'bg-green-500' :
                          conversation.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality Template Selection */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-purple-600" />
                    <span>Quality Template</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="technical support">Technical Support</option>
                        <option value="sales">Sales/Tech Sales</option>
                        <option value="customer success">Customer Success</option>
                        <option value="general">General Conversation</option>
                      </select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-2">Template Details</div>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div><span className="font-medium">Title:</span> {scoringTemplate.title}</div>
                        <div><span className="font-medium">Description:</span> {scoringTemplate.description}</div>
                        <div><span className="font-medium">Total Points:</span> {scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-2">Scoring Criteria</div>
                      <div className="space-y-1">
                        {scoringTemplate.criteria.map((criterion, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="text-gray-700">{criterion.label}</span>
                            <span className="text-gray-500 font-medium">{criterion.max}pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scoring Criteria */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Scoring Criteria</h3>
                  
                  {scoringTemplate.criteria.map((criterion, index) => (
                    <div key={criterion.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {criterion.label} (0-{criterion.max})
                      </label>
                      <p className="text-xs text-gray-600 mb-2">{criterion.description}</p>
                      <input
                        type="range"
                        min="0"
                        max={criterion.max}
                        value={auditorScores[criterion.key as keyof typeof auditorScores] || 0}
                        onChange={(e) => setAuditorScores({
                          ...auditorScores, 
                          [criterion.key]: parseInt(e.target.value)
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor (0)</span>
                        <span className="font-medium">{auditorScores[criterion.key as keyof typeof auditorScores] || 0}</span>
                        <span>Excellent ({criterion.max})</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Score Display */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {scoringTemplate.criteria.reduce((total, criterion) => 
                        total + (auditorScores[criterion.key as keyof typeof auditorScores] || 0), 0
                      )}/{scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audit Notes</label>
                  <textarea
                    value={auditorScores.notes}
                    onChange={(e) => setAuditorScores({...auditorScores, notes: e.target.value})}
                    placeholder="Add your observations and feedback..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAuditorScoring(false)}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Calculate total human score
                      const totalHumanScore = scoringTemplate.criteria.reduce((total, criterion) => 
                        total + (auditorScores[criterion.key as keyof typeof auditorScores] || 0), 0
                      );
                      setSavedHumanScore(totalHumanScore);
                      // Here you would save the scores to your backend
                      console.log('Auditor Scores:', auditorScores);
                      alert('Scores saved successfully!');
                      setShowAuditorScoring(false);
                    }}
                    className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Scores
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
