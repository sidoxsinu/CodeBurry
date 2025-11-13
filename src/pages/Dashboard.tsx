import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import PlantGrowth from '../components/gamification/PlantGrowth';
import WaterDropCounter from '../components/gamification/WaterDropCounter';
import WaterPlantModal from '../components/gamification/WaterPlantModal';
import { 
  TrophyIcon, 
  AcademicCapIcon, 
  FireIcon, 
  ChartBarIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats } = useUser();
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
          <p className="text-gray-600">You need to be logged in to track your progress and manage your garden.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Water Drops',
      value: stats.waterDrops,
      icon: '💧',
      color: 'bg-blue-500',
      description: 'Currency for growing plants'
    },
    {
      title: 'Lessons Completed',
      value: stats.completedLessons,
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      description: 'Learning milestones achieved'
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: FireIcon,
      color: 'bg-orange-500',
      description: 'Consecutive learning days'
    },
    {
      title: 'Trees Planted',
      value: stats.totalTrees,
      icon: '🌳',
      color: 'bg-emerald-500',
      description: 'Achievements in your garden'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', unlocked: stats.completedLessons > 0, icon: '👶' },
    { name: 'Plant Lover', description: 'Water your plant 10 times', unlocked: stats.completedLessons > 5, icon: '🌱' },
    { name: 'Tree Planter', description: 'Plant your first tree', unlocked: stats.totalTrees > 0, icon: '🌳' },
    { name: 'Streak Master', description: '7-day learning streak', unlocked: stats.currentStreak >= 7, icon: '🔥' },
    { name: 'Knowledge Collector', description: 'Earn 100 water drops', unlocked: stats.waterDrops >= 50, icon: '💎' },
    { name: 'Garden Expert', description: 'Plant 5 trees', unlocked: stats.totalTrees >= 5, icon: '🏆' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Track your progress, grow your plants, and see how you're doing in your learning journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white`}>
                  {typeof card.icon === 'string' ? (
                    <span className="text-2xl">{card.icon}</span>
                  ) : (
                    <card.icon className="h-6 w-6" />
                  )}
                </div>
                <span className="text-2xl font-bold text-gray-900">{card.value}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plant Growth Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Plant</h2>
                <WaterDropCounter count={stats.waterDrops} size="md" />
              </div>
              
              <div className="text-center mb-6">
                <PlantGrowth growthLevel={stats.plantGrowthLevel} size="lg" />
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setIsWaterModalOpen(true)}
                  disabled={stats.waterDrops === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>💧</span>
                  <span>Water Plant</span>
                </button>

                {stats.plantGrowthLevel >= 100 && (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <span>🌳</span>
                    <span>Plant Tree in Garden</span>
                  </button>
                )}

                <div className="text-center text-sm text-gray-600">
                  {stats.plantGrowthLevel < 100 ? (
                    <p>Your plant needs {100 - stats.plantGrowthLevel}% more growth to become a tree!</p>
                  ) : (
                    <p>🎉 Your plant is ready to be planted in your garden!</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
                <span>Learning Progress</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-600">
                      {Math.round((stats.completedLessons / 16) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((stats.completedLessons / 16) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {stats.completedLessons} of 16 lessons completed
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">#{stats.rank}</div>
                    <div className="text-sm text-gray-600">Global Rank</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.currentStreak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
                <span>Achievements</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <SparklesIcon className="h-5 w-5 text-green-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Water Plant Modal */}
      <WaterPlantModal
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;