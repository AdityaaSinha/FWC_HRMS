import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Bell, TrendingUp, Award, Target, ChevronRight, Activity } from 'lucide-react';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import EmployeeLeaveApply from './EmployeeLeaveApply';
import EmployeeChatbot from './EmployeeChatbot';
import { useUser } from '../../contexts/UserContext';

// Mock user data as fallback
const MOCK_EMPLOYEE = {
  name: 'Aryabrat Mishra',
  email: 'aryabrat.mishra@company.com',
  employeeId: 'EMP001',
  leaveBalance: 12,
  pendingRequests: 1,
  nextReview: '2026-01-15',
  recentActivity: [
    { action: 'Leave request approved', time: '2 hours ago', type: 'success' },
    { action: 'Attendance marked', time: '9:15 AM today', type: 'info' },
    { action: 'Performance review scheduled', time: 'Yesterday', type: 'warning' }
  ],
  quickStats: {
    attendanceRate: 95,
    completedGoals: 8,
    totalGoals: 10,
    upcomingDeadlines: 3
  }
};

export default function EmployeeDashboardHome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user: contextUser, loading, error } = useUser();
  const navigate = useNavigate();

  // Merge context user data with mock data for additional fields
  const user = contextUser ? {
    ...MOCK_EMPLOYEE,
    name: contextUser.name,
    email: contextUser.email,
    employeeId: contextUser.employeeId || contextUser.id,
    role: contextUser.role
  } : MOCK_EMPLOYEE;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation handlers for Quick Links
  const handleQuickLinkClick = (linkType) => {
    switch (linkType) {
      case 'View Payslips':
        navigate('/employee/payroll');
        break;
      case 'Update Profile':
        navigate('/employee/profile');
        break;
      case 'Check Attendance':
        navigate('/employee/attendance');
        break;
      case 'Team Directory':
        navigate('/employee/team');
        break;
      default:
        console.log(`Navigation for ${linkType} not implemented yet`);
    }
  };

  // Handler for View All Activity
  const handleViewAllActivity = () => {
    navigate('/employee/activity');
  };

  // Handler for View Details in performance metrics
  const handleViewDetails = () => {
    navigate('/employee/performance');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <div className="w-2 h-2 bg-green-400 rounded-full"></div>;
      case 'warning': return <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>;
      case 'info': return <div className="w-2 h-2 bg-blue-400 rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Clock size={16} />
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Activity className="text-indigo-400" size={24} />
                <div>
                  <p className="text-sm text-gray-400">Today's Status</p>
                  <p className="text-lg font-semibold text-indigo-400">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-600/30 rounded-lg">
              <Calendar className="text-indigo-400" size={24} />
            </div>
            <span className="text-2xl font-bold text-indigo-400">{user.leaveBalance}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Leave Balance</h3>
          <p className="text-gray-500 text-sm">days remaining</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-600/30 rounded-lg">
              <Bell className="text-yellow-400" size={24} />
            </div>
            <span className="text-2xl font-bold text-yellow-400">{user.pendingRequests}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Pending Requests</h3>
          <p className="text-gray-500 text-sm">awaiting approval</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600/30 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <span className="text-2xl font-bold text-green-400">{user.quickStats.attendanceRate}%</span>
          </div>
          <h3 className="text-gray-300 font-medium">Attendance Rate</h3>
          <p className="text-gray-500 text-sm">this month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600/30 rounded-lg">
              <Target className="text-purple-400" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-400">{user.quickStats.completedGoals}/{user.quickStats.totalGoals}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Goals Progress</h3>
          <p className="text-gray-500 text-sm">completed this quarter</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Main Widgets */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300">
              <EmployeeLeaveApply showTitle={true} />
            </Card>

            <Card className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <EmployeeChatbot />
            </Card>
          </div>

          {/* Performance Overview */}
          <Card className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <Award className="text-indigo-400" size={24} />
                Performance Overview
              </h3>
              <button 
                onClick={handleViewDetails}
                className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
              >
                View Details <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeDasharray={`${user.quickStats.attendanceRate}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-400">{user.quickStats.attendanceRate}%</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Attendance</p>
              </div>

              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      strokeDasharray={`${(user.quickStats.completedGoals / user.quickStats.totalGoals) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-400">{user.quickStats.completedGoals}/{user.quickStats.totalGoals}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Goals</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-full border border-yellow-500/30">
                  <span className="text-2xl font-bold text-yellow-400">{user.quickStats.upcomingDeadlines}</span>
                </div>
                <p className="text-gray-400 text-sm">Upcoming Deadlines</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Activity Feed */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Activity className="text-indigo-400" size={20} />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#2A2D3D]/50 hover:bg-[#2A2D3D] transition-colors">
                  <div className="mt-2">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleViewAllActivity}
              className="w-full mt-4 py-2 text-indigo-400 hover:text-indigo-300 transition text-sm font-medium"
            >
              View All Activity
            </button>
          </Card>

          {/* Quick Links */}
          <Card className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h3>
            
            <div className="space-y-3">
              {[
                { label: 'View Payslips', icon: '💰', color: 'text-green-400' },
                { label: 'Update Profile', icon: '👤', color: 'text-blue-400' },
                { label: 'Check Attendance', icon: '⏰', color: 'text-yellow-400' },
                { label: 'Team Directory', icon: '👥', color: 'text-purple-400' }
              ].map((link, index) => (
                <button 
                  key={index} 
                  onClick={() => handleQuickLinkClick(link.label)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#2A2D3D]/50 hover:bg-[#2A2D3D] transition-colors text-left"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className={`font-medium ${link.color}`}>{link.label}</span>
                  <ChevronRight size={16} className="ml-auto text-gray-500" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
