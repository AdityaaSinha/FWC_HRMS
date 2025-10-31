import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import {Icon} from '../../components/icon';
import leaveService from '../../services/leaveService';
import { useToast } from '../../contexts/ToastContext';

export default function ManagerLeaveRequests({ showTitle = true }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [managerComments, setManagerComments] = useState('');
  const { showSuccess, showError } = useToast();

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leaveService.getAllLeaveRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to fetch leave requests');
      console.error('Error fetching leave requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const openActionModal = (action, requestId, requestDetails) => {
    setModalData({ action, requestId, requestDetails });
    setManagerComments('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ action: '', requestId: null, requestDetails: null });
    setManagerComments('');
  };

  const handleApproval = async () => {
    const { action, requestId } = modalData;
    
    if (action === 'REJECTED' && !managerComments.trim()) {
      showError('Please provide comments for rejection');
      return;
    }
    
    try {
      setActionLoading(requestId);
      
      let updatedRequest;
      if (action === 'APPROVED') {
        updatedRequest = await leaveService.approveLeaveRequest(requestId, managerComments);
        showSuccess('Leave request approved successfully!');
      } else if (action === 'REJECTED') {
        updatedRequest = await leaveService.rejectLeaveRequest(requestId, managerComments);
        showSuccess('Leave request rejected successfully!');
      }
      
      // Refresh the leave requests data
      await fetchLeaveRequests();
      
      // Clear the modal and comments
      closeModal();
    } catch (err) {
      console.error(`Error ${action.toLowerCase()} leave request:`, err);
      showError(`Failed to ${action.toLowerCase()} leave request`);
    } finally {
      setActionLoading(null);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Map database status to display status
  const getDisplayStatus = (status) => {
    const statusMap = {
      'PENDING': 'Pending',
      'APPROVED': 'Approved',
      'REJECTED': 'Rejected',
      'CANCELLED': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {showTitle && <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Leave Requests</h1>}
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading leave requests...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {showTitle && <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Leave Requests</h1>}
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Icon as="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button 
                onClick={fetchLeaveRequests}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Leave Requests</h1>}
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                requests.map(req => (
                  <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100">
                      <div>
                        <div>{req.employee?.name || 'Unknown Employee'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {req.employee?.employeeId} • {req.employee?.department}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {req.leaveType?.replace('_', ' ') || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <div>{formatDate(req.startDate)} to {formatDate(req.endDate)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Applied: {formatDate(req.appliedAt)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="max-w-xs truncate" title={req.reason}>
                        {req.reason}
                      </div>
                      {req.managerComments && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Manager: {req.managerComments}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge text={getDisplayStatus(req.status)} type={req.status} />
                    </td>
                    <td className="py-3 px-4">
                      {req.status === 'PENDING' ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => openActionModal('APPROVED', req.id, req)}
                            disabled={actionLoading === req.id}
                            className="p-1.5 rounded-full bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700 transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            {actionLoading === req.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                            ) : (
                              <Icon as="Check" size={16} />
                            )}
                          </button>
                          <button 
                            onClick={() => openActionModal('REJECTED', req.id, req)}
                            disabled={actionLoading === req.id}
                            className="p-1.5 rounded-full bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-700 transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            {actionLoading === req.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <Icon as="X" size={16} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm italic text-gray-500 dark:text-gray-400">
                          {req.reviewedAt ? `Reviewed ${formatDate(req.reviewedAt)}` : 'Handled'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {modalData.action === 'APPROVED' ? 'Approve' : 'Reject'} Leave Request
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icon as="X" size={20} />
              </button>
            </div>
            
            {modalData.requestDetails && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div><strong>Employee:</strong> {modalData.requestDetails.employee?.name}</div>
                  <div><strong>Leave Type:</strong> {modalData.requestDetails.leaveType}</div>
                  <div><strong>Dates:</strong> {formatDate(modalData.requestDetails.startDate)} to {formatDate(modalData.requestDetails.endDate)}</div>
                  <div><strong>Reason:</strong> {modalData.requestDetails.reason}</div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Manager Comments {modalData.action === 'REJECTED' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={managerComments}
                onChange={(e) => setManagerComments(e.target.value)}
                placeholder={modalData.action === 'APPROVED' ? 'Optional comments...' : 'Please provide a reason for rejection...'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                rows="3"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApproval}
                disabled={modalData.action === 'REJECTED' && !managerComments.trim()}
                className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  modalData.action === 'APPROVED' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {modalData.action === 'APPROVED' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
