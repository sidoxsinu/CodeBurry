import React from 'react';
import { motion } from 'framer-motion';

interface PlantGrowthProps {
  growthLevel: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
}

const PlantGrowth: React.FC<PlantGrowthProps> = ({ growthLevel, size = 'md' }) => {
  const getPlantEmoji = () => {
    if (growthLevel === 0) return '🌱';
    if (growthLevel < 25) return '🌱';
    if (growthLevel < 50) return '🌿';
    if (growthLevel < 75) return '🌳';
    if (growthLevel < 100) return '🌳';
    return '🌳';
  };

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={sizeClasses[size]}
      >
        {getPlantEmoji()}
      </motion.div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-green-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${growthLevel}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-sm text-gray-600 font-medium">{growthLevel}%</span>
    </div>
  );
};

export default PlantGrowth;