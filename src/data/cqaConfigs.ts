import { CQADashboardConfig, Goal, DashboardType } from '../types';

export const supportGoals: Goal[] = [
  {
    id: 'support-triage',
    name: 'Support Ticket Triage',
    description: 'Efficient ticket categorization and routing',
    dashboardType: 'support',
    scorecard: [
      {
        parameter: 'Issue Classification',
        maxScore: 30,
        failureType: 'Fatal',
        rules: 'Correctly categorize ticket type and priority level'
      },
      {
        parameter: 'Customer Information Gathering',
        maxScore: 20,
        failureType: 'Non-Fatal',
        rules: 'Collect relevant customer details and system information'
      },
      {
        parameter: 'Initial Resolution Attempt',
        maxScore: 25,
        failureType: 'Non-Fatal',
        rules: 'Attempt basic troubleshooting before escalation'
      },
      {
        parameter: 'Escalation Decision',
        maxScore: 15,
        failureType: 'Fatal',
        rules: 'Make appropriate escalation decisions based on complexity'
      },
      {
        parameter: 'Documentation Quality',
        maxScore: 10,
        failureType: 'Non-Fatal',
        rules: 'Provide clear, detailed ticket documentation'
      }
    ],
    analytics: {
      overallScore: 91.5,
      totalCalls: 156,
      fatalErrors: 1,
      avgDuration: '6:23',
      parameters: [
        {
          parameter: 'Issue Classification',
          maxScore: 30,
          currentScore: 27.9,
          adherence: 93,
          trend: 'up'
        },
        {
          parameter: 'Customer Information Gathering',
          maxScore: 20,
          currentScore: 18.4,
          adherence: 92,
          trend: 'up'
        },
        {
          parameter: 'Initial Resolution Attempt',
          maxScore: 25,
          currentScore: 22.8,
          adherence: 91,
          trend: 'down'
        },
        {
          parameter: 'Escalation Decision',
          maxScore: 15,
          currentScore: 14.2,
          adherence: 95,
          trend: 'up'
        },
        {
          parameter: 'Documentation Quality',
          maxScore: 10,
          currentScore: 9.5,
          adherence: 95,
          trend: 'up'
        }
      ]
    }
  },
  {
    id: 'empathy-scoring',
    name: 'Empathy & Communication',
    description: 'Customer service quality and emotional intelligence',
    dashboardType: 'support',
    scorecard: [
      {
        parameter: 'Active Listening',
        maxScore: 25,
        failureType: 'Fatal',
        rules: 'Demonstrate understanding and acknowledge customer concerns'
      },
      {
        parameter: 'Empathetic Responses',
        maxScore: 30,
        failureType: 'Fatal',
        rules: 'Show genuine care and understanding for customer situation'
      },
      {
        parameter: 'Professional Tone',
        maxScore: 20,
        failureType: 'Non-Fatal',
        rules: 'Maintain calm, professional demeanor throughout call'
      },
      {
        parameter: 'Solution Communication',
        maxScore: 25,
        failureType: 'Non-Fatal',
        rules: 'Clearly explain solutions and next steps'
      }
    ],
    analytics: {
      overallScore: 88.3,
      totalCalls: 203,
      fatalErrors: 2,
      avgDuration: '7:45',
      parameters: [
        {
          parameter: 'Active Listening',
          maxScore: 25,
          currentScore: 22.1,
          adherence: 88,
          trend: 'up'
        },
        {
          parameter: 'Empathetic Responses',
          maxScore: 30,
          currentScore: 26.7,
          adherence: 89,
          trend: 'up'
        },
        {
          parameter: 'Professional Tone',
          maxScore: 20,
          currentScore: 18.2,
          adherence: 91,
          trend: 'down'
        },
        {
          parameter: 'Solution Communication',
          maxScore: 25,
          currentScore: 21.5,
          adherence: 86,
          trend: 'up'
        }
      ]
    }
  }
];

