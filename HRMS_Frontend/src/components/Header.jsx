import React from 'react';
import { Settings, Bell, User, LogOut } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[#1A1D2D] border-b border-[#2A2D3D] text-white">
      {/* Left side: Title */}
      <div>
        <h1 className="text-xl font-semibold">Organization Dashboard</h1>
      </div>

      {/* Right side: Icons and User Menu */}
      <div className="flex items-center space-x-5">
        <button className="text-gray-400 hover:text-white">
          <Settings size={20} />
        </button>
        {/* <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button> */}

        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 text-white font-bold">
            D
          </div>
          <div>
            <div className="font-medium">Demo User</div>
            <div className="text-xs text-gray-400">demo@hrms.com</div>
          </div>
          <button className="text-gray-400 hover:text-white" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}