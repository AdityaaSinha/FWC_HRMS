export default function AILoadingSpinner({ size = 6 }) {
  return (
    <div className={`animate-spin rounded-full border-t-4 border-b-4 border-indigo-500 h-${size} w-${size}`}></div>
  );
}
