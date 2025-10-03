import { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Play, 
  Pause, 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Settings,
  Search,
  Filter,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Define campaign data structure
interface Campaign {
  id: string;
  name: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  goalVersion: {
    id: string;
    name: string;
    version: string;
  };
  assignedTeam: {
    id: string;
    name: string;
    members: number;
  };
  startDate: string;
  endDate: string;
  metrics: {
    totalConversations: number;
    avgScore: number;
    completionRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Goal {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
}

interface Team {
  id: string;
  name: string;
  members: number;
  isActive: boolean;
}

export function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [teamFilter, setTeamFilter] = useState('All Teams');
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<string | null>(null);
  
  // Create campaign form state
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    startDate: '',
    endDate: '',
    goalId: '',
    teamId: ''
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: 'camp-1',
        name: 'Q4 Lead Generation Campaign',
        status: 'Active',
        goalVersion: {
          id: 'goal-1',
          name: 'Lead Qualification Assistant',
          version: 'v2.1'
        },
        assignedTeam: {
          id: 'team-1',
          name: 'Sales Team Alpha',
          members: 12
        },
        startDate: '2024-11-01',
        endDate: '2024-12-31',
        metrics: {
          totalConversations: 1247,
          avgScore: 87.3,
          completionRate: 94.2
        },
        createdAt: '2024-10-15',
        updatedAt: '2024-11-20'
      },
      {
        id: 'camp-2',
        name: 'Customer Support Enhancement',
        status: 'Upcoming',
        goalVersion: {
          id: 'goal-2',
          name: 'Support Ticket Triage',
          version: 'v1.5'
        },
        assignedTeam: {
          id: 'team-2',
          name: 'Support Team Beta',
          members: 8
        },
        startDate: '2024-12-01',
        endDate: '2025-02-28',
        metrics: {
          totalConversations: 0,
          avgScore: 0,
          completionRate: 0
        },
        createdAt: '2024-11-10',
        updatedAt: '2024-11-10'
      },
      {
        id: 'camp-3',
        name: 'Product Feedback Collection',
        status: 'Completed',
        goalVersion: {
          id: 'goal-3',
          name: 'Customer Feedback Collection',
          version: 'v1.2'
        },
        assignedTeam: {
          id: 'team-3',
          name: 'Research Team Gamma',
          members: 6
        },
        startDate: '2024-09-01',
        endDate: '2024-10-31',
        metrics: {
          totalConversations: 892,
          avgScore: 91.7,
          completionRate: 98.5
        },
        createdAt: '2024-08-20',
        updatedAt: '2024-11-01'
      }
    ];

    const mockGoals: Goal[] = [
      { id: 'goal-1', name: 'Lead Qualification Assistant', version: 'v2.1', isActive: true },
      { id: 'goal-2', name: 'Support Ticket Triage', version: 'v1.5', isActive: true },
      { id: 'goal-3', name: 'Customer Feedback Collection', version: 'v1.2', isActive: true },
      { id: 'goal-4', name: 'Sales Follow-up', version: 'v1.0', isActive: false }
    ];

    const mockTeams: Team[] = [
      { id: 'team-1', name: 'Sales Team Alpha', members: 12, isActive: true },
      { id: 'team-2', name: 'Support Team Beta', members: 8, isActive: true },
      { id: 'team-3', name: 'Research Team Gamma', members: 6, isActive: true },
      { id: 'team-4', name: 'Marketing Team Delta', members: 10, isActive: false }
    ];

    setCampaigns(mockCampaigns);
    setGoals(mockGoals);
    setTeams(mockTeams);
  }, []);

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = searchQuery === '' || 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.goalVersion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.assignedTeam.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || campaign.status === statusFilter;
    const matchesTeam = teamFilter === 'All Teams' || campaign.assignedTeam.name === teamFilter;
    
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Completed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate || !newCampaign.goalId || !newCampaign.teamId) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedGoal = goals.find(g => g.id === newCampaign.goalId);
    const selectedTeam = teams.find(t => t.id === newCampaign.teamId);
    
    if (!selectedGoal || !selectedTeam) {
      alert('Invalid goal or team selection');
      return;
    }

    const campaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: newCampaign.name,
      status: 'Upcoming',
      goalVersion: {
        id: selectedGoal.id,
        name: selectedGoal.name,
        version: selectedGoal.version
      },
      assignedTeam: {
        id: selectedTeam.id,
        name: selectedTeam.name,
        members: selectedTeam.members
      },
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      metrics: {
        totalConversations: 0,
        avgScore: 0,
        completionRate: 0
      },
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: '',
      startDate: '',
      endDate: '',
      goalId: '',
      teamId: ''
    });
    setShowCreateForm(false);
  };

  const handleAnalyticsClick = (campaignId: string) => {
    setShowAnalytics(campaignId);
  };

  const handleSettingsClick = (campaignId: string) => {
    setShowSettings(campaignId);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
              <p className="text-sm text-gray-600 mt-1">Create and manage call quality campaigns</p>
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
                placeholder="Search campaigns, goals, or teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
            <select 
              value={teamFilter} 
              onChange={(e) => setTeamFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All Teams">All Teams</option>
              {teams.filter(team => team.isActive).map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Campaign</span>
          </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-green-500 bg-opacity-10 flex items-center justify-center mb-4">
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Campaigns</h3>
          <p className="text-3xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'Active').length}</p>
          <p className="text-sm text-gray-500 mt-1">Currently running</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Clock size={20} className="text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Upcoming Campaigns</h3>
          <p className="text-3xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'Upcoming').length}</p>
          <p className="text-sm text-gray-500 mt-1">Scheduled to start</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Users size={20} className="text-purple-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Conversations</h3>
          <p className="text-3xl font-bold text-gray-900">{campaigns.reduce((sum, c) => sum + c.metrics.totalConversations, 0).toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Across all campaigns</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
            <BarChart3 size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Average Score</h3>
          <p className="text-3xl font-bold text-gray-900">
            {campaigns.length > 0 ? 
              (campaigns.reduce((sum, c) => sum + c.metrics.avgScore, 0) / campaigns.length).toFixed(1) + '%' : 
              '0%'
            }
          </p>
          <p className="text-sm text-gray-500 mt-1">Overall performance</p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Campaigns Dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              {(searchQuery || statusFilter !== 'All Status' || teamFilter !== 'All Teams') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All Status');
                    setTeamFilter('All Teams');
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filters
            </button>
              )}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Goal Version</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Metrics</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(campaign.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                  </span>
                </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">{campaign.goalVersion.name}</p>
                        <p className="text-sm text-gray-500">{campaign.goalVersion.version}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">{campaign.assignedTeam.name}</p>
                        <p className="text-sm text-gray-500">{campaign.assignedTeam.members} members</p>
                  </div>
                  </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          to {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                  </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Conversations:</span>
                        <span className="font-medium">{campaign.metrics.totalConversations.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avg Score:</span>
                        <span className="font-medium">{campaign.metrics.avgScore}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completion:</span>
                        <span className="font-medium">{campaign.metrics.completionRate}%</span>
                </div>
              </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleAnalyticsClick(campaign.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Analytics"
                      >
                  <BarChart3 size={16} />
                </button>
                      <button 
                        onClick={() => handleSettingsClick(campaign.id)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Campaign Settings"
                      >
                        <Settings size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
            </div>
            
      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
            </div>

              <div className="space-y-6">
                {/* Campaign Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="Enter campaign name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Goal Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Version *
                  </label>
                  <select
                    value={newCampaign.goalId}
                    onChange={(e) => setNewCampaign({...newCampaign, goalId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a goal version</option>
                    {goals.filter(goal => goal.isActive).map(goal => (
                      <option key={goal.id} value={goal.id}>
                        {goal.name} ({goal.version})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Assignment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Team *
                  </label>
                  <select
                    value={newCampaign.teamId}
                    onChange={(e) => setNewCampaign({...newCampaign, teamId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a team</option>
                    {teams.filter(team => team.isActive).map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.members} members)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCampaign}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Campaign Analytics</h2>
                <button
                  onClick={() => setShowAnalytics(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {(() => {
                const campaign = campaigns.find(c => c.id === showAnalytics);
                if (!campaign) return null;

                return (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-gray-600">
                        {campaign.goalVersion.name} ({campaign.goalVersion.version}) • {campaign.assignedTeam.name}
                      </p>
            </div>
            
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Total Conversations</p>
                            <p className="text-2xl font-bold text-blue-900">{campaign.metrics.totalConversations.toLocaleString()}</p>
                          </div>
                          <Users className="w-8 h-8 text-blue-500" />
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600 font-medium">Average Score</p>
                            <p className="text-2xl font-bold text-green-900">{campaign.metrics.avgScore}%</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-600 font-medium">Completion Rate</p>
                            <p className="text-2xl font-bold text-purple-900">{campaign.metrics.completionRate}%</p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-purple-500" />
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-yellow-600 font-medium">Campaign Duration</p>
                            <p className="text-2xl font-bold text-yellow-900">
                              {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                            </p>
              </div>
                          <Calendar className="w-8 h-8 text-yellow-500" />
              </div>
              </div>
            </div>

                    {/* Performance Trends */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Daily Performance Trend</h4>
                        <div className="space-y-3">
                          {[85, 87, 89, 86, 91, 88, 87].map((score, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Day {index + 1}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${score}%` }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{score}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h4>
                        <div className="space-y-3">
                          {[
                            { name: 'Priya Sharma', score: 92, calls: 45 },
                            { name: 'Arjun Patel', score: 88, calls: 38 },
                            { name: 'Kavya Reddy', score: 95, calls: 52 }
                          ].map((agent, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{agent.name}</p>
                                <p className="text-sm text-gray-500">{agent.calls} calls</p>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">{agent.score}%</span>
                            </div>
                          ))}
            </div>
            </div>
          </div>

                    {/* Goal Parameter Performance */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Goal Parameter Performance</h4>
                      <div className="space-y-3">
                        {[
                          { parameter: 'Call Opening Adherence', score: 84, trend: 'down' },
                          { parameter: 'Effective Questioning', score: 81, trend: 'down' },
                          { parameter: 'Budget & Timeline Assessment', score: 89, trend: 'up' },
                          { parameter: 'Decision Process Identification', score: 88, trend: 'up' },
                          { parameter: 'Needs Assessment', score: 94, trend: 'up' },
                          { parameter: 'Professional Communication', score: 92, trend: 'up' },
                          { parameter: 'Call Closing', score: 94, trend: 'up' }
                        ].map((param, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{param.parameter}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full ${
                                  param.score >= 90 ? 'bg-green-500' : 
                                  param.score >= 80 ? 'bg-orange-500' : 'bg-red-500'
                                }`} style={{ width: `${param.score}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{param.score}%</span>
                              {param.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))}
                </div>
                  </div>
                  </div>
                );
              })()}
                  </div>
                </div>
              </div>
      )}

      {/* Campaign Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Campaign Settings</h2>
                <button
                  onClick={() => setShowSettings(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {(() => {
                const campaign = campaigns.find(c => c.id === showSettings);
                if (!campaign) return null;

                return (
                  <div className="space-y-6">
                    {/* Campaign Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                          <input
                            type="text"
                            value={campaign.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="date"
                              value={campaign.startDate}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="date"
                              value={campaign.endDate}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
              </div>
            </div>
            
                    {/* Goal and Team Assignment */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Goal Version</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value={campaign.goalVersion.id}>
                              {campaign.goalVersion.name} ({campaign.goalVersion.version})
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Team</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value={campaign.assignedTeam.id}>
                              {campaign.assignedTeam.name} ({campaign.assignedTeam.members} members)
                            </option>
                          </select>
                        </div>
                      </div>
              </div>

                    {/* Campaign Status */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Status</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value={campaign.status}>{campaign.status}</option>
                            {campaign.status !== 'Active' && <option value="Active">Active</option>}
                            {campaign.status !== 'Upcoming' && <option value="Upcoming">Upcoming</option>}
                            {campaign.status !== 'Completed' && <option value="Completed">Completed</option>}
                          </select>
              </div>
              </div>
            </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setShowSettings(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
            </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}