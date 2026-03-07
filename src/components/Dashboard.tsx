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
      case 'blue': return 'text-blue-900 bg-blue-300 bg-opacity-70';
      case 'purple': return 'text-purple-800 bg-purple-200 bg-opacity-60';
      case 'green': return 'text-green-800 bg-green-200 bg-opacity-60';
      case 'orange': return 'text-orange-800 bg-orange-200 bg-opacity-60';
      default: return 'text-gray-800 bg-gray-200 bg-opacity-60';
    }
  };

  const quickActions = [
    { label: 'Start New Challenge', action: () => onNavigate('learning'), icon: BookOpen, color: 'green' },
    { label: 'View My Garden', action: () => onNavigate('garden'), icon: TreePine, color: 'green' },
    { label: 'Check Leaderboard', action: () => onNavigate('leaderboard'), icon: Trophy, color: 'yellow' },
    { label: 'Join Community', action: () => onNavigate('community'), icon: Users, color: 'blue' }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12 glass-light rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 🌱
          </h1>
          <p className="text-xl text-gray-800">
            Ready to continue growing your forest of knowledge?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'blue' ? 'bg-cyan-400 bg-opacity-40 text-cyan-700' :
                    stat.color === 'purple' ? 'bg-purple-400 bg-opacity-40 text-purple-700' :
                    stat.color === 'green' ? 'bg-green-400 bg-opacity-40 text-green-700' :
                    'bg-orange-400 bg-opacity-40 text-orange-700'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="glass rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Challenges</h2>
            
            {recentChallenges.length > 0 ? (
              <div className="space-y-4">
                {recentChallenges.slice(0, 5).map((challenge) => (
                  <div key={challenge.id} className="flex items-center space-x-4 p-4 bg-white bg-opacity-20 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${
                      challenge.completed ? 'bg-green-600' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-700">{challenge.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Droplets className="h-4 w-4 text-cyan-600" />
                        <span className="text-sm font-medium text-cyan-700">+{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => onNavigate('learning')}
                  className="w-full mt-4 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 text-gray-900 py-3 rounded-xl font-medium transition-colors"
                >
                  View All Challenges
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">No challenges started yet</p>
                <button 
                  onClick={() => onNavigate('learning')}
                  className="bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors hover:from-green-300 hover:to-emerald-300"
                >
                  Start Learning
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex flex-col items-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-colors text-center"
                  >
                    <Icon className="h-8 w-8 text-gray-700 mb-2" />
                    <span className="text-sm font-medium text-gray-900">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Garden Preview */}
        {garden.length > 0 && (
          <div className="mt-12 glass rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Growing Garden</h2>
              <button 
                onClick={() => onNavigate('garden')}
                className="text-green-700 hover:text-green-900 font-medium transition-colors"
              >
                View Full Garden →
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {garden.slice(0, 8).map((tree) => (
                <div key={tree.id} className="text-center">
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl mb-2">
                    <TreePine className="h-8 w-8 text-green-700 mx-auto" />
                  </div>
                  <p className="text-xs text-gray-700 truncate">{tree.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join Date */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>Member since {joinedAt ? joinedAt.toLocaleDateString() : 'Unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}