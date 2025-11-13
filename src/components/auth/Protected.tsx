import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  return (
    <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
      <div className="text-center p-8">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Lock className="w-6 h-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Sign in to continue</h3>
        <p className="mt-1 text-sm text-gray-600">This area is protected. Please sign in to access it.</p>
      </div>
    </div>
  );
};

export default Protected;
