import React from 'react';
import { ArrowRight, Play, TreePine, Droplets, Target, Users } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  const inspirations = [
    { platform: 'Coursera', quote: 'Learn without limits' },
    { platform: 'freeCodeCamp', quote: 'Learn to code for free' },
    { platform: 'μLearn', quote: 'Community-driven learning' },
    { platform: 'Khan Academy', quote: 'Free world-class education' }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Learners' },
    { icon: TreePine, value: '50K+', label: 'Trees Grown' },
    { icon: Target, value: '95%', label: 'Completion Rate' },
    { icon: Droplets, value: '1M+', label: 'Water Drops Earned' }
  ];

  return (
    <div className="min-h-screen pt-16 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center glass-light rounded-3xl p-12 md:p-16 lg:p-20">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Turn knowledge into{' '}
              <span className="bg-gradient-to-r from-cyan-700 to-emerald-700 bg-clip-text text-transparent">
                growth
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-900 mb-4 max-w-3xl mx-auto leading-relaxed">
              Learn by doing. Watch your forest of skills come alive.
            </p>
            
            <p className="text-lg text-gray-800 mb-12 max-w-2xl mx-auto">
              CodeBurry transforms passive learning into active exploration through challenges, 
              experiments, and gamified growth. Don't just read — act, practice, and create.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Grow Your Tree</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onWatchDemo}
                className="group flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg text-white hover:text-gray-100 transition-colors glass border-2 border-white border-opacity-30 hover:border-opacity-50"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="glass rounded-2xl p-4 group-hover:shadow-xl transition-shadow mb-4 inline-block">
                    <Icon className="h-8 w-8 text-cyan-700 mx-auto group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Inspiration Quotes */}
          <div className="glass-light rounded-3xl p-8 max-w-5xl mx-auto border border-white border-opacity-30">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Inspired by the best, built for active learners</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inspirations.map((inspiration, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 transition-colors group border border-white border-opacity-20">
                  <div className="text-lg font-semibold text-gray-900 mb-2">{inspiration.platform}</div>
                  <div className="text-sm text-gray-700 italic group-hover:text-gray-900 transition-colors">
                    "{inspiration.quote}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}