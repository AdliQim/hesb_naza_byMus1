import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our simulated data
export interface MachineData {
  id: string;
  name: string;
  type: 'harvester' | 'collector' | 'frondCutter' | 'uavDrone';
  status: 'active' | 'idle';
  temperature: number;
  fuelLevel: number;
  location: { lat: number; lng: number };
  operationalState: string;
  lastMaintenance: string;
  alerts: Array<{ type: string; message: string; timestamp: string }>;
}

export interface TreeData {
  id: number;
  location: { lat: number; lng: number };
  soilMoisture: number;

  // 🔁 Store nutrient levels using short keys for backend/dev ease
  nutrientLevels: {
    n: number; // Display as "Natrium" in UI
    p: number; // Display as "Phosphorus" in UI
    k: number; // Display as "Potassium" in UI
  };

  trunkHealth: number;
  fruitMaturity: number;
  healthScore: number;
  alerts: Array<{ type: string; message: string; timestamp: string }>;
}

export interface SimulatedData {
  machines: MachineData[];
  trees: TreeData[];
  temperature: number;
  avgSoilMoisture: number;
  healthyTreeCount: number;
  activeMachineCount: number;
  alerts: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    source: string;
    message: string;
    timestamp: string;
  }>;
  activityLog: Array<{
    id: string;
    action: string;
    target: string;
    timestamp: string;
    user: string;
  }>;
  mode: 'simulated' | 'live';
  cameraActive: boolean;
}

interface SimulationContextType {
  data: SimulatedData;
  updateData: (newData: Partial<SimulatedData>) => void;
  toggleCamera: () => void;
  toggleMode: () => void;
}

// Create the context
const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

// Generate initial simulated data
const generateInitialData = (): SimulatedData => {
  const machines: MachineData[] = [
    {
      id: 'machine-1',
      name: 'Harvester A1',
      type: 'harvester',
      status: 'active',
      temperature: 78,
      fuelLevel: 82,
      location: { lat: 4.2105, lng: 101.9758 },
      operationalState: 'Normal',
      lastMaintenance: '2025-03-20',
      alerts: []
    },
    {
      id: 'machine-2',
      name: 'Collector B2',
      type: 'collector',
      status: 'active',
      temperature: 75,
      fuelLevel: 65,
      location: { lat: 4.2115, lng: 101.9778 },
      operationalState: 'Normal',
      lastMaintenance: '2025-03-25',
      alerts: []
    },
    {
      id: 'machine-3',
      name: 'Frond Cutter C1',
      type: 'frondCutter',
      status: 'active',
      temperature: 72,
      fuelLevel: 45,
      location: { lat: 4.2095, lng: 101.9768 },
      operationalState: 'Normal',
      lastMaintenance: '2025-03-15', // ✅ Fix here
      alerts: [
        {
          type: 'warning',
          message: 'Fuel level below 50%',
          timestamp: new Date().toISOString()
        }
      ]
    },
    {
      id: 'machine-4',
      name: 'UAV Drone D1',
      type: 'uavDrone',
      status: 'idle',
      temperature: 65,
      fuelLevel: 90,
      location: { lat: 4.2125, lng: 101.9738 },
      operationalState: 'Charging',
      lastMaintenance: '2025-04-01',
      alerts: []
    }
  ];

  const trees: TreeData[] = Array.from({ length: 40 }, (_, i) => {
    const healthScore = Math.random() * 100;

    return {
      id: i + 1,
      location: {
        lat: 4.21 + Math.random() * 0.01,
        lng: 101.97 + Math.random() * 0.01
      },
      soilMoisture: 60 + Math.floor(Math.random() * 20),

      // 🔁 Use short keys here and map to full names in UI components
      nutrientLevels: {
        n: 70 + Math.floor(Math.random() * 30),
        p: 65 + Math.floor(Math.random() * 35),
        k: 75 + Math.floor(Math.random() * 25)
      },

      trunkHealth: 70 + Math.floor(Math.random() * 30),
      fruitMaturity: Math.floor(Math.random() * 100),
      healthScore,
      alerts:
        healthScore < 60
          ? [
              {
                type: 'warning',
                message: 'Below optimal health',
                timestamp: new Date().toISOString()
              }
            ]
          : []
    };
  });

  const alerts = [
    {
      id: 'alert-1',
      type: 'critical' as const,
      source: 'Harvester A1',
      message: 'Temperature exceeding threshold',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString()
    },
    {
      id: 'alert-2',
      type: 'warning' as const,
      source: 'Tree #23',
      message: 'Soil moisture below optimal level',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString()
    },
    {
      id: 'alert-3',
      type: 'info' as const,
      source: 'UAV Drone D1',
      message: 'Scheduled maintenance due',
      timestamp: new Date(Date.now() - 240 * 60000).toISOString()
    }
  ];

  const activityLog = [
    {
      id: 'activity-1',
      action: 'Harvested',
      target: 'Section A, 5 trees',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      user: 'Ahmad Razali'
    },
    {
      id: 'activity-2',
      action: 'Fertilized',
      target: 'Section B, 10 trees',
      timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
      user: 'Siti Aminah'
    },
    {
      id: 'activity-3',
      action: 'Drone Scan',
      target: 'Full Plantation',
      timestamp: new Date(Date.now() - 300 * 60000).toISOString(),
      user: 'System'
    }
  ];

  return {
    machines,
    trees,
    temperature: 32,
    avgSoilMoisture: 68,
    healthyTreeCount: 38,
    activeMachineCount: 3,
    alerts,
    activityLog,
    mode: 'simulated',
    cameraActive: false
  };
};

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SimulatedData>(generateInitialData);

  const updateData = (newData: Partial<SimulatedData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const toggleCamera = () => {
    setData(prev => ({ ...prev, cameraActive: !prev.cameraActive }));
  };

  const toggleMode = () => {
    setData(prev => ({ ...prev, mode: prev.mode === 'simulated' ? 'live' : 'simulated' }));
  };

  // Simulate live data changes every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const temperature = prev.temperature + (Math.random() - 0.5) * 0.5;
        const avgSoilMoisture = Math.max(50, Math.min(85, prev.avgSoilMoisture + (Math.random() - 0.5) * 2));
        const machines = prev.machines.map(m => ({
          ...m,
          temperature: Math.max(65, Math.min(95, m.temperature + (Math.random() - 0.5) * 2)),
          fuelLevel: Math.max(0, Math.min(100, m.fuelLevel - Math.random() * 0.5))
        }));

        return { ...prev, temperature, avgSoilMoisture, machines };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SimulationContext.Provider value={{ data, updateData, toggleCamera, toggleMode }}>
      {children}
    </SimulationContext.Provider>
  );
};

// Hook for components to access the simulation state
export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
