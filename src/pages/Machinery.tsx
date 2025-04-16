import React, { useState } from 'react';
import { Tractor, Truck, Scissors, Plane, TruckIcon } from 'lucide-react';
import Header from '@/components/Header';
import MachineryCard from '@/components/MachineryCard';
import MachineryDetail from '@/components/MachineryDetail';
import OEEGraph from '@/components/OEEGraph';
import { useSimulation } from '@/contexts/SimulationContext';

const Machinery = () => {
  const { data } = useSimulation();
  const { machines } = data;
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  // Find the selected machine
  const machineData = selectedMachine
    ? machines.find(m => m.id === selectedMachine)
    : null;

  // Get icon component
  const getMachineIcon = (type: string) => {
    switch (type) {
      case 'harvester':
        return () => <img src="/image/iconCutter.png" alt="Cutter" className="w-9 h-9" />;
      case 'collector':
        return () => <TruckIcon className="w-9 h-9" style={{ color: 'white', fill: '' }} />;
      case 'frondCutter':
        return () => <img src="/image/iconCollector.png" alt="Collector" className="w-9 h-9" />;
      case 'uavDrone':
        return () => <img src="/image/iconUAV.png" alt="Drone" className="w-9 h-9" />;
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      <Header
        title="Machinery Monitoring"
        subtitle="Track and manage your agricultural machinery"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {machines.map(machine => (
          <MachineryCard
            key={machine.id}
            machine={machine}
            icon={getMachineIcon(machine.type)}
            onClick={() => setSelectedMachine(machine.id)}
          />
        ))}
      </div>

      <OEEGraph />

      {machineData && (
        <MachineryDetail
          machine={machineData}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </div>
  );
};

export default Machinery;
