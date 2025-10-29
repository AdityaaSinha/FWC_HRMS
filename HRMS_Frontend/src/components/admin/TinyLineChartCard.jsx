import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- Custom Tooltip Component ---
// Displays user details on hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Access the full data object passed to the chart for this point
    const dataPoint = payload[0].payload;

    return (
      <div className="bg-[#25293D] p-3 rounded-md shadow-lg border border-gray-700 text-xs text-white">
        <p className="label text-gray-400 font-bold mb-1">{`${label}`}</p>
        <p className="intro text-indigo-400">{`Total Logins: ${dataPoint.logins}`}</p>

        {/* Display list of users if available */}
        {dataPoint.users && dataPoint.users.length > 0 && (
          <div className="mt-2 text-gray-300 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
            <p className="font-semibold mb-1">Users Logged In:</p>
            {/* Limit display if too many users */}
            {dataPoint.users.slice(0, 10).map((user, index) => (
              <p key={index} className='truncate'>{`- ${user.name} (${user.role})`}</p>
            ))}
             {/* Indicate if more users logged in than shown */}
             {dataPoint.users.length > 10 && <p className="mt-1 text-gray-500 text-[10px]">...and {dataPoint.users.length - 10} more</p>}
          </div>
        )}
      </div>
    );
  }

  return null; // Render nothing if tooltip is not active
};


// --- Main Chart Card Component ---
export default function TinyLineChartCard({ title, data = [], dataKey = "logins", isLoading, color = "#8884d8" }) {
  return (
    <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800 h-full flex flex-col min-h-[200px]">
      {/* Card Title */}
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>

      {/* Chart Container */}
      <div className="flex-1"> {/* This div ensures ResponsiveContainer fills the space */}
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
            <LineChart data={data} margin={{ top: 5, right: 15, left: -25, bottom: 0 }}>
              {/* Optional background grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />

              {/* X Axis (Time/Day Labels) */}
              <XAxis
                 dataKey="name"      // Use 'name' field from data (e.g., "14:00", "Mon")
                 stroke="#6b7280"    // Axis line/tick color
                 fontSize={10}       // Font size for labels
                 axisLine={false}    // Hide the main axis line
                 tickLine={false}    // Hide ticks
                 padding={{ left: 10, right: 10 }} // Padding for labels
              />

              {/* Y Axis (Login Count) */}
              <YAxis
                 stroke="#6b7280"
                 fontSize={10}
                 axisLine={false}
                 tickLine={false}
                 allowDecimals={false} // Don't show decimal counts
                 width={30}            // Reserve space for Y-axis labels
              />

              {/* Tooltip - Use our custom component */}
              <Tooltip
                content={<CustomTooltip />} // Pass the custom component
                cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }} // Style the hover line
              />

              {/* The Line Itself */}
              <Line
                 type="monotone"   // Curve style
                 dataKey={dataKey} // Use the specified data key ("logins")
                 stroke={color}    // Line color passed as prop
                 strokeWidth={2}
                 dot={false}       // Hide dots on each data point
                 activeDot={{ r: 4, fill: color, stroke: '#1E2132', strokeWidth: 2 }} // Style for hovered dot
               />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}