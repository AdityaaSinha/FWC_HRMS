import React from "react";
import Card from "../Card";

export default function PerformanceOverview({ performance }) {
  return (
    <Card title="Performance Overview">
      <ul className="text-base text-gray-700 dark:text-gray-300 space-y-3">
        <li className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Performance Rating:</span> {performance.rating}
        </li>
        <li className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Interviews Conducted:</span> {performance.interviewsConducted}
        </li>
        <li className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Successful Hires:</span> {performance.hires}
        </li>
        <li className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Trainings Attended:</span> {performance.trainings}
        </li>
      </ul>
    </Card>
  );
}