import React from "react";
import { Calendar, TrendingUp, Clock, CheckCircle } from "lucide-react";
import Card from "../Card";

export default function LeaveOverview({ leave }) {
  const remaining = leave.total - leave.used;
  
  return (
    <Card title="Leave Overview" className="h-full">
      <div className="space-y-6">
        {/* Leave Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Total</span>
            </div>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{leave.total}</p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Used</span>
            </div>
            <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">{leave.used}</p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{leave.pending}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-800 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{remaining}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Leave Usage</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {leave.used} of {leave.total} days used
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((leave.used / leave.total) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Calendar className="w-5 h-5" />
            Apply for Leave
          </button>
        </div>
      </div>
    </Card>
  );
}