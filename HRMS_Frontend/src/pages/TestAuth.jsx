import React, { useEffect, useState } from 'react';

function TestAuth() {
  const [authData, setAuthData] = useState({});
  const [loginResult, setLoginResult] = useState('');

  useEffect(() => {
    // Check current localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('userName');
    
    setAuthData({ token, role, userName });
    console.log('🔍 TestAuth: Current localStorage:', { token, role, userName });
  }, []);

  const handleLogin = async () => {
    try {
      console.log('🔍 TestAuth: Attempting login...');
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'h@h.com',
          password: '12'
        }),
      });

      const data = await response.json();
      console.log('🔍 TestAuth: Login response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userName', data.user.name);
        
        setLoginResult('Login successful!');
        setAuthData({
          token: data.token,
          role: data.user.role,
          userName: data.user.name
        });
      } else {
        setLoginResult(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('🔍 TestAuth: Login error:', error);
      setLoginResult(`Login error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Authentication Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current localStorage:</h3>
        <pre style={{ background: '#f0f0f0', padding: '10px' }}>
          {JSON.stringify(authData, null, 2)}
        </pre>
      </div>

      <button 
        onClick={handleLogin}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Login as HR (h@h.com / 12)
      </button>

      {loginResult && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#e9ecef' }}>
          {loginResult}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <a href="/hr/jobs" style={{ color: '#007bff' }}>Go to HR Jobs Dashboard</a>
      </div>
    </div>
  );
}

export default TestAuth;