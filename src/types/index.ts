export interface User {
  id: string;
  name: string;
  email: string;
  role: 'team_manager' | 'team_leader' | 'agent';
  avatar?: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export type DashboardType = 'support' | 'sales' | 'customer-success';

export interface DashboardConfig {
  type: DashboardType;
  metrics: MetricCard[];
  charts: {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area';
    data: ChartData;
  }[];
}

export interface CQADashboardConfig {
  type: DashboardType;
  goals: Goal[];
  analytics: {
    overallScore: number;
    totalCalls: number;
    fatalErrors: number;
    avgDuration: string;
  };
  specializedMetrics: MetricCard[];
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  dashboardType: DashboardType;
  scorecard: {
    parameter: string;
    maxScore: number;
    failureType: 'Fatal' | 'Non-Fatal';
    rules: string;
  }[];
  analytics: {
    overallScore: number;
    totalCalls: number;
    fatalErrors: number;
    avgDuration: string;
    parameters: {
      parameter: string;
      maxScore: number;
      currentScore: number;
      adherence: number;
      trend: 'up' | 'down';
    }[];
  };
}