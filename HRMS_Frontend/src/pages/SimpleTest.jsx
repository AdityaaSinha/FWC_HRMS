import React, { useEffect } from 'react';

function SimpleTest() {
  console.log('🚀🚀🚀 SIMPLE TEST COMPONENT IS MOUNTING! 🚀🚀🚀');
  console.log('🚀🚀🚀 SIMPLE TEST COMPONENT IS MOUNTING! 🚀🚀🚀');
  console.log('🚀🚀🚀 SIMPLE TEST COMPONENT IS MOUNTING! 🚀🚀🚀');

  useEffect(() => {
    console.log('🔥🔥🔥 SIMPLE TEST COMPONENT MOUNTED! 🔥🔥🔥');
    console.log('🔥🔥🔥 SIMPLE TEST COMPONENT MOUNTED! 🔥🔥🔥');
    console.log('🔥🔥🔥 SIMPLE TEST COMPONENT MOUNTED! 🔥🔥🔥');
    
    // Also alert to make it super obvious
    alert('SIMPLE TEST COMPONENT MOUNTED SUCCESSFULLY!');
  }, []);

  return (
    <div style={{
      padding: '50px',
      backgroundColor: 'red',
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <h1>🚀 SIMPLE TEST COMPONENT IS WORKING! 🚀</h1>
      <p>If you can see this, React Router is working!</p>
      <p>Current URL: {window.location.href}</p>
      <p>Current pathname: {window.location.pathname}</p>
    </div>
  );
}

export default SimpleTest;