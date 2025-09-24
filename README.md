# Multi-Persona Analytics Dashboard Application

A comprehensive analytics dashboard application built with React, TypeScript, and Tailwind CSS, designed for multi-persona user experiences with role-based dashboards and conversation analysis capabilities.

## 🚀 Features

### Multi-Persona Support
- **Team Manager Dashboard**: High-level overview with revenue, team performance, and project metrics
- **Team Leader Dashboard**: Detailed team analytics, call quality analysis, and conversation management
- **Agent Dashboard**: Individual performance metrics, ticket resolution, and customer ratings

### Conversation Analysis Platform
- **Interactive Transcript Player**: Synchronized audio playback with visual highlighting
- **Speaker Timeline**: Visual representation of conversation flow
- **Quality Metrics**: Talk-to-listen ratios, interruption tracking, and quality scoring
- **Real-time Analytics**: Live performance monitoring and trend analysis

### Key Components
- Role-based navigation and content
- Responsive design with mobile support
- Real-time data visualization
- Advanced filtering and search capabilities
- Indian names and localized content throughout

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── UserSelector.tsx # User role selector
│   ├── MetricCard.tsx   # Metric display cards
│   ├── ChartCard.tsx    # Chart visualization
│   ├── SystemHealth.tsx # System status monitoring
│   ├── RecentActivity.tsx # Activity feed
│   └── Team Leader Components:
│       ├── TeamLeaderOverview.tsx
│       ├── CallQualityAnalytics.tsx
│       ├── Conversations.tsx
│       ├── GoalManagement.tsx
│       ├── CampaignManagement.tsx
│       └── AlertManagement.tsx
├── data/
│   └── mockData.ts      # Sample data and configurations
├── types/
│   └── index.ts         # TypeScript type definitions
└── App.tsx              # Main application component
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-persona-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Dashboard Features

### Team Manager Dashboard
- Revenue tracking and financial metrics
- Team performance overview
- Project completion rates
- Budget utilization monitoring

### Team Leader Dashboard
- **Overview**: Comprehensive team performance metrics with agent leaderboards
- **Call Quality Analytics**: Detailed conversation analysis with quality parameters
- **Conversations**: Interactive transcript player with speaker timelines
- **Goal Management**: Team goal tracking and progress monitoring
- **Campaign Management**: Marketing campaign performance
- **Alert Management**: System alerts and notifications

### Agent Dashboard
- Individual performance metrics
- Ticket resolution tracking
- Customer satisfaction ratings
- Response time analytics

## 🎯 Key Functional Requirements Implemented

### Single Conversation View (FR-DV-4.1 - 4.3)
- **Interactive Transcript Player**: Full transcript with audio synchronization
- **Visual Highlighting**: Filler words highlighted in yellow
- **Pause Indicators**: Long pauses marked as `[PAUSE 3.5s]`
- **Interruption Flags**: Visual indicators for conversation interruptions
- **Speaker Timeline**: Horizontal bar chart showing conversation flow
- **Key Metrics Panel**: Talk-to-listen ratio gauges and quality scores

### Aggregated Team Dashboard (FR-DV-4.4 - 4.6)
- **Leaderboards**: Agent performance comparisons and rankings
- **Trend Analysis**: Historical performance tracking over time
- **Advanced Filtering**: Team, Campaign, and Date Range filters

## 👥 User Personas

The application supports multiple user roles with Indian names throughout:

**Team Managers**: Priya Sharma, Rajesh Kumar, Karthik Krishnan
**Team Leaders**: Arjun Patel, Sneha Gupta, Rohit Mehta
**Agents**: Kavya Reddy, Vikram Singh, Ananya Iyer, Deepika Nair

## 🎨 Design System

- **Color Scheme**: Role-based color coding (Blue for Team Manager, Green for Team Leader, Purple for Agent)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable UI components with hover states and micro-interactions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Adaptive navigation and content layout
- Touch-friendly interface elements

## 🔄 Development History

### Phase 1: Initial Setup
- Created basic React + TypeScript + Tailwind CSS application
- Implemented multi-persona user switching
- Built role-based dashboard configurations

### Phase 2: Dashboard Implementation
- Developed metric cards and chart components
- Added system health monitoring
- Implemented recent activity feeds

### Phase 3: Team Leader Features
- Built comprehensive team overview page
- Implemented call quality analytics with conversation analysis
- Added interactive transcript player with speaker timelines
- Created goal management and campaign tracking

### Phase 4: Conversation Analysis Platform
- Implemented single conversation view with all FR-DV requirements
- Added aggregated team dashboard with leaderboards
- Built trend analysis and filtering capabilities
- Enhanced with visual indicators and quality metrics

### Phase 5: Content Population & Refinement
- Populated all pages with realistic data using Indian names
- Matched exact reference designs and layouts
- Removed unnecessary navigation elements
- Enhanced user experience with proper visual hierarchy

## 🚀 Deployment

The application is deployed on Bolt Hosting and accessible at:
https://multi-persona-analyt-hxrl.bolt.host

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team.