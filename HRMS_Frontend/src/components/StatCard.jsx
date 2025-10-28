import Card from './Card';
import { Icon } from './Icon';

export default function StatCard({ title, value, icon, color }) {
  return (
    <Card>
      <div className="flex items-center">
        <Icon as={icon} size={24} className={`mr-3 text-${color}-500`} />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
}
