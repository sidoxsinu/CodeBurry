import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

import { Tree } from '../types';

interface UserStats {
  waterDrops: number;
  completedLessons: number;
  currentStreak: number;
  totalTrees: number;
  plantGrowthLevel: number;
  rank: number;
  garden: Tree[];
}

interface UserContextType {
  stats: UserStats;
  addWaterDrops: (amount: number) => void;
  spendWaterDrops: (amount: number) => boolean;
  completeLesson: () => void;
  waterPlant: (amount: number) => boolean;
  plantTree: () => void;
  waterGardenTree: (treeId: string, cost: number) => boolean;
  plantNewTreeInGarden: (treeInfo?: { name: string, category: string }) => void;
  earnDropsFromTask: (amount: number) => void;
  refreshStats: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const defaultStats: UserStats = {
    waterDrops: 750,
    completedLessons: 28,
    currentStreak: 14,
    totalTrees: 5,
    plantGrowthLevel: 60,
    rank: 1,
    garden: [
      {
        id: 'tree-1',
        name: 'React Basics',
        category: 'Web',
        growthStage: 'tree',
        plantedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        waterDropsInvested: 185,
      },
      {
        id: 'tree-2',
        name: 'Python Scripts',
        category: 'Python',
        growthStage: 'sapling',
        plantedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        waterDropsInvested: 60,
      }
    ]
  };

  const unauthenticatedStats: UserStats = {
    waterDrops: 0,
    completedLessons: 0,
    currentStreak: 0,
    totalTrees: 0,
    plantGrowthLevel: 0,
    rank: 1,
    garden: []
  };

  const [stats, setStats] = useState<UserStats>(isAuthenticated ? defaultStats : unauthenticatedStats);

  useEffect(() => {
    if (isAuthenticated) {
      setStats(defaultStats);
    } else {
      setStats(unauthenticatedStats);
    }
  }, [isAuthenticated]);

  const addWaterDrops = (amount: number) => {
    setStats(prev => ({
      ...prev,
      waterDrops: prev.waterDrops + amount
    }));
  };

  const spendWaterDrops = (amount: number): boolean => {
    let wasSpent = false;
    setStats(prev => {
      if (prev.waterDrops < amount) {
        return prev;
      }
      wasSpent = true;
      return {
        ...prev,
        waterDrops: prev.waterDrops - amount
      };
    });
    return wasSpent;
  };

  const completeLesson = () => {
    setStats(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      currentStreak: prev.currentStreak + 1,
      waterDrops: prev.waterDrops + 5
    }));
  };

  const waterPlant = (amount: number): boolean => {
    let wasWatered = false;
    setStats(prev => {
      if (prev.waterDrops < amount) {
        return prev;
      }
      wasWatered = true;
      const newGrowthLevel = Math.min(100, prev.plantGrowthLevel + amount * 2);
      return {
        ...prev,
        waterDrops: prev.waterDrops - amount,
        plantGrowthLevel: newGrowthLevel
      };
    });
    return wasWatered;
  };

  const plantTree = () => {
    setStats(prev => {
      if (prev.plantGrowthLevel < 100) {
        return prev;
      }
      return {
        ...prev,
        totalTrees: prev.totalTrees + 1,
        plantGrowthLevel: 0,
        garden: [...prev.garden, {
          id: `tree-${Date.now()}`,
          name: 'Dashboard Reward Tree',
          category: 'Achievement',
          growthStage: 'seed',
          plantedAt: new Date(),
          waterDropsInvested: 0
        }]
      };
    });
  };

  const waterGardenTree = (treeId: string, cost: number): boolean => {
    let wasWatered = false;
    setStats(prev => {
      if (prev.waterDrops < cost) return prev;
      wasWatered = true;
      const stages: Tree['growthStage'][] = ['seed', 'sprout', 'sapling', 'tree', 'giant'];
      return {
        ...prev,
        waterDrops: prev.waterDrops - cost,
        garden: prev.garden.map(tree => {
          if (tree.id === treeId) {
            const currentIndex = stages.indexOf(tree.growthStage);
            const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : stages[stages.length - 1];
            return {
              ...tree,
              growthStage: nextStage,
              waterDropsInvested: tree.waterDropsInvested + cost
            };
          }
          return tree;
        })
      };
    });
    return wasWatered;
  };

  const plantNewTreeInGarden = (treeInfo?: { name: string, category: string }) => {
    setStats(prev => {
      const names = ['Oak Tree', 'Pine Tree', 'Palm Tree', 'Maple Tree'];
      const categories = ['Web', 'JS', 'Python', 'DB'];
      const randomName = treeInfo?.name || names[Math.floor(Math.random() * names.length)];
      const randomCategory = treeInfo?.category || categories[Math.floor(Math.random() * categories.length)];
      
      return {
        ...prev,
        totalTrees: prev.totalTrees + 1,
        garden: [...prev.garden, {
          id: `tree-${Date.now()}`,
          name: randomName,
          category: randomCategory,
          growthStage: 'seed',
          plantedAt: new Date(),
          waterDropsInvested: 0
        }]
      };
    });
  };

  const earnDropsFromTask = (amount: number) => {
    setStats(prev => ({
      ...prev,
      waterDrops: prev.waterDrops + amount,
      completedLessons: prev.completedLessons + 1,
    }));
  };

  const refreshStats = async () => {
    return Promise.resolve();
  };

  return (
    <UserContext.Provider value={{
      stats,
      addWaterDrops,
      spendWaterDrops,
      completeLesson,
      waterPlant,
      plantTree,
      waterGardenTree,
      plantNewTreeInGarden,
      earnDropsFromTask,
      refreshStats
    }}>
      {children}
    </UserContext.Provider>
  );
};