import React, { useState, useEffect, useRef } from 'react';
import { 
  FaShieldAlt, 
  FaMobile, 
  FaSms, 
  FaUsb, 
  FaUsers, 
  FaCheck, 
  FaClock, 
  FaExclamationTriangle, 
  FaSync, 
  FaEye, 
  FaEyeSlash, 
  FaCheckCircle, 
  FaTimes, 
  FaSearch, 
  FaChevronDown, 
  FaUserPlus, 
  FaUsersCog, 
  FaCog, 
  FaKey 
} from 'react-icons/fa';
import twoFactorService from '../../../services/twoFactorService';

const TwoFAManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [actionLoading, setActionLoading] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showIndividualSetup, setShowIndividualSetup] = useState(false);
  const [setupMethod, setSetupMethod] = useState('app');
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSelectedUserIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!showDropdown) return;

      const filteredUsers = getFilteredUsers();
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedUserIndex(prev => 
            prev < filteredUsers.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedUserIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedUserIndex >= 0 && filteredUsers[selectedUserIndex]) {
            handleUserSelect(filteredUsers[selectedUserIndex]);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedUserIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown, selectedUserIndex]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to load 2FA data...');
      
      const [usersResponse, statsResponse] = await Promise.all([
        twoFactorService.getAllUsers2FAStatus({ limit: 100 }),
        twoFactorService.get2FAStats()
      ]);
      
      console.log('📊 Raw users response:', usersResponse);
      console.log('📈 Raw stats response:', statsResponse);
      
      if (usersResponse?.data?.users && Array.isArray(usersResponse.data.users)) {
        console.log('✅ Users array found, length:', usersResponse.data.users.length);
        const formattedUsers = usersResponse.data.users.map(user => ({
          id: user.id,
          name: user.name || 'Unknown',
          email: user.email || 'No email',
          status: user.twoFactorEnabled ? 'enabled' : 'disabled',
          method: user.twoFactorMethod || 'none',
          lastLogin: user.twoFactorLastUsed ? new Date(user.twoFactorLastUsed).toLocaleDateString() : 'Never',
          setupDate: user.twoFactorSetupDate ? new Date(user.twoFactorSetupDate).toLocaleDateString() : 'Not set up',
          department: user.department || 'Unknown',
          role: user.role?.name || 'User'
        }));
        console.log('🎯 Formatted users:', formattedUsers);
        setUsers(formattedUsers);
      } else {
        console.log('❌ No users found in response or invalid format');
        console.log('Response structure:', {
          hasData: !!usersResponse?.data,
          hasUsers: !!usersResponse?.data?.users,
          isArray: Array.isArray(usersResponse?.data?.users)
        });
        setUsers([]);
      }
      
      if (statsResponse?.data) {
        setStats(statsResponse.data);
      }
    } catch (err) {
      console.error('❌ Error loading data:', err);
      setError(`Failed to load 2FA data. ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async (userId) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: 'disabling' }));
      setError(null);
      setSuccessMessage(null);
      
      await twoFactorService.adminDisable2FA(userId);
      await loadData();
      
      setSuccessMessage('2FA disabled successfully for user');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error disabling 2FA:', err);
      let errorMessage = 'Failed to disable 2FA: ';
      
      if (err.response?.status === 404) {
        errorMessage += 'User not found.';
      } else if (err.response?.status === 400) {
        errorMessage += 'Invalid request. User may not have 2FA enabled.';
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: null }));
    }
  };

  const handleEnable2FA = async (userId, method = 'app') => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: 'enabling' }));
      setError(null);
      setSuccessMessage(null);
      
      await twoFactorService.adminEnable2FA(userId, method);
      await loadData();
      
      setSuccessMessage('2FA enabled successfully for user');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error enabling 2FA:', err);
      let errorMessage = 'Failed to enable 2FA: ';
      
      if (err.response?.status === 404) {
        errorMessage += 'User not found.';
      } else if (err.response?.status === 400) {
        errorMessage += 'Invalid request. User may already have 2FA enabled.';
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: null }));
    }
  };

  // Bulk actions
  const handleBulkEnable2FA = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const promises = selectedUsers.map(userId => 
        twoFactorService.adminEnable2FA(userId, setupMethod)
      );
      
      await Promise.all(promises);
      await loadData();
      
      setSelectedUsers([]);
      setShowBulkActions(false);
      setSuccessMessage(`2FA enabled successfully for ${selectedUsers.length} users`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error enabling 2FA for multiple users:', err);
      setError(`Failed to enable 2FA for some users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDisable2FA = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const promises = selectedUsers.map(userId => 
        twoFactorService.adminDisable2FA(userId)
      );
      
      await Promise.all(promises);
      await loadData();
      
      setSelectedUsers([]);
      setShowBulkActions(false);
      setSuccessMessage(`2FA disabled successfully for ${selectedUsers.length} users`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error disabling 2FA for multiple users:', err);
      setError(`Failed to disable 2FA for some users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSelection = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const getFilteredUsers = () => {
    const filtered = users.filter(user => {
      const matchesSearch = !searchTerm || 
                           user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      const matchesMethod = filterMethod === 'all' || user.method === filterMethod;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
    
    return filtered;
  };

  const handleUserSelect = (user) => {
    setSearchTerm(user.name);
    setShowDropdown(false);
    setSelectedUserIndex(-1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterMethod('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 text-lg">Loading 2FA Management...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-400 text-xl mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error Loading 2FA Management</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-[#11131A] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-900/20 border-l-4 border-green-400 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 text-lg mr-3" />
              <p className="text-green-300 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Two-Factor Authentication Management</h1>
                <p className="text-gray-400 mt-1">Manage 2FA settings for all users in your organization</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowIndividualSetup(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
              >
                <FaUserPlus />
                <span>Individual Setup</span>
              </button>
              <button
                onClick={() => loadData()}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center space-x-2 shadow-sm"
              >
                <FaSync />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.totalUsers || 0}</p>
                </div>
                <div className="p-3 bg-indigo-900/30 rounded-lg">
                  <FaUsers className="text-indigo-400 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">2FA Enabled</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">{stats.enabledUsers || 0}</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <FaCheckCircle className="text-green-400 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Pending Setup</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">{stats.pendingUsers || 0}</p>
                </div>
                <div className="p-3 bg-amber-900/30 rounded-lg">
                  <FaClock className="text-amber-400 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Adoption Rate</p>
                  <p className="text-2xl font-bold text-indigo-400 mt-1">
                    {stats.totalUsers > 0 ? Math.round((stats.enabledUsers / stats.totalUsers) * 100) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-indigo-900/30 rounded-lg">
                  <FaSync className="text-indigo-400 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder={`Click to see all ${users.length} users or type to search...`}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                      setSelectedUserIndex(-1);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onClick={() => setShowDropdown(true)}
                    className="pl-10 pr-4 py-2 bg-[#11131A] border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full sm:w-64 text-white placeholder-gray-400"
                  />
                </div>
                
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-[#1E2132] border border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <div
                          key={user.id}
                          className={`px-4 py-4 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0 ${
                            index === selectedUserIndex
                              ? 'bg-indigo-900/30 border-l-4 border-indigo-500'
                              : 'hover:bg-gray-700/30'
                          }`}
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-white truncate">{user.name}</div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                                  user.status === 'enabled'
                                    ? 'bg-green-900/30 text-green-400'
                                    : 'bg-red-900/30 text-red-400'
                                }`}>
                                  {user.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400 mb-1 truncate">{user.email}</div>
                              <div className="flex flex-wrap gap-2 text-xs">
                                <span className="text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                                  {user.department}
                                </span>
                                <span className="text-purple-400 bg-purple-900/20 px-2 py-1 rounded">
                                  {user.role}
                                </span>
                                {user.method !== 'none' && (
                                  <span className="text-orange-400 bg-orange-900/20 px-2 py-1 rounded">
                                    {user.method}
                                  </span>
                                )}
                              </div>
                              {user.lastLogin !== 'Never' && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Last login: {user.lastLogin}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-400 text-center">
                        {searchTerm ? `No users found matching "${searchTerm}"` : 'No users available'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-[#11131A] border border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="all">All Status</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Method Filter */}
              <div className="relative">
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="appearance-none bg-[#11131A] border border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="all">All Methods</option>
                  <option value="app">Authenticator App</option>
                  <option value="sms">SMS</option>
                  <option value="hardware">Hardware Token</option>
                  <option value="none">Not Set Up</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <FaTimes />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaUsersCog className="text-indigo-400 text-lg" />
                <span className="text-indigo-300 font-medium">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkEnable2FA}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Enable 2FA
                </button>
                <button
                  onClick={handleBulkDisable2FA}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Disable 2FA
                </button>
                <button
                  onClick={() => {
                    setSelectedUsers([]);
                    setShowBulkActions(false);
                  }}
                  className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-[#1E2132] rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">User 2FA Status</h2>
            <p className="text-gray-400 mt-1">Manage two-factor authentication for individual users</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#11131A] border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(user => user.id));
                          setShowBulkActions(true);
                        } else {
                          setSelectedUsers([]);
                          setShowBulkActions(false);
                        }
                      }}
                      className="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 bg-[#11131A]"
                    />
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Method</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Last Login</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Setup Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 bg-[#11131A]"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'enabled'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}>
                          {user.status === 'enabled' ? (
                            <>
                              <FaCheckCircle className="mr-1" />
                              Enabled
                            </>
                          ) : (
                            <>
                              <FaTimes className="mr-1" />
                              Disabled
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {user.method === 'app' && <FaMobile className="text-indigo-400 mr-2" />}
                          {user.method === 'sms' && <FaSms className="text-green-400 mr-2" />}
                          {user.method === 'hardware' && <FaUsb className="text-purple-400 mr-2" />}
                          <span className="text-sm text-gray-300 capitalize">
                            {user.method === 'none' ? 'Not set up' : user.method}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">{user.lastLogin}</td>
                      <td className="py-4 px-6 text-sm text-gray-400">{user.setupDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          {user.status === 'enabled' ? (
                            <button
                              onClick={() => handleDisable2FA(user.id)}
                              disabled={actionLoading[user.id]}
                              className="px-3 py-1 bg-red-900/30 text-red-400 rounded-md text-sm font-medium hover:bg-red-900/50 transition-colors disabled:opacity-50"
                            >
                              {actionLoading[user.id] === 'disabling' ? 'Disabling...' : 'Disable'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEnable2FA(user.id)}
                              disabled={actionLoading[user.id]}
                              className="px-3 py-1 bg-green-900/30 text-green-400 rounded-md text-sm font-medium hover:bg-green-900/50 transition-colors disabled:opacity-50"
                            >
                              {actionLoading[user.id] === 'enabling' ? 'Enabling...' : 'Enable'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Individual Setup Modal */}
        {showIndividualSetup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1E2132] rounded-xl shadow-xl max-w-md w-full mx-4 border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Individual 2FA Setup</h3>
                  <button
                    onClick={() => setShowIndividualSetup(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select 2FA Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                        <input
                          type="radio"
                          name="setupMethod"
                          value="app"
                          checked={setupMethod === 'app'}
                          onChange={(e) => setSetupMethod(e.target.value)}
                          className="mr-3 text-indigo-500 bg-[#11131A] border-gray-600 focus:ring-indigo-500"
                        />
                        <FaMobile className="text-indigo-400 mr-2" />
                        <span>Authenticator App (TOTP)</span>
                      </label>
                      <label className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                        <input
                          type="radio"
                          name="setupMethod"
                          value="sms"
                          checked={setupMethod === 'sms'}
                          onChange={(e) => setSetupMethod(e.target.value)}
                          className="mr-3 text-indigo-500 bg-[#11131A] border-gray-600 focus:ring-indigo-500"
                        />
                        <FaSms className="text-green-400 mr-2" />
                        <span>SMS</span>
                      </label>
                      <label className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                        <input
                          type="radio"
                          name="setupMethod"
                          value="hardware"
                          checked={setupMethod === 'hardware'}
                          onChange={(e) => setSetupMethod(e.target.value)}
                          className="mr-3 text-indigo-500 bg-[#11131A] border-gray-600 focus:ring-indigo-500"
                        />
                        <FaUsb className="text-purple-400 mr-2" />
                        <span>Hardware Token</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={() => setShowIndividualSetup(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle individual setup logic here
                    setShowIndividualSetup(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-colors"
                >
                  Setup 2FA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFAManagement;
