import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CB</span>
              </div>
              <span className="text-xl font-bold">CodeBurry</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering developers through interactive learning and gamified progress tracking.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Learning</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learning-hub" className="text-gray-400 hover:text-white transition-colors">Python</Link></li>
              <li><Link to="/learning-hub" className="text-gray-400 hover:text-white transition-colors">Java</Link></li>
              <li><Link to="/learning-hub" className="text-gray-400 hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/learning-hub" className="text-gray-400 hover:text-white transition-colors">Data Structures</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/garden" className="text-gray-400 hover:text-white transition-colors">Virtual Garden</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 CodeBurry. All rights reserved. Built with passion for learning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;