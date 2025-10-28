import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Shield, Award, Briefcase, Clock } from 'lucide-react';

const MOCK_PROFILE = {
  id: 'EMP001',
  name: 'Aditya Sinha',
  email: 'aditya.sinha@company.com',
  phone: '+91 9876543210',
  address: '123 Tech Street, Bangalore, Karnataka 560001',
  department: 'Engineering',
  position: 'Senior Software Developer',
  joinDate: '2022-03-15',
  employeeId: 'EMP001',
  manager: 'Rajesh Kumar',
  profilePicture: null,
  skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
  achievements: [
    { title: 'Employee of the Month', date: '2024-11', icon: '🏆' },
    { title: 'Project Excellence Award', date: '2024-08', icon: '⭐' },
    { title: '5 Years Service', date: '2024-03', icon: '🎖️' }
  ],
  stats: {
    projectsCompleted: 24,
    yearsOfService: 2.8,
    teamSize: 8,
    certifications: 5
  }
};

export default function EmployeeProfile() {
  const [profile, setProfile] = useState({
    ...MOCK_PROFILE,
    name: 'Aryabrat Mishra',
    email: 'aryabrat.mishra@company.com'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [activeTab, setActiveTab] = useState('personal');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-2xl border border-gray-700/50 backdrop-blur-sm p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Profile Picture Section */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full border-4 border-indigo-500/30 flex items-center justify-center overflow-hidden">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-indigo-400" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 transition-colors opacity-0 group-hover:opacity-100">
                <Camera size={16} className="text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {profile.name}
                  </h1>
                  <p className="text-xl text-gray-300 mt-1">{profile.position}</p>
                  <p className="text-gray-400 flex items-center gap-2 mt-2">
                    <Shield size={16} />
                    Employee ID: {profile.employeeId}
                  </p>
                </div>

                <div className="flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 rounded-lg p-4 border border-indigo-500/30">
                  <div className="text-2xl font-bold text-indigo-400">{profile.stats.projectsCompleted}</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">{profile.stats.yearsOfService}</div>
                  <div className="text-sm text-gray-400">Years</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.teamSize}</div>
                  <div className="text-sm text-gray-400">Team Size</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="text-2xl font-bold text-yellow-400">{profile.stats.certifications}</div>
                  <div className="text-sm text-gray-400">Certificates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-[#1B1E2B]/50 rounded-lg p-1 border border-gray-700/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#2A2D3D]/50'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <Mail className="text-indigo-400" size={20} />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-[#2A2D3D] border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-indigo-500 focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-200">{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-[#2A2D3D] border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-indigo-500 focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-200">{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full bg-[#2A2D3D] border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-indigo-500 focus:outline-none resize-none"
                    />
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <span className="text-gray-200">{profile.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <Award className="text-purple-400" size={20} />
                Skills & Expertise
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-sm text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                + Add Skill
              </button>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Work Information */}
            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <Briefcase className="text-green-400" size={20} />
                Work Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Department</p>
                    <p className="text-gray-200 font-medium">{profile.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Position</p>
                    <p className="text-gray-200 font-medium">{profile.position}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Manager</p>
                    <p className="text-gray-200 font-medium">{profile.manager}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Join Date</p>
                    <p className="text-gray-200 font-medium">{new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <Clock className="text-yellow-400" size={20} />
                Performance Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Project Completion Rate</span>
                    <span className="text-green-400 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Team Collaboration</span>
                    <span className="text-blue-400 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Innovation Score</span>
                    <span className="text-purple-400 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <Award className="text-yellow-400" size={20} />
              Achievements & Recognition
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 rounded-lg p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-200">{achievement.title}</h4>
                      <p className="text-sm text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}