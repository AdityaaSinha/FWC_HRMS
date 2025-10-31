import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function TestJobsDashboard() {
  console.log('🧪 TEST: TestJobsDashboard component is mounting!', new Date().toISOString());
  
  useEffect(() => {
    console.log('🧪 TEST: TestJobsDashboard useEffect triggered!', new Date().toISOString());
    
    // Test API call
    const testAPI = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🧪 TEST: Token exists:', !!token);
        
        const response = await fetch('http://localhost:3001/api/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('🧪 TEST: API Response status:', response.status);
        const data = await response.json();
        console.log('🧪 TEST: API Response data:', data);
      } catch (error) {
        console.error('🧪 TEST: API Error:', error);
      }
    };
    
    testAPI();
  }, []);
  
  return (
    <div className="p-4 bg-yellow-100 border-2 border-yellow-500 rounded">
      <h1 className="text-2xl font-bold text-yellow-800 mb-4">
        🧪 TEST: Jobs Dashboard is Working!
      </h1>
      <p className="text-yellow-700 mb-4">
        If you can see this, the routing is working correctly.
      </p>
      <p className="text-yellow-700 mb-4">
        Check the browser console for API test results.
      </p>
      <div className="bg-white p-4 rounded border">
        <Outlet />
      </div>
    </div>
  );
}