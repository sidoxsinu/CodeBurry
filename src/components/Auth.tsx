  import React, { useState } from 'react';
import { TreePine, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSignUp?: (name: string, email: string, password: string) => Promise<void> | void;
  onBack: () => void;
}

export default function Auth({ onLogin, onSignUp, onBack }: AuthProps) {
  const { login, register, isLoading, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitError(null);
      try {
        if (isLogin) {
          if (onLogin) {
            await onLogin(formData.email, formData.password);
          } else {
            await login(formData.email, formData.password);
          }
        } else {
          if (onSignUp) {
            await onSignUp(formData.name, formData.email, formData.password);
          } else {
            await register(formData.name, formData.email, formData.password);
          }
        }
      } catch (e: any) {
        setSubmitError(e?.message || 'Something went wrong. Please try again.');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-6 mx-auto"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              CodeBurry
            </span>
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Ready to continue growing your knowledge forest?' 
              : 'Plant your first seed and watch your skills bloom!'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {(error || submitError) && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {submitError || error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 transform ${isLoading ? '' : 'hover:scale-[1.02]'}`}
            >
              {isLoading ? (isLogin ? 'Signing In…' : 'Creating Account…') : (isLogin ? 'Sign In to Your Garden' : 'Plant Your First Seed')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-green-600 hover:text-green-700 font-medium transition-colors disabled:opacity-50"
            >
              {isLogin 
                ? "New to CodeBurry? Start growing →" 
                : "Already have a garden? Sign in →"
              }
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Join the Growing Community</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-green-600">10K+</div>
                <div className="text-gray-600">Learners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-gray-600">Trees Grown</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}