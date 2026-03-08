import { useState, useEffect } from 'react';
import { Code, Globe, Database, Brain, Clock, Trophy, ChevronRight, Droplets } from 'lucide-react';
import { Challenge } from '../types';
import { useUser } from '../context/UserContext';

interface LearningHubProps {
  onStartChallenge: (challenge: Challenge) => void;
}

export default function LearningHub({ onStartChallenge }: LearningHubProps) {
  const { earnDropsFromTask } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startedById, setStartedById] = useState<Record<string, boolean>>({});
  const [completedById, setCompletedById] = useState<Record<string, boolean>>({});
  const [uploadById, setUploadById] = useState<Record<string, File | null>>({});
  const [uploadingById, setUploadingById] = useState<Record<string, boolean>>({});
  const [errorById, setErrorById] = useState<Record<string, string | null>>({});
  const [flash, setFlash] = useState<string | null>(null);

  // Pre-load some mocked completion states
  useEffect(() => {
    // You could load from local storage here if caching was desired
  }, []);

  const categories = [
    { id: 'all', name: 'All Challenges', icon: Brain },
    { id: 'web-dev', name: 'Web Development', icon: Globe },
    { id: 'python', name: 'Python', icon: Code },
    { id: 'database', name: 'Databases', icon: Database },
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Build a Todo App with React',
      description: 'Create a fully functional todo application with add, delete, and mark complete features.',
      difficulty: 'beginner',
      category: 'web-dev',
      reward: 50,
      completed: false,
      timeEstimate: '2-3 hours'
    },
    {
      id: '2',
      title: 'API Integration Challenge',
      description: 'Connect to a REST API and display dynamic data with error handling.',
      difficulty: 'intermediate',
      category: 'web-dev',
      reward: 75,
      completed: true,
      timeEstimate: '3-4 hours'
    },
    {
      id: '3',
      title: 'Python Data Analysis',
      description: 'Analyze a dataset using pandas and create visualizations with matplotlib.',
      difficulty: 'intermediate',
      category: 'python',
      reward: 80,
      completed: false,
      timeEstimate: '4-5 hours'
    },
    {
      id: '4',
      title: 'Database Design Challenge',
      description: 'Design and implement a relational database schema for an e-commerce system.',
      difficulty: 'advanced',
      category: 'database',
      reward: 100,
      completed: false,
      timeEstimate: '5-6 hours'
    },
    {
      id: '5',
      title: 'Machine Learning Basics',
      description: 'Build your first ML model to predict house prices using scikit-learn.',
      difficulty: 'advanced',
      category: 'python',
      reward: 120,
      completed: false,
      timeEstimate: '6-8 hours'
    },
    {
      id: '6',
      title: 'Responsive Web Design',
      description: 'Create a mobile-first, fully responsive website using CSS Grid and Flexbox.',
      difficulty: 'beginner',
      category: 'web-dev',
      reward: 45,
      completed: false,
      timeEstimate: '2-3 hours'
    }
  ];

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 glass-light rounded-3xl p-6 md:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Active Learning Hub
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Transform your knowledge through hands-on challenges. Every completed task grows your skills 
            and earns water drops to nurture your learning forest.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 shadow-lg'
                    : 'glass text-gray-900 hover:bg-white hover:bg-opacity-30 shadow-md'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Flash message */}
        {flash && (
          <div
            className="mx-auto mb-4 max-w-3xl rounded-lg glass px-4 py-3 text-gray-900 border border-white border-opacity-30"
            role="status"
            aria-live="polite"
          >
            {flash}
          </div>
        )}

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                (completedById[challenge.id] || challenge.completed) ? 'ring-2 ring-white ring-opacity-40' : ''
              }`}
            >
              <div className="p-4">
                {/* Challenge Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{challenge.title}</h3>
                    <p className="text-gray-700 text-xs leading-relaxed">{challenge.description}</p>
                  </div>
                  {(completedById[challenge.id] || challenge.completed) && (
                    <div className="ml-4">
                      <Trophy className="h-6 w-6 text-green-700" />
                    </div>
                  )}
                </div>

                {/* Challenge Metadata */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-gray-900 ${
                    challenge.difficulty === 'beginner' ? 'bg-green-300 bg-opacity-70' :
                    challenge.difficulty === 'intermediate' ? 'bg-yellow-300 bg-opacity-70' :
                    'bg-red-300 bg-opacity-70'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="flex items-center space-x-1 px-2 py-1 bg-cyan-700 bg-opacity-70 text-gray-900 rounded-full text-xs font-medium">
                    <Clock className="h-3 w-3" />
                    <span>{challenge.timeEstimate}</span>
                  </span>
                </div>

                {/* Reward and Action */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-4 w-4 text-cyan-700" />
                    <span className="text-base font-bold text-cyan-800">+{challenge.reward}</span>
                    <span className="text-xs text-gray-700">drops</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setStartedById(prev => ({ ...prev, [challenge.id]: true }));
                      onStartChallenge(challenge);
                    }}
                    disabled={completedById[challenge.id] || challenge.completed}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      (completedById[challenge.id] || challenge.completed)
                        ? 'bg-green-400 bg-opacity-60 text-gray-900 cursor-not-allowed'
                        : startedById[challenge.id]
                          ? 'bg-yellow-400 bg-opacity-60 text-gray-900 cursor-default'
                          : 'bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 text-gray-900 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <span className="text-sm">{(completedById[challenge.id] || challenge.completed) ? 'Completed' : startedById[challenge.id] ? 'Started' : 'Start'}</span>
                    {!(completedById[challenge.id] || challenge.completed) && !startedById[challenge.id] && <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>

                {/* Upload panel once started and not yet completed */}
                {startedById[challenge.id] && !(completedById[challenge.id] || challenge.completed) && (
                  <div className="mt-4 border-t border-white border-opacity-20 pt-4">
                    <div className="text-sm text-gray-800 mb-2">Upload your task files when completed:</div>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                        setUploadById(prev => ({ ...prev, [challenge.id]: file }));
                      }}
                      className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:bg-opacity-60 file:text-gray-900 hover:file:bg-green-400 hover:file:bg-opacity-70"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={async () => {
                          const file = uploadById[challenge.id];
                          if (!file) return;
                          setErrorById(prev => ({ ...prev, [challenge.id]: null }));
                          setUploadingById(prev => ({ ...prev, [challenge.id]: true }));
                          // Simulate network upload
                          await new Promise(resolve => setTimeout(resolve, 800));
                          
                          setStartedById(prev => ({ ...prev, [challenge.id]: true }));
                          setCompletedById(prev => ({ ...prev, [challenge.id]: true }));
                          earnDropsFromTask(challenge.reward);
                          
                          setFlash(`✅ Task uploaded. Earned ${challenge.reward} drops!`);
                          window.setTimeout(() => setFlash(null), 3000);
                          
                          setUploadingById(prev => ({ ...prev, [challenge.id]: false }));
                        }}
                        disabled={!uploadById[challenge.id] || uploadingById[challenge.id]}
                        className={`px-4 py-2 rounded-lg font-medium ${uploadById[challenge.id] && !uploadingById[challenge.id] ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 hover:from-green-300 hover:to-emerald-300' : 'bg-white bg-opacity-20 text-gray-800 cursor-not-allowed'}`}
                      >
                        {uploadingById[challenge.id] ? 'Uploading…' : 'Upload Task'}
                      </button>
                      {errorById[challenge.id] && (
                        <div className="ml-3 text-sm text-red-200">{errorById[challenge.id]}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="glass-light rounded-3xl p-6 text-gray-900">
            <h2 className="text-2xl font-bold mb-3">Ready to grow your forest?</h2>
            <p className="text-lg text-gray-800 mb-5">
              Complete challenges, earn water drops, and watch your skills bloom into mighty trees.
            </p>
            <button className="bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 px-6 py-3 rounded-xl font-bold text-base hover:from-green-300 hover:to-emerald-300 transition-colors">
              View My Garden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}