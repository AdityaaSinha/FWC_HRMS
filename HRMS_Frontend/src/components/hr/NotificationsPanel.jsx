import React from "react";
import Card from "../Card";

export default function NotificationsPanel({ notifications }) {
  return (
    <Card title="Notifications">
      <ul className="list-disc ml-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </Card>
  );
}