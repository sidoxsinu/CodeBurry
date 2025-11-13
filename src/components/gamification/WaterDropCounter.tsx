import React from 'react';
import { motion } from 'framer-motion';

interface WaterDropCounterProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

const WaterDropCounter: React.FC<WaterDropCounterProps> = ({ count, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="text-blue-500"
      >
        💧
      </motion.div>
      <span className={`font-semibold text-blue-700 ${sizeClasses[size]}`}>
        {count}
      </span>
    </motion.div>
  );
};

export default WaterDropCounter;