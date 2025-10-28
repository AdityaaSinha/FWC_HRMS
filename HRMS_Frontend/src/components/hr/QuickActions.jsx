import React from "react";
import Card from "../Card";

// We MUST define the full class names here, otherwise Tailwind will remove them.
const colorMap = {
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  yellow: "bg-yellow-500 hover:bg-yellow-600 text-gray-900", // Yellow needs dark text
};

export default function QuickActions() {
  const actions = [
    { label: "View Candidates", color: "indigo" },
    { label: "Add Job Posting", color: "blue" },
    { label: "View Attendance", color: "green" },
    { label: "Company Policies", color: "yellow" },
  ];

  return (
    <Card title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            className={`text-white rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${colorMap[a.color]}`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </Card>
  );
}