import React from "react";
import Card from "../Card";

export default function HolidayList({ holidays }) {
  return (
    <Card title="Upcoming Holidays">
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
        {holidays.map((h, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="font-medium">{h.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {h.date}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}