import React from 'react';
import { TreePine, Target, Users, Lightbulb, BookOpen, Award, ArrowRight } from 'lucide-react';

interface AboutProps {
  onGetStarted: () => void;
}

export default function About({ onGetStarted }: AboutProps) {
  const principles = [
    {
      icon: Target,
      title: "Active Over Passive",
      description: "We believe in learning by doing, not just reading. Every lesson is a challenge to solve, create, or experiment with."
    },
    {
      icon: TreePine,
      title: "Growth Mindset",
      description: "Watch your skills grow like a forest. Each completed challenge plants a seed that grows into lasting knowledge."
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Learn alongside others, share your progress, and celebrate each other's growth in our supportive community."
    },
    {
      icon: Lightbulb,
      title: "Curiosity First",
      description: "We spark curiosity and encourage experimentation. The best learning happens when you're genuinely excited to explore."
    }
  ];

  const features = [
    {
      title: "Interactive Challenges",
      description: "Hands-on coding tasks, problem-solving quests, and real-world projects that make learning engaging and practical."
    },
    {
      title: "Gamified Progress",
      description: "Earn water drops for every challenge completed and watch your virtual garden of skills grow into a mighty forest."
    },
    {
      title: "Community Garden",
      description: "Share your learning journey, celebrate achievements, and inspire fellow learners in our vibrant community."
    },
    {
      title: "Personalized Growth",
      description: "Track your progress, see your skills develop visually, and get recommendations tailored to your learning path."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "50K+", label: "Trees Grown" },
    { number: "1M+", label: "Water Drops Earned" },
    { number: "95%", label: "Complete Projects" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8">
              About <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">CodeBurry</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to transform passive learning into active exploration, 
              turning knowledge into growth through hands-on experiences.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-2 rounded-full mb-6">
                <TreePine className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Passive to Active Knowledge
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Traditional learning often involves passive consumption—reading articles, watching videos, 
                memorizing facts. At CodeBurry, we believe the best learning happens when you actively engage: 
                solve problems, build projects, experiment with ideas, and see your progress grow like a living forest.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by these fundamental beliefs about how learning should work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="bg-green-100 p-4 rounded-2xl inline-block mb-6">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How CodeBurry Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach transforms traditional learning into an engaging, gamified journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-green-600 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12 text-center">
              <div className="space-y-8">
                <div className="flex justify-center space-x-4">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                  <ArrowRight className="h-8 w-8 text-gray-400 mt-2" />
                  <Target className="h-12 w-12 text-green-600" />
                  <ArrowRight className="h-8 w-8 text-gray-400 mt-2" />
                  <TreePine className="h-12 w-12 text-green-800" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The CodeBurry Way</h3>
                  <p className="text-gray-600">
                    <strong>Learn</strong> through interactive challenges → <strong>Practice</strong> hands-on skills → <strong>Grow</strong> your knowledge forest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Story */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Built for the Future of Learning</h2>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              CodeBurry was born from the frustration with passive learning experiences. We noticed that the most 
              successful learners weren't those who consumed the most content, but those who actively engaged with 
              challenges, built projects, and learned from their mistakes.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Drawing inspiration from platforms like Coursera's structured learning, freeCodeCamp's hands-on approach, 
              μLearn's community focus, and Khan Academy's accessibility, we created something uniquely focused on 
              transformation—turning passive knowledge into active growth.
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Making Learning Active, Visual, and Rewarding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Growing?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of active learners who are transforming their knowledge into real skills and watching their expertise bloom.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Plant Your First Tree</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}