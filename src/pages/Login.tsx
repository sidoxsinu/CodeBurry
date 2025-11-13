import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleStart = async () => {
    if (!isAuthenticated) {
      await login();
    }
    navigate('/dashboard', { replace: true });
  };

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CB</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">CodeBurry</span>
            </Link>
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Ready when you are! 🚀
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We removed the login step. Start exploring CodeBurry instantly with a demo profile.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <RocketLaunchIcon className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              Tap the button below and we will spin up a fully featured demo session for you—no credentials needed.
            </p>
          </div>

          <button
            onClick={handleStart}
            disabled={isLoading}
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>{isLoading ? 'Preparing your dashboard...' : 'Start exploring'}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Want a personalised account?{' '}
            <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
              Connect later from your profile 🌱
            </Link>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <p className="text-center text-xs text-gray-400">
            Demo sessions use local data only—no database calls required.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;