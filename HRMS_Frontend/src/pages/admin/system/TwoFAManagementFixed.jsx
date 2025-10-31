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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersResponse, statsResponse] = await Promise.all([
        twoFactorService.getAllUsers2FAStatus(),
        twoFactorService.get2FAStats()
      ]);
      
      if (usersResponse?.data?.users && Array.isArray(usersResponse.data.users)) {
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
        setUsers(formattedUsers);
      } else {
        setUsers([]);
      }
      
      if (statsResponse?.data) {
        setStats(statsResponse.data);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(`Failed to load 2FA data. ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Two-Factor Authentication Management</h1>
                <p className="text-slate-600 mt-1">Manage 2FA settings for all users in your organization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalUsers || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaUsers className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">2FA Enabled</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.enabledUsers || 0}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pending Setup</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pendingUsers || 0}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Adoption Rate</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {stats.totalUsers > 0 ? Math.round((stats.enabledUsers / stats.totalUsers) * 100) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaSync className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">User 2FA Status</h2>
            <p className="text-slate-600 mt-1">Manage two-factor authentication for individual users</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Method</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Last Login</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Setup Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-slate-800">{user.name}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'enabled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
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
                          {user.method === 'app' && <FaMobile className="text-blue-600 mr-2" />}
                          {user.method === 'sms' && <FaSms className="text-green-600 mr-2" />}
                          {user.method === 'hardware' && <FaUsb className="text-purple-600 mr-2" />}
                          <span className="text-sm text-slate-700 capitalize">
                            {user.method === 'none' ? 'Not set up' : user.method}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{user.lastLogin}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{user.setupDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          {user.status === 'enabled' ? (
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors">
                              Disable
                            </button>
                          ) : (
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                              Enable
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
      </div>
    </div>
  );
};

export default TwoFAManagement;