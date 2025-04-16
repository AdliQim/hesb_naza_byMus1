import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

const AlertsList: React.FC = () => {
  const { data } = useSimulation();
  const { alerts } = data;
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'info':
        return <Info className="text-blue-500" size={16} />;
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      day: 'numeric',
      month: 'short'
    });
  };
  
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Recent Alerts</h3>
      </div>
      
      {alerts.length > 0 ? (
        <div className="divide-y divide-border">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{alert.message}</p>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Source: {alert.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No alerts to display</p>
        </div>
      )}
      
      {alerts.length > 0 && (
        <div className="p-3 border-t border-border">
          <button className="text-sm text-palm-green hover:underline w-full text-center">
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsList;