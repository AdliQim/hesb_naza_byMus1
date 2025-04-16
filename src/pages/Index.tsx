
import React from 'react';
import { Tractor, Droplet, TreePalm, Thermometer } from 'lucide-react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import HealthChart from '@/components/HealthChart';
import AlertsList from '@/components/AlertsList';
import ActivityLog from '@/components/ActivityLog';
import { useSimulation } from '@/contexts/SimulationContext';

const Index = () => {
  const { data } = useSimulation();
  const { activeMachineCount, avgSoilMoisture, healthyTreeCount, temperature } = data;
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <Header 
        title="Dashboard" 
        subtitle="Monitor your plantation's real-time performance" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Active Machinery" 
          value={`${activeMachineCount} / 4`}
          icon={Tractor}
          trend={{ value: 0, label: "unchanged" }}
          gradientClass="bg-gradient-to-br from-yellow-300 to-yellow-500"
        />
        
        <StatCard 
          title="Avg. Soil Moisture" 
          value={`${avgSoilMoisture.toFixed(2)}%`}
          icon={Droplet}
          trend={{ value: 2.5, label: "vs last week" }}
          gradientClass="bg-gradient-to-br from-blue-300 to-blue-500"
        />
        
        <StatCard 
          title="Healthy Trees" 
          value={`${healthyTreeCount} / 40`}
          icon={TreePalm}
          trend={{ value: -1, label: "vs last scan" }}
          gradientClass="bg-gradient-to-br from-green-300 to-green-500"
        />
        
        <StatCard 
          title="Temperature" 
          value={`${temperature.toFixed(2)}°C`}
          icon={Thermometer}
          trend={{ value: 1.2, label: "vs yesterday" }}
          gradientClass="bg-gradient-to-br from-orange-400 to-orange-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <HealthChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MachinerySummary />
            <FieldSummary />
          </div>
        </div>
        
        <div className="space-y-6">
          <AlertsList />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

// Additional smaller components for dashboard
const MachinerySummary = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold">Today Machinery Summary</h3>
    </div>
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Cycles achieved</p>
          <p className="text-2xl font-semibold">3</p>
        </div>
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Breakdown</p>
          <p className="text-2xl font-semibold">1</p>
        </div>
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Total Idle Time (min)</p>
          <p className="text-2xl font-semibold">126</p>
        </div>
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Issues Detected</p>
          <p className="text-2xl font-semibold">2</p>
        </div>
      </div>
    </div>
  </div>
);

const FieldSummary = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold">Today Field Status</h3>
    </div>
    <div className="p-4">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Irrigation Coverage</span>
            <span className="font-medium">92%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
          <div className="h-1.5 rounded-full" style={{ width: '92%', backgroundColor: '#00d9ca' }}></div>          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Fertilizer Coverage</span>
            <span className="font-medium">87%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
          <div className="h-1.5 rounded-full" style={{ width: '87%', backgroundColor: '#5ad900' }}></div>          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Pest Spray Coverage</span>
            <span className="font-medium">94%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Harvested Coverage</span>
            <span className="font-medium">88%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Index;
