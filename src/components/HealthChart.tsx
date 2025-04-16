
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSimulation } from '@/contexts/SimulationContext';

// Generate fake data for the past 7 days
const generateChartData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      soilMoisture: 60 + Math.floor(Math.random() * 20),
      temperature: 29 + Math.floor(Math.random() * 5),
      healthScore: 70 + Math.floor(Math.random() * 25),
    });
  }
  
  return data;
};

const HealthChart: React.FC = () => {
  const [data] = React.useState(generateChartData);
  const { theme } = { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' };
  
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Plantation Health Overview</h3>
      </div>
      
      <div className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20e0f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#20e0f5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00bd7e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00bd7e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1C2B33' : '#fff',
                  borderColor: theme === 'dark' ? '#2F3D44' : '#dce6e6',
                  color: theme === 'dark' ? '#F0F0F0' : '#1D1D1D',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                itemStyle={{ padding: '4px 0' }}
              />
              <Area 
                type="monotone" 
                dataKey="soilMoisture" 
                stroke="#20e0f5" 
                fillOpacity={1} 
                fill="url(#colorMoisture)" 
                name="Soil Moisture (%)"
              />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke="#F97316" 
                fillOpacity={1} 
                fill="url(#colorTemperature)" 
                name="Temperature (°C)"
              />
              <Area 
                type="monotone" 
                dataKey="healthScore" 
                stroke="#00bd7e" 
                fillOpacity={1} 
                fill="url(#colorHealth)" 
                name="Health Score (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#20e0f5' }}></div>
          <span className="text-xs text-muted-foreground">Soil Moisture</span>
          </div>
          <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#f97316' }}></div>
          <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#00bd7e' }}></div>
          <span className="text-xs text-muted-foreground">Health Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChart;
