
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  gradientClass?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  gradientClass = 'bg-gradient-palm',
  iconColor = 'text-white',
}) => {
  const isTrendPositive = trend && trend.value > 0;
  const isTrendNegative = trend && trend.value < 0;

  return (
    <div className="stat-card bg-card">
      <div className="flex flex-col p-5 h-full">
        <div className="flex justify-between items-start mb-3">
          <div className={`p-2.5 rounded-lg ${gradientClass}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          
          {trend && (
            <div
              className={`flex items-center text-xs font-medium ${
                isTrendPositive
                  ? 'text-green-600 dark:text-green-400'
                  : isTrendNegative
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500'
              }`}
            >
              <span>
                {isTrendPositive && '+'}
                {trend.value}%
              </span>
              <span className="ml-1 text-muted-foreground text-[10px]">
                {trend.label}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
