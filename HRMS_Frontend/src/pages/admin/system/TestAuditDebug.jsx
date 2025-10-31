import React, { useEffect, useState } from 'react';

const TestAuditDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    console.log('🚀 TestAuditDebug component mounted');
    alert('🚀 TestAuditDebug component mounted!'); // Visual confirmation
    
    // Check localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('userName');
    
    console.log('🔑 Token exists:', !!token);
    console.log('👤 Role:', role);
    console.log('👨‍💼 User:', userName);
    
    setDebugInfo({
      hasToken: !!token,
      role,
      userName,
      tokenLength: token ? token.length : 0
    });

    // Test API call
    const testApiCall = async () => {
      try {
        console.log('🌐 Testing API call to /api/auth/me');
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Auth check successful:', data);
          setDebugInfo(prev => ({ ...prev, authCheck: 'SUCCESS', userData: data }));
        } else {
          const errorText = await response.text();
          console.log('❌ Auth check failed:', errorText);
          setDebugInfo(prev => ({ ...prev, authCheck: 'FAILED', error: errorText }));
        }
      } catch (error) {
        console.error('💥 API call error:', error);
        setDebugInfo(prev => ({ ...prev, authCheck: 'ERROR', error: error.message }));
      }
    };

    if (token) {
      testApiCall();
    }
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h2>🔍 Audit Debug Info</h2>
      <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
        <p><strong>Has Token:</strong> {debugInfo.hasToken ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Role:</strong> {debugInfo.role || 'Not set'}</p>
        <p><strong>User:</strong> {debugInfo.userName || 'Not set'}</p>
        <p><strong>Token Length:</strong> {debugInfo.tokenLength}</p>
        <p><strong>Auth Check:</strong> {debugInfo.authCheck || 'Pending...'}</p>
        {debugInfo.userData && (
          <div>
            <p><strong>User Data:</strong></p>
            <pre>{JSON.stringify(debugInfo.userData, null, 2)}</pre>
          </div>
        )}
        {debugInfo.error && (
          <p style={{ color: 'red' }}><strong>Error:</strong> {debugInfo.error}</p>
        )}
      </div>
    </div>
  );
};

export default TestAuditDebug;