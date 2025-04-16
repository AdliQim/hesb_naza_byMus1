
import React, { ReactNode } from 'react';

type StatusType = 'active' | 'idle' | 'critical' | 'warning' | 'healthy' | 'simulated' | 'live';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  children?: ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', children }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'active':
        return { label: 'Active', colorClass: 'badge-green' };
      case 'idle':
        return { label: 'Idle', colorClass: 'badge-yellow' };
      case 'critical':
        return { label: 'Critical', colorClass: 'badge-red' };
      case 'warning':
        return { label: 'Warning', colorClass: 'badge-yellow' };
      case 'healthy':
        return { label: 'Healthy', colorClass: 'badge-green' };
      case 'simulated':
        return { label: 'Simulated', colorClass: 'badge-blue' };
      case 'live':
        return { label: 'Live', colorClass: 'badge-green' };
      default:
        return { label: status, colorClass: 'badge-blue' };
    }
  };

  const { label, colorClass } = getStatusConfig(status);

  return (
    <span className={`badge ${colorClass} ${className}`}>
      {children || label}
    </span>
  );
};

export default StatusBadge;
