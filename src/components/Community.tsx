import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Award, Calendar, Users, TrendingUp, Plus } from 'lucide-react';
import { CommunityPost, User } from '../types';

interface CommunityProps {
  posts: CommunityPost[];
  currentUser?: User;
  onLikePost: (postId: string) => void;
  onCreatePost: (content: string, achievement?: string) => void;
}

export default function Community({ posts, currentUser, onLikePost, onCreatePost }: CommunityProps) {
  const [newPost, setNewPost] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      onCreatePost(newPost.trim());
      setNewPost('');
      setIsCreatingPost(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Community Garden
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your growth journey, celebrate achievements, and inspire fellow learners. 
            Every tree planted is a story worth sharing.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">10,247</div>
            <div className="text-gray-600">Active Learners</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">52,891</div>
            <div className="text-gray-600">Trees Planted This Week</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">1,856</div>
            <div className="text-gray-600">Achievements Shared</div>
          </div>
        </div>

        {/* Create Post */}
        {currentUser && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
              )}
              
              <div className="flex-1">
                {!isCreatingPost ? (
                  <button
                    onClick={() => setIsCreatingPost(true)}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
                  >
                    Share your learning journey...
                  </button>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your progress, insights, or achievements..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setIsCreatingPost(false);
                          setNewPost('');
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePost}
                        disabled={!newPost.trim()}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Post Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start space-x-4">
                  {post.user.avatar ? (
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900">{post.user.name}</h3>
                      <span className="text-sm text-gray-500">Level {post.user.level}</span>
                      {post.achievement && (
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          🏆 Achievement
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatTimeAgo(post.createdAt)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 py-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
                
                {post.achievement && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">New Achievement Unlocked!</span>
                    </div>
                    <p className="text-yellow-700 mt-1">{post.achievement}</p>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group"
                    >
                      <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                      <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors group">
                      <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <span>{post.user.waterDrops} drops</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            Load More Posts
          </button>
        </div>

        {/* Join Community CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Growing Community</h2>
            <p className="text-xl opacity-90 mb-6">
              Connect with fellow learners, share your progress, and celebrate each other's growth.
            </p>
            {!currentUser && (
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
                Sign Up to Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}