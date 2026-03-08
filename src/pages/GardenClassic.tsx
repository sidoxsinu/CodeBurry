import React from 'react';
import GardenComponent from '../components/Garden';
import { useUser } from '../context/UserContext';

const GardenClassic: React.FC = () => {
  const { stats, waterGardenTree, plantNewTreeInGarden } = useUser();

  const onWaterTree = (treeId: string) => {
    const tree = stats.garden.find(t => t.id === treeId);
    if (!tree) return;
    const stage = tree.growthStage;
    const cost = stage === 'seed' ? 10 : stage === 'sprout' ? 25 : stage === 'sapling' ? 50 : stage === 'tree' ? 100 : 0;
    waterGardenTree(treeId, cost);
  };

  const onPlantNewTree = () => {
    plantNewTreeInGarden();
  };

  return (
    <GardenComponent
      trees={stats.garden || []}
      waterDrops={stats.waterDrops}
      onWaterTree={onWaterTree}
      onPlantNewTree={onPlantNewTree}
    />
  );
};

export default GardenClassic;
