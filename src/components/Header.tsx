import { useState } from 'react';
import { Menu, X, Droplets, TreePine, User, Home, BookOpen, Trophy, Users, Info, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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
    <header className="glass-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
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
                      ? 'text-gray-900 bg-white bg-opacity-30 backdrop-blur-md'
                      : 'text-gray-800 hover:text-gray-900 hover:bg-white hover:bg-opacity-20 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 glass px-3 py-1 rounded-full">
                  <Droplets className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm font-semibold text-gray-900">{user.waterDrops}</span>
                </div>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-2 glass px-3 py-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-40"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-gray-800" />
                  )}
                  <span className="text-sm font-medium text-gray-900 hidden sm:block">{user.name}</span>
                </button>
                <button
                  onClick={() => { logout(); onNavigate('home'); }}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('auth')}
                className="glass-light text-gray-900 px-4 py-2 rounded-lg font-medium transition-all hover:bg-white hover:bg-opacity-40"
              >
                Join CodeBurry
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-800 hover:text-gray-900 hover:bg-white hover:bg-opacity-20"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 glass">
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
                        ? 'text-gray-900 bg-white bg-opacity-30 backdrop-blur-md'
                        : 'text-gray-800 hover:text-gray-900 hover:bg-white hover:bg-opacity-20'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              {isAuthenticated && (
                <button
                  onClick={() => { logout(); onNavigate('home'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-800 hover:text-gray-900"
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