export const salesGoals: Goal[] = [
  {
    id: 'lead-qualification',
    name: 'Lead Qualification Assistant',
    description: 'Professional lead qualification with comprehensive scoring',
    dashboardType: 'sales',
    scorecard: [
      {
        parameter: 'Call Opening Adherence',
        maxScore: 10,
        failureType: 'Non-Fatal',
        rules: 'Greet professionally, introduce with name, mention company, state purpose'
      },
      {
        parameter: 'Effective Questioning',
        maxScore: 25,
        failureType: 'Fatal',
        rules: 'Ask all mandatory questions clearly and appropriately'
      },
      {
        parameter: 'Budget & Timeline Assessment',
        maxScore: 20,
        failureType: 'Fatal',
        rules: 'Confirm budget range and implementation timeline'
      },
      {
        parameter: 'Decision Process Identification',
        maxScore: 15,
        failureType: 'Non-Fatal',
        rules: 'Identify key stakeholders and decision-making process'
      },
      {
        parameter: 'Needs Assessment',
        maxScore: 15,
        failureType: 'Fatal',
        rules: 'Understand current challenges and pain points'
      },
      {
        parameter: 'Professional Communication',
        maxScore: 10,
        failureType: 'Non-Fatal',
        rules: 'Maintain professional tone, avoid interruptions'
      },
      {
        parameter: 'Call Closing',
        maxScore: 5,
        failureType: 'Non-Fatal',
        rules: 'Thank prospect, summarize next steps, close professionally'
      }
    ],
    analytics: {
      overallScore: 87.2,
      totalCalls: 212,
      fatalErrors: 3,
      avgDuration: '8:45',
      parameters: [
        {
          parameter: 'Call Opening Adherence',
          maxScore: 10,
          currentScore: 8.4,
          adherence: 84,
          trend: 'down'
        },
        {
          parameter: 'Effective Questioning',
          maxScore: 25,
          currentScore: 20.3,
          adherence: 81,
          trend: 'down'
        },
        {
          parameter: 'Budget & Timeline Assessment',
          maxScore: 20,
          currentScore: 17.8,
          adherence: 89,
          trend: 'up'
        },
        {
          parameter: 'Decision Process Identification',
          maxScore: 15,
          currentScore: 13.2,
          adherence: 88,
          trend: 'up'
        },
        {
          parameter: 'Needs Assessment',
          maxScore: 15,
          currentScore: 14.1,
          adherence: 94,
          trend: 'up'
        },
        {
          parameter: 'Professional Communication',
          maxScore: 10,
          currentScore: 9.2,
          adherence: 92,
          trend: 'up'
        },
        {
          parameter: 'Call Closing',
          maxScore: 5,
          currentScore: 4.7,
          adherence: 94,
          trend: 'up'
        }
      ]
    }
  },
  {
    id: 'objection-handling',
    name: 'Objection Handling Excellence',
    description: 'Advanced objection handling and persuasion techniques',
    dashboardType: 'sales',
    scorecard: [
      {
        parameter: 'Objection Identification',
        maxScore: 20,
        failureType: 'Fatal',
        rules: 'Recognize and acknowledge customer objections clearly'
      },
      {
        parameter: 'Empathy Response',
        maxScore: 25,
        failureType: 'Fatal',
        rules: 'Show understanding before addressing the objection'
      },
      {
        parameter: 'Solution Presentation',
        maxScore: 30,
        failureType: 'Fatal',
        rules: 'Present relevant solutions and benefits clearly'
      },
      {
        parameter: 'Objection Resolution',
        maxScore: 25,
        failureType: 'Non-Fatal',
        rules: 'Successfully address and resolve customer concerns'
      }
    ],
    analytics: {
      overallScore: 84.7,
      totalCalls: 145,
      fatalErrors: 4,
      avgDuration: '12:30',
      parameters: [
        {
          parameter: 'Objection Identification',
          maxScore: 20,
          currentScore: 17.2,
          adherence: 86,
          trend: 'up'
        },
        {
          parameter: 'Empathy Response',
          maxScore: 25,
          currentScore: 20.8,
          adherence: 83,
          trend: 'down'
        },
        {
          parameter: 'Solution Presentation',
          maxScore: 30,
          currentScore: 25.4,
          adherence: 85,
          trend: 'up'
        },
        {
          parameter: 'Objection Resolution',
          maxScore: 25,
          currentScore: 21.3,
          adherence: 85,
          trend: 'up'
        }
      ]
    }
  }
];

