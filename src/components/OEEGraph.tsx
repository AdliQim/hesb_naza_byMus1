import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const generateOEEData = () => {
  const data = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const availability = parseFloat((85 + Math.random() * 10).toFixed(2));
    const performance = parseFloat((80 + Math.random() * 15).toFixed(2));
    const quality = parseFloat((90 + Math.random() * 8).toFixed(2));
    const oee = parseFloat(((availability + performance + quality) / 3).toFixed(2));

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      availability,
      performance,
      quality,
      oee,
    });
  }

  return data;
};

const OEEGraph = () => {
  const [data] = React.useState(generateOEEData);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Overall Equipment Effectiveness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-muted-foreground text-xs" />
              <YAxis className="text-muted-foreground text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }} 
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="availability"
                name="Availability"
                stroke="#00c29c"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                name="Performance"
                stroke="#b300ff"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="quality"
                name="Quality"
                stroke="#0091ff"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="oee"
                name="OEE Value"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OEEGraph;
