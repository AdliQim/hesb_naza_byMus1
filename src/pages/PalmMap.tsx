'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import OilPalmMap from '@/components/OilPalmMap';
import TreeDetail from '@/components/TreeDetail';
import OEEGraph from '@/components/OEEGraph';
import { useSimulation } from '@/contexts/SimulationContext';

const PalmMap = () => {
  const { data } = useSimulation();
  const [selectedTree, setSelectedTree] = useState<number | null>(null);

  const treeData = selectedTree !== null
    ? data.trees.find(tree => tree.id === selectedTree)
    : null;

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-8">
      <Header
        title="Oil Palm Map"
        subtitle="Visualize and monitor your plantation"
      />

      {/* Map Container */}
      <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
        {/* 🛠 Removed props passed to OilPalmMap */}
        <OilPalmMap />
      </div>

      {/* Graph Container */}
      <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
        <OEEGraph />
      </div>

      {/* Optional Tree Detail Modal (if used elsewhere in modal format) */}
      {treeData && (
        <TreeDetail
          tree={treeData}
          onClose={() => setSelectedTree(null)}
        />
      )}
    </div>
  );
};

export default PalmMap;
