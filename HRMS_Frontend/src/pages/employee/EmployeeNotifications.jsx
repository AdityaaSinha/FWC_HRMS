import React, { useState, useEffect } from 'react';
import { Bell, Filter, Search, Trash2, Check, CheckCheck, AlertCircle, Info, Calendar, Star, Archive, Settings, Eye, MoreVertical } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'announcement',
    title: 'Company Annual Meeting',
    message: 'Join us for the annual company meeting on December 15th at 10:00 AM in the main conference room.',
    timestamp: '2024-12-10T09:00:00Z',
    read: false,
    priority: 'high',
    category: 'Company',
    sender: 'HR Department'
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Submit Monthly Report',
    message: 'Your monthly performance report is due by end of day today. Please submit it through the portal.',
    timestamp: '2024-12-09T14:30:00Z',
    read: false,
    priority: 'medium',
    category: 'Tasks',
    sender: 'Project Manager'
  },
  {
    id: 3,
    type: 'system',
    title: 'Password Expiry Warning',
    message: 'Your password will expire in 3 days. Please update it to maintain account security.',
    timestamp: '2024-12-08T11:15:00Z',
    read: true,
    priority: 'high',
    category: 'Security',
    sender: 'IT Department'
  },
  {
    id: 4,
    type: 'announcement',
    title: 'Holiday Schedule Update',
    message: 'Updated holiday schedule for 2025 has been published. Check the employee handbook for details.',
    timestamp: '2024-12-07T16:45:00Z',
    read: true,
    priority: 'low',
    category: 'Company',
    sender: 'HR Department'
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Team Building Event',
    message: 'Don\'t forget about the team building event this Friday at 3:00 PM. Location: Recreation Center.',
    timestamp: '2024-12-06T10:20:00Z',
    read: false,
    priority: 'medium',
    category: 'Events',
    sender: 'Team Lead'
  },
  {
    id: 6,
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur this weekend from 2:00 AM to 6:00 AM on Saturday.',
    timestamp: '2024-12-05T13:00:00Z',
    read: true,
    priority: 'low',
    category: 'System',
    sender: 'IT Department'
  }
];

export default function EmployeeNotifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filteredNotifications, setFilteredNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filtered = notifications;

    // Apply type filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'unread') {
        filtered = filtered.filter(n => !n.read);
      } else if (selectedFilter === 'read') {
        filtered = filtered.filter(n => n.read);
      } else {
        filtered = filtered.filter(n => n.type === selectedFilter);
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortBy === 'oldest') {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    setFilteredNotifications(filtered);
  }, [notifications, selectedFilter, searchTerm, sortBy]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotifications(prev => prev.filter(nId => nId !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const toggleSelection = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const getNotificationIcon = (type, priority) => {
    const iconProps = { size: 20 };
    
    switch (type) {
      case 'announcement':
        return <Bell {...iconProps} className={priority === 'high' ? 'text-yellow-400' : 'text-blue-400'} />;
      case 'reminder':
        return <Calendar {...iconProps} className={priority === 'high' ? 'text-orange-400' : 'text-green-400'} />;
      case 'system':
        return <AlertCircle {...iconProps} className={priority === 'high' ? 'text-red-400' : 'text-purple-400'} />;
      default:
        return <Info {...iconProps} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-600/10';
      case 'medium': return 'border-yellow-500/30 bg-yellow-600/10';
      case 'low': return 'border-green-500/30 bg-green-600/10';
      default: return 'border-gray-500/30 bg-gray-600/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'read', label: 'Read', count: notifications.length - unreadCount },
    { id: 'announcement', label: 'Announcements', count: notifications.filter(n => n.type === 'announcement').length },
    { id: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Notifications Center
            </h1>
            <p className="text-gray-400 mt-2">Stay updated with important announcements and reminders</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg px-4 py-2 border border-blue-500/30">
              <span className="text-blue-400 font-semibold">{unreadCount}</span>
              <span className="text-gray-400 ml-1">unread</span>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              <Settings size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCheck size={16} />
                {selectedNotifications.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
              </button>
              
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete ({selectedNotifications.length})
                </button>
              )}
              
              <button
                onClick={markAllAsRead}
                className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Filter className="text-indigo-400" size={20} />
              Filter Options
            </h3>
            
            <div className="space-y-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                    selectedFilter === option.id
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-indigo-400 border border-indigo-500/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#2A2D3D]/50'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedFilter === option.id 
                      ? 'bg-indigo-600/20 text-indigo-400' 
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">High Priority</span>
                  <span className="text-red-400 font-semibold">
                    {notifications.filter(n => n.priority === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">This Week</span>
                  <span className="text-blue-400 font-semibold">
                    {notifications.filter(n => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(n.timestamp) > weekAgo;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-12 text-center">
                <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No notifications found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 ${
                    notification.read 
                      ? 'border-gray-700/50 opacity-75' 
                      : `border-l-4 ${getPriorityColor(notification.priority)} border-gray-700/50`
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    <div className="flex items-center pt-1">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleSelection(notification.id)}
                        className="w-4 h-4 text-indigo-600 bg-[#2A2D3D] border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                    </div>

                    {/* Notification Icon */}
                    <div className="flex-shrink-0 pt-1">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-gray-100'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            notification.priority === 'high' 
                              ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                              : notification.priority === 'medium'
                              ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                              : 'bg-green-600/20 text-green-400 border border-green-500/30'
                          }`}>
                            {notification.priority}
                          </span>
                          
                          <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>

                      <p className={`mb-3 ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}>
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={14} />
                            {notification.category}
                          </span>
                          <span>From: {notification.sender}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 text-sm"
                            >
                              <Check size={14} />
                              Mark Read
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 text-sm"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredNotifications.length > 0 && (
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                Load More Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}