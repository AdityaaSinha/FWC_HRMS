import React, { useState, useEffect } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import twoFactorService from '../../../services/twoFactorService';

const TwoFAManagementSimple = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading 2FA data...');
      setLoading(true);
      setError(null);
      
      const usersResponse = await twoFactorService.getAllUsers2FAStatus();
      console.log('Users response:', usersResponse);
      
      if (usersResponse?.data?.users && Array.isArray(usersResponse.data.users)) {
        setUsers(usersResponse.data.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(`Failed to load 2FA data: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading 2FA Management...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <FaShieldAlt className="text-blue-600 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">2FA Management (Simple)</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Users ({users.length})</h2>
        
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">2FA Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.twoFactorEnabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFAManagementSimple;