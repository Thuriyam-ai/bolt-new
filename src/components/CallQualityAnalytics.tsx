import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Clock, 
  Star, 
  AlertTriangle,
  ChevronDown,
  Filter,
  Search,
  Play,
  Pause,
  Volume2,
  MessageSquare,
  Users,
  Calendar,
  Download,
  Eye,
  Info,
  User
} from 'lucide-react';

export function CallQualityAnalytics() {
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Call Quality Analytics</h1>
        <p className="text-gray-600 text-lg">Comprehensive call quality metrics and performance analysis based on WorkIndia standards</p>
      </div>

      {/* Scoring Rules Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Scoring Rules</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>Fatal Errors:</strong> Single fatal error = 30% score reduction, Multiple fatal errors = 75% score reduction</p>
              <p><strong>Non-Fatal Errors:</strong> Single non-fatal error = 10% score reduction, Multiple non-fatal errors = 20% score reduction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center">
              <BarChart3 size={20} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Overall Score</h3>
          <p className="text-4xl font-bold text-blue-600">87.2%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500 bg-opacity-10 flex items-center justify-center">
              <Phone size={20} className="text-green-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Calls</h3>
          <p className="text-4xl font-bold text-green-600">212</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500 bg-opacity-10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Fatal Errors</h3>
          <p className="text-4xl font-bold text-red-600">3</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center">
              <Clock size={20} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Call Duration</h3>
          <p className="text-4xl font-bold text-blue-600">8:45</p>
        </div>
      </div>

      {/* Call Quality Parameters Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Call Quality Parameters Analysis</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Parameter</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Max Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Current Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Adherence %</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Call Opening / Adherence to Opening Script</p>
                    <p className="text-sm text-gray-500">Greet employer, introduce with name, mention WorkIndia, state feedback call purpose</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.2</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">84%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Effective Questioning and Probing</p>
                    <p className="text-sm text-gray-500">Agent must ask all 5 mandatory questions clearly and appropriately</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">35</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                    Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">28.5</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">81%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Interruptions (if any)</p>
                    <p className="text-sm text-gray-500">Agent should not interrupt employer unless absolutely necessary</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.8</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">96%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Unnecessary or Off-topic Conversation</p>
                    <p className="text-sm text-gray-500">Avoid irrelevant, personal, or casual talk not related to feedback objective</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.6</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">92%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Incomplete Notes</p>
                    <p className="text-sm text-gray-500">Fails to capture, records incorrectly, or leaves field blank</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">20</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                    Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">18.2</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">91%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Correct Disposition Selection</p>
                    <p className="text-sm text-gray-500">Final disposition must match employer's actual response</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">10</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                    Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">9.1</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">91%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Proper Call Flow / Sequence Followed</p>
                    <p className="text-sm text-gray-500">Introduction → Feedback Questions → Call Closing</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">10</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">9.3</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">93%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">No False or Misleading Promises Made</p>
                    <p className="text-sm text-gray-500">Avoid misleading or over-promising statements</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.9</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">98%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">Proper Call Disconnection / Call Closing</p>
                    <p className="text-sm text-gray-500">Agent must politely thank employer and clearly close the call</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.7</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">94%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Agent Performance Summary</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Agent Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fatal Errors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Non-Fatal Errors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Calls</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Priya Sharma</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-lg font-semibold text-orange-600">87.2%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">0</td>
                <td className="py-4 px-4 text-gray-700">2</td>
                <td className="py-4 px-4 text-gray-700">45</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                    Excellent
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Arjun Patel</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-lg font-semibold text-orange-600">82.1%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">1</td>
                <td className="py-4 px-4 text-gray-700">3</td>
                <td className="py-4 px-4 text-gray-700">38</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-700">
                    Good
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Kavya Reddy</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-lg font-semibold text-green-600">94.5%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">0</td>
                <td className="py-4 px-4 text-gray-700">1</td>
                <td className="py-4 px-4 text-gray-700">52</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                    Excellent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}