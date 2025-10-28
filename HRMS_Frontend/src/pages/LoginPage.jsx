import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, BriefcaseBusiness, UserRoundCog, UserRound } from 'lucide-react'; // Importing icons

export default function LoginPage() {
  const navigate = useNavigate();

 const handleRoleSelection = (rolePath) => {
  navigate(`/login/${rolePath.replace('/', '')}`);
};

  const handleLogin = () => {
  // after successful login
  localStorage.setItem('token', 'dummy-token');
  navigate('/admin'); // redirect to admin dashboard
};


  const roleCards = [
    {
      title: "Management Admin",
      subtitle: "Admin Portal",
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      path: "/admin",
    },
    {
      title: "HR Recruiter",
      subtitle: "HR Portal",
      icon: <BriefcaseBusiness className="w-8 h-8 text-blue-500" />,
      path: "/hr",
    },
    {
      title: "Senior Manager",
      subtitle: "Manager Portal",
      icon: <UserRoundCog className="w-8 h-8 text-green-500" />,
      path: "/manager",
    },
    {
      title: "Employee",
      subtitle: "Employee Portal",
      icon: <UserRound className="w-8 h-8 text-purple-500" />,
      path: "/employee",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0D18] text-white">
      {/* Top Section: Logo and Welcome Message */}
      <div className="text-center mb-12">
        <div className="bg-[#4F46E5] p-3 rounded-full inline-flex mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2">Welcome to AI HRMS</h1>
        <p className="text-lg text-gray-400">Please select your role to continue.</p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {roleCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-[#1A1D2D] rounded-xl shadow-lg cursor-pointer hover:bg-[#2A2D3D] transition-colors"
            onClick={() => handleRoleSelection(card.path)}
          >
            <div className="mr-4">
              {card.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{card.title}</h2>
              <p className="text-gray-400 text-sm">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}