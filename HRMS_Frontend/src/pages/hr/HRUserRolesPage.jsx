// src/pages/hr/HRUserRolesPage.jsx
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function HRUserRolesPage() {
  const roles = [
    { name: 'HR Manager', access: 'Full Access' },
    { name: 'Recruiter', access: 'Limited Access' },
    { name: 'Intern', access: 'Read Only' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-400 mb-6">HR Roles & Permissions</h2>

      <div className="bg-[#1B1E2B] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-gray-300">
          <thead className="bg-[#23263A] text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Access Level</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.name} className="border-t border-gray-800 hover:bg-[#2A2D3D]">
                <td className="px-6 py-4 flex items-center gap-3">
                  <ShieldCheck className="text-indigo-400" size={18} />
                  {r.name}
                </td>
                <td className="px-6 py-4 text-gray-400">{r.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
