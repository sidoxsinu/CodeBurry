import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface UserStats {
  waterDrops: number;
  completedLessons: number;
  currentStreak: number;
  totalTrees: number;
  plantGrowthLevel: number;
  rank: number;
}

interface UserContextType {
  stats: UserStats;
  addWaterDrops: (amount: number) => void;
  spendWaterDrops: (amount: number) => boolean;
  completeLesson: () => void;
  waterPlant: (amount: number) => boolean;
  plantTree: () => void;
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
    rank: 1
  };

  const unauthenticatedStats: UserStats = {
    waterDrops: 0,
    completedLessons: 0,
    currentStreak: 0,
    totalTrees: 0,
    plantGrowthLevel: 0,
    rank: 1
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
        plantGrowthLevel: 0
      };
    });
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
      refreshStats
    }}>
      {children}
    </UserContext.Provider>
  );
};