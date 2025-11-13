import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Calendar, Users } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export default function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const isCurrentUser = (entry: LeaderboardEntry) => {
    return entry.user.id === currentUserId;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Growth Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your active learning journey compares with the CodeBurry community. 
            Rankings based on water drops earned and trees grown.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            {[
              { key: 'weekly', label: 'This Week', icon: Calendar },
              { key: 'monthly', label: 'This Month', icon: TrendingUp },
              { key: 'allTime', label: 'All Time', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTimeFilter(key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  timeFilter === key
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {entries.slice(0, 3).map((entry, index) => {
            const actualRank = entry.rank;
            const podiumOrder = [1, 0, 2]; // Second place on left, first in middle, third on right
            const displayIndex = podiumOrder.indexOf(index);
            
            return (
              <div
                key={entry.user.id}
                className={`text-center transform transition-all duration-300 ${
                  actualRank === 1 ? 'md:order-2 scale-110' : actualRank === 2 ? 'md:order-1' : 'md:order-3'
                }`}
              >
                <div className={`bg-white rounded-3xl p-6 shadow-xl border-2 ${getRankStyle(actualRank)}`}>
                  <div className="mb-4">
                    {getRankIcon(actualRank)}
                  </div>
                  <div className="mb-4">
                    {entry.user.avatar ? (
                      <img
                        src={entry.user.avatar}
                        alt={entry.user.name}
                        className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto border-4 border-white shadow-lg flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{entry.user.name}</h3>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">{entry.totalDrops}</div>
                    <div className="text-sm text-gray-600">water drops</div>
                    <div className="text-lg font-semibold text-green-600">{entry.treesGrown}</div>
                    <div className="text-sm text-gray-600">trees grown</div>
                  </div>
                  {timeFilter === 'weekly' && (
                    <div className="mt-3 flex items-center justify-center space-x-1 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{entry.weeklyGrowth} this week</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Full Rankings</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {entries.slice(3).map((entry) => (
              <div
                key={entry.user.id}
                className={`px-6 py-4 transition-colors ${
                  isCurrentUser(entry) ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 text-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {entry.user.avatar ? (
                        <img
                          src={entry.user.avatar}
                          alt={entry.user.name}
                          className="w-10 h-10 rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">
                          {entry.user.name}
                          {isCurrentUser(entry) && (
                            <span className="ml-2 text-sm text-green-600 font-medium">(You)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Level {entry.user.level} • Joined {entry.user.joinedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{entry.totalDrops}</div>
                    <div className="text-sm text-gray-600">drops</div>
                    <div className="text-sm font-medium text-green-600">{entry.treesGrown} trees</div>
                    {timeFilter === 'weekly' && entry.weeklyGrowth > 0 && (
                      <div className="text-xs text-green-500 flex items-center justify-end space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{entry.weeklyGrowth}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Climb the Rankings!</h2>
            <p className="text-xl opacity-90 mb-6">
              Complete more challenges, grow more trees, and see your name rise on the leaderboard.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
              Start New Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}