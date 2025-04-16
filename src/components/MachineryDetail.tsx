import React from 'react';
import { X, MapPin, ThermometerSun, Droplet, Activity } from 'lucide-react';
import { MachineData } from '@/contexts/SimulationContext';
import CameraModule from './CameraModule';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface MachineryDetailProps {
  machine: MachineData;
  onClose: () => void;
}

const MachineryDetail: React.FC<MachineryDetailProps> = ({ machine, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
      <div className="bg-card rounded-xl border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-medium">{machine.name} Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CameraModule title={`${machine.name} Live Feed`} />
            
            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm transition-all hover:shadow-md">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">IoT Telemetry</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-palm-green/10">
                      <ThermometerSun size={18} className="text-palm-green" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <p className="font-medium">{machine.temperature.toFixed(2)}°C</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            machine.temperature > 85 
                              ? 'bg-red-500' 
                              : machine.temperature > 75 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                          )}
                          style={{ width: `${(machine.temperature / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-palm-blue/10">
                      <Droplet size={18} className="text-palm-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Fuel Level</p>
                        <p className="font-medium">{machine.fuelLevel.toFixed(2)}%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            machine.fuelLevel < 30 
                              ? 'bg-red-500' 
                              : machine.fuelLevel < 50 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                          )}
                          style={{ width: `${machine.fuelLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-lg bg-secondary/20">
                      <MapPin size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GPS Location</p>
                      <p className="font-medium">
                        {machine.location.lat.toFixed(4)}, {machine.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-lg bg-palm-green/10">
                      <Activity size={18} className="text-palm-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Operational State</p>
                      <p className="font-medium">{machine.operationalState}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm transition-all hover:shadow-md">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-medium">AI Alerts</h3>
                  <StatusBadge status={machine.alerts.length > 0 ? 'warning' : 'healthy'} />
                </div>
                
                <div className="p-4">
                  {machine.alerts.length > 0 ? (
                    <ul className="space-y-3">
                      {machine.alerts.map((alert, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg transition-all duration-300 hover:bg-muted/80">
                          <div className="p-1.5 rounded-full bg-yellow-500/20 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No alerts detected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineryDetail;
