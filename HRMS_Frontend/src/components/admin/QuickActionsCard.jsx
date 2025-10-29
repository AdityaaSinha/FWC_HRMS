import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Settings, Megaphone, ListChecks } from 'lucide-react';

// Define the actions and their corresponding links/icons
const actions = [
  { label: "Add New User", icon: UserPlus, path: "/admin/users/add", color: "indigo" }, // Ensure this route exists or adjust
  { label: "Manage Roles", icon: Settings, path: "/admin/system/role-permission", color: "blue" }, // Link to existing route
  { label: "Post Announcement", icon: Megaphone, path: "/admin/communication/system-announcements", color: "green" }, // Link to existing route
  { label: "View Audit Logs", icon: ListChecks, path: "/admin/system/audit-logs", color: "yellow" }, // Link to existing route
];

// Map color names to full Tailwind classes to ensure they are included in the build
const colorMap = {
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  yellow: "bg-yellow-500 hover:bg-yellow-600 text-gray-900", // Yellow needs dark text for contrast
};

// Displays buttons for common admin tasks
export default function QuickActionsCard() {
  return (
    <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 h-full"> {/* Added h-full */}
      <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            // Use the colorMap to apply background and hover styles
            className={`flex flex-col items-center justify-center p-4 rounded-lg text-white text-center text-sm font-medium transition-colors duration-200 aspect-square ${colorMap[action.color]}`}
            // Added aspect-square to make buttons square-ish
          >
            <action.icon size={28} className="mb-2" /> {/* Increased icon size */}
            <span className="leading-tight">{action.label}</span> {/* Adjusted line height */}
          </Link>
        ))}
      </div>
    </div>
  );
}
