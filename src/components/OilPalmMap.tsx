'use client';
import type { LucideProps } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapIcon,
  SatelliteDish,
  TreePalm,
  HeartPulse,
  AlertTriangle,
  Skull,
  HopOff,
  Hop
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface TreeData {
  id: number;
  healthScore: number;
  harvested?: boolean;
  readyToHarvest?: boolean;
}

interface MapTreeProps {
  id: number;
  x: number;
  y: number;
  healthScore: number;
  harvested?: boolean;
  readyToHarvest?: boolean;
}

const MapTree: React.FC<MapTreeProps> = ({
  id, x, y, healthScore, harvested, readyToHarvest
}) => {
  const navigate = useNavigate();

  const getTreeColor = () => {
    if (harvested) return 'bg-[color:#6800c9]';
    if (readyToHarvest) return 'bg-[color:#7B3F00]';
    if (healthScore >= 75) return 'bg-green-500';
    if (healthScore >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className="absolute flex flex-col items-center transition-all hover:scale-110 cursor-pointer"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={() => navigate(`/tree/${id}`)}
    >
      <div className="w-12 h-12 rounded-full bg-palm-green/20 dark:bg-palm-green/40 flex items-center justify-center mb-1 animate-pulse-slow">
        <div className={`w-6 h-6 rounded-full ${getTreeColor()}`} />
      </div>
      <span className="text-[10px] font-medium bg-white dark:bg-muted px-1 rounded shadow-sm">
        {id}
      </span>
    </div>
  );
};

const MapRoad = ({ points }: { points: string }) => (
  <svg viewBox="0 0 1000 500" width="1000" height="500" className="absolute top-0 left-0 z-[1]">
    <path
      d={points}
      stroke="#3f3f46"
      strokeWidth="1"
      fill="none"
      strokeDasharray="4,2"
    />
  </svg>
);

const OilPalmMap: React.FC = () => {
  // const [mapType, setMapType] = React.useState<'stylized' | 'satellite'>('stylized');

  const GRID_WIDTH = 1000;
  const GRID_HEIGHT = 500;
  const SECTION_WIDTH = GRID_WIDTH / 7;
  const TREE_SPACING_Y = GRID_HEIGHT / 6;

  const mockTreeData: TreeData[] = Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      healthScore:
        [30, 40].includes(id) ? 30 :
        [2, 13, 14, 28, 36, 37, 38].includes(id) ? 60 :
        [17, 23, 29].includes(id) ? 80 :
        85,
      harvested: [17, 23, 29].includes(id),
      readyToHarvest: [36, 37, 38].includes(id)
    };
  });

  const sections: Record<number, number[]> = {
    1: [1, 2, 3, 4, 5, 6],
    2: [7, 8, 9, 10, 11],
    3: [12, 13, 14, 15, 16, 17],
    4: [18, 19, 20, 21, 22, 23],
    5: [24, 25, 26, 27, 28, 29],
    6: [30, 31, 32, 33, 34],
    7: [35, 36, 37, 38, 39, 40]
  };

  const getTreeCoordinates = (id: number): { x: number; y: number } | null => {
    for (const [section, ids] of Object.entries(sections)) {
      const idx = ids.indexOf(id);
      if (idx !== -1) {
        const sectionIndex = parseInt(section) - 1;
        const x = sectionIndex * SECTION_WIDTH + SECTION_WIDTH / 2;
        const y = idx * TREE_SPACING_Y + TREE_SPACING_Y / 2;
        return { x, y };
      }
    }
    return null;
  };

  const treePositions = React.useMemo(() => {
    return mockTreeData
      .map(tree => {
        const coords = getTreeCoordinates(tree.id);
        if (!coords) return null;
        return { ...tree, x: coords.x, y: coords.y };
      })
      .filter(Boolean) as Array<TreeData & { x: number; y: number }>;
  }, []);

  const healthyTrees = treePositions.filter(t => t.healthScore >= 75 && !t.harvested);
  const cautionTrees = treePositions.filter(t => t.healthScore >= 50 && t.healthScore < 75 && !t.harvested);
  const criticalTrees = treePositions.filter(t => t.healthScore < 50);
  const readyTrees = treePositions.filter(t => t.readyToHarvest);
  const harvestedTrees = treePositions.filter(t => t.harvested);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl">
        <TreeCounter icon={TreePalm} label="Total Trees" value={treePositions.length} color="bg-palm-green" />
        <TreeCounter icon={HeartPulse} label="Healthy Trees" value={healthyTrees.length} color="bg-green-500" />
        <TreeCounter icon={AlertTriangle} label="Sick Trees" value={cautionTrees.length} color="bg-yellow-500" />
        <TreeCounter icon={Skull} label="Dead Trees" value={criticalTrees.length} color="bg-red-500" />
        <TreeCounter icon={Hop} label="Ready to Harvest" value={readyTrees.length} color="bg-amber-600" />
        <TreeCounter icon={HopOff} label="Harvested" value={harvestedTrees.length} color="bg-purple-500" />
      </div>

      {/* <div className="flex justify-end w-[1000px]">
        <div className="flex gap-2">
          <button
            className={cn(
              'px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5',
              mapType === 'stylized'
                ? 'bg-palm-green text-white shadow-md'
                : 'border border-border hover:bg-muted'
            )}
            onClick={() => setMapType('stylized')}
          >
            <MapIcon size={14} />
            Stylized
          </button>
          <button
            className={cn(
              'px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5',
              mapType === 'satellite'
                ? 'bg-palm-green text-white shadow-md'
                : 'border border-border hover:bg-muted'
            )}
            onClick={() => setMapType('satellite')}
          >
            <SatelliteDish size={14} />
            Satellite
          </button>
        </div>
      </div> */}

      <div
        className="relative border border-border rounded-lg overflow-hidden bg-muted shadow-md"
        style={{ width: '1000px', height: '500px' }}
      >
        <div className="absolute inset-0">
          {/* {mapType === 'stylized' && (
            <>
              {[...Array(7)].map((_, i) => (
                <MapRoad key={`h-${i}`} points={`M0,${i * TREE_SPACING_Y} L1000,${i * TREE_SPACING_Y}`} />
              ))}
              {[...Array(8)].map((_, i) => (
                <MapRoad key={`v-${i}`} points={`M${i * SECTION_WIDTH},0 L${i * SECTION_WIDTH},500`} />
              ))}
            </>
          )} */}
          {treePositions.map(tree => (
            <MapTree
              key={tree.id}
              id={tree.id}
              x={tree.x}
              y={tree.y}
              healthScore={tree.healthScore}
              harvested={tree.harvested}
              readyToHarvest={tree.readyToHarvest}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TreeCounter = ({
  icon: Icon,
  label,
  value,
  color
}: {
  icon: React.FC<LucideProps>;
  label: string;
  value: number;
  color: string;
}) => (
  <div className={cn('rounded-md px-4 py-3 flex items-center gap-3 shadow-md bg-muted', color, 'bg-opacity-20')}>
    <Icon size={20} className={color} />
    <div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export default OilPalmMap;
