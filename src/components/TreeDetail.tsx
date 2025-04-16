'use client';

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Droplet, Leaf, TreePalm, PieChart } from 'lucide-react';
import { TreeData } from '@/contexts/SimulationContext';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface TreeDetailProps {
  tree?: TreeData;
  onClose?: () => void;
}

const getHealthStatus = (score: number) => {
  if (score >= 75) return 'healthy';
  if (score >= 50) return 'warning';
  return 'critical';
};

// Mapping nutrient keys to full names
const nutrientLabels = {
  n: 'Natrium (N)',
  p: 'Phosphorus (P)',
  k: 'Potassium (K)'
} as const;

const TreeDetail: React.FC<TreeDetailProps> = ({ tree, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fallbackTree: TreeData = {
    id: Number(id),
    healthScore: 85,
    soilMoisture: 75,
    fruitMaturity: 80,
    trunkHealth: 78,
    nutrientLevels: { n: 70, p: 65, k: 80 },
    location: { lat: 3.139, lng: 101.6869 },
    alerts: [
      {
        type: 'info',
        message: 'Optimal harvest time approaching',
        timestamp: new Date().toISOString()
      }
    ]
  };

  const currentTree = tree ?? fallbackTree;
  const handleClose = onClose ?? (() => navigate('/map'));
  const healthStatus = getHealthStatus(currentTree.healthScore);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
      <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <TreePalm size={20} className="text-palm-green" />
            <h2 className="text-xl font-medium">Tree #{currentTree.id}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Health Overview */}
            <div className="col-span-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-medium">Health Overview</h3>
                <StatusBadge status={healthStatus} />
              </div>
              <div className="p-4">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-muted-foreground">AI Health Score</span>
                  <span>{currentTree.healthScore.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 rounded-full",
                      currentTree.healthScore >= 75
                        ? 'bg-green-500'
                        : currentTree.healthScore >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    )}
                    style={{ width: `${currentTree.healthScore}%` }}
                  />
                </div>

                {/* Moisture + Maturity */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted p-3 rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplet size={16} className="text-blue-500" />
                      <span className="text-sm">Soil Moisture</span>
                    </div>
                    <p className="text-lg font-medium">{currentTree.soilMoisture.toFixed(2)}%</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <PieChart size={16} className="text-palm-green" />
                      <span className="text-sm">Fruit Maturity</span>
                    </div>
                    <p className="text-lg font-medium">{currentTree.fruitMaturity.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrient Levels */}
            <div className="col-span-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md">
              <div className="p-4 border-b border-border font-medium">Nutrient Levels</div>
              <div className="p-4 space-y-4">
                {(['n', 'p', 'k'] as const).map((key) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{nutrientLabels[key]}</span>
                      <span className="font-medium">{currentTree.nutrientLevels[key].toFixed(2)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all duration-500 rounded-full',
                          key === 'n'
                            ? 'bg-blue-500'
                            : key === 'p'
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                        )}
                        style={{ width: `${currentTree.nutrientLevels[key]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Info */}
            <div className="col-span-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md">
              <div className="p-4 border-b border-border font-medium">Location</div>
              <div className="p-4 font-mono text-sm text-muted-foreground">
                GPS: {currentTree.location.lat.toFixed(4)}, {currentTree.location.lng.toFixed(4)}
              </div>
            </div>

            {/* Alerts */}
            {currentTree.alerts.length > 0 && (
              <div className="col-span-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md">
                <div className="p-4 border-b border-border font-medium">Alerts</div>
                <div className="p-4 space-y-2">
                  {currentTree.alerts.map((alert, idx) => (
                    <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                      <p className="font-medium text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">AI Suggested Action:</span>
              </div>
              <p className="p-3 bg-muted text-sm rounded-md">
                {currentTree.healthScore < 60
                  ? "Apply additional fertilizer with increased potassium levels. Schedule irrigation within 24 hours."
                  : currentTree.healthScore < 75
                  ? "Monitor soil moisture levels. Consider preventative pest treatment."
                  : "Tree is healthy. Continue regular maintenance schedule."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;
