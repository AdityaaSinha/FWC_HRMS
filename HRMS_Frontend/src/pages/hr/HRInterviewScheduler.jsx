// src/pages/hr/HRInterviewScheduler.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Users, 
  Video, 
  MapPin, 
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  Send,
  Filter,
  Search,
  Download,
  Upload,
  FileText,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock interview data
const MOCK_INTERVIEWS = [
  {
    id: 1,
    candidateId: 1,
    candidateName: 'Rohit Sharma',
    candidateEmail: 'rohit@example.com',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    type: 'technical',
    round: 2,
    totalRounds: 3,
    date: '2024-02-15',
    time: '10:00',
    duration: 60,
    format: 'video',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    location: 'Conference Room A',
    interviewers: [
      { id: 1, name: 'David Chen', role: 'Engineering Manager', email: 'david@company.com' },
      { id: 2, name: 'Sarah Kim', role: 'Senior Developer', email: 'sarah@company.com' }
    ],
    status: 'scheduled',
    notes: 'Focus on React, TypeScript, and system design',
    feedback: null,
    createdBy: 'Emma Wilson',
    createdAt: '2024-02-10T09:00:00Z'
  },
  {
    id: 2,
    candidateId: 2,
    candidateName: 'Sneha Verma',
    candidateEmail: 'sneha@example.com',
    position: 'HR Business Partner',
    department: 'Human Resources',
    type: 'behavioral',
    round: 1,
    totalRounds: 2,
    date: '2024-02-16',
    time: '14:30',
    duration: 45,
    format: 'in-person',
    location: 'HR Conference Room',
    interviewers: [
      { id: 3, name: 'Sarah Johnson', role: 'HR Director', email: 'sarah.j@company.com' }
    ],
    status: 'completed',
    notes: 'Initial screening and culture fit assessment',
    feedback: {
      rating: 4,
      strengths: ['Strong communication skills', 'Relevant experience', 'Cultural fit'],
      concerns: ['Limited experience with HRIS systems'],
      recommendation: 'proceed',
      notes: 'Excellent candidate with strong HR background. Recommend for final round.',
      submittedBy: 'Sarah Johnson',
      submittedAt: '2024-02-16T15:30:00Z'
    },
    createdBy: 'Mike Chen',
    createdAt: '2024-02-12T11:00:00Z'
  },
  {
    id: 3,
    candidateId: 5,
    candidateName: 'James Wilson',
    candidateEmail: 'james@example.com',
    position: 'Senior UX Designer',
    department: 'Design',
    type: 'portfolio',
    round: 2,
    totalRounds: 3,
    date: '2024-02-17',
    time: '11:00',
    duration: 90,
    format: 'video',
    meetingLink: 'https://zoom.us/j/123456789',
    interviewers: [
      { id: 4, name: 'Alex Rivera', role: 'Design Director', email: 'alex@company.com' },
      { id: 5, name: 'Jessica Chen', role: 'Senior Designer', email: 'jessica@company.com' }
    ],
    status: 'scheduled',
    notes: 'Portfolio presentation and design thinking discussion',
    feedback: null,
    createdBy: 'Lisa Park',
    createdAt: '2024-02-13T14:00:00Z'
  }
];

// Interview types
const INTERVIEW_TYPES = [
  { id: 'screening', name: 'Phone Screening', color: 'blue', duration: 30 },
  { id: 'behavioral', name: 'Behavioral', color: 'green', duration: 45 },
  { id: 'technical', name: 'Technical', color: 'purple', duration: 60 },
  { id: 'portfolio', name: 'Portfolio Review', color: 'orange', duration: 90 },
  { id: 'final', name: 'Final Round', color: 'red', duration: 60 },
  { id: 'panel', name: 'Panel Interview', color: 'indigo', duration: 75 }
];

// Mock interviewers
const MOCK_INTERVIEWERS = [
  { id: 1, name: 'David Chen', role: 'Engineering Manager', email: 'david@company.com', department: 'Engineering' },
  { id: 2, name: 'Sarah Kim', role: 'Senior Developer', email: 'sarah@company.com', department: 'Engineering' },
  { id: 3, name: 'Sarah Johnson', role: 'HR Director', email: 'sarah.j@company.com', department: 'HR' },
  { id: 4, name: 'Alex Rivera', role: 'Design Director', email: 'alex@company.com', department: 'Design' },
  { id: 5, name: 'Jessica Chen', role: 'Senior Designer', email: 'jessica@company.com', department: 'Design' },
  { id: 6, name: 'Mike Chen', role: 'Recruiter', email: 'mike@company.com', department: 'HR' },
  { id: 7, name: 'Lisa Park', role: 'Senior Recruiter', email: 'lisa@company.com', department: 'HR' }
];

