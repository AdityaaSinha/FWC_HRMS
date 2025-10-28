import React from "react";
import Card from "../Card";

export default function PayrollOverview({ salary }) {
  return (
    <Card title="Payroll Overview">
      <div className="space-y-3 text-base text-gray-700 dark:text-gray-300">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Basic:</span>
          <span>₹{salary.basic}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Allowance:</span>
          <span>₹{salary.allowance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Deductions:</span>
          <span className="text-red-500">-₹{salary.deductions}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2"></div>
        <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
          <span>Net Salary:</span>
          <span>₹{salary.net}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
          Next Pay Date: {salary.nextPayDate}
        </p>
        <button className="mt-3 w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
          Download Payslip
        </button>
      </div>
    </Card>
  );
}