import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, LightBulbIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const About = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Passion for Learning',
      description: 'We believe learning should be enjoyable, engaging, and rewarding. Every feature is designed with learners in mind.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation in Education',
      description: 'By gamifying the learning process, we make coding education more interactive and motivating than traditional methods.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community First',
      description: 'Learning is better together. Our platform fosters a supportive community where learners can grow and succeed.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Growth Mindset',
      description: 'Just like plants in a garden, we believe every learner can grow and flourish with the right environment and care.'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former software engineer with a passion for making coding accessible to everyone.'
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Full-stack developer specializing in educational technology and user experience.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Education',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Curriculum designer with 10+ years experience in computer science education.'
    },
    {
      name: 'Emma Wilson',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Community builder focused on creating inclusive and supportive learning environments.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                CodeBurry
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people learn programming by making it 
              engaging, rewarding, and sustainable through gamification and community.
            </p>
            <div className="text-6xl mb-8">🌱➡️🌳</div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At CodeBurry, we believe that learning to code should be as rewarding as watching a garden grow. 
              Traditional programming education can be dry and demotivating. That's why we've created a platform 
              that turns your learning journey into an engaging adventure where every lesson completed helps 
              grow your virtual garden.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why CodeBurry?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl mt-1">🎮</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Gamified Learning</h4>
                    <p className="text-gray-600">Earn rewards, track progress, and stay motivated with our game-like features.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl mt-1">🌱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Visual Progress</h4>
                    <p className="text-gray-600">Watch your virtual garden grow as you master new programming skills.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl mt-1">🏆</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Competition</h4>
                    <p className="text-gray-600">Compete with peers, share achievements, and learn together.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl mt-1">📚</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Comprehensive Curriculum</h4>
                    <p className="text-gray-600">Learn Python, Java, Web Development, and more with hands-on projects.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8">
                <div className="text-8xl mb-4">🌳</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Your Learning Journey</h4>
                <p className="text-gray-600">
                  Every line of code you write, every challenge you complete, 
                  and every concept you master contributes to growing your coding garden.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at CodeBurry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind CodeBurry, dedicated to making programming education accessible and enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Be part of a learning revolution where every step forward helps your garden—and your skills—flourish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Learning Free
              </a>
              <a
                href="/contact"
                className="border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;