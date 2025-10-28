import React, { useState } from 'react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import {Icon} from '../../components/icon';
import { MOCK_LEAVE_REQUESTS } from '../../mocks/MOCK_LEAVE_REQUESTS';

export default function ManagerLeaveRequests({ showTitle = true }) {
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);

  const handleApproval = (id, status) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-6">
      {showTitle && <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Leave Requests</h1>}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100">{req.name}</td>
                  <td className="py-3 px-4 text-sm">{req.startDate} to {req.endDate}</td>
                  <td className="py-3 px-4 text-sm">{req.reason}</td>
                  <td className="py-3 px-4"><StatusBadge text={req.status} type={req.status} /></td>
                  <td className="py-3 px-4">
                    {req.status === 'Pending' ? (
                      <div className="flex space-x-2">
                        <button onClick={() => handleApproval(req.id, 'Approved')} className="p-1.5 rounded-full bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700">
                          <Icon as="Check" size={16} />
                        </button>
                        <button onClick={() => handleApproval(req.id, 'Rejected')} className="p-1.5 rounded-full bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-700">
                          <Icon as="X" size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm italic text-gray-500">Handled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
