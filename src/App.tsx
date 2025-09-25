import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserSelector } from './components/UserSelector';
import { TeamLeaderOverview } from './components/TeamLeaderOverview';
import { CallQualityAnalytics } from './components/CallQualityAnalytics';
import { Conversations } from './components/Conversations';
import { GoalManagement } from './components/GoalManagement';
import { CampaignManagement } from './components/CampaignManagement';
import { AlertManagement } from './components/AlertManagement';
import { users, dashboardConfigs } from './data/mockData';

function AppContent() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current view from URL
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/overview') return 'overview';
    if (path === '/call-quality-analytics') return 'call-quality-analytics';
    if (path === '/conversations') return 'conversations';
    if (path === '/goal-mgmt') return 'goal-mgmt';
    if (path === '/campaign-mgmt') return 'campaign-mgmt';
    if (path === '/alert-mgmt') return 'alert-mgmt';
    if (path === '/agent-configurations') return 'agent-configurations';
    if (path === '/access-management') return 'access-management';
    if (path === '/platform-settings') return 'platform-settings';
    if (path === '/observability') return 'observability';
    if (path === '/developer-hub') return 'developer-hub';
    if (path === '/agent-analytics') return 'agent-analytics';
    if (path === '/config-management') return 'config-management';
    return 'dashboard';
  };

  const currentView = getCurrentView();

  const handleUserSelect = (user: typeof users[0]) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
    // Navigate to appropriate default page based on role
    if (user.role === 'team_leader') {
      navigate('/overview');
    } else {
      navigate('/dashboard');
    }
  };

  const handleViewChange = (view: string) => {
    navigate(`/${view === 'dashboard' ? '' : view}`);
  };

  // Update selected user when role changes in URL
  useEffect(() => {
    if (currentView === 'overview' || currentView === 'call-quality-analytics' || 
        currentView === 'conversations' || currentView === 'goal-mgmt' || 
        currentView === 'campaign-mgmt' || currentView === 'alert-mgmt') {
      // Find a team leader user if current user is not team leader
      if (selectedUser.role !== 'team_leader') {
        const teamLeader = users.find(user => user.role === 'team_leader');
        if (teamLeader) {
          setSelectedUser(teamLeader);
        }
      }
    }
  }, [currentView, selectedUser.role]);

  const currentConfig = dashboardConfigs[selectedUser.role];

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <TeamLeaderOverview />;
      case 'call-quality-analytics':
        return <CallQualityAnalytics />;
      case 'conversations':
        return <Conversations />;
      case 'goal-mgmt':
        return <GoalManagement />;
      case 'campaign-mgmt':
        return <CampaignManagement />;
      case 'alert-mgmt':
        return <AlertManagement />;
      case 'dashboard':
        return <Dashboard config={currentConfig} userRole={selectedUser.role} />;
      default:
        return (
          <div className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/([A-Z])/g, ' $1')}
              </h2>
              <p className="text-gray-600">This section is coming soon. Click on Dashboard in the Explorer to see the analytics.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} userRole={selectedUser.role} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Conversation Intelligence Platform
                </h1>
              </div>
            </div>
            <UserSelector
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
              isOpen={isUserDropdownOpen}
              onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            />
          </div>
        </header>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;