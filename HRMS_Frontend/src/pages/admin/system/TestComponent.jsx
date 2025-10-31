import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">Test Component</h1>
      <p className="text-gray-600 mt-4">This is a test component to verify routing works.</p>
      <div className="mt-4 p-4 bg-blue-100 rounded">
        <p>If you can see this, the routing is working correctly.</p>
      </div>
    </div>
  );
};

export default TestComponent;