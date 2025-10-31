import React, { useState, useEffect } from 'react';

const DebugAuth = () => {
  const [authState, setAuthState] = useState({});
  const [apiTest, setApiTest] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      // Check localStorage
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userName = localStorage.getItem('userName');

      console.log('🔍 DebugAuth: localStorage data:', { token: token ? 'Present' : 'Missing', role, userName });

      setAuthState({ token: token ? 'Present' : 'Missing', role, userName });

      // Test API call
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            const userData = await response.json();
            console.log('🔍 DebugAuth: /me API response:', userData);
            setApiTest({ status: 'Success', data: userData });
          } else {
            console.log('🔍 DebugAuth: /me API failed:', response.status);
            setApiTest({ status: 'Failed', error: `HTTP ${response.status}` });
          }
        } catch (error) {
          console.log('🔍 DebugAuth: /me API error:', error);
          setApiTest({ status: 'Error', error: error.message });
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#1f2937', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>🔍 Debug Auth</h4>
      <div>
        <strong>localStorage:</strong><br/>
        Token: {authState.token}<br/>
        Role: {authState.role}<br/>
        User: {authState.userName}
      </div>
      <div style={{ marginTop: '10px' }}>
        <strong>API Test (/me):</strong><br/>
        Status: {apiTest.status}<br/>
        {apiTest.data && (
          <>
            User: {apiTest.data.name}<br/>
            Role: {apiTest.data.role}<br/>
            Email: {apiTest.data.email}
          </>
        )}
        {apiTest.error && <span style={{ color: '#ef4444' }}>Error: {apiTest.error}</span>}
      </div>
    </div>
  );
};

export default DebugAuth;