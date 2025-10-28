export const MOCK_HR = {
  id: "HR0924",
  name: "Priya Sharma",
  role: "HR Recruiter",
  department: "Talent Acquisition",
  email: "priya.sharma@company.com",
  phone: "+91 98765 43210",
  joinDate: "2020-04-15",
  experience: "4 years",
  location: "Bangalore Office",
  manager: "Rohit Verma",
  employmentType: "Full-Time",
  salary: {
    basic: 50000,
    allowance: 12000,
    deductions: 3000,
    net: 59000,
    nextPayDate: "2025-11-01",
  },
  leave: {
    total: 24,
    used: 10,
    pending: 2,
  },
  upcomingEvents: [
    { title: "Team Building Workshop", date: "2025-10-25" },
    { title: "HR Policy Review Meeting", date: "2025-10-28" },
  ],
  holidays: [
    { name: "Diwali", date: "2025-10-29" },
    { name: "Christmas", date: "2025-12-25" },
  ],
  performance: {
    rating: "4.3 / 5",
    interviewsConducted: 42,
    hires: 18,
    trainings: 3,
  },
  notifications: [
    "Your October payslip is now available.",
    "2 leave requests are pending for approval.",
    "Company policy updated: Remote work guidelines.",
  ],
};
