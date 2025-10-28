import React from "react";
import Card from "../Card";

export default function EmploymentSummaryCard({ hr }) {
  return (
    <Card title="Employment Summary">
      <ul className="text-base text-gray-700 dark:text-gray-300 space-y-3">
        <li>
          <span className="font-medium text-gray-500 dark:text-gray-400">Manager: </span>
          {hr.manager}
        </li>
        <li>
          <span className="font-medium text-gray-500 dark:text-gray-400">Type: </span>
          {hr.employmentType}
        </li>
        <li>
          <span className="font-medium text-gray-500 dark:text-gray-400">Location: </span>
          {hr.location}
        </li>
        <li>
          <span className="font-medium text-gray-500 dark:text-gray-400">Experience: </span>
          {hr.experience}
        </li>
      </ul>
    </Card>
  );
}