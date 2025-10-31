import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, RefreshCw } from 'lucide-react';
import Card from '../../components/Card';
import leaveService from '../../services/leaveService';
import { useToast } from '../../contexts/ToastContext';

export default function EmployeeLeaveHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { showError } = useToast();

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
    
    // Set up periodic refresh every 30 seconds to catch real-time updates
    const interval = setInterval(() => {
      fetchLeaveRequests();
    }, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get current user's leave requests
      const response = await leaveService.getAllLeaveRequests();
      
      // Filter to show only current user's requests (this would be handled by backend in real scenario)
      // For now, we'll show all requests as the backend should filter by user
      setRequests(response.data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setError('Failed to load leave requests. Please try again.');
      showError('Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeaveRequests();
    setRefreshing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'PENDING':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return daysDiff;
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <Card className="shadow-xl border-0 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading leave requests...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <Card className="shadow-xl border-0">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  My Leave Requests
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  View and track your leave request history
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Leave Requests Table */}
        {leaveRequests.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
              No Leave Requests Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              You haven't submitted any leave requests yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Leave Type
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Duration
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Days
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Applied Date
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {request.leaveType}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600 dark:text-gray-400">
                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600 dark:text-gray-400">
                        {calculateDuration(request.startDate, request.endDate)} days
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600 dark:text-gray-400">
                        {formatDate(request.appliedAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => openModal(request)}
                        className="flex items-center gap-1 px-3 py-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal for Leave Request Details */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Leave Request Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Leave Type
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {selectedRequest.leaveType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedRequest.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Start Date
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">
                      {formatDate(selectedRequest.startDate)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      End Date
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">
                      {formatDate(selectedRequest.endDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Duration
                  </label>
                  <p className="text-gray-800 dark:text-gray-200">
                    {calculateDuration(selectedRequest.startDate, selectedRequest.endDate)} days
                  </p>
                </div>

                {selectedRequest.reason && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Reason
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedRequest.reason}
                    </p>
                  </div>
                )}

                {selectedRequest.managerComments && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Manager Comments
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      {selectedRequest.managerComments}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Applied Date
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">
                      {formatDate(selectedRequest.appliedAt)}
                    </p>
                  </div>
                  {selectedRequest.reviewedAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Reviewed Date
                      </label>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatDate(selectedRequest.reviewedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}