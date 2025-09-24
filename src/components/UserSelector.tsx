import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface UserSelectorProps {
  users: User[];
  selectedUser: User;
  onUserSelect: (user: User) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function UserSelector({ users, selectedUser, onUserSelect, isOpen, onToggle }: UserSelectorProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-xs text-purple-200">{selectedUser.role}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50">
          <div className="p-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedUser.id === user.id
                    ? 'bg-purple-100 text-purple-900'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleUserSelect = (user: typeof users[0]) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
  };

  const currentConfig = dashboardConfigs[selectedUser.role];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1">
        <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">BotConfig</h1>
                <p className="text-purple-200">Admin Dashboard</p>
              </div>
              <UserSelector
                users={users}
                selectedUser={selectedUser}
                onUserSelect={handleUserSelect}
                isOpen={isUserDropdownOpen}
                onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        {currentView === 'dashboard' && (
          <Dashboard config={currentConfig} userRole={selectedUser.role} />
        )}
        
        {currentView !== 'dashboard' && (
          <div className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/([A-Z])/g, ' $1')}
              </h2>
              <p className="text-gray-600">This section is coming soon. Click on Dashboard in the Explorer to see the analytics.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;