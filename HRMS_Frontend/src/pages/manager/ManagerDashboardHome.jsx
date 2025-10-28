import React, { useState } from 'react';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import ManagerLeaveRequests from './ManagerLeaveRequests';
import { MOCK_LEAVE_REQUESTS } from '../../mocks/MOCK_LEAVE_REQUESTS';
import { mockFetchAIGeneration } from '../../mocks/mockAPI';
import {Icon} from '../../components/icon';
import AILoadingSpinner from '../../components/AILoadingSpinner';

export default function ManagerDashboardHome() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSummary = async () => {
    setIsLoading(true);
    const res = await mockFetchAIGeneration('summarizeFeedback', {});
    if (res.success) setSummary(res.data);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manager Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="My Team" value="2" icon="Users" color="indigo" />
        <StatCard title="Pending Leave" value={MOCK_LEAVE_REQUESTS.filter(l => l.status === 'Pending').length} icon="Umbrella" color="yellow" />
        <StatCard title="Reviews Due" value="1" icon="FileText" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Pending Leave Requests</h2>
          <ManagerLeaveRequests showTitle={false} />
        </Card>
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">AI Performance Summary</h2>
            <button 
              onClick={getSummary} 
              disabled={isLoading}
              className="flex items-center text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg font-medium shadow hover:bg-indigo-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? <AILoadingSpinner size={4} /> : <><Icon as="Zap" size={16} className="mr-1" /> Generate</>}
            </button>
          </div>
          {summary ? (
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-green-500">Key Strengths</h3>
                <ul className="list-disc list-inside text-sm">{summary.strengths.map(s => <li key={s}>{s}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-500">Areas for Growth</h3>
                <ul className="list-disc list-inside text-sm">{summary.growth_areas.map(g => <li key={g}>{g}</li>)}</ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click "Generate" to get an AI summary of your team's latest performance reviews.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
