
import React from 'react';
import { ActivitySquare } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

const ActivityLog: React.FC = () => {
  const { data } = useSimulation();
  const { activityLog } = data;
  
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
        <h3 className="font-semibold">Recent Activity</h3>
      </div>
      
      {activityLog.length > 0 ? (
        <div className="divide-y divide-border">
          {activityLog.map(activity => (
            <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-muted mt-0.5">
                  <ActivitySquare size={14} className="text-palm-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">
                      <span className="text-palm-green">{activity.action}</span> {activity.target}
                    </p>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    By: {activity.user}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No activity to display</p>
        </div>
      )}
      
      {activityLog.length > 0 && (
        <div className="p-3 border-t border-border">
          <button className="text-sm text-palm-green hover:underline w-full text-center">
            View Activity History
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
