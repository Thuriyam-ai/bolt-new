import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  GitBranch,
  History,
  Eye,
  Settings
} from 'lucide-react';

// Define goal versioning data structure
interface GoalVersion {
  id: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  description?: string;
}

interface Goal {
  id: string;
  name: string;
  description: string;
  currentVersion: string;
  versions: GoalVersion[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export function GoalManagement() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showVersionHistory, setShowVersionHistory] = useState<string | null>(null);

  const handleGoalClick = (goalId: string) => {
    navigate(`/goal-details/${goalId}`);
  };

  const handleCreateVersion = (goalId: string) => {
    // In real app, this would open a modal to create new version
    console.log('Create new version for goal:', goalId);
  };

  const handleViewVersions = (goalId: string) => {
    setShowVersionHistory(goalId);
  };

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockGoals: Goal[] = [
      {
        id: 'lead-qualification',
        name: 'Lead Qualification Assistant',
        description: 'Professional lead qualification with comprehensive scoring',
        currentVersion: 'v2.1',
        isPublished: true,
        createdAt: '2024-10-01',
        updatedAt: '2024-11-20',
        versions: [
          {
            id: 'v1.0',
            version: 'v1.0',
            isActive: false,
            createdAt: '2024-10-01',
            updatedAt: '2024-10-15',
            createdBy: 'John Doe',
            description: 'Initial version with basic qualification criteria'
          },
          {
            id: 'v2.0',
            version: 'v2.0',
            isActive: false,
            createdAt: '2024-10-15',
            updatedAt: '2024-11-01',
            createdBy: 'Jane Smith',
            description: 'Enhanced with budget assessment and decision process tracking'
          },
          {
            id: 'v2.1',
            version: 'v2.1',
            isActive: true,
            createdAt: '2024-11-01',
            updatedAt: '2024-11-20',
            createdBy: 'Mike Johnson',
            description: 'Added professional communication scoring and improved call closing criteria'
          }
        ]
      },
      {
        id: 'support-triage',
        name: 'Support Ticket Triage',
        description: 'Efficient ticket categorization and routing',
        currentVersion: 'v1.5',
        isPublished: true,
        createdAt: '2024-09-15',
        updatedAt: '2024-11-10',
        versions: [
          {
            id: 'v1.0',
            version: 'v1.0',
            isActive: false,
            createdAt: '2024-09-15',
            updatedAt: '2024-10-01',
            createdBy: 'Sarah Wilson',
            description: 'Basic ticket classification system'
          },
          {
            id: 'v1.5',
            version: 'v1.5',
            isActive: true,
            createdAt: '2024-10-01',
            updatedAt: '2024-11-10',
            createdBy: 'David Brown',
            description: 'Added escalation decision criteria and documentation quality scoring'
          }
        ]
      },
      {
        id: 'feedback-collection',
        name: 'Customer Feedback Collection',
        description: 'Systematic feedback gathering and analysis',
        currentVersion: 'v1.2',
        isPublished: true,
        createdAt: '2024-08-20',
        updatedAt: '2024-10-31',
        versions: [
          {
            id: 'v1.0',
            version: 'v1.0',
            isActive: false,
            createdAt: '2024-08-20',
            updatedAt: '2024-09-10',
            createdBy: 'Lisa Garcia',
            description: 'Initial feedback collection framework'
          },
          {
            id: 'v1.1',
            version: 'v1.1',
            isActive: false,
            createdAt: '2024-09-10',
            updatedAt: '2024-09-25',
            createdBy: 'Tom Anderson',
            description: 'Improved question delivery and response capture'
          },
          {
            id: 'v1.2',
            version: 'v1.2',
            isActive: true,
            createdAt: '2024-09-25',
            updatedAt: '2024-10-31',
            createdBy: 'Emily Davis',
            description: 'Enhanced follow-up questions and survey completion criteria'
          }
        ]
      }
    ];
    setGoals(mockGoals);
  }, []);

  return (
    <div className="flex-1 bg-white">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Goal Management</h1>
            <p className="text-gray-500 mt-1">Manage goal configurations and settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center justify-end mb-8">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>New Goal</span>
          </button>
        </div>

        {/* Goal Cards */}
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      goal.isPublished 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {goal.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {goal.currentVersion}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{goal.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 text-gray-900">Sales</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Completion Rate:</span>
                      <span className="ml-2 text-gray-900">78%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Interactions:</span>
                      <span className="ml-2 text-gray-900">2456</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Modified:</span>
                      <span className="ml-2 text-gray-900">{new Date(goal.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Versions:</span>
                      <span className="ml-2 text-gray-900">{goal.versions.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Current Version:</span>
                      <span className="ml-2 text-gray-900">{goal.currentVersion}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => handleViewVersions(goal.id)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Version History"
                  >
                    <History size={16} />
                  </button>
                  <button 
                    onClick={() => handleCreateVersion(goal.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    title="Create New Version"
                  >
                    <GitBranch size={16} />
                  </button>
                  <button 
                    onClick={() => handleGoalClick(goal.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit Goal"
                  >
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Version History Modal */}
        {showVersionHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Version History</h2>
                  <button
                    onClick={() => setShowVersionHistory(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Settings size={24} />
                  </button>
                </div>

                {(() => {
                  const goal = goals.find(g => g.id === showVersionHistory);
                  if (!goal) return null;

                  return (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                        <p className="text-gray-600">Current version: {goal.currentVersion}</p>
                      </div>

                      <div className="space-y-4">
                        {goal.versions.map((version, index) => (
                          <div key={version.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{version.version}</h4>
                                  {version.isActive && (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                      Active
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-500">
                                    Created by {version.createdBy}
                                  </span>
                                </div>
                                {version.description && (
                                  <p className="text-gray-600 mb-3">{version.description}</p>
                                )}
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Created: {new Date(version.createdAt).toLocaleDateString()}</span>
                                  <span>Updated: {new Date(version.updatedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Eye size={16} />
                                </button>
                                {!version.isActive && (
                                  <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors">
                                    <CheckCircle size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
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