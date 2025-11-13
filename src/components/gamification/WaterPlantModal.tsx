import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../context/UserContext';
import PlantGrowth from './PlantGrowth';
import WaterDropCounter from './WaterDropCounter';

interface WaterPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaterPlantModal: React.FC<WaterPlantModalProps> = ({ isOpen, onClose }) => {
  const { stats, waterPlant, plantTree } = useUser();
  const [waterAmount, setWaterAmount] = useState(5);

  const handleWaterPlant = () => {
    if (waterPlant(waterAmount)) {
      if (stats.plantGrowthLevel + waterAmount * 2 >= 100) {
        setTimeout(() => {
          plantTree();
          alert('Congratulations! Your plant has grown into a tree and has been planted in your garden! 🌳');
        }, 1000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Water Your Plant</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <PlantGrowth growthLevel={stats.plantGrowthLevel} size="lg" />
          </div>

          <div className="flex justify-center">
            <WaterDropCounter count={stats.waterDrops} size="lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water drops to use:
            </label>
            <input
              type="range"
              min="1"
              max={Math.min(stats.waterDrops, 20)}
              value={waterAmount}
              onChange={(e) => setWaterAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>1</span>
              <span className="font-medium">{waterAmount}</span>
              <span>{Math.min(stats.waterDrops, 20)}</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Using {waterAmount} water drops will increase growth by {waterAmount * 2}%</p>
            {stats.plantGrowthLevel + waterAmount * 2 >= 100 && (
              <p className="text-green-600 font-medium mt-2">
                🎉 Your plant will become a tree and be planted in your garden!
              </p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleWaterPlant}
              disabled={stats.waterDrops < waterAmount}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Water Plant 💧
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WaterPlantModal;