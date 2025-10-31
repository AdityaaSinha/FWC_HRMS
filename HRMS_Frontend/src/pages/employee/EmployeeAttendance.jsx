import React, { useState, useEffect } from 'react';
import { Clock, Calendar, TrendingUp, CheckCircle, XCircle, Play, Square, BarChart3, MapPin, Timer, Award } from 'lucide-react';

const MOCK_ATTENDANCE_DATA = {
  currentStatus: 'checked-in',
  checkInTime: '09:15 AM',
  checkOutTime: null,
  totalHours: '7h 45m',
  breakTime: '45m',
  location: 'Office - Bangalore',
  monthlyStats: {
    totalDays: 22,
    presentDays: 20,
    absentDays: 1,
    lateDays: 1,
    attendanceRate: 91,
    averageHours: '8h 15m'
  },
  recentHistory: [
    { date: '2025-12-20', checkIn: '09:15 AM', checkOut: '06:30 PM', hours: '8h 30m', status: 'present' },
    { date: '2025-12-19', checkIn: '09:45 AM', checkOut: '06:15 PM', hours: '7h 45m', status: 'late' },
    { date: '2025-12-18', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '8h 15m', status: 'present' },
    { date: '2025-12-17', checkIn: null, checkOut: null, hours: '0h', status: 'absent' },
    { date: '2025-12-16', checkIn: '09:10 AM', checkOut: '06:20 PM', hours: '8h 25m', status: 'present' }
  ],
  weeklyChart: [
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 7.8 },
    { day: 'Wed', hours: 8.2 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 8.4 }
  ]
};

export default function EmployeeAttendance() {
  const [attendanceData, setAttendanceData] = useState(MOCK_ATTENDANCE_DATA);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnBreak, setIsOnBreak] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setAttendanceData(prev => ({
      ...prev,
      currentStatus: 'checked-in',
      checkInTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  const handleClockOut = () => {
    setAttendanceData(prev => ({
      ...prev,
      currentStatus: 'checked-out',
      checkOutTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'late': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'absent': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle size={16} />;
      case 'late': return <Clock size={16} />;
      case 'absent': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Attendance Tracking
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Calendar size={16} />
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-400" size={24} />
                <div>
                  <p className="text-sm text-gray-400">Current Time</p>
                  <p className="text-lg font-semibold text-indigo-400">
                    {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-2xl border border-gray-700/50 backdrop-blur-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Status Card */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  attendanceData.currentStatus === 'checked-in' 
                    ? 'bg-green-600/20 border-4 border-green-500/30' 
                    : 'bg-gray-600/20 border-4 border-gray-500/30'
                }`}>
                  {attendanceData.currentStatus === 'checked-in' ? (
                    <CheckCircle size={32} className="text-green-400" />
                  ) : (
                    <Clock size={32} className="text-gray-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {attendanceData.currentStatus === 'checked-in' ? 'Checked In' : 'Not Checked In'}
                </h3>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <MapPin size={16} />
                  {attendanceData.location}
                </p>
              </div>
            </div>

            {/* Time Details */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="bg-[#2A2D3D]/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="text-green-400" size={16} />
                    <span className="text-gray-400 text-sm">Check In Time</span>
                  </div>
                  <p className="text-xl font-semibold text-green-400">
                    {attendanceData.checkInTime || '--:--'}
                  </p>
                </div>

                <div className="bg-[#2A2D3D]/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Square className="text-red-400" size={16} />
                    <span className="text-gray-400 text-sm">Check Out Time</span>
                  </div>
                  <p className="text-xl font-semibold text-red-400">
                    {attendanceData.checkOutTime || '--:--'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {attendanceData.currentStatus === 'checked-out' ? (
                  <button
                    onClick={handleClockIn}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play size={20} />
                    Clock In
                  </button>
                ) : (
                  <button
                    onClick={handleClockOut}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Square size={20} />
                    Clock Out
                  </button>
                )}

                <button
                  onClick={() => setIsOnBreak(!isOnBreak)}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isOnBreak 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                      : 'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  <Timer size={18} />
                  {isOnBreak ? 'End Break' : 'Start Break'}
                </button>
              </div>
            </div>
          </div>

          {/* Today's Summary */}
          <div className="mt-8 pt-8 border-t border-gray-700/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 rounded-lg p-4 border border-indigo-500/30">
                <div className="text-2xl font-bold text-indigo-400">{attendanceData.totalHours}</div>
                <div className="text-sm text-gray-400">Total Hours</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-2xl font-bold text-yellow-400">{attendanceData.breakTime}</div>
                <div className="text-sm text-gray-400">Break Time</div>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">{attendanceData.monthlyStats.attendanceRate}%</div>
                <div className="text-sm text-gray-400">Attendance Rate</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400">{attendanceData.monthlyStats.averageHours}</div>
                <div className="text-sm text-gray-400">Avg. Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Monthly Statistics */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <BarChart3 className="text-indigo-400" size={20} />
              Monthly Overview
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{attendanceData.monthlyStats.presentDays}</div>
                <div className="text-sm text-gray-400">Present Days</div>
              </div>
              <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{attendanceData.monthlyStats.absentDays}</div>
                <div className="text-sm text-gray-400">Absent Days</div>
              </div>
              <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{attendanceData.monthlyStats.lateDays}</div>
                <div className="text-sm text-gray-400">Late Days</div>
              </div>
              <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-400">{attendanceData.monthlyStats.totalDays}</div>
                <div className="text-sm text-gray-400">Total Days</div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-200 mb-4">This Week's Hours</h4>
              <div className="flex items-end justify-between gap-2 h-32">
                {attendanceData.weeklyChart.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500"
                      style={{ height: `${(day.hours / 9) * 100}%`, minHeight: day.hours > 0 ? '8px' : '2px' }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-400">{day.day}</div>
                    <div className="text-xs text-gray-300 font-medium">{day.hours}h</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Badge */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <Award className="text-yellow-400" size={20} />
              Performance Badge
            </h3>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-full border-4 border-yellow-500/30 flex items-center justify-center">
                <Award size={32} className="text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">Excellent Attendance</h4>
              <p className="text-gray-400 text-sm">You've maintained {attendanceData.monthlyStats.attendanceRate}% attendance this month!</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#2A2D3D]/50 hover:bg-[#2A2D3D] transition-colors text-left">
                <Calendar size={16} className="text-indigo-400" />
                <span className="text-gray-200">Request Leave</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#2A2D3D]/50 hover:bg-[#2A2D3D] transition-colors text-left">
                <Clock size={16} className="text-green-400" />
                <span className="text-gray-200">View Timesheet</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#2A2D3D]/50 hover:bg-[#2A2D3D] transition-colors text-left">
                <TrendingUp size={16} className="text-purple-400" />
                <span className="text-gray-200">Attendance Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Calendar className="text-indigo-400" size={20} />
          Recent Attendance History
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Check In</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Check Out</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Hours</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.recentHistory.map((record, index) => (
                <tr key={index} className="border-b border-gray-700/30 hover:bg-[#2A2D3D]/30 transition-colors">
                  <td className="py-4 px-4 text-gray-200">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-gray-200">{record.checkIn || '--'}</td>
                  <td className="py-4 px-4 text-gray-200">{record.checkOut || '--'}</td>
                  <td className="py-4 px-4 text-gray-200">{record.hours}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}