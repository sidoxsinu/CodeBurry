import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RequireRoleProps {
  role: 'user' | 'admin';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RequireRole: React.FC<RequireRoleProps> = ({ role, children, fallback }) => {
  const { hasRole, isAuthenticated } = useAuth();

  if (isAuthenticated && hasRole(role)) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  return (
    <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
      <div className="text-center p-8">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Insufficient permissions</h3>
        <p className="mt-1 text-sm text-gray-600">You do not have access to this section.</p>
      </div>
    </div>
  );
};

export default RequireRole;