export default function HRInterviewScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // calendar, list
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Get interviews for a specific date
  const getInterviewsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return MOCK_INTERVIEWS.filter(interview => interview.date === dateStr);
  };

  // Filter interviews
  const filteredInterviews = MOCK_INTERVIEWS.filter(interview => {
    const matchesSearch = !searchTerm || 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesType = typeFilter === 'all' || interview.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const interviews = getInterviewsForDate(currentDateObj);
      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        isToday: currentDateObj.toDateString() === new Date().toDateString(),
        interviews
      });
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'blue',
      completed: 'green',
      cancelled: 'red',
      rescheduled: 'yellow'
    };
    return colors[status] || 'gray';
  };

  const getTypeConfig = (type) => {
    return INTERVIEW_TYPES.find(t => t.id === type) || INTERVIEW_TYPES[0];
  };

  const renderCalendarView = () => {
    const days = generateCalendarDays();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-indigo-500 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-indigo-500 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 border border-gray-800 ${
                day.isCurrentMonth ? 'bg-[#2A2D3D]' : 'bg-[#1B1E2B]'
              } ${day.isToday ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <div className={`text-sm mb-1 ${
                day.isCurrentMonth ? 'text-white' : 'text-gray-600'
              } ${day.isToday ? 'font-bold text-indigo-400' : ''}`}>
                {day.date.getDate()}
              </div>
              
              {/* Interview indicators */}
              <div className="space-y-1">
                {day.interviews.slice(0, 2).map(interview => {
                  const typeConfig = getTypeConfig(interview.type);
                  return (
                    <div
                      key={interview.id}
                      onClick={() => setSelectedInterview(interview)}
                      className={`text-xs p-1 rounded cursor-pointer bg-${typeConfig.color}-900/30 text-${typeConfig.color}-300 border border-${typeConfig.color}-700 hover:bg-${typeConfig.color}-800/50 transition`}
                    >
                      {interview.time} - {interview.candidateName.split(' ')[0]}
                    </div>
                  );
                })}
                {day.interviews.length > 2 && (
                  <div className="text-xs text-gray-400 text-center">
                    +{day.interviews.length - 2} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="space-y-4">
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-500 text-lg">No interviews found matching your criteria.</p>
          </div>
        ) : (
          filteredInterviews.map(interview => {
            const typeConfig = getTypeConfig(interview.type);
            const statusColor = getStatusColor(interview.status);
            
            return (
              <div key={interview.id} className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 hover:border-indigo-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{interview.candidateName}</h3>
                      <p className="text-gray-400">{interview.position}</p>
                      <p className="text-sm text-gray-500">{interview.department}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${typeConfig.color}-900/30 text-${typeConfig.color}-300 border border-${typeConfig.color}-700`}>
                      {typeConfig.name}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-900/30 text-${statusColor}-300 border border-${statusColor}-700`}>
                      {interview.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-white">{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-white">{interview.time} ({interview.duration}min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {interview.format === 'video' ? (
                      <Video size={14} className="text-gray-400" />
                    ) : interview.format === 'phone' ? (
                      <Phone size={14} className="text-gray-400" />
                    ) : (
                      <MapPin size={14} className="text-gray-400" />
                    )}
                    <span className="text-white">
                      {interview.format === 'video' ? 'Video Call' : 
                       interview.format === 'phone' ? 'Phone Call' : 
                       interview.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-white">{interview.interviewers.length} interviewer(s)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedInterview(interview)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    <Calendar size={14} />
                    View Details
                  </button>
                  
                  {interview.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedInterview(interview);
                          setShowScheduleModal(true);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
                      >
                        <Edit size={14} />
                        Reschedule
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                        <Send size={14} />
                        Send Reminder
                      </button>
                    </>
                  )}
                  
                  {interview.status === 'completed' && !interview.feedback && (
                    <button
                      onClick={() => {
                        setSelectedInterview(interview);
                        setShowFeedbackModal(true);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                    >
                      <Star size={14} />
                      Add Feedback
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Interview Scheduler</h2>
          <p className="text-gray-400">
            Schedule and manage interviews with calendar integration
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={16} />
            Schedule Interview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export Schedule
          </button>
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === 'calendar' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-[#2A2D3D] text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-[#2A2D3D] text-gray-400 hover:text-white'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            List
          </button>
        </div>

        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by candidate name or position..."
              className="w-full pl-10 pr-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            {INTERVIEW_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-blue-400" />
            <span className="text-sm text-gray-400">Total Interviews</span>
          </div>
          <p className="text-2xl font-bold text-white">{MOCK_INTERVIEWS.length}</p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-orange-400" />
            <span className="text-sm text-gray-400">Scheduled</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {MOCK_INTERVIEWS.filter(i => i.status === 'scheduled').length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {MOCK_INTERVIEWS.filter(i => i.status === 'completed').length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-purple-400" />
            <span className="text-sm text-gray-400">Avg Rating</span>
          </div>
          <p className="text-2xl font-bold text-white">4.2</p>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'calendar' ? renderCalendarView() : renderListView()}

      {/* Interview Detail Modal */}
      {selectedInterview && !showScheduleModal && !showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedInterview.candidateName}</h2>
                  <p className="text-gray-400">{selectedInterview.position} - {selectedInterview.department}</p>
                </div>
                <button
                  onClick={() => setSelectedInterview(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Interview Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interview Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <p className="text-white">{getTypeConfig(selectedInterview.type).name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Round:</span>
                      <p className="text-white">{selectedInterview.round} of {selectedInterview.totalRounds}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Date & Time:</span>
                      <p className="text-white">
                        {new Date(selectedInterview.date).toLocaleDateString()} at {selectedInterview.time}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <p className="text-white">{selectedInterview.duration} minutes</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Format:</span>
                      <p className="text-white capitalize">{selectedInterview.format}</p>
                    </div>
                    {selectedInterview.meetingLink && (
                      <div>
                        <span className="text-gray-400">Meeting Link:</span>
                        <a href={selectedInterview.meetingLink} className="text-indigo-400 hover:text-indigo-300 block">
                          {selectedInterview.meetingLink}
                        </a>
                      </div>
                    )}
                    {selectedInterview.location && (
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <p className="text-white">{selectedInterview.location}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interviewers</h3>
                  <div className="space-y-3">
                    {selectedInterview.interviewers.map(interviewer => (
                      <div key={interviewer.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{interviewer.name}</p>
                          <p className="text-sm text-gray-400">{interviewer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInterview.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interview Notes</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300">{selectedInterview.notes}</p>
                  </div>
                </div>
              )}

              {/* Feedback */}
              {selectedInterview.feedback && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interview Feedback</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= selectedInterview.feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-white">({selectedInterview.feedback.rating}/5)</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Strengths:</span>
                      <ul className="text-white mt-1">
                        {selectedInterview.feedback.strengths.map((strength, index) => (
                          <li key={index} className="ml-4">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Concerns:</span>
                      <ul className="text-white mt-1">
                        {selectedInterview.feedback.concerns.map((concern, index) => (
                          <li key={index} className="ml-4">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Recommendation:</span>
                      <p className="text-white capitalize">{selectedInterview.feedback.recommendation}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Additional Notes:</span>
                      <p className="text-white">{selectedInterview.feedback.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule/Reschedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-2xl w-full">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                {selectedInterview ? 'Reschedule Interview' : 'Schedule New Interview'}
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Interview Type</label>
                    <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                      {INTERVIEW_TYPES.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Format</label>
                    <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                      <option value="video">Video Call</option>
                      <option value="in-person">In Person</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Interviewers</label>
                  <div className="max-h-32 overflow-y-auto border border-gray-700 rounded-lg p-2 bg-[#2A2D3D]">
                    {MOCK_INTERVIEWERS.map(interviewer => (
                      <label key={interviewer.id} className="flex items-center gap-2 p-2 hover:bg-[#1B1E2B] rounded">
                        <input type="checkbox" className="text-indigo-600" />
                        <span className="text-white">{interviewer.name}</span>
                        <span className="text-sm text-gray-400">({interviewer.role})</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Interview focus areas, special instructions..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    setSelectedInterview(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    setSelectedInterview(null);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  {selectedInterview ? 'Reschedule' : 'Schedule'} Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-2xl w-full">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Interview Feedback</h2>
              <p className="text-gray-400">{selectedInterview.candidateName} - {selectedInterview.position}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="text-gray-600 hover:text-yellow-400 transition">
                        <Star size={24} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Strengths</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="What did the candidate do well?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Areas for Improvement</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="What could be improved?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Recommendation</label>
                  <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                    <option value="proceed">Proceed to next round</option>
                    <option value="hire">Recommend for hire</option>
                    <option value="reject">Do not proceed</option>
                    <option value="reconsider">Needs further evaluation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Any additional comments or observations..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedInterview(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedInterview(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}