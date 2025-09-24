import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Heart, Target, Users, CheckCircle, PieChart, Star, Database, FileText, Zap, Activity, Clock, AlertTriangle } from 'lucide-react';
import { MetricCard as MetricCardType } from '../types';

const iconMap = {
  DollarSign,
  TrendingUp,
  Heart,
  Target,
  Users,
  CheckCircle,
  PieChart,
  Star,
  Database,
  FileText,
  Zap,
  Activity,
  Clock,
  AlertTriangle
};

interface MetricCardProps {
  metric: MetricCardType;
  accentColor: string;
}

export function MetricCard({ metric, accentColor }: MetricCardProps) {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const isPositiveChange = metric.changeType === 'positive';
  const isNegativeChange = metric.changeType === 'negative';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 rounded-lg ${accentColor} bg-opacity-10 flex items-center justify-center mb-4`}>
            <IconComponent size={20} className={`${accentColor.replace('bg-', 'text-')}`} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
          <div className="flex items-center space-x-1">
            {isPositiveChange && <TrendingUp size={14} className="text-emerald-500" />}
            {isNegativeChange && <TrendingDown size={14} className="text-red-500" />}
            <span className={`text-sm font-medium ${
              isPositiveChange ? 'text-emerald-500' : 
              isNegativeChange ? 'text-red-500' : 
              'text-gray-500'
            }`}>
              {Math.abs(metric.change)}%
            </span>
            <span className="text-gray-500 text-sm">this period</span>
          </div>
        </div>
      </div>
    </div>
  );
}