import React from 'react';
import { 
  LayoutDashboard, 
  Rocket, 
  Key, 
  Settings, 
  Activity, 
  Code, 
  TrendingUp, 
  Cog,
  Plus,
  User,
  Grid3X3, 
  BarChart3,
  MessageSquare,
  Flag,
  Megaphone,
  Bell,
  Target
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole?: string;
}

const adminSidebarItems = [
  { 
    id: 'dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Overview & Analytics'
  },
  { 
    id: 'agent-configurations', 
    icon: Rocket, 
    label: 'Agent Configurations',
    description: 'Deploy & Configure Agents'
  },
  { 
    id: 'access-management', 
    icon: Key, 
    label: 'Access Management',
    description: 'Users & Permissions'
  },
  { 
    id: 'platform-settings', 
    icon: Settings, 
    label: 'Platform Settings',
    description: 'System Configuration'
  },
  { 
    id: 'observability', 
    icon: Activity, 
    label: 'Observability',
    description: 'Monitoring & Analytics'
  },
  { 
    id: 'developer-hub', 
    icon: Code, 
    label: 'Developer Hub',
    description: 'APIs & Documentation'
  },
  { 
    id: 'agent-analytics', 
    icon: TrendingUp, 
    label: 'Agent Analytics',
    description: 'Performance & Intelligence'
  },
  { 
    id: 'config-management', 
    icon: Cog, 
    label: 'Config Management',
    description: 'Campaign & Goal Configuration'
  }
];

const teamLeaderSidebarItems = [
  { 
    id: 'overview',
    icon: Grid3X3, 
    label: 'Overview',
    description: 'Team Overview & Metrics'
  },
  { 
    id: 'dashboards',
    icon: BarChart3, 
    label: 'Dashboards',
    description: 'Multi-Function Analytics'
  },
  { 
    id: 'conversations',
    icon: MessageSquare, 
    label: 'Conversations',
    description: 'Team Conversations'
  },
  { 
    id: 'call-quality-analytics',
    icon: BarChart3, 
    label: 'Call Quality Analytics',
    description: 'Call Performance Analysis'
  },
  { 
    id: 'goal-mgmt',
    icon: Target, 
    label: 'Goal Mgmt',
    description: 'Goal Management'
  },
  { 
    id: 'campaign-mgmt',
    icon: Megaphone, 
    label: 'Campaign Mgmt',
    description: 'Campaign Management'
  },
  { 
    id: 'alert-mgmt',
    icon: Bell, 
    label: 'Alert Mgmt',
    description: 'Alert Management'
  }
];

export function Sidebar({ currentView, onViewChange, userRole = 'team_manager' }: SidebarProps) {
  const sidebarItems = userRole === 'team_leader' ? teamLeaderSidebarItems : adminSidebarItems;

  return (
    <div className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 w-20 flex flex-col py-4 shadow-2xl">
      {/* Logo/Brand */}
      <div className="flex justify-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col flex-1 px-4">
        <div className="flex flex-col space-y-4 items-center">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                  title={item.label}
                >
                  <IconComponent size={20} />
                  {isActive && (
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Button */}
      <div className="mt-8 mb-4 flex justify-center">
        <button
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
          title="Add New"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* User Profile */}
      <div className="mt-auto flex justify-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
          <User size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}