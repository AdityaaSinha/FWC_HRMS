import React from "react";
import Card from "../Card";

export default function UpcomingEvents({ events }) {
  return (
    <Card title="Upcoming Events">
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="font-medium">{e.title}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {e.date}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}