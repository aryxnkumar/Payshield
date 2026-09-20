import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'navy';
  trend?: string;
}

const colorStyles = {
  blue: { bg: 'bg-electric-50', text: 'text-electric-600', icon: 'text-electric-500' },
  green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-500' },
  red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-500' },
  navy: { bg: 'bg-navy-50', text: 'text-navy-700', icon: 'text-navy-500' },
};

export function StatCard({ label, value, icon: Icon, color = 'blue', trend }: StatCardProps) {
  const styles = colorStyles[color];
  return (
    <div className="card p-5 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
          {trend && <p className={`mt-1 text-xs font-medium ${styles.text}`}>{trend}</p>}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.bg}`}>
          <Icon className={`h-6 w-6 ${styles.icon}`} />
        </div>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-navy-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
