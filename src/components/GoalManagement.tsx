import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  ArrowRight, 
  CheckCircle, 
  Clock
} from 'lucide-react';

export function GoalManagement() {
  const navigate = useNavigate();

  const handleGoalClick = (goalId: string) => {
    navigate(`/goal-details/${goalId}`);
  };

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
          {/* Lead Qualification Assistant */}
          <div 
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleGoalClick('lead-qualification')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Lead Qualification Assistant</h3>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    <CheckCircle size={12} />
                    <span>active</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Qualify incoming leads and gather contact information</p>
                
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
                    <span className="ml-2 text-gray-900">2024-01-15 14:30</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Support Ticket Triage */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Support Ticket Triage</h3>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    <CheckCircle size={12} />
                    <span>active</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Categorize and prioritize incoming support requests</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 text-gray-900">Support</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="ml-2 text-gray-900">91%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Interactions:</span>
                    <span className="ml-2 text-gray-900">3892</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Modified:</span>
                    <span className="ml-2 text-gray-900">2024-01-14 09:15</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Customer Feedback Collection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Feedback Collection</h3>
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium">
                    <Clock size={12} />
                    <span>draft</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Gather customer feedback and satisfaction scores</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 text-gray-900">Research</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="ml-2 text-gray-900">0%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Interactions:</span>
                    <span className="ml-2 text-gray-900">0</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Modified:</span>
                    <span className="ml-2 text-gray-900">2024-01-12 11:20</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}