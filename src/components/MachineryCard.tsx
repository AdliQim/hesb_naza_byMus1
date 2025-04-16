import React from 'react';
import { LucideIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { MachineData } from '@/contexts/SimulationContext';

interface MachineryCardProps {
  machine: MachineData;
  icon: LucideIcon | (() => JSX.Element); // Support custom JSX icons
  onClick?: () => void;
}

const MachineryCard: React.FC<MachineryCardProps> = ({ machine, icon: Icon, onClick }) => {
  return (
    <div 
      className="bg-card rounded-xl border border-border p-5 cursor-pointer transition-all hover:shadow-md hover:border-palm-green dark:hover:border-palm-neon"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-full bg-[#5cc4b0] animate-pulse-slow">
      <Icon size={24} className="text-white" />
        </div>
        <StatusBadge status={machine.status} />
      </div>
      
      <h3 className="font-medium">{machine.name}</h3>
      <p className="text-sm text-muted-foreground">{machine.operationalState}</p>
      
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Temperature</p>
          <p className="font-medium">{machine.temperature.toFixed(2)}°C</p>

        </div>
        <div>
          <p className="text-muted-foreground">Fuel</p>
          <p className="font-medium">{machine.fuelLevel.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default MachineryCard;
