import React from 'react';
import { ArrowLeft, Rocket, TreePine } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  onBack: () => void;
}

export default function Auth({ onBack }: AuthProps) {
  const { login, isLoading, error, isAuthenticated } = useAuth();

  const handleStart = async () => {
    if (!isAuthenticated) {
      await login();
    }
    onBack();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm text-gray-800 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </button>

        <div className="glass-light rounded-3xl p-10 border border-white border-opacity-30">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-2xl text-gray-900">
              <TreePine className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Jump right in 🌱</h1>
              <p className="text-gray-800">
                We now launch you straight into the CodeBurry experience—no login required.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-20 p-5">
              <p className="text-sm font-medium text-gray-900">Track your growth</p>
              <p className="mt-1 text-sm text-gray-800">
                Water drops, streaks, and achievements stay with your demo profile.
              </p>
            </div>
            <div className="rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-20 p-5">
              <p className="text-sm font-medium text-gray-900">Explore everything</p>
              <p className="mt-1 text-sm text-gray-800">
                Access the dashboard, garden, and community instantly.
              </p>
            </div>
            <div className="rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-20 p-5">
              <p className="text-sm font-medium text-gray-900">Upgrade later</p>
              <p className="mt-1 text-sm text-gray-800">
                When you are ready, connect a real account without losing progress.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 border-opacity-50 bg-red-100 bg-opacity-40 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:shadow-xl hover:from-green-300 hover:to-emerald-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Rocket className="h-5 w-5" />
            <span>{isLoading ? 'Preparing your garden...' : 'Start exploring CodeBurry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}