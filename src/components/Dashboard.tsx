import { Challenge } from '../types';
import { TreePine, Droplets, Trophy, TrendingUp, Calendar, Target, BookOpen, Users } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  recentChallenges: Challenge[];
  onNavigate: (page: string) => void;
}

export default function Dashboard({ recentChallenges, onNavigate }: DashboardProps) {
  const { user } = useAuth();
  if (!user) return null;
  const completedChallenges = recentChallenges.filter(c => c.completed).length;
  const totalChallenges = recentChallenges.length;
  const completionRate = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  // Fallbacks for possibly undefined user fields
  const waterDrops = user.waterDrops ?? 0;
  const level = user.level ?? 0;
  const garden = user.garden ?? [];
  const joinedAt = user.joinedAt ? new Date(user.joinedAt) : null;

  const stats = [
    { label: 'Water Drops', value: waterDrops, icon: Droplets, color: 'blue' },
    { label: 'Level', value: level, icon: Trophy, color: 'purple' },
    { label: 'Trees Grown', value: garden.length, icon: TreePine, color: 'green' },
    { label: 'Completion Rate', value: `${completionRate}%`, icon: Target, color: 'orange' }
  ];

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const quickActions = [
    { label: 'Start New Challenge', action: () => onNavigate('learning'), icon: BookOpen, color: 'green' },
    { label: 'View My Garden', action: () => onNavigate('garden'), icon: TreePine, color: 'green' },
    { label: 'Check Leaderboard', action: () => onNavigate('leaderboard'), icon: Trophy, color: 'yellow' },
    { label: 'Join Community', action: () => onNavigate('community'), icon: Users, color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 🌱
          </h1>
          <p className="text-xl text-gray-600">
            Ready to continue growing your forest of knowledge?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getStatColor(stat.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Challenges</h2>
            
            {recentChallenges.length > 0 ? (
              <div className="space-y-4">
                {recentChallenges.slice(0, 5).map((challenge) => (
                  <div key={challenge.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${
                      challenge.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">{challenge.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600">+{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => onNavigate('learning')}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  View All Challenges
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No challenges started yet</p>
                <button 
                  onClick={() => onNavigate('learning')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start Learning
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-center"
                  >
                    <Icon className="h-8 w-8 text-gray-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Garden Preview */}
        {garden.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Growing Garden</h2>
              <button 
                onClick={() => onNavigate('garden')}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                View Full Garden →
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {garden.slice(0, 8).map((tree) => (
                <div key={tree.id} className="text-center">
                  <div className="bg-green-50 p-4 rounded-xl mb-2">
                    <TreePine className="h-8 w-8 text-green-600 mx-auto" />
                  </div>
                  <p className="text-xs text-gray-600 truncate">{tree.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join Date */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Member since {joinedAt ? joinedAt.toLocaleDateString() : 'Unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}