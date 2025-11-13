import { useState } from 'react';
import { Menu, X, Droplets, TreePine, User, Home, BookOpen, Trophy, Users, Info, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, hasRole, logout } = useAuth();

  const navigation = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Learning Hub', id: 'learning', icon: BookOpen },
    { name: 'My Garden', id: 'garden', icon: TreePine },
    { name: 'Leaderboard', id: 'leaderboard', icon: Trophy },
    // Community tab only for logged-in users
    ...(isAuthenticated ? [{ name: 'Community', id: 'community', icon: Users }] : []),
    { name: 'About', id: 'about', icon: Info },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              CodeBurry
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
            {isAuthenticated && hasRole('admin') && (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'admin' ? 'text-emerald-700 bg-emerald-50' : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="font-medium">Admin</span>
              </button>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">{user.waterDrops}</span>
                </div>
                {/* Only show Admin button in the main nav for admin users, not in user section */}
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                </button>
                <button
                  onClick={() => { logout(); onNavigate('home'); }}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Join CodeBurry
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              {isAuthenticated && hasRole('admin') && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'admin' ? 'text-emerald-700 bg-emerald-50' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-medium">Admin</span>
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => { logout(); onNavigate('home'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}