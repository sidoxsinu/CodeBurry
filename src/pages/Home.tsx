import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, BookOpenIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: BookOpenIcon,
      title: 'Interactive Learning',
      description: 'Learn Python, Java, and web development through hands-on coding challenges and projects.'
    },
    {
      icon: TrophyIcon,
      title: 'Gamified Progress',
      description: 'Earn water drops, grow virtual plants, and build your own coding garden as you learn.'
    },
    {
      icon: UsersIcon,
      title: 'Community Driven',
      description: 'Join thousands of learners, compete on leaderboards, and grow together.'
    }
  ];

  const quotes = [
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
    { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Grow Your Coding Skills with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  CodeBurry
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A self-learning platform that makes coding fun through interactive lessons, 
                gamification, and a supportive community. Plant the seeds of knowledge and 
                watch your skills grow into a beautiful garden.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
              >
                <span>Start Learning Today</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/learning-hub"
                className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
              >
                <PlayIcon className="h-5 w-5" />
                <span>Explore Courses</span>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
              <div className="text-8xl mb-4">🌱➡️🌿➡️🌳</div>
              <p className="text-gray-600 font-medium">Your Learning Journey</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CodeBurry?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've reimagined how programming should be learned - making it engaging, 
              rewarding, and sustainable for long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quotes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspiration for Your Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <blockquote className="text-gray-700 text-lg mb-4 italic">
                  "{quote.text}"
                </blockquote>
                <cite className="text-green-600 font-semibold">— {quote.author}</cite>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Coding Garden?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of learners who are growing their skills with CodeBurry.
            </p>
            <Link
              to="/register"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;