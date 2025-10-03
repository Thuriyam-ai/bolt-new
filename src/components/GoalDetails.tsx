import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Settings, 
  BarChart3, 
  CheckCircle,
  Lock,
  Save,
  Plus,
  Trash2
} from 'lucide-react';

interface ScoringParameter {
  id: string;
  parameter: string;
  scoringType: 'Manual' | 'Automatic';
  failureType: 'Non-Fatal' | 'Fatal';
  maxScore: number;
  rulesExplanation: string;
}

interface DataField {
  id: string;
  attribute: string;
  dataType: 'Select' | 'Text' | 'Number' | 'Boolean';
  optionsValidation: string;
  elicitationPrompt: string;
  required: boolean;
  weight: number;
}

interface Disposition {
  id: string;
  name: string;
  description: string;
}

export function GoalDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('interaction-blueprint');
  const [analyticsToggles, setAnalyticsToggles] = useState({
    sentimentAnalysis: true,
    intentExtraction: true,
    emergentTopicsDetection: false
  });
  const [dispositions, setDispositions] = useState<Disposition[]>([
    {
      id: '1',
      name: 'Qualified Lead',
      description: 'Prospect meets all qualification criteria and is ready for next steps'
    },
    {
      id: '2',
      name: 'Callback Required',
      description: 'Prospect needs additional information or time to consider'
    },
    {
      id: '3',
      name: 'Not Qualified',
      description: 'Prospect does not meet qualification criteria'
    },
    {
      id: '4',
      name: 'No Interest',
      description: 'Prospect explicitly states no interest in the solution'
    },
    {
      id: '5',
      name: 'Wrong Contact',
      description: 'Contacted person is not the decision maker or appropriate contact'
    }
  ]);
  const [dataFields, setDataFields] = useState<DataField[]>([
    {
      id: '1',
      attribute: 'company_name',
      dataType: 'Text',
      optionsValidation: '',
      elicitationPrompt: 'What is the name of your company?',
      required: true,
      weight: 15
    },
    {
      id: '2',
      attribute: 'company_size',
      dataType: 'Select',
      optionsValidation: '1-10, 11-50, 51-200, 201-500, 500+',
      elicitationPrompt: 'How many employees does your company have?',
      required: true,
      weight: 20
    },
    {
      id: '3',
      attribute: 'industry',
      dataType: 'Select',
      optionsValidation: 'Technology, Healthcare, Finance, Manufacturing, Retail, Other',
      elicitationPrompt: 'What industry is your company in?',
      required: true,
      weight: 15
    },
    {
      id: '4',
      attribute: 'budget_range',
      dataType: 'Select',
      optionsValidation: 'Under $10K, $10K-$25K, $25K-$50K, $50K-$100K, $100K+',
      elicitationPrompt: 'What is your budget range for this type of solution?',
      required: false,
      weight: 25
    },
    {
      id: '5',
      attribute: 'timeline',
      dataType: 'Select',
      optionsValidation: 'Immediate, 1-3 months, 3-6 months, 6-12 months, 12+ months',
      elicitationPrompt: 'What is your timeline for implementing a solution?',
      required: false,
      weight: 15
    },
    {
      id: '6',
      attribute: 'decision_makers',
      dataType: 'Text',
      optionsValidation: '',
      elicitationPrompt: 'Who else would be involved in the decision-making process?',
      required: true,
      weight: 10
    }
  ]);
  const [scoringParameters, setScoringParameters] = useState<ScoringParameter[]>([
    {
      id: '1',
      parameter: 'Call Opening / Adherence to Opening Script',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 5,
      rulesExplanation: 'Greet the employer. Introduce themselves with name. Mention company name. Clearly state that this is a lead qualification call. 80% adherence to the opening script is acceptable.'
    },
    {
      id: '2',
      parameter: 'Effective Questioning and Probing',
      scoringType: 'Manual',
      failureType: 'Fatal',
      maxScore: 35,
      rulesExplanation: 'Agent must ask all mandatory questions clearly and appropriately. Agent should probe if answers are unclear or incomplete. Must gather key qualification information including company size, industry, budget range, timeline, decision-making process, and current challenges.'
    },
    {
      id: '3',
      parameter: 'Interruptions (if any)',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 5,
      rulesExplanation: 'Agent should not interrupt the prospect unless absolutely necessary. Must use active listening techniques and allow prospects to complete their thoughts.'
    },
    {
      id: '4',
      parameter: 'Unnecessary or Off-topic Conversation',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 5,
      rulesExplanation: 'Avoid irrelevant, personal, or casual talk not related to the qualification objective. Stay professional and focused on the purpose of the call. Maintain a consultative approach throughout the conversation.'
    },
    {
      id: '5',
      parameter: 'Incomplete Notes',
      scoringType: 'Manual',
      failureType: 'Fatal',
      maxScore: 20,
      rulesExplanation: 'Fails to capture complete contact information (name, email, phone, company). Records information incorrectly. Leaves required fields blank. Must document all qualification criteria properly.'
    },
    {
      id: '6',
      parameter: 'Correct Disposition Selection',
      scoringType: 'Manual',
      failureType: 'Fatal',
      maxScore: 10,
      rulesExplanation: 'Final disposition must match the prospect\'s actual qualification level. Must accurately assess fit for our solutions based on gathered information.'
    },
    {
      id: '7',
      parameter: 'Proper Call Flow / Sequence Followed',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 10,
      rulesExplanation: 'Introduction → Qualification Questions → Needs Assessment → Call Closing. Must follow proper call sequence and maintain professional flow.'
    },
    {
      id: '8',
      parameter: 'No False or Misleading Promises Made',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 5,
      rulesExplanation: 'Avoid statements like "I\'ll update it to backend team, they will resolve it for sure". No over-promising about solution capabilities. No misleading statements about pricing or timelines. Must be honest and transparent throughout the conversation.'
    },
    {
      id: '9',
      parameter: 'Proper Call Disconnection / Call Closing',
      scoringType: 'Manual',
      failureType: 'Non-Fatal',
      maxScore: 5,
      rulesExplanation: 'Agent must politely thank the prospect and clearly close the call. Schedule follow-up actions if qualified. Example: "Thank you for your time, I\'ll follow up as discussed."'
    }
  ]);

  const tabs = [
    { id: 'interaction-blueprint', label: 'Interaction Blueprint', icon: FileText },
    { id: 'structured-data-capture', label: 'Structured Data Capture', icon: Settings },
    { id: 'conversation-insights', label: 'Conversation Insights', icon: BarChart3 },
    { id: 'quality-scorecard', label: 'Quality Scorecard', icon: CheckCircle }
  ];

  const addParameter = () => {
    const newParameter: ScoringParameter = {
      id: Date.now().toString(),
      parameter: '',
      scoringType: 'Manual',
      maxScore: 0,
      failureType: 'Non-Fatal',
      rulesExplanation: ''
    };
    setScoringParameters([...scoringParameters, newParameter]);
  };

  const removeParameter = (id: string) => {
    setScoringParameters(scoringParameters.filter(param => param.id !== id));
  };

  const updateParameter = (id: string, field: keyof ScoringParameter, value: string | number) => {
    setScoringParameters(scoringParameters.map(param => 
      param.id === id ? { ...param, [field]: value } : param
    ));
  };

  const totalScore = scoringParameters.reduce((sum, param) => sum + param.maxScore, 0);
  const totalWeight = dataFields.reduce((sum, field) => sum + field.weight, 0);

  const addDataField = () => {
    const newField: DataField = {
      id: Date.now().toString(),
      attribute: '',
      dataType: 'Text',
      optionsValidation: '',
      elicitationPrompt: '',
      required: false,
      weight: 0
    };
    setDataFields([...dataFields, newField]);
  };

  const removeDataField = (id: string) => {
    setDataFields(dataFields.filter(field => field.id !== id));
  };

  const updateDataField = (id: string, field: keyof DataField, value: string | number | boolean) => {
    setDataFields(dataFields.map(dataField => 
      dataField.id === id ? { ...dataField, [field]: value } : dataField
    ));
  };

  const toggleAnalytics = (analyticsType: keyof typeof analyticsToggles) => {
    setAnalyticsToggles(prev => ({
      ...prev,
      [analyticsType]: !prev[analyticsType]
    }));
  };

  const addDisposition = () => {
    const newDisposition: Disposition = {
      id: Date.now().toString(),
      name: '',
      description: ''
    };
    setDispositions([...dispositions, newDisposition]);
  };

  const removeDisposition = (id: string) => {
    setDispositions(dispositions.filter(disposition => disposition.id !== id));
  };

  const updateDisposition = (id: string, field: keyof Disposition, value: string) => {
    setDispositions(dispositions.map(disposition => 
      disposition.id === id ? { ...disposition, [field]: value } : disposition
    ));
  };

  return (
    <div className="flex-1 bg-white">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/goal-mgmt')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Goals</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-8">
        {activeTab === 'interaction-blueprint' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Prompt & Instructions</h3>
              <div className="space-y-4">
                <textarea 
                  className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono"
                  defaultValue={`You are a professional lead qualification assistant. Your role is to:

1. Engage prospects in a friendly, professional manner
2. Gather key qualification information including:
   • Company size and industry
   • Budget range and timeline
   • Decision-making process
   • Current challenges and pain points
3. Assess fit for our solutions
4. Schedule appropriate follow-up actions

Guidelines:
Ask one question at a time to avoid overwhelming prospects. Use active listening techniques to build rapport and trust. Always be respectful of the prospect's time and clearly explain the purpose of each question. If a prospect is not qualified, politely thank them and offer alternative resources if appropriate.

Key Qualification Questions:
• What's your current role and how long have you been in this position?
• What's the size of your company and what industry are you in?
• What challenges are you currently facing that led you to explore solutions like ours?
• What's your timeline for implementing a solution?
• Who else would be involved in the decision-making process?
• What's your budget range for this type of solution?
• Have you evaluated similar solutions before?

Success Criteria:
• Complete contact information (name, email, phone, company)
• Clear understanding of their needs and challenges
• Budget and timeline confirmation
• Decision-making process and stakeholders identified
• Next steps agreed upon

Remember to maintain a consultative approach and focus on understanding their needs rather than immediately pitching our solution.`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structured-data-capture' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Structured Data Capture</h3>
                  <p className="text-sm text-gray-500 mt-1">Total Weight: {totalWeight} points</p>
                </div>
                <button
                  onClick={addDataField}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Field</span>
                </button>
              </div>

              {/* Data Fields Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-32">Attribute</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-20">Data Type</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-48">Options/Validation</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-64">Elicitation Prompt</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Required</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Weight</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFields.map((field, index) => (
                      <tr key={field.id} className="bg-white">
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={field.attribute}
                            onChange={(e) => updateDataField(field.id, 'attribute', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder="e.g., company_name"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <select
                            value={field.dataType}
                            onChange={(e) => updateDataField(field.id, 'dataType', e.target.value as 'Select' | 'Text' | 'Number' | 'Boolean')}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          >
                            <option value="Select">Select</option>
                            <option value="Text">Text</option>
                            <option value="Number">Number</option>
                            <option value="Boolean">Boolean</option>
                          </select>
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={field.optionsValidation}
                            onChange={(e) => updateDataField(field.id, 'optionsValidation', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder={field.dataType === 'Select' ? 'Option1, Option2, Option3' : 'Validation rules'}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={field.elicitationPrompt}
                            onChange={(e) => updateDataField(field.id, 'elicitationPrompt', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder="What is your company name?"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateDataField(field.id, 'required', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            value={field.weight}
                            onChange={(e) => updateDataField(field.id, 'weight', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => removeDataField(field.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete field"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {dataFields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Settings size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No data fields configured yet.</p>
                  <p className="text-sm">Click "ADD FIELD" to create your first data capture field.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'conversation-insights' && (
          <div className="space-y-6">
            {/* Analytics Toggles Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Configuration</h3>
              <p className="text-gray-600 mb-6">Enable or disable specific post-conversation analytics models.</p>
              
              <div className="space-y-4">
                {/* Sentiment Analysis Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Sentiment Analysis</h4>
                    <p className="text-xs text-gray-500 mt-1">Analyze the emotional tone and sentiment of conversations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsToggles.sentimentAnalysis}
                      onChange={() => toggleAnalytics('sentimentAnalysis')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Intent Extraction Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Intent Extraction</h4>
                    <p className="text-xs text-gray-500 mt-1">Identify and extract key intents and objectives from conversations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsToggles.intentExtraction}
                      onChange={() => toggleAnalytics('intentExtraction')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Emergent Topics Detection Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Emergent Topics Detection</h4>
                    <p className="text-xs text-gray-500 mt-1">Detect new and emerging topics that weren't initially anticipated</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsToggles.emergentTopicsDetection}
                      onChange={() => toggleAnalytics('emergentTopicsDetection')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Disposition Configuration Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Disposition Configuration</h3>
                  <p className="text-sm text-gray-500 mt-1">Define possible final conversation outcomes for this goal</p>
                </div>
                <button
                  onClick={addDisposition}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Disposition</span>
                </button>
              </div>

              {/* Dispositions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-48">Disposition Name</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-96">Description</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispositions.map((disposition, index) => (
                      <tr key={disposition.id} className="bg-white">
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={disposition.name}
                            onChange={(e) => updateDisposition(disposition.id, 'name', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder="e.g., Qualified Lead"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={disposition.description}
                            onChange={(e) => updateDisposition(disposition.id, 'description', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder="Description of this disposition"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => removeDisposition(disposition.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete disposition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {dispositions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No dispositions configured yet.</p>
                  <p className="text-sm">Click "ADD DISPOSITION" to create your first conversation outcome.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'quality-scorecard' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quality Scorecard</h3>
                  <p className="text-sm text-gray-500 mt-1">Total Score: {totalScore} points</p>
                </div>
                <button
                  onClick={addParameter}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Parameter</span>
                </button>
              </div>

              {/* Parameters Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-48">Parameter Name</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Scoring Type</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Failure Type</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-10">Max Score</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-64">Rules & Explanation</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoringParameters.map((param, index) => (
                      <tr key={param.id} className="bg-white">
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={param.parameter}
                            onChange={(e) => updateParameter(param.id, 'parameter', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                            placeholder="Parameter name"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <select
                            value={param.scoringType}
                            onChange={(e) => updateParameter(param.id, 'scoringType', e.target.value as 'Manual' | 'Automatic')}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                          </select>
                        </td>
                        <td className="px-2 py-2">
                          <select
                            value={param.failureType}
                            onChange={(e) => updateParameter(param.id, 'failureType', e.target.value as 'Non-Fatal' | 'Fatal')}
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          >
                            <option value="Non-Fatal">Non-Fatal</option>
                            <option value="Fatal">Fatal</option>
                          </select>
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            value={param.maxScore}
                            onChange={(e) => updateParameter(param.id, 'maxScore', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-1 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <div className="text-xs whitespace-pre-line">
                            {param.rulesExplanation.split('.').map((sentence, index) => 
                              sentence.trim() ? (
                                <div key={index} className="flex items-start mb-1">
                                  <span className="mr-1">•</span>
                                  <span>{sentence.trim()}{sentence.trim() && !sentence.endsWith('.') ? '.' : ''}</span>
                                </div>
                              ) : null
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => removeParameter(param.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete parameter"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {scoringParameters.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No scoring parameters configured yet.</p>
                  <p className="text-sm">Click "ADD PARAMETER" to create your first scoring criterion.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-gray-200 px-8 py-6">
        <div className="flex items-center justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Save size={16} />
            <span>Save Goal</span>
          </button>
        </div>
      </div>

    </div>
  );
}
