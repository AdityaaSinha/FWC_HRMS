import React, { useState } from 'react';
import { Calendar, Clock, FileText, Send } from 'lucide-react';
import Card from '../../components/Card';
import leaveService from '../../services/leaveService';

export default function EmployeeLeaveApply({ showTitle = true }) {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.leaveType || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Validate date range
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (endDate < startDate) {
      setError('End date cannot be before start date');
      return;
    }
    
    // Calculate leave duration
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    
    setLoading(true);
    setError(null);
    
    try {
      // Map form leave types to API enum values
      const leaveTypeMapping = {
        'vacation': 'ANNUAL',
        'sick': 'SICK',
        'personal': 'PERSONAL',
        'emergency': 'EMERGENCY',
        'maternity': 'MATERNITY'
      };
      
      const leaveRequestData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        leaveType: leaveTypeMapping[formData.leaveType] || 'ANNUAL'
      };
      
      await leaveService.createLeaveRequest(leaveRequestData);
      
      // Show success message
      alert(`Leave request submitted successfully! Duration: ${daysDiff} day(s)`);
      
      // Reset form
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError(error.message || 'Failed to submit leave request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="shadow-xl border-0">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {showTitle ? "Apply for Leave" : "Quick Leave Request"}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-11">
            Submit your leave request with all necessary details
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Leave Type Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <FileText className="w-4 h-4" />
              Leave Type *
            </label>
            <select 
              value={formData.leaveType}
              onChange={(e) => handleInputChange('leaveType', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-white"
              required
            >
              <option value="">Select leave type</option>
              <option value="vacation">Vacation Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="emergency">Emergency Leave</option>
              <option value="maternity">Maternity/Paternity Leave</option>
            </select>
          </div>

          {/* Date Selection Section */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              Leave Duration *
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Start Date
                </label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  End Date
                </label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Reason for Leave
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Please provide a brief explanation for your leave request..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            />
          </div>

          {/* Submit Button Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5'
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