export const customerSuccessGoals: Goal[] = [
  {
    id: 'health-assessment',
    name: 'Customer Health Assessment',
    description: 'Comprehensive customer health and satisfaction evaluation',
    dashboardType: 'customer-success',
    scorecard: [
      {
        parameter: 'Health Score Calculation',
        maxScore: 30,
        failureType: 'Fatal',
        rules: 'Accurately assess customer health using defined criteria'
      },
      {
        parameter: 'Usage Pattern Analysis',
        maxScore: 25,
        failureType: 'Non-Fatal',
        rules: 'Analyze and discuss product usage patterns'
      },
      {
        parameter: 'Satisfaction Measurement',
        maxScore: 20,
        failureType: 'Fatal',
        rules: 'Gather and document customer satisfaction feedback'
      },
      {
        parameter: 'Risk Identification',
        maxScore: 25,
        failureType: 'Fatal',
        rules: 'Identify potential churn or expansion opportunities'
      }
    ],
    analytics: {
      overallScore: 92.1,
      totalCalls: 98,
      fatalErrors: 1,
      avgDuration: '15:20',
      parameters: [
        {
          parameter: 'Health Score Calculation',
          maxScore: 30,
          currentScore: 28.2,
          adherence: 94,
          trend: 'up'
        },
        {
          parameter: 'Usage Pattern Analysis',
          maxScore: 25,
          currentScore: 23.1,
          adherence: 92,
          trend: 'up'
        },
        {
          parameter: 'Satisfaction Measurement',
          maxScore: 20,
          currentScore: 18.4,
          adherence: 92,
          trend: 'up'
        },
        {
          parameter: 'Risk Identification',
          maxScore: 25,
          currentScore: 22.4,
          adherence: 90,
          trend: 'down'
        }
      ]
    }
  },
  {
    id: 'expansion-opportunities',
    name: 'Expansion Opportunity Detection',
    description: 'Identify and nurture upselling and expansion opportunities',
    dashboardType: 'customer-success',
    scorecard: [
      {
        parameter: 'Growth Signal Recognition',
        maxScore: 35,
        failureType: 'Fatal',
        rules: 'Identify signals indicating growth potential'
      },
      {
        parameter: 'Value Demonstration',
        maxScore: 30,
        failureType: 'Fatal',
        rules: 'Demonstrate additional value of expanded services'
      },
      {
        parameter: 'Timing Assessment',
        maxScore: 20,
        failureType: 'Non-Fatal',
        rules: 'Evaluate optimal timing for expansion discussions'
      },
      {
        parameter: 'Next Steps Planning',
        maxScore: 15,
        failureType: 'Non-Fatal',
        rules: 'Plan and schedule appropriate next steps'
      }
    ],
    analytics: {
      overallScore: 89.6,
      totalCalls: 67,
      fatalErrors: 2,
      avgDuration: '18:45',
      parameters: [
        {
          parameter: 'Growth Signal Recognition',
          maxScore: 35,
          currentScore: 31.2,
          adherence: 89,
          trend: 'up'
        },
        {
          parameter: 'Value Demonstration',
          maxScore: 30,
          currentScore: 26.8,
          adherence: 89,
          trend: 'up'
        },
        {
          parameter: 'Timing Assessment',
          maxScore: 20,
          currentScore: 18.1,
          adherence: 91,
          trend: 'down'
        },
        {
          parameter: 'Next Steps Planning',
          maxScore: 15,
          currentScore: 13.5,
          adherence: 90,
          trend: 'up'
        }
      ]
    }
  }
];

export const cqaConfigs: Record<DashboardType, CQADashboardConfig> = {
  support: {
    type: 'support',
    goals: supportGoals,
    analytics: {
      overallScore: 89.9,
      totalCalls: 359,
      fatalErrors: 3,
      avgDuration: '7:04'
    },
    specializedMetrics: [
      { title: 'First Call Resolution', value: '78%', change: 5.2, changeType: 'positive', icon: 'CheckCircle' },
      { title: 'Customer Satisfaction', value: '4.6/5', change: 0.3, changeType: 'positive', icon: 'Star' },
      { title: 'Escalation Rate', value: '12%', change: -2.1, changeType: 'positive', icon: 'ArrowUp' },
      { title: 'Avg Response Time', value: '2.3min', change: -0.8, changeType: 'positive', icon: 'Clock' }
    ]
  },
  sales: {
    type: 'sales',
    goals: salesGoals,
    analytics: {
      overallScore: 85.9,
      totalCalls: 357,
      fatalErrors: 7,
      avgDuration: '10:37'
    },
    specializedMetrics: [
      { title: 'Conversion Rate', value: '23%', change: 3.1, changeType: 'positive', icon: 'TrendingUp' },
      { title: 'Pipeline Value', value: '$2.4M', change: 12.5, changeType: 'positive', icon: 'DollarSign' },
      { title: 'Deal Velocity', value: '18 days', change: -2.3, changeType: 'positive', icon: 'Zap' },
      { title: 'Qualification Rate', value: '67%', change: 4.2, changeType: 'positive', icon: 'Target' }
    ]
  },
  'customer-success': {
    type: 'customer-success',
    goals: customerSuccessGoals,
    analytics: {
      overallScore: 90.8,
      totalCalls: 165,
      fatalErrors: 3,
      avgDuration: '17:02'
    },
    specializedMetrics: [
      { title: 'Health Score', value: '8.2/10', change: 0.4, changeType: 'positive', icon: 'Heart' },
      { title: 'Expansion Rate', value: '31%', change: 6.8, changeType: 'positive', icon: 'TrendingUp' },
      { title: 'Churn Risk', value: '8%', change: -1.2, changeType: 'positive', icon: 'AlertTriangle' },
      { title: 'Feature Adoption', value: '73%', change: 5.1, changeType: 'positive', icon: 'Users' }
    ]
  }
};
