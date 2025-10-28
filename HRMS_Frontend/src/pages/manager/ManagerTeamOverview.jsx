import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Award,
  Clock,
  Mail,
  Phone,
  MapPin,
  Edit,
  Eye,
  UserPlus,
  Download,
  BarChart3
} from 'lucide-react';

const ManagerTeamOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock team data - in real app, this would come from API
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      department: 'Engineering',
      location: 'New York',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      performance: 92,
      performanceTrend: 'up',
      tasksCompleted: 45,
      totalTasks: 50,
      leaveBalance: 15,
      joinDate: '2022-03-15',
      lastActive: '2 hours ago',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      currentProjects: ['Project Alpha', 'Dashboard Redesign'],
      recentAchievements: ['Completed certification', 'Led team training']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      position: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      performance: 88,
      performanceTrend: 'up',
      tasksCompleted: 38,
      totalTasks: 42,
      leaveBalance: 12,
      joinDate: '2021-08-20',
      lastActive: '1 hour ago',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      currentProjects: ['Mobile App UI', 'User Journey Mapping'],
      recentAchievements: ['Design award winner', 'Mentored junior designer']
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 345-6789',
      position: 'Data Analyst',
      department: 'Analytics',
      location: 'Chicago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      performance: 85,
      performanceTrend: 'down',
      tasksCompleted: 32,
      totalTasks: 40,
      leaveBalance: 8,
      joinDate: '2023-01-10',
      lastActive: '30 minutes ago',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      currentProjects: ['Sales Analytics', 'Customer Segmentation'],
      recentAchievements: ['Improved reporting efficiency', 'Data visualization training']
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      position: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Austin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      performance: 90,
      performanceTrend: 'up',
      tasksCompleted: 28,
      totalTasks: 30,
      leaveBalance: 18,
      joinDate: '2022-11-05',
      lastActive: '4 hours ago',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      currentProjects: ['Q4 Campaign', 'Brand Refresh'],
      recentAchievements: ['Campaign ROI increase', 'Social media growth']
    }
  ]);

  const departments = ['all', 'Engineering', 'Design', 'Analytics', 'Marketing'];

  const filteredTeam = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const teamStats = {
    totalMembers: teamMembers.length,
    avgPerformance: Math.round(teamMembers.reduce((sum, member) => sum + member.performance, 0) / teamMembers.length),
    activeProjects: [...new Set(teamMembers.flatMap(member => member.currentProjects))].length,
    totalTasks: teamMembers.reduce((sum, member) => sum + member.totalTasks, 0),
    completedTasks: teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleExportTeamData = () => {
    const csvContent = [
      ['Name', 'Position', 'Department', 'Performance', 'Tasks Completed', 'Leave Balance'],
      ...teamMembers.map(member => [
        member.name,
        member.position,
        member.department,
        member.performance + '%',
        `${member.tasksCompleted}/${member.totalTasks}`,
        member.leaveBalance + ' days'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-overview.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Overview</h1>
          <p className="text-gray-300">Manage and monitor your team's performance</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportTeamData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UserPlus size={16} />
            Add Member
          </button>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Users className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Members</p>
              <p className="text-xl font-bold text-white">{teamStats.totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900 rounded-lg">
              <Star className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Performance</p>
              <p className="text-xl font-bold text-white">{teamStats.avgPerformance}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900 rounded-lg">
              <BarChart3 className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Projects</p>
              <p className="text-xl font-bold text-white">{teamStats.activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-900 rounded-lg">
              <Clock className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Task Completion</p>
              <p className="text-xl font-bold text-white">
                {Math.round((teamStats.completedTasks / teamStats.totalTasks) * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-900 rounded-lg">
              <Award className="text-indigo-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed Tasks</p>
              <p className="text-xl font-bold text-white">{teamStats.completedTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-gray-700 text-white">
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map(member => (
          <div key={member.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:shadow-lg hover:shadow-gray-900/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.position}</p>
                  <p className="text-xs text-gray-400">{member.department}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-700 rounded">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Performance</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white">{member.performance}%</span>
                  {member.performanceTrend === 'up' ? (
                    <TrendingUp size={14} className="text-green-400" />
                  ) : (
                    <TrendingDown size={14} className="text-red-400" />
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    member.performance >= 90 ? 'bg-green-500' :
                    member.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${member.performance}%` }}
                ></div>
              </div>
            </div>

            {/* Task Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Tasks</span>
                <span className="text-sm font-medium text-white">
                  {member.tasksCompleted}/{member.totalTasks}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(member.tasksCompleted / member.totalTasks) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} />
                {member.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} />
                Leave: {member.leaveBalance} days
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={14} />
                Active: {member.lastActive}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewProfile(member)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition text-sm"
              >
                <Eye size={14} />
                View Profile
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-sm">
                <Mail size={14} />
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-sm">
                <Edit size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Detail Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
                    <p className="text-gray-300">{selectedEmployee.position}</p>
                    <p className="text-sm text-gray-400">{selectedEmployee.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail size={14} className="text-gray-400" />
                      {selectedEmployee.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Phone size={14} className="text-gray-400" />
                      {selectedEmployee.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin size={14} className="text-gray-400" />
                      {selectedEmployee.location}
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Employment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Join Date:</span>
                      <span className="ml-2 text-gray-300">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Leave Balance:</span>
                      <span className="ml-2 text-gray-300">{selectedEmployee.leaveBalance} days</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Active:</span>
                      <span className="ml-2 text-gray-300">{selectedEmployee.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Projects */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Current Projects</h3>
                  <div className="space-y-1">
                    {selectedEmployee.currentProjects.map((project, index) => (
                      <div key={index} className="text-sm text-gray-300">
                        • {project}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-white mb-3">Recent Achievements</h3>
                  <div className="space-y-1">
                    {selectedEmployee.recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <Award size={14} className="text-yellow-400" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTeamOverview;