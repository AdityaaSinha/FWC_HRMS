import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Expand, Minimize2, Users, Clock, UserCheck } from 'lucide-react';
import { generateSmartPravavatarUrl } from '../../utils/pravavatarUtils';

// --- Enhanced Custom Tooltip Component ---
// Displays detailed user information on hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Access the full data object passed to the chart for this point
    const dataPoint = payload[0].payload;

    return (
      <div className="bg-[#1B1E2B] p-4 rounded-lg shadow-xl border border-gray-600 text-sm text-white min-w-[280px] max-w-[400px]">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <Clock className="w-4 h-4 text-indigo-400" />
          <p className="font-semibold text-gray-200">{label}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <UserCheck className="w-4 h-4 text-green-400" />
          <p className="text-indigo-400 font-medium">{`Total Logins: ${dataPoint.logins}`}</p>
        </div>

        {/* Display list of users if available */}
        {dataPoint.users && dataPoint.users.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <p className="font-semibold text-gray-300">Users Logged In:</p>
            </div>
            <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2 space-y-1">
              {/* Show detailed user information */}
              {dataPoint.users.slice(0, 8).map((user, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 rounded px-2 py-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={generateSmartPravavatarUrl(user, 24)}
                      alt={user.name}
                      className="w-6 h-6 rounded-full border border-gray-600"
                    />
                    <span className="text-gray-300 text-xs">{user.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-blue-400">{user.role}</span>
                    <span className="text-xs text-gray-500">ID: {user.employeeId}</span>
                  </div>
                </div>
              ))}
              {/* Indicate if more users logged in than shown */}
              {dataPoint.users.length > 8 && (
                <div className="text-center py-1">
                  <p className="text-gray-500 text-xs">...and {dataPoint.users.length - 8} more users</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null; // Render nothing if tooltip is not active
};


// --- Main TinyLineChartCard Component ---
const TinyLineChartCard = ({ title, data = [], dataKey = "logins", isLoading, color = "#8884d8", icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-[#1B1E2B] p-6 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 ${
      isExpanded ? 'col-span-2 row-span-2' : ''
    }`}>
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-indigo-400" />}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <button
          onClick={toggleExpanded}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
          title={isExpanded ? "Minimize view" : "Expand view"}
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
          ) : (
            <Expand className="w-4 h-4 text-gray-400 group-hover:text-white" />
          )}
        </button>
      </div>

      {/* Chart Container */}
      <div className={`transition-all duration-300 ${isExpanded ? 'h-96' : 'h-32'}`}>
        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">Loading Chart...</div>
        ) :
        /* Empty State */
        !data || data.length === 0 ? (
           <div className="flex items-center justify-center h-full text-gray-500 text-xs">No activity data available.</div>
        ) : (
          /* Chart Rendering */
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              {isExpanded && (
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              )}
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                hide={!isExpanded}
              />
              {isExpanded && (
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
              )}
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={isExpanded ? 3 : 2}
                dot={isExpanded ? { fill: color, strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#1B1E2B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Expanded View Additional Info */}
      {isExpanded && data && data.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-indigo-400">
                {data.reduce((sum, item) => sum + (item[dataKey] || 0), 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total Logins</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">
                {Math.max(...data.map(item => item[dataKey] || 0))}
              </div>
              <div className="text-xs text-gray-400 mt-1">Peak Logins</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(data.reduce((sum, item) => sum + (item[dataKey] || 0), 0) / data.length)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Avg Logins</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TinyLineChartCard;