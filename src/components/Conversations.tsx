import { useState } from 'react';
import { ConversationDetails } from './ConversationDetails';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Eye, 
  MoreHorizontal,
  Maximize2,
  Minimize2,
  BarChart3,
  Clock, 
  MessageSquare,
  User, 
  Phone,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  FileSpreadsheet,
  Printer,
  Share2,
  ChevronDown,
  LineChart,
  Activity,
  Target,
  Users,
  Save,
} from 'lucide-react';

interface Conversation {
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
}

export function Conversations() {
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [qualityFilter, setQualityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [widgetMenu, setWidgetMenu] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Advanced filter state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [durationRange, setDurationRange] = useState({ min: '', max: '' });
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' });
  
  // Export functionality state
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [shareLink, setShareLink] = useState('');
  
  // Conversation details state
  const [showConversationDetails, setShowConversationDetails] = useState(false);
  const [selectedConversationForDetails, setSelectedConversationForDetails] = useState<Conversation | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Analytics state
  
  // Filter presets state
  const [savedPresets, setSavedPresets] = useState([
    { id: 1, name: 'High Quality Calls', filters: { quality: 'Excellent', status: 'Resolved', agent: 'All Agents', category: 'All Categories', search: '' } },
    { id: 2, name: 'Technical Support', filters: { category: 'Technical Support', status: 'All Status', agent: 'All Agents', quality: 'All', search: '' } },
    { id: 3, name: 'Customer Complaints', filters: { quality: 'All', status: 'Escalated', agent: 'All Agents', category: 'All Categories', search: '' } }
  ]);
  const [presetName, setPresetName] = useState('');

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
      rating: 5,
      quality: 95,
      talkRatio: 58,
      interruptions: 1,
      summary: 'Customer had trouble with account login. Issue resolved by resetting password and updating security settings.',
      tags: ['Login Issue', 'Password Reset', 'Security'],
      conversationId: 'js-rkoq-pco',
      owner: 'Priya Sharma',
      account: 'Rajesh Gupta',
      score: 95,
      scoreTrend: 'up' as const,
      previousScore: 92
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
      talkRatio: 45,
      interruptions: 0,
      summary: 'Billing inquiry about extra charges. Explained billing cycle and provided detailed breakdown.',
      tags: ['Billing', 'Charges', 'Explanation'],
      conversationId: 'dgg-nisd-aie',
      owner: 'Kavya Reddy',
      account: 'Amit Singh',
      score: 92,
      scoreTrend: 'down' as const,
      previousScore: 96
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
      tags: ['Product Info', 'Technical', 'Escalation'],
      conversationId: 'abm-fwhk-lnt',
      owner: 'Arjun Patel',
      account: 'Sneha Iyer',
      score: 88,
      scoreTrend: 'stable' as const,
      previousScore: 88
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
      tags: ['Sales', 'Upgrade', 'Premium Plan'],
      conversationId: 'ext-mnob-sat7wuthuser=0',
      owner: 'Sneha Gupta',
      account: 'Vikram Mehta',
      score: 96,
      scoreTrend: 'up' as const,
      previousScore: 93
    },
    {
      id: 5,
      agent: 'Lalit Bal',
      customer: 'Ankush M',
      type: 'Voice Call',
      category: 'Technical Support',
      date: '2024-01-15',
      time: '4:30 PM',
      duration: '10:15',
      status: 'Resolved',
      rating: 4.7,
      quality: 89,
      talkRatio: 52,
      interruptions: 2,
      summary: 'API integration support. Helped customer implement webhook notifications.',
      tags: ['API', 'Integration', 'Webhook'],
      conversationId: 'uno-fomy-ewl',
      owner: 'Lalit Bal',
      account: 'Ankush M',
      score: 89,
      scoreTrend: 'down' as const,
      previousScore: 91
    },
    {
      id: 6,
      agent: 'Ravi Kumar',
      customer: 'Deepika Singh',
      type: 'Chat',
      category: 'Billing Support',
      date: '2024-01-15',
      time: '5:15 PM',
      duration: '4:20',
      status: 'Resolved',
      rating: 4.6,
      quality: 91,
      talkRatio: 48,
      interruptions: 0,
      summary: 'Subscription renewal inquiry. Customer extended plan for another year.',
      tags: ['Renewal', 'Subscription', 'Billing'],
      conversationId: 'pqr-stu-vwx',
      owner: 'Ravi Kumar',
      account: 'Deepika Singh',
      score: 91,
      scoreTrend: 'up' as const,
      previousScore: 88
    },
    {
      id: 7,
      agent: 'Meera Joshi',
      customer: 'Rajesh Verma',
      type: 'Voice Call',
      category: 'Sales',
      date: '2024-01-15',
      time: '6:00 PM',
      duration: '18:45',
      status: 'In Progress',
      rating: null,
      quality: 87,
      talkRatio: 62,
      interruptions: 4,
      summary: 'Enterprise sales consultation. Discussing custom solutions for large team.',
      tags: ['Enterprise', 'Sales', 'Custom'],
      conversationId: 'mno-def-ghi',
      owner: 'Meera Joshi',
      account: 'Rajesh Verma',
      score: 87,
      scoreTrend: 'stable' as const,
      previousScore: 87
    },
    {
      id: 8,
      agent: 'Vikash Agarwal',
      customer: 'Priya Reddy',
      type: 'Voice Call',
      category: 'Technical Support',
      date: '2024-01-15',
      time: '6:30 PM',
      duration: '7:30',
      status: 'Resolved',
      rating: 4.9,
      quality: 94,
      talkRatio: 55,
      interruptions: 1,
      summary: 'Database connection issue resolved. Updated connection strings and tested.',
      tags: ['Database', 'Connection', 'Technical'],
      conversationId: 'jkl-mno-pqr',
      owner: 'Vikash Agarwal',
      account: 'Priya Reddy',
      score: 94,
      scoreTrend: 'up' as const,
      previousScore: 89
    },
    {
      id: 9,
      agent: 'Anita Desai',
      customer: 'Suresh Kumar',
      type: 'Chat',
      category: 'Product Inquiry',
      date: '2024-01-15',
      time: '7:00 PM',
      duration: '5:15',
      status: 'Resolved',
      rating: 4.5,
      quality: 86,
      talkRatio: 42,
      interruptions: 0,
      summary: 'Feature request discussion. Customer wants advanced reporting capabilities.',
      tags: ['Feature', 'Reporting', 'Request'],
      conversationId: 'stu-vwx-yza',
      owner: 'Anita Desai',
      account: 'Suresh Kumar',
      score: 86,
      scoreTrend: 'down' as const,
      previousScore: 90
    },
    {
      id: 10,
      agent: 'Rohit Sharma',
      customer: 'Neha Gupta',
      type: 'Voice Call',
      category: 'Sales',
      date: '2024-01-15',
      time: '7:30 PM',
      duration: '12:20',
      status: 'Resolved',
      rating: 4.8,
      quality: 93,
      talkRatio: 58,
      interruptions: 2,
      summary: 'Team upgrade consultation. Customer upgraded from individual to team plan.',
      tags: ['Upgrade', 'Team', 'Plan'],
      conversationId: 'bcd-efg-hij',
      owner: 'Rohit Sharma',
      account: 'Neha Gupta',
      score: 93,
      scoreTrend: 'up' as const,
      previousScore: 87
    },
    {
      id: 11,
      agent: 'Sunita Patel',
      customer: 'Amit Kumar',
      type: 'Chat',
      category: 'Billing Support',
      date: '2024-01-15',
      time: '8:00 PM',
      duration: '3:45',
      status: 'Resolved',
      rating: 4.4,
      quality: 85,
      talkRatio: 38,
      interruptions: 0,
      summary: 'Payment method update. Customer changed from credit card to bank transfer.',
      tags: ['Payment', 'Method', 'Update'],
      conversationId: 'klm-nop-qrs',
      owner: 'Sunita Patel',
      account: 'Amit Kumar',
      score: 85,
      scoreTrend: 'down' as const,
      previousScore: 88
    },
    {
      id: 12,
      agent: 'Kiran Rao',
      customer: 'Vijay Singh',
      type: 'Voice Call',
      category: 'Technical Support',
      date: '2024-01-15',
      time: '8:30 PM',
      duration: '9:10',
      status: 'In Progress',
      rating: null,
      quality: 82,
      talkRatio: 68,
      interruptions: 3,
      summary: 'Server migration assistance. Helping customer migrate to new infrastructure.',
      tags: ['Migration', 'Server', 'Infrastructure'],
      conversationId: 'tuv-wxy-zab',
      owner: 'Kiran Rao',
      account: 'Vijay Singh',
      score: 82,
      scoreTrend: 'stable' as const,
      previousScore: 82
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        conv.summary.toLowerCase().includes(searchLower) ||
        conv.agent.toLowerCase().includes(searchLower) ||
        conv.customer.toLowerCase().includes(searchLower) ||
        conv.category.toLowerCase().includes(searchLower) ||
        conv.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        conv.conversationId.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (selectedAgent !== 'All Agents' && conv.agent !== selectedAgent) return false;
    if (categoryFilter !== 'All Categories' && conv.category !== categoryFilter) return false;
    if (statusFilter !== 'All Status' && conv.status !== statusFilter) return false;
    if (qualityFilter !== 'All') {
      const quality = conv.quality;
      if (qualityFilter === 'Excellent' && quality < 90) return false;
      if (qualityFilter === 'Good' && (quality < 80 || quality >= 90)) return false;
      if (qualityFilter === 'Fair' && quality >= 80) return false;
    }
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConversations = filteredConversations.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversationForDetails(conversation);
    setShowConversationDetails(true);
  };

  const handleBackToConversations = () => {
    setShowConversationDetails(false);
    setSelectedConversationForDetails(null);
  };

  // Export functions
  const exportToCSV = () => {
    const csvHeaders = ['ID', 'Agent', 'Customer', 'Type', 'Category', 'Date', 'Time', 'Duration', 'Status', 'Rating', 'Quality Score', 'Conversation ID'];
    const csvData = filteredConversations.map(conv => [
      conv.id,
      conv.agent,
      conv.customer,
      conv.type,
      conv.category,
      conv.date,
      conv.time,
      conv.duration,
      conv.status,
      conv.rating || 'N/A',
      conv.quality,
      conv.conversationId
    ]);
    
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `conversations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToExcel = () => {
    // For Excel export, we'll create a simple HTML table that can be opened in Excel
    const excelContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <th>ID</th><th>Agent</th><th>Customer</th><th>Type</th><th>Category</th>
              <th>Date</th><th>Time</th><th>Duration</th><th>Status</th><th>Rating</th>
              <th>Quality Score</th><th>Conversation ID</th>
            </tr>
            ${filteredConversations.map(conv => `
              <tr>
                <td>${conv.id}</td>
                <td>${conv.agent}</td>
                <td>${conv.customer}</td>
                <td>${conv.type}</td>
                <td>${conv.category}</td>
                <td>${conv.date}</td>
                <td>${conv.time}</td>
                <td>${conv.duration}</td>
                <td>${conv.status}</td>
                <td>${conv.rating || 'N/A'}</td>
                <td>${conv.quality}</td>
                <td>${conv.conversationId}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `conversations_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const printConversations = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const printContent = `
        <html>
          <head>
            <title>Conversations Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f8f9fa; font-weight: bold; }
              tr:nth-child(even) { background-color: #f8f9fa; }
              .header-info { margin-bottom: 20px; color: #666; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <h1>Conversations Report</h1>
            <div class="header-info">
              <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Total Conversations:</strong> ${filteredConversations.length}</p>
              <p><strong>Filters Applied:</strong> ${selectedAgent !== 'All Agents' ? `Agent: ${selectedAgent}` : 'All Agents'}, ${categoryFilter !== 'All Categories' ? `Category: ${categoryFilter}` : 'All Categories'}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Agent</th><th>Customer</th><th>Type</th><th>Category</th>
                  <th>Date</th><th>Time</th><th>Duration</th><th>Status</th><th>Rating</th>
                  <th>Quality Score</th><th>Conversation ID</th>
                </tr>
              </thead>
              <tbody>
                ${filteredConversations.map(conv => `
                  <tr>
                    <td>${conv.id}</td>
                    <td>${conv.agent}</td>
                    <td>${conv.customer}</td>
                    <td>${conv.type}</td>
                    <td>${conv.category}</td>
                    <td>${conv.date}</td>
                    <td>${conv.time}</td>
                    <td>${conv.duration}</td>
                    <td>${conv.status}</td>
                    <td>${conv.rating || 'N/A'}</td>
                    <td>${conv.quality}</td>
                    <td>${conv.conversationId}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      setShowExportMenu(false);
    }
  };

  const generateShareLink = () => {
    const filters = {
      agent: selectedAgent,
      category: categoryFilter,
      status: statusFilter,
      quality: qualityFilter,
      search: searchQuery
    };
    
    const shareableUrl = `${window.location.origin}${window.location.pathname}?filters=${encodeURIComponent(JSON.stringify(filters))}`;
    setShareLink(shareableUrl);
    setShowShareModal(true);
    setShowExportMenu(false);
  };

  // Close export menu when clicking outside
  const handleClickOutside = () => {
    if (showExportMenu) {
      setShowExportMenu(false);
    }
  };

  // Analytics functions
  const getConversationVolumeData = () => {
    const volumeData = [
      { date: '2024-01-09', count: 45 },
      { date: '2024-01-10', count: 52 },
      { date: '2024-01-11', count: 38 },
      { date: '2024-01-12', count: 61 },
      { date: '2024-01-13', count: 48 },
      { date: '2024-01-14', count: 55 },
      { date: '2024-01-15', count: 42 }
    ];
    return volumeData;
  };

  const getQualityTrendData = () => {
    const qualityData = [
      { date: '2024-01-09', average: 89.2 },
      { date: '2024-01-10', average: 91.5 },
      { date: '2024-01-11', average: 88.8 },
      { date: '2024-01-12', average: 92.1 },
      { date: '2024-01-13', average: 90.3 },
      { date: '2024-01-14', average: 93.7 },
      { date: '2024-01-15', average: 91.2 }
    ];
    return qualityData;
  };

  const getSatisfactionTrendData = () => {
    const satisfactionData = [
      { date: '2024-01-09', average: 4.2 },
      { date: '2024-01-10', average: 4.5 },
      { date: '2024-01-11', average: 4.1 },
      { date: '2024-01-12', average: 4.6 },
      { date: '2024-01-13', average: 4.3 },
      { date: '2024-01-14', average: 4.7 },
      { date: '2024-01-15', average: 4.4 }
    ];
    return satisfactionData;
  };

  const getAgentPerformanceData = () => {
    const agentData = conversations.reduce((acc, conv) => {
      if (!acc[conv.agent]) {
        acc[conv.agent] = {
          name: conv.agent,
          totalCalls: 0,
          avgQuality: 0,
          avgRating: 0,
          totalDuration: 0,
          resolvedCount: 0
        };
      }
      
      acc[conv.agent].totalCalls++;
      acc[conv.agent].avgQuality += conv.quality;
      acc[conv.agent].avgRating += conv.rating || 0;
      acc[conv.agent].totalDuration += parseInt(conv.duration.split(':')[0]) * 60 + parseInt(conv.duration.split(':')[1]);
      if (conv.status === 'Resolved') acc[conv.agent].resolvedCount++;
      
      return acc;
    }, {} as any);

    // Calculate averages
    Object.values(agentData).forEach((agent: any) => {
      agent.avgQuality = (agent.avgQuality / agent.totalCalls).toFixed(1);
      agent.avgRating = agent.avgRating > 0 ? (agent.avgRating / agent.totalCalls).toFixed(1) : 'N/A';
      agent.resolutionRate = ((agent.resolvedCount / agent.totalCalls) * 100).toFixed(1);
    });

    return Object.values(agentData);
  };

  // Filter presets functions
  const saveCurrentFiltersAsPreset = () => {
    if (presetName.trim()) {
      const newPreset = {
        id: Date.now(),
        name: presetName,
        filters: {
          agent: selectedAgent,
          category: categoryFilter,
          status: statusFilter,
          quality: qualityFilter,
          search: searchQuery
        }
      };
      setSavedPresets([...savedPresets, newPreset]);
      setPresetName('');
    }
  };

  const applyPreset = (preset: any) => {
    setSelectedAgent(preset.filters.agent || 'All Agents');
    setCategoryFilter(preset.filters.category || 'All Categories');
    setStatusFilter(preset.filters.status || 'All Status');
    setQualityFilter(preset.filters.quality || 'All');
    setSearchQuery(preset.filters.search || '');
    setShowAdvancedFilters(false);
    handleFilterChange();
  };

  const handleExpandWidget = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const handleWidgetAction = (widgetId: string, action: string) => {
    console.log(`Widget ${widgetId} action: ${action}`);
    setWidgetMenu(null);
  };

  // If showing conversation details, render that instead
  if (showConversationDetails && selectedConversationForDetails) {
  return (
      <ConversationDetails
        conversation={selectedConversationForDetails}
        onBack={handleBackToConversations}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" onClick={handleClickOutside}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-12 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conversation Analytics Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor and analyze team conversations with detailed insights</p>
          </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-6">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          {/* Analytics & Insights Widget */}
          <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <LineChart className="w-6 h-6 text-white" />
          </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
                    <p className="text-sm text-gray-500">Conversation trends and performance metrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('analytics')}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    {expandedWidget === 'analytics' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu(widgetMenu === 'analytics' ? null : 'analytics')}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {widgetMenu === 'analytics' && (
                      <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                        <button onClick={() => handleWidgetAction('analytics', 'refresh')} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Refresh
                        </button>
                        <button onClick={() => handleWidgetAction('analytics', 'export')} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                          <Download className="w-4 h-4 inline mr-2" />
                          Export Data
                        </button>
                      </div>
                    )}
                  </div>
                </div>
        </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric Card 1: Conversation Volume */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Activity className="w-5 h-5 text-white" />
          </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{getConversationVolumeData().reduce((sum, day) => sum + day.count, 0)}</div>
                  <div className="text-sm text-gray-700">Total Conversations</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+12% this week</span>
                  </div>
        </div>

                {/* Metric Card 2: Quality Score */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
          </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{getQualityTrendData().slice(-1)[0]?.average || 0}</div>
                  <div className="text-sm text-gray-700">Average Quality Score</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+2.1% from last month</span>
                  </div>
        </div>

                {/* Metric Card 3: Customer Satisfaction */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
          </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{getSatisfactionTrendData().slice(-1)[0]?.average || 0}/5</div>
                  <div className="text-sm text-gray-700">Customer Rating</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+0.3 this week</span>
        </div>
      </div>

                {/* Metric Card 4: Agent Performance */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
          </div>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{getAgentPerformanceData().length}</div>
                  <div className="text-sm text-gray-700">Active Agents</div>
                  <div className="flex items-center mt-2">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">+2 this month</span>
                  </div>
                </div>
          </div>
        </div>
      </div>

          {/* Recent Conversations Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
                    <p className="text-sm text-gray-500">Top performing agents</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExpandWidget('agent-performance')}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    {expandedWidget === 'agent-performance' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu(widgetMenu === 'agent-performance' ? null : 'agent-performance')}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {widgetMenu === 'recent-conversations' && (
                      <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                        <button onClick={() => handleWidgetAction('recent-conversations', 'refresh')} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Refresh
                        </button>
                        <button onClick={() => handleWidgetAction('recent-conversations', 'view-all')} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                          <Eye className="w-4 h-4 inline mr-2" />
                View All
              </button>
            </div>
                    )}
                  </div>
                </div>
              </div>
            <div className="space-y-4">
                <p className="text-sm text-gray-500">Showing {Math.min(3, filteredConversations.length)} of {filteredConversations.length} conversations</p>
                {filteredConversations.slice(0, 3).map((conv) => (
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
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User size={14} className="text-white" />
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900 text-sm">{conv.category}</h4>
                          <p className="text-xs text-gray-500">Agent: {conv.agent}</p>
                      </div>
                    </div>
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
                    <p className="text-xs text-gray-700 line-clamp-2 mb-2">{conv.summary}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        {conv.type === 'Voice Call' ? <Phone size={12} /> : <MessageSquare size={12} />}
                      <span>{conv.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock size={12} />
                      <span>{conv.duration}</span>
                    </div>
                    {conv.rating && (
                      <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-500" />
                        <span>{conv.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
                  </div>
                </div>


      {/* Search and Filters - Above Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500 p-6 mb-6">
          <div className="mb-4">
            <div className="w-full">
              <div className="w-full max-w-4xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversation content, customer names, or conversation IDs..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                      </div>
                    </div>
                  </div>
                  </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by:</h3>
            <div className="flex items-center space-x-4">
            <select 
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedAgent}
              onChange={(e) => {
                setSelectedAgent(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="All Agents">All Agents</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Kavya Reddy">Kavya Reddy</option>
              <option value="Arjun Patel">Arjun Patel</option>
              <option value="Sneha Gupta">Sneha Gupta</option>
              <option value="Lalit Bal">Lalit Bal</option>
              <option value="Ravi Kumar">Ravi Kumar</option>
              <option value="Meera Joshi">Meera Joshi</option>
              <option value="Vikash Agarwal">Vikash Agarwal</option>
              <option value="Anita Desai">Anita Desai</option>
              <option value="Rohit Sharma">Rohit Sharma</option>
              <option value="Sunita Patel">Sunita Patel</option>
              <option value="Kiran Rao">Kiran Rao</option>
            </select>
            
            <select 
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                handleFilterChange();
              }}
            >
              <option>All Categories</option>
              <option>Technical Support</option>
              <option>Billing Support</option>
              <option>Sales</option>
              <option>Product Inquiry</option>
            </select>
            
            <select 
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
            >
              <option>All Status</option>
              <option>Resolved</option>
              <option>In Progress</option>
              <option>Escalated</option>
            </select>
            
            <select 
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={qualityFilter}
              onChange={(e) => {
                setQualityFilter(e.target.value);
                handleFilterChange();
              }}
            >
              <option>All Quality</option>
              <option>Excellent (90+)</option>
              <option>Good (80-89)</option>
              <option>Fair (Below 80)</option>
            </select>
            
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
            
            

            {/* Export Dropdown */}
            <div className="relative">
                    <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-300"
                    >
                <Download className="w-4 h-4" />
                <span>Export</span>
                <ChevronDown className="w-3 h-3" />
                    </button>
              
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={exportToCSV}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Export to CSV</span>
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export to Excel</span>
                    </button>
                    <button
                      onClick={printConversations}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Conversations</span>
                    </button>
                    <button
                      onClick={generateShareLink}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Generate Share Link</span>
                    </button>
                    </div>
                  </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

        {/* Conversations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-orange-500 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Name and Details
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Agent
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Account
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Score
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Trend
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Tags
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedConversations.map((conv) => (
                      <tr
                        key={conv.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => handleConversationClick(conv)}
                      >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                  </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {conv.time} {conv.date} - {conv.time}
                  </div>
                  <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{conv.conversationId}</span>
                </div>
                </div>
              </div>
                    </td>
                    <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{conv.owner}</span>
                  </div>
                    </td>
                    <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                  </div>
                    </td>
                    <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          conv.score >= 90 ? 'bg-red-100 text-red-600' :
                          conv.score >= 80 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {conv.score}%
                  </div>
                </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {conv.scoreTrend === 'up' && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">+{conv.score - (conv.previousScore || conv.score)}</span>
                          </div>
                        )}
                        {conv.scoreTrend === 'down' && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-xs font-medium">{conv.score - (conv.previousScore || conv.score)}</span>
                          </div>
                        )}
                        {conv.scoreTrend === 'stable' && (
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Minus className="w-4 h-4" />
                            <span className="text-xs font-medium">0</span>
                      </div>
                        )}
                    </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">Google Calendar</div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-4 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredConversations.length)} of {filteredConversations.length} conversations
                    </div>
                  <div className="flex items-center space-x-2">
                    <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
                    </button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
                          </div>
                          </div>
                      </div>
                    </div>

      {/* Advanced Filter Side Drawer */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAdvancedFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Advanced Filters</h2>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
                </div>

            <div className="p-6 space-y-6">
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Start date"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="End date"
                  />
                    </div>
                    </div>

              {/* Duration Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration Range (minutes)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={durationRange.min}
                    onChange={(e) => setDurationRange({...durationRange, min: e.target.value})}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={durationRange.max}
                    onChange={(e) => setDurationRange({...durationRange, max: e.target.value})}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                    </div>
                  </div>

              {/* Rating Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Rating Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={ratingRange.min}
                    onChange={(e) => setRatingRange({...ratingRange, min: e.target.value})}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Min (1-5)"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={ratingRange.max}
                    onChange={(e) => setRatingRange({...ratingRange, max: e.target.value})}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Max (1-5)"
                  />
                </div>
              </div>

              {/* Talk Ratio Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Talk-to-Listen Ratio (%)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Min %"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Max %"
                  />
                </div>
              </div>

              {/* Interruptions Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Interruptions</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Max interruptions allowed"
                />
              </div>

              {/* Saved Searches Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Saved Searches</h4>
                
                {/* Save Current Search */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Save Current Search</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search name..."
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={saveCurrentFiltersAsPreset}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>

                {/* Saved Searches List */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Load Saved Search</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className="w-full px-3 py-2 text-sm text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 flex items-center justify-between"
                      >
                        <span className="font-medium">{preset.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {Object.values(preset.filters).filter(v => v && v !== 'All Agents' && v !== 'All Categories' && v !== 'All Status' && v !== 'All').length} filters
                    </span>
                      </button>
                  ))}
                </div>
              </div>
            </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setDateRange({ start: '', end: '' });
                    setDurationRange({ min: '', max: '' });
                    setRatingRange({ min: '', max: '' });
                  }}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    handleFilterChange();
                    setShowAdvancedFilters(false);
                  }}
                  className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
            </div>
          )}

      {/* Share Link Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowShareModal(false)}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Share Conversations</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
        </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Share this link to allow others to view the filtered conversations with the same criteria.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shareable Link:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                      // You could add a toast notification here
                    }}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    Copy
                  </button>
      </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 text-blue-600 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Note:</p>
                    <p>This link includes your current filter settings and will show the same filtered results to anyone who accesses it.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}