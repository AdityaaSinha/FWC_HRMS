export default function StatusBadge({ text, type }) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    neutral: 'bg-gray-100 text-gray-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Shortlisted: 'bg-indigo-100 text-indigo-800',
    Interview: 'bg-blue-100 text-blue-800'
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type] || 'bg-gray-100 text-gray-800'}`}>{text}</span>;
}
